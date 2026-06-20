import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// READ-ONLY: Tüm aktif reklamların landing page (final_urls) eşlemesi + 30g performans.
// "Hangi kampanya/ad group hangi sayfaya trafik gönderiyor" — canlı, tahminsiz.
export async function GET() {
  try {
    const customer = getCustomer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: any[] = await customer.query(`
      SELECT
        campaign.id, campaign.name, campaign.status,
        ad_group.id, ad_group.name,
        ad_group_ad.ad.id,
        ad_group_ad.ad.final_urls,
        ad_group_ad.status,
        metrics.clicks, metrics.impressions, metrics.cost_micros
      FROM ad_group_ad
      WHERE campaign.status = 'ENABLED'
        AND ad_group.status = 'ENABLED'
        AND ad_group_ad.status = 'ENABLED'
        AND segments.date DURING LAST_30_DAYS
      ORDER BY metrics.clicks DESC
    `);

    // Landing page bazında topla (birden çok reklam aynı URL'e gidebilir)
    const byUrl: Record<string, {
      url: string;
      campaigns: Set<string>;
      adGroups: Set<string>;
      clicks: number;
      impressions: number;
      costTL: number;
      adCount: number;
    }> = {};

    const ads = rows.map((r) => {
      const urls: string[] = r.ad_group_ad?.ad?.final_urls ?? [];
      const url = urls[0] ?? "(yok)";
      const clicks = Number(r.metrics?.clicks ?? 0);
      const impressions = Number(r.metrics?.impressions ?? 0);
      const costTL = Number(r.metrics?.cost_micros ?? 0) / 1_000_000;
      const campaignName = String(r.campaign?.name ?? "");
      const adGroupName = String(r.ad_group?.name ?? "");
      const entry = (byUrl[url] ??= {
        url, campaigns: new Set(), adGroups: new Set(),
        clicks: 0, impressions: 0, costTL: 0, adCount: 0,
      });
      entry.campaigns.add(campaignName);
      entry.adGroups.add(adGroupName);
      entry.clicks += clicks;
      entry.impressions += impressions;
      entry.costTL += costTL;
      entry.adCount += 1;
      return {
        campaignName, adGroupName,
        adId: String(r.ad_group_ad?.ad?.id ?? ""),
        finalUrl: url, clicks, impressions, costTL: Number(costTL.toFixed(2)),
      };
    });

    const landingPages = Object.values(byUrl)
      .map((e) => ({
        url: e.url,
        campaigns: [...e.campaigns],
        adGroups: [...e.adGroups],
        adCount: e.adCount,
        clicks: e.clicks,
        impressions: e.impressions,
        costTL: Number(e.costTL.toFixed(2)),
      }))
      .sort((a, b) => b.clicks - a.clicks);

    return NextResponse.json({ landingPages, ads });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] landing-map error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
