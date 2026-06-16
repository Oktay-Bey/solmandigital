import { NextRequest, NextResponse } from "next/server";
import { addCallouts, addStructuredSnippet } from "@/lib/google-ads/campaigns";

// POST /api/google-ads/campaigns/[campaignId]/extra-assets?apply=true
//
// Callout + structured snippet ekler (v2-4). Güven sinyali + hizmet kapsamı →
// reklam alanı büyür, CTR artar. Türkçe karakter güvenli (REST mutate).
// ?apply=true olmadan DRY-RUN.

// Callout ≤25 karakter. Güven/fark yaratan kısa ibareler.
const CALLOUTS = [
  "Sabit Fiyat Garantisi",
  "Kaynak Kodu Sizde",
  "İstanbul Yazılım Ofisi",
  "5-10 İş Gününde Teslim",
  "İlk Görüşme Ücretsiz",
  "Doğrudan Uzman Erişimi",
];

// Structured snippet — header Google enum'u (Services geçerli). values ≤25 char.
const SNIPPET_HEADER = "Services";
const SNIPPET_VALUES = ["Web Sitesi", "AI Otomasyon", "E-Ticaret", "SaaS Platform", "Trendyol Entegrasyonu", "SEO"];

function check(items: string[], max: number): string[] {
  return items.filter((t) => [...t].length > max).map((t) => `"${t}" > ${max}`);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const apply = new URL(req.url).searchParams.get("apply") === "true";

    const errs = [...check(CALLOUTS, 25), ...check(SNIPPET_VALUES, 25)];
    if (errs.length) return NextResponse.json({ error: "Karakter limiti", errs }, { status: 400 });

    const plan = {
      campaignId,
      mode: apply ? "APPLY" : "DRY-RUN",
      callouts: CALLOUTS,
      snippet: { header: SNIPPET_HEADER, values: SNIPPET_VALUES },
    };

    if (!apply) {
      return NextResponse.json({ ...plan, note: "DRY-RUN — yazılmadı. ?apply=true ile uygula." });
    }

    const calloutsAdded = await addCallouts(campaignId, CALLOUTS);
    const snippetResource = await addStructuredSnippet(campaignId, SNIPPET_HEADER, SNIPPET_VALUES);

    return NextResponse.json({ ...plan, calloutsAdded, snippetResource });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] extra-assets error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
