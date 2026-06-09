"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "aiUseCase" | "currentVolume" | "companySize" | "timeline" | "budget" | "painPoint">

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function AILeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
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
        body: JSON.stringify({ ...form, funnelType: "ai", gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "ai")
        trackLeadConversion("ai")
        router.push("/tesekkurler?type=ai")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>Adınız *</label>
          <input
            id="firstName" name="firstName" type="text" required
            value={form.firstName} onChange={handleChange}
            placeholder="Ahmet" className="input"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>E-posta *</label>
          <input
            id="email" name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="ahmet@firma.com" className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="aiUseCase" className={labelCls}>Hangi alanda AI kullanmak istiyorsunuz? *</label>
        <select
          id="aiUseCase" name="aiUseCase" required
          value={form.aiUseCase} onChange={handleChange}
          className="input cursor-pointer"
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
        <label htmlFor="currentVolume" className={labelCls}>Şu an bu işi ne kadar sıklıkla yapıyorsunuz? *</label>
        <input
          id="currentVolume" name="currentVolume" type="text" required
          value={form.currentVolume} onChange={handleChange}
          placeholder="ör: haftada 50 ürün açıklaması, ayda 8 blog yazısı"
          className="input"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="companySize" className={labelCls}>Şirket büyüklüğü? *</label>
          <select
            id="companySize" name="companySize" required
            value={form.companySize} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="1-5 kişi (solopreneur)">1-5 kişi (solopreneur)</option>
            <option value="6-25 kişi">6-25 kişi</option>
            <option value="26-100 kişi">26-100 kişi</option>
            <option value="100+ kişi">100+ kişi</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelCls}>Ne zaman başlamak istiyorsunuz? *</label>
          <select
            id="timeline" name="timeline" required
            value={form.timeline} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="Hemen">Hemen</option>
            <option value="1 ay içinde">1 ay içinde</option>
            <option value="Araştırma aşamasındayım">Araştırma aşamasındayım</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>Bütçe aralığı</label>
        <select
          id="budget" name="budget"
          value={form.budget} onChange={handleChange}
          className="input cursor-pointer"
        >
          <option value="">Belirtmek istemiyorum</option>
          <option value="₺15.000–₺40.000">₺15.000–₺40.000</option>
          <option value="₺40.000–₺100.000">₺40.000–₺100.000</option>
          <option value="₺100.000+">₺100.000+</option>
          <option value="Konuşmaya açığım">Konuşmaya açığım</option>
        </select>
      </div>

      <div>
        <label htmlFor="painPoint" className={labelCls}>En çok zaman harcadığınız tekrar eden iş nedir?</label>
        <textarea
          id="painPoint" name="painPoint"
          rows={3}
          value={form.painPoint} onChange={handleChange}
          placeholder="Ör: her gün yüzlerce ürün açıklaması yazmak zorundayım…"
          className="input min-h-[90px] resize-y"
        />
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 rounded-[7px] border border-accent-200 bg-accent-50 px-4 py-3.5 text-[0.875rem] text-accent-700">
          <AlertCircle size={16} />
          Gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-80"
      >
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz AI Analizi İste"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
