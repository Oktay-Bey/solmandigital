import { NextRequest, NextResponse } from "next/server";
import { listCampaigns, createFullCampaign } from "@/lib/google-ads/campaigns";
import type { FullCampaignInput } from "@/lib/google-ads/campaigns";

// GET /api/google-ads/campaigns
export async function GET() {
  try {
    const campaigns = await listCampaigns();
    return NextResponse.json({ campaigns });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}

// POST /api/google-ads/campaigns — yeni kampanya oluştur
export async function POST(req: NextRequest) {
  try {
    const input: FullCampaignInput = await req.json();

    if (!input.campaignName || !input.dailyBudgetTL) {
      return NextResponse.json(
        { error: "campaignName ve dailyBudgetTL zorunlu." },
        { status: 400 }
      );
    }
    const hasAdGroups = input.adGroups && input.adGroups.length > 0;
    const hasLegacyFields = input.targetUrl && input.headlines?.length && input.descriptions?.length;
    if (!hasAdGroups && !hasLegacyFields) {
      return NextResponse.json(
        { error: "adGroups array veya targetUrl+headlines+descriptions gerekli." },
        { status: 400 }
      );
    }

    const result = await createFullCampaign(input);
    return NextResponse.json({ success: true, ...result }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] createFullCampaign error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
