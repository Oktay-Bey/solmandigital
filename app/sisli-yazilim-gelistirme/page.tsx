import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { istanbulPages } from "@/lib/data/istanbul-pages"
import IstanbulLocalPage from "@/app/istanbul-local/IstanbulLocalPage"

const config = istanbulPages.find((p) => p.slug === "sisli-yazilim-gelistirme")!

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: config.keywords,
  alternates: { canonical: `${siteConfig.url}/${config.slug}` },
  openGraph: {
    title: config.title,
    description: config.metaDescription,
    url: `${siteConfig.url}/${config.slug}`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

export default function Page() {
  return <IstanbulLocalPage config={config} />
}
