import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// GET /api/google-ads/conversions — hesaptaki conversion action'ları listele
export async function GET() {
  try {
    const customer = getCustomer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any[] = await customer.query(`
      SELECT conversion_action.id, conversion_action.name,
             conversion_action.status, conversion_action.type,
             conversion_action.origin
      FROM conversion_action
      WHERE conversion_action.status != 'REMOVED'
      ORDER BY conversion_action.name
    `);
    const conversions = result.map((row) => {
      const ca = (row.conversion_action as Record<string, unknown>) ?? {};
      return {
        id: String(ca.id ?? ""),
        name: String(ca.name ?? ""),
        status: ca.status,
        type: ca.type,
        origin: ca.origin,
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
