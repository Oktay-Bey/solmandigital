import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Zap, Users, X, CheckCircle2, Globe, MessageCircle } from "lucide-react"
import { getServicesByTier } from "@/lib/data/services"
import ServiceCard from "@/components/ServiceCard"
import Testimonials from "@/components/Testimonials"
import SocialProofCounters from "@/components/SocialProofCounters"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Özel Yazılım & Kurumsal Web Tasarımı | Solman Digital İstanbul",
  description:
    "İstanbul merkezli özel yazılım ofisi. Kurumsal web tasarımı, e-ticaret, özel iş panelleri ve yapay zeka otomasyonu — işinizin nasıl çalıştığını anlayıp sıfırdan, şablonsuz geliştiriyoruz. Net takvim, taahhüt edilen teslim.",
  keywords: [
    "solman digital",
    "özel yazılım geliştirme",
    "kurumsal web tasarımı",
    "kurumsal web sitesi",
    "yazılım ofisi istanbul",
    "yapay zeka otomasyon",
    "yapay zeka chatbot",
    "whatsapp otomasyon",
    "e-ticaret sitesi",
    "trendyol entegrasyonu",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Özel Yazılım & Kurumsal Web Tasarımı | Solman Digital",
    description:
      "Kurumsal web tasarımı, e-ticaret, özel iş panelleri ve yapay zeka otomasyonu — işinize özel, sıfırdan, şablonsuz.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Solman Digital nedir ve ne yapar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Solman Digital, İstanbul Beşiktaş merkezli özel yazılım ofisidir. Kurumsal web tasarımı, e-ticaret siteleri, özel iş panelleri (sipariş, CRM, raporlama) ve yapay zeka otomasyonu — chatbot ve WhatsApp otomasyonu dahil — alanlarında çalışır. 2023'ten bu yana Türk pazarına yönelik özel yazılım çözümleri üretmektedir. Tüm projeler şablonsuz, işin sürecine göre sıfırdan geliştirilir.",
      },
    },
    {
      "@type": "Question",
      name: "İşletmeme özel yazılım mı yaptırmalıyım, hazır paket mi yeterli?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hazır paketler herkese aynı akışı dayatır; işinize uymayan kısımları siz taşırsınız. Özel yazılım geliştirmede ise sipariş, stok, CRM veya raporlama panelinizi tam sizin iş akışınıza göre kurarız. Süreciniz standart bir kurumsal web sitesiyle çözülüyorsa hazır altyapı yeterlidir; akışınız kendine özgüyse veya birden çok sistemi tek panelde toplamak istiyorsanız özel yazılım daha doğru ve uzun vadede daha ekonomiktir. İlk görüşmede hangisinin sizin için mantıklı olduğunu net söyleriz.",
      },
    },
    {
      "@type": "Question",
      name: "Solman Digital ile çalışmanın büyük ajanslardan farkı nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Büyük ajanslarda projeniz account manager, tasarımcı, geliştirici ve test ekibi arasında dolaşır. Solman Digital'de projeyi anlayan, tasarlayan ve yapan aynı uzmandır. Bu; iletişim hızını artırır, kapsam kaymasını önler ve teslim tarihini kesinleştirir. Aracı katman yoktur, maliyetler daha düşüktür.",
      },
    },
    {
      "@type": "Question",
      name: "Projeler ne kadar sürede teslim edilir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Proje türüne göre değişir: Kurumsal web siteleri 5-10 iş günü, e-ticaret siteleri 10-15 iş günü, marketplace entegrasyonları 5-10 iş günü, AI otomasyon projeleri 2-3 hafta, SaaS uygulamalar 4-8 hafta içinde teslim edilir. Proje başlamadan önce net takvim belirlenir.",
      },
    },
    {
      "@type": "Question",
      name: "İstanbul'da web sitesi yaptırmak ne kadar tutar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kurumsal web siteleri 8.000 ₺'den, e-ticaret siteleri 20.000 ₺'den, SaaS ve AI platformları 50.000 ₺'den başlamaktadır. Kesin fiyat kapsam görüşmesinden sonra belirlenir. İlk görüşme ücretsizdir.",
      },
    },
    {
      "@type": "Question",
      name: "Trendyol API entegrasyonu nasıl çalışır ve ne gerekiyor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Onaylı Trendyol satıcı hesabı ve API anahtarı gerekmektedir. Entegrasyon tamamlandığında stok senkronizasyonu, sipariş yönetimi ve fiyat güncellemesi otomatik hale gelir. API başvuru sürecinde teknik rehberlik sağlanır. Süre 5-10 iş günüdür.",
      },
    },
    {
      "@type": "Question",
      name: "Yapay zeka ile web sitesi veya içerik otomasyonu mümkün mü?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. OpenAI GPT-4o ve Claude AI kullanarak Türkçe ürün açıklaması üretimi, haber özeti, SEO içeriği ve müşteri chatbotu sistemleri kurulmaktadır. E-ticaret sitelerinde binlerce ürün için açıklama otomasyonu, haber sitelerinde günlük içerik üretimi gerçekleştirilmiştir.",
      },
    },
    {
      "@type": "Question",
      name: "Teklif almak için ne yapmalıyım?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "İletişim formunu doldurun veya WhatsApp üzerinden yazın. Projenizi kısaca anlatan bir mesaj gönderin — 24 saat içinde dönüş yapılır. Görüşme ücretsizdir.",
      },
    },
    {
      "@type": "Question",
      name: "Proje tesliminden sonra teknik destek var mı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Tüm projelerde en az 1 ay ücretsiz teknik destek dahildir. Sonrasında ihtiyaca göre bakım anlaşması yapılabilir.",
      },
    },
  ],
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Solman Digital ile Nasıl Proje Başlatılır?",
  description: "Solman Digital ile proje başlatmak için 4 adım.",
  step: [
    { "@type": "HowToStep", position: 1, name: "Ücretsiz Görüşme", text: "Projenizi anlatan 15 dakikalık bir görüşme yapıyoruz." },
    { "@type": "HowToStep", position: 2, name: "Teknik Teklif", text: "Kapsam, süre ve fiyat içeren detaylı bir teklif sunuyoruz." },
    { "@type": "HowToStep", position: 3, name: "Geliştirme", text: "Haftalık ilerleme güncellemeleri ile şeffaf bir süreç yürütüyoruz." },
    { "@type": "HowToStep", position: 4, name: "Teslim & Destek", text: "Deploy, test ve lansman sonrası teknik destek tamamlanır." },
  ],
}

const techStack = [
  "Next.js 16", "React 19", "TypeScript", "Tailwind CSS",
  "Supabase", "Prisma", "OpenAI GPT-4o", "Claude AI",
  "İyzico", "Stripe", "Trendyol API", "Vercel",
]

const pricingCards = [
  {
    title: "Web Sitesi",
    from: "8.000₺",
    desc: "Kurumsal tanıtım, landing page veya blog. SEO uyumlu, mobil öncelikli.",
    items: ["5–10 sayfa", "İletişim formu", "Google Analytics", "5 iş günü teslim"],
    href: "/web-sitesi-yaptirmak",
    cta: "Teklif Al",
  },
  {
    title: "E-Ticaret",
    from: "20.000₺",
    desc: "İyzico / Stripe ödeme, stok yönetimi, sipariş paneli. Trendyol entegrasyonu opsiyonel.",
    items: ["Ürün kataloğu", "Ödeme entegrasyonu", "Admin paneli", "10–15 iş günü teslim"],
    href: "/iletisim",
    cta: "Teklif Al",
    featured: true,
  },
  {
    title: "SaaS & AI",
    from: "50.000₺",
    desc: "Abonelik sistemi, çok kiracılı mimari, OpenAI / Claude entegrasyonu.",
    items: ["Auth + subscription", "AI pipeline", "Dashboard", "4–8 hafta teslim"],
    href: "/saas-platform-gelistirme",
    cta: "Teklif Al",
  },
]

const agencyVsUs = [
  { agency: "Standart proje akışı, sabit adımlar", us: "İşinizi anlayarak, size özel süreç kuruyoruz" },
  { agency: "Sabit paket çözümler", us: "İhtiyaca göre şekillenen kapsam ve teknoloji" },
  { agency: "Hazır şablon, herkese aynı akış", us: "İş akışınıza birebir oturan özel sistem" },
  { agency: "Belirsiz takvim ve uzayan süreçler", us: "Net takvim, söz verilen günde teslim" },
]

const whyUs = [
  {
    icon: Users,
    title: "İşinize Özel Kurgulanır",
    desc: "Önce iş akışınızı anlıyoruz, sonra yazıyoruz. Hazır pakete sığmaya çalışmazsınız; yazılım sizin sürecinize göre şekillenir.",
  },
  {
    icon: CheckCircle2,
    title: "Gerçekten Özelleştirilmiş",
    desc: "Trendyol satıcı paneli, AI haber motoru, QR menü SaaS — hepsi sıfırdan kuruldu. Template yok.",
  },
  {
    icon: Zap,
    title: "Söylediğimiz Tarihte Teslim",
    desc: "Belirsiz onay döngüleri yok. Kapsamı netleştiriyoruz, takvim veriyoruz, teslim ediyoruz.",
  },
  {
    icon: Globe,
    title: "Türk Pazarını Tanıyoruz",
    desc: "İyzico, Trendyol API, Hepsiburada — Türk pazarına özgü entegrasyonlarda gerçek saha deneyimi.",
  },
]

const steps = [
  { num: "01", title: "İşinizi Anlıyoruz", desc: "Sektörünüzü, sürecinizi ve gerçek ihtiyacınızı dinleyerek başlıyoruz. Kısa, odaklı bir görüşme — size özel kapsam buradan şekilleniyor." },
  { num: "02", title: "Size Özel Teklif", desc: "Dinlediklerimize göre kapsam, teknoloji seçimi ve takvim belirliyoruz. Standart paket değil, sizin projenize özel bir yol haritası." },
  { num: "03", title: "Sürecinize Göre Geliştirme", desc: "Belirlediğimiz kapsamı iş akışınıza birebir oturtarak inşa ediyoruz. Haftalık güncellemeler, şeffaf ilerleme." },
  { num: "04", title: "Teslim & Yanınızdayız", desc: "Söz verilen tarihte deploy, test ve lansman. Proje biter, destek bitmez." },
]

const heroProjects = [
  { client: "E-Ticaret Satıcısı", built: "Trendyol + Hepsiburada çift kanal stok yönetimi", tag: "API Entegrasyonu" },
  { client: "SaaS Girişimi", built: "Çok kiracılı mimari, abonelik sistemi, AI pipeline", tag: "Tam Platform" },
  { client: "Restoran Zinciri", built: "QR menü sistemi — şube bazlı yönetim paneli", tag: "Özel SaaS" },
  { client: "Kurumsal Firma", built: "CRM entegrasyonlu teklif & fatura takip paneli", tag: "İç Araç" },
]

export default function HomePage() {
  const tier1 = getServicesByTier(1)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dark-500 px-6 pb-20 pt-24">
        {/* radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full opacity-60 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(155,28,28,0.35) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto hero-grid max-w-[1200px]">
          {/* Sol */}
          <div>
            <p className="eyebrow mb-7 !text-accent-500">
              Özel Yazılım &amp; Kurumsal Web Çözümleri
            </p>

            <h1 className="mb-6 text-h1 font-extrabold leading-[1.1] tracking-tight text-white">
              Her İşletme
              <br />
              Farklıdır.
              <br />
              <span className="text-accent-600">Yazılımı Da Öyle.</span>
            </h1>

            <p className="mb-8 max-w-[480px] text-base leading-relaxed text-ondark-muted">
              Kurumsal web sitesinden e-ticarete, özel iş panellerinden yapay zeka otomasyonuna — işinizin nasıl çalıştığını anlayıp, tam ona göre yazılım kuruyoruz. Hazır şablon değil, sürecinize özel.
            </p>

            <div className="mb-10 flex flex-col gap-2.5">
              {[
                "İş akışınızı anlayıp ona özel kurguluyoruz",
                "Kurumsal web, e-ticaret, özel panel, AI otomasyon",
                "Net takvim — söz verilen günde teslim",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600" />
                  <span className="text-[0.875rem] text-ondark-muted">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3.5">
              <Link href="/iletisim" className="btn btn-primary">
                Projenizi Anlatalım <ArrowRight size={16} />
              </Link>
              <WhatsAppLink
                message="Merhaba, proje hakkında bilgi almak istiyorum."
                source="home_hero"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={15} /> WhatsApp
              </WhatsAppLink>
            </div>
          </div>

          {/* Sağ: Örnek Projeler */}
          <div>
            <div className="overflow-hidden rounded-xl border border-dark-50 bg-dark-400 shadow-card-hover">
              <div className="flex items-center gap-2 border-b border-dark-100 px-6 py-5">
                <span className="h-2 w-2 rounded-full bg-accent-700" />
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-ondark-muted">
                  Her Müşteri İçin Ayrı Çözüm
                </span>
              </div>

              {heroProjects.map((project, i) => (
                <div key={i} className="flex flex-col gap-1.5 border-b border-dark-200 px-6 py-5 transition-colors hover:bg-dark-300">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.8rem] font-bold text-white">{project.client}</span>
                    <span className="whitespace-nowrap rounded border border-dark-50 bg-dark-100 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-ondark-muted">
                      {project.tag}
                    </span>
                  </div>
                  <p className="text-[0.775rem] leading-relaxed text-ondark-muted">{project.built}</p>
                </div>
              ))}

              <div className="px-6 py-4">
                <p className="text-[0.7rem] italic text-ondark-muted">
                  Projeniz burada değil mi? Fark etmez — sıfırdan yazıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ajans vs Biz */}
      <section className="border-t border-dark-100 bg-dark-400 px-6 py-18">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-10 text-center">
            <p className="eyebrow eyebrow-center mb-3.5 !text-ondark-muted">Nasıl Çalışırız?</p>
            <h2 className="text-h2-dark font-extrabold leading-tight tracking-tight text-white">
              Her proje farklı ihtiyaçla başlar.
              <br />
              <span className="text-accent-600">Bizim yaklaşımımız da öyle.</span>
            </h2>
          </div>

          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-4 px-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-ondark-muted">
                Geleneksel Yaklaşım
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-accent-600">
                Solman Digital
              </span>
            </div>

            {agencyVsUs.map((row, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="grid grid-cols-2 items-center gap-4 rounded-lg border border-dark-100 bg-dark-300 px-4 py-4">
                  <div className="flex items-center gap-2">
                    <X size={13} color="#666666" className="shrink-0" />
                    <span className="text-[0.85rem] text-ondark-muted">{row.agency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} color="#16a34a" className="shrink-0" />
                    <span className="text-[0.85rem] font-medium text-ondark-muted">{row.us}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 1 Hizmetler */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="eyebrow mb-3.5">En Çok Tercih Edilenler</p>
            <h2 className="max-w-[560px] text-h2 font-extrabold leading-tight tracking-tight text-ink-900">
              Hızlı Sonuç Veren Hizmetler
            </h2>
            <p className="mt-3.5 max-w-[520px] text-[0.95rem] leading-relaxed text-ink-500">
              Kısa sürede proje başlatmak ve somut iş sonuçları almak isteyen işletmeler için.
            </p>
          </div>

          <div className="tier1-grid">
            {tier1.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <ServiceCard service={s} featured />
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/hizmetler" className="btn btn-outline">
              Tüm 22 Hizmeti Gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="eyebrow mb-3.5">Fark Yaratan Unsurlar</p>
            <h2 className="max-w-[560px] text-h2 font-extrabold tracking-tight text-ink-900">
              İşinize özel yazılımın farkı
            </h2>
          </div>

          <div className="why-grid">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 70}>
                <div className="card h-full p-7">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-md bg-ink-100 text-ink-700">
                    <item.icon size={18} />
                  </div>
                  <h3 className="mb-2 text-[0.95rem] font-bold tracking-tight text-ink-900">
                    {item.title}
                  </h3>
                  <p className="text-[0.85rem] leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışırız */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14">
            <p className="eyebrow mb-3.5">Süreç</p>
            <h2 className="text-h2 font-extrabold tracking-tight text-ink-900">
              Nasıl Çalışırız?
            </h2>
            <p className="mt-3.5 text-[0.95rem] text-ink-500">
              Sizi dinleyerek başlıyor, teslim sonrasında da yanınızda kalıyoruz.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={(i % 4) * 70}>
                <div className="relative">
                  <div className="mb-4 text-[3rem] font-extrabold leading-none tracking-tight text-ink-100">
                    {step.num}
                  </div>
                  <div className="mb-3.5 h-0.5 w-5 bg-accent-700" />
                  <h3 className="mb-2 text-[0.95rem] font-bold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="text-[0.85rem] leading-relaxed text-ink-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-dark-200 bg-dark-500 px-6 py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-center gap-8">
            <p className="shrink-0 whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-wider text-ondark-muted">
              Kullandığımız Teknolojiler
            </p>
            <div className="h-4 w-px shrink-0 bg-dark-50" />
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((tech) => (
                <span key={tech} className="text-[0.8rem] font-medium text-ondark-muted transition-colors hover:text-ondark">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Başlangıç Fiyatları */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12">
            <p className="eyebrow mb-3.5">Başlangıç Fiyatları</p>
            <h2 className="max-w-[560px] text-h2 font-extrabold leading-tight tracking-tight text-ink-900">
              Bütçenize uygun çözüm için
              <br />
              <span className="text-accent-700">ne kadar bütçe ayırmalısınız?</span>
            </h2>
            <p className="mt-3.5 text-[0.9rem] leading-relaxed text-ink-500">
              Aşağıdaki rakamlar başlangıç noktaları. Projenizin kapsamına göre netleştirilmiş bir teklif sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5">
            {pricingCards.map((card, i) => (
              <Reveal key={card.title} delay={(i % 3) * 80}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[10px] p-8 ${
                    card.featured
                      ? "border border-accent-700 bg-dark-400 shadow-card-hover"
                      : "card"
                  }`}
                >
                  {card.featured && (
                    <span className="absolute right-4 top-4 rounded bg-accent-700 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                      Popüler
                    </span>
                  )}
                  <p className={`mb-2 text-[0.75rem] font-bold uppercase tracking-wider ${card.featured ? "text-ink-400" : "text-accent-700"}`}>
                    {card.title}
                  </p>
                  <p className={`mb-1 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight ${card.featured ? "text-white" : "text-ink-900"}`}>
                    {card.from}
                    <span className={`text-[0.8rem] font-medium ${card.featured ? "text-ink-500" : "text-ink-400"}`}>&apos;dan başlayan</span>
                  </p>
                  <p className={`mb-6 flex-1 text-[0.85rem] leading-relaxed ${card.featured ? "text-ondark-muted" : "text-ink-500"}`}>
                    {card.desc}
                  </p>
                  <ul className="mb-7 flex list-none flex-col gap-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle2 size={13} color="#16a34a" className="shrink-0" />
                        <span className={`text-[0.825rem] ${card.featured ? "text-ondark-muted" : "text-ink-600"}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={card.href}
                    className={`btn ${card.featured ? "btn-primary" : "btn-outline"}`}
                  >
                    {card.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-7 text-center text-[0.8rem] text-ink-400">
            Kesin fiyat kapsam görüşmesinden sonra belirlenir. Görüşme ücretsizdir.
          </p>
        </div>
      </section>

      {/* Müşteri Görüşleri */}
      <SocialProofCounters />
      <Testimonials />

      {/* FAQ */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-12">
            <p className="eyebrow mb-3.5">SSS</p>
            <h2 className="text-h2 font-extrabold tracking-tight text-ink-900">
              Sık Sorulan Sorular
            </h2>
          </div>

          <div className="flex flex-col">
            {homeFaqSchema.mainEntity.map((item, i) => (
              <div key={i} className="border-t border-ink-200 py-6">
                <h3 className="mb-2.5 text-[0.95rem] font-bold tracking-tight text-ink-900">
                  {item.name}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-ink-500">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
            <div className="border-t border-ink-200" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-dark-200 bg-dark-500 px-6 py-24 text-center">
        <div className="mx-auto max-w-[640px]">
          <p className="eyebrow eyebrow-center mb-6 !text-ink-600">Başlayalım</p>
          <h2 className="mb-5 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white">
            Projenizi hayata geçirelim
          </h2>
          <p className="mb-10 text-[0.95rem] leading-relaxed text-ondark-muted">
            Birkaç satırlık mesajınız yeterli.
            <br />
            24 saat içinde ücretsiz danışmanlık için dönüş yapıyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/iletisim" className="btn btn-primary !px-8">
              Teklif Al <ArrowRight size={16} />
            </Link>
            <WhatsAppLink
              message="Merhaba, proje hakkında bilgi almak istiyorum."
              source="home_final_cta"
              className="btn btn-outline-dark !px-8"
            >
              <MessageCircle size={15} /> WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  )
}
