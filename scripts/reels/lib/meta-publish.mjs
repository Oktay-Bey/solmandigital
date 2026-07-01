/**
 * scripts/lib/meta-publish.mjs
 * TroyWire reels'lerini Meta platformlarına dağıtır: Instagram Reels,
 * Facebook Reels ve Facebook normal video post.
 *
 * Plain fetch (SDK yok) — make-daily-reels.mjs ile aynı stil.
 * Video DOSYA olarak değil, public bir URL'den (VPS nginx) gönderilir;
 * Meta videoyu o URL'den kendisi çeker.
 *
 * Graph API sürümü:
 */
const GRAPH = 'https://graph.facebook.com/v21.0'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function gget(path, params) {
  const url = new URL(`${GRAPH}/${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const r = await fetch(url)
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(`GET ${path} (${r.status}): ${j.error?.message || JSON.stringify(j)}`)
  return j
}
async function gpost(path, params) {
  const body = new URLSearchParams(params)
  const r = await fetch(`${GRAPH}/${path}`, { method: 'POST', body })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(`POST ${path} (${r.status}): ${j.error?.message || JSON.stringify(j)}`)
  return j
}

// ─── Instagram Reels ──────────────────────────────────────────
// 1) media container (REELS, video_url) → 2) poll FINISHED → 3) media_publish
export async function publishInstagramReel({ videoUrl, caption, igUserId, token }) {
  if (!igUserId || !token) return { error: 'IG yapılandırılmadı (META_IG_USER_ID / token)' }
  try {
    const container = await gpost(`${igUserId}/media`, {
      media_type: 'REELS',
      video_url: videoUrl,
      caption: caption || '',
      access_token: token,
    })
    const creationId = container.id
    if (!creationId) return { error: 'IG container id alınamadı' }

    // Meta videoyu indirip işliyor — FINISHED olana kadar bekle (max ~120sn)
    let status = ''
    for (let i = 0; i < 24; i++) {
      await sleep(5000)
      const s = await gget(`${creationId}`, { fields: 'status_code,status', access_token: token })
      status = s.status_code
      if (status === 'FINISHED') break
      if (status === 'ERROR') return { error: `IG işleme hatası: ${s.status || ''}` }
    }
    if (status !== 'FINISHED') return { error: `IG container zamanında hazır olmadı (status=${status})` }

    const published = await gpost(`${igUserId}/media_publish`, {
      creation_id: creationId,
      access_token: token,
    })
    if (!published.id) return { error: 'IG media_publish id dönmedi' }
    return { id: published.id, url: `https://www.instagram.com/reel/${published.id}` }
  } catch (e) {
    return { error: String(e.message || e) }
  }
}

// ─── Facebook Reels (Sayfa) ───────────────────────────────────
// start → upload(hosted_url) → finish(PUBLISHED)
export async function publishFacebookReel({ videoUrl, description, pageId, token }) {
  if (!pageId || !token) return { error: 'FB yapılandırılmadı (META_PAGE_ID / token)' }
  try {
    // 1) upload session başlat
    const start = await gpost(`${pageId}/video_reels`, { upload_phase: 'start', access_token: token })
    const videoId = start.video_id
    if (!videoId) return { error: 'FB Reel video_id alınamadı' }

    // 2) hosted file upload — video_file_url header ile
    const up = await fetch(`https://rupload.facebook.com/video-upload/v21.0/${videoId}`, {
      method: 'POST',
      headers: { Authorization: `OAuth ${token}`, file_url: videoUrl },
    })
    const upj = await up.json().catch(() => ({}))
    if (!up.ok || upj.success === false) return { error: `FB Reel upload: ${upj.error?.message || JSON.stringify(upj)}` }

    // 3) işlenmeyi bekle, sonra publish
    let ready = false
    for (let i = 0; i < 24; i++) {
      await sleep(5000)
      const st = await gget(`${videoId}`, { fields: 'status', access_token: token })
      const vs = st.status?.video_status || st.status?.processing_phase?.status
      if (vs === 'ready' || vs === 'complete') { ready = true; break }
      if (vs === 'error') return { error: 'FB Reel işleme hatası' }
    }
    // bazı durumlarda finish publish'i tetikler; ready beklemeden de denenebilir
    const finish = await gpost(`${pageId}/video_reels`, {
      upload_phase: 'finish',
      video_id: videoId,
      video_state: 'PUBLISHED',
      description: description || '',
      access_token: token,
    })
    if (finish.success === false) return { error: `FB Reel finish başarısız: ${JSON.stringify(finish)}` }
    return { id: videoId, url: `https://www.facebook.com/reel/${videoId}`, ready }
  } catch (e) {
    return { error: String(e.message || e) }
  }
}

// ─── Facebook normal video post (Sayfa) ───────────────────────
// Tek çağrı: file_url ile. En basit/güvenli yol.
export async function publishFacebookVideo({ videoUrl, description, pageId, token }) {
  if (!pageId || !token) return { error: 'FB yapılandırılmadı (META_PAGE_ID / token)' }
  try {
    const res = await gpost(`${pageId}/videos`, {
      file_url: videoUrl,
      description: description || '',
      access_token: token,
    })
    if (!res.id) return { error: 'FB video id dönmedi' }
    return { id: res.id, url: `https://www.facebook.com/${res.id}` }
  } catch (e) {
    return { error: String(e.message || e) }
  }
}

/** Env'den Meta yapılandırması var mı? */
export function isMetaConfigured() {
  return Boolean(process.env.META_PAGE_ACCESS_TOKEN && (process.env.META_PAGE_ID || process.env.META_IG_USER_ID))
}
