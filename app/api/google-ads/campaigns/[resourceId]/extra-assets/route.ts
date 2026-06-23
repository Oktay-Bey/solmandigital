import { NextRequest, NextResponse } from "next/server";
import { addCallouts, addStructuredSnippet, listSitelinks } from "@/lib/google-ads/campaigns";
import { getCustomer } from "@/lib/google-ads/client";

// GET — mevcut callout/snippet/sitelink asset'lerini oku (duplicate önleme).
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const campaignId = decodeURIComponent(resourceId);
    const customer = getCustomer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: any[] = await customer.query(`
      SELECT campaign.id, campaign_asset.field_type, asset.callout_asset.callout_text,
        asset.structured_snippet_asset.header, asset.structured_snippet_asset.values
      FROM campaign_asset
      WHERE campaign.id='${campaignId}' AND campaign_asset.status='ENABLED'
    `);
    const callouts = rows
      .map((r) => r.asset?.callout_asset?.callout_text)
      .filter(Boolean);
    const snippets = rows
      .filter((r) => r.asset?.structured_snippet_asset?.header)
      .map((r) => ({ header: r.asset.structured_snippet_asset.header, values: r.asset.structured_snippet_asset.values }));
    const sitelinks = await listSitelinks(campaignId);
    return NextResponse.json({ campaignId, calloutCount: callouts.length, callouts, snippets, sitelinkCount: sitelinks.length, sitelinks });
  } catch (err) {
    const detail = (err as { errors?: { message: string }[] })?.errors?.[0]?.message || String(err);
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}

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
    const sp = new URL(req.url).searchParams;
    const apply = sp.get("apply") === "true";
    // ?only=callouts → snippet'i atla (zaten varsa duplike etme)
    const only = sp.get("only");
    const doSnippet = only !== "callouts";
    const doCallouts = only !== "snippet";

    const errs = [...check(CALLOUTS, 25), ...check(SNIPPET_VALUES, 25)];
    if (errs.length) return NextResponse.json({ error: "Karakter limiti", errs }, { status: 400 });

    const plan = {
      campaignId,
      mode: apply ? "APPLY" : "DRY-RUN",
      callouts: doCallouts ? CALLOUTS : [],
      snippet: doSnippet ? { header: SNIPPET_HEADER, values: SNIPPET_VALUES } : null,
    };

    if (!apply) {
      return NextResponse.json({ ...plan, note: "DRY-RUN — yazılmadı. ?apply=true ile uygula." });
    }

    const calloutsAdded = doCallouts ? await addCallouts(campaignId, CALLOUTS) : 0;
    const snippetResource = doSnippet ? await addStructuredSnippet(campaignId, SNIPPET_HEADER, SNIPPET_VALUES) : null;

    return NextResponse.json({ ...plan, calloutsAdded, snippetResource });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] extra-assets error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
