import type { Metadata } from "next"
import { Search, Zap, BarChart3, CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import AuditForm from "./AuditForm"

export const metadata: Metadata = {
  title: "Ücretsiz Web Sitesi SEO & Performans Analizi | Solman Digital",
  description:
    "Web sitenizin teknik SEO, sayfa hızı ve rakip analizini ücretsiz yaptırın. 24 saat içinde detaylı rapor e-postanıza gönderilir.",
  alternates: { canonical: `${siteConfig.url}/ucretsiz-analiz` },
  openGraph: {
    title: "Ücretsiz Web Sitesi SEO & Performans Analizi",
    description: "Teknik SEO, sayfa hızı ve rakip analizi — ücretsiz. 24 saatte rapor.",
    url: `${siteConfig.url}/ucretsiz-analiz`,
  },
}

const auditSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ücretsiz Web Sitesi SEO ve Performans Analizi",
  description: "Solman Digital tarafından sunulan ücretsiz teknik SEO, sayfa hızı ve rakip analizi hizmeti.",
  provider: { "@type": "Organization", name: "Solman Digital", url: siteConfig.url },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
    description: "Ücretsiz, bağlayıcı olmayan web sitesi analizi",
  },
  areaServed: { "@type": "Country", name: "Turkey" },
}

const auditFeatures = [
  {
    icon: Search,
    title: "Teknik SEO Analizi",
    desc: "Meta etiketler, schema markup, canonical URL'ler, index durumu ve site yapısı incelenir.",
  },
  {
    icon: Zap,
    title: "Sayfa Hızı Değerlendirmesi",
    desc: "Core Web Vitals, LCP, CLS ve FID metrikleri Google standartlarıyla karşılaştırılır.",
  },
  {
    icon: BarChart3,
    title: "Rakip Karşılaştırması",
    desc: "Sektörünüzdeki en yakın 3 rakiple görünürlük ve teknik performans karşılaştırması yapılır.",
  },
]

export default function UcretsizAnalizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditSchema) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.7rem", fontWeight: 700, color: "#9b1c1c",
              textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.25rem",
            }}
          >
            Ücretsiz Hizmet
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800,
              color: "#ffffff", lineHeight: 1.15, marginBottom: "1.25rem",
              letterSpacing: "-0.03em",
            }}
          >
            Web Sitenizin Ücretsiz<br />
            <span style={{ color: "#9b1c1c" }}>SEO & Performans Analizi</span>
          </h1>
          <p style={{ color: "#666666", fontSize: "1rem", lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
            Teknik SEO sorunlarını, sayfa hızı problemlerini ve rakip açıklarını tespit edin.
            24 saat içinde detaylı rapor e-posta adresinize gönderilir.
          </p>
        </div>
      </section>

      {/* Ne Alacaksınız */}
      <section style={{ padding: "4rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.375rem", fontWeight: 800, color: "#111111",
              letterSpacing: "-0.02em", textAlign: "center", marginBottom: "2.5rem",
            }}
          >
            Analizde Neler İnceleniyor?
          </h2>
          <div className="audit-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {auditFeatures.map((item) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#f5f5f5", border: "1px solid #e0e0e0",
                  borderRadius: 10, padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, backgroundColor: "#fff0f0",
                    border: "1px solid #fecaca", borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem",
                  }}
                >
                  <item.icon size={20} color="#9b1c1c" />
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111111", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "4rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em", marginBottom: "0.625rem" }}>
              Analiz Talep Edin
            </h2>
            <p style={{ color: "#6b6b6b", fontSize: "0.9rem" }}>
              Formu doldurun, 24 saat içinde dönüş yapıyoruz.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff", border: "1px solid #e0e0e0",
              borderRadius: 12, padding: "2.5rem",
            }}
          >
            <AuditForm />
          </div>
        </div>
      </section>

      {/* Güven Rozetleri */}
      <section style={{ padding: "2.5rem 1.5rem", backgroundColor: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            {[
              "24 saat içinde rapor",
              "Tamamen ücretsiz",
              "Bağlayıcı değil",
              "Bilgileriniz paylaşılmaz",
            ].map((badge) => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span style={{ color: "#888888", fontSize: "0.8rem", fontWeight: 500 }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
