# Solman Digital — Sosyal Medya Reels Otomasyonu (YouTube + Instagram + Facebook)

> Bu dosya, otomasyonu bu projede sıfırdan kurmak için hazırlanmış bir brief'tir.
> TroyWire (`c:\Users\90534\Desktop\NewsMotor`) projesinde aynı sistem kurulup
> **çalışır halde** test edildi. Buradaki iş, o çalışan motoru Solman Digital'e
> (Türkçe + hizmet/ipucu içeriği + ayrı hesaplar) uyarlamaktır.

---

## Amaç

Her gün otomatik olarak, hiç elle müdahale olmadan:
- GPT ile **Türkçe**, hizmet satışına yönelik + kullanıcıyı geliştirmeye/aksiyona teşvik eden
  bilgilendirici reels içeriği üret (web tasarım, SEO, e-ticaret, otomasyon, yapay zekâ ile
  iş büyütme, dijital pazarlama ipuçları).
- 9:16 dikey MP4 (1080×1920, ~15-25 sn) render et: animasyonlu marka zemini + büyük başlık +
  kelime-kelime altyazı + "SOLMAN DIGITAL" rozeti + site CTA.
- Aynı videoyu **YouTube Shorts + Instagram Reels + Facebook Reels**'e dağıt; her platforma
  **platforma özel Türkçe caption + hashtag** (IG yoğun hashtag, FB sade + link).
- Çalışma yeri: **Hetzner VPS** (ffmpeg kurulu), ayrı cron. Vercel'e dokunma.

---

## TroyWire'da KANITLANMIŞ çalışan referans dosyalar

Bunları kaynak olarak kopyala/uyarlamak için TroyWire reposundan al
(`c:\Users\90534\Desktop\NewsMotor\scripts\`):

| Dosya | Ne yapar | Solman'da |
|---|---|---|
| `make-daily-reels.mjs` | Ana motor: içerik→TTS→render→YT/IG/FB upload | **Uyarla** (TR + içerik kaynağı) |
| `lib/meta-publish.mjs` | IG Reel + FB Reel + FB video publish (fetch+poll) | **Aynen kopyala** |
| `get-youtube-tokens.mjs` | YouTube OAuth (youtube.upload scope) token üretir | **Aynen kopyala** |
| `get-meta-token.mjs` | Meta long-lived Page token + IG user id üretir | **Aynen kopyala** |

Motor saf Node + `fetch` + `ffmpeg` kullanır (SDK yok, DB yok) — projeden bağımsız çalışır.

---

## Mimari (TroyWire'da çalışan akış)

```
cron (VPS, günde 1×)
  → içerik üret (GPT: konu + Türkçe script + SEO meta + IG/FB caption)
  → seslendir (OpenAI tts-1, Türkçe, en ucuz)
  → kelime-kelime ASS altyazı (DejaVu font — Türkçe karakter destekler)
  → FFmpeg render: animasyonlu gradient zemin + bokeh + başlık + altyazı + CTA + ilerleme çubuğu
  → YouTube'a yükle (resumable, googleapis YOK — saf REST)
  → MP4'ü VPS public klasöre kopyala → public URL
  → Instagram Reel (container + poll FINISHED + publish)
  → Facebook Reel (start + hosted upload + finish)
  → public dosyayı sil
  → her platform için ✅/❌ özet
```

Önemli teknik notlar (TroyWire'da öğrenilen):
- **Meta videoyu DOSYA değil URL'den çeker** → VPS'te nginx ile servis edilen public klasör şart.
- **IG/FB ayrı veya tek token** olabilir; kod `META_IG_TOKEN`/`META_FB_TOKEN` ya da ortak
  `META_PAGE_ACCESS_TOKEN` destekler.
- **IG hesabı Business/Creator + FB Sayfasına bağlı** olmalı (kişisel IG API'den paylaşamaz).
- **Font:** Windows'ta Arial Bold, Linux/VPS'te `DejaVuSans-Bold.ttf` (Türkçe karakter sorunsuz).
- TTS'e 3× retry konuldu (geçici "fetch failed" için).
- Altyazı temposu: kelime grubu 4-5 kelime/~30 karakter, grup başına ~1.5 sn (okunabilir).

---

## Uygulama Adımları

### 1. Scriptleri getir
Solman reposunda `scripts/reels/` klasörü oluştur. TroyWire'dan şunları kopyala:
`lib/meta-publish.mjs`, `get-youtube-tokens.mjs`, `get-meta-token.mjs`.
`make-daily-reels.mjs`'i `make-solman-reels.mjs` olarak kopyalayıp uyarla.
(Not: Bu node scriptleri Next.js build'ine dahil DEĞİL; Vercel'i etkilemez.)

### 2. İçerik üretimini Türkçe + Solman temasına çevir (make-solman-reels.mjs)
- Haber çekme (sitemap/Google News) kısmını **kaldır**; yerine GPT'ye **Türkçe konu havuzu**
  ürettir. Sistem promptu örn:
  > "Sen Solman Digital (yazılım & dijital ajans) için kısa, vurucu Türkçe Reels metinleri
  > yazıyorsun. İzleyiciye değerli bir ipucu ver, sonra Solman Digital hizmetine yumuşakça
  > yönlendir. Tüm çıktı TÜRKÇE."
- Her video için JSON: `category`, `narration` (TR, 35-55 kelime, hook + ipucu + "solmandigital.com"),
  `seo_title` (TR), `seo_description` (TR), `hashtags`, `ig_hashtags` (12-15 TR), `fb_caption` (TR + link).
- Konu havuzu: web sitesi/performans, SEO, e-ticaret, süreç otomasyonu, yapay zekâ ile verimlilik,
  dijital pazarlama, lead toplama. (Tekrarı azaltmak için her gün GPT'ye farklı açı iste.)

### 3. Markalamayı değiştir (render fonksiyonu)
- `drawtext` "TROYWIRE" → "SOLMAN DIGITAL"; kategori/slogan TR; CTA "solmandigital.com".
- Renk paletini Solman markasına çevir (logo `solmandevlogo.webp`, banner referansı mevcut).
- TTS sesi `onyx` Türkçe'yi okur; istenirse alternatif ses denenebilir.

### 4. Env (`.env.local` veya `scripts/reels/.env.reels`)
```
OPENAI_API_KEY=                # TroyWire'ınki kullanılabilir veya ayrı
YOUTUBE_CLIENT_ID=             # Solman Google OAuth (get-youtube-tokens.mjs)
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REFRESH_TOKEN=
META_PAGE_ACCESS_TOKEN=        # Solman FB/IG (get-meta-token.mjs)
META_PAGE_ID=
META_IG_USER_ID=
NEXT_PUBLIC_SITE_URL=https://solmandigital.com
PUBLIC_REELS_DIR=             # VPS public klasör (nginx ile servis)
PUBLIC_REELS_BASEURL=         # https://<alan>/public/reels
```

### 5. VPS kurulumu
- ffmpeg + DejaVu font zaten kurulu (TroyWire'dan). Node 20 var.
- **Public video host (Meta için):**
  - Seçenek A (hızlı): TroyWire'ın mevcut `troywire.com/public/reels/` host'unu geçici dosya
    sunucusu olarak ortak kullan (video sadece upload anında orada, sonra silinir; marka görünmez).
  - Seçenek B (temiz): solmandigital.com VPS'te barınıyorsa ona nginx `location /public/reels/` ekle.
- Scriptleri VPS'e koy (repo klon veya rsync).
- **Cron** (TroyWire 09:00 ile çakışmasın → 09:30):
  ```
  30 9 * * * cd <solman-reels-dir> && /usr/bin/node make-solman-reels.mjs --count 3 \
             --platforms youtube,instagram,facebook >> /var/log/solman-reels.log 2>&1
  ```

### 6. Token üretimi (tek sefer, kullanıcı)
- **YouTube:** Solman Google hesabıyla `node get-youtube-tokens.mjs` (redirect URI'yi OAuth
  client'a ekle), çıkan `YOUTUBE_REFRESH_TOKEN`'ı env'e koy.
- **Meta:** Solman FB App (izinler: `pages_show_list, pages_read_engagement, pages_manage_posts,
  instagram_basic, instagram_content_publish, business_management`) → Graph API Explorer'dan kısa
  token → `META_APP_ID/SECRET/SHORT_TOKEN` env'e → `node get-meta-token.mjs` → çıkan
  `META_PAGE_ACCESS_TOKEN/META_PAGE_ID/META_IG_USER_ID`'yi env'e koy.

---

## Doğrulama
1. **Türkçe karakter:** 1 video render et → altyazıda "İ ş ğ ç ö ü ı" düzgün mü (DejaVu Bold).
2. **Dil/içerik:** `--dry` ile 1 video → narration + IG/FB caption + hashtag hepsi TÜRKÇE mi.
3. **Tek video gerçek:** `--count 1 --platforms instagram,facebook` → IG + FB'de Solman markalı
   Türkçe reel görünür.
4. **3 platform:** YouTube + IG + FB birden, log'da 3 ✅.
5. **Cron:** doğrulandıktan sonra ertesi gün otomatik 3 platforma Türkçe reels.

## Açık kararlar (sohbette netleştir)
- solmandigital.com VPS'te mi barınıyor? (public host Seçenek A/B)
- Konu havuzu / ton onayı (ne kadar satış, ne kadar bilgi).
- Günlük adet (öneri: 3) ve yayın saati.
- Gizlilik: ilk gün `unlisted`/`private` test mi, direkt `public` mi.

## Bilinen tuzaklar (TroyWire'dan)
- YouTube yeni kanal **günlük upload limiti** düşük (~10-15); doğrulama (youtube.com/verify) artırır.
- `pgrep -f make-...` komutu kendini sayar; süreç kontrolünde `pgrep -x node` veya tam yol kullan.
- Meta "fetch failed" geçici olabilir → retry mantığı motorda mevcut.
- `.env.local` git-ignore'da olmalı; token'ları repoya KOYMA.
