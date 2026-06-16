"use client"

import { useState, useEffect, useRef } from "react"
import { X, ArrowRight, MessageCircle, AlertCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { trackEvent, trackLeadConversion } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

const COOKIE_KEY = "solman_exit_v1"
const COOKIE_DAYS = 7

function setCookie(name: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=1; expires=${expires}; path=/`
}

function hasCookie(name: string) {
  return document.cookie.includes(`${name}=`)
}

type FormState = "idle" | "sending" | "success" | "error"

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [state, setFormState] = useState<FormState>("idle")
  const [form, setForm] = useState({ firstName: "", email: "" })
  const prevScrollY = useRef(0)
  const triggered = useRef(false)

  const show = () => {
    if (triggered.current) return
    triggered.current = true
    setCookie(COOKIE_KEY, COOKIE_DAYS)
    trackEvent("popup_show", "exit_intent", "exit_popup")
    setVisible(true)
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    if (hasCookie(COOKIE_KEY)) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5) show()
    }

    const handleScroll = () => {
      const currentY = window.scrollY
      if (prevScrollY.current - currentY > 120 && currentY > 300) show()
      prevScrollY.current = currentY
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const close = () => setVisible(false)

  const markStart = useFunnelTracking("exit-popup")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    markStart()
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")
    try {
      const res = await fetch("/api/email/popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "exit-popup")
        trackLeadConversion("exit-popup")
        setFormState("success")
      } else {
        setFormState("error")
      }
    } catch {
      setFormState("error")
    }
  }

  if (!visible) return null

  const waHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=Merhaba%2C%20%C3%BCcretsiz%20analiz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
    >
      <div className="relative w-full max-w-[440px] rounded-xl border border-dark-50 bg-dark-400 p-8 animate-[slideUp_0.25s_ease]">
        <button
          onClick={close}
          aria-label="Kapat"
          className="absolute right-4 top-4 flex cursor-pointer items-center border-none bg-transparent p-1 text-ink-500 transition-colors hover:text-ondark"
        >
          <X size={18} />
        </button>

        {state === "success" ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-950">
              <ArrowRight size={22} color="#4ade80" />
            </div>
            <h3 className="mb-2 text-[1.1rem] font-extrabold text-white">
              Talebiniz Alındı!
            </h3>
            <p className="text-[0.875rem] text-ondark-muted">
              24 saat içinde analiz sonuçlarınızı e-posta ile ileteceğiz.
            </p>
            <button
              onClick={close}
              className="mt-5 cursor-pointer border-none bg-transparent text-[0.8rem] font-semibold text-accent-500"
            >
              Kapat
            </button>
          </div>
        ) : (
          <>
            <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-wider text-accent-500">
              Gitmeden önce...
            </p>
            <h2 className="mb-2 text-[1.3rem] font-extrabold leading-tight tracking-tight text-white">
              Sitenizin ücretsiz teknik analizini isteyin
            </h2>
            <p className="mb-6 text-[0.875rem] leading-relaxed text-ondark-muted">
              Hız, SEO ve dönüşüm sorunlarını 24 saat içinde raporluyoruz.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                placeholder="Adınız"
                className="input input-dark"
              />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
                className="input input-dark"
              />

              {state === "error" && (
                <div className="flex items-center gap-2 text-[0.8rem] text-red-400">
                  <AlertCircle size={14} />
                  Bir hata oluştu, tekrar deneyin.
                </div>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state === "sending" ? "Gönderiliyor…" : "Ücretsiz Analiz İste"}
                {state !== "sending" && <ArrowRight size={15} />}
              </button>
            </form>

            <div className="mt-4 text-center">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "engagement", "exit_popup")}
                className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-green-400"
              >
                <MessageCircle size={14} />
                Veya WhatsApp&apos;tan yazın
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
