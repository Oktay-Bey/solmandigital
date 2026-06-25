// Canlı sohbet mesaj deposu — Upstash Redis (Vercel Marketplace).
// Serverless'ta in-memory state kalıcı değil → mesajlar burada tutulur.
// session → mesaj listesi. Telegram reply'i doğru ziyaretçiye buradan yönlenir.
import { Redis } from "@upstash/redis"

export type ChatRole = "visitor" | "agent"

export interface ChatMessage {
  id: string
  role: ChatRole
  text: string
  ts: number
}

// Vercel Upstash entegrasyonu env'leri KV_REST_API_* önekiyle ekler;
// elle kurulumda UPSTASH_REDIS_REST_* olabilir. İkisini de destekle.
let _redis: Redis | null = null
function redis(): Redis {
  if (_redis) return _redis
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    throw new Error("Upstash Redis env yok (KV_REST_API_URL / KV_REST_API_TOKEN)")
  }
  _redis = new Redis({ url, token })
  return _redis
}

const MSG_TTL = 60 * 60 * 24 * 2 // 2 gün — eski sohbetler kendiliğinden temizlenir
const msgKey = (session: string) => `chat:msgs:${session}`
const tgKey = (tgMsgId: number) => `chat:tg:${tgMsgId}` // telegram mesaj id → session

function genId(): string {
  return Math.random().toString(36).slice(2, 10)
}

// Ziyaretçi/agent mesajını session listesine ekle (sona).
export async function appendMessage(
  session: string,
  role: ChatRole,
  text: string
): Promise<ChatMessage> {
  const msg: ChatMessage = { id: genId(), role, text, ts: Date.now() }
  const key = msgKey(session)
  await redis().rpush(key, JSON.stringify(msg))
  await redis().expire(key, MSG_TTL)
  return msg
}

// Belirli index'ten SONRAKİ mesajları getir (poll için).
// since = ziyaretçinin elindeki son mesaj sayısı → yeni gelenleri döndürür.
export async function getMessagesSince(
  session: string,
  since: number
): Promise<{ messages: ChatMessage[]; total: number }> {
  const key = msgKey(session)
  const total = await redis().llen(key)
  if (since >= total) return { messages: [], total }
  // Upstash lrange JSON'u otomatik parse edebilir; tip güvenliği için normalize et.
  const raw = await redis().lrange<ChatMessage | string>(key, since, -1)
  const messages = raw.map((r) => (typeof r === "string" ? (JSON.parse(r) as ChatMessage) : r))
  return { messages, total }
}

// Telegram'a giden bildirim mesajının id'sini session'a bağla →
// sen o mesajı reply'lediğinde webhook session'ı bulur.
export async function linkTelegramMessage(tgMsgId: number, session: string): Promise<void> {
  await redis().set(tgKey(tgMsgId), session, { ex: MSG_TTL })
}

export async function resolveSessionFromTelegram(tgMsgId: number): Promise<string | null> {
  return redis().get<string>(tgKey(tgMsgId))
}
