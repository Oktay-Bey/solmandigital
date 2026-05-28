import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { services, getServiceBySlug, getRelatedServices } from "@/lib/data/services"
import ServiceDetail from "@/components/ServiceDetail"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${siteConfig.url}/hizmetler/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteConfig.url}/hizmetler/${slug}`,
      locale: "tr_TR",
    },
  }
}

export default async function HizmetDetayPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const related = getRelatedServices(slug)

  return <ServiceDetail service={service} related={related} />
}
