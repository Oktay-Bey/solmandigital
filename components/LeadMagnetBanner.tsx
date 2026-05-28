import Link from "next/link"
import { ArrowRight, Download, Search, Calendar } from "lucide-react"
import type { LeadMagnet } from "@/lib/data/leadMagnets"

const variantConfig = {
  download: {
    icon: Download,
    bg: "#f0fdf4",
    border: "#bbf7d0",
    iconColor: "#16a34a",
    labelColor: "#15803d",
    label: "Ücretsiz Rehber",
  },
  audit: {
    icon: Search,
    bg: "#fff8f0",
    border: "#fde8cc",
    iconColor: "#ea580c",
    labelColor: "#c2410c",
    label: "Ücretsiz Analiz",
  },
  consultation: {
    icon: Calendar,
    bg: "#f0f5ff",
    border: "#c7d2fe",
    iconColor: "#4f46e5",
    labelColor: "#3730a3",
    label: "Ücretsiz Danışmanlık",
  },
}

export default function LeadMagnetBanner({ title, description, ctaText, ctaHref, variant }: LeadMagnet) {
  const cfg = variantConfig[variant]
  const IconComponent = cfg.icon

  return (
    <div
      style={{
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 10,
        padding: "1.5rem 1.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        flexWrap: "wrap",
        margin: "2.5rem 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
        <div
          style={{
            width: 40, height: 40,
            backgroundColor: "rgba(255,255,255,0.8)",
            border: `1px solid ${cfg.border}`,
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconComponent size={18} color={cfg.iconColor} />
        </div>
        <div>
          <p
            style={{
              fontSize: "0.65rem", fontWeight: 700, color: cfg.labelColor,
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem",
            }}
          >
            {cfg.label}
          </p>
          <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111111", marginBottom: "0.25rem" }}>
            {title}
          </p>
          <p style={{ fontSize: "0.8rem", color: "#6b6b6b", lineHeight: 1.55 }}>
            {description}
          </p>
        </div>
      </div>
      <Link
        href={ctaHref}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          backgroundColor: "#9b1c1c", color: "#ffffff",
          padding: "0.75rem 1.25rem", borderRadius: 7,
          fontWeight: 700, fontSize: "0.8rem",
          textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
        }}
      >
        {ctaText} <ArrowRight size={14} />
      </Link>
    </div>
  )
}
