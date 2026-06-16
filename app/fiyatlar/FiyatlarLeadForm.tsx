"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, trackLeadConversion } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-1.5 block text-[0.72rem] font-bold uppercase tracking-wide text-ondark-muted"

const serviceOptions = [
  "Web Sitesi",
  "E-Ticaret",
  "Marketplace Entegrasyonu",
  "SaaS & AI Otomasyon",
  "Emin değilim",
]

export default function FiyatlarLeadForm() {
  const router = useRouter()
  const markStart = useFunnelTracking("fiyat-talebi")
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ firstName: "", email: "", service: "" })

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
        body: JSON.stringify({
          firstName: form.firstName,
          email: form.email,
          aiUseCase: form.service,
          funnelType: "fiyat-talebi",
        }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "fiyat-talebi")
        trackLeadConversion("fiyat-talebi")
        router.push("/tesekkurler?type=fiyat")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
      <div>
        <label htmlFor="fiyat-firstName" className={labelCls}>Adınız *</label>
        <input
          id="fiyat-firstName" name="firstName" type="text" required
          value={form.firstName} onChange={handleChange}
          placeholder="Ahmet"
          className="w-full rounded-[8px] border border-dark-50 bg-dark-400 px-3.5 py-3 text-[0.875rem] text-white placeholder:text-ondark-muted focus:border-accent-700 focus:outline-none text-[16px]"
        />
      </div>
      <div>
        <label htmlFor="fiyat-email" className={labelCls}>E-posta *</label>
        <input
          id="fiyat-email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="ahmet@firma.com"
          className="w-full rounded-[8px] border border-dark-50 bg-dark-400 px-3.5 py-3 text-[0.875rem] text-white placeholder:text-ondark-muted focus:border-accent-700 focus:outline-none text-[16px]"
        />
      </div>
      <div>
        <label htmlFor="fiyat-service" className={labelCls}>Hangi hizmet?</label>
        <select
          id="fiyat-service" name="service"
          value={form.service} onChange={handleChange}
          className="w-full rounded-[8px] border border-dark-50 bg-dark-400 px-3.5 py-3 text-[0.875rem] text-white focus:border-accent-700 focus:outline-none cursor-pointer text-[16px]"
        >
          <option value="">Seçin (opsiyonel)</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col justify-end">
        {state === "error" ? (
          <div className="flex items-center gap-1.5 text-[0.75rem] text-accent-400">
            <AlertCircle size={14} /> Hata oluştu.
          </div>
        ) : null}
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn btn-primary whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-80"
        >
          {state === "sending" ? "Gönderiliyor…" : "Teklif Al"}
          {state !== "sending" && <ArrowRight size={16} />}
        </button>
      </div>
    </form>
  )
}
