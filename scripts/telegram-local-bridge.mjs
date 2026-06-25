// LOKAL TEST köprüsü: Telegram'ı public URL'e açmadan reply'leri siteye taşır.
// getUpdates ile long-poll yapar, gelen reply'i localhost webhook'una POST eder.
// SADECE lokal geliştirme için — production'da setup-telegram-webhook.mjs kullanılır.
import { readFileSync } from "node:fs"

function readEnv(key) {
  if (process.env[key]) return process.env[key]
  const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(new RegExp(`^${key}\\s*=\\s*(.*)$`))
    if (m) { let v = m[1].trim(); if ((v.startsWith("'")&&v.endsWith("'"))||(v.startsWith('"')&&v.endsWith('"'))) v=v.slice(1,-1); return v }
  }
  return null
}

const token = readEnv("TELEGRAM_BOT_TOKEN")
const secret = readEnv("TELEGRAM_WEBHOOK_SECRET") // yoksa webhook secret kontrolü atlanır
const PORT = process.argv[2] || "3000"
const WEBHOOK = `http://localhost:${PORT}/api/chat/webhook`

if (!token) { console.error("TELEGRAM_BOT_TOKEN yok"); process.exit(1) }

// Eğer prod webhook kuruluysa getUpdates çalışmaz → önce sil.
await fetch(`https://api.telegram.org/bot${token}/deleteWebhook`)
console.log(`[bridge] dinleniyor… reply'ler → ${WEBHOOK}`)
console.log(`[bridge] Telegram'da bot mesajini REPLY'leyerek test et. Ctrl+C ile durdur.\n`)

let offset = 0
for (;;) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?timeout=30&offset=${offset}`)
    const data = await res.json()
    if (!data.ok) { await new Promise(r => setTimeout(r, 2000)); continue }
    for (const upd of data.result) {
      offset = upd.update_id + 1
      const headers = { "Content-Type": "application/json" }
      if (secret) headers["x-telegram-bot-api-secret-token"] = secret
      const r = await fetch(WEBHOOK, { method: "POST", headers, body: JSON.stringify(upd) })
      const txt = upd.message?.text?.slice(0, 40) ?? ""
      const isReply = !!upd.message?.reply_to_message
      console.log(`[bridge] update ${upd.update_id} → ${r.status} ${isReply ? "(REPLY: " + txt + ")" : "(reply degil, atlandi)"}`)
    }
  } catch (e) {
    console.error("[bridge] hata:", e.message)
    await new Promise(r => setTimeout(r, 2000))
  }
}
