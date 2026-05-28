import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { render } from "@react-email/render"
import WelcomeEmail from "@/emails/WelcomeEmail"
import { siteConfig } from "@/lib/site-config"
import type { SubscribePayload } from "@/lib/types/leads"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = (await req.json()) as Partial<SubscribePayload>
    const { email, firstName = "Değerli Kullanıcı", source = "newsletter" } = body

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 })
    }

    const downloadUrl = process.env.ETICARET_PDF_URL || `${siteConfig.url}/indir/e-ticaret-baslangic-rehberi`

    const emailHtml = await render(WelcomeEmail({ firstName, downloadUrl, siteUrl: siteConfig.url }))

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: email,
      subject: "E-Ticaret Başlangıç Rehberiniz Hazır 🎉",
      html: emailHtml,
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
    console.error("[subscribe]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
