// 24-25 Haziran 2026 günlük GA4 analizi — etkinlikler, kaynaklar, sayfalar, dönüşümler
// Çalıştır: node scripts/ga4-day-analysis.mjs
import { google } from "googleapis";
import { readFileSync } from "node:fs";

const PROPERTY_ID = "properties/539436083";
const START = process.env.GA_START || "2026-06-12";
const END = process.env.GA_END || "2026-06-25";

// .env.local'den GOOGLE_SERVICE_ACCOUNT_JSON oku
function loadEnv() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^GOOGLE_SERVICE_ACCOUNT_JSON\s*=\s*(.*)$/);
    if (m) {
      let v = m[1].trim();
      if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) v = v.slice(1, -1);
      return v;
    }
  }
  throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON bulunamadı");
}

const credentials = JSON.parse(loadEnv().replace(/^﻿/, ""));
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});
const ad = google.analyticsdata({ version: "v1beta", auth });

const dim = (r, i) => r?.dimensionValues?.[i]?.value ?? "";
const met = (r, i) => r?.metricValues?.[i]?.value ?? "0";

async function run(body) {
  const res = await ad.properties.runReport({ property: PROPERTY_ID, requestBody: body });
  return res.data?.rows ?? [];
}

const range = [{ startDate: START, endDate: END }];

async function main() {
  // 1) Günlük genel bakış
  const daily = await run({
    dateRanges: range,
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "sessions" },
      { name: "totalUsers" },
      { name: "newUsers" },
      { name: "screenPageViews" },
      { name: "eventCount" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  // 2) Gün × etkinlik kırılımı
  const events = await run({
    dateRanges: range,
    dimensions: [{ name: "date" }, { name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: "100",
  });

  // 3) Trafik kaynakları (2 gün toplam)
  const sources = await run({
    dateRanges: range,
    dimensions: [{ name: "sessionDefaultChannelGroup" }, { name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "engagementRate" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: "25",
  });

  // 4) En çok görüntülenen sayfalar
  const pages = await run({
    dateRanges: range,
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }, { name: "averageSessionDuration" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: "20",
  });

  // 5) Dönüşüm/lead etkinlikleri kaynak kırılımı
  const conv = await run({
    dateRanges: range,
    dimensions: [{ name: "eventName" }, { name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: ["generate_lead", "qualify_lead", "contact", "whatsapp_click", "form_start", "form_submit"] },
      },
    },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: "50",
  });

  // 6) Ülke kırılımı
  const geo = await run({
    dateRanges: range,
    dimensions: [{ name: "country" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: "12",
  });

  const out = {
    range: { START, END },
    daily: daily.map((r) => ({
      date: dim(r, 0),
      sessions: +met(r, 0),
      users: +met(r, 1),
      newUsers: +met(r, 2),
      pageviews: +met(r, 3),
      events: +met(r, 4),
      engagementRate: +(+met(r, 5)).toFixed(3),
      avgSessionSec: +(+met(r, 6)).toFixed(1),
    })),
    events: events.map((r) => ({ date: dim(r, 0), event: dim(r, 1), count: +met(r, 0), users: +met(r, 1) })),
    sources: sources.map((r) => ({
      channel: dim(r, 0), source: dim(r, 1), medium: dim(r, 2),
      sessions: +met(r, 0), users: +met(r, 1), engagementRate: +(+met(r, 2)).toFixed(3),
    })),
    pages: pages.map((r) => ({ page: dim(r, 0), pageviews: +met(r, 0), users: +met(r, 1), avgSessionSec: +(+met(r, 2)).toFixed(1) })),
    conversions: conv.map((r) => ({ event: dim(r, 0), source: dim(r, 1), medium: dim(r, 2), count: +met(r, 0), users: +met(r, 1) })),
    geo: geo.map((r) => ({ country: dim(r, 0), sessions: +met(r, 0), users: +met(r, 1) })),
  };

  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => { console.error("HATA:", e.message); process.exit(1); });
