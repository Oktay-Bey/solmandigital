# Email Otomasyonu — Lead Outreach Sistemi

> Kuruluş: 2026-06-10. Uluslararası B2B cold outreach pipeline'ı — white label development ortaklığı odaklı.
> Akış: hardcoded lead listesi → batch script → preview onayı → Brevo API → gönderim → takip.

---

## Altyapı

| Bileşen | Konum | Görev |
|---------|-------|-------|
| Gönderim aracı | `scripts/email-push.mjs` | `leads-batch-N.json` okur, Brevo API'ye doğrudan ÇAĞIRI yapar (5'li paralel, 300ms delay) |
| Mail üreticiler | `scripts/build-mails-batch-N.mjs` | Her batch için ayrı script — hardcoded lead listesi + şablon → `leads-batch-N.json` |
| Preview scriptleri | `scripts/preview-batch-N.mjs` | Tüm mailleri tek emailde `solmanoktay@gmail.com`'a gönderir, onay beklenir |
| Push endpoint | `app/api/email/push/route.ts` | Bearer-auth toplu gönderim (artık kullanılmıyor — lokal script daha güvenilir) |
| Suppress listesi | `scripts/suppress-list.json` | Bounce/unsubscribe adresleri — her batch üretiminde filtrelenir |
| US lead havuzu | `scripts/us-leads-100.json` | 104 US ajansı — batch 12'nin kaynağı |

### Teknik Notlar
- **Brevo API:** `POST https://api.brevo.com/v3/smtp/email` — `api-key` header
- **Gönderici:** `Solman Digital <info@solmandigital.com.tr>` — `replyTo` aynı adres
- **Kimlik doğrulama:** SPF + DKIM (brevo1/2._domainkey) + DMARC — domain authenticated ✓
- **IP:** Lokal IP Brevo panelinde yetkili — Vercel IP kullanılmıyor (dinamik IP Brevo'nun IP güvenliğiyle çakışır)
- **Günlük limit:** Brevo ücretsiz plan 300 mail/gün
- **Env:** `BREVO_API_KEY` → `.env.local`

---

## Şablon Evrimi

### V1 — Model A: Kişiselleştirilmiş (batch 1–5)
- Her lead için ayrı iltifat + fırsat paragrafı
- Ajansın nişi, şehri, çalışma biçimine göre kanca
- TR dilinde (klinik, otel, Trendyol satıcıları)

### V2 — Model B: Sade Ortaklık Anlatımı (batch 6–8)
- Kişiselleştirme yok — modeli net anlatan 1 şablon
- Nasıl çalışır blok + faydalar listesi + stack + timezone + CTA
- İngilizce, uluslararası

### V3 — Kompakt White Label Partnership (batch 9–13) ← güncel
- Başlık: **"White Label Partnership"** + `for [Ajans Adı]`
- Faydalar: 3 satır `↗` bullet (liste değil)
- Stack + timezone tek satır
- İki buton yan yana: `Schedule a Call` (bordo) + `💬 WhatsApp` (yeşil)
- Tek kart tasarım — beyaz arka plan, ince border
- Bölgeye/ülkeye özel opening + close tonu

### Şablon Kuralları (değişmez)
1. Korku temelli ton yasak — tebrik/fırsat dili
2. Subject: `White label partnership — development capacity for [Ajans]`
3. WhatsApp pre-fill: `"Hi, I received your email about white label partnership... (Ref: slug)"`
4. CTA URL: UTM parametreli `/contact?utm_source=resend&utm_medium=email&utm_campaign=...`
5. Footer: tek satır unsubscribe `mailto:` linki

---

## Gönderim Süreci (adım adım)

```bash
# 1. Build
node scripts/build-mails-batch-N.mjs
# → scripts/leads-batch-N.json üretir, suppress + dedupe uygular

# 2. Preview
node scripts/preview-batch-N.mjs
# → solmanoktay@gmail.com'a tüm mailleri gönderir

# 3. Onay → Gönderim
node scripts/email-push.mjs scripts/leads-batch-N.json
# → Brevo API'ye 5'li paralel chunk'larla gönderir
```

---

## İçerik Kuralları

1. **Korku temelli ton yasak.** Tehdit/uyarı dili yok. Fırsat ve değer anlatılır.
2. **Marka sesi:** "Solman Digital", "we", "our". Yasak: ajans, ekip, kadro, freelancer.
3. **Bölgeye özel ton:** DE/CH → yapısal/güvenilir; Nordics → minimal/direkt; FR → profesyonel; US/CA/AU → samimi/pratik.
4. **Preview zorunlu:** Onay olmadan gerçek alıcıya mail gitmez.

---

## Takip

| Kanal | Ne izlenir | Nereden |
|-------|-----------|---------|
| Brevo | delivered / opened / clicked | Brevo dashboard |
| GA4 | UTM trafiği + form dönüşümü | `utm_campaign=<kampanya-adı>` |
| WhatsApp | Gelen mesajdaki `(Ref: slug)` | wa.me hazır mesajla açılır |
| Yanıt/Unsubscribe | info@'ya gelen mail | manuel — `suppress-list.json`'a ekle |

---

## Gönderim Geçmişi

| Batch | Hedef | Adet | Kampanya | Tarih |
|-------|-------|------|----------|-------|
| 1 | İstanbul klinikleri (TR) | 10 | klinik-batch-1 | 2026-06-10 |
| 2 | Trendyol satıcıları (TR) | 34 | trendyol-batch-1 | 2026-06-10 |
| 3 | İstanbul otel+restoran (TR) | 32 | otel-batch-1 | 2026-06-10 |
| 4 | İstanbul yazılım firmaları (TR) | 22 | yazilim-batch-1 | 2026-06-10 |
| 5 | UK ajanslar (EN) | 24 | uk-whitelabel-1 | 2026-06-10 |
| 6 | BE/NL/US/UK ajanslar (EN) | 30 | intl-whitelabel-1 | 2026-06-10 |
| 7 | DACH+Nordics+CA+AU (EN) | 38 | intl-whitelabel-2 | 2026-06-10 |
| 8 | BE+NL+LU+CH (EN) | 38 | bnlx-whitelabel-1 | 2026-06-10 |
| 9 | FR+ES+IT+IE+PL+PT (EN) | 41 | eu-whitelabel-1 | 2026-06-10 |
| 10 | US+CA (EN) | 32 | usca-whitelabel-1 | 2026-06-10 |
| 11 | AU+NZ (EN) | 21 | aunz-whitelabel-1 | 2026-06-10 |
| 12 | US x101 (EN) | 101 | us-whitelabel-2 | 2026-06-10 |
| 13 | UK x20 (EN) | 20 | uk-whitelabel-2 | 2026-06-10 |
| 14 | NL+BE+LU+UK yeni şehirler (EN) | 33 | bnlx-whitelabel-2 | 2026-06-11 |
| 15 | NL+BE+LU+UK info@ pattern MX-verified (EN) | 51 | bnlx-whitelabel-3 | 2026-06-11 |
| 16 | UK+NL+DE+AT+SE+NO+DK+FI+CZ+HU — Brevo loop run 1 (EN) | 82 | eu-whitelabel-3 | 2026-06-11 |
| 17 | Brevo loop run 2 — 29 fresh + 82 duplicate (dedup bug) (EN) | 111 | eu-whitelabel-3 | 2026-06-11 |
| 18 | UK+NL+DE+AT+SE+NO+DK+FI+CZ+SK+HU+BE — Resend (EN) | 73 | eu-whitelabel-4 | 2026-06-11 |
| **TOPLAM** | | **793** | | |

---

## Hedeflenen Bölgeler (tamamlanan)

- **TR:** İstanbul klinik · otel · restoran · Trendyol satıcıları · yazılım firmaları
- **UK:** London · Manchester · Leeds · Bristol · Nottingham · Cardiff · Brighton · Southampton · Winchester · Lancaster · Newcastle · Bournemouth
- **DACH:** DE · AT · CH
- **Nordics:** SE · NO · DK · FI
- **Benelux:** BE · NL · LU
- **Güney Avrupa:** FR · ES · IT · PT
- **Orta/Kuzey Avrupa:** IE · PL
- **Kuzey Amerika:** US (120+) · CA
- **Pasifik:** AU · NZ

## Sıradaki Hedefler (henüz gönderilmedi)

- Orta Avrupa: AT (daha fazla) · CZ · HU · SK
- Nordics genişletme: daha fazla SE · FI
- UK genişletme: Edinburgh · Glasgow · Liverpool ve ötesi (batch 14'te başlandı)
- NL genişletme: daha fazla Amsterdam + Rotterdam ajansları
- US niş segmentler: e-commerce ajansları · fintech · healthtech odaklı

---

## Suppress Listesi Yönetimi

Bounce veya unsubscribe geldiğinde:
```bash
# scripts/suppress-list.json'a ekle (basit string dizisi)
["email1@domain.com", "email2@domain.com"]
```
Bir sonraki batch üretiminde otomatik filtrelenir.
