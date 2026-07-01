/**
 * send-resend-today.mjs
 * Kalan 100 Resend kotasını doldurur.
 * Dinamik dedup: tüm mevcut batch dosyalarını tarar (1-99).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)
const RESEND_KEY  = env.RESEND_API_KEY
const RESEND_LIMIT = 100
const DELAY_MS    = 400

// ─── NEW CANDIDATES (batches 1-17 ile örtüşmeyen) ────────────────────────
const CANDIDATES = [
  // UK — more cities / studios not yet hit
  { slug:"absolute-agency",  to:"hello@absolute.agency",           agencyName:"Absolute",             city:"London",      country:"UK" },
  { slug:"blue-array",        to:"hello@bluearray.co.uk",           agencyName:"Blue Array",           city:"Reading",     country:"UK" },
  { slug:"candid-sky",        to:"hello@candidsky.com",             agencyName:"Candid Sky",           city:"London",      country:"UK" },
  { slug:"cartrawler",        to:"hello@digital.cartrawler.com",    agencyName:"CarTrawler Digital",   city:"Dublin",      country:"IE" },
  { slug:"church-agency",     to:"hello@churchagency.co.uk",        agencyName:"Church Agency",        city:"Bristol",     country:"UK" },
  { slug:"create8",           to:"hello@create8.co.uk",             agencyName:"Create8",              city:"Liverpool",   country:"UK" },
  { slug:"csg",               to:"hello@csg.co.uk",                 agencyName:"CSG",                  city:"London",      country:"UK" },
  { slug:"datify",            to:"hello@datify.co.uk",              agencyName:"Datify",               city:"Manchester",  country:"UK" },
  { slug:"digital-bond",      to:"hello@digitalbond.co.uk",         agencyName:"Digital Bond",         city:"Leeds",       country:"UK" },
  { slug:"don-t-panic",       to:"hello@dontpanic.uk.com",          agencyName:"Don't Panic",          city:"London",      country:"UK" },
  { slug:"fishtank",          to:"hello@fishtank.co.uk",            agencyName:"Fishtank",             city:"London",      country:"UK" },
  { slug:"freelancer-uk",     to:"info@freelancer.co.uk",           agencyName:"Freelancer UK",        city:"London",      country:"UK" },
  { slug:"gusto",             to:"hello@gustodigital.co.uk",        agencyName:"Gusto",                city:"Manchester",  country:"UK" },
  { slug:"hive",              to:"hello@hiveagency.co.uk",          agencyName:"Hive",                 city:"London",      country:"UK" },
  { slug:"journey",           to:"hello@journeyagency.co.uk",       agencyName:"Journey",              city:"Exeter",      country:"UK" },
  { slug:"loop-uk",           to:"hello@loop-agency.co.uk",         agencyName:"Loop",                 city:"London",      country:"UK" },
  { slug:"more-than-words",   to:"hello@morethanwordsuk.co.uk",     agencyName:"More than Words",      city:"London",      country:"UK" },
  { slug:"netcel",            to:"hello@netcel.com",                agencyName:"Netcel",               city:"London",      country:"UK" },
  { slug:"ocl",               to:"hello@ocl.agency",                agencyName:"OCL Agency",           city:"Birmingham",  country:"UK" },
  { slug:"onyx-digital",      to:"hello@onyxdigital.co.uk",         agencyName:"Onyx Digital",         city:"London",      country:"UK" },
  { slug:"purple-wifi",       to:"hello@purple.ai",                 agencyName:"Purple",               city:"Manchester",  country:"UK" },
  { slug:"reason-digital",    to:"hello@reasondigital.com",         agencyName:"Reason Digital",       city:"Manchester",  country:"UK" },
  { slug:"rooster-punk",      to:"hello@roosterpunk.com",           agencyName:"Rooster Punk",         city:"Manchester",  country:"UK" },
  { slug:"so-uk",             to:"hello@so.agency",                 agencyName:"SO Agency",            city:"London",      country:"UK" },
  { slug:"spindogs",          to:"hello@spindogs.co.uk",            agencyName:"Spindogs",             city:"Cardiff",     country:"UK" },
  { slug:"studio-then",       to:"hello@thenandnow.uk",             agencyName:"Then and Now",         city:"London",      country:"UK" },
  { slug:"together-agency",   to:"hello@together.agency",           agencyName:"Together Agency",      city:"Manchester",  country:"UK" },
  { slug:"upperdog",          to:"hello@upperdog.co.uk",            agencyName:"Upperdog",             city:"Portsmouth",  country:"UK" },
  { slug:"verb-brands",       to:"hello@verbbrands.com",            agencyName:"Verb Brands",          city:"London",      country:"UK" },
  { slug:"wcreate",           to:"hello@wcreate.co.uk",             agencyName:"Wcreate",              city:"London",      country:"UK" },
  // NL — fresh
  { slug:"e-mergo",           to:"info@e-mergo.nl",                 agencyName:"e-Mergo",              city:"Eindhoven",   country:"NL" },
  { slug:"freshheads",        to:"info@freshheads.com",             agencyName:"Freshheads",           city:"Tilburg",     country:"NL" },
  { slug:"ict-groep",         to:"info@ictgroup.nl",                agencyName:"ICT Group",            city:"Rotterdam",   country:"NL" },
  { slug:"lifehunt",          to:"info@lifehunt.nl",                agencyName:"Lifehunt",             city:"Amsterdam",   country:"NL" },
  { slug:"procurios",         to:"info@procurios.nl",               agencyName:"Procurios",            city:"Barneveld",   country:"NL" },
  { slug:"whello",            to:"info@whello.nl",                  agencyName:"Whello",               city:"Amsterdam",   country:"NL" },
  { slug:"xsarus",            to:"info@xsarus.nl",                  agencyName:"Xsarus",               city:"Veendam",     country:"NL" },
  { slug:"yard",              to:"info@yard.nl",                    agencyName:"Yard",                 city:"Amsterdam",   country:"NL" },
  // DE — fresh
  { slug:"bb-hamburg",        to:"info@bb-hamburg.de",              agencyName:"BB Hamburg",           city:"Hamburg",     country:"DE" },
  { slug:"denkwerk",          to:"info@denkwerk.com",               agencyName:"Denkwerk",             city:"Cologne",     country:"DE" },
  { slug:"isobar-de",         to:"info@isobar.de",                  agencyName:"Isobar DE",            city:"Berlin",      country:"DE" },
  { slug:"kms-team",          to:"info@kms-team.de",                agencyName:"KMS Team",             city:"Munich",      country:"DE" },
  { slug:"made-de",           to:"info@made.de",                    agencyName:"Made",                 city:"Cologne",     country:"DE" },
  { slug:"meso",              to:"info@meso.net",                   agencyName:"Meso",                 city:"Frankfurt",   country:"DE" },
  { slug:"ray-agency",        to:"info@rayagency.de",               agencyName:"Ray Agency",           city:"Berlin",      country:"DE" },
  { slug:"reply-de",          to:"info@reply.com",                  agencyName:"Reply DE",             city:"Munich",      country:"DE" },
  { slug:"zeroseven",         to:"info@zeroseven.de",               agencyName:"Zeroseven",            city:"Hamburg",     country:"DE" },
  // AT — fresh
  { slug:"burstsms",          to:"info@burst.at",                   agencyName:"Burst",                city:"Vienna",      country:"AT" },
  { slug:"idearaum",          to:"info@idearaum.at",                agencyName:"Idearaum",             city:"Vienna",      country:"AT" },
  { slug:"loopline",          to:"info@loopline.com",               agencyName:"Loopline",             city:"Vienna",      country:"AT" },
  { slug:"rise",              to:"info@rise.at",                    agencyName:"Rise",                 city:"Vienna",      country:"AT" },
  // SE — fresh
  { slug:"acne-se",           to:"info@acnestudios.com",            agencyName:"Acne Studios",         city:"Stockholm",   country:"SE" },
  { slug:"forsman-bodenfors", to:"info@fb.se",                      agencyName:"Forsman & Bodenfors",  city:"Gothenburg",  country:"SE" },
  { slug:"pond",              to:"info@pond.se",                    agencyName:"Pond",                 city:"Stockholm",   country:"SE" },
  { slug:"r-agency",          to:"info@ragency.se",                 agencyName:"R Agency",             city:"Stockholm",   country:"SE" },
  // NO — fresh
  { slug:"anti",              to:"info@anti.as",                    agencyName:"Anti",                 city:"Oslo",        country:"NO" },
  { slug:"try",               to:"info@try.no",                     agencyName:"Try",                  city:"Oslo",        country:"NO" },
  { slug:"new-context",       to:"info@newcontext.no",              agencyName:"New Context",          city:"Oslo",        country:"NO" },
  // DK — fresh
  { slug:"advice",            to:"info@advicedigital.dk",           agencyName:"Advice Digital",       city:"Copenhagen",  country:"DK" },
  { slug:"impact",            to:"info@impact.dk",                  agencyName:"Impact",               city:"Aarhus",      country:"DK" },
  { slug:"resonance",         to:"info@resonance.dk",               agencyName:"Resonance",            city:"Copenhagen",  country:"DK" },
  // FI — fresh
  { slug:"nitro",             to:"info@nitro.fi",                   agencyName:"Nitro",                city:"Helsinki",    country:"FI" },
  { slug:"born",              to:"info@born.fi",                    agencyName:"Born",                 city:"Helsinki",    country:"FI" },
  { slug:"saas-fe",           to:"info@saasfe.com",                 agencyName:"SaaS FE",              city:"Helsinki",    country:"FI" },
  // CZ / SK — fresh
  { slug:"made-cz",           to:"info@made.cz",                    agencyName:"Made",                 city:"Prague",      country:"CZ" },
  { slug:"2fresh",            to:"info@2fresh.com",                 agencyName:"2Fresh",               city:"Prague",      country:"CZ" },
  { slug:"bart-sk2",          to:"hello@bart.sk",                   agencyName:"Bart SK",              city:"Bratislava",  country:"SK" },
  { slug:"riesenia",          to:"info@riesenia.com",               agencyName:"Riesenia",             city:"Bratislava",  country:"SK" },
  // HU — fresh
  { slug:"hiflylabs",         to:"info@hiflylabs.com",              agencyName:"Hiflylabs",            city:"Budapest",    country:"HU" },
  { slug:"indito",            to:"info@indito.com",                 agencyName:"Indito",               city:"Budapest",    country:"HU" },
  { slug:"loxon",             to:"info@loxon.eu",                   agencyName:"Loxon",                city:"Budapest",    country:"HU" },
  // BE — fresh
  { slug:"hive-be",           to:"info@hive.be",                    agencyName:"Hive",                 city:"Brussels",    country:"BE" },
  { slug:"mortierbrigade",    to:"info@mortierbrigade.com",         agencyName:"Mortierbrigade",       city:"Brussels",    country:"BE" },
  { slug:"ping",              to:"info@ping.be",                    agencyName:"Ping",                 city:"Brussels",    country:"BE" },
  { slug:"takeaway-be",       to:"info@takeaway.be",                agencyName:"Takeaway",             city:"Ghent",       country:"BE" },
  { slug:"wolf-gent",         to:"hello@wolf.be",                   agencyName:"Wolf",                 city:"Ghent",       country:"BE" },
]

// ─── DYNAMIC DEDUP ────────────────────────────────────────────────────────
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const sentEmails  = new Set(suppress)
const sentDomains = new Set()

for (let n = 1; n <= 99; n++) {
  const path = `scripts/leads-batch-${n}.json`
  if (!existsSync(path)) continue
  try {
    JSON.parse(readFileSync(path, "utf8")).forEach(m => {
      sentEmails.add(m.to.toLowerCase())
      sentDomains.add(m.to.toLowerCase().split("@")[1])
    })
  } catch {}
}

const deduped = []
const seen = new Set()
for (const l of CANDIDATES) {
  const email = l.to.toLowerCase()
  const domain = email.split("@")[1]
  if (sentEmails.has(email) || sentDomains.has(domain) || seen.has(domain)) continue
  seen.add(domain)
  deduped.push(l)
}

console.log(`📋 ${deduped.length} unique leads (Resend)\n`)

// ─── V4 TEMPLATE ─────────────────────────────────────────────────────────
const STACK = "Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS"
const CAMPAIGN = "eu-whitelabel-4"

const tz = (c) => {
  if (c === "UK") return "UTC+3 — 2h overlap with UK mornings, async all day."
  if (["SE","NO","DK","FI"].includes(c)) return "UTC+3 — 2h overlap with Nordic mornings, async all day."
  return "UTC+3 — 2h overlap with Western European mornings, async all day."
}

function buildMail(l) {
  const ctaUrl = `https://solmandigital.com.tr/en/white-label?utm_source=email&utm_medium=cold&utm_campaign=${CAMPAIGN}&utm_content=${l.slug}`
  const waText = `Hi, I received your email about white label partnership and I'd like to learn more. (Ref: ${l.slug})`
  const waUrl  = `https://wa.me/905439675250?text=${encodeURIComponent(waText)}`

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
<div style="background:#0d0d0d;padding:20px 32px">
  <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></span>
  <span style="color:#666;font-size:12px;margin-left:8px">White Label Partner · Istanbul</span>
</div>
<div style="padding:32px">
  <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111">White Label Partnership</p>
  <p style="margin:0 0 20px;font-size:12px;color:#9b1c1c;font-weight:600;text-transform:uppercase;letter-spacing:.06em">for ${l.agencyName}</p>
  <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships. You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.</p>
  <div style="background:#f9f9f9;border-left:3px solid #9b1c1c;padding:14px 18px;border-radius:0 6px 6px 0;margin:0 0 18px">
    <p style="margin:0;font-size:13px;color:#555;line-height:1.9">
      ↗ Scale without hiring — no overhead when briefs slow down<br>
      ↗ Add Next.js, React &amp; AI features your clients ask for without building in-house<br>
      ↗ No long-term commitment — start with one project to test the fit
    </p>
  </div>
  <p style="margin:0 0 18px;font-size:13px;color:#888;line-height:1.6"><strong style="color:#555">Stack:</strong> ${STACK}<br><strong style="color:#555">Timezone:</strong> ${tz(l.country)}</p>
  <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7">We've delivered Next.js platforms, SaaS dashboards, and AI-powered builds for agencies across Europe. If there's a fit, a 15-minute intro is all it takes.</p>
  <table cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>
    <td style="padding-right:8px"><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">Book 15-min Intro</a></td>
    <td><a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">💬 WhatsApp</a></td>
  </tr></table>
  <p style="margin:0;font-size:12px;color:#aaa">Or just reply — you'll reach the person doing the work. If the timing isn't right, a quick "not now" works too.</p>
</div>
<div style="background:#f5f5f5;padding:14px 32px;border-top:1px solid #e5e5e5">
  <p style="margin:0;font-size:11px;color:#bbb">Solman Digital · Istanbul · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · <a href="mailto:info@solmandigital.com.tr?subject=Unsubscribe" style="color:#bbb">unsubscribe</a></p>
</div>
</div>`

  const text = `White Label Partnership — ${l.agencyName}

We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships. You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.

↗ Scale without hiring — no overhead when briefs slow down
↗ Add Next.js, React & AI features your clients ask for without building in-house
↗ No long-term commitment — start with one project to test the fit

Stack: ${STACK}
Timezone: ${tz(l.country)}

We've delivered Next.js platforms, SaaS dashboards, and AI-powered builds for agencies across Europe. If there's a fit, a 15-minute intro is all it takes.

Book a 15-min intro: ${ctaUrl}
WhatsApp: ${waUrl}

Or just reply. If the timing isn't right, a quick "not now" works too.

---
Solman Digital · Istanbul · solmandigital.com.tr
Unsubscribe: info@solmandigital.com.tr`

  return { to: l.to, subject: `White label partnership — development capacity for ${l.agencyName}`, html, text }
}

// ─── SEND VIA RESEND ─────────────────────────────────────────────────────
async function sendResend(mail) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Solman Digital <info@solmandigital.com.tr>",
      to: [mail.to],
      reply_to: "info@solmandigital.com.tr",
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    })
  })
  const body = await r.json().catch(() => ({}))
  return { status: r.status, id: body.id }
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── MAIN ─────────────────────────────────────────────────────────────────
const toSend = deduped.slice(0, RESEND_LIMIT)
const mails  = toSend.map(buildMail)

// Save batch file
let batchNum = 18
while (existsSync(`scripts/leads-batch-${batchNum}.json`)) batchNum++
writeFileSync(`scripts/leads-batch-${batchNum}.json`, JSON.stringify(mails, null, 2))

console.log(`📤 Sending via Resend — batch ${batchNum} (${mails.length} mails)...\n`)
let ok = 0, err = 0
for (let i = 0; i < mails.length; i++) {
  const { status, id } = await sendResend(mails[i])
  const success = status >= 200 && status < 300
  success ? ok++ : err++
  console.log(`  ${success ? "✓" : "✗"} [${i+1}/${mails.length}] ${mails[i].to} (${status})`)
  if (i < mails.length - 1) await sleep(DELAY_MS)
}

console.log(`\n🎯 Resend batch ${batchNum}: ${ok} sent, ${err} errors`)
console.log(`   Campaign: ${CAMPAIGN}`)
