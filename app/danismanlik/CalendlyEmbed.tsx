"use client"

import { siteConfig } from "@/lib/site-config"

export default function CalendlyEmbed() {
  return (
    <div className="w-full overflow-hidden rounded-[12px] border border-ink-200">
      <iframe
        src={siteConfig.calendlyUrl}
        width="100%"
        height="700"
        frameBorder="0"
        title="Danışmanlık Rezervasyonu — Solman Digital"
        className="block"
      />
    </div>
  )
}
