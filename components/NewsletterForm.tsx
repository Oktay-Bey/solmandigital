"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import type { SubscribePayload } from "@/lib/types/leads"

type FormState = "idle" | "sending" | "success" | "error"

type Props = {
  variant: "light" | "dark"
  source: SubscribePayload["source"]
  heading?: string
  subtext?: string
}

export default function NewsletterForm({ variant, source, heading, subtext }: Props) {
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ firstName: "", email: "" })

  const isDark = variant === "dark"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")

    const payload: SubscribePayload = {
      email: form.email,
      firstName: form.firstName || "Değerli Kullanıcı",
      source,
    }

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      setState(res.ok ? "success" : "error")
      if (res.ok) setForm({ firstName: "", email: "" })
    } catch {
      setState("error")
    }
  }

  const inputCls = `input flex-1 min-w-0 ${isDark ? "input-dark" : ""}`

  if (state === "success") {
    return (
      <div className="flex items-center gap-2.5">
        <CheckCircle2 size={18} color="#16a34a" />
        <p className={`text-[0.875rem] font-semibold ${isDark ? "text-ondark-muted" : "text-ink-600"}`}>
          Teşekkürler! Rehber e-postanıza gönderildi.
        </p>
      </div>
    )
  }

  return (
    <div>
      {heading && (
        <h3 className={`mb-1.5 text-base font-extrabold tracking-tight ${isDark ? "text-ondark" : "text-ink-900"}`}>
          {heading}
        </h3>
      )}
      {subtext && (
        <p className={`mb-4 text-[0.85rem] leading-relaxed ${isDark ? "text-ink-500" : "text-ink-500"}`}>
          {subtext}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2.5">
        <input name="firstName" type="text" placeholder="Adınız" value={form.firstName} onChange={handleChange} className={inputCls} />
        <input name="email" type="email" required placeholder="E-posta adresiniz *" value={form.email} onChange={handleChange} className={inputCls} />
        <button type="submit" disabled={state === "sending"} className="btn btn-primary shrink-0 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-80">
          {state === "sending" ? "Gönderiliyor…" : "İndir"}
          {state !== "sending" && <ArrowRight size={14} />}
        </button>
      </form>
      {state === "error" && (
        <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-accent-600">
          <AlertCircle size={13} /> Hata oluştu, tekrar deneyin.
        </p>
      )}
    </div>
  )
}
