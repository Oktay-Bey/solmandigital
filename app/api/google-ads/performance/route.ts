import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date"); // YYYY-MM-DD — tek gün
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let dateClause: string;
    let periodLabel: string;
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      dateClause = `segments.date BETWEEN '${date}' AND '${date}'`;
      periodLabel = date;
    } else if (startDate && endDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate) && /^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      dateClause = `segments.date BETWEEN '${startDate}' AND '${endDate}'`;
      periodLabel = `${startDate}_${endDate}`;
    } else {
      dateClause = "segments.date DURING LAST_30_DAYS";
      periodLabel = "LAST_30_DAYS";
    }

    const customer = getCustomer();

    // Kampanya düzeyinde performans
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: any[] = await customer.query(`
      SELECT
        campaign.id, campaign.name, campaign.status,
        metrics.clicks, metrics.impressions, metrics.ctr,
        metrics.average_cpc, metrics.cost_micros,
        metrics.conversions, metrics.conversions_value,
        metrics.cost_per_conversion,
        metrics.search_impression_share,
        metrics.search_top_impression_share
      FROM campaign
      WHERE campaign.status != 'REMOVED'
        AND ${dateClause}
      ORDER BY campaign.name
    `);

    // Ad group düzeyinde performans
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adGroupRows: any[] = await customer.query(`
      SELECT
        campaign.id, campaign.name,
        ad_group.id, ad_group.name, ad_group.status,
        metrics.clicks, metrics.impressions, metrics.ctr,
        metrics.average_cpc, metrics.cost_micros,
        metrics.conversions
      FROM ad_group
      WHERE campaign.status != 'REMOVED'
        AND ad_group.status != 'REMOVED'
        AND ${dateClause}
      ORDER BY metrics.clicks DESC
    `);

    // Keyword düzeyinde performans
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kwRows: any[] = await customer.query(`
      SELECT
        campaign.name,
        ad_group.name,
        ad_group_criterion.keyword.text,
        ad_group_criterion.keyword.match_type,
        ad_group_criterion.status,
        metrics.clicks, metrics.impressions, metrics.ctr,
        metrics.average_cpc, metrics.cost_micros,
        metrics.conversions
      FROM keyword_view
      WHERE campaign.status != 'REMOVED'
        AND ad_group.status != 'REMOVED'
        AND ad_group_criterion.status != 'REMOVED'
        AND ${dateClause}
      ORDER BY metrics.clicks DESC
      LIMIT 50
    `);

    const campaigns = rows.map((row) => ({
      id: String(row.campaign?.id ?? ""),
      name: String(row.campaign?.name ?? ""),
      status: row.campaign?.status,
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      ctr: Number(row.metrics?.ctr ?? 0),
      avgCpcMicros: Number(row.metrics?.average_cpc ?? 0),
      avgCpcTL: Number(row.metrics?.average_cpc ?? 0) / 1_000_000,
      costMicros: Number(row.metrics?.cost_micros ?? 0),
      costTL: Number(row.metrics?.cost_micros ?? 0) / 1_000_000,
      conversions: Number(row.metrics?.conversions ?? 0),
      conversionsValue: Number(row.metrics?.conversions_value ?? 0),
      costPerConversionMicros: Number(row.metrics?.cost_per_conversion ?? 0),
      costPerConversionTL: Number(row.metrics?.cost_per_conversion ?? 0) / 1_000_000,
      searchImpressionShare: Number(row.metrics?.search_impression_share ?? 0),
      searchTopImpressionShare: Number(row.metrics?.search_top_impression_share ?? 0),
    }));

    const adGroups = adGroupRows.map((row) => ({
      campaignId: String(row.campaign?.id ?? ""),
      campaignName: String(row.campaign?.name ?? ""),
      adGroupId: String(row.ad_group?.id ?? ""),
      adGroupName: String(row.ad_group?.name ?? ""),
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      ctr: Number(row.metrics?.ctr ?? 0),
      avgCpcTL: Number(row.metrics?.average_cpc ?? 0) / 1_000_000,
      costTL: Number(row.metrics?.cost_micros ?? 0) / 1_000_000,
      conversions: Number(row.metrics?.conversions ?? 0),
    }));

    const keywords = kwRows.map((row) => ({
      campaignName: String(row.campaign?.name ?? ""),
      adGroupName: String(row.ad_group?.name ?? ""),
      keyword: String(row.ad_group_criterion?.keyword?.text ?? ""),
      matchType: row.ad_group_criterion?.keyword?.match_type,
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      ctr: Number(row.metrics?.ctr ?? 0),
      avgCpcTL: Number(row.metrics?.average_cpc ?? 0) / 1_000_000,
      costTL: Number(row.metrics?.cost_micros ?? 0) / 1_000_000,
      conversions: Number(row.metrics?.conversions ?? 0),
    }));

    return NextResponse.json({ period: periodLabel, campaigns, adGroups, keywords });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] performance error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
