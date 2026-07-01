# Solman Digital — Reels Otomasyonu

Her gün otomatik olarak Türkçe, bilgilendirici + hizmete yönlendiren dikey (9:16)
reels üretip **YouTube Shorts + Instagram Reels + Facebook Reels**'e dağıtır.

Saf Node + `fetch` + `ffmpeg` — Next.js build'ine **dahil değil**, Vercel'i etkilemez.
Hetzner VPS cron'unda çalışır. TroyWire (NewsMotor) motorundan portlandı.

## Dosyalar
- `make-solman-reels.mjs` — ana motor (içerik → TTS → render → YT/IG/FB upload)
- `lib/meta-publish.mjs` — IG/FB publish (proje-bağımsız)
- `get-youtube-tokens.mjs` — YouTube OAuth refresh token üretici (tek sefer)
- `get-meta-token.mjs` — Meta long-lived Page token + IG user id (tek sefer)
- `.env.reels.example` — env şablonu (kopyala → `.env.reels`)

## Kurulum

```bash
cp .env.reels.example .env.reels   # değerleri doldur (git-ignored)
```

### 1) YouTube token (tek sefer)
Google Cloud OAuth client'a redirect URI ekle: `http://localhost:3334/callback`
```bash
node get-youtube-tokens.mjs        # tarayıcıda Solman Google hesabıyla onayla
# çıkan YOUTUBE_REFRESH_TOKEN'ı .env.reels'e yaz
```

### 2) Meta token (tek sefer)
Solman FB App izinleri: `pages_show_list, pages_read_engagement, pages_manage_posts,
instagram_basic, instagram_content_publish, business_management`.
Graph API Explorer'dan kısa token al → `.env.reels`'e `META_APP_ID/SECRET/SHORT_TOKEN` →
```bash
node get-meta-token.mjs            # META_PAGE_ACCESS_TOKEN/PAGE_ID/IG_USER_ID basar
```
IG hesabı **Business/Creator** olmalı ve FB Sayfasına bağlı olmalı.

### 3) Public video host (Meta için)
Meta videoyu **dosya değil public URL'den** çeker. `PUBLIC_REELS_DIR` (nginx ile servis
edilen klasör) + `PUBLIC_REELS_BASEURL` ver. Video yalnızca upload anında oraya kopyalanır,
Meta çektikten sonra silinir.

## Kullanım
```bash
node make-solman-reels.mjs --count 1 --dry                 # önizleme (sample-reel.mp4)
node make-solman-reels.mjs --count 1 --platforms instagram,facebook --privacy unlisted
node make-solman-reels.mjs --count 3 --platforms youtube,instagram,facebook
```

Bayraklar: `--count` (varsayılan 3), `--platforms` (youtube,instagram,facebook),
`--privacy` (unlisted|public|private, varsayılan unlisted), `--dry` (yüklemez).

## Cron (VPS, 09:30 — TroyWire 09:00 ile çakışmaz)
```
30 9 * * * cd <solman-reels-dir> && /usr/bin/node make-solman-reels.mjs --count 3 \
           --platforms youtube,instagram,facebook --privacy unlisted >> /var/log/solman-reels.log 2>&1
```
Doğrulama tamamlanınca `--privacy unlisted` → `public`.

## Marka kuralları (önemli)
İçerik promptu "yazılım ofisi" + "biz" dili kullanır. `ajans/ekip/kadro/freelancer/ben/benim`
kelimeleri yasaktır (bkz. repo kök `AGENTS.md`). Korku temelli ton yok.

## Bilinen tuzaklar
- YouTube yeni kanal günlük upload limiti düşük (~10-15); `youtube.com/verify` artırır.
- Meta "fetch failed" geçici olabilir → motorda 3× retry var.
- Türkçe karakter için VPS'te `DejaVuSans-Bold.ttf` gerekli (kod otomatik seçer).
