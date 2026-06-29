"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

const contentMap = {
  newsletter: {
    title: "Rehberiniz Yolda!",
    body: "E-Ticaret Başlangıç Rehberi e-posta adresinize gönderildi. 5 dakika içinde gelmezse spam klasörünü kontrol edin.",
    nextTitle: "Sıradaki Adım",
    nextDesc: "Mevcut web sitenizin teknik SEO ve hız durumunu ücretsiz analiz ettirin.",
    nextCta: "Ücretsiz Site Analizi İste",
    nextHref: "/ucretsiz-analiz",
  },
  audit: {
    title: "Analiz Talebiniz Alındı!",
    body: "Sitenizi incelemeye başladık. 24 saat içinde bulgular ve öncelikli adımları e-posta adresinize göndereceğiz.",
    nextTitle: "Sıradaki Adım",
    nextDesc: "Bulguları beklemeden konuşalım: 30 dakikalık ücretsiz görüşmede çözümü ve sabit fiyat teklifini birlikte netleştirelim.",
    nextCta: "Ücretsiz Görüşme Planla",
    nextHref: "/danismanlik",
  },
  consultation: {
    title: "Mesajınız İletildi!",
    body: "24 saat içinde size dönüş yapacağız. Acil durumlarda WhatsApp'tan yazabilirsiniz: +90 543 967 52 50",
    nextTitle: "Hizmetleri İnceleyin",
    nextDesc: "Görüşme öncesinde sunduğumuz tüm hizmetleri inceleyebilirsiniz.",
    nextCta: "Tüm Hizmetleri Gör",
    nextHref: "/hizmetler",
  },
  "web-sitesi": {
    title: "Talebiniz Alındı!",
    body: "Web sitesi projenizi inceleyeceğiz. 24 saat içinde fiyat teklifi ve detaylı bilgi için size ulaşacağız. Acil durumlarda info@solmandigital.com.tr adresine yazabilirsiniz.",
    nextTitle: "Sıradaki Adım",
    nextDesc: "Görüşme beklemeden projenizi daha iyi anlayalım: 30 dakikalık ücretsiz danışmanlık seansı için randevu alın.",
    nextCta: "Ücretsiz Danışmanlık Rezervasyonu",
    nextHref: "/danismanlik",
  },
  trendyol: {
    title: "Entegrasyon Talebiniz Alındı!",
    body: "Marketplace entegrasyon ihtiyacınızı aldık. Satış hacminizi ve mevcut altyapınızı inceleyerek 24 saat içinde size özel teklif hazırlayacağız.",
    nextTitle: "Hemen Harekete Geçin",
    nextDesc: "Stok ve sipariş karmaşasını çözmenin ilk adımı ücretsiz teknik analizden geçiyor. Mevcut entegrasyon yapınızı analiz edelim.",
    nextCta: "Ücretsiz Teknik Analiz İste",
    nextHref: "/ucretsiz-analiz",
  },
  saas: {
    title: "SaaS Proje Talebiniz Alındı!",
    body: "SaaS ürün fikrinizi aldık. Teknik fizibilite ve mimari planlamayı birlikte konuşmak için 24 saat içinde size ulaşacağız.",
    nextTitle: "Hızlı İlerleme",
    nextDesc: "30 dakikalık teknik danışmanlık seansında MVP kapsamını ve teknik stack'i birlikte planlayalım.",
    nextCta: "Danışmanlık Seansı Planla",
    nextHref: "/danismanlik",
  },
  ai: {
    title: "AI Otomasyon Talebiniz Alındı!",
    body: "Otomasyon potansiyelinizi incelemeye başladık. Mevcut süreçlerinizi ve ROI hesabını birlikte çıkarmak için 24 saat içinde size dönüş yapacağız.",
    nextTitle: "Önce Analiz Yapalım",
    nextDesc: "Web sitenizin ve mevcut içerik yapınızın AI otomasyon hazırlığını ücretsiz değerlendirin.",
    nextCta: "Ücretsiz AI Hazırlık Analizi",
    nextHref: "/ucretsiz-analiz",
  },
  "istanbul-dev": {
    title: "Mesajınız İletildi!",
    body: "Projenizi inceleyeceğiz. İstanbul'da buluşmak ya da Zoom görüşmesi yapmak için 24 saat içinde size ulaşacağız. WhatsApp tercih edilirse hızlı dönüş yapılır.",
    nextTitle: "Tüm Hizmetleri Görün",
    nextDesc: "Geliştirdiğimiz web sitesi, SaaS ve AI otomasyon çözümlerini inceleyin, projenize en uygun hizmeti bulun.",
    nextCta: "Hizmetleri İncele",
    nextHref: "/hizmetler",
  },
  "istanbul-local": {
    title: "Talebiniz Alındı!",
    body: "Projenizi inceleyeceğiz. İstanbul'da yüz yüze veya Zoom görüşmesi için 24 saat içinde size ulaşacağız. Acil durumlarda WhatsApp veya info@solmandigital.com.tr adresine yazabilirsiniz.",
    nextTitle: "Sıradaki Adım",
    nextDesc: "Görüşme beklemeden projenizi daha iyi anlayalım: 30 dakikalık ücretsiz danışmanlık seansı için randevu alın.",
    nextCta: "Ücretsiz Danışmanlık Rezervasyonu",
    nextHref: "/danismanlik",
  },
  "contact-en": {
    title: "Message received!",
    body: "We'll review your project and get back to you within 24 hours. For anything urgent, reach us on WhatsApp: +90 543 967 52 50",
    nextTitle: "While you wait",
    nextDesc: "See the projects we've shipped — web apps, SaaS products, AI integrations and e-commerce platforms.",
    nextCta: "View Portfolio",
    nextHref: "/portfoy",
  },
  partnership: {
    title: "Partnership Request Received!",
    body: "We'll review your agency profile and get back within 24 hours with a tailored proposal. In the meantime, feel free to browse our portfolio.",
    nextTitle: "While You Wait",
    nextDesc: "See the projects we've shipped — web apps, SaaS products, AI integrations and e-commerce platforms.",
    nextCta: "View Portfolio",
    nextHref: "/portfoy",
  },
  fiyat: {
    title: "Fiyat Talebiniz Alındı!",
    body: "Projenizi inceleyeceğiz. 24 saat içinde pakete özel fiyat teklifi ve detaylı bilgi için size ulaşacağız.",
    nextTitle: "Sıradaki Adım",
    nextDesc: "30 dakikalık ücretsiz danışmanlık seansında kapsam ve teknik gereksinimleri birlikte netleştirelim.",
    nextCta: "Ücretsiz Danışmanlık Rezervasyonu",
    nextHref: "/danismanlik",
  },
  "musteri-yaniti": {
    title: "Talebiniz Alındı!",
    body: "Müşteri yanıt otomasyonu talebinizi aldık. İşletmenize özel kurulumu ve sabit fiyatı netleştirmek için 24 saat içinde sizi telefonla arayacağız. Daha hızlı dönüş için WhatsApp'tan da yazabilirsiniz: +90 543 967 52 50",
    nextTitle: "Sıradaki Adım",
    nextDesc: "Beklemeden konuşalım: WhatsApp'tan yazın, kaçan çağrı/mesaj akışınızı ve çözümü birlikte 10 dakikada netleştirelim.",
    nextCta: "Hizmetleri İncele",
    nextHref: "/hizmetler",
  },
}

export default function TesekkurlerContent() {
  const params = useSearchParams()
  const type = (params.get("type") as keyof typeof contentMap) || "newsletter"
  const content = contentMap[type] || contentMap.newsletter


  return (
    <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
      <div
        style={{
          width: 56,
          height: 56,
          backgroundColor: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}
      >
        <CheckCircle2 size={28} color="#16a34a" />
      </div>

      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 800,
          color: "#111111",
          marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}
      >
        {content.title}
      </h1>

      <p style={{ color: "#6b6b6b", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        {content.body}
      </p>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          border: "1px solid #e0e0e0",
          borderRadius: 10,
          padding: "1.75rem",
          textAlign: "left",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "#9b1c1c",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.625rem",
          }}
        >
          {content.nextTitle}
        </p>
        <p style={{ color: "#444444", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
          {content.nextDesc}
        </p>
        <Link
          href={content.nextHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#9b1c1c",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: 7,
            fontWeight: 700,
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          {content.nextCta} <ArrowRight size={15} />
        </Link>
      </div>

      <p style={{ marginTop: "2rem", fontSize: "0.8rem", color: "#aaaaaa" }}>
        <Link href="/" style={{ color: "#aaaaaa", textDecoration: "underline" }}>
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  )
}
