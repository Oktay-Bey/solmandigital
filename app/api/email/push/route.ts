import { NextRequest, NextResponse } from "next/server"
import { siteConfig } from "@/lib/site-config"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_BATCH = 100
const BREVO_API = "https://api.brevo.com/v3/smtp/email"

type PushMessage = {
  to: string
  subject: string
  html?: string
  text?: string
}

async function sendBrevo(msg: PushMessage, apiKey: string): Promise<string> {
  const body: Record<string, unknown> = {
    sender: { name: "Solman Digital", email: siteConfig.resendFromEmail },
    to: [{ email: msg.to }],
    replyTo: { email: siteConfig.email },
    subject: msg.subject,
  }
  if (msg.html) body.htmlContent = msg.html
  if (msg.text) body.textContent = msg.text

  const res = await fetch(BREVO_API, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Brevo ${res.status}: ${err}`)
  }

  const data = (await res.json()) as { messageId?: string }
  return data.messageId ?? "sent"
}

export async function POST(req: NextRequest) {
  const secret = process.env.EMAIL_PUSH_SECRET
  if (!secret) return NextResponse.json({ error: "EMAIL_PUSH_SECRET tanımlı değil." }, { status: 503 })

  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${secret}`) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 })

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return NextResponse.json({ error: "BREVO_API_KEY tanımlı değil." }, { status: 503 })

  try {
    const body = await req.json()
    const messages = body?.messages as PushMessage[] | undefined

    if (!Array.isArray(messages) || messages.length === 0)
      return NextResponse.json({ error: "messages dizisi gerekli." }, { status: 400 })
    if (messages.length > MAX_BATCH)
      return NextResponse.json({ error: `En fazla ${MAX_BATCH} mesaj.` }, { status: 400 })

    for (const [i, msg] of messages.entries()) {
      if (!msg.to || !EMAIL_REGEX.test(msg.to))
        return NextResponse.json({ error: `messages[${i}].to geçersiz.` }, { status: 400 })
      if (!msg.subject)
        return NextResponse.json({ error: `messages[${i}].subject boş.` }, { status: 400 })
      if (!msg.html && !msg.text)
        return NextResponse.json({ error: `messages[${i}] html veya text gerekli.` }, { status: 400 })
    }

    // Brevo has no batch endpoint — send in parallel with concurrency limit
    const CONCURRENCY = 5
    const ids: string[] = []
    const errors: string[] = []

    for (let i = 0; i < messages.length; i += CONCURRENCY) {
      const chunk = messages.slice(i, i + CONCURRENCY)
      const results = await Promise.allSettled(chunk.map(msg => sendBrevo(msg, apiKey)))
      for (const r of results) {
        if (r.status === "fulfilled") ids.push(r.value)
        else errors.push(r.reason?.message ?? "unknown error")
      }
      // Small delay between chunks to stay within rate limits
      if (i + CONCURRENCY < messages.length) {
        await new Promise(r => setTimeout(r, 300))
      }
    }

    if (errors.length > 0) {
      console.error("[push] brevo errors:", errors)
    }

    return NextResponse.json({
      success: true,
      sent: ids.length,
      failed: errors.length,
      ids,
      ...(errors.length > 0 ? { errors } : {}),
    })
  } catch (err) {
    console.error("[push]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
