const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";

interface GA4Event {
  name: string;
  params?: Record<string, string | number | boolean>;
}

export async function sendGA4Event(
  clientId: string,
  events: GA4Event[],
  sessionId?: string
): Promise<void> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) {
    console.warn("[GA4] GA4_MEASUREMENT_ID veya GA4_API_SECRET eksik.");
    return;
  }

  const url = `${GA4_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  const body = {
    client_id: clientId,
    ...(sessionId ? { session_id: sessionId } : {}),
    events: events.map((e) => ({
      name: e.name,
      params: {
        engagement_time_msec: 1,
        session_id: sessionId ?? clientId,
        ...e.params,
      },
    })),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("[GA4] Event gönderilemedi:", res.status);
    }
  } catch (err) {
    console.error("[GA4] Fetch hatası:", err);
  }
}

// Hazır event yardımcıları
export function trackLead(clientId: string, params: {
  form_type: string;  // "contact" | "whatsapp" | "audit" vb.
  page?: string;
  value?: number;
}) {
  return sendGA4Event(clientId, [{
    name: "generate_lead",
    params: { currency: "TRY", ...params },
  }]);
}

export function trackWhatsApp(clientId: string, page?: string) {
  return sendGA4Event(clientId, [{
    name: "whatsapp_click",
    params: { page: page ?? "unknown" },
  }]);
}

// Google Ads offline conversion upload — gclid varsa çağır
export async function uploadGoogleAdsConversion(params: {
  gclid: string;
  conversionValue?: number;
}): Promise<void> {
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  if (!conversionActionId || !customerId || !devToken) {
    console.warn("[AdsConversion] Env eksik, atlandı.");
    return;
  }

  const { google } = await import("googleapis");
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_ADS_CLIENT_ID,
    process.env.GOOGLE_ADS_CLIENT_SECRET,
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN });
  const { token } = await auth.getAccessToken();
  if (!token) return;

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const conversionDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}+03:00`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "developer-token": devToken,
    "Content-Type": "application/json",
  };
  if (loginCustomerId && loginCustomerId !== customerId) {
    headers["login-customer-id"] = loginCustomerId;
  }

  const res = await fetch(
    `https://googleads.googleapis.com/v19/customers/${customerId}:uploadClickConversions`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        conversions: [{
          gclid: params.gclid,
          conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
          conversionDateTime,
          conversionValue: params.conversionValue ?? 1,
          currencyCode: "TRY",
        }],
        partialFailure: false,
      }),
    }
  );

  if (!res.ok) {
    console.error("[AdsConversion] Hata:", await res.text());
  } else {
    console.log("[AdsConversion] Yüklendi:", params.gclid);
  }
}
