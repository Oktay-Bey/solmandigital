// Telegram Bot API — canlı sohbet köprüsü.
// Ziyaretçi mesajı buradan senin Telegram'ına düşer; sen reply'lersin.
const API = (token: string, method: string) => `https://api.telegram.org/bot${token}/${method}`

interface SendResult {
  ok: boolean
  messageId?: number
  error?: string
}

// Bildirim mesajını gönder. session id görünür şekilde eklenir → reply ile eşleşme.
export async function sendTelegramMessage(text: string): Promise<SendResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID tanımlı değil" }
  }
  try {
    const res = await fetch(API(token, "sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    })
    const data = (await res.json()) as { ok: boolean; result?: { message_id: number }; description?: string }
    if (!data.ok) return { ok: false, error: data.description }
    return { ok: true, messageId: data.result?.message_id }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "telegram fetch hatası" }
  }
}
