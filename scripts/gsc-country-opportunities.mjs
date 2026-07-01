// GSC ülke + fırsat analizi — pozisyon 8-20 arası "yükselmeye hazır" sorgu/sayfa/ülke
// kombinasyonlarını çıkarır. TR dışı pazarlarda (NL/GB/US/CA/CO/AZ vb.) sıralama
// avantajını ortaya koyar. Salt-okunur (webmasters.readonly).
// Kullanım: node scripts/gsc-country-opportunities.mjs [DAYS]  (varsayılan 7)
import { google } from "googleapis"
import fs from "fs"

const SITE = "sc-domain:solmandigital.com.tr"
const DAYS = Number(process.argv[2] || 7)

function loadCreds() {
  const env = fs.readFileSync(".env.local", "utf8")
  const m = env.match(/GOOGLE_SERVICE_ACCOUNT_JSON=(.+)/)
  if (!m) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON .env.local'da yok")
  return JSON.parse(m[1].trim().replace(/^﻿/, ""))
}

const fmt = (d) => d.toISOString().slice(0, 10)
const P = (n) => (n ?? 0).toFixed(1)

async function main() {
  const credentials = loadCreds()
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  })
  const sc = google.searchconsole({ version: "v1", auth, rootUrl: "https://www.googleapis.com/" })

  const end = new Date()
  end.setDate(end.getDate() - 2) // GSC ~2 gün gecikme
  const start = new Date(end)
  start.setDate(start.getDate() - DAYS)
  const dateBody = { startDate: fmt(start), endDate: fmt(end), rowLimit: 25000 }
  const q = (dims) => sc.searchanalytics.query({ siteUrl: SITE, requestBody: { ...dateBody, dimensions: dims } })

  const [byCountry, byCP, byCQ, byQP] = await Promise.all([
    q(["country"]),
    q(["country", "page"]),
    q(["country", "query"]),
    q(["query", "page"]),
  ])

  const rows = (r) => r.data.rows || []
  const country = rows(byCountry).map((r) => ({ country: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }))
  const countryPage = rows(byCP).map((r) => ({ country: r.keys[0], page: r.keys[1], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }))
  const countryQuery = rows(byCQ).map((r) => ({ country: r.keys[0], query: r.keys[1], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }))
  const queryPage = rows(byQP).map((r) => ({ query: r.keys[0], page: r.keys[1], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }))

  // Fırsat = pozisyon 8-20 arası + en az 1 gösterim (ilk sayfaya taşınabilir yakınlık).
  const isOpp = (r) => r.position >= 8 && r.position <= 20 && r.impressions >= 1
  const opps = {
    countryQuery: countryQuery.filter(isOpp).sort((a, b) => a.position - b.position),
    countryPage: countryPage.filter(isOpp).sort((a, b) => a.position - b.position),
    queryPage: queryPage.filter(isOpp).sort((a, b) => a.position - b.position),
  }

  const out = {
    site: SITE,
    range: { start: fmt(start), end: fmt(end), days: DAYS },
    country: country.sort((a, b) => b.impressions - a.impressions),
    opportunities: opps,
    raw: { countryQuery, countryPage, queryPage },
  }
  fs.writeFileSync("gsc-country-opps.json", JSON.stringify(out, null, 2))

  console.log(`\n=== GSC ülke & fırsat ${fmt(start)} → ${fmt(end)} (${DAYS}g) ===`)
  console.log(`\nÜlkeler (görüntülenmeye göre):`)
  out.country.slice(0, 15).forEach((c) =>
    console.log(`  ${c.country.toUpperCase().padEnd(4)} | ${String(c.impressions).padStart(4)} gör | ${String(c.clicks).padStart(2)} tık | poz ${P(c.position).padStart(5)} | CTR ${(c.ctr * 100).toFixed(1)}%`))

  console.log(`\n🎯 FIRSAT — ülke+sorgu (poz 8-20, konuma göre):`)
  opps.countryQuery.slice(0, 25).forEach((r) =>
    console.log(`  poz ${P(r.position).padStart(5)} | ${String(r.impressions).padStart(3)} gör | ${r.country.toUpperCase()} | ${r.query}`))

  console.log(`\n🎯 FIRSAT — ülke+sayfa (poz 8-20):`)
  opps.countryPage.slice(0, 20).forEach((r) =>
    console.log(`  poz ${P(r.position).padStart(5)} | ${String(r.impressions).padStart(3)} gör | ${r.country.toUpperCase()} | ${r.page.replace(SITE, "")}`))

  console.log(`\n→ gsc-country-opps.json yazıldı`)
}

main().catch((e) => { console.error("HATA:", e.message); process.exit(1) })
