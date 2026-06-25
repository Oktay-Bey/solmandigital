"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("solman_cta_bar_closed") === "1"
  )

  useEffect(() => {
    if (dismissed) return

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

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-dark-50 bg-dark-400 px-6 py-3 animate-[slideUp_0.3s_ease]">
      <p className="m-0 shrink-0 whitespace-nowrap text-[0.8rem] text-ondark-muted">
        Projenizi değerlendirelim:
      </p>

      <div className="flex flex-wrap items-center gap-2.5">
        <a
          href="/iletisim"
          onClick={() => trackEvent("cta_click", "engagement", "sticky_iletisim")}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-md border border-dark-50 bg-dark-300 px-4 py-2 text-[0.8rem] font-bold text-ondark transition-colors hover:bg-dark-200"
        >
          İletişim
        </a>

        <a
          href="/ucretsiz-analiz"
          onClick={() => trackEvent("cta_click", "engagement", "sticky_teklif")}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-accent-700 px-4 py-2 text-[0.8rem] font-bold text-white transition-colors hover:bg-accent-800"
        >
          Ücretsiz Analiz
          <ArrowRight size={13} />
        </a>
      </div>

      <button
        onClick={dismiss}
        aria-label="Kapat"
        className="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-1 text-ink-500 transition-colors hover:text-ondark"
      >
        <X size={16} />
      </button>
    </div>
  )
}
