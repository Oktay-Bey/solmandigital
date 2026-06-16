"use client"

import { useEffect, useRef, useCallback } from "react"
import { trackFormView, trackFormStart } from "@/lib/analytics"

/**
 * Lead form huni ölçümü. Tek satırla form_view (mount) + form_start (ilk etkileşim)
 * event'lerini ekler. `label`, formun mevcut form_submit/qualify_lead label'ı ile
 * AYNI olmalı — GA4'te tek bir huni (form_view → form_start → form_submit → qualify_lead).
 *
 * Kullanım:
 *   const markStart = useFunnelTracking("fiyat-talebi")
 *   const handleChange = (e) => { markStart(); setForm(...) }
 */
export function useFunnelTracking(label: string): () => void {
  const started = useRef(false)

  useEffect(() => {
    trackFormView(label)
    // label değişmez (form başına sabit) — yalnızca mount'ta bir kez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markStart = useCallback(() => {
    if (started.current) return
    started.current = true
    trackFormStart(label)
  }, [label])

  return markStart
}
