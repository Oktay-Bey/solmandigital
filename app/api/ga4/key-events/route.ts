import { NextResponse } from "next/server";
import { google } from "googleapis";

// READ-ONLY: GA4 property'sinde HANGİ event'lerin key event (conversion) olarak
// işaretli olduğunu doğrudan Admin API'den listeler. Data API sayı verir,
// yapılandırmayı (işaretli mi değil mi) sadece Admin API verir.
const PROPERTY_ID = "properties/539436083";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAuthClient(): any {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env tanımlı değil.");
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
}

export async function GET() {
  try {
    const auth = getAuthClient();
    const admin = google.analyticsadmin({ version: "v1beta", auth });

    const res = await admin.properties.keyEvents.list({
      parent: PROPERTY_ID,
      pageSize: 200,
    });

    const keyEvents = (res.data.keyEvents ?? []).map((k) => ({
      eventName: k.eventName,
      countingMethod: k.countingMethod,
      createTime: k.createTime,
      custom: k.custom,
      deletable: k.deletable,
    }));

    // Bizim funnel için beklenen event'ler — hangisi işaretli, hangisi eksik
    const expected = ["form_submit", "generate_lead", "whatsapp_click", "qualify_lead", "contact"];
    const markedNames = new Set(keyEvents.map((k) => k.eventName));
    const status = expected.map((name) => ({
      eventName: name,
      isKeyEvent: markedNames.has(name),
    }));

    return NextResponse.json({
      property: PROPERTY_ID,
      totalKeyEvents: keyEvents.length,
      keyEvents,
      funnelStatus: status,
      eksik: status.filter((s) => !s.isKeyEvent).map((s) => s.eventName),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[ga4 key-events] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
