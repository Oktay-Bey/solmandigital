"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function AILeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState({ firstName: "", email: "", aiUseCase: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <option value="CRM / müşteri yönetimi">CRM / müşteri yönetimi</option>
          <option value="İş süreçleri / veri işleme">İş süreçleri / veri işleme</option>
          <option value="Emin değilim, konuşalım">Emin değilim, konuşalım</option>
        </select>
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
        className="btn btn-primary w-full text-base disabled:cursor-not-allowed disabled:opacity-80"
      >
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz AI Analizi İste"}
        {state !== "sending" && <ArrowRight size={18} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Ücretsiz&nbsp;·&nbsp;Taahhütsüz&nbsp;·&nbsp;24 saatte yanıt
      </p>
    </form>
  )
}
