import type { Metadata } from "next"
import { Clock, MessageSquare, DollarSign, CheckCircle2 } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import CalendlyEmbed from "./CalendlyEmbed"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Ücretsiz 30 Dakika Teknik Danışmanlık | Solman Digital",
  description:
    "Projenizi 30 dakikada planlayın. Ücretsiz teknik danışmanlık seansı — proje kapsamı, teknoloji seçimi ve bütçe tahmini. Satış değil, teknik rehberlik.",
  keywords: [
    "ücretsiz yazılım danışmanlığı",
    "teknik danışmanlık istanbul",
    "proje planlama danışmanlık",
    "yazılım fizibilite",
    "ücretsiz teknik görüşme",
    "web projesi planlama",
  ],
  alternates: { canonical: `${siteConfig.url}/danismanlik` },
  openGraph: {
    title: "Ücretsiz 30 Dakika Teknik Danışmanlık",
    description: "Proje kapsamı, teknoloji seçimi ve bütçe tahmini — ücretsiz ve bağlayıcı değil.",
    url: `${siteConfig.url}/danismanlik`,
    locale: "tr_TR",
  },
}

const consultingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ücretsiz 30 Dakika Teknik Danışmanlık",
  description: "Solman Digital'den ücretsiz teknik danışmanlık seansı. Proje kapsamı, mimari ve bütçe rehberliği.",
  provider: { "@type": "Organization", name: "Solman Digital", url: siteConfig.url },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
  },
}

const topics = [
  { icon: MessageSquare, title: "Proje Kapsamı", desc: "Projenizin teknik gereksinimlerini ve sınırlarını netleştiriyoruz." },
  { icon: Clock, title: "Teknik Tavsiyeler", desc: "Projenize en uygun teknoloji yığını ve mimari önerileri sunuyoruz." },
  { icon: DollarSign, title: "Süre & Bütçe Tahmini", desc: "Gerçekçi bir zaman çizelgesi ve bütçe aralığı çiziyoruz." },
]

export default function DanismanlikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consultingSchema) }}
      />

      {/* Hero */}
      <section className="bg-dark-500 px-6 py-20">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-wider text-accent-700">
              Ücretsiz & Bağlayıcı Değil
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white">
              30 Dakikalık Ücretsiz<br />
              <span className="text-accent-700">Teknik Danışmanlık</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto max-w-[560px] text-base leading-loose text-ink-500">
              Projenizin teknik gereksinimlerini, uygun teknoloji yığınını ve bütçe aralığını birlikte belirleyelim. Bu bir satış görüşmesi değil — tamamen teknik rehberlik odaklı.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Konular */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[900px]">
          <h2 className="mb-10 text-center text-[1.375rem] font-extrabold tracking-tight text-ink-900">
            Görüşmede Neler Konuşacağız?
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {topics.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
              <div
                className="rounded-[10px] border border-ink-200 bg-surface p-7"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] border border-accent-200 bg-accent-50">
                  <item.icon size={20} color="#9b1c1c" />
                </div>
                <h3 className="mb-2 text-[0.95rem] font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="text-[0.85rem] leading-relaxed text-ink-500">{item.desc}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section className="bg-white px-6 pb-16">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-[1.25rem] font-extrabold tracking-tight text-ink-900">
              Takvimden Uygun Bir Saat Seçin
            </h2>
            <p className="text-[0.875rem] text-ink-500">
              Online görüşme — Türkiye saatiyle her gün müsait.
            </p>
          </div>
          <CalendlyEmbed />
        </div>
      </section>

      {/* Güven */}
      <section className="border-t border-dark-200 bg-dark-500 px-6 py-10">
        <div className="mx-auto max-w-[760px]">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "Tamamen ücretsiz",
              "Satış baskısı yok",
              "Teknik odaklı",
              "Online görüşme",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle2 size={14} color="#16a34a" />
                <span className="text-[0.8rem] font-medium text-ink-400">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TicaretHub Self-Serve Cross-Promo */}
      <section className="border-t border-ink-200 bg-surface px-6 py-10">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="mb-2 text-[0.78rem] leading-[1.65] text-ink-500">
              Henüz danışmaya hazır değilseniz,{" "}
              <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-700 hover:underline">TicaretHub</a>
              &apos;un ücretsiz araçlarıyla kendi başınıza başlayabilirsiniz — komisyon hesaplama, kâr analizi ve AI içerik üretimi için kayıt gerektirmez.
            </p>
            <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-accent-700 hover:underline">
              TicaretHub ücretsiz araçları →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
