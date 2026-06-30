"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { trackFormView, trackFormStart } from "@/lib/analytics"

/**
 * Lead form huni ölçümü. form_view (form GERÇEKTEN viewport'a girince) + form_start
 * (ilk etkileşim) event'lerini ekler. `label`, formun form_submit/qualify_lead
 * label'ı ile AYNI olmalı — GA4'te tek huni (form_view → form_start → form_submit → qualify_lead).
 *
 * KRİTİK: form_view artık mount'ta değil, IntersectionObserver ile form ekrana
 * girdiğinde tetiklenir. Sayfanın altındaki/hiç görülmeyen formlar form_view
 * üretmez → huni denominatörü gerçekçi olur (eski sürümde mount'ta tetiklenip
 * şişiyordu: 687 view → 28 start gibi yanıltıcı oranlar).
 *
 * Kullanım:
 *   const { markStart, formRef } = useFunnelTracking("fiyat-talebi")
 *   ...
 *   <form ref={formRef} onSubmit={...}>
 *   const handleChange = (e) => { markStart(); setForm(...) }
 */
export function useFunnelTracking(label: string): {
  markStart: () => void
  formRef: (node: HTMLElement | null) => void
} {
  const started = useRef(false)
  const viewed = useRef(false)
  const [node, setNode] = useState<HTMLElement | null>(null)

  // Callback ref — form DOM'a bağlanınca node state'i güncellenir.
  const formRef = useCallback((n: HTMLElement | null) => setNode(n), [])

  useEffect(() => {
    if (!node || viewed.current) return

    // IntersectionObserver yoksa (çok eski tarayıcı) mount'ta tetikle — geriye dönük güvenli.
    if (typeof IntersectionObserver === "undefined") {
      viewed.current = true
      trackFormView(label)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewed.current) {
            viewed.current = true
            trackFormView(label)
            obs.disconnect()
          }
        }
      },
      { threshold: 0.3 } // formun en az %30'u görününce say
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [node, label])

  const markStart = useCallback(() => {
    if (started.current) return
    started.current = true
    trackFormStart(label)
  }, [label])

  return { markStart, formRef }
}
