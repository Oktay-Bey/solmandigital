import type { Metadata } from "next"
import { Search, Zap, BarChart3, CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import AuditForm from "./AuditForm"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Ücretsiz Web Sitesi SEO & Performans Analizi | Solman Digital",
  description:
    "Web sitenizin teknik SEO, sayfa hızı ve rakip analizini ücretsiz yaptırın. 24 saat içinde detaylı rapor e-postanıza gönderilir.",
  keywords: [
    "ücretsiz seo analizi",
    "web sitesi teknik analiz",
    "site hız analizi",
    "rakip analizi",
    "ücretsiz web sitesi denetimi",
    "seo denetim raporu",
  ],
  alternates: { canonical: `${siteConfig.url}/ucretsiz-analiz` },
  openGraph: {
    title: "Ücretsiz Web Sitesi SEO & Performans Analizi",
    description: "Teknik SEO, sayfa hızı ve rakip analizi — ücretsiz. 24 saatte rapor.",
    url: `${siteConfig.url}/ucretsiz-analiz`,
    locale: "tr_TR",
  },
}

const auditSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ücretsiz Web Sitesi SEO ve Performans Analizi",
  description: "Solman Digital tarafından sunulan ücretsiz teknik SEO, sayfa hızı ve rakip analizi hizmeti.",
  provider: { "@type": "Organization", name: "Solman Digital", url: siteConfig.url },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
    description: "Ücretsiz, bağlayıcı olmayan web sitesi analizi",
  },
  areaServed: { "@type": "Country", name: "Turkey" },
}

const auditFeatures = [
  {
    icon: Search,
    title: "Teknik SEO Analizi",
    desc: "Meta etiketler, schema markup, canonical URL'ler, index durumu ve site yapısı incelenir.",
  },
  {
    icon: Zap,
    title: "Sayfa Hızı Değerlendirmesi",
    desc: "Core Web Vitals, LCP, CLS ve FID metrikleri Google standartlarıyla karşılaştırılır.",
  },
  {
    icon: BarChart3,
    title: "Rakip Karşılaştırması",
    desc: "Sektörünüzdeki en yakın 3 rakiple görünürlük ve teknik performans karşılaştırması yapılır.",
  },
]

export default function UcretsizAnalizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditSchema) }}
      />

      {/* Hero */}
      <section className="bg-dark-500 px-6 py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-wider text-accent-700">
              Ücretsiz Hizmet
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white">
              Web Sitenizin Ücretsiz<br />
              <span className="text-accent-700">SEO & Performans Analizi</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto max-w-[560px] text-base leading-loose text-ink-500">
              Teknik SEO sorunlarını, sayfa hızı problemlerini ve rakip açıklarını tespit edin.
              24 saat içinde detaylı rapor e-posta adresinize gönderilir.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ne Alacaksınız */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-10 text-center text-[1.375rem] font-extrabold tracking-tight text-ink-900">
            Analizde Neler İnceleniyor?
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {auditFeatures.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
              <div
                className="rounded-[10px] border border-ink-200 bg-surface p-7"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] border border-accent-200 bg-accent-50">
                  <item.icon size={20} color="#9b1c1c" />
                </div>
                <h3 className="mb-2 text-[0.95rem] font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="text-[0.85rem] leading-relaxed text-ink-500">{item.desc}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-[640px]">
          <div className="mb-8 text-center">
            <h2 className="mb-2.5 text-[1.375rem] font-extrabold tracking-tight text-ink-900">
              Analiz Talep Edin
            </h2>
            <p className="text-[0.9rem] text-ink-500">
              Formu doldurun, 24 saat içinde dönüş yapıyoruz.
            </p>
          </div>

          <div className="rounded-[12px] border border-ink-200 bg-white p-10">
            <AuditForm />
          </div>
        </div>
      </section>

      {/* Güven Rozetleri */}
      <section className="border-t border-dark-200 bg-dark-500 px-6 py-10">
        <div className="mx-auto max-w-[760px]">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "24 saat içinde rapor",
              "Tamamen ücretsiz",
              "Bağlayıcı değil",
              "Bilgileriniz paylaşılmaz",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle2 size={14} color="#16a34a" />
                <span className="text-[0.8rem] font-medium text-ink-400">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
