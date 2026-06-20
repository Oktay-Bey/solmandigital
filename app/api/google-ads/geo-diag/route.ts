import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// READ-ONLY teşhis route'u — hiçbir mutasyon yapmaz.
// Amaç: İngilizce search term sızıntısının coğrafi kök sebebini bulmak.
// 1) Kampanyanın geo target tipi PRESENCE mi PRESENCE_OR_INTEREST mi
// 2) Tıkların gerçek kullanıcı lokasyonu (ülke) kırılımı
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const campaignId = searchParams.get("campaignId") || "23914856579"; // default Ana TR
    if (!/^\d+$/.test(campaignId)) {
      return NextResponse.json({ error: "campaignId sayısal olmalı" }, { status: 400 });
    }
    const customer = getCustomer();

    // 1) Geo target tipi (presence vs interest)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const geoTypeRows: any[] = await customer.query(`
      SELECT
        campaign.id, campaign.name,
        campaign.geo_target_type_setting.positive_geo_target_type,
        campaign.geo_target_type_setting.negative_geo_target_type
      FROM campaign
      WHERE campaign.id = '${campaignId}'
    `);

    // 2) Kullanıcının GERÇEK fiziksel lokasyonuna göre performans (ülke düzeyi)
    // user_location_view = aramanın yapıldığı fiziksel konum (interest değil presence)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userLocRows: any[] = await customer.query(`
      SELECT
        campaign.id,
        user_location_view.country_criterion_id,
        user_location_view.targeting_location,
        metrics.clicks, metrics.impressions, metrics.cost_micros
      FROM user_location_view
      WHERE campaign.id = '${campaignId}'
        AND segments.date DURING LAST_30_DAYS
      ORDER BY metrics.cost_micros DESC
      LIMIT 50
    `);

    const geo = geoTypeRows[0]?.campaign?.geo_target_type_setting;
    // Enum: 5 = PRESENCE_OR_INTEREST (default, sızdırır), 7 = PRESENCE (sadece fiziksel)
    const posType = geo?.positive_geo_target_type;
    const posLabel =
      posType === 7 ? "PRESENCE (sadece fiziksel konum — temiz)" :
      posType === 5 ? "PRESENCE_OR_INTEREST (⚠️ ilgi dahil — global sızıntı sebebi)" :
      `bilinmeyen(${posType})`;

    const userLocations = userLocRows.map((r) => ({
      // targeting_location: bu konum hedeflenmiş mi (true) yoksa "interest"ten mi sızdı (false)
      isTargeted: r.user_location_view?.targeting_location,
      countryCriterionId: String(r.user_location_view?.country_criterion_id ?? ""),
      clicks: Number(r.metrics?.clicks ?? 0),
      impressions: Number(r.metrics?.impressions ?? 0),
      costTL: Number(r.metrics?.cost_micros ?? 0) / 1_000_000,
    }));

    const targetedCost = userLocations.filter((u) => u.isTargeted).reduce((s, u) => s + u.costTL, 0);
    const leakedCost = userLocations.filter((u) => !u.isTargeted).reduce((s, u) => s + u.costTL, 0);

    return NextResponse.json({
      campaignId,
      campaignName: geoTypeRows[0]?.campaign?.name,
      positiveGeoTargetType: posType,
      positiveGeoTargetLabel: posLabel,
      negativeGeoTargetType: geo?.negative_geo_target_type,
      summary: {
        hedeflenenKonumdanHarcama: Number(targetedCost.toFixed(2)),
        ilgiÜzerindenSızanHarcama: Number(leakedCost.toFixed(2)),
        not: "ilgiÜzerindenSızanHarcama > 0 ise: hedef-dışı konumdaki kullanıcılar 'interest' sebebiyle reklamı görüp tıklıyor.",
      },
      userLocations,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] geo-diag error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
