import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { rateLimit, getClientIp } from "@/lib/rate-limit"
import { trackLead, uploadGoogleAdsConversion } from "@/lib/ga4"
import { render } from "@react-email/render"
import LeadConfirmEmail from "@/emails/LeadConfirmEmail"
import { siteConfig, getLeadAudienceId } from "@/lib/site-config"
import type { LeadPayload } from "@/lib/types/leads"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FUNNEL_LABELS: Record<string, string> = {
  "web-sitesi": "Web Sitesi",
  trendyol: "Trendyol Entegrasyonu",
  saas: "SaaS Platform",
  ai: "AI Otomasyon",
  "ai-en": "AI Automation (EN)",
  "istanbul-dev": "İstanbul Web Developer",
  "istanbul-local": "İstanbul Local",
  "ticarethub-referral": "TicaretHub Referral",
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
      ${row("Entegrasyon Ürünü", data.integrationProduct)}
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
    "istanbul-local": `
      ${row("Proje Türü", data.projectType)}
      ${row("Şirket Tipi", data.companyType)}
      ${row("Görüşme Tercihi", data.prefersMeeting)}
      ${row("İlçe", data.district)}
      ${row("Proje Özeti", data.projectBrief)}
    `,
  }

  // ai-en, ai ile aynı alanları (use-case) paylaşır
  const specificKey = data.funnelType === "ai-en" ? "ai" : data.funnelType
  return `
    <h2>Yeni Lead: ${label}</h2>
    ${sharedRows}
    ${specificRows[specificKey] ?? ""}
  `
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(`email:lead:${getClientIp(req)}`, 5, 60_000)
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    )
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = (await req.json()) as Partial<LeadPayload> & { gclid?: string; utmSource?: string }
    const { funnelType, firstName, email, gclid, utmSource } = body
    const referralSource = utmSource ?? req.headers.get("referer") ?? ""

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
      subject: `[Lead: ${funnelType}${referralSource.includes("ticarethub") ? " 🔗TH" : ""}] ${firstName} — ${data.budget ?? "bütçe belirtilmedi"}`,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      html: buildAdminHtml(data),
    })

    const segmentAudienceId = getLeadAudienceId(funnelType)
    const audienceOps: Promise<unknown>[] = []
    if (segmentAudienceId) {
      audienceOps.push(resend.contacts.create({ email, firstName, audienceId: segmentAudienceId, unsubscribed: false }))
    }
    if (siteConfig.resendAudienceId && siteConfig.resendAudienceId !== segmentAudienceId) {
      audienceOps.push(resend.contacts.create({ email, firstName, audienceId: siteConfig.resendAudienceId, unsubscribed: false }))
    }
    if (audienceOps.length > 0) await Promise.all(audienceOps)

    const clientId = req.cookies.get("_ga")?.value?.replace(/^GA\d+\.\d+\./, "") ?? req.headers.get("x-forwarded-for") ?? "unknown";
    // GA4 session_id'yi _ga_<container> cookie'sinden çıkar (format: GS1.1.<sessionId>.<...>).
    // session_id geçilince GA4 event'i mevcut oturuma bağlar → source/medium otomatik atfedilir
    // (aksi halde server-side event "(not set)" olarak görünür, reklam atfı kopar).
    const gaSessionCookie = req.cookies.get("_ga_H2QM5NPTED")?.value;
    const sessionId = gaSessionCookie?.split(".")[2]; // GS1.1.{sessionId}.1.1...
    trackLead(clientId, { form_type: funnelType, page: `/${funnelType}` }, sessionId).catch(() => {});
    if (gclid) uploadGoogleAdsConversion({ gclid, conversionValue: 500 }).catch(() => {});

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[lead]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
