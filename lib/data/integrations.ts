// Pazaryeri entegrasyonu ürün kataloğu.
// Her kayıt sabit-kapsamlı, fiyatı/teslim süresi belli, satılabilir bir done-for-you
// entegrasyon işidir. Render hattı: app/entegrasyonlar/[slug]/page.tsx
// Marka sesi: somut/teknik isim, "bot"/abartı/korku dili yok (AGENTS.md).

export type IntegrationProduct = {
  slug: string
  // "Neyi neye bağlıyoruz" netliği
  source: string
  target: string
  platforms: string[]
  category: "Stok & Sipariş" | "Fiyatlama" | "Ürün Aktarımı" | "Özel Site"
  icon: string // lucide-react ikon adı
  title: string
  shortDesc: string
  longDesc: string
  // sabit fiyat (rakam, TRY) — Offer schema'da kullanılır
  price: number
  priceLabel: string // görünen fiyat etiketi, ör. "₺7.500'den başlayan"
  deliveryDays: string
  // done-for-you sınırları — net olsun → teklif sürtünmesini kaldırır
  scope: string[]
  notIncluded: string[]
  deliverables: string[]
  techStack: string[]
  // ürün-spesifik TicaretHub hesaplayıcı linkleri (besleme/cross-promo)
  ticarethubTools?: { href: string; label: string; desc: string }[]
  faq: { q: string; a: string }[]
  relatedSlugs: string[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
  aeoSummary: string
}

export const integrations: IntegrationProduct[] = [
  {
    slug: "trendyol-woocommerce-stok-siparis-senkronizasyonu",
    source: "Trendyol",
    target: "WooCommerce",
    platforms: ["Trendyol", "WooCommerce"],
    category: "Stok & Sipariş",
    icon: "RefreshCw",
    title: "Trendyol → WooCommerce Stok & Sipariş Senkronizasyonu",
    shortDesc:
      "Trendyol ile WooCommerce mağazanız arasında stok ve siparişleri otomatik senkronize ediyoruz. Çift panel takibi biter.",
    longDesc:
      "Trendyol ve WooCommerce'i ayrı ayrı yönetmek, stoğun bir tarafta tükenip diğer tarafta satılmaya devam etmesine yol açar — bu da iptal ve ceza puanı demektir. Solman Digital olarak iki sistem arasında tek yönlü ya da çift yönlü stok senkronizasyonu kuruyoruz; bir kanalda ürün satıldığında stok diğerinde otomatik güncellenir.\n\nTrendyol'a düşen siparişler WooCommerce sipariş ekranınıza otomatik aktarılır; siparişlerinizi tek yerden görür, kargo ve durum güncellemelerini oradan yönetirsiniz.\n\nKurulum sabit kapsamlıdır: SKU eşleştirme, sandbox testleri ve canlıya geçiş dahildir. İlk hafta sistemi yakından izliyoruz.",
    price: 7500,
    priceLabel: "₺7.500'den başlayan",
    deliveryDays: "5-10 iş günü",
    scope: [
      "Trendyol ve WooCommerce arasında SKU eşleştirme",
      "Stok senkronizasyonu (tek veya çift yönlü)",
      "Trendyol siparişlerinin WooCommerce'e otomatik aktarımı",
      "Sipariş durumu ve kargo bilgisi güncellemesi",
      "Sandbox testleri + canlıya geçiş + 1 hafta izleme",
    ],
    notIncluded: [
      "Trendyol satıcı hesabı ve API anahtarı başvurusu (süreçte destek veriyoruz)",
      "WooCommerce sitesinin sıfırdan kurulumu (ayrı hizmet)",
      "Fiyat güncelleme otomasyonu (ayrı ürün)",
    ],
    deliverables: [
      "Çalışan senkronizasyon entegrasyonu",
      "SKU eşleştirme tablosu",
      "Kurulum ve kullanım kılavuzu",
      "2 hafta teknik destek",
    ],
    techStack: ["Next.js 16", "Trendyol API", "WooCommerce REST API", "TypeScript"],
    ticarethubTools: [
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
    ],
    faq: [
      {
        q: "Stok senkronizasyonu ne kadar sıklıkla çalışır?",
        a: "Sipariş anında tetiklenen anlık senkronizasyon kurulur. İsteğe bağlı olarak belirli aralıklarla çalışan toplu güncelleme de eklenebilir.",
      },
      {
        q: "Çift yönlü senkronizasyon mümkün mü?",
        a: "Evet. WooCommerce'te yaptığınız stok değişikliğinin Trendyol'a, Trendyol satışının WooCommerce'e yansıması şeklinde çift yönlü kurulabilir.",
      },
      {
        q: "Mevcut WooCommerce siteme entegre edilir mi?",
        a: "Evet. Çalışan WooCommerce mağazanıza entegrasyon yapıyoruz; siteyi yeniden kurmaya gerek yoktur.",
      },
    ],
    relatedSlugs: [
      "hepsiburada-woocommerce-entegrasyonu",
      "coklu-pazaryeri-stok-senkronizasyonu",
      "otomatik-fiyat-guncelleme",
    ],
    metaTitle: "Trendyol WooCommerce Stok & Sipariş Senkronizasyonu | Solman Digital",
    metaDescription:
      "Trendyol ile WooCommerce arasında otomatik stok ve sipariş senkronizasyonu kuruyoruz. Sabit fiyat, 5-10 iş günü teslim. SKU eşleştirme dahil.",
    keywords: [
      "trendyol woocommerce entegrasyonu",
      "trendyol stok senkronizasyonu",
      "trendyol sipariş aktarımı",
      "woocommerce trendyol bağlantısı",
      "trendyol api woocommerce",
    ],
    aeoSummary:
      "Solman Digital, Trendyol ile WooCommerce arasında otomatik stok ve sipariş senkronizasyonu kurar. Kurulum sabit kapsamlıdır, SKU eşleştirme ve canlıya geçiş dahildir; genellikle 5-10 iş günü içinde teslim edilir.",
  },
  {
    slug: "hepsiburada-woocommerce-entegrasyonu",
    source: "Hepsiburada",
    target: "WooCommerce",
    platforms: ["Hepsiburada", "WooCommerce"],
    category: "Stok & Sipariş",
    icon: "Store",
    title: "Hepsiburada → WooCommerce Entegrasyonu",
    shortDesc:
      "Hepsiburada mağazanızı WooCommerce ile bağlayıp stok ve siparişleri tek yerden yönetilir hale getiriyoruz.",
    longDesc:
      "Hepsiburada'da satış yaparken kendi WooCommerce sitenizi de yönetmek, iki ayrı stok defteri tutmak demektir. Solman Digital olarak Hepsiburada ile WooCommerce arasında stok senkronizasyonu ve sipariş aktarımı kuruyoruz; iki kanal tek bir sipariş akışında buluşur.\n\nHepsiburada'ya gelen siparişler WooCommerce'e aktarılır, stok hareketleri iki tarafta tutarlı kalır. SKU eşleştirme, test ve canlıya geçiş kurulum kapsamındadır.\n\nKapsam sabittir; sürpriz ek maliyet çıkmaz. İlk hafta sistemi izleyerek edge case'leri kapatıyoruz.",
    price: 7500,
    priceLabel: "₺7.500'den başlayan",
    deliveryDays: "5-10 iş günü",
    scope: [
      "Hepsiburada ve WooCommerce arasında SKU eşleştirme",
      "Stok senkronizasyonu",
      "Sipariş aktarımı ve durum güncellemesi",
      "Sandbox testleri + canlıya geçiş + 1 hafta izleme",
    ],
    notIncluded: [
      "Hepsiburada satıcı hesabı ve API erişimi başvurusu (destek veriyoruz)",
      "WooCommerce sitesinin sıfırdan kurulumu",
      "Fiyat güncelleme otomasyonu (ayrı ürün)",
    ],
    deliverables: [
      "Çalışan entegrasyon",
      "SKU eşleştirme tablosu",
      "Kurulum ve kullanım kılavuzu",
      "2 hafta teknik destek",
    ],
    techStack: ["Next.js 16", "Hepsiburada API", "WooCommerce REST API", "TypeScript"],
    ticarethubTools: [
      {
        href: "https://ticarethub.com/pazaryeri-komisyon-karsilastirma",
        label: "Komisyon Karşılaştırma",
        desc: "Pazaryeri komisyonlarını yan yana gör",
      },
    ],
    faq: [
      {
        q: "Hepsiburada API erişimi nasıl sağlanıyor?",
        a: "Hepsiburada satıcı hesabınız üzerinden API erişimi açılması gerekir. Başvuru ve yapılandırma sürecinde teknik destek sağlıyoruz.",
      },
      {
        q: "Trendyol da eklenebilir mi?",
        a: "Evet. Birden fazla pazaryerini tek panelde toplamak için Çoklu Pazaryeri Stok Senkronizasyonu ürünümüze geçilebilir.",
      },
    ],
    relatedSlugs: [
      "trendyol-woocommerce-stok-siparis-senkronizasyonu",
      "coklu-pazaryeri-stok-senkronizasyonu",
      "otomatik-fiyat-guncelleme",
    ],
    metaTitle: "Hepsiburada WooCommerce Entegrasyonu | Solman Digital",
    metaDescription:
      "Hepsiburada ile WooCommerce arasında stok senkronizasyonu ve sipariş aktarımı kuruyoruz. Sabit fiyat, 5-10 iş günü teslim.",
    keywords: [
      "hepsiburada woocommerce entegrasyonu",
      "hepsiburada stok senkronizasyonu",
      "hepsiburada sipariş aktarımı",
      "hepsiburada api entegrasyonu",
    ],
    aeoSummary:
      "Solman Digital, Hepsiburada ile WooCommerce arasında stok ve sipariş entegrasyonu kurar. SKU eşleştirme ve canlıya geçiş dahildir; teslim 5-10 iş günüdür.",
  },
  {
    slug: "coklu-pazaryeri-stok-senkronizasyonu",
    source: "Trendyol + Hepsiburada + N11",
    target: "Tek Panel",
    platforms: ["Trendyol", "Hepsiburada", "N11", "WooCommerce"],
    category: "Stok & Sipariş",
    icon: "Layers",
    title: "Çoklu Pazaryeri Stok Senkronizasyonu",
    shortDesc:
      "Trendyol, Hepsiburada ve N11 stoklarını tek bir kaynakta birleştirip otomatik senkronize ediyoruz.",
    longDesc:
      "Üç ayrı pazaryerinde aynı ürünü satarken stoğu üç yerde ayrı tutmak sürdürülebilir değildir. Solman Digital olarak Trendyol, Hepsiburada ve N11'i tek bir stok kaynağına bağlıyoruz; bir kanalda satış olduğunda diğerlerinin stoğu otomatik düşer.\n\nTüm kanalların siparişleri tek bir ekrana akar; hangi üründen nerede ne kadar sattığınızı tek yerden görürsünüz. Kaynak olarak WooCommerce mağazanız ya da bizim kurduğumuz merkezi panel kullanılabilir.\n\nKapsam sabittir. Kanal sayısı ve ürün adedine göre fiyat kademelenir; teklifte net olarak belirtilir.",
    price: 12000,
    priceLabel: "₺12.000'den başlayan",
    deliveryDays: "10-15 iş günü",
    scope: [
      "Trendyol, Hepsiburada ve N11 hesaplarının bağlanması",
      "Merkezi stok kaynağı kurulumu (WooCommerce veya özel panel)",
      "Tüm kanallarda anlık stok senkronizasyonu",
      "Tüm siparişlerin tek ekrana toplanması",
      "Sandbox testleri + canlıya geçiş + 1 hafta izleme",
    ],
    notIncluded: [
      "Pazaryeri hesapları ve API erişimleri (destek veriyoruz)",
      "Fiyat güncelleme otomasyonu (ayrı ürün)",
      "Uluslararası platformlar (eBay/Etsy — ayrıca değerlendirilir)",
    ],
    deliverables: [
      "Merkezi senkronizasyon sistemi",
      "Tüm kanalların sipariş akışı",
      "SKU eşleştirme tablosu",
      "Kurulum ve kullanım kılavuzu",
      "3 hafta teknik destek",
    ],
    techStack: ["Next.js 16", "Trendyol API", "Hepsiburada API", "N11 API", "TypeScript"],
    ticarethubTools: [
      {
        href: "https://ticarethub.com/pazaryeri-komisyon-karsilastirma",
        label: "Komisyon Karşılaştırma",
        desc: "Hangi pazaryeri daha kârlı, yan yana gör",
      },
      {
        href: "https://ticarethub.com/trendyol-kar-analizi",
        label: "Kâr Analizi",
        desc: "Ürün bazında kâr/zarar simülasyonu",
      },
    ],
    faq: [
      {
        q: "Hangi pazaryerleri destekleniyor?",
        a: "Trendyol, Hepsiburada ve N11 standart kapsamdadır. Çiçeksepeti gibi ek kanallar teknik değerlendirme sonrası eklenebilir.",
      },
      {
        q: "Stok kaynağı ne olur?",
        a: "Mevcut WooCommerce mağazanız merkezi kaynak olabilir; yoksa sizin için sade bir merkezi stok paneli kurarız.",
      },
      {
        q: "Kanal sayısı fiyatı değiştirir mi?",
        a: "Evet. Kanal sayısı ve ürün adedi kapsamı belirler. Teklifte sabit fiyat olarak netleştirilir; süreç içinde sürpriz maliyet çıkmaz.",
      },
    ],
    relatedSlugs: [
      "trendyol-woocommerce-stok-siparis-senkronizasyonu",
      "otomatik-fiyat-guncelleme",
      "xml-toplu-urun-aktarimi",
    ],
    metaTitle: "Çoklu Pazaryeri Stok Senkronizasyonu | Solman Digital",
    metaDescription:
      "Trendyol, Hepsiburada ve N11 stoklarını tek panelde birleştiriyoruz. Anlık stok senkronizasyonu, tek sipariş ekranı. Sabit fiyat, 10-15 iş günü.",
    keywords: [
      "çoklu pazaryeri entegrasyonu",
      "çoklu pazaryeri stok yönetimi",
      "trendyol hepsiburada n11 entegrasyon",
      "tek panel pazaryeri yönetimi",
      "çok kanallı stok senkronizasyonu",
    ],
    aeoSummary:
      "Solman Digital, Trendyol, Hepsiburada ve N11 stoklarını tek bir merkezi kaynakta birleştirip otomatik senkronize eder. Tüm siparişler tek ekrana akar; kurulum 10-15 iş günü sürer.",
  },
  {
    slug: "otomatik-fiyat-guncelleme",
    source: "Fiyat Kuralları",
    target: "Pazaryerleri",
    platforms: ["Trendyol", "Hepsiburada", "N11"],
    category: "Fiyatlama",
    icon: "Tags",
    title: "Otomatik Fiyat Güncelleme & Rakip Takibi",
    shortDesc:
      "Maliyet ve hedef kârınıza göre kurallar tanımlıyoruz; pazaryeri fiyatlarınız bu kurallara göre otomatik güncellenir.",
    longDesc:
      "Her ürün için fiyatı elle güncellemek, rakip fiyat değiştirdiğinde geç kalmak demektir. Solman Digital olarak maliyet, komisyon ve hedef kâr marjınıza göre fiyat kuralları tanımlıyoruz; pazaryeri fiyatlarınız bu kurallara göre otomatik hesaplanır ve güncellenir.\n\nRakip fiyat takibi ile belirlediğiniz sınırlar içinde fiyatınızı konumlandırırız — taban fiyatın altına asla inmeyecek şekilde. Hangi ürünün ne zaman, neden güncellendiğini kayıt altında görürsünüz.\n\nKurallar sizin kontrolünüzdedir; sistem yalnızca tanımladığınız mantığı uygular. Kapsam sabittir.",
    price: 9000,
    priceLabel: "₺9.000'den başlayan",
    deliveryDays: "7-12 iş günü",
    scope: [
      "Maliyet + komisyon + hedef kâr bazlı fiyat kuralları",
      "Taban fiyat koruması (altına inmez)",
      "Belirlenen pazaryerlerinde otomatik fiyat güncelleme",
      "Rakip fiyat takibi ve kural içinde konumlandırma",
      "Güncelleme geçmişi kaydı",
    ],
    notIncluded: [
      "Stok senkronizasyonu (ayrı ürün)",
      "Pazaryeri hesapları ve API erişimleri (destek veriyoruz)",
    ],
    deliverables: [
      "Fiyat kuralı yönetim ekranı",
      "Otomatik güncelleme sistemi",
      "Güncelleme geçmişi raporu",
      "Kurulum ve kullanım kılavuzu",
      "2 hafta teknik destek",
    ],
    techStack: ["Next.js 16", "Trendyol API", "Hepsiburada API", "TypeScript"],
    ticarethubTools: [
      {
        href: "https://ticarethub.com/trendyol-fiyat-hesaplama",
        label: "Fiyat Hesaplama",
        desc: "Hedef kâra göre satış fiyatı hesapla",
      },
      {
        href: "https://ticarethub.com/trendyol-komisyon-hesaplama",
        label: "Komisyon Hesaplama",
        desc: "Kategoriye göre net komisyon oranı",
      },
    ],
    faq: [
      {
        q: "Fiyatlar tamamen otomatik mi değişir?",
        a: "Sistem yalnızca sizin tanımladığınız kuralları uygular. Taban fiyat koruması sayesinde belirlediğiniz alt sınırın altına asla inilmez. Kontrol sizdedir.",
      },
      {
        q: "Rakip fiyatları nereden alınır?",
        a: "Pazaryerinin sunduğu fiyat verileri ve ürün eşleştirmesi üzerinden takip yapılır. Kapsam teklifte netleştirilir.",
      },
      {
        q: "Hangi pazaryerlerinde çalışır?",
        a: "Trendyol ve Hepsiburada standart kapsamdadır; ek pazaryerleri değerlendirme sonrası eklenebilir.",
      },
    ],
    relatedSlugs: [
      "coklu-pazaryeri-stok-senkronizasyonu",
      "trendyol-woocommerce-stok-siparis-senkronizasyonu",
      "xml-toplu-urun-aktarimi",
    ],
    metaTitle: "Otomatik Fiyat Güncelleme & Rakip Takibi | Solman Digital",
    metaDescription:
      "Maliyet ve hedef kârınıza göre pazaryeri fiyatlarınızı otomatik güncelliyoruz. Taban fiyat koruması ve rakip takibi dahil. Sabit fiyat, 7-12 iş günü.",
    keywords: [
      "otomatik fiyat güncelleme",
      "trendyol fiyat otomasyonu",
      "pazaryeri fiyat takibi",
      "rakip fiyat izleme",
      "dinamik fiyatlama pazaryeri",
    ],
    aeoSummary:
      "Solman Digital, maliyet ve hedef kâr marjına göre tanımlanan kurallarla pazaryeri fiyatlarını otomatik günceller. Taban fiyat koruması ve rakip takibi dahildir; kurulum 7-12 iş günü sürer.",
  },
  {
    slug: "pazaryeri-ozel-site-aktarimi",
    source: "Pazaryerleri",
    target: "Özel Site (Next.js)",
    platforms: ["Trendyol", "Hepsiburada", "Next.js"],
    category: "Özel Site",
    icon: "Globe",
    title: "Pazaryeri → Özel Site (Next.js) Ürün & Sipariş Aktarımı",
    shortDesc:
      "Pazaryeri ürün ve siparişlerinizi kendi Next.js sitenize aktarıyoruz; tek altyapıda toplayın.",
    longDesc:
      "Kendi markanızla bir Next.js siteniz varsa, pazaryerindeki ürün ve siparişlerinizi bu siteye taşıyarak tek bir altyapıda yönetebilirsiniz. Solman Digital olarak pazaryeri kataloğunuzu özel sitenize aktarıyor, siparişleri kendi panelinize akıtıyoruz.\n\nÜrün bilgileri, görseller ve stok özel sitenizle senkron tutulur; pazaryeri satışları kendi sipariş ekranınıza düşer. Kendi siteniz üzerinden de satış yapıyorsanız stok her iki tarafta tutarlı kalır.\n\nKurulum sabit kapsamlıdır; mevcut Next.js altyapınıza entegre olur.",
    price: 11000,
    priceLabel: "₺11.000'den başlayan",
    deliveryDays: "10-15 iş günü",
    scope: [
      "Pazaryeri ürün kataloğunun özel siteye aktarımı",
      "Stok senkronizasyonu (site ↔ pazaryeri)",
      "Pazaryeri siparişlerinin özel panele aktarımı",
      "Sandbox testleri + canlıya geçiş + 1 hafta izleme",
    ],
    notIncluded: [
      "Next.js sitesinin sıfırdan geliştirilmesi (ayrı hizmet)",
      "Pazaryeri hesapları ve API erişimleri (destek veriyoruz)",
    ],
    deliverables: [
      "Çalışan aktarım entegrasyonu",
      "Stok senkronizasyonu",
      "Sipariş paneli bağlantısı",
      "Kurulum ve kullanım kılavuzu",
      "2 hafta teknik destek",
    ],
    techStack: ["Next.js 16", "Trendyol API", "Prisma", "TypeScript"],
    faq: [
      {
        q: "Sitem yoksa önce onu mu yaptırmam gerekir?",
        a: "Evet, bu ürün mevcut bir Next.js sitesine entegrasyon içindir. Siteniz yoksa önce E-Ticaret Sitesi Kurulumu hizmetimizle başlanır.",
      },
      {
        q: "Hem pazaryeri hem kendi sitemden satış yaparsam stok karışır mı?",
        a: "Hayır. İki tarafı senkron tutarız; bir kanalda satış olduğunda diğerinin stoğu güncellenir.",
      },
    ],
    relatedSlugs: [
      "trendyol-woocommerce-stok-siparis-senkronizasyonu",
      "coklu-pazaryeri-stok-senkronizasyonu",
      "xml-toplu-urun-aktarimi",
    ],
    metaTitle: "Pazaryeri Ürün & Sipariş Aktarımı — Next.js Özel Site | Solman Digital",
    metaDescription:
      "Pazaryeri ürün ve siparişlerinizi kendi Next.js sitenize aktarıyoruz. Çift yönlü stok senkronizasyonu dahil. Sabit fiyat, 10-15 iş günü.",
    keywords: [
      "pazaryeri özel site entegrasyonu",
      "trendyol next.js entegrasyonu",
      "pazaryeri sipariş aktarımı",
      "özel site stok senkronizasyonu",
    ],
    aeoSummary:
      "Solman Digital, pazaryeri ürün ve siparişlerini mevcut Next.js sitesine aktarır ve çift yönlü stok senkronizasyonu kurar. Kurulum 10-15 iş günü sürer.",
  },
  {
    slug: "xml-toplu-urun-aktarimi",
    source: "XML / Tedarikçi",
    target: "Pazaryerleri",
    platforms: ["Trendyol", "Hepsiburada", "WooCommerce"],
    category: "Ürün Aktarımı",
    icon: "FileSpreadsheet",
    title: "XML / Toplu Ürün Aktarımı & Kategori Eşleştirme",
    shortDesc:
      "Tedarikçi XML'inizi veya ürün listenizi pazaryeri formatına dönüştürüp toplu listeliyoruz; kategori eşleştirme dahil.",
    longDesc:
      "Yüzlerce ürünü elle pazaryerine yüklemek hem zaman alır hem hata üretir. Solman Digital olarak tedarikçi XML'inizi ya da Excel ürün listenizi pazaryeri formatına dönüştürüp toplu olarak listeliyoruz. Kategori ve özellik (attribute) eşleştirmesini biz kuruyoruz.\n\nTedarikçi fiyat ve stok değiştiğinde XML üzerinden otomatik güncelleme kurulabilir; ürünleriniz güncel kalır. Eksik veya hatalı veriler kalite kontrolünden geçirilir.\n\nKapsam sabittir; ürün adedi ve kaynak format kapsamı belirler ve teklifte netleştirilir.",
    price: 6500,
    priceLabel: "₺6.500'den başlayan",
    deliveryDays: "5-10 iş günü",
    scope: [
      "XML/Excel kaynağının pazaryeri formatına dönüştürülmesi",
      "Kategori ve özellik (attribute) eşleştirmesi",
      "Toplu ürün listeleme",
      "Tedarikçi XML'inden otomatik stok/fiyat güncelleme (opsiyonel)",
    ],
    notIncluded: [
      "Ürün görsellerinin üretilmesi/düzenlenmesi",
      "Ürün açıklaması yazımı (AI Ürün Açıklama Otomasyonu ile yapılabilir)",
      "Pazaryeri hesabı ve API erişimi (destek veriyoruz)",
    ],
    deliverables: [
      "Toplu listelenmiş ürün kataloğu",
      "Kategori eşleştirme tablosu",
      "Otomatik güncelleme kurulumu (opsiyonel)",
      "Kurulum ve kullanım kılavuzu",
      "2 hafta teknik destek",
    ],
    techStack: ["Next.js 16", "XML/CSV işleme", "Trendyol API", "TypeScript"],
    faq: [
      {
        q: "Tedarikçi XML formatım standart değil, sorun olur mu?",
        a: "Hayır. Kaynak formatınızı inceleyip pazaryeri formatına dönüştüren eşleme kurarız. Standart olmayan alanlar da ele alınır.",
      },
      {
        q: "Ürün açıklamalarını da siz mi yazıyorsunuz?",
        a: "Bu ürün listeleme ve eşleştirme içindir. Açıklama yazımı için AI Ürün Açıklama Otomasyonu hizmetimiz kullanılabilir.",
      },
    ],
    relatedSlugs: [
      "coklu-pazaryeri-stok-senkronizasyonu",
      "otomatik-fiyat-guncelleme",
      "trendyol-woocommerce-stok-siparis-senkronizasyonu",
    ],
    metaTitle: "XML Toplu Ürün Aktarımı & Kategori Eşleştirme | Solman Digital",
    metaDescription:
      "Tedarikçi XML veya Excel ürün listenizi pazaryeri formatına dönüştürüp toplu listeliyoruz. Kategori eşleştirme ve otomatik güncelleme dahil.",
    keywords: [
      "xml ürün aktarımı",
      "toplu ürün yükleme pazaryeri",
      "trendyol xml entegrasyon",
      "tedarikçi xml entegrasyonu",
      "kategori eşleştirme pazaryeri",
    ],
    aeoSummary:
      "Solman Digital, tedarikçi XML veya Excel ürün listelerini pazaryeri formatına dönüştürüp toplu listeler ve kategori eşleştirmesini kurar. Otomatik stok/fiyat güncelleme opsiyoneldir; teslim 5-10 iş günüdür.",
  },
]

export function getIntegrationBySlug(slug: string): IntegrationProduct | undefined {
  return integrations.find((p) => p.slug === slug)
}

export function getRelatedIntegrations(slug: string): IntegrationProduct[] {
  const product = getIntegrationBySlug(slug)
  if (!product) return []
  return product.relatedSlugs
    .map((s) => getIntegrationBySlug(s))
    .filter(Boolean) as IntegrationProduct[]
}
