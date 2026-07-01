// International agencies white-label partnership batch → scripts/leads-batch-6.json
// Reads scripts/found-emails.json (output of find-emails.mjs on agencies-intl-raw.json)
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "intl-whitelabel-1"

const SUBJECTS = [
  "Development partner for your agency — white-label, no strings",
  "We build, you deliver — white-label dev partnership",
  "Overflow dev capacity for agencies — Istanbul-based, senior-level",
  "White-label development partner — Next.js, React, AI integrations",
]

function pickSubject(i) { return SUBJECTS[i % SUBJECTS.length] }

const BODY = {
  opening: `We run a development office in Istanbul and work exclusively with agencies as a white-label build partner. No client-facing contact, no branding — you brief us, we build, you deliver under your own name.`,

  model: `<strong>How the partnership works:</strong><br>
You send us the brief. We scope, estimate, and build. You review at every milestone. Your client never knows we exist. We sign NDAs as standard and adapt to your internal processes — Slack, Jira, Notion, whatever you use.`,

  benefits: `<strong>What this gives you:</strong>
<ul style="margin:12px 0;padding-left:20px;color:#555;line-height:1.8">
  <li>Take on briefs without hiring — scale up when busy, scale down when quiet</li>
  <li>Offer Next.js, React, TypeScript and AI integrations without building the in-house team</li>
  <li>Faster delivery — we're full-time on your project, not split across ten clients</li>
  <li>Fixed monthly or per-project pricing, no recruitment overhead</li>
</ul>`,

  stack: `<strong>Our stack:</strong> Next.js · React · TypeScript · Node.js · REST &amp; GraphQL APIs · Supabase · PostgreSQL · AI integrations (OpenAI, Anthropic) · Headless CMS (Sanity, Contentful, Strapi)`,

  timezone: `We're UTC+3 (Istanbul). That's a 2–3 hour overlap with Western Europe every morning, and a clean async handoff for the US — you brief before close of day, deliverables are ready when you open. Turnaround on small tasks: 24h. Typical project delivery: 4–8 weeks.`,

  close: `If you've ever had to turn down a brief because of capacity or stack gaps, that's the gap we fill. Happy to share examples of past work under NDA, or just jump on a 20-minute call to see if there's a fit.`,
}

function ctaUrl(slug) {
  return `https://solmandigital.com.tr/en/white-label?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
}

function waUrl(slug) {
  const text = `Hi, I saw your email about white-label development and I'd like to discuss a partnership. (Ref: ${slug})`
  return `https://wa.me/905439675250?text=${encodeURIComponent(text)}`
}

function buildHtml({ slug, agencyName }) {
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px">
<div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:28px 40px">
  <p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p>
  <p style="margin:6px 0 0;color:#888;font-size:13px">Development Office · Istanbul, Turkey</p>
</div>
<div style="background:#fff;padding:40px">
  <h1 style="margin:0 0 20px;font-size:21px;font-weight:800;color:#111">Hi ${agencyName} team,</h1>

  <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.75">${BODY.opening}</p>

  <div style="background:#f8f8f8;border-left:3px solid #9b1c1c;padding:20px 24px;border-radius:0 8px 8px 0;margin:0 0 24px">
    <p style="margin:0 0 12px;font-size:15px;color:#333;line-height:1.75">${BODY.model}</p>
  </div>

  <p style="margin:0 0 4px;font-size:15px;color:#333;line-height:1.75">${BODY.benefits}</p>

  <p style="margin:0 0 16px;font-size:14px;color:#666;line-height:1.75"><strong>Our stack:</strong> Next.js · React · TypeScript · Node.js · REST &amp; GraphQL APIs · Supabase · PostgreSQL · AI integrations (OpenAI, Anthropic) · Headless CMS (Sanity, Contentful, Strapi)</p>

  <p style="margin:0 0 20px;font-size:14px;color:#666;line-height:1.75">${BODY.timezone}</p>

  <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.75">${BODY.close}</p>

  <a href="${ctaUrl(slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Schedule a Call</a>
  <a href="${waUrl(slug)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp</a>

  <p style="margin:24px 0 0;font-size:13px;color:#999;line-height:1.6">Reply directly to this email — you'll reach the person doing the work.</p>
</div>
<div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:20px 40px;border-top:1px solid #e0e0e0">
  <p style="margin:0 0 6px;font-size:12px;color:#aaa">Solman Digital · Istanbul, Turkey (UTC+3) · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a></p>
  <p style="margin:0;font-size:12px;color:#aaa">Sent to your business contact address. To unsubscribe, <a href="mailto:info@solmandigital.com.tr?subject=Unsubscribe" style="color:#9b1c1c">let us know</a>.</p>
</div>
</div>`
}

function buildText({ slug, agencyName }) {
  return `Hi ${agencyName} team,

${BODY.opening}

HOW IT WORKS
You send us the brief. We scope, estimate, and build. You review at every milestone. Your client never knows we exist. We sign NDAs as standard and adapt to your internal processes.

WHAT YOU GET
- Take on briefs without hiring — scale up when busy, scale down when quiet
- Offer Next.js, React, TypeScript and AI integrations without building the in-house team
- Faster delivery — we're full-time on your project, not split across ten clients
- Fixed monthly or per-project pricing, no recruitment overhead

STACK
Next.js · React · TypeScript · Node.js · REST & GraphQL APIs · Supabase · PostgreSQL · AI integrations · Headless CMS

TIMEZONE
UTC+3 (Istanbul). 2–3h overlap with Western Europe every morning, clean async handoff for the US. Turnaround on small tasks: 24h. Typical project delivery: 4–8 weeks.

${BODY.close}

Schedule a call: ${ctaUrl(slug)}
WhatsApp: ${waUrl(slug)}

Reply directly to this email — you'll reach the person doing the work.

---
Solman Digital · Istanbul, Turkey (UTC+3) · solmandigital.com.tr
To unsubscribe, reply with "unsubscribe" or email info@solmandigital.com.tr`
}

// Load found emails
const found = JSON.parse(readFileSync("scripts/found-emails.json", "utf8"))

// Load suppress list
let suppress = []
try { suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")) } catch {}
const suppressSet = new Set(suppress.map(e => e.toLowerCase()))

// Load already-sent batch-5 emails
let sent5 = []
try {
  sent5 = JSON.parse(readFileSync("scripts/leads-batch-5.json", "utf8")).map(m => m.to.toLowerCase())
} catch {}
const sentSet = new Set(sent5)

// Known junk patterns to filter
const JUNK_PATTERNS = [
  /gloin.*searchly/,       // Cyber-Duck internal search
  /%[0-9a-f]{2}/i,         // URL-encoded chars in email
  /geear\.io$/,            // Wrong domain scrape artefact
]

const seen = new Set()
const messages = []

for (const [i, entry] of found.entries()) {
  const email = (entry.email || "").toLowerCase().trim()
  if (!email) continue
  if (JUNK_PATTERNS.some(p => p.test(email))) { console.log(`SKIP (junk): ${email}`); continue }
  if (suppressSet.has(email)) { console.log(`SKIP (suppress): ${email}`); continue }
  if (sentSet.has(email)) { console.log(`SKIP (already sent batch-5): ${email}`); continue }
  if (seen.has(email)) { console.log(`SKIP (dupe): ${email}`); continue }
  seen.add(email)

  const agencyName = entry.title || entry.name || "team"
  const slug = email.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 20)

  messages.push({
    to: email,
    subject: pickSubject(i),
    html: buildHtml({ slug, agencyName }),
    text: buildText({ slug, agencyName }),
  })
}

writeFileSync("scripts/leads-batch-6.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail üretildi → scripts/leads-batch-6.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
