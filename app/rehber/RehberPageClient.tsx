"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Clock } from "lucide-react"
import type { RehberPost, RehberCategory } from "@/lib/data/rehber"

const CATEGORIES: { value: RehberCategory | "all"; label: string }[] = [
  { value: "all",               label: "Tümü" },
  { value: "trendyol",         label: "Trendyol" },
  { value: "e-ticaret",        label: "E-Ticaret" },
  { value: "web-sitesi",       label: "Web Sitesi" },
  { value: "saas",             label: "SaaS" },
  { value: "yapay-zeka",       label: "Yapay Zeka" },
  { value: "karsilastirma",    label: "Karşılaştırma" },
  { value: "dijital-pazarlama", label: "Dijital Pazarlama" },
]

export default function RehberPageClient({ posts }: { posts: RehberPost[] }) {
  const [active, setActive] = useState<RehberCategory | "all">("all")

  const filtered = active === "all"
    ? posts
    : posts.filter((p) => p.category === active)

  return (
    <>
      {/* ── Kategori filtreleri ─────────────────────────── */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Kategori filtresi">
        {CATEGORIES.map((cat) => {
          const count = cat.value === "all"
            ? posts.length
            : posts.filter((p) => p.category === cat.value).length
          if (count === 0) return null
          return (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              aria-pressed={active === cat.value}
              className={`rounded-full px-4 py-1.5 text-[0.78rem] font-semibold transition-colors ${
                active === cat.value
                  ? "bg-accent-700 text-white"
                  : "border border-ink-200 bg-white text-ink-600 hover:border-ink-400 hover:text-ink-900"
              }`}
            >
              {cat.label}
              <span className={`ml-1.5 text-[0.65rem] ${active === cat.value ? "opacity-80" : "text-ink-400"}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Makale listesi ──────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-[0.9rem] text-ink-400">Bu kategoride henüz rehber yok.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/rehber/${post.slug}`}>
              <div className="card-interactive flex items-center justify-between gap-6 rounded-[10px] border border-ink-200 bg-white px-8 py-7 transition-colors hover:border-ink-400">
                <div className="flex-1">
                  {post.category && (
                    <span className="mb-2 inline-block rounded bg-accent-50 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-accent-700">
                      {CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
                    </span>
                  )}
                  <h2 className="mb-2 text-base font-bold leading-tight tracking-tight text-ink-900">
                    {post.title}
                  </h2>
                  <p className="mb-3 text-[0.85rem] leading-relaxed text-ink-500">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-ink-400" />
                    <span className="text-[0.75rem] text-ink-400">{post.readTime} dakika okuma</span>
                  </div>
                </div>
                <ArrowRight size={18} className="shrink-0 text-accent-700" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
