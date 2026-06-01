import type { MetadataRoute } from "next"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"
import { rehberPosts } from "@/lib/data/rehber"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/hizmetler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/ai-otomasyon-hizmeti`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.92 },
    { url: `${base}/trendyol-entegrasyonu`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.90 },
    { url: `${base}/web-sitesi-yaptirmak`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.90 },
    { url: `${base}/saas-platform-gelistirme`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/istanbul-web-developer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/ucretsiz-analiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/danismanlik`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/indir/e-ticaret-baslangic-rehberi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.80 },
    { url: `${base}/portfoy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.60 },
  ]

  const servicePriorityMap: Record<1 | 2 | 3, number> = { 1: 0.90, 2: 0.80, 3: 0.70 }

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/hizmetler/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: servicePriorityMap[s.tier],
  }))

  const istanbulLocalPages: MetadataRoute.Sitemap = istanbulPages.map((p) => ({
    url: `${base}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p.sitemapPriority,
  }))

  const rehberIndexPage: MetadataRoute.Sitemap = [
    { url: `${base}/rehber`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  ]

  const rehberDetailPages: MetadataRoute.Sitemap = rehberPosts.map((p) => ({
    url: `${base}/rehber/${p.slug}`,
    lastModified: new Date(p.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }))

  return [...staticPages, ...servicePages, ...istanbulLocalPages, ...rehberIndexPage, ...rehberDetailPages]
}
