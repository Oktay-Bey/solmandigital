// AI Otomasyon landing derin funnel: cihaz, terk noktası, CPC değeri, WhatsApp vs form
// Çalıştır: node scripts/ga4-ai-deep.mjs
import { google } from "googleapis";
import { readFileSync } from "node:fs";

const PROPERTY_ID = "properties/539436083";
const RANGE = [{ startDate: "2026-06-12", endDate: "2026-06-25" }];

function loadEnv() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const txt = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^GOOGLE_SERVICE_ACCOUNT_JSON\s*=\s*(.*)$/);
    if (m) { let v = m[1].trim(); if ((v.startsWith("'")&&v.endsWith("'"))||(v.startsWith('"')&&v.endsWith('"'))) v=v.slice(1,-1); return v; }
  }
  throw new Error("env yok");
}
const credentials = JSON.parse(loadEnv().replace(/^﻿/, ""));
const auth = new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/analytics.readonly"] });
const ad = google.analyticsdata({ version: "v1beta", auth });
const dim = (r,i)=>r?.dimensionValues?.[i]?.value??"";
const met = (r,i)=>r?.metricValues?.[i]?.value??"0";
async function run(b){ return (await ad.properties.runReport({property:PROPERTY_ID,requestBody:b})).data?.rows??[]; }

const AI = { filter: { fieldName: "landingPagePlusQueryString", stringFilter: { matchType: "CONTAINS", value: "/ai-otomasyon-hizmeti" } } };

async function main() {
  // Cihaz kırılımı (AI landing)
  const device = await run({
    dateRanges: RANGE, dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "engagementRate" }, { name: "averageSessionDuration" }],
    dimensionFilter: AI,
  });
  // AI landing'de tüm event'ler (terk noktası için tam liste)
  const events = await run({
    dateRanges: RANGE, dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    dimensionFilter: AI, orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });
  // AI landing CPC sayfasının saatlik/cihaz dönüşüm değeri yok ama site geneli WhatsApp vs form
  const waVsForm = await run({
    dateRanges: RANGE, dimensions: [{ name: "eventName" }, { name: "deviceCategory" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: ["whatsapp_click","form_submit","form_start","cta_click"] } } },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });
  // CPC trafiğin landing dağılımı — AI gerçekten en çoğu mu?
  const cpcLanding = await run({
    dateRanges: RANGE, dimensions: [{ name: "landingPagePlusQueryString" }],
    metrics: [{ name: "sessions" }],
    dimensionFilter: { filter: { fieldName: "sessionMedium", stringFilter: { matchType: "EXACT", value: "cpc" } } },
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: "12",
  });

  console.log(JSON.stringify({
    aiDevice: device.map(r=>({device:dim(r,0),sessions:+met(r,0),bounce:+(+met(r,1)).toFixed(2),engagement:+(+met(r,2)).toFixed(2),avgSec:+(+met(r,3)).toFixed(0)})),
    aiEvents: events.map(r=>({event:dim(r,0),count:+met(r,0),users:+met(r,1)})),
    waVsForm: waVsForm.map(r=>({event:dim(r,0),device:dim(r,1),count:+met(r,0),users:+met(r,1)})),
    cpcLandingMix: cpcLanding.map(r=>({page:dim(r,0).slice(0,45),sessions:+met(r,0)})),
  }, null, 2));
}
main().catch(e=>{console.error("HATA:",e.message);process.exit(1)});
