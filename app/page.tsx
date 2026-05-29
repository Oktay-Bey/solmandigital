import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Zap, Users, X, CheckCircle2, Globe } from "lucide-react"
import { getServicesByTier } from "@/lib/data/services"
import ServiceCard from "@/components/ServiceCard"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
}

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Solman Digital ile çalışmanın farkı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Projenizi anlayan, tasarlayan ve yapan aynı uzmandır. Birden fazla kişi arasında dolaşan brief'ler, onay döngüleri ya da standart template'ler yok. İşinizin tam ihtiyacına göre sıfırdan yazılım üretilir, net kapsam ve takvimle teslim edilir.",
      },
    },
    {
      "@type": "Question",
      name: "Projeler ne kadar sürede teslim edilir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Proje türüne göre değişir. Kurumsal web siteleri 5-7 iş günü, e-ticaret siteleri 10-15 iş günü, SaaS uygulamalar 4-8 hafta içinde teslim edilir. Başlamadan önce net bir takvim ve kapsam belirliyoruz.",
      },
    },
    {
      "@type": "Question",
      name: "Teklif almak için ne yapmalıyım?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "İletişim formunu doldurmanız yeterlidir. Projenizi anlatan kısa bir mesaj gönderin, 24 saat içinde size dönüş yapıyoruz.",
      },
    },
    {
      "@type": "Question",
      name: "Trendyol API entegrasyonu için ne gerekiyor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Onaylı Trendyol satıcı hesabı ve API anahtarı gerekmektedir. API başvuru sürecinde teknik destek sağlıyoruz.",
      },
    },
  ],
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Solman Digital ile Nasıl Proje Başlatılır?",
  description: "Solman Digital ile proje başlatmak için 4 adım.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ücretsiz Görüşme", text: "Projenizi anlatan 15 dakikalık bir görüşme yapıyoruz." },
    { "@type": "HowToStep", position: 2, name: "Teknik Teklif", text: "Kapsam, süre ve fiyat içeren detaylı bir teklif sunuyoruz." },
    { "@type": "HowToStep", position: 3, name: "Geliştirme", text: "Haftalık ilerleme güncellemeleri ile şeffaf bir süreç yürütüyoruz." },
    { "@type": "HowToStep", position: 4, name: "Teslim & Destek", text: "Deploy, test ve lansman sonrası teknik destek tamamlanır." },
  ],
}

const techStack = [
  "Next.js 16", "React 19", "TypeScript", "Tailwind CSS",
  "Supabase", "Prisma", "OpenAI GPT-4o", "Claude AI",
  "İyzico", "Stripe", "Trendyol API", "Vercel",
]

const agencyVsUs = [
  { agency: "Uzun keşif ve brief süreci", us: "15 dk görüşme, aynı gün teklif" },
  { agency: "Standart template üzerine uyarlama", us: "Sıfırdan, işinize özel yazılım" },
  { agency: "PM ve account manager üzerinden iletişim", us: "Doğrudan sorumlu geliştiriciyle" },
  { agency: "Aylarca uzayan takvimler", us: "MVP 1-2 haftada, söz verildiği gibi" },
]

const whyUs = [
  {
    icon: Users,
    title: "Doğrudan Uzman Erişimi",
    desc: "Projenizi anlatan biriyle değil, yapacak biriyle konuşursunuz. Aracı yok, katman yok.",
  },
  {
    icon: CheckCircle2,
    title: "Gerçekten Özelleştirilmiş",
    desc: "Trendyol satıcı paneli, AI haber motoru, QR menü SaaS — hepsi sıfırdan kuruldu. Template yok.",
  },
  {
    icon: Zap,
    title: "Söylediğimiz Tarihte Teslim",
    desc: "Belirsiz onay döngüleri yok. Kapsamı netleştiriyoruz, takvim veriyoruz, teslim ediyoruz.",
  },
  {
    icon: Globe,
    title: "Türk Pazarını Tanıyoruz",
    desc: "İyzico, Trendyol API, Hepsiburada — Türk pazarına özgü entegrasyonlarda gerçek saha deneyimi.",
  },
]

const steps = [
  { num: "01", title: "Ücretsiz Görüşme", desc: "Projenizi anlamak için kısa, odaklı bir görüşme yapıyoruz." },
  { num: "02", title: "Teknik Teklif", desc: "Kapsam, süre ve fiyat içeren detaylı bir teklif sunuyoruz." },
  { num: "03", title: "Geliştirme", desc: "Haftalık ilerleme güncellemeleri ile şeffaf bir süreç yürütüyoruz." },
  { num: "04", title: "Teslim & Destek", desc: "Deploy, test ve lansman sonrası teknik destek tamamlanır." },
]

export default function HomePage() {
  const tier1 = getServicesByTier(1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="hero-grid">
          {/* Sol */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  backgroundColor: "#9b1c1c",
                }}
              />
              Özel Yazılım Uzmanı
            </p>

            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
              }}
            >
              Sıfırdan Yazılım,
              <br />
              Net Takvim,
              <br />
              <span style={{ color: "#9b1c1c" }}>Doğrudan Geliştirici</span>
            </h1>

            <p
              style={{
                color: "#888888",
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                maxWidth: 480,
              }}
            >
              Projenizi anlayan, tasarlayan ve hayata geçiren aynı kişiyle çalışırsınız. Template değil, sıfırdan
              özel yazılım — net kapsam, belirli takvim, söz verilen günde teslim.
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
                  fontSize: "0.9rem",
                  letterSpacing: "0.01em",
                }}
              >
                Ücretsiz Teklif Al <ArrowRight size={16} />
              </Link>
              <Link
                href="/hizmetler"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "1px solid #2a2a2a",
                  color: "#cccccc",
                  padding: "0.875rem 1.75rem",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                Tüm Hizmetler
              </Link>
            </div>
          </div>

          {/* Sağ: Metrikler */}
          <div>
            <div
              style={{
                backgroundColor: "#161616",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: "2rem",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "#2a2a2a" }}>
                {[
                  { value: "22", label: "Hizmet Alanı" },
                  { value: "3+", label: "Yıl Deneyim" },
                  { value: "15+", label: "Tamamlanan Proje" },
                  { value: "100%", label: "Müşteri Memnuniyeti" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      backgroundColor: "#161616",
                      padding: "1.75rem 1.5rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#666666", marginTop: "0.4rem", fontWeight: 500 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  paddingTop: "1.75rem",
                  borderTop: "1px solid #2a2a2a",
                }}
              >
                <p
                  style={{
                    color: "#555555",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.875rem",
                  }}
                >
                  Teknoloji Yığını
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {["Next.js 16", "TypeScript", "GPT-4o", "İyzico", "Supabase", "Trendyol API"].map((t) => (
                    <span
                      key={t}
                      style={{
                        backgroundColor: "#1e1e1e",
                        border: "1px solid #2a2a2a",
                        color: "#888888",
                        padding: "0.25rem 0.625rem",
                        borderRadius: 4,
                        fontSize: "0.7rem",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ajans vs Biz */}
      <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#111111", borderTop: "1px solid #1e1e1e" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
              }}
            >
              Nasıl Çalışırız?
            </p>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Projeniz bir developer&apos;ın elinde başlar,
              <br />
              <span style={{ color: "#9b1c1c" }}>aynı elde biter.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            {/* Başlık satırı */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                padding: "0 1rem",
              }}
            >
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#555555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Geleneksel Yaklaşım
              </span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9b1c1c", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Solman Digital
              </span>
            </div>

            {agencyVsUs.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  backgroundColor: "#161616",
                  border: "1px solid #1e1e1e",
                  borderRadius: 8,
                  padding: "1rem 1rem",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <X size={13} color="#555555" style={{ flexShrink: 0 }} />
                  <span style={{ color: "#666666", fontSize: "0.85rem" }}>{row.agency}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={13} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span style={{ color: "#cccccc", fontSize: "0.85rem", fontWeight: 500 }}>{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 1 Hizmetler */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
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
              En Çok Tercih Edilenler
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                maxWidth: 560,
              }}
            >
              Hızlı Sonuç Veren Hizmetler
            </h2>
            <p style={{ color: "#6b6b6b", marginTop: "0.875rem", maxWidth: 520, fontSize: "0.95rem", lineHeight: 1.7 }}>
              Kısa sürede proje başlatmak ve somut iş sonuçları almak isteyen işletmeler için.
            </p>
          </div>

          <div className="tier1-grid">
            {tier1.map((s) => (
              <ServiceCard key={s.slug} service={s} featured />
            ))}
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <Link
              href="/hizmetler"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid #e0e0e0",
                color: "#111111",
                padding: "0.75rem 1.5rem",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Tüm 22 Hizmeti Gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
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
              Fark Yaratan Unsurlar
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
                maxWidth: 560,
              }}
            >
              Bir full-stack developer ile çalışmanın farkı
            </h2>
          </div>

          <div className="why-grid">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 10,
                  padding: "1.75rem",
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
                    marginBottom: "1.25rem",
                  }}
                >
                  <item.icon size={18} color="#333333" />
                </div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışırız */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
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
              Süreç
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
              }}
            >
              Nasıl Çalışırız?
            </h2>
            <p style={{ color: "#6b6b6b", marginTop: "0.875rem", fontSize: "0.95rem" }}>
              Fikrinizden canlıya geçişe 4 adım.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={step.num} style={{ position: "relative" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "#f0f0f0",
                    lineHeight: 1,
                    marginBottom: "1rem",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    width: 20,
                    height: 2,
                    backgroundColor: "#9b1c1c",
                    marginBottom: "0.875rem",
                  }}
                />
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        style={{
          padding: "2.5rem 1.5rem",
          backgroundColor: "#0d0d0d",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <p
              style={{
                color: "#444444",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Kullandığımız Teknolojiler
            </p>
            <div
              style={{
                width: 1,
                height: 16,
                backgroundColor: "#2a2a2a",
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    color: "#555555",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    transition: "color 0.15s",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
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
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
              }}
            >
              Sık Sorulan Sorular
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {homeFaqSchema.mainEntity.map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid #e0e0e0",
                  padding: "1.5rem 0",
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
                  {item.name}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e0e0e0" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: "#0d0d0d",
          padding: "6rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#444444",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            Başlayalım
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1.25rem",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Projenizi hayata geçirelim
          </h2>
          <p
            style={{
              color: "#666666",
              fontSize: "0.95rem",
              marginBottom: "2.5rem",
              lineHeight: 1.75,
            }}
          >
            Birkaç satırlık mesajınız yeterli.
            <br />
            24 saat içinde ücretsiz danışmanlık için dönüş yapıyoruz.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
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
                fontSize: "0.9rem",
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
                padding: "0.875rem 2rem",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Hizmetleri İncele
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
