import { NextRequest, NextResponse } from "next/server"
import { siteConfig } from "@/lib/site-config"

const INDEXNOW_KEY = process.env.INDEXNOW_KEY!
const INDEXNOW_HOSTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
]

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-indexnow-secret")
  if (secret !== process.env.INDEXNOW_SUBMIT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const urls: string[] = body.urls

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: "urls array required" }, { status: 400 })
  }

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
    r.status === "fulfilled" ? r.value : { endpoint: "unknown", status: "error", reason: r.reason?.message }
  )

  console.log("[indexnow] submitted", urls.length, "URLs:", summary)
  return NextResponse.json({ submitted: urls.length, results: summary })
}
