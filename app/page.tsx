import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Zap, Users, X, CheckCircle2, Globe, MessageCircle } from "lucide-react"
import { getServicesByTier } from "@/lib/data/services"
import ServiceCard from "@/components/ServiceCard"
import Testimonials from "@/components/Testimonials"
import SocialProofCounters from "@/components/SocialProofCounters"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Solman Digital — İstanbul Özel Yazılım Ofisi | E-Ticaret, SaaS, AI",
  description:
    "İstanbul merkezli özel yazılım ofisi. E-ticaret, SaaS ve AI otomasyon projelerini sıfırdan, şablonsuz geliştiriyoruz. Doğrudan uzman erişimi, net takvim, taahhüt edilen teslim.",
  keywords: [
    "solman digital",
    "özel yazılım geliştirme istanbul",
    "yazılım ofisi istanbul",
    "full stack developer istanbul",
    "ai otomasyon",
    "trendyol entegrasyonu",
    "next.js developer",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Solman Digital — İstanbul Özel Yazılım Ofisi",
    description:
      "İstanbul merkezli özel yazılım ofisi. E-ticaret, SaaS ve AI otomasyon — sıfırdan, şablonsuz, doğrudan uzmanla.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Solman Digital — İstanbul Web Yazılım Ofisi",
      },
    ],
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
        text: "Solman Digital, İstanbul Beşiktaş merkezli özel yazılım ofisidir. E-ticaret, SaaS ve yapay zeka otomasyon projelerinde uzmanlaşmıştır. 2023'ten bu yana Türk pazarına yönelik özel yazılım çözümleri üretmektedir. Tüm projeler şablonsuz, sıfırdan geliştirilir.",
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
  { agency: "Uzak iletişim katmanları", us: "Doğrudan, başından sonuna aynı uzmanla" },
  { agency: "Belirsiz takvim ve uzayan süreçler", us: "Net takvim, söz verilen günde teslim" },
]

const whyUs = [
  {
    icon: Users,
    title: "Doğrudan Uzman Erişimi",
    desc: "Projenizi anlatan biriyle değil, yapacak biriyle konuşursunuz. Aracı yok, katman yok.",
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
  { num: "03", title: "Doğrudan Geliştirme", desc: "Aynı uzmanla, aracısız iletişimle ilerliyoruz. Haftalık güncellemeler, şeffaf süreç." },
  { num: "04", title: "Teslim & Yanınızdayız", desc: "Söz verilen tarihte deploy, test ve lansman. Proje biter, destek bitmez." },
]

export default function HomePage() {
  const tier1 = getServicesByTier(1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="hero-grid">
          {/* Sol */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#9b1c1c",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                marginBottom: "1.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  backgroundColor: "#9b1c1c",
                }}
              />
              Kişiye &amp; Firmaya Özel Yazılım Stüdyosu
            </p>

            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
              }}
            >
              Her İşletme
              <br />
              Farklıdır.
              <br />
              <span style={{ color: "#9b1c1c" }}>Yazılımı Da Öyle.</span>
            </h1>

            <p
              style={{
                color: "#888888",
                fontSize: "1rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
                maxWidth: 480,
              }}
            >
              Her projeyi sizin iş sürecinizi anlayarak, sıfırdan ve sadece size özel inşa ediyoruz. Trendyol satıcısından kurumsal firmaya — aynı uzman, net takvim.
            </p>

            {/* Özellik çizgileri */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2.5rem" }}>
              {[
                "Sizi dinleyen aynı uzman, başından sonuna",
                "Net kapsam ve takvim — söz verilen günde teslim",
                "Projeniz biter, destek bitmez",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#9b1c1c", flexShrink: 0 }} />
                  <span style={{ color: "#aaaaaa", fontSize: "0.875rem" }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
              <Link
                href="/iletisim"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "#9b1c1c",
                  color: "#fff",
                  padding: "0.875rem 1.75rem",
                  borderRadius: 7,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.01em",
                }}
              >
                Projenizi Anlatalım <ArrowRight size={16} />
              </Link>
              <Link
                href="/hizmetler"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "1px solid #2a2a2a",
                  color: "#cccccc",
                  padding: "0.875rem 1.75rem",
                  borderRadius: 7,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                Tüm Hizmetler
              </Link>
            </div>
          </div>

          {/* Sağ: Örnek Projeler */}
          <div>
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {/* Kart başlığı */}
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid #1e1e1e",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#9b1c1c" }} />
                <span style={{ color: "#555555", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Her Müşteri İçin Ayrı Çözüm
                </span>
              </div>

              {/* Proje örnekleri */}
              {[
                {
                  client: "E-Ticaret Satıcısı",
                  built: "Trendyol + Hepsiburada çift kanal stok yönetimi",
                  tag: "API Entegrasyonu",
                },
                {
                  client: "SaaS Girişimi",
                  built: "Çok kiracılı mimari, abonelik sistemi, AI pipeline",
                  tag: "Tam Platform",
                },
                {
                  client: "Restoran Zinciri",
                  built: "QR menü sistemi — şube bazlı yönetim paneli",
                  tag: "Özel SaaS",
                },
                {
                  client: "Kurumsal Firma",
                  built: "CRM entegrasyonlu teklif & fatura takip paneli",
                  tag: "İç Araç",
                },
              ].map((project, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderBottom: "1px solid #1a1a1a",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                    <span style={{ color: "#ffffff", fontSize: "0.8rem", fontWeight: 700 }}>{project.client}</span>
                    <span
                      style={{
                        backgroundColor: "#1e1e1e",
                        border: "1px solid #2a2a2a",
                        color: "#666666",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.5rem",
                        borderRadius: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>
                  <p style={{ color: "#666666", fontSize: "0.775rem", lineHeight: 1.5 }}>{project.built}</p>
                </div>
              ))}

              {/* Alt not */}
              <div style={{ padding: "1rem 1.5rem" }}>
                <p style={{ color: "#444444", fontSize: "0.7rem", fontStyle: "italic" }}>
                  Projeniz burada değil mi? Fark etmez — sıfırdan yazıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ajans vs Biz */}
      <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#111111", borderTop: "1px solid #1e1e1e" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
              }}
            >
              Nasıl Çalışırız?
            </p>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Her proje farklı ihtiyaçla başlar.
              <br />
              <span style={{ color: "#9b1c1c" }}>Bizim yaklaşımımız da öyle.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            {/* Başlık satırı */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                padding: "0 1rem",
              }}
            >
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#555555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Geleneksel Yaklaşım
              </span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9b1c1c", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Solman Digital
              </span>
            </div>

            {agencyVsUs.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  backgroundColor: "#161616",
                  border: "1px solid #1e1e1e",
                  borderRadius: 8,
                  padding: "1rem 1rem",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <X size={13} color="#555555" style={{ flexShrink: 0 }} />
                  <span style={{ color: "#666666", fontSize: "0.85rem" }}>{row.agency}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle2 size={13} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span style={{ color: "#cccccc", fontSize: "0.85rem", fontWeight: 500 }}>{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 1 Hizmetler */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              En Çok Tercih Edilenler
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                maxWidth: 560,
              }}
            >
              Hızlı Sonuç Veren Hizmetler
            </h2>
            <p style={{ color: "#6b6b6b", marginTop: "0.875rem", maxWidth: 520, fontSize: "0.95rem", lineHeight: 1.7 }}>
              Kısa sürede proje başlatmak ve somut iş sonuçları almak isteyen işletmeler için.
            </p>
          </div>

          <div className="tier1-grid">
            {tier1.map((s) => (
              <ServiceCard key={s.slug} service={s} featured />
            ))}
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <Link
              href="/hizmetler"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid #e0e0e0",
                color: "#111111",
                padding: "0.75rem 1.5rem",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Tüm 22 Hizmeti Gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              Fark Yaratan Unsurlar
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
                maxWidth: 560,
              }}
            >
              Bir full-stack developer ile çalışmanın farkı
            </h2>
          </div>

          <div className="why-grid">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 10,
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <item.icon size={18} color="#333333" />
                </div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışırız */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              Süreç
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
              }}
            >
              Nasıl Çalışırız?
            </h2>
            <p style={{ color: "#6b6b6b", marginTop: "0.875rem", fontSize: "0.95rem" }}>
              Sizi dinleyerek başlıyor, teslim sonrasında da yanınızda kalıyoruz.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={step.num} style={{ position: "relative" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "#f0f0f0",
                    lineHeight: 1,
                    marginBottom: "1rem",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    width: 20,
                    height: 2,
                    backgroundColor: "#9b1c1c",
                    marginBottom: "0.875rem",
                  }}
                />
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section
        style={{
          padding: "2.5rem 1.5rem",
          backgroundColor: "#0d0d0d",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <p
              style={{
                color: "#444444",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Kullandığımız Teknolojiler
            </p>
            <div
              style={{
                width: 1,
                height: 16,
                backgroundColor: "#2a2a2a",
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    color: "#555555",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    transition: "color 0.15s",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Başlangıç Fiyatları */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              Başlangıç Fiyatları
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                maxWidth: 560,
              }}
            >
              Bütçenize uygun çözüm için
              <br />
              <span style={{ color: "#9b1c1c" }}>ne kadar bütçe ayırmalısınız?</span>
            </h2>
            <p style={{ color: "#6b6b6b", marginTop: "0.875rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Aşağıdaki rakamlar başlangıç noktaları. Projenizin kapsamına göre netleştirilmiş bir teklif sunuyoruz.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.25rem" }}>
            {pricingCards.map((card) => (
              <div
                key={card.title}
                style={{
                  backgroundColor: card.featured ? "#111111" : "#ffffff",
                  border: card.featured ? "1px solid #9b1c1c" : "1px solid #e0e0e0",
                  borderRadius: 10,
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {card.featured && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      backgroundColor: "#9b1c1c",
                      color: "#fff",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.6rem",
                      borderRadius: 4,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Popüler
                  </span>
                )}
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: card.featured ? "#888888" : "#9b1c1c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                  {card.title}
                </p>
                <p style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: card.featured ? "#ffffff" : "#111111", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>
                  {card.from}
                  <span style={{ fontSize: "0.8rem", fontWeight: 500, color: card.featured ? "#555555" : "#888888" }}>&apos;dan başlayan</span>
                </p>
                <p style={{ color: card.featured ? "#888888" : "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.5rem", flex: 1 }}>
                  {card.desc}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.75rem" }}>
                  {card.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <CheckCircle2 size={13} color="#16a34a" style={{ flexShrink: 0 }} />
                      <span style={{ color: card.featured ? "#aaaaaa" : "#555555", fontSize: "0.825rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={card.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    backgroundColor: card.featured ? "#9b1c1c" : "transparent",
                    color: card.featured ? "#ffffff" : "#111111",
                    border: card.featured ? "none" : "1px solid #e0e0e0",
                    padding: "0.75rem 1.25rem",
                    borderRadius: 7,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                >
                  {card.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <p style={{ marginTop: "1.75rem", color: "#888888", fontSize: "0.8rem", textAlign: "center" }}>
            Kesin fiyat kapsam görüşmesinden sonra belirlenir. Görüşme ücretsizdir.
          </p>
        </div>
      </section>

      {/* Müşteri Görüşleri */}
      <SocialProofCounters />
      <Testimonials />

      {/* FAQ */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              SSS
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
              }}
            >
              Sık Sorulan Sorular
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {homeFaqSchema.mainEntity.map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid #e0e0e0",
                  padding: "1.5rem 0",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.625rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.name}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #e0e0e0" }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: "#0d0d0d",
          padding: "6rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#444444",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            Başlayalım
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1.25rem",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Projenizi hayata geçirelim
          </h2>
          <p
            style={{
              color: "#666666",
              fontSize: "0.95rem",
              marginBottom: "2.5rem",
              lineHeight: 1.75,
            }}
          >
            Birkaç satırlık mesajınız yeterli.
            <br />
            24 saat içinde ücretsiz danışmanlık için dönüş yapıyoruz.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#9b1c1c",
                color: "#fff",
                padding: "0.875rem 2rem",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Teklif Al <ArrowRight size={16} />
            </Link>
            <Link
              href="/hizmetler"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid #2a2a2a",
                color: "#888888",
                padding: "0.875rem 2rem",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              Hizmetleri İncele
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
