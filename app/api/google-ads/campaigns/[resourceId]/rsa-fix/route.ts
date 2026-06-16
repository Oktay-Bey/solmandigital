import { NextRequest, NextResponse } from "next/server";
import { listAdGroupAds, buildFixedRsa, recreateRsa } from "@/lib/google-ads/campaigns";
import type { RsaAdSnapshot } from "@/lib/google-ads/campaigns";

// POST /api/google-ads/campaigns/[campaignId]/rsa-fix?apply=true
//
// Türkçe karakter düzeltmesi + satış-niyeti başlık güçlendirmesi (v2-2):
//  - Kampanyadaki her ENABLED RSA'yı tarar.
//  - Türkçe-karaktersiz metni düzeltir, yer varsa satış başlığı ekler.
//  - RSA metni değişmez → düzeltilmiş yeni reklam oluşturur + eskisini PAUSED yapar.
//  - İngilizce ad group'lar (/en/ final URL) atlanır.
//  - Değişiklik gerektirmeyen reklamlara dokunulmaz.
//
// ?apply=true olmadan DRY-RUN.

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const apply = new URL(req.url).searchParams.get("apply") === "true";
    const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;

    const ads = await listAdGroupAds(campaignId);

    const plan: Array<{
      adGroupId: string; adGroupName: string; adId: string;
      action: "skip-en" | "skip-paused" | "no-change" | "recreate";
      beforeHeadlines?: string[]; afterHeadlines?: string[];
      newResource?: string;
    }> = [];

    for (const ad of ads) {
      // Sadece ENABLED reklamları işle — PAUSED (zaten düzeltilip duraklatılmış eskiler) atlanır.
      if (ad.status !== 2) {
        plan.push({ adGroupId: ad.adGroupId, adGroupName: ad.adGroupName, adId: ad.adId, action: "skip-paused" });
        continue;
      }
      const isEnglish = ad.finalUrls.some((u) => /\/en\//.test(u));
      if (isEnglish) {
        plan.push({ adGroupId: ad.adGroupId, adGroupName: ad.adGroupName, adId: ad.adId, action: "skip-en" });
        continue;
      }

      const snapshot: RsaAdSnapshot = {
        adGroupResource: ad.adGroupResource,
        adResourceName: `customers/${cid}/adGroupAds/${ad.adGroupId}~${ad.adId}`,
        finalUrls: ad.finalUrls,
        headlines: ad.headlines.map((h) => h.text),
        descriptions: ad.descriptions.map((d) => d.text),
      };

      const fixed = buildFixedRsa(snapshot);
      if (!fixed) {
        plan.push({ adGroupId: ad.adGroupId, adGroupName: ad.adGroupName, adId: ad.adId, action: "no-change" });
        continue;
      }

      const entry: (typeof plan)[number] = {
        adGroupId: ad.adGroupId, adGroupName: ad.adGroupName, adId: ad.adId,
        action: "recreate",
        beforeHeadlines: snapshot.headlines,
        afterHeadlines: fixed.headlines,
      };

      if (apply) {
        entry.newResource = await recreateRsa(snapshot, fixed);
      }
      plan.push(entry);
    }

    const summary = {
      campaignId,
      mode: apply ? "APPLY" : "DRY-RUN",
      total: ads.length,
      recreate: plan.filter((p) => p.action === "recreate").length,
      skippedEn: plan.filter((p) => p.action === "skip-en").length,
      skippedPaused: plan.filter((p) => p.action === "skip-paused").length,
      noChange: plan.filter((p) => p.action === "no-change").length,
    };

    return NextResponse.json({
      ...summary,
      plan,
      note: apply ? "Uygulandı — eski reklamlar PAUSED, yeni reklamlar ENABLED." : "DRY-RUN — yazılmadı. Uygulamak için ?apply=true",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] rsa-fix error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
