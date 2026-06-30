"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertCircle } from "lucide-react"
import type { SubscribePayload } from "@/lib/types/leads"
import { trackEvent } from "@/lib/analytics"
import { useFunnelTracking } from "@/lib/useFunnelTracking"

type FormState = "idle" | "sending" | "error"

const labelCls =
  "mb-2 block text-[0.775rem] font-bold uppercase tracking-wide text-ink-600"

export default function DownloadForm() {
  const router = useRouter()
  const [state, setState] = useState<FormState>("idle")
  const [form, setForm] = useState({ firstName: "", email: "" })

  const { markStart, formRef } = useFunnelTracking("download")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    markStart()
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")

    const payload: SubscribePayload = {
      email: form.email,
      firstName: form.firstName,
      source: "download",
    }

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        trackEvent("form_submit", "lead", "download")
        router.push("/tesekkurler?type=newsletter")
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
        <label htmlFor="firstName" className={labelCls}>Adınız *</label>
        <input
          id="firstName" name="firstName" type="text" required
          value={form.firstName} onChange={handleChange}
          placeholder="Ahmet"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>E-posta Adresiniz *</label>
        <input
          id="email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="ahmet@firma.com"
          className="input"
        />
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 rounded-[7px] border border-accent-200 bg-accent-50 px-4 py-3.5 text-[0.875rem] text-accent-700">
          <AlertCircle size={16} />
          Gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.
        </div>
      )}

      <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-80">
        {state === "sending" ? "Gönderiliyor…" : "Ücretsiz İndir"}
        {state !== "sending" && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-[0.72rem] text-ink-400">
        Rehber e-posta adresinize gönderilir. Dilediğiniz an çıkabilirsiniz.
      </p>
    </form>
  )
}
