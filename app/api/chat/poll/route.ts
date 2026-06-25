import { NextRequest, NextResponse } from "next/server"
import { getMessagesSince } from "@/lib/chat-store"

// Ziyaretçi tarayıcısı her birkaç saniyede bunu çağırır → elindeki son
// mesaj sayısından (since) sonraki yeni mesajları alır (agent cevabı dahil).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const session = (searchParams.get("session") ?? "").trim()
  const since = parseInt(searchParams.get("since") ?? "0", 10) || 0

  if (!session || !/^[a-z0-9-]{6,40}$/i.test(session)) {
    return NextResponse.json({ error: "Geçersiz oturum." }, { status: 400 })
  }

  try {
    const { messages, total } = await getMessagesSince(session, since)
    return NextResponse.json({ messages, total })
  } catch (err) {
    console.error("[chat/poll]", err)
    return NextResponse.json({ error: "Mesajlar alınamadı." }, { status: 500 })
  }
}
