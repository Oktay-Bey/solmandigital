import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"
import { rehberPosts } from "@/lib/data/rehber"

// Google Indexing API — sadece "URL_UPDATED" veya "URL_DELETED" type'ı kabul eder
// Önemli: Bu API yalnızca JobPosting ve BroadcastEvent schema türlü sayfalar için
// resmi olarak desteklenir. Diğer sayfalar için Search Console URL inspection API
// veya IndexNow kullanmak daha güvenilirdir.

type IndexingType = "URL_UPDATED" | "URL_DELETED"

async function getAccessToken(): Promise<string> {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!serviceAccountJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not set")

  const credentials = JSON.parse(serviceAccountJson)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  })
  const token = await auth.getAccessToken()
  if (!token) throw new Error("Failed to get access token")
  return token as string
}

async function submitUrl(accessToken: string, url: string, type: IndexingType) {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url, type }),
  })
  const data = await res.json()
  return { url, status: res.status, data }
}

function getAllSiteUrls(): string[] {
  const base = siteConfig.url
  const static_ = [
    base,
    `${base}/hizmetler`,
    `${base}/ai-otomasyon-hizmeti`,
    `${base}/trendyol-entegrasyonu`,
    `${base}/web-sitesi-yaptirmak`,
    `${base}/saas-platform-gelistirme`,
    `${base}/istanbul-web-developer`,
    `${base}/fiyatlar`,
    `${base}/ucretsiz-analiz`,
    `${base}/danismanlik`,
    `${base}/portfoy`,
    `${base}/hakkimizda`,
    `${base}/iletisim`,
    `${base}/rehber`,
  ]
  const serviceUrls = services.map((s) => `${base}/hizmetler/${s.slug}`)
  const istanbulUrls = istanbulPages.map((p) => `${base}/${p.slug}`)
  const rehberUrls = rehberPosts.map((p) => `${base}/rehber/${p.slug}`)
  return [...static_, ...serviceUrls, ...istanbulUrls, ...rehberUrls]
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-google-index-secret")
  if (secret !== process.env.INDEXNOW_SUBMIT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const urls: string[] = body.urls ?? getAllSiteUrls()
  const type: IndexingType = body.type === "URL_DELETED" ? "URL_DELETED" : "URL_UPDATED"

  // Google Indexing API rate limit: 200 req/day, burst 600/min
  // Batch gönderimde 200 URL sınırını aşmamak için dilimle
  const BATCH_SIZE = 100
  let accessToken: string
  try {
    accessToken = await getAccessToken()
  } catch (err: unknown) {
    return NextResponse.json({ error: "Auth failed", detail: (err as Error).message }, { status: 500 })
  }

  const batch = urls.slice(0, BATCH_SIZE)
  const results = await Promise.allSettled(batch.map((url) => submitUrl(accessToken, url, type)))

  const summary = results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { url: batch[i], status: "error", data: r.reason?.message }
  )

  const success = summary.filter((r) => r.status === 200 || r.status === 200).length
  console.log(`[google-index] ${type} submitted ${batch.length} URLs, ${success} OK`)

  return NextResponse.json({
    submitted: batch.length,
    type,
    results: summary,
    note: urls.length > BATCH_SIZE ? `Truncated to ${BATCH_SIZE}. Total: ${urls.length}` : undefined,
  })
}
