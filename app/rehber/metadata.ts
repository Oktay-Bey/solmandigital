import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `Yazılım & Dijital Rehberler | ${siteConfig.name}`,
  description:
    "Trendyol entegrasyonu, AI otomasyon, SaaS geliştirme ve web sitesi fiyatları hakkında gerçek proje deneyimiyle hazırlanmış rehberler.",
  keywords: [
    "yazılım rehberi",
    "web sitesi fiyatları 2026",
    "trendyol entegrasyonu rehber",
    "saas mvp süreci",
    "ai içerik otomasyonu nedir",
    "e-ticaret kurulum rehber",
    "next.js wordpress karşılaştırma",
    "iyzico entegrasyonu",
    "hepsiburada api entegrasyonu",
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
