"use client"

import { siteConfig } from "@/lib/site-config"

export default function CalendlyEmbed() {
  return (
    <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid #e0e0e0" }}>
      <iframe
        src={siteConfig.calendlyUrl}
        width="100%"
        height="700"
        frameBorder="0"
        title="Danışmanlık Rezervasyonu — Solman Digital"
        style={{ display: "block" }}
      />
    </div>
  )
}
