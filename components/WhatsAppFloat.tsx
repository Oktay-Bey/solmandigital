"use client"

import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

export default function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("click", "whatsapp", "float")}
      aria-label="WhatsApp ile iletişime geç"
      style={{
        position: "fixed",
        bottom: 90,
        right: 24,
        width: 52,
        height: 52,
        borderRadius: "50%",
        backgroundColor: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
        zIndex: 45,
        transition: "transform 0.15s, box-shadow 0.15s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)"
        ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(37,211,102,0.5)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"
        ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(37,211,102,0.35)"
      }}
    >
      <MessageCircle size={24} color="#ffffff" fill="#ffffff" />
    </a>
  )
}
