"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { inputStyle, labelStyle, submitButtonStyle, onFocus, onBlur } from "@/lib/form-utils"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "companyName" | "productIdea" | "targetUser" | "fundingStage" | "budget" | "timeline" | "existingTech">

export default function SaasLeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    companyName: "",
    productIdea: "",
    targetUser: "",
    fundingStage: "",
    budget: "",
    timeline: "",
    existingTech: "",
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
        body: JSON.stringify({ ...form, funnelType: "saas" }),
      })
      if (res.ok) {
        router.push("/tesekkurler?type=saas")
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
        <label htmlFor="companyName" style={labelStyle}>Şirket / Startup Adı</label>
        <input
          id="companyName" name="companyName" type="text"
          value={form.companyName} onChange={handleChange}
          placeholder="Firma adı (opsiyonel)" style={inputStyle} onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      <div>
        <label htmlFor="productIdea" style={labelStyle}>SaaS ürün fikrinizi kısaca anlatın *</label>
        <textarea
          id="productIdea" name="productIdea" required
          rows={4}
          value={form.productIdea} onChange={handleChange}
          placeholder="Ör: KOBİler için muhasebe + fatura SaaS'ı, abonelik modeliyle…"
          style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
          onFocus={onFocus} onBlur={onBlur}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="targetUser" style={labelStyle}>Hedef kullanıcı kitlesi? *</label>
          <select
            id="targetUser" name="targetUser" required
            value={form.targetUser} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="B2B (işletmeler)">B2B (işletmeler)</option>
            <option value="B2C (bireyler)">B2C (bireyler)</option>
            <option value="Her ikisi">Her ikisi</option>
            <option value="Henüz karar vermedim">Henüz karar vermedim</option>
          </select>
        </div>
        <div>
          <label htmlFor="fundingStage" style={labelStyle}>Finansman durumu? *</label>
          <select
            id="fundingStage" name="fundingStage" required
            value={form.fundingStage} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="Kendi kaynağımla">Kendi kaynağımla</option>
            <option value="Angel yatırım aldım">Angel yatırım aldım</option>
            <option value="VC destekli">VC destekli</option>
            <option value="Kurumsal iç proje">Kurumsal iç proje</option>
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="budget" style={labelStyle}>Proje bütçesi? *</label>
          <select
            id="budget" name="budget" required
            value={form.budget} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="₺50.000–₺150.000">₺50.000–₺150.000</option>
            <option value="₺150.000–₺300.000">₺150.000–₺300.000</option>
            <option value="₺300.000+">₺300.000+</option>
            <option value="Konuşmaya açığım">Konuşmaya açığım</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" style={labelStyle}>MVP için hedef süre? *</label>
          <select
            id="timeline" name="timeline" required
            value={form.timeline} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="1-2 ay">1-2 ay</option>
            <option value="2-4 ay">2-4 ay</option>
            <option value="4-6 ay">4-6 ay</option>
            <option value="Esnek">Esnek</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="existingTech" style={labelStyle}>Mevcut teknik altyapı / kod tabanı var mı?</label>
        <input
          id="existingTech" name="existingTech" type="text"
          value={form.existingTech} onChange={handleChange}
          placeholder="Ör: Yok / React prototipi var / Başka ekip yazdı"
          style={inputStyle} onFocus={onFocus} onBlur={onBlur}
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
        {state === "sending" ? "Gönderiliyor…" : "SaaS Proje Teklifi Al"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
