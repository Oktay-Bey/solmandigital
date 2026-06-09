import { ImageResponse } from "next/og"
import { getServiceBySlug } from "@/lib/data/services"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ slug: string }> }

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  const title = service?.title ?? "Hizmet"
  const category = service?.category ?? "Yazılım Geliştirme"
  const tags = service?.techStack?.slice(0, 3) ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 52,
              height: 52,
              backgroundColor: "#6366f1",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
            Solman<span style={{ color: "#818cf8" }}>Digital</span>
          </span>
        </div>

        {/* Kategori etiketi */}
        <div
          style={{
            backgroundColor: "rgba(99,102,241,0.2)",
            border: "1px solid rgba(99,102,241,0.4)",
            color: "#c7d2fe",
            padding: "6px 16px",
            borderRadius: 100,
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          {category}
        </div>

        {/* Servis başlığı */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: 32,
            letterSpacing: "-1px",
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Alt bilgi */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 18, color: "#94a3b8", fontWeight: 500 }}>
            İstanbul Yazılım Ofisi
          </span>
          {tags.length > 0 && (
            <>
              <span style={{ color: "#475569", fontSize: 18 }}>·</span>
              <div style={{ display: "flex", gap: 10 }}>
                {tags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      backgroundColor: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.25)",
                      color: "#a5b4fc",
                      padding: "5px 14px",
                      borderRadius: 100,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
