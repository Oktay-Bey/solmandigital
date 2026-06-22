"use client"

import { siteConfig } from "@/lib/site-config"
import { trackPhoneCall } from "@/lib/analytics"

type Props = {
  /** GA4 event_label — hangi konumdan arandığını ayırır (örn. "footer", "iletisim_kart") */
  source: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

// İzlenen aranabilir telefon linki — tüm tel: anchor'ları için tek kaynak.
// onClick → phone_call (beacon transport ile arama uygulamasına geçilse bile GA4'e ulaşır).
// Numara siteConfig.whatsapp (aynı hat) → display siteConfig.whatsappDisplay.
export default function PhoneLink({ source, className, style, children }: Props) {
  const num = siteConfig.whatsapp.replace(/[^\d+]/g, "")
  return (
    <a
      href={`tel:${num}`}
      onClick={() => trackPhoneCall(source)}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}
