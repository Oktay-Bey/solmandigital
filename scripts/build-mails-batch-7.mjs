// DACH + Nordics + CA + AU ajansları — hardcoded emails → scripts/leads-batch-7.json
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "intl-whitelabel-2"

// Bölgeye göre tone varyantları
const TONE = {
  DE: {
    opening: `We run a development office in Istanbul and work with agencies as a white-label build partner. Our process is structured: fixed milestones, written handoffs, and full NDA coverage as standard. You brief us, we build, you deliver under your brand.`,
    close: `If the model fits how you work, we'd welcome a short call to explore whether there's a match.`,
  },
  AT: {
    opening: `We run a development office in Istanbul and partner with agencies on a white-label basis. Structured delivery, clear milestones, NDA as standard — you stay client-side, we handle the build.`,
    close: `Happy to share references or jump on a short call if the model looks relevant to you.`,
  },
  CH: {
    opening: `We're a development office in Istanbul working with agencies as a silent build partner. Reliable process, clear documentation, NDA-covered — you own the client relationship, we deliver the code.`,
    close: `If you'd like to explore whether there's a fit, we're happy to start with a brief call.`,
  },
  SE: {
    opening: `We build software for agencies as a white-label partner. No overhead, no client contact — you brief us, we ship, you deliver. Clean handoffs, senior-level output.`,
    close: `If there's a fit, a short call is enough to figure it out.`,
  },
  NO: {
    opening: `We're a development team in Istanbul working as a white-label partner for agencies. You keep the client, we do the build. Simple model, reliable delivery.`,
    close: `Worth a quick call if the model makes sense for you.`,
  },
  DK: {
    opening: `We work with agencies as a white-label development partner — you handle the client, we handle the build. Senior-level output, your brand, no friction.`,
    close: `If it sounds relevant, a 20-minute call is all it takes to see if there's a fit.`,
  },
  FI: {
    opening: `We're a development office in Istanbul. We partner with agencies as a white-label build team — you own the client relationship, we deliver the code under your brand.`,
    close: `Happy to connect briefly if the model looks useful to you.`,
  },
  CA: {
    opening: `We run a development office in Istanbul and work with agencies as a white-label build partner — you keep the client, we handle the build, your brand on everything. No fuss, reliable delivery.`,
    close: `If you've ever had capacity gaps or stack mismatches on a brief, that's exactly what we fill. Happy to chat.`,
  },
  AU: {
    opening: `We're a development office in Istanbul working with agencies as a silent build partner. You brief us, we build, you deliver — under your brand, with full NDA coverage.`,
    close: `If you'd like to explore whether there's a fit, we're happy to jump on a call — timezone works fine async.`,
  },
  UK: {
    opening: `We run a development office in Istanbul and work with agencies as a white-label build partner — you keep the client relationship, we handle the build under your brand.`,
    close: `If capacity or stack gaps have ever cost you a brief, that's the gap we fill. Happy to talk.`,
  },
}

const STACK = `<strong>Stack:</strong> Next.js · React · TypeScript · Node.js · REST &amp; GraphQL APIs · Supabase · PostgreSQL · AI integrations (OpenAI, Anthropic) · Headless CMS (Sanity, Contentful, Strapi)`

const BENEFITS = `<ul style="margin:12px 0;padding-left:20px;color:#555;line-height:1.9">
  <li>Take on briefs without hiring — scale up when busy, down when quiet</li>
  <li>Offer Next.js, React, TypeScript and AI integrations without the in-house team</li>
  <li>Full-time focus on your project, not split across ten clients</li>
  <li>Fixed per-project or monthly pricing, no recruitment overhead</li>
</ul>`

const TIMEZONE = `UTC+3 (Istanbul) — 1–3h overlap with Western Europe every morning, clean async handoff for further time zones. Turnaround on small tasks: 24h. Typical project delivery: 4–8 weeks.`

const leads = [
  // DACH — Germany
  { slug: "moccu", to: "hello@moccu.com", agencyName: "Moccu", city: "Berlin", country: "DE" },
  { slug: "elbdudler", to: "nb@elbdudler.de", agencyName: "Elbdudler", city: "Hamburg", country: "DE" },
  { slug: "digitas", to: "newbiz@digitas.de", agencyName: "Digitas / Pixelpark", city: "Berlin", country: "DE" },
  { slug: "plannet", to: "crm@serviceplan.com", agencyName: "Plan.Net / Serviceplan", city: "Munich", country: "DE" },
  { slug: "scholzvolkmer", to: "office@s-v.de", agencyName: "Scholz & Volkmer", city: "Wiesbaden", country: "DE" },
  { slug: "demodern", to: "koeln@demodern.de", agencyName: "Demodern", city: "Cologne", country: "DE" },
  { slug: "edenspiekermann", to: "c.hanke@edenspiekermann.com", agencyName: "Edenspiekermann", city: "Berlin", country: "DE" },
  { slug: "turbinekreuzberg", to: "hello@turbinekreuzberg.com", agencyName: "Turbine Kreuzberg", city: "Berlin", country: "DE" },
  { slug: "diesdas", to: "work@diesdas.digital", agencyName: "Diesdas Digital", city: "Berlin", country: "DE" },
  { slug: "zweigrad", to: "info@zweigrad.de", agencyName: "Zweigrad", city: "Stuttgart", country: "DE" },
  { slug: "uberall", to: "contact-us@uberall.com", agencyName: "Uberall", city: "Berlin", country: "DE" },
  { slug: "forto", to: "info@forto.com", agencyName: "Forto", city: "Berlin", country: "DE" },

  // DACH — Austria
  { slug: "catalysts", to: "office@catalysts.cc", agencyName: "Catalysts", city: "Linz", country: "AT" },
  { slug: "netural", to: "office@netural.com", agencyName: "Netural", city: "Linz", country: "AT" },

  // DACH — Switzerland
  { slug: "liip", to: "hello@liip.ch", agencyName: "Liip", city: "Zurich", country: "CH" },
  { slug: "ginetta", to: "hello@ginetta.com", agencyName: "Ginetta", city: "Zurich", country: "CH" },
  { slug: "amazeelabs", to: "hello@amazeelabs.com", agencyName: "Amazee Labs", city: "Zurich", country: "CH" },

  // Nordics — Sweden
  { slug: "northkingdom", to: "hello@northkingdom.com", agencyName: "North Kingdom", city: "Stockholm", country: "SE" },
  { slug: "doberman", to: "hello@doberman.co", agencyName: "Doberman", city: "Gothenburg", country: "SE" },

  // Nordics — Norway
  { slug: "netlife", to: "post@netlife.com", agencyName: "Netlife", city: "Oslo", country: "NO" },
  { slug: "adaptno", to: "hello@adapt.no", agencyName: "Adapt", city: "Oslo", country: "NO" },

  // Nordics — Denmark
  { slug: "dwarf", to: "info@dwarf.dk", agencyName: "Dwarf", city: "Copenhagen", country: "DK" },

  // Nordics — Finland
  { slug: "futurice", to: "hello@futurice.com", agencyName: "Futurice", city: "Helsinki", country: "FI" },
  { slug: "reaktor", to: "hello@reaktor.com", agencyName: "Reaktor", city: "Helsinki", country: "FI" },
  { slug: "solita", to: "info@solita.fi", agencyName: "Solita", city: "Helsinki", country: "FI" },

  // Canada
  { slug: "jam3", to: "info@jam3.com", agencyName: "Jam3", city: "Toronto", country: "CA" },
  { slug: "diffagency", to: "hello@diffagency.com", agencyName: "Diff Agency", city: "Montreal", country: "CA" },
  { slug: "pixelunion", to: "support@pixelunion.net", agencyName: "Pixel Union", city: "Victoria", country: "CA" },
  { slug: "onemethod", to: "hello@onemethod.com", agencyName: "OneMethod", city: "Toronto", country: "CA" },

  // Australia
  { slug: "luminary", to: "hello@luminary.com.au", agencyName: "Luminary", city: "Melbourne", country: "AU" },
  { slug: "portable", to: "hello@portable.com.au", agencyName: "Portable", city: "Melbourne", country: "AU" },
  { slug: "sitback", to: "hello@sitback.com.au", agencyName: "Sitback Solutions", city: "Sydney", country: "AU" },
  { slug: "hardhat", to: "hello@hardhat.com.au", agencyName: "Hardhat Digital", city: "Sydney", country: "AU" },

  // UK e-commerce (batch-5'te gönderilmeyenler)
  { slug: "wemakewebsites", to: "hello@wemakewebsites.com", agencyName: "We Make Websites", city: "London", country: "UK" },
  { slug: "velstar", to: "hello@velstar.co.uk", agencyName: "Velstar", city: "Liverpool", country: "UK" },
  { slug: "swanky", to: "hello@swankyshop.com", agencyName: "Swanky Agency", city: "Exeter", country: "UK" },
  { slug: "eastsideco", to: "hello@eastsideco.com", agencyName: "Eastside Co", city: "Birmingham", country: "UK" },
  { slug: "electriceye", to: "hello@electriceye.io", agencyName: "Electric Eye", city: "Nashville", country: "US" },
]

// Dedupe + suppress check
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const prevSent = ["leads-batch-5.json", "leads-batch-6.json"].flatMap(f => {
  try { return JSON.parse(readFileSync(`scripts/${f}`, "utf8")).map(m => m.to.toLowerCase()) }
  catch { return [] }
})
const skipSet = new Set([...suppress, ...prevSent])

const seen = new Set()
const messages = []

for (const l of leads) {
  const email = l.to.toLowerCase()
  if (skipSet.has(email)) { console.log(`SKIP: ${email}`); continue }
  if (seen.has(email)) { console.log(`DUPE: ${email}`); continue }
  seen.add(email)

  const tone = TONE[l.country] ?? TONE.UK
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

  const text = `Hi ${l.agencyName} team,\n\n${tone.opening}\n\nWHAT YOU GET\n- Scale up when busy, down when quiet — no hiring\n- Next.js, React, TypeScript, AI integrations without the in-house team\n- Full-time focus on your project\n- Fixed pricing, no recruitment overhead\n\nSTACK: Next.js · React · TypeScript · Node.js · APIs · Supabase · PostgreSQL · AI · Headless CMS\n\nTIMEZONE: ${TIMEZONE}\n\n${tone.close}\n\nSchedule a call: ${ctaUrl}\nWhatsApp: ${waUrl}\n\nReply directly — you'll reach the person doing the work.\n\n---\nSolman Digital · Istanbul (UTC+3) · solmandigital.com.tr\nTo unsubscribe: info@solmandigital.com.tr`

  messages.push({ to: l.to, subject: "White-label dev partner for your agency — Istanbul-based, senior-level", html, text })
}

writeFileSync("scripts/leads-batch-7.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-7.json`)
for (const m of messages) console.log(` - ${m.to}`)
