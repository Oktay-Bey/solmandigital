# Email Otomasyonu — Lead Outreach Sistemi

> Kuruluş: 2026-06-10. Kişiselleştirilmiş B2B cold outreach pipeline'ı.
> Akış: kullanıcı ham lead JSON'u getirir → email tespiti → sektöre özel içerik → önizleme onayı → gönderim → takip.

## Altyapı

| Bileşen | Konum | Görev |
|---------|-------|-------|
| Push endpoint | `app/api/email/push/route.ts` (canlıda) | Bearer-auth toplu gönderim, max 100 mesaj/istek, `resend.batch.send` |
| Gönderim aracı | `scripts/email-push.mjs` | JSON'u 100'lük parçalarla endpoint'e gönderir (700ms delay) |
| Email tespiti | `scripts/find-emails.mjs` | Lead sitelerini tarar (anasayfa + iletişim sayfaları), email çıkarır |
| Mail üretici | `scripts/build-mails.mjs` | Onaylı şablonla kişiselleştirilmiş mail JSON'u üretir |
| Tracking | `scripts/enable-tracking.mjs` | Domain'de open/click tracking yönetimi |

### Ayarlar
- **Gönderici:** `Solman Digital <info@solmandigital.com.tr>` — `replyTo` da aynı adres
- **Auth:** `EMAIL_PUSH_SECRET` (hem Vercel production hem `.env.local`)
- **API key:** `RESEND_API_KEY` (`.env.local`, 2026-06-10'da yenilendi, geçerli)
- **Tracking:** Resend domain'inde open + click tracking **AÇIK** (gönderimden önce açık olmalı!)
- **Endpoint format:** `POST /api/email/push` → `{ "messages": [{ "to", "subject", "html", "text" }] }`

### Kullanım
```bash
node scripts/find-emails.mjs <leads.json> <hedef-adet>   # → scripts/found-emails.json
node scripts/build-mails.mjs                              # → scripts/leads-batch-N.json
node scripts/email-push.mjs scripts/leads-batch-N.json    # gönderim
```

## İçerik Kuralları (ÖNEMLİ)

1. **Korku temelli ton YASAK.** "Hasta kaçıyor", "güvenli değil uyarısı" tarzı tehdit dili kullanılmaz. Her mail tebrik/iltifatla açılır, fırsat anlatır.
2. **Her teknik iddia gönderilmeden DOĞRULANIR.** Veri setindeki ham bilgiye güvenme (örn. `http://` URL ≠ SSL'siz site — yönlendirme olabilir). SSL, site içeriği, hız iddiaları gerçekten test edilir.
3. **Marka sesi:** "biz" dili, "Solman Digital olarak...", "aynı uzmanla başından sonuna", "katmansız iletişim". Yasak: ajans, ekip, kadro, freelancer, ben/benim.
4. **Düşük puan/olumsuz veri maile yazılmaz** — o lead'de farklı bir kanca kullanılır (hizmet nişi, köklülük, konum vb.).

### Mail İskeleti
1. **İltifat** — doğrulanmış gerçek veriyle (Google puanı, yorum sayısı, niş konumlanma)
2. **Fırsat** — sektöre özel somut kazanım ("30 saniyede randevu", "gece taleplerini yakala")
3. **Çözüm** — Solman Digital paketi, sektöre uyarlanır ("klinikler için", "hekimler için"...)
4. **Çift CTA** — UTM'li "Ücretsiz Analiz" butonu (bordo #9b1c1c) + Ref kodlu WhatsApp butonu (yeşil #25d366)
5. **"Maile yanıt verin, doğrudan uzmana yazıyorsunuz"** satırı
6. **Footer** — tek seferlik gönderim açıklaması + mailto unsubscribe linki (KVKK)

## Takip Sistemi

| Kanal | Ne izlenir | Nereden |
|-------|-----------|---------|
| Resend | delivered / opened / clicked (kişi bazında) | Resend paneli veya API (`GET /emails`) |
| GA4 | UTM trafiği + form dönüşümü | `utm_source=resend&utm_medium=email&utm_campaign=<sektör>-batch-N&utm_content=<lead-slug>` |
| WhatsApp | Gelen mesajdaki `(Ref: <slug>)` kodu | wa.me linki hazır mesajla açılır |
| Yanıt/Unsubscribe | info@'ya gelen her mail → admin'e "[Gelen Mail]" bildirimi | Resend inbound webhook (`app/api/email/inbound`) |

## Unsubscribe / Suppression
- Footer'daki link `info@solmandigital.com.tr`'ye mail attırır → admin'e bildirim düşer.
- Çıkış isteyen adres `scripts/suppress-list.json`'a eklenir (basit string dizisi).
- Her yeni batch üretiminde bu liste filtrelenir — aynı adrese bir daha yazılmaz.
- Ayrıca email tespitinde dedupe var: aynı email iki lead'de çıkarsa tek mail gider.

## Yeni Sektör Batch'i Süreci
1. Lead JSON'unu bırak (Google Maps scrape formatı yeterli: `title`, `website`, `phone`, `city`, `categoryName`, `totalScore`, `reviewsCount`)
2. `find-emails.mjs` ile email tespiti (junk/placeholder/duplicate filtreli)
3. Sektöre uyarlanmış kancalar: iltifat verisi + fırsat dili + çözüm paketi o sektörün diline çevrilir
4. **Önizleme:** tüm mailler `[ONIZLEME x/N -> gerçek-alıcı]` konusuyla önce admin'e gider
5. Kullanıcı onayı → gerçek gönderim → teslimat raporu
6. UTM kampanya adı: `<sektör>-batch-N`

## Gönderim Geçmişi

### Batch 6 — BE/NL/US/UK Ajansları / Sade Ortaklık Modeli (2026-06-10)
- Kaynak: `scripts/agencies-intl-raw.json` (65 ajans) → `find-emails.mjs` → 33 email → 3 junk filtre → 30 alıcı
- 30 alıcı: Belçika (8), Hollanda (9), ABD (10), UK (3)
- Kampanya: `intl-whitelabel-1` — mailler: `scripts/leads-batch-6.json`
- Script: `scripts/build-mails-batch-6.mjs`
- Dil: **İngilizce** — kişiselleştirme yok, ortaklık modelini direkt anlatan sade şablon
- Format: nasıl çalışır blok (bordo sol çizgi) + faydalar listesi + stack + timezone + CTA
- Subject: 4 varyant rotasyonu (A/B etkisi)
- Kullanıcı bu yaklaşımı beğendi → uluslararası batch'lerde standart model oldu

### Batch 5 — UK Web/Dijital Ajansları / White-Label Ortaklık (2026-06-10)
- Kaynak: `scripts/uk-agencies-raw.json` (51 ajans) → `find-emails.mjs` ile tarandı → 26 email → dedupe → 24 alıcı
- 24 alıcı: London (9), Manchester (6), Leeds (4), Bristol (3), Nottingham (2), diğer (0)
- Kampanya: `uk-whitelabel-1` — mailler: `scripts/leads-batch-5.json`
- Script: `scripts/build-mails-batch-5.mjs`
- Dil: **İngilizce** — beyaz etiket taşeronluk pitch'i
- Kanca: overflow capacity, white-label silent dev partner, Next.js/React/AI, UTC+3 overlap, senior-level rates
- CTA: "Let's Talk" + WhatsApp (Ref: slug)
- Footer: "Sent to your business contact address. To unsubscribe, let us know."

### Batch 4 — Yazılım Firmaları / White-Label Ortaklık (2026-06-10)
- Kaynak: kullanıcı tarafından yapıştırılan liste (İstanbul yazılım firmaları)
- 22 alıcı: yazılım şirketleri, bilişim firmaları, akademiler (Kadıköy, Beyoğlu, Şişli)
- Kampanya: `yazilim-batch-1` — mailler: `scripts/leads-batch-4.json`
- Script: `scripts/build-mails-batch-4.mjs`
- Kanca: white-label geliştirme ortaklığı, kapasite yönetimi, müşteri kaybetmeme

### Batch 3 — Otel + Restoran (2026-06-10)
- Kaynak: kullanıcı tarafından yapıştırılan liste (İstanbul otel+restoran)
- 32 alıcı: 25 otel (Fatih/Sultanahmet + Kadıköy) + 7 restoran/rooftop
- Kampanya: `otel-batch-1` — mailler: `scripts/leads-batch-3.json`
- Script: `scripts/build-mails-batch-3.mjs`
- Kanca: doğrudan rezervasyon, Booking.com komisyonu, QR menü, çok dilli site

### Batch 2 — Trendyol Satıcıları (2026-06-10)
- Kaynak: `Downloads/trendyol-saticilari.json` + `Downloads/trendyol-satici-2.json` (kombine, dedupe)
- 34 alıcı: tekstil/şal (9), giyim (4), ayakkabı (3), aksesuar/takı/çanta (3), dekorasyon/hediye (5), bakım (2), araç/teknik (2), gıda/zanaat (2), medikal/toptan (2), 3D baskı (1), çocuk aksesuar (1)
- Kampanya: `trendyol-batch-1` — mailler: `scripts/leads-batch-2.json`
- Script: `scripts/build-mails-batch-2.mjs`

### Batch 1 — İstanbul Klinikleri (2026-06-10)
- Kaynak: `Downloads/leads-1-solmandigital.json` (113 kayıt, Google Maps)
- 10 alıcı: 8 diş kliniği + 1 görüntüleme merkezi + 1 bireysel diş hekimi (Fatih/Üsküdar)
- Kampanya: `klinik-batch-1` — mailler: `scripts/leads-batch-1.json`
- Not: veri setinde ~44 taranmamış site daha var (batch 2 adayı)
