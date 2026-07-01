// AU + NZ ajansları — batch 11
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "aunz-whitelabel-1"

const TONE = {
  AU: {
    opening: `We're a development office in Istanbul looking to build white label partnerships with Australian agencies. You bring the client, we ship the product — under your brand, NDA-covered, no client-facing contact.`,
    close: `If capacity or stack gaps have cost you a brief, that's the problem we solve. Happy to jump on a call or chat on WhatsApp.`,
  },
  NZ: {
    opening: `We run a development office in Istanbul and we're keen to build white label partnerships with New Zealand agencies. You win the work, we build it — under your brand, fully confidential.`,
    close: `If there's overflow work or a stack gap you're navigating, we'd love to have a chat. Reply here or ping us on WhatsApp.`,
  },
}

const STACK = `Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS`
const TIMEZONE = `UTC+3 (Istanbul) — async delivery all day, 24h turnaround on small tasks.`

const leads = [
  // Australia
  { slug: "hard-edge",       to: "hello@hardedge.com.au",        agencyName: "Hard Edge",          city: "Melbourne",  country: "AU" },
  { slug: "bolster",         to: "hello@bolster.com.au",         agencyName: "Bolster",            city: "Sydney",     country: "AU" },
  { slug: "atollon",         to: "hello@atollon.com",            agencyName: "Atollon",            city: "Brisbane",   country: "AU" },
  { slug: "isobar-au",       to: "hello@isobar.com.au",          agencyName: "Isobar Australia",   city: "Sydney",     country: "AU" },
  { slug: "the-royals",      to: "hello@theroyals.com.au",       agencyName: "The Royals",         city: "Sydney",     country: "AU" },
  { slug: "portable",        to: "hello@portable.com.au",        agencyName: "Portable",           city: "Melbourne",  country: "AU" },
  { slug: "conversion",      to: "hello@conversion.com.au",      agencyName: "Conversion",         city: "Sydney",     country: "AU" },
  { slug: "hardhat",         to: "hello@hardhat.com.au",         agencyName: "Hardhat",            city: "Melbourne",  country: "AU" },
  { slug: "appartu",         to: "hello@appart.com.au",          agencyName: "Appart",             city: "Melbourne",  country: "AU" },
  { slug: "whitehat",        to: "hello@whitehat.com.au",        agencyName: "Whitehat Agency",    city: "Sydney",     country: "AU" },
  { slug: "claxon",          to: "hello@claxon.com.au",          agencyName: "Claxon",             city: "Auckland",   country: "AU" },
  { slug: "we-are-social-au",to: "hello@wearesocial.com",        agencyName: "We Are Social AU",   city: "Sydney",     country: "AU" },
  { slug: "ignite",          to: "hello@ignitedigital.com.au",   agencyName: "Ignite Digital",     city: "Melbourne",  country: "AU" },
  { slug: "reactive",        to: "hello@reactive.com.au",        agencyName: "Reactive",           city: "Sydney",     country: "AU" },
  { slug: "tab-au",          to: "hello@tabagency.com.au",       agencyName: "Tab Agency",         city: "Sydney",     country: "AU" },

  // New Zealand
  { slug: "colenso",         to: "hello@colensobbdo.co.nz",      agencyName: "Colenso BBDO",       city: "Auckland",   country: "NZ" },
  { slug: "track",           to: "hello@track.co.nz",            agencyName: "Track",              city: "Auckland",   country: "NZ" },
  { slug: "springload",      to: "hello@springload.co.nz",       agencyName: "Springload",         city: "Wellington", country: "NZ" },
  { slug: "heyday",          to: "hello@heyday.co.nz",           agencyName: "Heyday",             city: "Auckland",   country: "NZ" },
  { slug: "touchtech",       to: "hello@touchtech.co.nz",        agencyName: "Touchtech",          city: "Wellington", country: "NZ" },
  { slug: "republik",        to: "hello@republik.co.nz",         agencyName: "Republik",           city: "Auckland",   country: "NZ" },
  { slug: "sugar",           to: "hello@sugar.co.nz",            agencyName: "Sugar",              city: "Auckland",   country: "NZ" },
  { slug: "ddb-nz",          to: "hello@ddb.co.nz",              agencyName: "DDB NZ",             city: "Auckland",   country: "NZ" },
]

// Suppress + dedup
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevSent = ["5","6","7","8","9","10"].flatMap(n => {
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

  const tone = TONE[l.country] ?? TONE.AU
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

writeFileSync("scripts/leads-batch-11.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-11.json`)
for (const m of messages) console.log(` - ${m.to}`)
