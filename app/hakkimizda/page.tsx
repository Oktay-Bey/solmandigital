import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Code2, Zap, Target, Heart, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Hakkımızda — Solman Digital | İstanbul Özel Yazılım Ofisi",
  description:
    "Solman Digital — İstanbul Beşiktaş merkezli özel yazılım ofisi. 50+ proje, e-ticaret, AI otomasyon, SaaS — aynı uzmanla, başından sonuna, net kapsam, taahhüt edilen teslim.",
  keywords: [
    "solman digital hakkında",
    "istanbul yazılım ofisi",
    "full stack developer istanbul",
    "yazılım ofisi beşiktaş",
    "özel yazılım geliştirme",
    "doğrudan geliştirici istanbul",
    "next.js uzman istanbul",
  ],
  alternates: { canonical: `${siteConfig.url}/hakkimizda` },
  openGraph: {
    title: "Hakkımızda | Solman Digital — İstanbul Özel Yazılım Ofisi",
    description: "İstanbul Beşiktaş merkezli özel yazılım ofisi. 50+ proje deneyimi, doğrudan uzman erişimi.",
    url: `${siteConfig.url}/hakkimizda`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: "Solman Digital",
  description: "İstanbul Beşiktaş merkezli özel yazılım ofisi. E-ticaret, SaaS ve AI otomasyon alanında uzman.",
  url: siteConfig.url,
  telephone: siteConfig.whatsapp,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beşiktaş",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.0426, longitude: 28.9965 },
  areaServed: { "@type": "Country", name: "Türkiye" },
  foundingDate: "2023",
  knowsAbout: ["Next.js", "E-Ticaret Yazılım", "SaaS Geliştirme", "AI Otomasyon", "Trendyol API Entegrasyonu"],
  sameAs: [`https://github.com/Oktay-Bey`],
}

const values = [
  {
    icon: Zap,
    title: "Söz Verilen Hızda Teslim",
    desc: "Başlamadan önce kapsam netleşir, takvim belirlenir. Belirsizlik değil, taahhüt.",
  },
  {
    icon: Code2,
    title: "Sizin İçin Tasarlanan Yazılım",
    desc: "Her proje sıfırdan, sizin iş sürecinizi ve kullanıcılarınızı anlayarak tasarlanır. Kapsam size özel şekillenir.",
  },
  {
    icon: Target,
    title: "Doğrudan, Katmansız İletişim",
    desc: "Projenizi anlatan kişiyle değil, yapan kişiyle konuşursunuz. PM, account manager, aracı yok.",
  },
  {
    icon: Heart,
    title: "Teslim Sonrası Destek",
    desc: "Canlıya geçiş ile iş bitmiyor. Büyüyen yazılımın beraberinde getirdiği ihtiyaçlarda yanındayız.",
  },
]

const steps = [
  {
    num: "01",
    title: "İşinizi Anlıyoruz",
    desc: "Sektörünüzü, operasyonunuzu ve gerçek ihtiyacınızı dinleyerek başlıyoruz. Bu görüşmeden sizin için özel bir yol haritası çıkar.",
  },
  {
    num: "02",
    title: "Size Özel Tasarım",
    desc: "Dinlediklerimize göre mimari, teknoloji seçimi ve kapsam belirliyoruz. Her karar, sizin işinize göre alınır.",
  },
  {
    num: "03",
    title: "Doğrudan Geliştirme",
    desc: "Aynı uzmanla, aracısız iletişimle ilerliyoruz. Haftalık güncellemeler, şeffaf ve öngörülebilir süreç.",
  },
  {
    num: "04",
    title: "Teslim & Yanınızdayız",
    desc: "Söz verilen tarihte deploy, test ve lansman. Proje biter, destek bitmez.",
  },
]

export default function HakkimizdaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {/* Hero */}
      <section className="bg-dark-500 px-6 py-18">
        <div className="hero-grid mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <p className="eyebrow mb-5 !text-accent-700">
              Kişiye &amp; Firmaya Özel Yazılım Stüdyosu
            </p>
            <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-white">
              Sizi Dinleyerek
              <br />
              Başlıyoruz.
              <br />
              <span className="text-accent-700">Sizin İçin İnşa Ediyoruz.</span>
            </h1>
            <p className="max-w-[520px] text-[0.95rem] leading-[1.75] text-ink-500">
              Her işletmenin sektörü, kullanıcısı ve operasyonel gerçekliği farklı. Solman Digital olarak
              önce sizi anlıyor, sonra tam ihtiyacınıza göre yazılım inşa ediyoruz — net kapsam,
              söz verilen takvim, başından sonuna aynı uzmanla.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-hidden rounded-[10px] border border-dark-50 bg-dark-300">
              {[
                { label: "Tamamlanan Proje", value: "50+" },
                { label: "Hizmet Alanı", value: "22" },
                { label: "Teknoloji", value: "15+" },
                { label: "Konum", value: "BEŞİKTAŞ" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-center justify-between px-6 py-4.5 ${
                    i < 3 ? "border-b border-dark-100" : ""
                  }`}
                >
                  <span className="text-[0.85rem] text-ondark-faint">{stat.label}</span>
                  <span className="text-xl font-extrabold tracking-tight text-accent-700">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal delay={0}>
            <p className="eyebrow mb-4">Deneyim</p>
            <h2 className="mb-8 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink-900">
              Uzmanlık Alanımız
            </h2>
          </Reveal>
          <div className="flex flex-col gap-5 text-[0.95rem] leading-loose text-ink-600">
            <Reveal delay={0}>
              <p>
                50&apos;den fazla proje — Trendyol satıcı paneli, WordPress AI içerik motoru, QR menü SaaS,
                AI haber platformu, e-ticaret mağazaları — her biri farklı bir müşterinin farklı ihtiyacından doğdu.
                Her seferinde önce o işletmeyi anladık, sonra çözümü inşa ettik.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Solman Digital olarak ihtiyacı dinleyen, teknik tasarımı yapan ve kodu yazan aynı uzmandır.
                Aracı yok, katman yok — projeniz başından teslime kadar tek odak noktasıdır.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                İyzico entegrasyonunda Türk kullanıcı alışkanlıkları, Trendyol API&apos;sinde satıcının
                operasyonel gerçekliği sahada kazanıldı. Bu bağlam doğrudan çözüme dönüşür —
                işinize özel kararlar, genel reçeteler değil.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <div className="mb-12">
              <p className="eyebrow mb-3.5">İlkelerimiz</p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink-900">
                Değerlerimiz
              </h2>
            </div>
          </Reveal>
          <div className="why-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="card rounded-[10px] p-7">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-[7px] bg-ink-100">
                    <v.icon size={18} className="text-ink-700" />
                  </div>
                  <h3 className="mb-2 text-[0.95rem] font-bold tracking-tight text-ink-900">
                    {v.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.65] text-ink-500">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışırız */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <div className="mb-14">
              <p className="eyebrow mb-3.5">Metodoloji</p>
              <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink-900">
                Çalışma Sürecimiz
              </h2>
              <p className="text-[0.875rem] text-ink-500">
                Sizi anlayarak başlıyor, teslim sonrasında da yanınızda kalıyoruz.
              </p>
            </div>
          </Reveal>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div>
                  <div className="mb-4 text-[3rem] font-extrabold leading-none tracking-[-0.04em] text-ink-100">
                    {step.num}
                  </div>
                  <div className="mb-3.5 h-0.5 w-5 bg-accent-700" />
                  <h3 className="mb-2 text-[0.95rem] font-bold tracking-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.65] text-ink-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* #26 TicaretHub Ekosistemi */}
      <section className="border-t border-ink-200 bg-surface px-6 py-16">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="eyebrow mb-3">Ekosistem</p>
            <h2 className="mb-4 text-[1.5rem] font-extrabold tracking-tight text-ink-900">
              TicaretHub ile Birlikte Çalışıyoruz
            </h2>
            <p className="mb-6 text-[0.9rem] leading-[1.75] text-ink-600">
              Solman Digital&apos;ın geliştirdiği{" "}
              <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-700 hover:underline">TicaretHub</a>
              {" "}— Trendyol satıcıları için komisyon hesaplama, kâr analizi ve AI içerik araçları sunan bir SaaS platform. Hazır araçlarla başlamak isteyenler için self-serve giriş noktası; büyüyünce özel geliştirmeye ihtiyaç duyulduğunda Solman Digital devreye giriyor.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-[8px] border border-ink-200 bg-white px-4 py-3 text-[0.825rem] text-ink-600">
                <span className="font-bold text-ink-900">TicaretHub</span> — Self-serve e-ticaret araçları
              </div>
              <div className="rounded-[8px] border border-ink-200 bg-white px-4 py-3 text-[0.825rem] text-ink-600">
                <span className="font-bold text-ink-900">Solman Digital</span> — Özel yazılım geliştirme
              </div>
              <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-accent-200 bg-accent-50 px-4 py-3 text-[0.825rem] font-semibold text-accent-700 hover:border-accent-300">
                TicaretHub&apos;u İncele →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-500 px-6 py-20 text-center">
        <div className="mx-auto max-w-[640px]">
          <Reveal delay={0}>
            <h2 className="mb-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-white">
              Birlikte çalışalım
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ondark-faint">
              Projenizi anlatın, en uygun çözümü birlikte planlayalım.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/ucretsiz-analiz" className="btn btn-primary !px-8">
                Ücretsiz Analiz İste <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Merhaba, proje hakkında bilgi almak istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
