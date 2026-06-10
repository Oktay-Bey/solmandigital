import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { istanbulPages } from "@/lib/data/istanbul-pages"
import IstanbulLocalPage from "@/app/istanbul-local/IstanbulLocalPage"

const config = istanbulPages.find((p) => p.slug === "istanbul-e-ticaret-yazilim")!

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
  return (
    <>
      <IstanbulLocalPage config={config} />

      {/* TicaretHub — E-Ticaret Araçları Cross-Promo */}
      <section className="border-t border-ink-200 bg-surface px-6 py-12">
        <div className="mx-auto max-w-[760px]">
          <p className="eyebrow mb-3">Ücretsiz E-Ticaret Araçları</p>
          <p className="mb-3 text-[1rem] font-extrabold tracking-[-0.02em] text-ink-900">
            Yazılım öncesi rakamlarınızı netleştirin
          </p>
          <p className="mb-6 max-w-[500px] text-[0.875rem] leading-[1.7] text-ink-500">
            Trendyol, Hepsiburada veya çok kanallı satış yapıyorsanız,{" "}
            <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-700 hover:underline">TicaretHub</a>
            &apos;un ücretsiz hesaplama araçlarıyla komisyon, kâr ve entegrasyon maliyetlerinizi hesaplayabilirsiniz.
          </p>
          <div className="flex flex-wrap gap-2">
            <a href="https://ticarethub.com/trendyol-komisyon-hesaplama" target="_blank" rel="noopener noreferrer"
              className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700">
              Komisyon Hesapla →
            </a>
            <a href="https://ticarethub.com/pazaryeri-komisyon-karsilastirma" target="_blank" rel="noopener noreferrer"
              className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700">
              Pazaryeri Karşılaştır →
            </a>
            <a href="https://ticarethub.com/trendyol-entegrasyonu" target="_blank" rel="noopener noreferrer"
              className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700">
              Entegrasyon Araçları →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
