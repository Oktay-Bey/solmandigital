"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { inputStyle, labelStyle, submitButtonStyle, onFocus, onBlur } from "@/lib/form-utils"
import { trackEvent } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "phone" | "companyName" | "monthlyOrders" | "currentSolution" | "urgency" | "specificPain">

const MARKETPLACES = ["Trendyol", "Hepsiburada", "Amazon TR", "N11", "Çiçeksepeti", "Diğer"]

export default function TrendyolLeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([])
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    companyName: "",
    monthlyOrders: "",
    currentSolution: "",
    urgency: "",
    specificPain: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleMarket = (market: string) => {
    setSelectedMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMarkets.length === 0) return
    setState("sending")
    try {
      const res = await fetch("/api/email/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          funnelType: "trendyol",
          marketplaces: selectedMarkets.join(", "),
        }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "trendyol")
        router.push("/tesekkurler?type=trendyol")
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
          <label htmlFor="companyName" style={labelStyle}>Firma Adı</label>
          <input
            id="companyName" name="companyName" type="text"
            value={form.companyName} onChange={handleChange}
            placeholder="Firma Adı" style={inputStyle} onFocus={onFocus} onBlur={onBlur}
          />
        </div>
      </div>

      <div>
        <p style={labelStyle}>Hangi marketplace'lerde satış yapıyorsunuz? *</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {MARKETPLACES.map((m) => {
            const selected = selectedMarkets.includes(m)
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleMarket(m)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: 6,
                  fontSize: "0.825rem",
                  fontWeight: 600,
                  border: selected ? "1px solid #9b1c1c" : "1px solid #e0e0e0",
                  backgroundColor: selected ? "#fff5f5" : "#ffffff",
                  color: selected ? "#9b1c1c" : "#444444",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {m}
              </button>
            )
          })}
        </div>
        {selectedMarkets.length === 0 && (
          <p style={{ fontSize: "0.75rem", color: "#9b1c1c", marginTop: "0.4rem" }}>En az bir marketplace seçin</p>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-two-col">
        <div>
          <label htmlFor="monthlyOrders" style={labelStyle}>Aylık ortalama sipariş sayısı? *</label>
          <select
            id="monthlyOrders" name="monthlyOrders" required
            value={form.monthlyOrders} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="0-50">0–50</option>
            <option value="51-200">51–200</option>
            <option value="201-1000">201–1.000</option>
            <option value="1000+">1.000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="urgency" style={labelStyle}>Ne zaman başlamak istiyorsunuz? *</label>
          <select
            id="urgency" name="urgency" required
            value={form.urgency} onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
          >
            <option value="">Seçin</option>
            <option value="Hemen">Hemen</option>
            <option value="1 ay içinde">1 ay içinde</option>
            <option value="3 ay içinde">3 ay içinde</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="currentSolution" style={labelStyle}>Şu an ne kullanıyorsunuz?</label>
        <select
          id="currentSolution" name="currentSolution"
          value={form.currentSolution} onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}
        >
          <option value="">Seçin (opsiyonel)</option>
          <option value="Manuel yönetiyorum">Manuel yönetiyorum</option>
          <option value="Entegrasyon yazılımı (Entegra, vb.)">Entegrasyon yazılımı (Entegra, vb.)</option>
          <option value="Kendi çözümümüz var">Kendi çözümümüz var</option>
          <option value="Yeni başlayacağım">Yeni başlayacağım</option>
        </select>
      </div>

      <div>
        <label htmlFor="specificPain" style={labelStyle}>En büyük sorunuz nedir?</label>
        <textarea
          id="specificPain" name="specificPain"
          rows={3}
          value={form.specificPain} onChange={handleChange}
          placeholder="Ör: stok tutarsızlıkları yüzünden sürekli iptal alıyoruz…"
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
        disabled={state === "sending" || selectedMarkets.length === 0}
        style={{ ...submitButtonStyle(state === "sending"), opacity: selectedMarkets.length === 0 ? 0.6 : 1, cursor: (state === "sending" || selectedMarkets.length === 0) ? "not-allowed" : "pointer" }}
      >
        {state === "sending" ? "Gönderiliyor…" : "Entegrasyon Teklifi Al"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p style={{ fontSize: "0.72rem", color: "#aaaaaa", textAlign: "center" }}>
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
