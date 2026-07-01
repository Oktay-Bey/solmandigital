// Lead JSON'undaki web sitelerini tarayıp email tespit eder.
// Kullanım: node scripts/find-emails.mjs <leads.json> <hedef-adet>

import { readFileSync, writeFileSync } from "node:fs"
import { setTimeout as sleep } from "node:timers/promises"

const file = process.argv[2]
const target = Number(process.argv[3] ?? 10)
const leads = JSON.parse(readFileSync(file, "utf8"))

const SKIP_SITE = /instagram|facebook|wa\.me|whatsapp|linktr|doktortakvimi|doktorsitesi/i
const JUNK_EMAIL = /\.(png|jpe?g|gif|webp|svg|css|js)$|example\.|sentry|wixpress|godaddy|domain\.com|@(?:2x|3x)|no-?reply|schema\.org|@website\.|@site\.|@yourdomain|@email\.com|@mail\.com|@test\.|placeholder|unsubscribe|searchly|gloin|noreply/i
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const PATHS = ["", "contact", "contact-us", "about", "about-us", "imprint", "impressum", "kontakt", "iletisim"]

const FETCH_TIMEOUT = 5000  // per request
const LEAD_TIMEOUT  = 20000 // per site (all paths combined)
const CONCURRENCY   = 5

// Hard timeout wrapper — resolves with fallback regardless of what the promise does
function withTimeout(promise, ms, fallback = null) {
  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(fallback), ms)
    promise.then(v => { clearTimeout(timer); resolve(v) })
          .catch(() => { clearTimeout(timer); resolve(fallback) })
  })
}

async function fetchText(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" },
    })
    if (!res.ok) return ""
    return await res.text()
  } catch {
    return ""
  } finally {
    clearTimeout(timer)
  }
}

function extractEmails(html) {
  const decoded = html
    .replace(/&#64;|%40/g, "@")
    .replace(/\s*\[at\]\s*/gi, "@")
    .replace(/\s*\(at\)\s*/gi, "@")
  const found = decoded.match(EMAIL_RE) ?? []
  return [...new Set(found.map(e => e.toLowerCase()))]
    .filter(e => !JUNK_EMAIL.test(e))
    .filter(e => e.length < 80)  // sanity check
}

async function scanLeadInner(lead) {
  const site = lead.website
  if (!site || SKIP_SITE.test(site)) return null
  const base = site.replace(/\/$/, "")
  for (const path of PATHS) {
    const url = path ? `${base}/${path}` : base
    try {
      const html = await withTimeout(fetchText(url), FETCH_TIMEOUT, "")
      const emails = extractEmails(html)
      if (emails.length > 0) return { lead, email: emails[0], allEmails: emails.slice(0, 3) }
    } catch {
      // continue to next path
    }
  }
  return null
}

async function scanLead(lead) {
  return withTimeout(scanLeadInner(lead), LEAD_TIMEOUT, null)
}

// Process all leads in parallel batches
const results = []
const seenEmails = new Set()
const total = leads.length

for (let i = 0; i < total; i += CONCURRENCY) {
  const batch = leads.slice(i, i + CONCURRENCY)
  const batchNum = Math.floor(i / CONCURRENCY) + 1
  process.stdout.write(`\n[Batch ${batchNum}/${Math.ceil(total / CONCURRENCY)}] `)

  const settled = await Promise.allSettled(batch.map(scanLead))

  for (let j = 0; j < settled.length; j++) {
    const lead = batch[j]
    const res = settled[j].status === "fulfilled" ? settled[j].value : null
    if (!res) {
      process.stdout.write(`  ✗ ${lead.title.slice(0, 35)}\n`)
      continue
    }
    const { email, allEmails } = res
    if (seenEmails.has(email)) {
      process.stdout.write(`  ~ ${lead.title.slice(0, 35)} → ${email} (dupe)\n`)
      continue
    }
    seenEmails.add(email)
    results.push({
      title: lead.title,
      email,
      allEmails,
      website: lead.website,
      city: lead.city ?? null,
      country: lead.country ?? null,
      sector: lead.sector ?? null,
    })
    process.stdout.write(`  ✓ [${results.length}] ${lead.title.slice(0, 35)} → ${email}\n`)
  }

  // Save intermediate results after each batch
  writeFileSync(
    new URL("./found-emails.json", import.meta.url),
    JSON.stringify(results, null, 2),
    "utf8"
  )
}

console.log(`\n${"─".repeat(50)}`)
console.log(`${results.length} email bulundu → scripts/found-emails.json`)
for (const r of results) console.log(`  ${r.country ?? "??"} | ${r.title} → ${r.email}`)
