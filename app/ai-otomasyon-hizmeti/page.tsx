import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, ShoppingCart, Bot, MapPin, FileCheck, ShieldCheck } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import AILeadForm from "./AILeadForm"
import OpenChatButton from "@/components/OpenChatButton"
import Reveal from "@/components/Reveal"
import RelatedGuides from "@/components/RelatedGuides"

export const metadata: Metadata = {
  title: "AI Otomasyon Hizmeti — 1 Haftada Teslim | Solman Digital İstanbul",
  description:
    "Tekrarlayan iş yükünüzü AI ile otomatize edin: içerik üretimi, ürün açıklamaları, müşteri chatbotu. GPT-4o & Claude entegrasyonu, 1 haftada teslim, somut ROI.",
  keywords: [
    "yapay zeka otomasyon",
    "ai içerik otomasyonu",
    "gpt entegrasyon",
    "ai iş otomasyonu türkiye",
    "yapay zeka içerik üretimi",
    "chatbot geliştirme",
    "otomasyon yazılımı türkiye",
    "ai otomasyon istanbul",
  ],
  alternates: { canonical: `${siteConfig.url}/ai-otomasyon-hizmeti` },
  openGraph: {
    title: "Yapay Zeka & AI Otomasyon Hizmeti | Solman Digital",
    description: "GPT-4o ile içerik otomasyonu, chatbot ve iş süreci otomasyonu. 1 haftada teslim.",
    url: `${siteConfig.url}/ai-otomasyon-hizmeti`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

// Tek kaynak: hem JSON-LD FAQPage hem görünür FAQ bölümü buradan beslenir.
const faqs = [
  {
    q: "AI otomasyon kurulumu ne kadar sürer?",
    a: "Çoğu otomasyonu 1 haftada teslim ediyoruz. İçerik üretimi, ürün açıklaması veya chatbot gibi tek bir süreç için bir hafta içinde canlıya geçebiliriz; çok katmanlı entegrasyonlarda süreyi başlangıçta net olarak paylaşıyoruz.",
  },
  {
    q: "Hangi AI modellerini kullanıyorsunuz?",
    a: "OpenAI GPT-4o, Anthropic Claude ve Serper API'yi kullanıyoruz. Projeye göre en uygun modeli birlikte seçiyoruz.",
  },
  {
    q: "Mevcut sistemlerimize entegrasyon yapılabilir mi?",
    a: "Evet. WordPress, Shopify, Trendyol/Hepsiburada panelleri, CRM sistemleri ve REST API'ye sahip her platforma entegrasyon yapabiliyoruz.",
  },
  {
    q: "Fiyat nasıl belirleniyor? Sürpriz maliyet olur mu?",
    a: "Proje kapsamı netleştikten sonra sabit fiyat teklifi sunuyoruz — saat bazlı faturalandırma yok. Sözleşme ve e-fatura ile çalışıyoruz.",
  },
  {
    q: "Geliştirilen sistemin sahibi kim olur?",
    a: "Tüm kaynak kodu ve sistem size aittir. Teslimde kodu ve dokümantasyonu devrediyoruz; kilitli bir platforma bağımlı kalmazsınız.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "AI & Yapay Zeka Otomasyon Hizmeti",
      description:
        "GPT-4o ve Claude AI ile içerik otomasyonu, müşteri hizmetleri chatbotu ve iş süreci otomasyonu geliştirme.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: `${siteConfig.url}/ai-otomasyon-hizmeti`,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

const examples = [
  {
    icon: FileText,
    label: "İçerik Otomasyonu",
    before: "Blog makalesi başına 3 saat",
    after: "AI ile 20 dakika",
    saving: "%89 zaman tasarrufu",
  },
  {
    icon: ShoppingCart,
    label: "Ürün Açıklamaları",
    before: "200 ürün = 40 saat manuel iş",
    after: "200 ürün = 2 saat",
    saving: "%95 zaman tasarrufu",
  },
  {
    icon: Bot,
    label: "Müşteri Chatbotu",
    before: "Sorguların %70'i tekrarlıyor",
    after: "7/24 otomatik yanıt",
    saving: "Destek maliyeti -%60",
  },
]

const services = [
  {
    title: "AI İçerik & Blog Otomasyonu",
    desc: "SEO uyumlu blog içeriği, sosyal medya paylaşımları ve haber özetlerini otomatik üretin.",
    href: "/hizmetler/ai-icerik-otomasyonu",
  },
  {
    title: "Ürün Açıklama Otomasyonu",
    desc: "Trendyol, Hepsiburada ve web siteniz için yüzlerce ürün açıklamasını saniyeler içinde oluşturun.",
    href: "/hizmetler/urun-aciklama-otomasyonu",
  },
  {
    title: "AI Müşteri Chatbotu",
    desc: "Sık sorulan soruları otomatik yanıtlayan, satış öncesi destek sağlayan akıllı chatbot.",
    href: "/hizmetler/ai-musteri-chatbotu",
  },
]

export default function AIOtomasyonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-16 pt-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sol: başlık + değer önerisi */}
          <div>
            <Reveal>
              <p className="mb-5 inline-block rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
                1 Haftada Teslim · GPT-4o · Claude
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mb-5 text-[clamp(2rem,4vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
                Tekrarlayan İş Yükünüzü AI ile Otomatize Edin — 1 Haftada Teslim
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-7 text-[1rem] leading-[1.75] text-ondark-muted">
                İçerik üretimi, ürün açıklamaları, müşteri soruları — tekrar eden iş yükünüzü AI ile otomatize ediyoruz.{" "}
                <span className="font-semibold text-white">1 haftada teslim,</span>{" "}
                somut ROI hedefiyle.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <ul className="flex flex-col gap-2.5">
                {[
                  "İçerik otomasyonu: haftada 3 saat → 20 dakika",
                  "200 ürün açıklaması: 40 saat → 2 saat",
                  "Müşteri soruları: %60 destek maliyeti azalır",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ondark-muted">
                    <span className="mt-0.5 shrink-0 text-[#4ade80]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sağ: form — mobilde içeriğin hemen altına gelir (order-first lg:order-last) */}
          <Reveal delay={150} className="order-first lg:order-last">
            <div className="rounded-[14px] border border-dark-50 bg-white p-8 shadow-xl">
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">Ücretsiz Analiz</p>
              <h2 className="mb-3 text-[1.15rem] font-extrabold tracking-tight text-ink-900">
                Otomasyon potansiyelinizi keşfedin
              </h2>
              <p className="mb-5 flex items-center gap-1.5 text-[0.78rem] text-ink-500">
                <span className="text-[#16a34a]">●</span>
                Son 30 günde 5 firma sürece başladı
              </p>
              <AILeadForm />
              <div className="mt-4 border-t border-ink-200 pt-4 text-center">
                <p className="mb-2 text-[0.78rem] text-ink-500">Form doldurmak istemez misiniz?</p>
                <OpenChatButton
                  label="Sohbette hemen sorun — anında yanıt"
                  source="ai_landing_form"
                  variant="ghost"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Güven şeridi — şeffaflık (LPE + dönüşüm): kim olduğumuz, yasal güvence */}
      <section className="border-b border-ink-200 bg-surface px-6 py-5">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.8rem] text-ink-600">
          <span className="inline-flex items-center gap-2">
            <MapPin size={15} className="text-accent-700" /> Beşiktaş, İstanbul merkezli yazılım ofisi
          </span>
          <span className="inline-flex items-center gap-2">
            <FileCheck size={15} className="text-accent-700" /> Sözleşme + e-fatura
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={15} className="text-accent-700" /> Sabit fiyat, saat bazlı fatura yok
          </span>
        </div>
      </section>

      {/* AI Ne Zaman Mantıklı? */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="eyebrow mb-3">Gerçek Sonuçlar</p>
            <h2 className="mb-12 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              AI Ne Zaman Mantıklı?
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {examples.map((ex, i) => (
              <Reveal key={ex.label} delay={i * 100}>
                <div className="card flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-accent-200 bg-accent-50">
                    <ex.icon size={20} className="text-accent-700" />
                  </div>
                  <p className="text-[0.95rem] font-bold text-ink-900">{ex.label}</p>
                  <div className="text-[0.85rem] text-ink-500">
                    <p className="mb-1">Öncesi: <span className="text-accent-700">{ex.before}</span></p>
                    <p>Sonrası: <strong className="text-ink-900">{ex.after}</strong></p>
                  </div>
                  <p className="self-start rounded border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-[0.25rem] text-[0.75rem] font-bold text-success">
                    {ex.saving}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmet Kataloğu */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              AI Otomasyon Hizmetleri
            </h2>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {services.map((s, i) => (
              <Reveal key={s.href} delay={i * 100}>
                <Link
                  href={s.href}
                  className="card-interactive group flex flex-col gap-3"
                >
                  <p className="text-[0.95rem] font-bold text-ink-900">{s.title}</p>
                  <p className="text-[0.85rem] leading-[1.6] text-ink-500">{s.desc}</p>
                  <span className="text-[0.8rem] font-semibold text-accent-700 group-hover:underline">Detayları Gör →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Nasıl Çalışır?
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Mevcut süreçlerinizi ve tekrar eden iş yükünüzü haritalıyoruz." },
              { step: "02", title: "Prototip", desc: "AI modelini seçiyor, küçük ölçekte test ediyoruz." },
              { step: "03", title: "Entegrasyon", desc: "Mevcut sistemlerinize (WordPress, CRM, marketplace) bağlıyoruz." },
              { step: "04", title: "Canlı + İzleme", desc: "Sistemi devreye alıyor, çıktı kalitesini birlikte izliyoruz." },
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

      {/* Fiyatlandırma */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="eyebrow mb-3">Fiyatlandırma</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Sabit Paket, Sürpriz Fatura Yok
            </h2>
            <p className="mb-10 text-[0.9rem] leading-[1.7] text-ink-500">
              Proje kapsamı netleştikten sonra sabit fiyat teklifi sunulur — saat bazlı faturalandırma yoktur.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              {[
                { label: "Tek Süreç", price: "₺15.000", desc: "İçerik üretimi, chatbot veya ürün açıklaması — tek bir süreçte otomasyon.", highlight: false },
                { label: "Çoklu Süreç", price: "₺25.000+", desc: "Birden fazla iş akışı, CRM entegrasyonu veya özel AI pipeline.", highlight: true },
              ].map((pkg) => (
                <div
                  key={pkg.label}
                  className={`rounded-[12px] border p-7 ${pkg.highlight ? "border-accent-400 bg-accent-50" : "border-ink-200 bg-white"}`}
                >
                  <p className={`mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] ${pkg.highlight ? "text-accent-700" : "text-ink-400"}`}>
                    {pkg.label}
                  </p>
                  <p className="mb-3 text-[1.75rem] font-black tracking-[-0.03em] text-ink-900">{pkg.price}</p>
                  <p className="text-[0.85rem] leading-[1.6] text-ink-500">{pkg.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Görünür FAQ — şeffaflık/itiraz giderme (LPE useful content + dönüşüm) */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Sık Sorulan Sorular
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <div className="border-b border-ink-200 pb-6">
                  <h3 className="m-0 mb-2 text-[0.95rem] font-bold text-ink-900">{item.q}</h3>
                  <p className="m-0 text-[0.875rem] leading-relaxed text-ink-500">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* İlgili Rehberler — içeriğe next-click, bounce ↓ */}
      <RelatedGuides
        category={["yapay-zeka", "e-ticaret"]}
        title="AI Otomasyonu Hakkında Rehberler"
        intro="Otomasyon kararı vermeden önce, gerçek proje deneyiminden derlenen rehberlerimize göz atın."
      />

      {/* Secondary CTA */}
      <section className="bg-dark-500 px-6 py-12 text-center">
        <div className="mx-auto max-w-[560px]">
          <p className="mb-4 text-[0.9rem] text-ondark-muted">
            Emin değil misiniz? Önce mevcut sitenizin ve içerik yapınızın AI hazırlığını ücretsiz değerlendirin.
          </p>
          <Link href="/ucretsiz-analiz" className="btn btn-outline-dark">
            Ücretsiz Site Analizi <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* TicaretHub — diskret alt referans (odak dağıtmaz, dış kaçışı en aza indirir) */}
      <section className="bg-white px-6 py-8">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[0.8rem] leading-[1.6] text-ink-400">
            Küçük ölçekte denemek isterseniz hazır AI araçlarımız{" "}
            <a
              href="https://ticarethub.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-semibold text-ink-500 underline underline-offset-2 hover:text-accent-700"
            >
              TicaretHub
            </a>
            &apos;ta.
          </p>
        </div>
      </section>
    </>
  )
}
