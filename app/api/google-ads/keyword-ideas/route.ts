import { NextRequest, NextResponse } from "next/server";
import { generateKeywordIdeas } from "@/lib/google-ads/campaigns";

// POST /api/google-ads/keyword-ideas
// body: { seeds: string[], geoTargetConstantId: number, languageId: number }
export async function POST(req: NextRequest) {
  try {
    const { seeds, geoTargetConstantId, languageId } = await req.json();
    if (!Array.isArray(seeds) || seeds.length === 0 || !geoTargetConstantId || !languageId) {
      return NextResponse.json(
        { error: "seeds (string[]), geoTargetConstantId ve languageId zorunlu." },
        { status: 400 }
      );
    }
    const ideas = await generateKeywordIdeas({ seeds, geoTargetConstantId, languageId });
    return NextResponse.json({ count: ideas.length, ideas });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] keyword-ideas error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
