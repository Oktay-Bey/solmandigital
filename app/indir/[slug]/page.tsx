import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CheckCircle2, FileText } from "lucide-react"
import { getDownloadBySlug, downloads } from "@/lib/data/downloads"
import { siteConfig } from "@/lib/site-config"
import DownloadForm from "./DownloadForm"
import Reveal from "@/components/Reveal"

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
      <section className="bg-dark-500 px-6 py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-[6px] border border-dark-50 bg-dark-200 px-3.5 py-1.5">
              <FileText size={13} className="text-accent-700" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-ondark-faint">
                Ücretsiz PDF Rehber{download.pageCount ? ` · ${download.pageCount} Sayfa` : ""}
              </span>
            </div>
            <h1 className="mb-4 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-white">
              {download.title}
            </h1>
            <p className="text-[0.875rem] font-medium text-ondark-faint">
              {download.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* İçerik + Form */}
      <section className="bg-white px-6 py-16">
        <div className="download-grid mx-auto max-w-[1000px] items-start gap-14">
          {/* Sol: Ne öğreneceksiniz */}
          <Reveal delay={0}>
            <div>
              <h2 className="mb-4 text-[1.25rem] font-extrabold tracking-[-0.02em] text-ink-900">
                Bu Rehberde Neler Var?
              </h2>
              <p className="mb-7 text-[0.925rem] leading-[1.8] text-ink-600">
                {download.description}
              </p>
              <div className="flex flex-col gap-3.5">
                {download.coverPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-[8px] border border-ink-200 bg-surface px-4 py-3.5"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-700" />
                    <span className="text-[0.875rem] leading-snug text-ink-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Sağ: Form */}
          <Reveal delay={100}>
            <div className="sticky top-8">
              <div className="card rounded-[12px] border border-ink-200 bg-surface p-8">
                <p className="mb-2.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">
                  Ücretsiz İndir
                </p>
                <h3 className="mb-2 text-base font-extrabold tracking-[-0.01em] text-ink-900">
                  {download.title}
                </h3>
                <p className="mb-6 text-[0.8rem] leading-[1.6] text-ink-500">
                  E-posta adresinizi girin, rehber hemen gönderilsin.
                </p>
                <DownloadForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
