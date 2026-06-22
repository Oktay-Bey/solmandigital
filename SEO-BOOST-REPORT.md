# SEO Boost Loop — Yaşayan Durum Dosyası

> Otonom SEO geliştirme loop'unun durum dosyası. Her iterasyonda güncellenir.
> **Misyon:** Gerçek veriyle (GA4 organik + Ads Keyword Planner) yeni organik kanallar
> aç (öncelik) + mevcut sayfaları iyileştir (ikincil). Değişiklikler live gider.
> İlgili: [[project-monetization-loop]], [[project-ads-landing-strategy]], [[project-brand-voice]]

## Veri kaynakları (ikisi de canlı, doğrulandı)
- **GA4 organik:** `GET /api/ga4?seo=1&days=28` → `sessionDefaultChannelGroup=Organic Search`
  bazında landing page performansı + kanal dağılımı. (lib/google-analytics-data.ts → getGA4OrganicReport)
- **Ads Keyword Planner:** `POST /api/google-ads/keyword-ideas` {seeds, geoTargetConstantId:2792, languageId:1037}
  → hacim + rekabet + teklif. (TR geo=2792, dil TR=1037/EN=1000/AR=1043)
- **İndeksleme:** `POST /api/indexnow` (header `x-indexnow-secret`) → IndexNow+Bing+Yandex.
  `POST /api/google-index` (header `x-google-index-secret`) → Google Indexing API.

## Loop ritmi
veri çek → fırsat çıkar (yeni kanal öncelik) → çok-görevli batch → `npx next build` (yeşil) →
commit → `git push origin master` (Vercel auto-deploy) → deploy canlı doğrula → IndexNow submit →
raporu güncelle → replan.

## Operasyonel notlar (tuzaklar)
- **DNS:** googleapis Node'da IPv6'da takılıyor (ENOTFOUND). Dev server'ı
  `NODE_OPTIONS="--dns-result-order=ipv4first" npm run dev` ile başlat. Keyword Planner çağrıları
  yavaş + intermittent → retry loop (4 deneme, 90s timeout).
- **git push:** repo `Oktay-Bey`'e ait; gh aktif hesap `sosdream111-png` olabilir → push öncesi
  `gh auth switch --user Oktay-Bey && gh auth setup-git`.
- **/tmp** Windows Node'da çözülmez; geçici JSON'ları repo köküne `build_seo_*.json` yaz.
- Rehber render Article+FAQPage+Breadcrumb schema'yı otomatik üretir (app/rehber/[slug]/page.tsx).
  Yeni içerik = `lib/data/rehber.ts` rehberPosts dizisine RehberPost objesi ekle; sitemap otomatik.

---

## Iteration 1 — 2026-06-22 (commit 67d60ca, DEPLOY CANLI ✅)

### Veri snapshot (GA4, son 28 gün)
Kanal dağılımı: Paid Search 406 · Direct 331 · Email 129 · Unassigned 17 ·
**Organic Search 11** · Cross-network 9 · Referral 5 · Organic Social 1.
→ **Organik pay ~%1.2. Organik kanal pratikte KAPALI.** 31 rehber + 27 İstanbul + 30 hizmet
sayfası var ama 28 günde organik sadece 6 sayfaya giriş almış, hiçbiri 1-4 oturumu geçmemiş.

### Kök teşhis
Sorun içerik eksikliği değil (içerik var) — **keşfedilebilirlik + doğru long-tail hedefleme + indeksleme.**
Mevcut içerik yüksek-hacimli alıcı-niyetli sorgulara denk gelmiyor.

### Keyword Planner fırsatları (gerçek, geo 2792)
- **`stok takip programı` 1900/ay MEDIUM** — sitede sayfa YOK (temiz boşluk, yeni kanal).
  Küme: depo stok programı 170, excel stok takip 170, ücretsiz stok programı 170...
- **`google reklam ajansı` 1300/ay MEDIUM** + google ads ajansı 390 + google partner ajans 170.
- `e ticaret sitesi kurma` 1600/ay MEDIUM (mevcut e-ticaret içeriğiyle kısmen kapsanıyor).

### Yapılanlar (batch)
1. `/api/ga4?seo=1` organik SEO teşhis endpoint'i (loop veri belkemiği).
2. Yeni rehber: **stok-takip-programi-rehberi** (saas) — 1900/ay boşluk.
3. Yeni rehber: **google-reklam-ajansi-mi-kendiniz-mi** (dijital-pazarlama) — 1300/ay boşluk.
4. Çift yönlü internal linkleme: google-ads-vs-seo → reklam ajansı; marketplace → stok takip.
5. Build yeşil → push → deploy canlı (200 doğrulandı) → IndexNow submit (Bing/IndexNow 200, Yandex 202).

### Açık doğrulama (sonraki iterasyon ölçecek)
- Yeni 2 rehber Google'da indekslendi mi → `/api/ga4?seo=1` organik landing'de görünüyor mu (7-14 gün).
- Organik toplam oturum 11'den yükseliyor mu.

### Replan — sonraki iterasyon adayları
- **Yeni kanal (öncelik):** CRM yazılımı, randevu sistemi, ön muhasebe, WhatsApp otomasyon
  kümelerini Keyword Planner'dan tara → boşluk olanlara rehber. Hizmet sayfası gerekiyorsa landing.
- **İyileştirme:** organikte giriş alıp engagement düşük sayfaları güçlendir; `(not set)` landing
  (3 oturum, bounce 1.0) kaynağını araştır.
- Mevcut yüksek-potansiyelli rehberlere FAQ/summary genişletme (AI arama görünürlüğü).
