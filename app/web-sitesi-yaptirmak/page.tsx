import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, X, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import WebSiteLeadForm from "./WebSiteLeadForm"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Web Sitesi Yaptırmak | Kurumsal Web Sitesi Fiyatları 2025 | Solman Digital",
  description:
    "Kurumsal web sitesi yaptırmak mı istiyorsunuz? Next.js ile şablonsuz, hızlı ve SEO uyumlu web siteleri geliştiriyoruz. 5-10 iş günü teslim, sabit fiyat. İstanbul.",
  keywords: [
    "web sitesi yaptırmak",
    "kurumsal web sitesi fiyatları",
    "web sitesi yaptırmak istiyorum",
    "şirket web sitesi yaptırmak",
    "profesyonel web sitesi yaptırma",
    "kurumsal web sitesi fiyatları 2025",
    "web sitesi yaptırma fiyatı",
    "web sitesi yaptırmak istanbul",
  ],
  alternates: { canonical: `${siteConfig.url}/web-sitesi-yaptirmak` },
  openGraph: {
    title: "Web Sitesi Yaptırmak | Kurumsal Web Sitesi Fiyatları 2025",
    description: "Şablonsuz, hızlı ve SEO uyumlu kurumsal web siteleri. 5-10 iş günü teslim, sabit fiyat.",
    url: `${siteConfig.url}/web-sitesi-yaptirmak`,
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
      name: "Kurumsal Web Sitesi Geliştirme",
      description: "Next.js ile şablonsuz, hızlı ve SEO uyumlu kurumsal web sitesi geliştirme. 5-10 iş günü teslim, sabit fiyat garantisi.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      priceRange: "₺8.000 – ₺100.000",
      areaServed: "TR",
      url: `${siteConfig.url}/web-sitesi-yaptirmak`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Kurumsal web sitesi fiyatları ne kadar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Landing page için ₺8.000–₺15.000, kurumsal tanıtım sitesi için ₺15.000–₺35.000, e-ticaret sitesi için ₺25.000–₺60.000 arasında değişmektedir. Sabit fiyat garantisi veriyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Web sitesi kaç günde teslim edilir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Landing page ve basit kurumsal siteler 5-7 iş günü, kapsamlı kurumsal siteler 10-15 iş günü içinde teslim edilir.",
          },
        },
        {
          "@type": "Question",
          name: "WordPress şablon mu kullanıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hayır. Her projeyi Next.js ile sıfırdan geliştiriyoruz. Kaynak kod size ait, aylık platform ücreti yok.",
          },
        },
        {
          "@type": "Question",
          name: "Teslim sonrası destek veriyor musunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. Tüm projelerimize 1 ay ücretsiz teknik destek dahildir.",
          },
        },
      ],
    },
  ],
}

const pricingTiers = [
  {
    name: "Landing Page",
    price: "₺8.000 – ₺15.000",
    days: "5-7 iş günü",
    features: ["1 sayfa dönüşüm odaklı tasarım", "Mobil uyumlu", "Form entegrasyonu", "Temel SEO"],
  },
  {
    name: "Kurumsal Site",
    price: "₺15.000 – ₺35.000",
    days: "10-15 iş günü",
    features: ["5-15 sayfa", "Blog / haber modülü", "İletişim formu", "Teknik SEO altyapısı"],
    highlight: true,
  },
  {
    name: "E-Ticaret",
    price: "₺25.000 – ₺60.000",
    days: "15-20 iş günü",
    features: ["Ürün kataloğu", "İyzico / Stripe entegrasyon", "Sepet ve ödeme", "Yönetim paneli"],
  },
]

const comparison = [
  { feature: "Yükleme hızı", template: "3-8 saniye", custom: "< 1 saniye" },
  { feature: "SEO optimizasyonu", template: "Plugin bağımlı", custom: "Kod seviyesinde" },
  { feature: "Kaynak kod sahipliği", template: "Yok", custom: "Tamamen size ait" },
  { feature: "Aylık platform ücreti", template: "₺300–₺2.000", custom: "Yok" },
  { feature: "Tasarım benzersizliği", template: "Binlerce aynı site", custom: "Sadece sizin siteniz" },
]

export default function WebSitesiYaptirmakPage() {
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
              5-10 İş Günü Teslim
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              Web Sitesi Yaptırın — Şablon Yok, Gecikme Yok
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-10 max-w-[580px] text-[1.05rem] leading-[1.75] text-ondark-muted">
              Büyük yazılım ofisi maliyeti olmadan, net takvim ve sabit fiyatla garantili teslim.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="#form" className="btn btn-primary">
                Ücretsiz Fiyat Teklifi Al <ArrowRight size={16} />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Merhaba, web sitesi yaptırmak istiyorum, fiyat öğrenmek istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-ondark-faint text-ondark hover:border-ondark"
              >
                <MessageCircle size={15} /> WhatsApp ile Yazın
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[960px]">
          <Reveal>
            <p className="eyebrow mb-3">Fiyat Şeffaflığı</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Fiyatları Gizlemiyoruz
            </h2>
            <p className="mb-10 text-[0.9rem] text-ink-500">
              Çoğu yer &quot;bize ulaşın&quot; der. Biz doğrudan söylüyoruz.
            </p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100}>
                <div
                  className={`relative rounded-xl p-8 ${
                    tier.highlight
                      ? "border-2 border-accent-700 bg-accent-50"
                      : "border border-ink-200 bg-white"
                  }`}
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-700 px-3 py-[0.2rem] text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
                      En Çok Tercih Edilen
                    </span>
                  )}
                  <p className="mb-2 text-[1rem] font-extrabold text-ink-900">{tier.name}</p>
                  <p className="mb-1 text-[1.375rem] font-black tracking-[-0.02em] text-accent-700">
                    {tier.price}
                  </p>
                  <p className="mb-6 text-[0.775rem] text-ink-400">{tier.days}</p>
                  <div className="flex flex-col gap-2.5">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <CheckCircle size={15} className="shrink-0 text-success" />
                        <span className="text-[0.85rem] text-ink-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Şablon Site mi, Özel Kod mu?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-[10px] border border-ink-200 bg-white">
              <div className="grid grid-cols-[2fr_1fr_1fr] bg-dark-500 px-5 py-3.5">
                <span className="text-[0.75rem] font-bold uppercase text-ondark-muted">Özellik</span>
                <span className="text-center text-[0.75rem] font-bold uppercase text-ondark-muted">Şablon</span>
                <span className="text-center text-[0.75rem] font-bold uppercase text-accent-700">Özel Kod</span>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[2fr_1fr_1fr] items-center px-5 py-3.5 ${
                    i > 0 ? "border-t border-ink-200" : ""
                  }`}
                >
                  <span className="text-[0.875rem] font-medium text-ink-600">{row.feature}</span>
                  <div className="flex items-center justify-center gap-1.5">
                    <X size={14} className="text-accent-700" />
                    <span className="text-[0.8rem] text-ink-400">{row.template}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <CheckCircle size={14} className="text-success" />
                    <span className="text-[0.8rem] font-semibold text-ink-700">{row.custom}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Teslim Süreci
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { step: "01", title: "Brifing", desc: "Hedeflerinizi, tasarım tercihlerinizi ve teknik gereksinimlerinizi belirliyoruz.", days: "Gün 1" },
              { step: "02", title: "Geliştirme", desc: "Next.js ile sıfırdan kod yazıyoruz. Her 3 günde bir ilerleme güncellemesi gönderiyoruz.", days: "Gün 2-8" },
              { step: "03", title: "Revizyon", desc: "Geri bildirimlerinizi alıyor, ince ayarları yapıyoruz. 2 revizyon turu dahil.", days: "Gün 9-10" },
              { step: "04", title: "Canlıya Geçiş", desc: "Domain bağlantısı, Vercel deployment, SSL — her şey hazır. Testleri birlikte yapıyoruz.", days: "Gün 10-12" },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 100}>
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <span className="block min-w-9 rounded-md border border-accent-200 bg-accent-50 px-2.5 py-[0.3rem] text-center text-[0.7rem] font-black text-accent-700">
                      {item.step}
                    </span>
                    <p className="mt-1 text-center text-[0.65rem] font-semibold text-ink-400">{item.days}</p>
                  </div>
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

      {/* Portfolio teaser */}
      <section className="bg-surface px-6 py-14 text-center">
        <Reveal>
          <p className="mb-4 text-[0.9rem] text-ink-500">
            Geliştirdiğimiz projelere göz atmak ister misiniz?
          </p>
          <Link href="/portfoy" className="btn btn-outline">
            Portföyü Gör <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <h2 className="mb-8 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink-900">
              Sık Sorulan Sorular
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {[
              { q: "Kurumsal web sitesi fiyatları ne kadar?", a: "Landing page için ₺8.000–₺15.000, kurumsal tanıtım sitesi için ₺15.000–₺35.000, e-ticaret sitesi için ₺25.000–₺60.000 arasında değişmektedir. Sabit fiyat garantisi veriyoruz; teklif sonrası fiyat değişmez." },
              { q: "Web sitesi kaç günde teslim edilir?", a: "Landing page ve basit kurumsal siteler 5–7 iş günü, kapsamlı kurumsal siteler 10–15 iş günü içinde teslim edilir. Proje kapsamını teklif aşamasında netleştirir, takvimi yazılı olarak sunuyoruz." },
              { q: "WordPress şablon mu kullanıyorsunuz?", a: "Hayır. Her projeyi Next.js ile sıfırdan geliştiriyoruz. Kaynak kod tamamen size aittir, aylık platform ücreti yoktur. Şablon sitelerde yaşanan yavaşlık ve güvenlik sorunlarını bu yaklaşımla ortadan kaldırıyoruz." },
              { q: "Teslim sonrası destek veriyor musunuz?", a: "Evet. Tüm projelere 1 ay ücretsiz teknik destek dahildir. Sonrasında aylık bakım paketi alabilir ya da kaynak kodla kendi geliştiricinizle devam edebilirsiniz." },
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
      <section id="form" className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[600px]">
          <Reveal>
            <p className="eyebrow mb-3">Ücretsiz Teklif</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Fiyat Teklifinizi Alın
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ink-500">
              Projenizi kısaca anlatın, 24 saat içinde detaylı fiyat teklifi gönderelim.
            </p>
          </Reveal>
          <div className="rounded-[12px] border border-ink-200 bg-surface p-10">
            <WebSiteLeadForm />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-dark-500 px-6 py-12">
        <div className="mx-auto max-w-[900px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {[
              "Aylık platform ücreti yok",
              "Kaynak kod size ait",
              "1 ay ücretsiz destek",
              "Sabit fiyat garantisi",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2.5">
                <CheckCircle size={16} className="shrink-0 text-success" />
                <span className="text-[0.825rem] font-medium text-ondark-muted">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
