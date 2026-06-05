export type IstanbulPage = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  district: string | null
  heroLabel: string
  heroH1: string
  heroSubtitle: string
  uniqueSection: { heading: string; body: string }
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
    uniqueSection: {
      heading: "İstanbul'da Web Sitesi Yaptırmanın Doğru Yolu",
      body: "İstanbul'da web tasarım hizmeti sunan yüzlerce firma var. Farkımız şablonsuz geliştirme ve katmansız iletişimde: projenizi anlatan kişiyle değil, yapan kişiyle konuşursunuz. Beşiktaş merkezli ofisimizden İstanbul'un her iş alanına, Türkiye'nin her şehrine uzaktan sorunsuz hizmet veriyoruz. Kurumsal tanıtım sitesinden e-ticaret mağazasına, SaaS platformdan AI entegrasyonuna — tek adres.",
    },
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
    uniqueSection: {
      heading: "İstanbul E-Ticaret Pazarını Tanıyoruz",
      body: "İstanbul'daki KOBİ'lerin ve girişimcilerin büyük çoğunluğu önce Trendyol'da satışa başlar, ardından kendi kanalını kurmak ister. Bu geçiş dönemini onlarca projede bizzat yönettik: ürün kataloğu aktarımı, İyzico entegrasyonu, çift kanal stok senkronizasyonu. İstanbul'un tekstil, gıda, elektronik ve mobilya sektörlerine özel e-ticaret deneyimimiz var — sıfırdan kurulum veya mevcut altyapı üzerinde geliştirme.",
    },
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
    uniqueSection: {
      heading: "Kurumsal Siteniz Rakibinizden Neden Farklı Olmalı?",
      body: "İstanbul'da aynı sektörde çalışan onlarca şirket var. Ziyaretçiniz sizi rakibinizle 10 saniyede karşılaştırıyor. Yavaş yüklenen, mobilde bozulan veya mesajı net taşımayan bir site, kazanılabilecek iş kaybettirir. Solman Digital'de kurumsal web siteleri Next.js altyapısıyla 90+ PageSpeed skoru, tam mobil uyum ve teknik SEO kurulumu ile teslim edilir. Siz içeriğinize odaklanın, teknik altyapıyı biz garanti altına alalım.",
    },
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
    uniqueSection: {
      heading: "Anadolu Yakasının Girişimci Merkezi Kadıköy",
      body: "Kadıköy, İstanbul'un en dinamik girişim ve KOBİ ekosistemlerinden birini barındırır. Moda, Bağdat Caddesi ve Fikirtepe ekseninde gelişen iş dünyasının dijital ihtiyaçları hız ve özgünlük gerektirir. Kadıköy'deki işletmelerle yüz yüze görüşme, dijital dönüşüm danışmanlığı ve doğrudan geliştirme sürecinde yanlarında oluyoruz. Ajans katmanı ve gereksiz toplantılar olmadan — brief'ten teslimata kısa yol.",
    },
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
    uniqueSection: {
      heading: "Maslak ve Şişli'nin Kurumsal Yazılım İhtiyaçları",
      body: "Şişli ve Maslak, İstanbul'un finans, sigorta, teknoloji ve holding şirketlerinin yoğunlaştığı B2B hizmet koridorudur. Bu bölgedeki işletmeler genel çözümler değil, iş süreçlerine entegre özel yazılımlar ister: çok birimli dashboard, API entegrasyonu, abonelik yönetimi veya iç operasyon otomasyonu. NDA standardı, sprint bazlı çalışma ve kurumsal raporlama disipliniyle büyük şirket ihtiyaçlarına küçük ofis hızıyla yanıt veriyoruz.",
    },
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
    uniqueSection: {
      heading: "İstanbul'un Yeme-İçme Sektörü İçin Dijital Altyapı",
      body: "İstanbul'da 20.000'den fazla restoran ve kafe faaliyet gösteriyor. Pandemi sonrasında QR menü ve online rezervasyon standart beklenti haline geldi. Aylık abonelik ödeyen hazır çözümler yerine; tek seferlik kurulum, kendi domain'iniz ve kendinize ait bir sistem inşa ediyoruz. Çok şubeli zincirler için merkezi yönetim paneli, tekil mekanlar için basit ve uygun maliyetli QR menü — her ölçeğe uygun çözüm.",
    },
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
    uniqueSection: {
      heading: "Anadolu'nun Teknoloji ve Ticaret Merkezi Ataşehir",
      body: "Ataşehir, İstanbul'un Anadolu yakasında teknoloji şirketleri ve büyüyen KOBİ'lerin yoğunlaştığı ilçelerden biri. İTÜ Teknokent, Sabancı Üniversitesi ve Üsküdar Teknoloji Geliştirme Bölgesi gibi yapılar bu ekosistemi besliyor. Ataşehir'deki müşterilerimizle yüz yüze proje başlangıç toplantıları, Zoom sprint check-in'leri ve WhatsApp üzerinden anlık iletişim ile çalışıyoruz. Yazılım projeniz için büyük İstanbul ajanslarının fiyatına gerek yok.",
    },
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
  {
    slug: "besiktas-yazilim-gelistirme",
    title: "Beşiktaş Yazılım Geliştirme",
    metaTitle: "Beşiktaş Yazılım Geliştirme & Web Sitesi Yaptırma | Solman Digital",
    metaDescription:
      "Beşiktaş merkezli yazılım geliştirme ofisi. Web sitesi, e-ticaret ve SaaS uygulaması — sıfırdan, şablonsuz. Doğrudan uzman, net takvim, taahhüt edilen teslim.",
    district: "Beşiktaş",
    heroLabel: "Beşiktaş · İstanbul Merkezi",
    heroH1: "Beşiktaş'tan Türkiye Geneline Yazılım Geliştirme",
    heroSubtitle:
      "Solman Digital, Beşiktaş merkezli özel yazılım ofisidir. Web sitesi yaptırma, e-ticaret ve SaaS geliştirme — ajans katmanı yok, doğrudan uzman ile başından sonuna.",
    uniqueSection: {
      heading: "Neden Beşiktaş Merkezli Çalışıyoruz?",
      body: "Solman Digital'in ofisi Beşiktaş'ta. Bu sadece bir adres değil — Beşiktaş ve çevresindeki (Nişantaşı, Levent, Etiler, Sarıyer) işletmelerle yüz yüze, aynı gün toplantı yapabildiğimiz gerçek bir yakınlık. Kafe, co-working veya ofis — nerede uygunsa orada buluşuyoruz. Fiziksel yakınlık + doğrudan geliştirici erişimi kombinasyonu; İstanbul'da yazılım yaptırmanın en az sürtüşmeli yolu.",
    },
    keywords: [
      "beşiktaş yazılım geliştirme",
      "beşiktaş web tasarım",
      "beşiktaş web sitesi yaptırma",
      "beşiktaş yazılım şirketi",
      "beşiktaş e-ticaret yazılım",
      "beşiktaş saas geliştirme",
      "beşiktaş next.js geliştirici",
      "beşiktaş kurumsal web sitesi",
      "beşiktaş dijital ajans",
      "istanbul avrupa yakası yazılım",
    ],
    faq: [
      {
        q: "Beşiktaş'ta yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Ofisimiz Beşiktaş'ta olduğu için Beşiktaş ve çevresi (Şişli, Sarıyer, Levent, Etiler) için yüz yüze toplantı rahatlıkla organize edebiliyoruz. Proje başlangıcında bir tanışma toplantısı yapmayı tercih ediyoruz.",
      },
      {
        q: "Beşiktaş'taki bir işletme için web sitesi ne kadar tutar?",
        a: "Kurumsal web siteleri 8.000 ₺'den, e-ticaret siteleri 20.000 ₺'den başlamaktadır. Kesin fiyat proje kapsamına göre belirlenir; ücretsiz analiz formumuzu doldurarak ön bilgi alabilirsiniz.",
      },
      {
        q: "Proje tesliminden sonra bakım ve destek var mı?",
        a: "Evet. Tüm projelerimizde en az 1 ay ücretsiz teknik destek dahildir. Sonrasında ihtiyaca göre aylık bakım anlaşması yapılabilir.",
      },
    ],
    geo: { latitude: 41.0426, longitude: 28.9965 },
    areaServed: ["Beşiktaş", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Sitesi ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Beşiktaş,İstanbul",
    sitemapPriority: 0.9,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "saas-web-uygulama",
      "ai-icerik-otomasyonu",
    ],
  },
  {
    slug: "uskudar-yazilim-gelistirme",
    title: "Üsküdar Yazılım Geliştirme",
    metaTitle: "Üsküdar Yazılım Geliştirme & Web Sitesi Yaptırma | Solman Digital",
    metaDescription:
      "Üsküdar'daki KOBİ ve işletmeler için web sitesi, e-ticaret ve yazılım geliştirme. Anadolu yakası merkezli danışmanlık, doğrudan uzman erişimi, net takvim.",
    district: "Üsküdar",
    heroLabel: "Üsküdar · İstanbul Anadolu Yakası",
    heroH1: "Üsküdar İşletmeleri İçin Web Sitesi & Yazılım",
    heroSubtitle:
      "Üsküdar ve çevresindeki işletmeler için web sitesi yaptırma, e-ticaret kurulum ve SaaS geliştirme. Ajans markupı yok, doğrudan uzman ile başından sonuna.",
    uniqueSection: {
      heading: "Üsküdar İşletmeleri Dijitale Taşınıyor",
      body: "Üsküdar, geleneksel ticaretin ve modern girişimciliğin iç içe geçtiği İstanbul'un köklü ilçelerinden biri. Perakende ticaret, sağlık klinikleri, hukuk büroları ve eğitim kurumları başta olmak üzere pek çok Üsküdar işletmesi web varlığını güçlendirmek ya da dijital satış kanalı açmak istiyor. Yüz yüze görüşme ve hızlı teslim taahhüdüyle Üsküdar'ın iş dünyasına doğrudan hizmet veriyoruz.",
    },
    keywords: [
      "üsküdar yazılım geliştirme",
      "üsküdar web tasarım",
      "üsküdar web sitesi yaptırma",
      "üsküdar yazılım şirketi",
      "üsküdar e-ticaret yazılım",
      "anadolu yakası yazılım geliştirme",
      "üsküdar kurumsal web sitesi",
      "üsküdar next.js geliştirici",
      "üsküdar dijital dönüşüm",
      "istanbul anadolu yazılım",
    ],
    faq: [
      {
        q: "Üsküdar'da yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Üsküdar ve Anadolu yakası için yüz yüze görüşme organize edebiliyoruz. Proje başlangıcında bir tanışma toplantısı yapmayı tercih ediyoruz — ister kafede, ister ofisinizde.",
      },
      {
        q: "Üsküdar'daki bir işletme için web sitesi ne kadar tutar?",
        a: "Kurumsal web siteleri 8.000 ₺'den, e-ticaret siteleri 20.000 ₺'den başlamaktadır. Kesin fiyat proje kapsamına göre belirlenir; ücretsiz analiz formumuzu doldurarak ön bilgi alabilirsiniz.",
      },
      {
        q: "Uzaktan çalışma yapıyor musunuz?",
        a: "Evet. Türkiye'nin her yerindeki müşterimizle uzaktan çalışıyoruz. Tüm iletişim WhatsApp, e-posta ve Zoom üzerinden yürütülür. İstanbul içi projeler için yüz yüze görüşme de mümkündür.",
      },
    ],
    geo: { latitude: 41.0228, longitude: 29.0162 },
    areaServed: ["Üsküdar", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Sitesi ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Üsküdar,İstanbul",
    sitemapPriority: 0.87,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "landing-page-tasarimi",
      "trendyol-entegrasyonu",
    ],
  },
  {
    slug: "beyoglu-web-tasarim",
    title: "Beyoğlu Web Tasarım",
    metaTitle: "Beyoğlu Web Tasarım & Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Beyoğlu, Taksim ve Galata'daki işletmeler için web sitesi tasarım ve yazılım geliştirme. Otel, butik, cafe ve e-ticaret odaklı dijital çözümler.",
    district: "Beyoğlu",
    heroLabel: "Beyoğlu · Taksim · Galata",
    heroH1: "Beyoğlu & Taksim İşletmeleri İçin Web Tasarım",
    heroSubtitle:
      "Beyoğlu'ndaki oteller, butikler, kafeler ve e-ticaret işletmeleri için modern web sitesi ve yazılım çözümleri. Ajans katmanı yok — doğrudan uzman, hızlı teslim.",
    uniqueSection: {
      heading: "Beyoğlu'nun Kozmopolit İş Dünyası İçin Özel Dijital Çözümler",
      body: "Beyoğlu, İstanbul'un en yoğun turizm ve kültür akışına sahip bölgesi. Galata, Karaköy ve Taksim eksenindeki oteller, butik mağazalar ve restoranlar; yerli ve yabancı ziyaretçilere eş zamanlı ulaşmak zorunda. Çok dilli web sitesi, online rezervasyon ve mobil odaklı tasarım bu kitlenin standart beklentisi. Beyoğlu'ndaki işletmelere hem dijital görünürlük hem de müşteri dönüşüm odaklı çözümler sunuyoruz.",
    },
    keywords: [
      "beyoğlu web tasarım",
      "taksim web sitesi yaptırma",
      "beyoğlu yazılım geliştirme",
      "taksim dijital ajans",
      "beyoğlu e-ticaret yazılım",
      "galata web tasarım",
      "beyoğlu otel web sitesi",
      "taksim kafe web sitesi",
      "beyoğlu butik e-ticaret",
      "istanbul merkez yazılım",
    ],
    faq: [
      {
        q: "Beyoğlu'ndaki otel veya butik için web sitesi ne kadar sürer?",
        a: "Otel tanıtım web sitesi 5–8 iş günü, rezervasyon sistemi entegrasyonlu site 2–3 hafta içinde tamamlanır. Butik e-ticaret siteleri için 10–15 iş günü öngörülür.",
      },
      {
        q: "Taksim'de yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Beyoğlu, Taksim ve Galata bölgesi için yüz yüze görüşme organize edebiliyoruz. Proje başlangıcında bir tanışma toplantısı yapmayı tercih ediyoruz.",
      },
      {
        q: "Çok dilli web sitesi yapabiliyor musunuz?",
        a: "Evet. Turizm ve uluslararası müşteri kitlesine sahip Beyoğlu işletmeleri için Türkçe, İngilizce ve diğer dillerde çalışan çok dilli web siteleri geliştiriyoruz.",
      },
    ],
    geo: { latitude: 41.0369, longitude: 28.9850 },
    areaServed: ["Beyoğlu", "Taksim", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Beyoğlu,İstanbul",
    sitemapPriority: 0.87,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "rezervasyon-sistemi",
      "cok-dilli-web-sitesi",
    ],
  },
  {
    slug: "maltepe-web-tasarim",
    title: "Maltepe Web Tasarım",
    metaTitle: "Maltepe Web Tasarım & Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Maltepe'deki KOBİ ve girişimler için web tasarım, e-ticaret ve yazılım geliştirme. Anadolu yakası merkezli, doğrudan uzman erişimi. Yüz yüze görüşme imkânı.",
    district: "Maltepe",
    heroLabel: "Maltepe · İstanbul Anadolu Yakası",
    heroH1: "Maltepe İşletmeleri İçin Web Tasarım & Yazılım",
    heroSubtitle:
      "Maltepe ve çevresindeki KOBİ'ler için kurumsal web sitesi, e-ticaret ve yazılım çözümleri. Ajans markupı yok — doğrudan uzman, hızlı teslim.",
    uniqueSection: {
      heading: "Maltepe'nin Büyüyen KOBİ Ekosistemine Dijital Destek",
      body: "Maltepe, son yıllarda İstanbul'un Anadolu yakasında hızla gelişen ticari altyapısıyla öne çıkıyor. Sahil hattı boyunca sıralanan işletmeler, Bağlarbaşı Caddesi'ndeki ticaret merkezleri ve yükselen konut projeleriyle birlikte büyüyen girişimcilik kültürü dijital dönüşüm talebi yaratıyor. Maltepe'deki müşterilerimizle yüz yüze proje toplantıları yapıyor, WhatsApp ve Zoom üzerinden süreç boyunca anlık iletişim sağlıyoruz. Büyük ajans maliyeti olmadan, büyük ajans kalitesinde iş.",
    },
    keywords: [
      "maltepe web tasarım",
      "maltepe web sitesi yaptırma",
      "maltepe yazılım geliştirme",
      "maltepe e-ticaret sitesi",
      "maltepe kurumsal web sitesi",
      "maltepe next.js geliştirici",
      "maltepe dijital ajans",
      "anadolu yakası web tasarım",
      "maltepe web geliştirici",
      "maltepe yazılım şirketi",
    ],
    faq: [
      {
        q: "Maltepe'de yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Maltepe ve Anadolu yakası için yüz yüze görüşme organize edebiliyoruz. Proje başlangıcında tanışma toplantısı için uygun yer ve saate göre esneklik sağlıyoruz.",
      },
      {
        q: "Maltepe'deki bir işletme için web sitesi ne kadar tutar?",
        a: "Kurumsal web siteleri 8.000 ₺'den, e-ticaret siteleri 20.000 ₺'den başlamaktadır. Kesin fiyat proje kapsamına göre belirlenir; ücretsiz analiz formumuzu doldurarak ön bilgi alabilirsiniz.",
      },
      {
        q: "E-fatura kesiyor musunuz?",
        a: "Evet, tüm projeler için e-fatura düzenliyoruz. Şirket veya bireysel fatura tercihinize göre fatura bilgilerini başlangıçta alıyoruz.",
      },
    ],
    geo: { latitude: 40.9351, longitude: 29.1301 },
    areaServed: ["Maltepe", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Maltepe,İstanbul",
    sitemapPriority: 0.85,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "landing-page-tasarimi",
      "seo-teknik-altyapi",
    ],
  },
  {
    slug: "bakirkoy-web-tasarim",
    title: "Bakırköy Web Tasarım",
    metaTitle: "Bakırköy Web Tasarım & Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Bakırköy işletmeleri için modern web tasarım ve yazılım geliştirme. Kurumsal web sitesi, e-ticaret, SaaS çözümleri. Batı İstanbul'un ticaret merkezine özel dijital hizmet.",
    district: "Bakırköy",
    heroLabel: "Bakırköy · Batı İstanbul",
    heroH1: "Bakırköy İşletmeleri İçin Web Tasarım & Yazılım",
    heroSubtitle:
      "Bakırköy ve çevresindeki işletmeler için kurumsal web sitesi, e-ticaret ve yazılım çözümleri. Katmansız iletişim, net takvim, taahhüt edilen teslim.",
    uniqueSection: {
      heading: "Batı İstanbul'un Köklü Ticaret Merkezi Bakırköy",
      body: "Bakırköy, İstanbul'un batı yakasında perakende ticaret, sağlık, hukuk ve hizmet sektörlerinin yoğunlaştığı köklü bir ilçedir. İstanbul Caddesi ve Özgürlük Meydanı eksenindeki işletmeler; hem yerel müşteriye hem de online satışa yönelmek istiyor. Bakırköy merkezli veya yakın ilçelerdeki işletmelerle yüz yüze proje görüşmeleri yapıyor, başından sonuna aynı geliştiriciyle çalışma imkânı sunuyoruz. Ajans katmanı ve gereksiz toplantılar olmadan — net kapsam, net takvim.",
    },
    keywords: [
      "bakırköy web tasarım",
      "bakırköy web sitesi yaptırma",
      "bakırköy yazılım geliştirme",
      "bakırköy e-ticaret sitesi",
      "bakırköy kurumsal web sitesi",
      "bakırköy next.js geliştirici",
      "bakırköy dijital ajans",
      "batı istanbul web tasarım",
      "bakırköy web geliştirici",
      "bakırköy yazılım firması",
    ],
    faq: [
      {
        q: "Bakırköy'de yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Bakırköy ve batı İstanbul için yüz yüze görüşme organize edebiliyoruz. Proje başlangıcında bir tanışma toplantısı yapmayı tercih ediyoruz.",
      },
      {
        q: "KOBİ için web tasarım fiyatları ne kadar?",
        a: "Temel kurumsal web sitesi 8.000 ₺'den başlar. Sayfa sayısı, özel özellikler ve entegrasyonlara göre fiyat değişir. Ücretsiz analiz formumuzu doldurarak tahmini bütçe alabilirsiniz.",
      },
      {
        q: "E-ticaret projesi ne kadar sürer?",
        a: "Temel online mağaza 10–15 iş günü, Trendyol veya Hepsiburada entegrasyonu içeren projeler 15–25 iş günü sürer.",
      },
    ],
    geo: { latitude: 40.9787, longitude: 28.8703 },
    areaServed: ["Bakırköy", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Bakırköy,İstanbul",
    sitemapPriority: 0.86,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "landing-page-tasarimi",
      "trendyol-entegrasyonu",
    ],
  },
  {
    slug: "fatih-yazilim-gelistirme",
    title: "Fatih Yazılım Geliştirme",
    metaTitle: "Fatih & Aksaray Yazılım Geliştirme & E-Ticaret | Solman Digital",
    metaDescription:
      "Fatih ve Aksaray'daki tekstil, ticaret ve perakende işletmeleri için web sitesi, e-ticaret ve Trendyol entegrasyonu. Marketplace satıcılarına özel dijital çözümler.",
    district: "Fatih",
    heroLabel: "Fatih · Aksaray · İstanbul",
    heroH1: "Fatih & Aksaray İşletmeleri İçin Web & E-Ticaret",
    heroSubtitle:
      "Fatih ve Aksaray'daki tekstil, toptan ticaret ve perakende işletmeleri için e-ticaret kurulumu, Trendyol entegrasyonu ve kurumsal web sitesi. Doğrudan uzman, ajansız.",
    uniqueSection: {
      heading: "Fatih'in Tekstil ve Ticaret Dokusunu Dijitale Taşıyoruz",
      body: "Fatih ve Aksaray, İstanbul'un en yoğun toptan ticaret ve tekstil üretim ekosistemini barındırır. Bu bölgedeki işletmelerin önemli bir kısmı Trendyol ve Hepsiburada üzerinden satışa geçiyor ya da kendi online mağazasını kurmak istiyor. Yüzlerce ürünlü katalog aktarımı, İyzico ödeme entegrasyonu, marketplace stok senkronizasyonu — bu dönüşüm sürecini onlarca projede bizzat yönettik. Fatih merkezli işletmelerle yüz yüze görüşme ve hızlı teslim taahhüdüyle çalışıyoruz.",
    },
    keywords: [
      "fatih yazılım geliştirme",
      "aksaray e-ticaret sitesi",
      "fatih web sitesi yaptırma",
      "aksaray trendyol entegrasyonu",
      "fatih tekstil e-ticaret",
      "aksaray web tasarım",
      "fatih online mağaza kurulum",
      "istanbul merkez e-ticaret yazılım",
      "fatih kurumsal web sitesi",
      "aksaray yazılım geliştirici",
    ],
    faq: [
      {
        q: "Fatih'teki tekstil işletmem için e-ticaret sitesi kurabilir misiniz?",
        a: "Evet. Tekstil ve toptan ticaret işletmeleri için özelleştirilmiş e-ticaret siteleri geliştiriyoruz. Trendyol API entegrasyonu, toptan sipariş formu ve ürün katalog aktarımı dahil çözümler sunuyoruz.",
      },
      {
        q: "Fatih'te yüz yüze görüşme mümkün mü?",
        a: "Evet. Fatih, Aksaray ve İstanbul Avrupa yakası için yüz yüze görüşme organize edebiliyoruz.",
      },
      {
        q: "Çok ürünlü katalog aktarımı yapabiliyor musunuz?",
        a: "Evet. Excel, CSV veya mevcut sisteminizden ürün verisini alarak e-ticaret sitenize aktarıyoruz. 1.000+ ürünlü projeler için otomatik aktarım araçları kullanıyoruz.",
      },
    ],
    geo: { latitude: 41.0186, longitude: 28.9358 },
    areaServed: ["Fatih", "Aksaray", "İstanbul", "Türkiye"],
    schemaServiceType: "E-Ticaret ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Fatih,İstanbul",
    sitemapPriority: 0.85,
    featuredServiceSlugs: [
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "urun-aciklama-otomasyonu",
      "kurumsal-web-sitesi",
    ],
  },
  {
    slug: "sariyer-yazilim-gelistirme",
    title: "Sarıyer Yazılım Geliştirme",
    metaTitle: "Sarıyer & Maslak Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Sarıyer, Tarabya ve İstinye'deki işletmeler için web sitesi ve yazılım geliştirme. Boğaz hattı boyunca hizmet veren oteller, butikler ve kurumsal şirketler için özel çözümler.",
    district: "Sarıyer",
    heroLabel: "Sarıyer · Tarabya · İstinye",
    heroH1: "Sarıyer & Boğaz Hattı İşletmeleri İçin Yazılım",
    heroSubtitle:
      "Sarıyer, Tarabya ve İstinye'deki otel, butik, marina ve kurumsal şirketler için web sitesi ve yazılım geliştirme. Doğrudan uzman erişimi, ajansız çalışma.",
    uniqueSection: {
      heading: "Boğaz'ın Prestijli İş Dünyası İçin Dijital Çözümler",
      body: "Sarıyer ve Boğaz hattı; İstanbul'un en yüksek gelir segmentine sahip bölgelerinden biri. Tarabya'daki oteller, İstinye'deki butikler, Emirgan ve Yeniköy'deki restoranlar ile Levent-Maslak aksındaki kurumsal ofisler birbirinden farklı ama aynı derecede kalitatif dijital beklentiler taşır. Premium marka kimliğini yansıtan web tasarımı, çok dilli içerik, online rezervasyon sistemleri ve kurumsal SaaS çözümleri bu bölgenin yazılım ihtiyaçlarının merkezinde yer alır.",
    },
    keywords: [
      "sarıyer web tasarım",
      "sarıyer yazılım geliştirme",
      "tarabya otel web sitesi",
      "istinye web tasarım",
      "sarıyer e-ticaret",
      "emirgan kurumsal web sitesi",
      "boğaz hattı web geliştirici",
      "sarıyer butik web sitesi",
      "sarıyer next.js geliştirici",
      "istanbul kuzey yazılım",
    ],
    faq: [
      {
        q: "Sarıyer'deki otelim veya butiğim için web sitesi yapabiliyor musunuz?",
        a: "Evet. Otel tanıtım siteleri, online rezervasyon sistemleri ve butik e-ticaret siteleri başlıca uzmanlık alanlarımızdan. Çok dilli destek de dahil.",
      },
      {
        q: "Sarıyer'de yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Sarıyer ve İstanbul Avrupa yakasının kuzey ilçeleri için yüz yüze görüşme organize edebiliyoruz.",
      },
      {
        q: "Çok dilli web sitesi ne kadar sürede hazır olur?",
        a: "İki dilli (Türkçe + İngilizce) kurumsal web sitesi 8–12 iş günü içinde teslim edilir. Daha fazla dil eklendikçe süre kısmen uzar.",
      },
    ],
    geo: { latitude: 41.1667, longitude: 29.0500 },
    areaServed: ["Sarıyer", "Tarabya", "İstinye", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Sitesi ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Sarıyer,İstanbul",
    sitemapPriority: 0.84,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "rezervasyon-sistemi",
      "cok-dilli-web-sitesi",
      "landing-page-tasarimi",
    ],
  },
  {
    slug: "bagcilar-yazilim-gelistirme",
    title: "Bağcılar Yazılım Geliştirme",
    metaTitle: "Bağcılar & Güngören Yazılım, E-Ticaret & Web Sitesi | Solman Digital",
    metaDescription:
      "Bağcılar ve Güngören'deki tekstil, imalat ve ticaret işletmeleri için e-ticaret kurulumu, Trendyol entegrasyonu ve web sitesi. Hızlı teslim, net fiyat.",
    district: "Bağcılar",
    heroLabel: "Bağcılar · Güngören · Bahçelievler",
    heroH1: "Bağcılar & Güngören İşletmeleri İçin E-Ticaret & Web",
    heroSubtitle:
      "Bağcılar, Güngören ve çevresindeki tekstil, hazır giyim ve ticaret işletmeleri için e-ticaret sitesi, Trendyol entegrasyonu ve kurumsal web sitesi. Doğrudan uzman, ajansız.",
    uniqueSection: {
      heading: "İstanbul'un Üretim Kalbinde Dijital Dönüşüm",
      body: "Bağcılar ve Güngören, İstanbul'un tekstil, hazır giyim ve küçük imalat sanayinin en yoğun olduğu ilçeleri. Bu bölgedeki işletmelerin büyük çoğunluğu toptan satışın yanında Trendyol veya Hepsiburada'da online satış yapıyor ya da kendi e-ticaret kanalını açmak istiyor. Ürün katalog aktarımı, İyzico ödeme entegrasyonu ve çok kanallı stok yönetimi bu ilçelerde en sık karşılaştığımız ihtiyaçlar. Hızlı proje teslimi ve net fiyatlandırma ile Bağcılar ve çevre ilçelere hizmet veriyoruz.",
    },
    keywords: [
      "bağcılar yazılım geliştirme",
      "bağcılar e-ticaret sitesi",
      "güngören web tasarım",
      "bağcılar trendyol entegrasyonu",
      "güngören yazılım firması",
      "bağcılar tekstil e-ticaret",
      "bahçelievler web sitesi",
      "bağcılar online mağaza kurulum",
      "güngören kurumsal web sitesi",
      "istanbul batı yazılım geliştirici",
    ],
    faq: [
      {
        q: "Bağcılar'daki tekstil işletmem için Trendyol entegrasyonu yapabiliyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu, stok senkronizasyonu ve sipariş yönetimi başlıca uzmanlık alanlarımız. Bağcılar ve çevresindeki tekstil işletmeleriyle bu konuda birçok proje yürüttük.",
      },
      {
        q: "Bağcılar için yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Bağcılar, Güngören ve batı İstanbul için yüz yüze görüşme organize edebiliyoruz.",
      },
      {
        q: "E-ticaret sitesi ne kadar sürede hazır olur?",
        a: "Temel e-ticaret sitesi 10–15 iş günü, Trendyol entegrasyonu dahil projeler 15–25 iş günü içinde teslim edilir.",
      },
    ],
    geo: { latitude: 41.0350, longitude: 28.8557 },
    areaServed: ["Bağcılar", "Güngören", "Bahçelievler", "İstanbul", "Türkiye"],
    schemaServiceType: "E-Ticaret ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Bağcılar,İstanbul",
    sitemapPriority: 0.84,
    featuredServiceSlugs: [
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "urun-aciklama-otomasyonu",
      "kurumsal-web-sitesi",
    ],
  },
  {
    slug: "pendik-yazilim-gelistirme",
    title: "Pendik Yazılım Geliştirme",
    metaTitle: "Pendik & Kartal Yazılım Geliştirme & Web Sitesi | Solman Digital",
    metaDescription:
      "Pendik ve Kartal'daki KOBİ ve sanayi işletmeleri için web sitesi, e-ticaret ve yazılım geliştirme. Anadolu yakasının büyüyen ticaret merkezine özel dijital çözümler.",
    district: "Pendik",
    heroLabel: "Pendik · Kartal · Anadolu Yakası",
    heroH1: "Pendik & Kartal İşletmeleri İçin Web & Yazılım",
    heroSubtitle:
      "Pendik ve Kartal'daki KOBİ'ler, sanayi işletmeleri ve girişimler için kurumsal web sitesi, e-ticaret ve yazılım geliştirme. Doğrudan uzman, hızlı teslim.",
    uniqueSection: {
      heading: "Anadolu'nun Büyüyen Sanayi ve Ticaret Koridoru",
      body: "Pendik ve Kartal, İstanbul'un Anadolu yakasında hızla gelişen sanayi, lojistik ve ticaret altyapısıyla öne çıkan ilçeler. Organize sanayi bölgesi, büyüyen konut projeleri ve genişleyen perakende ekosistemi ile Pendik; hem B2B hem B2C yazılım talebini aynı anda barındırıyor. Anadolu yakasının en büyük havalimanına (Sabiha Gökçen) yakınlığı lojistik ve ticaret şirketleri için stratejik önem taşıyor. Pendik ve Kartal'daki müşterilerimizle yüz yüze proje görüşmeleri yapıyor, net takvim ve taahhüt edilen teslimle çalışıyoruz.",
    },
    keywords: [
      "pendik yazılım geliştirme",
      "kartal web tasarım",
      "pendik web sitesi yaptırma",
      "kartal yazılım firması",
      "pendik e-ticaret sitesi",
      "kartal kurumsal web sitesi",
      "pendik next.js geliştirici",
      "anadolu yakası güney yazılım",
      "pendik dijital ajans",
      "kartal web geliştirici",
    ],
    faq: [
      {
        q: "Pendik veya Kartal'da yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Pendik, Kartal ve Anadolu yakasının güney ilçeleri için yüz yüze görüşme organize edebiliyoruz.",
      },
      {
        q: "Sanayi işletmesi için B2B web sitesi yapabiliyor musunuz?",
        a: "Evet. Toptan sipariş formu, ürün katalog yönetimi, bayi portalı ve kurumsal tanıtım siteleri başlıca uzmanlık alanlarımız.",
      },
      {
        q: "Web sitesi fiyatları ne kadar?",
        a: "Kurumsal web siteleri 8.000 ₺'den, e-ticaret siteleri 20.000 ₺'den başlamaktadır. Kesin fiyat proje kapsamına göre belirlenir.",
      },
    ],
    geo: { latitude: 40.8719, longitude: 29.2247 },
    areaServed: ["Pendik", "Kartal", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Sitesi ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Pendik,İstanbul",
    sitemapPriority: 0.84,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "saas-web-uygulama",
      "api-entegrasyonu",
    ],
  },
  // ─── YENİ İLÇELER ─────────────────────────────────────────────────────────
  {
    slug: "umraniye-yazilim-gelistirme",
    title: "Ümraniye Yazılım Geliştirme",
    metaTitle: "Ümraniye Yazılım Geliştirme & Web Sitesi | Solman Digital",
    metaDescription:
      "Ümraniye'deki KOBİ ve kurumsal firmalar için web sitesi, e-ticaret ve yazılım geliştirme. Anadolu yakasının teknoloji merkezi için dijital çözümler.",
    district: "Ümraniye",
    heroLabel: "Ümraniye · Çekmeköy · Anadolu Yakası",
    heroH1: "Ümraniye İşletmeleri İçin Web & Yazılım Geliştirme",
    heroSubtitle:
      "Ümraniye'nin hızla büyüyen iş ekosistemi için kurumsal web sitesi, e-ticaret ve SaaS çözümleri. Anadolu yakasında doğrudan uzman erişimi.",
    uniqueSection: {
      heading: "Ümraniye: Anadolu Yakasının Yükselen İş Merkezi",
      body: "Ümraniye, İstanbul'un Anadolu yakasında en hızlı büyüyen iş ve teknoloji merkezlerinden biri. Organize sanayi bölgesi, ofis plazaları ve perakende ekosistemiyle Ümraniye'deki işletmeler dijital dönüşümde öne çıkmak istiyor. Kurumsal web sitesinden SaaS platforma, e-ticaretten AI otomasyona uzanan çözümlerimizle Ümraniye ve çevre ilçelere hizmet veriyoruz.",
    },
    keywords: [
      "ümraniye yazılım geliştirme",
      "ümraniye web sitesi",
      "ümraniye e-ticaret",
      "ümraniye web tasarım firması",
      "anadolu yakası yazılım şirketi",
      "ümraniye kurumsal site",
    ],
    faq: [
      {
        q: "Ümraniye'de yüz yüze görüşme yapabilir misiniz?",
        a: "Evet, Ümraniye ve Anadolu yakası için ofis ziyareti veya görüşme organize edebiliyoruz.",
      },
      {
        q: "Ümraniye'deki işletmem için e-ticaret sitesi ne kadar sürer?",
        a: "Temel e-ticaret sitesi 10–15 iş günü içinde teslim edilir.",
      },
      {
        q: "Ümraniye'de SaaS geliştirme hizmeti var mı?",
        a: "Evet. SaaS platform geliştirme, API entegrasyonu ve AI otomasyon projelerinde Ümraniye ve İstanbul genelinde hizmet veriyoruz.",
      },
    ],
    geo: { latitude: 41.0164, longitude: 29.1163 },
    areaServed: ["Ümraniye", "Çekmeköy", "Anadolu Yakası", "İstanbul", "Türkiye"],
    schemaServiceType: "Yazılım Geliştirme ve Web Tasarım",
    googleMapsUrl: "https://maps.google.com/?q=Ümraniye,İstanbul",
    sitemapPriority: 0.83,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "saas-web-uygulama",
      "eticaret-kurulum",
      "ai-musteri-chatbotu",
    ],
  },
  {
    slug: "kartal-web-tasarim",
    title: "Kartal Web Tasarım",
    metaTitle: "Kartal Web Tasarım & Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Kartal ve Maltepe işletmeleri için modern web tasarım, e-ticaret kurulumu ve yazılım geliştirme. Hızlı teslim, net fiyat.",
    district: "Kartal",
    heroLabel: "Kartal · Maltepe · Anadolu Yakası",
    heroH1: "Kartal İşletmeleri İçin Web Tasarım & Yazılım",
    heroSubtitle:
      "Kartal ve Maltepe'deki işletmeler için kurumsal web sitesi, e-ticaret ve dijital çözümler. Doğrudan uzman, aracısız.",
    uniqueSection: {
      heading: "Kartal'da Dijital Varlığınızı Güçlendirin",
      body: "Kartal, İstanbul'un Anadolu yakasında sahil şeridi, ticaret merkezi ve büyüyen konut projeleriyle dikkat çeken bir ilçe. Yerel perakende, hizmet sektörü ve KOBİ'lerin dijitalleşme ihtiyacına yönelik çözümler sunuyoruz. Kartal ve Maltepe'deki müşterilerimizle yüz yüze çalışıyor, net takvim ve taahhüt edilen teslimle proje yürütüyoruz.",
    },
    keywords: [
      "kartal web tasarım",
      "kartal yazılım geliştirme",
      "kartal e-ticaret sitesi",
      "maltepe web sitesi",
      "anadolu yakası web tasarım",
      "kartal kurumsal web sitesi",
    ],
    faq: [
      {
        q: "Kartal için web sitesi ne kadar sürede teslim edilir?",
        a: "Kurumsal tanıtım sitesi 5–10 iş günü, e-ticaret sitesi 10–15 iş günü içinde teslim edilir.",
      },
      {
        q: "Kartal'da yüz yüze görüşme mümkün mü?",
        a: "Evet, Kartal ve Anadolu yakası için proje görüşmesi organize edebiliyoruz.",
      },
      {
        q: "Kartal'daki küçük işletmem için bütçe ne olmalı?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır.",
      },
    ],
    geo: { latitude: 40.8916, longitude: 29.1883 },
    areaServed: ["Kartal", "Maltepe", "Anadolu Yakası", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Kartal,İstanbul",
    sitemapPriority: 0.82,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "landing-page-tasarimi",
      "eticaret-kurulum",
      "seo-teknik-altyapi",
    ],
  },
  {
    slug: "kucukcekmece-web-tasarim",
    title: "Küçükçekmece Web Tasarım",
    metaTitle: "Küçükçekmece Web Tasarım & E-Ticaret | Solman Digital",
    metaDescription:
      "Küçükçekmece, Bahçeşehir ve Esenyurt işletmeleri için web sitesi, e-ticaret ve yazılım geliştirme çözümleri.",
    district: "Küçükçekmece",
    heroLabel: "Küçükçekmece · Bahçeşehir · Batı İstanbul",
    heroH1: "Küçükçekmece İşletmeleri İçin Web & E-Ticaret",
    heroSubtitle:
      "Küçükçekmece ve çevresindeki işletmeler için kurumsal web sitesi, e-ticaret kurulumu ve Trendyol entegrasyonu. Aracısız uzman ekip.",
    uniqueSection: {
      heading: "Batı İstanbul'un Büyüyen Ticaret Merkezi",
      body: "Küçükçekmece, İstanbul Havalimanı'na yakınlığıyla lojistik ve ticaret şirketleri için stratejik bir konumda. Havalimanı çevresinde açılan ofisler ve AVM'ler bölgenin ticari potansiyelini artırıyor. Küçükçekmece, Bahçeşehir ve batı yakası işletmelerine web sitesi, e-ticaret ve yazılım çözümleri sunuyoruz.",
    },
    keywords: [
      "küçükçekmece web tasarım",
      "küçükçekmece e-ticaret",
      "bahçeşehir web sitesi",
      "küçükçekmece yazılım geliştirme",
      "batı istanbul web tasarım",
      "küçükçekmece kurumsal site",
    ],
    faq: [
      {
        q: "Küçükçekmece için proje görüşmesi yapılabiliyor mu?",
        a: "Evet, Küçükçekmece ve batı İstanbul için yüz yüze görüşme organize edebiliyoruz.",
      },
      {
        q: "E-ticaret sitesi fiyatları nedir?",
        a: "E-ticaret siteleri ₺20.000'dan başlamaktadır. Trendyol entegrasyonu dahil projeler farklı fiyatlandırılır.",
      },
      {
        q: "Trendyol entegrasyonu hizmeti veriyor musunuz?",
        a: "Evet, Trendyol ve diğer pazaryeri entegrasyonları temel uzmanlık alanlarımızdan.",
      },
    ],
    geo: { latitude: 41.0010, longitude: 28.7820 },
    areaServed: ["Küçükçekmece", "Bahçeşehir", "Esenyurt", "Batı İstanbul", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve E-Ticaret Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Küçükçekmece,İstanbul",
    sitemapPriority: 0.82,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "landing-page-tasarimi",
    ],
  },
  {
    slug: "avcilar-yazilim-gelistirme",
    title: "Avcılar Yazılım Geliştirme",
    metaTitle: "Avcılar Yazılım Geliştirme & Web Sitesi | Solman Digital",
    metaDescription:
      "Avcılar ve Beylikdüzü işletmeleri için web sitesi, e-ticaret, SaaS ve yazılım geliştirme. Batı İstanbul'a özel dijital çözümler.",
    district: "Avcılar",
    heroLabel: "Avcılar · Beylikdüzü · Batı İstanbul",
    heroH1: "Avcılar İşletmeleri İçin Yazılım & Web Geliştirme",
    heroSubtitle:
      "Avcılar ve çevresindeki işletmeler için kurumsal web sitesi, e-ticaret ve AI otomasyon çözümleri. Net takvim, taahhüt edilen teslim.",
    uniqueSection: {
      heading: "Avcılar'da Dijital Dönüşümün Hızlanan Temposu",
      body: "Avcılar, İstanbul Üniversitesi Avcılar yerleşkesi ve çevresindeki teknoloji girişimlerinin yoğunlaştığı bir ilçe. Eğitim kurumları, orta ölçekli sanayi tesisleri ve perakende işletmeleriyle kalabalık bir ekosisteme sahip. Avcılar ve Beylikdüzü'ndeki işletmelere web sitesi, e-ticaret ve yazılım geliştirme hizmeti sunuyoruz.",
    },
    keywords: [
      "avcılar yazılım geliştirme",
      "avcılar web sitesi",
      "avcılar e-ticaret",
      "beylikdüzü web tasarım",
      "avcılar kurumsal site",
      "batı istanbul yazılım firması",
    ],
    faq: [
      {
        q: "Avcılar'da yüz yüze görüşme yapılabiliyor mu?",
        a: "Evet, Avcılar ve batı İstanbul için yerinde proje görüşmeleri organize edebiliyoruz.",
      },
      {
        q: "Avcılar'daki girişimim için SaaS geliştirme yapabiliyor musunuz?",
        a: "Evet. MVP'den tam platforma uzanan SaaS geliştirme hizmetimizle İstanbul genelinde çalışıyoruz.",
      },
      {
        q: "E-ticaret sitesi için bütçe ne kadar olmalı?",
        a: "Temel e-ticaret sitesi ₺20.000'dan başlamaktadır. Kapsam görüşmesinde net fiyat belirlenir.",
      },
    ],
    geo: { latitude: 40.9802, longitude: 28.7219 },
    areaServed: ["Avcılar", "Beylikdüzü", "Batı İstanbul", "İstanbul", "Türkiye"],
    schemaServiceType: "Yazılım Geliştirme ve Web Tasarım",
    googleMapsUrl: "https://maps.google.com/?q=Avcılar,İstanbul",
    sitemapPriority: 0.81,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "saas-web-uygulama",
      "eticaret-kurulum",
      "ai-icerik-otomasyonu",
    ],
  },
  {
    slug: "esenyurt-web-tasarim",
    title: "Esenyurt Web Tasarım",
    metaTitle: "Esenyurt Web Tasarım & E-Ticaret | Solman Digital",
    metaDescription:
      "Esenyurt'taki işletmeler için web sitesi tasarımı, e-ticaret kurulumu ve Trendyol entegrasyonu. Hızlı teslim, net fiyat.",
    district: "Esenyurt",
    heroLabel: "Esenyurt · Avcılar · Batı İstanbul",
    heroH1: "Esenyurt İşletmeleri İçin Web Tasarım & E-Ticaret",
    heroSubtitle:
      "Esenyurt'taki hızla büyüyen ticaret ve sanayi işletmeleri için kurumsal web sitesi ve e-ticaret çözümleri.",
    uniqueSection: {
      heading: "Esenyurt'ta Dijital Büyüme Fırsatları",
      body: "Esenyurt, İstanbul'un en hızlı büyüyen ilçelerinden biri olarak çok sayıda küçük ve orta ölçekli işletmeye ev sahipliği yapıyor. Tekstil atölyeleri, perakende mağazalar ve hizmet işletmelerinin yoğunlaştığı Esenyurt'ta dijital varlık oluşturmak rekabet avantajı sağlıyor. Web tasarım, e-ticaret kurulumu ve Trendyol entegrasyonu konularında hızlı ve uygun maliyetli çözümler sunuyoruz.",
    },
    keywords: [
      "esenyurt web tasarım",
      "esenyurt e-ticaret sitesi",
      "esenyurt yazılım geliştirme",
      "esenyurt kurumsal web sitesi",
      "esenyurt trendyol entegrasyonu",
      "batı istanbul web tasarım firması",
    ],
    faq: [
      {
        q: "Esenyurt'ta web sitesi yaptırmak ne kadar tutar?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan başlar. Ücretsiz kapsam görüşmesinde kesin fiyat belirlenir.",
      },
      {
        q: "Esenyurt için Trendyol entegrasyonu yapabiliyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu ve stok senkronizasyonu başlıca uzmanlık alanlarımızdan.",
      },
      {
        q: "Esenyurt'taki firmam için yüz yüze görüşme mümkün mü?",
        a: "Evet, Esenyurt ve batı İstanbul için proje görüşmeleri organize edebiliyoruz.",
      },
    ],
    geo: { latitude: 41.0282, longitude: 28.6722 },
    areaServed: ["Esenyurt", "Avcılar", "Batı İstanbul", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve E-Ticaret Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Esenyurt,İstanbul",
    sitemapPriority: 0.81,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "landing-page-tasarimi",
    ],
  },
  {
    slug: "tuzla-yazilim-gelistirme",
    title: "Tuzla Yazılım Geliştirme",
    metaTitle: "Tuzla Yazılım Geliştirme & Web Sitesi | Solman Digital",
    metaDescription:
      "Tuzla tersaneler bölgesi ve sanayi işletmeleri için web sitesi, yazılım geliştirme ve e-ticaret. B2B odaklı dijital çözümler.",
    district: "Tuzla",
    heroLabel: "Tuzla · Gebze · Anadolu Yakası",
    heroH1: "Tuzla Sanayi ve Ticaret İşletmeleri İçin Yazılım",
    heroSubtitle:
      "Tuzla'nın tersaneler bölgesi ve organize sanayi işletmeleri için web sitesi, yazılım geliştirme ve dijital çözümler.",
    uniqueSection: {
      heading: "Tuzla: Denizcilik ve Sanayinin Buluştuğu Nokta",
      body: "Tuzla, İstanbul'un Anadolu yakasında tersaneleri, organize sanayi bölgesi ve büyüyen lojistik altyapısıyla öne çıkan bir ilçe. Denizcilik, imalat ve B2B hizmet sektöründeki işletmeler için kurumsal web sitesi, teklif/katalog sistemleri ve API entegrasyonları başlıca ihtiyaçlar arasında. Tuzla ve Gebze bölgesine uzak ya da yakın — tüm projeler net kapsam ve taahhüt edilen teslimle yürütülüyor.",
    },
    keywords: [
      "tuzla yazılım geliştirme",
      "tuzla web sitesi",
      "tuzla b2b yazılım",
      "tuzla tersane yazılım",
      "anadolu yakası sanayi web sitesi",
      "tuzla kurumsal site",
    ],
    faq: [
      {
        q: "Tuzla'daki sanayi firmam için B2B portal geliştirebilir misiniz?",
        a: "Evet. Bayi portalı, teklif sistemi, stok yönetimi gibi B2B çözümler geliştirme uzmanlık alanlarımızdan.",
      },
      {
        q: "Tuzla için yüz yüze görüşme yapılabiliyor mu?",
        a: "Evet, Tuzla ve Anadolu yakası için proje görüşmeleri organize edebiliyoruz.",
      },
      {
        q: "Tersane veya gemi şirketi için web sitesi yapıyor musunuz?",
        a: "Evet. Sektöre özel içerik, çok dilli destek ve teknik servis portalleri kuruyoruz.",
      },
    ],
    geo: { latitude: 40.8175, longitude: 29.3017 },
    areaServed: ["Tuzla", "Gebze", "Anadolu Yakası", "İstanbul", "Türkiye"],
    schemaServiceType: "Yazılım Geliştirme ve Web Tasarım",
    googleMapsUrl: "https://maps.google.com/?q=Tuzla,İstanbul",
    sitemapPriority: 0.80,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "api-entegrasyonu",
      "saas-web-uygulama",
      "dashboard-panel-gelistirme",
    ],
  },
  {
    slug: "sultangazi-yazilim-gelistirme",
    title: "Sultangazi Yazılım Geliştirme",
    metaTitle: "Sultangazi Yazılım Geliştirme & Web Tasarım | Solman Digital",
    metaDescription:
      "Sultangazi ve Gaziosmanpaşa işletmeleri için web sitesi, e-ticaret kurulumu ve Trendyol entegrasyonu. Uygun fiyat, hızlı teslim.",
    district: "Sultangazi",
    heroLabel: "Sultangazi · Gaziosmanpaşa · Kuzey İstanbul",
    heroH1: "Sultangazi İşletmeleri İçin Web & E-Ticaret",
    heroSubtitle:
      "Sultangazi ve Gaziosmanpaşa'daki işletmeler için kurumsal web sitesi, e-ticaret ve Trendyol entegrasyonu. Doğrudan uzman ekip.",
    uniqueSection: {
      heading: "Sultangazi'de Dijital Büyüme",
      body: "Sultangazi, İstanbul'un kuzey ilçelerinden biri olarak gıda, tekstil ve ticaret işletmelerinin yoğunlaştığı bir bölge. Yerel işletmeler için e-ticaret sitesi, Trendyol mağaza açılışı ve kurumsal web sitesi en çok talep edilen hizmetler arasında. Uygun maliyet ve hızlı teslim anlayışıyla Sultangazi ve Gaziosmanpaşa'ya hizmet veriyoruz.",
    },
    keywords: [
      "sultangazi yazılım geliştirme",
      "sultangazi web tasarım",
      "sultangazi e-ticaret",
      "gaziosmanpaşa web sitesi",
      "sultangazi trendyol entegrasyonu",
      "kuzey istanbul web tasarım",
    ],
    faq: [
      {
        q: "Sultangazi'de web sitesi ne kadar tutarında yapılır?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan başlamaktadır. Ücretsiz görüşmede kesin fiyat belirlenir.",
      },
      {
        q: "Sultangazi'de Trendyol mağazası açmak için destek veriyor musunuz?",
        a: "Evet. Trendyol mağaza kurulumu, ürün listeleme ve entegrasyon konularında tam destek sağlıyoruz.",
      },
      {
        q: "Sultangazi'de yüz yüze görüşme mümkün mü?",
        a: "Evet, randevu ile ziyaret organizasyonu yapabiliyoruz.",
      },
    ],
    geo: { latitude: 41.1082, longitude: 28.8827 },
    areaServed: ["Sultangazi", "Gaziosmanpaşa", "Kuzey İstanbul", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve E-Ticaret Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Sultangazi,İstanbul",
    sitemapPriority: 0.80,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "urun-aciklama-otomasyonu",
    ],
  },
  {
    slug: "cekmekoy-yazilim-gelistirme",
    title: "Çekmeköy Yazılım Geliştirme",
    metaTitle: "Çekmeköy Yazılım Geliştirme & Web Sitesi | Solman Digital",
    metaDescription:
      "Çekmeköy ve Sultanbeyli işletmeleri için web sitesi, yazılım geliştirme ve e-ticaret çözümleri. Anadolu yakasında uzman desteği.",
    district: "Çekmeköy",
    heroLabel: "Çekmeköy · Sultanbeyli · Anadolu Yakası",
    heroH1: "Çekmeköy İşletmeleri İçin Web & Yazılım Çözümleri",
    heroSubtitle:
      "Çekmeköy ve Sultanbeyli'deki işletmeler için kurumsal web sitesi, e-ticaret ve yazılım geliştirme. Net takvim, doğrudan uzman.",
    uniqueSection: {
      heading: "Çekmeköy'de Dijital Altyapı Kurun",
      body: "Çekmeköy, İstanbul'un Anadolu yakasında huzurlu yaşam ve gelişen ticaret ekosistemiyle öne çıkan bir ilçe. Yerel hizmet işletmeleri, perakende mağazalar ve KOBİ'ler için web sitesi ile e-ticaret altyapısı kuruluyor. Çekmeköy ve Sultanbeyli'deki müşterilerimizle güvenli ve verimli projeler yürütüyoruz.",
    },
    keywords: [
      "çekmeköy yazılım geliştirme",
      "çekmeköy web tasarım",
      "çekmeköy e-ticaret",
      "sultanbeyli web sitesi",
      "anadolu yakası web geliştirme",
      "çekmeköy kurumsal site",
    ],
    faq: [
      {
        q: "Çekmeköy'de web sitesi yaptırmak kaç günde teslim edilir?",
        a: "Kurumsal tanıtım sitesi 5–10 iş günü, e-ticaret sitesi 10–15 iş günü içinde teslim edilir.",
      },
      {
        q: "Çekmeköy'deki küçük işletmem için uygun bütçeli seçenekler var mı?",
        a: "Evet. ₺8.000'dan başlayan kurumsal web sitesi paketlerimiz KOBİ'ler için uygundur.",
      },
      {
        q: "Çekmeköy için uzaktan mı, yoksa yerinde mi çalışıyorsunuz?",
        a: "Her iki seçenek de mümkün. Genellikle uzaktan çalışıyoruz ancak talep halinde yerinde görüşme düzenliyoruz.",
      },
    ],
    geo: { latitude: 41.0390, longitude: 29.1800 },
    areaServed: ["Çekmeköy", "Sultanbeyli", "Anadolu Yakası", "İstanbul", "Türkiye"],
    schemaServiceType: "Yazılım Geliştirme ve Web Tasarım",
    googleMapsUrl: "https://maps.google.com/?q=Çekmeköy,İstanbul",
    sitemapPriority: 0.80,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "landing-page-tasarimi",
      "seo-teknik-altyapi",
    ],
  },
]
