import { NextRequest, NextResponse } from "next/server";
import { getCustomer } from "@/lib/google-ads/client";

// matchType string → proto enum
const MATCH_MAP: Record<string, number> = { BROAD: 4, PHRASE: 3, EXACT: 2 };

// POST /api/google-ads/adgroups
// Creates an ad group + RSA + keywords via protobuf client
// Body: { campaignId, name, finalUrl, headlines, descriptions, keywords[] }
export async function POST(req: NextRequest) {
  try {
    const { campaignId, name, finalUrl, headlines, descriptions, keywords } = await req.json() as {
      campaignId: string;
      name: string;
      finalUrl: string;
      headlines: { text: string }[];
      descriptions: { text: string }[];
      keywords?: { text: string; matchType?: "BROAD" | "PHRASE" | "EXACT" }[];
    };

    const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
    const customer = getCustomer();
    const campaignResource = `customers/${cid}/campaigns/${campaignId}`;

    // Step 1: Create ad group
    const agRes = await (customer as unknown as {
      adGroups: { create: (ops: unknown[]) => Promise<{ results: { resource_name: string }[] }> }
    }).adGroups.create([
      {
        campaign: campaignResource,
        name,
        status: 2, // ENABLED
        type: 2,   // SEARCH_STANDARD
      },
    ]);

    const adGroupResource = agRes.results[0].resource_name;
    const adGroupId = adGroupResource.split("/")[3];

    // Step 2: Create RSA
    let adResult: unknown;
    try {
      adResult = await (customer as unknown as {
        adGroupAds: { create: (ops: unknown[]) => Promise<unknown> }
      }).adGroupAds.create([
        {
          ad_group: adGroupResource,
          status: 2, // ENABLED
          ad: {
            final_urls: [finalUrl],
            responsive_search_ad: {
              headlines: headlines.map((h) => ({ text: h.text })),
              descriptions: descriptions.map((d) => ({ text: d.text })),
            },
          },
        },
      ]);
    } catch (adErr) {
      console.warn("[adgroups] RSA create failed:", adErr);
      adResult = { error: adErr instanceof Error ? adErr.message : "RSA create failed" };
    }

    // Step 3: Add keywords
    const kwResults: { text: string; status: string }[] = [];
    for (const kw of keywords ?? []) {
      const matchType = MATCH_MAP[kw.matchType ?? "PHRASE"] ?? 3;
      try {
        await (customer as unknown as {
          adGroupCriteria: { create: (ops: unknown[]) => Promise<unknown> }
        }).adGroupCriteria.create([
          {
            ad_group: adGroupResource,
            status: 2, // ENABLED
            keyword: { text: kw.text, match_type: matchType },
          },
        ]);
        kwResults.push({ text: kw.text, status: "ok" });
      } catch {
        kwResults.push({ text: kw.text, status: "skipped" });
      }
    }

    return NextResponse.json({
      success: true,
      adGroupResource,
      adGroupId,
      adResult,
      keywords: { added: kwResults.filter((r) => r.status === "ok").length, results: kwResults },
    });
  } catch (err) {
    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "object" && err !== null) {
      message = JSON.stringify(err);
    } else {
      message = String(err);
    }
    console.error("[google-ads] adgroup create error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
