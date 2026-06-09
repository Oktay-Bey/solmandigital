import { NextRequest, NextResponse } from "next/server";
import { getGA4Report } from "@/lib/google-analytics-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") ?? "30");

  try {
    const report = await getGA4Report(days);
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[ga4] report error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
