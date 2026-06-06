import { NextRequest, NextResponse } from "next/server";
import { deleteAdGroup, renameAdGroup } from "@/lib/google-ads/campaigns";

// PATCH /api/google-ads/campaigns/[resourceId]/adgroups/[adGroupId]
// Body: { name: "Yeni İsim" }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ adGroupId: string }> }
) {
  try {
    const { adGroupId } = await params;
    const decoded = decodeURIComponent(adGroupId);
    const resourceName = decoded.includes("/")
      ? decoded
      : `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/adGroups/${decoded}`;
    const { name } = await req.json();
    await renameAdGroup(resourceName, name);
    return NextResponse.json({ success: true, adGroupId: decoded, name });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}

// DELETE /api/google-ads/campaigns/[resourceId]/adgroups/[adGroupId]
// adGroupId: URL-encoded resource name (customers/xxx/adGroups/yyy) veya sadece sayısal ID
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ resourceId: string; adGroupId: string }> }
) {
  try {
    const { adGroupId } = await params;
    const decoded = decodeURIComponent(adGroupId);
    const resourceName = decoded.includes("/")
      ? decoded
      : `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/adGroups/${decoded}`;
    await deleteAdGroup(resourceName);
    return NextResponse.json({ success: true, adGroupId: decoded });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}
