import Link from "next/link"
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react"
import * as Icons from "lucide-react"
import type { Service } from "@/lib/data/services"
import ServiceCard from "./ServiceCard"
import LeadMagnetBanner from "./LeadMagnetBanner"
import { categoryLeadMagnetMap } from "@/lib/data/leadMagnets"

type Props = {
  service: Service
  related: Service[]
}

const faqSchema = (faq: Service["faq"], serviceTitle: string, serviceUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
})

const serviceSchema = (service: Service, siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.shortDesc,
  url: `${siteUrl}/hizmetler/${service.slug}`,
  provider: {
    "@type": "Organization",
    name: "Solman Digital",
    url: siteUrl,
  },
  areaServed: { "@type": "Country", name: "Turkey" },
  serviceType: service.category,
})

const breadcrumbSchema = (service: Service, siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${siteUrl}/hizmetler` },
    { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/hizmetler/${service.slug}` },
  ],
})

export default function ServiceDetail({ service, related }: Props) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[service.icon]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solmandigital.com.tr"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(service.faq, service.title, `${siteUrl}/hizmetler/${service.slug}`)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(service, siteUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(service, siteUrl)),
        }}
      />

      {/* Breadcrumb */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          padding: "0.75rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.75rem",
            color: "#888888",
          }}
        >
          <Link href="/" style={{ color: "#888888" }}>Ana Sayfa</Link>
          <ChevronRight size={13} />
          <Link href="/hizmetler" style={{ color: "#888888" }}>Hizmetler</Link>
          <ChevronRight size={13} />
          <span style={{ color: "#111111", fontWeight: 600 }}>{service.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                backgroundColor: "#1e1e1e",
                border: "1px solid #2a2a2a",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {IconComponent && <IconComponent size={14} color="#888888" />}
            </div>
            <span
              style={{
                color: "#666666",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {service.category}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              letterSpacing: "-0.03em",
            }}
          >
            {service.title}
          </h1>
          <p
            style={{
              color: "#666666",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              marginBottom: "2rem",
              maxWidth: 680,
            }}
          >
            {service.longDesc.split("\n\n")[0]}
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#9b1c1c",
                color: "#fff",
                padding: "0.875rem 1.75rem",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
            >
              Teklif Al <ArrowRight size={16} />
            </Link>
            <Link
              href="/hizmetler"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid #2a2a2a",
                color: "#888888",
                padding: "0.875rem 1.75rem",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Tüm Hizmetler
            </Link>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "3rem",
            alignItems: "start",
          }}
          className="two-col-grid"
        >
          {/* Sol: Açıklama + Özellikler */}
          <div>
            {service.aeoSummary && (
              <blockquote
                style={{
                  borderLeft: "3px solid #9b1c1c",
                  paddingLeft: "1.25rem",
                  marginBottom: "2rem",
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <p
                  style={{
                    color: "#333333",
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    fontStyle: "normal",
                    fontWeight: 500,
                  }}
                >
                  {service.aeoSummary}
                </p>
              </blockquote>
            )}
            <h2
              style={{
                fontSize: "1.375rem",
                fontWeight: 800,
                color: "#111111",
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              Neler Sunuyoruz?
            </h2>
            {service.longDesc.split("\n\n").map((para, i) => (
              <p key={i} style={{ color: "#555555", lineHeight: 1.85, marginBottom: "1rem", fontSize: "0.925rem" }}>
                {para}
              </p>
            ))}

            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#111111",
                marginTop: "2.5rem",
                marginBottom: "1rem",
                letterSpacing: "-0.015em",
              }}
            >
              Özellikler
            </h3>
            <div className="features-grid">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    padding: "0.875rem 1rem",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 8,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: "#9b1c1c",
                      flexShrink: 0,
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ width: 6, height: 6, backgroundColor: "#ffffff", borderRadius: "50%" }} />
                  </div>
                  <span style={{ color: "#333333", fontSize: "0.875rem", lineHeight: 1.4 }}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Teknoloji Yığını */}
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#111111",
                marginTop: "2.5rem",
                marginBottom: "1rem",
                letterSpacing: "-0.015em",
              }}
            >
              Kullandığımız Teknolojiler
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    backgroundColor: "#f5f5f5",
                    color: "#444444",
                    border: "1px solid #e0e0e0",
                    padding: "0.375rem 0.875rem",
                    borderRadius: 5,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Sağ: Teslimat Kapsamı */}
          <div style={{ position: "sticky", top: 80 }}>
            <div
              style={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #e0e0e0",
                borderRadius: 10,
                padding: "1.75rem",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "#888888",
                  marginBottom: "1.25rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Teslimat Kapsamı
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {service.deliverables.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <CheckCircle2 size={16} color="#9b1c1c" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: "#444444", fontSize: "0.875rem", lineHeight: 1.4 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/iletisim"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                backgroundColor: "#9b1c1c",
                color: "#fff",
                padding: "0.9rem 1rem",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "0.875rem",
                width: "100%",
                textAlign: "center",
              }}
            >
              Ücretsiz Teklif Al <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet Banner */}
      {categoryLeadMagnetMap[service.category] && (
        <section style={{ backgroundColor: "#ffffff", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <LeadMagnetBanner {...categoryLeadMagnetMap[service.category]} />
          </div>
        </section>
      )}

      {/* SSS */}
      <section style={{ backgroundColor: "#f5f5f5", padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#888888",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            SSS
          </p>
          <h2
            style={{
              fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
              fontWeight: 800,
              color: "#111111",
              marginBottom: "0.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            Sık Sorulan Sorular
          </h2>
          <p style={{ color: "#888888", marginBottom: "2.5rem", fontSize: "0.875rem" }}>
            {service.title} hizmeti hakkında merak edilenler
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {service.faq.map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid #e0e0e0",
                  padding: "1.375rem 0",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.625rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.q}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.875rem", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e0e0e0" }} />
          </div>
        </div>
      </section>

      {/* İlgili Hizmetler */}
      {related.length > 0 && (
        <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#ffffff" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p
              style={{
                fontSize: "0.7rem",
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
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              Benzer Çözümler
            </p>
            <h2
              style={{
                fontSize: "1.375rem",
                fontWeight: 800,
                color: "#111111",
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              İlgili Hizmetler
            </h2>
            <p style={{ color: "#888888", marginBottom: "2rem", fontSize: "0.875rem" }}>
              Bu hizmetle birlikte sık tercih edilenler
            </p>
            <div className="related-grid">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Son CTA */}
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
            {service.cta || `${service.title} için bugün teklif alın`}
          </h2>
          <p style={{ color: "#555555", marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Projenizi anlatan kısa bir mesaj yeterli. Size 24 saat içinde dönüş yapıyoruz.
          </p>
          <Link
            href="/iletisim"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#9b1c1c",
              color: "#fff",
              padding: "0.875rem 2rem",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          >
            Şimdi İletişime Geç <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
