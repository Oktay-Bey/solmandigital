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
  /** İlçeye özgü ikinci içerik bloğu — yerel iş ortamı / sektör profili.
   *  Soft-duplicate'i kırmak için her sayfaya benzersiz ~120+ kelime metin. */
  localContext?: { heading: string; body: string }
  /** İlçeye özgü ek FAQ — genel FAQ'a eklenir, benzersiz içerik artırır. */
  localFaq?: Array<{ q: string; a: string }>
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
    localContext: {
      heading: "Bağdat Caddesi'nden Moda'ya: Kadıköy'de Hangi İşler Neye İhtiyaç Duyuyor?",
      body: "Kadıköy'ün ticari dokusu mahalle mahalle değişir. Bağdat Caddesi hattındaki perakende ve moda markaları, fiziksel mağazasını çevrimiçine taşıyan bir e-ticaret altyapısı ve Trendyol–Hepsiburada gibi pazaryeri entegrasyonu ister. Moda ve Yeldeğirmeni'ndeki kafe, bar ve yaratıcı işletmeler ise marka kimliğini yansıtan, görsel ağırlıklı tanıtım siteleri ve online rezervasyon arar. Fikirtepe ve çevresindeki yeni girişimler için ise MVP hızında çıkılabilen SaaS ve uygulama geliştirme önceliklidir. Anadolu yakasının bu girişimci enerjisine, her birine ayrı kapsamla yanıt veriyoruz — hazır şablon değil, işin gerçek ihtiyacına göre.",
    },
    localFaq: [
      {
        q: "Kadıköy'deki fiziksel mağazamı e-ticarete taşımak istiyorum, nereden başlamalıyım?",
        a: "Önce mevcut ürün kataloğunuzu, stok yönetimi ihtiyacınızı ve hedef pazaryerlerinizi (Trendyol, Hepsiburada vb.) konuşuyoruz. Buna göre İyzico/Stripe ödeme entegreli bir e-ticaret altyapısı ve istenirse pazaryeri stok-sipariş senkronizasyonu kuruyoruz. İlk görüşme ücretsiz; mevcut durumunuza göre net bir yol haritası çıkarıyoruz.",
      },
    ],
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
    localContext: {
      heading: "Beşiktaş'ın İş Profili ve Dijital İhtiyaçları",
      body: "Beşiktaş; Levent ve Zincirlikuyu hattındaki kurumsal merkez ofislerden Çarşı'daki butik işletmelere, Ortaköy ve Bebek'teki kafe-restoran ve butik markalara kadar geniş bir yelpazeyi barındırır. Bu çeşitlilik tek tip bir çözümle karşılanmaz: bir hukuk veya danışmanlık firması kurumsal güven veren, hızlı yüklenen bir tanıtım sitesi isterken; Bebek'teki bir restoran online rezervasyon ve QR menü, bir butik marka ise İyzico entegreli e-ticaret ister. Beşiktaş'taki işletmelerle aynı dili konuşmamızın sebebi, bu sektörlerin her birine ayrı ayrı proje teslim etmiş olmamız. Tanıtım sitesinden satış yapan platforma — kapsamı işinize göre kuruyoruz.",
    },
    localFaq: [
      {
        q: "Levent veya Zincirlikuyu'daki ofisimize gelebilir misiniz?",
        a: "Evet. Beşiktaş merkezli olduğumuz için Levent, Zincirlikuyu, Etiler ve Maslak hattındaki kurumsal ofislere yerinde toplantıya gelebiliyoruz. Genelde ilk tanışma + kapsam toplantısını yüz yüze yapıp, sonraki süreci uzaktan ve şeffaf güncellemelerle yürütüyoruz.",
      },
    ],
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
    localContext: {
      heading: "Toptancıdan Pazaryeri Satıcısına: Bağcılar'da Stok ve Entegrasyon",
      body: "Bağcılar–Güngören hattındaki tekstil ve hazır giyim üreticilerinin en büyük dijital zorluğu satış değil, senkronizasyondur. Aynı ürün toptan müşteriye, kendi e-ticaret sitesine ve Trendyol–Hepsiburada–N11 gibi birden çok pazaryerine aynı anda sunulduğunda; stok, fiyat ve sipariş tek tek elle takip edilemez. Yüzlerce SKU'lu bir hazır giyim kataloğunda bu, gün sonunda yanlış stok ve iptal siparişe dönüşür. Bu işletmeler için kurduğumuz çözüm; XML/Excel ile toplu ürün aktarımı, pazaryerleri arası otomatik stok-fiyat senkronizasyonu ve tek panelden sipariş yönetimi. Üretim hızınıza ayak uyduran, elle giriş gerektirmeyen bir altyapı.",
    },
    localFaq: [
      {
        q: "Birden fazla pazaryerinde satıyorum, stok karışıyor. Bunu çözebilir misiniz?",
        a: "Evet — bu, Bağcılar ve Güngören'deki tekstil işletmelerinde en sık çözdüğümüz sorun. Trendyol, Hepsiburada, N11 ve kendi sitenizdeki stoğu tek merkezden senkronize eden bir entegrasyon kuruyoruz: bir kanalda satış olduğunda diğer tüm kanallarda stok otomatik düşer, fiyat güncellemeleri toplu yapılır. Yüzlerce ürünlük katalogları XML/Excel ile toplu aktarıyoruz.",
      },
    ],
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
      "Ümraniye'deki KOBİ ve kurumsal firmalar için web sitesi, e-ticaret ve yazılım geliştirme. Anadolu yakasının teknoloji merkezi için dijital çözümler. 5–15 iş günü teslim.",
    district: "Ümraniye",
    heroLabel: "Ümraniye · Çekmeköy · Anadolu Yakası",
    heroH1: "Ümraniye İşletmeleri İçin Web & Yazılım Geliştirme",
    heroSubtitle:
      "Ümraniye'nin hızla büyüyen iş ekosistemi için kurumsal web sitesi, e-ticaret ve SaaS çözümleri. Anadolu yakasında doğrudan uzman erişimi, ajans maliyeti yok.",
    uniqueSection: {
      heading: "Ümraniye: Anadolu Yakasının Yükselen İş ve Teknoloji Merkezi",
      body: "Ümraniye, İstanbul'un Anadolu yakasında en hızlı büyüyen iş ve teknoloji merkezlerinden biri. İTÜ Teknopark, Validebağ ofis plazaları ve E-5 aksındaki ticaret kuşağıyla birlikte Ümraniye; yazılım, lojistik ve KOBİ hizmetleri alanında yoğun bir dijitalleşme talep ekosistemi oluşturuyor. Buradaki işletmelerin çoğu ya Trendyol/Hepsiburada üzerinden online satışa geçiyor ya da kurumsal web varlığını güçlendirmek istiyor. Kurumsal web sitesinden SaaS platforma, e-ticaretten AI otomasyona uzanan çözümlerimizle Ümraniye ve çevre ilçelere doğrudan uzman erişimiyle hizmet veriyoruz.",
    },
    keywords: [
      "ümraniye yazılım geliştirme",
      "ümraniye web sitesi yaptırma",
      "ümraniye e-ticaret sitesi",
      "ümraniye web tasarım firması",
      "anadolu yakası yazılım şirketi",
      "ümraniye kurumsal web sitesi",
      "ümraniye saas geliştirme",
      "ümraniye next.js geliştirici",
      "ümraniye trendyol entegrasyonu",
      "ümraniye dijital ajans",
    ],
    faq: [
      {
        q: "Ümraniye'de yüz yüze görüşme yapabilir misiniz?",
        a: "Evet. Ümraniye ve Anadolu yakası için proje başlangıcında yüz yüze toplantı organize edebiliyoruz. Ofis veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "Ümraniye'deki işletmem için e-ticaret sitesi ne kadar sürer?",
        a: "Temel e-ticaret sitesi 10–15 iş günü, Trendyol veya Hepsiburada entegrasyonu dahil projeler 15–25 iş günü içinde teslim edilir. Kapsama göre başlangıç görüşmesinde net takvim paylaşılır.",
      },
      {
        q: "Ümraniye'de SaaS platform geliştirme hizmeti veriyor musunuz?",
        a: "Evet. MVP'den tam platforma uzanan SaaS geliştirme hizmetimizle Ümraniye ve İstanbul genelinde çalışıyoruz. Auth, abonelik sistemi ve multi-tenant mimari dahil 4–8 haftada teslim.",
      },
      {
        q: "Ümraniye'de web sitesi yaptırmak ne kadar tutar?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Kapsam görüşmesinde sabit fiyat belirlenir; teklif sonrası fiyat değişmez.",
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
      "Kartal ve Maltepe işletmeleri için modern web tasarım, e-ticaret kurulumu ve yazılım geliştirme. Anadolu yakasında doğrudan uzman, hızlı teslim, net fiyat.",
    district: "Kartal",
    heroLabel: "Kartal · Maltepe · Anadolu Yakası",
    heroH1: "Kartal İşletmeleri İçin Web Tasarım & Yazılım",
    heroSubtitle:
      "Kartal ve Maltepe'deki işletmeler için kurumsal web sitesi, e-ticaret ve dijital çözümler. Doğrudan uzman erişimi, ajans markupı yok.",
    uniqueSection: {
      heading: "Kartal'da Dijital Varlığınızı Güçlendirin",
      body: "Kartal, İstanbul'un Anadolu yakasında sahil şeridi, D-100 aksındaki ticaret merkezi ve hızla büyüyen konut projeleriyle dikkat çeken bir ilçe. Yerel perakende işletmeleri, hizmet sektörü firmaları ve KOBİ'lerin dijitalleşme talebi her geçen yıl artıyor. E-ticaret sitesi açmak, Trendyol mağazasını yazılımla yönetmek veya kurumsal web varlığını güçlendirmek isteyen Kartal işletmeleriyle yüz yüze çalışıyor, net kapsam ve taahhüt edilen teslimle proje yürütüyoruz. Büyük ajansların markupı olmadan, büyük ajans kalitesinde iş.",
    },
    keywords: [
      "kartal web tasarım",
      "kartal yazılım geliştirme",
      "kartal e-ticaret sitesi",
      "maltepe web sitesi yaptırma",
      "anadolu yakası web tasarım",
      "kartal kurumsal web sitesi",
      "kartal next.js geliştirici",
      "kartal trendyol entegrasyonu",
      "maltepe yazılım firması",
      "anadolu yakası dijital ajans",
    ],
    faq: [
      {
        q: "Kartal için web sitesi ne kadar sürede teslim edilir?",
        a: "Kurumsal tanıtım sitesi 5–10 iş günü, e-ticaret sitesi 10–15 iş günü, Trendyol entegrasyonu dahil projeler 15–25 iş günü içinde teslim edilir. Kapsama göre başlangıç görüşmesinde net takvim paylaşılır.",
      },
      {
        q: "Kartal'da yüz yüze görüşme mümkün mü?",
        a: "Evet. Kartal ve Anadolu yakasındaki işletmeler için yüz yüze proje görüşmesi organize edebiliyoruz. Ofis ziyareti veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "Kartal'daki küçük işletmem için bütçe ne olmalı?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Sabit fiyat garantisi sunuyoruz — teklif sonrası fiyat değişmez.",
      },
      {
        q: "Trendyol entegrasyonu yapıyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu, sipariş senkronizasyonu ve ürün listeleme otomasyonu başlıca uzmanlık alanlarımızdan. Hepsiburada ve diğer pazaryerleri için de entegrasyon geliştiriyoruz.",
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
    metaTitle: "Küçükçekmece Web Tasarım & E-Ticaret Yazılım | Solman Digital",
    metaDescription:
      "Küçükçekmece, Bahçeşehir ve Halkalı işletmeleri için web sitesi, e-ticaret ve Trendyol entegrasyonu. Batı İstanbul'da doğrudan uzman erişimi, hızlı teslim.",
    district: "Küçükçekmece",
    heroLabel: "Küçükçekmece · Bahçeşehir · Batı İstanbul",
    heroH1: "Küçükçekmece İşletmeleri İçin Web & E-Ticaret",
    heroSubtitle:
      "Küçükçekmece ve çevresindeki işletmeler için kurumsal web sitesi, e-ticaret kurulumu ve Trendyol entegrasyonu. Doğrudan uzman erişimi, ajans markupı yok.",
    uniqueSection: {
      heading: "Batı İstanbul'un Stratejik Ticaret Merkezi: Küçükçekmece",
      body: "Küçükçekmece, İstanbul Havalimanı'na yakınlığı ve Halkalı–Bağcılar koridorundaki büyüyen ticaret altyapısıyla lojistik, perakende ve imalat şirketleri için stratejik bir konum. Havalimanı çevresinde açılan ofis kompleksleri, yeni AVM'ler ve konut projeleriyle birlikte bölgedeki KOBİ ve işletmelerin dijital dönüşüm talebi artıyor. Trendyol mağazası açmak, e-ticaret sitesi kurmak veya kurumsal web varlığını güçlendirmek isteyen Küçükçekmece işletmelerine net kapsam ve taahhüt edilen teslimle hizmet veriyoruz.",
    },
    keywords: [
      "küçükçekmece web tasarım",
      "küçükçekmece e-ticaret sitesi",
      "bahçeşehir web sitesi yaptırma",
      "küçükçekmece yazılım geliştirme",
      "batı istanbul web tasarım firması",
      "küçükçekmece kurumsal web sitesi",
      "küçükçekmece trendyol entegrasyonu",
      "halkalı web geliştirici",
      "küçükçekmece next.js geliştirici",
      "batı istanbul dijital ajans",
    ],
    faq: [
      {
        q: "Küçükçekmece için yüz yüze görüşme yapılabiliyor mu?",
        a: "Evet. Küçükçekmece ve batı İstanbul için yüz yüze proje görüşmesi organize edebiliyoruz. Ofis veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "E-ticaret sitesi fiyatları ve teslim süresi nedir?",
        a: "Temel e-ticaret sitesi ₺20.000'dan başlar, 10–15 iş günü içinde teslim edilir. Trendyol veya Hepsiburada entegrasyonu dahil projeler 15–25 iş günü sürer.",
      },
      {
        q: "Trendyol entegrasyonu hizmeti veriyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu, stok senkronizasyonu ve sipariş yönetimi başlıca uzmanlık alanlarımızdan. Hepsiburada ve diğer pazaryerleri için de entegrasyon geliştiriyoruz.",
      },
      {
        q: "Küçükçekmece'de kurumsal web sitesi ne kadar tutar?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Sabit fiyat garantisi sunuyoruz — teklif sonrası fiyat değişmez.",
      },
    ],
    geo: { latitude: 41.0010, longitude: 28.7820 },
    areaServed: ["Küçükçekmece", "Bahçeşehir", "Halkalı", "Batı İstanbul", "İstanbul", "Türkiye"],
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
      "Avcılar ve Beylikdüzü işletmeleri için web sitesi, e-ticaret, SaaS ve yazılım geliştirme. Batı İstanbul'a özel dijital çözümler. 5–15 iş günü teslim.",
    district: "Avcılar",
    heroLabel: "Avcılar · Beylikdüzü · Batı İstanbul",
    heroH1: "Avcılar İşletmeleri İçin Yazılım & Web Geliştirme",
    heroSubtitle:
      "Avcılar ve Beylikdüzü'ndeki işletmeler için kurumsal web sitesi, e-ticaret ve AI otomasyon çözümleri. Doğrudan uzman erişimi, ajans maliyeti yok.",
    uniqueSection: {
      heading: "Avcılar'da Dijital Dönüşüm: Üniversite Ekosistemi ve Büyüyen KOBİ'ler",
      body: "Avcılar, İstanbul Üniversitesi Avcılar yerleşkesi, E-5 aksındaki sanayi kuşağı ve hızla gelişen konut bölgeleriyle dinamik bir iş ekosistemine ev sahipliği yapıyor. Eğitim kurumları, orta ölçekli sanayi tesisleri, perakende mağazalar ve yeme-içme işletmelerinin yoğunlaştığı bu ilçede dijital varlık oluşturmak rekabet avantajı sağlıyor. Avcılar ve Beylikdüzü'ndeki işletmelere kurumsal web sitesi, e-ticaret kurulumu, Trendyol entegrasyonu ve SaaS geliştirme alanlarında net kapsam ve taahhüt edilen teslimle hizmet veriyoruz.",
    },
    keywords: [
      "avcılar yazılım geliştirme",
      "avcılar web sitesi yaptırma",
      "avcılar e-ticaret sitesi",
      "beylikdüzü web tasarım",
      "avcılar kurumsal web sitesi",
      "batı istanbul yazılım firması",
      "avcılar saas geliştirme",
      "avcılar trendyol entegrasyonu",
      "beylikdüzü yazılım şirketi",
      "avcılar next.js geliştirici",
    ],
    faq: [
      {
        q: "Avcılar'da yüz yüze görüşme yapılabiliyor mu?",
        a: "Evet. Avcılar ve batı İstanbul için yüz yüze proje görüşmesi organize edebiliyoruz. Ofis veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "Avcılar'daki girişimim için SaaS platform geliştirebilir misiniz?",
        a: "Evet. Next.js, Supabase ve Stripe ile 4–8 haftada MVP teslimi yapıyoruz. Auth, abonelik sistemi, multi-tenant mimari dahil.",
      },
      {
        q: "Avcılar'da e-ticaret sitesi ne kadar sürede hazır olur?",
        a: "Temel e-ticaret sitesi 10–15 iş günü içinde teslim edilir. Trendyol veya Hepsiburada entegrasyonu dahil projeler 15–25 iş günü sürer.",
      },
      {
        q: "Avcılar'da web sitesi ve e-ticaret fiyatları ne kadar?",
        a: "Kurumsal web sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Sabit fiyat garantisi — teklif sonrası değişmez.",
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
    metaTitle: "Esenyurt Web Tasarım & E-Ticaret Yazılım | Solman Digital",
    metaDescription:
      "Esenyurt'taki KOBİ ve ticaret işletmeleri için web sitesi tasarımı, e-ticaret kurulumu ve Trendyol entegrasyonu. Batı İstanbul'da doğrudan uzman, hızlı teslim, net fiyat.",
    district: "Esenyurt",
    heroLabel: "Esenyurt · Avcılar · Batı İstanbul",
    heroH1: "Esenyurt İşletmeleri İçin Web Tasarım & E-Ticaret",
    heroSubtitle:
      "Esenyurt'taki büyüyen ticaret ve sanayi işletmeleri için kurumsal web sitesi, e-ticaret ve Trendyol entegrasyonu. Doğrudan uzman erişimi, ajans markupı yok.",
    uniqueSection: {
      heading: "Esenyurt: İstanbul'un En Hızlı Büyüyen İlçesinde Dijital Fırsat",
      body: "Esenyurt, İstanbul'un nüfus ve ticaret açısından en hızlı büyüyen ilçelerinden biri. Tekstil atölyeleri, perakende mağazalar, yeme-içme işletmeleri ve hizmet sektörüyle yoğun bir KOBİ ekosistemine ev sahipliği yapıyor. Bu büyümeyle birlikte dijital varlık talebi de katlanıyor: Trendyol mağazası açmak, e-ticaret sitesi kurmak veya kurumsal web vitrinini güçlendirmek isteyen pek çok Esenyurt işletmesiyle çalıştık. Net kapsam, sabit fiyat ve taahhüt edilen teslimle Esenyurt ve batı İstanbul işletmelerine hizmet veriyoruz.",
    },
    keywords: [
      "esenyurt web tasarım",
      "esenyurt e-ticaret sitesi",
      "esenyurt yazılım geliştirme",
      "esenyurt kurumsal web sitesi",
      "esenyurt trendyol entegrasyonu",
      "batı istanbul web tasarım firması",
      "esenyurt web sitesi yaptırma",
      "esenyurt next.js geliştirici",
      "esenyurt dijital ajans",
      "esenyurt online mağaza kurulum",
    ],
    faq: [
      {
        q: "Esenyurt'ta web sitesi yaptırmak ne kadar tutar?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlar. Sabit fiyat garantisi veriyoruz — teklif sonrası fiyat değişmez.",
      },
      {
        q: "Esenyurt için Trendyol entegrasyonu yapabiliyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu, stok senkronizasyonu ve sipariş yönetimi başlıca uzmanlık alanlarımızdan. Hepsiburada için de entegrasyon geliştiriyoruz.",
      },
      {
        q: "Esenyurt'taki firmam için yüz yüze görüşme mümkün mü?",
        a: "Evet. Esenyurt ve batı İstanbul için yüz yüze proje görüşmesi organize edebiliyoruz. Ofis veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "Esenyurt'ta e-ticaret sitesi kaç günde hazır olur?",
        a: "Temel e-ticaret sitesi 10–15 iş günü içinde teslim edilir. Trendyol entegrasyonu dahil projeler 15–25 iş günü sürer.",
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
    metaTitle: "Tuzla Yazılım Geliştirme & B2B Web Sitesi | Solman Digital",
    metaDescription:
      "Tuzla tersaneler bölgesi ve organize sanayi işletmeleri için web sitesi, B2B portal ve yazılım geliştirme. Denizcilik ve imalat sektörüne özel dijital çözümler.",
    district: "Tuzla",
    heroLabel: "Tuzla · Gebze · Anadolu Yakası",
    heroH1: "Tuzla Sanayi ve Ticaret İşletmeleri İçin Yazılım",
    heroSubtitle:
      "Tuzla'nın tersaneler bölgesi ve organize sanayi işletmeleri için kurumsal web sitesi, B2B portal ve yazılım geliştirme. Doğrudan uzman, net takvim.",
    uniqueSection: {
      heading: "Tuzla: Denizcilik, Sanayi ve B2B Yazılımın Buluştuğu Nokta",
      body: "Tuzla, İstanbul'un Anadolu yakasında tersaneleri, organize sanayi bölgesi (TUZLOSB) ve büyüyen lojistik altyapısıyla Türkiye'nin en önemli sanayi ilçelerinden biri. Denizcilik, gemi inşa, metal imalat ve endüstriyel tedarik firmalarının yoğunlaştığı bu bölgede dijital ihtiyaçlar B2B odaklı: kurumsal web sitesi, teknik ürün kataloğu, bayi portalı ve API entegrasyonları en çok karşılaştığımız talepler. Tuzla ve Gebze bölgesindeki sanayi işletmelerine uzaktan veya yüz yüze — tüm projeler net kapsam ve taahhüt edilen teslimle yürütülüyor.",
    },
    keywords: [
      "tuzla yazılım geliştirme",
      "tuzla web sitesi yaptırma",
      "tuzla b2b yazılım",
      "tuzla tersane web sitesi",
      "anadolu yakası sanayi yazılım",
      "tuzla kurumsal web sitesi",
      "tuzla organize sanayi yazılım",
      "tuzla api entegrasyonu",
      "tuzla bayi portalı",
      "gebze web geliştirici",
    ],
    faq: [
      {
        q: "Tuzla'daki sanayi firmam için B2B portal geliştirebilir misiniz?",
        a: "Evet. Bayi portalı, teklif sistemi, ürün katalog yönetimi ve stok entegrasyonu gibi B2B çözümler uzmanlık alanlarımızdan. ERP veya SAP gibi mevcut sistemlerle API entegrasyonu da yapıyoruz.",
      },
      {
        q: "Tuzla için yüz yüze görüşme yapılabiliyor mu?",
        a: "Evet. Tuzla ve Anadolu yakasının güney ilçeleri için proje görüşmesi organize edebiliyoruz. Uzaktan çalışmayı tercih eden firmalar için Zoom görüşmeleri de yapıyoruz.",
      },
      {
        q: "Tersane veya denizcilik şirketi için web sitesi yapıyor musunuz?",
        a: "Evet. Sektöre özel teknik içerik, çok dilli destek (Türkçe + İngilizce), teknik servis portali ve ürün katalog sistemleri kuruyoruz.",
      },
      {
        q: "Sanayi firması için web sitesi ne kadar tutar?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan, B2B portal ve özel yazılım ₺20.000'dan başlamaktadır. Kapsam görüşmesinde sabit fiyat belirlenir.",
      },
    ],
    geo: { latitude: 40.8175, longitude: 29.3017 },
    areaServed: ["Tuzla", "Gebze", "Anadolu Yakası", "İstanbul", "Türkiye"],
    schemaServiceType: "B2B Yazılım Geliştirme ve Web Tasarım",
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
    metaTitle: "Sultangazi & Gaziosmanpaşa Web Tasarım & E-Ticaret | Solman Digital",
    metaDescription:
      "Sultangazi ve Gaziosmanpaşa işletmeleri için web sitesi, e-ticaret kurulumu ve Trendyol entegrasyonu. Kuzey İstanbul'da doğrudan uzman, hızlı teslim, net fiyat.",
    district: "Sultangazi",
    heroLabel: "Sultangazi · Gaziosmanpaşa · Kuzey İstanbul",
    heroH1: "Sultangazi İşletmeleri İçin Web & E-Ticaret",
    heroSubtitle:
      "Sultangazi ve Gaziosmanpaşa'daki gıda, tekstil ve ticaret işletmeleri için kurumsal web sitesi, e-ticaret ve Trendyol entegrasyonu. Doğrudan uzman, ajansız.",
    uniqueSection: {
      heading: "Sultangazi ve Gaziosmanpaşa'da Dijital Büyüme",
      body: "Sultangazi ve komşu Gaziosmanpaşa, İstanbul'un kuzey aksında gıda, tekstil, hizmet ve perakende işletmelerinin yoğunlaştığı dinamik bir ticaret koridoru. Bu bölgedeki işletmelerin büyük kısmı Trendyol veya Hepsiburada üzerinden online satışa geçiyor ya da kurumsal web vitrinini güçlendirmek istiyor. E-ticaret sitesi kurulumu, Trendyol entegrasyonu ve kurumsal web tasarımı alanlarında net kapsam ve sabit fiyat garantisiyle Sultangazi, Gaziosmanpaşa ve kuzey İstanbul işletmelerine hizmet veriyoruz.",
    },
    keywords: [
      "sultangazi yazılım geliştirme",
      "sultangazi web tasarım",
      "sultangazi e-ticaret sitesi",
      "gaziosmanpaşa web sitesi yaptırma",
      "sultangazi trendyol entegrasyonu",
      "kuzey istanbul web tasarım",
      "sultangazi kurumsal web sitesi",
      "gaziosmanpaşa yazılım firması",
      "sultangazi online mağaza kurulum",
      "sultangazi next.js geliştirici",
    ],
    faq: [
      {
        q: "Sultangazi'de web sitesi ne kadar tutar?",
        a: "Kurumsal tanıtım sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Sabit fiyat garantisi — teklif sonrası değişmez.",
      },
      {
        q: "Sultangazi'de Trendyol mağazası ve entegrasyonu için destek veriyor musunuz?",
        a: "Evet. Trendyol mağaza kurulumu, ürün listeleme otomasyonu ve stok senkronizasyonu konularında tam destek sağlıyoruz. Hepsiburada entegrasyonu da yapıyoruz.",
      },
      {
        q: "Sultangazi'de yüz yüze görüşme mümkün mü?",
        a: "Evet. Sultangazi, Gaziosmanpaşa ve kuzey İstanbul için yüz yüze proje görüşmesi organize edebiliyoruz. Randevu ile ofis veya kafe ziyareti yapıyoruz.",
      },
      {
        q: "E-ticaret sitesi ne kadar sürede hazır olur?",
        a: "Temel e-ticaret sitesi 10–15 iş günü içinde teslim edilir. Trendyol entegrasyonu dahil projeler 15–25 iş günü sürer.",
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
    metaTitle: "Çekmeköy & Sultanbeyli Web Tasarım & Yazılım | Solman Digital",
    metaDescription:
      "Çekmeköy ve Sultanbeyli işletmeleri için web sitesi, yazılım geliştirme ve e-ticaret çözümleri. Anadolu yakasında doğrudan uzman desteği, hızlı teslim.",
    district: "Çekmeköy",
    heroLabel: "Çekmeköy · Sultanbeyli · Anadolu Yakası",
    heroH1: "Çekmeköy İşletmeleri İçin Web & Yazılım Çözümleri",
    heroSubtitle:
      "Çekmeköy ve Sultanbeyli'deki işletmeler için kurumsal web sitesi, e-ticaret ve yazılım geliştirme. Net takvim, doğrudan uzman, ajans maliyeti yok.",
    uniqueSection: {
      heading: "Çekmeköy'de Dijital Altyapı Kurun",
      body: "Çekmeköy, İstanbul'un Anadolu yakasında yeşil dokusu ve gelişen konut projesiyle öne çıkan, son yıllarda hızla büyüyen bir ilçe. Geniş aile yaşam alanlarıyla birlikte bölgeye taşınan küçük işletmeler, klinikler, eğitim kurumları ve perakende mağazalar dijital varlık oluşturmak istiyor. Çekmeköy ve Sultanbeyli'deki işletmeler için kurumsal web sitesi, e-ticaret altyapısı ve yerel SEO çalışması en çok talep edilen projeler arasında. Uzaktan veya yüz yüze — net kapsam ve taahhüt edilen teslimle çalışıyoruz.",
    },
    keywords: [
      "çekmeköy yazılım geliştirme",
      "çekmeköy web tasarım",
      "çekmeköy e-ticaret sitesi",
      "sultanbeyli web sitesi yaptırma",
      "anadolu yakası web geliştirme",
      "çekmeköy kurumsal web sitesi",
      "çekmeköy next.js geliştirici",
      "sultanbeyli yazılım firması",
      "çekmeköy seo web sitesi",
      "anadolu yakası dijital ajans",
    ],
    faq: [
      {
        q: "Çekmeköy'de web sitesi yaptırmak kaç günde teslim edilir?",
        a: "Kurumsal tanıtım sitesi 5–10 iş günü, e-ticaret sitesi 10–15 iş günü içinde teslim edilir. Kapsam görüşmesinde net takvim paylaşılır.",
      },
      {
        q: "Çekmeköy'deki küçük işletmem için uygun bütçeli seçenekler var mı?",
        a: "Evet. Kurumsal web sitesi ₺8.000'dan başlamaktadır. Landing page projeleri daha uygun bütçeyle de tamamlanabilir. Kapsam görüşmesinde ihtiyaca göre seçenek sunuyoruz.",
      },
      {
        q: "Çekmeköy için uzaktan mı, yoksa yerinde mi çalışıyorsunuz?",
        a: "Her iki seçenek de mümkün. Uzaktan çalışmayı tercih eden firmalar için WhatsApp, Zoom ve e-posta üzerinden tam iletişim sağlıyoruz. Talep halinde Çekmeköy ve Anadolu yakası için yüz yüze görüşme de organize ediyoruz.",
      },
      {
        q: "E-ticaret sitesi ve Trendyol entegrasyonu yapıyor musunuz?",
        a: "Evet. Temel e-ticaret sitesi 10–15 iş günü içinde teslim edilir. Trendyol API entegrasyonu ve stok senkronizasyonu da uzmanlık alanlarımızdan.",
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
  // ─── YENİ İLÇELER ─────────────────────────────────────────────────────────
  {
    slug: "zeytinburnu-web-tasarim",
    title: "Zeytinburnu Web Tasarım",
    metaTitle: "Zeytinburnu Web Tasarım & E-Ticaret Yazılım | Solman Digital",
    metaDescription:
      "Zeytinburnu'ndaki tekstil, hazır giyim ve ticaret işletmeleri için web sitesi, e-ticaret ve Trendyol entegrasyonu. Doğrudan uzman, sabit fiyat, hızlı teslim.",
    district: "Zeytinburnu",
    heroLabel: "Zeytinburnu · Bakırköy · Batı İstanbul",
    heroH1: "Zeytinburnu İşletmeleri İçin Web Tasarım & E-Ticaret",
    heroSubtitle:
      "Zeytinburnu'ndaki tekstil, hazır giyim ve perakende işletmeleri için kurumsal web sitesi, e-ticaret kurulumu ve Trendyol entegrasyonu. Doğrudan uzman erişimi, ajansız.",
    uniqueSection: {
      heading: "Zeytinburnu'nun Tekstil ve Ticaret Ekosistemi Dijitale Taşınıyor",
      body: "Zeytinburnu, İstanbul'un önemli tekstil ve hazır giyim üretim merkezlerinden biri. Kazlıçeşme deri ürünleri pazarı ve çevresindeki imalat atölyeleri ile toptan ticaret işletmeleri, online satış kanalı açmak veya Trendyol/Hepsiburada entegrasyonu yaptırmak istiyor. Ürün katalog aktarımı, İyzico ödeme entegrasyonu ve çok kanallı stok yönetimi bu bölgede sıkça karşılaştığımız projeler. Zeytinburnu işletmelerine yüz yüze görüşme imkânı ve taahhüt edilen teslimle hizmet veriyoruz.",
    },
    keywords: [
      "zeytinburnu web tasarım",
      "zeytinburnu e-ticaret sitesi",
      "zeytinburnu yazılım geliştirme",
      "zeytinburnu trendyol entegrasyonu",
      "zeytinburnu tekstil e-ticaret",
      "zeytinburnu kurumsal web sitesi",
      "zeytinburnu web sitesi yaptırma",
      "kazlıçeşme e-ticaret yazılım",
      "zeytinburnu online mağaza kurulum",
      "zeytinburnu next.js geliştirici",
    ],
    faq: [
      {
        q: "Zeytinburnu'ndaki tekstil işletmem için e-ticaret sitesi kurabilir misiniz?",
        a: "Evet. Tekstil ve hazır giyim işletmeleri için özelleştirilmiş e-ticaret siteleri geliştiriyoruz. Ürün katalog aktarımı, İyzico entegrasyonu ve Trendyol API entegrasyonu dahil çözümler sunuyoruz.",
      },
      {
        q: "Zeytinburnu'nda yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Zeytinburnu ve batı İstanbul için yüz yüze proje görüşmesi organize edebiliyoruz. Ofis veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "E-ticaret sitesi ne kadar sürede teslim edilir?",
        a: "Temel e-ticaret sitesi 10–15 iş günü, Trendyol entegrasyonu dahil projeler 15–25 iş günü içinde teslim edilir.",
      },
      {
        q: "Zeytinburnu'nda web sitesi fiyatları nedir?",
        a: "Kurumsal web sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Sabit fiyat garantisi — teklif sonrası değişmez.",
      },
    ],
    geo: { latitude: 41.0000, longitude: 28.9067 },
    areaServed: ["Zeytinburnu", "Bakırköy", "Batı İstanbul", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve E-Ticaret Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Zeytinburnu,İstanbul",
    sitemapPriority: 0.83,
    featuredServiceSlugs: [
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "kurumsal-web-sitesi",
      "urun-aciklama-otomasyonu",
    ],
  },
  {
    slug: "eyupsultan-web-tasarim",
    title: "Eyüpsultan Web Tasarım",
    metaTitle: "Eyüpsultan Web Tasarım & Yazılım Geliştirme | Solman Digital",
    metaDescription:
      "Eyüpsultan, Alibeyköy ve Rami'deki işletmeler için web sitesi, e-ticaret ve yazılım geliştirme. Kuzey İstanbul'da doğrudan uzman, hızlı teslim.",
    district: "Eyüpsultan",
    heroLabel: "Eyüpsultan · Alibeyköy · Kuzey İstanbul",
    heroH1: "Eyüpsultan İşletmeleri İçin Web Tasarım & Yazılım",
    heroSubtitle:
      "Eyüpsultan ve Alibeyköy'deki perakende, hizmet ve KOBİ işletmeleri için kurumsal web sitesi, e-ticaret ve yazılım çözümleri. Doğrudan uzman, ajansız.",
    uniqueSection: {
      heading: "Eyüpsultan'ın Büyüyen Ticaret Dinamiğinde Dijital Varlık",
      body: "Eyüpsultan, tarihi dokusuyla tanınan ama son yıllarda hızla gelişen ticaret ve konut projeleriyle modern bir iş ekosistemi oluşturan bir ilçe. Alibeyköy ve Rami sanayi aksında imalat ve toptan ticaret firmaları, Eyüpsultan merkezde hizmet işletmeleri ve perakende mağazalar dijitalleşme talebinde öne çıkıyor. E-ticaret sitesi açmak, Trendyol üzerinden satışa geçmek veya kurumsal web varlığını güçlendirmek isteyen Eyüpsultan işletmeleriyle yüz yüze ve uzaktan çalışıyoruz.",
    },
    keywords: [
      "eyüpsultan web tasarım",
      "eyüpsultan yazılım geliştirme",
      "eyüpsultan e-ticaret sitesi",
      "alibeyköy web sitesi yaptırma",
      "eyüpsultan kurumsal web sitesi",
      "rami yazılım geliştirici",
      "eyüpsultan trendyol entegrasyonu",
      "eyüpsultan next.js geliştirici",
      "kuzey istanbul web tasarım firması",
      "eyüpsultan online mağaza",
    ],
    faq: [
      {
        q: "Eyüpsultan'da yüz yüze görüşme yapabiliyor musunuz?",
        a: "Evet. Eyüpsultan, Alibeyköy ve kuzey İstanbul için yüz yüze proje görüşmesi organize edebiliyoruz.",
      },
      {
        q: "Eyüpsultan'daki işletmem için web sitesi ne kadar tutar?",
        a: "Kurumsal web sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Sabit fiyat garantisiyle çalışıyoruz.",
      },
      {
        q: "Trendyol entegrasyonu yapıyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu, stok senkronizasyonu ve sipariş yönetimi uzmanlık alanlarımızdan. Hepsiburada için de entegrasyon geliştiriyoruz.",
      },
      {
        q: "E-ticaret sitesi kaç günde teslim edilir?",
        a: "Temel e-ticaret sitesi 10–15 iş günü içinde teslim edilir. Trendyol entegrasyonu dahil projeler 15–25 iş günü sürer.",
      },
    ],
    geo: { latitude: 41.0606, longitude: 28.9306 },
    areaServed: ["Eyüpsultan", "Alibeyköy", "Rami", "Kuzey İstanbul", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve Yazılım Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Eyüpsultan,İstanbul",
    sitemapPriority: 0.82,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "landing-page-tasarimi",
    ],
  },
  {
    slug: "bahcelievler-web-tasarim",
    title: "Bahçelievler Web Tasarım",
    metaTitle: "Bahçelievler Web Tasarım & E-Ticaret Yazılım | Solman Digital",
    metaDescription:
      "Bahçelievler ve Güngören işletmeleri için web sitesi, e-ticaret kurulumu ve Trendyol entegrasyonu. Batı İstanbul'da doğrudan uzman, net fiyat, hızlı teslim.",
    district: "Bahçelievler",
    heroLabel: "Bahçelievler · Güngören · Batı İstanbul",
    heroH1: "Bahçelievler İşletmeleri İçin Web Tasarım & E-Ticaret",
    heroSubtitle:
      "Bahçelievler ve çevresindeki perakende, tekstil ve hizmet işletmeleri için kurumsal web sitesi, e-ticaret ve Trendyol entegrasyonu. Doğrudan uzman, ajansız.",
    uniqueSection: {
      heading: "Bahçelievler'in Yoğun Ticaret Ekosistemi İçin Dijital Çözümler",
      body: "Bahçelievler, İstanbul'un batı yakasında yoğun nüfusu ve aktif ticaret hayatıyla KOBİ'lerin önemli bir kısmını barındıran bir ilçe. Yöresel pazarlar, alışveriş caddeleri, tekstil satıcıları ve hizmet işletmeleriyle dolu olan Bahçelievler'de dijital satış kanalı açmak ya da kurumsal web vitrinini güçlendirmek isteyen pek çok işletme var. E-ticaret sitesi kurulumu, Trendyol entegrasyonu ve kurumsal web tasarımı alanlarında net kapsam ve taahhüt edilen teslimle çalışıyoruz.",
    },
    keywords: [
      "bahçelievler web tasarım",
      "bahçelievler e-ticaret sitesi",
      "bahçelievler yazılım geliştirme",
      "bahçelievler trendyol entegrasyonu",
      "güngören web sitesi yaptırma",
      "bahçelievler kurumsal web sitesi",
      "batı istanbul web tasarım",
      "bahçelievler next.js geliştirici",
      "bahçelievler online mağaza kurulum",
      "güngören yazılım firması",
    ],
    faq: [
      {
        q: "Bahçelievler'de web sitesi yaptırmak ne kadar tutar?",
        a: "Kurumsal web sitesi ₺8.000'dan, e-ticaret sitesi ₺20.000'dan başlamaktadır. Sabit fiyat garantisi — teklif sonrası fiyat değişmez.",
      },
      {
        q: "Bahçelievler'de Trendyol entegrasyonu yapabiliyor musunuz?",
        a: "Evet. Trendyol API entegrasyonu, stok senkronizasyonu ve sipariş yönetimi başlıca uzmanlık alanlarımızdan. Hepsiburada için de entegrasyon geliştiriyoruz.",
      },
      {
        q: "Bahçelievler için yüz yüze görüşme mümkün mü?",
        a: "Evet. Bahçelievler ve batı İstanbul için yüz yüze proje görüşmesi organize edebiliyoruz. Ofis veya kafe tercihine göre esneklik sağlıyoruz.",
      },
      {
        q: "E-ticaret sitesi kaç günde hazır olur?",
        a: "Temel e-ticaret sitesi 10–15 iş günü içinde teslim edilir. Trendyol entegrasyonu dahil projeler 15–25 iş günü sürer.",
      },
    ],
    geo: { latitude: 40.9981, longitude: 28.8581 },
    areaServed: ["Bahçelievler", "Güngören", "Batı İstanbul", "İstanbul", "Türkiye"],
    schemaServiceType: "Web Tasarım ve E-Ticaret Geliştirme",
    googleMapsUrl: "https://maps.google.com/?q=Bahçelievler,İstanbul",
    sitemapPriority: 0.82,
    featuredServiceSlugs: [
      "kurumsal-web-sitesi",
      "eticaret-kurulum",
      "trendyol-entegrasyonu",
      "landing-page-tasarimi",
    ],
  },
]
