// Kişiselleştirilmiş email push aracı.
// Kullanım: node scripts/email-push.mjs <mesajlar.json>
//
// JSON formatı (render edilmiş mesajlar):
// [
//   { "to": "ornek@firma.com", "subject": "...", "html": "...", "text": "..." }
// ]
//
// EMAIL_PUSH_SECRET .env.local içinden okunur. Hedef: production site.

import { readFileSync } from "node:fs"

const TARGET = process.env.PUSH_TARGET || "https://solmandigital.com.tr/api/email/push"
const CHUNK = 100
const DELAY_MS = 700

const file = process.argv[2]
if (!file) {
  console.error("Kullanım: node scripts/email-push.mjs <mesajlar.json>")
  process.exit(1)
}

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
const secret = env.match(/^EMAIL_PUSH_SECRET=(.+)$/m)?.[1]?.trim()
if (!secret) {
  console.error(".env.local içinde EMAIL_PUSH_SECRET bulunamadı")
  process.exit(1)
}

const messages = JSON.parse(readFileSync(file, "utf8"))
if (!Array.isArray(messages) || messages.length === 0) {
  console.error("JSON dosyası boş olmayan bir dizi olmalı")
  process.exit(1)
}

console.log(`${messages.length} mesaj, ${Math.ceil(messages.length / CHUNK)} parça halinde gönderilecek → ${TARGET}`)

let sent = 0
for (let i = 0; i < messages.length; i += CHUNK) {
  const chunk = messages.slice(i, i + CHUNK)
  const res = await fetch(TARGET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ messages: chunk }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    console.error(`Parça ${i / CHUNK + 1} HATA (${res.status}):`, json.error ?? json)
    console.error(`Gönderilen: ${sent}, kalan: ${messages.length - sent}`)
    process.exit(1)
  }
  sent += chunk.length
  console.log(`Parça ${i / CHUNK + 1}: ${chunk.length} mesaj gönderildi (toplam ${sent}/${messages.length})`)
  if (i + CHUNK < messages.length) await new Promise((r) => setTimeout(r, DELAY_MS))
}

console.log("Tamamlandı.")
