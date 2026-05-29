import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { render } from "@react-email/render"
import LeadConfirmEmail from "@/emails/LeadConfirmEmail"
import { siteConfig } from "@/lib/site-config"
import type { LeadPayload } from "@/lib/types/leads"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FUNNEL_LABELS: Record<string, string> = {
  "web-sitesi": "Web Sitesi",
  trendyol: "Trendyol Entegrasyonu",
  saas: "SaaS Platform",
  ai: "AI Otomasyon",
  "istanbul-dev": "İstanbul Web Developer",
}

function buildAdminHtml(data: LeadPayload): string {
  const label = FUNNEL_LABELS[data.funnelType] ?? data.funnelType
  const row = (key: string, value: string | undefined) =>
    value ? `<p><strong>${key}:</strong> ${value}</p>` : `<p><strong>${key}:</strong> <em style="color:#aaa">Belirtilmedi</em></p>`

  const sharedRows = `
    ${row("Ad", data.firstName)}
    ${row("E-posta", data.email)}
    ${row("Telefon", data.phone)}
    ${row("Firma", data.companyName)}
    ${row("Bütçe", data.budget)}
    ${row("Zaman Dilimi", data.timeline)}
  `

  const specificRows: Record<string, string> = {
    "web-sitesi": `
      ${row("Site Türü", data.siteType)}
      ${row("Mevcut Site", data.existingSite)}
      ${row("Proje Özeti", data.brief)}
    `,
    trendyol: `
      ${row("Marketplace'ler", data.marketplaces)}
      ${row("Aylık Sipariş", data.monthlyOrders)}
      ${row("Mevcut Çözüm", data.currentSolution)}
      ${row("Aciliyet", data.urgency)}
      ${row("En Büyük Sorun", data.specificPain)}
    `,
    saas: `
      ${row("Ürün Fikri", data.productIdea)}
      ${row("Hedef Kullanıcı", data.targetUser)}
      ${row("Finansman", data.fundingStage)}
      ${row("Mevcut Altyapı", data.existingTech)}
    `,
    ai: `
      ${row("AI Kullanım Alanı", data.aiUseCase)}
      ${row("Mevcut Hacim", data.currentVolume)}
      ${row("Şirket Büyüklüğü", data.companySize)}
      ${row("En Büyük Pain", data.painPoint)}
    `,
    "istanbul-dev": `
      ${row("Proje Türü", data.projectType)}
      ${row("Şirket Tipi", data.companyType)}
      ${row("Görüşme Tercihi", data.prefersMeeting)}
      ${row("Proje Özeti", data.projectBrief)}
    `,
  }

  return `
    <h2>Yeni Lead: ${label}</h2>
    ${sharedRows}
    ${specificRows[data.funnelType] ?? ""}
  `
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = (await req.json()) as Partial<LeadPayload>
    const { funnelType, firstName, email } = body

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 })
    }
    if (!firstName) {
      return NextResponse.json({ error: "Lütfen adınızı girin." }, { status: 400 })
    }
    if (!funnelType) {
      return NextResponse.json({ error: "Geçersiz form tipi." }, { status: 400 })
    }

    const data = body as LeadPayload

    const confirmHtml = await render(
      LeadConfirmEmail({ firstName, funnelType, siteUrl: siteConfig.url })
    )

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: email,
      subject: `Talebiniz Alındı | Solman Digital`,
      html: confirmHtml,
    })

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.adminEmail,
      replyTo: email,
      subject: `[Lead: ${funnelType}] ${firstName} — ${data.budget ?? "bütçe belirtilmedi"}`,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      html: buildAdminHtml(data),
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
    console.error("[lead]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
