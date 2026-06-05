import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = (await req.json()) as { firstName?: string; email?: string }
    const { firstName, email } = body

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 })
    }
    if (!firstName) {
      return NextResponse.json({ error: "Ad alanı zorunludur." }, { status: 400 })
    }

    const audienceOps: Promise<unknown>[] = []
    if (siteConfig.resendAudienceAudit) {
      audienceOps.push(
        resend.contacts.create({ email, firstName, audienceId: siteConfig.resendAudienceAudit, unsubscribed: false })
      )
    }
    if (siteConfig.resendAudienceId && siteConfig.resendAudienceId !== siteConfig.resendAudienceAudit) {
      audienceOps.push(
        resend.contacts.create({ email, firstName, audienceId: siteConfig.resendAudienceId, unsubscribed: false })
      )
    }
    if (audienceOps.length > 0) await Promise.all(audienceOps)

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.adminEmail,
      subject: `[Exit Popup] ${firstName} — ${email}`,
      html: `
        <h2>Yeni Exit-Intent Lead</h2>
        <p><strong>Ad:</strong> ${firstName}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Kaynak:</strong> Exit-Intent Popup</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[popup]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
