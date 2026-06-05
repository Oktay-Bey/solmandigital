import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, ShoppingCart, Bot } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import AILeadForm from "./AILeadForm"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Yapay Zeka & AI Otomasyon Hizmeti | Solman Digital İstanbul",
  description:
    "GPT-4o ile içerik otomasyonu, chatbot, ürün açıklama üretimi ve iş süreçleri otomasyonu. Türkiye'de AI entegrasyonu — somut ROI, 3-6 hafta kurulum.",
  keywords: [
    "yapay zeka otomasyon",
    "ai içerik otomasyonu",
    "gpt entegrasyon",
    "ai iş otomasyonu türkiye",
    "yapay zeka içerik üretimi",
    "chatbot geliştirme",
    "otomasyon yazılımı türkiye",
    "ai otomasyon istanbul",
  ],
  alternates: { canonical: `${siteConfig.url}/ai-otomasyon-hizmeti` },
  openGraph: {
    title: "Yapay Zeka & AI Otomasyon Hizmeti | Solman Digital",
    description: "GPT-4o ile içerik otomasyonu, chatbot ve iş süreci otomasyonu. 3-6 hafta kurulum.",
    url: `${siteConfig.url}/ai-otomasyon-hizmeti`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "AI & Yapay Zeka Otomasyon Hizmeti",
      description:
        "GPT-4o ve Claude AI ile içerik otomasyonu, müşteri hizmetleri chatbotu ve iş süreci otomasyonu geliştirme.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: `${siteConfig.url}/ai-otomasyon-hizmeti`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "AI otomasyon kurulumu ne kadar sürer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Projenin kapsamına göre 3-6 hafta arasında değişir. İçerik otomasyonu gibi tek bir süreç için 2-3 haftada canlıya geçebiliriz.",
          },
        },
        {
          "@type": "Question",
          name: "Hangi AI modellerini kullanıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OpenAI GPT-4o, Anthropic Claude ve Serper API'yi kullanıyoruz. Projeye göre en uygun modeli birlikte seçiyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Mevcut sistemlerimize entegrasyon yapılabilir mi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. WordPress, Shopify, Trendyol/Hepsiburada panelleri, CRM sistemleri ve REST API'ye sahip her platforma entegrasyon yapabiliyoruz.",
          },
        },
      ],
    },
  ],
}

const examples = [
  {
    icon: FileText,
    label: "İçerik Otomasyonu",
    before: "Blog makalesi başına 3 saat",
    after: "AI ile 20 dakika",
    saving: "%89 zaman tasarrufu",
  },
  {
    icon: ShoppingCart,
    label: "Ürün Açıklamaları",
    before: "200 ürün = 40 saat manuel iş",
    after: "200 ürün = 2 saat",
    saving: "%95 zaman tasarrufu",
  },
  {
    icon: Bot,
    label: "Müşteri Chatbotu",
    before: "Sorguların %70'i tekrarlıyor",
    after: "7/24 otomatik yanıt",
    saving: "Destek maliyeti -%60",
  },
]

const services = [
  {
    title: "AI İçerik & Blog Otomasyonu",
    desc: "SEO uyumlu blog içeriği, sosyal medya paylaşımları ve haber özetlerini otomatik üretin.",
    href: "/hizmetler/ai-icerik-otomasyonu",
  },
  {
    title: "Ürün Açıklama Otomasyonu",
    desc: "Trendyol, Hepsiburada ve web siteniz için yüzlerce ürün açıklamasını saniyeler içinde oluşturun.",
    href: "/hizmetler/urun-aciklama-otomasyonu",
  },
  {
    title: "AI Müşteri Chatbotu",
    desc: "Sık sorulan soruları otomatik yanıtlayan, satış öncesi destek sağlayan akıllı chatbot.",
    href: "/hizmetler/ai-musteri-chatbotu",
  },
]

export default function AIOtomasyonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-20 pt-24">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="mb-6 inline-block rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
              GPT-4o · Claude · Özel AI Sistemleri
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(2rem,5vw,3rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              Yapay Zeka ile İş Süreçlerinizi Otomatize Edin
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-10 max-w-[600px] text-[1.05rem] leading-[1.75] text-ondark-muted">
              Günde kaç saatinizi tekrar eden işlere harcıyorsunuz? İçerik üretimi, ürün açıklamaları, müşteri soruları — bunların hepsini AI ile otomatize edebilirsiniz.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a href="#form" className="btn btn-primary">
              Ücretsiz AI Analizi İste <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* AI Ne Zaman Mantıklı? */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="eyebrow mb-3">Gerçek Sonuçlar</p>
            <h2 className="mb-12 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              AI Ne Zaman Mantıklı?
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {examples.map((ex, i) => (
              <Reveal key={ex.label} delay={i * 100}>
                <div className="card flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-accent-200 bg-accent-50">
                    <ex.icon size={20} className="text-accent-700" />
                  </div>
                  <p className="text-[0.95rem] font-bold text-ink-900">{ex.label}</p>
                  <div className="text-[0.85rem] text-ink-500">
                    <p className="mb-1">Öncesi: <span className="text-accent-700">{ex.before}</span></p>
                    <p>Sonrası: <strong className="text-ink-900">{ex.after}</strong></p>
                  </div>
                  <p className="self-start rounded border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-[0.25rem] text-[0.75rem] font-bold text-success">
                    {ex.saving}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmet Kataloğu */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              AI Otomasyon Hizmetleri
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {services.map((s, i) => (
              <Reveal key={s.href} delay={i * 100}>
                <Link
                  href={s.href}
                  className="card-interactive group flex flex-col gap-3"
                >
                  <p className="text-[0.95rem] font-bold text-ink-900">{s.title}</p>
                  <p className="text-[0.85rem] leading-[1.6] text-ink-500">{s.desc}</p>
                  <span className="text-[0.8rem] font-semibold text-accent-700 group-hover:underline">Detayları Gör →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Nasıl Çalışır?
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Mevcut süreçlerinizi ve tekrar eden iş yükünüzü haritalıyoruz." },
              { step: "02", title: "Prototip", desc: "AI modelini seçiyor, küçük ölçekte test ediyoruz." },
              { step: "03", title: "Entegrasyon", desc: "Mevcut sistemlerinize (WordPress, CRM, marketplace) bağlıyoruz." },
              { step: "04", title: "Canlı + İzleme", desc: "Sistemi devreye alıyor, çıktı kalitesini birlikte izliyoruz." },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 100}>
                <div className="flex items-start gap-5">
                  <span className="shrink-0 rounded-md border border-accent-200 bg-accent-50 px-2.5 py-[0.3rem] text-center text-[0.7rem] font-black text-accent-700">
                    {item.step}
                  </span>
                  <div>
                    <p className="mb-1 text-[0.95rem] font-bold text-ink-900">{item.title}</p>
                    <p className="text-[0.875rem] leading-[1.6] text-ink-500">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[600px]">
          <Reveal>
            <p className="eyebrow mb-3">Ücretsiz Analiz</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Otomasyon Potansiyelinizi Keşfedin
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ink-500">
              Hangi süreçlerinizin otomasyon potansiyeli taşıdığını ücretsiz analiz ediyoruz.
            </p>
          </Reveal>
          <div className="rounded-[12px] border border-ink-200 bg-white p-10">
            <AILeadForm />
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="bg-dark-500 px-6 py-12 text-center">
        <div className="mx-auto max-w-[560px]">
          <p className="mb-4 text-[0.9rem] text-ondark-muted">
            Emin değil misiniz? Önce mevcut sitenizin ve içerik yapınızın AI hazırlığını ücretsiz değerlendirin.
          </p>
          <Link href="/ucretsiz-analiz" className="btn btn-outline-dark">
            Ücretsiz Site Analizi <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
