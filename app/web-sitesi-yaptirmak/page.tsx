import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, X } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import WebSiteLeadForm from "./WebSiteLeadForm"

export const metadata: Metadata = {
  title: "Web Sitesi Yaptırmak | Kurumsal Web Sitesi Fiyatları 2025 | Solman Digital",
  description:
    "Kurumsal web sitesi yaptırmak mı istiyorsunuz? Next.js ile şablonsuz, hızlı ve SEO uyumlu web siteleri geliştiriyoruz. 5-10 iş günü teslim, sabit fiyat. İstanbul.",
  keywords: [
    "web sitesi yaptırmak",
    "kurumsal web sitesi fiyatları",
    "web sitesi yaptırmak istiyorum",
    "şirket web sitesi yaptırmak",
    "profesyonel web sitesi yaptırma",
    "kurumsal web sitesi fiyatları 2025",
    "web sitesi yaptırma fiyatı",
    "web sitesi yaptırmak istanbul",
  ],
  alternates: { canonical: `${siteConfig.url}/web-sitesi-yaptirmak` },
  openGraph: {
    title: "Web Sitesi Yaptırmak | Kurumsal Web Sitesi Fiyatları 2025",
    description: "Şablonsuz, hızlı ve SEO uyumlu kurumsal web siteleri. 5-10 iş günü teslim, sabit fiyat.",
    url: `${siteConfig.url}/web-sitesi-yaptirmak`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Kurumsal Web Sitesi Geliştirme",
      description: "Next.js ile şablonsuz, hızlı ve SEO uyumlu kurumsal web sitesi geliştirme. 5-10 iş günü teslim, sabit fiyat garantisi.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      priceRange: "₺8.000 – ₺100.000",
      areaServed: "TR",
      url: `${siteConfig.url}/web-sitesi-yaptirmak`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Kurumsal web sitesi fiyatları ne kadar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Landing page için ₺8.000–₺15.000, kurumsal tanıtım sitesi için ₺15.000–₺35.000, e-ticaret sitesi için ₺25.000–₺60.000 arasında değişmektedir. Sabit fiyat garantisi veriyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Web sitesi kaç günde teslim edilir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Landing page ve basit kurumsal siteler 5-7 iş günü, kapsamlı kurumsal siteler 10-15 iş günü içinde teslim edilir.",
          },
        },
        {
          "@type": "Question",
          name: "WordPress şablon mu kullanıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hayır. Her projeyi Next.js ile sıfırdan geliştiriyoruz. Kaynak kod size ait, aylık platform ücreti yok.",
          },
        },
        {
          "@type": "Question",
          name: "Teslim sonrası destek veriyor musunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. Tüm projelerimize 1 ay ücretsiz teknik destek dahildir.",
          },
        },
      ],
    },
  ],
}

const pricingTiers = [
  {
    name: "Landing Page",
    price: "₺8.000 – ₺15.000",
    days: "5-7 iş günü",
    features: ["1 sayfa dönüşüm odaklı tasarım", "Mobil uyumlu", "Form entegrasyonu", "Temel SEO"],
  },
  {
    name: "Kurumsal Site",
    price: "₺15.000 – ₺35.000",
    days: "10-15 iş günü",
    features: ["5-15 sayfa", "Blog / haber modülü", "İletişim formu", "Teknik SEO altyapısı"],
    highlight: true,
  },
  {
    name: "E-Ticaret",
    price: "₺25.000 – ₺60.000",
    days: "15-20 iş günü",
    features: ["Ürün kataloğu", "İyzico / Stripe entegrasyon", "Sepet ve ödeme", "Yönetim paneli"],
  },
]

const comparison = [
  { feature: "Yükleme hızı", template: "3-8 saniye", custom: "< 1 saniye" },
  { feature: "SEO optimizasyonu", template: "Plugin bağımlı", custom: "Kod seviyesinde" },
  { feature: "Kaynak kod sahipliği", template: "Yok", custom: "Tamamen size ait" },
  { feature: "Aylık platform ücreti", template: "₺300–₺2.000", custom: "Yok" },
  { feature: "Tasarım benzersizliği", template: "Binlerce aynı site", custom: "Sadece sizin siteniz" },
]

export default function WebSitesiYaptirmakPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            display: "inline-block",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c",
            border: "1px solid #3d0f0f", borderRadius: 4,
            padding: "0.3rem 0.8rem", marginBottom: "1.5rem",
          }}>
            5-10 İş Günü Teslim
          </p>
          <h1 style={{
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 900, color: "#ffffff",
            letterSpacing: "-0.03em", marginBottom: "1.25rem", lineHeight: 1.15,
          }}>
            Web Sitesi Yaptırın — Şablon Yok, Gecikme Yok
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#a0a0a0", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 580, margin: "0 auto 2.5rem" }}>
            Büyük ajans maliyeti olmadan, serbest çalışan belirsizliği olmadan. Sabit fiyat, net takvim, garantili teslim.
          </p>
          <a
            href="#form"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "#9b1c1c", color: "#ffffff",
              padding: "0.9rem 2rem", borderRadius: 8,
              fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            Ücretsiz Fiyat Teklifi Al <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c", marginBottom: "0.75rem",
          }}>
            Fiyat Şeffaflığı
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Fiyatları Gizlemiyoruz
          </h2>
          <p style={{ color: "#666666", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
            Çoğu ajans "bize ulaşın" der. Biz doğrudan söylüyoruz.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  border: tier.highlight ? "2px solid #9b1c1c" : "1px solid #e0e0e0",
                  borderRadius: 12, padding: "2rem",
                  position: "relative",
                  backgroundColor: tier.highlight ? "#fff5f5" : "#ffffff",
                }}
              >
                {tier.highlight && (
                  <span style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    backgroundColor: "#9b1c1c", color: "#ffffff",
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                    padding: "0.2rem 0.75rem", borderRadius: 20,
                    textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>
                    En Çok Tercih Edilen
                  </span>
                )}
                <p style={{ fontWeight: 800, fontSize: "1rem", color: "#111111", margin: "0 0 0.5rem" }}>{tier.name}</p>
                <p style={{ fontSize: "1.375rem", fontWeight: 900, color: "#9b1c1c", margin: "0 0 0.25rem", letterSpacing: "-0.02em" }}>
                  {tier.price}
                </p>
                <p style={{ fontSize: "0.775rem", color: "#888888", margin: "0 0 1.5rem" }}>{tier.days}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <CheckCircle size={15} color="#16a34a" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: "0.85rem", color: "#444444" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Şablon Site mi, Özel Kod mu?
          </h2>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", backgroundColor: "#0d0d0d", padding: "0.875rem 1.25rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#888888", textTransform: "uppercase" }}>Özellik</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#888888", textTransform: "uppercase", textAlign: "center" }}>Şablon</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9b1c1c", textTransform: "uppercase", textAlign: "center" }}>Özel Kod</span>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
                  padding: "0.875rem 1.25rem",
                  borderTop: i > 0 ? "1px solid #e0e0e0" : "none",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "0.875rem", color: "#444444", fontWeight: 500 }}>{row.feature}</span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                  <X size={14} color="#9b1c1c" />
                  <span style={{ fontSize: "0.8rem", color: "#888888" }}>{row.template}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                  <CheckCircle size={14} color="#16a34a" />
                  <span style={{ fontSize: "0.8rem", color: "#333333", fontWeight: 600 }}>{row.custom}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Teslim Süreci
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { step: "01", title: "Brifing", desc: "Hedeflerinizi, tasarım tercihlerinizi ve teknik gereksinimlerinizi belirliyoruz.", days: "Gün 1" },
              { step: "02", title: "Geliştirme", desc: "Next.js ile sıfırdan kod yazıyoruz. Her 3 günde bir ilerleme güncellemesi gönderiyoruz.", days: "Gün 2-8" },
              { step: "03", title: "Revizyon", desc: "Geri bildirimlerinizi alıyor, ince ayarları yapıyoruz. 2 revizyon turu dahil.", days: "Gün 9-10" },
              { step: "04", title: "Canlıya Geçiş", desc: "Domain bağlantısı, Vercel deployment, SSL — her şey hazır. Testleri birlikte yapıyoruz.", days: "Gün 10-12" },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 900, color: "#9b1c1c",
                    backgroundColor: "#fff5f5", border: "1px solid #fecaca",
                    borderRadius: 6, padding: "0.3rem 0.6rem", display: "block", textAlign: "center", minWidth: 36,
                  }}>
                    {item.step}
                  </span>
                  <p style={{ fontSize: "0.65rem", color: "#aaaaaa", textAlign: "center", margin: "0.25rem 0 0", fontWeight: 600 }}>{item.days}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#111111", margin: "0 0 0.25rem", fontSize: "0.95rem" }}>{item.title}</p>
                  <p style={{ color: "#666666", margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section style={{ padding: "3.5rem 1.5rem", backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <p style={{ color: "#666666", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Geliştirdiğimiz projelere göz atmak ister misiniz?
        </p>
        <Link
          href="/portfoy"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: "1px solid #e0e0e0", backgroundColor: "#ffffff",
            color: "#111111", padding: "0.75rem 1.5rem", borderRadius: 8,
            fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
          }}
        >
          Portföyü Gör <ArrowRight size={15} />
        </Link>
      </section>

      {/* Form */}
      <section id="form" style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c", marginBottom: "0.75rem",
          }}>
            Ücretsiz Teklif
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)", fontWeight: 800, color: "#111111", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Fiyat Teklifinizi Alın
          </h2>
          <p style={{ color: "#666666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Projenizi kısaca anlatın, 24 saat içinde detaylı fiyat teklifi gönderelim.
          </p>
          <div style={{ backgroundColor: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 12, padding: "2.5rem" }}>
            <WebSiteLeadForm />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ padding: "3rem 1.5rem", backgroundColor: "#0d0d0d" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              "Aylık platform ücreti yok",
              "Kaynak kod size ait",
              "1 ay ücretsiz destek",
              "Sabit fiyat garantisi",
            ].map((badge) => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.825rem", color: "#a0a0a0", fontWeight: 500 }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
