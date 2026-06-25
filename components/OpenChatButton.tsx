"use client"

import { MessageSquare } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

// Sayfa içinden canlı sohbeti açan yeniden kullanılabilir CTA.
// LiveChat global "solman:open-chat" event'ini dinler.
// variant: "solid" (vurgulu buton) | "ghost" (ince satır link)
export default function OpenChatButton({
  label = "Sohbette hemen sorun",
  source = "inline",
  variant = "solid",
  className = "",
}: {
  label?: string
  source?: string
  variant?: "solid" | "ghost"
  className?: string
}) {
  const onClick = () => {
    trackEvent("chat_cta_click", "engagement", source)
    window.dispatchEvent(new Event("solman:open-chat"))
  }

  if (variant === "ghost") {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-accent-700 transition-colors hover:text-accent-800 ${className}`}
      >
        <MessageSquare size={15} />
        {label}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-accent-700 px-5 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-accent-800 ${className}`}
    >
      <MessageSquare size={17} />
      {label}
    </button>
  )
}
