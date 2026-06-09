import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

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

// PUT /api/google-ads/ads/[adId]
// Body: { adGroupResource, finalUrls, headlines, descriptions }
// RSA güncellemesi için mevcut reklamı REMOVE edip yenisini oluşturur
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

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": devToken,
      "Content-Type": "application/json; charset=utf-8",
    };
    if (loginId && loginId !== cid) headers["login-customer-id"] = loginId;

    const adResource = `customers/${cid}/ads/${adId}`;
    const url = `https://googleads.googleapis.com/v23/customers/${cid}/googleAds:mutate`;

    // Mevcut ad'ı REMOVE et, yenisini CREATE et — RSA'lar update edilemiyor
    const body = JSON.stringify({
      mutateOperations: [
        {
          adGroupAdOperation: {
            remove: `customers/${cid}/adGroupAds/${adGroupResource.split("/")[3]}~${adId}`,
          },
        },
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
      ],
    });

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: new TextEncoder().encode(body),
    });
    const text = await res.text();
    if (!res.ok || text.trim().startsWith("<")) {
      throw new Error(`REST API error ${res.status}: ${text.slice(0, 1000)}`);
    }
    return NextResponse.json({ success: true, result: JSON.parse(text) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[google-ads] ad update error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
