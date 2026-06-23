import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// READ-ONLY teşhis — şehir/ilçe bazında Ads performansı.
// İlçe landing sayfası önceliklendirmesi için: hangi coğrafi bölgeler
// reklamlara tıklıyor/dönüşüyor → o ilçenin sayfasına yatırım yap.
//
// geographic_view.country_criterion_id + geo_target_constant ile şehir adı çözülür.
// LAST_30_DAYS, harcamaya göre sıralı.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get("campaignId") || "23914856579"; // default Ana TR
    if (!/^\d+$/.test(campaignId)) {
      return NextResponse.json({ error: "campaignId sayısal olmalı" }, { status: 400 });
    }
    const customer = getCustomer();

    // Şehir/bölge bazında metrikler. geographic_view location_type = LOCATION_OF_PRESENCE
    // (kullanıcının fiziksel konumu). geo_target_constant ile şehir adına çevrilir.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: any[] = await customer.query(`
      SELECT
        campaign.id,
        geographic_view.country_criterion_id,
        geographic_view.location_type,
        segments.geo_target_city,
        segments.geo_target_region,
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value
      FROM geographic_view
      WHERE campaign.id = '${campaignId}'
        AND segments.date DURING LAST_30_DAYS
      ORDER BY metrics.cost_micros DESC
      LIMIT 100
    `);

    // geo_target_city bir resource name (geoTargetConstants/1012782). Adını ayrı çöz.
    const cityResourceIds = Array.from(
      new Set(
        rows
          .map((r) => r.segments?.geo_target_city)
          .filter((v): v is string => typeof v === "string" && v.length > 0)
      )
    );

    const cityNames: Record<string, string> = {};
    if (cityResourceIds.length > 0) {
      const idList = cityResourceIds
        .map((rn) => `'${rn}'`)
        .join(",");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nameRows: any[] = await customer.query(`
        SELECT geo_target_constant.resource_name, geo_target_constant.name,
               geo_target_constant.canonical_name
        FROM geo_target_constant
        WHERE geo_target_constant.resource_name IN (${idList})
      `);
      for (const nr of nameRows) {
        const rn = nr.geo_target_constant?.resource_name;
        if (rn) cityNames[rn] = nr.geo_target_constant?.canonical_name || nr.geo_target_constant?.name || rn;
      }
    }

    const cities = rows.map((r) => {
      const cityRn = r.segments?.geo_target_city;
      return {
        city: cityRn ? (cityNames[cityRn] ?? cityRn) : "(bilinmiyor)",
        clicks: Number(r.metrics?.clicks ?? 0),
        impressions: Number(r.metrics?.impressions ?? 0),
        costTL: Number(((Number(r.metrics?.cost_micros ?? 0)) / 1_000_000).toFixed(2)),
        conversions: Number(r.metrics?.conversions ?? 0),
      };
    });

    // Aynı şehir birden çok satıra bölünebilir → şehir bazında topla
    const byCity: Record<string, { clicks: number; impressions: number; costTL: number; conversions: number }> = {};
    for (const c of cities) {
      const k = c.city;
      (byCity[k] ??= { clicks: 0, impressions: 0, costTL: 0, conversions: 0 });
      byCity[k].clicks += c.clicks;
      byCity[k].impressions += c.impressions;
      byCity[k].costTL += c.costTL;
      byCity[k].conversions += c.conversions;
    }
    const aggregated = Object.entries(byCity)
      .map(([city, m]) => ({
        city,
        ...m,
        costTL: Number(m.costTL.toFixed(2)),
        cpcTL: m.clicks > 0 ? Number((m.costTL / m.clicks).toFixed(2)) : 0,
      }))
      .sort((a, b) => b.costTL - a.costTL);

    return NextResponse.json({ campaignId, days: 30, count: aggregated.length, cities: aggregated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] geo-cities error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
