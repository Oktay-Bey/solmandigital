import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"

export const metadata: Metadata = {
  title: "Portföy — Tamamlanan Projeler | Solman Digital",
  description:
    "Next.js, AI otomasyon ve marketplace entegrasyonu alanında 6 tamamlanmış proje. E-ticaret, SaaS, içerik platformu ve çok kanallı satış paneli örnekleri.",
  keywords: [
    "next.js proje örnekleri",
    "yazılım portföyü istanbul",
    "e-ticaret proje örneği",
    "saas uygulama örnekleri",
    "marketplace entegrasyon örnekleri",
    "ai otomasyon proje",
    "trendyol api proje",
  ],
  alternates: { canonical: `${siteConfig.url}/portfoy` },
  openGraph: {
    title: "Portföy — Tamamlanan Projeler | Solman Digital",
    description: "Next.js, AI ve marketplace entegrasyonu alanında 6 tamamlanmış proje.",
    url: `${siteConfig.url}/portfoy`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Solman Digital Portföy",
  description: "Solman Digital tarafından geliştirilen Next.js, AI ve marketplace entegrasyon projeleri",
  url: `${siteConfig.url}/portfoy`,
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "TicaretHub — E-Ticaret SaaS",
      description: "Trendyol satıcıları için komisyon hesaplama, AI içerik motoru ve kâr analizi SaaS platformu.",
      url: "https://ticarethub.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Trendyol Satıcı Paneli",
      description: "Trendyol ve Hepsiburada API entegrasyonlu çok kanallı stok senkronizasyonu ve satış analitiği paneli.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "WordPress AI İçerik Otomasyonu",
      description: "GPT-4o ile SEO içerik üreten ve WordPress'e otomatik yayımlayan otomasyon sistemi.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "ShoppinHere E-Ticaret",
      description: "238 ürün, İyzico ödeme entegrasyonu ve tam Türkçe e-ticaret platformu.",
      url: "https://shoppinhere.com",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "AI Haber Platformu",
      description: "Supabase, OpenAI ve RSS pipeline ile otomatik haber üretim ve yayın sistemi.",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "QR Menü SaaS",
      description: "Çok kiracılı QR menü SaaS platformu, restoranlara dijital menü altyapısı.",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Rüya Günlüğü SaaS",
      description: "Claude AI ile rüya analizi yapan SaaS uygulama, LemonSqueezy abonelik sistemi.",
    },
  ],
}

const projects = [
  {
    title: "TicaretHub — E-Ticaret SaaS",
    category: "SaaS Platform",
    accent: "#f97316",
    preview: "🛒 Trendyol satıcıları için komisyon, AI içerik & kâr analizi SaaS",
    desc: "Trendyol ve diğer pazaryerlerinde satış yapan işletmeler için SaaS platform. Komisyon hesaplama, AI ürün açıklaması, kâr analizi ve WooCommerce entegrasyonu araçları.",
    metrics: ["15+ ücretsiz araç", "AI içerik motoru dahil", "Canlıda — ticarethub.com"],
    tech: ["Next.js 16", "React 19", "Clerk", "Supabase", "İyzico", "Stripe"],
    status: "Canlı",
    url: "https://ticarethub.com",
  },
  {
    title: "Trendyol Satıcı Paneli",
    category: "Marketplace Entegrasyonu",
    accent: "#f97316",
    preview: "📊 Çok kanallı stok senkronizasyonu & satış analitiği",
    desc: "Trendyol ve Hepsiburada API entegrasyonlu, çok kanallı stok senkronizasyonu ve satış analitiği paneli. Recharts ile gerçek zamanlı veri görselleştirmesi.",
    metrics: ["2 platform · tek panel", "Gerçek zamanlı stok sync", "Sipariş & iade takibi"],
    tech: ["Next.js 14", "TypeScript", "Trendyol API", "Recharts", "Zustand"],
    status: "Özel Proje",
    url: null,
  },
  {
    title: "WordPress AI İçerik Otomasyonu",
    category: "AI & Otomasyon",
    accent: "#8b5cf6",
    preview: "🤖 GPT-4o → SEO içerik → WordPress otomatik yayın",
    desc: "GPT-4o ve Serper API ile SEO uyumlu içerik üreten, WordPress'e otomatik yayımlayan sistem. Kaynak doğrulama ve kalite filtresi dahil.",
    metrics: ["Saatte 10+ makale", "Kaynak doğrulama katmanı", "WordPress REST API entegrasyonu"],
    tech: ["Next.js 14", "GPT-4o", "Serper API", "WordPress REST API", "Prisma"],
    status: "Canlı",
    url: null,
  },
  {
    title: "ShoppinHere E-Ticaret",
    category: "E-Ticaret",
    accent: "#0ea5e9",
    preview: "🛒 238 ürün · İyzico & CJ entegrasyonu · USA dropshipping",
    desc: "238 ürünlü USA dropshipping platformu. İyzico ödeme, CJ Dropshipping entegrasyonu, SSG ile 100/100 Lighthouse performansı.",
    metrics: ["238 SSG ürün", "CJ Dropshipping otomatik stok", "< 1 sn yükleme süresi"],
    tech: ["Next.js 14", "İyzico", "CJ Dropshipping API", "PostgreSQL", "Redis"],
    status: "Canlı",
    url: "https://shoppinhere.com",
  },
  {
    title: "AI Haber Platformu",
    category: "İçerik Platformu",
    accent: "#10b981",
    preview: "📰 RSS → AI → Otomatik yayın pipeline'ı",
    desc: "Supabase, OpenAI ve RSS pipeline ile çalışan otomatik haber üretim ve yayın sistemi. Saatlik fetch, Google AdSense entegrasyonu.",
    metrics: ["Saatlik otomatik yayın", "9 kategori · çoklu RSS", "Google AdSense entegre"],
    tech: ["Next.js 14", "Supabase", "OpenAI", "RSS", "Vercel Cron"],
    status: "Canlı",
    url: null,
  },
  {
    title: "QR Menü SaaS",
    category: "SaaS",
    accent: "#f43f5e",
    preview: "🍽️ Restoran → QR kod → Dijital menü · Multi-tenant",
    desc: "Çok kiracılı QR menü SaaS platformu. Prisma, NextAuth, QR kod üretimi ve PDF dışa aktarma. Restoranlar için dijital menü altyapısı.",
    metrics: ["Multi-tenant mimari", "QR + PDF dışa aktarma", "Masa & kampanya yönetimi"],
    tech: ["Next.js 16", "Prisma", "NextAuth v5", "QR Code", "PDF"],
    status: "Özel Proje",
    url: null,
  },
  {
    title: "Rüya Günlüğü SaaS",
    category: "SaaS",
    accent: "#6366f1",
    preview: "🌙 Claude AI ile rüya analizi · LemonSqueezy abonelik",
    desc: "Supabase + Claude AI ile rüya analizi yapan SaaS uygulama. LemonSqueezy abonelik sistemi, magic link auth ve freemium gate.",
    metrics: ["Claude AI analiz motoru", "Freemium + abonelik", "Magic link kimlik doğrulama"],
    tech: ["Next.js 14", "Supabase", "Claude Sonnet", "LemonSqueezy"],
    status: "Canlı",
    url: null,
  },
]

export default function PortfoyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-dark-500 px-6 py-18">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <p className="eyebrow mb-5 !text-accent-700">
              7 Tamamlanmış Proje · E-Ticaret · SaaS · AI Otomasyon
            </p>
            <h1 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-white">
              Her Proje, Farklı Bir
              <br />
              <span className="text-accent-700">İş İhtiyacından Doğdu</span>
            </h1>
            <p className="max-w-[520px] text-[0.95rem] leading-[1.75] text-ink-500">
              Her müşterinin sektörü, kullanıcısı ve operasyonu farklıydı.
              Buradaki projeler, o farklı ihtiyaçlara verilen özel yanıtlar.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { label: "Tamamlanan Proje", value: "7" },
                { label: "Canlıda Çalışan", value: "4" },
                { label: "Farklı Sektör", value: "5" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[1.75rem] font-black tracking-tight text-accent-700">{stat.value}</p>
                  <p className="text-[0.75rem] font-medium text-ink-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projeler */}
      <section className="bg-surface px-6 py-18">
        <div className="mx-auto max-w-[1200px]">
          <div className="services-grid">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={(i % 3) * 100}>
                <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-ink-200 bg-white shadow-card">
                  {/* Renk Başlık Bandı — proje verisine özgü gradyan, korunur */}
                  <div
                    className="flex items-center gap-3 px-6 py-5"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}22 0%, ${project.accent}11 100%)`,
                      borderBottom: `1px solid ${project.accent}33`,
                    }}
                  >
                    <div
                      className="h-9 w-1 shrink-0 rounded-sm"
                      style={{ backgroundColor: project.accent }}
                    />
                    <p className="text-[0.82rem] font-medium leading-snug text-ink-600">
                      {project.preview}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {/* Kategori + Durum */}
                    <div className="mb-3.5 flex items-center justify-between">
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-ink-400">
                        {project.category}
                      </span>
                      <span
                        className={`rounded border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                          project.status === "Canlı"
                            ? "border-[#bbf7d0] bg-[#f0fdf4] text-success"
                            : "border-ink-200 bg-surface text-ink-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="mb-3 text-base font-bold tracking-tight text-ink-900">
                      {project.title}
                    </h3>

                    <p className="mb-4 flex-1 text-[0.85rem] leading-relaxed text-ink-500">
                      {project.desc}
                    </p>

                    {/* Metrics */}
                    <div className="mb-5 flex flex-col gap-1.5">
                      {project.metrics.map((m) => (
                        <p key={m} className="text-[0.78rem] font-medium text-ink-600">
                          <span className="mr-1.5 text-accent-700">→</span>{m}
                        </p>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-ink-200 bg-surface px-2.5 py-0.5 text-[0.68rem] font-semibold text-ink-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-wide text-accent-700"
                      >
                        Projeyi Gör <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="text-[0.75rem] font-medium text-ink-300">NDA kapsamında</span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-500 px-6 py-18 text-center">
        <div className="mx-auto max-w-[640px]">
          <Reveal delay={0}>
            <h2 className="mb-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-white">
              Sizin projeniz de burada olabilir
            </h2>
            <p className="mb-8 text-[0.9rem] leading-relaxed text-ondark-faint">
              İş ihtiyacınızı anlatalın — size özel teknik değerlendirmeyi ücretsiz yapıyoruz.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/iletisim" className="btn btn-primary !px-8">
                Projenizi Anlatalım <ArrowRight size={16} />
              </Link>
              <WhatsAppLink
                message="Merhaba, portföyü inceledim, proje hakkında bilgi almak istiyorum."
                source="portfoy_cta"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={15} /> WhatsApp ile Yazın
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
