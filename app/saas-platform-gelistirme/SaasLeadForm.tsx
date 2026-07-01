"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

// Düşük sürtünmeli tek-adım form — AILeadForm kalıbı (form_start %19.6 ile en
// sağlıklı funnel). Eski 9 alanlı / 7'si zorunlu versiyon (finansman durumu,
// bütçe, süre…) 0 form_start üretti; üstelik bütçe seçenekleri ₺50.000'den
// başlayıp sayfadaki "₺25.000'den başlayan" vaadiyle çelişiyordu. Proje tipi
// çipleri EN ÜSTTE: kimlik bilgisi istemeden ilk etkileşimi alır.
export default function SaasLeadForm() {
  const router = useRouter()
  const { markStart, formRef } = useFunnelTracking("saas")
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", projectType: "", productIdea: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        body: JSON.stringify({ ...form, funnelType: "saas", gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "saas")
        trackLeadConversion("saas")
        router.push("/tesekkurler?type=saas")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className={labelCls}>Ne geliştirmek istiyorsunuz?</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "SaaS ürünü (abonelikli)", label: "SaaS Ürünü" },
            { value: "CRM / iç yönetim aracı", label: "CRM & İç Araç" },
            { value: "Müşteri paneli / portal", label: "Müşteri Paneli" },
            { value: "Web uygulaması", label: "Web Uygulaması" },
            { value: "Emin değilim, konuşalım", label: "Emin değilim" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { markStart(); setForm((prev) => ({ ...prev, projectType: opt.value })) }}
              className={`rounded-[8px] border px-3 py-3 text-left text-[0.8rem] font-semibold transition-colors ${
                form.projectType === opt.value
                  ? "border-accent-600 bg-accent-50 text-accent-700"
                  : "border-ink-200 bg-white text-ink-700 hover:border-accent-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>Adınız *</label>
          <input
            id="firstName" name="firstName" type="text" required
            value={form.firstName} onChange={handleChange}
            placeholder="Ahmet"
            className="input text-[16px]"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Telefon (opsiyonel)</label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="Hızlı dönüş için"
            className="input text-[16px]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>E-posta *</label>
        <input
          id="email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="ahmet@firma.com"
          className="input text-[16px]"
        />
      </div>

      <div>
        <label htmlFor="productIdea" className={labelCls}>Projenizi kısaca anlatın (opsiyonel)</label>
        <textarea
          id="productIdea" name="productIdea"
          rows={3}
          value={form.productIdea} onChange={handleChange}
          placeholder="Ör: Sahadaki ekibimizin iş takibi için panel / KOBİ'lere abonelikli muhasebe SaaS'ı…"
          className="input min-h-[80px] resize-y"
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
        className="btn btn-primary w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Gönderiliyor…" : "Sabit Fiyat Teklifi Al"}
        {state !== "sending" && <ArrowRight size={18} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz · 24 saat içinde dönüş yapılır
      </p>
    </form>
  )
}
