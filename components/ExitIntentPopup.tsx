"use client"

import { useState, useEffect, useRef } from "react"
import { X, ArrowRight, MessageCircle, AlertCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#111111",
          border: "1px solid #222222",
          borderRadius: 12,
          padding: "2rem",
          width: "100%",
          maxWidth: 440,
          position: "relative",
        }}
      >
        <button
          onClick={close}
          aria-label="Kapat"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#666666",
            padding: "0.25rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={18} />
        </button>

        {state === "success" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#052e16",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <ArrowRight size={22} color="#4ade80" />
            </div>
            <h3 style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              Talebiniz Alındı!
            </h3>
            <p style={{ color: "#aaaaaa", fontSize: "0.875rem" }}>
              24 saat içinde analiz sonuçlarınızı e-posta ile ileteceğiz.
            </p>
            <button
              onClick={close}
              style={{
                marginTop: "1.25rem",
                color: "#9b1c1c",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              Kapat
            </button>
          </div>
        ) : (
          <>
            <p style={{ color: "#9b1c1c", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Gitmeden önce...
            </p>
            <h2 style={{ color: "#ffffff", fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
              Sitenizin ücretsiz teknik analizini isteyin
            </h2>
            <p style={{ color: "#888888", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Hız, SEO ve dönüşüm sorunlarını 24 saat içinde raporluyoruz.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                placeholder="Adınız"
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: 7,
                  border: "1px solid #333333",
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: 7,
                  border: "1px solid #333333",
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />

              {state === "error" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171", fontSize: "0.8rem" }}>
                  <AlertCircle size={14} />
                  Bir hata oluştu, tekrar deneyin.
                </div>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                style={{
                  backgroundColor: "#9b1c1c",
                  color: "#ffffff",
                  padding: "0.875rem",
                  borderRadius: 7,
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: state === "sending" ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {state === "sending" ? "Gönderiliyor…" : "Ücretsiz Analiz İste"}
                {state !== "sending" && <ArrowRight size={15} />}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click", "whatsapp", "exit_popup")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  color: "#4ade80",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
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
