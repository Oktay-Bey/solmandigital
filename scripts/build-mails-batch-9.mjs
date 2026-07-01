// FR + ES + IT + IE + PL ajansları — güçlendirilmiş şablon → scripts/leads-batch-9.json
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "eu-whitelabel-1"

// Bölgeye göre opening + close
const TONE = {
  FR: {
    opening: `We're looking to build white label partnerships with agencies in France. The model is simple: you win the client, we build the product — under your brand, with full confidentiality.`,
    close: `If you have projects where you need extra development capacity — or clients asking for Next.js, React or AI features you don't build in-house — that's exactly where we come in.`,
  },
  ES: {
    opening: `We're building white label partnerships with agencies across Europe. You bring the client, we deliver the build — under your brand, fully confidential, no strings.`,
    close: `If you ever turn down work because of capacity or stack gaps, we'd love to talk about how we can fill that gap for you.`,
  },
  IT: {
    opening: `We partner with agencies as a white label development team. You keep the client relationship, we build the product — under your brand, with signed NDA and full confidentiality.`,
    close: `If there are briefs you can't take on because of capacity or stack, we can help. Happy to jump on a quick call or a WhatsApp chat.`,
  },
  IE: {
    opening: `We're a development office in Istanbul building white label partnerships with agencies across Europe and the UK. You win the brief, we build — under your brand, invisible to your client.`,
    close: `If capacity or tech stack gaps have ever cost you a brief, that's the gap we fill. Drop us a line or message us on WhatsApp.`,
  },
  PL: {
    opening: `We build white label development partnerships with agencies across Europe. You handle the client, we handle the build — under your brand, NDA-covered, no client-facing contact.`,
    close: `If you're working around capacity or stack constraints, we'd love to explore how we can help. Feel free to reply or reach out on WhatsApp.`,
  },
  PT: {
    opening: `We're building white label partnerships with agencies in Europe. You bring the client, we deliver the product — under your brand, fully confidential.`,
    close: `If there's a brief you'd like to discuss, reply to this email or message us on WhatsApp — whichever is easier.`,
  },
}

const STACK = `Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS`
const TIMEZONE = `UTC+3 (Istanbul) — 1–2h overlap with Central Europe. Typical project: 4–8 weeks.`

const leads = [
  // France
  { slug: "locomotive",      to: "hello@locomotive.agency",    agencyName: "Locomotive",        city: "Paris",       country: "FR" },
  { slug: "area17",          to: "hello@area17.com",           agencyName: "AREA 17",           city: "Paris",       country: "FR" },
  { slug: "antistatique",    to: "hello@antistatique.net",     agencyName: "Antistatique",      city: "Paris",       country: "FR" },
  { slug: "buzzman",         to: "contact@buzzman.fr",         agencyName: "Buzzman",           city: "Paris",       country: "FR" },
  { slug: "cher-ami",        to: "hello@cher-ami.fr",          agencyName: "Cher Ami",          city: "Paris",       country: "FR" },
  { slug: "soleil-noir",     to: "contact@soleilnoir.net",     agencyName: "Soleil Noir",       city: "Paris",       country: "FR" },
  { slug: "les-digital",     to: "hello@les.digital",          agencyName: "Les Digital",       city: "Paris",       country: "FR" },
  { slug: "makeme",          to: "hello@makeme.agency",        agencyName: "Makeme",            city: "Paris",       country: "FR" },
  { slug: "dagobert",        to: "hello@dagobert.agency",      agencyName: "Dagobert",          city: "Paris",       country: "FR" },
  { slug: "wunderman-fr",    to: "contact@wundermanthompson.fr", agencyName: "Wunderman Thompson FR", city: "Paris", country: "FR" },

  // Spain
  { slug: "savia",           to: "hello@savia.co",             agencyName: "Savia",             city: "Madrid",      country: "ES" },
  { slug: "manifiesto",      to: "hola@manifiesto.agency",     agencyName: "Manifiesto",        city: "Madrid",      country: "ES" },
  { slug: "domestika",       to: "hello@domestika.org",        agencyName: "Domestika",         city: "Madrid",      country: "ES" },
  { slug: "clapp",           to: "hello@clapp.agency",         agencyName: "Clapp Agency",      city: "Madrid",      country: "ES" },
  { slug: "genesis",         to: "hola@genesis.agency",        agencyName: "Genesis Agency",    city: "Barcelona",   country: "ES" },
  { slug: "multiplica",      to: "hello@multiplica.com",       agencyName: "Multiplica",        city: "Barcelona",   country: "ES" },
  { slug: "wam",             to: "hello@wam.agency",           agencyName: "WAM Agency",        city: "Barcelona",   country: "ES" },
  { slug: "appcivico",       to: "hello@appcivico.com",        agencyName: "AppCivico",         city: "Barcelona",   country: "ES" },

  // Italy
  { slug: "cheil-italy",     to: "info@cheil.com",             agencyName: "Cheil Italy",       city: "Milan",       country: "IT" },
  { slug: "caffeina",        to: "hello@caffeina.com",         agencyName: "Caffeina",          city: "Parma",       country: "IT" },
  { slug: "isobar-it",       to: "info@isobar.com",            agencyName: "Isobar Italy",      city: "Milan",       country: "IT" },
  { slug: "stamplay",        to: "hello@stamplay.com",         agencyName: "Stamplay",          city: "Rome",        country: "IT" },
  { slug: "webranking",      to: "info@webranking.it",         agencyName: "Webranking",        city: "Milan",       country: "IT" },
  { slug: "inarea",          to: "info@inarea.com",            agencyName: "Inarea",            city: "Rome",        country: "IT" },
  { slug: "beintoo",         to: "info@beintoo.com",           agencyName: "Beintoo",           city: "Milan",       country: "IT" },

  // Ireland
  { slug: "rothco",          to: "hello@rothco.ie",            agencyName: "Rothco",            city: "Dublin",      country: "IE" },
  { slug: "boys-and-girls",  to: "hello@boysandgirls.ie",      agencyName: "Boys+Girls",        city: "Dublin",      country: "IE" },
  { slug: "zinc",            to: "hello@zinc.ie",              agencyName: "Zinc",              city: "Dublin",      country: "IE" },
  { slug: "cawley-nea",      to: "info@cawleynea.ie",          agencyName: "Cawley Nea",        city: "Dublin",      country: "IE" },
  { slug: "javelin",         to: "hello@javelin.ie",           agencyName: "Javelin",           city: "Dublin",      country: "IE" },
  { slug: "core-ie",         to: "hello@coreoptimisation.com", agencyName: "Core",              city: "Dublin",      country: "IE" },

  // Poland
  { slug: "boldare",         to: "hello@boldare.com",          agencyName: "Boldare",           city: "Warsaw",      country: "PL" },
  { slug: "netguru",         to: "hello@netguru.com",          agencyName: "Netguru",           city: "Poznań",      country: "PL" },
  { slug: "snowdog",         to: "hello@snow.dog",             agencyName: "Snowdog",           city: "Poznań",      country: "PL" },
  { slug: "pragmatic-coders", to: "hello@pragmaticcoders.com", agencyName: "Pragmatic Coders", city: "Warsaw",      country: "PL" },
  { slug: "merixstudio",     to: "hello@merixstudio.com",      agencyName: "Merixstudio",       city: "Poznań",      country: "PL" },
  { slug: "software-house",  to: "hello@softwarehouse.io",     agencyName: "Software House",    city: "Katowice",    country: "PL" },

  // Portugal
  { slug: "pixelmatters",    to: "hello@pixelmatters.com",     agencyName: "Pixelmatters",      city: "Porto",       country: "PT" },
  { slug: "subvisual",       to: "hello@subvisual.com",        agencyName: "Subvisual",         city: "Braga",       country: "PT" },
  { slug: "significa",       to: "hello@significa.co",         agencyName: "Significa",         city: "Porto",       country: "PT" },
  { slug: "impossible",      to: "hello@impossible.pt",        agencyName: "Impossible",        city: "Lisbon",      country: "PT" },
]

// Suppress + dedup
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevSent = ["5","6","7","8"].flatMap(n => {
  try { return JSON.parse(readFileSync(`scripts/leads-batch-${n}.json`, "utf8")).map(m => m.to.toLowerCase()) } catch { return [] }
})
const skipSet = new Set([...suppress, ...prevSent])
const seen = new Set()
const messages = []

for (const l of leads) {
  const email = l.to.toLowerCase()
  if (skipSet.has(email)) { console.log(`SKIP: ${email}`); continue }
  if (seen.has(email)) continue
  seen.add(email)

  const tone = TONE[l.country] ?? TONE.FR
  const ctaUrl = `https://solmandigital.com.tr/en/white-label?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${l.slug}`
  const waText = `Hi, I received your email about white label partnership and I'd like to learn more. (Ref: ${l.slug})`
  const waUrl = `https://wa.me/905439675250?text=${encodeURIComponent(waText)}`

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
<div style="background:#0d0d0d;padding:20px 32px;display:flex;align-items:baseline;gap:6px">
  <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></span>
  <span style="color:#666;font-size:12px;margin-left:8px">White Label Partner · Istanbul</span>
</div>
<div style="padding:32px">
  <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111">White Label Partnership</p>
  <p style="margin:0 0 20px;font-size:12px;color:#9b1c1c;font-weight:600;text-transform:uppercase;letter-spacing:.06em">for ${l.agencyName}</p>

  <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">${tone.opening}</p>

  <div style="background:#f9f9f9;border-left:3px solid #9b1c1c;padding:14px 18px;border-radius:0 6px 6px 0;margin:0 0 18px">
    <p style="margin:0;font-size:13px;color:#555;line-height:1.8">
      ↗ Scale without hiring — no overhead when quiet<br>
      ↗ Add Next.js, React &amp; AI features without building in-house<br>
      ↗ Fixed pricing · NDA-covered · ${TIMEZONE}
    </p>
  </div>

  <p style="margin:0 0 20px;font-size:13px;color:#888;line-height:1.6"><strong style="color:#555">Stack:</strong> ${STACK}</p>

  <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7">${tone.close}</p>

  <table cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>
    <td style="padding-right:8px"><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">Schedule a Call</a></td>
    <td><a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">💬 WhatsApp</a></td>
  </tr></table>

  <p style="margin:0;font-size:12px;color:#aaa">Or reply — you'll reach the person doing the work.</p>
</div>
<div style="background:#f5f5f5;padding:14px 32px;border-top:1px solid #e5e5e5">
  <p style="margin:0;font-size:11px;color:#bbb">Solman Digital · Istanbul · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · <a href="mailto:info@solmandigital.com.tr?subject=Unsubscribe" style="color:#bbb">unsubscribe</a></p>
</div>
</div>`

  const text = `White Label Partnership — ${l.agencyName}

${tone.opening}

↗ Scale without hiring — no overhead when quiet
↗ Add Next.js, React & AI features without building in-house
↗ Fixed pricing · NDA-covered · ${TIMEZONE}

Stack: ${STACK}

${tone.close}

Schedule a call: ${ctaUrl}
WhatsApp: ${waUrl}

Or just reply — you'll reach the person doing the work.

---
Solman Digital · Istanbul · solmandigital.com.tr
Unsubscribe: info@solmandigital.com.tr`

  messages.push({
    to: l.to,
    subject: `White label partnership — development capacity for ${l.agencyName}`,
    html,
    text,
  })
}

writeFileSync("scripts/leads-batch-9.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-9.json`)
for (const m of messages) console.log(` - ${m.to}`)
