"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { trackEvent, getGclid } from "@/lib/analytics"

type FormState = "idle" | "sending" | "success" | "error"

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
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ isim: "", email: "", hizmet: "", mesaj: "" })
  const [gclid, setGclid] = useState<string | null>(null)

  useEffect(() => { setGclid(getGclid()) }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

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
        trackEvent("form_submit", "lead", "contact-en")
        setState("success")
        setForm({ isim: "", email: "", hizmet: "", mesaj: "" })
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[10px] border border-ink-200 bg-surface p-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-green-200 bg-green-50">
          <CheckCircle2 size={24} color="#16a34a" />
        </div>
        <h3 className="mb-2 text-[1.1rem] font-extrabold tracking-tight text-ink-900">
          Message received!
        </h3>
        <p className="text-[0.875rem] text-ink-500">
          We'll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
