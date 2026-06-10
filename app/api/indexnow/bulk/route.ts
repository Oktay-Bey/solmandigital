import { NextRequest, NextResponse } from "next/server"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"
import { rehberPosts } from "@/lib/data/rehber"

const INDEXNOW_KEY = process.env.INDEXNOW_KEY!
const INDEXNOW_HOSTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
]

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
    `${base}/indir/e-ticaret-baslangic-rehberi`,
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
  const secret = req.headers.get("x-indexnow-secret")
  if (secret !== process.env.INDEXNOW_SUBMIT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const urls = getAllSiteUrls()
  const host = new URL(siteConfig.url).hostname
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  const results = await Promise.allSettled(
    INDEXNOW_HOSTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }).then((r) => ({ endpoint, status: r.status }))
    )
  )

  const summary = results.map((r) =>
    r.status === "fulfilled" ? r.value : { endpoint: "unknown", status: "error" }
  )

  console.log("[indexnow/bulk] submitted", urls.length, "URLs")
  return NextResponse.json({ submitted: urls.length, urls, results: summary })
}
