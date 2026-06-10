import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

const MATCH: Record<string, number> = { BROAD: 4, PHRASE: 3, EXACT: 2 };

// POST /api/google-ads/adgroups/[adGroupId]/keywords
// Body: { keywords: { text: string; matchType: "BROAD"|"PHRASE"|"EXACT" }[] }
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ adGroupId: string }> }
) {
  try {
    const { adGroupId } = await params;
    const { keywords } = await req.json() as {
      keywords: { text: string; matchType?: "BROAD" | "PHRASE" | "EXACT" }[];
    };

    if (!keywords?.length) {
      return NextResponse.json({ error: "keywords array gerekli." }, { status: 400 });
    }

    const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
    const adGroupResource = `customers/${cid}/adGroups/${adGroupId}`;
    const customer = getCustomer();

    const results: { text: string; matchType: string; status: "ok" | "skipped"; resource?: string }[] = [];

    for (const kw of keywords) {
      const matchType = kw.matchType ?? "PHRASE";
      try {
        const res = await customer.adGroupCriteria.create([{
          ad_group: adGroupResource,
          status: 2, // ENABLED
          keyword: { text: kw.text, match_type: MATCH[matchType] ?? 3 },
        }]);
        const resource = (res as unknown as { results: { resource_name: string }[] }).results[0]?.resource_name;
        results.push({ text: kw.text, matchType, status: "ok", resource });
      } catch (e) {
        const err = e as Record<string, unknown>;
        const errs = (err?.errors as unknown[]) ?? [];
        console.warn("[keywords] SKIPPED:", kw.text, JSON.stringify(errs));
        results.push({ text: kw.text, matchType, status: "skipped" });
      }
    }

    const added = results.filter((r) => r.status === "ok").length;
    return NextResponse.json({ success: true, added, skipped: results.length - added, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
