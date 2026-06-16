// Bağımlılıksız, in-memory rate limiter. Lead pipeline'ı (form spam'i + Brevo/Resend
// kota suistimali) hızlı-ardışık isteklere karşı korur. Vercel Fluid Compute instance'ları
// yeniden kullandığından bu katman tek-kaynaktan rapid-fire'ı engeller. (Dağıtık tam koruma
// için ileride Upstash Redis eklenebilir.)

type Bucket = { count: number; resetAt: number }

const store = new Map<string, Bucket>()
let lastPrune = 0

function prune(now: number) {
  // Süresi dolmuş kovaları ara sıra temizle (bellek sızıntısını önle).
  if (now - lastPrune < 60_000) return
  lastPrune = now
  for (const [k, b] of store) {
    if (now > b.resetAt) store.delete(k)
  }
}

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  prune(now)

  const b = store.get(key)
  if (!b || now > b.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }
  if (b.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) }
  }
  b.count++
  return { ok: true, retryAfter: 0 }
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}
