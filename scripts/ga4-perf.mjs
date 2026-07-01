// GA4 — canlı performans (oturum, kaynak, organik, dönüşüm) — DNS IPv4 workaround
import { google } from "googleapis"
import fs from "fs"
import https from "https"
import dns from "dns"

// analyticsdata.googleapis.com bu makinede yalnız OS lookup'tan IPv4 dönüyor;
// gaxios'a IPv4 zorlayan custom agent ver.
const ipv4Agent = new https.Agent({
  lookup: (host, opts, cb) => dns.lookup(host, { ...opts, family: 4 }, cb),
})

const PROPERTY = "properties/539436083"
const DAYS = Number(process.argv[2] || 28)

function loadCreds() {
  const env = fs.readFileSync(".env.local", "utf8")
  const m = env.match(/GOOGLE_SERVICE_ACCOUNT_JSON=(.+)/)
  if (!m) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON yok")
  return JSON.parse(m[1].trim().replace(/^﻿/, ""))
}

async function main() {
  const credentials = loadCreds()
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/analytics.readonly"] })
  const ad = google.analyticsdata({ version: "v1beta", auth })
  google.options({ agent: ipv4Agent })

  const range = [{ startDate: `${DAYS}daysAgo`, endDate: "today" }]
  const prevRange = [{ startDate: `${DAYS * 2}daysAgo`, endDate: `${DAYS + 1}daysAgo` }]

  const run = (body) => ad.properties.runReport({ property: PROPERTY, requestBody: body }).then((r) => r.data)

  // Genel + önceki dönem (trend)
  const overview = await run({ dateRanges: [...range, ...prevRange], metrics: [
    { name: "sessions" }, { name: "totalUsers" }, { name: "newUsers" },
    { name: "screenPageViews" }, { name: "averageSessionDuration" }, { name: "bounceRate" }, { name: "engagementRate" },
  ]})

  // Kanal bazında
  const channels = await run({ dateRanges: range, dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "engagementRate" }, { name: "conversions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }] })

  // En çok ziyaret edilen sayfalar
  const pages = await run({ dateRanges: range, dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "sessions" }, { name: "engagementRate" }, { name: "conversions" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 15 })

  // Organik landing
  const organicLanding = await run({ dateRanges: range, dimensions: [{ name: "landingPage" }],
    metrics: [{ name: "sessions" }, { name: "engagementRate" }, { name: "conversions" }],
    dimensionFilter: { filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Organic Search" } } },
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 12 })

  // Dönüşüm event'leri
  const events = await run({ dateRanges: range, dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "conversions" }],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }], limit: 20 })

  const num = (r, ri, mi) => Number(r.rows?.[ri]?.metricValues?.[mi]?.value || 0)
  const pct = (a, b) => (b === 0 ? "—" : `${(((a - b) / b) * 100).toFixed(0)}%`)

  const out = {
    property: PROPERTY, days: DAYS,
    overview: {
      cur: { sessions: num(overview, 0, 0), users: num(overview, 0, 1), newUsers: num(overview, 0, 2), views: num(overview, 0, 3), avgDur: num(overview, 0, 4), bounce: num(overview, 0, 5), engaged: num(overview, 0, 6) },
      prev: { sessions: num(overview, 1, 0), users: num(overview, 1, 1), newUsers: num(overview, 1, 2), views: num(overview, 1, 3) },
    },
    channels: (channels.rows || []).map((r) => ({ ch: r.dimensionValues[0].value, sessions: +r.metricValues[0].value, users: +r.metricValues[1].value, engRate: +r.metricValues[2].value, conv: +r.metricValues[3].value })),
    pages: (pages.rows || []).map((r) => ({ path: r.dimensionValues[0].value, views: +r.metricValues[0].value, sessions: +r.metricValues[1].value, engRate: +r.metricValues[2].value, conv: +r.metricValues[3].value })),
    organicLanding: (organicLanding.rows || []).map((r) => ({ path: r.dimensionValues[0].value, sessions: +r.metricValues[0].value, engRate: +r.metricValues[1].value, conv: +r.metricValues[2].value })),
    events: (events.rows || []).map((r) => ({ name: r.dimensionValues[0].value, count: +r.metricValues[0].value, conv: +r.metricValues[1].value })),
  }
  fs.writeFileSync("ga4-perf-live.json", JSON.stringify(out, null, 2))

  const o = out.overview
  console.log(`\n=== GA4 son ${DAYS} gün ===`)
  console.log(`Oturum: ${o.cur.sessions} (${pct(o.cur.sessions, o.prev.sessions)} vs önceki) | Kullanıcı: ${o.cur.users} (${pct(o.cur.users, o.prev.users)}) | Yeni: ${o.cur.newUsers} | Görüntüleme: ${o.cur.views}`)
  console.log(`Etkileşim oranı: ${(o.cur.engaged * 100).toFixed(1)}% | Bounce: ${(o.cur.bounce * 100).toFixed(1)}% | Ort. süre: ${o.cur.avgDur.toFixed(0)}s`)
  console.log(`\nKanallar:`)
  out.channels.forEach((c) => console.log(`  ${c.ch.padEnd(18)} ${String(c.sessions).padStart(4)} oturum | etk ${(c.engRate * 100).toFixed(0)}% | dönüşüm ${c.conv}`))
  console.log(`\nEn çok ziyaret edilen sayfalar:`)
  out.pages.slice(0, 10).forEach((p) => console.log(`  ${String(p.views).padStart(4)} gör | ${String(p.sessions).padStart(3)} ot | dön ${p.conv} | ${p.path}`))
  console.log(`\nOrganik landing:`)
  out.organicLanding.forEach((p) => console.log(`  ${String(p.sessions).padStart(3)} ot | etk ${(p.engRate * 100).toFixed(0)}% | dön ${p.conv} | ${p.path}`))
  console.log(`\nEvent'ler:`)
  out.events.slice(0, 12).forEach((e) => console.log(`  ${String(e.count).padStart(5)} | dön ${e.conv} | ${e.name}`))
  console.log(`\n→ ga4-perf-live.json yazıldı`)
}

main().catch((e) => { console.error("HATA:", e.message); process.exit(1) })
