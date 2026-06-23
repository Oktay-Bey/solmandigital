import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

const MATCH: Record<string, number> = { BROAD: 4, PHRASE: 3, EXACT: 2 };

// POST /api/google-ads/adgroups/[adGroupId]/keywords
// Body: { keywords: { text: string; matchType: "BROAD"|"PHRASE"|"EXACT" }[] }
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ adGroupId: string }> }
) {
  try {
    const { adGroupId } = await params;
    const { keywords } = await req.json() as {
      keywords: { text: string; matchType?: "BROAD" | "PHRASE" | "EXACT" }[];
    };

    if (!keywords?.length) {
      return NextResponse.json({ error: "keywords array gerekli." }, { status: 400 });
    }

    const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
    const adGroupResource = `customers/${cid}/adGroups/${adGroupId}`;
    const customer = getCustomer();

    const results: { text: string; matchType: string; status: "ok" | "skipped"; resource?: string }[] = [];

    for (const kw of keywords) {
      const matchType = kw.matchType ?? "PHRASE";
      try {
        const res = await customer.adGroupCriteria.create([{
          ad_group: adGroupResource,
          status: 2, // ENABLED
          keyword: { text: kw.text, match_type: MATCH[matchType] ?? 3 },
        }]);
        const resource = (res as unknown as { results: { resource_name: string }[] }).results[0]?.resource_name;
        results.push({ text: kw.text, matchType, status: "ok", resource });
      } catch (e) {
        const err = e as Record<string, unknown>;
        const errs = (err?.errors as unknown[]) ?? [];
        console.warn("[keywords] SKIPPED:", kw.text, JSON.stringify(errs));
        results.push({ text: kw.text, matchType, status: "skipped" });
      }
    }

    const added = results.filter((r) => r.status === "ok").length;
    return NextResponse.json({ success: true, added, skipped: results.length - added, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/google-ads/adgroups/[adGroupId]/keywords
// Body: { pauseTexts: string[] }            → verilen metinli keyword'leri PAUSED yapar
//   veya { enableTexts: string[] }          → verilen metinli keyword'leri ENABLED yapar
//   veya { bids: { text: string; bidTL: number }[] } → keyword-bazlı CPC teklifi günceller
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ adGroupId: string }> }
) {
  try {
    const { adGroupId } = await params;
    const { pauseTexts, enableTexts, bids, moveTexts } = await req.json() as {
      pauseTexts?: string[];
      enableTexts?: string[];
      bids?: { text: string; bidTL: number }[];
      // moveTexts: keyword'ü bu gruptan kaldır + hedef grupta yeniden ekle (QS düzeltme)
      moveTexts?: { text: string; toAdGroupId: string; matchType?: "BROAD" | "PHRASE" | "EXACT" }[];
    };
    if (!pauseTexts?.length && !enableTexts?.length && !bids?.length && !moveTexts?.length) {
      return NextResponse.json({ error: "pauseTexts, enableTexts, bids veya moveTexts array gerekli." }, { status: 400 });
    }
    const customer = getCustomer();
    // Mevcut keyword'leri çek (resource_name + metin) — hem pause hem bid için eşleşme kaynağı
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows: any[] = await customer.query(`
      SELECT ad_group_criterion.resource_name, ad_group_criterion.keyword.text
      FROM ad_group_criterion
      WHERE ad_group.id = ${adGroupId} AND ad_group_criterion.type = KEYWORD
        AND ad_group_criterion.status != 'REMOVED'
    `);
    const norm = (s: string) => s.normalize("NFC").toLocaleLowerCase("tr-TR").trim();
    const resByText = new Map<string, string>();
    for (const r of rows) {
      resByText.set(norm(String(r.ad_group_criterion?.keyword?.text ?? "")), r.ad_group_criterion.resource_name);
    }

    // Taşıma: kaynak gruptan kaldır (status REMOVED=4) + hedef grupta yeniden ekle
    if (moveTexts?.length) {
      const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
      const moved: { text: string; status: "moved" | "skipped"; note?: string }[] = [];
      for (const mv of moveTexts) {
        const srcRes = resByText.get(norm(mv.text));
        if (!srcRes) { moved.push({ text: mv.text, status: "skipped", note: "kaynak grupta yok" }); continue; }
        try {
          // 1) hedef grupta ENABLED keyword oluştur
          await customer.adGroupCriteria.create([{
            ad_group: `customers/${cid}/adGroups/${mv.toAdGroupId}`,
            status: 2,
            keyword: { text: mv.text, match_type: MATCH[mv.matchType ?? "PHRASE"] ?? 3 },
          }]);
          // 2) kaynaktan kaldır (REMOVED=4)
          await customer.adGroupCriteria.update([{ resource_name: srcRes, status: 4 }]);
          moved.push({ text: mv.text, status: "moved" });
        } catch (e) {
          const errs = ((e as Record<string, unknown>)?.errors as unknown[]) ?? [];
          console.warn("[keywords] MOVE SKIPPED:", mv.text, JSON.stringify(errs));
          moved.push({ text: mv.text, status: "skipped", note: "create/remove hatası" });
        }
      }
      return NextResponse.json({ success: true, moved });
    }

    // Bid güncelleme
    if (bids?.length) {
      const updates = bids
        .map((b) => {
          const resource_name = resByText.get(norm(b.text));
          if (!resource_name) return null;
          // cpc_bid_micros = TL * 1_000_000
          return { resource_name, cpc_bid_micros: Math.round(b.bidTL * 1_000_000) };
        })
        .filter((u): u is { resource_name: string; cpc_bid_micros: number } => u !== null);
      if (!updates.length) {
        return NextResponse.json({ success: true, updated: 0, note: "eşleşen keyword yok" });
      }
      await customer.adGroupCriteria.update(updates);
      return NextResponse.json({ success: true, updated: updates.length });
    }

    // Enable (status → ENABLED=2)
    if (enableTexts?.length) {
      const want = new Set(enableTexts.map(norm));
      const toEnable = rows
        .filter((r) => want.has(norm(String(r.ad_group_criterion?.keyword?.text ?? ""))))
        .map((r) => r.ad_group_criterion.resource_name);
      if (!toEnable.length) {
        return NextResponse.json({ success: true, enabled: 0, note: "eşleşen keyword yok" });
      }
      await customer.adGroupCriteria.update(
        toEnable.map((resource_name) => ({ resource_name, status: 2 }))
      );
      return NextResponse.json({ success: true, enabled: toEnable.length });
    }

    // Pause
    const want = new Set(pauseTexts!.map(norm));
    const toPause = rows
      .filter((r) => want.has(norm(String(r.ad_group_criterion?.keyword?.text ?? ""))))
      .map((r) => r.ad_group_criterion.resource_name);
    if (!toPause.length) {
      return NextResponse.json({ success: true, paused: 0, note: "eşleşen keyword yok" });
    }
    await customer.adGroupCriteria.update(
      toPause.map((resource_name) => ({ resource_name, status: 3 })) // criterion PAUSED=3 (ENABLED=2, REMOVED=4)
    );
    return NextResponse.json({ success: true, paused: toPause.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[keywords PATCH] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
