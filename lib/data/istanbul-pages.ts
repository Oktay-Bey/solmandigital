export type IstanbulPage = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  district: string | null
  heroLabel: string
  heroH1: string
  heroSubtitle: string
  keywords: string[]
  faq: Array<{ q: string; a: string }>
  geo: { latitude: number; longitude: number }
  areaServed: string[]
  schemaServiceType: string
  googleMapsUrl: string
  sitemapPriority: number
  featuredServiceSlugs: string[]
}

export const istanbulPages: IstanbulPage[] = [
  {
    slug: "istanbul-web-tasarim",
    title: "İstanbul Web Tasarım",
    metaTitle: "İstanbul Web Tasarım — Hızlı, Mobil Uyumlu, SEO Hazır | Solman Digital",
    metaDescription:
      "İstanbul işletmeleri için modern web tasarım hizmeti. Next.js ile hızlı, mobil uyumlu ve SEO hazır web siteleri. Ajans markupı olmadan, doğrudan geliştirici ile çalışın.",
    district: null,
    heroLabel: "İstanbul · Türkiye Geneli Uzaktan",
    heroH1: "İstanbul İşletmeleri İçin Web Tasarım",
    heroSubtitle:
      "Ajans katmanı, ekip maliyeti yok. İstanbul merkezli Solman Digital olarak işletmenizin dijital vitrinini başından sonuna kadar biz kuruyoruz — hızlı, SEO uyumlu ve mobil öncelikli.",
    keywords: [
      "istanbul web tasarım",
      "istanbul web sitesi yaptırma",
      "istanbul web tasarım firması",
      "istanbul web geliştirme",
      "istanbul kurumsal web sitesi",
      "istanbul next.js geliştirici",
      "istanbul yazılım",
      "istanbul web ajans",
      "profesyonel web sitesi istanbul",
      "istanbul mobil uyumlu web sitesi",
    ],
    faq: [
      {
        q: "İstanbul'da yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. İstanbul Avrupa yakasında (özellikle Beşiktaş çevresi) yüz yüze buluşma sağlayabiliyoruz. Anadolu yakası ve diğer ilçeler için Zoom görüşmesi tercih edilir.",
      },
      {
        q: "Web tasarım projem ne kadar sürer?",
        a: "Kurumsal web sitesi projeleri genellikle 5–10 iş günü, e-ticaret projeleri 10–20 iş günü sürer. Projenin kapsamına göre kesin süre başlangıç görüşmesinde paylaşılır.",
      },
      {
        q: "E-fatura kesiyor musunuz?",
        a: "Evet, tüm projeler için e-fatura düzenliyoruz. Şirket veya bireysel fatura tercihinize göre fatura bilgilerini başlangıçta alıyoruz.",
      },
    ],
    geo: { latitude: 41.0082, longitude: 28.9784 },
    areaServed: ["İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Beşiktaş,İstanbul",
    sitemapPriority: 0.9,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "landing-page-tasarimi",
      "seo-teknik-altyapi",
      "cok-dilli-web-sitesi",
    ],
  },
  {
    slug: "istanbul-e-ticaret-yazilim",
    title: "İstanbul E-Ticaret Yazılım",
    metaTitle: "İstanbul E-Ticaret Yazılım & Mağaza Kurulum | Solman Digital",
    metaDescription:
      "İstanbul KOBİ'leri ve girişimcileri için e-ticaret yazılım geliştirme. Trendyol entegrasyonu, ödeme sistemi, ürün yönetimi. Next.js ile hızlı ve ölçeklenebilir online mağaza.",
    district: null,
    heroLabel: "İstanbul · E-Ticaret Uzmanı",
    heroH1: "İstanbul İşletmeleri için E-Ticaret Yazılım",
    heroSubtitle:
      "Online mağaza kurmak ya da Trendyol/Hepsiburada entegrasyonu mu istiyorsunuz? İstanbul merkezli Solman Digital olarak e-ticaret altyapınızı başından sonuna kuruyoruz.",
    keywords: [
      "istanbul e-ticaret yazılım",
      "istanbul online mağaza kurulum",
      "istanbul trendyol entegrasyonu",
      "istanbul e-ticaret sitesi",
      "istanbul web mağaza",
      "istanbul e-ticaret geliştirici",
      "istanbul ürün yönetim sistemi",
      "istanbul pazaryeri entegrasyonu",
      "istanbul next.js e-ticaret",
      "istanbul ödeme sistemi entegrasyonu",
    ],
    faq: [
      {
        q: "Trendyol ve Hepsiburada entegrasyonu yapıyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu, sipariş senkronizasyonu ve ürün listeleme otomasyonu başlıca uzmanlık alanlarımızdan biridir. Hepsiburada ve diğer pazaryerleri için de özel entegrasyon geliştiriyoruz.",
      },
      {
        q: "E-ticaret projesi ne kadar sürer?",
        a: "Temel online mağaza 10–15 iş günü, pazaryeri entegrasyonu içeren projeler 15–25 iş günü sürer. Ürün sayısı ve entegrasyon karmaşıklığına göre değişir.",
      },
      {
        q: "İyzico veya diğer ödeme sistemlerini entegre edebiliyor musunuz?",
        a: "Evet. İyzico, Stripe ve LemonSqueezy entegrasyonu yapıyoruz. Türk işletmeleri için İyzico'yu öneririz — yerel destek ve düşük komisyon avantajı sunar.",
      },
    ],
    geo: { latitude: 41.0082, longitude: 28.9784 },
    areaServed: ["İstanbul", "Türkiye"],
    schemaServiceType: "E-Ticaret Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Beşiktaş,İstanbul",
    sitemapPriority: 0.9,
    featuredServiceSlugs: [
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "odeme-entegrasyonu",
      "urun-aciklama-otomasyonu",
    ],
  },
  {
    slug: "istanbul-kurumsal-web-sitesi",
    title: "İstanbul Kurumsal Web Sitesi",
    metaTitle: "İstanbul Kurumsal Web Sitesi Yaptırma | Solman Digital",
    metaDescription:
      "İstanbul'daki şirketler için kurumsal web sitesi geliştirme. Hızlı, güvenli, SEO uyumlu. Ajans markupı olmadan doğrudan uzman ile. 5–10 iş günü teslim.",
    district: null,
    heroLabel: "İstanbul · Kurumsal Çözümler",
    heroH1: "İstanbul Şirketleri İçin Kurumsal Web Sitesi",
    heroSubtitle:
      "İstanbul'da faaliyet gösteren şirketler için profesyonel kurumsal web sitesi. Katmansız iletişim, şeffaf fiyat, garantili teslim tarihi.",
    keywords: [
      "istanbul kurumsal web sitesi",
      "istanbul şirket web sitesi",
      "istanbul profesyonel web sitesi",
      "istanbul kurumsal web tasarım",
      "istanbul b2b web sitesi",
      "istanbul next.js kurumsal",
      "istanbul seo uyumlu web sitesi",
      "istanbul web sitesi yaptırma fiyat",
      "istanbul şirket tanıtım sitesi",
      "istanbul holding web sitesi",
    ],
    faq: [
      {
        q: "Kurumsal web sitesi için içerik (metin, fotoğraf) hazırlamanıza yardımcı oluyor musunuz?",
        a: "Evet. Sayfa metinleri için SEO uyumlu içerik yazımı ve stok fotoğraf seçimi hizmet kapsamına dahil edilebilir. Kendi içeriğiniz varsa onu da kullanabiliriz.",
      },
      {
        q: "Web siteniz Google'da üst sıralara çıkar mı?",
        a: "Tüm projelerimizde teknik SEO kurulumu (meta etiketleri, schema.org, sitemap, sayfa hızı) standart olarak yapılır. Organik sıralama anahtar kelime rekabetine göre değişmekle birlikte, sağlam bir teknik altyapı ile başlarsınız.",
      },
      {
        q: "Web sitemizi sonradan kendimiz güncelleyebilir miyiz?",
        a: "Tercihlerinize göre iki seçenek sunuyoruz: (1) İçerik yönetim paneli (CMS) entegrasyonu ile kendiniz güncelleyebilirsiniz, (2) Teknik bakım ve güncelleme işlerini bizim yapmamızı tercih edebilirsiniz.",
      },
    ],
    geo: { latitude: 41.0082, longitude: 28.9784 },
    areaServed: ["İstanbul", "Türkiye"],
    schemaServiceType: "Kurumsal Web Sitesi Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Beşiktaş,İstanbul",
    sitemapPriority: 0.88,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "landing-page-tasarimi",
      "seo-teknik-altyapi",
      "dashboard-analitik",
    ],
  },
  {
    slug: "kadikoy-web-tasarim",
    title: "Kadıköy Web Tasarım",
    metaTitle: "Kadıköy Web Tasarım & Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Kadıköy'deki KOBİ'ler ve girişimler için web tasarım ve yazılım geliştirme. Modern, hızlı, SEO uyumlu web siteleri. Yüz yüze görüşme imkânı.",
    district: "Kadıköy",
    heroLabel: "Kadıköy · İstanbul",
    heroH1: "Kadıköy İşletmeleri İçin Web Tasarım",
    heroSubtitle:
      "Kadıköy'deki girişimler ve KOBİ'ler için web sitesi ve yazılım çözümleri. Katmansız iletişim, ajans maliyeti yok — doğrudan uzman ile, başından sonuna.",
    keywords: [
      "kadıköy web tasarım",
      "kadıköy web sitesi yaptırma",
      "kadıköy yazılım geliştirme",
      "kadıköy web geliştirici",
      "kadıköy dijital ajans",
      "kadıköy girişim web sitesi",
      "anadolu yakası web tasarım",
      "kadıköy kurumsal web sitesi",
      "kadıköy e-ticaret sitesi",
      "kadıköy next.js geliştirici",
    ],
    faq: [
      {
        q: "Kadıköy'de yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Kadıköy ve çevresi için yüz yüze görüşme organize edebiliyoruz. Proje başlangıcında bir tanışma toplantısı yapmayı tercih ediyoruz.",
      },
      {
        q: "KOBİ'ler için web tasarım fiyatları ne kadar?",
        a: "Temel kurumsal web sitesi ₺15.000'den başlar. Sayfa sayısı, özel özellikler ve entegrasyonlara göre fiyat değişir. Ücretsiz analiz formumuzu doldurarak tahmini bütçe alabilirsiniz.",
      },
      {
        q: "E-fatura kesiyor musunuz?",
        a: "Evet, tüm projeler için e-fatura düzenliyoruz. Şirket veya bireysel fatura tercihinize göre fatura bilgilerini başlangıçta alıyoruz.",
      },
    ],
    geo: { latitude: 40.9833, longitude: 29.0333 },
    areaServed: ["Kadıköy", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Kadıköy,İstanbul",
    sitemapPriority: 0.87,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "landing-page-tasarimi",
      "saas-web-uygulama",
      "ai-icerik-otomasyonu",
    ],
  },
  {
    slug: "sisli-yazilim-gelistirme",
    title: "Şişli Yazılım Geliştirme",
    metaTitle: "Şişli & Maslak Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Şişli ve Maslak'taki kurumsal şirketler için özel yazılım geliştirme. SaaS platformlar, dashboard & analitik, API entegrasyonları. B2B odaklı çözümler.",
    district: "Şişli",
    heroLabel: "Şişli · Maslak · İstanbul",
    heroH1: "Şişli ve Maslak Şirketleri İçin Yazılım Geliştirme",
    heroSubtitle:
      "Maslak ve Şişli'deki kurumsal şirketler için özel yazılım çözümleri. SaaS platformlar, iç raporlama araçları, API entegrasyonları — başından sonuna tek uzman ile.",
    keywords: [
      "şişli yazılım geliştirme",
      "maslak yazılım firması",
      "şişli kurumsal yazılım",
      "maslak saas geliştirme",
      "şişli web uygulaması",
      "maslak b2b yazılım",
      "şişli dashboard geliştirme",
      "maslak api entegrasyonu",
      "levent yazılım",
      "istanbul avrupa yakası yazılım",
    ],
    faq: [
      {
        q: "Maslak'taki ofisimize gelerek proje toplantısı yapabilir misiniz?",
        a: "Evet. Maslak ve Şişli bölgesi için yüz yüze proje toplantısı organize edebiliyoruz. Sprint bazlı düzenli check-in'ler için Zoom da kullanıyoruz.",
      },
      {
        q: "Kurumsal firmalar için NDA (gizlilik sözleşmesi) imzalıyor musunuz?",
        a: "Evet. Proje başlangıcında NDA imzalıyoruz. Proje yönetimi için kullandığımız araçlara sadece ilgili tarafların erişimi olur.",
      },
      {
        q: "SaaS platform geliştirme ne kadar sürer?",
        a: "MVP düzeyinde bir SaaS platform 4–8 hafta sürer. Kullanıcı yönetimi, abonelik sistemi ve temel özellikler bu süreye dahildir. Kapsama göre detaylı bir yol haritası hazırlıyoruz.",
      },
    ],
    geo: { latitude: 41.0602, longitude: 28.9877 },
    areaServed: ["Şişli", "Maslak", "İstanbul", "Türkiye"],
    schemaServiceType: "Kurumsal Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Şişli,İstanbul",
    sitemapPriority: 0.87,
    featuredServiceSlugs: [
      "saas-web-uygulama",
      "dashboard-analitik",
      "uyelik-abonelik-sistemi",
      "api-entegrasyonu",
    ],
  },
  {
    slug: "istanbul-restoran-yazilim",
    title: "İstanbul Restoran Yazılım",
    metaTitle: "İstanbul Restoran & Kafe Yazılım Çözümleri | QR Menü, Rezervasyon | Solman Digital",
    metaDescription:
      "İstanbul restoran ve kafeleri için QR menü sistemi, online rezervasyon ve ödeme entegrasyonu. Tek seferlik kurulum, sıfır aylık ücret. 7–10 iş günü teslim.",
    district: null,
    heroLabel: "İstanbul · Yeme-İçme Sektörü",
    heroH1: "İstanbul Restoran ve Kafeleri İçin Yazılım",
    heroSubtitle:
      "QR menü, online rezervasyon ve ödeme sistemi. İstanbul'daki restoran ve kafeler için ajansız, doğrudan geliştirici ile hızlı kurulum.",
    keywords: [
      "istanbul restoran yazılım",
      "istanbul qr menü sistemi",
      "istanbul kafe rezervasyon sistemi",
      "istanbul restoran web sitesi",
      "istanbul qr menü yaptırma",
      "istanbul online rezervasyon",
      "istanbul yeme içme sektörü yazılım",
      "istanbul restoran dijital menü",
      "istanbul kafe web sitesi",
      "istanbul food tech yazılım",
    ],
    faq: [
      {
        q: "QR menü sistemi aylık abonelik gerektiriyor mu?",
        a: "Hayır. QR menü sistemi tek seferlik kurulum ücreti ile teslim edilir, aylık abonelik yoktur. İstediğinizde menüyü kendiniz güncelleyebilirsiniz.",
      },
      {
        q: "Restoran rezervasyon sistemi kaç günde kurulur?",
        a: "Temel rezervasyon sistemi 7–10 iş günü içinde canlıya alınır. Çoklu şube, SMS bildirimi gibi ekstra özellikler süreyi uzatabilir.",
      },
      {
        q: "Birden fazla şube için tek sistem kurulabilir mi?",
        a: "Evet. Çok şubeli restoranlar için merkezi yönetim panelinden tüm şubeleri yönetebileceğiniz bir sistem kuruyoruz.",
      },
    ],
    geo: { latitude: 41.0082, longitude: 28.9784 },
    areaServed: ["İstanbul", "Türkiye"],
    schemaServiceType: "Restoran Yazılım Çözümleri",
    googleMapsUrl: "https://maps.google.com/?q=Beşiktaş,İstanbul",
    sitemapPriority: 0.85,
    featuredServiceSlugs: [
      "qr-menu-restoran",
      "rezervasyon-sistemi",
      "odeme-entegrasyonu",
      "kurumsal-web-sitesi",
    ],
  },
  {
    slug: "atasehir-yazilim",
    title: "Ataşehir Yazılım Geliştirme",
    metaTitle: "Ataşehir Yazılım Geliştirme & Web Sitesi | Solman Digital",
    metaDescription:
      "Ataşehir ve Ümraniye'deki KOBİ ve teknoloji şirketleri için yazılım geliştirme. E-ticaret, SaaS ve kurumsal web çözümleri. Yüz yüze görüşme imkânı.",
    district: "Ataşehir",
    heroLabel: "Ataşehir · İstanbul",
    heroH1: "Ataşehir İşletmeleri İçin Yazılım ve Web Çözümleri",
    heroSubtitle:
      "Ataşehir ve Anadolu yakasındaki KOBİ'ler için e-ticaret, kurumsal web sitesi ve SaaS çözümleri. Doğrudan uzman erişimi, ajans maliyeti yok.",
    keywords: [
      "ataşehir yazılım geliştirme",
      "ataşehir web sitesi",
      "ataşehir e-ticaret",
      "ataşehir kurumsal web",
      "anadolu yakası yazılım",
      "ümraniye web geliştirici",
      "ataşehir saas geliştirme",
      "ataşehir kobiş dijital dönüşüm",
      "ataşehir web tasarım",
      "anadolu yakası dijital ajans",
    ],
    faq: [
      {
        q: "Ataşehir'de yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Ataşehir ve Anadolu yakası için yüz yüze görüşme organize edebiliyoruz. İlk tanışma toplantısı için ofis veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "KOBİ için yazılım geliştirme ne kadar sürer?",
        a: "Projenin kapsamına göre değişir: kurumsal web sitesi 5–10 gün, e-ticaret mağazası 10–20 gün, SaaS uygulama 4–8 hafta. Başlangıç görüşmesinde net bir yol haritası paylaşılır.",
      },
      {
        q: "E-fatura kesiyor musunuz?",
        a: "Evet, tüm projeler için e-fatura düzenliyoruz. Şirket veya bireysel fatura tercihinize göre fatura bilgilerini başlangıçta alıyoruz.",
      },
    ],
    geo: { latitude: 40.9833, longitude: 29.1167 },
    areaServed: ["Ataşehir", "Ümraniye", "İstanbul", "Türkiye"],
    schemaServiceType: "KOBİ Yazılım ve Dijital Dönüşüm",
    googleMapsUrl: "https://maps.google.com/?q=Ataşehir,İstanbul",
    sitemapPriority: 0.85,
    featuredServiceSlugs: [
      "saas-web-uygulama",
      "dashboard-analitik",
      "eticaret-kurulum",
      "api-entegrasyonu",
    ],
  },
]
