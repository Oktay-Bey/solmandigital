# Google Ads API Kurulum Kılavuzu

## Ön Koşullar

1. Aktif bir Google Ads hesabı
2. Google Cloud Console erişimi
3. Google Ads API developer token (test veya production)

---

## Adım 1 — Google Cloud Console'da Proje Ayarları

1. [console.cloud.google.com](https://console.cloud.google.com) → Yeni proje oluştur
2. **APIs & Services → Enable APIs** → "Google Ads API" arayıp etkinleştir
3. **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs:
     - `http://localhost:3000/api/google-ads/callback` (geliştirme)
     - `https://solmandigital.com.tr/api/google-ads/callback` (production)
4. `Client ID` ve `Client Secret` değerlerini `.env.local`'a ekle

---

## Adım 2 — Google Ads Developer Token

1. Google Ads hesabı → **Araçlar ve Ayarlar → API Merkezi**
2. Developer token alın (yeni hesaplarda "test" token ile başlarsınız)
3. Test token: yalnızca test hesaplarında çalışır
4. Production token: form doldurulup Google onayı beklenir (1–5 iş günü)

Token'ı `GOOGLE_ADS_DEVELOPER_TOKEN` env'e ekle.

---

## Adım 3 — OAuth Yetkilendirme (Refresh Token Alma)

1. `.env.local` dosyasını doldurun (CLIENT_ID, CLIENT_SECRET, DEVELOPER_TOKEN, CUSTOMER_ID)
2. `npm run dev` ile sunucuyu başlatın
3. Tarayıcıda `http://localhost:3000/api/google-ads/auth` adresine gidin
4. Google hesabınızla yetkilendirin
5. Callback'ten dönen `refresh_token` değerini `.env.local`'daki `GOOGLE_ADS_REFRESH_TOKEN`'a ekleyin

> **Not:** refresh_token bir kez verilir. Kaybederseniz aynı işlemi tekrarlayın.

---

## Adım 4 — Kampanya Oluşturma

### API ile yeni kampanya aç

```bash
curl -X POST http://localhost:3000/api/google-ads/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "campaignName": "Solman Digital - Web Tasarım",
    "dailyBudgetTL": 50,
    "targetUrl": "https://solmandigital.com.tr/hizmetler",
    "headlines": [
      "İstanbul Web Tasarım",
      "Profesyonel Yazılım Ofisi",
      "Sonuç Odaklı Web Sitesi",
      "Hızlı Teslim, Uygun Fiyat"
    ],
    "descriptions": [
      "İstanbul merkezli yazılım ofisi. Doğrudan uzman erişimi.",
      "E-ticaret, kurumsal site, SaaS. Ücretsiz analiz için iletişime geçin."
    ],
    "keywords": [
      { "text": "istanbul web tasarım", "matchType": "PHRASE" },
      { "text": "web sitesi yaptırma istanbul", "matchType": "PHRASE" },
      { "text": "kurumsal web sitesi", "matchType": "BROAD" },
      { "text": "e-ticaret sitesi kurma", "matchType": "PHRASE" }
    ],
    "startDate": "20260610"
  }'
```

### Kampanya listesi

```bash
curl http://localhost:3000/api/google-ads/campaigns
```

### Kampanya durum değiştir (PAUSED → ENABLED)

```bash
curl -X PATCH \
  "http://localhost:3000/api/google-ads/campaigns/customers%2F1234567890%2Fcampaigns%2F9876543210" \
  -H "Content-Type: application/json" \
  -d '{ "status": "ENABLED" }'
```

> resource name'deki `/` karakterini URL encode etmeyi unutma: `%2F`

---

## Dosya Yapısı

```
lib/google-ads/
  client.ts       — OAuth2 + fetch wrapper
  campaigns.ts    — CRUD fonksiyonları
  types.ts        — TypeScript tipleri
  index.ts        — barrel export

app/api/google-ads/
  auth/route.ts                    — GET → OAuth yönlendirme
  callback/route.ts                — GET → token alma
  campaigns/route.ts               — GET (listele) + POST (oluştur)
  campaigns/[resourceId]/route.ts  — PATCH (durum güncelle)
```

---

## Önemli Notlar

- Yeni kampanyalar güvenlik için `PAUSED` durumuyla oluşturulur. ENABLED yapmak için PATCH endpoint'ini kullanın.
- `dailyBudgetTL` değeri TL cinsindendir (50 = 50₺/gün).
- Headline'lar max 30 karakter, description'lar max 90 karakter olmalıdır (Google Ads kısıtlaması).
- Test developer token yalnızca test account'larda çalışır. Gerçek kampanya için production token gereklidir.
