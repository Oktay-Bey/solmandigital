import Link from "next/link"
import { CheckCircle2, ArrowRight, ChevronRight, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import * as Icons from "lucide-react"
import type { Service } from "@/lib/data/services"
import type { RehberPost } from "@/lib/data/rehber"
import ServiceCard from "./ServiceCard"
import LeadMagnetBanner from "./LeadMagnetBanner"
import { categoryLeadMagnetMap } from "@/lib/data/leadMagnets"

type Props = {
  service: Service
  related: Service[]
  relatedRehber?: RehberPost[]
}

const faqSchema = (faq: Service["faq"]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
})

const serviceSchema = (service: Service, siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.shortDesc,
  url: `${siteUrl}/hizmetler/${service.slug}`,
  provider: { "@type": "Organization", name: "Solman Digital", url: siteUrl },
  areaServed: { "@type": "Country", name: "Turkey" },
  serviceType: service.category,
})

const breadcrumbSchema = (service: Service, siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Hizmetler", item: `${siteUrl}/hizmetler` },
    { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/hizmetler/${service.slug}` },
  ],
})

export default function ServiceDetail({ service, related, relatedRehber = [] }: Props) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://solmandigital.com.tr"

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faq)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, siteUrl)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(service, siteUrl)) }} />

      {/* Breadcrumb */}
      <div className="border-b border-ink-200 bg-surface px-6 py-3">
        <div className="mx-auto flex max-w-[1200px] items-center gap-1.5 text-[0.75rem] text-ink-400">
          <Link href="/" className="transition-colors hover:text-ink-700">Ana Sayfa</Link>
          <ChevronRight size={13} />
          <Link href="/hizmetler" className="transition-colors hover:text-ink-700">Hizmetler</Link>
          <ChevronRight size={13} />
          <span className="font-semibold text-ink-900">{service.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-dark-500 px-6 py-18">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dark-50 bg-dark-100 text-ink-400">
              {IconComponent && <IconComponent size={14} />}
            </div>
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ink-500">
              {service.category}
            </span>
          </div>
          <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white">
            {service.title}
          </h1>
          <p className="mb-8 max-w-[680px] text-[0.95rem] leading-relaxed text-ondark-muted">
            {service.longDesc.split("\n\n")[0]}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/iletisim" className="btn btn-primary">
              Teklif Al <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Merhaba, ${service.title} hakkında bilgi almak istiyorum.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] text-white hover:bg-[#1eb955]"
            >
              <MessageCircle size={16} /> WhatsApp&apos;ta Sor
            </a>
            <Link href="/hizmetler" className="btn btn-outline-dark">
              Tüm Hizmetler
            </Link>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <section className="bg-white px-6 py-18">
        <div className="two-col-grid mx-auto max-w-[1200px] items-start md:!grid-cols-[1fr_360px]">
          {/* Sol */}
          <div>
            {service.aeoSummary && (
              <blockquote className="mx-0 mb-8 border-l-[3px] border-accent-700 pl-5">
                <p className="text-base font-medium leading-relaxed text-ink-700">
                  {service.aeoSummary}
                </p>
              </blockquote>
            )}
            <h2 className="mb-5 text-[1.375rem] font-extrabold tracking-tight text-ink-900">
              Neler Sunuyoruz?
            </h2>
            {service.longDesc.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 text-[0.925rem] leading-loose text-ink-600">
                {para}
              </p>
            ))}

            <h3 className="mb-4 mt-10 text-[1.1rem] font-extrabold tracking-tight text-ink-900">
              Özellikler
            </h3>
            <div className="features-grid">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-lg border border-ink-200 bg-surface px-4 py-3.5">
                  <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <span className="text-[0.875rem] leading-snug text-ink-700">{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="mb-4 mt-10 text-[1.1rem] font-extrabold tracking-tight text-ink-900">
              Kullandığımız Teknolojiler
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span key={tech} className="rounded-[5px] border border-ink-200 bg-surface px-3.5 py-1.5 text-[0.8rem] font-semibold text-ink-600">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Sağ */}
          <div className="sticky top-20">
            <div className="card mb-4 p-7">
              <h3 className="mb-5 text-[0.7rem] font-extrabold uppercase tracking-wider text-ink-400">
                Teslimat Kapsamı
              </h3>
              <ul className="flex list-none flex-col gap-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} color="#9b1c1c" className="mt-0.5 shrink-0" />
                    <span className="text-[0.875rem] leading-snug text-ink-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/iletisim" className="btn btn-primary w-full">
              Ücretsiz Teklif Al <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet Banner */}
      {categoryLeadMagnetMap[service.category] && (
        <section className="bg-white px-6">
          <div className="mx-auto max-w-[1200px]">
            <LeadMagnetBanner {...categoryLeadMagnetMap[service.category]} />
          </div>
        </section>
      )}

      {/* SSS */}
      <section className="bg-surface px-6 py-18">
        <div className="mx-auto max-w-[760px]">
          <p className="eyebrow mb-3.5">SSS</p>
          <h2 className="mb-2 text-[clamp(1.375rem,2.5vw,1.75rem)] font-extrabold tracking-tight text-ink-900">
            Sık Sorulan Sorular
          </h2>
          <p className="mb-10 text-[0.875rem] text-ink-400">
            {service.title} hizmeti hakkında merak edilenler
          </p>
          <div className="flex flex-col">
            {service.faq.map((item, i) => (
              <div key={i} className="border-t border-ink-200 py-5.5">
                <h3 className="mb-2.5 text-[0.95rem] font-bold tracking-tight text-ink-900">
                  {item.q}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-ink-500">{item.a}</p>
              </div>
            ))}
            <div className="border-t border-ink-200" />
          </div>
        </div>
      </section>

      {/* İlgili Hizmetler */}
      {related.length > 0 && (
        <section className="bg-white px-6 py-18">
          <div className="mx-auto max-w-[1200px]">
            <p className="eyebrow mb-3">Benzer Çözümler</p>
            <h2 className="mb-2 text-[1.375rem] font-extrabold tracking-tight text-ink-900">
              İlgili Hizmetler
            </h2>
            <p className="mb-8 text-[0.875rem] text-ink-400">
              Bu hizmetle birlikte sık tercih edilenler
            </p>
            <div className="related-grid">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* İlgili Rehberler — hizmet→rehber çapraz linki (topical authority) */}
      {relatedRehber.length > 0 && (
        <section className="bg-surface px-6 py-18">
          <div className="mx-auto max-w-[1200px]">
            <p className="eyebrow mb-3">Daha Fazla Bilgi</p>
            <h2 className="mb-2 text-[1.375rem] font-extrabold tracking-tight text-ink-900">
              İlgili Rehberler
            </h2>
            <p className="mb-8 text-[0.875rem] text-ink-400">
              {service.title} hakkında bilmeniz gerekenler
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedRehber.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rehber/${r.slug}`}
                  className="card group flex flex-col p-6 transition-shadow hover:shadow-card-hover"
                >
                  <span className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-accent-700">
                    Rehber · {r.readTime} dk okuma
                  </span>
                  <h3 className="mb-2 text-[0.95rem] font-bold leading-snug tracking-tight text-ink-900 group-hover:text-accent-700">
                    {r.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 flex-1 text-[0.825rem] leading-relaxed text-ink-500">
                    {r.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-accent-700">
                    Oku <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Son CTA */}
      <section className="bg-dark-500 px-6 py-18 text-center">
        <div className="mx-auto max-w-[640px]">
          <h2 className="mb-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-white">
            {service.cta || `${service.title} için bugün teklif alın`}
          </h2>
          <p className="mb-8 text-[0.9rem] leading-relaxed text-ondark-muted">
            Projenizi anlatan kısa bir mesaj yeterli. Size 24 saat içinde dönüş yapıyoruz.
          </p>
          <Link href="/iletisim" className="btn btn-primary !px-8">
            Şimdi İletişime Geç <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
