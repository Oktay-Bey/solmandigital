"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface ChatMsg {
  id: string
  role: "visitor" | "agent"
  text: string
  ts: number
}

const SESSION_KEY = "solman_chat_session"
const POLL_MS = 3000

function getSession(): string {
  if (typeof window === "undefined") return ""
  let s = localStorage.getItem(SESSION_KEY)
  if (!s) {
    s = (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)).replace(/-/g, "").slice(0, 24)
    localStorage.setItem(SESSION_KEY, s)
  }
  return s
}

export default function LiveChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [opened, setOpened] = useState(false) // chat_open tek sefer ölç
  const [nudge, setNudge] = useState(false) // site geneli karşılama dürtmesi
  const [showLead, setShowLead] = useState(false) // iletişim bırakma alanı açık mı
  const [contact, setContact] = useState("")
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent">("idle")
  const sessionRef = useRef<string>("")
  const totalRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => { sessionRef.current = getSession() }, [])

  // Sayfa içindeki CTA'lar sohbeti açabilsin: window event ile tetiklenir.
  // (örn. AI landing'deki "Sohbette hemen sorun" butonu)
  useEffect(() => {
    const openHandler = () => {
      setOpen(true)
      setOpened((was) => {
        if (!was) trackEvent("chat_open", "engagement", "cta_trigger")
        return true
      })
    }
    window.addEventListener("solman:open-chat", openHandler)
    return () => window.removeEventListener("solman:open-chat", openHandler)
  }, [])

  // Site geneli teşvik: ilk ziyarette bir kez, 8sn sonra karşılama baloncuğu.
  // Popup değil — küçük, kapatılabilir, oturum başına tek. prefers-reduced yok sayılmaz.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem("solman_chat_nudged") === "1") return
    const t = setTimeout(() => {
      if (!open) {
        setNudge(true)
        sessionStorage.setItem("solman_chat_nudged", "1")
        trackEvent("chat_nudge_show", "engagement", "live_chat")
      }
    }, 8000)
    return () => clearTimeout(t)
  }, [open])

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    })
  }

  const poll = useCallback(async () => {
    const session = sessionRef.current
    if (!session) return
    try {
      const res = await fetch(`/api/chat/poll?session=${session}&since=${totalRef.current}`)
      if (!res.ok) return
      const data = (await res.json()) as { messages: ChatMsg[]; total: number }
      if (data.messages.length > 0) {
        totalRef.current = data.total
        setMessages((prev) => {
          // Optimistic (tmp-) ziyaretçi mesajlarını, KV'den dönen gerçek
          // karşılıklarıyla değiştir → çift görünmeyi önle. Eşleşme: aynı text.
          const incoming = data.messages
          const pending = prev.filter((m) => m.id.startsWith("tmp-"))
          const cleaned = prev.filter((m) => !m.id.startsWith("tmp-"))
          const remainingPending = pending.filter(
            (p) => !incoming.some((i) => i.role === "visitor" && i.text === p.text)
          )
          return [...cleaned, ...incoming, ...remainingPending]
        })
        scrollToBottom()
        if (data.messages.some((m) => m.role === "agent")) {
          trackEvent("chat_reply", "engagement", "live_chat")
        }
      }
    } catch { /* sessiz */ }
  }, [])

  // Açıkken poll döngüsü
  useEffect(() => {
    if (!open) {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
      return
    }
    poll()
    pollRef.current = setInterval(poll, POLL_MS)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [open, poll])

  const handleOpen = () => {
    setOpen(true)
    setNudge(false)
    if (!opened) {
      setOpened(true)
      trackEvent("chat_open", "engagement", "live_chat")
    }
  }

  const send = async () => {
    const text = input.trim()
    if (!text || sending) return
    setSending(true)
    const optimistic: ChatMsg = { id: "tmp-" + Date.now(), role: "visitor", text, ts: Date.now() }
    setMessages((prev) => [...prev, optimistic])
    setInput("")
    scrollToBottom()
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: sessionRef.current, text, page: window.location.pathname }),
      })
      if (res.ok) {
        trackEvent("chat_message", "engagement", "live_chat")
        poll() // hemen poll → gerçek mesaj gelsin, optimistic ile değişsin
      }
    } catch { /* optimistic kalır */ }
    setSending(false)
  }

  const toggleLead = () => {
    setShowLead((v) => {
      if (!v) trackEvent("chat_lead_prompt", "engagement", "live_chat")
      return !v
    })
  }

  const submitLead = async () => {
    const c = contact.trim()
    if (!c || leadState === "sending") return
    setLeadState("sending")
    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: sessionRef.current, contact: c, page: window.location.pathname }),
      })
      if (res.ok) {
        setLeadState("sent")
        setShowLead(false)
        trackEvent("chat_lead_submit", "lead", "live_chat")
        poll() // teyit mesajını çek
      } else {
        setLeadState("idle")
      }
    } catch {
      setLeadState("idle")
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Balon — WhatsApp float (bottom-90) altında, en alt köşe.
          Davet etiketi + canlı (yeşil) nokta ile dikkat çeker. */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-[46] flex items-end gap-2.5">
          {/* Site geneli karşılama dürtmesi — balonun üstünde, kapatılabilir */}
          {nudge && (
            <div className="absolute bottom-[64px] right-0 w-[240px] animate-[slideUp_0.3s_ease] rounded-xl border border-dark-50 bg-dark-400 p-3.5 shadow-card">
              <button
                onClick={(e) => { e.stopPropagation(); setNudge(false) }}
                aria-label="Kapat"
                className="absolute right-2 top-2 cursor-pointer border-none bg-transparent p-0.5 text-ink-500 hover:text-ondark"
              >
                <X size={14} />
              </button>
              <button onClick={handleOpen} className="block cursor-pointer border-none bg-transparent text-left">
                <p className="m-0 mb-1 text-[0.82rem] font-bold text-ondark">Bir sorunuz mu var? 👋</p>
                <p className="m-0 text-[0.76rem] leading-snug text-ondark-muted">
                  Proje, fiyat ya da AI otomasyon — hemen sorun, yanıtlayalım.
                </p>
              </button>
            </div>
          )}
          <button
            onClick={handleOpen}
            className="hidden animate-[slideUp_0.3s_ease] items-center gap-1.5 self-center rounded-full border border-dark-50 bg-dark-400 px-3.5 py-2 text-[0.78rem] font-semibold text-ondark shadow-card transition-colors hover:bg-dark-300 sm:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Çevrimiçiyiz · Hemen sorun
          </button>
          <button
            onClick={handleOpen}
            aria-label="Canlı sohbeti aç"
            className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full bg-accent-700 shadow-card transition-transform duration-150 hover:scale-110 hover:bg-accent-800"
          >
            <MessageSquare size={24} color="#ffffff" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-dark-400 bg-green-400" />
            </span>
          </button>
        </div>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[47] flex h-[480px] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-dark-50 bg-dark-400 shadow-card animate-[slideUp_0.25s_ease]">
          {/* Başlık */}
          <div className="flex items-center justify-between border-b border-dark-50 bg-dark-300 px-4 py-3">
            <div>
              <p className="m-0 text-[0.9rem] font-bold text-ondark">Solman Digital</p>
              <p className="m-0 flex items-center gap-1.5 text-[0.7rem] text-ondark-muted">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
                Çevrimiçi · Genelde birkaç dakikada yanıtlıyoruz
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="flex cursor-pointer items-center border-none bg-transparent p-1 text-ink-500 transition-colors hover:text-ondark"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mesajlar */}
          <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="rounded-lg bg-dark-300 px-3.5 py-3 text-[0.825rem] leading-relaxed text-ondark-muted">
                Merhaba 👋 Aklınızdaki soruyu yazın — projeniz, fiyat ya da AI otomasyon hakkında hızlıca yardımcı olalım.
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "visitor" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-[0.825rem] leading-relaxed ${
                    m.role === "visitor"
                      ? "bg-accent-700 text-white"
                      : "bg-dark-300 text-ondark"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

          </div>

          {/* Giriş + her zaman görünür iletişim bırakma */}
          <div className="border-t border-dark-50 bg-dark-300 px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Mesajınızı yazın…"
                className="input input-dark flex-1 text-[16px]"
                maxLength={2000}
              />
              <button
                onClick={send}
                disabled={sending || !input.trim()}
                aria-label="Gönder"
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md bg-accent-700 text-white transition-colors hover:bg-accent-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={17} />
              </button>
            </div>

            {/* İletişim bırakma — her zaman erişilebilir, anlık yanıt alamayan için */}
            {leadState === "sent" ? (
              <p className="m-0 mt-2.5 text-center text-[0.72rem] text-ondark-muted">
                ✓ İletişim bilginiz alındı, en kısa sürede döneceğiz.
              </p>
            ) : showLead ? (
              <div className="mt-2.5 flex items-center gap-2">
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") submitLead() }}
                  placeholder="E-posta veya telefon bırakın"
                  className="input input-dark flex-1 text-[16px]"
                  autoFocus
                />
                <button
                  onClick={submitLead}
                  disabled={leadState === "sending" || !contact.trim()}
                  className="shrink-0 whitespace-nowrap rounded-md bg-accent-700 px-3.5 py-2.5 text-[0.78rem] font-bold text-white transition-colors hover:bg-accent-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {leadState === "sending" ? "…" : "Gönder"}
                </button>
              </div>
            ) : (
              <button
                onClick={toggleLead}
                className="mt-2 w-full cursor-pointer border-none bg-transparent text-center text-[0.72rem] text-ondark-muted transition-colors hover:text-ondark"
              >
                Hemen dönüş için e-posta / telefon bırakın →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
