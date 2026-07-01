import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import SaasLeadForm from "./SaasLeadForm"
import Reveal from "@/components/Reveal"
import RelatedGuides from "@/components/RelatedGuides"
import WhatsAppLink from "@/components/WhatsAppLink"

export const metadata: Metadata = {
  title: "SaaS Platform & Web Uygulama Geliştirme — 4-8 Haftada MVP | Solman Digital",
  description:
    "SaaS ürünü, CRM, müşteri paneli veya işinize özel web uygulaması — Next.js, Supabase ve Stripe ile geliştirelim. ₺25.000'den sabit fiyat, kaynak kodu sizin. 4-8 haftada MVP.",
  keywords: [
    "saas platform geliştirme",
    "saas yazılım geliştirme türkiye",
    "mvp geliştirme istanbul",
    "saas uygulama yaptırmak",
    "web uygulama geliştirme",
    "next.js saas",
    "saas startup türkiye",
    "yazılım geliştirme hizmeti",
  ],
  alternates: { canonical: `${siteConfig.url}/saas-platform-gelistirme` },
  openGraph: {
    title: "SaaS Platform & Web Uygulama Geliştirme — 4-8 Haftada MVP | Solman Digital",
    description: "SaaS ürünü, CRM, panel veya web uygulaması. ₺25.000'den sabit fiyat, 4-8 haftada MVP, kaynak kodu sizin.",
    url: `${siteConfig.url}/saas-platform-gelistirme`,
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
      name: "SaaS Platform Geliştirme",
      description:
        "Next.js, Supabase ve Stripe ile SaaS uygulama geliştirme. Multi-tenant mimari, abonelik sistemi, RBAC ve dashboard.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: `${siteConfig.url}/saas-platform-gelistirme`,
      offers: {
        "@type": "Offer",
        priceCurrency: "TRY",
        price: "25000",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "TRY",
          minPrice: "25000",
          description: "Kapsama göre sabit fiyat, ₺25.000'den başlayan",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "SaaS MVP kaç haftada hazır olur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Kapsama göre 4-8 hafta. Temel auth, dashboard ve abonelik sistemi için 4 hafta yeterlidir.",
          },
        },
        {
          "@type": "Question",
          name: "Hangi teknoloji stack kullanıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Next.js 16, Supabase (auth + database), Stripe (ödeme), Vercel (hosting). Projeye göre farklı seçimler de yapabiliriz.",
          },
        },
        {
          "@type": "Question",
          name: "Multi-tenant mimari kurabilir misiniz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. Subdomain tabanlı ya da path tabanlı multi-tenant mimariler geliştiriyoruz. Row-level security Supabase ile kolayca uygulanıyor.",
          },
        },
      ],
    },
  ],
}

const modules = [
  { title: "Auth & Oturum", desc: "E-posta, Google, magic link ile giriş. Şifremi unuttum, e-posta doğrulama." },
  { title: "Multi-Tenant", desc: "Her müşteri kendi workspace'inde. Subdomain veya path tabanlı izolasyon." },
  { title: "Abonelik & Billing", desc: "Stripe ile aylık/yıllık planlar, freemium gate, fatura kesme." },
  { title: "RBAC", desc: "Admin, yönetici, üye rolleri. Her rol için izin matrisi." },
  { title: "Analytics Dashboard", desc: "Kullanıcı aktivitesi, gelir metrikleri, churn takibi." },
  { title: "Transactional Email", desc: "Hoş geldin, fatura, şifre sıfırlama e-postaları. Resend entegrasyonu." },
]

const techComparison = [
  { choice: "Next.js", instead: "Laravel / Django", why: "Full-stack TypeScript, edge-ready, Vercel'e kolay deploy" },
  { choice: "Supabase", instead: "Firebase", why: "PostgreSQL + Row-level security + realtime, açık kaynak" },
  { choice: "Stripe", instead: "Özel ödeme", why: "Olgun webhook sistemi, global kart desteği, PCI compliance" },
]

export default function SaasPlatformGelistirmePage() {
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
              SaaS · CRM · Panel · Web Uygulaması
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              İşinize Özel Web Uygulaması — 4-8 Haftada Canlıda
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-10 max-w-[580px] text-[1.05rem] leading-[1.75] text-ondark-muted">
              Abonelikli SaaS ürünü, müşteri paneli, CRM veya iş süreci uygulaması — hazır altyapı modülleriyle (auth, ödeme, dashboard) aylar değil haftalar içinde kullanıma alın.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="#form" className="btn btn-primary">
                Sabit Fiyat Teklifi Al <ArrowRight size={16} />
              </a>
              <WhatsAppLink
                message="Merhaba, SaaS platform geliştirmek istiyorum, bilgi almak istiyorum."
                source="saas_hero"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-700 px-5 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-accent-800"
              >
                <MessageCircle size={15} /> WhatsApp ile Yazın
              </WhatsAppLink>
            </div>
            <p className="mt-4 text-[0.8rem] text-ondark-muted">
              ₺25.000&apos;den sabit fiyat · Kaynak kodu sizin · 4-8 haftada MVP
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pre-built Modules */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[960px]">
          <Reveal>
            <p className="eyebrow mb-3">Hazır Altyapı</p>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Her SaaS&apos;ta Olması Gereken Modüller
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {modules.map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <div className="card flex flex-col gap-2">
                  <p className="text-[0.95rem] font-bold text-ink-900">{m.title}</p>
                  <p className="text-[0.85rem] leading-[1.6] text-ink-500">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MVP Timeline */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              MVP Takvimi
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { weeks: "Hafta 1-2", title: "Planlama & Mimari", desc: "Teknik stack kararları, veritabanı tasarımı, proje yönetim kurulumu." },
              { weeks: "Hafta 2-4", title: "Core Özellikler", desc: "Ana iş mantığı, CRUD operasyonları, temel dashboard." },
              { weeks: "Hafta 4-6", title: "Auth & Billing", desc: "Kullanıcı girişi, abonelik planları, Stripe entegrasyonu." },
              { weeks: "Hafta 6-8", title: "Polish & Deploy", desc: "UI iyileştirmeleri, hata yakalama, Vercel deployment, domain bağlantısı." },
            ].map((item, i) => (
              <Reveal key={item.weeks} delay={i * 100}>
                <div className="flex items-start gap-5">
                  <span className="shrink-0 whitespace-nowrap rounded-md border border-accent-200 bg-accent-50 px-2.5 py-[0.3rem] text-center text-[0.65rem] font-bold text-accent-700">
                    {item.weeks}
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

      {/* Fiyat şeffaflığı — LPE (saas platform keyword'ü için) */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="eyebrow mb-3">Fiyatlandırma</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              ₺25.000&apos;den Başlayan, Sabit Fiyat
            </h2>
            <p className="mb-8 max-w-[600px] text-[0.9rem] leading-[1.7] text-ink-500">
              SaaS projeleri kapsama göre fiyatlanır — temel MVP ₺25.000&apos;den başlar,
              çok kiracılı mimari, abonelik altyapısı ve özel modüllerle kapsam genişledikçe
              artar. Proje kapsamı netleştikten sonra sabit fiyat teklifi sunuyoruz; saat
              bazlı faturalandırma yok. Sözleşme + e-fatura, kaynak kodu size aittir.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.85rem] text-ink-600">
              <span className="inline-flex items-center gap-2">
                <span className="text-accent-700">●</span> MVP başlangıç: <strong className="text-ink-900">₺25.000+</strong>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-accent-700">●</span> Sabit fiyat, sürpriz maliyet yok
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-accent-700">●</span> Kaynak kodu sizin
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tech Choices */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Neden Bu Teknolojileri Seçiyoruz?
            </h2>
          </Reveal>
          <div className="flex flex-col gap-4">
            {techComparison.map((t, i) => (
              <Reveal key={t.choice} delay={i * 100}>
                <div className="grid grid-cols-[120px_120px_1fr] items-center gap-4 rounded-[8px] border border-ink-200 p-5">
                  <div>
                    <p className="text-[0.95rem] font-extrabold text-ink-900">{t.choice}</p>
                    <p className="text-[0.7rem] text-ink-400">Seçimimiz</p>
                  </div>
                  <div>
                    <p className="text-[0.8rem] text-ink-400">yerine {t.instead}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="mt-0.5 shrink-0 text-success" />
                    <p className="text-[0.85rem] leading-[1.5] text-ink-600">{t.why}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <h2 className="mb-8 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink-900">
              Sık Sorulan Sorular
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {[
              { q: "SaaS MVP kaç haftada hazır olur?", a: "Kapsama göre 4–8 hafta. Auth, dashboard ve Stripe abonelik sistemi içeren temel bir MVP için 4 hafta yeterlidir. Karmaşık iş mantığı veya üçüncü taraf entegrasyonları gerektiren projeler 6–8 haftaya uzayabilir." },
              { q: "Hangi teknoloji stack kullanıyorsunuz?", a: "Next.js 16, Supabase (auth + PostgreSQL), Stripe (abonelik), Vercel (hosting). Bu stack, hızlı geliştirme ve düşük operasyonel yük sağlar. Farklı tercihleriniz varsa proje öncesinde birlikte değerlendiririz." },
              { q: "Multi-tenant mimari kurabilir misiniz?", a: "Evet. Subdomain tabanlı (firma.uygulama.com) veya path tabanlı (/firma/...) her iki mimarıyi de geliştiriyoruz. Supabase Row Level Security ile kiracılar arası veri izolasyonu sağlanır." },
              { q: "Kaynak kod bize mi ait olur?", a: "Evet, kaynak kod tamamen sizindir. GitHub reponuza aktarılır, aylık lisans veya platform ücreti ödemeniz gerekmez. İstediğiniz geliştirici ile sonrasında çalışabilirsiniz." },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-ink-200 py-5">
                <h3 className="mb-2 text-[0.95rem] font-bold text-ink-900">{faq.q}</h3>
                <p className="text-[0.875rem] leading-[1.65] text-ink-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[600px]">
          <Reveal>
            <p className="eyebrow mb-3">Proje Teklifi</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Projenizi Anlatalım
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ink-500">
              Ne geliştirmek istediğinizi seçin, iletişim bilginizi bırakın — 24 saat içinde teknik fizibilite ve sabit fiyat teklifi gönderelim.
            </p>
          </Reveal>
          <div className="rounded-[12px] border border-ink-200 bg-white p-10">
            <SaasLeadForm />
          </div>
        </div>
      </section>

      {/* Calendly Push */}
      <section className="bg-dark-500 px-6 py-12 text-center">
        <div className="mx-auto max-w-[560px]">
          <p className="mb-4 text-[0.9rem] text-ondark-muted">
            SaaS projeleri için önce 30 dakika konuşalım — form doldurmadan da randevu alabilirsiniz.
          </p>
          <Link href="/danismanlik" className="btn btn-outline-dark">
            Ücretsiz Danışmanlık Seansı <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <RelatedGuides category={["saas", "karsilastirma", "web-sitesi"]} title="SaaS Geliştirme Hakkında Rehberler" />

      {/* TicaretHub — SaaS Örnek & Araçlar */}
      <section className="border-t border-ink-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <div className="rounded-[10px] border border-ink-200 bg-surface p-6">
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">
                Canlı SaaS Örneği
              </p>
              <p className="mb-3 text-[0.9rem] font-bold text-ink-900">
                TicaretHub — Türk e-ticaret satıcıları için SaaS platform
              </p>
              <p className="mb-5 max-w-[520px] text-[0.825rem] leading-[1.65] text-ink-500">
                Ürettiğimiz SaaS ürünlerden biri olan{" "}
                <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-700 hover:underline">TicaretHub</a>
                , e-ticaret satıcılarına araçlar, entegrasyonlar ve yapay zeka özellikleri sunar. Kendi SaaS projeniz için somut referans olarak inceleyebilirsiniz.
              </p>
              <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-accent-700 hover:underline">
                TicaretHub&apos;u incele →
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
