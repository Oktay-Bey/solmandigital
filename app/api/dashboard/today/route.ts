import { NextRequest, NextResponse } from "next/server";
import { getCampaignMetrics, type DatePeriod } from "@/lib/google-ads/campaigns";
import { getGA4Overview, getGA4ConversionEvents, getGA4PaidSessions, type GA4ConversionEvent } from "@/lib/google-analytics-data";

const VALID_PERIODS: DatePeriod[] = ["TODAY", "YESTERDAY", "LAST_7_DAYS", "LAST_30_DAYS"];

const DAYS_MAP: Record<DatePeriod, number> = {
  TODAY: 1,
  YESTERDAY: 1,
  LAST_7_DAYS: 7,
  LAST_30_DAYS: 30,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const periodParam = searchParams.get("period")?.toUpperCase() as DatePeriod | undefined;
  const period: DatePeriod = periodParam && VALID_PERIODS.includes(periodParam) ? periodParam : "LAST_7_DAYS";
  const days = DAYS_MAP[period];

  const [adsResult, ga4OverviewResult, ga4ConversionsResult, ga4PaidResult] = await Promise.allSettled([
    getCampaignMetrics(period),
    getGA4Overview(days),
    getGA4ConversionEvents(days),
    getGA4PaidSessions(days),
  ]);

  const campaigns = adsResult.status === "fulfilled" ? adsResult.value : [];
  const ga4Overview = ga4OverviewResult.status === "fulfilled" ? ga4OverviewResult.value : null;
  const ga4ConversionRows: GA4ConversionEvent[] = ga4ConversionsResult.status === "fulfilled" ? ga4ConversionsResult.value : [];
  const ga4Paid = ga4PaidResult.status === "fulfilled" ? ga4PaidResult.value : null;

  const totalCostTL = campaigns.reduce((s, c) => s + c.costTL, 0);
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
  const avgCTR = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

  const convByName = ga4ConversionRows.reduce<Record<string, number>>((acc, r) => {
    acc[r.eventName] = r.count;
    return acc;
  }, {});

  const conversionEvents = {
    generate_lead: convByName["generate_lead"] ?? 0,
    qualify_lead: convByName["qualify_lead"] ?? 0,
    contact: convByName["contact"] ?? 0,
    whatsapp_click: convByName["whatsapp_click"] ?? 0,
    total: 0,
  };
  conversionEvents.total =
    conversionEvents.generate_lead +
    conversionEvents.qualify_lead +
    conversionEvents.contact +
    conversionEvents.whatsapp_click;

  const costPerGA4Lead = conversionEvents.total > 0 ? totalCostTL / conversionEvents.total : 0;
  const adsConversionVsGA4Ratio = conversionEvents.total > 0 ? totalConversions / conversionEvents.total : 0;

  return NextResponse.json({
    period,
    generatedAt: new Date().toISOString(),
    ads: {
      totalCostTL,
      totalClicks,
      totalImpressions,
      totalConversions,
      avgCTR,
      campaigns,
    },
    analytics: {
      sessions: ga4Overview?.sessions ?? 0,
      users: ga4Overview?.users ?? 0,
      bounceRate: ga4Overview?.bounceRate ?? 0,
      paidSessions: ga4Paid?.sessions ?? 0,
      paidBounceRate: ga4Paid?.bounceRate ?? 0,
      conversions: conversionEvents,
    },
    crossChannel: {
      costPerGA4Lead,
      adsConversionVsGA4Ratio,
    },
    errors: {
      ads: adsResult.status === "rejected" ? String(adsResult.reason) : null,
      ga4Overview: ga4OverviewResult.status === "rejected" ? String(ga4OverviewResult.reason) : null,
      ga4Conversions: ga4ConversionsResult.status === "rejected" ? String(ga4ConversionsResult.reason) : null,
      ga4Paid: ga4PaidResult.status === "rejected" ? String(ga4PaidResult.reason) : null,
    },
  });
}
