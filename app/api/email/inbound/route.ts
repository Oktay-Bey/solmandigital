import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()

    const data = body.data ?? body
    const from = data.from ?? "Bilinmeyen Gönderici"
    const subject = data.subject ?? "(Konu yok)"

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.adminEmail,
      subject: `[Gelen Mail] ${subject}`,
      html: `
        <p><strong>Gönderen:</strong> ${from}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <p><em>Mail içeriği Resend tarafından iletilmiyor. Yanıt vermek için gönderene doğrudan yazın: ${from}</em></p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[inbound]", err)
    return NextResponse.json({ error: "İşlenemedi" }, { status: 500 })
  }
}
