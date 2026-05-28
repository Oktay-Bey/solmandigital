"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import type { SubscribePayload } from "@/lib/types/leads"

type FormState = "idle" | "sending" | "success" | "error"

type Props = {
  variant: "light" | "dark"
  source: SubscribePayload["source"]
  heading?: string
  subtext?: string
}

export default function NewsletterForm({ variant, source, heading, subtext }: Props) {
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ firstName: "", email: "" })

  const isDark = variant === "dark"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")

    const payload: SubscribePayload = {
      email: form.email,
      firstName: form.firstName || "Değerli Kullanıcı",
      source,
    }

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      setState(res.ok ? "success" : "error")
      if (res.ok) setForm({ firstName: "", email: "" })
    } catch {
      setState("error")
    }
  }

  const inputBase: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    padding: "0.75rem 1rem",
    borderRadius: 7,
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
  }

  const lightInput: React.CSSProperties = {
    ...inputBase,
    border: "1px solid #e0e0e0",
    color: "#111111",
    backgroundColor: "#ffffff",
  }

  const darkInput: React.CSSProperties = {
    ...inputBase,
    border: "1px solid #2a2a2a",
    color: "#e8e8e8",
    backgroundColor: "#1a1a1a",
  }

  if (state === "success") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <CheckCircle2 size={18} color="#16a34a" />
        <p style={{ color: isDark ? "#888888" : "#444444", fontSize: "0.875rem", fontWeight: 600 }}>
          Teşekkürler! Rehber e-postanıza gönderildi.
        </p>
      </div>
    )
  }

  return (
    <div>
      {heading && (
        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: isDark ? "#e8e8e8" : "#111111", marginBottom: "0.375rem", letterSpacing: "-0.01em" }}>
          {heading}
        </h3>
      )}
      {subtext && (
        <p style={{ color: isDark ? "#666666" : "#6b6b6b", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
          {subtext}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
        <input
          name="firstName"
          type="text"
          placeholder="Adınız"
          value={form.firstName}
          onChange={handleChange}
          style={isDark ? darkInput : lightInput}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = isDark ? "#2a2a2a" : "#e0e0e0")}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="E-posta adresiniz *"
          value={form.email}
          onChange={handleChange}
          style={isDark ? darkInput : lightInput}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = isDark ? "#2a2a2a" : "#e0e0e0")}
        />
        <button
          type="submit"
          disabled={state === "sending"}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            backgroundColor: "#9b1c1c", color: "#ffffff",
            padding: "0.75rem 1.25rem", borderRadius: 7,
            fontWeight: 700, fontSize: "0.875rem",
            border: "none", cursor: state === "sending" ? "not-allowed" : "pointer",
            whiteSpace: "nowrap", flexShrink: 0,
          }}
        >
          {state === "sending" ? "Gönderiliyor…" : "İndir"}
          {state !== "sending" && <ArrowRight size={14} />}
        </button>
      </form>
      {state === "error" && (
        <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#9b1c1c", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          <AlertCircle size={13} /> Hata oluştu, tekrar deneyin.
        </p>
      )}
    </div>
  )
}
