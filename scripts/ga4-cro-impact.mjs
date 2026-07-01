// CRO değişiklik etkisi: AI Otomasyon landing + CPC funnel — öncesi/sonrası
// 23 Haz: AI Otomasyon landing CRO (dfee3f1, c5a6b9f). 24 Haz: buton/SEO fix.
// Çalıştır: node scripts/ga4-cro-impact.mjs
import { google } from "googleapis";
import { readFileSync } from "node:fs";

const PROPERTY_ID = "properties/539436083";

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
  throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON yok");
}

const credentials = JSON.parse(loadEnv().replace(/^﻿/, ""));
const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/analytics.readonly"] });
const ad = google.analyticsdata({ version: "v1beta", auth });
const dim = (r, i) => r?.dimensionValues?.[i]?.value ?? "";
const met = (r, i) => r?.metricValues?.[i]?.value ?? "0";
async function run(body) { return (await ad.properties.runReport({ property: PROPERTY_ID, requestBody: body })).data?.rows ?? []; }

// İki dönem: değişiklik ÖNCESİ (12-22 Haz, 11 gün) vs SONRASI (23-25 Haz, 3 gün)
const PRE = { startDate: "2026-06-12", endDate: "2026-06-22" };
const POST = { startDate: "2026-06-23", endDate: "2026-06-25" };

// Bir landing page için funnel metriklerini (oturum + event) tek dönemde getir
async function funnelFor(period, landingFilter) {
  const sess = await run({
    dateRanges: [period],
    dimensions: landingFilter ? [{ name: "landingPagePlusQueryString" }] : [],
    metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "averageSessionDuration" }, { name: "engagementRate" }],
    ...(landingFilter ? { dimensionFilter: landingFilter } : {}),
  });
  const ev = await run({
    dateRanges: [period],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: { fieldName: "eventName", inListFilter: { values: ["form_view", "form_start", "form_submit", "generate_lead", "qualify_lead", "whatsapp_click", "contact", "cta_click"] } },
    },
  });
  const evMap = {};
  for (const r of ev) evMap[dim(r, 0)] = +met(r, 0);
  const s = sess[0];
  return {
    sessions: s ? +met(s, 0) : 0,
    bounceRate: s ? +(+met(s, 1)).toFixed(3) : 0,
    avgSessionSec: s ? +(+met(s, 2)).toFixed(1) : 0,
    engagementRate: s ? +(+met(s, 3)).toFixed(3) : 0,
    events: evMap,
  };
}

// CPC oturum+dönüşüm
async function cpcFor(period) {
  const sess = await run({
    dateRanges: [period],
    metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "engagementRate" }],
    dimensionFilter: { filter: { fieldName: "sessionMedium", stringFilter: { matchType: "EXACT", value: "cpc" } } },
  });
  const conv = await run({
    dateRanges: [period],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      andGroup: { expressions: [
        { filter: { fieldName: "sessionMedium", stringFilter: { matchType: "EXACT", value: "cpc" } } },
        { filter: { fieldName: "eventName", inListFilter: { values: ["form_start", "form_submit", "generate_lead", "qualify_lead", "whatsapp_click", "contact"] } } },
      ] },
    },
  });
  const s = sess[0];
  const cm = {};
  for (const r of conv) cm[dim(r, 0)] = +met(r, 0);
  return { sessions: s ? +met(s, 0) : 0, bounceRate: s ? +(+met(s, 1)).toFixed(3) : 0, engagementRate: s ? +(+met(s, 2)).toFixed(3) : 0, conversions: cm };
}

const aiFilter = { filter: { fieldName: "landingPagePlusQueryString", stringFilter: { matchType: "CONTAINS", value: "/ai-otomasyon-hizmeti" } } };

async function main() {
  const [aiPre, aiPost, sitePre, sitePost, cpcPre, cpcPost] = await Promise.all([
    funnelFor(PRE, aiFilter), funnelFor(POST, aiFilter),
    funnelFor(PRE, null), funnelFor(POST, null),
    cpcFor(PRE), cpcFor(POST),
  ]);
  console.log(JSON.stringify({
    note: "PRE=12-22Haz(11g, değişiklik öncesi), POST=23-25Haz(3g, AI landing CRO + buton fix sonrası)",
    aiOtomasyonLanding: { PRE: aiPre, POST: aiPost },
    siteGenel: { PRE: sitePre, POST: sitePost },
    cpcTrafik: { PRE: cpcPre, POST: cpcPost },
  }, null, 2));
}
main().catch((e) => { console.error("HATA:", e.message); process.exit(1); });
