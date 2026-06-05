"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { LeadPayload } from "@/lib/types/leads"
import { trackEvent } from "@/lib/analytics"

type FormState = "idle" | "sending" | "error"

type FormData = Pick<LeadPayload, "firstName" | "email" | "companyName" | "productIdea" | "targetUser" | "fundingStage" | "budget" | "timeline" | "existingTech">

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function SaasLeadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    companyName: "",
    productIdea: "",
    targetUser: "",
    fundingStage: "",
    budget: "",
    timeline: "",
    existingTech: "",
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
        body: JSON.stringify({ ...form, funnelType: "saas" }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "saas")
        router.push("/tesekkurler?type=saas")
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

      <div>
        <label htmlFor="companyName" className={labelCls}>Şirket / Startup Adı</label>
        <input
          id="companyName" name="companyName" type="text"
          value={form.companyName} onChange={handleChange}
          placeholder="Firma adı (opsiyonel)" className="input"
        />
      </div>

      <div>
        <label htmlFor="productIdea" className={labelCls}>SaaS ürün fikrinizi kısaca anlatın *</label>
        <textarea
          id="productIdea" name="productIdea" required
          rows={4}
          value={form.productIdea} onChange={handleChange}
          placeholder="Ör: KOBİler için muhasebe + fatura SaaS'ı, abonelik modeliyle…"
          className="input min-h-[100px] resize-y"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="targetUser" className={labelCls}>Hedef kullanıcı kitlesi? *</label>
          <select
            id="targetUser" name="targetUser" required
            value={form.targetUser} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="B2B (işletmeler)">B2B (işletmeler)</option>
            <option value="B2C (bireyler)">B2C (bireyler)</option>
            <option value="Her ikisi">Her ikisi</option>
            <option value="Henüz karar vermedim">Henüz karar vermedim</option>
          </select>
        </div>
        <div>
          <label htmlFor="fundingStage" className={labelCls}>Finansman durumu? *</label>
          <select
            id="fundingStage" name="fundingStage" required
            value={form.fundingStage} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="Kendi kaynağımla">Kendi kaynağımla</option>
            <option value="Angel yatırım aldım">Angel yatırım aldım</option>
            <option value="VC destekli">VC destekli</option>
            <option value="Kurumsal iç proje">Kurumsal iç proje</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelCls}>Proje bütçesi? *</label>
          <select
            id="budget" name="budget" required
            value={form.budget} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="₺50.000–₺150.000">₺50.000–₺150.000</option>
            <option value="₺150.000–₺300.000">₺150.000–₺300.000</option>
            <option value="₺300.000+">₺300.000+</option>
            <option value="Konuşmaya açığım">Konuşmaya açığım</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelCls}>MVP için hedef süre? *</label>
          <select
            id="timeline" name="timeline" required
            value={form.timeline} onChange={handleChange}
            className="input cursor-pointer"
          >
            <option value="">Seçin</option>
            <option value="1-2 ay">1-2 ay</option>
            <option value="2-4 ay">2-4 ay</option>
            <option value="4-6 ay">4-6 ay</option>
            <option value="Esnek">Esnek</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="existingTech" className={labelCls}>Mevcut teknik altyapı / kod tabanı var mı?</label>
        <input
          id="existingTech" name="existingTech" type="text"
          value={form.existingTech} onChange={handleChange}
          placeholder="Ör: Yok / React prototipi var / Başka ekip yazdı"
          className="input"
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
        {state === "sending" ? "Gönderiliyor…" : "SaaS Proje Teklifi Al"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Bilgileriniz üçüncü taraflarla paylaşılmaz. 24 saat içinde dönüş yapılır.
      </p>
    </form>
  )
}
