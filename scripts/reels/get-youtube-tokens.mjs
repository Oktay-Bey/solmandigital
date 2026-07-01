/**
 * One-time script to get a YouTube OAuth2 refresh token (upload scope).
 * Run: node scripts/get-youtube-tokens.mjs
 *
 * Needs: YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET in .env.local
 * (falls back to GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET if the YT-specific
 *  vars are absent — i.e. you reuse the same Google Cloud OAuth client).
 *
 * This token is SEPARATE from GOOGLE_REFRESH_TOKEN (analytics/GSC, read-only).
 * Keep the analytics token untouched — the channel may be a different account.
 */

import { createServer } from 'http'
import { readFileSync } from 'fs'
import { URL } from 'url'

// ── Read env from .env.local ──────────────────────────────────
const envText = readFileSync('.env.local', 'utf8')
const env = Object.fromEntries(
  envText
    .split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
)

const CLIENT_ID = env.YOUTUBE_CLIENT_ID || env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = env.YOUTUBE_CLIENT_SECRET || env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:3334/callback'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n❌  Add YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET (or GOOGLE_CLIENT_ID/SECRET) to .env.local first.\n')
  process.exit(1)
}

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
].join(' ')

const authUrl =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&access_type=offline` +
  `&prompt=consent`

console.log('\n── Solman Digital YouTube OAuth Token Generator ──────────')
console.log('\n1. Add this exact redirect URI to your OAuth client in Google Cloud Console:')
console.log('   ' + REDIRECT_URI)
console.log('\n2. Open this URL in your browser:\n')
console.log('   ' + authUrl)
console.log('\n3. Log in with the Google account that OWNS the YouTube channel.')
console.log('4. After authorizing, you will be redirected to localhost — wait...\n')

// ── Local server to catch the redirect ───────────────────────
const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI)
  const code = url.searchParams.get('code')

  if (!code) {
    res.end('No code received. Try again.')
    return
  }

  // Exchange code for tokens
  const body = new URLSearchParams({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  }).toString()

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const tokens = await tokenRes.json()

  if (tokens.error) {
    res.end('Error: ' + tokens.error_description)
    console.error('\n❌  Token exchange failed:', tokens.error_description)
    server.close()
    return
  }

  res.end('<h2>✅ Success! Check your terminal for the refresh token.</h2><p>You can close this tab.</p>')

  console.log('\n── ✅ Add these to .env.local and VPS env ────────────────────\n')
  console.log(`YOUTUBE_CLIENT_ID=${CLIENT_ID}`)
  console.log(`YOUTUBE_CLIENT_SECRET=${CLIENT_SECRET}`)
  console.log(`YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}`)
  console.log('\n─────────────────────────────────────────────────────────────\n')

  server.close()
})

server.listen(3334, () => {
  console.log('Waiting for Google redirect on http://localhost:3334 ...\n')
})
