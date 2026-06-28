"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

// Tek-adım form: 2-adımlı versiyonda 5 form_start → 0 submit sürtünmesi gözlendi.
// Ad + e-posta + use-case tek ekranda → sürtünme minimize. use-case opsiyonel
// (zorunlu seçim eski adım-2 terk noktasıydı).
export default function AILeadForm() {
  const router = useRouter()
  const markStart = useFunnelTracking("ai")
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", aiUseCase: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          placeholder="Ahmet"
          className="input text-[16px]"
        />
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
        <label htmlFor="phone" className={labelCls}>Telefon / WhatsApp (opsiyonel)</label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          placeholder="Hızlı dönüş için"
          className="input text-[16px]"
        />
      </div>

      <div>
        <label className={labelCls}>Hangi alanda AI kullanmak istiyorsunuz?</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "İçerik / blog yazımı", label: "İçerik & Blog" },
            { value: "Ürün açıklamaları", label: "Ürün Açıklamaları" },
            { value: "Müşteri hizmetleri chatbotu", label: "Müşteri Chatbotu" },
            { value: "İş süreçleri otomasyonu", label: "İş Süreçleri" },
            { value: "Emin değilim, konuşalım", label: "Emin değilim" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { markStart(); setForm((prev) => ({ ...prev, aiUseCase: opt.value })) }}
              className={`rounded-[8px] border px-3 py-3 text-left text-[0.8rem] font-semibold transition-colors ${
                form.aiUseCase === opt.value
                  ? "border-accent-600 bg-accent-50 text-accent-700"
                  : "border-ink-200 bg-white text-ink-700 hover:border-accent-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
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
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz AI Analizi İste"}
        {state !== "sending" && <ArrowRight size={18} />}
      </button>
      <p className="text-center text-[0.72rem] text-ink-400">
        Ücretsiz&nbsp;·&nbsp;Taahhütsüz&nbsp;·&nbsp;24 saatte yanıt
      </p>
    </form>
  )
}
