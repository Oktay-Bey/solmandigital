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
}

export const rehberPosts: RehberPost[] = [
  {
    slug: "trendyol-satici-web-sitesi",
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
      href: "/iletisim",
      label: "Ücretsiz Danışmanlık Al",
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
      href: "/iletisim",
      label: "Ücretsiz Görüşme Talep Et",
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
      href: "/iletisim",
      label: "Ücretsiz Teklif Al",
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
      href: "/iletisim",
      label: "Ücretsiz Kapsam Görüşmesi",
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
      href: "/iletisim",
      label: "Ücretsiz Teknik Danışmanlık",
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
      href: "/iletisim",
      label: "Ücretsiz Teknik Görüşme",
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
      href: "/iletisim",
      label: "Ücretsiz Kapsam Görüşmesi",
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
      href: "/iletisim",
      label: "Ücretsiz Teknik Değerlendirme",
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
      href: "/iletisim",
      label: "Teknik Görüşme Talep Et",
    },
    keywords: [
      "hepsiburada api entegrasyonu",
      "hepsiburada satıcı api",
      "trendyol hepsiburada çift kanal",
      "marketplace api türkiye",
      "hepsiburada stok senkronizasyonu",
    ],
  },
]

export function getRehberBySlug(slug: string): RehberPost | undefined {
  return rehberPosts.find((p) => p.slug === slug)
}
