"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls = "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

const SERVICES = [
  "Web Application Development",
  "White-label Development Partnership",
  "AI Integration / Automation",
  "E-commerce Development",
  "SaaS MVP Development",
  "API Integration",
  "Other / Not sure yet",
]

export default function ContactFormEn() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ isim: "", email: "", hizmet: "", mesaj: "" })
  const [gclid, setGclid] = useState<string | null>(null)

  useEffect(() => { setGclid(getGclid()) }, [])

  const { markStart, formRef } = useFunnelTracking("contact-en")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    markStart()
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      const res = await fetch("/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, gclid, lang: "en" }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "contact-en")
        trackLeadConversion("contact-en")
        router.push("/tesekkurler?type=contact-en")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="isim" className={labelCls}>Your Name</label>
        <input id="isim" name="isim" type="text" required value={form.isim} onChange={handleChange} placeholder="Jane Smith" className="input" />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>Email Address</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@youragency.com" className="input" />
      </div>

      <div>
        <label htmlFor="hizmet" className={labelCls}>What are you looking for?</label>
        <select id="hizmet" name="hizmet" required value={form.hizmet} onChange={handleChange} className="input cursor-pointer">
          <option value="">Select a service…</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="mesaj" className={labelCls}>Tell us about your project</label>
        <textarea id="mesaj" name="mesaj" required rows={5} value={form.mesaj} onChange={handleChange} placeholder="A brief description: what you're building, your stack if relevant, timeline expectations..." className="input min-h-[120px] resize-y" />
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 rounded-[7px] border border-accent-200 bg-accent-50 px-4 py-3.5 text-[0.875rem] text-accent-700">
          <AlertCircle size={16} />
          Something went wrong. Please try again or reach out via WhatsApp.
        </div>
      )}

      <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-80">
        {state === "sending" ? "Sending…" : "Send Message"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Your information is never shared with third parties. We respond within 24 hours.
      </p>
    </form>
  )
}
