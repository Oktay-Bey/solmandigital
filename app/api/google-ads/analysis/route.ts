import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";
import { listAdGroupAds } from "@/lib/google-ads/campaigns";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get("campaignId");
    const adGroupId = searchParams.get("adGroupId");

    if (!campaignId || !/^\d+$/.test(campaignId)) {
      return NextResponse.json({ error: "campaignId zorunludur ve sayısal olmalıdır." }, { status: 400 });
    }
    if (adGroupId && !/^\d+$/.test(adGroupId)) {
      return NextResponse.json({ error: "adGroupId sayısal olmalıdır." }, { status: 400 });
    }

    const customer = getCustomer();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchTermRows: any[] = await customer.query(`
      SELECT
        search_term_view.search_term,
        search_term_view.status,
        ad_group.name,
        metrics.clicks, metrics.impressions, metrics.ctr,
        metrics.average_cpc, metrics.cost_micros
      FROM search_term_view
      WHERE segments.date DURING LAST_30_DAYS
        AND campaign.id = '${campaignId}'
      ORDER BY metrics.clicks DESC
      LIMIT 100
    `);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let brandAdRows: any[] = [];
    if (adGroupId) {
      brandAdRows = await customer.query(`
        SELECT
          ad_group_ad.ad.id,
          ad_group_ad.ad.responsive_search_ad.headlines,
          ad_group_ad.ad.responsive_search_ad.descriptions,
          ad_group_ad.ad.final_urls,
          ad_group_ad.status
        FROM ad_group_ad
        WHERE ad_group.id = '${adGroupId}'
          AND ad_group_ad.status != 'REMOVED'
      `);
    }

    const searchTerms = searchTermRows.map((row) => ({
      term: String(row.search_term_view?.search_term ?? ""),
      status: row.search_term_view?.status,
      adGroup: String(row.ad_group?.name ?? ""),
      clicks: Number(row.metrics?.clicks ?? 0),
      impressions: Number(row.metrics?.impressions ?? 0),
      ctr: Number(row.metrics?.ctr ?? 0),
      avgCpcTL: Number(row.metrics?.average_cpc ?? 0) / 1_000_000,
      costTL: Number(row.metrics?.cost_micros ?? 0) / 1_000_000,
    }));

    const brandAds = brandAdRows.map((row) => ({
      id: String(row.ad_group_ad?.ad?.id ?? ""),
      status: row.ad_group_ad?.status,
      finalUrls: row.ad_group_ad?.ad?.final_urls ?? [],
      headlines: (row.ad_group_ad?.ad?.responsive_search_ad?.headlines ?? []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (h: any) => ({ text: h.text, pinned: h.pinned_field })
      ),
      descriptions: (row.ad_group_ad?.ad?.responsive_search_ad?.descriptions ?? []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (d: any) => ({ text: d.text, pinned: d.pinned_field })
      ),
    }));

    const allAdGroupAds = await listAdGroupAds(campaignId);

    return NextResponse.json({ campaignId, adGroupId, searchTerms, brandAds, allAdGroupAds });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] analysis error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
