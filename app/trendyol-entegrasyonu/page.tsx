import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Package, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import TrendyolLeadForm from "./TrendyolLeadForm"
import Reveal from "@/components/Reveal"
import RelatedGuides from "@/components/RelatedGuides"
import WhatsAppLink from "@/components/WhatsAppLink"

export const metadata: Metadata = {
  title: "Trendyol API Entegrasyonu & Satıcı Paneli | Solman Digital",
  description:
    "Trendyol, Hepsiburada ve Amazon için özel satıcı paneli geliştiriyoruz. Stok senkronizasyonu, otomatik fiyatlama, sipariş yönetimi. 7-12 iş günü teslim.",
  keywords: [
    "trendyol entegrasyonu",
    "trendyol api entegrasyonu",
    "trendyol satıcı paneli",
    "hepsiburada entegrasyon",
    "marketplace otomasyon",
    "trendyol sipariş yönetimi",
    "trendyol xml entegrasyon",
    "çoklu marketplace yönetimi",
  ],
  alternates: { canonical: `${siteConfig.url}/trendyol-entegrasyonu` },
  openGraph: {
    title: "Trendyol API Entegrasyonu & Satıcı Paneli | Solman Digital",
    description: "Trendyol, Hepsiburada ve Amazon için özel satıcı paneli. Stok senkronizasyonu, otomatik fiyatlama, sipariş yönetimi.",
    url: `${siteConfig.url}/trendyol-entegrasyonu`,
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
      name: "Trendyol & Marketplace API Entegrasyonu",
      description:
        "Trendyol, Hepsiburada, N11 ve Amazon için özel satıcı paneli geliştirme. Stok senkronizasyonu, otomatik fiyatlama ve sipariş yönetimi.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: `${siteConfig.url}/trendyol-entegrasyonu`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Trendyol entegrasyonu ne kadar sürer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tek marketplace için 7-10 iş günü, birden fazla marketplace için 12-15 iş günü içinde teslim ediyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Hangi marketplace'lerle çalışıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trendyol, Hepsiburada, Amazon Türkiye, N11 ve Çiçeksepeti API entegrasyonu yapıyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Mevcut e-ticaret sitemle entegre edebilir misiniz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. WordPress/WooCommerce, Shopify ve özel geliştirilmiş sistemlerle entegrasyon yapabiliyoruz.",
          },
        },
      ],
    },
  ],
}

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Stok Tutarsızlığı",
    desc: "Farklı panellerde stok güncellemeyi unutmak → müşteri şikayeti, ceza puanı.",
  },
  {
    icon: RefreshCw,
    title: "Manuel Fiyat Güncelleme",
    desc: "Her platform için ayrı fiyat güncellemesi → rakipten geç kalma, kayıp satış.",
  },
  {
    icon: Package,
    title: "Dağınık Sipariş Takibi",
    desc: "3-4 ayrı panel, manuel kargo girişi → insan hatası, geciken kargolar.",
  },
]

const features = [
  "Anlık stok senkronizasyonu (tüm marketplace'ler)",
  "Otomatik fiyat güncelleme ve rekabet izleme",
  "Sipariş yönetimi ve kargo entegrasyonu",
  "Ürün listeleme ve toplu güncelleme",
  "Satış performansı raporları",
  "Stok uyarı sistemi (kritik seviye bildirimi)",
]

const marketplaces = ["Trendyol", "Hepsiburada", "eBay", "Amazon TR", "N11", "Çiçeksepeti", "Etsy"]

export default function TrendyolEntegrasyonuPage() {
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
              Trendyol · Hepsiburada · Amazon · N11
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              Trendyol Entegrasyonu — Tek Panelden Tüm Marketplace&apos;lerinizi Yönetin
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-6 max-w-[580px] text-[1.05rem] leading-[1.75] text-ondark-muted">
              Her sabah 3-4 ayrı paneli açarak sipariş mi kontrol ediyorsunuz? Trendyol ve pazaryeri entegrasyonu ile özel satıcı paneli kurup tüm marketplace&apos;leri tek ekrandan yönetin.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="mx-auto mb-10 text-[0.82rem] text-ondark-faint">
              Trendyol · Hepsiburada · eBay · Amazon TR · N11 · Etsy — 7–15 iş günü teslim
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="#form" className="btn btn-primary">
                Entegrasyon Teklifi Al <ArrowRight size={16} />
              </a>
              <WhatsAppLink
                source="trendyol_hero"
                className="btn btn-outline-dark"
              >
                WhatsApp ile Yazın
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem Agitation */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Tanıdık Geliyor mu?
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {painPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="rounded-[10px] border border-[#fecaca] bg-[#fff5f5] p-7">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#fee2e2]">
                    <p.icon size={20} className="text-accent-700" />
                  </div>
                  <p className="mb-2 text-[0.95rem] font-bold text-ink-900">{p.title}</p>
                  <p className="text-[0.85rem] leading-[1.6] text-ink-500">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Özel Satıcı Paneli Neler Sunar?
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {features.map((f, i) => (
              <Reveal key={f} delay={i * 50}>
                <div className="flex items-start gap-3 rounded-[8px] border border-ink-200 bg-white p-5">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-success" />
                  <p className="text-[0.875rem] leading-[1.5] text-ink-700">{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ürün Bazlı Çözüm Kataloğu */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="eyebrow mb-3">Hazır Çözümler</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              İhtiyacınıza Tam Uyan Çözümü Seçin
            </h2>
            <p className="mb-10 max-w-[620px] text-[0.9rem] leading-[1.7] text-ink-500">
              Her biri sabit fiyatlı ve kapsamı belli. Tam olarak neye ihtiyacınız olduğunu biliyorsanız, doğrudan o çözümle başlayın.
            </p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            {[
              { slug: "trendyol-woocommerce-stok-siparis-senkronizasyonu", label: "Trendyol → WooCommerce Senkronizasyonu", desc: "Stok + sipariş otomatik akar" },
              { slug: "coklu-pazaryeri-stok-senkronizasyonu", label: "Çoklu Pazaryeri Stok Senkronizasyonu", desc: "Trendyol + Hepsiburada + N11 tek panel" },
              { slug: "otomatik-fiyat-guncelleme", label: "Otomatik Fiyat Güncelleme", desc: "Kurala göre fiyatlama + rakip takibi" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/entegrasyonlar/${c.slug}`}
                className="group rounded-[10px] border border-ink-200 bg-surface p-6 transition-colors hover:border-accent-300 hover:bg-accent-50"
              >
                <p className="mb-1.5 text-[0.9rem] font-bold text-ink-900 group-hover:text-accent-700">
                  {c.label} →
                </p>
                <p className="text-[0.8rem] leading-[1.55] text-ink-500">{c.desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-7">
            <Link href="/entegrasyonlar" className="text-[0.875rem] font-semibold text-accent-700 underline underline-offset-2">
              Tüm entegrasyon kataloğunu görüntüle →
            </Link>
          </div>
        </div>
      </section>

      {/* Marketplace Logos */}
      <section className="border-t border-ink-200 bg-white px-6 py-14 text-center">
        <Reveal>
          <p className="eyebrow-center mb-6">Entegrasyon Yaptığımız Platformlar</p>
          <div className="flex flex-wrap justify-center gap-3">
            {marketplaces.map((m) => (
              <span
                key={m}
                className="rounded-[6px] border border-ink-200 bg-surface px-5 py-2 text-[0.875rem] font-semibold text-ink-600"
              >
                {m}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Teknik Süreç
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { step: "01", title: "API Bağlantısı", desc: "Marketplace API anahtarlarınızla bağlantı kuruyoruz, sandbox testlerini tamamlıyoruz." },
              { step: "02", title: "Stok Haritalama", desc: "Ürün kataloğunuzu marketplace formatlarına uyarlıyor, SKU eşleştirme yapıyoruz." },
              { step: "03", title: "Sipariş Akışı Testi", desc: "Gerçek siparişlerle uçtan uca test yapıyor, edge case'leri kapatıyoruz." },
              { step: "04", title: "Canlıya Geçiş", desc: "Sistemi devreye alıyor, ilk 7 gün yakından izliyoruz." },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 100}>
                <div className="flex items-start gap-5">
                  <span className="shrink-0 rounded-md border border-accent-200 bg-accent-50 px-2.5 py-[0.3rem] text-center text-[0.7rem] font-black text-accent-700">
                    {item.step}
                  </span>
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

      {/* Form */}
      <section id="form" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[600px]">
          <Reveal>
            <p className="eyebrow mb-3">Ücretsiz Teklif</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,1.875rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Entegrasyon Teklifi Alın
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ink-500">
              Satış hacminizi ve mevcut altyapınızı inceleyerek 24 saat içinde size özel teklif hazırlıyoruz.
            </p>
          </Reveal>
          <div className="rounded-[12px] border border-ink-200 bg-surface p-10">
            <TrendyolLeadForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <h2 className="mb-8 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink-900">
              Sık Sorulan Sorular
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {[
              { q: "Trendyol entegrasyonu ne kadar sürer?", a: "Tek marketplace için 7–10 iş günü, birden fazla marketplace (Trendyol + Hepsiburada + eBay gibi) için 12–15 iş günü teslim ediyoruz." },
              { q: "Hangi marketplace'lerle çalışıyorsunuz?", a: "Trendyol, Hepsiburada, eBay, Amazon Türkiye, N11, Çiçeksepeti ve Etsy API entegrasyonu yapıyoruz. Listelenmeyenler için de teknik değerlendirme yapıyoruz." },
              { q: "Mevcut e-ticaret sitemle entegre edebilir misiniz?", a: "Evet. WordPress/WooCommerce, Shopify ve özel geliştirilmiş sistemlerle entegrasyon yapabiliyoruz. Mevcut altyapınızı değerlendirmek için teklifle birlikte teknik analiz sunuyoruz." },
              { q: "eBay ve Etsy gibi uluslararası platformları da kapsıyor mu?", a: "Evet. eBay ve Etsy API entegrasyonları da kapsamımızdadır. Uluslararası platformlar için döviz yönetimi ve uluslararası kargo entegrasyonu ayrıca ele alınır." },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-ink-200 py-5">
                <h3 className="mb-2 text-[0.95rem] font-bold text-ink-900">{faq.q}</h3>
                <p className="text-[0.875rem] leading-[1.65] text-ink-500">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/hizmetler/trendyol-entegrasyonu"
              className="text-[0.875rem] font-semibold text-accent-700 underline"
            >
              Trendyol Entegrasyonu servis sayfasını görüntüle →
            </Link>
          </div>
        </div>
      </section>

      <RelatedGuides category={["trendyol", "e-ticaret"]} title="Trendyol & Entegrasyon Rehberleri" />

      {/* TicaretHub Cross-Promo */}
      <section className="border-t border-ink-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <p className="eyebrow mb-3">Ücretsiz Araçlar</p>
            <h2 className="mb-3 text-[1.25rem] font-extrabold tracking-[-0.02em] text-ink-900">
              Önce Rakamları Kendiniz Görmek İster misiniz?
            </h2>
            <p className="mb-8 max-w-[540px] text-[0.875rem] leading-[1.7] text-ink-500">
              Entegrasyon kararı vermeden önce Trendyol&apos;daki kâr marjınızı, komisyon maliyetinizi ve fiyat stratejinizi hesaplamak için kardeş platform{" "}
              <a
                href="https://ticarethub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-700 underline underline-offset-2"
              >
                TicaretHub
              </a>
              &apos;un ücretsiz araçlarını kullanabilirsiniz.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              {[
                {
                  href: "https://ticarethub.com/trendyol-komisyon-hesaplama",
                  label: "Komisyon Hesaplama",
                  desc: "Kategoriye göre net komisyon oranı",
                },
                {
                  href: "https://ticarethub.com/trendyol-kar-analizi",
                  label: "Kâr Analizi",
                  desc: "Ürün bazında kâr/zarar simülasyonu",
                },
                {
                  href: "https://ticarethub.com/trendyol-fiyat-hesaplama",
                  label: "Fiyat Hesaplama",
                  desc: "Hedef kâra göre satış fiyatı hesapla",
                },
              ].map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[8px] border border-ink-200 bg-surface p-5 transition-colors hover:border-accent-300 hover:bg-accent-50"
                >
                  <p className="mb-1 text-[0.875rem] font-bold text-ink-900 group-hover:text-accent-700">
                    {tool.label} →
                  </p>
                  <p className="text-[0.8rem] leading-[1.55] text-ink-500">{tool.desc}</p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
