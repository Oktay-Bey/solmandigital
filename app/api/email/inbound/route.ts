import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()

    const from = body.from ?? "Bilinmeyen Gönderici"
    const subject = body.subject ?? "(Konu yok)"
    const text = body.text ?? ""
    const html = body.html ?? `<pre>${text}</pre>`

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.adminEmail,
      replyTo: from,
      subject: `[Gelen Mail] ${subject}`,
      html: `
        <p><strong>Gönderen:</strong> ${from}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <hr />
        ${html}
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[inbound]", err)
    return NextResponse.json({ error: "İşlenemedi" }, { status: 500 })
  }
}
