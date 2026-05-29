import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Package, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import TrendyolLeadForm from "./TrendyolLeadForm"

export const metadata: Metadata = {
  title: "Trendyol API Entegrasyonu & Satıcı Paneli | Solman Digital",
  description:
    "Trendyol, Hepsiburada ve Amazon için özel satıcı paneli geliştiriyoruz. Stok senkronizasyonu, otomatik fiyatlama, sipariş yönetimi. 7-12 iş günü teslim.",
  keywords: [
    "trendyol entegrasyonu",
    "trendyol api entegrasyonu",
    "trendyol satıcı paneli",
    "hepsiburada entegrasyon",
    "marketplace otomasyon",
    "trendyol sipariş yönetimi",
    "trendyol xml entegrasyon",
    "çoklu marketplace yönetimi",
  ],
  alternates: { canonical: `${siteConfig.url}/trendyol-entegrasyonu` },
  openGraph: {
    title: "Trendyol API Entegrasyonu & Satıcı Paneli | Solman Digital",
    description: "Trendyol, Hepsiburada ve Amazon için özel satıcı paneli. Stok senkronizasyonu, otomatik fiyatlama, sipariş yönetimi.",
    url: `${siteConfig.url}/trendyol-entegrasyonu`,
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
      name: "Trendyol & Marketplace API Entegrasyonu",
      description:
        "Trendyol, Hepsiburada, N11 ve Amazon için özel satıcı paneli geliştirme. Stok senkronizasyonu, otomatik fiyatlama ve sipariş yönetimi.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: `${siteConfig.url}/trendyol-entegrasyonu`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Trendyol entegrasyonu ne kadar sürer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tek marketplace için 7-10 iş günü, birden fazla marketplace için 12-15 iş günü içinde teslim ediyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Hangi marketplace'lerle çalışıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trendyol, Hepsiburada, Amazon Türkiye, N11 ve Çiçeksepeti API entegrasyonu yapıyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Mevcut e-ticaret sitemle entegre edebilir misiniz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. WordPress/WooCommerce, Shopify ve özel geliştirilmiş sistemlerle entegrasyon yapabiliyoruz.",
          },
        },
      ],
    },
  ],
}

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Stok Tutarsızlığı",
    desc: "Farklı panellerde stok güncellemeyi unutmak → müşteri şikayeti, ceza puanı.",
  },
  {
    icon: RefreshCw,
    title: "Manuel Fiyat Güncelleme",
    desc: "Her platform için ayrı fiyat güncellemesi → rakipten geç kalma, kayıp satış.",
  },
  {
    icon: Package,
    title: "Dağınık Sipariş Takibi",
    desc: "3-4 ayrı panel, manuel kargo girişi → insan hatası, geciken kargolar.",
  },
]

const features = [
  "Anlık stok senkronizasyonu (tüm marketplace'ler)",
  "Otomatik fiyat güncelleme ve rekabet izleme",
  "Sipariş yönetimi ve kargo entegrasyonu",
  "Ürün listeleme ve toplu güncelleme",
  "Satış performansı raporları",
  "Stok uyarı sistemi (kritik seviye bildirimi)",
]

const marketplaces = ["Trendyol", "Hepsiburada", "Amazon TR", "N11", "Çiçeksepeti"]

export default function TrendyolEntegrasyonuPage() {
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
            Trendyol · Hepsiburada · Amazon · N11
          </p>
          <h1 style={{
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 900, color: "#ffffff",
            letterSpacing: "-0.03em", marginBottom: "1.25rem", lineHeight: 1.15,
          }}>
            Tek Panelden Tüm Marketplace&apos;lerinizi Yönetin
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#a0a0a0", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 580, margin: "0 auto 2.5rem" }}>
            Her sabah 3-4 ayrı paneli açarak sipariş mi kontrol ediyorsunuz? Özel satıcı paneliyle tüm marketplace&apos;leri tek ekrandan yönetin.
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
            Entegrasyon Teklifi Al <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Problem Agitation */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Tanıdık Geliyor mu?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {painPoints.map((p) => (
              <div
                key={p.title}
                style={{
                  border: "1px solid #fecaca", borderRadius: 10, padding: "1.75rem",
                  backgroundColor: "#fff5f5",
                }}
              >
                <div style={{
                  width: 40, height: 40, backgroundColor: "#fee2e2", borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem",
                }}>
                  <p.icon size={20} color="#9b1c1c" />
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111111", margin: "0 0 0.5rem" }}>{p.title}</p>
                <p style={{ fontSize: "0.85rem", color: "#666666", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Özel Satıcı Paneli Neler Sunar?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {features.map((f) => (
              <div
                key={f}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "0.75rem",
                  backgroundColor: "#ffffff", border: "1px solid #e0e0e0",
                  borderRadius: 8, padding: "1.25rem",
                }}
              >
                <CheckCircle size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: "0.875rem", color: "#333333", margin: 0, lineHeight: 1.5 }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Logos */}
      <section style={{ padding: "3.5rem 1.5rem", backgroundColor: "#ffffff", borderTop: "1px solid #e0e0e0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.775rem", fontWeight: 700, color: "#aaaaaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Entegrasyon Yaptığımız Platformlar
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            {marketplaces.map((m) => (
              <span
                key={m}
                style={{
                  padding: "0.5rem 1.25rem",
                  border: "1px solid #e0e0e0", borderRadius: 6,
                  fontSize: "0.875rem", fontWeight: 600, color: "#444444",
                  backgroundColor: "#f5f5f5",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Teknik Süreç
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { step: "01", title: "API Bağlantısı", desc: "Marketplace API anahtarlarınızla bağlantı kuruyoruz, sandbox testlerini tamamlıyoruz." },
              { step: "02", title: "Stok Haritalama", desc: "Ürün kataloğunuzu marketplace formatlarına uyarlıyor, SKU eşleştirme yapıyoruz." },
              { step: "03", title: "Sipariş Akışı Testi", desc: "Gerçek siparişlerle uçtan uca test yapıyor, edge case'leri kapatıyoruz." },
              { step: "04", title: "Canlıya Geçiş", desc: "Sistemi devreye alıyor, ilk 7 gün yakından izliyoruz." },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 900, color: "#9b1c1c",
                  backgroundColor: "#fff5f5", border: "1px solid #fecaca",
                  borderRadius: 6, padding: "0.3rem 0.6rem", minWidth: 36, textAlign: "center", flexShrink: 0,
                }}>
                  {item.step}
                </span>
                <div>
                  <p style={{ fontWeight: 700, color: "#111111", margin: "0 0 0.25rem", fontSize: "0.95rem" }}>{item.title}</p>
                  <p style={{ color: "#666666", margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            Entegrasyon Teklifi Alın
          </h2>
          <p style={{ color: "#666666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Satış hacminizi ve mevcut altyapınızı inceleyerek 24 saat içinde size özel teklif hazırlıyoruz.
          </p>
          <div style={{ backgroundColor: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 12, padding: "2.5rem" }}>
            <TrendyolLeadForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "4rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111111", marginBottom: "2rem", letterSpacing: "-0.02em" }}>
            Sık Sorulan Sorular
          </h2>
          {[
            { q: "Trendyol entegrasyonu ne kadar sürer?", a: "Tek marketplace için 7-10 iş günü, birden fazla marketplace için 12-15 iş günü." },
            { q: "Hangi marketplace'lerle çalışıyorsunuz?", a: "Trendyol, Hepsiburada, Amazon Türkiye, N11 ve Çiçeksepeti API entegrasyonu yapıyoruz." },
            { q: "Mevcut e-ticaret sitemle entegre edebilir misiniz?", a: "Evet. WordPress/WooCommerce, Shopify ve özel sistemlerle entegrasyon yapabiliyoruz." },
          ].map((faq) => (
            <div key={faq.q} style={{ borderBottom: "1px solid #e0e0e0", padding: "1.25rem 0" }}>
              <p style={{ fontWeight: 700, color: "#111111", margin: "0 0 0.5rem", fontSize: "0.95rem" }}>{faq.q}</p>
              <p style={{ color: "#666666", margin: 0, fontSize: "0.875rem", lineHeight: 1.65 }}>{faq.a}</p>
            </div>
          ))}
          <div style={{ marginTop: "2rem" }}>
            <Link
              href="/hizmetler/trendyol-entegrasyonu"
              style={{ color: "#9b1c1c", fontWeight: 600, fontSize: "0.875rem", textDecoration: "underline" }}
            >
              Trendyol Entegrasyonu servis sayfasını görüntüle →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
