"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

// Telefon-merkezli tek-adım form: ad + telefon zorunlu, e-posta opsiyonel.
// Sektör + kanal chip'leri opsiyonel (sürtünmeyi artırmasın diye zorunlu değil).
// Formu doldurmak istemeyen için hero'da WhatsApp CTA birincil eylemdir.
export default function MusteriYanitForm() {
  const router = useRouter()
  const { markStart, formRef } = useFunnelTracking("musteri-yaniti")
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState({ firstName: "", phone: "", email: "", sector: "", channel: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        body: JSON.stringify({ ...form, funnelType: "musteri-yaniti", gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "musteri-yaniti")
        trackLeadConversion("musteri-yaniti")
        router.push("/tesekkurler?type=musteri-yaniti")
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
        <label htmlFor="firstName" className={labelCls}>Adınız *</label>
        <input
          id="firstName" name="firstName" type="text" required
          value={form.firstName} onChange={handleChange}
          placeholder="Ahmet"
          className="input text-[16px]"
        />
      </div>
      <div>
        <label htmlFor="phone" className={labelCls}>Telefon / WhatsApp *</label>
        <input
          id="phone" name="phone" type="tel" required
          value={form.phone} onChange={handleChange}
          placeholder="05XX XXX XX XX"
          className="input text-[16px]"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>E-posta (opsiyonel)</label>
        <input
          id="email" name="email" type="email"
          value={form.email} onChange={handleChange}
          placeholder="Teklifi yazılı isterseniz"
          className="input text-[16px]"
        />
      </div>

      <div>
        <label className={labelCls}>İşletmeniz hangi alanda?</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "Restoran / Kafe", label: "Restoran & Kafe" },
            { value: "Güzellik / Kuaför", label: "Güzellik & Kuaför" },
            { value: "Emlak", label: "Emlak" },
            { value: "Oto / Servis", label: "Oto & Servis" },
            { value: "Diğer", label: "Diğer" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { markStart(); setForm((prev) => ({ ...prev, sector: opt.value })) }}
              className={`rounded-[8px] border px-3 py-3 text-left text-[0.8rem] font-semibold transition-colors ${
                form.sector === opt.value
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
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz Kurulum Planı İste"}
        {state !== "sending" && <ArrowRight size={18} />}
      </button>
      <p className="text-center text-[0.72rem] text-ink-400">
        Ücretsiz&nbsp;·&nbsp;Taahhütsüz&nbsp;·&nbsp;24 saatte arıyoruz
      </p>
    </form>
  )
}
