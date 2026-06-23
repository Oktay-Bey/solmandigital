import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { services, getServicesByTier } from "@/lib/data/services"
import ServiceCard from "@/components/ServiceCard"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Hizmetler — İşinize Özel Yazılım Çözümleri",
  description:
    "Solman Digital ile işinize özel yazılım. E-ticaret, Trendyol entegrasyonu, AI otomasyon, SaaS ve daha fazlası. Her proje sıfırdan inşa edilir.",
  keywords: [
    "yazılım hizmetleri istanbul",
    "web geliştirme hizmetleri",
    "e-ticaret yazılım",
    "saas geliştirme türkiye",
    "ai otomasyon hizmeti",
    "trendyol entegrasyonu",
    "özel yazılım çözümleri",
    "next.js geliştirici",
  ],
  alternates: { canonical: `${siteConfig.url}/hizmetler` },
  openGraph: {
    title: "Hizmetler | Solman Digital",
    description: "Customized software expert — işinizin tam ihtiyacına özel dijital çözümler.",
    locale: "tr_TR",
  },
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Solman Digital Hizmetleri",
  numberOfItems: services.length,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${siteConfig.url}/hizmetler/${s.slug}`,
  })),
}

export default function HizmetlerPage() {
  const tier1 = getServicesByTier(1)
  const tier2 = getServicesByTier(2)
  const tier3 = getServicesByTier(3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="bg-dark-500 px-6 py-18">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <p className="eyebrow mb-5 !text-accent-700">
              Kişiye &amp; Firmaya Özel Yazılım Stüdyosu
            </p>
            <h1 className="mb-5 max-w-[640px] text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-white">
              Her İşletme Farklı İhtiyaçlarla Gelir.
              <br />
              <span className="text-accent-700">Hizmetlerimiz De Öyle Şekillenir.</span>
            </h1>
            <p className="max-w-[560px] text-[0.95rem] leading-[1.75] text-ink-500">
              Sektörünüzü, iş sürecinizi ve hedeflerinizi dinleyerek başlıyoruz — ardından tam ihtiyacınıza
              göre tasarlanmış çözümü sıfırdan inşa ediyoruz. Projenizi yapan uzmanla, doğrudan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/fiyatlar" className="btn btn-primary">
                Sabit Fiyatlı Teklif Alın
                <ArrowRight size={16} />
              </Link>
              <Link href="/ucretsiz-analiz" className="btn btn-outline-dark">
                Ücretsiz Analiz
              </Link>
              <Link href="/entegrasyonlar" className="btn btn-outline-dark">
                Pazaryeri Entegrasyonları
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] text-ondark-muted">
              {["Sabit fiyat, sürpriz maliyet yok", "Kaynak kodu sizde", "İlk görüşme ücretsiz"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span className="text-[#4ade80]">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* #29 Dual Path — TicaretHub self-serve vs Solman Digital özel geliştirme */}
      <section className="border-t border-dark-200 bg-dark-400 px-6 py-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-[10px] border border-dark-50 p-6">
              <div>
                <p className="mb-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-ondark-muted">
                  Nereden Başlayacağınızı Bilmiyor musunuz?
                </p>
                <p className="text-[0.95rem] font-semibold text-ondark">
                  Hazır araçlarla denemek isteyenler için{" "}
                  <a href="https://ticarethub.com" target="_blank" rel="noopener noreferrer" className="font-bold text-accent-700 hover:underline">
                    TicaretHub
                  </a>
                  {" "}— Trendyol komisyon, kâr analizi ve AI içerik araçları, kayıt gerektirmez.
                </p>
              </div>
              <a
                href="https://ticarethub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-[8px] bg-accent-600 px-5 py-2.5 text-[0.85rem] font-bold text-white transition-colors hover:bg-accent-500"
              >
                TicaretHub&apos;u Dene →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tier 1 — Popüler */}
      <section className="bg-white px-6 py-18">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <div className="mb-10">
              <p className="eyebrow mb-3">En Çok Tercih Edilenler</p>
              <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-ink-900">
                Hızlı Sonuç Veren Çözümler
              </h2>
              <p className="max-w-[540px] text-[0.875rem] text-ink-500">
                Hangi hizmetten başlayacağınızı bilmiyor olabilirsiniz — bu tamamen normal. Size özel kapsam belirliyoruz.
              </p>
            </div>
          </Reveal>
          <div className="tier1-grid">
            {tier1.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <ServiceCard service={s} featured />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2 — Orta Vadeli */}
      <section className="bg-surface px-6 py-18">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <div className="mb-10">
              <p className="eyebrow mb-3">Platform &amp; Uygulama</p>
              <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-ink-900">
                Platform &amp; Uygulama Geliştirme
              </h2>
              <p className="max-w-[540px] text-[0.875rem] text-ink-500">
                SaaS ürünler, dashboard paneller, abonelik sistemleri — iş modelinize ve kullanıcılarınıza özel mimariyle.
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            {tier2.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 3 — Niche */}
      <section className="bg-white px-6 py-18">
        <div className="mx-auto max-w-[1200px]">
          <Reveal delay={0}>
            <div className="mb-10">
              <p className="eyebrow mb-3">Özel Çözümler</p>
              <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-ink-900">
                Niche &amp; Özelleşmiş Hizmetler
              </h2>
              <p className="max-w-[540px] text-[0.875rem] text-ink-500">
                Sektöre özel ve daha teknik altyapı gerektiren özelleştirilmiş dijital çözümler.
              </p>
            </div>
          </Reveal>
          <div className="tier3-grid">
            {tier3.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <ServiceCard service={s} />
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
              Hangi çözüme ihtiyacınız var?
            </h2>
            <p className="mb-8 text-[0.9rem] leading-relaxed text-ondark-faint">
              Projenizi anlatan birkaç satır yeterli. Size özel kapsam ve takvimi birlikte belirleyelim.
            </p>
            <Link href="/iletisim" className="btn btn-primary !px-8">
              Ücretsiz Danışmanlık Al <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
