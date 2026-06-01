import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { rehberPosts } from "@/lib/data/rehber"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `Yazılım & Dijital Rehberler | ${siteConfig.name}`,
  description:
    "Trendyol entegrasyonu, AI otomasyon, SaaS geliştirme ve web sitesi fiyatları hakkında gerçek proje deneyimiyle hazırlanmış rehberler.",
  alternates: { canonical: `${siteConfig.url}/rehber` },
}

export default function RehberPage() {
  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff", minHeight: "60vh" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
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
          Rehberler
        </p>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "#111111",
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
        >
          Yazılım & Dijital Rehberler
        </h1>
        <p style={{ color: "#6b6b6b", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "3.5rem", maxWidth: 560 }}>
          Trendyol entegrasyonu, AI otomasyon, SaaS MVP süreci ve web sitesi fiyatları hakkında gerçek proje deneyimiyle hazırlanmış kaynaklar.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {rehberPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/rehber/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 10,
                  padding: "1.75rem 2rem",
                  backgroundColor: "#ffffff",
                  transition: "border-color 0.15s",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#111111",
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                    {post.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Clock size={12} color="#aaaaaa" />
                    <span style={{ color: "#aaaaaa", fontSize: "0.75rem" }}>{post.readTime} dakika okuma</span>
                  </div>
                </div>
                <ArrowRight size={18} color="#9b1c1c" style={{ flexShrink: 0 }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
