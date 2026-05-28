"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import * as Icons from "lucide-react"
import type { Service } from "@/lib/data/services"

type Props = {
  service: Service
  featured?: boolean
}

export default function ServiceCard({ service, featured = false }: Props) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[service.icon]

  return (
    <Link
      href={`/hizmetler/${service.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: 10,
        padding: "1.75rem",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"
        e.currentTarget.style.borderColor = "#9b1c1c"
        e.currentTarget.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.borderColor = "#e0e0e0"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      {/* Popüler Badge */}
      {service.tier === 1 && (
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            backgroundColor: "#9b1c1c",
            color: "#fff",
            fontSize: "0.6rem",
            fontWeight: 700,
            padding: "0.2rem 0.6rem",
            borderRadius: 3,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Popüler
        </span>
      )}

      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          backgroundColor: "#f0f0f0",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
        }}
      >
        {IconComponent && <IconComponent size={22} color="#333333" />}
      </div>

      {/* Category */}
      <span
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "#888888",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "0.375rem",
        }}
      >
        {service.category}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "#111111",
          marginBottom: "0.75rem",
          lineHeight: 1.3,
          paddingRight: service.tier === 1 ? "3rem" : 0,
          letterSpacing: "-0.01em",
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: "#6b6b6b",
          fontSize: "0.875rem",
          lineHeight: 1.65,
          marginBottom: "1.25rem",
          flex: 1,
        }}
      >
        {service.shortDesc}
      </p>

      {/* Tech Stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
        {service.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
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
            {tech}
          </span>
        ))}
        {service.techStack.length > 3 && (
          <span
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
            +{service.techStack.length - 3}
          </span>
        )}
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          color: "#9b1c1c",
          fontSize: "0.8rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        İncele <ArrowRight size={14} />
      </div>
    </Link>
  )
}
