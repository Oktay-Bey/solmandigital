import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Zap, Clock, TrendingUp, Bot, FileText, ShoppingCart } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import AILeadForm from "./AILeadForm"

export const metadata: Metadata = {
  title: "Yapay Zeka & AI Otomasyon Hizmeti | Solman Digital İstanbul",
  description:
    "GPT-4o ile içerik otomasyonu, chatbot, ürün açıklama üretimi ve iş süreçleri otomasyonu. Türkiye'de AI entegrasyonu — somut ROI, 3-6 hafta kurulum.",
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
    description: "GPT-4o ile içerik otomasyonu, chatbot ve iş süreci otomasyonu. 3-6 hafta kurulum.",
    url: `${siteConfig.url}/ai-otomasyon-hizmeti`,
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
      mainEntity: [
        {
          "@type": "Question",
          name: "AI otomasyon kurulumu ne kadar sürer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Projenin kapsamına göre 3-6 hafta arasında değişir. İçerik otomasyonu gibi tek bir süreç için 2-3 haftada canlıya geçebiliriz.",
          },
        },
        {
          "@type": "Question",
          name: "Hangi AI modellerini kullanıyorsunuz?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OpenAI GPT-4o, Anthropic Claude ve Serper API'yi kullanıyoruz. Projeye göre en uygun modeli birlikte seçiyoruz.",
          },
        },
        {
          "@type": "Question",
          name: "Mevcut sistemlerimize entegrasyon yapılabilir mi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet. WordPress, Shopify, Trendyol/Hepsiburada panelleri, CRM sistemleri ve REST API'ye sahip her platforma entegrasyon yapabiliyoruz.",
          },
        },
      ],
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
      <section style={{ backgroundColor: "#0d0d0d", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            display: "inline-block",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c",
            border: "1px solid #3d0f0f", borderRadius: 4,
            padding: "0.3rem 0.8rem", marginBottom: "1.5rem",
          }}>
            GPT-4o · Claude · Özel AI Sistemleri
          </p>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900, color: "#ffffff",
            letterSpacing: "-0.03em", marginBottom: "1.25rem", lineHeight: 1.15,
          }}>
            Yapay Zeka ile İş Süreçlerinizi Otomatize Edin
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#a0a0a0", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 600, margin: "0 auto 2.5rem" }}>
            Günde kaç saatinizi tekrar eden işlere harcıyorsunuz? İçerik üretimi, ürün açıklamaları, müşteri soruları — bunların hepsini AI ile otomatize edebilirsiniz.
          </p>
          <a
            href="#form"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              backgroundColor: "#9b1c1c", color: "#ffffff",
              padding: "0.9rem 2rem", borderRadius: 8,
              fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            Ücretsiz AI Analizi İste <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* AI Ne Zaman Mantıklı? */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c", marginBottom: "0.75rem",
          }}>
            Gerçek Sonuçlar
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
            AI Ne Zaman Mantıklı?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {examples.map((ex) => (
              <div
                key={ex.label}
                style={{
                  border: "1px solid #e0e0e0", borderRadius: 10, padding: "1.75rem",
                  display: "flex", flexDirection: "column", gap: "0.75rem",
                }}
              >
                <div style={{
                  width: 40, height: 40, backgroundColor: "#fff5f5", borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <ex.icon size={20} color="#9b1c1c" />
                </div>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111111", margin: 0 }}>{ex.label}</p>
                <div style={{ fontSize: "0.85rem", color: "#666666" }}>
                  <p style={{ margin: "0 0 0.25rem" }}>Öncesi: <span style={{ color: "#9b1c1c" }}>{ex.before}</span></p>
                  <p style={{ margin: 0 }}>Sonrası: <strong style={{ color: "#111" }}>{ex.after}</strong></p>
                </div>
                <p style={{
                  fontSize: "0.75rem", fontWeight: 700, color: "#16a34a",
                  backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                  borderRadius: 4, padding: "0.25rem 0.6rem", alignSelf: "flex-start", margin: 0,
                }}>
                  {ex.saving}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmet Kataloğu */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            AI Otomasyon Hizmetleri
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                style={{
                  backgroundColor: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 10,
                  padding: "1.75rem", textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.75rem",
                }}
              >
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111111", margin: 0 }}>{s.title}</p>
                <p style={{ fontSize: "0.85rem", color: "#666666", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                <span style={{ fontSize: "0.8rem", color: "#9b1c1c", fontWeight: 600 }}>Detayları Gör →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#111111", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Nasıl Çalışır?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { step: "01", title: "Discovery", desc: "Mevcut süreçlerinizi ve tekrar eden iş yükünüzü haritalıyoruz." },
              { step: "02", title: "Prototip", desc: "AI modelini seçiyor, küçük ölçekte test ediyoruz." },
              { step: "03", title: "Entegrasyon", desc: "Mevcut sistemlerinize (WordPress, CRM, marketplace) bağlıyoruz." },
              { step: "04", title: "Canlı + İzleme", desc: "Sistemi devreye alıyor, çıktı kalitesini birlikte izliyoruz." },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 900, color: "#9b1c1c",
                  backgroundColor: "#fff5f5", border: "1px solid #fecaca",
                  borderRadius: 6, padding: "0.3rem 0.6rem", minWidth: 36, textAlign: "center", flexShrink: 0,
                }}>
                  {item.step}
                </span>
                <div>
                  <p style={{ fontWeight: 700, color: "#111111", margin: "0 0 0.25rem", fontSize: "0.95rem" }}>{item.title}</p>
                  <p style={{ color: "#666666", margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#9b1c1c", marginBottom: "0.75rem",
          }}>
            Ücretsiz Analiz
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 1.875rem)", fontWeight: 800, color: "#111111", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Otomasyon Potansiyelinizi Keşfedin
          </h2>
          <p style={{ color: "#666666", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Hangi süreçlerinizin otomasyon potansiyeli taşıdığını ücretsiz analiz ediyoruz.
          </p>
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "2.5rem" }}>
            <AILeadForm />
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section style={{ padding: "3rem 1.5rem", backgroundColor: "#0d0d0d", textAlign: "center" }}>
        <p style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "1rem" }}>
          Emin değil misiniz? Önce mevcut sitenizin ve içerik yapınızın AI hazırlığını ücretsiz değerlendirin.
        </p>
        <Link
          href="/ucretsiz-analiz"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            border: "1px solid #444", color: "#ffffff",
            padding: "0.75rem 1.5rem", borderRadius: 8,
            fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
          }}
        >
          Ücretsiz Site Analizi <ArrowRight size={15} />
        </Link>
      </section>
    </>
  )
}
