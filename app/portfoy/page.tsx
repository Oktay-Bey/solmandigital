import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Projeler — Tamamlanan Çalışmalar",
  description:
    "Next.js, AI ve otomasyon alanında geliştirilen projeler. E-ticaret, SaaS, haber platformu ve marketplace entegrasyonu örnekleri.",
  keywords: [
    "next.js proje örnekleri",
    "yazılım portföyü",
    "e-ticaret proje",
    "saas uygulama örnekleri",
    "marketplace entegrasyon örnekleri",
    "trendyol proje",
  ],
  alternates: { canonical: `${siteConfig.url}/portfoy` },
  openGraph: { title: "Projeler | Solman Digital", locale: "tr_TR" },
}

const projects = [
  {
    title: "Trendyol Satıcı Paneli",
    category: "Marketplace Entegrasyonu",
    accent: "#f97316",
    preview: "📊 Çok kanallı stok senkronizasyonu & satış analitiği",
    desc: "Trendyol ve Hepsiburada API entegrasyonlu, çok kanallı stok senkronizasyonu ve satış analitiği paneli. Recharts ile gerçek zamanlı veri görselleştirmesi.",
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
    tech: ["Next.js 14", "GPT-4o", "Serper API", "WordPress REST API", "Prisma"],
    status: "Canlı",
    url: null,
  },
  {
    title: "E-Ticaret Platformu",
    category: "E-Ticaret",
    accent: "#0ea5e9",
    preview: "🛒 186 SSG ürün · İyzico entegrasyonu · Tam Türkçe",
    desc: "186 SSG ürün, İyzico ödeme entegrasyonu ve tam Türkçe e-ticaret altyapısı. JSON veri dosyaları ile statik üretim.",
    tech: ["Next.js 14", "İyzico", "TypeScript", "SSG"],
    status: "Canlı",
    url: null,
  },
  {
    title: "AI Haber Platformu",
    category: "İçerik Platformu",
    accent: "#10b981",
    preview: "📰 RSS → AI → Otomatik yayın pipeline'ı",
    desc: "Supabase, OpenAI ve RSS pipeline ile çalışan otomatik haber üretim ve yayın sistemi. Google AdSense entegrasyonu.",
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
    tech: ["Next.js", "Prisma", "NextAuth", "QR Code", "PDF"],
    status: "Özel Proje",
    url: null,
  },
  {
    title: "Rüya Günlüğü SaaS",
    category: "SaaS",
    accent: "#6366f1",
    preview: "🌙 Claude AI ile rüya analizi · LemonSqueezy abonelik",
    desc: "Supabase + Claude AI ile rüya analizi yapan SaaS uygulama. LemonSqueezy abonelik sistemi, magic link auth.",
    tech: ["Next.js 14", "Supabase", "Claude AI", "LemonSqueezy"],
    status: "Canlı",
    url: null,
  },
]

export default function PortfoyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-500 px-6 py-18">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <p className="eyebrow mb-5 !text-accent-700">
              Kişiye &amp; Firmaya Özel · Tamamlanan Projeler
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

                    <p className="mb-5 flex-1 text-[0.85rem] leading-relaxed text-ink-500">
                      {project.desc}
                    </p>

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
            <Link href="/iletisim" className="btn btn-primary !px-8">
              Projenizi Anlatalım <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
