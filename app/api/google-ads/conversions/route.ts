import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

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
