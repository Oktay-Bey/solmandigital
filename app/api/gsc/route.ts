import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { siteConfig } from "@/lib/site-config"

// Google Search Console — Search Analytics API.
// Aynı service account (GOOGLE_SERVICE_ACCOUNT_JSON) GSC property'sine
// "Tam" veya "Sınırlı" kullanıcı olarak eklenmiş olmalı. Scope: webmasters.readonly.
//
// Kullanım:
//   /api/gsc?days=90                    → sayfa bazlı (en çok tıklanan)
//   /api/gsc?days=90&dim=query          → sorgu bazlı
//   /api/gsc?days=90&dim=page,query     → sayfa+sorgu kırılımı
//   /api/gsc?days=90&page=/kadikoy-web-tasarim  → tek sayfanın sorguları

function authClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON tanımlı değil")
  const credentials = JSON.parse(raw.replace(/^﻿/, ""))
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  })
}

function dateStr(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString().slice(0, 10)
}

// GSC property: domain mülkü "sc-domain:solmandigital.com.tr" ya da
// URL-prefix "https://solmandigital.com.tr/". İkisini de deneriz.
function siteCandidates(): string[] {
  const host = new URL(siteConfig.url).host
  return [
    process.env.GSC_SITE_URL,
    `sc-domain:${host}`,
    `${siteConfig.url.replace(/\/$/, "")}/`,
  ].filter(Boolean) as string[]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get("days") ?? "90")
  const dimParam = searchParams.get("dim") ?? "page"
  const dimensions = dimParam.split(",").map((s) => s.trim()).filter(Boolean)
  const pageFilter = searchParams.get("page")
  const rowLimit = Math.min(parseInt(searchParams.get("limit") ?? "200"), 5000)

  try {
    const auth = authClient()
    const webmasters = google.webmasters({ version: "v3", auth })

    const requestBody: Record<string, unknown> = {
      startDate: dateStr(days),
      endDate: dateStr(1),
      dimensions,
      rowLimit,
    }
    if (pageFilter) {
      requestBody.dimensionFilterGroups = [
        {
          filters: [
            { dimension: "page", operator: "contains", expression: pageFilter },
          ],
        },
      ]
    }

    // Birden çok property formatını sırayla dene; ilk başarılıyı kullan.
    let lastErr: unknown = null
    for (const siteUrl of siteCandidates()) {
      try {
        const res = await webmasters.searchanalytics.query({ siteUrl, requestBody })
        const rows = (res.data.rows ?? []).map((r) => ({
          keys: r.keys ?? [],
          clicks: r.clicks ?? 0,
          impressions: r.impressions ?? 0,
          ctr: r.ctr ?? 0,
          position: r.position ?? 0,
        }))
        return NextResponse.json({ siteUrl, days, dimensions, count: rows.length, rows })
      } catch (e) {
        lastErr = e
      }
    }
    const message = lastErr instanceof Error ? lastErr.message : "GSC sorgusu başarısız"
    return NextResponse.json({ error: message, tried: siteCandidates() }, { status: 500 })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata"
    console.error("[gsc] error:", err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
