import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { rehberPosts } from "@/lib/data/rehber"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: `Yazılım & Dijital Rehberler | ${siteConfig.name}`,
  description:
    "Trendyol entegrasyonu, AI otomasyon, SaaS geliştirme ve web sitesi fiyatları hakkında gerçek proje deneyimiyle hazırlanmış rehberler.",
  keywords: [
    "yazılım rehberi",
    "web sitesi fiyatları 2025",
    "trendyol entegrasyonu rehber",
    "saas mvp süreci",
    "ai içerik otomasyonu nedir",
    "e-ticaret kurulum rehber",
    "next.js wordpress karşılaştırma",
    "iyzico entegrasyonu",
  ],
  alternates: { canonical: `${siteConfig.url}/rehber` },
  openGraph: {
    title: `Yazılım & Dijital Rehberler | ${siteConfig.name}`,
    description:
      "Trendyol entegrasyonu, AI otomasyon, SaaS MVP ve web sitesi fiyatları — gerçek proje deneyimiyle hazırlanmış rehberler.",
    url: `${siteConfig.url}/rehber`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

export default function RehberPage() {
  return (
    <section className="min-h-[60vh] bg-white px-6 py-20">
      <div className="mx-auto max-w-[860px]">
        <Reveal delay={0}>
          <p className="eyebrow mb-3.5">Rehberler</p>
          <h1 className="mb-4 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink-900">
            Yazılım &amp; Dijital Rehberler
          </h1>
          <p className="mb-14 max-w-[560px] text-[0.95rem] leading-[1.75] text-ink-500">
            Trendyol entegrasyonu, AI otomasyon, SaaS MVP süreci ve web sitesi fiyatları hakkında gerçek proje deneyimiyle hazırlanmış kaynaklar.
          </p>
        </Reveal>

        <div className="flex flex-col gap-5">
          {rehberPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 50}>
              <Link href={`/rehber/${post.slug}`}>
                <div className="card-interactive flex items-center justify-between gap-6 rounded-[10px] border border-ink-200 bg-white px-8 py-7 transition-colors hover:border-ink-400">
                  <div className="flex-1">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
