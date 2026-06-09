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

  const credentials = JSON.parse(raw);
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
