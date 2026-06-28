import { NextResponse } from "next/server";
import { google } from "googleapis";

// READ-ONLY: GA4 property'sinde HANGİ event'lerin key event (conversion) olarak
// işaretli olduğunu doğrudan Admin API'den listeler. Data API sayı verir,
// yapılandırmayı (işaretli mi değil mi) sadece Admin API verir.
const PROPERTY_ID = "properties/539436083";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAuthClient(readonly = true): any {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env tanımlı değil.");
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    // POST (key event oluşturma) için "edit" scope'u şart; readonly yetmez.
    scopes: [
      readonly
        ? "https://www.googleapis.com/auth/analytics.readonly"
        : "https://www.googleapis.com/auth/analytics.edit",
    ],
  });
}

// POST /api/ga4/key-events — bir event'i key event (conversion) olarak işaretle.
// Body: { eventName: string, countingMethod?: "ONCE_PER_EVENT" | "ONCE_PER_SESSION" }
// Idempotent: event zaten key event ise hata vermez, mevcut halini döner.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      eventName?: string;
      countingMethod?: "ONCE_PER_EVENT" | "ONCE_PER_SESSION";
    };
    const eventName = String(body.eventName ?? "").trim();
    if (!eventName) {
      return NextResponse.json({ error: "Body: { eventName } gerekli." }, { status: 400 });
    }
    const countingMethod = body.countingMethod ?? "ONCE_PER_SESSION";

    const auth = getAuthClient(false); // edit scope
    const admin = google.analyticsadmin({ version: "v1beta", auth });

    // Zaten key event mi? (idempotent — tekrar oluşturmaya çalışma)
    const existing = await admin.properties.keyEvents.list({ parent: PROPERTY_ID, pageSize: 200 });
    const already = (existing.data.keyEvents ?? []).find((k) => k.eventName === eventName);
    if (already) {
      return NextResponse.json({ ok: true, alreadyKeyEvent: true, keyEvent: already });
    }

    const res = await admin.properties.keyEvents.create({
      parent: PROPERTY_ID,
      requestBody: { eventName, countingMethod },
    });
    return NextResponse.json({ ok: true, created: true, keyEvent: res.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[ga4 key-events POST] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
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
