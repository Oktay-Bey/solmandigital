"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { services } from "@/lib/data/services"
import type { AuditPayload } from "@/lib/types/leads"
import { trackEvent } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

export default function AuditForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState<AuditPayload>({
    firstName: "",
    email: "",
    websiteUrl: "",
    serviceInterest: "",
    currentProblem: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")

    try {
      const res = await fetch("/api/email/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        trackEvent("form_submit", "lead", "audit")
        router.push("/tesekkurler?type=audit")
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
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
          <label htmlFor="email" style={labelStyle}>E-posta *</label>
          <input
            id="email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="ahmet@firma.com"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="websiteUrl" style={labelStyle}>Web Sitenizin Adresi *</label>
        <input
          id="websiteUrl" name="websiteUrl" type="url" required
          value={form.websiteUrl} onChange={handleChange}
          placeholder="https://firmaniz.com"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div>
        <label htmlFor="serviceInterest" style={labelStyle}>İlgilendiğiniz Hizmet</label>
        <select
          id="serviceInterest" name="serviceInterest"
          value={form.serviceInterest} onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        >
          <option value="">Hizmet seçin (opsiyonel)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="currentProblem" style={labelStyle}>Mevcut Sorunuz Nedir?</label>
        <textarea
          id="currentProblem" name="currentProblem"
          rows={4}
          value={form.currentProblem} onChange={handleChange}
          placeholder="Sitenizle ilgili yaşadığınız sorunu veya iyileştirmek istediğiniz alanı kısaca anlatın…"
          style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
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
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz Analiz İste"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
