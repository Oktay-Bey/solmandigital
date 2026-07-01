// UK ajansları — batch 13 (tam 23 mail)
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "uk-whitelabel-2"
const STACK = `Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS`
const TIMEZONE = `UTC+3 (Istanbul) — 2h overlap with UK mornings, async delivery all day.`

const leads = [
  { slug: "beyond",          to: "hello@beyonddigital.com",        agencyName: "Beyond",              city: "London" },
  { slug: "somo",            to: "hello@somoglobal.com",           agencyName: "Somo",                city: "London" },
  { slug: "makemedia",       to: "hello@makemedia.co.uk",          agencyName: "Make Media",          city: "London" },
  { slug: "redweb",          to: "hello@redweb.com",               agencyName: "Redweb",              city: "Bournemouth" },
  { slug: "manifesto",       to: "hello@manifesto.co.uk",          agencyName: "Manifesto",           city: "London" },
  { slug: "rawnet",          to: "hello@rawnet.com",               agencyName: "Rawnet",              city: "London" },
  { slug: "bluegg",          to: "hello@bluegg.co.uk",             agencyName: "Bluegg",              city: "Cardiff" },
  { slug: "browseruk",       to: "hello@browser.london",           agencyName: "Browser",             city: "London" },
  { slug: "graphite",        to: "hello@graphitedesign.co.uk",     agencyName: "Graphite",            city: "London" },
  { slug: "windmill",        to: "hello@windmillstrategy.co.uk",   agencyName: "Windmill Strategy",   city: "Manchester" },
  { slug: "nublue",          to: "hello@nublue.co.uk",             agencyName: "Nublue",              city: "Lancaster" },
  { slug: "cyber-duck",      to: "hello@cyberduck.co.uk",          agencyName: "Cyber-Duck",          city: "London" },
  { slug: "vendilli",        to: "hello@vendilli.co.uk",           agencyName: "Vendilli",            city: "Newcastle" },
  { slug: "supereight",      to: "hello@supereightstudio.com",     agencyName: "Supereight Studio",   city: "London" },
  { slug: "forty",           to: "hello@forty.co.uk",              agencyName: "Forty",               city: "London" },
  { slug: "plug-in-media",   to: "hello@plug-in-media.co.uk",      agencyName: "Plug-in Media",       city: "Brighton" },
  { slug: "code-computerlove","to": "hello@codecomputerlove.com",  "agencyName": "Code Computerlove", "city": "Manchester" },
  { slug: "wholegrain",      to: "hello@wholegraindigital.com",    agencyName: "Wholegrain Digital",  city: "London" },
  { slug: "parallax",        to: "hello@parall.ax",                agencyName: "Parallax",            city: "London" },
  { slug: "jellyfish",       to: "hello@jellyfish.com",            agencyName: "Jellyfish",           city: "London" },
  { slug: "etch",            to: "hello@etch.co",                  agencyName: "Etch",                city: "Southampton" },
  { slug: "substrakt",       to: "hello@substrakt.com",            agencyName: "Substrakt",           city: "London" },
  { slug: "studio-republic", to: "hello@studiorepublic.co.uk",     agencyName: "Studio Republic",     city: "Winchester" },
]

// Suppress + dedup
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevSent = ["5","6","7","8","9","10","11","12"].flatMap(n => {
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

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
<div style="background:#0d0d0d;padding:20px 32px">
  <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></span>
  <span style="color:#666;font-size:12px;margin-left:8px">White Label Partner · Istanbul</span>
</div>
<div style="padding:32px">
  <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111">White Label Partnership</p>
  <p style="margin:0 0 20px;font-size:12px;color:#9b1c1c;font-weight:600;text-transform:uppercase;letter-spacing:.06em">for ${l.agencyName}</p>

  <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">We're a development office in Istanbul looking to build white label partnerships with UK agencies. You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.</p>

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

We're a development office in Istanbul looking to build white label partnerships with UK agencies. You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.

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

writeFileSync("scripts/leads-batch-13.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-13.json`)
for (const m of messages) console.log(` - ${m.to}`)
