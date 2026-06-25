import { NextRequest, NextResponse } from "next/server"
import { rateLimit, getClientIp } from "@/lib/rate-limit"
import { appendMessage, linkTelegramMessage } from "@/lib/chat-store"
import { sendTelegramMessage } from "@/lib/telegram"

// Ziyaretçi mesajı → KV'ye yaz + Telegram'a bildir.
// session: tarayıcıda üretilen kalıcı id (localStorage). page: hangi sayfadan yazdığı.
export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = rateLimit(`chat:send:${ip}`, 20, 60_000) // 20 mesaj/dk — sohbet için bol
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok hızlı mesaj gönderiyorsunuz, biraz bekleyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    )
  }

  try {
    const body = (await req.json()) as { session?: string; text?: string; page?: string }
    const session = (body.session ?? "").trim()
    const text = (body.text ?? "").trim()
    const page = (body.page ?? "").slice(0, 200)

    if (!session || !/^[a-z0-9-]{6,40}$/i.test(session)) {
      return NextResponse.json({ error: "Geçersiz oturum." }, { status: 400 })
    }
    if (!text || text.length > 2000) {
      return NextResponse.json({ error: "Mesaj boş olamaz ya da çok uzun." }, { status: 400 })
    }

    const msg = await appendMessage(session, "visitor", text)

    // Telegram'a düşür — reply ile eşleşme için session görünür.
    const safe = text.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string))
    const tg = await sendTelegramMessage(
      `💬 <b>Yeni site mesajı</b>\n` +
        `<i>${page || "/"}</i>\n\n` +
        `${safe}\n\n` +
        `↩️ Cevaplamak için bu mesajı <b>yanıtla</b>.\n` +
        `🆔 <code>${session}</code>`,
    )
    if (tg.ok && tg.messageId) {
      await linkTelegramMessage(tg.messageId, session)
    }

    return NextResponse.json({ ok: true, message: msg })
  } catch (err) {
    console.error("[chat]", err)
    return NextResponse.json({ error: "Mesaj gönderilemedi." }, { status: 500 })
  }
}
