import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Clock } from "lucide-react"
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getRehberBySlug(slug)
  if (!post) return {}

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
    },
  }
}

export default async function RehberDetayPage({ params }: Props) {
  const { slug } = await params
  const post = getRehberBySlug(slug)
  if (!post) notFound()

  const related = getRelatedRehber(slug)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
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

      <article className="mx-auto max-w-[760px] bg-white px-6 pb-24 pt-16">
        {/* Geri link */}
        <Reveal delay={0}>
        <Link
          href="/rehber"
          className="mb-10 inline-flex items-center gap-1.5 text-[0.8rem] text-ink-400 transition-colors hover:text-ink-700"
        >
          <ArrowLeft size={13} /> Tüm Rehberler
        </Link>
        </Reveal>

        {/* Meta */}
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded bg-accent-50 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent-700">
            Rehber
          </span>
          <span className="flex items-center gap-1 text-[0.75rem] text-ink-400">
            <Clock size={11} /> {post.readTime} dakika okuma
          </span>
        </div>

        {/* Başlık */}
        <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[1.15] tracking-tight text-ink-900">
          {post.title}
        </h1>

        {/* Özet */}
        <p className="mb-12 border-l-[3px] border-accent-700 pl-5 text-base leading-loose text-ink-600">
          {post.description}
        </p>

        {/* Bölümler */}
        {post.sections.map((section, i) => (
          <section key={i} className="mb-10">
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
        ))}

        {/* SSS */}
        <section className="mb-12">
          <h2 className="mb-5 text-[1.2rem] font-bold tracking-tight text-ink-900">
            Sık Sorulan Sorular
          </h2>
          <div className="flex flex-col">
            {post.faq.map((item, i) => (
              <div key={i} className="border-t border-ink-200 py-5">
                <h3 className="mb-2 text-[0.9rem] font-bold text-ink-900">
                  {item.q}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-ink-500">{item.a}</p>
              </div>
            ))}
            <div className="border-t border-ink-200" />
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col gap-4 rounded-[10px] bg-dark-400 p-8">
          <p className="text-[0.85rem] leading-relaxed text-ondark-muted">{post.cta.text}</p>
          <Link href={post.cta.href} className="btn btn-primary self-start">
            {post.cta.label} <ArrowRight size={14} />
          </Link>
        </div>

        {/* İlgili Rehberler */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-[1.2rem] font-bold tracking-tight text-ink-900">
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
      </article>
    </>
  )
}
