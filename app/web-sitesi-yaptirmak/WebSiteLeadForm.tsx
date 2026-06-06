"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { trackEvent, getGclid } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "phone" | "companyName" | "siteType" | "budget" | "timeline" | "existingSite" | "brief">

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function WebSiteLeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    companyName: "",
    siteType: "",
    budget: "",
    timeline: "",
    existingSite: "",
    brief: "",
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
        body: JSON.stringify({ ...form, funnelType: "web-sitesi", gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "web-sitesi")
        router.push("/tesekkurler?type=web-sitesi")
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelCls}>Telefon / WhatsApp</label>
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="+90 5xx xxx xx xx" className="input"
          />
        </div>
        <div>
          <label htmlFor="companyName" className={labelCls}>Firma / Marka Adı</label>
          <input
            id="companyName" name="companyName" type="text"
            value={form.companyName} onChange={handleChange}
            placeholder="Firma Adı" className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="siteType" className={labelCls}>Ne tür site istiyorsunuz? *</label>
        <select
          id="siteType" name="siteType" required
          value={form.siteType} onChange={handleChange}
          className="input cursor-pointer"
        >
          <option value="">Seçin</option>
          <option value="Kurumsal tanıtım sitesi">Kurumsal tanıtım sitesi</option>
          <option value="E-ticaret mağazası">E-ticaret mağazası</option>
          <option value="Landing page">Landing page</option>
          <option value="Blog / içerik sitesi">Blog / içerik sitesi</option>
          <option value="Portföy sitesi">Portföy sitesi</option>
          <option value="Henüz karar vermedim">Henüz karar vermedim</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelCls}>Tahmini bütçeniz? *</label>
          <select
            id="budget" name="budget" required
            value={form.budget} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="₺8.000–₺20.000">₺8.000–₺20.000</option>
            <option value="₺20.000–₺50.000">₺20.000–₺50.000</option>
            <option value="₺50.000–₺100.000">₺50.000–₺100.000</option>
            <option value="₺100.000+">₺100.000+</option>
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
            <option value="Bu ay">Bu ay</option>
            <option value="1-3 ay içinde">1-3 ay içinde</option>
            <option value="3-6 ay içinde">3-6 ay içinde</option>
            <option value="Henüz karar vermedim">Henüz karar vermedim</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="existingSite" className={labelCls}>Mevcut web siteniz var mı?</label>
        <input
          id="existingSite" name="existingSite" type="text"
          value={form.existingSite} onChange={handleChange}
          placeholder="https://mevcutsite.com (yoksa boş bırakın)"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="brief" className={labelCls}>Projeniz hakkında kısaca anlatın</label>
        <textarea
          id="brief" name="brief"
          rows={3}
          value={form.brief} onChange={handleChange}
          placeholder="Ör: Muhasebe firması için kurumsal site, 10 sayfa, Türkçe + İngilizce…"
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
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz Fiyat Teklifi Al"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
