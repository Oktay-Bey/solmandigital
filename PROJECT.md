# Solman Digital — Proje Keşif Dokümantasyonu

**Son güncelleme:** 2026-05-29  
**Güncel faz:** Faz 1 tamamlandı, Faz 2 başlangıç  
**Repo:** `c:\Users\90534\Desktop\solmandigital`

---

## Proje Özeti

Solman Digital'in kurumsal + lead generation web sitesi. Hedef: organik SEO trafiğini segmentli lead funnellara yönlendirip Resend ile e-posta otomasyonuna taşımak. Türkçe içerik, single-operator yapı ("yazılım ofisi" framing).

---

## Tech Stack

| Katman | Teknoloji | Versiyon |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| UI | React | 19.2.4 |
| Dil | TypeScript | ^5 |
| Stil | Tailwind CSS | v4 |
| E-posta | Resend + React Email | resend ^6.12 |
| İkon | lucide-react | ^1.17 |
| Deploy | Vercel | — |
| Analytics | Google Analytics 4 | G-H2QM5NPTED |

> **Not:** Next.js 16 — breaking changes var. Kod yazmadan önce `node_modules/next/dist/docs/` okunmalı.

---

## Dizin Yapısı

```
solmandigital/
├── app/                    # App Router sayfaları
│   ├── api/email/          # E-posta API rotaları
│   ├── [landing pages]/    # SEO funnel sayfaları
│   ├── layout.tsx          # Root layout (GA4, schema.org)
│   ├── page.tsx            # Anasayfa
│   ├── sitemap.ts
│   └── robots.ts
├── components/             # Paylaşılan UI bileşenleri
├── lib/
│   ├── data/               # services.ts, leadMagnets.ts, downloads.ts
│   ├── types/leads.ts      # Lead payload type'ları
│   ├── site-config.ts      # Merkezi config (URL, e-posta, Calendly, keys)
│   └── form-utils.ts       # Form styling utilities
├── emails/                 # React Email şablonları
└── public/                 # Statik dosyalar
```

---

## Sayfalar & Rotalar

| Rota | Amaç | Lead Formu |
|---|---|---|
| `/` | Anasayfa | — |
| `/hakkimizda` | Hakkımızda | LeadForm (genel) |
| `/hizmetler` | Hizmet listesi | — |
| `/hizmetler/[slug]` | Dinamik hizmet detay | — |
| `/portfoy` | Portföy | — |
| `/iletisim` | İletişim | ContactForm |
| `/danismanlik` | Danışmanlık / Calendly | Calendly embed |
| `/ucretsiz-analiz` | Ücretsiz analiz teklifi | AuditForm |
| `/web-sitesi-yaptirmak` | Web sitesi funnel | WebSiteLeadForm |
| `/saas-platform-gelistirme` | SaaS funnel | SaasLeadForm |
| `/ai-otomasyon-hizmeti` | AI otomasyon funnel | AILeadForm |
| `/trendyol-entegrasyonu` | Trendyol funnel | TrendyolLeadForm |
| `/istanbul-web-developer` | Lokal SEO funnel | IstanbulDevLeadForm |
| `/indir/[slug]` | İndirilebilir kaynak | DownloadForm |
| `/tesekkurler` | Form sonrası teşekkür | — |

---

## API Rotaları

| Endpoint | Method | Açıklama |
|---|---|---|
| `/api/email/lead` | POST | Tüm funnel lead formları |
| `/api/email/audit` | POST | Ücretsiz analiz formu |
| `/api/email/contact` | POST | İletişim formu |
| `/api/email/consultation` | POST | Danışmanlık formu |
| `/api/email/subscribe` | POST | Newsletter abonelik |

---

## Lead Funnel Mimarisi

```
Landing Page (SEO keyword)
    → Segmentli Lead Form
        → /api/email/lead
            → Resend: bildirim e-postası
            → Resend: kişiye onay e-postası
            → Resend Audience: segmentli listeye ekleme
                → /tesekkurler
```

**Resend Audience Segmentleri:**

| Env Key | Segment |
|---|---|
| RESEND_AUDIENCE_ID | Master liste |
| RESEND_AUDIENCE_LEADS_WEB | Web sitesi funnelı |
| RESEND_AUDIENCE_LEADS_TRENDYOL | Trendyol funnelı |
| RESEND_AUDIENCE_LEADS_SAAS | SaaS funnelı |
| RESEND_AUDIENCE_LEADS_AI | AI otomasyon funnelı |
| RESEND_AUDIENCE_LEADS_ISTANBUL | İstanbul lokal funnelı |
| RESEND_AUDIENCE_LEADS_AUDIT | Ücretsiz analiz |
| RESEND_AUDIENCE_LEADS_CONSULTATION | Danışmanlık |
| RESEND_AUDIENCE_SUBSCRIBERS | Newsletter |

---

## Bileşenler

| Bileşen | Açıklama |
|---|---|
| `Header.tsx` | Navigasyon header |
| `Footer.tsx` | Footer |
| `ContactForm.tsx` | İletişim formu |
| `LeadMagnetBanner.tsx` | Lead mıknatıs banner |
| `NewsletterForm.tsx` | Newsletter formu |
| `ServiceCard.tsx` | Hizmet kartı |
| `ServiceDetail.tsx` | Hizmet detay |
| `Testimonials.tsx` | Referanslar |

---

## Veri Katmanı (`lib/data/`)

- **`services.ts`** — 30+ hizmet tanımı (slug, başlık, açıklama, meta, kategori)
- **`leadMagnets.ts`** — Kategoriye göre lead mıknatıs tanımları
- **`downloads.ts`** — İndirilebilir kaynaklar (e-ticaret rehberi PDF vb.)

---

## Merkezi Config

- **`lib/site-config.ts`** — Site adı, URL'ler, e-posta adresleri, Calendly URL, sosyal linkler, keywords. Tüm değişiklikler buradan.
- **`lib/form-utils.ts`** — Tutarlı form Tailwind class'ları ve focus/blur handler'ları.
- **`.env.local`** — API anahtarları (Resend, Calendly, GA, Google verification).

---

## Faz Durumu

### ✅ Faz 0 — Altyapı (Tamamlandı: 2026-05-29)
- Next.js 16 + React 19 + Tailwind v4 kurulumu
- Vercel deploy pipeline
- Git repo

### ✅ Faz 1 — Core Site + Lead Funnel (Tamamlandı: 2026-05-29)
- Tüm temel sayfalar (anasayfa, hakkımızda, hizmetler, portföy, iletişim)
- 5 SEO funnel landing page
- Unified lead capture API + Resend entegrasyonu + audience segmentasyonu
- Google Analytics 4 (G-H2QM5NPTED)
- Schema.org yapısal veri
- Sitemap + robots.txt
- Testimonials, form utils, LeadMagnetBanner

### 🔄 Faz 2 — Büyüme & Optimizasyon (Başlıyor)
Olası öncelikler:
- [ ] Blog / içerik pazarlaması
- [ ] Portföy içeriklerinin doldurulması
- [ ] İndirilebilir kaynakların genişletilmesi
- [ ] Daha fazla lokal SEO sayfası
- [ ] E-posta otomasyon akışları (Resend sequences)
- [ ] Conversion optimizasyonu / A/B test

---

## Bilinen Eksikler / Açık Noktalar

- Portföy sayfası var, gerçek içerik henüz doldurulmadı
- Blog / içerik pazarlaması rotası yok
- `indir/[slug]` için kaç kaynak aktif olduğu belirsiz
- Calendly entegrasyonu production'da test edilmeli

---

## Güncelleme Rehberi

Bu dosyayı şu durumlarda güncelle:
1. Yeni bir faz başladığında → **Faz Durumu** bölümü
2. Yeni rota / sayfa eklendiğinde → **Sayfalar & Rotalar** tablosu
3. Yeni bileşen veya API eklendiğinde → ilgili tablo
4. Stack değişikliği olduğunda → **Tech Stack** tablosu
