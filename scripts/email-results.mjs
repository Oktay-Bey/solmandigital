/**
 * email-results.mjs
 * Brevo + Resend gönderim sonuçlarını çeker, GA4 email-trafik funnel'ı ile birleştirir.
 * Kullanım: node scripts/email-results.mjs
 */
import { readFileSync } from "node:fs"
import { google } from "googleapis"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)

const line = (n=44) => console.log("─".repeat(n))

// Sonuçları birleştirmek için topla
const totals = { brevoSent: 0, brevoDelivered: 0, resendSent: 0, resendDelivered: 0 }

// ─── BREVO ──────────────────────────────────────────────────────────────
async function brevo() {
  console.log("\n=== BREVO ===")
  if (!env.BREVO_API_KEY) { console.log("  ⚠ BREVO_API_KEY yok"); return }
  const H = { "api-key": env.BREVO_API_KEY, "Accept": "application/json" }

  // Aggregate stats (son 90 gün)
  const end = new Date().toISOString().slice(0,10)
  const start = new Date(Date.now() - 90*864e5).toISOString().slice(0,10)
  try {
    const r = await fetch(`https://api.brevo.com/v3/smtp/statistics/aggregatedReport?startDate=${start}&endDate=${end}`, { headers: H })
    const s = await r.json()
    if (r.ok) {
      console.log(`\n  Toplam metrikler (${start} → ${end})`)
      line()
      totals.brevoSent = s.requests ?? 0
      totals.brevoDelivered = s.delivered ?? 0
      console.log(`  Gönderilen (requests) : ${s.requests ?? 0}`)
      console.log(`  Teslim edilen         : ${s.delivered ?? 0}`)
      console.log(`  Açılma (opens)        : ${s.opens ?? 0}  (unique: ${s.uniqueOpens ?? 0})`)
      console.log(`  Tıklama (clicks)      : ${s.clicks ?? 0}  (unique: ${s.uniqueClicks ?? 0})`)
      console.log(`  Hard bounce           : ${s.hardBounces ?? 0}`)
      console.log(`  Soft bounce           : ${s.softBounces ?? 0}`)
      console.log(`  Spam şikayeti         : ${s.spamReports ?? 0}`)
      console.log(`  Unsubscribe           : ${s.unsubscribed ?? 0}`)
      const deliv = s.delivered || 0
      if (deliv) {
        console.log(`\n  Açılma oranı  : ${(100*(s.uniqueOpens||0)/deliv).toFixed(1)}%`)
        console.log(`  Tıklama oranı : ${(100*(s.uniqueClicks||0)/deliv).toFixed(1)}%`)
      }
    } else {
      console.log(`  ⚠ aggregatedReport hata: ${r.status} ${JSON.stringify(s).slice(0,120)}`)
    }
  } catch (e) { console.log(`  ⚠ stats hata: ${e.message}`) }

  // Son olaylar
  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/emails?limit=15&sort=desc", { headers: H })
    const d = await r.json()
    console.log(`\n  Son gönderilenler (toplam kayıt: ${d.count ?? 0})`)
    line()
    for (const m of (d.transactionalEmails ?? []).slice(0,15)) {
      console.log(`  ${m.date} | ${(m.email||"").padEnd(32).slice(0,32)} | ${m.status}`)
    }
  } catch (e) { console.log(`  ⚠ emails hata: ${e.message}`) }
}

// ─── RESEND ─────────────────────────────────────────────────────────────
async function resend() {
  console.log("\n\n=== RESEND ===")
  if (!env.RESEND_API_KEY) { console.log("  ⚠ RESEND_API_KEY yok"); return }
  const H = { "Authorization": `Bearer ${env.RESEND_API_KEY}` }

  try {
    const r = await fetch("https://api.resend.com/emails?limit=100", { headers: H })
    const d = await r.json()
    if (!r.ok) { console.log(`  ⚠ list hata: ${r.status} ${JSON.stringify(d).slice(0,160)}`); return }
    const rows = d.data ?? []
    console.log(`\n  Listelenen kayıt: ${rows.length}`)
    line()
    const counts = {}
    for (const m of rows) {
      const st = m.last_event || "unknown"
      counts[st] = (counts[st]||0) + 1
    }
    totals.resendSent = rows.length
    totals.resendDelivered = counts["delivered"] ?? 0
    console.log("  Durum dağılımı:")
    for (const [k,v] of Object.entries(counts).sort((a,b)=>b[1]-a[1])) {
      console.log(`    ${k.padEnd(16)} : ${v}`)
    }
    console.log("\n  Son 15 mail:")
    line()
    for (const m of rows.slice(0,15)) {
      const to = Array.isArray(m.to) ? m.to[0] : m.to
      console.log(`  ${(m.created_at||"").slice(0,16)} | ${(to||"").padEnd(30).slice(0,30)} | ${m.last_event}`)
    }
  } catch (e) { console.log(`  ⚠ Resend hata: ${e.message}`) }
}

// ─── GA4 (email trafik funnel'ı) ────────────────────────────────────────
// Email linkleri utm_source=email & utm_medium=cold ile etiketli.
const PROPERTY_ID = "properties/539436083"
const DAYS = 90

function ga4Client() {
  const raw = env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON yok")
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(raw),
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  })
  return google.analyticsdata({ version: "v1beta", auth })
}
function startDate(d) { const x = new Date(); x.setDate(x.getDate()-d); return x.toISOString().slice(0,10) }
const m0 = (r,i=0) => parseInt(r?.metricValues?.[i]?.value ?? "0")
const d0 = (r,i=0) => r?.dimensionValues?.[i]?.value ?? ""

// email medium = "cold" (utm_medium). Source=email yedek filtre.
const emailFilter = {
  orGroup: { expressions: [
    { filter: { fieldName: "sessionMedium", stringFilter: { matchType: "EXACT", value: "cold" } } },
    { filter: { fieldName: "sessionSource", stringFilter: { matchType: "EXACT", value: "email" } } },
  ]}
}

let ga = null
async function ga4() {
  console.log("\n\n=== GA4 (email trafiği) ===")
  let analytics
  try { analytics = ga4Client() } catch (e) { console.log(`  ⚠ ${e.message}`); return }
  const range = [{ startDate: startDate(DAYS), endDate: "today" }]

  try {
    // Genel email trafiği
    const ov = (await analytics.properties.runReport({ property: PROPERTY_ID, requestBody: {
      dateRanges: range,
      metrics: [{name:"sessions"},{name:"totalUsers"},{name:"engagedSessions"},{name:"averageSessionDuration"},{name:"keyEvents"}],
      dimensionFilter: emailFilter,
    }})).data
    const r = ov.rows?.[0]
    ga = {
      sessions: m0(r,0), users: m0(r,1), engaged: m0(r,2),
      avgDur: r ? parseFloat(r.metricValues[3].value) : 0, keyEvents: m0(r,4),
    }
    console.log(`\n  Email kaynaklı site trafiği (son ${DAYS} gün)`)
    line()
    console.log(`  Oturum (sessions)      : ${ga.sessions}`)
    console.log(`  Kullanıcı (users)      : ${ga.users}`)
    console.log(`  Etkileşimli oturum     : ${ga.engaged}`)
    console.log(`  Ort. oturum süresi     : ${ga.avgDur.toFixed(0)} sn`)
    console.log(`  Key events (dönüşüm)   : ${ga.keyEvents}`)

    // Dönüşüm event kırılımı
    const ev = (await analytics.properties.runReport({ property: PROPERTY_ID, requestBody: {
      dateRanges: range,
      dimensions: [{name:"eventName"}],
      metrics: [{name:"eventCount"}],
      dimensionFilter: { andGroup: { expressions: [
        emailFilter,
        { filter: { fieldName:"eventName", inListFilter: { values: ["generate_lead","qualify_lead","contact","whatsapp_click","form_start","form_view"] } } },
      ]}},
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    }})).data
    console.log(`\n  Dönüşüm event'leri:`)
    line()
    if (!ev.rows?.length) console.log("    (email trafiğinden dönüşüm event'i yok)")
    for (const row of ev.rows ?? []) console.log(`    ${d0(row).padEnd(16)} : ${m0(row)}`)

    // Landing page kırılımı
    const lp = (await analytics.properties.runReport({ property: PROPERTY_ID, requestBody: {
      dateRanges: range,
      dimensions: [{name:"landingPagePlusQueryString"}],
      metrics: [{name:"sessions"}],
      dimensionFilter: emailFilter,
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: "8",
    }})).data
    console.log(`\n  En çok inilen sayfalar (email):`)
    line()
    for (const row of lp.rows ?? []) console.log(`    ${m0(row).toString().padStart(3)} | ${d0(row).slice(0,52)}`)
  } catch (e) { console.log(`  ⚠ GA4 hata: ${(e.message||"").slice(0,160)}`) }
}

// ─── BİRLEŞİK FUNNEL ─────────────────────────────────────────────────────
function funnel() {
  console.log("\n\n=== BİRLEŞİK FUNNEL (gönderim → site → dönüşüm) ===")
  const sent = totals.brevoSent + totals.resendSent
  const delivered = totals.brevoDelivered + totals.resendDelivered
  line(54)
  console.log(`  Gönderilen (Brevo+Resend) : ${sent}`)
  console.log(`  Teslim edilen             : ${delivered}  (${sent?(100*delivered/sent).toFixed(0):0}%)`)
  if (ga) {
    console.log(`  → Email→site oturumu      : ${ga.sessions}  (teslimin %${delivered?(100*ga.sessions/delivered).toFixed(1):0}'i)`)
    console.log(`  → Etkileşimli oturum      : ${ga.engaged}`)
    console.log(`  → Site dönüşümü (keyEvent): ${ga.keyEvents}`)
    if (ga.sessions) console.log(`  → Oturum→dönüşüm oranı    : ${(100*ga.keyEvents/ga.sessions).toFixed(1)}%`)
    if (sent) console.log(`  → Uçtan uca (gönderim→dönüşüm): ${(100*ga.keyEvents/sent).toFixed(2)}%`)
  } else {
    console.log("  (GA4 verisi alınamadı — funnel'ın site tarafı eksik)")
  }
  line(54)
}

await brevo()
await resend()
await ga4()
funnel()
console.log("")
