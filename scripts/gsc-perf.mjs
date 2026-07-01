// GSC Search Analytics — canlı performans çekimi (impressions/clicks/ctr/position)
import { google } from "googleapis"
import fs from "fs"

const SITE = "sc-domain:solmandigital.com.tr"
const DAYS = Number(process.argv[2] || 28)

function loadCreds() {
  const env = fs.readFileSync(".env.local", "utf8")
  const m = env.match(/GOOGLE_SERVICE_ACCOUNT_JSON=(.+)/)
  if (!m) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON .env.local'da yok")
  return JSON.parse(m[1].trim().replace(/^﻿/, ""))
}

const fmt = (d) => d.toISOString().slice(0, 10)

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

  const base = { siteUrl: SITE, requestBody: { startDate: fmt(start), endDate: fmt(end), rowLimit: 25000 } }

  // Toplam
  const total = await sc.searchanalytics.query({ ...base, requestBody: { ...base.requestBody } })
  const t = (total.data.rows && total.data.rows[0]) || { clicks: 0, impressions: 0, ctr: 0, position: 0 }

  // Günlük trend
  const byDate = await sc.searchanalytics.query({ ...base, requestBody: { ...base.requestBody, dimensions: ["date"] } })

  // Sorgular
  const byQuery = await sc.searchanalytics.query({ ...base, requestBody: { ...base.requestBody, dimensions: ["query"] } })

  // Sayfalar
  const byPage = await sc.searchanalytics.query({ ...base, requestBody: { ...base.requestBody, dimensions: ["page"] } })

  const out = {
    site: SITE,
    range: { start: fmt(start), end: fmt(end), days: DAYS },
    total: { clicks: t.clicks, impressions: t.impressions, ctr: t.ctr, position: t.position },
    daily: (byDate.data.rows || []).map((r) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: r.position })),
    queries: (byQuery.data.rows || []).map((r) => ({ q: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
    pages: (byPage.data.rows || []).map((r) => ({ url: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
  }
  fs.writeFileSync("gsc-perf-live.json", JSON.stringify(out, null, 2))

  console.log(`\n=== GSC ${fmt(start)} → ${fmt(end)} (${DAYS}g) ===`)
  console.log(`Tıklama: ${out.total.clicks}  |  Görüntülenme: ${out.total.impressions}  |  CTR: ${(out.total.ctr * 100).toFixed(2)}%  |  Ort. Konum: ${out.total.position.toFixed(1)}`)
  console.log(`\nTop 15 sorgu (görüntülenmeye göre):`)
  out.queries.sort((a, b) => b.impressions - a.impressions).slice(0, 15)
    .forEach((r) => console.log(`  ${String(r.impressions).padStart(4)} gör | ${String(r.clicks).padStart(2)} tık | poz ${r.position.toFixed(1).padStart(5)} | ${r.q}`))
  console.log(`\nTop 12 sayfa:`)
  out.pages.sort((a, b) => b.impressions - a.impressions).slice(0, 12)
    .forEach((r) => console.log(`  ${String(r.impressions).padStart(4)} gör | ${String(r.clicks).padStart(2)} tık | poz ${r.position.toFixed(1).padStart(5)} | ${r.url}`))
  console.log(`\n→ gsc-perf-live.json yazıldı`)
}

main().catch((e) => { console.error("HATA:", e.message); process.exit(1) })
