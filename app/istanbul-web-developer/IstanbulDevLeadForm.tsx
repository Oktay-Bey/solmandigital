"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "phone" | "projectType" | "companyType" | "budget" | "prefersMeeting" | "projectBrief">

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function IstanbulDevLeadForm() {
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
        body: JSON.stringify({ ...form, funnelType: "istanbul-dev", gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "istanbul-dev")
        trackLeadConversion("istanbul-dev")
        router.push("/tesekkurler?type=istanbul-dev")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }


  const meetingOptions = ["Zoom", "Yüz yüze İstanbul", "Farketmez"]

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
        <label htmlFor="phone" className={labelCls}>Telefon / WhatsApp (hızlı iletişim için)</label>
        <input
          id="phone" name="phone" type="tel"
          value={form.phone} onChange={handleChange}
          placeholder="+90 5xx xxx xx xx" className="input"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelCls}>Ne tür proje? *</label>
          <select
            id="projectType" name="projectType" required
            value={form.projectType} onChange={handleChange}
            className="input cursor-pointer"
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
          <label htmlFor="companyType" className={labelCls}>Siz kimsiniz? *</label>
          <select
            id="companyType" name="companyType" required
            value={form.companyType} onChange={handleChange}
            className="input cursor-pointer"
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
        <label htmlFor="budget" className={labelCls}>Proje bütçesi? *</label>
        <select
          id="budget" name="budget" required
          value={form.budget} onChange={handleChange}
          className="input cursor-pointer"
        >
          <option value="">Seçin</option>
          <option value="₺10.000'in altı">₺10.000&apos;in altı</option>
          <option value="₺10.000–₺30.000">₺10.000–₺30.000</option>
          <option value="₺30.000–₺80.000">₺30.000–₺80.000</option>
          <option value="₺80.000+">₺80.000+</option>
        </select>
      </div>

      <div>
        <p className={labelCls}>Nasıl görüşmek istersiniz?</p>
        <div className="flex flex-wrap gap-3">
          {meetingOptions.map((opt) => (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-4 py-[0.45rem] text-[0.875rem] transition-colors ${
                form.prefersMeeting === opt
                  ? "border-accent-700 bg-accent-50 text-ink-700"
                  : "border-ink-200 bg-white text-ink-600 hover:border-ink-400"
              }`}
            >
              <input
                type="radio" name="prefersMeeting" value={opt}
                checked={form.prefersMeeting === opt}
                onChange={handleChange}
                className="accent-accent-700"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="projectBrief" className={labelCls}>Projeyi kısaca anlatın</label>
        <textarea
          id="projectBrief" name="projectBrief"
          rows={3}
          value={form.projectBrief} onChange={handleChange}
          placeholder="Ör: İstanbul'daki muhaseme firmamız için kurumsal web sitesi, iki dil desteği…"
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
        {state === "sending" ? "Gönderiliyor…" : "Mesaj Gönder"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
