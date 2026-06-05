"use client"

import { useState, useEffect } from "react"
import { X, MessageCircle, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("solman_cta_bar_closed") === "1") {
      setDismissed(true)
      return
    }

    const handleScroll = () => {
      const threshold = document.body.scrollHeight * 0.45
      if (window.scrollY > threshold) setVisible(true)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    sessionStorage.setItem("solman_cta_bar_closed", "1")
  }

  if (dismissed || !visible) return null

  const waHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=Merhaba%2C%20projem%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum.`

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: "#111111",
        borderTop: "1px solid #222222",
        padding: "0.75rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <p
        style={{
          color: "#aaaaaa",
          fontSize: "0.8rem",
          margin: 0,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Projenizi değerlendirelim:
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("click", "whatsapp", "sticky_cta")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            backgroundColor: "#25D366",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: "0.8rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>

        <a
          href="/ucretsiz-analiz"
          onClick={() => trackEvent("click", "cta", "sticky_teklif")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            backgroundColor: "#9b1c1c",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            borderRadius: 6,
            fontWeight: 700,
            fontSize: "0.8rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Ücretsiz Analiz
          <ArrowRight size={13} />
        </a>
      </div>

      <button
        onClick={dismiss}
        aria-label="Kapat"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.25rem",
          color: "#666666",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <X size={16} />
      </button>
    </div>
  )
}
