// US + CA ajansları — batch 10
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "usca-whitelabel-1"

const TONE = {
  US: {
    opening: `We're a development office in Istanbul looking to build white label partnerships with US agencies. You bring the client, we build the product — under your brand, fully confidential.`,
    close: `If you're turning down work due to capacity or stack gaps, that's exactly the problem we solve. Happy to jump on a quick call or chat on WhatsApp.`,
  },
  CA: {
    opening: `We run a development office in Istanbul and we're looking to build white label partnerships with Canadian agencies. You win the brief, we ship the build — under your brand, NDA-covered, invisible to your client.`,
    close: `If there are projects you can't take on because of capacity or tech stack, we'd love to explore a fit. Reply here or reach us on WhatsApp.`,
  },
}

const STACK = `Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS`
const TIMEZONE = `UTC+3 (Istanbul) — async delivery all day, turnaround 24h on small tasks.`

const leads = [
  // United States
  { slug: "instrument",       to: "hello@instrument.com",          agencyName: "Instrument",         city: "Portland",      country: "US" },
  { slug: "ueno",             to: "hello@ueno.co",                 agencyName: "Ueno",               city: "New York",      country: "US" },
  { slug: "basically",        to: "hello@basically.com",           agencyName: "Basically",          city: "San Francisco", country: "US" },
  { slug: "fantasy",          to: "hello@fantasy.co",              agencyName: "Fantasy",            city: "New York",      country: "US" },
  { slug: "fuzzco",           to: "hello@fuzzco.com",              agencyName: "Fuzzco",             city: "Charleston",    country: "US" },
  { slug: "order",            to: "hello@orderdesign.com",         agencyName: "Order",              city: "New York",      country: "US" },
  { slug: "work-co",          to: "hello@work.co",                 agencyName: "Work & Co",          city: "New York",      country: "US" },
  { slug: "huge-inc",         to: "hello@hugeinc.com",             agencyName: "Huge",               city: "New York",      country: "US" },
  { slug: "firstborn",        to: "hello@firstborn.com",           agencyName: "Firstborn",          city: "New York",      country: "US" },
  { slug: "metalab",          to: "hello@metalab.com",             agencyName: "MetaLab",            city: "Victoria",      country: "US" },
  { slug: "code-and-theory",  to: "hello@codeandtheory.com",       agencyName: "Code and Theory",    city: "New York",      country: "US" },
  { slug: "rally",            to: "hello@rallyinteractive.com",    agencyName: "Rally Interactive",  city: "Salt Lake City", country: "US" },
  { slug: "locomotive-us",    to: "info@locomotive.agency",        agencyName: "Locomotive US",      city: "New York",      country: "US" },
  { slug: "ideo",             to: "hello@ideo.com",                agencyName: "IDEO",               city: "San Francisco", country: "US" },
  { slug: "r-ga",             to: "hello@rga.com",                 agencyName: "R/GA",               city: "New York",      country: "US" },
  { slug: "akqa",             to: "hello@akqa.com",                agencyName: "AKQA",               city: "San Francisco", country: "US" },
  { slug: "active-theory",    to: "hello@activetheory.net",        agencyName: "Active Theory",      city: "Los Angeles",   country: "US" },
  { slug: "jam3",             to: "hello@jam3.com",                agencyName: "Jam3",               city: "Los Angeles",   country: "US" },
  { slug: "heco",             to: "hello@heco.io",                 agencyName: "Heco",               city: "New York",      country: "US" },
  { slug: "tubik",            to: "hello@tubikstudio.com",         agencyName: "Tubik",              city: "San Francisco", country: "US" },

  // Canada
  { slug: "bnotions",         to: "hello@bnotions.com",            agencyName: "Bnotions",           city: "Toronto",       country: "CA" },
  { slug: "nerd-street",      to: "hello@nerdstreet.com",          agencyName: "Nerd Street",        city: "Toronto",       country: "CA" },
  { slug: "duel-group",       to: "hello@duel.group",              agencyName: "Duel Group",         city: "Vancouver",     country: "CA" },
  { slug: "touchtunes",       to: "hello@touchtunes.com",          agencyName: "TouchTunes",         city: "Montreal",      country: "CA" },
  { slug: "cargo",            to: "hello@cargocollective.com",     agencyName: "Cargo",              city: "Toronto",       country: "CA" },
  { slug: "humanfactor",      to: "hello@humanfactor.ca",          agencyName: "Human Factor",       city: "Toronto",       country: "CA" },
  { slug: "monogram",         to: "hello@monogram.ca",             agencyName: "Monogram",           city: "Toronto",       country: "CA" },
  { slug: "their-studio",     to: "hello@theirstudio.com",         agencyName: "Their Studio",       city: "Vancouver",     country: "CA" },
  { slug: "normative",        to: "hello@normative.com",           agencyName: "Normative",          city: "Toronto",       country: "CA" },
  { slug: "pound-grain",      to: "hello@poundgrain.com",          agencyName: "Pound & Grain",      city: "Vancouver",     country: "CA" },
  { slug: "whitespace-ca",    to: "hello@whitespace.ca",           agencyName: "Whitespace",         city: "Vancouver",     country: "CA" },
  { slug: "cossette",         to: "hello@cossette.com",            agencyName: "Cossette",           city: "Montreal",      country: "CA" },
]

// Suppress + dedup
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevSent = ["5","6","7","8","9"].flatMap(n => {
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

  const tone = TONE[l.country] ?? TONE.US
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

writeFileSync("scripts/leads-batch-10.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-10.json`)
for (const m of messages) console.log(` - ${m.to}`)
