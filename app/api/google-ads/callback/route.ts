import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

// OAuth2 callback — /api/google-ads/auth onayından sonra Google buraya `?code=...` ile döner.
// Code'u refresh_token ile değiştirip ekranda gösterir; kullanıcı bunu GOOGLE_ADS_REFRESH_TOKEN
// olarak .env.local + Vercel env'e koyar. (Lokal, tek seferlik akış — redirect URI localhost.)
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.json({ error: `Google onay reddedildi: ${error}` }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json(
      { error: "code parametresi yok. Akışı /api/google-ads/auth üzerinden başlatın." },
      { status: 400 }
    );
  }

  const client = new OAuth2Client(
    process.env.GOOGLE_ADS_CLIENT_ID!,
    process.env.GOOGLE_ADS_CLIENT_SECRET!,
    process.env.GOOGLE_ADS_REDIRECT_URI!
  );

  try {
    const { tokens } = await client.getToken(code);
    const refresh = tokens.refresh_token;

    if (!refresh) {
      return NextResponse.json(
        {
          error:
            "refresh_token dönmedi. Google hesabında uygulamanın önceki izni varsa refresh_token gelmez — " +
            "https://myaccount.google.com/permissions üzerinden erişimi kaldırıp /api/google-ads/auth ile tekrar deneyin (prompt=consent zaten ayarlı).",
        },
        { status: 200 }
      );
    }

    const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Google Ads OAuth</title></head>
<body style="font-family:ui-monospace,monospace;max-width:760px;margin:40px auto;padding:0 20px;line-height:1.7;color:#111">
  <h2>✅ Google Ads yetkilendirme başarılı</h2>
  <p>Aşağıdaki değeri <b>GOOGLE_ADS_REFRESH_TOKEN</b> olarak hem <code>.env.local</code> dosyasına
  hem de Vercel proje env'ine koyun, sonra Vercel'i redeploy edin:</p>
  <pre style="background:#f4f4f5;border:1px solid #e4e4e7;border-radius:8px;padding:16px;white-space:pre-wrap;word-break:break-all;font-size:13px">${refresh}</pre>
  <p style="color:#71717a;font-size:13px">Bu token gizlidir — yalnızca siz görüyorsunuz. Kaydettikten sonra bu sekmeyi kapatın.</p>
</body></html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Token değişimi başarısız.", detail: String(e) },
      { status: 500 }
    );
  }
}
