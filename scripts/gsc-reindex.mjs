// GSC URL Inspection + Indexing API re-crawl request
//
// 1) Her URL'i URL Inspection API ile denetler → indexlenebilir mi, robots/canonical
//    engeli var mı, son tarama ne zaman, coverage durumu.
// 2) Engelsiz URL'ler için Indexing API'ye URL_UPDATED ping atar (recrawl talebi).
//
// Çalıştırma:
//   node scripts/gsc-reindex.mjs            → denetler + index talebi gönderir
//   node scripts/gsc-reindex.mjs --check    → sadece denetler, ping atmaz
//
// SA: ticarethub@ticarethub-490800 (sc-domain:solmandigital.com.tr siteOwner)
import { google } from "googleapis"
import fs from "fs"
import https from "https"
import dns from "dns"

// searchconsole.googleapis.com bu makinede yalnız IPv6 (AAAA) route etmiyor;
// gaxios'a OS lookup'ın döndürdüğü IPv4'ü zorla.
google.options({
  agent: new https.Agent({ lookup: (h, o, cb) => dns.lookup(h, { ...o, family: 4 }, cb) }),
})

const CHECK_ONLY = process.argv.includes("--check")
const SITE_PROPERTY = "sc-domain:solmandigital.com.tr"
const BASE = "https://solmandigital.com.tr"

function loadCreds() {
  const env = fs.readFileSync(".env.local", "utf8")
  const m = env.match(/GOOGLE_SERVICE_ACCOUNT_JSON=(.+)/)
  if (!m) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON .env.local'da yok")
  return JSON.parse(m[1].trim().replace(/^﻿/, ""))
}

// Sitemap'teki tüm URL'leri canlı sitemap.xml'den çek (tek kaynak doğruluğu).
async function getSitemapUrls() {
  try {
    const res = await fetch(`${BASE}/sitemap.xml`)
    if (!res.ok) throw new Error(`sitemap ${res.status}`)
    const xml = await res.text()
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
    if (urls.length) return urls
  } catch (e) {
    console.log("⚠ sitemap.xml çekilemedi, BASE fallback:", e.message)
  }
  return [BASE]
}

async function main() {
  const credentials = loadCreds()
  console.log("SA:", credentials.client_email)
  console.log("Property:", SITE_PROPERTY)
  console.log("Mod:", CHECK_ONLY ? "SADECE DENETLE" : "DENETLE + INDEX TALEBİ")
  console.log("")

  const urls = await getSitemapUrls()
  console.log(`Sitemap'te ${urls.length} URL bulundu.\n`)

  const inspectAuth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  })
  const searchconsole = google.searchconsole({ version: "v1", auth: inspectAuth })

  const indexAuth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  })
  const indexToken = CHECK_ONLY ? null : await indexAuth.getAccessToken()

  // Sitemap'i GSC'ye yeniden gönder (recrawl için en yetkili sinyal).
  if (!CHECK_ONLY) {
    const smAuth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/webmasters"],
    })
    const wm = google.webmasters({ version: "v3", auth: smAuth })
    try {
      await wm.sitemaps.submit({ siteUrl: SITE_PROPERTY, feedpath: `${BASE}/sitemap.xml` })
      console.log(`✓ Sitemap yeniden gönderildi: ${BASE}/sitemap.xml\n`)
    } catch (e) {
      console.log(`⚠ Sitemap gönderimi başarısız: ${e.message}\n`)
    }
  }

  const blocked = []
  const indexed = []
  const notIndexed = []
  const pinged = []
  const pingFailed = []

  for (const url of urls) {
    let verdict, coverage, robots, indexState, canonical, lastCrawl
    try {
      const r = await searchconsole.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl: SITE_PROPERTY },
      })
      const idx = r.data.inspectionResult?.indexStatusResult ?? {}
      verdict = idx.verdict // PASS / NEUTRAL / FAIL
      coverage = idx.coverageState // "Submitted and indexed" vb.
      robots = idx.robotsTxtState
      indexState = idx.indexingState
      canonical = idx.googleCanonical
      lastCrawl = idx.lastCrawlTime
    } catch (e) {
      console.log(`✖ INSPECT HATA  ${url}\n    ${e.message}`)
      blocked.push({ url, reason: "inspect-error: " + e.message })
      continue
    }

    const isIndexed = /indexed/i.test(coverage || "")
    const path = url.replace(BASE, "") || "/"
    const flag = verdict === "PASS" && isIndexed ? "✓" : verdict === "FAIL" ? "✖" : "•"
    console.log(`${flag} ${verdict || "?"}  ${path}`)
    console.log(`    coverage: ${coverage || "—"} | robots: ${robots || "—"} | son tarama: ${lastCrawl ? lastCrawl.slice(0, 10) : "hiç"}`)
    if (canonical && canonical !== url) console.log(`    ⚠ google-canonical farklı: ${canonical}`)

    // Engel tespiti
    const blockReasons = []
    if (robots && robots !== "ALLOWED") blockReasons.push(`robots:${robots}`)
    if (indexState && /blocked|disallow/i.test(indexState)) blockReasons.push(`indexing:${indexState}`)
    if (verdict === "FAIL") blockReasons.push("verdict:FAIL")
    if (blockReasons.length) {
      blocked.push({ url, reason: blockReasons.join(", "), coverage })
    }

    if (isIndexed) indexed.push(url)
    else notIndexed.push({ url, coverage })

    // Index talebi: engelsiz tüm URL'lere recrawl ping (Indexing API quota: 200/gün)
    if (!CHECK_ONLY && !blockReasons.length) {
      try {
        const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${indexToken}` },
          body: JSON.stringify({ url, type: "URL_UPDATED" }),
        })
        if (res.ok) pinged.push(url)
        else { const t = await res.text(); pingFailed.push({ url, status: res.status, body: t.slice(0, 200) }) }
      } catch (e) {
        pingFailed.push({ url, error: e.message })
      }
    }
  }

  console.log("\n" + "=".repeat(60))
  console.log("ÖZET")
  console.log("=".repeat(60))
  console.log(`Toplam URL          : ${urls.length}`)
  console.log(`Indexli             : ${indexed.length}`)
  console.log(`Index'siz           : ${notIndexed.length}`)
  console.log(`ENGEL tespit edilen : ${blocked.length}`)
  if (!CHECK_ONLY) {
    console.log(`Index talebi (ping) : ${pinged.length} OK, ${pingFailed.length} hata`)
  }

  if (blocked.length) {
    console.log("\n⚠ ENGELLER:")
    for (const b of blocked) console.log(`  ✖ ${b.url}\n      → ${b.reason} ${b.coverage ? "(" + b.coverage + ")" : ""}`)
  } else {
    console.log("\n✓ Hiçbir URL'de engel (robots/canonical/verdict) tespit edilmedi.")
  }

  if (notIndexed.length) {
    console.log("\n• Henüz INDEX'SİZ (talep gönderildi, Google'ın taraması beklenir):")
    for (const n of notIndexed) console.log(`  - ${n.url.replace(BASE, "") || "/"}  [${n.coverage || "—"}]`)
  }

  if (pingFailed.length) {
    console.log("\n✖ PING HATALARI:")
    for (const p of pingFailed) console.log(`  - ${p.url}: ${p.status || ""} ${p.body || p.error || ""}`)
  }

  // Raporu dosyaya yaz
  const report = { ts: new Date().toISOString(), property: SITE_PROPERTY, total: urls.length, indexed: indexed.length, notIndexed, blocked, pinged: pinged.length, pingFailed }
  fs.writeFileSync("gsc-reindex-report.json", JSON.stringify(report, null, 2))
  console.log("\n📄 Detay rapor: gsc-reindex-report.json")
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1) })
