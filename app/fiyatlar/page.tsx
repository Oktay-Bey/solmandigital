import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, X } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Web Sitesi & Yazılım Fiyatları 2025 | Solman Digital",
  description:
    "Kurumsal web sitesi, e-ticaret, SaaS ve AI otomasyon fiyatları. ₺8.000'dan başlayan fiyatlarla profesyonel yazılım geliştirme. Ücretsiz kapsam görüşmesi.",
  keywords: [
    "web sitesi fiyatları 2025",
    "kurumsal web sitesi ne kadar",
    "e-ticaret sitesi fiyatı",
    "saas geliştirme maliyeti",
    "yazılım geliştirme fiyatları istanbul",
    "web sitesi yaptırma fiyatı",
  ],
  alternates: { canonical: `${siteConfig.url}/fiyatlar` },
  openGraph: {
    title: "Web Sitesi & Yazılım Fiyatları 2025 | Solman Digital",
    description: "₺8.000'dan başlayan kurumsal web sitesi, e-ticaret ve SaaS fiyatları. Ücretsiz kapsam görüşmesi.",
    url: `${siteConfig.url}/fiyatlar`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const faqItems = [
  {
    q: "Web sitesi fiyatları neye göre değişir?",
    a: "Fiyatlar; sayfa sayısı, özel özellikler (ödeme sistemi, üyelik, API entegrasyonu), tasarım karmaşıklığı ve içerik miktarına göre değişir. Belirtilen fiyatlar başlangıç fiyatıdır; kesin tutar kapsam görüşmesinden sonra belirlenir.",
  },
  {
    q: "Ödeme nasıl yapılır?",
    a: "Projeler 2 taksitte faturalandırılır: %50 proje başında, %50 tesliminde. Banka havalesi ve EFT kabul edilir. Yurt içi faturalama için e-fatura düzenlenmektedir.",
  },
  {
    q: "Fiyata ne dahildir?",
    a: "Her pakete standart olarak şunlar dahildir: tam kaynak kodu, Vercel'e deploy, SSL kurulumu, Google Analytics + Search Console kurulumu, 1 ay ücretsiz teknik destek ve içerik güncelleme rehberi.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

type PricingTier = {
  name: string
  price: string
  subtitle: string
  timeline: string
  features: string[]
  notIncluded: string[]
  cta: string
  ctaHref: string
  highlight?: boolean
}

const tiers: PricingTier[] = [
  {
    name: "Web Sitesi",
    price: "₺8.000",
    subtitle: "Kurumsal tanıtım ve landing page",
    timeline: "5–10 iş günü",
    features: [
      "5–10 sayfa kurumsal site veya tek sayfa landing page",
      "Mobil uyumlu responsive tasarım",
      "Google PageSpeed 90+ performans",
      "SEO teknik kurulumu (meta, schema, sitemap)",
      "İletişim formu & WhatsApp entegrasyonu",
      "Google Analytics + Search Console kurulumu",
      "SSL + Vercel deploy",
      "1 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Ödeme sistemi (ayrı paket)", "Blog veya CMS yönetimi"],
    cta: "Fiyat Teklifi Al",
    ctaHref: "/iletisim",
  },
  {
    name: "E-Ticaret",
    price: "₺20.000",
    subtitle: "Tam e-ticaret mağazası",
    timeline: "10–15 iş günü",
    highlight: true,
    features: [
      "Ürün kataloğu + sepet + ödeme akışı",
      "İyzico veya Stripe ödeme entegrasyonu",
      "Admin paneli (ürün/sipariş yönetimi)",
      "Trendyol/Hepsiburada senkronizasyonu (opsiyonel)",
      "Stok & varyant yönetimi",
      "SEO + performans kurulumu",
      "SSL + Vercel deploy",
      "1 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Ürün fotoğrafçılığı ve içerik yazımı", "Pazaryeri aylık bakım ücreti"],
    cta: "E-Ticaret Teklifi Al",
    ctaHref: "/iletisim",
  },
  {
    name: "SaaS & AI",
    price: "₺50.000",
    subtitle: "Platform, uygulama veya otomasyon",
    timeline: "4–8 hafta",
    features: [
      "Kullanıcı kimlik doğrulama sistemi",
      "Abonelik ve ödeme yönetimi",
      "Admin + kullanıcı dashboard'u",
      "AI/LLM entegrasyonu (GPT-4o, Claude)",
      "API geliştirme ve dış servis entegrasyonları",
      "CI/CD pipeline kurulumu",
      "Kapsamlı test süiti",
      "3 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Sunucu/cloud maliyetleri", "İçerik üretimi ve pazarlama"],
    cta: "SaaS Teklifi Al",
    ctaHref: "/saas-platform-gelistirme",
  },
]

export default function FiyatlarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ backgroundColor: "#0d0d0d", minHeight: "100vh" }}>
        {/* Hero */}
        <section style={{ padding: "5rem 1.5rem 3rem", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#555555",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              Fiyatlar
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Net fiyatlar,
              <br />
              <span style={{ color: "#9b1c1c" }}>sürpriz maliyet yok</span>
            </h1>
            <p
              style={{
                color: "#777777",
                fontSize: "1rem",
                lineHeight: 1.7,
                maxWidth: 540,
                margin: "0 auto 2rem",
              }}
            >
              Belirtilen rakamlar başlangıç fiyatıdır. Kesin tutar kapsam görüşmesinde belirlenir.
              İlk görüşme ücretsizdir — risk almadan başlayın.
            </p>
            <Link
              href="/ucretsiz-analiz"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#9b1c1c",
                color: "#ffffff",
                padding: "0.875rem 1.75rem",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              Ücretsiz Kapsam Görüşmesi
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Pricing Cards */}
        <section style={{ padding: "4rem 1.5rem" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              alignItems: "start",
            }}
          >
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  backgroundColor: tier.highlight ? "#161616" : "#111111",
                  border: tier.highlight ? "1px solid #9b1c1c" : "1px solid #222222",
                  borderRadius: 12,
                  padding: "2rem",
                  position: "relative",
                }}
              >
                {tier.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#9b1c1c",
                      color: "#ffffff",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      padding: "0.3rem 0.875rem",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}
                  >
                    En Popüler
                  </div>
                )}

                <p
                  style={{
                    color: "#555555",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tier.name}
                </p>
                <p
                  style={{
                    fontSize: "2.25rem",
                    fontWeight: 900,
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {tier.price}
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#555555" }}>&apos;dan</span>
                </p>
                <p style={{ color: "#888888", fontSize: "0.825rem", marginBottom: "0.375rem" }}>
                  {tier.subtitle}
                </p>
                <p
                  style={{
                    color: "#9b1c1c",
                    fontSize: "0.775rem",
                    fontWeight: 600,
                    marginBottom: "1.75rem",
                  }}
                >
                  ⏱ {tier.timeline}
                </p>

                <div style={{ marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      color: "#555555",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Dahil
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.625rem",
                          color: "#cccccc",
                          fontSize: "0.825rem",
                          lineHeight: 1.5,
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          color="#4ade80"
                          style={{ flexShrink: 0, marginTop: 2 }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.notIncluded.length > 0 && (
                  <div style={{ marginBottom: "1.75rem" }}>
                    <p
                      style={{
                        color: "#333333",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Dahil Değil
                    </p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {tier.notIncluded.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.625rem",
                            color: "#444444",
                            fontSize: "0.8rem",
                            lineHeight: 1.5,
                          }}
                        >
                          <X size={14} color="#444444" style={{ flexShrink: 0, marginTop: 2 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={tier.ctaHref}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    backgroundColor: tier.highlight ? "#9b1c1c" : "#1a1a1a",
                    border: tier.highlight ? "none" : "1px solid #333333",
                    color: "#ffffff",
                    padding: "0.875rem",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {tier.cta}
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "4rem 1.5rem 5rem", borderTop: "1px solid #1a1a1a" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                marginBottom: "2.5rem",
                textAlign: "center",
              }}
            >
              Sık Sorulan Sorular
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {faqItems.map((item) => (
                <div key={item.q} style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: "1.5rem" }}>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      marginBottom: "0.625rem",
                    }}
                  >
                    {item.q}
                  </h3>
                  <p style={{ color: "#777777", fontSize: "0.875rem", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <p style={{ color: "#666666", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                Projeniz bu paketlere tam uymuyorsa özel fiyat talep edin.
              </p>
              <Link
                href="/ucretsiz-analiz"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#9b1c1c",
                  color: "#ffffff",
                  padding: "0.875rem 1.75rem",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Ücretsiz Analiz İste
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
