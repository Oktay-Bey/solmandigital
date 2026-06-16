"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls = "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

const NEEDS = [
  "Web App / Custom Development",
  "AI Integration / Automation",
  "E-commerce Development",
  "SaaS MVP",
  "API Integration",
  "White-label Reseller",
  "Other / Not sure",
]

const VOLUMES = [
  "1–2 projects / month",
  "3–5 projects / month",
  "6+ projects / month",
  "Ad-hoc / overflow",
]

export default function PartnershipForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState({
    isim: "",
    email: "",
    agencyName: "",
    country: "",
    need: "",
    volume: "",
  })

  const markStart = useFunnelTracking("partnership")

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
          firstName: form.isim,
          email: form.email,
          companyName: form.agencyName,
          country: form.country,
          aiUseCase: form.need,
          currentVolume: form.volume,
          funnelType: "partnership",
          gclid,
        }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "partnership")
        router.push("/tesekkurler?type=partnership")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="isim" className={labelCls}>Your Name *</label>
          <input id="isim" name="isim" type="text" required value={form.isim} onChange={handleChange} placeholder="Jane Smith" className="input" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Work Email *</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@youragency.com" className="input" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="agencyName" className={labelCls}>Agency / Company *</label>
          <input id="agencyName" name="agencyName" type="text" required value={form.agencyName} onChange={handleChange} placeholder="Acme Agency" className="input" />
        </div>
        <div>
          <label htmlFor="country" className={labelCls}>Country *</label>
          <input id="country" name="country" type="text" required value={form.country} onChange={handleChange} placeholder="United States" className="input" />
        </div>
      </div>

      <div>
        <label htmlFor="need" className={labelCls}>What do you need? *</label>
        <select id="need" name="need" required value={form.need} onChange={handleChange} className="input cursor-pointer">
          <option value="">Select…</option>
          {NEEDS.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="volume" className={labelCls}>Expected volume</label>
        <select id="volume" name="volume" value={form.volume} onChange={handleChange} className="input cursor-pointer">
          <option value="">Select…</option>
          {VOLUMES.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 rounded-[7px] border border-accent-200 bg-accent-50 px-4 py-3.5 text-[0.875rem] text-accent-700">
          <AlertCircle size={16} />
          Something went wrong. Please try again or reach out via WhatsApp.
        </div>
      )}

      <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-80">
        {state === "sending" ? "Sending…" : "Start Partnership Discussion"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Free · No commitment · Response within 24h
      </p>
    </form>
  )
}
