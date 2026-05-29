import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import SaasLeadForm from "./SaasLeadForm"

export const metadata: Metadata = {
  title: "SaaS Platform Geliştirme Türkiye — MVP'den Ürüne | Solman Digital",
  description:
    "Next.js, Supabase ve Stripe ile SaaS uygulamanızı geliştirelim. Multi-tenant mimari, abonelik sistemi, kullanıcı yönetimi. İstanbul merkezli, global standart. 4-8 haftada MVP.",
  keywords: [
    "saas platform geliştirme",
    "saas yazılım geliştirme türkiye",
    "mvp geliştirme istanbul",
    "saas uygulama yaptırmak",
    "web uygulama geliştirme",
    "next.js saas",
    "saas startup türkiye",
    "yazılım geliştirme hizmeti",
  ],
  alternates: { canonical: `${siteConfig.url}/saas-platform-gelistirme` },
  openGraph: {
    title: "SaaS Platform Geliştirme Türkiye — MVP'den Ürüne | Solman Digital",
    description: "Next.js, Supabase ve Stripe ile SaaS platformu. 4-8 haftada MVP, multi-tenant, abonelik sistemi.",
    url: `${siteConfig.url}/saas-platform-gelistirme`,
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
      name: "SaaS Platform Geliştirme",
      description:
        "Next.js, Supabase ve Stripe ile SaaS uygulama geliştirme. Multi-tenant mimari, abonelik sistemi, RBAC ve dashboard.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: `${siteConfig.url}/saas-platform-gelistirme`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "SaaS MVP kaç haftada hazır olur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kapsama göre 4-8 hafta. Temel auth, dashboard ve abonelik sistemi için 4 hafta yeterlidir.",
          },
        },
        {
          "@type": "Question",
          name: "Hangi teknoloji stack kullanıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Next.js 16, Supabase (auth + database), Stripe (ödeme), Vercel (hosting). Projeye göre farklı seçimler de yapabiliriz.",
          },
        },
        {
          "@type": "Question",
          name: "Multi-tenant mimari kurabilir misiniz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. Subdomain tabanlı ya da path tabanlı multi-tenant mimariler geliştiriyoruz. Row-level security Supabase ile kolayca uygulanıyor.",
          },
        },
      ],
    },
  ],
}

const modules = [
  { title: "Auth & Oturum", desc: "E-posta, Google, magic link ile giriş. Şifremi unuttum, e-posta doğrulama." },
  { title: "Multi-Tenant", desc: "Her müşteri kendi workspace'inde. Subdomain veya path tabanlı izolasyon." },
  { title: "Abonelik & Billing", desc: "Stripe ile aylık/yıllık planlar, freemium gate, fatura kesme." },
  { title: "RBAC", desc: "Admin, yönetici, üye rolleri. Her rol için izin matrisi." },
  { title: "Analytics Dashboard", desc: "Kullanıcı aktivitesi, gelir metrikleri, churn takibi." },
  { title: "Transactional Email", desc: "Hoş geldin, fatura, şifre sıfırlama e-postaları. Resend entegrasyonu." },
]

const techComparison = [
  { choice: "Next.js", instead: "Laravel / Django", why: "Full-stack TypeScript, edge-ready, Vercel'e kolay deploy" },
  { choice: "Supabase", instead: "Firebase", why: "PostgreSQL + Row-level security + realtime, açık kaynak" },
  { choice: "Stripe", instead: "Özel ödeme", why: "Olgun webhook sistemi, global kart desteği, PCI compliance" },
]

export default function SaasPlatformGelistirmePage() {
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
            Multi-Tenant · Auth · Abonelik · Dashboard
          </p>
          <h1 style={{
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 900, color: "#ffffff",
            letterSpacing: "-0.03em", marginBottom: "1.25rem", lineHeight: 1.15,
          }}>
            SaaS Fikrinizi Ürüne Dönüştürün — 4-8 Haftada MVP
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#a0a0a0", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 580, margin: "0 auto 2.5rem" }}>
            Aylarca geliştirme yerine hazır SaaS altyapısıyla pazara erken çıkın. Auth, billing, multi-tenant — hepsi hazır.
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
            SaaS Proje Teklifi Al <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Pre-built Modules */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c", marginBottom: "0.75rem",
          }}>
            Hazır Altyapı
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Her SaaS&apos;ta Olması Gereken Modüller
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {modules.map((m) => (
              <div
                key={m.title}
                style={{
                  border: "1px solid #e0e0e0", borderRadius: 10, padding: "1.5rem",
                  display: "flex", flexDirection: "column", gap: "0.5rem",
                }}
              >
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111111", margin: 0 }}>{m.title}</p>
                <p style={{ fontSize: "0.85rem", color: "#666666", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP Timeline */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            MVP Takvimi
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { weeks: "Hafta 1-2", title: "Planlama & Mimari", desc: "Teknik stack kararları, veritabanı tasarımı, proje yönetim kurulumu." },
              { weeks: "Hafta 2-4", title: "Core Özellikler", desc: "Ana iş mantığı, CRUD operasyonları, temel dashboard." },
              { weeks: "Hafta 4-6", title: "Auth & Billing", desc: "Kullanıcı girişi, abonelik planları, Stripe entegrasyonu." },
              { weeks: "Hafta 6-8", title: "Polish & Deploy", desc: "UI iyileştirmeleri, hata yakalama, Vercel deployment, domain bağlantısı." },
            ].map((item) => (
              <div key={item.weeks} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, color: "#9b1c1c",
                  backgroundColor: "#fff5f5", border: "1px solid #fecaca",
                  borderRadius: 6, padding: "0.3rem 0.5rem",
                  minWidth: 72, textAlign: "center", flexShrink: 0, whiteSpace: "nowrap",
                }}>
                  {item.weeks}
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

      {/* Tech Choices */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Neden Bu Teknolojileri Seçiyoruz?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {techComparison.map((t) => (
              <div
                key={t.choice}
                style={{
                  display: "grid", gridTemplateColumns: "120px 120px 1fr", gap: "1rem",
                  alignItems: "center", padding: "1.25rem",
                  border: "1px solid #e0e0e0", borderRadius: 8,
                }}
              >
                <div>
                  <p style={{ fontWeight: 800, color: "#111111", margin: 0, fontSize: "0.95rem" }}>{t.choice}</p>
                  <p style={{ fontSize: "0.7rem", color: "#aaaaaa", margin: 0 }}>Seçimimiz</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#888888", margin: 0 }}>yerine {t.instead}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <CheckCircle size={15} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: "0.85rem", color: "#444444", margin: 0, lineHeight: 1.5 }}>{t.why}</p>
                </div>
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
            Proje Teklifi
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)", fontWeight: 800, color: "#111111", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            SaaS Projenizi Anlatalım
          </h2>
          <p style={{ color: "#666666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Fikrinizi ve hedeflerinizi paylaşın, 24 saat içinde teknik fizibilite ve fiyat teklifi gönderelim.
          </p>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "2.5rem" }}>
            <SaasLeadForm />
          </div>
        </div>
      </section>

      {/* Calendly Push */}
      <section style={{ padding: "3rem 1.5rem", backgroundColor: "#0d0d0d", textAlign: "center" }}>
        <p style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "1rem" }}>
          SaaS projeleri için önce 30 dakika konuşalım — form doldurmadan da randevu alabilirsiniz.
        </p>
        <Link
          href="/danismanlik"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: "1px solid #444", color: "#ffffff",
            padding: "0.75rem 1.5rem", borderRadius: 8,
            fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
          }}
        >
          Ücretsiz Danışmanlık Seansı <ArrowRight size={15} />
        </Link>
      </section>
    </>
  )
}
