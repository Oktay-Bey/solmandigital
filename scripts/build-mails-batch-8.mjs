// BE + NL + LU + CH ajansları → scripts/leads-batch-8.json
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "bnlx-whitelabel-1"

const TONE = {
  BE: {
    opening: `We run a development office in Istanbul and work with agencies as a white-label build partner. You keep the client relationship, we handle the build — NDA-covered, your brand throughout.`,
    close: `If the model fits how you work, a short call is enough to see if there's a fit.`,
  },
  NL: {
    opening: `We build software for agencies as a white-label partner. No client contact, no overhead — you brief us, we ship, you deliver. Clean process, senior-level output.`,
    close: `If there's capacity or stack gaps you're working around, that's exactly the gap we fill. Happy to talk.`,
  },
  LU: {
    opening: `We're a development office in Istanbul working with agencies across Europe as a white-label build partner. You own the client relationship, we deliver the code under your brand.`,
    close: `Happy to connect briefly if the model looks relevant to you.`,
  },
  CH: {
    opening: `We run a development office in Istanbul and partner with Swiss agencies on a white-label basis. Structured delivery, clear milestones, full NDA coverage — you stay client-side, we handle the build.`,
    close: `If you'd like to explore whether there's a fit, we're happy to start with a short call.`,
  },
}

const BENEFITS = `<ul style="margin:12px 0;padding-left:20px;color:#555;line-height:1.9">
  <li>Take on briefs without hiring — scale up when busy, down when quiet</li>
  <li>Offer Next.js, React, TypeScript and AI integrations without the in-house team</li>
  <li>Full-time focus on your project, not split across ten clients</li>
  <li>Fixed per-project or monthly pricing, no recruitment overhead</li>
</ul>`

const STACK = `<strong>Stack:</strong> Next.js · React · TypeScript · Node.js · REST &amp; GraphQL APIs · Supabase · PostgreSQL · AI integrations (OpenAI, Anthropic) · Headless CMS (Sanity, Contentful, Strapi)`
const TIMEZONE = `UTC+3 (Istanbul) — 1–2h overlap with Central Europe every morning, clean async handoff for the rest of the day. Turnaround on small tasks: 24h. Typical project delivery: 4–8 weeks.`

const leads = [
  // Belgium
  { slug: "bagaar", to: "hello@bagaar.be", agencyName: "Bagaar", city: "Ghent", country: "BE" },
  { slug: "thereference", to: "info@thereference.be", agencyName: "The Reference", city: "Brussels", country: "BE" },
  { slug: "elevenways", to: "hello@elevenways.be", agencyName: "Eleven Ways", city: "Ghent", country: "BE" },
  { slug: "pharo", to: "hello@pharo.be", agencyName: "Pharo", city: "Brussels", country: "BE" },
  { slug: "wearefrank", to: "hello@wearefrank.be", agencyName: "We Are Frank", city: "Antwerp", country: "BE" },
  { slug: "upthereeverywhere", to: "hello@upthereeverywhere.com", agencyName: "Up There Everywhere", city: "Brussels", country: "BE" },
  { slug: "emakina", to: "info@emakina.com", agencyName: "Emakina", city: "Brussels", country: "BE" },
  { slug: "massivemedia", to: "info@massivemedia.eu", agencyName: "Massive Media", city: "Ghent", country: "BE" },
  { slug: "thinkersbvba", to: "hello@thinkers.be", agencyName: "Thinkers", city: "Brussels", country: "BE" },
  { slug: "spindl", to: "hello@spindl.be", agencyName: "Spindl", city: "Antwerp", country: "BE" },
  { slug: "studio-dott", to: "hello@studiodott.be", agencyName: "Studio Dott", city: "Brussels", country: "BE" },
  { slug: "van-aar", to: "hello@van-aar.be", agencyName: "Van Aar", city: "Leuven", country: "BE" },

  // Netherlands
  { slug: "labela", to: "hello@labela.nl", agencyName: "Label A", city: "Amsterdam", country: "NL" },
  { slug: "q42", to: "hello@q42.nl", agencyName: "Q42", city: "The Hague", country: "NL" },
  { slug: "greenberry", to: "hello@greenberry.nl", agencyName: "Greenberry", city: "Arnhem", country: "NL" },
  { slug: "bravoure", to: "hello@bravoure.nl", agencyName: "Bravoure", city: "Utrecht", country: "NL" },
  { slug: "grrr", to: "hello@grrr.nl", agencyName: "Grrr", city: "Amsterdam", country: "NL" },
  { slug: "fonkel", to: "hallo@fonkel.nl", agencyName: "Fonkel", city: "Groningen", country: "NL" },
  { slug: "digitpaint", to: "hallo@digitpaint.nl", agencyName: "Digitpaint", city: "Zwolle", country: "NL" },
  { slug: "evident", to: "info@evident.nl", agencyName: "Evident", city: "Rotterdam", country: "NL" },
  { slug: "frontmen", to: "info@frontmen.nl", agencyName: "Frontmen", city: "Amsterdam", country: "NL" },
  { slug: "burst-digital", to: "hello@burstdigital.nl", agencyName: "Burst Digital", city: "Amsterdam", country: "NL" },
  { slug: "tam-tam", to: "info@tam-tam.nl", agencyName: "Tam Tam", city: "The Hague", country: "NL" },
  { slug: "youwe", to: "hello@youwe.agency", agencyName: "Youwe", city: "Amsterdam", country: "NL" },
  { slug: "code-yellow", to: "hello@codeyellow.nl", agencyName: "Code Yellow", city: "Nijmegen", country: "NL" },
  { slug: "aan-zee", to: "hallo@aanzee.nl", agencyName: "Aan Zee", city: "Amsterdam", country: "NL" },

  // Luxembourg
  { slug: "lakeside-lu", to: "info@lakeside.lu", agencyName: "Lakeside", city: "Luxembourg", country: "LU" },
  { slug: "binsfeld", to: "info@binsfeld.com", agencyName: "Binsfeld", city: "Luxembourg", country: "LU" },
  { slug: "agile-partner", to: "info@agilepartner.lu", agencyName: "Agile Partner", city: "Luxembourg", country: "LU" },
  { slug: "ainteger", to: "hello@ainteger.lu", agencyName: "Ainteger", city: "Luxembourg", country: "LU" },
  { slug: "excellent-agency", to: "info@excellent.agency", agencyName: "Excellent Agency", city: "Luxembourg", country: "LU" },

  // Switzerland (batch-7'de gönderilenler hariç: Liip, Ginetta, Amazee Labs)
  { slug: "hinderling-volkart", to: "hello@hv.plus", agencyName: "Hinderling Volkart", city: "Zurich", country: "CH" },
  { slug: "webrepublic", to: "info@webrepublic.ch", agencyName: "Webrepublic", city: "Zurich", country: "CH" },
  { slug: "netnode", to: "hello@netnode.ch", agencyName: "Netnode", city: "Zurich", country: "CH" },
  { slug: "unic", to: "hello@unic.com", agencyName: "Unic", city: "Zurich", country: "CH" },
  { slug: "wearecube", to: "hello@wearecube.ch", agencyName: "We Are Cube", city: "Zurich", country: "CH" },
  { slug: "sensational", to: "hello@sensational.ch", agencyName: "Sensational", city: "Bern", country: "CH" },
  { slug: "namics", to: "hello@namics.com", agencyName: "Namics", city: "Basel", country: "CH" },
]

// Load suppress + sent lists
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevBatches = ["leads-batch-5.json","leads-batch-6.json","leads-batch-7.json"].flatMap(f => {
  try { return JSON.parse(readFileSync(`scripts/${f}`, "utf8")).map(m => m.to.toLowerCase()) } catch { return [] }
})
const skipSet = new Set([...suppress, ...prevBatches])

const seen = new Set()
const messages = []

for (const l of leads) {
  const email = l.to.toLowerCase()
  if (skipSet.has(email)) { console.log(`SKIP: ${email}`); continue }
  if (seen.has(email)) continue
  seen.add(email)

  const tone = TONE[l.country] ?? TONE.BE
  const ctaUrl = `https://solmandigital.com.tr/en/white-label?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${l.slug}`
  const waText = `Hi, I received your email about white-label development and I'd like to discuss a partnership. (Ref: ${l.slug})`
  const waUrl = `https://wa.me/905439675250?text=${encodeURIComponent(waText)}`

  const html = `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px">
<div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:28px 40px">
  <p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p>
  <p style="margin:6px 0 0;color:#888;font-size:13px">Development Office · Istanbul, Turkey (UTC+3)</p>
</div>
<div style="background:#fff;padding:40px">
  <h1 style="margin:0 0 20px;font-size:21px;font-weight:800;color:#111">Hi ${l.agencyName} team,</h1>
  <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.75">${tone.opening}</p>
  <div style="background:#f8f8f8;border-left:3px solid #9b1c1c;padding:20px 24px;border-radius:0 8px 8px 0;margin:0 0 24px">
    <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#333;text-transform:uppercase;letter-spacing:.05em">What this gives you</p>
    ${BENEFITS}
  </div>
  <p style="margin:0 0 16px;font-size:14px;color:#666;line-height:1.75">${STACK}</p>
  <p style="margin:0 0 24px;font-size:14px;color:#666;line-height:1.75">${TIMEZONE}</p>
  <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.75">${tone.close}</p>
  <a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Schedule a Call</a>
  <a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none">WhatsApp</a>
  <p style="margin:24px 0 0;font-size:13px;color:#999">Reply directly to this email — you'll reach the person doing the work.</p>
</div>
<div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:20px 40px;border-top:1px solid #e0e0e0">
  <p style="margin:0 0 4px;font-size:12px;color:#aaa">Solman Digital · Istanbul, Turkey · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a></p>
  <p style="margin:0;font-size:12px;color:#aaa">Sent to your business contact address. To unsubscribe, <a href="mailto:info@solmandigital.com.tr?subject=Unsubscribe" style="color:#9b1c1c">let us know</a>.</p>
</div>
</div>`

  const text = `Hi ${l.agencyName} team,\n\n${tone.opening}\n\nWHAT YOU GET\n- Scale up when busy, down when quiet — no hiring\n- Next.js, React, TypeScript, AI integrations without building the in-house team\n- Full-time focus on your project\n- Fixed pricing, no recruitment overhead\n\nSTACK: Next.js · React · TypeScript · Node.js · APIs · Supabase · PostgreSQL · AI · Headless CMS\n\nTIMEZONE: ${TIMEZONE}\n\n${tone.close}\n\nSchedule a call: ${ctaUrl}\nWhatsApp: ${waUrl}\n\nReply directly — you'll reach the person doing the work.\n\n---\nSolman Digital · Istanbul (UTC+3) · solmandigital.com.tr\nTo unsubscribe: info@solmandigital.com.tr`

  messages.push({ to: l.to, subject: "White-label dev partner for your agency — Istanbul-based, senior-level", html, text })
}

writeFileSync("scripts/leads-batch-8.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-8.json`)
for (const m of messages) console.log(` - ${m.to}`)
