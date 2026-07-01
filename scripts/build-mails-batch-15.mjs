// NL+BE+LU+UK batch 15 — info@ pattern, MX-verified, domain-level dedup
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "bnlx-whitelabel-3"
const STACK = `Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS`
const TIMEZONE = `UTC+3 (Istanbul) — 2h overlap with Western European mornings, async delivery throughout the day.`

// MX-verified candidates (61 passed MX check)
const leads = [
  // ── Netherlands ──────────────────────────────────────────────────────────
  { slug:"jungle-minds",   to:"info@jungleminds.nl",       agencyName:"Jungle Minds",        city:"Amsterdam",  country:"NL" },
  { slug:"iquality",       to:"info@iquality.nl",           agencyName:"Iquality",            city:"Nijmegen",   country:"NL" },
  { slug:"colours",        to:"info@colours.nl",            agencyName:"Colours",             city:"Amsterdam",  country:"NL" },
  { slug:"matise",         to:"info@matise.nl",             agencyName:"Matise",              city:"Amsterdam",  country:"NL" },
  { slug:"byte",           to:"info@byte.nl",               agencyName:"Byte",                city:"Tilburg",    country:"NL" },
  { slug:"incentro",       to:"info@incentro.com",          agencyName:"Incentro",            city:"Amsterdam",  country:"NL" },
  { slug:"kaliber",        to:"info@kaliber.nl",            agencyName:"Kaliber",             city:"Amsterdam",  country:"NL" },
  { slug:"icemobile",      to:"info@icemobile.com",         agencyName:"Icemobile",           city:"Amsterdam",  country:"NL" },
  { slug:"tamtam",         to:"info@tamtam.nl",             agencyName:"Tam Tam",             city:"Amsterdam",  country:"NL" },
  { slug:"dept",           to:"info@deptagency.com",        agencyName:"Dept",                city:"Amsterdam",  country:"NL" },
  { slug:"ijsfontein",     to:"info@ijsfontein.nl",         agencyName:"IJsfontein",          city:"Amsterdam",  country:"NL" },
  { slug:"oberon",         to:"info@oberon.nl",             agencyName:"Oberon",              city:"Utrecht",    country:"NL" },
  { slug:"sping",          to:"info@sping.nl",              agencyName:"Sping",               city:"Amsterdam",  country:"NL" },
  { slug:"hike-one",       to:"info@hike.one",              agencyName:"Hike One",            city:"Amsterdam",  country:"NL" },
  { slug:"finalist",       to:"info@finalist.nl",           agencyName:"Finalist",            city:"Amsterdam",  country:"NL" },
  { slug:"redkiwi",        to:"info@redkiwi.nl",            agencyName:"Redkiwi",             city:"Breda",      country:"NL" },
  { slug:"orangevalley",   to:"info@orangevalley.nl",       agencyName:"Orangevalley",        city:"Eindhoven",  country:"NL" },
  { slug:"mirabeau",       to:"hello@mirabeau.nl",          agencyName:"Mirabeau",            city:"Amsterdam",  country:"NL" },
  { slug:"wesp",           to:"info@wesp.nl",               agencyName:"WESP",                city:"Amsterdam",  country:"NL" },
  { slug:"keen-nl",        to:"hello@keen.nl",              agencyName:"Keen",                city:"Amsterdam",  country:"NL" },
  { slug:"pixelperfect",   to:"info@pixelperfect.nl",       agencyName:"Pixelperfect",        city:"Amsterdam",  country:"NL" },
  { slug:"positive",       to:"info@positive.nl",           agencyName:"Positive",            city:"Amsterdam",  country:"NL" },
  { slug:"woodies",        to:"info@woodies.nl",            agencyName:"Woodies",             city:"Amsterdam",  country:"NL" },
  { slug:"bakken",         to:"hello@bakkenbaeck.com",      agencyName:"Bakken & Baeck",      city:"Amsterdam",  country:"NL" },
  // ── Belgium ──────────────────────────────────────────────────────────────
  { slug:"wijs",           to:"info@wijs.be",               agencyName:"Wijs",                city:"Ghent",      country:"BE" },
  { slug:"inthepocket",    to:"info@inthepocket.com",       agencyName:"In The Pocket",       city:"Ghent",      country:"BE" },
  { slug:"esign",          to:"info@esign.eu",              agencyName:"Esign",               city:"Ghent",      country:"BE" },
  { slug:"endeavour",      to:"info@endeavour.be",          agencyName:"Endeavour",           city:"Bruges",     country:"BE" },
  { slug:"invisiblepuppy", to:"info@invisiblepuppy.be",     agencyName:"Invisible Puppy",     city:"Antwerp",    country:"BE" },
  { slug:"two-kind",       to:"info@twoofakind.be",         agencyName:"Two of a Kind",       city:"Antwerp",    country:"BE" },
  { slug:"leap",           to:"info@leapforward.be",        agencyName:"Leap Forward",        city:"Brussels",   country:"BE" },
  { slug:"addestino",      to:"info@addestino.be",          agencyName:"Addestino",           city:"Brussels",   country:"BE" },
  { slug:"netopia",        to:"info@netopia.be",            agencyName:"Netopia",             city:"Brussels",   country:"BE" },
  { slug:"multiply",       to:"info@multiply.be",           agencyName:"Multiply",            city:"Brussels",   country:"BE" },
  { slug:"craftsmen",      to:"info@craftsmen.be",          agencyName:"Craftsmen",           city:"Ghent",      country:"BE" },
  { slug:"joyn",           to:"info@joyn.be",               agencyName:"Joyn",                city:"Antwerp",    country:"BE" },
  { slug:"wolf-be",        to:"info@wolf.be",               agencyName:"Wolf",                city:"Ghent",      country:"BE" },
  { slug:"emakina",        to:"info@emakina.com",           agencyName:"Emakina",             city:"Brussels",   country:"BE" },
  { slug:"soroban",        to:"info@soroban.be",            agencyName:"Soroban",             city:"Brussels",   country:"BE" },
  { slug:"archie",         to:"info@archie.be",             agencyName:"Archie",              city:"Ghent",      country:"BE" },
  { slug:"rooftop",        to:"info@rooftop.be",            agencyName:"Rooftop",             city:"Brussels",   country:"BE" },
  { slug:"spatie",         to:"info@spatie.be",             agencyName:"Spatie",              city:"Antwerp",    country:"BE" },
  // ── Luxembourg ───────────────────────────────────────────────────────────
  { slug:"propel-lu",      to:"hello@propel.lu",            agencyName:"Propel",              city:"Luxembourg", country:"LU" },
  { slug:"codex-lu",       to:"info@codex.lu",              agencyName:"Codex",               city:"Luxembourg", country:"LU" },
  // ── UK (new cities + info@ for improved deliverability) ──────────────────
  { slug:"whitespace",     to:"info@whitespace.co.uk",      agencyName:"Whitespace",          city:"Edinburgh",  country:"UK" },
  { slug:"equator",        to:"info@equator.agency",        agencyName:"Equator",             city:"Glasgow",    country:"UK" },
  { slug:"digital-six",    to:"info@digitalsix.co.uk",      agencyName:"Digital Six",         city:"Glasgow",    country:"UK" },
  { slug:"cantarus",       to:"hello@cantarus.com",         agencyName:"Cantarus",            city:"Manchester", country:"UK" },
  { slug:"clicky",         to:"hello@clickymedia.co.uk",    agencyName:"Clicky",              city:"York",       country:"UK" },
  { slug:"blue-frontier",  to:"hello@bluefrontier.co.uk",   agencyName:"Blue Frontier",       city:"Worthing",   country:"UK" },
  { slug:"sookio",         to:"hello@sookio.com",           agencyName:"Sookio",              city:"Cambridge",  country:"UK" },
  { slug:"make-agency",    to:"hello@make.agency",          agencyName:"Make Agency",         city:"Birmingham", country:"UK" },
  { slug:"fat-media",      to:"info@fatmedia.co.uk",        agencyName:"Fat Media",           city:"Lancaster",  country:"UK" },
  { slug:"fresh-egg",      to:"hello@freshegg.com",         agencyName:"Fresh Egg",           city:"Worthing",   country:"UK" },
  { slug:"impression",     to:"info@impressiondigital.com", agencyName:"Impression Digital",  city:"Nottingham", country:"UK" },
  { slug:"proctors",       to:"hello@proctors.co.uk",       agencyName:"Proctors",            city:"Newcastle",  country:"UK" },
  { slug:"studio-republic",to:"info@studiorepublic.co.uk",  agencyName:"Studio Republic",     city:"Winchester", country:"UK" },
  { slug:"sequence",       to:"hello@sequence.co.uk",       agencyName:"Sequence",            city:"London",     country:"UK" },
  { slug:"twenty-first",   to:"hello@twentyfirstdigital.co.uk", agencyName:"Twenty First Digital", city:"Manchester", country:"UK" },
  { slug:"journey-further",to:"hello@journeyfurther.com",   agencyName:"Journey Further",     city:"Leeds",      country:"UK" },
  { slug:"reload-digital", to:"hello@reloaddigital.co.uk",  agencyName:"Reload Digital",      city:"Birmingham", country:"UK" },
  // ── Ek adresler (SMTP verify'dan) ────────────────────────────────────────
  { slug:"magnetic-north", to:"info@magnetic-north.com",   agencyName:"Magnetic North",      city:"Glasgow",    country:"UK" },
  { slug:"roots-lu",       to:"contact@roots.lu",           agencyName:"Roots",               city:"Luxembourg", country:"LU" },
  { slug:"latitude",       to:"hello@latitudeagency.com",   agencyName:"Latitude",            city:"Sheffield",  country:"UK" },
  { slug:"thewebstudio",   to:"hello@thewebstudio.co.uk",   agencyName:"The Web Studio",      city:"Edinburgh",  country:"UK" },
  { slug:"plan-digital",   to:"hello@plan.digital",         agencyName:"Plan Digital",        city:"Liverpool",  country:"UK" },
  { slug:"wunderman-be",   to:"info@wundermanthompson.be",  agencyName:"Wunderman Thompson",  city:"Brussels",   country:"BE" },
  { slug:"x-com-nl",       to:"info@x-com.nl",              agencyName:"X-com",               city:"Amsterdam",  country:"NL" },
  { slug:"tweakwise",      to:"info@tweakwise.com",         agencyName:"Tweakwise",           city:"Amsterdam",  country:"NL" },
  { slug:"movepeople",     to:"info@movepeople.nl",         agencyName:"Move People",         city:"Rotterdam",  country:"NL" },
]

// Build suppress + prev-sent email set AND domain set
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevBatches = ["5","6","7","8","9","10","11","12","13","14"]
const prevEmails = []
const prevDomains = new Set()
for (const n of prevBatches) {
  try {
    const batch = JSON.parse(readFileSync(`scripts/leads-batch-${n}.json`, "utf8"))
    batch.forEach(m => {
      prevEmails.push(m.to.toLowerCase())
      prevDomains.add(m.to.toLowerCase().split("@")[1])
    })
  } catch {}
}
const skipEmails = new Set([...suppress, ...prevEmails])

// Also skip domains that were DELIVERED in batch 14 (don't double-hit same company)
// Hard bounced domains are OK to retry with different address
const hardBounced = new Set(suppress) // suppress list = bounced
const deliveredDomains = new Set()
try {
  const b14 = JSON.parse(readFileSync("scripts/leads-batch-14.json", "utf8"))
  b14.forEach(m => {
    const domain = m.to.toLowerCase().split("@")[1]
    if (!hardBounced.has(m.to.toLowerCase())) {
      deliveredDomains.add(domain) // was attempted and NOT in suppress = delivered
    }
  })
} catch {}

const seen = new Set()
const messages = []

for (const l of leads) {
  const email = l.to.toLowerCase()
  const domain = email.split("@")[1]

  if (skipEmails.has(email)) { console.log(`SKIP (email): ${email}`); continue }
  if (seen.has(email)) continue

  // Skip domain if already delivered in batch 14 (not bounced)
  if (deliveredDomains.has(domain) && !hardBounced.has(email)) {
    console.log(`SKIP (domain delivered): ${email}`)
    continue
  }

  seen.add(email)

  const ctaUrl = `https://solmandigital.com.tr/en/white-label?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${l.slug}`
  const waText = `Hi, I received your email about white label partnership and I'd like to learn more. (Ref: ${l.slug})`
  const waUrl = `https://wa.me/905439675250?text=${encodeURIComponent(waText)}`

  const opening = {
    NL: "We're a development office in Istanbul building white label partnerships with Dutch agencies.",
    BE: "We're a development office in Istanbul building white label partnerships with Belgian agencies.",
    LU: "We're a development office in Istanbul building white label partnerships with agencies in Luxembourg.",
    UK: "We're a development office in Istanbul building white label partnerships with UK agencies.",
  }[l.country] || "We're a development office in Istanbul building white label partnerships."

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
<div style="background:#0d0d0d;padding:20px 32px">
  <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></span>
  <span style="color:#666;font-size:12px;margin-left:8px">White Label Partner · Istanbul</span>
</div>
<div style="padding:32px">
  <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111">White Label Partnership</p>
  <p style="margin:0 0 20px;font-size:12px;color:#9b1c1c;font-weight:600;text-transform:uppercase;letter-spacing:.06em">for ${l.agencyName}</p>

  <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">${opening} You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.</p>

  <div style="background:#f9f9f9;border-left:3px solid #9b1c1c;padding:14px 18px;border-radius:0 6px 6px 0;margin:0 0 18px">
    <p style="margin:0;font-size:13px;color:#555;line-height:1.8">
      ↗ Scale without hiring — no overhead when quiet<br>
      ↗ Add Next.js, React &amp; AI features without building in-house<br>
      ↗ Fixed pricing · NDA-covered · ${TIMEZONE}
    </p>
  </div>

  <p style="margin:0 0 20px;font-size:13px;color:#888;line-height:1.6"><strong style="color:#555">Stack:</strong> ${STACK}</p>

  <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7">If capacity or stack gaps have ever cost you a brief, that's the gap we fill. Drop us a line or reach us on WhatsApp.</p>

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

${opening} You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.

↗ Scale without hiring — no overhead when quiet
↗ Add Next.js, React & AI features without building in-house
↗ Fixed pricing · NDA-covered · ${TIMEZONE}

Stack: ${STACK}

If capacity or stack gaps have ever cost you a brief, that's the gap we fill. Drop us a line or reach us on WhatsApp.

Schedule a call: ${ctaUrl}
WhatsApp: ${waUrl}

Or just reply — you'll reach the person doing the work.

---
Solman Digital · Istanbul · solmandigital.com.tr
Unsubscribe: info@solmandigital.com.tr`

  messages.push({ to: l.to, subject: `White label partnership — development capacity for ${l.agencyName}`, html, text })
}

writeFileSync("scripts/leads-batch-15.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-15.json`)
for (const m of messages) console.log(` - ${m.to}`)
