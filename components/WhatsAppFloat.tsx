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
      onClick={() => trackEvent("whatsapp_click", "engagement", "float")}
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-[90px] right-6 z-[45] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-transform duration-150 hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)]"
    >
      <MessageCircle size={24} color="#ffffff" fill="#ffffff" />
    </a>
  )
}
