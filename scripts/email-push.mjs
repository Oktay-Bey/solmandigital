// Brevo API ile doğrudan toplu mail gönderimi (lokalde çalışır, IP sorunu yok)
// Kullanım: node scripts/email-push.mjs <leads.json>

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

const FROM = { name: "Solman Digital", email: env.RESEND_FROM_EMAIL || "info@solmandigital.com.tr" }
const REPLY_TO = { email: "info@solmandigital.com.tr" }
const CONCURRENCY = 5
const DELAY_MS = 300

const messages = JSON.parse(readFileSync(file, "utf8"))
if (!Array.isArray(messages) || messages.length === 0) {
  console.error("JSON dosyası boş olmayan bir dizi olmalı"); process.exit(1)
}

console.log(`${messages.length} mesaj gönderilecek → Brevo API (doğrudan)`)

async function sendOne(msg) {
  const body = {
    sender: FROM,
    to: [{ email: msg.to }],
    replyTo: REPLY_TO,
    subject: msg.subject,
    ...(msg.html ? { htmlContent: msg.html } : {}),
    ...(msg.text ? { textContent: msg.text } : {}),
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`${res.status}: ${err}`)
  }
  const data = await res.json()
  return data.messageId ?? "ok"
}

let sent = 0, failed = 0

for (let i = 0; i < messages.length; i += CONCURRENCY) {
  const chunk = messages.slice(i, i + CONCURRENCY)
  const results = await Promise.allSettled(chunk.map(sendOne))
  for (let j = 0; j < results.length; j++) {
    const r = results[j]
    if (r.status === "fulfilled") {
      sent++
      console.log(`  ✓ [${sent}/${messages.length}] ${chunk[j].to}`)
    } else {
      failed++
      console.log(`  ✗ ${chunk[j].to} — ${r.reason?.message}`)
    }
  }
  if (i + CONCURRENCY < messages.length) await new Promise(r => setTimeout(r, DELAY_MS))
}

console.log(`\nTamamlandı. Gönderilen: ${sent} | Hatalı: ${failed}`)
