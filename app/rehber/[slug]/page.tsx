import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Clock } from "lucide-react"
import { rehberPosts, getRehberBySlug, getRelatedRehber } from "@/lib/data/rehber"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ slug: string }>
}

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

      <article style={{ padding: "4rem 1.5rem 6rem", backgroundColor: "#ffffff", maxWidth: 760, margin: "0 auto" }}>
        {/* Geri link */}
        <Link
          href="/rehber"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "#888888",
            fontSize: "0.8rem",
            textDecoration: "none",
            marginBottom: "2.5rem",
          }}
        >
          <ArrowLeft size={13} /> Tüm Rehberler
        </Link>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <span
            style={{
              backgroundColor: "#fef2f2",
              color: "#9b1c1c",
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "0.2rem 0.6rem",
              borderRadius: 4,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Rehber
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#aaaaaa", fontSize: "0.75rem" }}>
            <Clock size={11} /> {post.readTime} dakika okuma
          </span>
        </div>

        {/* Başlık */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#111111",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "1.25rem",
          }}
        >
          {post.title}
        </h1>

        {/* Özet */}
        <p
          style={{
            color: "#555555",
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "3rem",
            borderLeft: "3px solid #9b1c1c",
            paddingLeft: "1.25rem",
          }}
        >
          {post.description}
        </p>

        {/* Bölümler */}
        {post.sections.map((section, i) => (
          <section key={i} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "0.875rem",
              }}
            >
              {section.heading}
            </h2>
            <p style={{ color: "#555555", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: section.list ? "1rem" : 0 }}>
              {section.body}
            </p>
            {section.list && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: 0 }}>
                {section.list.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "#9b1c1c",
                        flexShrink: 0,
                        marginTop: "0.45rem",
                      }}
                    />
                    <span style={{ color: "#555555", fontSize: "0.875rem", lineHeight: 1.7 }}>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* SSS */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#111111",
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}
          >
            Sık Sorulan Sorular
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {post.faq.map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid #e0e0e0",
                  padding: "1.25rem 0",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.q}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.875rem", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e0e0e0" }} />
          </div>
        </section>

        {/* CTA */}
        <div
          style={{
            backgroundColor: "#111111",
            borderRadius: 10,
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#aaaaaa", fontSize: "0.85rem", lineHeight: 1.65 }}>{post.cta.text}</p>
          <Link
            href={post.cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#9b1c1c",
              color: "#ffffff",
              padding: "0.75rem 1.5rem",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              alignSelf: "flex-start",
            }}
          >
            {post.cta.label} <ArrowRight size={14} />
          </Link>
        </div>

        {/* İlgili Rehberler */}
        {related.length > 0 && (
          <section style={{ marginTop: "3.5rem" }}>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#111111",
                letterSpacing: "-0.02em",
                marginBottom: "1.25rem",
              }}
            >
              İlgili Rehberler
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rehber/${r.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    border: "1px solid #e8e8e8",
                    borderRadius: 9,
                    textDecoration: "none",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#111111",
                        marginBottom: "0.3rem",
                        lineHeight: 1.35,
                      }}
                    >
                      {r.title}
                    </h3>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        color: "#aaaaaa",
                        fontSize: "0.72rem",
                      }}
                    >
                      <Clock size={10} /> {r.readTime} dakika okuma
                    </span>
                  </div>
                  <ArrowRight size={15} color="#9b1c1c" style={{ flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
