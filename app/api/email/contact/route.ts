import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { rateLimit, getClientIp } from "@/lib/rate-limit"
import { siteConfig } from "@/lib/site-config"
import { trackLead, uploadGoogleAdsConversion } from "@/lib/ga4"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const rl = rateLimit(`email:contact:${getClientIp(req)}`, 5, 60_000)
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    )
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const { isim, email, hizmet, mesaj, gclid, lang } = body as Record<string, string>

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 })
    }
    if (!isim || !mesaj) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 })
    }

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.adminEmail,
      replyTo: email,
      subject: `Yeni teklif formu: ${isim}${hizmet ? ` — ${hizmet}` : ""}`,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        "Importance": "high",
      },
      text: `Yeni teklif formu mesajı\n\nAd Soyad: ${isim}\nE-posta: ${email}\nHizmet: ${hizmet || "Belirtilmedi"}\n\nMesaj:\n${mesaj}`,
    })

    const isEn = lang === "en"
    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: email,
      subject: isEn ? "Message received | Solman Digital" : "Mesajınız Alındı | Solman Digital",
      html: isEn ? `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px">
          <div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px">
            <p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">
              Solman<span style="color:#9b1c1c">Digital</span>
            </p>
          </div>
          <div style="background:#fff;padding:40px">
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#111;letter-spacing:-0.02em">
              Hi ${isim},
            </h1>
            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">
              We've received your message and will get back to you <strong>within 24 hours</strong>.
            </p>
            <p style="margin:0 0 8px;font-size:14px;color:#888">Your message:</p>
            <div style="background:#f5f5f5;border-radius:8px;padding:16px;font-size:14px;color:#444;line-height:1.7;white-space:pre-wrap">${mesaj}</div>
          </div>
          <div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0">
            <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">
              Questions? <a href="mailto:${siteConfig.email}" style="color:#9b1c1c">${siteConfig.email}</a>
            </p>
          </div>
        </div>
      ` : `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px">
          <div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px">
            <p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">
              Solman<span style="color:#9b1c1c">Digital</span>
            </p>
          </div>
          <div style="background:#fff;padding:40px">
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#111;letter-spacing:-0.02em">
              Merhaba ${isim}!
            </h1>
            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">
              Mesajınızı aldık. <strong>24 saat içinde</strong> size dönüş yapacağız.
            </p>
            <p style="margin:0 0 8px;font-size:14px;color:#888">Gönderdiğiniz mesaj:</p>
            <div style="background:#f5f5f5;border-radius:8px;padding:16px;font-size:14px;color:#444;line-height:1.7;white-space:pre-wrap">${mesaj}</div>
          </div>
          <div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0">
            <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">
              Soru için: <a href="mailto:${siteConfig.email}" style="color:#9b1c1c">${siteConfig.email}</a>
            </p>
          </div>
        </div>
      `,
    })

    const clientId = req.cookies.get("_ga")?.value?.replace(/^GA\d+\.\d+\./, "") ?? req.headers.get("x-forwarded-for") ?? "unknown";
    trackLead(clientId, { form_type: "contact", page: "/iletisim" }).catch(() => {});
    if (gclid) uploadGoogleAdsConversion({ gclid, conversionValue: 500 }).catch(() => {});

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact]", err)
    return NextResponse.json({ error: "Gönderim sırasında bir hata oluştu." }, { status: 500 })
  }
}
