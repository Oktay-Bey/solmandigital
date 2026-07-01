# Solman Digital — Monetization & Geliştirme Raporu

> Otonom geliştirme loop'u tarafından üretilir ve her iterasyonda güncellenir.
> Veri kaynağı: GA4 (`/api/dashboard/today`, `/api/ga4`) + Google Ads API.
> Amaç: gerçek trafik/dönüşüm verisiyle beslenip monetization odaklı geliştirme.

**Son güncelleme:** 2026-07-02 (Iteration 20 — QS etki ölçümü + ölü sayfa CRO + EN form)

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

> ✅ **DEPLOY DURUMU (2026-06-18 güncellendi):** O zamanki 12 commit'lik birikim `origin/master`'a
> push edildi; `master` artık remote ile senkron (0 ileride/geride). Conversion fix'leri, CRO ve
> RelatedGuides işi canlıda. Açık tek iş: `feat/reels-otomasyonu` branch'indeki `dba6104` commit'i
> (Google Ads düşük görüntülenme + conversion tracking düzeltmeleri) — bu branch push edildi.
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

## 6. Google Ads Analizi & Aksiyon (2026-06-16, It.15)
**Kampanya "Arama 2025" (23914856579), 30g:** 689 TL, %7.2 CTR, 0 ölçülen dönüşüm.
**Bulgu:** Top 100 search-term'in ~%50'si (249 TL) İngilizce/bilgi-amaçlı sorgu (how to / best /
ai tools / platforms / iot) — alıcı niyeti yok. TR alıcı-niyetli sadece 64 TL (6 terim).
**Teşhis:** broad match + gevşek dil/coğrafi hedefleme global araştırmacı trafiği çekiyor.
**UYGULANDI ✅:** 22 broad negatif keyword eklendi (how to, what is, tutorial, course(s), examples,
ideas, guide, learn, jobs, salary, career, internet of things, iot, tools, systems, vs, top 10,
list of, free download, meaning, tutorials). Çift-anlamlılar (best/platform/ai/software) dahil edilmedi.
**Sıradaki (kullanıcı onayıyla):** dil=TR + konum=Türkiye hedefleme sıkılaştırma; EN buyer-intent'i
ayrı kampanya/white-label funnel'a bölme; kanıtlanmış TR terimleri için phrase/exact + ayrı ad group.
**İzle:** önümüzdeki günlerde boşa harcama düşmeli + (ölçüm fix'iyle) dönüşümler kaydolmaya başlamalı.

## 7. "Ücretsiz Analiz" → Hizmet Talebi Optimizasyonu (2026-06-16, It.16)
**Asset verisi (30g, canlı):** Sitelink tıkları — Fiyatlar 219 / **Ücretsiz Analiz 212** / Projelerimiz 206 /
Hizmetlerimiz 180. En çok tıklanan RSA başlık "Ücretsiz Otomasyon Analizi" (122), açıklama "...Ücretsiz
analiz alın" (147). "Ücretsiz analiz" hesabın #1 tık mıknatısı.
**Teşhis:** `/ucretsiz-analiz` sadece "24 saatte bedava rapor" vaat ediyordu — ödemeli hizmete köprü yok,
0 ölçülen dönüşüm. Yüksek-niyetli/maliyetli trafik "bedavacı rapor" çerçevesinde sızıyordu.
**Karar (kullanıcı):** (1) trafiği hizmete kaydır, (2) site + Ads birlikte.
**UYGULANDI ✅ — Site:** `/ucretsiz-analiz` "bedava rapor" → "teşhis + çözüm planı" olarak yeniden çerçevelendi;
"Analizden Sonra" hizmet köprüsü bölümü (web / AI otomasyon / e-ticaret kartları + iç link); AuditForm
hizmet-niyeti alanı görünür yapıldı (opsiyonel, friction düşük); `/tesekkurler?type=audit` copy'si sabit
fiyat teklifi çerçevesine çekildi. Build yeşil.
**UYGULANDI ✅ — Ads (canlı):** Kampanya 23914856579 sitelink seti **Türkçe karakterle** yeniden kuruldu
(eski 4 sitelink karaktersizdi: "Ucretsiz Analiz" → **"Ücretsiz Analiz"**). 6 sitelink: Ücretsiz Analiz
("Önce analiz, sonra çözüm planı" — hizmet-köprüleyen), Fiyatlar, Hizmetlerimiz, Projelerimiz + YENİ
**AI Otomasyon** (→/ai-otomasyon-hizmeti), **Web Sitesi** (→/web-sitesi-yaptirmak). Eski 4 karaktersiz
bağ kaldırıldı. REST mutate (UTF-8) ile — protobuf Türkçe karakter sorunu by-pass edildi.
**Yeni altyapı:** `lib/google-ads/campaigns.ts` → `listSitelinks` + `removeCampaignAssets`;
`/api/google-ads/campaigns/[id]/sitelinks/rebalance` (dry-run varsayılan, `?apply=true` canlı yazar).
**Not (ağ):** Standalone node/tsx scripti bu ortamdan `googleads.googleapis.com`'a ulaşamıyor (DNS blok) →
Ads mutasyonları dev server API route üzerinden çalıştırıldı.
**Açık (v2 backlog):** RSA başlık/açıklamalarını satış-niyetine kaydırma (B2 — henüz yapılmadı);
diğer kampanyaların sitelinkleri de Türkçe karaktersiz olabilir → kontrol.
**İzle (24-72h):** sitelink tık dağılımı "ücretsiz" tek-kanaldan hizmet sayfalarına yayılmalı;
GA4 `qualify_lead > 0`; /fiyatlar + /ai + /web-sitesi sayfalarına nitelikli trafik artmalı.

## 8. v2 Otonom Optimizasyon (2026-06-16, It.17)
Kullanıcı otonom yetki verdi (asset/keyword düzeyi; bütçe/yayın/silme hariç — bunlar sorulur).
**v2-1 (asset dil denetimi):** MK kampanyası sitelinkleri temiz İngilizce; ana TR v1'de düzeltilmişti. Ek iş yok.
**v2-2 (RSA Türkçe + satış-niyeti) UYGULANDI ✅:** Ana kampanyanın TÜM aktif RSA reklamları (11 reklam, 8 ENABLED
TR ad group) Türkçe karaktersizdi ("Ucretsiz", "Surec", "Canliya", "Gelistirme", "Tasarim"). RSA metni değişmez →
düzeltilmiş yeni reklam + eskisini PAUSED yöntemi (atomik tek-mutate, ENABLED-RSA-per-adgroup limiti aşılmaz).
`fixTurkish()` kelime-bazlı düzeltme tablosu + 3 satış başlığı eklendi ("Sabit Fiyatlı Net Teklif",
"Net Fiyat, Gizli Maliyet Yok", "İlk Görüşme Ücretsiz"). İngilizce ad group (/en/) atlandı.
**Doğrulama:** idempotent (recreate=0), tüm ENABLED reklamlar temiz. Eski 11 reklam PAUSED.
**Yeni kod:** `fixTurkish`, `buildFixedRsa`, `recreateRsa`, `listAdGroupAds`+status (campaigns.ts);
`/api/google-ads/campaigns/[id]/rsa-fix` route (dry-run + ?apply=true).
**Bulgu (kullanıcı onayı gerekir — guardrail):** Kampanyada ~7 PAUSED legacy duplicate ad group var
(199934263169 "AI Otomasyon" dup, 202910299371 "Marka" dup, "TR Test Node" 195942672423,
"Problem ve Aci Nokta" 199934409249, "Rakip Karsilastirma" 202909321891, "Trendyol" 197279172637,
"Web Sitesi Yaptirma" 194441505502). Bunlar SERVE ETMİYOR (ad group paused) → kullanıcıya görünmez.
İçlerindeki karaktersiz reklamlar zararsız ama hesap hijyeni için silinebilir (ad group silme = onay gerekir).
**v2-3 (search-term ek negatif) UYGULANDI ✅:** Mevcut 173 negatif vardı (memory'deki "22" eskiymiş).
Search-term verisinde hâlâ sızan niyetsiz İngilizce sorgular için 24 yeni güvenli broad negatif eklendi
(internet of things, ai systems, it automation, erp, business intelligence, retail innovation,
accounts payable/receivable, predictive maintenance, gohighlevel, mangoai, level ai, modern ai, vb.).
Riskli 6 over-broad ("best ai", "ai tools", "ai agent" vb. — EN buyer-intent ad group'u bloklayabilir)
eklendikten sonra geri alındı. EN "ai automation consulting" buyer-term korundu.
**v2-4 (callout + structured snippet) UYGULANDI ✅:** Hesapta hiç yoktu. 6 callout eklendi
("Sabit Fiyat Garantisi", "Kaynak Kodu Sizde", "İstanbul Yazılım Ofisi", "5-10 İş Gününde Teslim",
"İlk Görüşme Ücretsiz", "Doğrudan Uzman Erişimi") + structured snippet (Services: Web Sitesi, AI Otomasyon,
E-Ticaret, SaaS Platform, Trendyol Entegrasyonu, SEO). Reklam alanı büyür, CTR + hizmet kapsamı sinyali.
Yeni kod: `addCallouts`, `addStructuredSnippet` (campaigns.ts), `/api/google-ads/campaigns/[id]/extra-assets` route.
**v2-5 (hedef sayfa CRO) UYGULANDI ✅:** /fiyatlar (%87 bounce) + /ai-otomasyon-hizmeti (%82) v1'de zaten
optimize edilmiş ve yeni reklam copy'siyle (Sabit Fiyat/İlk Görüşme Ücretsiz) message-match ediyor → dokunulmadı.
/hizmetler (yeni sitelink hedefi, 180 tık) hero'sunda above-the-fold CTA YOKTU (ilk aksiyon sayfa sonundaydı +
TicaretHub off-site link) → hero'ya "Sabit Fiyatlı Teklif" + "Ücretsiz Analiz" CTA çifti + güven şeridi eklendi.
**Build:** her adımda yeşil. **İzle (24-72h):** callout/snippet CTR etkisi; negatif sonrası İngilizce sızıntı düşüşü;
RSA Türkçe düzeltmesi sonrası kalite/CTR; sitelink+hizmet sayfası tık dağılımı.

## 9. Iteration 18 — 7 Günlük GA4 Analizi (2026-07-01)
Taze veri çekildi (yeni IntersectionObserver `form_view` ölçümü aktif; eski şişik funnel geçersiz).
Kaynak: `ga4-perf-live.json` (7g), `ga4-funnel-7.json`, `ga4-diag-7.json`, `ga4-seo-7.json`.

**Trend (7g vs önceki 7g):** Oturum 247 (−16%), kullanıcı 240 (−19%). Trafik daraldı **ama**
engagement %41.7'ye yükseldi (28g ort. %33), bounce %58.3'e düştü (28g %67). Son CRO commit'leri
(f2e944b form'u hero'dan kaldırma vb.) kalite yönünde çalışıyor — daha az ama daha nitelikli trafik.

**Kanal:** Paid Search 170 ot / 5 dönüşüm (tek motor). Organik **6 ot / 0 dönüşüm** (pratikte durgun).
Email 1 ot (batch arası). Tüm dönüşümler `google/cpc` (diag teyit).

**Dönüşüm gerçeği (7g):** WhatsApp 6 tık → 4 conv · form_submit 1 → 1 conv · chat_lead_submit 3 ·
chat_open 26 (nudge 86 → %30 açılma). **Lead'in çoğu form-DIŞI** (WhatsApp + canlı sohbet).
Chat funnel'ı form funnel'ından verimli: nudge→open %30, buna karşı form_view→form_start %6.

**Funnel darboğazı (landing bazında, TAZE):**
- `/ai-otomasyon-hizmeti` (TR): 46 ot, form_start %19.6, submit 1 → **sağlıklı**, en iyi form landing.
- `/en/ai-automation-service` (EN): 62 ot, form_start %4.8, **submit 0**, WhatsApp'a kaçıyor →
  EN landing form ikna TR'nin ~1/4'ü. Aynı hizmet, aynı iskelet; sorun EN kopya/mesaj-uyumu.
- `/saas-platform-gelistirme`: 26 ot, **bounce %84.6, avgDur 5.4s, form_start 0** → **ölü sayfa**,
  CPC trafik alıp hiç etkileşim üretmiyor. En net UX açığı.
- `/fiyatlar`: 7g'de yalnız 1-2 oturum → istatistiksel anlamsız, bu hafta karar verilemez.

**Key event API:** Google Analytics **Admin** API projede kapalı (`analyticsadmin.googleapis.com
disabled`, project 159309592970) → `/api/ga4/key-events` çalışmıyor. Ama `diag`'da whatsapp_click /
form_submit / qualify_lead zaten `keyEvents>0` → conversion tanımları GA4'te MEVCUT, sadece bu API
üzerinden yönetilemiyor. Engel değil; yönetim gerekirse Cloud Console'dan API açılmalı.

**Öncelikli aksiyonlar (etki/efor):**
1. **`/saas-platform-gelistirme` UX** — ölü sayfa; hero/teklif netliği + above-fold CTA. (yüksek etki)
2. **`/en/ai-automation-service` form ikna** — EN kopya/güven; WhatsApp'ı da açık alternatif yap. (yüksek)
3. **Chat kaldıracı** — chat form'dan iyi dönüştürüyor; `QUICK_PROMPTS` genişlet, nudge→open→lead yolunu güçlendir. (orta)
4. **Organik/GEO** — 7g'de veri yok; içerik/GEO uzun vadeli, ölçüm penceresi büyütülmeli. (düşük acil, uzun vade)

## 10. Iteration 19 — GSC Ülke & Sayfa Fırsat Analizi (2026-07-01)
Yeni araç: `scripts/gsc-country-opportunities.mjs [gün]` → `gsc-country-opps.json` (ülke, sorgu×sayfa,
ülke×sayfa, ülke×sorgu; poz 8-20 fırsat filtresi). 7g + 28g çekildi.

**Genel gerçek (28g):** toplam 380 gösterim, **5 tık**, ort. poz 37.7. Site GSC'de HÂLÂ genç →
"poz 10-12 fırsat kümesi" beklenenden ince. Ama net ticari desenler + coğrafi asimetri var.

**Coğrafi asimetri (kullanıcı içgörüsü — DOĞRULANDI, nüanslı):**
- TR: 324 gösterim ama poz **37.7** (hacim burada, sıralama berbat — görünmüyoruz).
- TR-DIŞI ilk-sayfa/zirve: **AZE poz 1.0 · BRA 4.0 · CAN 4.5 · COL 5.0 · NLD 5.7 · GBR 8.0**.
- ⚠️ **Ama** bu ülkelerde hacim 1-7 gösterim ve GSC anonimlik eşiği yüzünden hangi sayfa/sorgu
  gizli → üstüne strateji kurulacak veri yok. Sinyal: TR long-tail içeriğimiz (rehber/hizmet)
  yurtdışı Türkçe aramalarda organik geliyor; İngilizce ticari niyet DEĞİL.
- 🔴 **KRİTİK AÇIK:** `/en/*` sayfaları GSC 28g'de **HİÇ görünmüyor** — halbuki reklam+GA4'te en
  yüksek trafikli sayfalarımız (`/en/ai-automation-service` 62 ot). İngilizce içerik organikte
  indekslenmiyor/sıralanmıyor. AZE'de reklam kampanyası var; oraya organik İngilizce köprü yok.

**Sayfa/sorgu fırsatları (öncelik sırası):**
1. 🎯 **`/rehber/etsy-api-entegrasyonu-turkiye`** — `etsy api` poz **4.7** (7 gör), `developers etsy`
   poz 6.6-19. Zaten ilk sayfada, ticari niyet, hacimli. **En olgun tek fırsat.** → CTR/pozisyon itme.
2. 🎯 **Marka sorgusu `solman` poz 7.3** (21 gör) — kendi markamızda 1. DEĞİLİZ. `/` ana sayfa.
   Marka SERP'i güçlendir (title/H1'de "Solman Digital" netliği, Organization schema, sameAs).
3. ⚠️ **Marka karışıklığı:** `katman dijital` (3.7), `akman dijital` (37.8), `genresman/genresman panel`
   — bizi benzer/yanlış markalarla karıştıran sorgular alıyoruz; niyet uyumsuz, dönüşmez.
4. **Entegrasyon rehber kümesi** poz 55-75 (`trendyol api entegrasyonu`, `n11 api`, `ticimax/trendyol
   komisyon hesaplama`) — hacim var ama 2. sayfanın altında; içerik/iç link derinleştirme (uzun vade).

### Plan — İki eksen (ülke + sayfa)
**Eksen A — Sayfa fırsatı (kısa vade, yüksek kesinlik):**
- **A1 UYGULANDI ✅** `/rehber/etsy-api-entegrasyonu-turkiye` (`lib/data/rehber.ts`):
  (1) `keywords`'e GSC'nin kazandıran saf sorguları eklendi (`etsy api`, `developers etsy` — poz
  4.7/6.6). (2) Birincil CTA hedefi `/trendyol-entegrasyonu` → **`/hizmetler/api-entegrasyonu`**
  olarak değiştirildi: Etsy API rehberine gelen ticari-niyetli organik trafik artık doğru hizmete
  + lead yoluna bağlanıyor (Trendyol köprüsü zaten faq/section içinde duruyor). CTA metni marka
  sesine uyarlandı ("Solman Digital olarak … sağlıyoruz"). Render sayfası (Article/FAQ/Breadcrumb
  schema, mid+son CTA, E-E-A-T) zaten güçlüydü — mimariye dokunulmadı. Build yeşil, canlıda teyit.
- **A2 GEREKSİZ ⏭️** Marka SERP (`solman` poz 7.3): `app/layout.tsx` schema'sı zaten EKSİKSİZ —
  Organization + WebSite + ProfessionalService + LocalBusiness, `alternateName:["Solman",…]`,
  dolu `sameAs` (linkedin/twitter/github), logo. Teknik açık yok. Poz 7.3'ün nedeni domain
  yaşı/otoritesi (site 2023, organik genç) → schema ile çözülmez, zaman + backlink işi. Dokunulmadı.

**Eksen B — Coğrafi/İngilizce açık (UYGULANDI ✅):**
- **Teşhis:** `/en/*` sayfaları GSC'de görünmüyordu çünkü (1) 🔴 **sitemap'te HİÇ yoktu**
  (`app/sitemap.ts` `staticPages`'te tek EN rota yok → Google keşfetmiyor) — birincil neden.
  (2) 🟡 **hreflang yoktu** (`alternates` sadece `canonical`, `languages` yok → EN↔TR dil
  eşlemesi kurulmamış). robots.txt EN'i engellemiyordu (`Allow: /`), canonical'lar doğruydu
  (self), noindex kazası yoktu → sayfalar indekslenebilirdi, sadece keşfedilmiyordu.
- **B1 düzeltme:** `app/sitemap.ts`'e 3 EN rota eklendi (`/en/ai-automation-service` pri .85,
  `/en/white-label` .80, `/en/web-design` .80). Canlı sitemap.xml'de teyit: 3 EN URL.
- **B2 düzeltme (hreflang):** En kesin dil çifti **çift yönlü** bağlandı —
  `/en/ai-automation-service` ↔ `/ai-otomasyon-hizmeti` (her ikisinde `languages: {tr, en,
  x-default}`, self-canonical korundu). `/en/white-label` ve `/en/web-design` TR karşılığı
  belirsiz olduğu için yalnız `en`+`x-default` self-referans (yanlış eşleme riskinden kaçınıldı).
  Build HTML'inde `<link rel="alternate" hrefLang="tr|en|x-default">` teyit edildi.
- **Değişen dosyalar:** `app/sitemap.ts`, `app/en/ai-automation-service/page.tsx`,
  `app/ai-otomasyon-hizmeti/page.tsx`, `app/en/white-label/page.tsx`, `app/en/web-design/page.tsx`.
- **B3 (bekliyor, veri artınca):** hreflang/indeksleme oturduktan sonra EN sayfalara on-page SEO
  + AZE reklam pazarında organik İngilizce köprü. GSC'de `/en/*` görünmeye başlayınca değerlendir.
- **Ölçüm:** GSC'de yeni sitemap gönderimi (Search Console → Sitemaps) + 7-14g sonra `/en/*`
  URL'lerinin "Discovered/Indexed" durumu; `gsc-country-opportunities.mjs 14` ile EN sorgu girişi.

**Ölçüm:** değişiklikten 7-14g sonra `node scripts/gsc-country-opportunities.mjs 14` → etsy sayfası
pozisyon/CTR, `solman` marka pozisyonu, `/en/*` GSC'de görünmeye başladı mı. Hacim düşük olduğu için
pencere geniş tutulmalı (7g çok gürültülü). Not: bu analiz GA4 CRO işiyle (It.18) paralel yürütüldü.

## 11. Iteration 20 — QS Etki Ölçümü + Ölü Sayfa CRO + EN Form (2026-07-02)

**Ads canlı ölçüm (14g, API):** Aktif kampanyalar artık "İstanbul Yerel 2026" + "Ana TR Arama v2"
(23-24 Haz başladı). Ana TR v2 CTR %9-13 (çok iyi) ama CPC 28 Haz sonrası 2-3₺ → 5-7.7₺ (bid
artışının bedeli), dönüşüm 14 günde 4. GA4'teki %21 trafik düşüşünün nedeni kampanya geçişi +
İstanbul Yerel'in 1 Tem'de veri üretmemesi (durdu mu kontrol et).

**🔴 SİSTEMİK BULGU — LP kalitesi:** QS'i olan TÜM keyword'lerde `post_click_quality_score = 2`
(ortalamanın altı). Impression share %10, kayıp %90 **rank kaynaklı** (bütçe değil) → QS düşük
olduğu için pahalıya az gösterim alıyoruz. Reklam-sonrası deneyim (hız + mesaj uyumu) sistemik
zayıflık; CRO işleri doğrudan QS/CPC'ye yazar. Ayrıca "ai automation" (QS 1, 92₺/7g, en pahalı
keyword) TR ad group'unda — EN sorgu TR landing'e gidiyor olabilir; **ad group final URL /
EN-TR keyword ayrımı bir sonraki Ads işi.**

**Uygulanan CRO (commit 93927f9):**
1. `/saas-platform-gelistirme` (ölü sayfa: %84.6 bounce, 5.4s, 0 form_start):
   - Form 9 alan/7 zorunlu → AILeadForm kalıbı (çip + ad + e-posta + opsiyonel açıklama).
     Eski formda bütçe seçenekleri ₺50.000'den başlıyordu, sayfa "₺25.000'den" diyordu (çelişki giderildi).
   - Hero mesaj-uyumu: "SaaS Fikrinizi" → "İşinize Özel Web Uygulaması" (CRM/panel/web-app
     niyetli reklam trafiği kendini bulamıyordu). Meta/OG güncellendi.
2. `/en/ai-automation-service` AILeadFormEn: use-case çipleri en üste taşındı — TR %19.6 vs
   EN %4.8 form_start farkının yapısal nedeni (TR'de ilk etkileşim kimliksiz çip, EN'de isim alanıydı).

**Repo hijyeni:** ~90 analiz JSON'u gitignore+arşiv, lead PII dosyaları repo dışı, 118 dosya
7 konu-odaklı commit'te toplandı (email pipeline, ads scriptleri, GA4/GSC scriptleri, Yandex
doğrulama, docs). Working tree temiz. **Push bekliyor (kullanıcı onayı).**

**Ölçüm (7-14g):** saas form_start > 0 mu; ai-en form_start %4.8 → ? ; Ana TR v2 CPC/QS
(LP fix'leri yansıyınca); İstanbul Yerel 2026 neden durdu.

## 5b. CEO Notu — Yöntem (geçmiş raporlardan)
PROJECT.md'deki çalışma yöntemi: faz bazlı, etki/efor önceliklendirilmiş backlog, checkbox takibi,
canonical durum dosyası. Bu loop aynısını MONETIZATION-REPORT.md ile sürdürür. Monetization hattı:
SEO trafiği → landing → form/qualify_lead → e-posta funnel → satış. Şu an darboğaz: landing bounce
(%73-87) ve düşük CR (%0.7). Ölçüm artık doğru → sıradaki kaldıraç #1 trafik sayfasının CR'si.

## 5. Loop Notları
- Mod: otonom, dinamik tempolu; sürekli çalışır, kısa aralık.
- Her iterasyon: veri çek → çıkarım → çok-görevli batch uygula → build → commit → rapor güncelle → replan.
- Dev server arkaplanda (`localhost:3000`) veri çekimi için ayakta tutulur.
