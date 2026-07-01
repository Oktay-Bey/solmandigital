/**
 * plan-batch2-openers.mjs
 * İkinci white-label batch havuzunu kurar: geçmişte white-label maili attığımız VE
 * mailimizi AÇAN/TIKLAYAN adresler. TR yerel lead'leri, bounce/exclude'ları ayıklar.
 * Çıktı: scripts/batch2-openers.json  (clicked öne sıralı)
 * NOT: gönderim YAPMAZ — yalnızca havuz + öncelik listesi üretir.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"

const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n")
  .filter(l=>l.includes("=")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(),l.slice(i+1).trim()]}))
const H = { "api-key": env.BREVO_API_KEY, "Accept":"application/json" }

// ── 1) Hariç tutulacaklar ──────────────────────────────────────────────
const HARD_EXCLUDE_DOMAINS = new Set(["305.nl","label305.nl"])   // "müşterimiz yok" yanıtı verdi (305.nl) + label305 olası aynı grup
const HARD_EXCLUDE_EMAILS  = new Set(["solmanoktay@gmail.com","harmankahv@gmail.com"])

// ── 2) White-label gönderim havuzu: SADECE white-label batch dosyaları ──
// leads-batch sınıflandırması (build script CAMPAIGN'lerinden + içerik kontrolü):
//   white-label : batch 5–18  (yabancı ajanslar)
//   TR yerel    : batch 1,2,3,4,19,20,21,22 (otel/klinik/güzellik/hukuk — hariç)
// Açan/tıklayan adresi yalnızca white-label batch'lerinde geçiyorsa havuza alınır.
// Bu, regex'e güvenmeden akkahotels.com / vividclinic.net gibi TR yerelleri eler.
const WL_BATCHES = [5,6,7,8,9,10,11,12,13,14,15,16,17,18]
const whiteLabelEmails = new Set()
for (const n of WL_BATCHES) {
  const f=`scripts/leads-batch-${n}.json`; if(!existsSync(f))continue
  try{ JSON.parse(readFileSync(f,"utf8")).forEach(m=>whiteLabelEmails.add(m.to.toLowerCase())) }catch{}
}
function isWhiteLabelAddr(email) {
  return whiteLabelEmails.has(email.toLowerCase())
}

// ── 3) Brevo'dan açan + tıklayan adresleri sayfalayarak çek ────────────
async function pull(event) {
  const out = new Map() // email -> son tarih
  for (let offset=0; offset<500; offset+=100) {
    const r = await fetch(`https://api.brevo.com/v3/smtp/statistics/events?limit=100&offset=${offset}&event=${event}&days=90`,{headers:H})
    if(!r.ok) break
    const d = await r.json(); const evs = d.events ?? []
    for (const e of evs) if(!out.has(e.email)) out.set(e.email, e.date)
    if (evs.length < 100) break
  }
  return out
}
const opened  = await pull("opened")
const clicked = await pull("clicks")

// ── 4) Bounce/hard-bounce adresleri çek → exclude ──────────────────────
const bounced = new Set()
for (const ev of ["hardBounces","softBounces"]) {
  for (let offset=0; offset<500; offset+=100) {
    const r = await fetch(`https://api.brevo.com/v3/smtp/statistics/events?limit=100&offset=${offset}&event=${ev}&days=90`,{headers:H})
    if(!r.ok) break
    const d = await r.json(); const evs=d.events??[]
    evs.forEach(e=>bounced.add(e.email.toLowerCase())); if(evs.length<100)break
  }
}

// ── 5) Havuzu kur ───────────────────────────────────────────────────────
function keep(email){
  const e=email.toLowerCase(), dom=e.split("@")[1]
  if (HARD_EXCLUDE_EMAILS.has(e)) return false
  if (HARD_EXCLUDE_DOMAINS.has(dom)) return false
  if (bounced.has(e)) return false
  if (!isWhiteLabelAddr(e)) return false   // TR yerel ele
  return true
}

const rows=[]
const seenDom=new Set()
// tıklayanlar önce (daha sıcak), sonra açanlar
for (const [src,map] of [["clicked",clicked],["opened",opened]]) {
  for (const [email,date] of map) {
    const e=email.toLowerCase(), dom=e.split("@")[1]
    if(!keep(e)) continue
    if(seenDom.has(dom)) continue       // domain başına 1
    seenDom.add(dom)
    rows.push({ email:e, domain:dom, signal:src, lastDate:date })
  }
}

writeFileSync("scripts/batch2-openers.json", JSON.stringify(rows,null,2))

// ── 6) Özet ─────────────────────────────────────────────────────────────
const clk = rows.filter(r=>r.signal==="clicked").length
console.log("=== İKİNCİ BATCH HAVUZU (white-label, açan/tıklayan) ===\n")
console.log(`Brevo açan (benzersiz)   : ${opened.size}`)
console.log(`Brevo tıklayan (benzersiz): ${clicked.size}`)
console.log(`Bounce (exclude)         : ${bounced.size}`)
console.log(`\nHavuz (TR yerel & exclude sonrası, domain-dedup): ${rows.length}`)
console.log(`  ↳ TIKLAYAN (sıcak, öncelik): ${clk}`)
console.log(`  ↳ açan (ılık)             : ${rows.length-clk}`)
console.log(`\nHard exclude: 305.nl (müşterisi yok yanıtı), test adresleri\n`)
console.log("── Öncelik (tıklayanlar) ──")
rows.filter(r=>r.signal==="clicked").forEach(r=>console.log(`  🔥 ${r.email}`))
console.log("\n── İkincil (açanlar, ilk 30) ──")
rows.filter(r=>r.signal==="opened").slice(0,30).forEach(r=>console.log(`  · ${r.email}`))
console.log("\n→ scripts/batch2-openers.json yazıldı (gönderim YAPILMADI)")
