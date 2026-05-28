import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Projeler — Tamamlanan Çalışmalar",
  description:
    "Next.js, AI ve otomasyon alanında geliştirilen projeler. E-ticaret, SaaS, haber platformu ve marketplace entegrasyonu örnekleri.",
  alternates: { canonical: `${siteConfig.url}/portfoy` },
  openGraph: { title: "Projeler | Solman Digital", locale: "tr_TR" },
}

const projects = [
  {
    title: "Trendyol Satıcı Paneli",
    category: "Marketplace Entegrasyonu",
    desc: "Trendyol ve Hepsiburada API entegrasyonlu, çok kanallı stok senkronizasyonu ve satış analitiği paneli. Recharts ile gerçek zamanlı veri görselleştirmesi.",
    tech: ["Next.js 14", "TypeScript", "Trendyol API", "Recharts", "Zustand"],
    status: "Özel Proje",
    url: null,
  },
  {
    title: "WordPress AI İçerik Otomasyonu",
    category: "AI & Otomasyon",
    desc: "GPT-4o ve Serper API ile SEO uyumlu içerik üreten, WordPress'e otomatik yayımlayan sistem. Kaynak doğrulama ve kalite filtresi dahil.",
    tech: ["Next.js 14", "GPT-4o", "Serper API", "WordPress REST API", "Prisma"],
    status: "Canlı",
    url: null,
  },
  {
    title: "E-Ticaret Platformu",
    category: "E-Ticaret",
    desc: "186 SSG ürün, İyzico ödeme entegrasyonu ve tam Türkçe e-ticaret altyapısı. JSON veri dosyaları ile statik üretim.",
    tech: ["Next.js 14", "İyzico", "TypeScript", "SSG"],
    status: "Canlı",
    url: null,
  },
  {
    title: "AI Haber Platformu",
    category: "İçerik Platformu",
    desc: "Supabase, OpenAI ve RSS pipeline ile çalışan otomatik haber üretim ve yayın sistemi. Google AdSense entegrasyonu.",
    tech: ["Next.js 14", "Supabase", "OpenAI", "RSS", "Vercel Cron"],
    status: "Canlı",
    url: null,
  },
  {
    title: "QR Menü SaaS",
    category: "SaaS",
    desc: "Çok kiracılı QR menü SaaS platformu. Prisma, NextAuth, QR kod üretimi ve PDF dışa aktarma. Restoranlar için dijital menü altyapısı.",
    tech: ["Next.js", "Prisma", "NextAuth", "QR Code", "PDF"],
    status: "Özel Proje",
    url: null,
  },
  {
    title: "Rüya Günlüğü SaaS",
    category: "SaaS",
    desc: "Supabase + Claude AI ile rüya analizi yapan SaaS uygulama. LemonSqueezy abonelik sistemi, magic link auth.",
    tech: ["Next.js 14", "Supabase", "Claude AI", "LemonSqueezy"],
    status: "Canlı",
    url: null,
  },
]

export default function PortfoyPage() {
  return (
    <>
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
            Tamamlanan Projeler
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
            Özel Yazılım Projeleri
          </h1>
          <p style={{ color: "#666666", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520 }}>
            Her biri sıfırdan inşa edildi — template değil. Gerçek iş ihtiyaçları, gerçek teknik kararlar.
          </p>
        </div>
      </section>

      {/* Projeler */}
      <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="services-grid">
            {projects.map((project) => (
              <div
                key={project.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 10,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Kırmızı Çizgi Detay */}
                <div style={{ height: 3, backgroundColor: "#9b1c1c" }} />

                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Kategori + Durum */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.875rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: "#888888",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: 4,
                        backgroundColor: project.status === "Canlı" ? "#f0fdf4" : "#f5f5f5",
                        color: project.status === "Canlı" ? "#16a34a" : "#888888",
                        border: project.status === "Canlı" ? "1px solid #bbf7d0" : "1px solid #e0e0e0",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#111111",
                      marginBottom: "0.75rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      color: "#6b6b6b",
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      marginBottom: "1.25rem",
                      flex: 1,
                    }}
                  >
                    {project.desc}
                  </p>

                  {/* Tech Stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          backgroundColor: "#f5f5f5",
                          color: "#555555",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                          padding: "0.2rem 0.6rem",
                          borderRadius: 4,
                          border: "1px solid #e8e8e8",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        color: "#9b1c1c",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Projeyi Gör <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span style={{ color: "#cccccc", fontSize: "0.75rem", fontWeight: 500 }}>NDA kapsamında</span>
                  )}
                </div>
              </div>
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
            Bir projeniz mi var?
          </h2>
          <p style={{ color: "#555555", marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Fikrinizi anlatın, teknik fizibilite ve tahmini süreyi konuşalım.
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
            Teklif Al <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
