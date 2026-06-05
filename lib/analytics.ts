export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window === "undefined") return
  if (typeof (window as unknown as { gtag?: unknown }).gtag !== "function") return
  ;(window as unknown as { gtag: (cmd: string, action: string, params: Record<string, unknown>) => void }).gtag(
    "event",
    action,
    { event_category: category, event_label: label }
  )
}
