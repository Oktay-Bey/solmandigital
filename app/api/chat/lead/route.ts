import { NextRequest, NextResponse } from "next/server"
import { rateLimit, getClientIp } from "@/lib/rate-limit"
import { appendMessage, linkTelegramMessage } from "@/lib/chat-store"
import { sendTelegramMessage } from "@/lib/telegram"

// Sohbet yedek sistemi: ziyaretçi anında cevap alamayınca e-posta VEYA telefon bırakır.
// → Telegram'a LEAD olarak düşer (yüksek görünür) + sohbete teyit mesajı yazılır.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\d\s()+-]{7,20}$/

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = rateLimit(`chat:lead:${ip}`, 5, 60_000)
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen biraz sonra deneyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    )
  }

  try {
    const body = (await req.json()) as { session?: string; contact?: string; page?: string }
    const session = (body.session ?? "").trim()
    const contact = (body.contact ?? "").trim()
    const page = (body.page ?? "").slice(0, 200)

    if (!session || !/^[a-z0-9-]{6,40}$/i.test(session)) {
      return NextResponse.json({ error: "Geçersiz oturum." }, { status: 400 })
    }
    // E-posta VEYA telefon — kullanıcı hangisini bıraktıysa kabul et.
    const isEmail = EMAIL_REGEX.test(contact)
    const isPhone = PHONE_REGEX.test(contact)
    if (!contact || (!isEmail && !isPhone)) {
      return NextResponse.json({ error: "Geçerli bir e-posta veya telefon girin." }, { status: 400 })
    }
    const kind = isEmail ? "E-posta" : "Telefon"

    // Sohbet geçmişine sistem teyidi (ziyaretçi mesajı gibi görünmesin → agent rolü)
    await appendMessage(
      session,
      "agent",
      `Teşekkürler! İletişim bilginizi aldık (${contact}). En kısa sürede size dönüş yapacağız.`,
    )

    const safe = contact.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string))
    const tg = await sendTelegramMessage(
      `🔔 <b>YENİ LEAD (sohbetten)</b>\n` +
        `<i>${page || "/"}</i>\n\n` +
        `${kind}: <b>${safe}</b>\n\n` +
        `↩️ Bu mesajı <b>yanıtla</b> → sohbette görünür.\n` +
        `🆔 <code>${session}</code>`,
    )
    if (tg.ok && tg.messageId) {
      await linkTelegramMessage(tg.messageId, session)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[chat/lead]", err)
    return NextResponse.json({ error: "Gönderilemedi." }, { status: 500 })
  }
}
