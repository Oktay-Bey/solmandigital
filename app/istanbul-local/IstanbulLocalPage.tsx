import Link from "next/link"
import { ArrowRight, CheckCircle, X, MapPin, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import WhatsAppLink from "@/components/WhatsAppLink"
import RelatedGuides from "@/components/RelatedGuides"
import { services } from "@/lib/data/services"
import { istanbulPages, type IstanbulPage } from "@/lib/data/istanbul-pages"
import IstanbulLocalLeadForm from "./IstanbulLocalLeadForm"

// Coğrafi yakınlığa göre diğer ilçe sayfalarını seç → izole sayfaları birbirine
// bağlayan internal linking (link-equity dağıtımı, derin sıralamadan çıkış için).
// İlçesi olmayan İstanbul geneli sayfalar (district === null) komşu olarak alınmaz.
function nearbyDistricts(current: IstanbulPage, count = 6): IstanbulPage[] {
  const others = istanbulPages.filter(
    (p) => p.slug !== current.slug && p.district !== null
  )
  return others
    .map((p) => {
      const dLat = p.geo.latitude - current.geo.latitude
      const dLng = p.geo.longitude - current.geo.longitude
      return { page: p, dist: dLat * dLat + dLng * dLng }
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, count)
    .map((x) => x.page)
}

const comparisonRows = [
  {
    feature: "İletişim",
    agency: "Proje yöneticisi üzerinden",
    freelancer: "Doğrudan ama yanıtsız kalabilir",
    us: "Doğrudan uzman, WhatsApp",
  },
  {
    feature: "Fiyat",
    agency: "Yüksek overhead maliyeti",
    freelancer: "Düşük ama belirsiz",
    us: "Sabit fiyat garantisi",
  },
  {
    feature: "Takvim",
    agency: "Kaynak çakışması olabilir",
    freelancer: "Başka işe girebilir",
    us: "Net teslim tarihi, yazılı taahhüt",
  },
  {
    feature: "Yasal güvence",
    agency: "Var (sözleşme)",
    freelancer: "Sınırlı",
    us: "Var (sözleşme + e-fatura)",
  },
]

type Props = {
  config: IstanbulPage
}

export default function IstanbulLocalPage({ config }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${config.schemaServiceType} — ${config.title}`,
        description: config.metaDescription,
        url: `${siteConfig.url}/${config.slug}`,
        provider: { "@id": `${siteConfig.url}/#localbusiness` },
        areaServed: config.areaServed.map((name) => ({ "@type": "City", name })),
        serviceType: config.schemaServiceType,
      },
      {
        "@type": "FAQPage",
        mainEntity: config.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: config.title, item: `${siteConfig.url}/${config.slug}` },
        ],
      },
    ],
  }

  const featuredServices = services.filter((s) => config.featuredServiceSlugs.includes(s.slug))
  const locationLabel = config.district ?? "İstanbul"
  const nearby = nearbyDistricts(config)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dark-500 px-6 pb-20 pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 opacity-50 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(155,28,28,0.30) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[760px] text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <MapPin size={14} color="#9b1c1c" />
            <p className="m-0 text-[0.7rem] font-bold uppercase tracking-wider text-accent-500">
              {config.heroLabel}
            </p>
          </div>
          <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-tight tracking-tight text-white">
            {config.heroH1}
          </h1>
          <p className="mx-auto mb-10 max-w-[580px] text-[1.05rem] leading-relaxed text-ondark-muted">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href="#form" className="btn btn-primary !px-8">
              İletişime Geç <ArrowRight size={16} />
            </a>
            <WhatsAppLink
              message={`Merhaba, ${config.district ?? "İstanbul"} için proje hakkında bilgi almak istiyorum.`}
              source="istanbul_local_hero"
              className="btn btn-outline-dark"
            >
              <MessageCircle size={15} /> WhatsApp ile Yazın
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* Fiyat Bant */}
      {featuredServices.some((s) => s.startingPrice) && (
        <section className="border-b border-ink-200 bg-white px-6 py-8">
          <div className="mx-auto max-w-[900px]">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="shrink-0 text-[0.7rem] font-bold uppercase tracking-wider text-ink-400">
                Başlangıç Fiyatları
              </p>
              <div className="flex flex-wrap gap-4">
                {featuredServices
                  .filter((s) => s.startingPrice)
                  .map((s) => (
                    <div key={s.slug} className="flex items-baseline gap-1.5">
                      <span className="text-[0.8rem] font-semibold text-ink-900">{s.startingPrice}</span>
                      <span className="text-[0.75rem] text-ink-400">— {s.title.split(" ").slice(0, 3).join(" ")}</span>
                    </div>
                  ))}
              </div>
              <a href="#form" className="ml-auto shrink-0 text-[0.8rem] font-semibold text-accent-700 underline underline-offset-2">
                Teklif Al →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Unique Section */}
      <section className="bg-white px-6 pt-14">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-4 text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold tracking-tight text-ink-900">
            {config.uniqueSection.heading}
          </h2>
          <p className="text-[0.975rem] leading-loose text-ink-600">
            {config.uniqueSection.body}
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink-900">
            Neden Ne Ajans, Ne Freelancer?
          </h2>
          <div className="overflow-hidden rounded-[10px] border border-ink-200 shadow-card">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1.25fr] gap-4 bg-dark-500 px-5 py-3.5">
              {["Kriter", "Ajans", "Freelancer", "Solman Digital"].map((h, i) => (
                <span key={h} className={`text-[0.7rem] font-bold uppercase ${i === 3 ? "text-accent-500" : "text-ondark-muted"}`}>
                  {h}
                </span>
              ))}
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1.5fr_1fr_1fr_1.25fr] items-start gap-4 px-5 py-4 ${
                  i > 0 ? "border-t border-ink-200" : ""
                }`}
              >
                <span className="text-[0.875rem] font-semibold text-ink-900">{row.feature}</span>
                <div className="flex items-start gap-1.5">
                  <X size={13} color="#aaaaaa" className="mt-0.5 shrink-0" />
                  <span className="text-[0.8rem] text-ink-400">{row.agency}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <X size={13} color="#aaaaaa" className="mt-0.5 shrink-0" />
                  <span className="text-[0.8rem] text-ink-400">{row.freelancer}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle size={13} color="#16a34a" className="mt-0.5 shrink-0" />
                  <span className="text-[0.8rem] font-semibold text-ink-700">{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink-900">
            {locationLabel} İşletmeleri İçin Öne Çıkan Hizmetler
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {featuredServices.map((service) => (
              <Link key={service.slug} href={`/hizmetler/${service.slug}`} className="group">
                <div className="card card-interactive flex h-full flex-col gap-2 p-6 group-hover:border-accent-700">
                  <p className="m-0 text-[0.95rem] font-bold text-ink-900">{service.title}</p>
                  <p className="m-0 text-[0.8rem] leading-relaxed text-ink-500">{service.shortDesc}</p>
                  <p className="m-0 mt-auto flex items-center gap-1.5 text-[0.8rem] font-semibold text-accent-700">
                    İncele <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Trust Signals */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink-900">
            Nasıl Çalışıyoruz?
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                icon: "📍",
                title: `${locationLabel}'da Yüz Yüze`,
                desc: `${locationLabel} ve çevresinde yüz yüze görüşme organize edebiliyoruz. Proje başlangıcında ya da teslimat aşamasında şahsen görüşmeyi tercih ediyoruz.`,
              },
              {
                icon: "💬",
                title: "WhatsApp İletişim",
                desc: "Hızlı güncelleme ve sorular için WhatsApp. E-posta için de dönüş yapıyoruz, ama mesajlaşma daha hızlı.",
              },
              {
                icon: "🧾",
                title: "E-Fatura / E-Arşiv",
                desc: "Şirketlere e-fatura, bireysel müşterilere e-arşiv fatura. Yasal güvence her iki taraf için de önemli.",
              },
              {
                icon: "📋",
                title: "Yazılı Sözleşme",
                desc: "Kapsam, fiyat ve takvim her projede sözleşmeye bağlanır. Sürpriz yok.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-5">
                <span className="shrink-0 text-[1.25rem]">{item.icon}</span>
                <div>
                  <p className="m-0 mb-1 text-[0.95rem] font-bold text-ink-900">{item.title}</p>
                  <p className="m-0 text-[0.875rem] leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="bg-surface px-6 py-14 text-center">
        <p className="mb-4 text-[0.9rem] text-ink-500">
          Geçmiş projelerimize göz atın.
        </p>
        <Link href="/portfoy" className="btn btn-outline">
          Portföyü Gör <ArrowRight size={15} />
        </Link>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink-900">
            Sık Sorulan Sorular
          </h2>
          <div className="flex flex-col gap-6">
            {config.faq.map((item) => (
              <div key={item.q} className="border-b border-ink-200 pb-6">
                <h3 className="m-0 mb-2 text-[0.95rem] font-bold text-ink-900">{item.q}</h3>
                <p className="m-0 text-[0.875rem] leading-relaxed text-ink-500">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diğer İlçeler — internal linking (yakındaki ilçe sayfaları) */}
      {nearby.length > 0 && (
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-[760px]">
            <h2 className="mb-2 text-[clamp(1.25rem,2.5vw,1.5rem)] font-extrabold tracking-tight text-ink-900">
              İstanbul&apos;un Diğer İlçelerinde de Hizmet Veriyoruz
            </h2>
            <p className="mb-6 text-[0.875rem] leading-relaxed text-ink-500">
              {locationLabel} dışında, çevre ilçelerdeki işletmelere de aynı hizmeti
              sağlıyoruz. Bölgenizi seçin:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {nearby.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-surface px-3.5 py-2 text-[0.825rem] font-semibold text-ink-700 transition-colors hover:border-accent-700 hover:text-accent-700"
                >
                  <MapPin size={13} />
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form */}
      <section id="form" className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[600px]">
          <p className="eyebrow mb-3">İletişim</p>
          <h2 className="mb-3 text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold tracking-tight text-ink-900">
            Projeyi Anlatalım
          </h2>
          <p className="mb-8 text-[0.9rem] leading-relaxed text-ink-500">
            Projenizi kısaca paylaşın. 24 saat içinde, tercihinize göre Zoom veya yüz yüze görüşme için size ulaşalım.
          </p>
          <div className="card p-10">
            <IstanbulLocalLeadForm district={config.district} />
          </div>
        </div>
      </section>

      <RelatedGuides category={["web-sitesi", "karsilastirma"]} title="Karar Vermeden Önce Rehberler" />

      {/* Services CTA */}
      <section className="bg-dark-500 px-6 py-12 text-center">
        <p className="mb-4 text-[0.9rem] text-ondark-muted">
          Sunduğumuz hizmetlerin tamamına göz atmak ister misiniz?
        </p>
        <Link href="/hizmetler" className="btn btn-outline-dark">
          Tüm Hizmetler <ArrowRight size={15} />
        </Link>
      </section>
    </>
  )
}
