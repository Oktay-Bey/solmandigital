// NL + UK (new cities) + BE (new) + LU (new) — batch 14
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "bnlx-whitelabel-2"
const STACK = `Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS`
const TIMEZONE = `UTC+3 (Istanbul) — 2h overlap with Western European mornings, async delivery throughout the day.`

const leads = [
  // Netherlands (new — not in batch 8)
  { slug: "fabrique",        to: "info@fabrique.nl",              agencyName: "Fabrique",            city: "Amsterdam",  country: "NL" },
  { slug: "hike-one",        to: "info@hike.one",                 agencyName: "Hike One",            city: "Amsterdam",  country: "NL" },
  { slug: "e-sites",         to: "info@e-sites.nl",               agencyName: "E-sites",             city: "Breda",      country: "NL" },
  { slug: "iquality",        to: "hello@iquality.nl",             agencyName: "Iquality",            city: "Nijmegen",   country: "NL" },
  { slug: "incentro",        to: "hello@incentro.com",            agencyName: "Incentro",            city: "Amsterdam",  country: "NL" },
  { slug: "finalist",        to: "info@finalist.nl",              agencyName: "Finalist",            city: "Amsterdam",  country: "NL" },
  { slug: "mirabeau",        to: "hello@mirabeau.nl",             agencyName: "Mirabeau",            city: "Amsterdam",  country: "NL" },
  { slug: "jungleminds",     to: "hello@jungleminds.nl",          agencyName: "Jungle Minds",        city: "Amsterdam",  country: "NL" },
  { slug: "build-amsterdam", to: "info@buildinamsterdam.com",     agencyName: "Build in Amsterdam",  city: "Amsterdam",  country: "NL" },
  { slug: "matise",          to: "info@matise.nl",                agencyName: "Matise",              city: "Amsterdam",  country: "NL" },
  { slug: "redkiwi",         to: "info@redkiwi.nl",               agencyName: "Redkiwi",             city: "Breda",      country: "NL" },
  { slug: "colours",         to: "hello@colours.nl",              agencyName: "Colours",             city: "Amsterdam",  country: "NL" },
  { slug: "byte",            to: "info@byte.nl",                  agencyName: "Byte",                city: "Tilburg",    country: "NL" },
  { slug: "orangevalley",    to: "info@orangevalley.nl",          agencyName: "Orangevalley",        city: "Eindhoven",  country: "NL" },
  { slug: "soda-studio",     to: "hello@soda.studio",             agencyName: "Soda Studio",         city: "Amsterdam",  country: "NL" },

  // Belgium (new — not in batch 8)
  { slug: "wijs",            to: "hello@wijs.be",                 agencyName: "Wijs",                city: "Ghent",      country: "BE" },
  { slug: "inthepocket",     to: "hello@inthepocket.com",         agencyName: "In The Pocket",       city: "Ghent",      country: "BE" },
  { slug: "esign",           to: "info@esign.eu",                 agencyName: "Esign",               city: "Ghent",      country: "BE" },
  { slug: "endeavour",       to: "hello@endeavour.be",            agencyName: "Endeavour",           city: "Bruges",     country: "BE" },
  { slug: "invisiblepuppy",  to: "hello@invisiblepuppy.be",       agencyName: "Invisible Puppy",     city: "Antwerp",    country: "BE" },
  { slug: "calibrate",       to: "hello@calibrate.be",            agencyName: "Calibrate",           city: "Brussels",   country: "BE" },
  { slug: "comicube",        to: "info@comicube.be",              agencyName: "Comicube",            city: "Brussels",   country: "BE" },
  { slug: "two-of-a-kind",   to: "hello@twoofakind.be",           agencyName: "Two of a Kind",       city: "Antwerp",    country: "BE" },

  // Luxembourg (new — not in batch 8)
  { slug: "luxfuturelab",    to: "info@luxfuturelab.lu",          agencyName: "Lux Future Lab",      city: "Luxembourg", country: "LU" },
  { slug: "roots-lu",        to: "info@roots.lu",                 agencyName: "Roots",               city: "Luxembourg", country: "LU" },
  { slug: "propel-lu",       to: "hello@propel.lu",               agencyName: "Propel",              city: "Luxembourg", country: "LU" },
  { slug: "moovcombo",       to: "hello@moovcombo.lu",            agencyName: "MoovCombo",           city: "Luxembourg", country: "LU" },

  // UK (new cities — not in batches 5 or 13)
  { slug: "whitespace",      to: "info@whitespace.co.uk",         agencyName: "Whitespace",          city: "Edinburgh",  country: "UK" },
  { slug: "equator",         to: "info@equator.agency",           agencyName: "Equator",             city: "Glasgow",    country: "UK" },
  { slug: "magnetic-north",  to: "hello@magnetic-north.com",      agencyName: "Magnetic North",      city: "Glasgow",    country: "UK" },
  { slug: "torchbox",        to: "hello@torchbox.com",            agencyName: "Torchbox",            city: "Stroud",     country: "UK" },
  { slug: "cantarus",        to: "hello@cantarus.com",            agencyName: "Cantarus",            city: "Manchester", country: "UK" },
  { slug: "clicky",          to: "hello@clickymedia.co.uk",       agencyName: "Clicky",              city: "York",       country: "UK" },
  { slug: "blue-frontier",   to: "hello@bluefrontier.co.uk",      agencyName: "Blue Frontier",       city: "Worthing",   country: "UK" },
  { slug: "sookio",          to: "hello@sookio.com",              agencyName: "Sookio",              city: "Cambridge",  country: "UK" },
]

// Suppress + dedup (all prior international batches)
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevSent = ["5","6","7","8","9","10","11","12","13"].flatMap(n => {
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

  const ctaUrl = `https://solmandigital.com.tr/en/white-label?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${l.slug}`
  const waText = `Hi, I received your email about white label partnership and I'd like to learn more. (Ref: ${l.slug})`
  const waUrl = `https://wa.me/905439675250?text=${encodeURIComponent(waText)}`

  const opening = l.country === "BE" || l.country === "NL" || l.country === "LU"
    ? `We're a development office in Istanbul looking to build white label partnerships with ${l.country === "LU" ? "Luxembourg-based" : l.country === "BE" ? "Belgian" : "Dutch"} agencies.`
    : `We're a development office in Istanbul looking to build white label partnerships with UK agencies.`

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

  messages.push({
    to: l.to,
    subject: `White label partnership — development capacity for ${l.agencyName}`,
    html,
    text,
  })
}

writeFileSync("scripts/leads-batch-14.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-14.json`)
for (const m of messages) console.log(` - ${m.to}`)
