import { NextRequest, NextResponse } from "next/server";
import { addSitelinks } from "@/lib/google-ads/campaigns";
import type { SitelinkInput } from "@/lib/google-ads/campaigns";

// POST /api/google-ads/campaigns/[resourceId]/sitelinks
// Body: { sitelinks: SitelinkInput[] }
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const { sitelinks } = await req.json() as { sitelinks: SitelinkInput[] };

    if (!sitelinks?.length) {
      return NextResponse.json({ error: "sitelinks array gerekli." }, { status: 400 });
    }

    const results = await addSitelinks(campaignId, sitelinks);
    return NextResponse.json({ success: true, campaignId, added: results.length, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] sitelinks error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
