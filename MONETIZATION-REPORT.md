# Solman Digital — Monetization & Geliştirme Raporu

> Otonom geliştirme loop'u tarafından üretilir ve her iterasyonda güncellenir.
> Veri kaynağı: GA4 (`/api/dashboard/today`, `/api/ga4`) + Google Ads API.
> Amaç: gerçek trafik/dönüşüm verisiyle beslenip monetization odaklı geliştirme.

**Son güncelleme:** 2026-06-16 (Iteration 14 — konsolidasyon)

## 0. DEPLOY-HAZIR ÖZET (25 commit, build yeşil)
13 iterasyonun monetization işi tamamlandı ve canlıya çıkmayı bekliyor:
1. **Conversion ölçüm onarımı** — qualify_lead beacon transport (30 gündür kaybolan Ads sinyali),
   contact/exit-popup dönüşümleri, tek-atış model, event-adı tutarlılığı.
2. **CRO** — /fiyatlar (paket CTA→on-page form, güven şeridi), /ai + /ucretsiz-analiz split hero,
   AILeadForm buton grid, AuditForm friction azaltma.
3. **İçerik derinliği** — RelatedGuides (tüm ana landing + /fiyatlar + ~16 ilçe sayfası), çoklu
   kategori fallback, rehber key-bug fix + mid-CTA eşiği.
4. **WhatsApp ölçümü %100** — WhatsAppLink ile site geneli tıklama takibi (source bazlı).
5. **Pipeline koruması** — email API rate limiting (spam/kota suistimali).
6. **Veri bug** — Calendly BOM route fix.

**DEPLOY EDİLDİ ✅** (2026-06-16, commit 6b34a21 origin/master'a push edildi → Vercel auto-deploy).
Kalan gate: (b) deploy sonrası 24-48h GA4 `qualify_lead > 0` doğrulaması (It.1 fix'inin kanıtı).

**Google Ads re-auth ÇÖZÜLDÜ ✅** (It.15): eksik `/api/google-ads/callback` route'u eklendi
(commit bda4fb4), yeni refresh_token .env.local'e uygulandı, Ads API doğrulandı (4 kampanya).
Not: Ads = OAuth (service account Ads API'de çalışmaz); GA4 = service account. Mevcut kurulum doğru.
**Kullanıcı aksiyonu:** refresh_token Vercel env'ine de eklenecek (prod).
**Ads veri (7g):** tek aktif kampanya "Arama 2025" — 689 TL, 256 tık, %7.2 CTR, 0 dönüşüm
(ölçüm+CRO fix'i bugün canlıya çıktı → ileriye dönük düzelmeli).
**Sıradaki loop işi (Ads açıldı):** dönüşümler birikince search-term/negative keyword optimizasyonu,
Ads conversion action import teyidi.

> ⚠️ **DEPLOY BEKLİYOR:** Lokal `master`, `origin/master`'dan 12 commit ileride. Tüm bu
> session'ın monetization işi (conversion fix'leri, CRO, RelatedGuides) **canlıda değil**.
> `git push origin master` auto-mode tarafından engellendi (default branch'e push + production
> deploy özel yetki ister). Kullanıcı "push et" deyene veya Bash permission kuralı ekleyene kadar
> iş lokal birikiyor; GA4 `qualify_lead` doğrulaması da deploy sonrası mümkün.
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

## 4c. Iteration 3 (tamamlandı, commit c709fd9) — Ölçüm bütünlüğü
ExitIntentPopup (global) artık `qualify_lead` atıyor → exit-intent lead'leri Ads dönüşümü sayılır.
WhatsApp event adı `whatsapp_click` ile hizalandı; StickyCtaBar `cta_click`. Artık TÜM giriş
noktaları (form / contact / exit-popup / whatsapp) doğru ve beacon ile ölçülüyor.
**Sonuç:** Conversion measurement katmanı tamamlandı; bundan sonra gerçek CR iyileştirme.

## 4d. Iteration 4 (tamamlandı, commit 68f5713) — Bekleyen CRO'yu canlıya alma
Bitmiş ama commit edilmemiş conversion işi deploy edilmiyordu → /ai-otomasyon-hizmeti (#1 landing)
eski versiyonla ölçülüyordu. Ship edildi: AILeadForm buton grid, ai+ucretsiz-analiz split hero,
AuditForm firstName opsiyonel, TesekkurlerContent tek-atış (çift sayım önlendi), WhatsAppFloat event fix.
**⚠️ Doğrulama gerek:** 24-48h içinde GA4'te `qualify_lead` > 0 görünmeli. Hâlâ 0 ise GA4 admin'de
`qualify_lead` "key event" olarak kayıtlı mı + gtag yükleniyor mu derin debug gerekir.
**Not:** Google Ads route.ts/campaigns.ts ve EMAIL-OTOMASYON.md hâlâ uncommitted — ayrı konu,
karıştırılmadı.

## 4e. Iteration 5 (tamamlandı, commit 06b20ce) — İçerik derinliği iç linkleme
RelatedGuides component + getRehberByCategory helper. /ai-otomasyon-hizmeti'ye "yapay-zeka"
rehber bloğu (next-click → bounce ↓, PV/kullanıcı ↑). rehber/[slug]: React key warning fix +
mid-CTA eşiği 5→4. **Sıradaki:** RelatedGuides'ı diğer landing'lere yay (/fiyatlar→web-sitesi,
/web-sitesi-yaptirmak, /saas-platform-gelistirme, /trendyol-entegrasyonu).

## 4f. Iteration 6 (tamamlandı, commit 44e98fb) — RelatedGuides yayılımı
web-sitesi-yaptirmak / saas / trendyol landing'lerine ilgili rehber bloğu. getRehberByCategory
çoklu kategori fallback kabul ediyor (ince kategoriler komşudan tamamlanır). 4 ana landing artık
içeriğe iç link veriyor.
**Sıradaki:** (a) /fiyatlar dark-tema RelatedGuides (theme prop gerekir), (b) anasayfa CRO
(116 PV, %52 bounce), (c) GA4 verisini yeniden çek → qualify_lead > 0 doğrula (It.1+4 fix etkisi).

## 4g. Iteration 7 (tamamlandı, commit c61b4e5) — Dark RelatedGuides + deploy denemesi
RelatedGuides theme prop ("light"|"dark"); /fiyatlar'a dark blok. Artık 5 ana landing + fiyatlar
içeriğe iç link veriyor. Production push denendi → auto-mode engelledi (bkz. üstteki uyarı).
**Sıradaki:** anasayfa CRO (116 PV, %52 bounce), istanbul lokal sayfaları, deploy onayı sonrası
GA4 doğrulama.

## 4h. Iteration 8 (tamamlandı, commit e382ca0) — İzlenebilir WhatsApp + kalite taraması
Kalite taraması: başka key-bug/img-alt yok, codebase temiz. WhatsAppLink client component
oluşturuldu (whatsapp_click + source). Anasayfa + /fiyatlar inline WhatsApp anchor'ları geçirildi
→ WhatsApp lead kanalı artık ölçülüyor. **Sıradaki:** WhatsAppLink'i kalan landing'lere yay
(ai, web-sitesi, saas, trendyol, istanbul, contact), sonra anasayfa hero inline form / sosyal kanıt.

## 4i. Iteration 9 (tamamlandı, commit 83e2685) — WhatsAppLink yayılımı
ucretsiz-analiz, istanbul-web-developer, web-sitesi-yaptirmak, saas, trendyol WhatsApp anchor'ları
WhatsAppLink'e geçirildi. **Kalan wa.me (8):** contact, iletisim (kompleks blok), en/web-design,
en/ai-automation-service, en/white-label, portfoy, hakkimizda, istanbul-local → sıradaki tick.

## 4j. Iteration 10 (tamamlandı, commit 8d97a13) — WhatsApp ölçümü site geneli
contact, iletisim, hakkimizda, portfoy, istanbul-local, en/white-label WhatsApp anchor'ları
WhatsAppLink'e geçti. **WhatsApp ölçümü artık neredeyse site geneli.** Kalan: en/web-design +
en/ai-automation-service (waLink const, düşük trafik — opsiyonel).
**Sıradaki yüksek-değer:** anasayfa hero inline form / sosyal kanıt CRO; ilçe sayfalarına
RelatedGuides. **Not:** ~20 commit deploy bekliyor — deploy-bağımsız yüksek-değer iş azalıyor.

## 4k. Iteration 11 (tamamlandı, commit 8ccb7e6) — İlçe sayfalarına RelatedGuides
IstanbulLocalPage şablonuna RelatedGuides eklendi → ~16 lokal SEO sayfası tek edit'le içerik
derinliği kazandı. **Sıradaki:** en/web-design + en/ai-automation-service waLink→WhatsAppLink
(WhatsApp ölçümünü %100 tamamlar), sonra deploy-bağımsız yüksek-değer iş büyük ölçüde biter →
asıl gate kullanıcı deploy onayı.

## 4l. Iteration 12 (tamamlandı, commit b022849) — WhatsApp ölçümü %100
en/web-design + en/ai-automation-service waLink→WhatsAppLink. Tüm site WhatsApp tıklamaları izleniyor.

## 4m. Durum & Açık Backlog (Iteration 12 sonu)
**Tamamlanan (lokal, deploy bekliyor — ~24 commit):** conversion ölçüm onarımı (qualify_lead beacon,
contact, exit-popup, tek-atış), /fiyatlar + /ai CRO, RelatedGuides (tüm ana landing + fiyatlar +
~16 ilçe), site geneli WhatsApp ölçümü.
**Kullanıcı-gate'li:** deploy (push onayı), GA4 qualify_lead doğrulaması (deploy sonrası),
Google Ads re-auth (OAuth).
**Sıradaki deploy-bağımsız yüksek-değer (PROJECT.md Faz 2B):** ~~(1) rate limiting~~ ✅ It.13,
(2) per-page OG görselleri, (3) görünür breadcrumb komponenti, (4) anasayfa hero inline lead CRO.

## 4n. Iteration 13 (tamamlandı, commit 31f8ced) — Email API rate limiting
lib/rate-limit.ts (in-memory, 5 istek/60sn/IP) → lead/audit/contact/consultation/subscribe/popup
korundu. Form spam + Brevo/Resend kota suistimali engellenir (429 + Retry-After).

## 5b. CEO Notu — Yöntem (geçmiş raporlardan)
PROJECT.md'deki çalışma yöntemi: faz bazlı, etki/efor önceliklendirilmiş backlog, checkbox takibi,
canonical durum dosyası. Bu loop aynısını MONETIZATION-REPORT.md ile sürdürür. Monetization hattı:
SEO trafiği → landing → form/qualify_lead → e-posta funnel → satış. Şu an darboğaz: landing bounce
(%73-87) ve düşük CR (%0.7). Ölçüm artık doğru → sıradaki kaldıraç #1 trafik sayfasının CR'si.

## 5. Loop Notları
- Mod: otonom, dinamik tempolu; sürekli çalışır, kısa aralık.
- Her iterasyon: veri çek → çıkarım → çok-görevli batch uygula → build → commit → rapor güncelle → replan.
- Dev server arkaplanda (`localhost:3000`) veri çekimi için ayakta tutulur.
