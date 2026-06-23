import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// READ-ONLY denetim — keyword performansı + mevcut negatif keyword'ler.
// Amaç: trafik getirmeyen/alakasız keyword'leri ve zaten ekli negatifleri görmek.
//   /api/google-ads/keyword-audit?campaignId=23914856579
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get("campaignId") || "23914856579";
    if (!/^\d+$/.test(campaignId)) {
      return NextResponse.json({ error: "campaignId sayısal olmalı" }, { status: 400 });
    }
    const customer = getCustomer();

    // 1) Aktif keyword'ler + performans (90g)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kwRows: any[] = await customer.query(`
      SELECT
        ad_group.name,
        ad_group_criterion.keyword.text,
        ad_group_criterion.keyword.match_type,
        ad_group_criterion.status,
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros,
        metrics.conversions,
        metrics.ctr
      FROM keyword_view
      WHERE campaign.id = '${campaignId}'
        AND segments.date DURING LAST_90_DAYS
      ORDER BY metrics.cost_micros DESC
      LIMIT 200
    `);

    // 2) Mevcut kampanya negatif keyword'leri
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const negRows: any[] = await customer.query(`
      SELECT
        campaign_criterion.keyword.text,
        campaign_criterion.keyword.match_type,
        campaign_criterion.negative,
        campaign_criterion.type
      FROM campaign_criterion
      WHERE campaign.id = '${campaignId}'
        AND campaign_criterion.negative = true
      LIMIT 500
    `);

    const matchTypeLabel = (m: number | string) => {
      const map: Record<string, string> = { "2": "EXACT", "3": "PHRASE", "4": "BROAD" };
      return map[String(m)] ?? String(m);
    };

    const keywords = kwRows.map((r) => ({
      adGroup: r.ad_group?.name,
      text: r.ad_group_criterion?.keyword?.text,
      matchType: matchTypeLabel(r.ad_group_criterion?.keyword?.match_type),
      status: r.ad_group_criterion?.status,
      clicks: Number(r.metrics?.clicks ?? 0),
      impressions: Number(r.metrics?.impressions ?? 0),
      costTL: Number(((Number(r.metrics?.cost_micros ?? 0)) / 1_000_000).toFixed(2)),
      conversions: Number(r.metrics?.conversions ?? 0),
      ctr: Number((Number(r.metrics?.ctr ?? 0) * 100).toFixed(1)),
    }));

    const negatives = negRows
      .filter((r) => r.campaign_criterion?.keyword?.text) // sadece keyword negatifleri
      .map((r) => ({
        text: r.campaign_criterion?.keyword?.text,
        matchType: matchTypeLabel(r.campaign_criterion?.keyword?.match_type),
      }));

    return NextResponse.json({
      campaignId,
      keywordCount: keywords.length,
      negativeCount: negatives.length,
      keywords,
      negatives,
    });
  } catch (err) {
    // GoogleAdsFailure'da err.message boş olabilir → detayı çıkar
    let detail = "";
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = err as any;
      detail = e?.errors?.[0]?.message || e?.message || JSON.stringify(e)?.slice(0, 500) || String(e);
    } catch {
      detail = String(err);
    }
    console.error("[google-ads] keyword-audit error:", err);
    return NextResponse.json({ error: detail || "Bilinmeyen hata" }, { status: 500 });
  }
}
