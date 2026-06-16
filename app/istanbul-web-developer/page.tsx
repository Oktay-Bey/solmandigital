import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, X, MapPin, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import IstanbulDevLeadForm from "./IstanbulDevLeadForm"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"

export const metadata: Metadata = {
  title: "İstanbul Web Developer — Beşiktaş Merkezli Next.js Uzmanı | Solman Digital",
  description:
    "İstanbul Beşiktaş merkezli web geliştirici. Next.js, TypeScript, Supabase. Büyük ofis maliyeti yok, belirsizlik yok. Doğrudan geliştirici ile çalışın.",
  keywords: [
    "istanbul web developer",
    "istanbul freelance yazılımcı",
    "istanbul yazılım şirketi",
    "freelance web developer istanbul",
    "istanbul next.js developer",
    "istanbul yazılım hizmeti",
    "istanbul web tasarım",
  ],
  alternates: { canonical: `${siteConfig.url}/istanbul-web-developer` },
  openGraph: {
    title: "İstanbul Web Developer — Beşiktaş Merkezli Next.js Uzmanı",
    description: "Büyük ofis maliyeti olmadan, belirsizlik olmadan. İstanbul Beşiktaş merkezli, doğrudan geliştirici.",
    url: `${siteConfig.url}/istanbul-web-developer`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const faqItems = [
  {
    q: "İstanbul dışındaki projeler için de çalışıyor musunuz?",
    a: "Evet. Tüm Türkiye'ye uzaktan çalışıyoruz. İstanbul için yüz yüze görüşme de yapabiliyoruz.",
  },
  {
    q: "Ajans mı, freelancer mı, siz neden farklısınız?",
    a: "Ajans gibi ekip yönetimi masrafı yok. Freelancer gibi güvenilirlik belirsizliği yok. Projeyi baştan sona tek kişi geliştiriyor, net takvim ve sabit fiyat garantisi veriyoruz.",
  },
  {
    q: "E-fatura kesiyor musunuz?",
    a: "Evet. Şirket olarak e-fatura, bireysel olarak e-arşiv fatura kesiyoruz.",
  },
  {
    q: "Proje teslim süresi ne kadar?",
    a: "Kurumsal web sitesi 5–10 iş günü, e-ticaret 10–15 iş günü, SaaS ve AI platformlar 4–8 hafta. Kapsam görüşmesinde kesin takvim yazılı olarak belirlenir.",
  },
  {
    q: "İstanbul'da yüz yüze görüşme yapılabiliyor mu?",
    a: "Evet. Beşiktaş merkezliyiz; proje başlangıcında veya teslim aşamasında İstanbul içinde yüz yüze görüşme yapabiliyoruz.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Solman Digital",
      description: "İstanbul Beşiktaş merkezli web geliştirici. Next.js, TypeScript ve Supabase ile özel web sitesi ve SaaS uygulaması geliştirme.",
      url: siteConfig.url,
      telephone: siteConfig.whatsapp,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Beşiktaş",
        addressRegion: "İstanbul",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.0432,
        longitude: 29.0065,
      },
      areaServed: [
        { "@type": "City", name: "İstanbul" },
        { "@type": "Country", name: "Türkiye" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
}

const comparisonRows = [
  {
    feature: "İletişim",
    agency: "Proje yöneticisi üzerinden",
    freelancer: "Doğrudan ama yanıtsız kalabilir",
    us: "Doğrudan geliştirici, WhatsApp",
  },
  {
    feature: "Fiyat",
    agency: "Yüksek overhead maliyeti",
    freelancer: "Düşük ama belirsiz",
    us: "Sabit fiyat garantisi",
  },
  {
    feature: "Takvim",
    agency: "Kaynak çakışması olabilir",
    freelancer: "Başka işe girebilir",
    us: "Net teslim tarihi, yazılı taahhüt",
  },
  {
    feature: "Yasal güvence",
    agency: "Var (sözleşme)",
    freelancer: "Sınırlı",
    us: "Var (sözleşme + e-fatura)",
  },
]

const techStack = [
  { name: "Next.js 16", note: "App Router, SSR, edge" },
  { name: "TypeScript", note: "Tür güvenli, bakımı kolay" },
  { name: "Supabase", note: "Auth + PostgreSQL" },
  { name: "Tailwind CSS", note: "Hızlı, tutarlı UI" },
  { name: "Vercel", note: "Deploy, CDN, domains" },
  { name: "Resend", note: "Transactional email" },
]

export default function IstanbulWebDeveloperPage() {
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
            <div className="mb-6 flex items-center justify-center gap-2">
              <MapPin size={14} className="text-accent-700" />
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
                Beşiktaş, İstanbul · Türkiye&apos;nin Her Yerine Uzaktan
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              İstanbul Web Developer — Doğrudan Geliştirici, Net Takvim
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-10 max-w-[580px] text-[1.05rem] leading-[1.75] text-ondark-muted">
              Büyük ofis maliyeti olmadan, belirsizlik olmadan. Projenizi baştan sona tek kişi geliştiriyor — net taahhüt, sabit fiyat.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#form" className="btn btn-primary">
                İletişime Geç <ArrowRight size={16} />
              </a>
              <WhatsAppLink
                message="Merhaba, İstanbul web geliştirme projesi hakkında bilgi almak istiyorum."
                source="istanbul_dev_hero"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={15} /> WhatsApp
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Neden Ne Büyük Ofis, Ne de Belirsizlik?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-[10px] border border-ink-200">
              <div className="grid grid-cols-[1.5fr_1fr_1fr_1.25fr] gap-4 bg-dark-500 px-5 py-3.5">
                {["Kriter", "Büyük Ofis", "Belirsiz İş", "Solman Digital"].map((h, i) => (
                  <span
                    key={h}
                    className={`text-[0.7rem] font-bold uppercase ${i === 3 ? "text-accent-500" : "text-ondark-muted"}`}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1.5fr_1fr_1fr_1.25fr] items-start gap-4 px-5 py-4 ${
                    i > 0 ? "border-t border-ink-200" : ""
                  }`}
                >
                  <span className="text-[0.875rem] font-semibold text-ink-900">{row.feature}</span>
                  <div className="flex items-start gap-1.5">
                    <X size={13} className="mt-0.5 shrink-0 text-ink-400" />
                    <span className="text-[0.8rem] text-ink-400">{row.agency}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <X size={13} className="mt-0.5 shrink-0 text-ink-400" />
                    <span className="text-[0.8rem] text-ink-400">{row.freelancer}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle size={13} className="mt-0.5 shrink-0 text-success" />
                    <span className="text-[0.8rem] font-semibold text-ink-700">{row.us}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Teknoloji Uzmanlığı
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {techStack.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="card flex flex-col gap-1">
                  <p className="text-[0.95rem] font-bold text-ink-900">{t.name}</p>
                  <p className="text-[0.8rem] text-ink-400">{t.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Nasıl Çalışıyoruz?
            </h2>
          </Reveal>
          <div className="flex flex-col gap-5">
            {[
              { icon: "📍", title: "İstanbul'da Yüz Yüze", desc: "Beşiktaş'ta buluşabiliriz. Proje başlangıcında ya da teslimat aşamasında şahsen görüşmeyi tercih ediyoruz." },
              { icon: "💬", title: "WhatsApp İletişim", desc: "Hızlı güncelleme ve sorular için WhatsApp. E-posta için de dönüş yapıyoruz, ama mesajlaşma daha hızlı." },
              { icon: "🧾", title: "E-Fatura / E-Arşiv", desc: "Şirketlere e-fatura, bireysel müşterilere e-arşiv fatura. Yasal güvence her iki taraf için de önemli." },
              { icon: "📋", title: "Yazılı Sözleşme", desc: "Kapsam, fiyat ve takvim her projede sözleşmeye bağlanır. Sürpriz yok." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="flex items-start gap-5">
                  <span className="shrink-0 text-[1.25rem]">{item.icon}</span>
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

      {/* FAQ */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="eyebrow mb-4">SSS</p>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Sık Sorulan Sorular
            </h2>
          </Reveal>
          <div className="flex flex-col gap-0">
            {faqItems.map((item, i) => (
              <Reveal key={item.q} delay={i * 80}>
                <div className="border-b border-ink-200 py-6">
                  <h3 className="mb-2.5 text-[0.95rem] font-bold text-ink-900">{item.q}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-ink-500">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="bg-surface px-6 py-14 text-center">
        <Reveal>
          <p className="mb-4 text-[0.9rem] text-ink-500">
            İstanbul&apos;daki ve diğer projelere göz atın.
          </p>
          <Link href="/portfoy" className="btn btn-outline">
            Portföyü Gör <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* Form */}
      <section id="form" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[600px]">
          <Reveal>
            <p className="eyebrow mb-3">İletişim</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Projeyi Anlatalım
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ink-500">
              Projenizi kısaca paylaşın. 24 saat içinde, tercihinize göre Zoom veya yüz yüze görüşme için size ulaşalım.
            </p>
          </Reveal>
          <div className="rounded-[12px] border border-ink-200 bg-surface p-10">
            <IstanbulDevLeadForm />
          </div>
        </div>
      </section>

      {/* Istanbul Local Pages */}
      <section className="bg-surface px-6 py-14">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="eyebrow mb-5">İlçe & Hizmet Sayfaları</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { href: "/istanbul-web-tasarim", label: "İstanbul Web Tasarım" },
                { href: "/istanbul-e-ticaret-yazilim", label: "İstanbul E-Ticaret Yazılım" },
                { href: "/istanbul-kurumsal-web-sitesi", label: "İstanbul Kurumsal Web Sitesi" },
                { href: "/kadikoy-web-tasarim", label: "Kadıköy Web Tasarım" },
                { href: "/sisli-yazilim-gelistirme", label: "Şişli Yazılım Geliştirme" },
                { href: "/besiktas-yazilim-gelistirme", label: "Beşiktaş Yazılım Geliştirme" },
                { href: "/umraniye-yazilim-gelistirme", label: "Ümraniye Yazılım" },
                { href: "/kartal-web-tasarim", label: "Kartal Web Tasarım" },
                { href: "/zeytinburnu-web-tasarim", label: "Zeytinburnu Web Tasarım" },
                { href: "/eyupsultan-web-tasarim", label: "Eyüpsultan Web Tasarım" },
                { href: "/bahcelievler-web-tasarim", label: "Bahçelievler Web Tasarım" },
                { href: "/istanbul-restoran-yazilim", label: "İstanbul Restoran Yazılım" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[6px] border border-ink-200 bg-white px-3.5 py-1.5 text-[0.8rem] font-medium text-ink-600 transition-colors hover:border-ink-400 hover:text-ink-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services CTA */}
      <section className="bg-dark-500 px-6 py-12 text-center">
        <div className="mx-auto max-w-[560px]">
          <p className="mb-4 text-[0.9rem] text-ondark-muted">
            Sunduğumuz hizmetlerin tamamına göz atmak ister misiniz?
          </p>
          <Link href="/hizmetler" className="btn btn-outline-dark">
            Tüm Hizmetler <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
