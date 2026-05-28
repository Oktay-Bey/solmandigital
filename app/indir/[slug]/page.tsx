import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CheckCircle2, FileText } from "lucide-react"
import { getDownloadBySlug, downloads } from "@/lib/data/downloads"
import { siteConfig } from "@/lib/site-config"
import DownloadForm from "./DownloadForm"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return downloads.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const download = getDownloadBySlug(slug)
  if (!download) return {}
  return {
    title: `${download.title} — Ücretsiz İndir | Solman Digital`,
    description: download.description,
    alternates: { canonical: `${siteConfig.url}/indir/${slug}` },
    openGraph: {
      title: `${download.title} — Ücretsiz`,
      description: download.description,
      url: `${siteConfig.url}/indir/${slug}`,
    },
  }
}

export default async function DownloadPage({ params }: Props) {
  const { slug } = await params
  const download = getDownloadBySlug(slug)
  if (!download) notFound()

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a",
              borderRadius: 6, padding: "0.375rem 0.875rem", marginBottom: "1.5rem",
            }}
          >
            <FileText size={13} color="#9b1c1c" />
            <span style={{ color: "#888888", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Ücretsiz PDF Rehber{download.pageCount ? ` · ${download.pageCount} Sayfa` : ""}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800,
              color: "#ffffff", lineHeight: 1.15, marginBottom: "1rem",
              letterSpacing: "-0.03em",
            }}
          >
            {download.title}
          </h1>
          <p style={{ color: "#888888", fontSize: "0.875rem", fontWeight: 500 }}>
            {download.subtitle}
          </p>
        </div>
      </section>

      {/* İçerik + Form */}
      <section style={{ padding: "4rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div
          style={{
            maxWidth: 1000, margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 380px",
            gap: "3.5rem", alignItems: "start",
          }}
          className="download-grid"
        >
          {/* Sol: Ne öğreneceksiniz */}
          <div>
            <h2
              style={{
                fontSize: "1.25rem", fontWeight: 800, color: "#111111",
                marginBottom: "1rem", letterSpacing: "-0.02em",
              }}
            >
              Bu Rehberde Neler Var?
            </h2>
            <p style={{ color: "#555555", fontSize: "0.925rem", lineHeight: 1.8, marginBottom: "1.75rem" }}>
              {download.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {download.coverPoints.map((point) => (
                <div
                  key={point}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "0.75rem",
                    padding: "0.875rem 1rem",
                    backgroundColor: "#f5f5f5", borderRadius: 8, border: "1px solid #e0e0e0",
                  }}
                >
                  <CheckCircle2 size={16} color="#9b1c1c" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: "#333333", fontSize: "0.875rem", lineHeight: 1.4 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Form */}
          <div style={{ position: "sticky", top: "2rem" }}>
            <div
              style={{
                backgroundColor: "#f5f5f5", border: "1px solid #e0e0e0",
                borderRadius: 12, padding: "2rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.7rem", fontWeight: 700, color: "#9b1c1c",
                  textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.625rem",
                }}
              >
                Ücretsiz İndir
              </p>
              <h3
                style={{
                  fontSize: "1rem", fontWeight: 800, color: "#111111",
                  marginBottom: "0.5rem", letterSpacing: "-0.01em",
                }}
              >
                {download.title}
              </h3>
              <p style={{ color: "#6b6b6b", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                E-posta adresinizi girin, rehber hemen gönderilsin.
              </p>
              <DownloadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
