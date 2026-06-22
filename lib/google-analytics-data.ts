import { google } from "googleapis";

const PROPERTY_ID = "properties/539436083";

interface GA4RowValue {
  value?: string;
}

interface GA4Row {
  dimensionValues?: GA4RowValue[];
  metricValues?: GA4RowValue[];
}

interface GA4ReportData {
  rows?: GA4Row[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAuthClient(): any {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env değişkeni tanımlı değil.");

  // Env değeri başında BOM (﻿) olabiliyor → JSON.parse patlar. Temizle.
  const credentials = JSON.parse(raw.replace(/^﻿/, ""));
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
}

function dateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function dim(row: GA4Row, index: number): string {
  return row?.dimensionValues?.[index]?.value ?? "";
}

function met(row: GA4Row, index: number): string {
  return row?.metricValues?.[index]?.value ?? "0";
}

async function runReport(
  analyticsData: ReturnType<typeof google.analyticsdata>,
  requestBody: Record<string, unknown>
): Promise<GA4ReportData> {
  const res = await analyticsData.properties.runReport({
    property: PROPERTY_ID,
    requestBody,
  });
  return res.data as GA4ReportData;
}

export interface GA4Overview {
  sessions: number;
  users: number;
  newUsers: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

export interface GA4TopPage {
  page: string;
  pageviews: number;
  users: number;
  bounceRate: number;
}

export interface GA4TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
}

export interface GA4ConversionEvent {
  eventName: string;
  count: number;
}

export interface GA4Report {
  overview: GA4Overview;
  topPages: GA4TopPage[];
  sources: GA4TrafficSource[];
  conversions: GA4ConversionEvent[];
}

export async function getGA4Overview(days = 30): Promise<GA4Overview> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });

  const data = await runReport(analyticsData, {
    dateRanges: [{ startDate: dateString(days), endDate: "today" }],
    metrics: [
      { name: "sessions" },
      { name: "totalUsers" },
      { name: "newUsers" },
      { name: "screenPageViews" },
      { name: "bounceRate" },
      { name: "averageSessionDuration" },
    ],
  });

  const row = data?.rows?.[0];
  if (!row) {
    return { sessions: 0, users: 0, newUsers: 0, pageviews: 0, bounceRate: 0, avgSessionDuration: 0 };
  }

  return {
    sessions: parseInt(met(row, 0)),
    users: parseInt(met(row, 1)),
    newUsers: parseInt(met(row, 2)),
    pageviews: parseInt(met(row, 3)),
    bounceRate: parseFloat(met(row, 4)),
    avgSessionDuration: parseFloat(met(row, 5)),
  };
}

export async function getGA4TopPages(days = 30, limit = 20): Promise<GA4TopPage[]> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });

  const data = await runReport(analyticsData, {
    dateRanges: [{ startDate: dateString(days), endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "totalUsers" },
      { name: "bounceRate" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: String(limit),
  });

  return (data?.rows ?? []).map((row) => ({
    page: dim(row, 0),
    pageviews: parseInt(met(row, 0)),
    users: parseInt(met(row, 1)),
    bounceRate: parseFloat(met(row, 2)),
  }));
}

export async function getGA4TrafficSources(days = 30): Promise<GA4TrafficSource[]> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });

  const data = await runReport(analyticsData, {
    dateRanges: [{ startDate: dateString(days), endDate: "today" }],
    dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: "10",
  });

  return (data?.rows ?? []).map((row) => ({
    source: dim(row, 0),
    medium: dim(row, 1),
    sessions: parseInt(met(row, 0)),
    users: parseInt(met(row, 1)),
  }));
}

export async function getGA4ConversionEvents(days = 30): Promise<GA4ConversionEvent[]> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });

  const data = await runReport(analyticsData, {
    dateRanges: [{ startDate: dateString(days), endDate: "today" }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: {
          values: ["generate_lead", "qualify_lead", "contact", "whatsapp_click"],
        },
      },
    },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });

  return (data?.rows ?? []).map((row) => ({
    eventName: dim(row, 0),
    count: parseInt(met(row, 0)),
  }));
}

// DENETIM: conversion event'leri kaynak (source/medium) + keyEvents kırılımı
export async function getGA4ConversionDiag(days = 30): Promise<unknown> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });
  const data = await runReport(analyticsData, {
    dateRanges: [{ startDate: dateString(days), endDate: "today" }],
    dimensions: [{ name: "eventName" }, { name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [{ name: "eventCount" }, { name: "keyEvents" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: ["generate_lead", "qualify_lead", "contact", "whatsapp_click", "form_start", "form_submit", "purchase", "sign_up"] },
      },
    },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: "50",
  });
  return (data?.rows ?? []).map((row) => ({
    eventName: dim(row, 0),
    source: dim(row, 1),
    medium: dim(row, 2),
    eventCount: parseInt(met(row, 0)),
    keyEvents: parseFloat(met(row, 1)),
  }));
}

// SAYFA FUNNEL: landing page bazında oturum → form_start → form_submit → whatsapp_click
// Hangi sayfa trafik alıp formu tamamlatamıyor (sürtünme) — sayfa optimizasyonu için.
export async function getGA4PageFunnel(days = 14): Promise<unknown> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });
  const startDate = dateString(days);

  // 1) Landing page bazında oturum + bounce (giriş sayfası = landingPage)
  const sessionData = await runReport(analyticsData, {
    dateRanges: [{ startDate, endDate: "today" }],
    dimensions: [{ name: "landingPage" }],
    metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "averageSessionDuration" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: "30",
  });

  // 2) Sayfa (pagePath) bazında funnel event sayıları
  const eventData = await runReport(analyticsData, {
    dateRanges: [{ startDate, endDate: "today" }],
    dimensions: [{ name: "pagePath" }, { name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: ["form_start", "form_submit", "generate_lead", "whatsapp_click"] },
      },
    },
    limit: "200",
  });

  // Event'leri sayfaya göre topla
  const eventsByPage: Record<string, Record<string, number>> = {};
  for (const row of eventData?.rows ?? []) {
    const path = dim(row, 0);
    const ev = dim(row, 1);
    const cnt = parseInt(met(row, 0));
    (eventsByPage[path] ??= {})[ev] = cnt;
  }

  const pages = (sessionData?.rows ?? []).map((row) => {
    const landingPage = dim(row, 0);
    const ev = eventsByPage[landingPage] ?? {};
    const formStart = ev["form_start"] ?? 0;
    const formSubmit = (ev["form_submit"] ?? 0) + (ev["generate_lead"] ?? 0);
    const sessions = parseInt(met(row, 0));
    return {
      landingPage,
      sessions,
      bounceRate: parseFloat(met(row, 1)),
      avgSessionDuration: parseFloat(met(row, 2)),
      formStart,
      formSubmit,
      whatsappClick: ev["whatsapp_click"] ?? 0,
      // sürtünme: form açıldı ama bitmedi → start>0, submit=0 sorunlu
      startToSubmitRate: formStart > 0 ? Number((formSubmit / formStart).toFixed(3)) : null,
      sessionToFormRate: sessions > 0 ? Number(((formStart) / sessions).toFixed(3)) : null,
    };
  });

  return { days, pages };
}

// ORGANİK SEO RAPORU: SEO Boost Loop'un veri belkemiği.
// sessionDefaultChannelGroup = "Organic Search" filtresiyle SADECE organik arama
// trafiğini landing page bazında kırar → hangi sayfa organik kazanıyor, hangisi ölü.
// Ayrıca organik landing page'lerin ülke/cihaz ve ilk-kullanıcı kaynağı kırılımı.
export interface GA4OrganicPage {
  landingPage: string;
  sessions: number;
  newUsers: number;
  engagedSessions: number;
  engagementRate: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}

export interface GA4OrganicReport {
  days: number;
  organicTotal: {
    sessions: number;
    newUsers: number;
    engagementRate: number;
    conversions: number;
  };
  channelMix: { channel: string; sessions: number }[];
  pages: GA4OrganicPage[];
}

const ORGANIC_FILTER = {
  filter: {
    fieldName: "sessionDefaultChannelGroup",
    stringFilter: { matchType: "EXACT" as const, value: "Organic Search" },
  },
};

export async function getGA4OrganicReport(days = 28): Promise<GA4OrganicReport> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });
  const startDate = dateString(days);

  const [totalData, channelData, pageData, convData] = await Promise.all([
    // 1) Organik toplam
    runReport(analyticsData, {
      dateRanges: [{ startDate, endDate: "today" }],
      metrics: [
        { name: "sessions" },
        { name: "newUsers" },
        { name: "engagementRate" },
      ],
      dimensionFilter: ORGANIC_FILTER,
    }),
    // 2) Kanal dağılımı (organiğin payını görmek için tüm kanallar)
    runReport(analyticsData, {
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: "12",
    }),
    // 3) Organik landing page bazında performans
    runReport(analyticsData, {
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "landingPage" }],
      metrics: [
        { name: "sessions" },
        { name: "newUsers" },
        { name: "engagedSessions" },
        { name: "engagementRate" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
      dimensionFilter: ORGANIC_FILTER,
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: "50",
    }),
    // 4) Organik landing page bazında conversion (lead event'leri)
    runReport(analyticsData, {
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "landingPage" }, { name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            ORGANIC_FILTER,
            {
              filter: {
                fieldName: "eventName",
                inListFilter: { values: ["generate_lead", "qualify_lead", "contact", "whatsapp_click"] },
              },
            },
          ],
        },
      },
      limit: "200",
    }),
  ]);

  // Conversion'ları landing page'e göre topla
  const convByPage: Record<string, number> = {};
  for (const row of convData?.rows ?? []) {
    const path = dim(row, 0);
    convByPage[path] = (convByPage[path] ?? 0) + parseInt(met(row, 1));
  }

  const totalRow = totalData?.rows?.[0];
  const totalConversions = Object.values(convByPage).reduce((s, n) => s + n, 0);

  return {
    days,
    organicTotal: {
      sessions: totalRow ? parseInt(met(totalRow, 0)) : 0,
      newUsers: totalRow ? parseInt(met(totalRow, 1)) : 0,
      engagementRate: totalRow ? parseFloat(met(totalRow, 2)) : 0,
      conversions: totalConversions,
    },
    channelMix: (channelData?.rows ?? []).map((row) => ({
      channel: dim(row, 0),
      sessions: parseInt(met(row, 0)),
    })),
    pages: (pageData?.rows ?? []).map((row) => {
      const landingPage = dim(row, 0);
      return {
        landingPage,
        sessions: parseInt(met(row, 0)),
        newUsers: parseInt(met(row, 1)),
        engagedSessions: parseInt(met(row, 2)),
        engagementRate: parseFloat(met(row, 3)),
        bounceRate: parseFloat(met(row, 4)),
        avgSessionDuration: parseFloat(met(row, 5)),
        conversions: convByPage[landingPage] ?? 0,
      };
    }),
  };
}

export async function getGA4Report(days = 30): Promise<GA4Report> {
  const [overview, topPages, sources, conversions] = await Promise.all([
    getGA4Overview(days),
    getGA4TopPages(days, 30),
    getGA4TrafficSources(days),
    getGA4ConversionEvents(days),
  ]);

  return { overview, topPages, sources, conversions };
}

export async function getGA4DailyAggregate(date: string): Promise<{
  sessions: number;
  users: number;
  pageviews: number;
  bounce_rate: number;
  conversions: number;
}> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });

  const [overviewData, convData] = await Promise.all([
    runReport(analyticsData, {
      dateRanges: [{ startDate: date, endDate: date }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "screenPageViews" },
        { name: "bounceRate" },
      ],
    }),
    runReport(analyticsData, {
      dateRanges: [{ startDate: date, endDate: date }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: { values: ["generate_lead", "qualify_lead", "contact", "whatsapp_click"] },
        },
      },
    }),
  ]);

  const row = overviewData?.rows?.[0];
  const convRows: GA4Row[] = convData?.rows ?? [];
  const conversions = convRows.reduce((s, r) => s + parseInt(met(r, 0)), 0);

  return {
    sessions: row ? parseInt(met(row, 0)) : 0,
    users: row ? parseInt(met(row, 1)) : 0,
    pageviews: row ? parseInt(met(row, 2)) : 0,
    bounce_rate: row ? parseFloat(met(row, 3)) : 0,
    conversions,
  };
}

export async function getGA4PaidSessions(days = 7): Promise<{
  sessions: number;
  users: number;
  bounceRate: number;
  conversions: number;
}> {
  const auth = getAuthClient();
  const analyticsData = google.analyticsdata({ version: "v1beta", auth });
  const startDate = dateString(days);

  const [sessionData, convData] = await Promise.all([
    runReport(analyticsData, {
      dateRanges: [{ startDate, endDate: "today" }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "bounceRate" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "sessionMedium",
          stringFilter: { matchType: "EXACT", value: "cpc" },
        },
      },
    }),
    runReport(analyticsData, {
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            {
              filter: {
                fieldName: "sessionMedium",
                stringFilter: { matchType: "EXACT", value: "cpc" },
              },
            },
            {
              filter: {
                fieldName: "eventName",
                inListFilter: { values: ["generate_lead", "qualify_lead", "contact", "whatsapp_click"] },
              },
            },
          ],
        },
      },
    }),
  ]);

  const row = sessionData?.rows?.[0];
  const convRows: GA4Row[] = convData?.rows ?? [];
  const conversions = convRows.reduce((s, r) => s + parseInt(met(r, 0)), 0);

  return {
    sessions: row ? parseInt(met(row, 0)) : 0,
    users: row ? parseInt(met(row, 1)) : 0,
    bounceRate: row ? parseFloat(met(row, 2)) : 0,
    conversions,
  };
}
