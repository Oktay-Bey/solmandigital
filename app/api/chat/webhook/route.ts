import { NextRequest, NextResponse } from "next/server"
import { appendMessage, resolveSessionFromTelegram } from "@/lib/chat-store"

// Telegram → buraya. Sen bildirim mesajını REPLY'lediğinde, reply_to_message.message_id
// ile hangi session olduğunu bulur, cevabı o ziyaretçinin sohbetine yazar.
// Güvenlik: Telegram setWebhook'ta secret_token ayarlanır → header'da doğrulanır.
interface TelegramUpdate {
  message?: {
    text?: string
    reply_to_message?: { message_id: number; text?: string }
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (secret) {
    const got = req.headers.get("x-telegram-bot-api-secret-token")
    if (got !== secret) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
  }

  try {
    const update = (await req.json()) as TelegramUpdate
    const msg = update.message
    const replyTo = msg?.reply_to_message
    const text = msg?.text?.trim()

    // Sadece bir bildirim mesajına reply + metin varsa işle.
    if (!replyTo || !text) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const session = await resolveSessionFromTelegram(replyTo.message_id)
    if (!session) {
      // Bu reply solmandigital'e ait değil. Aynı botu paylaşan başka bir site
      // (Postpilot) varsa, reply'i ona forward et → o kendi session'ında çözer.
      // Geriye uyumlu: PEER_CHAT_WEBHOOK_URL yoksa eski davranış (sessizce yut).
      const peer = process.env.PEER_CHAT_WEBHOOK_URL
      if (peer) {
        try {
          await fetch(peer, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Postpilot webhook'u bu secret'ı bekler (her iki tarafta aynı).
              "x-telegram-bot-api-secret-token":
                process.env.TELEGRAM_WEBHOOK_SECRET ?? "",
            },
            // Telegram'ın gönderdiği update şeklini aynen ilet.
            body: JSON.stringify(update),
          })
        } catch {
          /* peer ulaşılamazsa solmandigital etkilenmesin */
        }
      }
      return NextResponse.json({ ok: true, unmatched: true })
    }

    await appendMessage(session, "agent", text)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[chat/webhook]", err)
    // Telegram 200 dışı görürse retry eder → her zaman 200 dön.
    return NextResponse.json({ ok: false })
  }
}
