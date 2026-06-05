import Link from "next/link"
import { ArrowRight, CheckCircle, X, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import type { IstanbulPage } from "@/lib/data/istanbul-pages"
import IstanbulLocalLeadForm from "./IstanbulLocalLeadForm"

const comparisonRows = [
  {
    feature: "İletişim",
    agency: "Proje yöneticisi üzerinden",
    freelancer: "Doğrudan ama yanıtsız kalabilir",
    us: "Doğrudan geliştirici, WhatsApp",
  },
  {
    feature: "Fiyat",
    agency: "Yüksek overhead maliyeti",
    freelancer: "Düşük ama belirsiz",
    us: "Sabit fiyat garantisi",
  },
  {
    feature: "Takvim",
    agency: "Kaynak çakışması olabilir",
    freelancer: "Başka işe girebilir",
    us: "Net teslim tarihi, yazılı taahhüt",
  },
  {
    feature: "Yasal güvence",
    agency: "Var (sözleşme)",
    freelancer: "Sınırlı",
    us: "Var (sözleşme + e-fatura)",
  },
]

type Props = {
  config: IstanbulPage
}

export default function IstanbulLocalPage({ config }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${config.schemaServiceType} — ${config.title}`,
        description: config.metaDescription,
        url: `${siteConfig.url}/${config.slug}`,
        provider: { "@id": `${siteConfig.url}/#localbusiness` },
        areaServed: config.areaServed.map((name) => ({ "@type": "City", name })),
        serviceType: config.schemaServiceType,
      },
      {
        "@type": "FAQPage",
        mainEntity: config.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: config.title, item: `${siteConfig.url}/${config.slug}` },
        ],
      },
    ],
  }

  const featuredServices = services.filter((s) => config.featuredServiceSlugs.includes(s.slug))
  const locationLabel = config.district ?? "İstanbul"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <MapPin size={14} color="#9b1c1c" />
            <p style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#9b1c1c", margin: 0,
            }}>
              {config.heroLabel}
            </p>
          </div>
          <h1 style={{
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 900, color: "#ffffff",
            letterSpacing: "-0.03em", marginBottom: "1.25rem", lineHeight: 1.15,
          }}>
            {config.heroH1}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#a0a0a0", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 580, margin: "0 auto 2.5rem" }}>
            {config.heroSubtitle}
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
            İletişime Geç <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Unique Section — bölgeye özel içerik */}
      <section style={{ padding: "3.5rem 1.5rem 0", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#111111", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            {config.uniqueSection.heading}
          </h2>
          <p style={{ color: "#555555", fontSize: "0.975rem", lineHeight: 1.8 }}>
            {config.uniqueSection.body}
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Neden Ne Ajans, Ne Freelancer?
          </h2>
          <div style={{ border: "1px solid #e0e0e0", borderRadius: 10, overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.25fr",
              backgroundColor: "#0d0d0d", padding: "0.875rem 1.25rem", gap: "1rem",
            }}>
              {["Kriter", "Ajans", "Freelancer", "Solman Digital"].map((h, i) => (
                <span key={h} style={{
                  fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                  color: i === 3 ? "#9b1c1c" : "#888888",
                }}>
                  {h}
                </span>
              ))}
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.25fr",
                  padding: "1rem 1.25rem", gap: "1rem",
                  borderTop: i > 0 ? "1px solid #e0e0e0" : "none",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>{row.feature}</span>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.35rem" }}>
                  <X size={13} color="#aaaaaa" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "0.8rem", color: "#888888" }}>{row.agency}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.35rem" }}>
                  <X size={13} color="#aaaaaa" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "0.8rem", color: "#888888" }}>{row.freelancer}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.35rem" }}>
                  <CheckCircle size={13} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "0.8rem", color: "#333333", fontWeight: 600 }}>{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            {locationLabel} İşletmeleri İçin Öne Çıkan Hizmetler
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/hizmetler/${service.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  backgroundColor: "#ffffff", border: "1px solid #e0e0e0",
                  borderRadius: 8, padding: "1.5rem",
                  display: "flex", flexDirection: "column", gap: "0.5rem",
                  height: "100%",
                  transition: "border-color 0.15s",
                }}>
                  <p style={{ fontWeight: 700, color: "#111111", margin: 0, fontSize: "0.95rem" }}>{service.title}</p>
                  <p style={{ fontSize: "0.8rem", color: "#666666", margin: 0, lineHeight: 1.6 }}>{service.shortDesc}</p>
                  <p style={{ fontSize: "0.8rem", color: "#9b1c1c", margin: "auto 0 0", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    İncele <ArrowRight size={12} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Trust Signals */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Nasıl Çalışıyoruz?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              {
                icon: "📍",
                title: `${locationLabel}'da Yüz Yüze`,
                desc: `${locationLabel} ve çevresinde yüz yüze görüşme organize edebiliyoruz. Proje başlangıcında ya da teslimat aşamasında şahsen görüşmeyi tercih ediyoruz.`,
              },
              {
                icon: "💬",
                title: "WhatsApp İletişim",
                desc: "Hızlı güncelleme ve sorular için WhatsApp. E-posta için de dönüş yapıyoruz, ama mesajlaşma daha hızlı.",
              },
              {
                icon: "🧾",
                title: "E-Fatura / E-Arşiv",
                desc: "Şirketlere e-fatura, bireysel müşterilere e-arşiv fatura. Yasal güvence her iki taraf için de önemli.",
              },
              {
                icon: "📋",
                title: "Yazılı Sözleşme",
                desc: "Kapsam, fiyat ve takvim her projede sözleşmeye bağlanır. Sürpriz yok.",
              },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, color: "#111111", margin: "0 0 0.25rem", fontSize: "0.95rem" }}>{item.title}</p>
                  <p style={{ color: "#666666", margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section style={{ padding: "3.5rem 1.5rem", backgroundColor: "#f5f5f5", textAlign: "center" }}>
        <p style={{ color: "#666666", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Geçmiş projelerimize göz atın.
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

      {/* FAQ */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Sık Sorulan Sorular
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {config.faq.map((item) => (
              <div key={item.q} style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "1.5rem" }}>
                <p style={{ fontWeight: 700, color: "#111111", margin: "0 0 0.5rem", fontSize: "0.95rem" }}>{item.q}</p>
                <p style={{ color: "#666666", margin: 0, fontSize: "0.875rem", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c", marginBottom: "0.75rem",
          }}>
            İletişim
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)", fontWeight: 800, color: "#111111", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Projeyi Anlatalım
          </h2>
          <p style={{ color: "#666666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Projenizi kısaca paylaşın. 24 saat içinde, tercihinize göre Zoom veya yüz yüze görüşme için size ulaşalım.
          </p>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "2.5rem" }}>
            <IstanbulLocalLeadForm district={config.district} />
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section style={{ padding: "3rem 1.5rem", backgroundColor: "#0d0d0d", textAlign: "center" }}>
        <p style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Sunduğumuz hizmetlerin tamamına göz atmak ister misiniz?
        </p>
        <Link
          href="/hizmetler"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: "1px solid #444", color: "#ffffff",
            padding: "0.75rem 1.5rem", borderRadius: 8,
            fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
          }}
        >
          Tüm Hizmetler <ArrowRight size={15} />
        </Link>
      </section>
    </>
  )
}
