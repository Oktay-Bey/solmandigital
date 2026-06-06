"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { trackEvent, getGclid } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "phone" | "companyName" | "monthlyOrders" | "currentSolution" | "urgency" | "specificPain">

const MARKETPLACES = ["Trendyol", "Hepsiburada", "Amazon TR", "N11", "Çiçeksepeti", "Diğer"]

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function TrendyolLeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([])
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    phone: "",
    companyName: "",
    monthlyOrders: "",
    currentSolution: "",
    urgency: "",
    specificPain: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleMarket = (market: string) => {
    setSelectedMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMarkets.length === 0) return
    setState("sending")
    try {
      const res = await fetch("/api/email/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          funnelType: "trendyol",
          marketplaces: selectedMarkets.join(", "),
          gclid,
        }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "trendyol")
        router.push("/tesekkurler?type=trendyol")
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
          <label htmlFor="companyName" className={labelCls}>Firma Adı</label>
          <input
            id="companyName" name="companyName" type="text"
            value={form.companyName} onChange={handleChange}
            placeholder="Firma Adı" className="input"
          />
        </div>
      </div>

      <div>
        <p className={labelCls}>Hangi marketplace&apos;lerde satış yapıyorsunuz? *</p>
        <div className="flex flex-wrap gap-2">
          {MARKETPLACES.map((m) => {
            const selected = selectedMarkets.includes(m)
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleMarket(m)}
                className={`cursor-pointer rounded-md border px-4 py-[0.45rem] text-[0.825rem] font-semibold transition-colors ${
                  selected
                    ? "border-accent-700 bg-accent-50 text-accent-700"
                    : "border-ink-200 bg-white text-ink-600 hover:border-ink-400"
                }`}
              >
                {m}
              </button>
            )
          })}
        </div>
        {selectedMarkets.length === 0 && (
          <p className="mt-1.5 text-[0.75rem] text-accent-700">En az bir marketplace seçin</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="monthlyOrders" className={labelCls}>Aylık ortalama sipariş sayısı? *</label>
          <select
            id="monthlyOrders" name="monthlyOrders" required
            value={form.monthlyOrders} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="0-50">0–50</option>
            <option value="51-200">51–200</option>
            <option value="201-1000">201–1.000</option>
            <option value="1000+">1.000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="urgency" className={labelCls}>Ne zaman başlamak istiyorsunuz? *</label>
          <select
            id="urgency" name="urgency" required
            value={form.urgency} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="Hemen">Hemen</option>
            <option value="1 ay içinde">1 ay içinde</option>
            <option value="3 ay içinde">3 ay içinde</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="currentSolution" className={labelCls}>Şu an ne kullanıyorsunuz?</label>
        <select
          id="currentSolution" name="currentSolution"
          value={form.currentSolution} onChange={handleChange}
          className="input cursor-pointer"
        >
          <option value="">Seçin (opsiyonel)</option>
          <option value="Manuel yönetiyorum">Manuel yönetiyorum</option>
          <option value="Entegrasyon yazılımı (Entegra, vb.)">Entegrasyon yazılımı (Entegra, vb.)</option>
          <option value="Kendi çözümümüz var">Kendi çözümümüz var</option>
          <option value="Yeni başlayacağım">Yeni başlayacağım</option>
        </select>
      </div>

      <div>
        <label htmlFor="specificPain" className={labelCls}>En büyük sorunuz nedir?</label>
        <textarea
          id="specificPain" name="specificPain"
          rows={3}
          value={form.specificPain} onChange={handleChange}
          placeholder="Ör: stok tutarsızlıkları yüzünden sürekli iptal alıyoruz…"
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
        disabled={state === "sending" || selectedMarkets.length === 0}
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Gönderiliyor…" : "Entegrasyon Teklifi Al"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
