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
  // transport_type: "beacon" → onClick sonrası yeni sekme/navigasyon olsa bile
  // event navigator.sendBeacon ile GA4'e ulaşır (fire-and-forget kaybını önler).
  gtag(action, { event_category: category, event_label: label, transport_type: "beacon" })
}

export function trackLeadConversion(label: string) {
  // GA4 event — Google Ads conversion action "solmandigitaltr (web) qualify_lead" buna bağlı.
  // KRİTİK: formlar bu event'i tetikledikten hemen sonra router.push("/tesekkurler") çağırıyor.
  // transport_type: "beacon" olmadan navigasyon collect isteğini iptal ediyor → conversion kaybı.
  gtag("qualify_lead", { event_label: label, value: 1, currency: "TRY", transport_type: "beacon" })
}
