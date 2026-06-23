import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { istanbulPages } from "@/lib/data/istanbul-pages"
import Reveal from "@/components/Reveal"

const PATH = "/istanbul-ilceleri"
const TITLE = "İstanbul İlçelerinde Web Tasarım & Yazılım Geliştirme"

export const metadata: Metadata = {
  title: "İstanbul İlçelerinde Web Tasarım & Yazılım | Solman Digital",
  description:
    "İstanbul'un tüm ilçelerinde web tasarım, e-ticaret ve yazılım geliştirme hizmeti. Bölgenizi seçin — Avrupa ve Anadolu yakası, yerinde uzman desteği.",
  alternates: { canonical: `${siteConfig.url}${PATH}` },
  openGraph: {
    title: TITLE,
    description:
      "İstanbul'un tüm ilçelerinde web tasarım, e-ticaret ve yazılım geliştirme. Bölgenizi seçin.",
    url: `${siteConfig.url}${PATH}`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

// District alanı olan (gerçek ilçe) sayfaları al; İstanbul geneli (district=null)
// sayfaları hub listesine değil, üstte "genel" bağlantı olarak ayrı koy.
const districtPages = istanbulPages.filter((p) => p.district !== null)
const generalPages = istanbulPages.filter((p) => p.district === null)

// Boğaz çizgisi ~29.0 boylam: doğusu Anadolu, batısı Avrupa yakası.
const avrupa = districtPages
  .filter((p) => p.geo.longitude < 29.0)
  .sort((a, b) => a.district!.localeCompare(b.district!, "tr"))
const anadolu = districtPages
  .filter((p) => p.geo.longitude >= 29.0)
  .sort((a, b) => a.district!.localeCompare(b.district!, "tr"))

function DistrictGrid({ pages }: { pages: typeof districtPages }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {pages.map((p) => (
        <Link
          key={p.slug}
          href={`/${p.slug}`}
          className="group flex items-center justify-between gap-2 rounded-[8px] border border-ink-200 bg-white px-4 py-3 text-[0.875rem] font-semibold text-ink-700 transition-colors hover:border-accent-700 hover:text-accent-700"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} className="text-ink-400 group-hover:text-accent-700" />
            {p.district}
          </span>
          <ArrowRight size={14} className="text-ink-300 group-hover:text-accent-700" />
        </Link>
      ))}
    </div>
  )
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: TITLE,
        url: `${siteConfig.url}${PATH}`,
        about: { "@id": `${siteConfig.url}/#localbusiness` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "İstanbul İlçeleri", item: `${siteConfig.url}${PATH}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-16 pt-24">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <MapPin size={14} color="#9b1c1c" />
            <p className="m-0 text-[0.7rem] font-bold uppercase tracking-wider text-accent-500">
              İstanbul · Tüm İlçeler
            </p>
          </div>
          <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-tight tracking-tight text-white">
            İstanbul İlçelerinde Web Tasarım ve Yazılım Geliştirme
          </h1>
          <p className="mx-auto max-w-[620px] text-[1.05rem] leading-relaxed text-ondark-muted">
            İstanbul&apos;un her ilçesindeki işletmelere web sitesi, e-ticaret ve özel
            yazılım geliştiriyoruz. Beşiktaş merkezli ofisimizden Avrupa ve Anadolu
            yakasının tamamına — şablonsuz geliştirme, doğrudan uzman erişimi.
          </p>
        </div>
      </section>

      {/* Giriş metni — SEO gövde içeriği */}
      <section className="bg-white px-6 pt-14">
        <div className="mx-auto max-w-[760px]">
          <p className="text-[0.975rem] leading-loose text-ink-600">
            Hangi ilçede olursanız olun, projenizi anlatan kişiyle değil yapan kişiyle
            çalışırsınız. Kurumsal tanıtım sitesinden e-ticaret mağazasına, restoran
            sipariş sisteminden SaaS platforma kadar her ihtiyaca, ilçenize özel
            değerlendirmeyle başlıyoruz. Aşağıdan bölgenizi seçerek o ilçeye özel
            hizmet detaylarını ve sık sorulan soruları görebilirsiniz.
          </p>
        </div>
      </section>

      {/* Avrupa Yakası */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-6 text-[clamp(1.25rem,2.5vw,1.6rem)] font-extrabold tracking-tight text-ink-900">
              Avrupa Yakası İlçeleri
            </h2>
            <DistrictGrid pages={avrupa} />
          </Reveal>
        </div>
      </section>

      {/* Anadolu Yakası */}
      <section className="bg-surface px-6 py-12">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-6 text-[clamp(1.25rem,2.5vw,1.6rem)] font-extrabold tracking-tight text-ink-900">
              Anadolu Yakası İlçeleri
            </h2>
            <DistrictGrid pages={anadolu} />
          </Reveal>
        </div>
      </section>

      {/* İstanbul Geneli sayfalar */}
      {generalPages.length > 0 && (
        <section className="bg-white px-6 py-12">
          <div className="mx-auto max-w-[760px]">
            <h2 className="mb-6 text-[clamp(1.25rem,2.5vw,1.6rem)] font-extrabold tracking-tight text-ink-900">
              İstanbul Geneli Hizmetler
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {generalPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-surface px-3.5 py-2 text-[0.825rem] font-semibold text-ink-700 transition-colors hover:border-accent-700 hover:text-accent-700"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-dark-500 px-6 py-14 text-center">
        <p className="mb-4 text-[0.95rem] text-ondark-muted">
          İlçenizi listede bulamadınız mı? Tüm İstanbul&apos;a hizmet veriyoruz.
        </p>
        <Link href="/iletisim" className="btn btn-primary !px-8">
          Projenizi Anlatalım <ArrowRight size={16} />
        </Link>
      </section>
    </>
  )
}
