import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, X, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"
import FiyatlarLeadForm from "./FiyatlarLeadForm"

export const metadata: Metadata = {
  title: "Web Sitesi & Yazılım Fiyatları 2026 | Solman Digital",
  description:
    "Kurumsal web sitesi, e-ticaret, SaaS ve AI otomasyon fiyatları 2026. ₺8.000'dan başlayan fiyatlarla profesyonel yazılım geliştirme. Ücretsiz kapsam görüşmesi.",
  keywords: [
    "web sitesi fiyatları 2026",
    "kurumsal web sitesi ne kadar",
    "e-ticaret sitesi fiyatı",
    "saas geliştirme maliyeti",
    "yazılım geliştirme fiyatları istanbul",
    "web sitesi yaptırma fiyatı 2026",
    "trendyol entegrasyonu fiyatı",
    "ai otomasyon maliyeti",
  ],
  alternates: { canonical: `${siteConfig.url}/fiyatlar` },
  openGraph: {
    title: "Web Sitesi & Yazılım Fiyatları 2026 | Solman Digital",
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
  waMsg: string
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
    cta: "Teklif Al",
    ctaHref: "#fiyat-form",
    waMsg: "Merhaba, Web Sitesi paketi hakkında fiyat teklifi almak istiyorum (₺8.000 başlangıç).",
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
      "Trendyol/Hepsiburada senkronizasyonu (opsiyonel +₺8.000)",
      "Stok & varyant yönetimi",
      "SEO + performans kurulumu",
      "SSL + Vercel deploy",
      "1 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Ürün fotoğrafçılığı ve içerik yazımı", "Pazaryeri aylık bakım ücreti"],
    cta: "Teklif Al",
    ctaHref: "#fiyat-form",
    waMsg: "Merhaba, E-Ticaret paketi hakkında fiyat teklifi almak istiyorum (₺20.000 başlangıç).",
  },
  {
    name: "Marketplace Entegrasyonu",
    price: "₺8.000",
    subtitle: "Trendyol, Hepsiburada, n11 API",
    timeline: "5–10 iş günü",
    features: [
      "Trendyol / Hepsiburada / n11 API bağlantısı",
      "Otomatik stok & fiyat senkronizasyonu",
      "Sipariş yönetim dashboard'u",
      "Webhook ile gerçek zamanlı güncelleme",
      "Çoklu pazaryeri tek panelden yönetim",
      "1 ay ücretsiz teknik destek",
    ],
    notIncluded: ["Yeni e-ticaret sitesi geliştirme", "Pazaryeri hesap açılışı"],
    cta: "Teklif Al",
    ctaHref: "#fiyat-form",
    waMsg: "Merhaba, Marketplace Entegrasyonu paketi hakkında fiyat teklifi almak istiyorum (₺8.000 başlangıç).",
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
    cta: "Teklif Al",
    ctaHref: "#fiyat-form",
    waMsg: "Merhaba, SaaS & AI paketi hakkında fiyat teklifi almak istiyorum (₺50.000 başlangıç).",
  },
]

export default function FiyatlarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Sticky mobile WhatsApp bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 border-t border-dark-200 bg-dark-500 px-4 py-3 shadow-2xl sm:hidden">
        <p className="text-[0.78rem] leading-tight text-ondark-muted">
          Hızlı fiyat almak<br />ister misiniz?
        </p>
        <a
          href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Merhaba, fiyat teklifi almak istiyorum.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary shrink-0 py-2 text-[0.82rem]"
        >
          <MessageCircle size={14} /> WhatsApp
        </a>
      </div>

      <main className="min-h-screen bg-dark-500 pb-20 sm:pb-0">
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
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/iletisim" className="btn btn-primary">
                  Ücretsiz Kapsam Görüşmesi
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Merhaba, fiyat hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </Reveal>

            {/* Risk-reversal güven şeridi */}
            <Reveal delay={340}>
              <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.78rem] text-ondark-muted">
                {[
                  "Sabit fiyat, sürpriz maliyet yok",
                  "Kaynak kodu tamamen sizde",
                  "İlk görüşme ücretsiz",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#4ade80]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Mini inline form — paket CTA'larının kaydığı hedef */}
            <Reveal delay={380}>
              <div
                id="fiyat-form"
                className="mt-12 scroll-mt-24 rounded-[14px] border border-dark-50 bg-dark-400 p-6 text-left sm:p-8"
              >
                <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">
                  Sana Özel Fiyat
                </p>
                <h2 className="mb-1.5 text-[1.1rem] font-extrabold tracking-tight text-white">
                  30 saniyede net teklif alın
                </h2>
                <p className="mb-5 text-[0.8rem] leading-relaxed text-ondark-muted">
                  Paketler başlangıç fiyatıdır — projenizin kapsamına göre net rakamı 24 saatte
                  e-postanıza gönderiyoruz. Bağlayıcı değil.
                </p>
                <FiyatlarLeadForm />
              </div>
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

                  <a
                    href={tier.ctaHref}
                    className={`btn w-full ${tier.highlight ? "btn-primary" : "btn-outline-dark"}`}
                  >
                    {tier.cta}
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(tier.waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 text-[0.78rem] font-medium text-ondark-muted hover:text-white transition-colors"
                  >
                    <MessageCircle size={13} /> Bu paketi istiyorum
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WhatsApp inline */}
        <section className="px-6 pb-4">
          <div className="mx-auto max-w-[700px]">
            <Reveal>
              <div className="flex items-center justify-between gap-4 rounded-[10px] border border-dark-50 bg-dark-400 px-6 py-4">
                <p className="text-[0.875rem] text-ondark-muted">
                  Hızlı karar vermek ister misiniz?
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Merhaba, fiyat hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark shrink-0 whitespace-nowrap text-[0.8rem]"
                >
                  <MessageCircle size={14} /> WhatsApp&apos;tan yazın
                </a>
              </div>
            </Reveal>
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
              <a href="#fiyat-form" className="btn btn-primary">
                Teklif Al
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* #27 TicaretHub vs Solman Digital — Self-serve karşılaştırma */}
        <section className="border-t border-dark-200 px-6 py-12">
          <div className="mx-auto max-w-[700px]">
            <Reveal>
              <h2 className="mb-6 text-center text-[1.25rem] font-extrabold tracking-tight text-white">
                Hangisi Size Uygun?
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Reveal delay={0}>
                <div className="rounded-[10px] border border-dark-50 bg-dark-400 p-6">
                  <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wider text-ondark-muted">Self-Serve</p>
                  <p className="mb-3 text-base font-bold text-white">
                    <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer" className="text-accent-700 hover:underline">TicaretHub</a>
                  </p>
                  <ul className="flex flex-col gap-2 text-[0.825rem] text-ondark-muted">
                    <li>✓ Kayıt ol, hemen kullan</li>
                    <li>✓ Komisyon & kâr hesaplama araçları</li>
                    <li>✓ AI ürün açıklaması motoru</li>
                    <li>✓ Aylık ₺499&apos;dan başlar</li>
                    <li className="text-ondark-faint">✗ Özel entegrasyon yok</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="rounded-[10px] border border-accent-700 bg-dark-300 p-6">
                  <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-wider text-ondark-muted">Özel Geliştirme</p>
                  <p className="mb-3 text-base font-bold text-accent-700">Solman Digital</p>
                  <ul className="flex flex-col gap-2 text-[0.825rem] text-ondark-muted">
                    <li>✓ Sizin altyapınıza özel kurulum</li>
                    <li>✓ API entegrasyonu & özel dashboard</li>
                    <li>✓ Mevcut sisteme entegre</li>
                    <li>✓ ₺8.000&apos;dan başlar, tek seferlik</li>
                    <li>✓ Kaynak kodu sizde kalır</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

