"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { inputStyle, labelStyle, submitButtonStyle, onFocus, onBlur } from "@/lib/form-utils"
import { trackEvent } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "phone" | "companyName" | "siteType" | "budget" | "timeline" | "existingSite" | "brief">

export default function WebSiteLeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    companyName: "",
    siteType: "",
    budget: "",
    timeline: "",
    existingSite: "",
    brief: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      const res = await fetch("/api/email/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, funnelType: "web-sitesi" }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "web-sitesi")
        router.push("/tesekkurler?type=web-sitesi")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }


  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="firstName" style={labelStyle}>Adınız *</label>
          <input
            id="firstName" name="firstName" type="text" required
            value={form.firstName} onChange={handleChange}
            placeholder="Ahmet" style={inputStyle} onFocus={onFocus} onBlur={onBlur}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>E-posta *</label>
          <input
            id="email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="ahmet@firma.com" style={inputStyle} onFocus={onFocus} onBlur={onBlur}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="phone" style={labelStyle}>Telefon / WhatsApp</label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="+90 5xx xxx xx xx" style={inputStyle} onFocus={onFocus} onBlur={onBlur}
          />
        </div>
        <div>
          <label htmlFor="companyName" style={labelStyle}>Firma / Marka Adı</label>
          <input
            id="companyName" name="companyName" type="text"
            value={form.companyName} onChange={handleChange}
            placeholder="Firma Adı" style={inputStyle} onFocus={onFocus} onBlur={onBlur}
          />
        </div>
      </div>

      <div>
        <label htmlFor="siteType" style={labelStyle}>Ne tür site istiyorsunuz? *</label>
        <select
          id="siteType" name="siteType" required
          value={form.siteType} onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
        >
          <option value="">Seçin</option>
          <option value="Kurumsal tanıtım sitesi">Kurumsal tanıtım sitesi</option>
          <option value="E-ticaret mağazası">E-ticaret mağazası</option>
          <option value="Landing page">Landing page</option>
          <option value="Blog / içerik sitesi">Blog / içerik sitesi</option>
          <option value="Portföy sitesi">Portföy sitesi</option>
          <option value="Henüz karar vermedim">Henüz karar vermedim</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="budget" style={labelStyle}>Tahmini bütçeniz? *</label>
          <select
            id="budget" name="budget" required
            value={form.budget} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="₺8.000–₺20.000">₺8.000–₺20.000</option>
            <option value="₺20.000–₺50.000">₺20.000–₺50.000</option>
            <option value="₺50.000–₺100.000">₺50.000–₺100.000</option>
            <option value="₺100.000+">₺100.000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" style={labelStyle}>Ne zaman başlamak istiyorsunuz? *</label>
          <select
            id="timeline" name="timeline" required
            value={form.timeline} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="Bu ay">Bu ay</option>
            <option value="1-3 ay içinde">1-3 ay içinde</option>
            <option value="3-6 ay içinde">3-6 ay içinde</option>
            <option value="Henüz karar vermedim">Henüz karar vermedim</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="existingSite" style={labelStyle}>Mevcut web siteniz var mı?</label>
        <input
          id="existingSite" name="existingSite" type="text"
          value={form.existingSite} onChange={handleChange}
          placeholder="https://mevcutsite.com (yoksa boş bırakın)"
          style={inputStyle} onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      <div>
        <label htmlFor="brief" style={labelStyle}>Projeniz hakkında kısaca anlatın</label>
        <textarea
          id="brief" name="brief"
          rows={3}
          value={form.brief} onChange={handleChange}
          placeholder="Ör: Muhasebe firması için kurumsal site, 10 sayfa, Türkçe + İngilizce…"
          style={{ ...inputStyle, resize: "vertical", minHeight: 90 }}
          onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      {state === "error" && (
        <div style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          padding: "0.875rem 1rem",
          backgroundColor: "#fff5f5", border: "1px solid #fecaca",
          borderRadius: 7, color: "#9b1c1c", fontSize: "0.875rem",
        }}>
          <AlertCircle size={16} />
          Gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        style={submitButtonStyle(state === "sending")}
      >
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz Fiyat Teklifi Al"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
