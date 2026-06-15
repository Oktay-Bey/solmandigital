"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { services } from "@/lib/data/services"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function ContactForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ isim: "", email: "", hizmet: "", mesaj: "" })
  const [gclid, setGclid] = useState<string | null>(null)

  useEffect(() => { setGclid(getGclid()) }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      const res = await fetch("/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "contact")
        trackLeadConversion("contact")
        router.push("/tesekkurler?type=consultation")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="isim" className={labelCls}>Adınız Soyadınız</label>
        <input id="isim" name="isim" type="text" required value={form.isim} onChange={handleChange} placeholder="Ahmet Yılmaz" className="input" />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>E-posta Adresiniz</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="ahmet@firma.com" className="input" />
      </div>

      <div>
        <label htmlFor="hizmet" className={labelCls}>İlgilendiğiniz Hizmet</label>
        <select id="hizmet" name="hizmet" required value={form.hizmet} onChange={handleChange} className="input cursor-pointer">
          <option value="">Hizmet seçin…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Diğer">Diğer / Emin değilim</option>
        </select>
      </div>

      <div>
        <label htmlFor="mesaj" className={labelCls}>Projenizi Anlatın</label>
        <textarea id="mesaj" name="mesaj" required rows={5} value={form.mesaj} onChange={handleChange} placeholder="Projenizden kısaca bahsedin: ne yapmak istiyorsunuz, varsa teknik detaylar, tahmini süre beklentiniz..." className="input min-h-[120px] resize-y" />
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 rounded-[7px] border border-accent-200 bg-accent-50 px-4 py-3.5 text-[0.875rem] text-accent-700">
          <AlertCircle size={16} />
          Gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}

      <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-80">
        {state === "sending" ? "Gönderiliyor…" : "Teklif İste"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
