"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { SubscribePayload } from "@/lib/types/leads"
import { trackEvent } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

export default function DownloadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ firstName: "", email: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")

    const payload: SubscribePayload = {
      email: form.email,
      firstName: form.firstName,
      source: "download",
    }

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        trackEvent("form_submit", "lead", "download")
        router.push("/tesekkurler?type=newsletter")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #e0e0e0",
    borderRadius: 7,
    fontSize: "0.9rem",
    color: "#111111",
    backgroundColor: "#ffffff",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.775rem",
    fontWeight: 700,
    color: "#444444",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <label htmlFor="firstName" style={labelStyle}>Adınız *</label>
        <input
          id="firstName" name="firstName" type="text" required
          value={form.firstName} onChange={handleChange}
          placeholder="Ahmet"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>E-posta Adresiniz *</label>
        <input
          id="email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="ahmet@firma.com"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      {state === "error" && (
        <div
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.875rem 1rem",
            backgroundColor: "#fff5f5", border: "1px solid #fecaca",
            borderRadius: 7, color: "#9b1c1c", fontSize: "0.875rem",
          }}
        >
          <AlertCircle size={16} />
          Gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          backgroundColor: state === "sending" ? "#c0392b" : "#9b1c1c",
          color: "#ffffff",
          padding: "0.875rem 1.5rem",
          borderRadius: 7, fontWeight: 700, fontSize: "0.875rem",
          border: "none", cursor: state === "sending" ? "not-allowed" : "pointer",
          transition: "background-color 0.15s",
          letterSpacing: "0.02em",
        }}
      >
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz İndir"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Rehber e-posta adresinize gönderilir. Spam değil, yalnızca değerli içerik.
      </p>
    </form>
  )
}
