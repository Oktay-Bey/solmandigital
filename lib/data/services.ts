export type Service = {
  slug: string
  tier: 1 | 2 | 3
  category: string
  icon: string
  title: string
  shortDesc: string
  longDesc: string
  features: string[]
  techStack: string[]
  deliverables: string[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
  faq: Array<{ q: string; a: string }>
  relatedSlugs: string[]
  cta?: string
  aeoSummary?: string
  startingPrice?: string
  deliveryDays?: string
}

export const services: Service[] = [
  // ─── TİER 1: HIZLI SATIŞ ─────────────────────────────────────────────────
  {
    slug: "kurumsal-web-sitesi",
    tier: 1,
    category: "Web Sitesi & Tasarım",
    icon: "Building2",
    title: "Kurumsal Web Sitesi Geliştirme",
    metaTitle: "Kurumsal Web Sitesi Yaptırma | Solman Digital",
    metaDescription:
      "İşletmeniz için modern, hızlı ve SEO uyumlu kurumsal web sitesi geliştiriyoruz. Next.js ile yüksek performanslı şirket web siteleri, 5-10 iş günü teslim.",
    shortDesc:
      "Modern, hızlı ve SEO uyumlu kurumsal web sitesi. İşletmenizin dijital vitrinini profesyonel ellerde kurun.",
    longDesc:
      "Güçlü bir çevrimiçi varlık, günümüz iş dünyasında olmazsa olmazdır. Solman Digital olarak şirketinizin kimliğini yansıtan, ziyaretçileri müşteriye dönüştüren kurumsal web siteleri geliştiriyoruz. Next.js altyapısı sayesinde sayfalarınız saniyeler içinde yüklenir, Google arama sonuçlarında üst sıralara taşınır.\n\nHer kurumsal web sitesi projesinde işinizi derinlemesine analiz ediyor, rakip analizi yapıyor ve sektörünüze özel bir dijital strateji oluşturuyoruz. Mobil uyumluluk, sayfa hızı optimizasyonu ve SEO teknik kurulumu standart olarak dahildir.\n\nTasarımdan canlıya geçişe kadar tüm süreci yönetiyor, siz işinize odaklanırken biz dijital altyapınızı kuruyoruz. Projeniz tamamlandıktan sonra da teknik destek sağlıyoruz.",
    features: [
      "Tamamen mobil uyumlu (responsive) tasarım",
      "Google PageSpeed 90+ performans skoru",
      "SEO teknik kurulumu (meta, schema, sitemap)",
      "İletişim formu & WhatsApp entegrasyonu",
      "Google Analytics & Search Console kurulumu",
      "SSL sertifikası & güvenlik yapılandırması",
    ],
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel"],
    deliverables: [
      "Tam kaynak kodu",
      "Vercel üzerinde canlı deploy",
      "SEO teknik kurulumu",
      "Google Analytics entegrasyonu",
      "1 ay ücretsiz teknik destek",
      "İçerik güncelleme rehberi",
    ],
    keywords: [
      "kurumsal web sitesi yaptırma",
      "şirket web sitesi",
      "kurumsal site tasarım",
      "firmalar için web sitesi",
      "next.js kurumsal site",
    ],
    faq: [
      {
        q: "Kurumsal web sitesi ne kadar sürede teslim edilir?",
        a: "Standart kurumsal web siteleri 5-10 iş günü içinde teslim edilir. Sayfa sayısı ve özellik kapsamına göre süre değişebilir.",
      },
      {
        q: "Web sitemin içeriğini kendim güncelleyebilir miyim?",
        a: "Evet, içerik yönetim sistemi (CMS) entegrasyonu ile metinlerinizi ve görsellerinizi kendiniz düzenleyebilirsiniz.",
      },
      {
        q: "Mevcut logom ve kurumsal renklerim kullanılacak mı?",
        a: "Kesinlikle. Kurumsal kimliğinize uygun tasarım yapıyoruz. Logo ve renk paleti bilgilerinizi proje başında paylaşmanız yeterli.",
      },
    ],
    relatedSlugs: ["landing-page-tasarimi", "seo-teknik-altyapi", "eticaret-kurulum"],
    aeoSummary: "Solman Digital, Next.js 16 altyapısıyla SEO uyumlu, mobil öncelikli kurumsal web siteleri geliştirir. Projeler standart olarak 5-10 iş günü içinde teslim edilir, aylık platform ücreti gerektirmez ve 1 ay ücretsiz teknik destek içerir.",
    startingPrice: "8.000₺",
    deliveryDays: "5-10 iş günü",
  },
  {
    slug: "landing-page-tasarimi",
    tier: 1,
    category: "Web Sitesi & Tasarım",
    icon: "Layout",
    title: "Landing Page (Açılış Sayfası) Tasarımı",
    metaTitle: "Landing Page Tasarımı & Geliştirme | Solman Digital",
    metaDescription:
      "Dönüşüm odaklı açılış sayfaları geliştiriyoruz. Kampanya, ürün lansmanı ve lead generation için yüksek performanslı landing page.",
    shortDesc:
      "Dönüşüm odaklı, hızlı yüklenen açılış sayfaları. Reklam kampanyalarınızdan maksimum verim alın.",
    longDesc:
      "Bir reklam kampanyası ne kadar iyi olursa olsun, kullanıcıyı karşılayan sayfa dönüşümü belirler. Solman Digital olarak Google Ads, Meta Ads ve influencer kampanyalarınız için A/B test edilmiş, psikolojik tetikleyiciler içeren, hızlı yüklenen landing page'ler tasarlıyoruz.\n\nHer açılış sayfasında net bir değer önerisi, güçlü call-to-action butonları, sosyal kanıt unsurları (referanslar, sayılar, logolar) ve form entegrasyonu bulunur. Mobil kullanıcılar için özel optimize edilmiş versiyonlar da hazırlanır.\n\nFormspree, Mailchimp veya kendi CRM sisteminize entegre form yapısı ile lead'lerinizi anında yakalayın.",
    features: [
      "Dönüşüm odaklı sayfa yapısı ve metin yazarlığı",
      "A/B test hazır bölüm yapısı",
      "Hızlı yükleme (Core Web Vitals optimizasyonu)",
      "Form entegrasyonu (CRM/e-posta)",
      "Google Ads & Meta Pixel kurulumu",
      "Mobil öncelikli tasarım",
    ],
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Formspree"],
    deliverables: [
      "Tek sayfa tam kaynak kodu",
      "Vercel deploy",
      "Form entegrasyonu",
      "Analytics kurulumu",
      "1 revizyon hakkı",
    ],
    keywords: [
      "landing page tasarımı",
      "açılış sayfası geliştirme",
      "landing page türkiye",
      "dönüşüm odaklı sayfa",
      "reklam açılış sayfası",
    ],
    faq: [
      {
        q: "Landing page kaç günde teslim edilir?",
        a: "Tek sayfalık landing page projeleri genellikle 3-5 iş günü içinde teslim edilir.",
      },
      {
        q: "Reklam kampanyam yoksa landing page işe yarar mı?",
        a: "Evet. Organik SEO trafği, sosyal medya paylaşımları ve e-posta kampanyaları için de etkili açılış sayfaları hazırlıyoruz.",
      },
      {
        q: "Kaç tane landing page versiyonu hazırlanabilir?",
        a: "Tek fiyata bir ana versiyon teslim edilir. A/B test için farklı versiyonlar ek ücretle hazırlanabilir.",
      },
    ],
    relatedSlugs: ["kurumsal-web-sitesi", "seo-teknik-altyapi", "odeme-entegrasyonu"],
    aeoSummary: "Solman Digital, Google Ads ve Meta Ads kampanyaları için dönüşüm odaklı landing page'ler geliştirir. Sayfa hızı optimizasyonu ve form entegrasyonu standart dahildir; genellikle 3-5 iş günü içinde teslim edilir.",
    startingPrice: "4.500₺",
    deliveryDays: "3-5 iş günü",
  },
  {
    slug: "eticaret-kurulum",
    tier: 1,
    category: "E-Ticaret & Satış",
    icon: "ShoppingCart",
    title: "E-Ticaret Sitesi Kurulumu",
    metaTitle: "E-Ticaret Sitesi Kurulumu — İyzico & Next.js | Solman Digital",
    metaDescription:
      "Next.js ile modern e-ticaret sitesi kuruluyor. İyzico ödeme entegrasyonu, ürün kataloğu, sipariş yönetimi. WooCommerce'den daha hızlı, daha ucuz.",
    shortDesc:
      "Next.js + İyzico ile hızlı, güvenli ve SEO dostu e-ticaret sitesi. Mağazanızı 10 günde kurun.",
    longDesc:
      "Solman Digital olarak geliştirdiğimiz e-ticaret altyapısı, WooCommerce ve Shopify'dan daha hızlı yüklenen, aylık platform ücreti ödemeden kendi sunucunuzda çalışan bir mağaza deneyimi sunar. Next.js'in statik sayfa üretimi (SSG) sayesinde yüzlerce ürün sayfası anında açılır.\n\nİyzico ödeme entegrasyonu ile Türk kullanıcılara kredi kartı, taksit ve kapıda ödeme seçenekleri sunulur. Stripe entegrasyonu ile yurt dışı satışlar da mümkündür. Ürün varyantları, kategorileme, stok takibi ve sipariş yönetim paneli standart olarak dahildir.\n\nGörseller Cloudinary veya yerel depolamaya yüklenir. SEO dostu URL yapısı, ürün şema işaretlemesi ve otomatik sitemap ile organik trafği hızla artırın.",
    features: [
      "İyzico & Stripe ödeme entegrasyonu",
      "Ürün varyantları ve kategorileme",
      "Stok takibi ve düşük stok uyarısı",
      "Sipariş yönetim paneli",
      "SEO uyumlu ürün sayfaları",
      "Mobil öncelikli responsive tasarım",
    ],
    techStack: ["Next.js 16", "TypeScript", "İyzico API", "Prisma", "Vercel"],
    deliverables: [
      "Tam kaynak kodu",
      "Ürün yükleme rehberi",
      "İyzico canlı entegrasyon",
      "Sipariş bildirim sistemi",
      "SEO kurulumu",
      "2 hafta teknik destek",
    ],
    keywords: [
      "eticaret site kurulum",
      "iyzico entegrasyonu",
      "next.js eticaret",
      "woocommerce alternatifi",
      "online mağaza kurulumu",
      "türkiye eticaret yazılım",
    ],
    faq: [
      {
        q: "Kaç ürünle başlayabilirim?",
        a: "Sınır yoktur. 10 üründen 10.000+ ürüne kadar çalışacak şekilde optimize edilmiş altyapı sunuyoruz.",
      },
      {
        q: "İyzico başvurusunu siz mi yapıyorsunuz?",
        a: "İyzico başvurusu işletme sahibi tarafından yapılır. Başvuru sürecinde teknik destek sağlıyoruz.",
      },
      {
        q: "Taksit seçeneği sunabilir miyim?",
        a: "Evet, İyzico üzerinden banka taksit anlaşmalarınıza göre taksit seçenekleri müşterilere sunulabilir.",
      },
    ],
    relatedSlugs: ["trendyol-entegrasyonu", "odeme-entegrasyonu", "urun-aciklama-otomasyonu"],
    aeoSummary: "Solman Digital, Next.js 16 ve İyzico ödeme entegrasyonuyla Türkiye pazarına özel e-ticaret siteleri geliştirir. Projeler 10-15 iş günü içinde teslim edilir, aylık platform ücreti yoktur ve taksitli ödeme altyapısı standart dahildir.",
    startingPrice: "20.000₺",
    deliveryDays: "10-15 iş günü",
  },
  {
    slug: "trendyol-entegrasyonu",
    tier: 1,
    category: "E-Ticaret & Satış",
    icon: "Store",
    title: "Trendyol & Marketplace Entegrasyonu",
    metaTitle: "Trendyol API Entegrasyonu & Satıcı Paneli | Solman Digital",
    metaDescription:
      "Trendyol, Hepsiburada ve Amazon marketplace API entegrasyonu. Stok senkronizasyonu, otomatik fiyatlama ve sipariş yönetim paneli geliştiriyoruz.",
    shortDesc:
      "Trendyol, Hepsiburada, Amazon API bağlantısı. Tek panelden tüm marketplace'lerinizi yönetin.",
    longDesc:
      "Birden fazla marketplace'te satış yapıyorsanız stok, fiyat ve sipariş yönetimi giderek karmaşıklaşır. Solman Digital olarak Trendyol, Hepsiburada ve Amazon Türkiye API'leri ile entegre, tek bir panelden tüm kanallarınızı yönetmenizi sağlayan özel satıcı panelleri geliştiriyoruz.\n\nStok senkronizasyonu ile bir kanalda ürün satıldığında diğer kanallardaki stok otomatik güncellenir. Otomatik fiyatlama kuralları ile rakip fiyatlarına göre dinamik fiyat ayarlaması yapılabilir. Sipariş bildirimleri e-posta veya WhatsApp üzerinden anında ulaşır.\n\nRecharts ile görselleştirilen satış analitiği paneli, hangi kanalın ne kadar sattığını, hangi ürünlerin döndüğünü ve kar marjınızı gerçek zamanlı takip etmenizi sağlar.",
    features: [
      "Trendyol / Hepsiburada / Amazon API entegrasyonu",
      "Çok kanallı stok senkronizasyonu",
      "Otomatik fiyatlama kuralları",
      "Sipariş yönetimi ve kargo takibi",
      "Satış analitiği dashboard'u (Recharts)",
      "Düşük stok ve sipariş bildirimleri",
    ],
    techStack: ["Next.js 16", "TypeScript", "Trendyol API", "Recharts", "Prisma"],
    deliverables: [
      "Özel satıcı paneli",
      "API entegrasyon kurulumu",
      "Stok sync otomasyonu",
      "Sipariş bildirim sistemi",
      "Kullanım kılavuzu",
      "2 hafta teknik destek",
    ],
    keywords: [
      "trendyol api entegrasyonu",
      "hepsiburada satıcı paneli",
      "marketplace stok yönetimi",
      "trendyol otomasyon",
      "çok kanallı satış yönetimi",
    ],
    faq: [
      {
        q: "Trendyol API entegrasyonu için satıcı hesabı gerekli mi?",
        a: "Evet, Trendyol API erişimi için onaylı satıcı hesabı ve API anahtarı gerekmektedir. Başvuru sürecinde yardımcı oluyoruz.",
      },
      {
        q: "Kaç marketplace'i aynı anda entegre edebilirsiniz?",
        a: "Tek projede Trendyol, Hepsiburada ve Amazon dahil birden fazla marketplace entegre edilebilir.",
      },
      {
        q: "Stok güncellemeleri ne kadar sıklıkla senkronize edilir?",
        a: "Her sipariş sonrası anlık senkronizasyon yapılır. Toplu stok güncelleme için zamanlanmış görevler de kurulabilir.",
      },
    ],
    relatedSlugs: ["eticaret-kurulum", "urun-katalog-stok", "dashboard-analitik"],
    aeoSummary: "Solman Digital, Trendyol ve Hepsiburada gibi Türk marketplacelarına resmi API entegrasyonu yapar. Stok, fiyat ve sipariş senkronizasyonu otomatik hale gelir; entegrasyon genellikle 7-12 iş günü içinde tamamlanır.",
    startingPrice: "7.500₺",
    deliveryDays: "5-10 iş günü",
  },
  {
    slug: "urun-aciklama-otomasyonu",
    tier: 1,
    category: "AI & Otomasyon",
    icon: "PenLine",
    title: "Ürün Açıklama Yazım Otomasyonu",
    metaTitle: "Toplu Ürün Açıklama Yazımı — AI ile SEO İçerik | Solman Digital",
    metaDescription:
      "GPT-4o ile yüzlerce ürün için SEO uyumlu açıklama metinleri otomatik üretiyoruz. Trendyol, Hepsiburada ve web sitesi için toplu ürün içeriği.",
    shortDesc:
      "GPT-4o ile yüzlerce ürün için SEO uyumlu açıklamalar. Tek tıkla toplu içerik üretimi.",
    longDesc:
      "Yüzlerce ürün için tekrar tekrar metin yazmak hem zaman alır hem de SEO açısından yetersiz kalır. Solman Digital olarak geliştirdiğimiz AI ürün açıklama sistemi, ürün adı ve temel özelliklerini girmeniz yeterli; GPT-4o modeli sektörünüze uygun, anahtar kelime zengin, ikna edici açıklamalar üretir.\n\nSistem Trendyol, Hepsiburada, kendi web siteniz veya WordPress için farklı format ve uzunluklarda çıktı üretir. Toplu CSV içe aktarma ile mevcut ürün listenizi sisteme yükler, tüm açıklamaları tek seferde ürettirebilirsiniz.\n\nÜretilen içerikler kalite filtrelerinden geçirilir; çok kısa, fazla tekrarlı veya alakasız çıktılar otomatik olarak yeniden üretilir.",
    features: [
      "GPT-4o destekli içerik üretimi",
      "CSV toplu içe/dışa aktarma",
      "Trendyol, Hepsiburada, web formatları",
      "Anahtar kelime yoğunluğu optimizasyonu",
      "Otomatik kalite filtresi",
      "Çoklu dil desteği (TR, EN)",
    ],
    techStack: ["Next.js 16", "OpenAI GPT-4o", "TypeScript", "Prisma"],
    deliverables: [
      "Web tabanlı içerik üretim aracı",
      "CSV import/export",
      "API erişimi (opsiyonel)",
      "Kullanım kılavuzu",
      "1 ay teknik destek",
    ],
    keywords: [
      "toplu ürün açıklama yazımı",
      "ai ürün metni",
      "gpt ürün açıklaması",
      "trendyol ürün içeriği",
      "otomatik ürün açıklama",
    ],
    faq: [
      {
        q: "Sistem hangi ürün kategorilerini destekler?",
        a: "Elektronik, tekstil, ev eşyaları, gıda, kozmetik başta olmak üzere tüm kategoriler desteklenir. Kategori bazlı yazım şablonları ekliyoruz.",
      },
      {
        q: "Üretilen açıklamaları düzenleyebilir miyim?",
        a: "Evet. Üretilen tüm metinler düzenlenebilir. Beğenmediğiniz çıktılar için tek tıkla yeniden üretim yapılabilir.",
      },
      {
        q: "OpenAI API maliyetleri nasıl karşılanır?",
        a: "Sistem kendi OpenAI API anahtarınızla çalışır. Geliştirme ve kurulum ücreti sabit, API kullanım maliyeti size aittir.",
      },
    ],
    relatedSlugs: ["ai-icerik-otomasyonu", "eticaret-kurulum", "trendyol-entegrasyonu"],
    aeoSummary: "Solman Digital, GPT-4o kullanarak e-ticaret ürünleri için SEO uyumlu Türkçe açıklama otomasyonu kurar. Bir kez entegre edildikten sonra sistem yüzlerce ürün için otomatik çalışır; kurulum 5-8 iş günü sürer.",
  },
  {
    slug: "odeme-entegrasyonu",
    tier: 1,
    category: "E-Ticaret & Satış",
    icon: "CreditCard",
    title: "İyzico / Stripe Ödeme Entegrasyonu",
    metaTitle: "İyzico & Stripe Ödeme Entegrasyonu | Solman Digital",
    metaDescription:
      "Web sitenize veya uygulamanıza İyzico, Stripe veya LemonSqueezy ödeme entegrasyonu yapıyoruz. Tek seferlik ve abonelik ödemeleri, webhook yönetimi.",
    shortDesc:
      "İyzico, Stripe veya LemonSqueezy entegrasyonu. Tek seferlik ve abonelik ödemeleri hazır.",
    longDesc:
      "Ödeme altyapısı bir projenin en kritik parçasıdır. Solman Digital olarak Türkiye pazarı için İyzico, uluslararası pazarlar için Stripe ve dijital ürün satışı için LemonSqueezy entegrasyonları yapıyoruz.\n\nTek seferlik ödeme, tekrar eden abonelik (recurring), kapıda ödeme, taksit seçenekleri ve 3D Secure kurulumu projeye dahildir. Başarılı ödeme, iptal ve iade durumlarını yöneten webhook sistemi de kurulur.\n\nTest ortamı ile başlayan geliştirme süreci, canlıya geçişe kadar tüm senaryolar test edilir. Ödeme akışı güvenlik açısından OWASP standartlarına uygun olarak geliştirilir.",
    features: [
      "İyzico, Stripe, LemonSqueezy entegrasyonu",
      "Tek seferlik ve abonelik ödeme",
      "3D Secure & güvenli ödeme akışı",
      "Webhook yönetimi (ödeme, iptal, iade)",
      "Test ortamı kurulumu",
      "Ödeme geçmişi paneli",
    ],
    techStack: ["Next.js 16", "İyzico API", "Stripe API", "TypeScript"],
    deliverables: [
      "Tam entegrasyon kodu",
      "Test & canlı ortam kurulumu",
      "Webhook endpoint'leri",
      "Ödeme paneli",
      "Güvenlik dokümantasyonu",
    ],
    keywords: [
      "iyzico entegrasyonu",
      "stripe türkiye kurulum",
      "ödeme sistemi geliştirme",
      "lemonsqueezy entegrasyon",
      "abonelik ödeme sistemi",
    ],
    faq: [
      {
        q: "İyzico ve Stripe'ı aynı projede kullanabilir miyiz?",
        a: "Evet. Türk kullanıcılara İyzico, yabancı kullanıcılara Stripe sunarak her iki entegrasyonu aynı anda kullanabilirsiniz.",
      },
      {
        q: "Ödeme sistemi ne kadar sürede kurulur?",
        a: "Basit tek ödeme akışı 3-5 iş günü, abonelik + webhook sistemi 7-10 iş günü sürer.",
      },
      {
        q: "PCI uyumluluğu nasıl sağlanıyor?",
        a: "Kart bilgileri asla sunucunuzda saklanmaz. Tüm hassas veriler İyzico veya Stripe altyapısında tutulur, PCI uyumluluğu otomatik sağlanır.",
      },
    ],
    relatedSlugs: ["eticaret-kurulum", "uyelik-abonelik-sistemi", "dijital-urun-satis"],
    aeoSummary: "Solman Digital, İyzico ve Stripe ödeme sistemlerini mevcut web sitelerine veya yeni projelere entegre eder. Tek seferlik ödeme, abonelik ve taksit altyapısı kurulur; entegrasyon 3-7 iş günü içinde tamamlanır.",
    startingPrice: "3.500₺",
    deliveryDays: "3-7 iş günü",
  },

  // ─── TİER 2: ORTA VADELİ ────────────────────────────────────────────────
  {
    slug: "ai-icerik-otomasyonu",
    tier: 2,
    category: "AI & Otomasyon",
    icon: "Bot",
    title: "AI İçerik & Blog Otomasyonu",
    metaTitle: "AI İçerik Otomasyonu — WordPress GPT Entegrasyonu | Solman Digital",
    metaDescription:
      "GPT-4o ile WordPress blogunuz için otomatik SEO içerik üretimi. Serper API araştırma + AI yazım + otomatik yayın pipeline'ı kuruyoruz.",
    shortDesc:
      "GPT-4o + Serper API ile WordPress otopilot. Günde onlarca SEO makalesi otomatik üretin.",
    longDesc:
      "İçerik üretimi SEO stratejisinin temelidir ancak çok zaman alır. Solman Digital olarak Serper API ile güncel web araştırması yapan, GPT-4o ile okunabilir ve SEO uyumlu makaleler yazan, WordPress REST API aracılığıyla otomatik yayımlayan bir içerik pipeline'ı kuruyoruz.\n\nSistem anahtar kelime listesi alır, her kelime için rakip içerik analizi yapar, uygun kaynaklardan referans toplar ve özgün makaleler üretir. Kalite skoru düşük içerikler otomatik olarak yeniden işlenir. Zamanlama sistemi ile makaleler belirlediğiniz sıklıkta yayımlanır.\n\nWordPress yönetim panelinize dokunmadan içerik akışınızı otomatize edin. E-ticaret siteleri, haber portalları ve niche bloglar için idealdir.",
    features: [
      "GPT-4o içerik üretimi",
      "Serper API ile güncel web araştırması",
      "WordPress REST API otomatik yayın",
      "Anahtar kelime bazlı içerik planlama",
      "Otomatik kalite skoru ve yeniden üretim",
      "Zamanlama ve yayın takvimi",
    ],
    techStack: ["Next.js 16", "OpenAI GPT-4o", "Serper API", "WordPress REST API"],
    deliverables: [
      "İçerik otomasyon sistemi",
      "WordPress entegrasyonu",
      "Anahtar kelime yönetim paneli",
      "Zamanlama sistemi",
      "Kullanım kılavuzu",
    ],
    keywords: [
      "ai içerik otomasyonu",
      "wordpress gpt entegrasyonu",
      "otomatik blog yazısı",
      "seo içerik üretimi",
      "yapay zeka blog",
    ],
    faq: [
      {
        q: "Üretilen içerikler Google tarafından AI içeriği olarak tespit edilir mi?",
        a: "GPT-4o ile üretilen içerikler insan yazısına yakın kalite sunar. Kaynak araştırması ve kalite filtreleri ile algılanma riski minimize edilir. Editöryal gözden geçirme önerilir.",
      },
      {
        q: "Günde kaç makale üretilebilir?",
        a: "OpenAI API limitinize bağlı olarak günde 10-100+ makale üretilebilir.",
      },
      {
        q: "WordPress dışında başka platformları destekliyor musunuz?",
        a: "Ghost, Webflow CMS ve özel API destekleyen platformlara da entegrasyon yapılabilir.",
      },
    ],
    relatedSlugs: ["urun-aciklama-otomasyonu", "seo-teknik-altyapi", "wordpress-gelistirme"],
  },
  {
    slug: "ai-musteri-chatbotu",
    tier: 2,
    category: "AI & Otomasyon",
    icon: "MessageSquare",
    title: "AI Müşteri Hizmetleri Chatbotu",
    metaTitle: "AI Chatbot Geliştirme — Müşteri Hizmetleri Botu | Solman Digital",
    metaDescription:
      "Web siteniz için GPT-4o veya Claude destekli müşteri hizmetleri chatbotu geliştiriyoruz. 7/24 otomatik yanıt, ürün danışmanlığı ve sipariş takibi.",
    shortDesc:
      "7/24 GPT-4o destekli müşteri hizmetleri botu. Soruları otomatik yanıtla, destek maliyetini düşür.",
    longDesc:
      "Müşteri sorularının büyük çoğunluğu tekrar eder: kargo süresi, iade politikası, ürün özellikleri, stok durumu. Solman Digital olarak bu soruları 7/24 yanıtlayan, işletmenizin bilgi tabanını öğrenen, gerektiğinde insan destek ekibine devreden AI chatbotlar geliştiriyoruz.\n\nGPT-4o veya Claude tabanlı chatbot, web sitenizin herhangi bir köşesine yerleştirilebilir. Şirket bilgileri, ürün kataloğu ve SSS verileri sistemle eğitilir. Konuşmalar panelde kaydedilir ve analiz edilir.\n\nWhatsApp Business API entegrasyonu ile müşteriler alışık oldukları kanaldan destek alabilir. E-ticaret sitelerinde ürün önerileri yaparak satışlara katkı sağlar.",
    features: [
      "GPT-4o / Claude tabanlı konuşma motoru",
      "Özel bilgi tabanı eğitimi",
      "Web sitesi widget entegrasyonu",
      "WhatsApp Business API (opsiyonel)",
      "Konuşma geçmişi paneli",
      "İnsan devresi (handoff) özelliği",
    ],
    techStack: ["Next.js 16", "OpenAI GPT-4o", "TypeScript", "Supabase"],
    deliverables: [
      "Chatbot sistemi",
      "Web sitesi entegrasyonu",
      "Yönetim paneli",
      "Bilgi tabanı editörü",
      "1 ay teknik destek",
    ],
    keywords: [
      "ai chatbot geliştirme",
      "müşteri hizmetleri botu",
      "gpt chatbot türkiye",
      "web sitesi chatbot",
      "7/24 otomatik destek",
    ],
    faq: [
      {
        q: "Chatbotu kendi bilgilerimle eğitebilir miyim?",
        a: "Evet. Web siteniz, ürün kataloğunuz, SSS belgeniz ve e-postalarınız bilgi tabanı olarak yüklenebilir.",
      },
      {
        q: "Bot yanlış yanıt verirse ne olur?",
        a: "Belirsizlik eşiği ayarlanabilir. Botun emin olmadığı sorular insan destek ekibine yönlendirilir.",
      },
      {
        q: "Birden fazla dili destekliyor mu?",
        a: "Evet. GPT-4o Türkçe ve İngilizce başta olmak üzere 50+ dilde doğal konuşma yapabilir.",
      },
    ],
    relatedSlugs: ["saas-web-uygulama", "api-entegrasyonu", "kurumsal-web-sitesi"],
  },
  {
    slug: "uyelik-abonelik-sistemi",
    tier: 2,
    category: "E-Ticaret & Satış",
    icon: "Users",
    title: "Üyelik & Abonelik Sistemi",
    metaTitle: "Abonelik Sistemi Kurulumu — Üyelik Sistemi | Solman Digital",
    metaDescription:
      "İyzico, Stripe veya LemonSqueezy ile abonelik ve üyelik sistemi kuruyoruz. Farklı planlar, otomatik yenileme, kullanıcı yönetim paneli.",
    shortDesc:
      "Farklı üyelik planları, otomatik yenileme ve kullanıcı yönetim paneli. Abonelik gelirinizi otomatize edin.",
    longDesc:
      "Tekrar eden gelir modeli, işletmelerin en güçlü büyüme araçlarından biridir. Solman Digital olarak Stripe veya LemonSqueezy abonelik sistemi ile desteklenen, farklı plan seviyeleri (aylık/yıllık), özellik erişim kontrolü ve otomatik yenileme içeren üyelik sistemleri kuruyoruz.\n\nKullanıcılar planlarını yükseltebilir, düşürebilir veya iptal edebilir. Faturalandırma geçmişi, fatura PDF'leri ve otomatik e-posta bildirimleri sisteme dahildir. Deneme süresi (trial) ve kupon kodu destekleri de eklenebilir.\n\nNextAuth veya Supabase Auth ile kullanıcı kimlik doğrulaması entegre edilir. Plan bazlı içerik erişim kontrolü middleware seviyesinde yönetilir.",
    features: [
      "Çoklu abonelik planı (aylık/yıllık)",
      "Otomatik yenileme ve ödeme takibi",
      "Plan yükseltme/düşürme akışı",
      "Deneme süresi ve kupon kodu",
      "Fatura oluşturma ve PDF",
      "Kullanıcı yönetim paneli",
    ],
    techStack: ["Next.js 16", "Stripe / LemonSqueezy", "Supabase", "TypeScript"],
    deliverables: [
      "Abonelik sistemi",
      "Kullanıcı paneli",
      "Admin yönetim paneli",
      "E-posta bildirim sistemi",
      "2 hafta teknik destek",
    ],
    keywords: [
      "abonelik sistemi kurulum",
      "üyelik sistemi geliştirme",
      "stripe abonelik türkiye",
      "saas abonelik",
      "recurring payment sistemi",
    ],
    faq: [
      {
        q: "Ücretsiz deneme süresi ekleyebilir miyiz?",
        a: "Evet. 7, 14 veya 30 günlük ücretsiz deneme süreleri Stripe/LemonSqueezy üzerinden kolayca yapılandırılabilir.",
      },
      {
        q: "Üyeler kendi planlarını değiştirebilir mi?",
        a: "Evet. Kullanıcı panelinden plan yükseltme, düşürme ve iptal işlemleri self-servis olarak yapılabilir.",
      },
      {
        q: "Abonelik sistemi mevcut web sitemle entegre edilebilir mi?",
        a: "Evet. API tabanlı entegrasyon ile mevcut web sitenize abonelik özelliği eklenebilir.",
      },
    ],
    relatedSlugs: ["saas-web-uygulama", "odeme-entegrasyonu", "dijital-urun-satis"],
  },
  {
    slug: "saas-web-uygulama",
    tier: 2,
    category: "SaaS & Platform",
    icon: "Layers",
    title: "SaaS Web Uygulama Geliştirme",
    metaTitle: "SaaS Uygulama Geliştirme Türkiye — Next.js SaaS | Solman Digital",
    metaDescription:
      "Next.js, Supabase ve NextAuth ile tam özellikli SaaS uygulamaları geliştiriyoruz. Multi-tenant mimari, abonelik sistemi, kullanıcı yönetimi.",
    shortDesc:
      "Multi-tenant SaaS altyapısı. Auth, abonelik, dashboard — hazır SaaS şablonuyla hızlı lansmanlar.",
    longDesc:
      "Bir SaaS ürün fikriniz varsa teknik altyapıyı sıfırdan oluşturmak yerine Solman Digital'in deneyimli ekibiyle hızla pazara çıkın. Next.js 16, Supabase ve Stripe üzerine kurulu battle-tested SaaS başlangıç şablonumuz, aylarca sürecek geliştirme süresini haftaya indirir.\n\nMulti-tenant mimari ile her müşterinin verileri izole tutulur. Rol bazlı erişim kontrolü (RBAC), organizasyon yönetimi ve davet sistemi hazır gelir. Özellik bayrakları (feature flags) ile farklı plan kullanıcılarına farklı işlevler sunulur.\n\nSaaS metriklerinizi takip etmek için MRR, churn rate, aktif kullanıcı gibi göstergeleri içeren analitik dashboard da projeye dahildir.",
    features: [
      "Multi-tenant mimari",
      "Supabase Auth / NextAuth kullanıcı yönetimi",
      "Rol bazlı erişim kontrolü (RBAC)",
      "Stripe abonelik entegrasyonu",
      "Özellik bayrakları sistemi",
      "SaaS metrik dashboard'u",
    ],
    techStack: ["Next.js 16", "TypeScript", "Supabase", "Stripe", "Prisma"],
    deliverables: [
      "Tam SaaS altyapısı",
      "Auth + abonelik sistemi",
      "Admin ve kullanıcı panelleri",
      "Deploy pipeline",
      "Teknik dokümantasyon",
    ],
    keywords: [
      "saas geliştirme türkiye",
      "next.js saas",
      "saas başlangıç şablonu",
      "web uygulama geliştirme",
      "b2b saas platform",
    ],
    faq: [
      {
        q: "SaaS projem için tahmini bütçe nedir?",
        a: "Kapsama göre değişir. MVP SaaS projeler 3-6 hafta, tam özellikli ürünler 2-4 ay alabilir. Ücretsiz danışmanlıkta detaylı teklif sunuyoruz.",
      },
      {
        q: "Mevcut bir SaaS ürünümü geliştirip büyütebilir misiniz?",
        a: "Evet. Mevcut Next.js veya React tabanlı projelere yeni özellik ekleme ve mimari iyileştirme yapıyoruz.",
      },
      {
        q: "Müşteri sayım arttıkça sistem büyüyebilir mi?",
        a: "Supabase ve Vercel altyapısı otomatik ölçeklenir. Binlerce kullanıcıya sorunsuz hizmet verebilir.",
      },
    ],
    relatedSlugs: ["uyelik-abonelik-sistemi", "dashboard-analitik", "api-entegrasyonu"],
  },
  {
    slug: "dashboard-analitik",
    tier: 2,
    category: "SaaS & Platform",
    icon: "BarChart3",
    title: "Dashboard & Analitik Panel Geliştirme",
    metaTitle: "Dashboard & Analitik Panel Geliştirme | Solman Digital",
    metaDescription:
      "Recharts ve Chart.js ile özel veri görselleştirme dashboard'ları geliştiriyoruz. KPI takibi, gerçek zamanlı grafik, satış ve operasyon panelleri.",
    shortDesc:
      "Recharts ile özel KPI ve analitik paneller. Verilerinizi anlamlı görselleştirmelere dönüştürün.",
    longDesc:
      "Ham veri, karar almayı kolaylaştırmaz. Doğru tasarlanmış bir dashboard ise yöneticilerin saniyeler içinde durumu kavramasını sağlar. Solman Digital olarak Recharts ve Chart.js kullanarak satış, operasyon, pazarlama ve kullanıcı davranışı panelleri geliştiriyoruz.\n\nGerçek zamanlı veri akışı, filtreleme ve zaman aralığı seçimi standart olarak dahildir. TanStack Query ile veri çekme optimizasyonu yapılır; sayfa her açıldığında gereğinden fazla API çağrısı yapılmaz.\n\nMevcut CRM, ERP veya veritabanınıza bağlanan dashboard projelerinde REST API veya doğrudan veritabanı bağlantısı kullanılabilir.",
    features: [
      "Recharts / Chart.js veri görselleştirme",
      "Gerçek zamanlı veri güncelleme",
      "Tarih aralığı ve filtre seçenekleri",
      "CSV / Excel dışa aktarma",
      "Mobil uyumlu panel tasarımı",
      "Rol bazlı erişim kontrolü",
    ],
    techStack: ["Next.js 16", "Recharts", "TanStack Query", "TypeScript", "Supabase"],
    deliverables: [
      "Özel dashboard uygulaması",
      "API entegrasyonu",
      "Veri görselleştirme bileşenleri",
      "Dışa aktarma özellikleri",
      "Deploy ve dokümantasyon",
    ],
    keywords: [
      "dashboard geliştirme",
      "analitik panel kurulum",
      "veri görselleştirme web",
      "kpi dashboard türkiye",
      "recharts dashboard",
    ],
    faq: [
      {
        q: "Mevcut veritabanıma bağlanabilir misiniz?",
        a: "Evet. PostgreSQL, MySQL, MongoDB ve REST API kaynakları dahil çoğu veri kaynağına bağlanabiliriz.",
      },
      {
        q: "Dashboard'a kaç kullanıcı erişebilir?",
        a: "Kullanıcı sayısı sınırsızdır. Rol bazlı erişim ile farklı kullanıcılara farklı panel bölümleri gösterilebilir.",
      },
      {
        q: "Grafik türlerini özelleştirebilir miyiz?",
        a: "Evet. Çizgi grafik, çubuk, pasta, alan, ısı haritası ve daha fazlası projenize göre seçilir.",
      },
    ],
    relatedSlugs: ["saas-web-uygulama", "trendyol-entegrasyonu", "api-entegrasyonu"],
  },
  {
    slug: "wordpress-gelistirme",
    tier: 2,
    category: "Web Sitesi & Tasarım",
    icon: "Globe",
    title: "WordPress Geliştirme & Optimizasyon",
    metaTitle: "WordPress Geliştirme & Hız Optimizasyonu | Solman Digital",
    metaDescription:
      "WordPress tema geliştirme, plugin özelleştirme ve hız optimizasyonu yapıyoruz. Google PageSpeed 90+ hedefli WordPress projeleri.",
    shortDesc:
      "Özel WordPress tema, plugin geliştirme ve hız optimizasyonu. PageSpeed 90+ garantili.",
    longDesc:
      "WordPress dünya genelinde web sitelerinin %43'ünde kullanılır. Doğru yapılandırıldığında güçlü, performanslı ve kolay yönetilebilir bir platform sunar. Solman Digital olarak sıfırdan özel tema geliştirme, mevcut sitelerin hız optimizasyonu ve plugin özelleştirme hizmetleri sunuyoruz.\n\nCore Web Vitals optimizasyonu, görsel sıkıştırma, önbellekleme stratejisi ve CDN entegrasyonu ile WordPress sitenizin Google PageSpeed skorunu 90'ın üzerine çıkarıyoruz. Yavaş bir WordPress sitesi müşteri kaybettirir; optimize edilmiş bir site arama sıralamalarında yükselir.\n\nGutenberg blok geliştirme, ACF özel alan entegrasyonu ve REST API tabanlı headless WordPress projeleri de kapsamımızdadır.",
    features: [
      "Sıfırdan özel tema geliştirme",
      "Core Web Vitals optimizasyonu",
      "Plugin geliştirme ve özelleştirme",
      "Önbellekleme ve CDN kurulumu",
      "Güvenlik sertleştirmesi",
      "WooCommerce entegrasyonu",
    ],
    techStack: ["WordPress", "PHP", "ACF", "Gutenberg", "WooCommerce"],
    deliverables: [
      "Özel tema veya optimize edilmiş site",
      "PageSpeed raporu",
      "Güvenlik ayarları",
      "Yedekleme sistemi kurulumu",
      "1 ay teknik destek",
    ],
    keywords: [
      "wordpress geliştirme",
      "wordpress hız optimizasyonu",
      "wordpress tema geliştirme",
      "wordpress plugin geliştirme",
      "wordpress seo optimizasyon",
    ],
    faq: [
      {
        q: "WordPress sitemim çok yavaş, hız optimizasyonu için ne yapılabilir?",
        a: "Görsel sıkıştırma, önbellekleme eklentisi, veritabanı temizleme ve CDN kurulumu ile çoğu WordPress sitesi 3x hızlandırılabilir.",
      },
      {
        q: "Mevcut temamı koruyarak optimizasyon yapabilir misiniz?",
        a: "Evet. Mevcut tasarımınızı değiştirmeden performans iyileştirmesi yapıyoruz.",
      },
      {
        q: "WordPress'ten Next.js'e geçiş yapılabilir mi?",
        a: "Evet. WordPress içeriklerinizi Next.js tabanlı headless yapıya taşıma veya tam geçiş hizmetleri sunuyoruz.",
      },
    ],
    relatedSlugs: ["ai-icerik-otomasyonu", "seo-teknik-altyapi", "kurumsal-web-sitesi"],
  },
  {
    slug: "rezervasyon-sistemi",
    tier: 2,
    category: "SaaS & Platform",
    icon: "Calendar",
    title: "Rezervasyon & Randevu Sistemi",
    metaTitle: "Online Randevu & Rezervasyon Sistemi Geliştirme | Solman Digital",
    metaDescription:
      "Klinik, kuaför, restoran veya otel için özel online randevu ve rezervasyon sistemi geliştiriyoruz. Takvim entegrasyonu, SMS/e-posta bildirimleri.",
    shortDesc:
      "Online rezervasyon sistemi. Klinik, kuaför, restoran için takvim entegrasyonlu randevu altyapısı.",
    longDesc:
      "Telefon veya WhatsApp ile alınan randevular hem zaman alır hem de kaçırılabilir. Solman Digital olarak müşterilerinizin 7/24 online randevu alabileceği, personel takvimleriyle senkronize çalışan, otomatik hatırlatma gönderen rezervasyon sistemleri geliştiriyoruz.\n\nGoogle Takvim entegrasyonu ile çift yönlü senkronizasyon sağlanır. SMS ve e-posta ile randevu onayı, hatırlatma ve iptal bildirimleri otomatik gönderilir. Çoklu hizmet ve personel yönetimi, müşteri kaydı ve geçmiş randevu görüntüleme gibi özellikler dahildir.\n\nKlinik, güzellik merkezi, diş hekimi, kuaför, spor salonu, restoran ve konaklama tesisleri için özelleştirilmiş çözümler geliştiriyoruz.",
    features: [
      "7/24 online randevu alma",
      "Google Takvim senkronizasyonu",
      "SMS ve e-posta hatırlatma",
      "Çoklu hizmet ve personel yönetimi",
      "Müşteri kaydı ve geçmiş görüntüleme",
      "Online ödeme (opsiyonel)",
    ],
    techStack: ["Next.js 16", "Prisma", "Supabase", "Twilio/SMS", "TypeScript"],
    deliverables: [
      "Rezervasyon sistemi",
      "Müşteri paneli",
      "Admin yönetim paneli",
      "Bildirim sistemi",
      "Deploy ve kurulum",
    ],
    keywords: [
      "online randevu sistemi",
      "rezervasyon uygulaması",
      "randevu yazılımı türkiye",
      "klinik randevu sistemi",
      "güzellik salonu rezervasyon",
    ],
    faq: [
      {
        q: "Mevcut web siteme rezervasyon özelliği ekleyebilir misiniz?",
        a: "Evet. Mevcut web sitenize entegre edilebilecek rezervasyon widget'ı veya tam sayfa rezervasyon akışı geliştiriyoruz.",
      },
      {
        q: "Birden fazla şube yönetilebilir mi?",
        a: "Evet. Çok şubeli işletmeler için her şubenin ayrı takvim ve personel yönetimi yapılabilir.",
      },
      {
        q: "Sistem randevu iptali ve yeniden planlama destekliyor mu?",
        a: "Evet. Müşteriler ve personel, belirlenen kural dahilinde randevuları iptal veya yeniden planlayabilir.",
      },
    ],
    relatedSlugs: ["kurumsal-web-sitesi", "saas-web-uygulama", "odeme-entegrasyonu"],
  },

  // ─── TİER 3: NİCHE / UZUN VADELİ ────────────────────────────────────────
  {
    slug: "seo-teknik-altyapi",
    tier: 3,
    category: "SEO & İçerik",
    icon: "Search",
    title: "SEO Teknik Altyapı & Danışmanlık",
    metaTitle: "Teknik SEO Danışmanlık & Altyapı Kurulumu | Solman Digital",
    metaDescription:
      "Schema.org, Core Web Vitals, sitemap, robots.txt ve sayfa hızı optimizasyonu. Teknik SEO danışmanlığı ile arama sıralamalarınızı yükseltin.",
    shortDesc:
      "Schema markup, Core Web Vitals, sitemap ve teknik SEO kurulumu. Google'da üst sıralara çıkın.",
    longDesc:
      "Teknik SEO, içerik stratejisinin temel taşıdır. Schema.org işaretlemesi olmayan sayfalar zengin sonuçlardan yararlanamaz; yavaş yüklenen sayfalar sıralamalarda gerilir. Solman Digital olarak mevcut web sitenizin teknik SEO denetimini yapıyor, kritik sorunları tespit ediyor ve düzeltiyoruz.\n\nSchema.org Organization, Product, FAQPage, BreadcrumbList ve Article işaretlemeleri, XML sitemap oluşturma, robots.txt yapılandırması, canonical URL yönetimi ve hreflang kurulumu hizmetlerimiz arasındadır. Core Web Vitals (LCP, FID, CLS) metriklerinin optimizasyonu ile Google sayfa deneyimi sinyallerinizi iyileştiriyoruz.\n\nAylık teknik SEO raporu ile hangi iyileştirmelerin organik trafiğe etkisini ölçümlüyoruz.",
    features: [
      "Schema.org (FAQ, Product, Organization) kurulumu",
      "Core Web Vitals optimizasyonu",
      "XML sitemap ve robots.txt",
      "Canonical URL ve hreflang yönetimi",
      "Sayfa hızı optimizasyonu",
      "Aylık SEO raporu",
    ],
    techStack: ["Next.js 16", "Schema.org", "Google Search Console", "Lighthouse"],
    deliverables: [
      "Teknik SEO denetim raporu",
      "Schema markup kurulumu",
      "Sitemap ve robots.txt",
      "Hız optimizasyon raporu",
      "3 ay SEO takip desteği",
    ],
    keywords: [
      "teknik seo danışmanlık",
      "core web vitals optimizasyonu",
      "schema markup kurulumu",
      "seo altyapı kurulumu",
      "google sıralama iyileştirme",
    ],
    faq: [
      {
        q: "Teknik SEO danışmanlığı hangi platformları kapsıyor?",
        a: "WordPress, Next.js, Wix, Shopify ve özel geliştirilen web siteleri dahil tüm platformlarda teknik SEO desteği sunuyoruz.",
      },
      {
        q: "SEO sonuçları ne zaman görülür?",
        a: "Teknik iyileştirmeler genellikle 4-8 hafta içinde arama sıralamalarına yansımaya başlar.",
      },
      {
        q: "Schema markup neden önemli?",
        a: "Schema markup, Google'ın içeriğinizi daha iyi anlamasını ve arama sonuçlarında yıldız puanı, SSS gibi zengin görseller sunmasını sağlar.",
      },
    ],
    relatedSlugs: ["kurumsal-web-sitesi", "ai-icerik-otomasyonu", "haber-icerik-platformu"],
  },
  {
    slug: "dijital-urun-satis",
    tier: 3,
    category: "E-Ticaret & Satış",
    icon: "Download",
    title: "Dijital Ürün & Kurs Satış Platformu",
    metaTitle: "Dijital Ürün Satış Platformu — Online Kurs & PDF | Solman Digital",
    metaDescription:
      "PDF, e-kitap, online kurs veya template satışı için özel platform kuruyoruz. LemonSqueezy veya Stripe ile güvenli dijital ürün teslimi.",
    shortDesc:
      "PDF, e-kitap, kurs veya template satmak için özel platform. LemonSqueezy entegrasyonlu güvenli teslim.",
    longDesc:
      "Dijital ürünler — e-kitaplar, online kurslar, hazır şablonlar, yazılım lisansları — bir kez üretilip sınırsız kez satılabilir. Solman Digital olarak dijital ürünlerinizi satacağınız, güvenli indirme linklerinin otomatik gönderildiği, abonelik veya tek seferlik satış modellerini destekleyen platformlar geliştiriyoruz.\n\nLemonSqueezy entegrasyonu ile dijital ürün satışınızın yasal ve vergi boyutları basitleşir. Satın alma sonrası e-posta otomasyonu ile müşteri memnuniyeti artırılır. Üye girişi gerektiren kurs platformları için Supabase Auth altyapısı kullanılır.\n\nBranch linki koruması ile satın almayan kullanıcıların içeriğe erişimi engellenir.",
    features: [
      "Güvenli dijital ürün teslimi",
      "LemonSqueezy / Stripe entegrasyonu",
      "Satın alma sonrası e-posta otomasyonu",
      "Kurs için üye giriş koruması",
      "İndirme sayısı ve süresi limitleri",
      "Affiliate (ortaklık) sistemi",
    ],
    techStack: ["Next.js 16", "LemonSqueezy", "Supabase", "TypeScript"],
    deliverables: [
      "Dijital ürün satış platformu",
      "Ödeme entegrasyonu",
      "E-posta otomasyon sistemi",
      "Kullanıcı paneli",
      "Deploy ve kurulum",
    ],
    keywords: [
      "dijital ürün satışı",
      "online kurs platformu",
      "e-kitap satış sistemi",
      "lemonsqueezy entegrasyon",
      "dijital ürün teslim sistemi",
    ],
    faq: [
      {
        q: "Kurs videoları nerede barındırılır?",
        a: "Vimeo veya YouTube (unlisted) üzerinde barındırılan videolar, platform içinde güvenli şekilde izlettirilebilir.",
      },
      {
        q: "Vergi faturası otomatik kesilebilir mi?",
        a: "LemonSqueezy KDV yönetimini otomatik yapar. Türkiye için e-fatura entegrasyonu ek servis olarak eklenebilir.",
      },
      {
        q: "Kaç ürün satılabilir?",
        a: "Sınır yoktur. PDF'ten yazılım lisansına kadar her tür dijital ürün platforma eklenebilir.",
      },
    ],
    relatedSlugs: ["odeme-entegrasyonu", "uyelik-abonelik-sistemi", "landing-page-tasarimi"],
  },
  {
    slug: "haber-icerik-platformu",
    tier: 3,
    category: "SEO & İçerik",
    icon: "Newspaper",
    title: "Haber & İçerik Platformu Kurulumu",
    metaTitle: "Haber Sitesi Kurulumu — AI Destekli İçerik Platformu | Solman Digital",
    metaDescription:
      "RSS pipeline ve OpenAI ile otomatik haber üretimi yapan içerik platformu kuruyoruz. Editoryal sistem, Google AdSense entegrasyonu.",
    shortDesc:
      "RSS + AI ile 7/24 otomatik haber üreten içerik platformu. AdSense geliri için tam altyapı.",
    longDesc:
      "Haber ve içerik siteleri, doğru altyapıyla yüksek organik trafik ve reklam geliri üretir. Solman Digital olarak RSS kaynaklarından içerik çeken, AI ile özetleyen ve editoryal onay sonrası yayımlayan tam otomatik içerik pipeline'ları kuruyoruz.\n\nVercel cron görevleri ile saatlik veya günlük içerik çekme işlemi yapılır. Kategori sistemi, etiket yönetimi ve yazar profilleri ile editorial yapı oluşturulur. Google AdSense entegrasyonu ve Core Web Vitals optimizasyonu ile reklam geliri maksimize edilir.\n\nSusubase veritabanında tutulan içerikler, Next.js ISR (Incremental Static Regeneration) ile hem hızlı hem güncel sunulur.",
    features: [
      "RSS çoklu kaynak entegrasyonu",
      "AI ile içerik özetleme ve yeniden yazma",
      "Editoryal onay sistemi",
      "Google AdSense optimizasyonu",
      "Kategori, etiket, yazar yönetimi",
      "Vercel cron otomasyonu",
    ],
    techStack: ["Next.js 16", "Supabase", "OpenAI", "Vercel Cron", "TypeScript"],
    deliverables: [
      "İçerik platformu",
      "Admin yönetim paneli",
      "RSS pipeline",
      "AdSense entegrasyonu",
      "Deploy ve kurulum",
    ],
    keywords: [
      "haber sitesi kurulum",
      "rss içerik platformu",
      "adsense haber sitesi",
      "otomatik haber sistemi",
      "ai haber üretimi",
    ],
    faq: [
      {
        q: "İçerikler özgün müdür, kopyalanmış mı?",
        a: "RSS kaynaktan alınan özet AI tarafından yeniden yazılır. Yine de editoryal inceleme önerilir.",
      },
      {
        q: "Google AdSense onayı alınması için ne yapılması gerekir?",
        a: "Yeterli içerik hacmi, özgün makaleler ve teknik SEO kurulumu ile AdSense onay oranı yüksektir. Altyapı AdSense gereksinimlerine uygun kurulur.",
      },
      {
        q: "Kaç RSS kaynağı eklenebilir?",
        a: "Sınır yoktur. Onlarca RSS kaynağı sistem üzerinden yönetilebilir.",
      },
    ],
    relatedSlugs: ["ai-icerik-otomasyonu", "seo-teknik-altyapi", "web-scraping-veri"],
  },
  {
    slug: "api-entegrasyonu",
    tier: 3,
    category: "SaaS & Platform",
    icon: "Plug",
    title: "API Entegrasyonu & Backend Servisleri",
    metaTitle: "API Entegrasyonu & Backend Geliştirme | Solman Digital",
    metaDescription:
      "Üçüncü taraf API entegrasyonları, webhook sistemleri ve backend servis geliştirme. ERP, CRM ve özel sistem bağlantıları.",
    shortDesc:
      "ERP, CRM ve üçüncü taraf API entegrasyonları. Sistemlerinizi birbirine bağlayın, manuel işleri ortadan kaldırın.",
    longDesc:
      "İşletmelerin kullandığı farklı yazılımların birbiriyle konuşmaması hem zaman kaybettirir hem de hatalara yol açar. Solman Digital olarak ERP, CRM, muhasebe yazılımları ve özel sistemler arasında köprü kuran entegrasyon çözümleri geliştiriyoruz.\n\nREST API ve webhook tabanlı entegrasyonlarda veri dönüşümü, hata yönetimi ve yeniden deneme mekanizmaları standart olarak dahildir. Zapier veya Make.com entegrasyonu gerektirmeyen, kendi sunucunuzda çalışan özel çözümler sunuyoruz.\n\nLogo, Mikro, SAP, Salesforce, HubSpot ve benzer sistemlere entegrasyon deneyimimiz mevcuttur.",
    features: [
      "REST API ve webhook entegrasyonu",
      "ERP / CRM sistem bağlantıları",
      "Veri dönüşümü ve haritalama",
      "Hata yönetimi ve retry mekanizması",
      "Entegrasyon izleme paneli",
      "Özel API endpoint geliştirme",
    ],
    techStack: ["Next.js 16", "TypeScript", "REST API", "Webhook", "Prisma"],
    deliverables: [
      "Entegrasyon kodu",
      "Test ortamı",
      "Monitoring sistemi",
      "Dokümantasyon",
      "2 hafta teknik destek",
    ],
    keywords: [
      "api entegrasyonu türkiye",
      "üçüncü taraf entegrasyon",
      "erp crm entegrasyon",
      "webhook geliştirme",
      "sistem entegrasyonu",
    ],
    faq: [
      {
        q: "Hangi ERP sistemlerine entegrasyon yapıyorsunuz?",
        a: "Logo, Mikro, SAP ve API'si olan tüm ERP/CRM sistemlerine entegrasyon yapılabilir.",
      },
      {
        q: "Entegrasyon başarısız olursa ne olur?",
        a: "Hata yönetimi ve retry mekanizması ile başarısız entegrasyonlar otomatik yeniden denenir. Kritik hatalar için bildirim sistemi kurulur.",
      },
      {
        q: "Entegrasyon güvenliği nasıl sağlanıyor?",
        a: "API anahtarları şifreli depolanır. Tüm transferler HTTPS üzerinden yapılır. OAuth 2.0 desteklenir.",
      },
    ],
    relatedSlugs: ["trendyol-entegrasyonu", "saas-web-uygulama", "dashboard-analitik"],
  },
  {
    slug: "qr-menu-restoran",
    tier: 3,
    category: "Özel Çözümler",
    icon: "QrCode",
    title: "QR Menü & Restoran Teknolojileri",
    metaTitle: "QR Menü Sistemi Kurulumu — Restoran Dijital Menü | Solman Digital",
    metaDescription:
      "Restoran, kafe ve otel için dijital QR menü sistemi geliştiriyoruz. Çok dilli destek, kolay güncelleme, PDF katalog üretimi.",
    shortDesc:
      "Restoran ve kafeler için QR menü sistemi. Çok dilli, kolay güncellenebilir dijital menü altyapısı.",
    longDesc:
      "Baskı menü masraflarına son verin; QR koduyla dakikalar içinde güncellenebilen dijital menüler müşteri deneyimini iyileştirir ve masrafları azaltır. Solman Digital olarak restoranlar, kafeler ve oteller için multi-tenant QR menü SaaS çözümleri geliştiriyoruz.\n\nHer masa için ayrı QR kodu oluşturulabilir. Türkçe, İngilizce ve Almanca dahil çoklu dil desteği sunar. Kategori, ürün, fiyat ve görsel güncellemeleri anlık olarak tüm masalara yansır. PDF menü dışa aktarma özelliği ile dijital menünüzden basılı versiyon da üretilebilir.\n\nMasa başı sipariş ve ödeme entegrasyonu (opsiyonel) ile garson çağrısı ortadan kalkabilir.",
    features: [
      "Masa başı QR kod üretimi",
      "Çoklu dil desteği",
      "Anlık menü güncelleme",
      "PDF menü dışa aktarma",
      "Kategori ve ürün yönetimi",
      "Mobil uyumlu menü görünümü",
    ],
    techStack: ["Next.js 16", "Prisma", "NextAuth", "QR Code", "TypeScript"],
    deliverables: [
      "QR menü sistemi",
      "Admin yönetim paneli",
      "QR kod üretici",
      "PDF export",
      "Deploy ve kurulum",
    ],
    keywords: [
      "qr menü sistemi",
      "restoran dijital menü",
      "qr kod yemek listesi",
      "kafe dijital menü",
      "restoran teknoloji çözümleri",
    ],
    faq: [
      {
        q: "Menüyü güncellemek için teknik bilgi gerekiyor mu?",
        a: "Hayır. Admin paneli üzerinden ürün fiyat ve görselleri teknik bilgi gerekmeden güncellenebilir.",
      },
      {
        q: "Kaç masa ve kaç ürün desteklenir?",
        a: "Masa ve ürün sayısında sınır yoktur. 5 masalı küçük bir kafeden 200 masalı otele kadar çalışır.",
      },
      {
        q: "Müşteriler QR menüden sipariş verebilir mi?",
        a: "Temel paket bilgi amaçlı dijital menüdür. Sipariş modülü ek özellik olarak eklenebilir.",
      },
    ],
    relatedSlugs: ["rezervasyon-sistemi", "kurumsal-web-sitesi", "landing-page-tasarimi"],
  },
  {
    slug: "youtube-shorts-otomasyonu",
    tier: 3,
    category: "AI & Otomasyon",
    icon: "Video",
    title: "AI Video & YouTube Shorts Otomasyonu",
    metaTitle: "YouTube Shorts Otomasyon Sistemi — AI Video Üretimi | Solman Digital",
    metaDescription:
      "AI ile otomatik YouTube Shorts içerik üretimi. Makale veya ürün içeriğinden video script + D-ID avatar video + YouTube otomatik yükleme.",
    shortDesc:
      "Makalelerden otomatik YouTube Shorts üretimi. AI script + avatar video + otomatik yükleme.",
    longDesc:
      "YouTube Shorts, günlük milyarlarca izlenme ile içerik üreticileri için büyük bir fırsat sunar. Ancak video üretmek hem zaman alır hem de ekipman gerektirir. Solman Digital olarak mevcut blog makalelerinizden veya ürün içeriklerinizden otomatik video script oluşturan, D-ID AI avatar ile seslendiren ve YouTube'a yükleyen bir otomasyon sistemi kuruyoruz.\n\nGPT-4o ile 60 saniyelik kanca yapılı, izlenmeyi artıran video scriptleri üretilir. D-ID API ile gerçekçi AI avatar videoları oluşturulur. YouTube Data API v3 ile başlık, açıklama, etiket ve thumbnail dahil tam otomatik yükleme yapılır.\n\nGünlük, haftalık veya tetikleyici bazlı içerik üretim takvimi kurulabilir.",
    features: [
      "GPT-4o ile kanca yapılı video script",
      "D-ID AI avatar video üretimi",
      "YouTube Data API otomatik yükleme",
      "Başlık, açıklama, etiket optimizasyonu",
      "Makale-to-video pipeline",
      "Zamanlanmış içerik takvimi",
    ],
    techStack: ["Next.js 16", "OpenAI GPT-4o", "D-ID API", "YouTube API v3", "TypeScript"],
    deliverables: [
      "Video otomasyon sistemi",
      "YouTube kanal entegrasyonu",
      "İçerik yönetim paneli",
      "Pipeline izleme",
      "Kurulum ve eğitim",
    ],
    keywords: [
      "youtube shorts otomasyon",
      "ai video üretimi",
      "otomatik youtube içeriği",
      "d-id avatar video",
      "youtube otomasyon türkiye",
    ],
    faq: [
      {
        q: "D-ID aboneliği gerekiyor mu?",
        a: "Evet. D-ID API kullanımı için kendi D-ID hesabınız gerekir. Kurulum ve entegrasyon tarafımızdan yapılır.",
      },
      {
        q: "Günde kaç video üretilebilir?",
        a: "D-ID ve YouTube API limitlerinde günde 10-50 video üretilebilir.",
      },
      {
        q: "Video thumbnail'ları otomatik oluşturuluyor mu?",
        a: "Evet. DALL-E veya Canva API ile thumbnail otomasyonu da sisteme eklenebilir.",
      },
    ],
    relatedSlugs: ["ai-icerik-otomasyonu", "haber-icerik-platformu", "api-entegrasyonu"],
  },
  {
    slug: "web-scraping-veri",
    tier: 3,
    category: "Özel Çözümler",
    icon: "Database",
    title: "Web Scraping & Veri Toplama Pipeline",
    metaTitle: "Web Scraping Hizmeti — Veri Toplama Otomasyonu | Solman Digital",
    metaDescription:
      "robots.txt uyumlu web scraping ve veri toplama pipeline'ları geliştiriyoruz. Fiyat takibi, rakip analizi, pazar araştırması için veri otomasyonu.",
    shortDesc:
      "robots.txt uyumlu web scraping. Fiyat takibi, rakip analizi ve pazar araştırması için veri pipeline'ı.",
    longDesc:
      "İnternetteki verileri manuel toplamak hem zaman alır hem de hataya açıktır. Solman Digital olarak e-ticaret fiyat takibi, rakip analizi, pazar araştırması ve haber toplama için özel web scraping ve veri pipeline'ları geliştiriyoruz. Tüm scraping işlemleri robots.txt ve kullanım koşullarına uygun yapılır.\n\nSerper API entegrasyonu ile arama motoru sonuçlarını da çekebilir, içerik araştırmasını otomatize edebilirsiniz. Toplanan veriler PostgreSQL veya CSV formatında sunulur. Zamanlanmış görevlerle düzenli aralıklarla otomatik veri toplama yapılır.\n\nVeri temizleme, normalleştirme ve raporlama dashboard'u da projeye eklenebilir.",
    features: [
      "robots.txt uyumlu web scraping",
      "Serper API ile arama sonuçları",
      "Zamanlanmış otomatik veri toplama",
      "Veri temizleme ve normalleştirme",
      "PostgreSQL / CSV çıktı",
      "Fiyat takibi ve değişim bildirimleri",
    ],
    techStack: ["Next.js 16", "Playwright / Cheerio", "Serper API", "Prisma", "TypeScript"],
    deliverables: [
      "Scraping pipeline",
      "Veri deposu (DB/CSV)",
      "Zamanlama sistemi",
      "Monitoring paneli",
      "Teknik dokümantasyon",
    ],
    keywords: [
      "web scraping hizmeti",
      "veri toplama otomasyonu",
      "fiyat takip sistemi",
      "rakip analizi otomasyon",
      "serper api entegrasyonu",
    ],
    faq: [
      {
        q: "Web scraping yasal mı?",
        a: "Kamuya açık veriler ve robots.txt'e uyan scraping işlemleri genel olarak yasaldır. Her proje için yasal uygunluk değerlendirmesi yapıyoruz.",
      },
      {
        q: "Hangi siteleri scrape edebilirsiniz?",
        a: "Trendyol, Hepsiburada, sahibinden.com ve API'si olmayan kamuya açık birçok site desteklenir.",
      },
      {
        q: "Scraping engeli (anti-bot) aşılabiliyor mu?",
        a: "Playwright + proxy rotation ile çoğu anti-bot koruması aşılabilir. Her proje özel değerlendirme gerektirir.",
      },
    ],
    relatedSlugs: ["haber-icerik-platformu", "api-entegrasyonu", "ai-icerik-otomasyonu"],
  },
  {
    slug: "cok-dilli-web-sitesi",
    tier: 3,
    category: "Web Sitesi & Tasarım",
    icon: "Languages",
    title: "Çok Dilli Web Sitesi (i18n) Geliştirme",
    metaTitle: "Çok Dilli Web Sitesi — Next.js i18n Kurulumu | Solman Digital",
    metaDescription:
      "next-intl ile Türkçe, İngilizce ve diğer dillerde çok dilli web sitesi ve uygulama geliştiriyoruz. SEO uyumlu i18n yapısı, hreflang etiketi kurulumu.",
    shortDesc:
      "next-intl ile çok dilli web sitesi. Türkçe + İngilizce + Almanca. SEO uyumlu hreflang yapısı.",
    longDesc:
      "Uluslararası pazarlara açılmak veya yabancı müşterilere ulaşmak istiyorsanız çok dilli web sitesi şarttır. Solman Digital olarak next-intl kütüphanesi ile Next.js projelerine i18n (uluslararasılaşma) desteği ekliyoruz.\n\nHer dil için ayrı URL yapısı (/en/, /de/ gibi), hreflang etiketleri ve dil bazlı sitemap ile SEO optimizasyonu sağlanır. Çeviri dosyaları JSON formatında yönetilir; içerik ekibi teknik bilgi gerektirmeden çevirileri güncelleyebilir.\n\nMevcut bir Next.js projenize i18n eklemek veya sıfırdan çok dilli proje kurmak için destek veriyoruz.",
    features: [
      "next-intl ile tam i18n desteği",
      "SEO uyumlu URL yapısı (/tr, /en)",
      "Hreflang etiketi kurulumu",
      "Dil bazlı sitemap üretimi",
      "JSON çeviri dosyası yönetimi",
      "RTL (sağdan sola) dil desteği",
    ],
    techStack: ["Next.js 16", "next-intl", "TypeScript", "Vercel"],
    deliverables: [
      "i18n kurulumu ve çeviri altyapısı",
      "Hreflang ve SEO yapılandırması",
      "Çeviri yönetim rehberi",
      "Deploy",
    ],
    keywords: [
      "çok dilli web sitesi",
      "next.js i18n kurulum",
      "türkçe ingilizce web sitesi",
      "hreflang etiketi",
      "uluslararası seo",
    ],
    faq: [
      {
        q: "Kaç dil desteklenebilir?",
        a: "Teorik sınır yoktur. Pratik olarak 2-5 dil yaygın kullanım senaryosudur.",
      },
      {
        q: "Çevirileri kim yapacak?",
        a: "Teknik çeviri altyapısını kuruyoruz. Çeviri metinleri tarafınızdan sağlanır veya DeepL/GPT entegrasyonu ile otomatize edilebilir.",
      },
      {
        q: "Mevcut sitemize i18n eklenebilir mi?",
        a: "Evet. Mevcut Next.js projelerine i18n desteği ekleme konusunda deneyimliyiz.",
      },
    ],
    relatedSlugs: ["kurumsal-web-sitesi", "eticaret-kurulum", "seo-teknik-altyapi"],
  },
  {
    slug: "urun-katalog-stok",
    tier: 3,
    category: "E-Ticaret & Satış",
    icon: "Package",
    title: "Ürün Kataloğu & Stok Yönetim Paneli",
    metaTitle: "Ürün Katalog Sistemi & Stok Yönetimi | Solman Digital",
    metaDescription:
      "İşletmeniz için özel ürün kataloğu ve stok yönetim paneli geliştiriyoruz. Barkod okuma, toplu güncelleme, depo yönetimi ve sipariş takibi.",
    shortDesc:
      "Özel ürün kataloğu ve stok yönetim paneli. Barkod okuma, toplu güncelleme, depo yönetimi.",
    longDesc:
      "Excel ile stok takibi yapmak hataya açık ve verimsizdir. Solman Digital olarak işletmenizin ihtiyaçlarına özel, barkod tarama destekli, toplu güncelleme yapılabilen stok yönetim sistemleri geliştiriyoruz.\n\nÜrün kategorileri, varyantları (renk, beden, boyut), fiyat geçmişi ve tedarikçi bilgileri yönetilebilir. Düşük stok uyarıları, otomatik sipariş önerileri ve stok hareket raporları sisteme dahildir. Barkod veya QR kod ile mobil cihazdan stok sayımı yapılabilir.\n\nMulti-depo desteği ile birden fazla depo veya şubenin stoklarını tek panelden yönetebilirsiniz.",
    features: [
      "Ürün ve kategori yönetimi",
      "Barkod / QR kod entegrasyonu",
      "Toplu Excel import/export",
      "Düşük stok uyarı sistemi",
      "Stok hareket raporu",
      "Multi-depo desteği",
    ],
    techStack: ["Next.js 16", "Prisma", "TypeScript", "Supabase"],
    deliverables: [
      "Stok yönetim paneli",
      "Barkod entegrasyonu",
      "Raporlama sistemi",
      "Kullanım kılavuzu",
      "Deploy ve kurulum",
    ],
    keywords: [
      "stok yönetim paneli",
      "ürün katalog sistemi",
      "depo yönetim yazılımı",
      "barkod stok takibi",
      "envanter yönetim sistemi",
    ],
    faq: [
      {
        q: "Mevcut Excel stoklarımı sisteme aktarabilir miyim?",
        a: "Evet. CSV/Excel import özelliği ile mevcut verilerinizi sisteme kolayca aktarabilirsiniz.",
      },
      {
        q: "Barkod tarayıcıya ihtiyaç var mı?",
        a: "Hayır. Akıllı telefon kamerası barkod tarayıcı olarak kullanılabilir.",
      },
      {
        q: "E-ticaret sitemle entegre çalışabilir mi?",
        a: "Evet. E-ticaret sitenizle çift yönlü stok senkronizasyonu kurulabilir.",
      },
    ],
    relatedSlugs: ["eticaret-kurulum", "trendyol-entegrasyonu", "dashboard-analitik"],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServicesByTier(tier: 1 | 2 | 3): Service[] {
  return services.filter((s) => s.tier === tier)
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug)
  if (!service) return []
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter(Boolean) as Service[]
}
