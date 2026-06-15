# Solman Digital — Monetization & Geliştirme Raporu

> Otonom geliştirme loop'u tarafından üretilir ve her iterasyonda güncellenir.
> Veri kaynağı: GA4 (`/api/dashboard/today`, `/api/ga4`) + Google Ads API.
> Amaç: gerçek trafik/dönüşüm verisiyle beslenip monetization odaklı geliştirme.

**Son güncelleme:** 2026-06-16 (Iteration 2)
**Veri penceresi:** Son 30 gün

---

## 1. Veri Anlık Görüntüsü (Son 30 gün)

| Metrik | Değer | Yorum |
|---|---|---|
| Oturum | 685 | — |
| Kullanıcı | 669 (667 yeni) | Neredeyse tamamı yeni |
| Sayfa görüntüleme | 851 | Kişi başı ~1.27 → derinlik düşük |
| Genel bounce | **%73** | Yüksek |
| Paid (cpc) oturum | 369 (%54) | Trafiğin yarısından fazlası ücretli |
| Paid bounce | **%81** | Çok yüksek — para sızıntısı |
| Ort. oturum süresi | ~15 sn | Çok kısa |
| `generate_lead` | 5 | — |
| `qualify_lead` | **0** | ⚠️ Ads'e bağlı dönüşüm — bkz. Bulgu #1 |
| `contact` / `whatsapp_click` | 0 / 0 | Ölçüm eksik — bkz. Bulgu #2 |

**Dönüşüm oranı:** 5 / 685 ≈ **%0.73** (paid'de daha da kötü).

### En çok görüntülenen sayfalar (bounce)
| Sayfa | PV | Bounce |
|---|---|---|
| /ai-otomasyon-hizmeti | 146 | **%82** |
| /contact | 127 | %50 |
| / | 116 | %52 |
| /fiyatlar | 86 | **%87** |
| /ucretsiz-analiz | 82 | %58 |
| /portfoy | 73 | %53 |
| /hakkimizda | 51 | %43 |
| /iletisim | 48 | %31 |

---

## 2. Kritik Bulgular

### Bulgu #1 — Dönüşüm event'leri navigasyonda kayboluyor (ÇÖZÜLDÜ ✅)
Tüm lead formları `gtag("qualify_lead", …)` çağırıp **hemen** `router.push("/tesekkurler")`
yapıyordu. gtag fire-and-forget olduğundan navigasyon, GA4 collect isteğini iptal ediyordu →
`qualify_lead` 30 günde **0** kez kaydedildi. **Google Ads bu dönüşüme bağlı** olduğu için
kampanya sıfır sinyalle optimize etmeye çalışıyordu; %81 paid bounce + boşa harcamanın asıl nedeni.
**Çözüm:** `lib/analytics.ts` içinde `transport_type: "beacon"` eklendi → event `navigator.sendBeacon`
ile sayfa değişse bile GA4'e ulaşıyor.

### Bulgu #2 — `contact` dönüşümü hiç ölçülmüyordu (ÇÖZÜLDÜ ✅)
`/contact` (127 PV) ve `/iletisim` formları yalnızca `form_submit` atıyordu; dashboard'un izlediği
Ads-bound `qualify_lead` event'i tetiklenmiyordu. ContactForm + ContactFormEn artık
`trackLeadConversion()` çağırıyor.

### Bulgu #3 — Kırık EN Calendly route'u (ÇÖZÜLDÜ ✅)
GA4'te `/en/﻿https:/calendly.com/solmandigital/30min` görüldü → `NEXT_PUBLIC_CALENDLY_URL`
env değerinde BOM (`﻿`) var; `<a href>` göreli URL'e dönüşüyordu. `site-config.ts`
değeri sanitize ediyor.

### Bulgu #4 — Google Ads API token süresi dolmuş (KULLANICI AKSİYONU GEREKİR ⛔)
`/api/dashboard/today` → `ads: "Error: invalid_grant"`. `GOOGLE_ADS_REFRESH_TOKEN` yenilenmeli.
**Kullanıcı yapmalı:** `/api/google-ads/auth` üzerinden OAuth onayını tekrarla (tarayıcı consent
gerektirir, koddan çözülemez). Çözülene kadar Ads tarafı kör; geliştirme GA4 verisiyle sürüyor.

### Bulgu #5 — Yüksek-trafik / yüksek-bounce sayfalar (AÇIK)
`/fiyatlar` (%87) ve `/ai-otomasyon-hizmeti` (%82) en büyük sızıntılar. Sıradaki iterasyonların
CRO hedefi.

---

## 3. Yapılanlar (Iteration 1)
- [x] `lib/analytics.ts` — beacon transport ile dönüşüm event kaybı giderildi
- [x] ContactForm + ContactFormEn — `qualify_lead` dönüşümü bağlandı
- [x] `site-config.ts` — Calendly BOM sanitize
- [x] Bu rapor oluşturuldu

## 4. Roadmap (öncelik sırası)
1. ~~**`/fiyatlar` CRO**~~ ✅ Iteration 2 (commit a290477) — paket CTA→on-page form, güven şeridi, form çerçevesi.
2. **`/ai-otomasyon-hizmeti` CRO** (%82 bounce, 146 PV — #1 landing) — above-the-fold değer + form. **← SIRADAKİ**
3. **Exit-intent / mikro-conversion** — bounce eden trafiğin bir kısmını yakala (ExitIntentPopup mevcut, /fiyatlar+/ai'de devrede mi kontrol et).
4. **Google Ads re-auth sonrası** — kampanya/keyword/negatif optimizasyonu (token gelince).
5. **İç linkleme & içerik derinliği** — ~1.27 PV/kullanıcı çok düşük; rehber↔hizmet çapraz linkleme.

## 4b. Iteration 2 (tamamlandı, commit a290477)
/fiyatlar: tier CTA'ları #fiyat-form'a kaydırır (cross-page friction kaldırıldı), risk-reversal
güven şeridi, inline form değer başlığı + "bağlayıcı değil" copy ile çerçevelendi. Build yeşil.

## 5. Loop Notları
- Mod: otonom, dinamik tempolu; sürekli çalışır, kısa aralık.
- Her iterasyon: veri çek → çıkarım → çok-görevli batch uygula → build → commit → rapor güncelle → replan.
- Dev server arkaplanda (`localhost:3000`) veri çekimi için ayakta tutulur.
