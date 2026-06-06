import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, X } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Web Sitesi & Yazılım Fiyatları 2025 | Solman Digital",
  description:
    "Kurumsal web sitesi, e-ticaret, SaaS ve AI otomasyon fiyatları. ₺8.000'dan başlayan fiyatlarla profesyonel yazılım geliştirme. Ücretsiz kapsam görüşmesi.",
  keywords: [
    "web sitesi fiyatları 2025",
    "kurumsal web sitesi ne kadar",
    "e-ticaret sitesi fiyatı",
    "saas geliştirme maliyeti",
    "yazılım geliştirme fiyatları istanbul",
    "web sitesi yaptırma fiyatı",
  ],
  alternates: { canonical: `${siteConfig.url}/fiyatlar` },
  openGraph: {
    title: "Web Sitesi & Yazılım Fiyatları 2025 | Solman Digital",
    description: "₺8.000'dan başlayan kurumsal web sitesi, e-ticaret ve SaaS fiyatları. Ücretsiz kapsam görüşmesi.",
    url: `${siteConfig.url}/fiyatlar`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const faqItems = [
  {
    q: "Web sitesi fiyatları neye göre değişir?",
    a: "Fiyatlar; sayfa sayısı, özel özellikler (ödeme sistemi, üyelik, API entegrasyonu), tasarım karmaşıklığı ve içerik miktarına göre değişir. Belirtilen fiyatlar başlangıç fiyatıdır; kesin tutar kapsam görüşmesinden sonra belirlenir.",
  },
  {
    q: "Ödeme nasıl yapılır?",
    a: "Projeler 2 taksitte faturalandırılır: %50 proje başında, %50 tesliminde. Banka havalesi ve EFT kabul edilir. Yurt içi faturalama için e-fatura düzenlenmektedir.",
  },
  {
    q: "Fiyata ne dahildir?",
    a: "Her pakete standart olarak şunlar dahildir: tam kaynak kodu, Vercel'e deploy, SSL kurulumu, Google Analytics + Search Console kurulumu, 1 ay ücretsiz teknik destek ve içerik güncelleme rehberi.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

type PricingTier = {
  name: string
  price: string
  subtitle: string
  timeline: string
  features: string[]
  notIncluded: string[]
  cta: string
  ctaHref: string
  highlight?: boolean
}

const tiers: PricingTier[] = [
  {
    name: "Web Sitesi",
    price: "₺8.000",
    subtitle: "Kurumsal tanıtım ve landing page",
    timeline: "5–10 iş günü",
    features: [
      "5–10 sayfa kurumsal site veya tek sayfa landing page",
      "Mobil uyumlu responsive tasarım",
      "Google PageSpeed 90+ performans",
      "SEO teknik kurulumu (meta, schema, sitemap)",
      "İletişim formu & WhatsApp entegrasyonu",
      "Google Analytics + Search Console kurulumu",
      "SSL + Vercel deploy",
      "1 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Ödeme sistemi (ayrı paket)", "Blog veya CMS yönetimi"],
    cta: "Fiyat Teklifi Al",
    ctaHref: "/iletisim",
  },
  {
    name: "E-Ticaret",
    price: "₺20.000",
    subtitle: "Tam e-ticaret mağazası",
    timeline: "10–15 iş günü",
    highlight: true,
    features: [
      "Ürün kataloğu + sepet + ödeme akışı",
      "İyzico veya Stripe ödeme entegrasyonu",
      "Admin paneli (ürün/sipariş yönetimi)",
      "Trendyol/Hepsiburada senkronizasyonu (opsiyonel)",
      "Stok & varyant yönetimi",
      "SEO + performans kurulumu",
      "SSL + Vercel deploy",
      "1 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Ürün fotoğrafçılığı ve içerik yazımı", "Pazaryeri aylık bakım ücreti"],
    cta: "E-Ticaret Teklifi Al",
    ctaHref: "/iletisim",
  },
  {
    name: "SaaS & AI",
    price: "₺50.000",
    subtitle: "Platform, uygulama veya otomasyon",
    timeline: "4–8 hafta",
    features: [
      "Kullanıcı kimlik doğrulama sistemi",
      "Abonelik ve ödeme yönetimi",
      "Admin + kullanıcı dashboard'u",
      "AI/LLM entegrasyonu (GPT-4o, Claude)",
      "API geliştirme ve dış servis entegrasyonları",
      "CI/CD pipeline kurulumu",
      "Kapsamlı test süiti",
      "3 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Sunucu/cloud maliyetleri", "İçerik üretimi ve pazarlama"],
    cta: "SaaS Teklifi Al",
    ctaHref: "/saas-platform-gelistirme",
  },
]

export default function FiyatlarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-dark-500">
        {/* Hero */}
        <section className="border-b border-dark-200 px-6 pb-12 pt-20">
          <div className="mx-auto max-w-[760px] text-center">
            <Reveal>
              <p className="eyebrow eyebrow-center mb-4">Fiyatlar</p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mb-5 text-[clamp(2rem,5vw,3.25rem)] font-black leading-[1.1] tracking-tight text-white">
                Net fiyatlar,
                <br />
                <span className="text-accent-700">sürpriz maliyet yok</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mb-8 max-w-[540px] text-base leading-relaxed text-ondark-muted">
                Belirtilen rakamlar başlangıç fiyatıdır. Kesin tutar kapsam görüşmesinde belirlenir.
                İlk görüşme ücretsizdir — risk almadan başlayın.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link href="/ucretsiz-analiz" className="btn btn-primary">
                Ücretsiz Kapsam Görüşmesi
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-6">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100}>
                <div
                  className={`relative rounded-[12px] p-8 ${
                    tier.highlight ? "border border-accent-700 bg-dark-300" : "border border-dark-50 bg-dark-400"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[20px] bg-accent-700 px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                      En Popüler
                    </div>
                  )}

                  <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-ondark-muted">
                    {tier.name}
                  </p>
                  <p className="mb-1 text-[2.25rem] font-black leading-none tracking-tight text-white">
                    {tier.price}
                    <span className="text-[0.875rem] font-semibold text-ondark-muted">&apos;dan</span>
                  </p>
                  <p className="mb-1.5 text-[0.825rem] text-ondark-muted">
                    {tier.subtitle}
                  </p>
                  <p className="mb-7 text-[0.775rem] font-semibold text-accent-700">
                    ⏱ {tier.timeline}
                  </p>

                  <div className="mb-6">
                    <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-wider text-ondark-muted">
                      Dahil
                    </p>
                    <ul className="flex list-none flex-col gap-2.5">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-[0.825rem] leading-normal text-ondark"
                        >
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#4ade80]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.notIncluded.length > 0 && (
                    <div className="mb-7">
                      <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-wider text-ondark-muted">
                        Dahil Değil
                      </p>
                      <ul className="flex list-none flex-col gap-2">
                        {tier.notIncluded.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-[0.8rem] leading-normal text-ondark-muted"
                          >
                            <X size={14} className="mt-0.5 shrink-0 text-ondark-muted" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    href={tier.ctaHref}
                    className={`btn w-full ${tier.highlight ? "btn-primary" : "btn-outline-dark"}`}
                  >
                    {tier.cta}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-dark-200 px-6 pb-20 pt-16">
          <div className="mx-auto max-w-[700px]">
            <Reveal>
              <h2 className="mb-10 text-center text-[1.75rem] font-extrabold tracking-tight text-white">
                Sık Sorulan Sorular
              </h2>
            </Reveal>
            <div className="flex flex-col gap-6">
              {faqItems.map((item) => (
                <div key={item.q} className="border-b border-dark-200 pb-6">
                  <h3 className="mb-2.5 text-[0.95rem] font-bold text-white">
                    {item.q}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed text-ondark-muted">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="mb-5 text-[0.875rem] text-ondark-muted">
                Projeniz bu paketlere tam uymuyorsa özel fiyat talep edin.
              </p>
              <Link href="/ucretsiz-analiz" className="btn btn-primary">
                Ücretsiz Analiz İste
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
