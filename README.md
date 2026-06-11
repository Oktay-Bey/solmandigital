# Solman Digital — Kurumsal Site + Lead Generation

**URL:** https://solmandigital.com.tr  
**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Vercel  
**Güncel faz:** Faz 2A tamamlandı (SEO), email outreach aktif (13 batch, ~443 mail)

---

## Geliştirme

```bash
npm run dev        # → http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

---

## Temel Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `PROJECT.md` | Proje yapısı, sayfalar, API rotaları, faz durumu |
| `EMAIL-OTOMASYON.md` | Cold outreach pipeline — altyapı, şablon, gönderim geçmişi |
| `AGENTS.md` | Claude Code için proje notları |
| `lib/site-config.ts` | Merkezi config (URL, email, Calendly, GA4) |
| `.env.local` | API anahtarları (Resend, Brevo, GA4) — git'e girmiyor |

---

## Email Outreach

White label development ortaklığı için uluslararası B2B cold outreach:

```bash
# Mail üret
node scripts/build-mails-batch-N.mjs

# Preview gönder (onay için)
node scripts/preview-batch-N.mjs

# Gerçek gönderim
node scripts/email-push.mjs scripts/leads-batch-N.json
```

Detay → `EMAIL-OTOMASYON.md`

---

## Deploy

Vercel'e bağlı — `main` branch'e push → otomatik deploy.  
Env değişkenleri Vercel dashboard'dan yönetilir.
