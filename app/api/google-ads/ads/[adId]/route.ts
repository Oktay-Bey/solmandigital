import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getCustomer } from "@/lib/google-ads/client";

async function getAccessToken(): Promise<string> {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_ADS_CLIENT_ID,
    process.env.GOOGLE_ADS_CLIENT_SECRET,
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN });
  const { token } = await auth.getAccessToken();
  if (!token) throw new Error("OAuth2 access token alınamadı");
  return token;
}

async function mutate(cid: string, loginId: string | undefined, devToken: string, accessToken: string, operations: unknown[]) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": devToken,
    "Content-Type": "application/json; charset=utf-8",
  };
  if (loginId && loginId !== cid) headers["login-customer-id"] = loginId;

  const url = `https://googleads.googleapis.com/v23/customers/${cid}/googleAds:mutate`;
  const body = JSON.stringify({ mutateOperations: operations });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  let res: Response;
  try {
    res = await fetch(url, { method: "POST", headers, body: new TextEncoder().encode(body), signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
  const text = await res.text();
  if (!res.ok || text.trim().startsWith("<")) throw new Error(`REST API error ${res.status}: ${text.slice(0, 1000)}`);
  return JSON.parse(text);
}

// PUT /api/google-ads/ads/[adId]
// Body: { adGroupResource, finalUrls, headlines, descriptions }
// RSA güncellemesi: önce remove dene (zaten kaldırılmışsa atla), sonra yenisini oluştur
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ adId: string }> }
) {
  try {
    const { adId } = await params;
    const { adGroupResource, finalUrls, headlines, descriptions } = await req.json() as {
      adGroupResource: string;
      finalUrls: string[];
      headlines: { text: string }[];
      descriptions: { text: string }[];
    };

    const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
    const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
    const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN!;
    const accessToken = await getAccessToken();

    const adGroupId = adGroupResource.split("/")[3];

    // 1. Remove the old ad — zaten kaldırılmışsa veya network hatası olursa yut
    // adId "new" ise bu grup için mevcut ad yok — remove adımını atla
    if (adId !== "new") try {
      await mutate(cid, loginId, devToken, accessToken, [
        {
          adGroupAdOperation: {
            remove: `customers/${cid}/adGroupAds/${adGroupId}~${adId}`,
          },
        },
      ]);
    } catch (removeErr) {
      const msg = removeErr instanceof Error ? removeErr.message : "";
      // Zaten kaldırılmış, yok, ya da geçici network hatası — devam et
      const isIgnorable = msg.includes("CANNOT_OPERATE_ON_REMOVED")
        || msg.includes("does not exist")
        || msg.includes("fetch failed")
        || msg.includes("ECONNRESET")
        || msg.includes("NOT_FOUND");
      if (!isIgnorable) throw removeErr;
    }

    // 2. Create new RSA — try REST first, fall back to protobuf client
    let createResult: unknown;
    try {
      createResult = await mutate(cid, loginId, devToken, accessToken, [
        {
          adGroupAdOperation: {
            create: {
              adGroup: adGroupResource,
              status: "ENABLED",
              ad: {
                finalUrls,
                responsiveSearchAd: { headlines, descriptions },
              },
            },
          },
        },
      ]);
    } catch (restErr) {
      const msg = restErr instanceof Error ? restErr.message : "";
      if (!msg.includes("fetch failed") && !msg.includes("ECONNRESET") && !msg.includes("timeout")) throw restErr;
      // REST fetch failed — fall back to protobuf client
      const customer = getCustomer();
      createResult = await (customer as unknown as { adGroupAds: { create: (ops: unknown[]) => Promise<unknown> } }).adGroupAds.create([
        {
          ad_group: adGroupResource,
          status: 2, // ENABLED
          ad: {
            final_urls: finalUrls,
            responsive_search_ad: {
              headlines: headlines.map((h) => ({ text: h.text })),
              descriptions: descriptions.map((d) => ({ text: d.text })),
            },
          },
        },
      ]);
    }

    return NextResponse.json({ success: true, result: createResult });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] ad update error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
