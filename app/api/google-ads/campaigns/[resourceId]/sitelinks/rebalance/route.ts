import { NextRequest, NextResponse } from "next/server";
import { listSitelinks, addSitelinks, removeCampaignAssets } from "@/lib/google-ads/campaigns";
import type { SitelinkInput } from "@/lib/google-ads/campaigns";

// POST /api/google-ads/campaigns/[campaignId]/sitelinks/rebalance?apply=true
//
// "Ücretsiz analiz" trafiğini hizmet talebine kaydırma (Bölüm B):
//  - Mevcut sitelink'leri Türkçe-karakterli + hizmet-köprüleyen metinlerle yeniden kurar
//  - 2 yeni hizmet sitelink'i (AI Otomasyon, Web Sitesi) ekler
//  - Eski (Türkçe karaktersiz) campaign_asset bağlarını kaldırır
//
// ?apply=true olmadan DRY-RUN: yalnızca mevcut durum + plan döner, hesaba yazmaz.

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://solmandigital.com.tr";

// Hedef sitelink seti — düzgün Türkçe karakterlerle. description ≤35, linkText ≤25.
const TARGET_SITELINKS: SitelinkInput[] = [
  { linkText: "Ücretsiz Analiz", description1: "Önce analiz, sonra çözüm planı", description2: "Sabit fiyatlı net teklif", finalUrl: `${SITE}/ucretsiz-analiz` },
  { linkText: "Fiyatlar", description1: "Şeffaf ve net fiyat listesi", description2: "Bağlayıcı olmayan teklif", finalUrl: `${SITE}/fiyatlar` },
  { linkText: "Hizmetlerimiz", description1: "Yazılım hizmetlerimizi inceleyin", description2: "Web, AI, e-ticaret, SaaS", finalUrl: `${SITE}/hizmetler` },
  { linkText: "Projelerimiz", description1: "Gerçekleştirdiğimiz projeler", description2: "Teslim ettiğimiz işler", finalUrl: `${SITE}/portfoy` },
  { linkText: "AI Otomasyon", description1: "Tekrar eden işleri devralalım", description2: "GPT-4o ile somut ROI", finalUrl: `${SITE}/ai-otomasyon-hizmeti` },
  { linkText: "Web Sitesi", description1: "Hızlı, SEO uyumlu kurumsal site", description2: "5-10 iş gününde teslim", finalUrl: `${SITE}/web-sitesi-yaptirmak` },
];

function validate(sl: SitelinkInput): string[] {
  const e: string[] = [];
  if ([...sl.linkText].length > 25) e.push(`linkText "${sl.linkText}" > 25`);
  if ([...sl.description1].length > 35) e.push(`description1 "${sl.description1}" > 35`);
  if ([...sl.description2].length > 35) e.push(`description2 "${sl.description2}" > 35`);
  return e;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const apply = new URL(req.url).searchParams.get("apply") === "true";

    const limitErrors = TARGET_SITELINKS.flatMap(validate);
    if (limitErrors.length) {
      return NextResponse.json({ error: "Karakter limiti aşıldı", limitErrors }, { status: 400 });
    }

    const before = await listSitelinks(campaignId);
    const plan = {
      campaignId,
      mode: apply ? "APPLY" : "DRY-RUN",
      currentSitelinks: before.map((s) => ({ linkText: s.linkText, description1: s.description1, finalUrls: s.finalUrls })),
      willAdd: TARGET_SITELINKS.map((s) => s.linkText),
      willRemove: before.map((s) => s.campaignAssetResource),
    };

    if (!apply) {
      return NextResponse.json({ ...plan, note: "DRY-RUN — hesaba yazılmadı. Uygulamak için ?apply=true" });
    }

    // 1) Yeni Türkçe-karakterli + hizmet sitelink'lerini ekle
    const added = await addSitelinks(campaignId, TARGET_SITELINKS);
    // 2) Eski campaign_asset bağlarını kaldır
    const removed = await removeCampaignAssets(before.map((s) => s.campaignAssetResource));
    // 3) Doğrulama snapshot'ı
    const after = await listSitelinks(campaignId);

    return NextResponse.json({
      ...plan,
      added: added.map((a) => a.linkText),
      removedCount: removed,
      afterSitelinks: after.map((s) => ({ linkText: s.linkText, description1: s.description1, finalUrls: s.finalUrls })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] sitelinks rebalance error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
