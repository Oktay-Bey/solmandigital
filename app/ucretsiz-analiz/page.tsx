import type { Metadata } from "next"
import { Search, Zap, BarChart3, CheckCircle2, Clock, Shield, MessageCircle } from "lucide-react"
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

const steps = [
  {
    no: "01",
    title: "Formu Doldurun",
    desc: "Web sitesi URL'nizi ve e-posta adresinizi girin — 90 saniye sürer.",
  },
  {
    no: "02",
    title: "Analiz Yapılır",
    desc: "Teknik SEO, Core Web Vitals ve rakip karşılaştırması araçlarla ve gözle incelenir.",
  },
  {
    no: "03",
    title: "Rapor Gelir",
    desc: "24 saat içinde somut bulgular ve öncelikli aksiyonlar e-postanıza gönderilir.",
  },
]

const socialProof = [
  { value: "40+", label: "Tamamlanan Proje" },
  { value: "24 sa", label: "Ortalama Geri Dönüş" },
  { value: "3+ yıl", label: "Sektör Deneyimi" },
  { value: "0 ₺", label: "Analiz Ücreti" },
]

export default function UcretsizAnalizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(auditSchema) }}
      />

      {/* Hero — split layout: sol değer önerisi, sağ form */}
      <section className="bg-dark-500 px-6 pb-16 pt-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sol: başlık + ne alacaksın */}
          <div>
            <Reveal>
              <p className="mb-5 inline-block rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
                Ücretsiz · Bağlayıcı Değil
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-white">
                Web sitenizi ücretsiz analiz ediyoruz —{" "}
                <span className="text-accent-700">24 saatte sonuç</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mb-6 text-[0.95rem] leading-loose text-ondark-muted">
                Analiz raporunuzda şunları bulacaksınız:
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Kaybettiğiniz organik trafik kaynakları",
                  "En kritik 3 teknik SEO hatası ve çözümü",
                  "Sektörünüzdeki rakiple görünürlük karşılaştırması",
                  "Core Web Vitals skoru ve sayfa hızı engelleri",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ondark-muted">
                    <span className="mt-0.5 shrink-0 text-[#4ade80]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-7 flex flex-wrap gap-5">
                {[
                  { icon: Clock, text: "24 saat içinde" },
                  { icon: Shield, text: "Bilgileriniz paylaşılmaz" },
                  { icon: CheckCircle2, text: "Tamamen ücretsiz" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <Icon size={14} className="text-success" />
                    <span className="text-[0.8rem] font-medium text-ondark-muted">{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sağ: form */}
          <Reveal delay={150} className="order-first lg:order-last">
            <div className="rounded-[14px] border border-dark-50 bg-white p-8 shadow-xl">
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">Ücretsiz Analiz</p>
              <h2 className="mb-3 text-[1.1rem] font-extrabold tracking-tight text-ink-900">
                Sitenizin analiz raporunu alın
              </h2>
              <p className="mb-5 flex items-center gap-1.5 text-[0.78rem] text-ink-500">
                <span className="text-[#16a34a]">●</span>
                24 saat içinde e-postanıza gönderilir
              </p>
              <AuditForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Proof Numbers */}
      <section className="border-b border-ink-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-[760px]">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {socialProof.map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <div className="text-center">
                  <p className="mb-1 text-[1.75rem] font-black tracking-[-0.03em] text-accent-700">{item.value}</p>
                  <p className="text-[0.78rem] font-medium text-ink-500">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ne Alacaksınız */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="mb-10 text-center text-[1.375rem] font-extrabold tracking-tight text-ink-900">
              Analizde Neler İnceleniyor?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {auditFeatures.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-[10px] border border-ink-200 bg-white p-7">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] border border-accent-200 bg-accent-50">
                    <item.icon size={20} color="#9b1c1c" />
                  </div>
                  <h3 className="mb-2 text-[0.95rem] font-bold text-ink-900">{item.title}</h3>
                  <p className="text-[0.85rem] leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl İşler */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-center text-[1.375rem] font-extrabold tracking-tight text-ink-900">
              Nasıl İşler?
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-0">
            {steps.map((step, i) => (
              <Reveal key={step.no} delay={i * 100} className="relative flex flex-1 flex-col items-center text-center px-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-[0.75rem] font-black text-accent-700 border border-accent-200">
                  {step.no}
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+24px)] top-6 hidden h-px w-[calc(100%-48px)] bg-ink-200 sm:block" />
                )}
                <p className="mb-1.5 text-[0.9rem] font-bold text-ink-900">{step.title}</p>
                <p className="text-[0.82rem] leading-[1.6] text-ink-500">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section className="bg-dark-500 px-6 py-12 text-center">
        <div className="mx-auto max-w-[520px]">
          <p className="mb-4 text-[0.9rem] text-ondark-muted">
            Formu doldurmak yerine doğrudan konuşmayı tercih ederseniz:
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Merhaba, web sitem için ücretsiz analiz talep etmek istiyorum.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#25D366] px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-[#1eb955]"
          >
            <MessageCircle size={16} />
            WhatsApp ile Yazın
          </a>
        </div>
      </section>
    </>
  )
}
