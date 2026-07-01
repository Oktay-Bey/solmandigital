# Email Outreach Otomasyon — Tam Kurulum Promptu

Senden bir B2B cold outreach email pipeline'ı kurmanı istiyorum.
Teknolojiler: Node.js ESM scripts (.mjs), Brevo API, web scraping (native fetch).
Dış kütüphane yok — sadece Node.js built-in modülleri.

---

## Dizin Yapısı

scripts/ altında şu dosyalar oluşturulacak:

- suppress-list.json         — bounce/unsubscribe listesi
- scrape-agencies.mjs        — hedef siteyi scrape et → raw JSON
- find-emails.mjs            — raw JSON'daki siteleri tara → found-emails.json
- build-mails-batch-1.mjs    — found-emails verisinden mail üret → leads-batch-1.json
- preview-batch-1.mjs        — leads-batch-1.json'u preview emaili olarak gönder
- email-push.mjs             — evrensel gönderim scripti (tüm batch'ler için)

---

## ADIM 1 — suppress-list.json

Başlangıçta boş dizi:
```json
[]
```
Bounce veya unsubscribe geldiğinde buraya ekle.
Her build-mails script'i bu listeyi okuyup filtreleyecek.

---

## ADIM 2 — scrape-agencies.mjs

Clutch.co veya benzeri bir dizin sitesinden hedef firmaların listesini çeker.
Çıktı formatı: `[{ title, website, city, country }]`
Dosyaya yazar: `scripts/agencies-raw.json`

Clutch engellenirse FALLBACK_AGENCIES adlı hardcoded bir dizi tanımla —
aynı formatta, elle toplanmış 30-50 ajans.

```js
import { writeFileSync } from "node:fs"

const PAGES = [
  "https://clutch.co/web-developers/[ÜLKE]",
  // ...
]

async function fetchPage(url) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 12000)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-GB,en;q=0.9",
      },
    })
    if (!res.ok) { console.log(`HTTP ${res.status} → ${url}`); return "" }
    return await res.text()
  } catch (e) {
    console.log(`Hata: ${e.message}`)
    return ""
  } finally {
    clearTimeout(t)
  }
}

// Clutch profil sayfasından external website URL'sini çıkar
async function getAgencyWebsite(profilePath) {
  const html = await fetchPage("https://clutch.co" + profilePath)
  if (!html) return null

  const websiteRe = /href="(https?:\/\/(?!clutch\.co|facebook|twitter|linkedin|instagram)[^"]+)"[^>]*(?:rel="nofollow noopener"|website)/gi
  let m
  while ((m = websiteRe.exec(html)) !== null) {
    const url = m[1].split("?")[0].replace(/\/$/, "")
    if (url.includes(".")) return url
  }

  const visitRe = /Visit Website[\s\S]{0,300}?href="(https?:\/\/(?!clutch)[^"]+)"/i
  const vm = html.match(visitRe)
  if (vm) return vm[1].split("?")[0]

  return null
}

// Clutch engellenirse bu listeyi kullan:
const FALLBACK_AGENCIES = [
  { title: "[Ajans Adı]", website: "https://...", city: "[Şehir]", country: "[Ülke]" },
  // ...
]

console.log(`${FALLBACK_AGENCIES.length} ajans → agencies-raw.json`)
writeFileSync(
  new URL("./agencies-raw.json", import.meta.url),
  JSON.stringify(FALLBACK_AGENCIES, null, 2),
  "utf8"
)
```

---

## ADIM 2B — find-emails.mjs

`agencies-raw.json`'daki her sitenin email adresini web'den tarar.
Çıktı: `scripts/found-emails.json`

Kullanım: `node scripts/find-emails.mjs scripts/agencies-raw.json`

```js
import { readFileSync, writeFileSync } from "node:fs"

const file = process.argv[2]
if (!file) { console.error("Kullanım: node scripts/find-emails.mjs <agencies.json>"); process.exit(1) }

const leads = JSON.parse(readFileSync(file, "utf8"))

const SKIP_SITE = /instagram|facebook|wa\.me|whatsapp|linktr/i
const JUNK_EMAIL = /\.(png|jpe?g|gif|webp|svg|css|js)$|example\.|sentry|wixpress|godaddy|no-?reply|noreply|schema\.org|@website\.|@yourdomain|@email\.com|@test\.|placeholder|unsubscribe/i
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const PATHS = ["", "contact", "contact-us", "about", "about-us", "imprint", "impressum"]

const FETCH_TIMEOUT = 5000   // ms, istek başına
const LEAD_TIMEOUT  = 20000  // ms, site başına (tüm path'ler dahil)
const CONCURRENCY   = 5

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
  } catch { return "" }
  finally { clearTimeout(timer) }
}

function extractEmails(html) {
  const decoded = html
    .replace(/&#64;|%40/g, "@")
    .replace(/\s*\[at\]\s*/gi, "@")
    .replace(/\s*\(at\)\s*/gi, "@")
  return [...new Set((decoded.match(EMAIL_RE) ?? []).map(e => e.toLowerCase()))]
    .filter(e => !JUNK_EMAIL.test(e))
    .filter(e => e.length < 80)
}

async function scanLeadInner(lead) {
  if (!lead.website || SKIP_SITE.test(lead.website)) return null
  const base = lead.website.replace(/\/$/, "")
  for (const path of PATHS) {
    const url = path ? `${base}/${path}` : base
    try {
      const html = await withTimeout(fetchText(url), FETCH_TIMEOUT, "")
      const emails = extractEmails(html)
      if (emails.length > 0) return { lead, email: emails[0], allEmails: emails.slice(0, 3) }
    } catch { continue }
  }
  return null
}

async function scanLead(lead) {
  return withTimeout(scanLeadInner(lead), LEAD_TIMEOUT, null)
}

const results = []
const seenEmails = new Set()
const total = leads.length

for (let i = 0; i < total; i += CONCURRENCY) {
  const batch = leads.slice(i, i + CONCURRENCY)
  const batchNum = Math.floor(i / CONCURRENCY) + 1
  process.stdout.write(`\n[Batch ${batchNum}/${Math.ceil(total / CONCURRENCY)}]\n`)

  const settled = await Promise.allSettled(batch.map(scanLead))

  for (let j = 0; j < settled.length; j++) {
    const lead = batch[j]
    const res = settled[j].status === "fulfilled" ? settled[j].value : null
    if (!res) { process.stdout.write(`  ✗ ${lead.title}\n`); continue }
    const { email, allEmails } = res
    if (seenEmails.has(email)) { process.stdout.write(`  ~ ${lead.title} → ${email} (dupe)\n`); continue }
    seenEmails.add(email)
    results.push({ title: lead.title, email, allEmails, website: lead.website, city: lead.city ?? null, country: lead.country ?? null })
    process.stdout.write(`  ✓ [${results.length}] ${lead.title} → ${email}\n`)
  }

  // Ara kayıt — crash güvenli
  writeFileSync(new URL("./found-emails.json", import.meta.url), JSON.stringify(results, null, 2), "utf8")
}

console.log(`\n${results.length} email bulundu → scripts/found-emails.json`)
```

---

## ADIM 3 — build-mails-batch-1.mjs

`found-emails.json`'dan okuyarak her lead için HTML + plain text mail üretir.
Suppress + dedup kontrolü yapar. Çıktı: `leads-batch-1.json`

```js
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "[CAMPAIGN_SLUG]"
const STACK = "[Next.js · React · TypeScript · ...]"
const TIMEZONE = "[UTC+3 — 2h overlap with UK mornings]"

// found-emails.json'dan oku (veya leads'i hardcode yaz)
const raw = JSON.parse(readFileSync("scripts/found-emails.json", "utf8"))
const leads = raw.map(r => ({
  slug: r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  to: r.email,
  agencyName: r.title,
  city: r.city ?? "",
}))

const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
// Önceki batch'ler varsa:
const prevSent = [/* "1", "2" ... */].flatMap(n => {
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

  const ctaUrl = `[CONTACT_URL]?utm_source=email&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${l.slug}`
  const waText = `Hi, I received your email about [KONU] and I'd like to learn more. (Ref: ${l.slug})`
  const waUrl = `https://wa.me/[NUMARA]?text=${encodeURIComponent(waText)}`

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
  <div style="background:#0d0d0d;padding:20px 32px">
    <span style="color:#fff;font-size:18px;font-weight:800">[MARKA ADI]</span>
  </div>
  <div style="padding:32px">
    <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111">[BAŞLIK]</p>
    <p style="margin:0 0 20px;font-size:12px;color:#9b1c1c;font-weight:600;text-transform:uppercase">for ${l.agencyName}</p>

    <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">[ANA PARAGRAF]</p>

    <div style="background:#f9f9f9;border-left:3px solid #9b1c1c;padding:14px 18px;border-radius:0 6px 6px 0;margin:0 0 18px">
      <p style="margin:0;font-size:13px;color:#555;line-height:1.8">
        ↗ [FAYDA 1]<br>
        ↗ [FAYDA 2]<br>
        ↗ [FAYDA 3] · ${TIMEZONE}
      </p>
    </div>

    <p style="margin:0 0 20px;font-size:13px;color:#888"><strong style="color:#555">Stack:</strong> ${STACK}</p>

    <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7">[KAPANIŞ PARAGRAF]</p>

    <table cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>
      <td style="padding-right:8px"><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">Schedule a Call</a></td>
      <td><a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">💬 WhatsApp</a></td>
    </tr></table>

    <p style="margin:0;font-size:12px;color:#aaa">Or reply — you'll reach the person doing the work.</p>
  </div>
  <div style="background:#f5f5f5;padding:14px 32px;border-top:1px solid #e5e5e5">
    <p style="margin:0;font-size:11px;color:#bbb">[MARKA] · [ŞEHİR] · <a href="[SITE]" style="color:#9b1c1c">[SITE]</a> · <a href="mailto:[EMAIL]?subject=Unsubscribe" style="color:#bbb">unsubscribe</a></p>
  </div>
</div>`

  const text = `[BAŞLIK] — ${l.agencyName}\n\n[ANA PARAGRAF]\n\n↗ [FAYDA 1]\n↗ [FAYDA 2]\n↗ [FAYDA 3]\n\nStack: ${STACK}\n\n[KAPANIŞ PARAGRAF]\n\nSchedule a call: ${ctaUrl}\nWhatsApp: ${waUrl}\n\nOr just reply.\n\n---\n[MARKA] · Unsubscribe: mailto:[EMAIL]`

  messages.push({
    to: l.to,
    subject: `[SUBJECT] — ${l.agencyName}`,
    html,
    text,
  })
}

writeFileSync("scripts/leads-batch-1.json", JSON.stringify(messages, null, 2), "utf8")
console.log(`\n${messages.length} mail → scripts/leads-batch-1.json`)
for (const m of messages) console.log(` - ${m.to}`)
```

---

## ADIM 4 — preview-batch-1.mjs

`leads-batch-1.json`'daki tüm mailleri tek bir HTML email içinde birleştirip
`[PREVIEW_EMAIL]` adresine gönderir. ONAY VERİLMEDEN gerçek gönderim yapılmaz.

---

## ADIM 5 — email-push.mjs (evrensel)

Kullanım: `node scripts/email-push.mjs scripts/leads-batch-1.json`

```js
import { readFileSync } from "node:fs"

const file = process.argv[2]
if (!file) { console.error("Kullanım: node scripts/email-push.mjs <leads.json>"); process.exit(1) }

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

const BREVO_API_KEY = env.BREVO_API_KEY
if (!BREVO_API_KEY) { console.error("BREVO_API_KEY bulunamadı (.env.local)"); process.exit(1) }

const FROM = { name: "[GÖNDERICI ADI]", email: "[GÖNDERICI EMAIL]" }
const REPLY_TO = { email: "[REPLY-TO EMAIL]" }
const CONCURRENCY = 5
const DELAY_MS = 300

const messages = JSON.parse(readFileSync(file, "utf8"))
console.log(`${messages.length} mesaj → Brevo API`)

async function sendOne(msg) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      sender: FROM,
      to: [{ email: msg.to }],
      replyTo: REPLY_TO,
      subject: msg.subject,
      ...(msg.html ? { htmlContent: msg.html } : {}),
      ...(msg.text ? { textContent: msg.text } : {}),
    }),
  })
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
  return (await res.json()).messageId ?? "ok"
}

let sent = 0, failed = 0
for (let i = 0; i < messages.length; i += CONCURRENCY) {
  const chunk = messages.slice(i, i + CONCURRENCY)
  const results = await Promise.allSettled(chunk.map(sendOne))
  for (let j = 0; j < results.length; j++) {
    const r = results[j]
    if (r.status === "fulfilled") { sent++; console.log(`  ✓ [${sent}/${messages.length}] ${chunk[j].to}`) }
    else { failed++; console.log(`  ✗ ${chunk[j].to} — ${r.reason?.message}`) }
  }
  if (i + CONCURRENCY < messages.length) await new Promise(r => setTimeout(r, DELAY_MS))
}
console.log(`\nTamamlandı. Gönderilen: ${sent} | Hatalı: ${failed}`)
```

---

## Tam Akış

```bash
node scripts/scrape-agencies.mjs
# → agencies-raw.json (ajans listesi: title, website, city, country)

node scripts/find-emails.mjs scripts/agencies-raw.json
# → found-emails.json (her site taranır, email bulunur)

node scripts/build-mails-batch-1.mjs
# → leads-batch-1.json (suppress + dedup + HTML üretimi)

node scripts/preview-batch-1.mjs
# → preview emaili [PREVIEW_EMAIL]'e gönder, kontrol et

node scripts/email-push.mjs scripts/leads-batch-1.json
# → onay sonrası Brevo API'ye gönder
```

---

## Kurallar (değiştirme)

1. Preview onayı olmadan gerçek alıcıya mail gönderme.
2. Suppress listesi her build'de kontrol edilir.
3. Aynı email adresi birden fazla batch'te varsa skip.
4. `.env.local`'da `BREVO_API_KEY` zorunlu.
5. HTML şablonunda `mailto:?subject=Unsubscribe` footer linki zorunlu.
6. find-emails.mjs her batch sonrası ara kayıt yapar — script yarıda kesilse veri kaybolmaz.

Şimdi [PLACEHOLDER] alanlarını doldurmamı bekle, ardından dosyaları oluştur.
