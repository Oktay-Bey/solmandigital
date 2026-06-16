import { NextRequest, NextResponse } from "next/server";
import { updateCampaignStatus, deleteCampaign, updateCampaignBudget, addAdGroupsToCampaign, listAdGroups, deleteAdGroup, addLanguageTargets, setDeviceBidModifier, setGeoTargetType } from "@/lib/google-ads/campaigns";
import type { AdGroupInput } from "@/lib/google-ads/campaigns";

// GET /api/google-ads/campaigns/[resourceId] — ad group listesi
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const adGroups = await listAdGroups(campaignId);
    return NextResponse.json({ adGroups });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}

// PATCH /api/google-ads/campaigns/[resourceId]
// Body: { status: "ENABLED" | "PAUSED" }
// resourceId: URL-encoded campaign ID (sadece sayı) veya resource name
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const rawBody = await req.arrayBuffer();
    const body = JSON.parse(new TextDecoder("utf-8").decode(rawBody));
    console.log("[PATCH] first headline:", body?.adGroups?.[0]?.headlines?.[0]);
    const { status, dailyBudgetTL, adGroups, languageIds, deviceBidModifiers, geoTargetType } = body as {
      status?: string;
      dailyBudgetTL?: number;
      adGroups?: AdGroupInput[];
      languageIds?: number[];
      deviceBidModifiers?: { device: "MOBILE" | "DESKTOP" | "TABLET"; bidModifier: number }[];
      geoTargetType?: "PRESENCE" | "PRESENCE_OR_INTEREST";
    };

    if (status) {
      if (status !== "ENABLED" && status !== "PAUSED") {
        return NextResponse.json({ error: "status 'ENABLED' veya 'PAUSED' olmalıdır." }, { status: 400 });
      }
      await updateCampaignStatus(campaignId, status as "ENABLED" | "PAUSED");
    }

    if (dailyBudgetTL) {
      await updateCampaignBudget(campaignId, dailyBudgetTL);
    }

    if (languageIds?.length) {
      await addLanguageTargets(campaignId, languageIds);
    }

    if (geoTargetType) {
      await setGeoTargetType(campaignId, geoTargetType);
    }

    if (deviceBidModifiers?.length) {
      for (const dbm of deviceBidModifiers) {
        await setDeviceBidModifier(campaignId, dbm.device, dbm.bidModifier);
      }
    }

    if (adGroups?.length) {
      const added = await addAdGroupsToCampaign(campaignId, adGroups);
      return NextResponse.json({ success: true, campaignId, adGroupsAdded: added });
    }

    return NextResponse.json({ success: true, campaignId, status, dailyBudgetTL });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}

// DELETE /api/google-ads/campaigns/[resourceId]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    await deleteCampaign(campaignId);
    return NextResponse.json({ success: true, campaignId });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}
