"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import { trackEvent, trackLeadConversion, getGclid } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"
import WhatsAppLink from "@/components/WhatsAppLink"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

// Tek-adım İngilizce lead formu — TR AILeadForm ile simetrik. Bu sayfa en çok reklam
// tıkı alıyordu (43/30g) ama gömülü form yoktu (sadece Calendly/WhatsApp linki) → 0 form_start.
// use-case opsiyonel; name+email yeterli (düşük sürtünme).
export default function AILeadFormEn() {
  const router = useRouter()
  const { markStart, formRef } = useFunnelTracking("ai-en")
  const [state, setState] = useState<FormState>("idle")
  const [gclid, setGclid] = useState<string | null>(null)
  useEffect(() => { setGclid(getGclid()) }, [])
  const [form, setForm] = useState({ firstName: "", email: "", aiUseCase: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        body: JSON.stringify({ ...form, funnelType: "ai-en", gclid }),
      })
      if (res.ok) {
        trackEvent("form_submit", "lead", "ai-en")
        trackLeadConversion("ai-en")
        router.push("/tesekkurler?type=ai-en")
      } else {
        setState("error")
      }
    } catch {
      setState("error")
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="firstName" className={labelCls}>Your Name *</label>
        <input
          id="firstName" name="firstName" type="text" required
          value={form.firstName} onChange={handleChange}
          placeholder="Jane Smith"
          className="input text-[16px]"
        />
      </div>
      <div>
        <label htmlFor="email" className={labelCls}>Email *</label>
        <input
          id="email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="jane@company.com"
          className="input text-[16px]"
        />
      </div>

      <div>
        <label className={labelCls}>Where do you want to use AI?</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "AI chatbot / customer support", label: "Chatbot & Support" },
            { value: "Content automation", label: "Content Automation" },
            { value: "Workflow / process automation", label: "Workflow Automation" },
            { value: "Not sure yet, let's talk", label: "Not sure yet" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { markStart(); setForm((prev) => ({ ...prev, aiUseCase: opt.value })) }}
              className={`rounded-[8px] border px-3 py-3 text-left text-[0.8rem] font-semibold transition-colors ${
                form.aiUseCase === opt.value
                  ? "border-accent-600 bg-accent-50 text-accent-700"
                  : "border-ink-200 bg-white text-ink-700 hover:border-accent-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 rounded-[7px] border border-accent-200 bg-accent-50 px-4 py-3.5 text-[0.875rem] text-accent-700">
          <AlertCircle size={16} />
          Something went wrong. Please try again or reach out via WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="btn btn-primary w-full text-base disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Get Your Free AI Audit"}
        {state !== "sending" && <ArrowRight size={18} />}
      </button>
      <p className="text-center text-[0.72rem] text-ink-400">
        Free&nbsp;·&nbsp;No commitment&nbsp;·&nbsp;We reply within 24 hours
      </p>
      <p className="text-center text-[0.78rem] text-ink-500">
        Prefer to chat first?{" "}
        <WhatsAppLink
          message="Hi, I'd like to discuss an AI automation project."
          source="ai_en_form"
          className="font-semibold text-accent-700 hover:underline"
        >
          Message us on WhatsApp
        </WhatsAppLink>
      </p>
    </form>
  )
}
