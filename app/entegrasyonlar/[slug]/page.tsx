import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowRight as ArrowIcon, CheckCircle, X, ChevronRight, Clock, Tag } from "lucide-react"
import * as Icons from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { integrations, getIntegrationBySlug, getRelatedIntegrations } from "@/lib/data/integrations"
import TrendyolLeadForm from "@/app/trendyol-entegrasyonu/TrendyolLeadForm"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"

export const dynamicParams = false

export function generateStaticParams() {
  return integrations.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getIntegrationBySlug(slug)
  if (!product) return {}

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: { canonical: `${siteConfig.url}/entegrasyonlar/${slug}` },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `${siteConfig.url}/entegrasyonlar/${slug}`,
      siteName: siteConfig.name,
      locale: "tr_TR",
      type: "website",
    },
  }
}

export default async function EntegrasyonDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getIntegrationBySlug(slug)
  if (!product) notFound()

  const related = getRelatedIntegrations(slug)
  const IconComponent = (
    Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>
  )[product.icon]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: product.title,
        description: product.shortDesc,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: { "@type": "Country", name: "Turkey" },
        serviceType: "Pazaryeri Entegrasyonu",
        url: `${siteConfig.url}/entegrasyonlar/${slug}`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "TRY",
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/entegrasyonlar/${slug}`,
          seller: { "@type": "Organization", name: siteConfig.name },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: product.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Entegrasyonlar", item: `${siteConfig.url}/entegrasyonlar` },
          { "@type": "ListItem", position: 3, name: product.title, item: `${siteConfig.url}/entegrasyonlar/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="border-b border-ink-200 bg-surface px-6 py-3">
        <div className="mx-auto flex max-w-[1200px] items-center gap-1.5 text-[0.75rem] text-ink-400">
          <Link href="/" className="transition-colors hover:text-ink-700">Ana Sayfa</Link>
          <ChevronRight size={13} />
          <Link href="/entegrasyonlar" className="transition-colors hover:text-ink-700">Entegrasyonlar</Link>
          <ChevronRight size={13} />
          <span className="font-semibold text-ink-900">{product.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-20 pt-20">
        <div className="mx-auto max-w-[820px] text-center">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
              {IconComponent && <IconComponent size={14} />}
              {product.source} <span className="text-ondark-faint">→</span> {product.target}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.6rem,4.5vw,2.6rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              {product.title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-8 max-w-[620px] text-[1.02rem] leading-[1.75] text-ondark-muted">
              {product.shortDesc}
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mb-9 flex flex-wrap items-center justify-center gap-3 text-[0.82rem] text-ondark-faint">
              <span className="inline-flex items-center gap-1.5">
                <Tag size={14} /> {product.priceLabel}
              </span>
              <span className="text-ondark-faint/40">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} /> {product.deliveryDays} teslim
              </span>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="#form" className="btn btn-primary">
                Teklif Al <ArrowRight size={16} />
              </a>
              <WhatsAppLink
                source={`entegrasyon_${product.slug}`}
                className="btn btn-outline-dark"
              >
                WhatsApp ile Yazın
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Açıklama */}
      <section className="bg-white px-6 py-18">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <blockquote className="mx-0 mb-8 border-l-[3px] border-accent-700 pl-5">
              <p className="text-base font-medium leading-relaxed text-ink-700">{product.aeoSummary}</p>
            </blockquote>
          </Reveal>
          {product.longDesc.split("\n\n").map((para, i) => (
            <Reveal key={i} delay={i * 50}>
              <p className="mb-4 text-[0.925rem] leading-loose text-ink-600">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Kapsam: dahil / dahil değil */}
      <section className="bg-surface px-6 py-18">
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <h2 className="mb-5 text-[1.05rem] font-extrabold tracking-tight text-ink-900">
                Kuruluma Dahil
              </h2>
              <ul className="flex list-none flex-col gap-3.5">
                {product.scope.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={17} className="mt-0.5 shrink-0 text-success" />
                    <span className="text-[0.875rem] leading-snug text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card h-full p-8">
              <h2 className="mb-5 text-[1.05rem] font-extrabold tracking-tight text-ink-900">
                Kapsam Dışı
              </h2>
              <ul className="flex list-none flex-col gap-3.5">
                {product.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X size={17} className="mt-0.5 shrink-0 text-ink-400" />
                    <span className="text-[0.875rem] leading-snug text-ink-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Teslimat + Teknoloji */}
      <section className="bg-white px-6 py-18">
        <div className="mx-auto max-w-[980px]">
          <Reveal>
            <h2 className="mb-6 text-[1.25rem] font-extrabold tracking-tight text-ink-900">
              Teslim Ettiklerimiz
            </h2>
          </Reveal>
          <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
            {product.deliverables.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className="flex items-start gap-3 rounded-lg border border-ink-200 bg-surface px-4 py-3.5">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent-700" />
                  <span className="text-[0.875rem] leading-snug text-ink-700">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <h3 className="mb-3 text-[0.95rem] font-extrabold tracking-tight text-ink-900">
              Kullandığımız Teknolojiler
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech) => (
                <span key={tech} className="rounded-[5px] border border-ink-200 bg-surface px-3.5 py-1.5 text-[0.8rem] font-semibold text-ink-600">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[600px]">
          <Reveal>
            <p className="eyebrow mb-3">Ücretsiz Teklif</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              {product.title} için Teklif Alın
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ink-500">
              Satış hacminizi ve mevcut altyapınızı inceleyerek 24 saat içinde sabit kapsamlı bir teklif hazırlıyoruz.
            </p>
          </Reveal>
          <div className="rounded-[12px] border border-ink-200 bg-white p-10">
            <TrendyolLeadForm product={product.title} />
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <h2 className="mb-8 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink-900">
              Sık Sorulan Sorular
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {product.faq.map((faq) => (
              <div key={faq.q} className="border-b border-ink-200 py-5">
                <h3 className="mb-2 text-[0.95rem] font-bold text-ink-900">{faq.q}</h3>
                <p className="text-[0.875rem] leading-[1.65] text-ink-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TicaretHub araçları (varsa) */}
      {product.ticarethubTools && product.ticarethubTools.length > 0 && (
        <section className="border-t border-ink-200 bg-surface px-6 py-14">
          <div className="mx-auto max-w-[720px]">
            <Reveal>
              <p className="eyebrow mb-3">Ücretsiz Araçlar</p>
              <h2 className="mb-3 text-[1.25rem] font-extrabold tracking-[-0.02em] text-ink-900">
                Önce Rakamları Görün
              </h2>
              <p className="mb-8 max-w-[540px] text-[0.875rem] leading-[1.7] text-ink-500">
                Karar vermeden önce kardeş platform{" "}
                <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-700 underline underline-offset-2">
                  TicaretHub
                </a>
                &apos;un ücretsiz hesaplayıcılarıyla maliyet ve kârınızı görebilirsiniz.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {product.ticarethubTools.map((tool) => (
                  <a
                    key={tool.href}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[8px] border border-ink-200 bg-white p-5 transition-colors hover:border-accent-300 hover:bg-accent-50"
                  >
                    <p className="mb-1 text-[0.875rem] font-bold text-ink-900 group-hover:text-accent-700">
                      {tool.label} →
                    </p>
                    <p className="text-[0.8rem] leading-[1.55] text-ink-500">{tool.desc}</p>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* İlgili entegrasyonlar */}
      {related.length > 0 && (
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-[1000px]">
            <Reveal>
              <p className="eyebrow mb-3">Benzer Çözümler</p>
              <h2 className="mb-8 text-[1.375rem] font-extrabold tracking-tight text-ink-900">
                İlgili Entegrasyonlar
              </h2>
            </Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/entegrasyonlar/${p.slug}`}
                  className="group flex flex-col rounded-[10px] border border-ink-200 bg-surface p-6 transition-colors hover:border-accent-300 hover:bg-accent-50"
                >
                  <span className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-ink-400">
                    {p.category}
                  </span>
                  <p className="mb-2 text-[0.95rem] font-bold text-ink-900 group-hover:text-accent-700">
                    {p.title}
                  </p>
                  <p className="mb-3 text-[0.8rem] leading-[1.55] text-ink-500">{p.shortDesc}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[0.8rem] font-semibold text-accent-700">
                    İncele <ArrowIcon size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Son CTA */}
      <section className="bg-dark-500 px-6 py-16 text-center">
        <div className="mx-auto max-w-[640px]">
          <h2 className="mb-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-white">
            Tüm entegrasyon çözümlerini görün
          </h2>
          <p className="mb-8 text-[0.9rem] leading-relaxed text-ondark-muted">
            Pazaryeri entegrasyon kataloğumuzdaki diğer hazır çözümlere göz atın.
          </p>
          <Link href="/entegrasyonlar" className="btn btn-primary !px-8">
            Entegrasyon Kataloğu <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
