import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Phone, MessageCircle, Utensils, Scissors, Building2, Car, MapPin, FileCheck, ShieldCheck } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import MusteriYanitForm from "./MusteriYanitForm"
import OpenChatButton from "@/components/OpenChatButton"
import WhatsAppLink from "@/components/WhatsAppLink"
import Reveal from "@/components/Reveal"
import RelatedGuides from "@/components/RelatedGuides"

export const metadata: Metadata = {
  title: "Müşteri Yanıt Otomasyonu — Telefon & WhatsApp 7/24 Yanıt | Solman Digital",
  description:
    "Telefon, WhatsApp ve sitenizden gelen müşteri talebini 7/24 otomatik yanıtlayan sistem. QR menü + sipariş, randevu, fiyat sorusu otomasyonu. ₺15.000'dan, 1 haftada teslim.",
  keywords: [
    "whatsapp otomatik cevap",
    "whatsapp business otomatik mesaj",
    "müşteri yanıt otomasyonu",
    "yapay zeka müşteri hizmetleri",
    "qr menü sipariş sistemi",
    "kuaför randevu programı",
    "emlak crm",
    "bulut santral sesli yanıt",
    "işletme chatbot istanbul",
  ],
  alternates: { canonical: `${siteConfig.url}/musteri-yanit-sistemi` },
  openGraph: {
    title: "Müşteri Yanıt Otomasyonu — Telefon & WhatsApp 7/24 Yanıt | Solman Digital",
    description: "Gelen her müşteriye 7/24 otomatik yanıt. WhatsApp, telefon ve sitenizden kaçan talebi işe çeviriyoruz. ₺15.000'dan, 1 haftada.",
    url: `${siteConfig.url}/musteri-yanit-sistemi`,
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
}

// Tek kaynak: hem JSON-LD FAQPage hem görünür FAQ buradan beslenir.
const faqs = [
  {
    q: "WhatsApp otomatik cevap nasıl çalışır, kendi numaramla mı?",
    a: "Evet. Kendi WhatsApp Business numaranıza bağlanır. Gelen mesaja fiyat, müsaitlik, adres, menü gibi sık sorulara anında yanıt verir; gerektiğinde randevu/sipariş bilgisini toplar veya sizi devreye alır. Numara, hesap ve veriler size aittir.",
  },
  {
    q: "Telefonu da karşılıyor mu (sesli yanıt / bulut santral)?",
    a: "İstenirse evet. Arandığında tuşlamalı/sesli kurumsal karşılama (IVR) kurulur; sık soruları yanıtlar, gerekiyorsa ilgili kişiye aktarır. Bulut santral + sesli yanıt çözümü; donanım gerekmez.",
  },
  {
    q: "Mevcut sistemime (takvim, sipariş, web) bağlanır mı?",
    a: "Evet. WhatsApp Business API, mevcut web siteniz, randevu/takvim ve REST API'ye sahip sipariş/CRM sistemlerine entegre edebiliyoruz. Restoran için QR menü + sipariş akışı da kurulabilir.",
  },
  {
    q: "Kurulum ne kadar sürer, fiyat sabit mi?",
    a: "Tek kanal kurulumunu çoğu işletmede 1 haftada teslim ediyoruz. Proje kapsamı netleştikten sonra sabit fiyat veririz — saat bazlı fatura yok. Sözleşme ve e-fatura ile çalışıyoruz.",
  },
  {
    q: "Sistem bize mi ait, aylık bağımlılık var mı?",
    a: "Yap-kur-çık modeli: kurulum tek seferliktir, kontrol size geçer. Telefon hattı, WhatsApp API ve AI kullanımı gibi işleyen kalemler doğrudan sağlayıcılar üzerinden sizin adınıza kurulur — bize aylık bağımlılık yoktur.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Müşteri Yanıt Otomasyonu (WhatsApp + Telefon + Web)",
      description:
        "Telefon, WhatsApp ve web sitesinden gelen müşteri talebini 7/24 otomatik yanıtlayan, randevuya/siparişe/lead'e çeviren AI sistemi.",
      provider: {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        url: siteConfig.url,
      },
      areaServed: "TR",
      url: `${siteConfig.url}/musteri-yanit-sistemi`,
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

// Sektör blokları — çoklu test çekirdeği. Her blok o sektörün KP-doğrulanmış diliyle.
const sectors = [
  {
    icon: Utensils,
    label: "Restoran & Kafe",
    pain: "Telefon çalıyor, mutfak yoğun, sipariş kaçıyor",
    gain: "QR menü + WhatsApp'tan sipariş ve rezervasyon otomatik alınır",
  },
  {
    icon: Scissors,
    label: "Güzellik & Kuaför",
    pain: '"Fiyat ne, müsait misiniz" mesajına yetişilemiyor',
    gain: "Fiyat ve randevu sorusu 7/24 yanıtlanır, takvime yazılır",
  },
  {
    icon: Building2,
    label: "Emlak",
    pain: "İlana arayan çok, danışman sahada → sıcak alıcı kaçar",
    gain: "Soruyu yakalar, bütçe/bölge sorar, danışmana sıcak lead verir",
  },
  {
    icon: Car,
    label: "Oto & Servis",
    pain: "Usta araç altında, telefonu açamıyor",
    gain: "Servis randevusu ve fiyat sorusu otomatik karşılanır",
  },
]

const steps = [
  { step: "01", title: "Keşif", desc: "Gelen çağrı/mesaj akışınızı ve en sık soruları çıkarıyoruz." },
  { step: "02", title: "Senaryo", desc: "Sık sorular + randevu/sipariş/lead akışını kurguluyoruz." },
  { step: "03", title: "Entegrasyon", desc: "WhatsApp Business API, telefon hattı/IVR, takvim veya siparişe bağlıyoruz." },
  { step: "04", title: "Canlı + İzleme", desc: "Sistemi devreye alıyor, yanıt kalitesini birlikte izliyoruz." },
]

const heroWaMessage = "Merhaba, müşteri yanıt otomasyonu (WhatsApp/telefon 7/24 yanıt) hakkında bilgi almak istiyorum."

export default function MusteriYanitPage() {
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
                7/24 Yanıt · WhatsApp + Telefon · 1 Haftada Kurulum
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mb-5 text-[clamp(2rem,4vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
                Gelen Her Müşteriye 7/24 Otomatik Yanıt — Telefon, WhatsApp ve Sitenizden Kaçan Talebi İşe Çeviriyoruz
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-7 text-[1rem] leading-[1.75] text-ondark-muted">
                Telefonu açamadığınız ya da mesaja geç döndüğünüz her an müşteri kaçar.
                Solman Digital olarak telefon ve WhatsApp'ınızı 7/24 karşılayan, soruları
                yanıtlayıp randevuya, siparişe veya lead'e çeviren bir sistem kuruyoruz.
                Hazır bir araç değil — işinize özel, <span className="font-semibold text-white">kurulum size ait</span>,
                ₺15.000+KDV'dan, <span className="font-semibold text-white">1 haftada teslim.</span>
              </p>
            </Reveal>
            <Reveal delay={300}>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Kaçan çağrı ve mesaj yakalanır — gece, hafta sonu, meşgulken bile",
                  "WhatsApp otomatik cevap: fiyat, müsaitlik, adres, menü",
                  "Talep randevuya / siparişe / sıcak lead'e dönüştürülür",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ondark-muted">
                    <span className="mt-0.5 shrink-0 text-[#4ade80]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sağ: form + WhatsApp (eşit ağırlıkta) — mobilde içeriğin hemen altına gelir */}
          <Reveal delay={150} className="order-first lg:order-last">
            <div className="rounded-[14px] border border-dark-50 bg-white p-8 shadow-xl">
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">Ücretsiz Kurulum Planı</p>
              <h2 className="mb-3 text-[1.15rem] font-extrabold tracking-tight text-ink-900">
                İşletmenize özel yanıt planını alın
              </h2>
              <p className="mb-5 flex items-center gap-1.5 text-[0.78rem] text-ink-500">
                <span className="text-[#16a34a]">●</span>
                Sabit fiyat · 24 saatte sizi arıyoruz
              </p>

              {/* WhatsApp birincil eylem — formdan ÖNCE, eşit ağırlıkta */}
              <WhatsAppLink
                message={heroWaMessage}
                source="musteri_yaniti_hero"
                className="btn mb-3 w-full justify-center gap-2 border border-[#25D366] bg-[#25D366] text-base font-bold text-white transition-colors hover:bg-[#1ebe57]"
              >
                <MessageCircle size={18} /> WhatsApp'tan hemen yaz — 2 dk'da yanıt
              </WhatsAppLink>
              <div className="mb-5 flex items-center gap-3 text-[0.72rem] text-ink-400">
                <span className="h-px flex-1 bg-ink-200" /> veya formu doldurun <span className="h-px flex-1 bg-ink-200" />
              </div>

              <MusteriYanitForm />
              <div className="mt-4 border-t border-ink-200 pt-4 text-center">
                <p className="mb-2 text-[0.78rem] text-ink-500">Sorunuz mu var?</p>
                <OpenChatButton
                  label="Sohbette hemen sorun — anında yanıt"
                  source="musteri_yaniti_form"
                  variant="ghost"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Güven şeridi — şeffaflık + dönüşüm */}
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

      {/* Sektör blokları */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="eyebrow mb-3">Sektörünüze Göre</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Aynı Sistem, Sektörünüze Özel Yüz
            </h2>
            <p className="mb-12 text-[0.9rem] leading-[1.7] text-ink-500">
              Çekirdek aynı: gelen talebi otomatik yanıtla, işe çevir. Yüzü işletmenize göre kuruyoruz.
            </p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {sectors.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="card flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-accent-200 bg-accent-50">
                    <s.icon size={20} className="text-accent-700" />
                  </div>
                  <p className="text-[0.95rem] font-bold text-ink-900">{s.label}</p>
                  <div className="text-[0.85rem] text-ink-500">
                    <p className="mb-1">Sorun: <span className="text-accent-700">{s.pain}</span></p>
                    <p>Çözüm: <strong className="text-ink-900">{s.gain}</strong></p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Süreç */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Nasıl Çalışır?
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {steps.map((item, i) => (
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
      <section className="bg-white px-6 py-20">
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
                { label: "Tek Kanal", price: "₺15.000+KDV", desc: "WhatsApp otomatik cevap veya telefon karşılama — tek kanalda yanıt otomasyonu.", highlight: false },
                { label: "Çoklu Kanal / Entegrasyon", price: "₺25.000+", desc: "WhatsApp + telefon (bulut santral / sesli yanıt) + sipariş/takvim/CRM entegrasyonu.", highlight: true },
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

      {/* Görünür FAQ */}
      <section className="bg-surface px-6 py-20">
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

      {/* İlgili Rehberler */}
      <RelatedGuides
        category={["yapay-zeka", "web-sitesi"]}
        title="Müşteri Otomasyonu Hakkında Rehberler"
        intro="Karar vermeden önce, gerçek proje deneyiminden derlenen rehberlerimize göz atın."
      />

      {/* Secondary CTA */}
      <section className="bg-dark-500 px-6 py-12 text-center">
        <div className="mx-auto max-w-[560px]">
          <p className="mb-5 text-[0.95rem] text-ondark-muted">
            Kaçan çağrı ve mesaj akışınızı konuşalım — 10 dakikada çözümü ve sabit fiyatı netleştirelim.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <WhatsAppLink
              message={heroWaMessage}
              source="musteri_yaniti_footer"
              className="btn justify-center gap-2 border border-[#25D366] bg-[#25D366] text-base font-bold text-white transition-colors hover:bg-[#1ebe57]"
            >
              <MessageCircle size={17} /> WhatsApp'tan Yaz
            </WhatsAppLink>
            <Link href={`tel:${siteConfig.whatsapp}`} className="btn btn-outline-dark gap-2">
              <Phone size={15} /> {siteConfig.whatsappDisplay}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
