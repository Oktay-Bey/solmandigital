import * as React from "react"
import type { LeadFunnelType } from "@/lib/types/leads"

type Props = {
  firstName: string
  funnelType: LeadFunnelType
  siteUrl?: string
}

const contentMap: Record<LeadFunnelType, { subject: string; headline: string; body: string; ctaHref: string; ctaText: string }> = {
  "web-sitesi": {
    subject: "Web Sitesi Talebiniz Alındı | Solman Digital",
    headline: "Talebiniz Alındı!",
    body: "Web sitesi projenizi incelemeye başladık. <strong>24 saat içinde</strong> fiyat teklifi ve detaylı bilgi için size ulaşacağız.",
    ctaHref: "/danismanlik",
    ctaText: "Ücretsiz Danışmanlık Rezervasyonu Yap →",
  },
  trendyol: {
    subject: "Trendyol Entegrasyon Talebiniz Alındı | Solman Digital",
    headline: "Entegrasyon Talebiniz Alındı!",
    body: "Marketplace entegrasyon ihtiyacınızı aldık. Satış hacminizi ve mevcut altyapınızı inceleyerek <strong>24 saat içinde</strong> size özel teklif hazırlayacağız.",
    ctaHref: "/ucretsiz-analiz",
    ctaText: "Ücretsiz Teknik Analiz İste →",
  },
  saas: {
    subject: "SaaS Proje Talebiniz Alındı | Solman Digital",
    headline: "SaaS Proje Talebiniz Alındı!",
    body: "SaaS ürün fikrinizi aldık. Teknik fizibilite ve mimari planlamayı birlikte konuşmak için <strong>24 saat içinde</strong> size ulaşacağız.",
    ctaHref: "/danismanlik",
    ctaText: "Danışmanlık Seansı Planla →",
  },
  ai: {
    subject: "AI Otomasyon Talebiniz Alındı | Solman Digital",
    headline: "AI Otomasyon Talebiniz Alındı!",
    body: "Otomasyon potansiyelinizi incelemeye başladık. Mevcut süreçlerinizi ve ROI hesabını birlikte çıkarmak için <strong>24 saat içinde</strong> size dönüş yapacağız.",
    ctaHref: "/ucretsiz-analiz",
    ctaText: "Ücretsiz AI Hazırlık Analizi →",
  },
  "istanbul-dev": {
    subject: "Mesajınız Alındı | Solman Digital",
    headline: "Mesajınız İletildi!",
    body: "Projenizi inceleyeceğiz. İstanbul'da buluşmak ya da Zoom görüşmesi yapmak için <strong>24 saat içinde</strong> size ulaşacağız.",
    ctaHref: "/hizmetler",
    ctaText: "Tüm Hizmetleri İncele →",
  },
  "istanbul-local": {
    subject: "Mesajınız Alındı | Solman Digital",
    headline: "Mesajınız İletildi!",
    body: "Projenizi inceleyeceğiz. İstanbul'da buluşmak ya da Zoom görüşmesi yapmak için <strong>24 saat içinde</strong> size ulaşacağız.",
    ctaHref: "/hizmetler",
    ctaText: "Tüm Hizmetleri İncele →",
  },
  "ticarethub-referral": {
    subject: "TicaretHub'dan Bir Adım İleri — Solman Digital",
    headline: "Doğru Yerdesiniz!",
    body: "TicaretHub araçlarını denedikten sonra özel bir çözüme ihtiyaç duyduğunuzu fark ettiniz — bu gayet normal bir büyüme adımı. Solman Digital olarak <strong>24 saat içinde</strong> size özel teknik değerlendirmeyi paylaşacağız.",
    ctaHref: "/danismanlik",
    ctaText: "Ücretsiz Danışmanlık Rezervasyonu Yap →",
  },
}

export default function LeadConfirmEmail({ firstName, funnelType, siteUrl = "https://solmandigital.com.tr" }: Props) {
  const c = contentMap[funnelType]

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{c.subject}</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f5f5f5", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f5f5f5", padding: "32px 16px" }}>
          <tr>
            <td align="center">
              <table width="600" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, width: "100%" }}>
                <tr>
                  <td style={{ backgroundColor: "#0d0d0d", borderRadius: "10px 10px 0 0", padding: "32px 40px" }}>
                    <p style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em" }}>
                      Solman<span style={{ color: "#9b1c1c" }}>Digital</span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style={{ backgroundColor: "#ffffff", padding: "40px" }}>
                    <h1 style={{ margin: "0 0 16px", fontSize: "24px", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
                      Merhaba {firstName}!
                    </h1>
                    <p
                      style={{ margin: "0 0 8px", fontSize: "22px", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}
                    >
                      {c.headline}
                    </p>
                    <p
                      style={{ margin: "0 0 32px", fontSize: "15px", color: "#555555", lineHeight: "1.7" }}
                      dangerouslySetInnerHTML={{ __html: c.body }}
                    />

                    <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0 0 24px" }} />

                    <p style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                      Sıradaki Adım
                    </p>
                    <a
                      href={`${siteUrl}${c.ctaHref}`}
                      style={{ fontSize: "14px", color: "#9b1c1c", fontWeight: 600, textDecoration: "underline" }}
                    >
                      {c.ctaText}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style={{ backgroundColor: "#f5f5f5", borderRadius: "0 0 10px 10px", padding: "24px 40px", borderTop: "1px solid #e0e0e0" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#aaaaaa", lineHeight: "1.6" }}>
                      Soru için:{" "}
                      <a href="mailto:info@solmandigital.com.tr" style={{ color: "#9b1c1c" }}>
                        info@solmandigital.com.tr
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
