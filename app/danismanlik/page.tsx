import type { Metadata } from "next"
import { Clock, MessageSquare, DollarSign, CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import CalendlyEmbed from "./CalendlyEmbed"

export const metadata: Metadata = {
  title: "Ücretsiz 30 Dakika Teknik Danışmanlık | Solman Digital",
  description:
    "Projenizi 30 dakikada planlayın. Ücretsiz teknik danışmanlık seansı — proje kapsamı, teknoloji seçimi ve bütçe tahmini. Satış değil, teknik rehberlik.",
  alternates: { canonical: `${siteConfig.url}/danismanlik` },
  openGraph: {
    title: "Ücretsiz 30 Dakika Teknik Danışmanlık",
    description: "Proje kapsamı, teknoloji seçimi ve bütçe tahmini — ücretsiz ve bağlayıcı değil.",
    url: `${siteConfig.url}/danismanlik`,
  },
}

const consultingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ücretsiz 30 Dakika Teknik Danışmanlık",
  description: "Solman Digital'den ücretsiz teknik danışmanlık seansı. Proje kapsamı, mimari ve bütçe rehberliği.",
  provider: { "@type": "Organization", name: "Solman Digital", url: siteConfig.url },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
  },
}

const topics = [
  { icon: MessageSquare, title: "Proje Kapsamı", desc: "Projenizin teknik gereksinimlerini ve sınırlarını netleştiriyoruz." },
  { icon: Clock, title: "Teknik Tavsiyeler", desc: "Projenize en uygun teknoloji yığını ve mimari önerileri sunuyoruz." },
  { icon: DollarSign, title: "Süre & Bütçe Tahmini", desc: "Gerçekçi bir zaman çizelgesi ve bütçe aralığı çiziyoruz." },
]

export default function DanismanlikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consultingSchema) }}
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
            Ücretsiz & Bağlayıcı Değil
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800,
              color: "#ffffff", lineHeight: 1.15, marginBottom: "1.25rem",
              letterSpacing: "-0.03em",
            }}
          >
            30 Dakikalık Ücretsiz<br />
            <span style={{ color: "#9b1c1c" }}>Teknik Danışmanlık</span>
          </h1>
          <p style={{ color: "#666666", fontSize: "1rem", lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
            Projenizin teknik gereksinimlerini, uygun teknoloji yığınını ve bütçe aralığını birlikte belirleyelim. Bu bir satış görüşmesi değil — tamamen teknik rehberlik odaklı.
          </p>
        </div>
      </section>

      {/* Konular */}
      <section style={{ padding: "4rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "1.375rem", fontWeight: 800, color: "#111111",
              letterSpacing: "-0.02em", textAlign: "center", marginBottom: "2.5rem",
            }}
          >
            Görüşmede Neler Konuşacağız?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="consulting-grid">
            {topics.map((item) => (
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

      {/* Calendly */}
      <section style={{ padding: "0 1.5rem 4rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Takvimden Uygun Bir Saat Seçin
            </h2>
            <p style={{ color: "#6b6b6b", fontSize: "0.875rem" }}>
              Online görüşme — Türkiye saatiyle her gün müsait.
            </p>
          </div>
          <CalendlyEmbed />
        </div>
      </section>

      {/* Güven */}
      <section style={{ padding: "2.5rem 1.5rem", backgroundColor: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            {[
              "Tamamen ücretsiz",
              "Satış baskısı yok",
              "Teknik odaklı",
              "Online görüşme",
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
