# Google Ads Entegrasyonu — Teknik Dokümantasyon

Bu belge, Solman Digital projesindeki Google Ads API entegrasyonunu, karşılaşılan sorunları ve çözümlerini kapsamlı biçimde açıklar.

---

## İçindekiler

1. [Mimari Genel Bakış](#mimari-genel-bakış)
2. [Ortam Değişkenleri](#ortam-değişkenleri)
3. [Hesap Yapısı](#hesap-yapısı)
4. [Kritik Teknik Notlar](#kritik-teknik-notlar)
5. [Kampanya Oluşturma Akışı](#kampanya-oluşturma-akışı)
6. [API Endpoint Referansı](#api-endpoint-referansı)
7. [Conversion Tracking](#conversion-tracking)
8. [Karşılaşılan Hatalar ve Çözümleri](#karşılaşılan-hatalar-ve-çözümleri)
9. [Mevcut Kampanya Yapısı](#mevcut-kampanya-yapısı)
10. [Coğrafi Hedefleme ID'leri](#coğrafi-hedefleme-idleri)

---

## Mimari Genel Bakış

```
lib/google-ads/
├── client.ts       — GoogleAdsApi instance ve Customer factory
├── campaigns.ts    — Tüm kampanya/ad group operasyonları
├── types.ts        — Type tanımları (kısmen eski, campaigns.ts'deki interface'ler güncel)
└── index.ts        — Re-export

app/api/google-ads/
├── auth/route.ts               — OAuth2 token endpoint
├── campaigns/route.ts          — GET (listele) / POST (oluştur)
├── campaigns/[resourceId]/
│   ├── route.ts                — GET (ad group listesi) / PATCH (güncelle) / DELETE
│   └── adgroups/[adGroupId]/
│       └── route.ts            — PATCH (rename) / DELETE
└── conversions/route.ts        — Conversion upload
```

**Kullanılan kütüphaneler:**
- `google-ads-api` — protobuf tabanlı Google Ads API client (npm)
- `googleapis` — OAuth2 token yenileme için
- Native `fetch` — kampanya ve RSA oluşturmada REST API çağrıları için (protobuf bypass)

---

## Ortam Değişkenleri

`.env.local` dosyasında tanımlı olması gereken değişkenler:

```env
GOOGLE_ADS_CLIENT_ID=          # OAuth2 Client ID (Google Cloud Console)
GOOGLE_ADS_CLIENT_SECRET=      # OAuth2 Client Secret
GOOGLE_ADS_DEVELOPER_TOKEN=    # Google Ads Developer Token (MCC hesabından)
GOOGLE_ADS_REFRESH_TOKEN=      # OAuth2 Refresh Token (kullanıcı onayından üretilir)
GOOGLE_ADS_CUSTOMER_ID=        # Reklam hesabı ID: 1948088691
GOOGLE_ADS_LOGIN_CUSTOMER_ID=  # MCC (yönetici) hesabı ID: 1361382717
```

`GOOGLE_ADS_LOGIN_CUSTOMER_ID`, `GOOGLE_ADS_CUSTOMER_ID`'den farklıysa `login-customer-id` header'ı tüm API isteklerine eklenir. Bu, MCC (My Client Center) yapısında çalışmak için zorunludur.

---

## Hesap Yapısı

```
MCC Hesabı (1361382717)
└── Müşteri Hesabı (1948088691)  ← reklam buraya verilir
```

`getCustomer()` fonksiyonu her zaman müşteri hesabı ID'si ile çalışır, ancak API kimlik doğrulaması MCC token'ı üzerinden yapılır.

---

## Kritik Teknik Notlar

### 1. `contains_eu_political_advertising` Alanı (API v17+)

Kampanya oluştururken bu alan zorunludur. **Protobuf ile gönderilemez** — `false` boolean değeri protobuf'ta default değer olduğundan iletilmez ve API hata verir.

**Çözüm:** Kampanya oluşturma adımı direkt REST API ile yapılır:

```typescript
containsEuPoliticalAdvertising: 3  // integer 3 = DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING
```

Enum değerleri:
- `1` = UNSPECIFIED
- `2` = UNKNOWN  
- `3` = DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING ✅
- `4` = CONTAINS_EU_POLITICAL_ADVERTISING

### 2. Türkçe Karakter Sorunu (protobuf encoding)

`google-ads-api` kütüphanesi `adGroupAds.create()` metoduyla RSA (Responsive Search Ad) oluştururken headline ve description alanlarındaki Türkçe karakterleri (`ş`, `ğ`, `ü`, `ç`, `İ`, `ö` vb.) bozuk iletir. API `ILLEGAL_CHARS` hatası döner.

**Kök neden:** Kütüphanenin protobuf serialization katmanı string encoding'i düzgün yapmıyor.

**Çözüm:** RSA oluşturma adımı da REST API ile yapılır. Body `TextEncoder` ile UTF-8'e encode edilerek gönderilir:

```typescript
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: new TextEncoder().encode(JSON.stringify(body)),
});
```

**Önemli:** API'yi Node.js `fetch` ile çağırırken Türkçe karakterler sorunsuz çalışır. Sorun yalnızca `google-ads-api` protobuf katmanında yaşanır.

**API rotasına gelen request'i parse ederken** de aynı dikkat gerekir. `req.json()` yerine `req.arrayBuffer()` + `TextDecoder` kullanılır:

```typescript
const rawBody = await req.arrayBuffer();
const body = JSON.parse(new TextDecoder("utf-8").decode(rawBody));
```

### 3. API Versiyonu

`google-ads-api` npm paketi **v23** kullanır. REST endpoint'leri de v23 olmalı:

```
https://googleads.googleapis.com/v23/customers/{cid}/googleAds:mutate
```

v18, v19, v21 gibi eski sürümlerde 404 alınır. Paketin hangi versiyonu kullandığını doğrulamak için: `node_modules/google-ads-api/package.json` içindeki `version` alanına bakılabilir.

### 4. Keyword Policy İhlali

Bazı keyword'ler Google Ads politikasına takılır (örn. `THIRD_PARTY_CONSUMER_TECHNICAL_SUPPORT`). Keyword'ler **teker teker** eklenmeli, her birinin etrafında try/catch olmalı. İhlal olan keyword atlanır, diğerleri eklenir.

```typescript
for (const kw of keywords) {
  try {
    await customer.adGroupCriteria.create([...])
  } catch (e) {
    console.warn("[google-ads] Keyword SKIPPED:", kw.text)
    // devam et, throw etme
  }
}
```

### 5. Budget Adı Benzersiz Olmalı

`campaignBudgets.create()` çağrısında `name` alanı Google Ads hesabında benzersiz olmalıdır. Aynı isimle ikinci bir bütçe oluşturulmaya çalışılırsa `A campaign budget with this name already exists` hatası alınır.

**Çözüm:** Kampanya adına timestamp eklemek veya her denemede farklı suffix kullanmak:

```typescript
name: `${input.campaignName} - Bütçe`
// veya
name: `${input.campaignName} - Bütçe ${Date.now()}`
```

### 6. RSA Minimum Kısıtlamaları

| Alan | Minimum | Maksimum | Karakter Limiti |
|---|---|---|---|
| headlines | 3 | 15 | 30 karakter/adet |
| descriptions | 2 | 4 | 90 karakter/adet |

Bu limitleri aşan veya altında kalan istekler `Too few` / `Too long` hatası verir.

### 7. Ad Group İsmi Benzersiz Olmalı

Aynı kampanya içinde aynı isimde iki ad group oluşturulamaz. Hata: `AdGroup with the same name already exists for the campaign.`

Bir ad group oluşturma işlemi yarım kalırsa (adGroup oluştu, RSA oluşturulamadı), ad group hesapta kalır. Sonraki denemede farklı bir isim kullanılmalı veya önceki yarım ad group silinmelidir.

---

## Kampanya Oluşturma Akışı

`createFullCampaign()` fonksiyonu sırayla şu adımları uygular:

```
1. campaignBudgets.create()        → protobuf ile (encoding sorunu yok)
2. REST: campaignOperation.create  → containsEuPoliticalAdvertising: 3 için REST zorunlu
3. campaignCriteria.create()       → geo target (opsiyonel)
4. campaignCriteria.create()       → negatif keyword'ler (opsiyonel)
5. Her ad group için döngü:
   a. adGroups.create()            → protobuf ile (encoding sorunu yok)
   b. REST: adGroupAdOperation     → RSA, Türkçe karakter için REST zorunlu
   c. adGroupCriteria.create()     → keyword'ler, teker teker try/catch
```

Her adım bağımsız olarak loglanır. Bir adım başarısız olursa önceki adımların oluşturduğu kaynaklar (bütçe, kampanya) hesapta kalır — bir sonraki denemede farklı isim kullanılmalıdır.

---

## API Endpoint Referansı

### `GET /api/google-ads/campaigns`
Hesaptaki REMOVED olmayan kampanyaları listeler.

**Response:**
```json
{
  "campaigns": [
    {
      "id": "23914856579",
      "name": "Solman Digital - Arama 2025",
      "status": "ENABLED",
      "channelType": "SEARCH",
      "budgetMicros": 150000000,
      "budgetAmountTL": 150
    }
  ]
}
```

---

### `POST /api/google-ads/campaigns`
Yeni kampanya oluşturur. `adGroups` array varsa çok ad group'lu yapı kurulur; yoksa legacy tekil alanlar (`targetUrl`, `headlines`, `descriptions`, `keywords`) kullanılır.

**Body:**
```json
{
  "campaignName": "Kampanya Adı",
  "dailyBudgetTL": 100,
  "geoTargetConstantIds": [1012867, 2792],
  "negativeKeywords": ["ücretsiz", "kurs"],
  "adGroups": [
    {
      "name": "Ad Group Adı",
      "targetUrl": "https://solmandigital.com.tr/sayfa",
      "cpcBidMicros": 2000000,
      "headlines": ["Başlık 1", "Başlık 2", "Başlık 3"],
      "descriptions": ["Açıklama 1", "Açıklama 2"],
      "keywords": [
        { "text": "anahtar kelime", "matchType": "PHRASE" }
      ]
    }
  ]
}
```

**Not:** Bu endpoint'e `curl` ile Türkçe karakterli body göndermek Windows'ta encoding hatası verir. Mutlaka Node.js `fetch` veya tarayıcı üzerinden çağrılmalıdır.

---

### `GET /api/google-ads/campaigns/[campaignId]`
Kampanyanın ad group listesini döner.

---

### `PATCH /api/google-ads/campaigns/[campaignId]`
Kampanyayı günceller. Body'de gönderilen alanlar işlenir:

```json
{ "status": "ENABLED" }           // kampanyayı aktifleştir/duraklat
{ "dailyBudgetTL": 150 }          // bütçeyi güncelle
{ "adGroups": [...] }             // yeni ad group'lar ekle
```

---

### `DELETE /api/google-ads/campaigns/[campaignId]`
Kampanyayı kalıcı olarak siler (status: REMOVED).

---

### `PATCH /api/google-ads/campaigns/[campaignId]/adgroups/[adGroupId]`
Ad group'u yeniden adlandırır.

```json
{ "name": "Yeni Ad Group Adı" }
```

---

### `DELETE /api/google-ads/campaigns/[campaignId]/adgroups/[adGroupId]`
Ad group'u siler. `adGroupId` sayısal ID veya URL-encoded resource name olabilir.

---

## Conversion Tracking

Lead formları Google tıklamasından gelen `gclid` parametresini yakalar ve form gönderiminde conversion olarak yükler.

### gclid Yakalama

`lib/analytics.ts` içindeki `getGclid()` fonksiyonu URL parametresinden veya localStorage'dan okur.

Her lead formunda (`WebSiteLeadForm`, `TrendyolLeadForm`, `ContactForm`):

```typescript
import { getGclid } from "@/lib/analytics"

const [gclid, setGclid] = useState<string | null>(null)
useEffect(() => { setGclid(getGclid()) }, [])

// Form submit body'sine ekle:
body: JSON.stringify({ ...form, gclid })
```

### Conversion Yükleme

`app/api/email/lead/route.ts` lead alındığında conversion'ı Google Ads'e yükler:

```typescript
if (gclid) {
  uploadGoogleAdsConversion({ gclid, conversionValue: 500 }).catch(() => {})
}
```

`uploadGoogleAdsConversion` fonksiyonu `lib/google-ads/` altında tanımlıdır. Conversion value 500 TL olarak ayarlanmıştır.

---

## Karşılaşılan Hatalar ve Çözümleri

| Hata | Sebep | Çözüm |
|---|---|---|
| `The required field was not present` | `contains_eu_political_advertising` alanı eksik | REST API ile kampanya oluştur, `containsEuPoliticalAdvertising: 3` gönder |
| `ILLEGAL_CHARS` | Protobuf Türkçe karakter encoding sorunu | RSA oluşturmayı REST API'ye taşı, `TextEncoder` kullan |
| `A campaign budget with this name already exists` | Önceki başarısız denemeden kalan bütçe | Kampanya adına timestamp ekle |
| `AdGroup with the same name already exists` | Yarım kalan önceki denemeden ad group | Yarım kalan ad group'u sil veya farklı isim kullan |
| `Too few` | RSA'da headline < 3 veya description < 2 | Minimum sayıyı karşıla |
| `Too long` | Headline > 30 karakter veya description > 90 karakter | Karakter limitlerini kontrol et |
| REST 404 hatası | Yanlış API versiyonu | URL'de `v23` kullan |
| `Bilinmeyen hata` (opaque) | Hata detayı yakalanmıyor | `errors` array'ini `.map()` ile serialize et, `trigger` ve `location` alanlarını logla |
| Policy violation (`THIRD_PARTY_CONSUMER_TECHNICAL_SUPPORT`) | Belirli keyword'ler yasaklı | Keyword'leri teker teker ekle, hata alanı atla |
| Timeout (~90s) | API çok yavaş yanıt | Normal — bütçe oluştu ama kampanya oluşmadı olabilir. Önce listeyi kontrol et |
| `curl` ile Türkçe karakter bozulması | Windows'ta `curl` body encoding sorunu | API'yi `curl` ile değil, Node.js `fetch` veya tarayıcıdan çağır |

### Hata Debugging İpucu

`google-ads-api` hata objesi protobuf nesnesi olduğu için `console.log(e)` yeterli olmayabilir. Detay için:

```typescript
const errs = (e?.errors as unknown[]) ?? []
console.error(JSON.stringify(errs.map((x: any) => ({
  message: x.message,
  trigger: JSON.stringify(x.trigger),
  location: JSON.stringify(x.location),
})), null, 2))
```

---

## Mevcut Kampanya Yapısı

**Kampanya:** Solman Digital - Arama 2025 (ID: 23914856579)  
**Durum:** ENABLED  
**Bütçe:** 150 TL/gün  
**Geo:** İstanbul (1012867) + Türkiye (2792)  
**Teklif stratejisi:** Manuel CPC  

| Ad Group | Landing Page | CPC | Anahtar Kelime Sayısı |
|---|---|---|---|
| Web Sitesi Yaptırma | `/web-sitesi-yaptirmak` | 2 TL | 9 |
| Trendyol ve E-Ticaret | `/trendyol-entegrasyonu` | 2 TL | 5 |
| AI Otomasyon | `/ai-otomasyon-hizmeti` | 2.5 TL | 5 |
| Marka | `/iletisim` | 0.5 TL | 3 |
| Rakip Karşılaştırma | `/web-sitesi-yaptirmak` | 2 TL | 5 |
| Problem ve Acı Nokta | `/iletisim` | 2 TL | 6 |

---

## Coğrafi Hedefleme ID'leri

Sık kullanılan Türkiye lokasyonları:

| Lokasyon | ID |
|---|---|
| Türkiye (ülke) | 2792 |
| İstanbul | 1012867 |
| Ankara | 1012908 |
| İzmir | 1012962 |
| Kuzey Makedonya (ülke) | 2807 |

Geo target ID'leri `campaignCriteria.create()` ile **protobuf** üzerinden eklenebilir (encoding sorunu yoktur):

```typescript
await customer.campaignCriteria.create([{
  campaign: campaignResource,
  location: { geo_target_constant: `geoTargetConstants/1012867` },
}])
```

Tam liste için: [Google Ads Geo Targets](https://developers.google.com/google-ads/api/data/geotargets)
