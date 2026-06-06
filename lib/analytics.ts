export function getGclid(): string | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search).get("gclid");
  if (p) {
    document.cookie = `gclid=${p};max-age=2592000;path=/`;
    return p;
  }
  const m = document.cookie.match(/(?:^|;\s*)gclid=([^;]+)/);
  return m ? m[1] : null;
}

export function trackEvent(action: string, category: string, label?: string) {
  if (typeof window === "undefined") return
  if (typeof (window as unknown as { gtag?: unknown }).gtag !== "function") return
  ;(window as unknown as { gtag: (cmd: string, action: string, params: Record<string, unknown>) => void }).gtag(
    "event",
    action,
    { event_category: category, event_label: label }
  )
}
