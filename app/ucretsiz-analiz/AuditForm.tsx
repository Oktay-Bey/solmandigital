"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle, ChevronDown } from "lucide-react"
import { services } from "@/lib/data/services"
import type { AuditPayload } from "@/lib/types/leads"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function AuditForm() {
  const router = useRouter()
  const { markStart, formRef } = useFunnelTracking("audit")
  const [state, setState] = useState<FormState>("idle")
  const [expanded, setExpanded] = useState(false)
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState<AuditPayload>({
    firstName: "",
    email: "",
    websiteUrl: "",
    serviceInterest: "",
    currentProblem: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    markStart()
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")

    try {
      const res = await fetch("/api/email/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, gclid }),
      })

      if (res.ok) {
        trackEvent("form_submit", "lead", "audit")
        trackLeadConversion("audit")
        router.push("/tesekkurler?type=audit")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Zorunlu alanlar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>Adınız</label>
          <input
            id="firstName" name="firstName" type="text"
            value={form.firstName} onChange={handleChange}
            placeholder="Ahmet (opsiyonel)"
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
      </div>

      <div>
        <label htmlFor="websiteUrl" className={labelCls}>Web Sitenizin Adresi *</label>
        <input
          id="websiteUrl" name="websiteUrl" type="url" required
          value={form.websiteUrl} onChange={handleChange}
          placeholder="https://firmaniz.com"
          className="input text-[16px]"
        />
      </div>

      {/* Niyet nitelendirme — görünür ama opsiyonel */}
      <div>
        <label htmlFor="serviceInterest" className={labelCls}>Analiz sonrası en çok hangi konuda destek istersiniz?</label>
        <select
          id="serviceInterest" name="serviceInterest"
          value={form.serviceInterest} onChange={handleChange}
          className="input cursor-pointer text-[16px]"
        >
          <option value="">Seçin (opsiyonel)</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
      </div>

      {/* Opsiyonel detay */}
      <div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between rounded-[8px] border border-ink-200 bg-surface px-4 py-3 text-[0.8rem] font-semibold text-ink-600 hover:border-ink-300 transition-colors"
        >
          <span>Sorununuzu kısaca anlatmak ister misiniz? (opsiyonel)</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {expanded && (
          <div className="mt-3 flex flex-col gap-4 rounded-[8px] border border-ink-200 bg-surface px-4 py-4">
            <div>
              <label htmlFor="currentProblem" className={labelCls}>Mevcut Sorunuz Nedir?</label>
              <textarea
                id="currentProblem" name="currentProblem"
                rows={3}
                value={form.currentProblem} onChange={handleChange}
                placeholder="Sitenizle ilgili yaşadığınız sorunu kısaca anlatın…"
                className="input min-h-[90px] resize-y text-[16px]"
              />
            </div>
          </div>
        )}
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 rounded-[7px] border border-accent-200 bg-accent-50 px-4 py-3.5 text-[0.875rem] text-accent-700">
          <AlertCircle size={16} />
          Gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}

      <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-80">
        {state === "sending" ? "Gönderiliyor…" : "Analizi Başlat"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
