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
// sessionId geçilirse event GA4'te mevcut oturuma bağlanır → source/medium doğru atfedilir.
export function trackLead(clientId: string, params: {
  form_type: string;  // "contact" | "whatsapp" | "audit" vb.
  page?: string;
  value?: number;
}, sessionId?: string) {
  return sendGA4Event(clientId, [{
    name: "generate_lead",
    params: { currency: "TRY", ...params },
  }], sessionId);
}

export function trackWhatsApp(clientId: string, page?: string) {
  return sendGA4Event(clientId, [{
    name: "whatsapp_click",
    params: { page: page ?? "unknown" },
  }]);
}

// Google Ads offline conversion upload — gclid varsa çağır.
// google-ads-api paketi (v23) üzerinden gider — elle v19 REST çağrısı 404 veriyordu;
// paket sürümüyle senkron kalsın diye conversionUploads service'i kullanılır.
export async function uploadGoogleAdsConversion(params: {
  gclid: string;
  conversionValue?: number;
}): Promise<void> {
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;

  if (!conversionActionId || !customerId) {
    console.warn("[AdsConversion] Env eksik (action ID / customer ID), atlandı.");
    return;
  }

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const conversionDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}+03:00`;

  try {
    const { getCustomer } = await import("@/lib/google-ads/client");
    const customer = getCustomer();
    // Request tipi generated proto (validate_only/toJSON içerir); diğer route'lardaki
    // gibi gevşek obje gönderip cast'liyoruz — runtime paket bu alanları doldurur.
    const response = await customer.conversionUploads.uploadClickConversions({
      customer_id: customerId,
      conversions: [{
        gclid: params.gclid,
        conversion_action: `customers/${customerId}/conversionActions/${conversionActionId}`,
        conversion_date_time: conversionDateTime,
        conversion_value: params.conversionValue ?? 1,
        currency_code: "TRY",
      }],
      partial_failure: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    const partialErr = (response as { partial_failure_error?: unknown }).partial_failure_error;
    if (partialErr) {
      console.error("[AdsConversion] partial failure:", JSON.stringify(partialErr));
    } else {
      console.log("[AdsConversion] Yüklendi:", params.gclid);
    }
  } catch (err) {
    console.error("[AdsConversion] Hata:", err instanceof Error ? err.message : err);
  }
}
