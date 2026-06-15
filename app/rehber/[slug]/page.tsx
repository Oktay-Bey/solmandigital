import type { Metadata } from "next"
import { Fragment } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Clock, CalendarDays, RefreshCw, ChevronRight } from "lucide-react"
import { rehberPosts, getRehberBySlug, getRelatedRehber } from "@/lib/data/rehber"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return rehberPosts.map((p) => ({ slug: p.slug }))
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getRehberBySlug(slug)
  if (!post) return {}

  const modified = post.updatedDate ?? post.publishDate

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `${siteConfig.url}/rehber/${slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${siteConfig.url}/rehber/${slug}`,
      locale: "tr_TR",
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: modified,
    },
  }
}

export default async function RehberDetayPage({ params }: Props) {
  const { slug } = await params
  const post = getRehberBySlug(slug)
  if (!post) notFound()

  const related = getRelatedRehber(slug)
  const modified = post.updatedDate ?? post.publishDate

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/rehber/${slug}` },
    keywords: post.keywords.join(", "),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Rehberler", item: `${siteConfig.url}/rehber` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/rehber/${slug}` },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="mx-auto max-w-[760px] bg-white px-6 pb-24 pt-12">

        {/* ── Breadcrumb (görünür UI + schema) ─────────────────── */}
        <Reveal delay={0}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-[0.75rem] text-ink-400">
              <li>
                <Link href="/" className="transition-colors hover:text-ink-700">Ana Sayfa</Link>
              </li>
              <li aria-hidden><ChevronRight size={12} /></li>
              <li>
                <Link href="/rehber" className="transition-colors hover:text-ink-700">Rehberler</Link>
              </li>
              <li aria-hidden><ChevronRight size={12} /></li>
              <li className="text-ink-600 font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>
        </Reveal>

        {/* ── Meta etiket + tarihler ────────────────────────────── */}
        <Reveal delay={50}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded bg-accent-50 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent-700">
              Rehber
            </span>
            <span className="flex items-center gap-1 text-[0.75rem] text-ink-400">
              <Clock size={11} /> {post.readTime} dakika okuma
            </span>
          </div>
        </Reveal>

        {/* ── Başlık ───────────────────────────────────────────── */}
        <Reveal delay={80}>
          <h1 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight text-ink-900">
            {post.title}
          </h1>
        </Reveal>

        {/* ── Yayın & güncelleme tarihleri ─────────────────────── */}
        <Reveal delay={100}>
          <div className="mb-8 flex flex-wrap items-center gap-4 text-[0.78rem] text-ink-400 border-b border-ink-100 pb-5">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              <span>Yayınlandı: <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time></span>
            </span>
            {post.updatedDate && post.updatedDate !== post.publishDate && (
              <span className="flex items-center gap-1.5">
                <RefreshCw size={12} />
                <span>Güncellendi: <time dateTime={post.updatedDate}>{formatDate(post.updatedDate)}</time></span>
              </span>
            )}
          </div>
        </Reveal>

        {/* ── Özet kutusu (GEO: AI motorları ilk 200 kelimeyi alır) ── */}
        <Reveal delay={120}>
          <div className="mb-10 rounded-[10px] border-l-[4px] border-accent-700 bg-accent-50 px-6 py-5">
            <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-accent-700">Özet</p>
            <p className="text-[0.92rem] leading-[1.8] text-ink-700">
              {post.summary ?? post.description}
            </p>
          </div>
        </Reveal>

        {/* ── Bölümler ─────────────────────────────────────────── */}
        {post.sections.map((section, i) => (
          <Fragment key={i}>
            <section className="mb-10">
              <h2 className="mb-3.5 text-[1.2rem] font-bold tracking-tight text-ink-900">
                {section.heading}
              </h2>
              <p className={`text-[0.9rem] leading-loose text-ink-600 ${section.list ? "mb-4" : ""}`}>
                {section.body}
              </p>
              {section.list && (
                <ul className="flex list-none flex-col gap-2 pl-0">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-[0.45rem] h-[5px] w-[5px] shrink-0 rounded-full bg-accent-700" />
                      <span className="text-[0.875rem] leading-relaxed text-ink-600">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Mid-article CTA: 3. bölümden sonra, yalnızca bölüm sayısı ≥5 ise */}
            {i === 2 && post.sections.length >= 4 && (
              <aside
                className="mb-10 flex flex-col gap-3 rounded-[10px] border border-accent-200 bg-accent-50 px-7 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="mb-0.5 text-[0.72rem] font-bold uppercase tracking-widest text-accent-700">
                    Bu konuda yardım almak ister misiniz?
                  </p>
                  <p className="text-[0.88rem] leading-snug text-ink-700">
                    {post.cta.text}
                  </p>
                </div>
                <Link
                  href={post.cta.href}
                  className="btn btn-primary shrink-0 self-start sm:self-auto"
                >
                  {post.cta.label} <ArrowRight size={13} />
                </Link>
              </aside>
            )}
          </Fragment>
        ))}

        {/* ── SSS (FAQ) — h3 hierarchy, AEO için şart ──────────── */}
        <section className="mb-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-5 text-[1.2rem] font-bold tracking-tight text-ink-900">
            Sık Sorulan Sorular
          </h2>
          <div className="flex flex-col divide-y divide-ink-100">
            {post.faq.map((item, i) => (
              <div key={i} className="py-5">
                <h3 className="mb-2 text-[0.9rem] font-bold leading-snug text-ink-900">
                  {item.q}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-ink-500">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Yazar / E-E-A-T bloğu ────────────────────────────── */}
        <Reveal delay={0}>
          <div className="mb-10 flex items-start gap-4 rounded-[10px] border border-ink-200 bg-ink-50 px-6 py-5">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-700 text-[0.7rem] font-bold text-white">
              SD
            </div>
            <div>
              <p className="mb-0.5 text-[0.8rem] font-bold text-ink-800">Solman Digital</p>
              <p className="text-[0.78rem] leading-relaxed text-ink-500">
                Bu rehber, gerçekleştirilen projelerden derlenen doğrudan deneyime dayanmaktadır.
                Konuya ilişkin sorularınız için <Link href="/iletisim" className="text-accent-700 hover:underline">doğrudan uzman erişimi</Link> sunuyoruz.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div className="mb-14 flex flex-col gap-4 rounded-[10px] bg-dark-400 p-8">
          <p className="text-[0.85rem] leading-relaxed text-ondark-muted">{post.cta.text}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={post.cta.href} className="btn btn-primary self-start">
              {post.cta.label} <ArrowRight size={14} />
            </Link>
            {post.ctaSecondary && (
              <a
                href={post.ctaSecondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 self-start rounded-[8px] border border-accent-200 bg-accent-50 px-4 py-2 text-[0.8rem] font-semibold text-accent-700 transition-colors hover:border-accent-300 hover:bg-accent-100"
              >
                {post.ctaSecondary.label} →
              </a>
            )}
          </div>
        </div>

        {/* ── TicaretHub Araç Cross-Promo (trendyol + e-ticaret kategorileri) ── */}
        {(post.category === "trendyol" || post.category === "e-ticaret") && (
          <div className="mb-12 rounded-[10px] border border-ink-200 bg-surface p-6">
            <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">
              Ücretsiz Araçlar
            </p>
            <p className="mb-4 text-[0.9rem] font-bold text-ink-900">
              Rakamları Kendiniz Hesaplayın
            </p>
            <p className="mb-5 text-[0.8rem] leading-[1.65] text-ink-500">
              Entegrasyon veya geliştirme kararı vermeden önce{" "}
              <a
                href="https://ticarethub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-700 hover:underline"
              >
                TicaretHub
              </a>
              &apos;un ücretsiz hesaplama araçlarıyla mevcut durumunuzu analiz edebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-2">
              {post.category === "trendyol" && (
                <>
                  <a
                    href="https://ticarethub.com/trendyol-komisyon-hesaplama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700"
                  >
                    Komisyon Hesaplama →
                  </a>
                  <a
                    href="https://ticarethub.com/trendyol-kar-analizi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700"
                  >
                    Kâr Analizi →
                  </a>
                  <a
                    href="https://ticarethub.com/trendyol-fiyat-hesaplama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700"
                  >
                    Fiyat Hesaplama →
                  </a>
                </>
              )}
              {post.category === "e-ticaret" && (
                <>
                  <a
                    href="https://ticarethub.com/pazaryeri-komisyon-karsilastirma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700"
                  >
                    Pazaryeri Komisyon Karşılaştır →
                  </a>
                  <a
                    href="https://ticarethub.com/trendyol-entegrasyonu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700"
                  >
                    Trendyol Entegrasyonu →
                  </a>
                  <a
                    href="https://ticarethub.com/yapay-zeka-urun-aciklamasi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] border border-ink-200 bg-white px-3 py-2 text-[0.775rem] font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-700"
                  >
                    AI Ürün Açıklaması →
                  </a>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── İlgili Rehberler ─────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-4" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-5 text-[1.2rem] font-bold tracking-tight text-ink-900">
              İlgili Rehberler
            </h2>
            <div className="flex flex-col gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rehber/${r.slug}`}
                  className="flex items-center justify-between gap-4 rounded-[9px] border border-ink-200 px-5 py-4 transition-colors hover:border-ink-400"
                >
                  <div>
                    <h3 className="mb-1 text-[0.9rem] font-bold leading-tight tracking-tight text-ink-900">
                      {r.title}
                    </h3>
                    <span className="flex items-center gap-1 text-[0.72rem] text-ink-400">
                      <Clock size={10} /> {r.readTime} dakika okuma
                    </span>
                  </div>
                  <ArrowRight size={15} color="#9b1c1c" className="shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Geri link ────────────────────────────────────────── */}
        <div className="mt-12 border-t border-ink-100 pt-8">
          <Link
            href="/rehber"
            className="inline-flex items-center gap-1.5 text-[0.8rem] text-ink-400 transition-colors hover:text-ink-700"
          >
            <ArrowLeft size={13} /> Tüm Rehberlere Dön
          </Link>
        </div>
      </article>
    </>
  )
}
