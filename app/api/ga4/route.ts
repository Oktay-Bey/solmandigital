import { NextRequest, NextResponse } from "next/server";
import { getGA4Report, getGA4ConversionDiag, getGA4PageFunnel } from "@/lib/google-analytics-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get("days") ?? "30");

  try {
    if (searchParams.get("diag") === "1") {
      const diag = await getGA4ConversionDiag(days);
      return NextResponse.json({ diag });
    }
    if (searchParams.get("funnel") === "1") {
      const funnel = await getGA4PageFunnel(days);
      return NextResponse.json(funnel);
    }
    const report = await getGA4Report(days);
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[ga4] report error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
