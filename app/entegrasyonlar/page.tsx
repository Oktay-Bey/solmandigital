import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, Tag } from "lucide-react"
import * as Icons from "lucide-react"
import { integrations } from "@/lib/data/integrations"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Pazaryeri Entegrasyonları — Hazır Çözüm Kataloğu | Solman Digital",
  description:
    "Trendyol, Hepsiburada ve WooCommerce için sabit fiyatlı, kapsamı belli pazaryeri entegrasyon çözümleri. Stok senkronizasyonu, sipariş aktarımı, fiyat güncelleme.",
  keywords: [
    "pazaryeri entegrasyonu",
    "trendyol entegrasyonu",
    "hepsiburada entegrasyonu",
    "woocommerce entegrasyonu",
    "stok senkronizasyonu",
    "çoklu pazaryeri yönetimi",
    "e-ticaret entegrasyon hizmeti",
  ],
  alternates: { canonical: `${siteConfig.url}/entegrasyonlar` },
  openGraph: {
    title: "Pazaryeri Entegrasyonları | Solman Digital",
    description:
      "Sabit fiyatlı, kapsamı belli pazaryeri entegrasyon çözümleri. Trendyol, Hepsiburada, WooCommerce.",
    url: `${siteConfig.url}/entegrasyonlar`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Solman Digital Pazaryeri Entegrasyonları",
  numberOfItems: integrations.length,
  itemListElement: integrations.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    url: `${siteConfig.url}/entegrasyonlar/${p.slug}`,
  })),
}

const CATEGORY_ORDER = ["Stok & Sipariş", "Fiyatlama", "Ürün Aktarımı", "Özel Site"] as const

export default function EntegrasyonlarPage() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: integrations.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-18 pt-20">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <p className="mb-6 inline-block rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
              Pazaryeri Entegrasyonları
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              Hangi Entegrasyona İhtiyacınız Var?
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-8 max-w-[600px] text-[1.05rem] leading-[1.75] text-ondark-muted">
              Her çözüm sabit fiyatlı, kapsamı belli ve teslim süresi nettir. Genel &quot;teklif al&quot; değil; tam olarak ne aldığınızı baştan bilirsiniz.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a href="#katalog" className="btn btn-primary">
              Kataloğu Gör <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Katalog */}
      <section id="katalog" className="bg-white px-6 py-18">
        <div className="mx-auto max-w-[1100px]">
          {byCategory.map((group, gi) => (
            <div key={group.category} className={gi > 0 ? "mt-14" : ""}>
              <Reveal>
                <h2 className="mb-6 text-[1.25rem] font-extrabold tracking-tight text-ink-900">
                  {group.category}
                </h2>
              </Reveal>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
                {group.items.map((p, i) => {
                  const Icon = (
                    Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>
                  )[p.icon]
                  return (
                    <Reveal key={p.slug} delay={i * 60}>
                      <Link
                        href={`/entegrasyonlar/${p.slug}`}
                        className="group flex h-full flex-col rounded-[12px] border border-ink-200 bg-surface p-7 transition-colors hover:border-accent-300 hover:bg-accent-50"
                      >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] border border-ink-200 bg-white text-accent-700">
                          {Icon && <Icon size={18} />}
                        </div>
                        <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-wider text-ink-400">
                          {p.source} → {p.target}
                        </p>
                        <h3 className="mb-2 text-[1.02rem] font-bold leading-snug text-ink-900 group-hover:text-accent-700">
                          {p.title}
                        </h3>
                        <p className="mb-5 text-[0.85rem] leading-[1.6] text-ink-500">{p.shortDesc}</p>
                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.78rem] text-ink-500">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-ink-700">
                            <Tag size={13} /> {p.priceLabel}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={13} /> {p.deliveryDays}
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Özel ihtiyaç köprüsü */}
      <section className="border-t border-ink-200 bg-surface px-6 py-16 text-center">
        <div className="mx-auto max-w-[640px]">
          <Reveal>
            <h2 className="mb-4 text-[1.375rem] font-extrabold tracking-tight text-ink-900">
              Aradığınız tam olarak listede yok mu?
            </h2>
            <p className="mb-8 text-[0.9rem] leading-relaxed text-ink-500">
              Farklı pazaryeri, özel altyapı ya da kapsam dışı bir akış için projeye özel entegrasyon geliştiriyoruz. Mevcut sisteminizi anlatın, size uygun çözümü birlikte belirleyelim.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/trendyol-entegrasyonu" className="btn btn-outline">
                Genel Entegrasyon Sayfası
              </Link>
              <Link href="/iletisim" className="btn btn-primary">
                İletişime Geç <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
