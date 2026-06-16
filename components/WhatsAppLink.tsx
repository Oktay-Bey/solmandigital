"use client"

import { siteConfig } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

type Props = {
  /** Önceden doldurulmuş WhatsApp mesajı (boşsa düz wa.me linki) */
  message?: string
  /** GA4 event_label — hangi konumdan tıklandığını ayırır (örn. "home_hero", "fiyat_sticky") */
  source: string
  className?: string
  children: React.ReactNode
}

// İzlenen WhatsApp linki — tüm inline wa.me anchor'ları için tek kaynak.
// onClick → whatsapp_click (beacon transport ile sayfa değişse/yeni sekme açılsa bile ulaşır).
export default function WhatsAppLink({ message, source, className, children }: Props) {
  const num = siteConfig.whatsapp.replace(/\D/g, "")
  const href = message ? `https://wa.me/${num}?text=${encodeURIComponent(message)}` : `https://wa.me/${num}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", "engagement", source)}
      className={className}
    >
      {children}
    </a>
  )
}
