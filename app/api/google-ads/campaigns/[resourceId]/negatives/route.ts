import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// POST /api/google-ads/campaigns/[resourceId]/negatives
// Body: { keywords: string[] }
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const { keywords, matchType } = await req.json() as {
      keywords: string[];
      matchType?: "BROAD" | "PHRASE" | "EXACT";
    };

    if (!keywords?.length) {
      return NextResponse.json({ error: "keywords array gerekli." }, { status: 400 });
    }

    // Cerrahi negatif için PHRASE/EXACT istenebilir; uyumluluk için default BROAD.
    const MATCH: Record<string, number> = { EXACT: 2, PHRASE: 3, BROAD: 4 };
    const mt = MATCH[matchType ?? "BROAD"] ?? 4;

    const customer = getCustomer();
    const campaignResource = `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`;
    const results: { text: string; status: "ok" | "skipped"; resource?: string }[] = [];

    for (const text of keywords) {
      try {
        const res = await customer.campaignCriteria.create([{
          campaign: campaignResource,
          negative: true,
          keyword: { text, match_type: mt },
        }]);
        const resource = (res as unknown as { results: { resource_name: string }[] }).results[0]?.resource_name;
        results.push({ text, status: "ok", resource });
      } catch (e) {
        const err = e as Record<string, unknown>;
        const errs = (err?.errors as unknown[]) ?? [];
        console.warn("[negatives] SKIPPED:", text, JSON.stringify(errs));
        results.push({ text, status: "skipped" });
      }
    }

    const added = results.filter((r) => r.status === "ok").length;
    return NextResponse.json({ success: true, added, skipped: results.length - added, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
