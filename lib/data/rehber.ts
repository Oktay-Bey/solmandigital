export type RehberCategory =
  | "trendyol"
  | "e-ticaret"
  | "saas"
  | "yapay-zeka"
  | "web-sitesi"
  | "karsilastirma"
  | "dijital-pazarlama"

export type RehberPost = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  description: string
  /** Kısa, doğrudan cevap — AI arama motorları bu bloğu öne çıkarır (max ~200 kelime) */
  summary?: string
  publishDate: string
  /** Yoksa publishDate kullanılır */
  updatedDate?: string
  category?: RehberCategory
  readTime: number
  sections: Array<{
    heading: string
    body: string
    list?: string[]
  }>
  faq: Array<{ q: string; a: string }>
  cta: { text: string; href: string; label: string }
  ctaSecondary?: { text: string; href: string; label: string }
  keywords: string[]
  relatedSlugs?: string[]
}

export const rehberPosts: RehberPost[] = [
  {
    slug: "trendyol-satici-web-sitesi",
    category: "trendyol",
    relatedSlugs: ["hepsiburada-api-entegrasyonu", "trendyol-vs-eticaret-sitesi", "trendyol-komisyon-hesaplama"],
    title: "Trendyol Satıcısı Web Sitesi Yaptırmalı mı?",
    metaTitle: "Trendyol Satıcısı Web Sitesi Yaptırmalı mı? | Solman Digital",
    metaDescription:
      "Trendyol satıcıları için bağımsız web sitesi kurmanın avantajları, doğru zamanlama ve teknik gereksinimler. Gerçek proje deneyimiyle hazırlanmış rehber.",
    description:
      "Trendyol mağazanız büyürken platformdan bağımsız bir dijital varlık oluşturmak kritik hale gelir. Bu rehberde neden, ne zaman ve nasıl sorusuna yanıt veriyoruz.",
    summary:
      "Aylık 50.000 ₺+ satış hacmine ulaşmış Trendyol satıcıları için bağımsız web sitesi kurmak komisyon maliyetini düşürür, müşteri verisini sahiplendirir ve marka görünürlüğünü artırır. Trendyol API entegrasyonu ile stok senkronizasyonu sağlanarak iki kanalı eş zamanlı yönetmek mümkündür.",
    publishDate: "2026-05-01",
    updatedDate: "2026-06-10",
    readTime: 6,
    sections: [
      {
        heading: "Neden Sadece Trendyol'a Güvenmemeli?",
        body: "Trendyol, Türkiye'nin en büyük e-ticaret platformu olarak satıcılara hazır bir müşteri kitlesi sunar. Ancak bu kolaylığın bedeli vardır: marka görünürlüğü Trendyol'a aittir, komisyon oranları zaman içinde değişebilir ve platform politika güncellemeleri mağazanızı doğrudan etkiler.",
        list: [
          "Komisyon oranları üzerinde kontrolünüz yoktur",
          "Müşteri verisi tamamen Trendyol'a aittir — sizin CRM'inize geçmez",
          "Rakip ürünler her zaman yanınızda listelenir",
          "Marka kimliğinizi Trendyol tasarım kuralları sınırlar",
        ],
      },
      {
        heading: "Web Sitesi Kurmanın Somut Avantajları",
        body: "Kendi web siteniz, Trendyol'u terk etmek değil — onu desteklemek anlamına gelir. İki kanal birlikte yürütüldüğünde hem platform trafiğinden hem de organik Google trafiğinden yararlanırsınız.",
        list: [
          "Google organik aramalarda görünürlük kazanırsınız",
          "Müşteri e-postalarını toplayarak CRM oluşturursunuz",
          "İyzico / Stripe ile doğrudan ödeme alarak komisyon ödemezsiniz",
          "Özel kampanya ve indirimler platforma bağımlı kalmaz",
          "Toptan / kurumsal sipariş kanalı açılır",
        ],
      },
      {
        heading: "Ne Zaman Web Sitesi Kurmalısınız?",
        body: "Her Trendyol satıcısının hemen web sitesi kurmasına gerek yoktur. Aşağıdaki kriterlerden ikisi sizin için geçerliyse, doğru zaman gelmiştir.",
        list: [
          "Aylık 50.000 ₺+ satış hacmi var",
          "Tekrarlayan müşterileriniz var ama onlarla iletişim kuramıyorsunuz",
          "Rakipleriniz markalı web sitesine sahip",
          "B2B / toptan satış talebiniz var",
          "Yeni ürün kategorisi açmayı planlıyorsunuz",
        ],
      },
      {
        heading: "Teknik Gereksinimler ve Süreç",
        body: "Trendyol satıcıları için e-ticaret web sitesi kurulum süreci genellikle şu adımları kapsar: alan adı ve hosting kurulumu, ürün kataloğu aktarımı, ödeme altyapısı (İyzico zorunlu), Trendyol API entegrasyonu (opsiyonel, çift kanal stok yönetimi için). Standart bir e-ticaret sitesi 10–15 iş günü içinde canlıya alınır.",
      },
      {
        heading: "Trendyol API Entegrasyonu Nedir?",
        body: "Hem Trendyol'dan hem kendi sitenizden satış yapıyorsanız stok senkronizasyonu kritik önem taşır. Trendyol API entegrasyonu sayesinde kendi sitenizde verilen sipariş Trendyol stoğunuzu otomatik günceller — çift satış riski ortadan kalkar. Bu entegrasyon Solman Digital tarafından onlarca projede uygulanmış, standart bir çözümdür.",
      },
    ],
    faq: [
      {
        q: "Trendyol API entegrasyonu zorunlu mu?",
        a: "Hayır, zorunlu değil. Eğer Trendyol ve kendi sitenizden eşzamanlı satış yapacaksanız stok senkronizasyonu için şiddetle tavsiye edilir. Sadece kendi sitenizden satış yapacaksanız entegrasyon gerekmez.",
      },
      {
        q: "Trendyol satıcısı için web sitesi ne kadar tutar?",
        a: "E-ticaret web sitesi kurulumu 20.000 ₺'den başlamaktadır. Trendyol API entegrasyonu eklendiğinde proje kapsamına göre ek maliyet oluşur. Kesin fiyat kapsam görüşmesinde belirlenir.",
      },
      {
        q: "Ürünlerimi Trendyol'dan otomatik aktarabilir miyiz?",
        a: "Trendyol satıcı panelinden ürün verisini dışa aktararak sitenize aktarmak mümkündür. API entegrasyonuyla stok ve fiyat güncellemeleri otomatik hale gelir.",
      },
    ],
    cta: {
      text: "Trendyol satıcısı olarak web sitesi ve API entegrasyonu hakkında",
      href: "/trendyol-entegrasyonu",
      label: "Trendyol Entegrasyonu Hizmeti",
    },
    ctaSecondary: {
      text: "Önce rakamları kendiniz hesaplayın",
      href: "https://ticarethub.com/trendyol-komisyon-hesaplama",
      label: "TicaretHub Ücretsiz Araçlar",
    },
    keywords: [
      "trendyol satıcı web sitesi",
      "trendyol api entegrasyonu",
      "trendyol mağaza web sitesi",
      "trendyol satıcı e-ticaret",
    ],
  },
  {
    slug: "ai-icerik-otomasyonu-nedir",
    category: "yapay-zeka",
    title: "AI İçerik Otomasyonu Nedir? E-Ticaret ve Haber Siteleri İçin Kullanım Rehberi",
    metaTitle: "AI İçerik Otomasyonu Nedir? | Solman Digital",
    metaDescription:
      "OpenAI GPT-4o ve Claude AI ile Türkçe ürün açıklaması, haber özeti ve SEO içeriği otomasyonu. Gerçek proje örnekleriyle kapsamlı rehber.",
    description:
      "Binlerce ürün açıklamasını, haber özetini veya SEO içeriğini tek tek yazmak yerine yapay zeka pipeline'ıyla otomatize etmek artık mümkün. Gerçek proje deneyimiyle hazırlanmış rehber.",
    summary:
      "AI içerik otomasyonu, GPT-4o veya Claude AI gibi büyük dil modellerini kullanarak ürün açıklaması, haber özeti ve SEO metinlerini otomatik üretir. Solman Digital tarafından geliştirilen projelerde günde 50+ Türkçe haber içeriği sıfır insan müdahalesiyle yayınlanmaktadır. Basit bir pipeline 5–10 iş günü içinde kurulur.",
    publishDate: "2026-05-10",
    updatedDate: "2026-06-10",
    readTime: 7,
    sections: [
      {
        heading: "AI İçerik Otomasyonu Nedir?",
        body: "AI içerik otomasyonu; OpenAI GPT-4o, Claude AI veya benzeri büyük dil modellerini kullanarak belirli bir formata göre otomatik metin üretmektir. İnsan denetimi altında çalışan sistemler; ürün açıklamaları, haber özetleri, SEO meta etiketleri ve blog yazıları için uygulanabilir.",
      },
      {
        heading: "E-Ticaret Sitelerinde Kullanım: Ürün Açıklama Otomasyonu",
        body: "Binlerce ürünü olan e-ticaret siteleri için manuel ürün açıklaması yazmak hem zaman alır hem de tutarsız sonuçlar doğurur. AI pipeline kurulumu şu adımları kapsar:",
        list: [
          "Ürün başlığı, kategori ve özellikler API veya Excel'den çekilir",
          "GPT-4o / Claude AI her ürün için Türkçe, SEO uyumlu açıklama üretir",
          "İnsan denetimi (kalite filtresi) uygulandıktan sonra veritabanına yazılır",
          "Günlük otomatik güncelleme ile yeni ürünler otomatik kapsama girer",
        ],
      },
      {
        heading: "Haber Sitelerinde Kullanım: Otomatik İçerik Üretimi",
        body: "Haber ve içerik platformları için AI pipeline, günde onlarca haber özetini sıfır insan müdahalesiyle yayınlar. Solman Digital tarafından geliştirilen bir medya projesinde günde 50+ içerik bu sistemle üretilmektedir.",
        list: [
          "RSS beslemeleri veya API'den ham haber verisi çekilir",
          "GPT-4o içeriği Türkçe olarak yeniden yazar, özetler",
          "SEO başlığı ve meta açıklaması otomatik oluşturulur",
          "WordPress veya özel CMS'e otomatik yayınlanır",
        ],
      },
      {
        heading: "GPT-4o mu, Claude AI mi?",
        body: "Her iki model de Türkçe içerik üretiminde güçlüdür. GPT-4o kısa, yoğun ve yaratıcı içerikler için, Claude AI uzun metin analizi ve yapılandırılmış çıktılar için öne çıkar. Proje kapsamına göre birini veya ikisini birlikte kullanmak mümkündür.",
      },
      {
        heading: "Hangi İşler Automasyona Uygun Değil?",
        body: "AI içerik otomasyonu her durumda uygun değildir. Yüksek hassasiyet gerektiren hukuki, tıbbi veya finansal içeriklerde mutlaka uzman denetimi şarttır. Marka sesini birebir taklit etmesi gereken pazarlama metinlerinde insan katkısı gerekir.",
      },
    ],
    faq: [
      {
        q: "AI içerik otomasyonu ne kadar sürede kurulur?",
        a: "Basit bir ürün açıklama pipeline'ı 5–10 iş günü, haber sitesi için tam otomatik yayın sistemi 2–3 hafta içinde kurulur.",
      },
      {
        q: "Türkçe içerik kalitesi yeterli oluyor mu?",
        a: "GPT-4o ve Claude AI Türkçe içerik kalitesi 2024 itibarıyla ticari kullanım için yeterli düzeye gelmiştir. SEO uyumlu, dilbilgisi açısından doğru içerik üretimi standarttır. İnce marka sesi gerektiren içeriklerde insan denetimi önerilir.",
      },
      {
        q: "Mevcut ürün verilerim hangi formatta olmalı?",
        a: "Excel, CSV veya mevcut e-ticaret sisteminizin API'si üzerinden veri alınabilir. WooCommerce, Shopify ve özel sistemlerle entegrasyon mümkündür.",
      },
    ],
    cta: {
      text: "AI içerik otomasyonu projeniz için",
      href: "/ai-otomasyon-hizmeti",
      label: "AI Otomasyon Hizmeti",
    },
    ctaSecondary: {
      text: "Hazır AI araçlarını hemen deneyin",
      href: "https://ticarethub.com/yapay-zeka-icerik-motoru",
      label: "TicaretHub AI İçerik Motoru",
    },
    keywords: [
      "ai içerik otomasyonu",
      "yapay zeka içerik üretimi türkçe",
      "gpt-4o türkçe içerik",
      "ürün açıklama otomasyonu",
      "haber sitesi yapay zeka",
    ],
  },
  {
    slug: "istanbul-web-sitesi-fiyatlari",
    category: "web-sitesi",
    relatedSlugs: ["kurumsal-web-sitesi-fiyatlari", "web-sitesi-yaptirmak-istiyorum", "nextjs-mi-wordpress-mi"],
    title: "İstanbul'da Web Sitesi Fiyatları 2026 — Gerçekçi Rehber",
    metaTitle: "İstanbul'da Web Sitesi Fiyatları 2026 | Solman Digital",
    metaDescription:
      "İstanbul'da kurumsal web sitesi, e-ticaret ve SaaS proje fiyatları. Ajans, serbest geliştirici ve özel yazılım ofisi karşılaştırması. 2026 güncel rakamlar.",
    description:
      "İstanbul'da web sitesi yaptırmak isteyenler için gerçekçi fiyat aralıkları, ne etkiler, nasıl karşılaştırılır. Belirsiz tekliflere son.",
    summary:
      "İstanbul'da kurumsal web sitesi fiyatları 2026 itibarıyla 15.000 ₺ ile 120.000 ₺ arasında değişmektedir. Fiyatı belirleyen üç ana etken: projeyi kimin yaptığı (ajans, freelancer, yazılım ofisi), teknoloji seçimi (WordPress vs. Next.js) ve özellik kapsamıdır. Aynı kapsam için ajans teklifi ile yazılım ofisi teklifi arasında %40–60 fark olabilir.",
    publishDate: "2026-05-15",
    updatedDate: "2026-06-10",
    readTime: 8,
    sections: [
      {
        heading: "İstanbul'da Web Sitesi Fiyatları Neden Bu Kadar Farklı?",
        body: "Aynı iş için aldığınız teklifler 5.000 ₺ ile 150.000 ₺ arasında değişebilir. Bu fark kalite farkı değil; çalışma biçimi, overhead maliyeti ve teknoloji tercihinden kaynaklanır. Kim yaptığını anlamak, teklifi değerlendirmenin ilk adımıdır.",
      },
      {
        heading: "Teklif Türlerine Göre Fiyat Aralıkları (2025)",
        body: "İstanbul'da web sitesi yaptırmanın başlıca alternatifleri şunlardır:",
        list: [
          "Hazır şablon (Wix/Squarespace): 0–3.000 ₺/yıl — Küçük işletmeler için hızlı başlangıç, esneklik yok",
          "WordPress tema tabanlı: 5.000–15.000 ₺ — Uygun fiyat, özelleştirme sınırlı",
          "Serbest geliştirici (freelancer): 8.000–30.000 ₺ — Fiyat esnekliği var, deneyim değişken",
          "Küçük yazılım ofisi: 8.000–60.000 ₺ — Özel geliştirme, şeffaf iletişim",
          "Orta ölçekli ajans: 25.000–150.000 ₺+ — Yüksek overhead, çok katmanlı süreç",
        ],
      },
      {
        heading: "Proje Türüne Göre Beklentiler",
        body: "Fiyatı en çok etkileyen faktör, proje karmaşıklığıdır.",
        list: [
          "Kurumsal tanıtım sitesi (5-10 sayfa): 8.000–25.000 ₺, 5–10 iş günü",
          "Landing page: 5.000–12.000 ₺, 3–5 iş günü",
          "E-ticaret (ürün kataloğu + ödeme): 20.000–60.000 ₺, 10–20 iş günü",
          "Rezervasyon / randevu sistemi: 20.000–40.000 ₺, 2–4 hafta",
          "SaaS web uygulaması: 50.000–200.000 ₺+, 4–12 hafta",
        ],
      },
      {
        heading: "Fiyatı Etkileyen Başlıca Faktörler",
        body: "Bir teklif aldığınızda şu faktörlerin fiyatı nasıl etkilediğini göz önünde bulundurun:",
        list: [
          "Sayfa sayısı ve özellik kapsamı",
          "Ödeme entegrasyonu (İyzico, Stripe) eklenip eklenmediği",
          "API entegrasyonu gereksinimi (Trendyol, Hepsiburada vb.)",
          "Tasarımın sıfırdan mı yoksa şablondan mı yapıldığı",
          "İçerik yönetim sistemi (CMS) dahil olup olmadığı",
          "SEO teknik kurulumunun kapsamı",
          "Hosting ve bakım anlaşması",
        ],
      },
      {
        heading: "Kaliteli Bir Teklifin İşaretleri",
        body: "Proje kapsam belirsizse teklif güvenilir değildir. Güvenilir bir teklifte şunlar açıkça belirtilir: teslim tarihi, dahil olan özellikler listesi, kullanılacak teknoloji yığını, revizyon hakları, canlıya alma sonrası destek süresi.",
      },
    ],
    faq: [
      {
        q: "İstanbul'da en ucuz web sitesi nerede yaptırılır?",
        a: "Wix veya Squarespace gibi hazır platformlarda yıllık 2.000–3.000 ₺'ye başlanabilir. Özel gereksinimleri olmayan küçük tanıtım siteleri için bu yeterlidir. Ödeme altyapısı veya özel fonksiyon gerektiren projeler için özel geliştirme gereklidir.",
      },
      {
        q: "E-ticaret sitesi mi, Trendyol mağazası mı açmalıyım?",
        a: "İkisi birbirini dışlamaz. Trendyol hazır trafik sunar ama komisyon yüksek ve marka kontrolü sınırlıdır. Kendi e-ticaret siteniz uzun vadeli marka değeri oluşturur ve komisyonsuz satış sağlar. En iyi strateji ikisini birlikte yürütmektir.",
      },
      {
        q: "Web sitesi fiyatına hosting dahil mi?",
        a: "Genellikle hayır. Hosting (Vercel, AWS, shared hosting) ayrı maliyet oluşturur. Next.js projelerinde Vercel'in ücretsiz katmanı küçük–orta trafikli siteler için yeterlidir. Büyük trafik için ücretli plan gerekir.",
      },
    ],
    cta: {
      text: "Projeniz için net kapsam ve fiyat almak ister misiniz?",
      href: "/web-sitesi-yaptirmak",
      label: "Web Sitesi Yaptırma Hizmeti",
    },
    keywords: [
      "istanbul web sitesi fiyatları",
      "web sitesi yaptırma istanbul",
      "istanbul yazılım ofisi fiyat",
      "e-ticaret sitesi maliyeti türkiye",
    ],
  },
  {
    slug: "saas-mvp-sureci",
    category: "saas",
    relatedSlugs: ["saas-nedir-turkiye", "nextjs-avantajlari", "freelance-yazilimci-mi-ajans-mi"],
    title: "SaaS MVP Süreci: Türkiye'de Fikrinizi 6 Haftada Ürüne Dönüştürün",
    metaTitle: "SaaS MVP Süreci Türkiye | Solman Digital",
    metaDescription:
      "SaaS MVP nedir, nasıl planlanır, ne kadar sürer? Türkiye pazarına yönelik SaaS geliştirme sürecinin gerçekçi rehberi. Abonelik, çok kiracılı mimari ve fiyatlandırma.",
    description:
      "Fikrinizi minimum geliştirme süresinde, gerçek kullanıcıyla test edilebilir bir ürüne dönüştürmenin sistematik yolu.",
    summary:
      "SaaS MVP'yi sıfırdan 6 haftada piyasaya sürmek mümkündür: ilk 2 hafta kapsam tanımı ve tasarım, sonraki 4 hafta çekirdek geliştirme ve ilk kullanıcı testi. Türkiye pazarında SaaS fiyatlandırması aylık 99–499 ₺ arasında konumlandırılırken çok kiracılı (multi-tenant) mimari tercih edilmesi ölçekleme maliyetini önemli ölçüde düşürür.",
    publishDate: "2026-05-20",
    updatedDate: "2026-06-10",
    readTime: 9,
    sections: [
      {
        heading: "MVP Nedir ve Neden Önemlidir?",
        body: "MVP (Minimum Viable Product — Minimum Uygulanabilir Ürün), bir fikri doğrulamak için geliştirilen en küçük fonksiyonel versiyondur. Hedef: tam ürün geliştirmeden önce gerçek kullanıcı geri bildirimi almak. İstanbul ve Türkiye'de SaaS girişimleri için MVP; hem maliyet hem de zaman açısından en akılcı başlangıç noktasıdır.",
      },
      {
        heading: "SaaS MVP Kapsamı Nasıl Belirlenir?",
        body: "Kapsam belirleme, MVP sürecinin en kritik adımıdır. Çoğu girişimci fazla özellik istemek ister — bu en yaygın hatadır. Bir SaaS MVP için zorunlu olan şunlardır:",
        list: [
          "Kullanıcı kayıt ve giriş sistemi (Auth)",
          "Temel ürün fonksiyonu (çözülen tek problem)",
          "Ödeme altyapısı — Stripe veya İyzico",
          "Basit dashboard / yönetim arayüzü",
          "E-posta bildirimleri",
        ],
      },
      {
        heading: "Türkiye'de SaaS Mimarisi Seçimi",
        body: "Türkiye pazarına yönelik SaaS platformlarda teknik mimari seçimi maliyeti ve hızı doğrudan etkiler. Solman Digital'in standart SaaS yığını: Next.js (frontend + API), Supabase (PostgreSQL veritabanı, auth, gerçek zamanlı), Stripe veya İyzico (abonelik yönetimi), Vercel (hosting). Bu yığın ile orta ölçekli bir SaaS 4–8 hafta içinde canlıya alınabilir.",
      },
      {
        heading: "Çok Kiracılı Mimari (Multi-Tenant) Nedir?",
        body: "SaaS uygulamalarda farklı müşteriler aynı uygulamayı paylaşır ancak birbirlerinin verilerini göremez. Bu yapıya 'çok kiracılı mimari' denir. Supabase'in Row Level Security (RLS) özelliği bu yapıyı güvenli ve ölçeklenebilir kılar. QR Menü SaaS ve rezervasyon sistemleri bu mimariyle geliştirilmiştir.",
      },
      {
        heading: "SaaS MVP Geliştirme Takvimi",
        body: "Gerçekçi bir SaaS MVP takvimi şu aşamaları kapsar:",
        list: [
          "Hafta 1: Kapsam, mimari kararlar, veritabanı şeması",
          "Hafta 2–3: Auth, temel özellik geliştirme, ödeme entegrasyonu",
          "Hafta 4: Dashboard, admin paneli, test",
          "Hafta 5: Beta kullanıcı testi, hata düzeltme",
          "Hafta 6: Canlıya alma, ilk müşteri onboarding",
        ],
      },
      {
        heading: "SaaS MVP Maliyeti",
        body: "Türkiye'de özel yazılım ofisiyle geliştirilen bir SaaS MVP 50.000 ₺'den başlamaktadır. Bu rakam; sıfırdan özel geliştirme, çok kiracılı mimari, abonelik sistemi ve temel dashboard'u kapsar. No-code araçlarla (Bubble, Webflow) 20.000–30.000 ₺'ye inebilir ancak ölçeklenebilirlik ve özelleştirme sınırlı kalır.",
      },
    ],
    faq: [
      {
        q: "SaaS MVP ne kadar sürede teslim edilir?",
        a: "Kapsama bağlı olarak 4–8 hafta gerçekçi bir hedeftir. Çok sınırlı fonksiyonlu bir MVP 3 haftada çıkabilir; karmaşık iş mantığı olan bir sistem 10–12 hafta sürebilir.",
      },
      {
        q: "MVP'den sonra ürünü nasıl büyütebilirim?",
        a: "İlk MVP canlıya alındıktan sonra kullanıcı geri bildirimi toplanır, öncelik sıralaması güncellenir ve iterasyonlar yapılır. İyi bir mimari, yeni özellik eklemeyi kolaylaştırır. Supabase ve Next.js yığını bu büyümeye uygundur.",
      },
      {
        q: "İyzico mu Stripe mi kullanmalıyım?",
        a: "Türk kartlarından ödeme alacaksanız İyzico zorunludur. Uluslararası müşteriniz varsa Stripe gerekir. İkisini birlikte kullanmak mümkündür.",
      },
    ],
    cta: {
      text: "SaaS fikrinizi ürüne dönüştürmek için",
      href: "/saas-platform-gelistirme",
      label: "SaaS Platform Geliştirme",
    },
    keywords: [
      "saas mvp türkiye",
      "saas geliştirme istanbul",
      "mvp geliştirme süreci",
      "supabase next.js saas",
      "çok kiracılı mimari",
    ],
  },
  {
    slug: "nextjs-mi-wordpress-mi",
    category: "karsilastirma",
    title: "Next.js mi WordPress mi? Projenize Uygun Teknolojiyi Seçin",
    metaTitle: "Next.js mi WordPress mi? | Solman Digital",
    metaDescription:
      "Next.js ve WordPress arasında fark nedir? Hangi proje için hangisi doğru seçimdir? Gerçek proje deneyimiyle hazırlanmış karşılaştırma rehberi.",
    description:
      "Her projeye Next.js gerekmez, her projeye WordPress yetmez. Doğru teknolojiyi seçmenin sistematik yolu.",
    summary:
      "İçerik ağırlıklı bloglar ve basit kurumsal siteler için WordPress hâlâ güçlü bir seçimdir; ancak e-ticaret, SaaS veya yüksek performans gerektiren projelerde Next.js açık ara üstündür. Temel kural: özelleştirilmiş işlevsellik veya SEO performansı öncelikliyse Next.js, hızlı içerik yönetimi ve eklenti ekosistemi öncelikliyse WordPress tercih edilir.",
    publishDate: "2026-05-25",
    updatedDate: "2026-06-10",
    readTime: 7,
    sections: [
      {
        heading: "Neden Bu Karşılaştırma Önemli?",
        body: "WordPress dünya genelinde web sitelerinin %43'ünü çalıştırır. Next.js ise React ekosisteminin öne çıkan full-stack framework'üdür. İkisi de güçlü ve yerleşik teknolojilerdir — ama farklı kullanım senaryoları için optimize edilmiştir. Yanlış seçim; hem geliştirme maliyetini artırır hem de uzun vadede bakım yükü yaratır.",
      },
      {
        heading: "WordPress Ne Zaman Doğru Seçimdir?",
        body: "WordPress, içerik odaklı siteler için hâlâ en güçlü seçeneklerden biridir.",
        list: [
          "Blog ve haber siteleri — Gutenberg editörü yeterlidir",
          "Küçük kurumsal tanıtım siteleri — hazır tema + sayfa düzenleyici",
          "WooCommerce tabanlı basit e-ticaret — ürün sayısı az, özel iş mantığı yok",
          "İçerik ekibinin kendi kendine güncelleme yapacağı siteler",
          "Bütçe kısıtlı, hızlı çıkış gerektiren projeler",
        ],
      },
      {
        heading: "Next.js Ne Zaman Doğru Seçimdir?",
        body: "Next.js, performans, ölçeklenebilirlik ve özel iş mantığı gerektiren projelerde WordPress'e açık fark atar.",
        list: [
          "Yüksek trafik e-ticaret siteleri — Server-Side Rendering ile hız",
          "API entegrasyonları — Trendyol, Hepsiburada, İyzico",
          "SaaS uygulamaları — kullanıcı yönetimi, çok kiracılı mimari",
          "Dashboard ve analitik paneller — gerçek zamanlı veri",
          "AI entegrasyonları — OpenAI, Claude API",
          "Özel iş mantığı gerektiren her proje",
        ],
      },
      {
        heading: "Performans Karşılaştırması",
        body: "Next.js, Google PageSpeed skorlarında WordPress'e genellikle üstün gelir. Next.js projeleri Vercel CDN üzerinde saniyenin altında yükleme süresine ulaşırken, eklentilerle dolmuş bir WordPress sitesi yükleme sürelerinde ciddi sorunlar yaşar. E-ticaret ve SaaS için performans doğrudan dönüşüm oranını etkiler.",
      },
      {
        heading: "Maliyet Karşılaştırması",
        body: "WordPress tema tabanlı projeler başlangıçta daha ucuzdur ancak uzun vadede eklenti lisansları, hosting gereksinimleri ve güvenlik güncellemeleri maliyeti artırır. Next.js projeler başlangıçta daha yüksek geliştirme maliyeti taşır ancak Vercel'in ücretsiz katmanı ve düşük bakım yükü uzun vadede dengelenir.",
      },
      {
        heading: "Hangi Durumda İkisini Birlikte Kullanabilirsiniz?",
        body: "Headless WordPress mimarisi, içerik yönetimini WordPress ile tutarken frontend'i Next.js ile geliştirir. Bu yaklaşım; içerik ekibine alışık oldukları WordPress arayüzünü sunarken teknik performans ve esnekliği korur. Haber ve içerik platformları için ideal bir seçenektir.",
      },
    ],
    faq: [
      {
        q: "WordPress'ten Next.js'e geçiş yapılabilir mi?",
        a: "Evet. Mevcut içeriğinizi WordPress'ten alarak Next.js tabanlı yeni siteye aktarmak mümkündür. Ya da headless WordPress mimarisine geçerek WordPress'i CMS olarak kullanmaya devam edebilirsiniz.",
      },
      {
        q: "Next.js SEO için iyi mi?",
        a: "Evet, hatta WordPress'ten birçok açıdan üstündür. Server-Side Rendering sayesinde Google'ın içeriği görüp endekslemesi daha kolaydır. PageSpeed skoru, Core Web Vitals metrikleri ve teknik SEO esnekliği Next.js'in avantajlarıdır.",
      },
      {
        q: "WooCommerce mi, özel e-ticaret mi?",
        a: "100'den az ürün ve standart sipariş akışı için WooCommerce yeterlidir. Özel indirim mantığı, API entegrasyonu (Trendyol, Hepsiburada), toptan sipariş veya binlerce ürün varsa özel geliştirme daha doğrudur.",
      },
    ],
    cta: {
      text: "Projeniz için hangi teknoloji doğru — beraber belirleyelim",
      href: "/web-sitesi-yaptirmak",
      label: "Web Sitesi Yaptırma Hizmeti",
    },
    keywords: [
      "next.js mi wordpress mi",
      "nextjs vs wordpress",
      "wordpress alternatifi türkiye",
      "next.js e-ticaret türkiye",
    ],
  },
  {
    slug: "iyzico-entegrasyonu",
    category: "e-ticaret",
    title: "İyzico Entegrasyonu: Web Sitenize Türk Kartı Desteği Nasıl Eklenir?",
    metaTitle: "İyzico Entegrasyonu Nasıl Yapılır? | Solman Digital",
    metaDescription:
      "İyzico ödeme entegrasyonu adımları, API kurulumu, test ortamı ve canlıya geçiş. Türkiye'deki e-ticaret projeleri için kapsamlı İyzico rehberi.",
    description:
      "Türkiye'de online ödeme almanın standart yolu İyzico. Entegrasyon sürecini, teknik gereksinimleri ve sık karşılaşılan sorunları gerçek proje deneyimiyle aktarıyoruz.",
    summary:
      "İyzico entegrasyonu 3 aşamadan oluşur: sandbox hesabı açıp API anahtarı almak (1 gün), ödeme akışını test ortamında kurmak (2–4 gün), canlı hesap onayı ve yayına geçiş (3–5 iş günü). Türkiye'deki e-ticaret projelerinin büyük çoğunluğunda İyzico, yerel kart uyumluluğu ve 3D Secure desteği nedeniyle standart tercih olmaktadır.",
    publishDate: "2026-06-01",
    updatedDate: "2026-06-10",
    readTime: 7,
    sections: [
      {
        heading: "İyzico Nedir ve Neden Önemlidir?",
        body: "İyzico, Türkiye'nin lider online ödeme altyapısıdır. Türk bankaları tarafından ihraç edilen kartların büyük çoğunluğuyla uyumludur ve 3D Secure desteği sunar. E-ticaret sitesi kuran her Türk girişimcinin gündeminde olan soru şudur: İyzico mu, Stripe mi? Türk kartlarından sorunsuz ödeme almak istiyorsanız İyzico zorunludur.",
      },
      {
        heading: "İyzico Entegrasyonu İçin Gerekenler",
        body: "Entegrasyona başlamadan önce hazır olması gereken belgeler ve hesaplar:",
        list: [
          "İyzico merchant hesabı (iyzico.com üzerinden başvuru, onay 1–3 iş günü)",
          "Vergi levhası ve ticaret sicil belgesi (bireysel ya da kurumsal)",
          "SSL sertifikası zorunlu — https olmayan site onaylanmaz",
          "API Key ve Secret Key (merchant panelinden alınır)",
          "Test ortamı için ayrı sandbox API anahtarları",
        ],
      },
      {
        heading: "Teknik Entegrasyon Adımları",
        body: "Next.js tabanlı projelerde İyzico entegrasyonu şu adımları izler:",
        list: [
          "iyzipay Node.js paketi kurulumu: npm install iyzipay",
          "API endpoint oluşturma: /api/payment/checkout — server-side çalışır, API anahtarları client'a açılmaz",
          "Checkout form token alınması (Initialize Payment isteği)",
          "İyzico form HTML'inin sayfaya render edilmesi",
          "Callback URL'de ödeme sonucunun doğrulanması (Retrieve Payment)",
          "Sipariş durumunun veritabanında güncellenmesi",
        ],
      },
      {
        heading: "Test Ortamı ve Canlıya Geçiş",
        body: "İyzico sandbox ortamı gerçek kart numaralarını simüle eder. Geliştirme sürecinde tüm ödeme senaryoları (başarılı, başarısız, 3D Secure) test edilmelidir. Canlıya geçiş için merchant panel üzerinden 'production' API anahtarları alınır ve ortam değişkenleri güncellenir. İyzico'nun review süreci ortalama 2–3 iş günü sürer.",
      },
      {
        heading: "Stripe ile Birlikte Kullanım",
        body: "Uluslararası müşteriniz varsa veya yabancı kart desteği gerekiyorsa İyzico tek başına yeterli değildir. Bu durumda Stripe + İyzico hibrit yapı kurulur: Türk kartları İyzico'ya, diğerleri Stripe'a yönlendirilir. Kart tipine göre otomatik yönlendirme, ödeme sayfasına müşteri deneyimini bozmadan entegre edilebilir.",
      },
      {
        heading: "Sık Karşılaşılan Sorunlar",
        body: "Gerçek projelerde en çok karşılaştığımız İyzico entegrasyon sorunları:",
        list: [
          "Callback URL ayarı eksik — ödeme sonucu sitenize ulaşmaz",
          "SSL sertifikası geçersiz veya self-signed — İyzico bağlantıyı reddeder",
          "API anahtarları production/sandbox karışıklığı",
          "3D Secure sonrası sipariş durumu güncellenmemesi",
          "Abonelik (recurring payment) için ayrı İyzico Subscription API entegrasyonu gerekir",
        ],
      },
    ],
    faq: [
      {
        q: "İyzico entegrasyonu ne kadar sürer?",
        a: "Deneyimli bir geliştiriciyle 3–7 iş günü yeterlidir. Hesap onay süresi (1–3 gün) bu süreye dahildir. Abonelik sistemi veya özel ödeme akışı eklenecekse 1–2 hafta öngörülür.",
      },
      {
        q: "İyzico komisyon oranları nedir?",
        a: "İyzico komisyon oranları ciro ve sözleşme türüne göre değişir. Standart oranlar %2–3 aralığındadır. Güncel oranlar için iyzico.com'un fiyatlandırma sayfasına bakılmalıdır.",
      },
      {
        q: "Mevcut web sitemine İyzico eklenebilir mi?",
        a: "Evet. WordPress/WooCommerce, Next.js veya özel geliştirme ne olursa olsun İyzico entegrasyonu mevcut siteye eklenebilir. Gereksinim: backend API geliştirme imkânı ve SSL.",
      },
    ],
    cta: {
      text: "İyzico entegrasyonu veya ödeme altyapısı için",
      href: "/hizmetler/odeme-entegrasyonu",
      label: "Ödeme Entegrasyonu Hizmeti",
    },
    keywords: [
      "iyzico entegrasyonu",
      "iyzico next.js",
      "iyzico api kurulumu",
      "türkiye online ödeme entegrasyonu",
      "iyzico web sitesi ekleme",
    ],
  },
  {
    slug: "eticaret-sitesi-acmak-turkiye",
    category: "e-ticaret",
    relatedSlugs: ["iyzico-entegrasyonu", "shopify-alternatifi-turkiye", "woocommerce-vs-nextjs-eticaret"],
    title: "Türkiye'de E-Ticaret Sitesi Açmak: Yasal, Teknik ve Pazarlama Adımları",
    metaTitle: "Türkiye'de E-Ticaret Sitesi Açmak | Solman Digital",
    metaDescription:
      "Türkiye'de e-ticaret sitesi açmak için gereken yasal belgeler, teknik altyapı ve pazarlama adımları. Başlangıçtan canlıya kadar kapsamlı rehber.",
    description:
      "Türkiye'de online satış yapmak isteyenler için vergi kaydından teknik altyapıya, ödeme sisteminden Google'da görünürlüğe kadar tüm adımlar.",
    summary:
      "Türkiye'de e-ticaret sitesi açmak için önce vergi levhası ve e-ticaret sözleşmesi gerekmektedir. Teknik altyapıda İyzico veya PayTR ile ödeme entegrasyonu zorunlu, SSL sertifikası ve KVKK uyumu şarttır. Hazır platform (Shopify/Ticimax) ile 1–2 haftada, özel yazılımla 3–6 haftada canlıya geçmek mümkündür.",
    publishDate: "2026-06-05",
    updatedDate: "2026-06-10",
    readTime: 9,
    sections: [
      {
        heading: "Türkiye'de E-Ticaret İçin Yasal Gereksinimler",
        body: "Türkiye'de online satış yapabilmek için bazı yasal adımlar zorunludur. Bu adımları atlamak vergi cezası ve platform kapanma riskini beraberinde getirir.",
        list: [
          "Vergi levhası: Gerçek kişi ya da şirket olarak vergi mükellefi olmak zorunlu",
          "Esnaf muaflığı: Yıllık belirli bir ciro altındakiler esnaf muaflığından yararlanabilir",
          "MERSİS kaydı: Şirket kurulumu için Merkezi Sicil Kayıt Sistemi'ne kayıt",
          "ETBIS kaydı: Elektronik Ticaret Bilgi Sistemi — Türkiye'de e-ticaret yapanlar için zorunlu",
          "Mesafeli satış sözleşmesi: Yasal zorunluluk, her e-ticaret sitesinde bulunmalı",
          "Kişisel verilerin korunması (KVKK): Gizlilik politikası ve açık rıza metni gerekli",
        ],
      },
      {
        heading: "Teknik Altyapı Seçimi",
        body: "E-ticaret sitesi için doğru teknik altyapı seçimi uzun vadeli maliyeti ve esnekliği belirler.",
        list: [
          "Hazır platform (Shopify, İdeasoft, Ticimax): Hızlı başlangıç, kısıtlı özelleştirme, aylık abonelik",
          "WooCommerce (WordPress): Düşük başlangıç maliyeti, eklenti bağımlılığı, güvenlik yükü",
          "Özel Next.js geliştirme: Tam kontrol, yüksek performans, API entegrasyonu için ideal",
          "Alan adı: .com.tr uzantısı Türk pazar için tercih edilir",
          "Hosting: Vercel veya bulut altyapı (AWS Türkiye bölgesi hız için önemli)",
          "SSL sertifikası: Ödeme almak için zorunlu",
        ],
      },
      {
        heading: "Ödeme Altyapısı",
        body: "Türkiye'de online ödeme almak için ödeme aracı kuruluşu (ÖAK) lisanslı bir hizmet gerekmektedir.",
        list: [
          "İyzico: Türk kartları için standart, 1–3 günde onay",
          "Stripe: Uluslararası kartlar ve dövizli ödemeler",
          "PayTR: Alternatif Türk ödeme altyapısı",
          "Kapıda ödeme: Taşıyıcı firma anlaşması gerektirir",
          "Banka POS entegrasyonu: Büyük hacimli işlemler için doğrudan banka anlaşması",
        ],
      },
      {
        heading: "Ürün ve Stok Yönetimi",
        body: "E-ticaret sitesinin operasyonel omurgası stok ve ürün yönetimidir. Başlangıç için basit bir veritabanı yeterlidir; büyürken Trendyol veya Hepsiburada kanalıyla senkronize çalışan çok kanallı bir yapıya geçilebilir.",
      },
      {
        heading: "Google'da Görünürlük: SEO ve Reklamlar",
        body: "E-ticaret sitesi kurmak yeterli değildir — ziyaretçi getirmek asıl iş. Türkiye e-ticaret trafiğinin iki ana kaynağı Google organik arama ve ücretli reklamlardır.",
        list: [
          "Ürün sayfalarında teknik SEO: başlık, meta açıklama, Schema.org Product işaretlemesi",
          "Google Shopping entegrasyonu (Merchant Center — ürün feed'i)",
          "Google Ads Search kampanyaları — yüksek niyet aramalar",
          "Meta Ads (Instagram/Facebook) — görsel ürünler için",
          "İçerik pazarlaması: rehber ve blog ile organik trafik",
        ],
      },
      {
        heading: "Trendyol veya Hepsiburada ile Birlikte Çalışmak",
        body: "Kendi e-ticaret sitesi açmak Trendyol'u terk etmek anlamına gelmez. API entegrasyonuyla stok ve siparişler iki kanalda senkronize tutulabilir. Platform komisyonunu azaltmak için müşterileri yavaş yavaş kendi kanalınıza çekmek uzun vadeli stratejidir.",
      },
    ],
    faq: [
      {
        q: "ETBIS kaydı zorunlu mu?",
        a: "Evet. Türkiye'de e-ticaret yapan tüm işletmeler için Elektronik Ticaret Bilgi Sistemi (ETBIS) kaydı yasal zorunluluktur. Kayıt ücretsizdir ve etbis.eticaret.gov.tr üzerinden yapılır.",
      },
      {
        q: "E-ticaret sitesi açmak ne kadar tutar?",
        a: "Hazır platform (Shopify/Ticimax): 1.500–3.000 ₺/ay. WooCommerce: 5.000–15.000 ₺ kurulum + hosting. Özel Next.js geliştirme: 20.000 ₺'den başlar. Kapsama göre kesin fiyat ücretsiz görüşmede belirlenir.",
      },
      {
        q: "Şirket kurmadan e-ticaret yapılabilir mi?",
        a: "Belirli bir ciro limitinin altında esnaf muaflığıyla başlanabilir. Ancak ciro büyüdükçe şirketleşmek vergisel açıdan zorunlu hale gelir. Muhasebeci danışmanlığı alınması önerilir.",
      },
    ],
    cta: {
      text: "E-ticaret sitenizi sıfırdan kurmak için",
      href: "/istanbul-e-ticaret-yazilim",
      label: "E-Ticaret Yazılım Hizmeti",
    },
    keywords: [
      "türkiye e-ticaret sitesi açmak",
      "online satış türkiye yasal",
      "etbis kaydı nedir",
      "e-ticaret kurulumu istanbul",
      "türkiye'de e-ticaret nasıl yapılır",
    ],
  },
  {
    slug: "ai-chatbot-web-sitesi",
    category: "yapay-zeka",
    title: "Web Sitenize AI Chatbot Entegrasyonu: Ne Zaman, Nasıl ve Hangi Teknolojiyle?",
    metaTitle: "Web Sitesi AI Chatbot Entegrasyonu | Solman Digital",
    metaDescription:
      "Web sitenize müşteri hizmetleri chatbotu entegre etmek için doğru teknoloji, maliyet ve süreç rehberi. ChatGPT API ile özel chatbot nasıl kurulur?",
    description:
      "Her web sitesi chatbota ihtiyaç duymaz — ama ihtiyaç duyduğunda doğru yapılmazsa hem para hem müşteri kaybettirir. Gerçek proje deneyimiyle hazırlanmış rehber.",
    summary:
      "Web sitesi AI chatbotu üç kategoriye ayrılır: hazır widget (Intercom, Tidio — aylık 30–100$), yarı özel GPT tabanlı (ChatGPT API + özel prompt — 3–5 gün kurulum), tam özel RAG chatbot (kendi verilerinizle — 3–6 hafta). Chatbot yatırımı ancak günde 20+ tekrarlayan müşteri sorusu olan sitelerde karşılığını verir.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 8,
    sections: [
      {
        heading: "Hangi Web Sitesi Chatbota İhtiyaç Duyar?",
        body: "Chatbot her siteye uygun değildir. Aşağıdaki durumlardan biri geçerliyse chatbot entegrasyonu değer yaratır:",
        list: [
          "Müşteri hizmetlerine gelen soruların %60'ından fazlası tekrarlayan sorular",
          "Çalışma saatleri dışında (akşam / hafta sonu) soru gelen siteler",
          "Ürün kataloğu geniş ve müşteriler 'hangisini almalıyım' diye soruyor",
          "Rezervasyon veya randevu akışını chatbot üzerinden otomatize etmek isteniyor",
          "Çok dilli müşteri kitlesi — chatbot anında çeviri yapabilir",
        ],
      },
      {
        heading: "Chatbot Türleri: Kural Tabanlı mı, AI mı?",
        body: "İki temel chatbot yaklaşımı vardır. Kural tabanlı (if/else) botlar belirli komutlara yanıt verir; AI tabanlı botlar doğal dili anlar ve öğrenir.",
        list: [
          "Kural tabanlı: Hızlı, öngörülebilir, ucuz. SSS yanıtlama için ideal",
          "AI tabanlı (GPT-4o / Claude): Doğal konuşma, bağlama göre yanıt, karmaşık sorular için uygun",
          "Hibrit: Basit sorular kural tabanlı, karmaşık sorular AI'ya yönlendirme",
        ],
      },
      {
        heading: "Özel Bilgi Tabanıyla Çalışan Chatbot (RAG)",
        body: "Genel bir AI modeli şirketinizin ürünlerini, hizmetlerini veya politikalarını bilmez. Gerçek değer yaratan chatbot, kendi belgelerinizle eğitilmiş olandır. Bu yapıya RAG (Retrieval-Augmented Generation) denir: ChatGPT API'si, sizin veritabanınızdan anlık bilgi çekerek yanıt üretir.",
        list: [
          "Ürün kataloğunuz, SSS sayfanız ve politika belgeleriniz vektör veritabanına yüklenir",
          "Kullanıcı soru sorduğunda ilgili belgeler anlık alınır",
          "GPT-4o bu belgelere dayanarak yanıt üretir — 'halüsinasyon' riski azalır",
          "Yeni içerik eklendiğinde veritabanı güncellenir, model yeniden eğitilmez",
        ],
      },
      {
        heading: "Teknik Kurulum: Next.js ile AI Chatbot",
        body: "Next.js tabanlı web sitelerinde OpenAI API entegrasyonuyla çalışan chatbot şu bileşenlerden oluşur:",
        list: [
          "Frontend: Floating chat widget — React component, Tailwind ile stillendirme",
          "Backend API: /api/chat endpoint — OpenAI SDK, stream response desteği",
          "Vektör veritabanı: Supabase pgvector veya Pinecone — bilgi tabanı depolama",
          "Oturum yönetimi: Konuşma geçmişi context window'a eklenir",
          "Rate limiting: Kötüye kullanımı önlemek için API çağrısı sınırlaması",
        ],
      },
      {
        heading: "Maliyet Analizi",
        body: "AI chatbot maliyeti iki bileşenden oluşur: geliştirme maliyeti ve aylık API kullanım maliyeti. GPT-4o-mini modeli düşük maliyetli ve yüksek kaliteli bir seçenektir. Günde 100 konuşma için aylık OpenAI maliyeti genellikle 20–50 USD aralığında kalır. GPT-4o kullanıldığında bu maliyet 3–5x artar.",
      },
      {
        heading: "Gerçek Proje Örneği",
        body: "Solman Digital, bir e-ticaret müşterisi için ürün önerme chatbotu geliştirdi. Chatbot; 2.000'den fazla ürün kataloğunu okuyarak müşterilerin 'hangi ürün bana uygun' sorusunu yanıtlıyor. Müşteri hizmetleri yükü %40 azaldı, chatbot çalışma saatleri dışındaki sorularda dönüşüm oranını artırdı.",
      },
    ],
    faq: [
      {
        q: "AI chatbot web sitesine entegrasyonu ne kadar sürer?",
        a: "Basit SSS chatbotu 1 haftada, RAG tabanlı özel bilgi tabanıyla çalışan chatbot 2–3 haftada tamamlanır. Rezervasyon veya ödeme akışıyla entegre chatbotlar 3–4 hafta sürer.",
      },
      {
        q: "ChatGPT'yi doğrudan web siteme ekleyebilir miyim?",
        a: "ChatGPT arayüzünü doğrudan gömmek mümkün değildir, ancak OpenAI API'si kullanılarak tamamen özelleştirilmiş bir chatbot geliştirilebilir. Bu yöntem hem marka sesini korur hem de şirket verilerinizle eğitilebilir.",
      },
      {
        q: "Chatbot hangi dilleri konuşabilir?",
        a: "GPT-4o Türkçe dahil 50'den fazla dilde yüksek kalitede yanıt verir. Tek bir chatbot hem Türkçe hem İngilizce hem de diğer dillerde eş zamanlı hizmet verebilir.",
      },
    ],
    cta: {
      text: "Web sitenize AI chatbot entegrasyonu için",
      href: "/ai-otomasyon-hizmeti",
      label: "AI Otomasyon Hizmeti",
    },
    ctaSecondary: {
      text: "E-ticaret AI araçlarını ücretsiz deneyin",
      href: "https://ticarethub.com/ucretsiz-yapay-zeka-e-ticaret",
      label: "TicaretHub Ücretsiz AI Araçları",
    },
    keywords: [
      "web sitesi ai chatbot entegrasyonu",
      "chatgpt api türkiye",
      "özel chatbot geliştirme istanbul",
      "rag chatbot türkçe",
      "müşteri hizmetleri chatbotu",
    ],
  },
  {
    slug: "hepsiburada-api-entegrasyonu",
    category: "e-ticaret",
    title: "Hepsiburada API Entegrasyonu: Satıcılar İçin Teknik Rehber",
    metaTitle: "Hepsiburada API Entegrasyonu | Solman Digital",
    metaDescription:
      "Hepsiburada Marketplace API ile stok senkronizasyonu, sipariş yönetimi ve fiyat güncellemesi. Satıcılar için adım adım teknik rehber.",
    description:
      "Hepsiburada'da satış yapıyorsanız ve operasyonel yükü azaltmak istiyorsanız API entegrasyonu kritik bir adımdır. Gerçek proje deneyimiyle hazırlanmış teknik rehber.",
    summary:
      "Hepsiburada Marketplace API, OAuth 2.0 kimlik doğrulaması ile çalışır ve stok, fiyat, sipariş ve kargo takibini otomatize eder. Temel entegrasyon 5–8 iş günü içinde tamamlanır; çift yönlü stok senkronizasyonu için webhook yapılandırması gereklidir. 500+ SKU'yu olan satıcılar için API entegrasyonu operasyonel hatayı %80 oranında azaltır.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 7,
    sections: [
      {
        heading: "Hepsiburada API Nedir?",
        body: "Hepsiburada Marketplace API, satıcıların ürün, stok, sipariş ve fiyat verilerini kendi yazılımlarından yönetmelerine olanak tanıyan programatik bir arayüzdür. Manuel panel girişi yerine tüm işlemler otomatik gerçekleşir. Hem tek satıcı hem de çok kanallı (Trendyol + Hepsiburada) operasyonlar için idealdir.",
      },
      {
        heading: "API Erişim Koşulları",
        body: "Hepsiburada API'sine erişim için bazı ön koşullar vardır:",
        list: [
          "Aktif Hepsiburada merchant hesabı",
          "Merchant ID ve API anahtarı (merchant panel > API Yönetimi)",
          "Minimum stok / satış hacmi eşiği (Hepsiburada onay sürecine tabidir)",
          "Teknik entegrasyon belgesi imzalanması",
        ],
      },
      {
        heading: "Temel API Fonksiyonları",
        body: "Hepsiburada API'sinin en çok kullanılan uç noktaları şunlardır:",
        list: [
          "Ürün listeleme: Yeni ürün ekle, mevcut ürün güncelle",
          "Stok güncelleme: Anlık stok miktarı güncellemesi",
          "Fiyat güncelleme: Toplu veya tekil fiyat değişikliği",
          "Sipariş çekme: Yeni siparişleri otomatik al",
          "Kargo güncelleme: Takip numarası ve kargo firması bildirimi",
          "İptal/İade yönetimi: İade taleplerini programatik işle",
        ],
      },
      {
        heading: "Trendyol + Hepsiburada Çift Kanal Entegrasyonu",
        body: "Türkiye'deki büyük e-ticaret satıcılarının önemli bir kısmı hem Trendyol hem Hepsiburada'da satış yapar. Bu iki kanalın stok ve siparişlerini elle yönetmek yüksek hata riskine yol açar. Solman Digital tarafından geliştirilen çift kanal panel; iki platformu tek arayüzden yönetir, stok aşım riskini ortadan kaldırır ve sipariş fulfillment sürecini otomatize eder.",
      },
      {
        heading: "Teknik Mimari",
        body: "Hepsiburada API entegrasyonu genellikle şu bileşenlerden oluşur:",
        list: [
          "Next.js API route veya Node.js servisi — API çağrılarını yönetir",
          "Cron job (scheduled job) — stok ve fiyat güncelleme döngüsü (15 dk'da bir)",
          "PostgreSQL veritabanı (Supabase) — sipariş ve stok geçmişi",
          "Webhook endpoint — Hepsiburada'dan anlık sipariş bildirimi",
          "Hata yönetimi ve yeniden deneme (retry) mekanizması",
        ],
      },
      {
        heading: "Sık Karşılaşılan Sorunlar",
        body: "Entegrasyonlarda en çok karşılaştığımız teknik problemler:",
        list: [
          "Rate limiting: API çağrı limitleri aşıldığında 429 hatası — istek kuyruğu gerekli",
          "Ürün eşleştirme: Kendi veritabanı ile Hepsiburada ürün ID'lerinin tutarlı tutulması",
          "Stok negatife düşme: Eş zamanlı sipariş durumunda koruma mekanizması şart",
          "Token yenileme: API token süresi dolduğunda otomatik yenileme",
        ],
      },
    ],
    faq: [
      {
        q: "Hepsiburada API entegrasyonu ne kadar sürer?",
        a: "Temel entegrasyon (stok + sipariş) 5–7 iş günü. Trendyol ile çift kanal panel dahil kapsamlı bir çözüm 2–3 haftada tamamlanır.",
      },
      {
        q: "Hepsiburada API ücretsiz mi?",
        a: "API erişimi ücretli değildir; merchant hesabı olan satıcılar Hepsiburada onay sürecinden geçtikten sonra ücretsiz kullanabilir.",
      },
      {
        q: "Trendyol ve Hepsiburada entegrasyonunu aynı sistemde yapabilir misiniz?",
        a: "Evet. Solman Digital'in tamamladığı referans projelerden biri, iki pazaryerini tek panelde birleştiren çift kanal yönetim sistemidir. Stok, sipariş ve fiyat senkronizasyonu her iki platformda anlık çalışır.",
      },
    ],
    cta: {
      text: "Hepsiburada veya çift kanal API entegrasyonu için",
      href: "/trendyol-entegrasyonu",
      label: "Marketplace Entegrasyon Hizmeti",
    },
    keywords: [
      "hepsiburada api entegrasyonu",
      "hepsiburada satıcı api",
      "trendyol hepsiburada çift kanal",
      "marketplace api türkiye",
      "hepsiburada stok senkronizasyonu",
    ],
  },
  {
    slug: "freelance-yazilimci-mi-ajans-mi",
    title: "Freelance Yazılımcı mı, Ajans mı? 2025'te Doğru Seçim",
    metaTitle: "Freelance Yazılımcı mı Ajans mı? Doğru Seçim Rehberi | Solman Digital",
    metaDescription:
      "Yazılım projeniz için freelance yazılımcı mı yoksa ajans mı tercih etmelisiniz? Maliyet, güvenilirlik ve proje yönetimi karşılaştırması — gerçek deneyimle.",
    description:
      "Proje başlangıcında alınan bu karar sonuçları büyük ölçüde belirler. Fiyat, güvenilirlik ve iletişim açısından hangi modelin hangi projeye uygun olduğunu karşılaştırdık.",
    publishDate: "2026-06-01",
    readTime: 6,
    sections: [
      {
        heading: "Temel Fark: Kim Sorumlu?",
        body: "Freelance yazılımcı ile ajans arasındaki en kritik fark sorumluluk yapısıdır. Freelancer'da tek kişi hem geliştirme hem iletişim hem teslimatı üstlenir. Ajansda bu sorumluluk dağılır — bazen bu avantaj, bazen dezavantaj olur.",
      },
      {
        heading: "Freelance Yazılımcının Avantajları ve Riskleri",
        body: "Freelancer çalışmak hız ve maliyet açısından cazip görünür.",
        list: [
          "✅ Doğrudan iletişim — e-posta veya WhatsApp ile anında ulaşabilirsiniz",
          "✅ Ajans overhead maliyeti yok — genellikle daha düşük fiyat",
          "✅ Küçük ve net kapsamlı projeler için ideal",
          "❌ Başka iş alabilir — takvim kayabilir",
          "❌ Hastalık, tatil veya vefat durumunda proje sahipsiz kalır",
          "❌ Deneyim ve kalite düzeyi CV'yi okumadan bilinmez",
          "❌ Yasal güvence sınırlı — sözleşme genellikle yok",
        ],
      },
      {
        heading: "Ajansın Avantajları ve Riskleri",
        body: "Ajanslar kurumsal projelerin ihtiyaçlarına yanıt verecek şekilde yapılanmıştır.",
        list: [
          "✅ Yedekleme kaynağı var — biri çıkarsa başkası devralır",
          "✅ Sözleşme, e-fatura, kurumsal güvence",
          "✅ Büyük ve uzun vadeli projeler için uygun yapı",
          "❌ Overhead maliyeti yüksek — gerçek maliyetin 2–3 katı fiyatlandırma",
          "❌ Account manager katmanı — projeyi anlatan ile yapan farklı kişi",
          "❌ Küçük projeler ajansın öncelik listesine girmeyebilir",
          "❌ İletişim süreci yavaşlar, revizyon döngüleri uzar",
        ],
      },
      {
        heading: "Üçüncü Model: Özel Yazılım Ofisi",
        body: "Freelancer ile ajans arasındaki boşluğu dolduran bir model vardır: küçük ve uzmanlaşmış yazılım ofisi. Bu modelde tek bir uzman projenin tamamına sahip çıkar ancak iş süreçleri ajans standardında kurgulanmıştır. Sözleşme var, e-fatura var, net takvim var — fakat account manager, PM ve toplantı katmanları yok.",
      },
      {
        heading: "Hangi Model Hangi Projeye Uygun?",
        body: "Proje tipine göre en uygun çalışma modelini seçin:",
        list: [
          "Basit landing page veya küçük tanıtım sitesi → Freelancer (hız + fiyat)",
          "E-ticaret, SaaS veya entegrasyon gerektiren orta ölçekli proje → Özel yazılım ofisi",
          "Büyük kurumsal sistem veya çok ekipli yazılım → Orta-büyük ajans",
          "Kritik ve devam eden bakım gerektiren sistem → Sözleşmeli yazılım ofisi veya ajans",
        ],
      },
    ],
    faq: [
      {
        q: "Freelance yazılımcı nasıl bulunur?",
        a: "Upwork, Bionluk, LinkedIn ve GitHub profillerinden freelancer aranabilir. Referans proje ve kod örnekleri mutlaka incelenmeli; kısa bir ücretli test görevi ilk değerlendirme için etkilidir.",
      },
      {
        q: "Solman Digital hangi modelde çalışıyor?",
        a: "Solman Digital, freelancer ile ajans arasındaki modelde çalışır: tek uzman, doğrudan iletişim, ajans güvencesi. Sözleşme, e-fatura ve net takvim standarttır.",
      },
      {
        q: "Yazılım projesinde en sık hangi sorunlar yaşanıyor?",
        a: "En yaygın sorunlar: kapsam belirsizliği (ne yapılacağı netleştirilmeden başlanması), iletişim kopukluğu ve takvim kaymaları. Bunların tümü proje başlangıcında yazılı kapsam belgesi ve takvim taahhüdüyle önlenebilir.",
      },
    ],
    cta: {
      text: "Projeniz için doğrudan geliştirici ile çalışmak ister misiniz?",
      href: "/istanbul-web-developer",
      label: "İstanbul Web Developer",
    },
    keywords: [
      "freelance yazılımcı istanbul",
      "yazılım ajansı mı freelancer mı",
      "yazılım projesi için kim tutmalıyım",
      "istanbul yazılım şirketi karşılaştırma",
      "freelance developer türkiye",
    ],
  },
  {
    slug: "web-sitesi-seo-teknikleri",
    title: "Web Sitenizi Google'a Tanıtın: Teknik SEO Başlangıç Rehberi",
    metaTitle: "Web Sitesi SEO Teknikleri Başlangıç Rehberi | Solman Digital",
    metaDescription:
      "Web sitesi SEO nasıl yapılır? Teknik SEO temelleri, title etiketleri, schema.org ve sayfa hızı optimizasyonu. İstanbul işletmeleri için pratik rehber.",
    description:
      "Google'da görünmek için ne yapmanız gerektiğini teknik karmaşıklık olmadan anlatan, gerçek proje deneyimiyle hazırlanmış başlangıç rehberi.",
    publishDate: "2026-06-03",
    readTime: 7,
    sections: [
      {
        heading: "SEO Nedir ve Neden Önemlidir?",
        body: "SEO (Search Engine Optimization), web sitenizin Google gibi arama motorlarında daha üst sıralarda görünmesi için yapılan çalışmaların bütünüdür. Her ay milyonlarca Türk kullanıcı Google'da 'istanbul web sitesi yaptırma', 'e-ticaret kurulum' gibi sorgular giriyor. Bu sorgularda üst sıralarda yer almak, reklam bütçesi ödemeden müşteriye ulaşmak anlamına gelir.",
      },
      {
        heading: "Teknik SEO'nun 5 Temeli",
        body: "Teknik SEO, Google bot'unun sitenizi doğru anlayıp dizinlemesi için gereken altyapıdır. Bu 5 temel doğru kurulmadan içerik ne kadar iyi olursa olsun sıralama kazanmak güçleşir.",
        list: [
          "Title etiketi: Her sayfa için benzersiz, anahtar kelime içeren başlık (50-60 karakter). Tarayıcı sekmesinde ve Google arama sonuçlarında görünen en kritik SEO alanıdır.",
          "Meta açıklama: Arama sonucunda başlık altında görünen özet metin (150-160 karakter). Sıralamayı doğrudan etkilemez ancak tıklama oranını (CTR) belirler.",
          "Canonical URL: Aynı içeriğin birden fazla URL'de yayınlandığı durumlarda Google'a 'asıl sayfa bu' diye işaret eder. Yanlış kurulum duplicate content cezasına yol açar.",
          "robots.txt: Google bot'a hangi sayfaların taranacağını, hangilerinin atlanacağını söyler. /api/, /tesekkurler/ gibi dizinleri disallow etmek tarama bütçesini korur.",
          "Sitemap.xml: Tüm sayfa listesini Google'a sunar. Özellikle yeni yayınlanan içeriklerin hızlı keşfedilmesi için kritik — manuel submit ile Google Search Console'dan hızlandırılabilir.",
        ],
      },
      {
        heading: "Sayfa Hızı ve Core Web Vitals",
        body: "Google, Mayıs 2021'den itibaren sayfa deneyimi sinyallerini (Core Web Vitals) sıralama faktörü olarak kullanıyor. Üç temel metrik: LCP (Largest Contentful Paint — sayfanın ana içeriğinin yükleme süresi, hedef: 2.5s altı), INP (Interaction to Next Paint — kullanıcı etkileşim yanıt süresi, hedef: 200ms altı) ve CLS (Cumulative Layout Shift — sayfa yüklenirken görsel kayma miktarı, hedef: 0.1 altı). Ölçüm için PageSpeed Insights (pagespeed.web.dev) ve Google Search Console'un 'Core Web Vitals' raporu kullanılır. Next.js ile geliştirilen ve Vercel'de barındırılan siteler bu metriklerde WordPress'e kıyasla belirgin avantaj sağlar.",
      },
      {
        heading: "Schema.org ile Zengin Snippet",
        body: "Schema.org işaretlemesi, Google'ın sayfanızı daha iyi anlamasını sağlar ve SERP'de yıldızlı puanlar, SSS akordeonları veya fiyat bilgisi gibi zengin görseller oluşturur. En değerli şemalar şunlardır:",
        list: [
          "FAQPage: SSS içeren sayfalar için — accordion görünümü sağlar",
          "LocalBusiness: İstanbul işletmeleri için kritik — harita entegrasyonu",
          "Service: Hizmet sayfaları için",
          "Article: Blog ve rehber içerikleri için",
          "BreadcrumbList: Navigasyon hiyerarşisi gösterimi",
        ],
      },
      {
        heading: "İç Bağlantı Stratejisi",
        body: "İç bağlantılar (internal links), sitenizin en değerli sayfalarına PageRank akışı sağlar. Rehber yazılarınız ilgili hizmet sayfanıza, hizmet sayfalarınız da birbirine bağlanmalıdır. 'Trendyol entegrasyonu' içeren bir blog yazısında Trendyol hizmet sayfanıza bağlantı verilmesi hem kullanıcı deneyimini hem de SEO'yu güçlendirir.",
      },
      {
        heading: "Yerel SEO: İstanbul İşletmeleri İçin",
        body: "İstanbul'daki fiziksel işletmeler için yerel SEO, Google Haritalar ve 'istanbul + [hizmet]' sorgularında görünürlük sağlar. Adım adım yapılması gerekenler:",
        list: [
          "Google Business Profile (GBP) kaydı: maps.google.com/business üzerinden ücretsiz kaydolun, adres ve iletişim bilgilerini doğrulayın",
          "NAP tutarlılığı: İsim, adres ve telefon numarası web sitenizde, GBP'de ve sosyal medyada birebir aynı olmalı",
          "Yerel anahtar kelimeli landing page: '[ilçe] + [hizmet]' formatında sayfalar (ör. 'kadıköy web tasarım') organik yerel trafiği doğrudan çeker",
          "Schema.org LocalBusiness: Web sitenizin kaynak kodunda JSON-LD ile işaretleme — Google'ın yerel sonuçlarda sitenizi göstermesini kolaylaştırır",
          "Müşteri yorumları: GBP'de biriken gerçek yorumlar hem sıralamayı hem de tıklanma oranını artırır",
        ],
      },
    ],
    faq: [
      {
        q: "SEO sonuçları ne kadar sürede görülür?",
        a: "Teknik SEO düzeltmeleri (robots.txt, canonical, sayfa hızı) genellikle 2–4 hafta içinde etkisini gösterir. Organik sıralama artışı; rekabete ve içerik kalitesine bağlı olarak 3–6 ay sürebilir. Yeni siteler için 6–12 ay gerçekçi bir beklentidir.",
      },
      {
        q: "WordPress sitesi için teknik SEO nasıl yapılır?",
        a: "WordPress'te Yoast SEO veya RankMath eklentisi ile temel teknik SEO yapılabilir. Sayfa hızı için WP Rocket veya önbellekleme eklentileri, resim optimizasyonu için Smush kullanılabilir. Ancak Next.js tabanlı bir siteyle kıyaslandığında performans farkı belirgindir.",
      },
      {
        q: "Solman Digital SEO hizmeti veriyor mu?",
        a: "Evet. Teknik SEO altyapısı kurulumu — meta etiketleri, schema.org, sitemap, canonical URL, robots.txt ve sayfa hızı optimizasyonu — tüm projelerimizde standarttır. Ayrıca mevcut siteniz için bağımsız teknik SEO denetimi hizmeti de sunuyoruz.",
      },
    ],
    cta: {
      text: "Web sitenizin teknik SEO altyapısını güçlendirmek için",
      href: "/hizmetler/seo-teknik-altyapi",
      label: "Teknik SEO Hizmeti",
    },
    keywords: [
      "web sitesi seo teknikleri",
      "teknik seo nedir",
      "google seo istanbul",
      "schema.org nedir",
      "web sitesi google sıralaması",
      "core web vitals türkçe",
    ],
  },
  // ─── YENİ YAZILAR ─────────────────────────────────────────────────────────
  {
    slug: "web-sitesi-yaptirmak-istiyorum",
    title: "Web Sitesi Yaptırmak İstiyorum: Nereden Başlamalıyım?",
    metaTitle: "Web Sitesi Yaptırmak İstiyorum: Nereden Başlamalıyım? | Solman Digital",
    metaDescription:
      "Web sitesi yaptırmak için adım adım rehber. Bütçe, içerik, teknik gereksinimler ve doğru geliştirici seçimi hakkında pratik bilgiler.",
    description:
      "İlk kez web sitesi yaptıracaklar için hazırlanmış kapsamlı başlangıç rehberi. Bütçeden teknik gereksinimlere, tasarımdan yayına kadar her adım.",
    publishDate: "2026-05-01",
    readTime: 7,
    sections: [
      {
        heading: "Web Sitesi Yaptırmadan Önce Yanıtlamanız Gereken 5 Soru",
        body: "Web sitesi yaptırmak bir yatırımdır. Doğru kararı vermek için önce ihtiyacınızı netleştirmeniz gerekir.",
        list: [
          "Sitenizin temel amacı nedir? (tanıtım, satış, randevu, lead toplama)",
          "Hedef kitleniz kim? (bireysel, KOBİ, kurumsal)",
          "Bütçeniz nedir? (tasarım, geliştirme, yıllık bakım)",
          "İçeriği siz mi hazırlayacaksınız, yoksa destek mi istiyorsunuz?",
          "Canlıya geçiş süreniz var mı?",
        ],
      },
      {
        heading: "Şablon mu, Özel Geliştirme mi?",
        body: "Piyasada iki temel yaklaşım var: WordPress veya Wix gibi şablon tabanlı sistemler ile Next.js gibi teknolojilerle sıfırdan geliştirme. Her birinin avantajları farklıdır.",
        list: [
          "Şablon sistemler daha hızlı kurulur ancak performans ve özelleştirme sınırlıdır",
          "Özel geliştirme daha yavaş başlar ama sonuçta tam kontrol size aittir",
          "Google PageSpeed skorları özel geliştirmede genellikle çok daha yüksektir",
          "E-ticaret veya SaaS gibi karmaşık projelerde şablon yetersiz kalır",
        ],
      },
      {
        heading: "Doğru Geliştiriciyi Nasıl Seçersiniz?",
        body: "Türkiye'de web geliştirici seçimi kritik bir karardır. Yüzlerce seçenek arasında doğruyu bulmak zaman alır.",
        list: [
          "Portföyünü inceleyin — gerçek canlı projeler mi yoksa mock-up'lar mı?",
          "Referans isteyin ve müşterileri arayın",
          "Kapsam belgesi yazıp yazmadığını sorun",
          "Teslim sonrası destek koşullarını netleştirin",
          "Fiyat en düşük olanı seçmeyin — orta bütçe çoğunlukla en iyi değer sunar",
        ],
      },
      {
        heading: "Bütçenizi Nasıl Planlamalısınız?",
        body: "Web sitesi maliyeti tek seferlik değildir. İlk geliştirme dışında yıllık bakım ve hosting masraflarını da hesaba katın.",
        list: [
          "Kurumsal tanıtım sitesi: ₺8.000–₺25.000",
          "E-ticaret sitesi: ₺20.000–₺60.000",
          "SaaS platform: ₺50.000+",
          "Yıllık domain + hosting: ₺2.000–₺5.000",
          "Yıllık bakım ve güncelleme: projenin %10–15'i",
        ],
      },
    ],
    faq: [
      {
        q: "Web sitesi yaptırmak ne kadar sürer?",
        a: "Kurumsal tanıtım siteleri 5–10 iş günü, e-ticaret siteleri 10–15 iş günü, SaaS platformlar 4–8 hafta içinde teslim edilir. Süre, kapsam ve içerik hazırlığına bağlı değişir.",
      },
      {
        q: "Web sitemin içeriğini kim yazacak?",
        a: "İçeriği siz hazırlayabilirsiniz ya da ücretli içerik yazımı hizmeti talep edebilirsiniz. Temel metinleri siz sağlarsanız geliştirme süreci hızlanır.",
      },
      {
        q: "Web sitemi canlıya aldıktan sonra değişiklik yapabilir miyim?",
        a: "Evet. İçerik yönetim sistemi (CMS) entegrasyonu ile metin ve görsel güncellemelerini kendiniz yapabilirsiniz. Teknik değişiklikler için geliştiriciyle çalışmaya devam edebilirsiniz.",
      },
    ],
    cta: { text: "Web Sitesi Projenizi Başlatın", href: "/web-sitesi-yaptirmak", label: "Teklif Al" },
    keywords: [
      "web sitesi yaptırmak istiyorum",
      "web sitesi yaptırma rehberi",
      "web sitesi fiyatları",
      "web geliştirici seçimi",
      "web sitesi nasıl yaptırılır",
    ],
  },
  {
    slug: "kurumsal-web-sitesi-fiyatlari",
    title: "Kurumsal Web Sitesi Fiyatları 2025 — Ne Kadar Bütçe Ayırmalısınız?",
    metaTitle: "Kurumsal Web Sitesi Fiyatları 2025 | Solman Digital",
    metaDescription:
      "Kurumsal web sitesi fiyatları: ₺8.000'dan başlayan maliyetler, etki eden faktörler ve bütçe planlaması. 2025 Türkiye piyasası güncel rehberi.",
    description:
      "Kurumsal web sitesi fiyatları nelere göre değişir? 2025 Türkiye piyasasında gerçekçi bütçe planlaması için kapsamlı rehber.",
    publishDate: "2026-05-05",
    readTime: 6,
    sections: [
      {
        heading: "Kurumsal Web Sitesi Fiyatını Belirleyen Faktörler",
        body: "Web sitesi fiyatları tek tip değildir. Projenin kapsamına göre ₺5.000 ile ₺100.000 arasında değişebilir.",
        list: [
          "Sayfa sayısı: 5 sayfalık site ile 30 sayfalık site aynı fiyatta olmaz",
          "Özel işlevler: rezervasyon, üyelik, ödeme sistemi ekstra maliyet getirir",
          "Tasarım: hazır şablon veya özgün tasarım farkı büyüktür",
          "İçerik: metin ve görsel hazırlığı dahil mi değil mi?",
          "SEO kurulumu: teknik altyapı standart mı, kapsamlı mı?",
        ],
      },
      {
        heading: "2025 Türkiye'de Kurumsal Web Sitesi Fiyat Aralıkları",
        body: "Piyasada üç temel segment bulunmaktadır. Fiyatlar, geliştirici deneyimi ve kapsama göre farklılaşır.",
        list: [
          "Ekonomik (şablon, WordPress): ₺3.000–₺8.000",
          "Orta segment (özel tasarım + WordPress): ₺8.000–₺20.000",
          "Premium (Next.js, özel geliştirme): ₺15.000–₺40.000",
          "Kurumsal büyük ölçek: ₺40.000+",
        ],
      },
      {
        heading: "Ucuz Web Sitesinin Gizli Maliyetleri",
        body: "Düşük fiyatlı teklifler başlangıçta cazip görünür ancak uzun vadede daha pahalıya gelebilir.",
        list: [
          "Yavaş yükleme hızı → Google sıralamada düşüş → müşteri kaybı",
          "Güvenlik açıkları → veri ihlali riski",
          "Şablon kısıtlamaları → özellik eklemek zorlaşır",
          "Bakım ücreti: ayda ₺500–₺2.000 + eklenti lisansları",
          "Revizyon ücretleri: her küçük değişiklik için ek fatura",
        ],
      },
    ],
    faq: [
      {
        q: "Kurumsal web sitesi için en uygun bütçe ne kadar?",
        a: "Ciddi bir işletme için ₺12.000–₺25.000 arası gerçekçi bir başlangıç bütçesidir. Bu aralıkta özel tasarım, SEO kurulumu ve 1 yıl destek alınabilir.",
      },
      {
        q: "Fiyata KDV dahil mi?",
        a: "Çoğu geliştirici fiyatları KDV hariç belirtir. Teklife KDV (%20) eklendiğinde gerçek maliyeti hesaplamamız gerekir.",
      },
      {
        q: "Web sitesi için yıllık ne kadar bütçe ayrılmalı?",
        a: "Domain (₺500–₺1.000), hosting (₺1.500–₺4.000) ve bakım/güncelleme (proje bedelinin %10–15'i) için yıllık ₺3.000–₺8.000 bütçe planlamak mantıklıdır.",
      },
    ],
    cta: { text: "Fiyat Teklifi Alın", href: "/fiyatlar", label: "Fiyatlar" },
    keywords: [
      "kurumsal web sitesi fiyatları",
      "web sitesi ne kadar tutar",
      "web sitesi maliyeti türkiye",
      "kurumsal site fiyat",
      "web geliştirme ücreti",
    ],
  },
  {
    slug: "landing-page-nedir",
    title: "Landing Page Nedir ve Dönüşümü Nasıl Artırır?",
    metaTitle: "Landing Page Nedir? Dönüşümü Artıran Sayfa Tasarımı | Solman Digital",
    metaDescription:
      "Landing page nedir, kurumsal siteden farkı nedir, nasıl tasarlanır? Yüksek dönüşüm oranı için dikkat edilmesi gerekenler.",
    description:
      "Landing page ile normal web sitesi arasındaki fark nedir? Reklam kampanyalarınız için dönüşüm odaklı sayfa nasıl tasarlanır?",
    publishDate: "2026-05-10",
    readTime: 5,
    sections: [
      {
        heading: "Landing Page Nedir?",
        body: "Landing page (açılış sayfası), ziyaretçiyi tek bir eyleme yönlendirmek için tasarlanmış, odaklanmış bir web sayfasıdır. Kurumsal sitenizde 10 sayfa varken landing page tek bir hedefe — form doldurmak, satın almak, randevu almak — odaklanır.",
        list: [
          "Tek CTA (call-to-action): ziyaretçi ne yapacağını bilir",
          "Dağıtıcı navigasyon yok: dikkat dağıtacak linkler kaldırılır",
          "Mesaj–reklam uyumu: Google Ads metni ile sayfa içeriği eşleşir",
          "Hız öncelikli: 1 saniyenin altında yükleme hedeflenir",
        ],
      },
      {
        heading: "Yüksek Dönüşümlü Landing Page Elementleri",
        body: "İyi bir landing page, ziyaretçinin zihinsel sürecine eşlik eder: dikkat → ilgi → arzu → eylem.",
        list: [
          "Güçlü başlık: faydayı 6 kelimede anlatır",
          "Alt başlık: şüpheyi giderir, detay verir",
          "Sosyal kanıt: referanslar, sayılar, logolar",
          "Özellikler yerine faydalar: 'ne' değil 'ne işe yarar'",
          "Form veya buton: ekran ortasında ve sayfanın altında",
          "Güven sinyalleri: SSL logosu, garanti, iade politikası",
        ],
      },
      {
        heading: "Landing Page vs Kurumsal Site: Hangisi Gerekli?",
        body: "İkisi birbirini dışlamaz. Kurumsal siteniz marka bilinirliği için, landing page'iniz ise reklam kampanyaları için çalışır.",
        list: [
          "Google/Meta reklam çalıştırıyorsanız landing page zorunludur",
          "Organik SEO için kurumsal site veya blog daha etkilidir",
          "Sezonluk kampanyalar için her seferinde yeni landing page oluşturabilirsiniz",
        ],
      },
    ],
    faq: [
      {
        q: "Landing page maliyeti ne kadar?",
        a: "Tek sayfa, dönüşüm odaklı bir landing page ₺5.000–₺12.000 arasında değişir. A/B test altyapısı ve analitik kurulumu ekstra maliyet getirebilir.",
      },
      {
        q: "Landing page ne kadar sürede hazırlanır?",
        a: "İçerik hazır olduğunda 3–7 iş günü içinde canlıya alınabilir.",
      },
      {
        q: "Her reklam kampanyası için ayrı landing page mi gerekir?",
        a: "Evet, mümkünse her kampanya veya hedef kitle segmenti için ayrı landing page oluşturmak dönüşüm oranını artırır.",
      },
    ],
    cta: { text: "Landing Page Projesi Başlatın", href: "/hizmetler/landing-page-tasarimi", label: "Detay" },
    keywords: [
      "landing page nedir",
      "açılış sayfası nedir",
      "landing page tasarım",
      "dönüşüm odaklı sayfa",
      "google ads landing page",
    ],
  },
  {
    slug: "trendyol-komisyon-hesaplama",
    title: "Trendyol Komisyon Oranları 2025 ve Kâr Hesaplama Rehberi",
    metaTitle: "Trendyol Komisyon Oranları 2025 | Kâr Hesaplama Rehberi | Solman Digital",
    metaDescription:
      "Trendyol komisyon oranları 2025. Kategori bazlı komisyonlar, iade maliyetleri ve gerçek kâr marjınızı hesaplama rehberi.",
    description:
      "Trendyol'da satış yapan veya yapmayı planlayan satıcılar için komisyon oranları, gizli maliyetler ve kâr marjı hesaplama rehberi.",
    publishDate: "2026-05-15",
    readTime: 6,
    sections: [
      {
        heading: "Trendyol Komisyon Oranları Nasıl Belirlenir?",
        body: "Trendyol'un komisyon oranları sabit değildir; kategoriye, kampanyalara ve satıcı profiline göre değişir. 2025 itibarıyla komisyon oranları %8 ile %25 arasında seyrediyor.",
        list: [
          "Elektronik: %8–%12",
          "Giyim ve tekstil: %18–%22",
          "Kozmetik ve kişisel bakım: %15–%20",
          "Ev ve yaşam: %12–%18",
          "Gıda ve içecek: %10–%15",
          "Kampanya dönemlerinde (11.11, Çifte Alışveriş) ek indirim zorunluluğu doğabilir",
        ],
      },
      {
        heading: "Gizli Maliyetler: Komisyon Dışında Ne Ödüyorsunuz?",
        body: "Trendyol'da satış maliyeti sadece komisyondan ibaret değildir. Gerçek kâr marjınızı hesaplamak için tüm kalemleri dikkate almalısınız.",
        list: [
          "Reklam harcamaları (Sponsored Products): satışın %5–%15'i",
          "İade işlem ücreti: iade başına ₺15–₺30",
          "Kargo: ücretsiz kargo kampanyasında satıcı üstlenir",
          "Ambalaj ve paketleme maliyeti",
          "Stok maliyeti: platform depolarında bekletme ücreti",
        ],
      },
      {
        heading: "Trendyol Kâr Marjı Hesaplama Formülü",
        body: "Gerçek kâr marjınızı şu formülle hesaplayabilirsiniz: Kâr = Satış Fiyatı − Ürün Maliyeti − Komisyon − Kargo − Reklam − Ambalaj − İade Payı",
        list: [
          "Örnek: ₺200 satış fiyatı, ₺80 maliyet, %18 komisyon (₺36), ₺12 kargo = ₺72 brüt kâr",
          "%10 reklam (₺20) ve %5 iade payı (₺10) düşülünce net kâr ₺42 → %21 marj",
          "Marjınız %15'in altındaysa kendi sitenizi açmayı değerlendirin",
        ],
      },
    ],
    faq: [
      {
        q: "Trendyol komisyonları ne zaman değişir?",
        a: "Trendyol komisyon oranlarını her yıl başında ve kampanya dönemlerinde güncelleyebilir. Mağaza panelinden güncel oranları takip etmeniz önerilir.",
      },
      {
        q: "Trendyol'da iade oranı yüksek çıkarsa ne yapmalıyım?",
        a: "Yüksek iade, ürün açıklaması veya görsel uyumsuzluğundan kaynaklanıyorsa içerik güncellemesi gerekir. Sistematik bir sorun varsa kendi e-ticaret sitenize yönelmeyi düşünebilirsiniz.",
      },
      {
        q: "Trendyol entegrasyonu ne işe yarar?",
        a: "Trendyol API entegrasyonu; stok, sipariş ve fiyat yönetimini otomatikleştirir. Manuel giriş hataları ortadan kalkar, operasyonel maliyet düşer.",
      },
    ],
    cta: { text: "Trendyol Entegrasyonu Hakkında Bilgi Al", href: "/trendyol-entegrasyonu", label: "Detay" },
    ctaSecondary: {
      text: "Komisyon hesaplamasını kendiniz yapın",
      href: "https://ticarethub.com/trendyol-komisyon-hesaplama",
      label: "TicaretHub Komisyon Hesapla",
    },
    keywords: [
      "trendyol komisyon oranları 2025",
      "trendyol kâr hesaplama",
      "trendyol satıcı maliyetleri",
      "trendyol komisyon kategoriler",
      "trendyol net kâr marjı",
    ],
  },
  {
    slug: "saas-nedir-turkiye",
    title: "SaaS Nedir? Türkiye'de SaaS Girişimine Başlamak",
    metaTitle: "SaaS Nedir? Türkiye'de SaaS Girişimine Başlamak | Solman Digital",
    metaDescription:
      "SaaS nedir, nasıl çalışır? Türkiye'de SaaS girişimi kurmak için MVP stratejisi, fiyatlandırma modelleri ve teknik gereksinimler.",
    description:
      "Software as a Service (SaaS) modelini Türkiye'de uygulamak isteyenler için kapsamlı başlangıç rehberi.",
    publishDate: "2026-05-20",
    readTime: 8,
    sections: [
      {
        heading: "SaaS Nedir?",
        body: "SaaS (Software as a Service), yazılımın kullanıcıya internet üzerinden abonelik modeliyle sunulduğu bir dağıtım modelidir. Kullanıcılar yazılımı satın almak yerine aylık veya yıllık ödeme yapar.",
        list: [
          "Örnekler: Slack, Notion, HubSpot, Figma",
          "Türkiye'den örnekler: Parasut, Faprika, İyzico",
          "Avantajı: tahmin edilebilir gelir (MRR/ARR)",
          "Dezavantajı: müşteri edinim maliyeti yüksek, churn takibi gerektirir",
        ],
      },
      {
        heading: "Türkiye'de SaaS Girişimi İçin Pazar Değerlendirmesi",
        body: "Türkiye SaaS pazarı henüz olgunlaşmamış ama hızla büyüyor. KOBİ'lerin dijitalleşme ihtiyacı ve artan internet penetrasyonu fırsatlar yaratıyor.",
        list: [
          "Hedef segment: 50–500 çalışanlı KOBİ'ler en verimli müşteri segmenti",
          "Fiyatlandırma: Türkiye'de aylık ₺500–₺2.000 arası paketler yaygın",
          "Ödeme: İyzico veya Stripe entegrasyonu zorunlu",
          "Yerelleştirme: Türkçe UI, TRY fiyatlandırma, yerel vergi mevzuatı",
        ],
      },
      {
        heading: "SaaS MVP'nizi Nasıl Oluşturursunuz?",
        body: "MVP (Minimum Viable Product) stratejisi, en az özellikle pazara girip müşteri geri bildirimiyle ürünü geliştirmektir.",
        list: [
          "Tek bir problemi çözün: geniş kapsam MVP'yi yavaşlatır",
          "Auth + billing + core özellik: 3 temel modül önce kurulmalı",
          "Supabase veya Firebase: backend altyapısını hızlandırır",
          "Stripe veya İyzico: ödeme entegrasyonu baştan kurulmalı",
          "İlk 10 müşteri: doğrudan satış, sosyal medya veya LinkedIn outreach",
        ],
      },
    ],
    faq: [
      {
        q: "SaaS geliştirme maliyeti ne kadar?",
        a: "Temel bir SaaS MVP'si ₺50.000–₺120.000 arasında geliştirilebilir. Auth, ödeme sistemi ve core özellik dahil. Karmaşık iş süreçleri fiyatı artırır.",
      },
      {
        q: "SaaS projesi ne kadar sürede tamamlanır?",
        a: "4–8 hafta arası MVP için gerçekçi bir süre. Tam ürün ise 3–6 aylık bir süreç gerektirebilir.",
      },
      {
        q: "Türkiye'de SaaS için hangi ödeme altyapısı kullanılmalı?",
        a: "Türk müşteriler için İyzico, yurt dışı müşteriler için Stripe önerilir. Her ikisini de destekleyen bir altyapı kurmak uzun vadede avantajlıdır.",
      },
    ],
    cta: { text: "SaaS Projenizi Konuşalım", href: "/saas-platform-gelistirme", label: "Detay" },
    keywords: [
      "saas nedir türkiye",
      "saas girişimi nasıl kurulur",
      "saas mvp geliştirme",
      "türkiye saas pazarı",
      "saas fiyatlandırma modeli",
    ],
  },
  {
    slug: "shopify-alternatifi-turkiye",
    title: "Shopify'a Türk Alternatifi Var mı? 2025 Karşılaştırma",
    metaTitle: "Shopify Alternatifi Türkiye 2025 | Solman Digital",
    metaDescription:
      "Türkiye'de Shopify yerine kullanılabilecek e-ticaret çözümleri. WooCommerce, özel Next.js geliştirme ve yerli platformların karşılaştırması.",
    description:
      "Shopify'ın Türkiye'deki kısıtlamaları neler? Daha iyi alternatifler var mı? 2025 güncel karşılaştırma.",
    publishDate: "2026-05-25",
    readTime: 6,
    sections: [
      {
        heading: "Shopify'ın Türkiye'deki Sorunları",
        body: "Shopify dünyada lider e-ticaret platformu olsa da Türkiye pazarı için ciddi dezavantajları bulunuyor.",
        list: [
          "Ödeme: İyzico entegrasyonu resmi olarak desteklenmiyor, ek entegrasyon gerekiyor",
          "Fiyat: aylık 29–79 USD + %2 işlem ücreti ciddi maliyet",
          "Döviz riski: kur değişimlerinde aylık ödeme dalgalanıyor",
          "Vergi: Türkiye'ye özel KDV ve fatura yapısı yetersiz",
          "Kargo: MNG, Yurtiçi, Aras entegrasyonları ek uygulama gerektiriyor",
        ],
      },
      {
        heading: "Türkiye İçin En İyi Shopify Alternatifleri",
        body: "Türk e-ticaret girişimcileri için farklı ihtiyaçlara göre çeşitli alternatifler mevcut.",
        list: [
          "WooCommerce (WordPress): açık kaynak, tam yerleşik İyzico entegrasyonu var, sınırsız ürün",
          "İdeaSoft / T-Soft: yerli platform, Türkiye'ye özel ödeme ve kargo entegrasyonları",
          "Next.js özel geliştirme: tam kontrol, en yüksek performans, aylık platform ücreti yok",
          "OpenCart: basit projeler için düşük maliyetli seçenek",
        ],
      },
      {
        heading: "Özel Geliştirme Ne Zaman Mantıklı?",
        body: "Aylık platform ücreti ödemek istemiyorsanız ve işiniz büyüdükçe kısıtlamalarla karşılaşıyorsanız özel geliştirme doğru tercih.",
        list: [
          "Aylık 200+ sipariş: platform komisyonları önemli maliyet oluşturur",
          "Özel sipariş akışı: B2B, toptan, kampanya yönetimi",
          "Trendyol/Hepsiburada senkronizasyonu: API bağlantısı için esneklik şart",
          "Marka kimliği: şablon görünümünden kurtulmak isteyenler için",
        ],
      },
    ],
    faq: [
      {
        q: "Shopify'dan özel siteye geçmek ne kadar sürer?",
        a: "Ürün aktarımı ve yeni site geliştirmesi birlikte 3–5 hafta sürer. SEO sürekliliği için yönlendirme (redirect) planlaması önemlidir.",
      },
      {
        q: "Özel e-ticaret sitesi Shopify'dan pahalı mı?",
        a: "Başlangıç maliyeti daha yüksektir (₺20.000+) ancak aylık platform ücreti ve komisyon yoktur. 12–18 ay içinde genellikle başabaş noktasına ulaşılır.",
      },
      {
        q: "İyzico entegrasyonu için hangi platform daha uygun?",
        a: "WooCommerce'in resmi İyzico eklentisi var. Özel geliştirmede ise İyzico API doğrudan entegre edilir — en temiz ve güvenilir yöntem budur.",
      },
    ],
    cta: { text: "E-Ticaret Projenizi Konuşalım", href: "/hizmetler/eticaret-kurulum", label: "Detay" },
    keywords: [
      "shopify alternatifi türkiye",
      "shopify türkiye sorunları",
      "shopify yerine ne kullanmalı",
      "türkiye e-ticaret platformu",
      "woocommerce vs shopify türkiye",
    ],
  },
  {
    slug: "google-ads-vs-seo",
    title: "Google Ads mi SEO mu? Türk KOBİ'ler İçin Doğru Seçim",
    metaTitle: "Google Ads mı SEO mu? Türk KOBİ'ler İçin Rehber | Solman Digital",
    metaDescription:
      "Google Ads ve SEO arasındaki farklar, maliyetler ve Türkiye'deki KOBİ'ler için hangisinin daha uygun olduğu.",
    description:
      "Dijital pazarlama bütçenizi nereye harcamalısınız? Google Ads anlık sonuç, SEO ise uzun vadeli kazanç sağlar.",
    publishDate: "2026-05-28",
    readTime: 5,
    sections: [
      {
        heading: "Google Ads ile SEO'nun Temel Farkı",
        body: "Google Ads (tıklama başına ödeme) ile SEO (organik arama) farklı zaman ufuklarında çalışır. Biri hız, diğeri sürdürülebilirlik sunar.",
        list: [
          "Google Ads: kampanya aktifken trafik gelir, durdurunca sıfırlanır",
          "SEO: 3–6 ay sonra etki gösterir, bırakıldıktan sonra da trafik devam eder",
          "Google Ads: her tıklama için ödeme; Türkiye'de ₺3–₺30 arası CPC",
          "SEO: kurulum maliyeti var, sonra organik trafik ücretsizdir",
        ],
      },
      {
        heading: "Hangi Durumda Google Ads Seçilmeli?",
        body: "Hızlı sonuç gereken durumlarda Google Ads avantajlıdır.",
        list: [
          "Yeni lansman: organik trafik için zaman yoksa reklam zorunlu",
          "Sezonluk kampanya: belirli bir dönem için hedefli trafik",
          "Yüksek rekabetli anahtar kelimeler: organik çıkmak yıllar alır",
          "Test aşaması: landing page'in işe yarayıp yaramadığını hızlı test edin",
        ],
      },
      {
        heading: "Hangi Durumda SEO Seçilmeli?",
        body: "Uzun vadeli müşteri edinimi ve düşük marjinal maliyetle büyümek isteyenler için SEO vazgeçilmezdir.",
        list: [
          "İçerik odaklı sektörler: hukuk, sağlık, eğitim, finans",
          "Yerel hizmetler: 'Kadıköy tamirci' gibi lokasyonlu aramalar",
          "Blog ve rehber içeriği: sorun çözücü yazılar yıllarca trafik üretir",
          "Bütçe kısıtlı KOBİ'ler: aylık reklam faturasını taşıyamayanlar",
        ],
      },
    ],
    faq: [
      {
        q: "Google Ads ve SEO'yu aynı anda yürütmek mümkün mü?",
        a: "Evet ve önerilir. Kısa vadede Ads ile trafik kazanırken, SEO ile uzun vadeli organik varlık inşa edilir.",
      },
      {
        q: "Türkiye'de SEO ajansı ne kadar tutar?",
        a: "Aylık ₺3.000–₺15.000 arası ciddi SEO çalışması yaptırılabilir. Teknik SEO + içerik üretimi + link building üçlüsü birlikte yürütülmelidir.",
      },
      {
        q: "Web sitemin SEO'su için ne yapmalıyım?",
        a: "Önce teknik SEO altyapısını (hız, schema, sitemap) kurun, ardından hedef anahtar kelimelere yönelik içerik üretin. Solman Digital ile ücretsiz analiz talep edebilirsiniz.",
      },
    ],
    cta: { text: "Ücretsiz SEO Analizi İsteyin", href: "/ucretsiz-analiz", label: "Analiz" },
    relatedSlugs: ["google-reklam-ajansi-mi-kendiniz-mi", "web-sitesi-seo-teknikleri", "landing-page-nedir"],
    keywords: [
      "google ads mi seo mu",
      "google ads vs seo türkiye",
      "dijital pazarlama kobi",
      "seo maliyet türkiye",
      "google ads cpc türkiye",
    ],
  },
  {
    slug: "chatgpt-isletme-kullanimi",
    title: "ChatGPT ve Claude'u İşletmenizde Kullanmanın 10 Yolu",
    metaTitle: "ChatGPT ve Claude'u İşletmenizde Kullanmanın 10 Yolu | Solman Digital",
    metaDescription:
      "AI araçlarını işletmenizde nasıl kullanabilirsiniz? ChatGPT, Claude ve GPT-4o ile verimlilik artırmanın 10 pratik yolu.",
    description:
      "Yapay zeka araçlarını işletme süreçlerinize entegre etmenin pratik yolları. Örnekler ve uygulama rehberi.",
    publishDate: "2026-06-01",
    readTime: 7,
    sections: [
      {
        heading: "AI Araçları İşletme Verimliliğini Nasıl Artırır?",
        body: "ChatGPT ve Claude gibi büyük dil modelleri, rutin bilgi işleme görevlerini otomatikleştirerek çalışanların stratejik işlere odaklanmasını sağlar.",
        list: [
          "İçerik üretimi: blog yazısı, ürün açıklaması, e-posta şablonları",
          "Müşteri hizmetleri: sık sorulan sorulara otomatik yanıt",
          "Veri analizi: rapor özetleme, tablo yorumlama",
          "Yazışma: teklif mektubu, resmi e-posta taslakları",
          "Araştırma: pazar araştırması, rakip analizi özetleme",
        ],
      },
      {
        heading: "İşletmeler İçin 10 Pratik AI Kullanım Alanı",
        body: "Türk KOBİ'lerin en çok fayda gördüğü AI uygulama alanları şunlardır:",
        list: [
          "1. Ürün açıklamaları: Trendyol/e-ticaret için yüzlerce ürün açıklaması saniyeler içinde",
          "2. SEO blog içeriği: anahtar kelime odaklı makaleler",
          "3. Sosyal medya paylaşımları: haftalık içerik takvimi hazırlama",
          "4. Müşteri e-posta şablonları: sipariş onayı, geri bildirim talebi",
          "5. Sözleşme taslakları: hukuki gözden geçirme için ham metin",
          "6. Rakip analizi: rakip web sitelerinin özetlenmesi",
          "7. İş planı ve sunum: yatırımcı deck taslakları",
          "8. Veri yorumlama: Excel/CSV verilerinden içgörü çıkarma",
          "9. Eğitim materyali: çalışan onboarding dökümanları",
          "10. Chatbot: web sitenizde 7/24 müşteri yanıtlama",
        ],
      },
      {
        heading: "AI Otomasyonu: Bir Sonraki Adım",
        body: "Tek seferlik AI kullanımından öte, iş süreçlerinizi otomatikleştiren kalıcı sistemler kurabilirsiniz.",
        list: [
          "GPT-4o API entegrasyonu ile içerik üretimini otomatikleştirin",
          "Webhook'larla sipariş/müşteri olaylarına AI yanıtı tetikleyin",
          "Vektör veritabanı ile şirket bilgisini AI'ya öğretin",
          "CRM'e bağlı AI asistan ile satış sürecini hızlandırın",
        ],
      },
    ],
    faq: [
      {
        q: "ChatGPT mi yoksa Claude mi kullanmalıyım?",
        a: "Her ikisi de güçlüdür. ChatGPT (GPT-4o) uzun içerik üretiminde, Claude ise karmaşık analiz ve kod yazımında öne çıkar. İkisini de test edip ihtiyacınıza uygun olanı tercih edin.",
      },
      {
        q: "AI otomasyon sistemi ne kadar tutarında kurulur?",
        a: "Basit bir içerik otomasyonu ₺15.000–₺30.000, karmaşık iş süreci otomasyonu ₺40.000–₺80.000 arasında kurulabilir.",
      },
      {
        q: "AI araçları Türkçe için ne kadar başarılı?",
        a: "GPT-4o ve Claude 3.5 Sonnet, Türkçe'de İngilizce'ye yakın kalitede çıktı üretiyor. Teknik veya hukuki metinlerde insan gözden geçirmesi önerilir.",
      },
    ],
    cta: { text: "AI Otomasyon Çözümleri", href: "/ai-otomasyon-hizmeti", label: "Detay" },
    keywords: [
      "chatgpt işletme kullanımı",
      "claude yapay zeka türkiye",
      "ai otomasyon küçük işletme",
      "gpt-4o türkçe kullanım",
      "yapay zeka iş verimliliği",
    ],
  },
  {
    slug: "nextjs-avantajlari",
    title: "Next.js'in 7 Avantajı: Neden 2025'te Hâlâ En İyi Seçim?",
    metaTitle: "Next.js Avantajları 2025: Neden En İyi Web Çerçevesi? | Solman Digital",
    metaDescription:
      "Next.js'in diğer web teknolojilerine göre avantajları. Performans, SEO, geliştirici deneyimi ve ölçeklenebilirlik açısından kapsamlı karşılaştırma.",
    description:
      "Next.js neden bu kadar popüler? 2025'te web projelerinde neden WordPress veya diğer alternatiflere tercih edilmeli?",
    publishDate: "2026-06-03",
    readTime: 6,
    sections: [
      {
        heading: "Next.js Nedir ve Neden Önemli?",
        body: "Next.js, React tabanlı bir web uygulama çerçevesidir. 2024 itibarıyla dünya genelinde en çok kullanılan web framework'lerinden biri konumundadır.",
        list: [
          "Vercel tarafından geliştiriliyor ve destekleniyor",
          "Server Side Rendering (SSR) ve Static Site Generation (SSG) desteği",
          "App Router ile server components mimarisi",
          "Büyük şirketler kullananlar: TikTok, Twitch, Hulu, Linear",
        ],
      },
      {
        heading: "7 Temel Avantaj",
        body: "Next.js'i rakiplerinden ayıran özellikler hem teknik hem de iş boyutunda önemli avantajlar sağlar.",
        list: [
          "1. SEO: server-side rendering ile Google botu sayfayı tam okur",
          "2. Hız: otomatik kod bölme, lazy loading, image optimizasyonu",
          "3. Tek kod tabanı: frontend + backend aynı projede",
          "4. Edge fonksiyonları: middleware ile coğrafi yönlendirme, A/B test",
          "5. TypeScript: tür güvenliği ile daha az hata",
          "6. Vercel deploy: git push ile otomatik deploy, sıfır konfigürasyon",
          "7. Geniş ekosistem: 1.000+ hazır kütüphane ve bileşen",
        ],
      },
      {
        heading: "Next.js vs WordPress: Hangisini Seçmeli?",
        body: "Bu iki teknoloji farklı ihtiyaçlara hizmet eder. Seçim projenin niteliğine bağlıdır.",
        list: [
          "İçerik ağırlıklı blog veya haber sitesi → WordPress hâlâ geçerli",
          "Performans kritikse veya özel özellik gerekiyorsa → Next.js",
          "E-ticaret veya SaaS → Next.js açık ara üstün",
          "Teknik ekip yoksa ve basit içerik yeterliyse → WordPress + Elementor",
        ],
      },
    ],
    faq: [
      {
        q: "Next.js öğrenmesi zor mudur?",
        a: "React biliyorsanız Next.js'e geçiş 1–2 hafta içinde tamamlanabilir. Sıfırdan başlayanlar için 2–3 aylık yoğun öğrenim gerekir.",
      },
      {
        q: "Next.js ile WordPress aynı maliyette mi?",
        a: "Next.js geliştirme genellikle daha pahalıdır ancak aylık eklenti ve lisans maliyeti yoktur. Vercel üzerinde ücretsiz hosting yapılabilir.",
      },
      {
        q: "Next.js projem için Vercel zorunlu mu?",
        a: "Hayır. AWS, Google Cloud, Railway gibi platformlara da deploy edilebilir. Vercel en kolay ve optimize seçenek olduğu için yaygın tercih ediliyor.",
      },
    ],
    cta: { text: "Next.js Projenizi Başlatın", href: "/hizmetler/kurumsal-web-sitesi", label: "Detay" },
    keywords: [
      "next.js avantajları",
      "next.js neden kullanılır",
      "next.js vs wordpress",
      "next.js seo performans",
      "react next.js farkı",
    ],
  },
  // ─── KARŞILAŞTIRMA YAZILARI ────────────────────────────────────────────────
  {
    slug: "trendyol-vs-eticaret-sitesi",
    title: "Trendyol'da Satmak mı, Kendi E-Ticaret Siteniz mi?",
    metaTitle: "Trendyol vs Kendi E-Ticaret Sitesi: Hangisi Daha İyi? | Solman Digital",
    metaDescription:
      "Trendyol ile kendi e-ticaret sitesinin avantajları ve dezavantajları. Hangi satış kanalı işinize daha uygun?",
    description:
      "Trendyol'da satış yapmak mı, kendi sitenizi açmak mı? İkisini birlikte yürütmek mümkün mü? Detaylı karşılaştırma.",
    publishDate: "2026-06-04",
    readTime: 6,
    sections: [
      {
        heading: "Trendyol'un Avantajları ve Dezavantajları",
        body: "Trendyol, Türkiye'de 35 milyonun üzerinde aktif alıcıya ulaşan hazır bir müşteri kitlesine sahip.",
        list: [
          "Avantaj: kurulum kolay, müşteri trafiği hazır",
          "Avantaj: lojistik altyapısı mevcut (Trendyol Express)",
          "Dezavantaj: %8–%22 komisyon oranı",
          "Dezavantaj: müşteri verisi size ait değil",
          "Dezavantaj: marka kimliğinizi öne çıkaramazsınız",
          "Dezavantaj: platform politika değişikliklerinden doğrudan etkilenirsiniz",
        ],
      },
      {
        heading: "Kendi E-Ticaret Sitesinin Avantajları ve Dezavantajları",
        body: "Bağımsız e-ticaret siteniz, uzun vadede marka ve müşteri verisi oluşturmanın tek yoludur.",
        list: [
          "Avantaj: komisyon yok, kâr marjınız daha yüksek",
          "Avantaj: müşteri e-postalarını toplayıp CRM kurabilirsiniz",
          "Avantaj: kendi fiyat ve kampanya politikanız",
          "Dezavantaj: trafik sıfırdan inşa edilmeli",
          "Dezavantaj: başlangıç yatırımı gerekli",
          "Dezavantaj: teknik yönetim ve bakım sorumluluğu",
        ],
      },
      {
        heading: "İkisini Birlikte Yürütmek: Omnichannel Strateji",
        body: "En akıllıca strateji, Trendyol'u trafik kaynağı olarak kullanırken kendi sitenizi müşteri sadakati merkezi yapmaktır.",
        list: [
          "Trendyol'dan gelen müşteriyi kendi sitenize yönlendirin",
          "Özel ürünler veya fiyatlar ile kendi sitenizde alışverişi teşvik edin",
          "Trendyol + kendi siteniz + e-posta listesi üçgenini kurun",
          "Stok senkronizasyonu için API entegrasyonu şart",
        ],
      },
    ],
    faq: [
      {
        q: "Trendyol'dan kendi sitemde satışa geçiş zor mu?",
        a: "Zor değil, planlama gerektiriyor. Önce kendi sitenizi kurun, ikisini paralel yürütün. Müşteri davranışına göre kanallar arasındaki oranı ayarlayın.",
      },
      {
        q: "Kendi e-ticaret sitesi ne zaman kârlı olur?",
        a: "Aylık 150–200 sipariş üzerinde kendi site genellikle platform komisyonunu karşılar. Ödeme alt yapısı + hosting maliyeti 12–18 ayda başa başa gelir.",
      },
      {
        q: "Trendyol ve kendi sitemi nasıl senkronize ederim?",
        a: "Solman Digital'in Trendyol entegrasyon çözümü ile stok, fiyat ve sipariş verilerini otomatik senkronize edebilirsiniz.",
      },
    ],
    cta: { text: "E-Ticaret Stratejinizi Konuşalım", href: "/trendyol-entegrasyonu", label: "Detay" },
    ctaSecondary: {
      text: "Pazaryeri karşılaştırmasını ücretsiz yapın",
      href: "https://ticarethub.com/pazaryeri-komisyon-karsilastirma",
      label: "TicaretHub Pazaryeri Karşılaştır",
    },
    keywords: [
      "trendyol vs kendi e-ticaret sitesi",
      "trendyol alternatifi",
      "kendi e-ticaret sitesi açmak",
      "trendyol komisyon yüksek",
      "omnichannel e-ticaret türkiye",
    ],
  },
  {
    slug: "woocommerce-vs-nextjs-eticaret",
    title: "WooCommerce mi Next.js mi? E-Ticaret Seçim Rehberi",
    metaTitle: "WooCommerce vs Next.js E-Ticaret 2025 | Solman Digital",
    metaDescription:
      "WooCommerce ve Next.js tabanlı e-ticaret çözümlerinin karşılaştırması. Performans, maliyet, ölçeklenebilirlik ve bakım kolaylığı.",
    description:
      "E-ticaret projeniz için WooCommerce mi yoksa özel Next.js geliştirme mi doğru? Kapsamlı karşılaştırma rehberi.",
    publishDate: "2026-06-05",
    readTime: 6,
    sections: [
      {
        heading: "WooCommerce Nedir ve Kimlere Uygundur?",
        body: "WooCommerce, WordPress üzerine kurulu açık kaynaklı bir e-ticaret eklentisidir. Dünya genelinde 5 milyonun üzerinde aktif kurulum bulunmaktadır.",
        list: [
          "Teknik bilgi az olanlara uygun: kurulum arayüzü basit",
          "Eklenti ekosistemi zengin: ödeme, kargo, CRM entegrasyonları hazır",
          "Türkiye için İyzico resmi eklentisi mevcut",
          "Dezavantaj: eklenti çakışmaları, yavaş yükleme (optimize edilmezse)",
          "Dezavantaj: aylık hosting + eklenti lisans maliyeti birikir",
        ],
      },
      {
        heading: "Next.js E-Ticaret Nedir ve Kimlere Uygundur?",
        body: "Next.js ile geliştirilen e-ticaret siteleri sıfırdan, özelleştirilmiş altyapıyla inşa edilir. Performans ve esneklik ön plandadır.",
        list: [
          "Google PageSpeed 95+: hız, dönüşüm oranını doğrudan etkiler",
          "Aylık platform ücreti yok: Vercel ücretsiz tier ile çalışabilir",
          "Tam özelleştirme: sipariş akışı, ödeme sayfası, upsell tamamen size özel",
          "Dezavantaj: geliştirme maliyeti daha yüksek",
          "Dezavantaj: değişiklik için geliştirici gerekiyor",
        ],
      },
      {
        heading: "Karar Rehberi: Hangisini Seçmeli?",
        body: "Kararı belirleyen 4 ana faktör: bütçe, teknik ekip, ürün sayısı ve büyüme hedefi.",
        list: [
          "Bütçe < ₺15.000 ve ekip yok → WooCommerce başlangıç için makul",
          "Bütçe ₺20.000+ ve ölçeklenme hedefi var → Next.js uzun vadede kazandırır",
          "1.000+ SKU → Next.js'in statik sayfa üretimi (SSG) SEO'yu uçurur",
          "Hızlı başlamak istiyorum → WooCommerce daha kısa sürede canlıya girer",
        ],
      },
    ],
    faq: [
      {
        q: "WooCommerce'ten Next.js'e geçiş mümkün mü?",
        a: "Evet. Ürün, sipariş ve müşteri verileri aktarılabilir. Geçiş süreci 4–6 hafta alır ve SEO kaybını önlemek için redirect planlaması gerektirir.",
      },
      {
        q: "WooCommerce'in aylık maliyeti ne kadar?",
        a: "Hosting (₺500–₺2.000) + gerekli eklentiler (₺1.000–₺3.000/ay) hesaba katıldığında yıllık ₺18.000–₺60.000 maliyet oluşabilir.",
      },
      {
        q: "Next.js e-ticaret için hangi ödeme sistemleri desteklenir?",
        a: "İyzico, Stripe, Paytr ve PayTR entegrasyonları Next.js projesine doğrudan API ile bağlanabilir. Hiçbir eklentiye bağımlılık yoktur.",
      },
    ],
    cta: { text: "E-Ticaret Projeniz İçin Teklif Alın", href: "/hizmetler/eticaret-kurulum", label: "Detay" },
    keywords: [
      "woocommerce vs next.js",
      "woocommerce mi next.js mi e-ticaret",
      "next.js e-ticaret türkiye",
      "woocommerce alternatifi",
      "e-ticaret platform karşılaştırma",
    ],
  },
  {
    slug: "shopify-vs-ozel-gelistirme",
    title: "Shopify vs Özel Geliştirme: Hangisi Sizin İçin?",
    metaTitle: "Shopify vs Özel Geliştirme 2025 | Solman Digital",
    metaDescription:
      "Shopify ile özel e-ticaret geliştirme arasında seçim yapmanıza yardımcı olacak kapsamlı karşılaştırma.",
    description:
      "Shopify'ın aylık aboneliği mi, yoksa özel bir e-ticaret platformu mu? Hangi seçenek işletmenizin büyüklüğüne uygun?",
    publishDate: "2026-06-05",
    readTime: 5,
    sections: [
      {
        heading: "Shopify'ın Artıları ve Eksileri",
        body: "Shopify, hazır altyapısı ile hızlı kurulum ve uygulama mağazasıyla tanınır. Ama her işletme için doğru tercih değildir.",
        list: [
          "Artı: 30 dakikada kurulum, teknik bilgi gerektirmez",
          "Artı: 8.000+ uygulama ile genişletilebilir",
          "Artı: güvenlik ve hosting Shopify tarafından yönetilir",
          "Eksi: aylık $29–$299 + %0.5–2 işlem ücreti",
          "Eksi: Türkiye'de İyzico entegrasyonu doğrudan yok",
          "Eksi: tam özelleştirme kısıtlı — şablona bağımlısınız",
        ],
      },
      {
        heading: "Özel Geliştirmenin Artıları ve Eksileri",
        body: "Next.js ile sıfırdan geliştirilen bir e-ticaret sitesi, uzun vadede size tam kontrol sunar.",
        list: [
          "Artı: aylık platform ücreti yok",
          "Artı: her özellik tamamen size özel",
          "Artı: performans: PageSpeed 95+",
          "Artı: Türkiye'ye özel kargo ve ödeme entegrasyonu",
          "Eksi: yüksek başlangıç maliyeti (₺20.000+)",
          "Eksi: değişiklik için geliştirici desteği gerekiyor",
        ],
      },
      {
        heading: "Karar Kriteri: Hangi İşletme Hangisini Seçmeli?",
        body: "Seçim genellikle aylık sipariş hacmi ve büyüme hızına göre belirlenir.",
        list: [
          "Aylık < 50 sipariş → Shopify yeterlidir, başlangıç için pratik",
          "Aylık 50–200 sipariş → her iki seçenek de değerlendirilebilir",
          "Aylık > 200 sipariş → işlem ücretleri toplamda özel geliştirmeyi karlı kılar",
          "B2B veya toptan satış → Shopify yetersiz, özel geliştirme şart",
          "Trendyol senkronizasyonu gerekiyorsa → özel çözüm zorunlu",
        ],
      },
    ],
    faq: [
      {
        q: "Shopify'dan özel siteye geçiş ne kadar sürer?",
        a: "Ürün aktarımı + yeni geliştirme + test süreci birlikte 3–5 hafta sürer. SEO redirect planlaması bu süreye dahil edilmeli.",
      },
      {
        q: "Özel geliştirme kaç ayda Shopify maliyetini karşılar?",
        a: "Ortalama $79/ay Shopify + %1 işlem ücreti hesabıyla, aylık 300+ sipariş olan bir mağaza 12–18 ayda özel geliştirmeyi amorti eder.",
      },
      {
        q: "Shopify Türkiye'de yasal mı?",
        a: "Evet yasal. Ancak Türkiye'de fatura düzenleme, KDV hesaplama ve İyzico entegrasyonu için ek konfigürasyon veya yazılım gerekebilir.",
      },
    ],
    cta: { text: "E-Ticaret Projeniz İçin Danışın", href: "/hizmetler/eticaret-kurulum", label: "Detay" },
    keywords: [
      "shopify vs özel geliştirme",
      "shopify türkiye maliyet",
      "shopify alternatifi next.js",
      "shopify işlem ücreti",
      "shopify türkiye e-ticaret",
    ],
  },
  {
    slug: "iyzico-vs-stripe",
    title: "İyzico vs Stripe: Türk E-Ticaret Sitesi İçin Hangisi?",
    metaTitle: "İyzico vs Stripe: Türk E-Ticaret İçin Hangisi? | Solman Digital",
    metaDescription:
      "İyzico ve Stripe arasındaki farklar: komisyon oranları, kurulum kolaylığı, Türkiye uyumluluğu ve hangi durumlarda hangisi tercih edilmeli.",
    description:
      "E-ticaret siteniz için ödeme altyapısı seçerken İyzico mu Stripe mi sorusunun cevabı.",
    publishDate: "2026-06-05",
    readTime: 5,
    sections: [
      {
        heading: "İyzico: Türkiye'nin Yerli Ödeme Altyapısı",
        body: "İyzico, Türk bankacılık sistemiyle tam uyumlu, yerel taksit desteği ve güçlü fraud korumasıyla öne çıkıyor.",
        list: [
          "Türk bankaları ve kredi kartlarıyla doğal uyum",
          "Taksitli ödeme: 3–12 taksit seçeneği",
          "TL üzerinden işlem: kur riski yok",
          "Komisyon: işlem başına %2.85 + KDV (hacme göre değişir)",
          "Yerleşim: T+1 iş günü (ertesi gün hesabınızda)",
          "Müşteri tanıma skoru ile fraud tespiti",
        ],
      },
      {
        heading: "Stripe: Global Ödeme Altyapısı",
        body: "Stripe, güçlü API'si ve 135+ ülke desteğiyle uluslararası satış yapanlar için ideal.",
        list: [
          "API kalitesi: en gelişmiş ödeme API'si",
          "Uluslararası kart desteği: Visa, Mastercard, Amex, WeChat Pay",
          "Komisyon: %2.9 + $0.30 (yurt dışı kartlarda daha yüksek)",
          "Dezavantaj: TL taksit desteği yok",
          "Dezavantaj: Türkiye'de bazı banka kartları ek sorun çıkarabilir",
          "Yerleşim: 2 iş günü",
        ],
      },
      {
        heading: "Hangisini Seçmeli?",
        body: "Kararı müşteri profiliniz ve satış hacminiz belirler.",
        list: [
          "Sadece Türk müşteri hedefliyorsanız → İyzico zorunlu, taksit büyük avantaj",
          "Yurt dışı satış yapıyorsanız → Stripe veya ikisi birlikte",
          "SaaS abonelik modeli → Stripe'ın subscription altyapısı çok güçlü",
          "B2C e-ticaret → İyzico dönüşüm oranlarını artırır",
          "Her ikisini de desteklemek en esnek çözüm",
        ],
      },
    ],
    faq: [
      {
        q: "İyzico ve Stripe'ı aynı projede kullanabilir miyim?",
        a: "Evet. Kullanıcının konumuna veya tercihine göre ödeme yöntemini otomatik seçen bir sistem kurulabilir.",
      },
      {
        q: "İyzico entegrasyonu ne kadar sürer?",
        a: "Mevcut bir e-ticaret projesine İyzico entegrasyonu 2–5 iş günü içinde tamamlanabilir.",
      },
      {
        q: "Stripe Türkiye'de şirket sahibi olmadan kullanılabilir mi?",
        a: "Hayır. Stripe Türkiye'deki alıcılar için Türk vergi kimliği ve banka hesabı gerektirir.",
      },
    ],
    cta: { text: "Ödeme Entegrasyonu Hakkında Danışın", href: "/hizmetler/odeme-entegrasyonu", label: "Detay" },
    keywords: [
      "iyzico vs stripe türkiye",
      "iyzico komisyon oranları",
      "stripe türkiye kullanımı",
      "e-ticaret ödeme sistemi",
      "iyzico stripe karşılaştırma",
    ],
  },

  // ─── MARKETPLACE API REHBERLERİ ───────────────────────────────────────────
  {
    slug: "etsy-api-entegrasyonu-turkiye",
    category: "e-ticaret",
    relatedSlugs: ["ebay-api-entegrasyonu-turkiye", "hepsiburada-api-entegrasyonu", "eticaret-sitesi-acmak-turkiye"],
    title: "Etsy API Entegrasyonu: Türk El Yapımı Satıcıları İçin Teknik Rehber",
    metaTitle: "Etsy API Entegrasyonu Türkiye | Solman Digital",
    metaDescription:
      "Etsy Open API v3 ile ürün listeleme, sipariş yönetimi ve stok senkronizasyonu. Türk el yapımı ve el sanatları satıcıları için OAuth 2.0, sandbox ve canlıya geçiş rehberi.",
    description:
      "El yapımı ürün veya özgün tasarımlarınızı Etsy üzerinden dünya pazarına sunuyorsanız, API entegrasyonuyla yönetim yükünü drastik biçimde azaltabilirsiniz.",
    summary:
      "Etsy Open API v3, OAuth 2.0 kimlik doğrulaması ile çalışır ve ürün listeleme (Listing API), sipariş alma (Receipt API) ve mağaza analitiği (Shop API) sunar. Türk satıcılar için kritik not: Etsy USD bazlı çalışır, ödeme alımı için Payoneer veya Wise hesabı zorunludur. Temel API entegrasyonu 1–2 haftada tamamlanır; 200+ aktif ürünü olan mağazalar için API kullanımı manuel panele göre haftada 5–8 saat tasarruf sağlar.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 8,
    sections: [
      {
        heading: "Etsy API Neden Kullanılır?",
        body: "Etsy'nin yönetim paneli küçük hacimler için yeterlidir; ancak ürün sayısı ve sipariş akışı büyüdükçe API entegrasyonu zorunlu hale gelir.",
        list: [
          "Ürün listeleme ve varyant yönetimini toplu yapma",
          "Sipariş bildirimlerini kendi sisteminize almak",
          "Stok seviyelerini WooCommerce / ERP ile senkronize etmek",
          "Mağaza istatistiklerini kendi raporlama aracınıza taşımak",
          "Fiyat güncellemelerini döviz kuruna göre otomatize etmek (USD bazlı)",
        ],
      },
      {
        heading: "Etsy API v3 Mimarisi",
        body: "Etsy 2023 itibarıyla eski v2 API'yi emekliye aldı. Tüm yeni entegrasyonlar Etsy Open API v3 (REST, JSON) üzerinden yapılmalıdır.",
        list: [
          "Listing API — ürün oluşturma, güncelleme, fotoğraf yükleme, varyant yönetimi",
          "Receipt API — sipariş okuma, durum güncelleme, kargo takibi",
          "Shop API — mağaza bilgisi, istatistik ve favori listesi",
          "Taxonomy API — ürün kategorisi ve özellik değerleri",
          "Rate limit: dakikada 10 istek (Basic), dakikada 100 istek (Advanced — başvuru gerekir)",
        ],
      },
      {
        heading: "OAuth 2.0 Kurulumu",
        body: "Etsy API erişimi için Etsy Developer hesabı açıp uygulama oluşturmanız gerekir. Onay süreci genellikle 1–3 iş günü içinde tamamlanır.",
        list: [
          "1. etsy.com/developers → 'Create a New App' ile uygulama oluşturun",
          "2. Keystring (API Key) ve Shared Secret alın",
          "3. PKCE destekli Authorization Code Flow ile kullanıcı token'ı üretin",
          "4. Access Token (1 saat) + Refresh Token süresiz → yenileme mekanizması zorunlu",
          "5. Scopes: listings_r, listings_w, transactions_r, shops_r seçin",
          "6. Redirect URI'yi uygulamanıza kaydedin (localhost test için geçerli)",
        ],
      },
      {
        heading: "Türk Satıcıların Dikkat Etmesi Gerekenler",
        body: "Etsy Türkiye'de doğrudan banka hesabına ödeme yapmamaktadır. Bu durum Türk satıcılar için ek adımlar gerektirir.",
        list: [
          "Ödeme alımı: Payoneer veya Wise USD hesabı açılmalı — kurulum 3–5 iş günü",
          "KDV: Etsy, AB müşterilerine otomatik KDV ekler; Türkiye'de ek yükümlülük yok",
          "Kargo: Etsy'nin yerleşik kargo hesabı Türkiye'yi desteklemez — PTT veya Yurtiçi entegrasyonu ayrıca yapılmalı",
          "Döviz kuru: Ürün fiyatları USD girilmeli; TL maliyet hesabı için otomatik kur güncellemesi scripti önerilir",
          "Satış kotası: Yeni Etsy mağazaları ilk 3 ayda 250 liste limiti ile başlar",
        ],
      },
      {
        heading: "Entegrasyon Adımları ve Süre",
        body: "Solman Digital tarafından gerçekleştirilen Etsy API projelerinde standart zaman çizelgesi şu şekildedir:",
        list: [
          "Gün 1–2: OAuth kurulumu, API bağlantı testi, mağaza veri doğrulama",
          "Gün 3–5: Listing API — toplu ürün okuma / güncelleme / fotoğraf yükleme",
          "Gün 6–8: Receipt API — sipariş webhook, kargo takibi, durum güncelleme",
          "Gün 9–10: Stok senkronizasyonu (WooCommerce / ERP bağlantısı)",
          "Gün 11–12: Test, hata yönetimi, monitoring kurulumu",
          "Toplam: 200 SKU'ya kadar mağazalar için 10–12 iş günü",
        ],
      },
    ],
    faq: [
      {
        q: "Etsy API ücretsiz mi?",
        a: "Etsy Open API v3 kullanımı ücretsizdir. Satışlarda Etsy'nin standart komisyonu (%6.5 + listeleme ücreti 0.20 USD/ürün) geçerlidir. API kullanımı ayrıca ücretlendirilmez.",
      },
      {
        q: "Türkiye'den Etsy mağazası açılabilir mi?",
        a: "Evet. Türkiye, Etsy'nin desteklediği ülkeler arasındadır. Ödeme alımı için Payoneer veya Wise gibi bir ödeme aracısına ihtiyaç duyulur; doğrudan Türk banka hesabına ödeme yapılmamaktadır.",
      },
      {
        q: "WooCommerce ile Etsy entegrasyonu nasıl çalışır?",
        a: "WooCommerce'deki ürün ve stok verileri Etsy API üzerinden senkronize edilir. Sipariş geldiğinde WooCommerce'e otomatik aktarılır. Bu iki yönlü senkronizasyon sayesinde tek noktadan yönetim mümkün olur.",
      },
      {
        q: "Etsy mağazamı Trendyol ile eş zamanlı çalıştırabilir miyim?",
        a: "Evet. Çok kanallı satış otomasyonunda Trendyol + Etsy + Hepsiburada aynı stok ve sipariş akışı üzerinden yönetilebilir. Bu tür çok kanallı projeler genellikle 3–4 haftada tamamlanır.",
      },
    ],
    cta: {
      text: "Etsy API entegrasyonu veya çok kanallı marketplace otomasyonu için",
      href: "/trendyol-entegrasyonu",
      label: "Entegrasyon Teklifi Al",
    },
    keywords: [
      "etsy api entegrasyonu",
      "etsy api türkiye",
      "etsy türkiye satış",
      "etsy woocommerce entegrasyonu",
      "etsy open api v3",
      "türk satıcı etsy",
    ],
  },
  {
    slug: "ebay-api-entegrasyonu-turkiye",
    category: "e-ticaret",
    relatedSlugs: ["hepsiburada-api-entegrasyonu", "trendyol-satici-web-sitesi", "woocommerce-vs-nextjs-eticaret"],
    title: "eBay API Entegrasyonu: Türk Satıcılar İçin Adım Adım Teknik Rehber",
    metaTitle: "eBay API Entegrasyonu Türkiye | Solman Digital",
    metaDescription:
      "eBay Seller API ile ürün listeleme, stok senkronizasyonu ve sipariş yönetimi. Türk satıcılar için OAuth 2.0, sandbox kurulumu ve canlıya geçiş rehberi.",
    description:
      "eBay API entegrasyonuyla ürün yönetimini, sipariş takibini ve fiyatlamayı otomatize edebilirsiniz. Türk satıcıların sıklıkla karşılaştığı teknik engellere odaklanan gerçekçi bir rehber.",
    summary:
      "eBay API entegrasyonu üç katmandan oluşur: kimlik doğrulama (OAuth 2.0), katalog yönetimi (Inventory API) ve sipariş akışı (Fulfillment API). Türk satıcılar için en kritik adım eBay global hesabı açıp hesabı doğrulatmaktır; bu süreç 3–7 iş günü sürer. Teknik entegrasyon sonrasında 500+ SKU'lu mağazalarda sipariş işleme süresi %70 oranında kısalmaktadır.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 9,
    sections: [
      {
        heading: "eBay API Neden Kullanılır?",
        body: "Manuel eBay yönetimi; ürün sayısı arttıkça sürdürülemez hale gelir. eBay API, satıcıların kendi yazılımları veya ERP sistemleriyle eBay'i entegre etmesini sağlar.",
        list: [
          "Ürün listeleme ve güncellemeyi toplu olarak otomatize etmek",
          "Stok seviyelerini kendi sisteminizle senkronize tutmak",
          "Sipariş bildirimleri almak ve kargo takibi güncellemek",
          "Fiyat optimizasyonu için rakip verisi çekmek",
          "eBay mağazası performans raporlarına programatik erişim",
        ],
      },
      {
        heading: "eBay API Türleri: Hangisi Ne İşe Yarar?",
        body: "eBay, RESTful yapıda modüler API'ler sunar. Her modül belirli bir iş sürecini kapsar.",
        list: [
          "Inventory API — ürün ve stok yönetimi (çok lokasyon desteği dahil)",
          "Fulfillment API — sipariş alma, güncelleme ve kargo takibi",
          "Account API — ödeme ve hesap yapılandırması",
          "Buy API — alıcı tarafı arama ve ürün sorguları",
          "Sell Feed API — toplu ürün yükleme için CSV/JSON feed işleme",
          "Analytics API — satış ve görünürlük raporları",
        ],
      },
      {
        heading: "OAuth 2.0 ile Kimlik Doğrulama",
        body: "eBay API tüm isteklerde OAuth 2.0 token gerektirir. İki token tipi vardır: Application Token (kullanıcı oturumu gerektirmeyen işlemler) ve User Token (satıcı adına işlem yapılan tüm write endpoint'leri).",
        list: [
          "1. eBay Developer Program'a kayıt olun (developer.ebay.com)",
          "2. Production Application oluşturun, Client ID ve Client Secret alın",
          "3. Sandbox ortamında test hesabı açın",
          "4. Authorization Code Flow ile satıcı izni alın",
          "5. Access Token (2 saat) ve Refresh Token (18 ay) saklayın",
          "6. Token yenileme (refresh) mekanizmasını sunucu tarafında otomatize edin",
        ],
      },
      {
        heading: "Sandbox Ortamında Test Süreci",
        body: "eBay, canlı hesabı etkilemeden API'yi test edebileceğiniz tam işlevsel bir sandbox ortamı sunar. Sandbox'ta sahte alıcı ve satıcı hesapları oluşturulabilir.",
        list: [
          "Sandbox URL: api.sandbox.ebay.com (production: api.ebay.com)",
          "Sandbox token'ı production token'ından bağımsız üretilir",
          "Gerçek para hareketi yoktur — test ödemeleri simüle edilir",
          "Tüm Inventory ve Fulfillment endpoint'leri sandbox'ta mevcuttur",
          "Tavsiye: sandbox'ta en az 50 ürün, 10 sipariş senaryosu test edilmeli",
        ],
      },
      {
        heading: "Türk Satıcıların Sık Karşılaştığı Teknik Engeller",
        body: "eBay entegrasyonunda Türk satıcıların özellikle yaşadığı sorunlar teknik ve hesap doğrulama kaynaklıdır.",
        list: [
          "Hesap kısıtlaması: yeni eBay hesapları ilk 90 günde liste limiti ile başlar",
          "Ödeme entegrasyonu: eBay Managed Payments zorunlu, Türk banka hesabıyla 7–14 gün onay süreci",
          "Kargo entegrasyonu: uluslararası kargo fiyat hesabı için ShipEngine veya EasyPost API önerilir",
          "Döviz yönetimi: USD/GBP/EUR fiyatlandırma için otomatik kur güncelleme scripti gerekir",
          "Rate limiting: saatte 5.000 API çağrısı limiti — toplu işlemlerde queue yapısı şart",
        ],
      },
      {
        heading: "Entegrasyon Süreci ve Zaman Çizelgesi",
        body: "Solman Digital tarafından gerçekleştirilen eBay API projelerinde standart süreç şu şekilde işlemektedir:",
        list: [
          "Hafta 1: OAuth kurulumu + sandbox entegrasyonu + Inventory API testi",
          "Hafta 2: Fulfillment API + sipariş webhook'ları + kargo takibi",
          "Hafta 3: Production geçiş + stres testi + hata yönetimi",
          "Hafta 4: İzleme panosu + alert sistemi + dokümantasyon",
          "Toplam: 500 SKU'ya kadar projeler genellikle 3–4 haftada canlıya geçer",
        ],
      },
    ],
    faq: [
      {
        q: "eBay API kullanmak için ücret ödeniyor mu?",
        a: "eBay API'nin kendisi ücretsizdir. Ancak eBay üzerinden yapılan satışlarda standart satıcı komisyonları (%8–15, kategoriye göre değişir) geçerlidir. API çağrı limitleri aşıldığında ek ücret değil kısıtlama uygulanır.",
      },
      {
        q: "Türkiye'den eBay'de satış yapabilir miyim?",
        a: "Evet, Türkiye'den eBay global satıcı hesabı açılabilir. eBay Managed Payments sistemi Türkiye'yi desteklemektedir; ancak hesap doğrulama ve ödeme hesabı onayı 7–14 iş günü sürebilir.",
      },
      {
        q: "WooCommerce veya Shopify ile eBay entegrasyonu mümkün mü?",
        a: "Evet. WooCommerce için CedCommerce eBay Integration eklentisi, Shopify için eBay Channel app hazır çözümler sunar. Özel ERP entegrasyonu veya yüksek SKU hacmi için doğrudan API tercih edilir.",
      },
      {
        q: "eBay API entegrasyonu ne kadar sürer?",
        a: "Temel stok + sipariş entegrasyonu 3–4 haftada tamamlanır. Çok kanallı (Trendyol + Hepsiburada + eBay) senkronizasyon içeren projelerde süre 6–8 haftaya uzayabilir.",
      },
    ],
    cta: {
      text: "eBay API entegrasyonu ve çok kanallı satış otomasyonu için",
      href: "/trendyol-entegrasyonu",
      label: "Entegrasyon Hizmeti",
    },
    keywords: [
      "ebay api entegrasyonu",
      "ebay api türkiye",
      "ebay seller api",
      "ebay inventory api",
      "ebay oauth 2.0",
      "türk satıcı ebay entegrasyon",
    ],
  },

  {
    slug: "amazon-turkiye-seller-api",
    category: "e-ticaret",
    relatedSlugs: ["hepsiburada-api-entegrasyonu", "trendyol-satici-web-sitesi", "ebay-api-entegrasyonu-turkiye"],
    title: "Amazon Türkiye Seller API: Satıcılar İçin Entegrasyon Rehberi",
    metaTitle: "Amazon Türkiye Seller API Entegrasyonu | Solman Digital",
    metaDescription:
      "Amazon SP-API (Selling Partner API) ile ürün listeleme, sipariş yönetimi ve stok senkronizasyonu. Amazon Türkiye satıcıları için OAuth LWA, sandbox ve canlı entegrasyon rehberi.",
    description:
      "Amazon Türkiye'de satış yapıyorsanız Selling Partner API ile manuel işlemleri ortadan kaldırabilir, operasyonel yükü ciddi biçimde azaltabilirsiniz.",
    summary:
      "Amazon SP-API (Selling Partner API), eski MWS'nin yerini alan modern REST tabanlı Amazon entegrasyon altyapısıdır. Login with Amazon (LWA) OAuth ile çalışır; Orders, Catalog, FBA Inventory ve Listings API'leri en çok kullanılan modüllerdir. Türkiye'de Amazon satıcısı olmak için Amazon.com.tr satıcı hesabı zorunludur; SP-API erişimi için ayrıca Amazon Developer Central'da uygulama oluşturulup onay alınması gerekir (3–7 iş günü).",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 9,
    sections: [
      {
        heading: "Amazon SP-API Nedir, MWS'den Farkı Ne?",
        body: "Amazon 2022 itibarıyla eski Marketplace Web Service (MWS) API'yi resmi olarak kapattı. Tüm yeni entegrasyonlar Selling Partner API (SP-API) üzerinden yapılmalıdır. SP-API, REST mimarisi ve modern OAuth 2.0 (LWA) kimlik doğrulaması kullanır.",
        list: [
          "MWS: SOAP tabanlı, karmaşık imzalama — artık kullanılamaz",
          "SP-API: RESTful, JSON, LWA OAuth 2.0 — güncel ve zorunlu",
          "Rol tabanlı erişim: her API modülü ayrı izin gerektirir",
          "Sandbox: her modül için ayrı test ortamı mevcut",
          "Rate limiting: her endpoint için bağımsız token bucket sistemi",
        ],
      },
      {
        heading: "Temel SP-API Modülleri",
        body: "Amazon SP-API, her iş sürecine özel modüler API'lerden oluşur. En çok kullanılan modüller şunlardır:",
        list: [
          "Orders API — sipariş listesi, sipariş detayı, sipariş öğeleri",
          "Listings Items API — ürün oluşturma, güncelleme, silme",
          "Catalog Items API — Amazon ürün kataloğunda arama ve detay",
          "FBA Inventory API — FBA stok seviyeleri ve yerleşim bilgisi",
          "Fulfillment Outbound API — Amazon kargo ile sipariş gönderme",
          "Reports API — satış, stok ve performans raporlarının toplu çekimi",
          "Notifications API — gerçek zamanlı sipariş ve fiyat bildirimleri (webhook benzeri)",
        ],
      },
      {
        heading: "LWA OAuth 2.0 Kurulumu",
        body: "SP-API, 'Login with Amazon' (LWA) OAuth 2.0 protokolünü kullanır. Uygulama kaydı ve satıcı yetkilendirmesi için Amazon Developer Central üzerinden işlem yapılır.",
        list: [
          "1. sellercentral.amazon.com.tr → 'Uygulamalar ve Hizmetler' → 'Uygulamaları Geliştir'",
          "2. IAM ARN oluşturun (AWS hesabı zorunlu) ve Developer Central'a ekleyin",
          "3. Uygulama oluşturduktan sonra Client ID ve Client Secret alın",
          "4. Authorization Code Grant ile satıcı izni alın → Refresh Token üretin",
          "5. Refresh Token ile Access Token alın (1 saatte sona erer, otomatik yenileme zorunlu)",
          "6. Her API çağrısında 'x-amz-access-token' header'ı ekleyin",
        ],
      },
      {
        heading: "Amazon Türkiye Özel Notlar",
        body: "Amazon.com.tr (marketplace ID: A33AVAJ2PDY3EV), Amazon'un genel SP-API altyapısını kullanır ancak Türkiye'ye özgü bazı durumlar söz konusudur.",
        list: [
          "FBA Türkiye: Amazon fulfillment merkezi İstanbul Çerkezköy'de — FBA entegrasyonu mümkün",
          "Dil: Listing içerikleri Türkçe olmalı; A+ içerik Türkiye'de destekleniyor",
          "Komisyon: kategoriye göre %8–15, FBA kullanılırsa kargo + depolama ücreti eklenir",
          "VAT: Türkiye KDV kuralları geçerli; B2B satışlar için vergi numarası zorunlu",
          "Brand Registry: kendi markanız varsa marka tescili ile A+ içerik ve Sponsored Brand reklamları açılır",
        ],
      },
      {
        heading: "Entegrasyon Süreci",
        body: "Solman Digital tarafından gerçekleştirilen Amazon SP-API projelerinde standart zaman çizelgesi şu şekildedir:",
        list: [
          "Gün 1–2: Developer Central başvurusu, IAM kurulumu, LWA OAuth testi",
          "Gün 3–5: Orders API — sipariş çekme, durum güncelleme, Notifications API webhook kurulumu",
          "Gün 6–8: Listings API — ürün oluşturma, güncelleme; Catalog API ile ASIN eşleştirme",
          "Gün 9–10: FBA Inventory API veya kendi kargo entegrasyonu",
          "Gün 11–12: Reports API ile satış/performans dashboard'u",
          "Gün 13–15: Stres testi, rate limit yönetimi, monitoring ve dokümantasyon",
        ],
      },
    ],
    faq: [
      {
        q: "Amazon SP-API'ye başvuru ücretsiz mi?",
        a: "Amazon Developer hesabı açmak ve SP-API başvurusu yapmak ücretsizdir. Başvuru onayı 3–7 iş günü sürer. Amazon satıcı hesabı ücretleri (aylık plan veya bireysel plan) ayrıca geçerlidir.",
      },
      {
        q: "Amazon Türkiye ile diğer Amazon pazar yerlerini aynı API ile yönetebilir miyim?",
        a: "Evet. SP-API çok pazar yeri destekler. Aynı uygulama kimlik bilgileriyle Amazon.com.tr, Amazon.de, Amazon.co.uk gibi farklı marketplace'leri yönetebilirsiniz; her pazar yeri için ayrı yetkilendirme gerekir.",
      },
      {
        q: "WooCommerce veya Trendyol ile Amazon entegrasyonu mümkün mü?",
        a: "Evet. Trendyol + Amazon + Hepsiburada çok kanallı senkronizasyonu tek panel üzerinden yönetmek mümkündür. Bu tür çok kanallı projeler genellikle 4–6 haftada tamamlanır.",
      },
      {
        q: "Amazon FBA ile kendi depomdan satış farkı nedir?",
        a: "FBA'da ürünleri Amazon deposuna gönderirsiniz, kargo ve müşteri hizmetlerini Amazon üstlenir; ek maliyet vardır ama Prime rozeti kazanırsınız. Kendi deponuzdan (FBM) satışta tam kontrol sizde, operasyonel yük daha fazladır. SP-API her iki modeli de destekler.",
      },
    ],
    cta: {
      text: "Amazon Türkiye API entegrasyonu veya çok kanallı marketplace otomasyonu için",
      href: "/trendyol-entegrasyonu",
      label: "Entegrasyon Teklifi Al",
    },
    keywords: [
      "amazon türkiye seller api",
      "amazon sp-api entegrasyon",
      "amazon türkiye api entegrasyonu",
      "amazon selling partner api",
      "amazon lwa oauth",
      "amazon marketplace türkiye",
    ],
  },

  {
    slug: "n11-api-entegrasyonu",
    category: "e-ticaret",
    relatedSlugs: ["hepsiburada-api-entegrasyonu", "trendyol-satici-web-sitesi", "amazon-turkiye-seller-api"],
    title: "N11 API Entegrasyonu: Satıcılar İçin Stok ve Sipariş Otomasyonu",
    metaTitle: "N11 API Entegrasyonu | Solman Digital",
    metaDescription:
      "N11 Marketplace API ile ürün yönetimi, stok senkronizasyonu ve sipariş takibi. N11 satıcıları için API bağlantısı, SOAP/REST farkları ve entegrasyon rehberi.",
    description:
      "N11 mağazanızı manuel yönetmek yerine API entegrasyonuyla otomatize edebilir, hata oranını düşürüp operasyonel verimliliği artırabilirsiniz.",
    summary:
      "N11 API, SOAP (eski) ve REST (yeni) olmak üzere iki protokol sunar; yeni projeler için REST API tercih edilmelidir. Ürün listeleme, stok güncelleme ve sipariş yönetimi temel kullanım senaryolarıdır. N11 API erişimi için aktif N11 satıcı hesabı ve API key talebi gereklidir (1–2 iş günü onay). 1.000+ SKU'lu mağazalarda API entegrasyonu haftalık 10–15 saatlik manuel işlem yükünü ortadan kaldırır.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 7,
    sections: [
      {
        heading: "N11 API'nin Kapsamı",
        body: "N11 Marketplace API, satıcıların kendi yazılımları veya ERP sistemleri üzerinden N11 operasyonlarını yönetmesini sağlar. API erişimi N11 Satıcı Merkezi üzerinden talep edilir.",
        list: [
          "Ürün Servisi — ürün oluşturma, güncelleme, silme, kategori bilgisi",
          "Sipariş Servisi — sipariş listesi, detay, durum güncelleme",
          "Kargo Servisi — kargo kodu oluşturma, takip numarası güncelleme",
          "Stok Servisi — anlık stok güncelleme, toplu stok yönetimi",
          "Sorgu Servisi — satış raporları ve performans verileri",
        ],
      },
      {
        heading: "SOAP mu, REST mi?",
        body: "N11, uzun yıllar SOAP tabanlı API kullandı. Yeni API altyapısı REST'e geçiş yapılmıştır; ancak bazı eski metodlar hâlâ SOAP olarak sunulmaktadır.",
        list: [
          "SOAP API: XML tabanlı, eski entegrasyonlar için hâlâ çalışır",
          "REST API: JSON tabanlı, daha hızlı geliştirme, yeni projeler için önerilir",
          "Authentication: her istekte appKey + appSecret header ile iletilir",
          "N11 API endpoint: api.n11.com (production) — sandbox ortamı sınırlı",
          "Rate limit: dakikada 60 istek (hesap tipine göre değişebilir)",
        ],
      },
      {
        heading: "API Key Alma ve Başlangıç",
        body: "N11 API erişimi için Satıcı Merkezi üzerinden talep açılması ve onay beklenmesi gerekir.",
        list: [
          "1. satici.n11.com → 'Entegrasyon Merkezi' → 'API Başvurusu'",
          "2. Başvuruda mağaza bilgileri ve kullanım amacı belirtilir",
          "3. 1–2 iş günü içinde appKey ve appSecret e-posta ile iletilir",
          "4. Her API isteğinde header'a appKey + appSecret eklenir",
          "5. Test: Postman ile /ProductService/getProductList endpoint'i çağrılabilir",
        ],
      },
      {
        heading: "Yaygın Entegrasyon Senaryoları",
        body: "N11 API entegrasyonunda en çok kullanılan senaryolar ve teknik notlar:",
        list: [
          "Toplu stok güncelleme: /StockService/updateStockByStockSellerCode — SKU bazlı, toplu işlem destekli",
          "Sipariş çekme: /OrderService/orderList — tarih aralığı filtresi ile",
          "Fiyat güncelleme: /ProductService/updateProductBasic — ürün ID ile hedefli güncelleme",
          "Kargo bildirimi: /ShipmentService/updateShipment — kargo şirketi kodu + takip numarası",
          "Kategori eşleştirme: /CategoryService/getTopLevelCategories → alt kategori ağacı",
        ],
      },
      {
        heading: "N11 + Trendyol + Hepsiburada: Çok Kanallı Yönetim",
        body: "Çok sayıda platformda satış yapan satıcılar için tek merkezi panel, her platform API'sine ayrı ayrı entegre olan bir çözümden çok daha verimlidir.",
        list: [
          "Tek stok havuzu: N11, Trendyol ve Hepsiburada stoğu merkezi veritabanından senkronize",
          "Birleşik sipariş akışı: tüm platformlardan gelen siparişler tek ekranda",
          "Otomatik fiyat güncelleme: kur değişikliğine göre tüm platformlara eş zamanlı yansıtma",
          "Tek kargo akışı: barkod oluşturma ve kargo bildirimi tek noktadan",
          "Çok kanallı proje süresi: 4–6 hafta (3 platform, 500–2.000 SKU)",
        ],
      },
    ],
    faq: [
      {
        q: "N11 API ücretsiz mi?",
        a: "Evet, N11 API erişimi aktif satıcılar için ücretsizdir. N11'deki satışlardan alınan komisyon oranları (%8–12, kategoriye göre) API kullanımını etkilemez.",
      },
      {
        q: "N11 API sandbox ortamı var mı?",
        a: "N11'in tam işlevsel bir sandbox ortamı yoktur. Test işlemleri için test mağazası açılması veya production ortamında minimal miktarda ürün ve sipariş üzerinden test yapılması önerilir.",
      },
      {
        q: "N11 entegrasyonu WooCommerce ile uyumlu mu?",
        a: "Evet. WooCommerce'den N11'e ürün ve stok senkronizasyonu mümkündür. N11'den WooCommerce'e sipariş aktarımı da desteklenir. Entegrasyon süresi tek yönlü için 5–7 iş günü, çift yönlü için 8–12 iş günüdür.",
      },
      {
        q: "N11 entegrasyonu ne kadar sürer?",
        a: "Yalnızca N11 entegrasyonu 5–8 iş günü içinde tamamlanır. Trendyol + Hepsiburada + N11 gibi çok kanallı projeler 3–5 haftada canlıya geçer.",
      },
    ],
    cta: {
      text: "N11 API entegrasyonu veya çok kanallı marketplace otomasyonu için",
      href: "/trendyol-entegrasyonu",
      label: "Entegrasyon Teklifi Al",
    },
    keywords: [
      "n11 api entegrasyonu",
      "n11 marketplace api",
      "n11 satıcı api",
      "n11 stok senkronizasyonu",
      "n11 sipariş yönetimi api",
      "n11 woocommerce entegrasyon",
    ],
  },

  {
    slug: "cok-kanalli-marketplace-karsilastirma",
    category: "karsilastirma",
    relatedSlugs: ["stok-takip-programi-rehberi", "trendyol-satici-web-sitesi", "ebay-api-entegrasyonu-turkiye"],
    title: "Trendyol mu, eBay mı, Etsy mi? Hangi Platform, Hangi Ürün İçin?",
    metaTitle: "Trendyol vs eBay vs Etsy: Hangi Marketplace? | Solman Digital",
    metaDescription:
      "Trendyol, eBay ve Etsy arasındaki farkları, komisyon yapılarını ve ürün-platform uyumunu karşılaştırın. Türk satıcılar için platform seçim rehberi.",
    description:
      "Her marketplace farklı bir alıcı kitlesine ve ürün tipine hitap eder. Yanlış platformda satış yapmak, düşük dönüşüm ve yüksek komisyon demektir.",
    summary:
      "Trendyol Türkiye'nin en büyük yerel marketplace'idir ve kitle tüketim ürünleri (tekstil, elektronik, ev) için hâlâ en yüksek hacmi sunar. eBay, özellikle koleksiyon ürünleri, ikinci el, nadir parçalar ve niş elektronik için Batı pazarına (ABD, Avrupa) erişim kapısıdır. Etsy ise el yapımı, vintage ve kişiselleştirilmiş ürünlerde küresel premium alıcı kitlesine ulaşır. Platform seçiminin yanlış yapılması, doğru ürünü yanlış izleyici karşısında konumlandırır; dönüşüm düşer, komisyon yükü artar.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 8,
    sections: [
      {
        heading: "Trendyol: Türkiye'de Hacim, Türkiye'de Rekabet",
        body: "Trendyol, 2024 itibarıyla 30 milyonun üzerinde aktif alıcıyla Türkiye'nin tartışmasız lideri. Kitlesel ürünlerde en kısa sürede en fazla satışa ulaşmak için doğru zemin. Ancak rekabetin yoğunluğu ve fiyat baskısı, düşük marjlı ürünleri ciddi şekilde zorluyor.",
        list: [
          "Güçlü olduğu kategoriler: tekstil, elektronik, kozmetik, ev ürünleri, spor",
          "Zayıf olduğu alan: niş/el yapımı ürünler — alıcı kitlesi fiyata duyarlı",
          "Komisyon: %8–25 (kategoriye göre), reklam zorunluluğu giderek artıyor",
          "Lojistik: Trendyol Express ile hızlı kargo → müşteri memnuniyeti yüksek",
          "Sipariş hacmi: günlük 3–5+ milyon sipariş işleniyor (2024 verisi)",
          "Uluslararası: Trendyol yalnızca Türkiye'ye satış — ihracat için yetersiz",
        ],
      },
      {
        heading: "eBay: Niş, Koleksiyon ve İkinci El İçin Küresel Pazar",
        body: "eBay'in 135+ milyon aktif alıcısı (çoğunlukla ABD ve Batı Avrupa) koleksiyon ürünleri, ikinci el elektronik, otomotiv parçaları ve vintage için Trendyol'un karşılayamayacağı talebi temsil ediyor.",
        list: [
          "Güçlü olduğu kategoriler: koleksiyon, vintage, ikinci el, nadir parça, otomotiv",
          "Zayıf olduğu alan: standart kitlesel ürünler — Amazon ile güçlü rekabet var",
          "Komisyon: %13.25 (çoğu kategori) + $0.30 işlem ücreti, Türk satıcı için PayPal/Payoneer zorunlu",
          "Kargo: Türkiye'den uluslararası gönderim → Yurtiçi Kargo veya PTT ile 7–14 gün",
          "Müzayede formatı: eBay'e özgü, nadir ürünleri piyasa üzerinde fiyatlamak için ideal",
          "API olgunluğu: RESTful eBay API güçlü; stok/sipariş otomasyonu için hazır",
        ],
      },
      {
        heading: "Etsy: El Yapımı ve Premium Niş İçin Doğru Sahne",
        body: "Etsy, 96 milyon aktif alıcısıyla el yapımı, kişiselleştirilmiş ve vintage ürünlerde dünyanın en büyük platform. Alıcı kitlesi fiyata değil, hikâyeye ve özgünlüğe duyarlı — bu da ortalama sepet değerini yukarı taşıyor.",
        list: [
          "Güçlü olduğu kategoriler: takı, hediyelik, tekstil, tablo, kişiselleştirilmiş ürün",
          "Zayıf olduğu alan: kitlesel/seri üretim ürünler — Etsy politikasına aykırı olabilir",
          "Komisyon: %6.5 işlem + %3 + $0.25 ödeme işlem ücreti (toplam ~%10)",
          "Reklam: Etsy Ads + Offsite Ads — trafik kalitesi yüksek, CPC düşük",
          "Dil: İngilizce listing zorunlu, Türkçe destek yok",
          "Kargo: Etsy Shipping Label (ABD içi) veya manuel uluslararası kargo",
        ],
      },
      {
        heading: "Platform Seçim Matrisi: Hangi Ürün, Hangi Platform?",
        body: "Aşağıdaki matris, ürün tipine göre platform önceliğini göstermektedir. Çoklu platform yönetimi API entegrasyonu olmadan sürdürülemez hâle gelir.",
        list: [
          "Tekstil/moda (seri üretim) → Trendyol önce, Hepsiburada ikinci",
          "El yapımı takı/hediyelik → Etsy önce, kâr marjı korunur",
          "İkinci el elektronik/koleksiyon → eBay önce, eBay müzayedesi ikinci",
          "Vintage ve antika → Etsy + eBay kombinasyonu, Trendyol uygunsuz",
          "Otomotiv yedek parça → eBay Motors (ABD) + Trendyol (TR) paralel",
          "Kitlesel kozmetik → Trendyol + Hepsiburada, uluslararası için Amazon",
          "Dijital ürün/print-on-demand → yalnızca Etsy (Trendyol/eBay desteklemez)",
        ],
      },
      {
        heading: "Çok Kanallı Satış: Otomasyon Olmadan Olmaz",
        body: "İki veya daha fazla platformda satış yapmak, stok ve sipariş senkronizasyonu olmadan ciddi operasyonel yük yaratır. Her platformun API'si farklı; merkezi bir senkronizasyon katmanı olmadan manuel yönetim kaçınılmaz olarak hata üretir.",
        list: [
          "Stok çakışması: Trendyol ve eBay'de aynı ürün aynı anda satılırsa negatif stok riski",
          "Çözüm: merkezi stok havuzu → her platforma anlık stok push",
          "Sipariş akışı: tüm platformlardan gelen siparişler tek dashboard'da",
          "Fiyat yönetimi: kur değişikliğinde eBay/Etsy fiyatlarını otomatik güncelle",
          "Entegrasyon süresi: Trendyol + eBay + Etsy üçlü proje → 5–7 hafta",
          "Sonuç: manuel 3 panel yerine tek panel, hata oranı sıfıra yakın",
        ],
      },
    ],
    faq: [
      {
        q: "Trendyol ve Etsy'de aynı anda satış yapabilir miyim?",
        a: "Evet. Ancak stok senkronizasyonu olmadan aynı ürünü iki platformda tutmak risklidir. Merkezi stok yönetimi ile hem Trendyol hem Etsy'de sorunsuz satış yapılabilir. Özellikle el yapımı ürünlerde Etsy, Trendyol'dan %30–50 daha yüksek ortalama satış fiyatı sunabilir.",
      },
      {
        q: "Türkiye'den eBay satışı nasıl yapılır?",
        a: "eBay satıcı hesabı açmak için Türkiye'den kayıt yapılabilir, ancak ödeme için Payoneer veya uluslararası banka hesabı zorunludur. Kargo için Yurtiçi Kargo'nun uluslararası servisi veya PTT kullanılabilir. eBay API entegrasyonu ile stok ve sipariş yönetimi otomatik hâle getirilebilir.",
      },
      {
        q: "Etsy komisyonları Trendyol'dan fazla mı?",
        a: "Toplam maliyet olarak benzer seviyelerdedir (%10 vs %8–15). Fark şudur: Etsy alıcı kitlesi fiyata daha az duyarlı olduğu için ortalama sepet değeri ve kâr marjı Trendyol'a göre genellikle daha yüksektir.",
      },
      {
        q: "Hangi platform entegrasyonu daha kolaydır?",
        a: "Trendyol API en gelişmiş Türkçe dokümantasyona sahip; sandbox ortamı güçlüdür. eBay REST API olgun ve kapsamlıdır. Etsy API ise daha basit bir kapsama sahip olmakla birlikte OAuth 2.0 ile modern bir yapıya geçmiştir. Üç platformu tek entegrasyonla yönetmek için bize ulaşın.",
      },
    ],
    cta: {
      text: "Trendyol, eBay ve Etsy entegrasyonu veya çok kanallı marketplace otomasyonu için",
      href: "/trendyol-entegrasyonu",
      label: "Entegrasyon Teklifi Al",
    },
    keywords: [
      "trendyol ebay etsy karşılaştırma",
      "hangi marketplace daha iyi",
      "çok kanallı satış türkiye",
      "trendyol vs etsy",
      "ebay türkiye satış",
      "marketplace platform seçimi",
    ],
  },
  {
    slug: "wix-vs-ozel-web-sitesi",
    title: "Wix ile Özel Web Sitesi Arasındaki Fark: Hangisi Sizin İçin Doğru?",
    metaTitle: "Wix vs Özel Web Sitesi 2026 | Hangisi Daha İyi? | Solman Digital",
    metaDescription:
      "Wix ile özel yazılım arasındaki temel farklar: performans, SEO, maliyet ve ölçeklenebilirlik. Türk işletmeleri için kapsamlı karşılaştırma.",
    description:
      "Wix kolay kurulum sunar ama performans, SEO ve ölçeklenebilirlik açısından özel geliştirmeye kıyasla ciddi kısıtlamalar içerir. Bu karşılaştırma, hangi seçeneğin işletmeniz için doğru olduğunu netleştiriyor.",
    summary:
      "Wix kullanımı kolay bir web sitesi platformudur; ancak performans, SEO ve ölçeklenebilirlik açısından özel geliştirmeye göre ciddi kısıtlamalar sunar. Wix siteler ortalama 3–6 saniye yüklenirken, Next.js ile geliştirilen özel siteler 1 saniyenin altında kalır. Aylık 15–80 USD Wix ücreti yerine tek seferlik özel geliştirme yatırımı, uzun vadede hem maliyet hem de performans avantajı sağlar.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 7,
    category: "karsilastirma",
    sections: [
      {
        heading: "Wix Nedir ve Kim İçin Uygundur?",
        body: "Wix, sürükle-bırak arayüzüyle web sitesi oluşturmayı kolaylaştıran bir SaaS platformdur. Teknik bilgi gerektirmez; ancak bu kolaylık bazı köklü kısıtlamalarla birlikte gelir. Wix, kişisel blog, küçük etkinlik sayfası veya portföy sitesi için makul bir başlangıç noktasıdır. Ancak kurumsal bir işletme, e-ticaret mağazası veya SEO'ya ciddi yatırım yapmak isteyen bir şirket için Wix'in sınırları çok çabuk görünür hale gelir.",
      },
      {
        heading: "Performans Farkı",
        body: "Wix siteler, platform mimarisi gereği Google PageSpeed Insights'ta genellikle 40–65 puan alır. Next.js ile özel geliştirilen siteler ise 90–100 puan bandında çalışır. Bu fark soyut değil: 3 saniye yükleme süresine sahip bir site, ziyaretçilerinin %53'ünü sayfayı yüklemeden kaybeder (Google araştırması). Yavaş site = daha az lead, daha düşük dönüşüm.",
        list: [
          "Wix: ortalama yükleme süresi 3–6 saniye",
          "Next.js özel: ortalama yükleme süresi < 1 saniye",
          "Core Web Vitals: Wix çoğunlukla 'Needs Improvement', özel kod 'Good'",
          "Mobil performans: Wix'in otomatik mobil optimizasyonu sınırlı",
        ],
      },
      {
        heading: "SEO Performansı",
        body: "Wix son yıllarda SEO araçlarını geliştirdi; ancak teknik SEO açısından hâlâ ciddi kısıtlamalar var. Sayfa kaynak kodu JavaScript ağır, render işlemi client-side gerçekleşiyor. Google botu bu sayfaları tarayabilir ama indexleme gecikmesi ve crawl bütçesi sorunları yaşanır. Özel geliştirmede server-side rendering, yapılandırılmış veri (schema.org), özel sitemap ve canonical URL kontrolü tam olarak uygulanabilir.",
      },
      {
        heading: "Maliyet Karşılaştırması",
        body: "Wix'in aylık maliyeti plan seçimine göre değişir ve yıllar içinde birikerek önemli bir harcamaya dönüşür.",
        list: [
          "Wix Temel: ~15 USD/ay → 5 yılda ~900 USD",
          "Wix Business: ~35 USD/ay → 5 yılda ~2.100 USD",
          "Wix Business Elite: ~80 USD/ay → 5 yılda ~4.800 USD",
          "Özel Next.js site: tek seferlik ₺8.000–₺35.000, sonrasında sadece hosting (~$20/ay Vercel)",
        ],
      },
      {
        heading: "Ölçeklenebilirlik ve Özelleştirme",
        body: "Wix uygulamalar ve widget'larla genişletilebilir; ancak temelden özelleştirme yapamazsınız. Trendyol API entegrasyonu, özel ödeme akışı, çok dilli içerik yönetimi veya kullanıcı girişi gibi ihtiyaçlar Wix'te ya hiç mümkün değildir ya da sınırlıdır. Özel geliştirmede tüm bu özellikler sıfırdan veya mevcut kütüphanelerle uygulanabilir.",
      },
      {
        heading: "Veri Sahipliği ve Taşınabilirlik",
        body: "Wix'te sitenizi başka bir platforma taşıyamazsınız. Wix'i bırakırsanız sitenizi sıfırdan yeniden yapmanız gerekir. Özel geliştirmede kaynak kod tamamen size aittir; GitHub reponuza aktarılır, istediğiniz hosting'e deploy edilebilir.",
      },
      {
        heading: "Türk İşletmeler İçin Kritik Not",
        body: "Türkiye'ye özel entegrasyonlar (İyzico ödeme, Trendyol API, e-fatura) Wix üzerinde mümkün değildir. Yerel ödeme altyapısı, Türkçe SEO optimizasyonu ve yerel KOBİ ihtiyaçlarına tam uyum için özel geliştirme şarttır.",
      },
      {
        heading: "Sonuç: Hangisi Ne Zaman?",
        body: "Wix'i tercih edin: Kişisel blog, kısa süreli etkinlik sayfası, teknik desteği olmayan bireyler için başlangıç noktası olarak. Özel geliştirmeyi tercih edin: Kurumsal kimlik, e-ticaret, SEO odaklı içerik sitesi, API entegrasyonu veya ölçeklenebilir bir platform ihtiyacınız varsa.",
      },
    ],
    faq: [
      {
        q: "Wix'ten özel siteye geçiş yapabilir miyim?",
        a: "Evet, ancak içerik aktarımı manuel yapılır. Wix veritabanınızı doğrudan dışa aktaramazsınız. İçerik ve görseller kopyalanarak yeni siteye taşınır. Solman Digital bu geçiş sürecini proje kapsamına dahil ederek yönetir.",
      },
      {
        q: "Wix'te SEO yapılabilir mi?",
        a: "Temel SEO araçları mevcut (meta başlık, description, sitemap). Ancak Core Web Vitals, schema.org, server-side rendering ve sayfa hızı gibi teknik SEO faktörlerinde özel geliştirme açık ara önde. Rekabetçi anahtar kelimeler için Wix ile üst sıralara çıkmak oldukça zordur.",
      },
      {
        q: "Özel web sitesi ne kadar tutar?",
        a: "Landing page ₺8.000–₺15.000, kurumsal site ₺15.000–₺35.000 arasında değişir. Tek seferlik ödeme, aylık platform ücreti yok. Wix'in 5 yıllık toplam maliyetiyle kıyaslandığında çoğu zaman özel geliştirme daha avantajlıdır.",
      },
    ],
    keywords: [
      "wix vs özel web sitesi",
      "wix mi yoksa özel kod mu",
      "wix alternatifi türkiye",
      "wix seo sorunu",
      "wix next.js karşılaştırma",
    ],
    cta: {
      text: "Wix'ten daha hızlı, SEO uyumlu özel web sitesi için",
      href: "/web-sitesi-yaptirmak",
      label: "Web Sitesi Fiyat Teklifi Al",
    },
    relatedSlugs: ["nextjs-mi-wordpress-mi", "shopify-vs-ozel-gelistirme", "web-sitesi-yaptirmak-istiyorum"],
  },
  {
    slug: "web-sitesi-maliyeti-2026",
    title: "Web Sitesi Maliyeti 2026: Türkiye'de Gerçek Fiyatlar",
    metaTitle: "Web Sitesi Maliyeti 2026 Türkiye | Kurumsal & E-Ticaret Fiyatları | Solman Digital",
    metaDescription:
      "2026 yılında Türkiye'de web sitesi yaptırmak ne kadar tutar? Landing page, kurumsal site, e-ticaret ve SaaS için gerçek fiyat aralıkları ve nelerin maliyeti etkilediği.",
    description:
      "2026 yılında Türkiye'de web sitesi maliyeti proje türüne, tercih edilen geliştirici tipine ve entegrasyonlara göre büyük farklılık gösteriyor. Bu rehber, gerçek fiyat aralıklarını ve gizli maliyetleri ortaya koyuyor.",
    summary:
      "2026 yılında Türkiye'de web sitesi maliyeti proje türüne göre büyük farklılık gösterir: Landing page ₺8.000–₺15.000, kurumsal site ₺15.000–₺35.000, e-ticaret ₺25.000–₺60.000, SaaS platform ₺50.000 ve üzeri. Freelancer, ajans ve özel yazılım ofisi seçeneklerinin her birinin farklı fiyat-kalite dengesi vardır. Fiyatı belirleyen faktörler: sayfa sayısı, entegrasyonlar, tasarım özgünlüğü ve teslim süresi.",
    publishDate: "2026-06-10",
    updatedDate: "2026-06-10",
    readTime: 8,
    category: "web-sitesi",
    sections: [
      {
        heading: "2026'da Web Sitesi Fiyatlarını Etkileyen Faktörler",
        body: "Web sitesi maliyeti tek bir rakamla ifade edilemez. Fiyatı belirleyen başlıca etkenler şunlardır: proje türü (statik site, e-ticaret, SaaS), sayfa sayısı, tasarım özgünlüğü (şablon vs. sıfırdan), üçüncü taraf entegrasyonlar (ödeme sistemi, API, CRM), teslim süresi ve hizmet veren tarafın yapısı (freelancer, ajans, yazılım ofisi).",
      },
      {
        heading: "Landing Page Maliyeti",
        body: "Landing page, tek sayfalık dönüşüm odaklı siteler için en hızlı ve uygun maliyetli seçenektir.",
        list: [
          "Şablon tabanlı: ₺3.000–₺6.000 (Wix, Webflow gibi platformlar)",
          "Freelancer (özel tasarım): ₺5.000–₺12.000",
          "Yazılım ofisi (Next.js, sıfırdan): ₺8.000–₺15.000",
          "Teslim süresi: 3–7 iş günü",
        ],
      },
      {
        heading: "Kurumsal Web Sitesi Maliyeti",
        body: "5–15 sayfalık kurumsal tanıtım siteleri, şirket kimliğini taşıyan ve SEO altyapısı sağlam projelerdir.",
        list: [
          "Freelancer: ₺8.000–₺20.000",
          "Orta ölçekli ajans: ₺25.000–₺60.000 (overhead dahil)",
          "Yazılım ofisi (özel, SEO uyumlu): ₺15.000–₺35.000",
          "Teslim süresi: 7–15 iş günü",
        ],
      },
      {
        heading: "E-Ticaret Sitesi Maliyeti",
        body: "Ödeme entegrasyonu, ürün kataloğu ve sipariş yönetimi içeren projeler için maliyetler daha geniş bir banda yayılır.",
        list: [
          "Shopify/Ticimax: ₺5.000–₺15.000 kurulum + aylık platform ücreti",
          "WooCommerce: ₺10.000–₺25.000 (hosting + geliştirme)",
          "Özel Next.js e-ticaret: ₺25.000–₺60.000 (tek seferlik, platform ücreti yok)",
          "Trendyol entegrasyonu dahil: +₺5.000–₺15.000",
          "Teslim süresi: 10–20 iş günü",
        ],
      },
      {
        heading: "SaaS Platform Maliyeti",
        body: "Auth, abonelik sistemi ve çok kiracılı mimari içeren SaaS platformlar en kapsamlı projelerdir.",
        list: [
          "MVP (temel özellikler): ₺50.000–₺100.000",
          "Tam platform (gelişmiş): ₺100.000+",
          "Teslim süresi: 4–12 hafta",
          "Yıllık bakım: proje bütçesinin %15–20'si",
        ],
      },
      {
        heading: "Freelancer mı, Ajans mı, Yazılım Ofisi mi?",
        body: "Her seçeneğin farklı avantajları ve riskleri vardır.",
        list: [
          "Freelancer: Düşük fiyat, ancak süreç yönetimi ve garantisi belirsiz. Küçük, net kapsamlı projeler için uygundur.",
          "Büyük ajans: Kurumsal güvence ve geniş ekip, ancak ajans markupı fiyatı %40–80 artırır. Proje yöneticisi katmanı iletişimi yavaşlatır.",
          "Yazılım ofisi (Solman Digital gibi): Doğrudan uzman erişimi, ajans markupı yok, garantili teslim. Orta-büyük projeler için en iyi fiyat/kalite dengesi.",
        ],
      },
      {
        heading: "Gizli Maliyetler: Nelere Dikkat Etmeli?",
        body: "Web sitesi maliyeti sadece geliştirme ücretiyle bitmiyor. Aşağıdaki kalemleri toplam bütçenize dahil edin:",
        list: [
          "Domain: yılda ₺200–₺1.500",
          "Hosting: ₺200–₺2.000/ay (Vercel, VPS gibi seçeneklere göre değişir)",
          "SSL sertifikası: genellikle hosting'e dahil, ücretsiz (Let's Encrypt)",
          "Aylık bakım ve güncellemeler: proje bütçesinin %10–15'i/yıl",
          "SEO çalışması: ₺3.000–₺10.000/ay (ajans tercihe bağlı)",
        ],
      },
      {
        heading: "Doğru Teklifi Almak İçin Sormanız Gereken Sorular",
        body: "Fiyat teklifi alırken belirsizliği ortadan kaldırmak için şu soruları sorun: Kaynak kod size mi ait? Teslim tarihi sözleşmede yazılı mı? Revizyon hakları kaç tur? 1. yıl sonrası bakım ücreti var mı? Hosting size mi, onlara mı aittir?",
      },
    ],
    faq: [
      {
        q: "2026'da web sitesi yaptırmak ne kadar tutar?",
        a: "Landing page ₺8.000–₺15.000, kurumsal site ₺15.000–₺35.000, e-ticaret ₺25.000–₺60.000, SaaS platform ₺50.000 ve üzeri. Fiyat; sayfa sayısı, entegrasyonlar ve hizmet sağlayıcı tipine göre değişir.",
      },
      {
        q: "Ucuz web sitesi yaptırmak riskli midir?",
        a: "Evet. ₺3.000–₺5.000 altındaki teklifler genellikle şablon siteleri, düşük kaliteli hosting veya belirsiz kapsam içerir. Teslim sonrası teknik sorunlarda destek alamamak ve siteyi baştan yaptırmak zorunda kalmak daha pahalıya mal olur.",
      },
      {
        q: "Yıllık bakım ücreti ödemeden site çalışmaya devam eder mi?",
        a: "Evet, çoğu projede site bakımsız da çalışır. Ancak güvenlik yamaları, framework güncellemeleri ve içerik değişiklikleri için ya kendi geliştiricinizin olması ya da bir bakım anlaşması yapılması önerilir.",
      },
    ],
    keywords: [
      "web sitesi maliyeti 2026",
      "web sitesi fiyatları türkiye",
      "kurumsal web sitesi ne kadar tutar",
      "e-ticaret sitesi maliyeti",
      "web sitesi yaptırmak 2026",
    ],
    cta: {
      text: "Projeniz için gerçek fiyat almak istiyorsanız",
      href: "/ucretsiz-analiz",
      label: "Ücretsiz Analiz ve Fiyat Teklifi",
    },
    relatedSlugs: ["istanbul-web-sitesi-fiyatlari", "wix-vs-ozel-web-sitesi", "web-sitesi-yaptirmak-istiyorum"],
  },
  {
    slug: "stok-takip-programi-rehberi",
    category: "saas",
    title: "Stok Takip Programı: Excel'den Kendi Yazılımınıza Geçiş",
    metaTitle: "Stok Takip Programı Rehberi 2026 | Solman Digital",
    metaDescription:
      "Ücretsiz Excel şablonundan özel stok takip yazılımına: hangi işletme ne zaman geçmeli, hazır program mı özel yazılım mı, maliyet ve özellik karşılaştırması.",
    description:
      "Stok takibi büyüyen her işletmenin er ya da geç çarptığı duvar. Excel ne zaman yetmez, hazır programlar nerede tıkanır, özel yazılım hangi noktada mantıklı olur — gerçek proje deneyimiyle anlatıyoruz.",
    summary:
      "Küçük işletmeler stok takibine genellikle ücretsiz Excel şablonuyla başlar; bu, tek depo ve düşük SKU sayısında yeterlidir. Birden çok satış kanalı (mağaza + Trendyol + kendi siteniz), birden çok depo veya 500+ ürün devreye girdiğinde Excel'de çift satış ve veri tutarsızlığı kaçınılmaz olur. Bu aşamada hazır stok programları hızlı çözümdür ancak kendi iş akışınıza tam oturmaz; pazaryeri entegrasyonu ve özel raporlama gerekiyorsa özel geliştirilmiş bir stok takip yazılımı uzun vadede daha düşük toplam maliyet sağlar.",
    publishDate: "2026-06-22",
    readTime: 7,
    sections: [
      {
        heading: "Excel ile Stok Takibi Ne Zamana Kadar Yeter?",
        body: "Ücretsiz bir stok takip programı arayan çoğu işletme aslında Excel ya da Google E-Tablolar ile başlar — ve bu, başlangıç için tamamen doğru bir karardır. Tek depo, sınırlı ürün ve tek satış kanalı varken Excel hem ücretsizdir hem de esnek. Sorun, büyüme başladığında ortaya çıkar.",
        list: [
          "Tek kişi güncelliyorsa Excel yeterli; ekip ortak girince sürüm karmaşası başlar",
          "500'ün altında SKU'da yönetilebilir, üstünde formüller yavaşlar ve hata artar",
          "Tek satış kanalında çalışır; mağaza + pazaryeri + web sitesi olunca senkronizasyon kopar",
          "Geçmiş hareket ve kâr analizi Excel'de manuel — büyüdükçe vakit yakar",
        ],
      },
      {
        heading: "Hazır Stok Takip Programı mı, Özel Yazılım mı?",
        body: "İkinci aşamada çoğu işletme hazır bir stok programına geçer. Bu makul bir adımdır: hızlı kurulur, aylık abonelikle başlar. Ancak hazır programlar genel kitleye göre tasarlandığı için sizin özel iş akışınıza — örneğin kendi üretim reçetenize, özel barkod sisteminize veya pazaryeri stok kurallarınıza — tam oturmaz.",
        list: [
          "Hazır program: hızlı başlangıç, düşük ilk maliyet, sınırlı özelleştirme, aylık abonelik birikir",
          "Özel yazılım: iş akışınıza birebir oturur, pazaryeri entegrasyonu dahil edilebilir, tek seferlik geliştirme",
          "Kritik soru: programı işinize mi uyduruyorsunuz, yoksa işinizi programa mı?",
        ],
      },
      {
        heading: "Çok Kanallı Satışta Stok Senkronizasyonu",
        body: "Stok takibinin en pahalı hatası çift satıştır: aynı ürünü hem mağazada hem Trendyol'da satıp stoğun bitmesi. Birden fazla kanaldan satış yapıyorsanız stok takip yazılımınızın pazaryeri ve kendi web sitenizle gerçek zamanlı senkron olması şarttır. Solman Digital olarak geliştirdiğimiz stok çözümlerinde Trendyol, Hepsiburada ve kendi e-ticaret sitesi tek bir stok havuzundan beslenir — bir kanalda satış olduğunda diğerleri otomatik güncellenir.",
      },
      {
        heading: "Özel Stok Takip Yazılımı Ne Zaman Mantıklı?",
        body: "Özel yazılım her işletme için değildir. Aşağıdaki durumların ikisi sizde varsa, hazır programın aylık maliyeti ve sınırları yerine kendi yazılımınızı değerlendirmenin tam zamanıdır.",
        list: [
          "Birden çok satış kanalı (mağaza, pazaryeri, web) eş zamanlı yönetiliyor",
          "Birden çok depo veya konsinye / şube stoğu var",
          "Üretim / montaj reçetesi nedeniyle standart programlar yetmiyor",
          "Hazır program aboneliği yıllık olarak ciddi bir tutara ulaştı",
          "Mevcut programdan veri raporu almak sürekli dışa aktarma gerektiriyor",
        ],
      },
      {
        heading: "Maliyet: Abonelik mi, Tek Seferlik Geliştirme mi?",
        body: "Hazır programlar düşük aylık ücretle çekici görünür ama çok kullanıcılı ve çok kanallı paketlerde yıllık maliyet hızla yükselir. Özel geliştirilen bir stok takip yazılımı tek seferlik bir yatırımdır; sahip olduğunuz için aylık abonelik ödemezsiniz ve ihtiyaç değiştikçe genişletilebilir. Hangisinin sizin için uygun olduğu satış hacminize, kanal sayınıza ve büyüme planınıza bağlıdır — bu kararı birlikte netleştirebiliriz.",
      },
    ],
    faq: [
      {
        q: "Gerçekten ücretsiz stok takip programı var mı?",
        a: "Excel / Google E-Tablolar şablonları ücretsizdir ve küçük, tek kanallı işletmeler için başlangıçta yeterlidir. Bazı hazır programların ücretsiz başlangıç planı vardır ancak kullanıcı, ürün veya kanal sayısı arttıkça ücretli pakete geçmeniz gerekir.",
      },
      {
        q: "Stok programı pazaryeri ile entegre olabilir mi?",
        a: "Evet. Trendyol, Hepsiburada gibi pazaryerleri ve kendi e-ticaret siteniz tek stok havuzundan beslenecek şekilde entegre edilebilir. Bu, çift satış riskini ortadan kaldırır. Hazır programların bir kısmı bunu sınırlı sunar; özel yazılımda iş kurallarınıza göre tam kontrol sağlanır.",
      },
      {
        q: "Özel stok takip yazılımı ne kadar sürede hazır olur?",
        a: "Kapsama bağlıdır. Temel bir çok depolu stok yönetimi birkaç hafta içinde kullanıma alınabilir; pazaryeri entegrasyonu ve özel raporlama eklendikçe süre kapsamla birlikte planlanır. Kesin süre ve maliyet, ihtiyaç görüşmesinde netleşir.",
      },
    ],
    cta: {
      text: "İşletmenize özel stok takip yazılımı ihtiyacınızı konuşalım",
      href: "/ucretsiz-analiz",
      label: "Ücretsiz Analiz ve Fiyat Teklifi",
    },
    keywords: [
      "stok takip programı",
      "ücretsiz stok takip programı",
      "excel stok takip programı",
      "depo stok programı",
      "özel stok takip yazılımı",
      "pazaryeri stok senkronizasyonu",
    ],
    relatedSlugs: ["saas-mvp-sureci", "cok-kanalli-marketplace-karsilastirma", "trendyol-satici-web-sitesi"],
  },
  {
    slug: "google-reklam-ajansi-mi-kendiniz-mi",
    category: "dijital-pazarlama",
    title: "Google Reklam Ajansı mı, Kendiniz mi Yönetmeli?",
    metaTitle: "Google Reklam Ajansı Seçimi: Nelere Dikkat Etmeli? | Solman Digital",
    metaDescription:
      "Google Ads kampanyanızı ajansa mı vermeli, kendiniz mi yönetmelisiniz? Ajans ücret modelleri, Google Partner ne demek, doğru ajansı seçerken sorulacak sorular.",
    description:
      "Google reklamı para yakmak ile müşteri kazanmak arasında ince bir çizgide ilerler. Ajansla çalışmak ne zaman mantıklı, ajans seçerken neye bakmalı, ücret modelleri nasıl çalışır — şeffafça anlatıyoruz.",
    summary:
      "Küçük bütçeli ve basit kampanyalarda Google Ads'i kendiniz yönetebilirsiniz; arayüz buna izin verir. Ancak dönüşüm takibi, doğru anahtar kelime eşleme türleri, negatif kelime yönetimi ve teklif stratejisi devreye girdiğinde uzmanlık fark yaratır — yanlış kurulmuş bir kampanya bütçeyi alakasız tıklamalara harcar. Bir Google reklam ajansıyla çalışmanın değeri, harcamayı azaltmaktan çok aynı bütçeden daha fazla nitelikli müşteri çıkarmaktır. Ajans seçerken Google Partner rozeti, şeffaf raporlama ve dönüşüm odaklı (tıklama değil) yaklaşım belirleyicidir.",
    publishDate: "2026-06-22",
    readTime: 6,
    sections: [
      {
        heading: "Google Ads'i Kendiniz Yönetebilir misiniz?",
        body: "Google Ads arayüzü herkese açıktır ve küçük, basit bir kampanyayı kendiniz kurabilirsiniz. Sorun kurmakta değil, optimize etmekte. Reklamın ilk haftası genellikle iyi görünür; asıl iş, hangi aramaların müşteriye, hangilerinin boşa harcamaya dönüştüğünü ayıklamaktır.",
        list: [
          "Kampanya kurmak kolay; dönüşüm takibini doğru kurmak teknik bilgi ister",
          "Anahtar kelime eşleme türü (broad / phrase / exact) yanlışsa bütçe alakasız aramalara gider",
          "Negatif kelime listesi olmadan iş arayanlar, ödevciler ve araştırmacılar tıklar",
          "Teklif stratejisi yanlışsa Google bütçeyi en kârlı aramaya değil, en kolay tıklamaya harcatır",
        ],
      },
      {
        heading: "Ajansla Çalışmanın Asıl Değeri Nedir?",
        body: "Yaygın yanılgı, ajansın reklamı 'ucuzlatacağı'dır. Gerçekte ajansın değeri aynı bütçeden daha fazla nitelikli müşteri çıkarmaktır. İyi yönetilen bir hesapta bütçe azalmaz; her liranın getirisi artar. Solman Digital olarak kendi reklam hesabımızda da uyguladığımız yaklaşım, niyet filtrelemeye dayanır: bilgi amaçlı ve iş arayan trafiği negatiflerle eler, satın almaya yakın aramalara odaklanırız.",
      },
      {
        heading: "Google Partner Rozeti Ne Anlama Gelir?",
        body: "Bir ajansın 'Google Partner' olması, Google'ın belirlediği harcama eşiğini ve sertifikasyon kriterlerini karşıladığı anlamına gelir. Bu, kalite garantisi değildir ama temel bir yeterlilik göstergesidir. Rozetin tek başına yeterli olmadığını, asıl bakılması gerekenin geçmiş sonuçlar ve raporlama şeffaflığı olduğunu unutmayın.",
      },
      {
        heading: "Ajans Seçerken Sorulacak Sorular",
        body: "Doğru ajansı yanlış olandan ayıran şey, cevaplardaki şeffaflıktır. Bir ajansla görüşürken şu soruları sorun ve net, ölçülebilir cevap bekleyin.",
        list: [
          "Hangi metriği iyileştireceksiniz — tıklama mı, dönüşüm mü, müşteri başına maliyet mi?",
          "Reklam hesabı kimin adına? Hesap her zaman sizin mülkiyetinizde olmalı",
          "Raporlamada ham veriyi mi yoksa sadece güzel grafikleri mi görüyorum?",
          "Dönüşüm takibi nasıl kurulacak (form, arama, WhatsApp)?",
          "Ücret modeli ne — sabit mi, harcama yüzdesi mi, sonuç bazlı mı?",
        ],
      },
      {
        heading: "Ücret Modelleri: Sabit, Yüzde, Sonuç Bazlı",
        body: "Google reklam ajansları genellikle üç modelden biriyle çalışır. Sabit aylık ücret öngörülebilirdir; harcama yüzdesi büyüdükçe maliyetiniz de artar (ajansın çok harcatma motivasyonu doğabilir); sonuç bazlı model en hizalı olandır ama her iş için kurulamaz. Hangi modelin sizin bütçenize ve hedefinize uyduğunu birlikte değerlendirebiliriz.",
      },
    ],
    faq: [
      {
        q: "Küçük bütçeyle ajansla çalışmaya değer mi?",
        a: "Çok küçük bütçelerde ajans ücreti reklam bütçesini gölgede bırakabilir; bu durumda doğru kurulmuş bir kampanya + dönüşüm takibiyle kendiniz başlayabilirsiniz. Bütçe ve kanal sayısı arttıkça, yanlış harcamayı önlemenin getirisi ajans ücretini karşılamaya başlar.",
      },
      {
        q: "Google Partner olmak iyi ajans demek mi?",
        a: "Partner rozeti temel bir yeterlilik göstergesidir, kalite garantisi değil. Asıl bakılması gereken; geçmiş dönüşüm sonuçları, raporlama şeffaflığı ve hesabın sizin mülkiyetinizde kalmasıdır.",
      },
      {
        q: "Reklam hesabı kimin adına açılmalı?",
        a: "Her zaman sizin adınıza. Hesap mülkiyeti sizde olmalı ki ajansla yollar ayrılsa bile geçmiş veri, kampanyalar ve dönüşüm geçmişi sizde kalsın. Bu, ajans seçerken en kritik şeffaflık maddesidir.",
      },
    ],
    cta: {
      text: "Google reklam kurulumunuzu ve dönüşüm takibinizi birlikte gözden geçirelim",
      href: "/ucretsiz-analiz",
      label: "Ücretsiz Reklam Analizi",
    },
    relatedSlugs: ["google-ads-vs-seo", "web-sitesi-seo-teknikleri", "landing-page-nedir"],
    keywords: [
      "google reklam ajansı",
      "google ads ajansı",
      "google ads reklam ajansı",
      "google partner ajans",
      "google reklam yönetimi",
    ],
  },
]

export function getRehberBySlug(slug: string): RehberPost | undefined {
  return rehberPosts.find((p) => p.slug === slug)
}

// İlgili rehberleri döndürür. Açıkça tanımlı relatedSlugs varsa onları,
// yoksa ortak keyword'e göre en yakın yazıları seçer (fallback).
export function getRelatedRehber(slug: string, limit = 3): RehberPost[] {
  const post = getRehberBySlug(slug)
  if (!post) return []

  if (post.relatedSlugs?.length) {
    return post.relatedSlugs
      .map((s) => getRehberBySlug(s))
      .filter((p): p is RehberPost => Boolean(p))
      .slice(0, limit)
  }

  // Fallback: ortak keyword sayısına göre skorla
  const others = rehberPosts.filter((p) => p.slug !== slug)
  return others
    .map((p) => ({
      post: p,
      score: p.keywords.filter((k) => post.keywords.includes(k)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post)
}

// Bir veya birden çok kategorideki rehberleri sırayla döndürür (landing → içerik iç linkleme).
// Tek kategori ince (1 yazı) ise fallback kategorilerden tamamlanır; tekrarlar elenir.
export function getRehberByCategory(
  category: RehberCategory | RehberCategory[],
  limit = 3
): RehberPost[] {
  const cats = Array.isArray(category) ? category : [category]
  const seen = new Set<string>()
  const out: RehberPost[] = []
  for (const cat of cats) {
    for (const p of rehberPosts) {
      if (p.category === cat && !seen.has(p.slug)) {
        seen.add(p.slug)
        out.push(p)
        if (out.length >= limit) return out
      }
    }
  }
  return out
}
