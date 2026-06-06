import { NextRequest, NextResponse } from "next/server";
import { updateCampaignStatus, deleteCampaign } from "@/lib/google-ads/campaigns";

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
    const { status } = await req.json();

    if (status !== "ENABLED" && status !== "PAUSED") {
      return NextResponse.json(
        { error: "status 'ENABLED' veya 'PAUSED' olmalıdır." },
        { status: 400 }
      );
    }

    await updateCampaignStatus(campaignId, status);
    return NextResponse.json({ success: true, campaignId, status });
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
