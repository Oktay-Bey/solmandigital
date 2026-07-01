/**
 * scripts/reels/make-solman-reels.mjs
 * GÜNLÜK BATCH: Solman Digital (yazılım ofisi) için Türkçe, bilgilendirici +
 * hizmete yumuşak yönlendiren ~15-25 sn dikey (9:16) reels üretir ve
 * YouTube Shorts + Instagram Reels + Facebook Reels'e dağıtır.
 *
 * DB GEREKTİRMEZ. scripts/reels/.env.reels (yoksa .env.local) okur:
 *   OPENAI_API_KEY + YOUTUBE_* + META_*.
 * En ucuz OpenAI: gpt-4o-mini (metin) + tts-1 (ses). Görsel: animasyonlu
 * marka zemini (telifsiz). Saf Node + fetch + ffmpeg — Next.js build'ine girmez.
 *
 * Kullanım:
 *   node make-solman-reels.mjs --count 3 --privacy unlisted
 *   node make-solman-reels.mjs --count 1 --dry        (yüklemez, ilkini önizler)
 *   node make-solman-reels.mjs --count 3 --platforms youtube,instagram,facebook
 *
 * TroyWire (NewsMotor) motorundan portlandı; medya/upload akışı aynen korundu,
 * içerik üretimi haber çekme yerine Türkçe Solman konu havuzuna çevrildi.
 */

import { readFileSync, writeFileSync, mkdtempSync, createReadStream, copyFileSync, existsSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'
import { Readable } from 'stream'
import { publishInstagramReel, publishFacebookReel, publishFacebookVideo } from './lib/meta-publish.mjs'

// ── env ───────────────────────────────────────────────────────
// Önce scripts/reels/.env.reels, yoksa repo kökündeki .env.local
const __dir = dirname(fileURLToPath(import.meta.url))
const ENV_CANDIDATES = [join(__dir, '.env.reels'), join(process.cwd(), '.env.local')]
const ENV_FILE = ENV_CANDIDATES.find((p) => existsSync(p))
if (!ENV_FILE) { console.error('Env bulunamadı: scripts/reels/.env.reels veya .env.local'); process.exit(1) }
const env = Object.fromEntries(
  readFileSync(ENV_FILE, 'utf8')
    .split('\n').filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const OPENAI_API_KEY = env.OPENAI_API_KEY
const YT_CLIENT_ID = env.YOUTUBE_CLIENT_ID || env.GOOGLE_CLIENT_ID
const YT_CLIENT_SECRET = env.YOUTUBE_CLIENT_SECRET || env.GOOGLE_CLIENT_SECRET
const YT_REFRESH = env.YOUTUBE_REFRESH_TOKEN
const SITE_URL = env.NEXT_PUBLIC_SITE_URL || 'https://solmandigital.com'
// Meta (Instagram + Facebook). IG ve FB AYRI app/token olabilir; ayrı yoksa
// ortak META_PAGE_ACCESS_TOKEN'a düşer (tek app senaryosu).
const IG_TOKEN = env.META_IG_TOKEN || env.META_PAGE_ACCESS_TOKEN
const FB_TOKEN = env.META_FB_TOKEN || env.META_PAGE_ACCESS_TOKEN
const META_PAGE_ID = env.META_PAGE_ID
const META_IG_USER_ID = env.META_IG_USER_ID
// Meta için video public bir URL'den sunulmalı (VPS nginx). Yoksa Meta atlanır.
const PUBLIC_REELS_DIR = env.PUBLIC_REELS_DIR || ''
const PUBLIC_REELS_BASEURL = env.PUBLIC_REELS_BASEURL || `${SITE_URL}/reels`

const args = process.argv.slice(2)
const flag = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d }
const COUNT = parseInt(flag('count', '3'), 10)
const privacy = flag('privacy', 'unlisted')
const dryRun = args.includes('--dry')
// Hedef platformlar (virgülle): youtube,instagram,facebook  (varsayılan: hepsi)
const PLATFORMS = flag('platforms', 'youtube,instagram,facebook').split(',').map((s) => s.trim().toLowerCase())
const wantYT = PLATFORMS.includes('youtube')
const wantIG = PLATFORMS.includes('instagram')
const wantFB = PLATFORMS.includes('facebook')

for (const [k, v] of Object.entries({ OPENAI_API_KEY })) { if (!v) { console.error('Eksik env: ' + k); process.exit(1) } }
if (!dryRun && wantYT) for (const [k, v] of Object.entries({ YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH })) { if (!v) { console.error('Eksik env: ' + k); process.exit(1) } }

const work = mkdtempSync(join(tmpdir(), 'solman-reels-'))
const log = (...a) => console.log('•', ...a)
const ffPath = (p) => p.replace(/\\/g, '/').replace(/:/g, '\\:')

// Platform-bağımsız font: Windows'ta Arial Bold, Linux/VPS'te DejaVu Sans Bold
// (DejaVu Türkçe karakterleri — İ ş ğ ç ö ü ı — sorunsuz render eder).
const FONT_CANDIDATES = [
  'C:/Windows/Fonts/arialbd.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
]
const FONT_FILE = FONT_CANDIDATES.find((p) => existsSync(p)) || FONT_CANDIDATES[0]
const FONT = ffPath(FONT_FILE)
const FONTS_DIR = ffPath(FONT_FILE.slice(0, FONT_FILE.lastIndexOf('/')))
const SUB_FONTNAME = FONT_FILE.includes('DejaVu') ? 'DejaVu Sans' : (FONT_FILE.includes('Liberation') ? 'Liberation Sans' : 'Arial')

// Solman marka rengi (app/globals.css @theme): accent-700 = #9b1c1c (bordo),
// accent-800 = #7f1d1d. FFmpeg CSS değişkeni okuyamaz → buraya sabitlendi.
const BRAND = '0x9B1C1C'        // accent-700 — kutu/CTA
const BRAND_DARK = '0x7F1D1D'   // accent-800

// ════════════════════════════════════════════════════════════════
//  İÇERİK ÜRETİMİ — Türkçe Solman konu havuzu (haber çekme YOK)
// ════════════════════════════════════════════════════════════════
async function gpt(messages, max_tokens) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-4o-mini', max_tokens, messages }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error('GPT error: ' + JSON.stringify(data))
  return data.choices[0].message.content.replace(/```json|```/g, '').trim()
}

// Konu havuzu — GPT'ye her gün farklı açı için ipucu verir (tekrarı azaltır).
const TOPICS = [
  'web sitesi hızı / performans (Core Web Vitals, LCP)',
  'SEO (teknik SEO, içerik, sıralama)',
  'e-ticaret (dönüşüm oranı, sepet terki, ürün sayfası)',
  'süreç otomasyonu (tekrarlayan işleri yazılımla otomatikleştirme)',
  'yapay zekâ ile verimlilik (iş akışına AI entegrasyonu)',
  'dijital pazarlama (Google Ads, dönüşüm takibi)',
  'lead toplama / form optimizasyonu',
  'mobil uyumluluk ve erişilebilirlik (a11y)',
]

// N adet Türkçe reels scripti üret (tek GPT çağrısı — ucuz + tutarlı).
async function generateSolmanScripts(n) {
  log(`GPT ile ${n} Türkçe Solman reels metni üretiliyor (gpt-4o-mini)...`)
  // Her video için farklı konu seç (havuzdan rastgele, çakışmasız)
  const pool = [...TOPICS].sort(() => Math.random() - 0.5).slice(0, n)
  const topicList = pool.map((t, i) => `${i + 1}. ${t}`).join('\n')

  const system =
    'Sen Solman Digital (bir YAZILIM OFİSİ) için kısa, vurucu TÜRKÇE Reels metinleri yazıyorsun. ' +
    'İzleyiciye önce somut, uygulanabilir bir ipucu ver; sonra Solman Digital hizmetine yumuşakça yönlendir. ' +
    '"Biz" dili kullan (geliştiriyoruz, teslim ediyoruz, çalışıyoruz). Korku temelli ton KESİNLİKLE YASAK. ' +
    'Şu kelimeleri ASLA kullanma: ajans, ekip, kadro, freelancer, serbest çalışan, ben, benim. ' +
    'TÜM çıktı TÜRKÇE olacak. Yalnızca geçerli JSON döndür.'

  const user = `Aşağıdaki ${n} konunun HER BİRİ için bir reels üret (sırayla, farklı açı):
${topicList}

Yalnızca şu JSON dizisini döndür (tam olarak ${n} eleman):
[
 {
  "category":"WEB|SEO|E-TICARET|OTOMASYON|YAPAY ZEKA|PAZARLAMA (tek kelime, TR, büyük harf)",
  "narration":"35-55 kelime, TÜRKÇE. Önce merak uyandıran kısa bir hook, sonra somut bir ipucu, en sonda TAM OLARAK şu ifadeyle bit: solmandigital.com. 'Biz' dili kullan.",
  "seo_title":"TÜRKÇE SEO YouTube başlığı, 40-70 karakter, konuyla ilgili anahtar kelime içerir",
  "seo_description":"2 TÜRKÇE cümle, konuyu özetler ve anahtar kelime içerir; sonra yeni satır: Daha fazlası: ${SITE_URL}",
  "hashtags":["#Shorts","TÜRKÇE konuyla ilgili 6 hashtag, # ile başlar"],
  "ig_hashtags":["12-15 TÜRKÇE Instagram hashtag'i, her biri # ile başlar, #Shorts YOK. Genis erişim (#webtasarim #seo #eticaret #dijitalpazarlama #yazilim) + bu konuya özel 5+ hashtag karışımı. En az 12 eleman ZORUNLU."],
  "fb_caption":"2 ilgi çekici TÜRKÇE cümle, sonra yeni satır, sonra TAM 5 TÜRKÇE hashtag (# ile), sonra yeni satır: Daha fazlası: ${SITE_URL}"
 }
]`

  const raw = await gpt([
    { role: 'system', content: system },
    { role: 'user', content: user },
  ], 2200)
  let arr
  try { arr = JSON.parse(raw) } catch (e) { throw new Error('GPT JSON parse hatası: ' + raw.slice(0, 200)) }
  if (!Array.isArray(arr)) throw new Error('GPT dizi döndürmedi')
  return arr.slice(0, n)
}

// ════════════════════════════════════════════════════════════════
//  MEDYA YARDIMCILARI  (TroyWire'dan aynen — kanıtlanmış)
// ════════════════════════════════════════════════════════════════
async function synthVoice(text, outPath) {
  // Geçici ağ hatalarına karşı 3 deneme (artan bekleme)
  let lastErr
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'tts-1', voice: 'onyx', input: text, response_format: 'mp3', speed: 1.0 }),
      })
      if (!res.ok) throw new Error('TTS error: ' + (await res.text()))
      writeFileSync(outPath, Buffer.from(await res.arrayBuffer()))
      return
    } catch (e) {
      lastErr = e
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 2000))
    }
  }
  throw lastErr
}
function audioDuration(p) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', p], { encoding: 'utf8' })
  return parseFloat((r.stdout || '0').trim()) || 14
}

function buildAss(text, totalSec, outPath) {
  const words = text.replace(/\s+/g, ' ').trim().split(' ')
  // Gruplar 4-5 kelime / ~30 karaktere kadar → her altyazı daha uzun ekranda
  // kalır, göz yetişir. Tek satıra sığar (PlayResX 1080, ~30ch).
  const groups = []; let g = []
  for (const w of words) {
    const tooLong = [...g, w].join(' ').length > 30
    if (g.length >= 5 || (tooLong && g.length >= 1)) { groups.push(g); g = [w] }
    else g.push(w)
  }
  if (g.length) groups.push(g)
  const per = totalSec / groups.length
  const cs = (s) => { const m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60), cnt = Math.floor((s % 1) * 100); return `0:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(cnt).padStart(2, '0')}` }
  // Türkçe karakterleri de "anahtar kelime" sayımına dahil et (uzunsa vurgula)
  const key = (w) => w.replace(/[^A-Za-zÇĞİÖŞÜçğıöşü0-9]/g, '').length >= 6 || /\d/.test(w)
  let ev = ''
  groups.forEach((grp, i) => {
    // Vurgu rengi bordo (ASS BGR: &H1C1C9B& = 0x9B1C1C)
    const line = grp.map((w) => (key(w) ? `{\\c&H1C1C9B&}${w}{\\c&HFFFFFF&}` : w)).join(' ')
    const anim = `{\\fad(120,80)\\fscx88\\fscy88\\t(0,160,\\fscx108\\fscy108)\\t(160,300,\\fscx100\\fscy100)}`
    ev += `Dialogue: 0,${cs(i * per)},${cs((i + 1) * per - 0.03)},Pop,,0,0,0,,${anim}${line}\n`
  })
  writeFileSync(outPath, `[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Outline, Shadow, Alignment, MarginL, MarginR, MarginV
Style: Pop,${SUB_FONTNAME},66,&H00FFFFFF,&H00000000,&H96000000,1,5,3,2,110,110,300

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${ev}`)
}

// Render: her zaman animasyonlu marka zemini (Solman bordo paleti).
function renderVideo({ audioPath, assPath, category, outPath }) {
  const dur = audioDuration(audioPath); const D = dur.toFixed(2)
  const assEsc = ffPath(assPath); const tEnd = (dur - 3.4).toFixed(2)
  const cat = (category || 'SOLMAN').toUpperCase().replace(/[':\\%]/g, ' ').slice(0, 18)

  const top =
    `drawbox=x=0:y=0:w=1080:h=240:color=black@0.5:t=fill,` +
    `drawbox=x=0:y=1560:w=1080:h=360:color=black@0.55:t=fill,` +
    `drawtext=fontfile='${FONT}':text='SOLMAN DIGITAL':fontcolor=white:fontsize=44:x=(w-text_w)/2:y=84:box=1:boxcolor=${BRAND}@1:boxborderw=20,` +
    `drawtext=fontfile='${FONT}':text='${cat}':fontcolor=0xF5BFBF:fontsize=30:x=(w-text_w)/2:y=170`
  const cta =
    `drawtext=fontfile='${FONT}':text='solmandigital.com':fontcolor=white:fontsize=78:x=(w-text_w)/2:y=980:box=1:boxcolor=${BRAND}@0.95:boxborderw=28:enable='gte(t,${tEnd})',` +
    `drawtext=fontfile='${FONT}':text='Detaylar sitede':fontcolor=0xFDE68A:fontsize=40:x=(w-text_w)/2:y=1110:enable='gte(t,${tEnd})'`
  const subs = `subtitles='${assEsc}':fontsdir='${FONTS_DIR}'`
  const prog = `drawbox=x=0:y=1895:w='1080*t/${D}':h=12:color=${BRAND}@1:t=fill`

  // Bordo/koyu marka gradient zemini + yumuşak hareketli bloblar
  const bg = `gradients=s=1080x1920:c0=0x3B0D0D:c1=0x111111:c2=0x631717:c3=0x9B1C1C:d=${D}:speed=0.06,format=yuv420p`
  const blobs = `drawbox=x='150+200*sin(t*0.7)':y='400+260*cos(t*0.5)':w=560:h=560:color=${BRAND}@0.20:t=fill,drawbox=x='560+220*cos(t*0.45)':y='1000+220*sin(t*0.5)':w=500:h=500:color=${BRAND_DARK}@0.22:t=fill,gblur=sigma=70`
  const bigCat = `drawtext=fontfile='${FONT}':text='${cat}':fontcolor=white:fontsize=120:x=(w-text_w)/2:y=620:box=1:boxcolor=0x111111@0.35:boxborderw=20:enable='lt(t,${tEnd})'`
  const vf = `${blobs},${top},${bigCat},${cta},${subs},${prog}`
  const ffArgs = ['-y', '-f', 'lavfi', '-i', bg, '-i', audioPath, '-vf', vf,
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '128k', '-shortest', outPath]

  const r = spawnSync('ffmpeg', ffArgs, { encoding: 'utf8' })
  if (r.status !== 0) throw new Error('FFmpeg failed:\n' + (r.stderr || '').slice(-1500))
  return dur
}

// ════════════════════════════════════════════════════════════════
//  YOUTUBE  (TroyWire'dan aynen)
// ════════════════════════════════════════════════════════════════
async function ytAccessToken() {
  const body = new URLSearchParams({ client_id: YT_CLIENT_ID, client_secret: YT_CLIENT_SECRET, refresh_token: YT_REFRESH, grant_type: 'refresh_token' })
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
  const t = await r.json()
  if (!t.access_token) throw new Error('Token refresh failed: ' + JSON.stringify(t))
  return t.access_token
}
async function uploadToYoutube({ videoPath, title, description, tags, accessToken }) {
  // categoryId 28 = Science & Technology (Solman içeriğine uygun)
  const metadata = {
    snippet: { title: title.slice(0, 98), description: description.slice(0, 4900), tags: (tags || []).slice(0, 15), categoryId: '28' },
    status: { privacyStatus: privacy, selfDeclaredMadeForKids: false },
  }
  const init = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method: 'POST', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4' },
    body: JSON.stringify(metadata),
  })
  if (!init.ok) throw new Error('Upload init failed: ' + (await init.text()))
  const uploadUrl = init.headers.get('location')
  const stream = Readable.toWeb(createReadStream(videoPath))
  const put = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': 'video/mp4' }, body: stream, duplex: 'half' })
  const out = await put.json()
  if (!put.ok || !out.id) throw new Error('Upload failed: ' + JSON.stringify(out))
  return out.id
}

// ════════════════════════════════════════════════════════════════
//  ÜRETİM
// ════════════════════════════════════════════════════════════════
async function produceOne(item, idx, token) {
  const validCats = ['WEB', 'SEO', 'E-TICARET', 'OTOMASYON', 'YAPAY ZEKA', 'PAZARLAMA']
  const rawCat = String(item.category || 'SOLMAN').toUpperCase()
  item.category = validCats.find((c) => rawCat.includes(c)) || rawCat.split(/[|,/]/)[0].trim() || 'SOLMAN'
  const tag = `[${idx + 1}/${COUNT}] ${item.category}`
  log(`${tag}: "${(item.seo_title || '').slice(0, 50)}"`)

  const audioPath = join(work, `v${idx}.mp3`)
  await synthVoice(item.narration, audioPath)
  const assPath = join(work, `s${idx}.ass`)
  buildAss(item.narration, audioDuration(audioPath), assPath)

  const videoPath = join(work, `r${idx}.mp4`)
  const dur = renderVideo({ audioPath, assPath, category: item.category, outPath: videoPath })

  const hashtags = (item.hashtags || ['#Shorts']).filter(h => h.startsWith('#'))
  const tags = hashtags.map(h => h.replace(/^#/, ''))
  const title = item.seo_title.includes('#Shorts') ? item.seo_title : `${item.seo_title} #Shorts`
  const description = `${item.seo_description}\n\n${hashtags.join(' ')}`
  // Platforma özel metinler
  const igHashtags = (item.ig_hashtags || hashtags).filter(h => h.startsWith('#')).filter(h => h.toLowerCase() !== '#shorts')
  const igCaption = `${item.seo_title}\n\n${item.seo_description}\n\n${igHashtags.join(' ')}`.slice(0, 2150)
  const fbCaption = (item.fb_caption || description).slice(0, 4000)

  if (dryRun) {
    if (idx === 0) { const keep = join(process.cwd(), 'sample-reel.mp4'); writeFileSync(keep, readFileSync(videoPath)); console.log('   🔎 önizleme:', keep) }
    console.log(`   (dry) ${dur.toFixed(1)}s | TITLE: ${title}`)
    console.log(`   narration: ${item.narration}`)
    console.log(`   ig: ${igCaption.replace(/\n/g, ' ⏎ ').slice(0, 160)}`)
    return { dry: true }
  }

  const result = { platforms: {} }

  // ── YouTube ──
  if (wantYT && token) {
    try {
      const id = await uploadToYoutube({ videoPath, title, description, tags, accessToken: token })
      console.log(`   ✅ YouTube: https://www.youtube.com/watch?v=${id}`)
      result.platforms.youtube = id
    } catch (e) { console.log(`   ❌ YouTube: ${e.message}`); result.platforms.youtube = null }
  }

  // ── Meta (Instagram + Facebook) — video public URL'den gönderilir ──
  const igReady = wantIG && IG_TOKEN && META_IG_USER_ID
  const fbReady = wantFB && FB_TOKEN && META_PAGE_ID
  const needMeta = igReady || fbReady
  if (needMeta && !PUBLIC_REELS_DIR) {
    console.log('   ⚠ Meta atlandı: PUBLIC_REELS_DIR ayarlı değil (video host yok)')
  } else if (needMeta) {
    let publicPath = null, publicUrl = null
    try {
      if (!existsSync(PUBLIC_REELS_DIR)) throw new Error(`PUBLIC_REELS_DIR yok: ${PUBLIC_REELS_DIR}`)
      const fname = `sd-${Date.now()}-${idx}.mp4`
      publicPath = join(PUBLIC_REELS_DIR, fname)
      publicUrl = `${PUBLIC_REELS_BASEURL.replace(/\/$/, '')}/${fname}`
      copyFileSync(videoPath, publicPath)

      if (igReady) {
        const r = await publishInstagramReel({ videoUrl: publicUrl, caption: igCaption, igUserId: META_IG_USER_ID, token: IG_TOKEN })
        if (r.error) { console.log(`   ❌ Instagram: ${r.error}`); result.platforms.instagram = null }
        else { console.log(`   ✅ Instagram: ${r.url || r.id}`); result.platforms.instagram = r.id }
      }
      if (fbReady) {
        const fr = await publishFacebookReel({ videoUrl: publicUrl, description: fbCaption, pageId: META_PAGE_ID, token: FB_TOKEN })
        if (fr.error) {
          console.log(`   ⚠ FB Reel: ${fr.error} → normal video deneniyor`)
          const fv = await publishFacebookVideo({ videoUrl: publicUrl, description: fbCaption, pageId: META_PAGE_ID, token: FB_TOKEN })
          if (fv.error) { console.log(`   ❌ Facebook: ${fv.error}`); result.platforms.facebook = null }
          else { console.log(`   ✅ Facebook (video): ${fv.url || fv.id}`); result.platforms.facebook = fv.id }
        } else { console.log(`   ✅ Facebook (reel): ${fr.url || fr.id}`); result.platforms.facebook = fr.id }
      }
    } catch (e) {
      console.log(`   ❌ Meta dağıtım: ${e.message}`)
    } finally {
      // public dosyayı sil (disk şişmesin) — Meta videoyu zaten çekti
      if (publicPath && existsSync(publicPath)) { try { unlinkSync(publicPath) } catch { /* */ } }
    }
  }

  return result
}

;(async () => {
  try {
    const items = await generateSolmanScripts(COUNT)
    if (!items.length) throw new Error('İçerik üretilemedi')

    log(`Hedef platformlar: ${PLATFORMS.join(', ')}`)
    const token = (dryRun || !wantYT) ? null : await ytAccessToken()
    const results = []
    for (let i = 0; i < items.length; i++) {
      try { results.push(await produceOne(items[i], i, token)) }
      catch (e) { console.error(`   ❌ ${i + 1}. video hata:`, e.message) }
    }

    if (dryRun) {
      const ok = results.filter(r => r && r.dry).length
      console.log(`\n══ TAMAM: ${ok}/${items.length} reels üretildi (dry) ══`)
    } else {
      const tally = { youtube: 0, instagram: 0, facebook: 0 }
      for (const r of results) for (const p of Object.keys(tally)) if (r?.platforms?.[p]) tally[p]++
      console.log(`\n══ TAMAM (${items.length} video) ══`)
      if (wantYT) console.log(`   YouTube : ${tally.youtube}/${items.length}`)
      if (wantIG) console.log(`   Instagram: ${tally.instagram}/${items.length}`)
      if (wantFB) console.log(`   Facebook : ${tally.facebook}/${items.length}`)
    }
  } catch (e) {
    console.error('\n❌ HATA:', e.message)
    process.exit(1)
  }
})()
