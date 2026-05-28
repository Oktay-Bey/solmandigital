import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Solman Digital — Web, AI & Otomasyon Çözümleri"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
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

        {/* Başlık */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            marginBottom: 24,
            letterSpacing: "-1px",
          }}
        >
          Web, AI ve
          <br />
          <span style={{ color: "#818cf8" }}>Otomasyon</span> Çözümleri
        </div>

        {/* Açıklama */}
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginBottom: 48,
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          Customized Software Expert · Web, AI & Otomasyon
        </div>

        {/* Badge'ler */}
        <div style={{ display: "flex", gap: 12 }}>
          {["E-Ticaret", "AI Otomasyon", "SaaS", "Trendyol API", "Next.js 16"].map((tag) => (
            <div
              key={tag}
              style={{
                backgroundColor: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: "#c7d2fe",
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
