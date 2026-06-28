import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// PATCH /api/google-ads/conversions — bir conversion action'ın birincil/dahil ayarını değiştir.
// Body: { id: string, primaryForGoal?: boolean, includeInConversionsMetric?: boolean }
//   primaryForGoal=false → action Smart Bidding optimizasyonundan çıkar.
//   includeInConversionsMetric=false → action "Conversions" metriğinden çıkar (çift sayım önleme).
//   İkisini birlikte false yapmak action'ı tam "Secondary" yapar (veri GA4'te kalır).
//   En az biri gönderilmeli. Action önce hesapta var olmalı (GA4'ten import edilmiş olmalı).
export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      id?: string;
      primaryForGoal?: boolean;
      includeInConversionsMetric?: boolean;
    };
    const id = String(body.id ?? "").trim();
    const hasPrimary = typeof body.primaryForGoal === "boolean";
    const hasInclude = typeof body.includeInConversionsMetric === "boolean";
    if (!id || (!hasPrimary && !hasInclude)) {
      return NextResponse.json(
        { error: "Body: { id, primaryForGoal? ve/veya includeInConversionsMetric? } gerekli." },
        { status: 400 }
      );
    }
    const customer = getCustomer();
    const resourceName = `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/conversionActions/${id}`;
    // Ads API primary_for_goal ve include_in_conversions_metric'i AYNI mutate'te
    // güncellemeye izin vermiyor — ayrı update'ler olarak gönder. Önce primary
    // (include=false yapılacaksa action'ın önce optimizasyondan çıkması tutarlı olur).
    if (hasPrimary) {
      await customer.conversionActions.update([
        { resource_name: resourceName, primary_for_goal: body.primaryForGoal },
      ]);
    }
    if (hasInclude) {
      await customer.conversionActions.update([
        { resource_name: resourceName, include_in_conversions_metric: body.includeInConversionsMetric },
      ]);
    }
    return NextResponse.json({
      ok: true,
      id,
      ...(hasPrimary ? { primaryForGoal: body.primaryForGoal } : {}),
      ...(hasInclude ? { includeInConversionsMetric: body.includeInConversionsMetric } : {}),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}

// GET /api/google-ads/conversions — hesaptaki conversion action'ları listele
// ?stats=1 → son 30 günde her conversion action'ın kayıt sayısını ekle (denetim)
export async function GET(req: NextRequest) {
  try {
    const customer = getCustomer();
    const withStats = req.nextUrl.searchParams.get("stats") === "1";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any[] = await customer.query(`
      SELECT conversion_action.id, conversion_action.name,
             conversion_action.status, conversion_action.type,
             conversion_action.origin, conversion_action.category,
             conversion_action.primary_for_goal,
             conversion_action.include_in_conversions_metric,
             conversion_action.counting_type
      FROM conversion_action
      WHERE conversion_action.status != 'REMOVED'
      ORDER BY conversion_action.name
    `);

    // Son 30 gün dönüşüm istatistikleri (action bazında)
    let statsByName: Record<string, number> = {};
    if (withStats) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const srows: any[] = await customer.query(`
        SELECT conversion_action.name, metrics.all_conversions
        FROM conversion_action
        WHERE conversion_action.status != 'REMOVED'
          AND segments.date DURING LAST_30_DAYS
      `);
      statsByName = srows.reduce((acc, r) => {
        const n = String(r.conversion_action?.name ?? "");
        acc[n] = (acc[n] ?? 0) + Number(r.metrics?.all_conversions ?? 0);
        return acc;
      }, {} as Record<string, number>);
    }

    const conversions = result.map((row) => {
      const ca = (row.conversion_action as Record<string, unknown>) ?? {};
      const name = String(ca.name ?? "");
      return {
        id: String(ca.id ?? ""),
        name,
        status: ca.status,
        type: ca.type,
        origin: ca.origin,
        category: ca.category,
        primaryForGoal: ca.primary_for_goal,
        includeInConversionsMetric: ca.include_in_conversions_metric,
        countingType: ca.counting_type,
        ...(withStats ? { conversions30d: statsByName[name] ?? 0 } : {}),
      };
    });
    return NextResponse.json({ conversions });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}
