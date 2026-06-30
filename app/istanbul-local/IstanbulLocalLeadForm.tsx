"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { inputStyle, labelStyle, submitButtonStyle, onFocus, onBlur } from "@/lib/form-utils"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<
  LeadPayload,
  "firstName" | "email" | "phone" | "projectType" | "companyType" | "budget" | "prefersMeeting" | "projectBrief"
>

type Props = {
  district: string | null
}

export default function IstanbulLocalLeadForm({ district }: Props) {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    projectType: "",
    companyType: "",
    budget: "",
    prefersMeeting: "",
    projectBrief: "",
  })

  const { markStart, formRef } = useFunnelTracking("istanbul-local")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    markStart()
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      const res = await fetch("/api/email/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, funnelType: "istanbul-local", district: district ?? "İstanbul", gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "istanbul-local")
        trackLeadConversion("istanbul-local")
        router.push("/tesekkurler?type=istanbul-local")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  const meetingOptions = district
    ? ["Zoom", `Yüz yüze ${district}`, "Farketmez"]
    : ["Zoom", "Yüz yüze İstanbul", "Farketmez"]

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
        <label htmlFor="phone" style={labelStyle}>Telefon / WhatsApp (hızlı iletişim için)</label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          placeholder="+90 5xx xxx xx xx" style={inputStyle} onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="projectType" style={labelStyle}>Ne tür proje? *</label>
          <select
            id="projectType" name="projectType" required
            value={form.projectType} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="Web sitesi">Web sitesi</option>
            <option value="E-ticaret">E-ticaret</option>
            <option value="SaaS uygulama">SaaS uygulama</option>
            <option value="AI entegrasyonu">AI entegrasyonu</option>
            <option value="Mevcut proje geliştirme">Mevcut proje geliştirme</option>
            <option value="Henüz karar vermedim">Henüz karar vermedim</option>
          </select>
        </div>
        <div>
          <label htmlFor="companyType" style={labelStyle}>Siz kimsiniz? *</label>
          <select
            id="companyType" name="companyType" required
            value={form.companyType} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="Bireysel girişimci">Bireysel girişimci</option>
            <option value="KOBİ (2-50 kişi)">KOBİ (2-50 kişi)</option>
            <option value="Orta ölçekli şirket">Orta ölçekli şirket</option>
            <option value="Büyük firma">Büyük firma</option>
            <option value="Startup (yatırım sürecinde)">Startup (yatırım sürecinde)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" style={labelStyle}>Proje bütçesi? *</label>
        <select
          id="budget" name="budget" required
          value={form.budget} onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
        >
          <option value="">Seçin</option>
          <option value="₺10.000'in altı">₺10.000&apos;in altı</option>
          <option value="₺10.000–₺30.000">₺10.000–₺30.000</option>
          <option value="₺30.000–₺80.000">₺30.000–₺80.000</option>
          <option value="₺80.000+">₺80.000+</option>
        </select>
      </div>

      <div>
        <p style={labelStyle}>Nasıl görüşmek istersiniz?</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {meetingOptions.map((opt) => (
            <label
              key={opt}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                cursor: "pointer", fontSize: "0.875rem", color: "#444444",
                padding: "0.45rem 1rem",
                border: form.prefersMeeting === opt ? "1px solid #9b1c1c" : "1px solid #e0e0e0",
                borderRadius: 6,
                backgroundColor: form.prefersMeeting === opt ? "#fff5f5" : "#ffffff",
              }}
            >
              <input
                type="radio" name="prefersMeeting" value={opt}
                checked={form.prefersMeeting === opt}
                onChange={handleChange}
                style={{ accentColor: "#9b1c1c" }}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="projectBrief" style={labelStyle}>Projeyi kısaca anlatın</label>
        <textarea
          id="projectBrief" name="projectBrief"
          rows={3}
          value={form.projectBrief} onChange={handleChange}
          placeholder={`Ör: ${district ?? "İstanbul"}'daki işletmemiz için web sitesi veya yazılım çözümü…`}
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
        {state === "sending" ? "Gönderiliyor…" : "Mesaj Gönder"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
