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

type GtagFn = (cmd: string, action: string, params: Record<string, unknown>) => void

function gtag(action: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return
  if (typeof (window as unknown as { gtag?: unknown }).gtag !== "function") return
  ;(window as unknown as { gtag: GtagFn }).gtag("event", action, params)
}

export function trackEvent(action: string, category: string, label?: string) {
  gtag(action, { event_category: category, event_label: label })
}

export function trackLeadConversion(label: string) {
  // GA4 event — Google Ads conversion action "solmandigitaltr (web) qualify_lead" buna bağlı
  gtag("qualify_lead", { event_label: label, value: 1, currency: "TRY" })
}
