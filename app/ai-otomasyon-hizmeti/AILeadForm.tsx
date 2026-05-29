"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { inputStyle, labelStyle, submitButtonStyle, onFocus, onBlur } from "@/lib/form-utils"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "aiUseCase" | "currentVolume" | "companySize" | "timeline" | "budget" | "painPoint">

export default function AILeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    aiUseCase: "",
    currentVolume: "",
    companySize: "",
    timeline: "",
    budget: "",
    painPoint: "",
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
        body: JSON.stringify({ ...form, funnelType: "ai" }),
      })
      if (res.ok) {
        router.push("/tesekkurler?type=ai")
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

      <div>
        <label htmlFor="aiUseCase" style={labelStyle}>Hangi alanda AI kullanmak istiyorsunuz? *</label>
        <select
          id="aiUseCase" name="aiUseCase" required
          value={form.aiUseCase} onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
        >
          <option value="">Seçin</option>
          <option value="İçerik / blog yazımı">İçerik / blog yazımı</option>
          <option value="Ürün açıklamaları">Ürün açıklamaları</option>
          <option value="Müşteri hizmetleri chatbotu">Müşteri hizmetleri chatbotu</option>
          <option value="Video / sosyal medya içeriği">Video / sosyal medya içeriği</option>
          <option value="İş süreçleri / veri işleme">İş süreçleri / veri işleme</option>
          <option value="Emin değilim, konuşalım">Emin değilim, konuşalım</option>
        </select>
      </div>

      <div>
        <label htmlFor="currentVolume" style={labelStyle}>Şu an bu işi ne kadar sıklıkla yapıyorsunuz? *</label>
        <input
          id="currentVolume" name="currentVolume" type="text" required
          value={form.currentVolume} onChange={handleChange}
          placeholder="ör: haftada 50 ürün açıklaması, ayda 8 blog yazısı"
          style={inputStyle} onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="companySize" style={labelStyle}>Şirket büyüklüğü? *</label>
          <select
            id="companySize" name="companySize" required
            value={form.companySize} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="1-5 kişi (solopreneur)">1-5 kişi (solopreneur)</option>
            <option value="6-25 kişi">6-25 kişi</option>
            <option value="26-100 kişi">26-100 kişi</option>
            <option value="100+ kişi">100+ kişi</option>
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
            <option value="Hemen">Hemen</option>
            <option value="1 ay içinde">1 ay içinde</option>
            <option value="Araştırma aşamasındayım">Araştırma aşamasındayım</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" style={labelStyle}>Bütçe aralığı</label>
        <select
          id="budget" name="budget"
          value={form.budget} onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
        >
          <option value="">Belirtmek istemiyorum</option>
          <option value="₺15.000–₺40.000">₺15.000–₺40.000</option>
          <option value="₺40.000–₺100.000">₺40.000–₺100.000</option>
          <option value="₺100.000+">₺100.000+</option>
          <option value="Konuşmaya açığım">Konuşmaya açığım</option>
        </select>
      </div>

      <div>
        <label htmlFor="painPoint" style={labelStyle}>En çok zaman harcadığınız tekrar eden iş nedir?</label>
        <textarea
          id="painPoint" name="painPoint"
          rows={3}
          value={form.painPoint} onChange={handleChange}
          placeholder="Ör: her gün yüzlerce ürün açıklaması yazmak zorundayım…"
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
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz AI Analizi İste"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
