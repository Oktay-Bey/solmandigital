// UK ajansları için white-label ortaklık mailleri (İngilizce) → scripts/leads-batch-5.json
import { writeFileSync } from "node:fs"

const CAMPAIGN = "uk-whitelabel-1"

const SOLUTION = `At Solman Digital, we partner with agencies as a silent development team — you keep the client relationship, we handle the build. Our stack: Next.js, React, TypeScript, REST/GraphQL APIs, AI integrations. Based in Istanbul (UTC+3), we overlap with UK hours every morning and deliver async the rest of the day. Senior-level work, agency-friendly rates.`

// Agency-specific data for personalisation
const leads = [
  {
    slug: "soapmedia",
    to: "enquiries@soapmedia.co.uk",
    agencyName: "Soap Media",
    city: "Manchester",
    niche: "digital agency",
    subject: "White-label dev partnership — we handle the build, you own the client",
    compliment: `Soap Media has built a strong reputation in Manchester's digital scene — the kind of agency that wins complex briefs and delivers consistently.`,
    opportunity: `When project load peaks or a client brief needs Next.js, React or AI integration expertise, having a reliable white-label dev partner means you never have to turn work away. We step in invisibly, you deliver under your brand.`,
  },
  {
    slug: "pcmsystems",
    to: "info@pcmsystems.co.uk",
    agencyName: "PCM Systems",
    city: "Leeds",
    niche: "software & web development",
    subject: "White-label dev partnership — Next.js, React, AI integrations",
    compliment: `PCM Systems already offers subcontract and white-label development — so you understand the model and the value it brings when capacity gets tight.`,
    opportunity: `We'd like to be on your radar as a reliable build partner for overflow work, especially on modern stacks: Next.js, React, TypeScript, API integrations and AI-powered features. Senior-level output, no client-facing contact.`,
  },
  {
    slug: "splitpixel",
    to: "hello@splitpixel.co.uk",
    agencyName: "Splitpixel",
    city: "Leeds",
    niche: "web agency",
    subject: "White-label dev partner — for when your sprint is full",
    compliment: `Splitpixel has a clear craft-first approach — the kind of agency where quality matters more than volume.`,
    opportunity: `When your sprint fills up and a new brief lands, turning it away costs more than the project itself. We work as a white-label build partner — Next.js, React, TypeScript, API integrations — under your brand, invisible to your client.`,
  },
  {
    slug: "manifesto",
    to: "hello@manifesto.co.uk",
    agencyName: "Manifesto",
    city: "London",
    niche: "digital agency",
    subject: "White-label dev partnership — overflow capacity for complex builds",
    compliment: `Manifesto works on ambitious digital projects — the kind that need both strategic thinking and solid technical execution.`,
    opportunity: `For complex builds where you need extra development capacity — Next.js apps, API integrations, AI features — we act as a silent build partner. You own the relationship, we deliver the code. UTC+3 means we're online during your morning.`,
  },
  {
    slug: "browserlondon",
    to: "hello@browserlondon.com",
    agencyName: "Browser London",
    city: "London",
    niche: "product & web agency",
    subject: "White-label dev partner — Next.js, React, AI integrations",
    compliment: `Browser London builds genuinely considered digital products — the attention to craft is visible across your work.`,
    opportunity: `When a project scope expands or a brief requires more dev bandwidth than you have in-house, a white-label partner lets you say yes without overstretching. We specialise in Next.js, React, TypeScript and AI integrations — senior-level, no shortcuts.`,
  },
  {
    slug: "engageinteractive",
    to: "hello@engage.agency",
    agencyName: "Engage Interactive",
    city: "Leeds",
    niche: "digital agency",
    subject: "White-label dev partner — overflow capacity when you need it",
    compliment: `Engage Interactive has built a strong portfolio across Leeds and beyond — the breadth of your work shows a team that handles real complexity.`,
    opportunity: `When project load peaks, having a white-label dev partner on call means you never have to decline good work. We cover Next.js, React, API integrations and AI features — invisible to your clients, reliable for your team.`,
  },
  {
    slug: "propeller",
    to: "info@propeller.co.uk",
    agencyName: "Propeller Communications",
    city: "London",
    niche: "communications & digital agency",
    subject: "White-label dev partner — for briefs that need build muscle",
    compliment: `Propeller Communications handles briefs that span strategy, content and digital — when those projects need solid development behind them, the build quality matters.`,
    opportunity: `For campaigns or digital projects where the build needs to match the ambition, we work as a white-label development partner — Next.js, React, CMS integrations, API work. You brief us, we build, you deliver.`,
  },
  {
    slug: "cohaesus",
    to: "transform@cohaesus.co.uk",
    agencyName: "Cohaesus",
    city: "London",
    niche: "digital transformation agency",
    subject: "White-label dev partner — Next.js, React, AI integrations",
    compliment: `Cohaesus works on digital transformation projects — the kind that require both technical depth and the ability to move fast.`,
    opportunity: `Transformation projects often surface scope that outpaces available capacity. We work as a white-label build partner on Next.js, React, API integrations and AI-powered features — senior-level, your brand, no friction.`,
  },
  {
    slug: "matterofform",
    to: "hello@matterofform.com",
    agencyName: "Matter of Form",
    city: "London",
    niche: "luxury digital agency",
    subject: "White-label dev partner — for builds that need to match the brief",
    compliment: `Matter of Form works with premium brands where the digital experience has to match the calibre of the product — that sets a high bar for every build.`,
    opportunity: `When a premium brief needs more dev resource than you have in-house, the build quality can't slip. We work as a white-label partner — Next.js, React, TypeScript, bespoke integrations — senior-level output that holds up to scrutiny.`,
  },
  {
    slug: "ridgeway",
    to: "hello@ridgeway.com",
    agencyName: "Ridgeway",
    city: "Hampshire",
    niche: "digital agency",
    subject: "White-label dev partnership — overflow capacity, your brand",
    compliment: `Ridgeway has a broad digital portfolio — web, apps, integrations — the kind of agency that handles varied and demanding client work.`,
    opportunity: `When a project needs more development capacity than you have available, a white-label partner keeps things moving. We cover Next.js, React, TypeScript and API integrations — delivered under your brand, invisible to your client.`,
  },
  {
    slug: "hallam",
    to: "info@hallam.co.uk",
    agencyName: "Hallam Internet",
    city: "Nottingham",
    niche: "digital marketing & web agency",
    subject: "White-label dev partner — for briefs beyond the marketing stack",
    compliment: `Hallam has built one of the UK's most respected digital marketing practices — when those clients need custom web builds or integrations, the technical bar is already set high.`,
    opportunity: `When a client brief requires custom development beyond the marketing stack — Next.js, React apps, API integrations, AI features — we work as a white-label build partner. You keep the account, we handle the build.`,
  },
  {
    slug: "boxuk",
    to: "info@boxuk.com",
    agencyName: "Box UK",
    city: "Cardiff",
    niche: "software & web development",
    subject: "White-label dev partner — Next.js, React, AI integrations",
    compliment: `Box UK delivers complex software and web projects for serious clients — the kind of work where cutting corners isn't an option.`,
    opportunity: `For projects where you need extra Next.js, React or AI integration capacity without bringing in permanent hires, a white-label build partner gives you flexibility. Senior-level output, your brand, UTC+3 timezone overlap with UK mornings.`,
  },
  {
    slug: "rawnet",
    to: "hello@rawnet.com",
    agencyName: "Rawnet",
    city: "London",
    niche: "digital agency",
    subject: "White-label dev partner — when capacity is the constraint",
    compliment: `Rawnet builds ambitious digital products and platforms — the portfolio shows a team that takes on complex, long-running work.`,
    opportunity: `Complex projects sometimes need more build capacity mid-sprint. We work as a white-label dev partner — Next.js, React, TypeScript, API integrations — picking up scope overflow without disrupting your workflow or client relationship.`,
  },
  {
    slug: "ctidigital",
    to: "hello@ctidigital.com",
    agencyName: "CTI Digital",
    city: "Manchester",
    niche: "digital agency",
    subject: "White-label dev partner — overflow capacity, modern stack",
    compliment: `CTI Digital handles large-scale digital projects across ecommerce, web and content — the kind of agency where project complexity is the norm.`,
    opportunity: `When briefs pile up and capacity tightens, a white-label build partner keeps you from turning away good work. We cover Next.js, React, TypeScript, headless CMS integrations and AI features — senior-level, under your brand.`,
  },
  {
    slug: "gravitywell",
    to: "hello@gravitywell.co.uk",
    agencyName: "Gravitywell",
    city: "Bristol",
    niche: "product & app agency",
    subject: "White-label dev partner — Next.js, React, AI integrations",
    compliment: `Gravitywell builds thoughtful digital products — the focus on product thinking alongside solid engineering sets you apart.`,
    opportunity: `When a product brief needs more development bandwidth than you have available, a white-label partner lets you scale without hiring. We specialise in Next.js, React, TypeScript and AI integrations — reliable, senior-level, no client-facing contact.`,
  },
  {
    slug: "atomicsmash",
    to: "mail@atomicsmash.co.uk",
    agencyName: "Atomic Smash",
    city: "Bristol",
    niche: "web agency",
    subject: "White-label dev partner — for when your team is stretched",
    compliment: `Atomic Smash does careful, quality-first web work — the kind of agency where every build is taken seriously.`,
    opportunity: `When your team is stretched and a new brief lands, a white-label dev partner means you don't have to choose between quality and capacity. We cover Next.js, React, WordPress/headless CMS and API integrations — under your brand, no shortcuts.`,
  },
  {
    slug: "adido",
    to: "hello@adi.do",
    agencyName: "Adido",
    city: "Bournemouth",
    niche: "digital agency",
    subject: "White-label dev partner — overflow capacity for digital builds",
    compliment: `Adido handles a wide range of digital briefs — marketing, web and beyond — the kind of agency where client needs don't stay neatly in one lane.`,
    opportunity: `When a client brief crosses into custom web development or technical integrations, having a white-label build partner means you can handle it without gaps. We cover Next.js, React, API integrations and AI features — delivered under your brand.`,
  },
  {
    slug: "impressiondigital",
    to: "hello@impressiondigital.com",
    agencyName: "Impression Digital",
    city: "Nottingham",
    niche: "digital agency",
    subject: "White-label dev partner — for briefs that need build muscle",
    compliment: `Impression Digital has built a strong reputation in SEO, PPC and digital strategy — when those campaigns need a solid technical web build behind them, the quality has to hold.`,
    opportunity: `When a client needs custom development alongside the digital strategy — landing pages, web apps, API integrations — we work as a white-label build partner. You keep the relationship, we handle the technical delivery.`,
  },
  {
    slug: "embryodigital",
    to: "info@embryo.com",
    agencyName: "Embryo Digital",
    city: "Manchester",
    niche: "digital agency",
    subject: "White-label dev partner — overflow capacity, modern stack",
    compliment: `Embryo Digital has grown fast in Manchester's agency scene — the breadth of your digital offering means client briefs rarely stay simple.`,
    opportunity: `As your agency grows, some briefs will need more dev capacity than you have available. A white-label build partner covers the overflow — Next.js, React, TypeScript, API integrations — without the overhead of a full-time hire.`,
  },
  {
    slug: "herdagency",
    to: "alen@theherd.group",
    agencyName: "Herd Agency",
    city: "Manchester",
    niche: "digital agency",
    subject: "White-label dev partner — when your sprint is full",
    compliment: `Herd Agency handles ambitious digital work across strategy and execution — the kind of agency where briefs evolve and scope grows.`,
    opportunity: `When a brief grows beyond your current sprint capacity, a white-label partner keeps things moving. We cover Next.js, React, TypeScript and AI integrations — senior output, under your brand, no friction for your client.`,
  },
  {
    slug: "superrb",
    to: "hello@superrb.com",
    agencyName: "Superrb",
    city: "London",
    niche: "web & app agency",
    subject: "White-label dev partner — Next.js, React, AI integrations",
    compliment: `Superrb builds clean, considered digital products — the attention to code quality and user experience is evident across your work.`,
    opportunity: `When project load peaks or a brief needs extra React/Next.js or AI integration capacity, we work as a white-label build partner — senior-level, your brand, UTC+3 overlap with UK hours every morning.`,
  },
  {
    slug: "bolser",
    to: "info@bolser.co.uk",
    agencyName: "Bolser",
    city: "Leeds",
    niche: "digital agency",
    subject: "White-label dev partner — overflow capacity for digital builds",
    compliment: `Bolser handles complex digital projects across a range of sectors — the kind of agency where delivery quality is non-negotiable.`,
    opportunity: `When briefs pile up or a project needs more dev bandwidth, a white-label partner keeps your commitments intact. We cover Next.js, React, API integrations and AI features — delivered under your brand, invisible to your client.`,
  },
  {
    slug: "kagool",
    to: "info@kagool.com",
    agencyName: "Kagool",
    city: "Manchester",
    niche: "Sitecore & digital agency",
    subject: "White-label dev partner — React, Next.js, API integrations",
    compliment: `Kagool specialises in Sitecore and complex enterprise digital — the kind of technical depth that enterprise clients demand.`,
    opportunity: `When a project needs frontend build capacity alongside the Sitecore work — React, Next.js, TypeScript, API integrations — a white-label dev partner covers the gap without disrupting delivery timelines or client relationships.`,
  },
  {
    slug: "zestcode",
    to: "partnerships@zestcode.digital",
    agencyName: "Zestcode Digital",
    city: "Northamptonshire",
    niche: "white-label web development",
    subject: "Dev partnership — Next.js, React, AI integrations",
    compliment: `Zestcode is already built around the agency partnership model — so you know better than most how much value a reliable development partner brings.`,
    opportunity: `We'd like to explore whether there's a fit. Our stack is Next.js, React, TypeScript, REST/GraphQL APIs and AI integrations. We work as a silent build partner — senior-level output, your timelines, UTC+3 timezone overlap with UK mornings.`,
  },
  {
    slug: "theherdgroup",
    to: "alen@theherd.group",
    agencyName: "Herd Group",
    city: "Manchester",
    niche: "digital agency",
    subject: "White-label dev partner — overflow capacity, modern stack",
    compliment: `Herd Group builds ambitious work across digital strategy and execution.`,
    opportunity: `When capacity tightens and a new brief lands, a white-label dev partner keeps things moving. We cover Next.js, React, TypeScript and API integrations — under your brand, senior-level, no shortcuts.`,
  },
]

// Dedupe by email
const seen = new Set()
const unique = leads.filter(l => {
  if (seen.has(l.to)) return false
  seen.add(l.to)
  return true
})

function ctaUrl(slug) {
  return `https://solmandigital.com.tr/en/white-label?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
}

function waUrl(slug) {
  const text = `Hi, I received your email and I'd like to discuss a white-label development partnership. (Ref: ${slug})`
  return `https://wa.me/905439675250?text=${encodeURIComponent(text)}`
}

function buildHtml({ slug, agencyName, city, compliment, opportunity }) {
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Hi ${agencyName} team,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${compliment}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${opportunity}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${SOLUTION}</p><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">If you're open to it, we'd love a short intro call — or just keep us in mind for the next time capacity is the constraint.</p><a href="${ctaUrl(slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Let's Talk</a><a href="${waUrl(slug)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Feel free to reply directly to this email — you'll reach the person who'd be doing the work.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — Istanbul, Turkey (UTC+3) · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a></p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Sent to your business contact address. To unsubscribe, <a href="mailto:info@solmandigital.com.tr?subject=Unsubscribe" style="color:#9b1c1c">let us know</a>.</p></div></div>`
}

function stripTags(s) { return s.replace(/<[^>]+>/g, "") }

function buildText({ slug, agencyName, compliment, opportunity }) {
  return [
    `Hi ${agencyName} team,`,
    stripTags(compliment),
    stripTags(opportunity),
    stripTags(SOLUTION),
    `If you're open to it, we'd love a short intro call.\n${ctaUrl(slug)}\nWhatsApp: ${waUrl(slug)}\nOr just reply to this email directly.`,
    "Solman Digital — Istanbul, Turkey (UTC+3) · solmandigital.com.tr\nTo unsubscribe, reply with 'unsubscribe' or email info@solmandigital.com.tr",
  ].join("\n\n")
}

const messages = unique.map((l) => ({
  to: l.to,
  subject: l.subject,
  html: buildHtml(l),
  text: buildText(l),
}))

writeFileSync(new URL("./leads-batch-5.json", import.meta.url), JSON.stringify(messages, null, 2), "utf8")
console.log(`${messages.length} mail üretildi → scripts/leads-batch-5.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
