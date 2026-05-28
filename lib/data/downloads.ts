export type Download = {
  slug: string
  title: string
  subtitle: string
  description: string
  coverPoints: string[]
  pdfUrl: string
  pageCount?: string
}

export const downloads: Download[] = [
  {
    slug: "e-ticaret-baslangic-rehberi",
    title: "E-Ticaret Başlangıç Rehberi 2025",
    subtitle: "Türkiye'de e-ticaret kurmanın 47 adımı",
    description:
      "Platform seçiminden ödeme entegrasyonuna, Trendyol'dan SEO stratejisine kadar kapsamlı rehber. İyzico başvuru süreci, teknik altyapı gereksinimleri ve ilk 90 günde trafik stratejisi dahil.",
    coverPoints: [
      "Platform karşılaştırması: Next.js vs WooCommerce vs Shopify",
      "İyzico başvuru süreci ve entegrasyon adımları",
      "Trendyol'a ek kanal olarak kendi mağazanızı açmak",
      "İlk 90 günde SEO ve ürün listeleme stratejisi",
      "Kargo, iade ve müşteri hizmetleri altyapısı",
    ],
    pdfUrl: process.env.ETICARET_PDF_URL || "",
    pageCount: "24",
  },
]

export function getDownloadBySlug(slug: string): Download | undefined {
  return downloads.find((d) => d.slug === slug)
}
