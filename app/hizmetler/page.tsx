import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { services, getServicesByTier } from "@/lib/data/services"
import ServiceCard from "@/components/ServiceCard"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Hizmetler — İşinize Özel Yazılım Çözümleri",
  description:
    "Full-stack developer ile işinize özel yazılım. E-ticaret, Trendyol entegrasyonu, AI otomasyon, SaaS ve daha fazlası. Her proje sıfırdan inşa edilir.",
  alternates: { canonical: `${siteConfig.url}/hizmetler` },
  openGraph: {
    title: "Hizmetler | Solman Digital",
    description: "Customized software expert — işinizin tam ihtiyacına özel dijital çözümler.",
    locale: "tr_TR",
  },
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Solman Digital Hizmetleri",
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${siteConfig.url}/hizmetler/${s.slug}`,
  })),
}

export default function HizmetlerPage() {
  const tier1 = getServicesByTier(1)
  const tier2 = getServicesByTier(2)
  const tier3 = getServicesByTier(3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#444444",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            Customized Software Expert
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              letterSpacing: "-0.03em",
              maxWidth: 640,
            }}
          >
            İşinize Özel Çözümler
          </h1>
          <p style={{ color: "#666666", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 560 }}>
            Her hizmet, iş sürecinize ve hedeflerinize göre sıfırdan tasarlanır. Hazır template değil,
            gerçekten özelleştirilmiş yazılım — projenizi yapan full-stack developer ile doğrudan.
          </p>
        </div>
      </section>

      {/* Tier 1 — Popüler */}
      <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 20, height: 1, backgroundColor: "#9b1c1c" }} />
              En Çok Tercih Edilenler
            </p>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Hızlı Sonuç Veren Çözümler
            </h2>
            <p style={{ color: "#6b6b6b", fontSize: "0.875rem", maxWidth: 540 }}>
              Net kapsam, belirli süre, teslim garantisi. Doğrudan yazılım uzmanıyla başlayan ve biten projeler.
            </p>
          </div>
          <div className="tier1-grid">
            {tier1.map((s) => (
              <ServiceCard key={s.slug} service={s} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2 — Orta Vadeli */}
      <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 20, height: 1, backgroundColor: "#9b1c1c" }} />
              Platform & Uygulama
            </p>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Platform & Uygulama Geliştirme
            </h2>
            <p style={{ color: "#6b6b6b", fontSize: "0.875rem", maxWidth: 540 }}>
              SaaS ürünler, dashboard paneller, abonelik sistemleri — hepsi iş modelinizin tam ihtiyacına göre inşa edilir.
            </p>
          </div>
          <div className="services-grid">
            {tier2.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Tier 3 — Niche */}
      <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 20, height: 1, backgroundColor: "#9b1c1c" }} />
              Özel Çözümler
            </p>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Niche & Özelleşmiş Hizmetler
            </h2>
            <p style={{ color: "#6b6b6b", fontSize: "0.875rem", maxWidth: 540 }}>
              Sektöre özel ve daha teknik altyapı gerektiren özelleştirilmiş dijital çözümler.
            </p>
          </div>
          <div className="tier3-grid">
            {tier3.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "4.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
            }}
          >
            Hangi hizmete ihtiyacınız var?
          </h2>
          <p style={{ color: "#555555", marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Projenizi anlatan kısa bir mesaj yeterli. Ücretsiz danışmanlık görüşmesi için hemen yazın.
          </p>
          <Link
            href="/iletisim"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#9b1c1c",
              color: "#ffffff",
              padding: "0.875rem 2rem",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            Ücretsiz Danışmanlık Al <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
