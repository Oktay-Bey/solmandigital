"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { services } from "@/lib/data/services"

type FormState = "idle" | "sending" | "success" | "error"

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({
    isim: "",
    email: "",
    hizmet: "",
    mesaj: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")

    try {
      const res = await fetch("/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setState("success")
        setForm({ isim: "", email: "", hizmet: "", mesaj: "" })
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

  if (state === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
          textAlign: "center",
          border: "1px solid #e0e0e0",
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <CheckCircle2 size={24} color="#16a34a" />
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111111", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Mesajınız İletildi!
        </h3>
        <p style={{ color: "#6b6b6b", fontSize: "0.875rem" }}>
          24 saat içinde size dönüş yapacağız.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label htmlFor="isim" style={labelStyle}>Adınız Soyadınız</label>
        <input
          id="isim"
          name="isim"
          type="text"
          required
          value={form.isim}
          onChange={handleChange}
          placeholder="Ahmet Yılmaz"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>E-posta Adresiniz</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="ahmet@firma.com"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div>
        <label htmlFor="hizmet" style={labelStyle}>İlgilendiğiniz Hizmet</label>
        <select
          id="hizmet"
          name="hizmet"
          required
          value={form.hizmet}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        >
          <option value="">Hizmet seçin…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Diğer">Diğer / Emin değilim</option>
        </select>
      </div>

      <div>
        <label htmlFor="mesaj" style={labelStyle}>Projenizi Anlatın</label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          rows={5}
          value={form.mesaj}
          onChange={handleChange}
          placeholder="Projenizden kısaca bahsedin: ne yapmak istiyorsunuz, varsa teknik detaylar, tahmini süre beklentiniz..."
          style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          onFocus={(e) => (e.target.style.borderColor = "#9b1c1c")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      {state === "error" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.875rem 1rem",
            backgroundColor: "#fff5f5",
            border: "1px solid #fecaca",
            borderRadius: 7,
            color: "#9b1c1c",
            fontSize: "0.875rem",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          backgroundColor: state === "sending" ? "#c0392b" : "#9b1c1c",
          color: "#ffffff",
          padding: "0.875rem 1.5rem",
          borderRadius: 7,
          fontWeight: 700,
          fontSize: "0.875rem",
          border: "none",
          cursor: state === "sending" ? "not-allowed" : "pointer",
          transition: "background-color 0.15s",
          letterSpacing: "0.02em",
        }}
      >
        {state === "sending" ? "Gönderiliyor…" : "Teklif İste"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
