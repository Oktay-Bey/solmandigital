import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { render } from "@react-email/render"
import AuditConfirmEmail from "@/emails/AuditConfirmEmail"
import { siteConfig } from "@/lib/site-config"
import type { AuditPayload } from "@/lib/types/leads"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = (await req.json()) as Partial<AuditPayload>
    const { firstName, email, websiteUrl, serviceInterest, currentProblem } = body

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 })
    }
    if (!firstName || !websiteUrl) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 })
    }

    const confirmHtml = await render(
      AuditConfirmEmail({ firstName, websiteUrl, siteUrl: siteConfig.url })
    )

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: email,
      subject: "Ücretsiz Site Analizi Talebiniz Alındı",
      html: confirmHtml,
    })

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.email,
      subject: `[Audit Lead] ${firstName} — ${websiteUrl}`,
      html: `
        <h2>Yeni Ücretsiz Analiz Talebi</h2>
        <p><strong>Ad:</strong> ${firstName}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Web Sitesi:</strong> ${websiteUrl}</p>
        <p><strong>İlgilenilen Hizmet:</strong> ${serviceInterest || "Belirtilmedi"}</p>
        <p><strong>Mevcut Sorun:</strong> ${currentProblem || "Belirtilmedi"}</p>
      `,
    })

    if (siteConfig.resendAudienceId) {
      await resend.contacts.create({
        email,
        firstName,
        audienceId: siteConfig.resendAudienceId,
        unsubscribed: false,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[audit]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
