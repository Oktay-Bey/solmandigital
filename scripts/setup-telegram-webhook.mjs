// Telegram canlı sohbet webhook kurulumu.
// Kullanım:
//   node scripts/setup-telegram-webhook.mjs https://solmandigital.com.tr
// (lokal test için ngrok URL'i de verilebilir)
//
// TELEGRAM_BOT_TOKEN .env.local'den okunur. TELEGRAM_WEBHOOK_SECRET yoksa üretir
// ve ekrana basar → .env.local + Vercel env'e ekle.
import { readFileSync, appendFileSync } from "node:fs"
import { randomBytes } from "node:crypto"

const envUrl = new URL("../.env.local", import.meta.url)
function readEnv(key) {
  if (process.env[key]) return process.env[key]
  try {
    const txt = readFileSync(envUrl, "utf8")
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(new RegExp(`^${key}\\s*=\\s*(.*)$`))
      if (m) { let v = m[1].trim(); if ((v.startsWith("'")&&v.endsWith("'"))||(v.startsWith('"')&&v.endsWith('"'))) v=v.slice(1,-1); return v }
    }
  } catch { /* yok */ }
  return null
}

const baseUrl = process.argv[2]
if (!baseUrl) { console.error("Kullanım: node scripts/setup-telegram-webhook.mjs <https://site-url>"); process.exit(1) }

const token = readEnv("TELEGRAM_BOT_TOKEN")
if (!token) { console.error("TELEGRAM_BOT_TOKEN .env.local'de yok"); process.exit(1) }

let secret = readEnv("TELEGRAM_WEBHOOK_SECRET")
if (!secret) {
  secret = randomBytes(24).toString("hex")
  appendFileSync(envUrl, `\nTELEGRAM_WEBHOOK_SECRET=${secret}\n`)
  console.log("⚠️  TELEGRAM_WEBHOOK_SECRET üretildi ve .env.local'e eklendi:")
  console.log("   " + secret)
  console.log("   → Bunu Vercel env'e de eklemeyi unutma.\n")
}

const webhookUrl = `${baseUrl.replace(/\/$/, "")}/api/chat/webhook`

const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: webhookUrl,
    secret_token: secret,
    allowed_updates: ["message"],
    drop_pending_updates: true,
  }),
})
const data = await res.json()
console.log("setWebhook →", JSON.stringify(data, null, 2))

const info = await (await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`)).json()
console.log("\ngetWebhookInfo →", JSON.stringify(info.result, null, 2))
