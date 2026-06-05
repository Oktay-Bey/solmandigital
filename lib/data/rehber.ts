export type RehberPost = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  description: string
  publishDate: string
  readTime: number
  sections: Array<{
    heading: string
    body: string
    list?: string[]
  }>
  faq: Array<{ q: string; a: string }>
  cta: { text: string; href: string; label: string }
  keywords: string[]
  relatedSlugs?: string[]
}

export const rehberPosts: RehberPost[] = [
  {
    slug: "trendyol-satici-web-sitesi",
    relatedSlugs: ["hepsiburada-api-entegrasyonu", "trendyol-vs-eticaret-sitesi", "trendyol-komisyon-hesaplama"],
    title: "Trendyol Satıcısı Web Sitesi Yaptırmalı mı?",
    metaTitle: "Trendyol Satıcısı Web Sitesi Yaptırmalı mı? | Solman Digital",
    metaDescription:
      "Trendyol satıcıları için bağımsız web sitesi kurmanın avantajları, doğru zamanlama ve teknik gereksinimler. Gerçek proje deneyimiyle hazırlanmış rehber.",
    description:
      "Trendyol mağazanız büyürken platformdan bağımsız bir dijital varlık oluşturmak kritik hale gelir. Bu rehberde neden, ne zaman ve nasıl sorusuna yanıt veriyoruz.",
    publishDate: "2025-05-01",
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
    keywords: [
      "trendyol satıcı web sitesi",
      "trendyol api entegrasyonu",
      "trendyol mağaza web sitesi",
      "trendyol satıcı e-ticaret",
    ],
  },
  {
    slug: "ai-icerik-otomasyonu-nedir",
    title: "AI İçerik Otomasyonu Nedir? E-Ticaret ve Haber Siteleri İçin Kullanım Rehberi",
    metaTitle: "AI İçerik Otomasyonu Nedir? | Solman Digital",
    metaDescription:
      "OpenAI GPT-4o ve Claude AI ile Türkçe ürün açıklaması, haber özeti ve SEO içeriği otomasyonu. Gerçek proje örnekleriyle kapsamlı rehber.",
    description:
      "Binlerce ürün açıklamasını, haber özetini veya SEO içeriğini tek tek yazmak yerine yapay zeka pipeline'ıyla otomatize etmek artık mümkün. Gerçek proje deneyimiyle hazırlanmış rehber.",
    publishDate: "2025-05-10",
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
    relatedSlugs: ["kurumsal-web-sitesi-fiyatlari", "web-sitesi-yaptirmak-istiyorum", "nextjs-mi-wordpress-mi"],
    title: "İstanbul'da Web Sitesi Fiyatları 2025 — Gerçekçi Rehber",
    metaTitle: "İstanbul'da Web Sitesi Fiyatları 2025 | Solman Digital",
    metaDescription:
      "İstanbul'da kurumsal web sitesi, e-ticaret ve SaaS proje fiyatları. Ajans, serbest geliştirici ve özel yazılım ofisi karşılaştırması. 2025 güncel rakamlar.",
    description:
      "İstanbul'da web sitesi yaptırmak isteyenler için gerçekçi fiyat aralıkları, ne etkiler, nasıl karşılaştırılır. Belirsiz tekliflere son.",
    publishDate: "2025-05-15",
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
    relatedSlugs: ["saas-nedir-turkiye", "nextjs-avantajlari", "freelance-yazilimci-mi-ajans-mi"],
    title: "SaaS MVP Süreci: Türkiye'de Fikrinizi 6 Haftada Ürüne Dönüştürün",
    metaTitle: "SaaS MVP Süreci Türkiye | Solman Digital",
    metaDescription:
      "SaaS MVP nedir, nasıl planlanır, ne kadar sürer? Türkiye pazarına yönelik SaaS geliştirme sürecinin gerçekçi rehberi. Abonelik, çok kiracılı mimari ve fiyatlandırma.",
    description:
      "Fikrinizi minimum geliştirme süresinde, gerçek kullanıcıyla test edilebilir bir ürüne dönüştürmenin sistematik yolu.",
    publishDate: "2025-05-20",
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
    title: "Next.js mi WordPress mi? Projenize Uygun Teknolojiyi Seçin",
    metaTitle: "Next.js mi WordPress mi? | Solman Digital",
    metaDescription:
      "Next.js ve WordPress arasında fark nedir? Hangi proje için hangisi doğru seçimdir? Gerçek proje deneyimiyle hazırlanmış karşılaştırma rehberi.",
    description:
      "Her projeye Next.js gerekmez, her projeye WordPress yetmez. Doğru teknolojiyi seçmenin sistematik yolu.",
    publishDate: "2025-05-25",
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
    title: "İyzico Entegrasyonu: Web Sitenize Türk Kartı Desteği Nasıl Eklenir?",
    metaTitle: "İyzico Entegrasyonu Nasıl Yapılır? | Solman Digital",
    metaDescription:
      "İyzico ödeme entegrasyonu adımları, API kurulumu, test ortamı ve canlıya geçiş. Türkiye'deki e-ticaret projeleri için kapsamlı İyzico rehberi.",
    description:
      "Türkiye'de online ödeme almanın standart yolu İyzico. Entegrasyon sürecini, teknik gereksinimleri ve sık karşılaşılan sorunları gerçek proje deneyimiyle aktarıyoruz.",
    publishDate: "2025-06-01",
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
    relatedSlugs: ["iyzico-entegrasyonu", "shopify-alternatifi-turkiye", "woocommerce-vs-nextjs-eticaret"],
    title: "Türkiye'de E-Ticaret Sitesi Açmak: Yasal, Teknik ve Pazarlama Adımları",
    metaTitle: "Türkiye'de E-Ticaret Sitesi Açmak | Solman Digital",
    metaDescription:
      "Türkiye'de e-ticaret sitesi açmak için gereken yasal belgeler, teknik altyapı ve pazarlama adımları. Başlangıçtan canlıya kadar kapsamlı rehber.",
    description:
      "Türkiye'de online satış yapmak isteyenler için vergi kaydından teknik altyapıya, ödeme sisteminden Google'da görünürlüğe kadar tüm adımlar.",
    publishDate: "2025-06-05",
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
    title: "Web Sitenize AI Chatbot Entegrasyonu: Ne Zaman, Nasıl ve Hangi Teknolojiyle?",
    metaTitle: "Web Sitesi AI Chatbot Entegrasyonu | Solman Digital",
    metaDescription:
      "Web sitenize müşteri hizmetleri chatbotu entegre etmek için doğru teknoloji, maliyet ve süreç rehberi. ChatGPT API ile özel chatbot nasıl kurulur?",
    description:
      "Her web sitesi chatbota ihtiyaç duymaz — ama ihtiyaç duyduğunda doğru yapılmazsa hem para hem müşteri kaybettirir. Gerçek proje deneyimiyle hazırlanmış rehber.",
    publishDate: "2025-06-10",
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
    title: "Hepsiburada API Entegrasyonu: Satıcılar İçin Teknik Rehber",
    metaTitle: "Hepsiburada API Entegrasyonu | Solman Digital",
    metaDescription:
      "Hepsiburada Marketplace API ile stok senkronizasyonu, sipariş yönetimi ve fiyat güncellemesi. Satıcılar için adım adım teknik rehber.",
    description:
      "Hepsiburada'da satış yapıyorsanız ve operasyonel yükü azaltmak istiyorsanız API entegrasyonu kritik bir adımdır. Gerçek proje deneyimiyle hazırlanmış teknik rehber.",
    publishDate: "2025-06-15",
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
