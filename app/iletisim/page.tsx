import type { Metadata } from "next"
import Link from "next/link"
import { Mail, Clock, MessageCircle } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "İletişim — Ücretsiz Proje Teklifi",
  description:
    "Web, AI ve otomasyon projeniz için ücretsiz teklif alın. 24 saat içinde dönüş yapıyoruz.",
  alternates: { canonical: `${siteConfig.url}/iletisim` },
  openGraph: { title: "İletişim | Solman Digital", locale: "tr_TR" },
}

export default function IletisimPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "4rem 1.5rem" }}>
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
            Ücretsiz Danışmanlık
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1rem",
              letterSpacing: "-0.03em",
            }}
          >
            Projenizi Konuşalım
          </h1>
          <p style={{ color: "#666666", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 480 }}>
            Ücretsiz danışmanlık için formu doldurun. 24 saat içinde size dönüş yapıyoruz.
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section style={{ padding: "4rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto 0" }}>
          <div
            style={{
              backgroundColor: "#fff8f0",
              border: "1px solid #fde8cc",
              borderRadius: 8,
              padding: "1rem 1.5rem",
              marginBottom: "2rem",
              fontSize: "0.875rem",
              color: "#7a4500",
            }}
          >
            Henüz emin değil misiniz?{" "}
            <Link href="/ucretsiz-analiz" style={{ color: "#9b1c1c", fontWeight: 700, textDecoration: "underline" }}>
              Web sitenizin ücretsiz SEO analizini
            </Link>{" "}
            alın, sonra karar verin.
          </div>
        </div>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="two-col-grid"
        >
          {/* Form */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
              borderRadius: 10,
              padding: "2.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "#111111",
                marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              Teklif Formu
            </h2>
            <p style={{ color: "#888888", fontSize: "0.825rem", marginBottom: "2rem" }}>
              Projenizi anlatan birkaç satır yeterli. Hızlıca dönüş yapıyoruz.
            </p>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              {
                icon: Clock,
                title: "Hızlı Yanıt",
                desc: "İş günlerinde maksimum 24 saat içinde dönüş yapıyoruz.",
              },
              {
                icon: Mail,
                title: "E-posta ile de yazabilirsiniz",
                desc: siteConfig.email,
                link: `mailto:${siteConfig.email}`,
              },
              {
                icon: MessageCircle,
                title: "Ücretsiz Danışmanlık",
                desc: "İlk görüşme tamamen ücretsiz. Proje kapsamı, süre ve fiyat konuşuyoruz.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 10,
                  padding: "1.375rem",
                  display: "flex",
                  gap: "0.875rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <card.icon size={18} color="#333333" />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "#111111",
                      marginBottom: "0.25rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {card.title}
                  </h3>
                  {card.link ? (
                    <a href={card.link} style={{ color: "#9b1c1c", fontSize: "0.825rem", fontWeight: 500 }}>
                      {card.desc}
                    </a>
                  ) : (
                    <p style={{ color: "#6b6b6b", fontSize: "0.825rem", lineHeight: 1.6 }}>{card.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
