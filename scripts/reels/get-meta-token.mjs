/**
 * scripts/get-meta-token.mjs
 * Meta (Instagram + Facebook) dağıtımı için gereken kalıcı kimlik bilgilerini üretir:
 *   META_PAGE_ACCESS_TOKEN  (long-lived, ~60 gün; Page token süresizdir)
 *   META_PAGE_ID
 *   META_IG_USER_ID
 *
 * ÖN HAZIRLIK (tek sefer, kullanıcı tarafında):
 *  1. https://developers.facebook.com → bir App oluştur (type: Business).
 *  2. App'e "Facebook Login" + Graph API ekle.
 *  3. https://developers.facebook.com/tools/explorer (Graph API Explorer):
 *     - App'ini seç, "User Token" al, şu izinleri ekle:
 *         pages_show_list, pages_read_engagement, pages_manage_posts,
 *         instagram_basic, instagram_content_publish, business_management
 *     - "Generate Access Token" → çıkan KISA token'ı kopyala.
 *  4. .env.local'e ekle:
 *         META_APP_ID=...
 *         META_APP_SECRET=...
 *         META_SHORT_TOKEN=<explorer'dan kopyaladığın kısa token>
 *  5. Çalıştır:  node scripts/get-meta-token.mjs
 *
 * Script kısa token'ı long-lived'a çevirir, Sayfa(lar)ını + bağlı IG hesabını bulur,
 * .env.local'e yapıştırılacak satırları basar.
 */

import { readFileSync } from 'fs'

const GRAPH = 'https://graph.facebook.com/v21.0'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n').filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

const APP_ID = env.META_APP_ID
const APP_SECRET = env.META_APP_SECRET
const SHORT_TOKEN = env.META_SHORT_TOKEN

if (!APP_ID || !APP_SECRET || !SHORT_TOKEN) {
  console.error('\n❌  .env.local içine META_APP_ID, META_APP_SECRET ve META_SHORT_TOKEN ekle.')
  console.error('    (Detay: bu dosyanın başındaki ÖN HAZIRLIK adımları.)\n')
  process.exit(1)
}

async function gget(path, params) {
  const url = new URL(`${GRAPH}/${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const r = await fetch(url)
  const j = await r.json()
  if (!r.ok) throw new Error(`${path}: ${j.error?.message || JSON.stringify(j)}`)
  return j
}

try {
  console.log('\n── Solman Digital Meta Token Üretici ──────────────────────')

  // 1) kısa token → long-lived USER token
  console.log('1) Long-lived user token alınıyor...')
  const ll = await gget('oauth/access_token', {
    grant_type: 'fb_exchange_token',
    client_id: APP_ID,
    client_secret: APP_SECRET,
    fb_exchange_token: SHORT_TOKEN,
  })
  const userToken = ll.access_token
  if (!userToken) throw new Error('long-lived user token alınamadı')

  // 2) Sayfalar + Page token (Page token long-lived user token'dan türeyince süresiz olur)
  console.log('2) Sayfalar listeleniyor...')
  const pages = await gget('me/accounts', { access_token: userToken, fields: 'id,name,access_token' })
  const list = pages.data || []
  if (!list.length) throw new Error('Bu hesaba bağlı Facebook Sayfası bulunamadı.')

  console.log(`   ${list.length} sayfa bulundu:`)
  list.forEach((p, i) => console.log(`     [${i}] ${p.name} (${p.id})`))

  // İlk sayfayı kullan (genelde tek sayfa olur); birden fazlaysa kullanıcı .env'i elle düzeltir
  const page = list[0]
  const pageToken = page.access_token

  // 3) Sayfaya bağlı IG Business hesabı
  console.log(`3) "${page.name}" sayfasına bağlı Instagram hesabı aranıyor...`)
  let igId = ''
  try {
    const ig = await gget(`${page.id}`, { fields: 'instagram_business_account', access_token: pageToken })
    igId = ig.instagram_business_account?.id || ''
  } catch { /* IG bağlı değilse boş kalır */ }

  // --for ig | fb : iki ayrı app senaryosunda hangi env adının basılacağını belirler.
  // Verilmezse tek-app modu (META_PAGE_ACCESS_TOKEN).
  const forArg = (process.argv.find((a) => a.startsWith('--for=')) || '').split('=')[1]
    || (process.argv.includes('--for') ? process.argv[process.argv.indexOf('--for') + 1] : '')

  console.log('\n── ✅ .env.local + VPS env\'e ekle ────────────────────────────\n')
  if (forArg === 'ig') {
    console.log(`META_IG_TOKEN=${pageToken}`)
    console.log(`META_IG_USER_ID=${igId || '(IG Business hesabı sayfaya bağlı değil — bağlayıp tekrar çalıştır)'}`)
  } else if (forArg === 'fb') {
    console.log(`META_FB_TOKEN=${pageToken}`)
    console.log(`META_PAGE_ID=${page.id}`)
  } else {
    // tek app modu
    console.log(`META_PAGE_ACCESS_TOKEN=${pageToken}`)
    console.log(`META_PAGE_ID=${page.id}`)
    console.log(`META_IG_USER_ID=${igId || '(IG Business hesabı sayfaya bağlı değil — bağlayıp tekrar çalıştır)'}`)
  }
  console.log('\n─────────────────────────────────────────────────────────────')
  if (list.length > 1) console.log('Not: Birden fazla sayfa var; yukarıda [0] kullanıldı. Farklıysa ID/token\'ı elle değiştir.')
  if (forArg !== 'fb' && !igId) console.log('Not: IG paylaşımı için Instagram Business/Creator hesabını bu Facebook Sayfasına bağla.')
  console.log('')
} catch (e) {
  console.error('\n❌ HATA:', e.message, '\n')
  process.exit(1)
}
