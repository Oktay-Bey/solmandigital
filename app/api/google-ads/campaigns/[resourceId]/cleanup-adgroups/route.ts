import { NextRequest, NextResponse } from "next/server";
import { listAdGroups, deleteAdGroup } from "@/lib/google-ads/campaigns";

// POST /api/google-ads/campaigns/[campaignId]/cleanup-adgroups?apply=true
//
// PAUSED (serve etmeyen) legacy/duplicate ad group'ları kaldırır.
// ENABLED ad group'lara KESİNLİKLE dokunmaz (yalnızca status=PAUSED=3).
// ?apply=true olmadan DRY-RUN.

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const apply = new URL(req.url).searchParams.get("apply") === "true";

    const all = await listAdGroups(campaignId);
    // status: "2"=ENABLED "3"=PAUSED "4"=REMOVED (string olarak döner)
    const enabled = all.filter((g) => g.status === "2");
    const paused = all.filter((g) => g.status === "3");

    const plan = {
      campaignId,
      mode: apply ? "APPLY" : "DRY-RUN",
      enabledKept: enabled.map((g) => ({ id: g.id, name: g.name })),
      pausedToRemove: paused.map((g) => ({ id: g.id, name: g.name })),
    };

    if (!apply) {
      return NextResponse.json({ ...plan, note: "DRY-RUN — yalnızca PAUSED ad group'lar kaldırılacak. ?apply=true" });
    }

    const removed: string[] = [];
    for (const g of paused) {
      await deleteAdGroup(g.resourceName);
      removed.push(`${g.id} ${g.name}`);
    }

    const after = (await listAdGroups(campaignId)).filter((g) => g.status !== "4");
    return NextResponse.json({
      ...plan,
      removedCount: removed.length,
      removed,
      remaining: after.map((g) => ({ id: g.id, name: g.name, status: g.status })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] cleanup-adgroups error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
