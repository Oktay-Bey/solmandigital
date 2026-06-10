import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BATCH = 100

type PushMessage = {
  to: string
  subject: string
  html?: string
  text?: string
}

export async function POST(req: NextRequest) {
  const secret = process.env.EMAIL_PUSH_SECRET
  if (!secret) {
    return NextResponse.json({ error: "EMAIL_PUSH_SECRET tanımlı değil." }, { status: 503 })
  }
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const messages = body?.messages as PushMessage[] | undefined

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages dizisi gerekli." }, { status: 400 })
    }
    if (messages.length > MAX_BATCH) {
      return NextResponse.json({ error: `En fazla ${MAX_BATCH} mesaj gönderilebilir.` }, { status: 400 })
    }

    for (const [i, msg] of messages.entries()) {
      if (!msg.to || !EMAIL_REGEX.test(msg.to)) {
        return NextResponse.json({ error: `messages[${i}].to geçersiz.` }, { status: 400 })
      }
      if (!msg.subject) {
        return NextResponse.json({ error: `messages[${i}].subject boş.` }, { status: 400 })
      }
      if (!msg.html && !msg.text) {
        return NextResponse.json({ error: `messages[${i}] için html veya text gerekli.` }, { status: 400 })
      }
    }

    const { data, error } = await resend.batch.send(
      messages.map((msg) => ({
        from: `Solman Digital <${siteConfig.resendFromEmail}>`,
        to: msg.to,
        replyTo: siteConfig.email,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
      }))
    )

    if (error) {
      console.error("[push] resend error", error)
      return NextResponse.json({ error: error.message }, { status: 502 })
    }

    return NextResponse.json({ success: true, sent: messages.length, ids: data?.data.map((d) => d.id) })
  } catch (err) {
    console.error("[push]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
