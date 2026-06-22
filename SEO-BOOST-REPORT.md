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
  `NODE_OPTIONS="--dns-result-order=ipv4first" npm run dev` ile başlat.
- **KP timeout:** Keyword Planner sunucu yanıtı ~90s'yi aşabiliyor (server 200 döner ama curl
  --max-time 90 keser → boş body). **curl --max-time 160 kullan**; çok seed = uzun süre.
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

---

## Iteration 2 — 2026-06-22 (commit 51340a8, DEPLOY CANLI ✅)

### Keyword Planner cluster taraması (1700 fikir, geo 2792)
Seed kümesi: crm/randevu/muhasebe/whatsapp/kargo/müşteri takip.
- **Niyet tuzağı yakalandı:** "randevu sistemi" hacminin çoğu MHRS/hastane/üniversite/
  tapu/göç idaresi = mevcut kamu sistemini arayan, **alıcı değil**. Bu sorgulara içerik
  trafik getirir ama dönüşmez → elendi (geçmiş Ads niyet dersiyle tutarlı).
- **Alıcı sinyaller seçildi:** crm yazılımı 390 + crm programları 260/ay MEDIUM (₺50+ teklif);
  online randevu sistemi 320/ay (işletme kurma niyeti, kamu değil).

### Yapılanlar
1. Yeni rehber: **crm-yazilimi-rehberi** (saas) — temiz boşluk, dedike CRM içeriği yoktu.
2. Yeni rehber: **online-randevu-sistemi-rehberi** (saas) — mevcut hizmet sayfasını
   (`/hizmetler/rezervasyon-sistemi`) besliyor: içerik→hizmet internal link (dönüşüm köprüsü).
3. saas cluster çapraz linkleme (stok↔crm↔randevu birbirine bağlandı).
4. Build yeşil (142 sayfa) → push → deploy canlı (200) → IndexNow submit (OK).

---

## Iteration 3 — 2026-06-22 (commit f66363f, DEPLOY CANLI ✅)

### KP cluster (288 fikir: ön muhasebe/muhasebe/whatsapp/fatura/e-fatura/sipariş)
- **e fatura programı 590 + fatura kesme programı 480/ay MEDIUM** (₺48-285 = yüksek ticari değer) → temiz alıcı.
- **whatsapp toplu mesaj gönderme 2400/ay LOW** → hacim yüksek ama DIY/araç-kullanıcı niyeti baskın;
  "WhatsApp Business API işletme otomasyonu" çerçevesiyle alıcıya çevrildi (DIY tuzağına düşmeden).

### Yapılanlar
1. **e-fatura-entegrasyonu-rehberi** (e-ticaret) → `/hizmetler/api-entegrasyonu`'nu besler.
2. **whatsapp-isletme-otomasyonu** (yapay-zeka) → ai-chatbot/randevu cluster'ına bağlı.
3. Cluster internal link. Build yeşil (144 sayfa) → push → deploy canlı (200) → IndexNow OK.

---

## Iteration 4 — 2026-06-22 (commit c9ca706, DEPLOY CANLI ✅)

### Strateji değişimi: hizmet sayfası boşluk eşleme + sektörel
services.ts analizi → rehber-linki ALMAYAN hizmet sayfaları: uyelik-abonelik-sistemi,
dashboard-analitik, dijital-urun-satis, cok-dilli-web-sitesi (0 link). KP cluster (90 fikir).

### Yapılanlar
1. **kargo-entegrasyonu-rehberi** (e-ticaret) — kargo entegrasyonu 210/ay MEDIUM;
   e-ticaret operasyon cluster'ı tamamlandı (stok→e-fatura→kargo→iyzico). api-entegrasyonu besler.
2. **emlak-web-sitesi-rehberi** (web-sitesi) — emlak web sitesi 140+90/ay; ilk SEKTÖREL landing,
   bölgesel SEO açısı, kurumsal-web-sitesi besler.
3. Build yeşil (146 sayfa) → push → deploy canlı → IndexNow OK.

### Not: cluster doygunluğu
üyelik/abonelik/mobil uygulama KP'de zayıf hacim (TR'de düşük arama). Sektörel landing
(emlak işe yaradı) daha verimli yeni-kitle açma yolu olabilir → sonraki: restoran/klinik/kuaför.

---

## Iteration 5 — 2026-06-22 (commit 53eb31c, DEPLOY CANLI ✅)

### KRİTİK VERİ DERSİ: sektör+"web sitesi" TR'de ölü
KP doğruladı: restoran web sitesi 40/ay, kafe/diş/kuaför/güzellik salonu web sitesi = 0/ay.
emlak (140/ay) istisnaydı. → Sektörel landing'i "X web sitesi" diye yazmak BOŞA. Bunun yerine
**sektörün asıl İHTİYAÇ sorgusunu** hedefle (ihtiyaç-bazlı seed).

### Yapılanlar
- İhtiyaç-bazlı tarama → **adisyon programı 590/ay + cluster (~1500/ay toplam)** MEDIUM ₺52-157.
- **adisyon-programi-qr-menu-rehberi** (saas) → mevcut `/hizmetler/qr-menu-restoran` hizmet
  sayfasını besliyor (rehbersizdi). QR menü + online sipariş + komisyonsuz kanal açısı.
- Build yeşil (147 sayfa) → push → deploy canlı → IndexNow OK.

### Replan — sonraki iterasyon adayları
- **İhtiyaç-bazlı sektörel (web sitesi DEĞİL):** kuaför/güzellik → "salon randevu programı";
  klinik/diş → "klinik yönetim/hasta takip programı"; spor salonu → "üye takip programı";
  avukat → "büro/dava takip programı". Her birini KP ile DOĞRULA (hacim varsa yaz).
- **İyileştirme:** `(not set)` organik landing kaynağını araştır; düşük-engagement güçlendir.
- **Ölçüm (7-14g):** iter1-5 = 9 yeni rehber `/api/ga4?seo=1` organik landing'de; organik 11'den
  yükseliyor mu. İndekslenmeyeni /api/google-index ile tetikle.
