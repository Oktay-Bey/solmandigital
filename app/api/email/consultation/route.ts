import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { rateLimit, getClientIp } from "@/lib/rate-limit"
import { trackLead } from "@/lib/ga4"
import { render } from "@react-email/render"
import ConsultationConfirmEmail from "@/emails/ConsultationConfirmEmail"
import { siteConfig } from "@/lib/site-config"
import type { ConsultationPayload } from "@/lib/types/leads"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const rl = rateLimit(`email:consultation:${getClientIp(req)}`, 5, 60_000)
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    )
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = (await req.json()) as Partial<ConsultationPayload>
    const { firstName, email, phone, companyName, projectBrief } = body

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 })
    }
    if (!firstName) {
      return NextResponse.json({ error: "Lütfen adınızı girin." }, { status: 400 })
    }

    const confirmHtml = await render(
      ConsultationConfirmEmail({ firstName, siteUrl: siteConfig.url })
    )

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: email,
      subject: "Danışmanlık Talebiniz Alındı | Solman Digital",
      html: confirmHtml,
    })

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.email,
      subject: `[Danışmanlık Lead] ${firstName}${companyName ? ` — ${companyName}` : ""}`,
      html: `
        <h2>Yeni Danışmanlık Talebi</h2>
        <p><strong>Ad:</strong> ${firstName}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
        <p><strong>Firma:</strong> ${companyName || "Belirtilmedi"}</p>
        <p><strong>Proje Özeti:</strong> ${projectBrief || "Belirtilmedi"}</p>
      `,
    })

    const consultationAudienceId = siteConfig.resendAudienceConsultation
    const audienceOps: Promise<unknown>[] = []
    if (consultationAudienceId) {
      audienceOps.push(resend.contacts.create({ email, firstName, audienceId: consultationAudienceId, unsubscribed: false }))
    }
    if (siteConfig.resendAudienceId && siteConfig.resendAudienceId !== consultationAudienceId) {
      audienceOps.push(resend.contacts.create({ email, firstName, audienceId: siteConfig.resendAudienceId, unsubscribed: false }))
    }
    if (audienceOps.length > 0) await Promise.all(audienceOps)

    const clientId = req.cookies.get("_ga")?.value?.replace(/^GA\d+\.\d+\./, "") ?? req.headers.get("x-forwarded-for") ?? "unknown";
    trackLead(clientId, { form_type: "consultation", page: "/danismanlik" }).catch(() => {});

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[consultation]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
