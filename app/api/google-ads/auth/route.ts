import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

function getAuthUrl(): string {
  const client = new OAuth2Client(
    process.env.GOOGLE_ADS_CLIENT_ID!,
    process.env.GOOGLE_ADS_CLIENT_SECRET!,
    process.env.GOOGLE_ADS_REDIRECT_URI!
  );
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/adwords"],
  });
}

// GET /api/google-ads/auth → OAuth2 yetkilendirme URL'sine yönlendir
export async function GET() {
  try {
    const url = getAuthUrl();
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.json(
      { error: "OAuth URL oluşturulamadı. GOOGLE_ADS_* env değişkenlerini kontrol edin." },
      { status: 500 }
    );
  }
}
