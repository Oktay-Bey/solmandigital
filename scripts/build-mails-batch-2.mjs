// Trendyol satıcıları için kişiselleştirilmiş lead mailleri → scripts/leads-batch-2.json
import { writeFileSync } from "node:fs"

const CAMPAIGN = "trendyol-batch-1"

const SOLUTION =
  "Solman Digital olarak Trendyol satıcıları için kendi e-ticaret siteleri geliştiriyoruz: hızlı ve mobil uyumlu tasarım, güvenli ödeme sistemi, ürün yönetimi ve SEO altyapısı. Trendyol'daki satışlarınızı sürdürürken paralel kendi kanalınızı da açabilirsiniz. Başından sonuna aynı uzmanla, katmansız iletişimle."

const leads = [
  // --- Tekstil / Şal / Esarp ---
  {
    slug: "modanokta",
    to: "modaesarp26@gmail.com",
    subject: "Moda Nokta'nın Trendyol başarısını kendi kanalına taşıyalım",
    compliment:
      "Moda Nokta, Trendyol'da <strong>şal ve esarp kategorisinde</strong> Türkiye'nin yanı sıra Suudi Arabistan ve Bahreyn gibi ihracat pazarlarına da ulaşan bir marka — bu, çoğu Trendyol satıcısının henüz yakalayamadığı bir erişim.",
    opportunity:
      "Bu uluslararası müşteri tabanını kendi e-ticaret sitenizde büyütmek mümkün: her satıştan Trendyol komisyonu gitmiyor, müşteri verisi size kalıyor ve marka kimliğiniz platformun gölgesinden çıkıyor. Kendi global satış kanalınız çok daha güçlü bir izlenim bırakır.",
  },
  {
    slug: "miraipek",
    to: "ayperi.esarp.tekstil@gmail.com",
    subject: "Mira İpek'in tekstil markasını kendi platformuna taşıyalım",
    compliment:
      "Mira İpek, Trendyol'da <strong>Bahreyn pazarına açılmış</strong> bir tekstil markası — uluslararası satışa adım atmak çoğu Trendyol satıcısının henüz geçemediği bir eşik.",
    opportunity:
      "Bu uluslararası alıcı tabanını kendi e-ticaret sitenizle büyütmek mümkün: Trendyol komisyonu olmadan, müşteri verisi elinizde ve marka kimliğiniz ön planda. İhracat yapan bir marka için kendi global satış kanalı çok daha kârlı ve güçlü.",
  },
  {
    slug: "shalby",
    to: "shelbyscarf.1@gmail.com",
    subject: "Shalby'nin şal markasını kendi kanalına taşıyalım",
    compliment:
      "Shalby, Trendyol'da <strong>tesettür şal kategorisinde</strong> aktif satış yapan bir marka — bu kategoride alıcı sadakati yüksek ve tekrarlayan alışveriş yaygın.",
    opportunity:
      "Bu müşteri sadakatini kendi e-ticaret sitenize taşımak mümkün: Trendyol komisyonu gitmez, müşteri verisi size kalır ve sadık alıcılarınıza yeni koleksiyonları doğrudan duyurabilirsiniz.",
  },
  {
    slug: "palmyra",
    to: "palmyratrend@gmail.com",
    subject: "Palmyra'nın koleksiyon şallarını kendi kanalına taşıyalım",
    compliment:
      "Palmyra, Trendyol'da <strong>dijital baskılı şal</strong> kategorisinde koleksiyon anlayışıyla yer alan bir marka — \"mürekkep serisi\" gibi isimli koleksiyonlar güçlü bir kimlik oluşturuyor.",
    opportunity:
      "Koleksiyon bazlı üretim yapan bir marka için kendi e-ticaret sitesi çok daha etkili: her koleksiyonu özel bir sayfada sunabilirsiniz, ön sipariş alabilirsiniz ve Trendyol'a ödediğiniz komisyondan kurtularak kâr marjınızı artırabilirsiniz.",
  },
  {
    slug: "birgulbektas",
    to: "birgulbektasltd@gmail.com",
    subject: "Birgül Bektaş Ltd.'nin tekstil ihracatını dijitalde güçlendirelim",
    compliment:
      "Birgül Bektaş, <strong>Romanya pazarına ihracat yapan</strong> kayıtlı bir tekstil şirketi olarak Trendyol'un uluslararası kanallarından yararlanan az sayıdaki markadan biri.",
    opportunity:
      "Uluslararası ihracat yapan bir tekstil şirketi için kendi kurumsal web sitesi çok daha güçlü bir kapı açar: B2B müşterilere dijital katalog sunabilirsiniz, toplu sipariş formu olabilir, farklı dil desteğiyle daha geniş alıcıya ulaşabilirsiniz.",
  },
  {
    slug: "mervenayir",
    to: "mervenayir96@gmail.com",
    subject: "Merve Nayir şal markasını kendi dijital kanalına taşıyalım",
    compliment:
      "Merve Nayir, Trendyol'da <strong>penye şal setleri</strong> ile kendi adını marka haline getirmiş bir satıcı — kişi adıyla güçlü bir kimlik kurmak kolay başarılacak bir şey değil.",
    opportunity:
      "Kişisel marka sahibi satıcılar için kendi e-ticaret sitesi en doğal adım: hikâyenizi anlatabilirsiniz, sadık müşterilerinizle doğrudan iletişim kurabilirsiniz ve her satıştan komisyon gitmiyor.",
  },
  {
    slug: "byboneci",
    to: "kayadogan572@gmail.com",
    subject: "By Boneci şal markasını kendi kanalına taşıyalım",
    compliment:
      "By Boneci, Trendyol'da <strong>viskon şal</strong> kategorisinde ürünleriyle yer alan bir marka — şal gibi tekrarlayan alışveriş yapılan bir kategoride marka bilinirliği çok değerli.",
    opportunity:
      "Bu müşteri sadakatini kendi sitenizde tutmak mümkün: yeni koleksiyon bildirimleri, kendi e-posta listen, komisyon kesintisi yok. Trendyol bunu veremiyor.",
  },
  {
    slug: "berelmoda",
    to: "berelmoda34@gmail.com",
    subject: "Berel Moda'nın premium şal markasını kendi kanalına taşıyalım",
    compliment:
      "Berel Moda, Trendyol'da <strong>Mısır ipeği şal</strong> gibi premium malzeme odaklı ürünlerle yer alan bir marka — kalite malzeme tercih etmek doğru bir konumlanma.",
    opportunity:
      "Premium malzeme kullanan markalar için kendi site büyük değer taşıyor: hammadde, üretim süreci ve kalite farkını anlatabilirsiniz — bu hikâye Trendyol ürün kartında kaybolup gidiyor. Kendi sitenizde fiyat duyarlılığı azalır, marka değeriniz öne çıkar.",
  },
  {
    slug: "chivora",
    to: "chivoralumiere@gmail.com",
    subject: "Chivora Lumiere şal markasını kendi kanalına taşıyalım",
    compliment:
      "Chivora Lumiere, Trendyol'da <strong>pamuk jakar şal</strong> kategorisinde hem Türkiye hem uluslararası pazarlara ulaşan bir marka — bu erişim ciddi bir büyüme sinyali.",
    opportunity:
      "Uluslararası alıcıları olan bir tekstil markası için kendi e-ticaret sitesi çok daha güçlü: yabancı dil desteği, uluslararası kargo bilgisi, özgün marka kimliği — Trendyol'un global versiyonlarında bunları kendiniz belirleyemezsiniz.",
  },

  // --- Giyim / Üretim ---
  {
    slug: "bombe",
    to: "uretimbombe@gmail.com",
    subject: "Bombe'nin üretim gücünü kendi satış kanalına taşıyalım",
    compliment:
      "Bombe, Bursa'da <strong>kendi üretim tesisiyle</strong> %100 pamuklu giyim üreten bir marka — kendi üreticisi olan satıcılar Trendyol'da en güçlü konumdaki isimler.",
    opportunity:
      "Kendi üretim yapan bir marka için Trendyol komisyonu en büyük maliyet kalemlerinden biri oluyor. Kendi e-ticaret sitenizle her satıştan %15-25 arası komisyon kesilmez, müşteri verisi elinizde kalır ve doğrudan satış imkânı doğar.",
  },
  {
    slug: "humannature",
    to: "hayelim2580ismail@gmail.com",
    subject: "Human Nature markasını kendi dijital kanalına taşıyalım",
    compliment:
      "Human Nature, Trendyol'da <strong>%100 pamuk polo yaka giyim</strong> satışlarıyla aktif olan bir marka — kaliteli malzemeyi ön plana alan bir konumlanma.",
    opportunity:
      "Trendyol'da oluşturduğunuz ürün portföyünü kendi e-ticaret sitenizde de satmak mümkün: komisyon gitmiyor, müşteri verisi size kalıyor ve kendi markanız platformun renkleri yerine kendi kimliğiyle öne çıkıyor.",
  },
  {
    slug: "formo",
    to: "uygunhep@gmail.com",
    subject: "Formo'nun Denizli üretimini kendi kanalına taşıyalım",
    compliment:
      "Formo, Trendyol'da <strong>%75 pamuk eşofman altı</strong> gibi kaliteli ürünlerle Denizli üretimini ön plana çıkaran bir marka — Denizli tekstil güçlü bir kimlik.",
    opportunity:
      "Üretim merkezli bir marka için kendi e-ticaret sitesi en kârlı kanal: Trendyol'a ödediğiniz komisyon kesilmez ve aynı ürünü çok daha yüksek marjla satabilirsiniz.",
  },
  {
    slug: "hilosh",
    to: "onurticaret52@gmail.com",
    subject: "Hilosh'un çocuk giyim markasını kendi dijital kanalına taşıyalım",
    compliment:
      "Hilosh, Trendyol'da <strong>lisanslı baskılı çocuk giyim</strong> (Ters Yüz Duygular temalı) ile yer alan, popüler karakterleri hızlı yakalayan bir marka.",
    opportunity:
      "Lisanslı tema/karakter ürünleri için hız kritik — yeni sezonu veya trendi hemen duyurabilmek gerekiyor. Kendi sitenizde bu duyuruyu anında yapabilirsiniz, müşteri e-postanıza ulaşabilirsiniz ve komisyon gitmiyor.",
  },
  {
    slug: "uslukids",
    to: "uslusinan428@gmail.com",
    subject: "UsluKids'in çocuk giyim markasını kendi kanalına taşıyalım",
    compliment:
      "UsluKids, Bursa'da <strong>%100 pamuk çocuk takım</strong> üreten ve Trendyol'da 30'dan fazla görselle ürünlerini sunan bir marka.",
    opportunity:
      "Kendi üretim yapan çocuk giyim markası için komisyon kaybı en büyük maliyet. Kendi sitenizle bu komisyondan kurtulursunuz, müşteri verisi elinizde kalır ve sadık alıcılarınıza sezon başında doğrudan ulaşabilirsiniz.",
  },

  // --- Ayakkabı ---
  {
    slug: "ayakkabihane",
    to: "ayakkabihane06@gmail.com",
    subject: "Ayakkabıhane'nin Trendyol başarısını kendi kanalına taşıyalım",
    compliment:
      "Ayakkabıhane, Trendyol'da <strong>gerçek deri çocuk ayakkabısı</strong> ile uluslararası pazara (Bahreyn) açılmış bir marka — kalite ürünle bu kadar geniş alıcıya ulaşmak kolay değil.",
    opportunity:
      "Trendyol'da kurduğunuz müşteri güvenini kendi e-ticaret sitenize taşımak mümkün: komisyon gitmiyor, müşteri verisi size kalıyor ve marka kimliğiniz Trendyol'un altında kalmıyor.",
  },
  {
    slug: "imershoes",
    to: "cindepo34@gmail.com",
    subject: "İmerShoes'un Trendyol başarısını kendi kanalına taşıyalım",
    compliment:
      "İmerShoes, Trendyol'da <strong>günlük kadın bot</strong> kategorisinde aktif satış yapan ve 25'ten fazla görselle ürünlerini sunan ciddi bir portföye sahip bir marka.",
    opportunity:
      "Bu ürün portföyünü kendi e-ticaret sitenizde sergilemek mümkün: her satıştan komisyon gitmiyor, müşteri verisi size kalıyor ve marka kimliğiniz ön plana çıkıyor.",
  },
  {
    slug: "liasshoes",
    to: "liasdesingshoes@gmail.com",
    subject: "LiasShoes'un çocuk ayakkabı markasını kendi kanalına taşıyalım",
    compliment:
      "LiasShoes, Trendyol'da <strong>çocuk bot</strong> kategorisinde aktif satış yapan ve kendi tasarım kimliğini oluşturmuş bir marka.",
    opportunity:
      "Çocuk ayakkabısı aileler için tekrarlayan bir alışveriş — bu sadakati kendi sitenizde tutabilirsiniz: yeni sezon bildirimleri, beden rehberi, kendi e-posta listeniz. Bunların hiçbiri Trendyol'da mümkün değil.",
  },

  // --- Aksesuar / Takı / Çanta ---
  {
    slug: "miraatelier",
    to: "miraaatelier@gmail.com",
    subject: "Mira Atelier'in aksesuar markasını kendi platformuna taşıyalım",
    compliment:
      "Mira Atelier, Trendyol'da <strong>saten saç aksesuar</strong> kategorisinde tasarım odaklı ürünler geliştiren bir marka — el emeği ve tasarım odaklı ürünler güçlü bir marka kimliği gerektiriyor.",
    opportunity:
      "Tasarım odaklı aksesuar markaları için kendi e-ticaret sitesi büyük avantaj: hikâyenizi anlatabilirsiniz, müşteri fotoğraflarını sergilersiniz, yeni ürünleri duyurursunuz — bunların hiçbiri Trendyol'da mümkün değil.",
  },
  {
    slug: "tesbihciefendi",
    to: "enes.ertem@gmail.com",
    subject: "Tesbihci Efendi'nin el işi takı markasını dijitale taşıyalım",
    compliment:
      "Tesbihci Efendi, Trendyol'da <strong>doğal kehribar ve mercan takı</strong> ile yer alan özgün bir marka — bu tür doğal malzeme ürünler hikâyesiyle satıyor.",
    opportunity:
      "El yapımı doğal taş takı için kendi site büyük değer: ürünün hikâyesini ve malzemeyi anlatabilirsiniz, koleksiyon sayfaları açabilirsiniz ve kişiselleştirme seçenekleri sunabilirsiniz — Trendyol bu imkânı vermiyor.",
  },
  {
    slug: "kayitstore",
    to: "bilaydilozdil@gmail.com",
    subject: "Kayıt Store'un tasarım çanta markasını kendi kanalına taşıyalım",
    compliment:
      "Kayıt Store, Trendyol'da <strong>dijital baskılı gabardin bez çanta</strong> ile yer alan, özgün tasarım kimliği olan bir marka.",
    opportunity:
      "Tasarım çanta markası için kendi site büyük avantaj: koleksiyon galeri sayfası, kişiselleştirme seçenekleri, kampanya duyuruları — bunları Trendyol'da sunamazsınız ve müşteri sadakatini kendi sitenizde çok daha iyi yönetirsiniz.",
  },

  // --- Dekorasyon / Hediye / Tasarım ---
  {
    slug: "ivart",
    to: "ivartkurumsal@gmail.com",
    subject: "İvart'ın kişiselleştirilmiş hediye markasını büyütelim",
    compliment:
      "İvart, Trendyol'da <strong>kişiselleştirilmiş kupa ve doğum günü hediyesi</strong> kategorisinde kurumsal kimliğiyle yer alan bir marka — bu segmentte marka bilinirliği satışı doğrudan etkiliyor.",
    opportunity:
      "Kişiselleştirilmiş ürün siparişi için müşteri bir form dolduruyor, bir seçim yapıyor — bu akış kendi sitenizde çok daha verimli işliyor. Trendyol bu esnekliği veremiyor; kendi sitenizde özelleştirme formu, kurumsal sipariş sayfası ve e-fatura entegrasyonu olabilir.",
  },
  {
    slug: "cihemconcept",
    to: "cansudemirkan06@gmail.com",
    subject: "Cihem Concept'in mum markasını kendi kanalına taşıyalım",
    compliment:
      "Cihem Concept, Trendyol'da <strong>vanilya kokulu tasarım mumlar</strong> ile yer alan bir marka — bu tür atmosfer ürünleri doğru sunumla çok güçlü satış yapıyor.",
    opportunity:
      "Dekorasyon ve mum gibi yaşam tarzı ürünleri için marka hikâyesi çok önemli: kendi sitenizde ürünlerinizi atmosfer fotoğraflarıyla sunabilirsiniz, koleksiyonları öne çıkarabilirsiniz — Trendyol bu imkânı vermiyor ve komisyon da gitmiyor.",
  },
  {
    slug: "poyrazreklam",
    to: "poyraz.reklam0@gmail.com",
    subject: "Poyraz Reklam'ın kurumsal hediye işini kendi kanalına taşıyalım",
    compliment:
      "Poyraz Reklam, Trendyol'da <strong>kişiselleştirilmiş hediye ayna ve bebek hediyeliği</strong> gibi kurumsal reklam ürünleriyle yer alan Ankara merkezli bir firma — bu tür ürünlerde asıl alıcı profili kurumsal.",
    opportunity:
      "Kurumsal reklam ürünü ve kişiselleştirilmiş hediye için en güçlü satış kanalı kendi siteniz: toplu sipariş formu, kurumsal teklif sayfası, referans projeleri — bunları Trendyol'da sunamazsınız.",
  },
  {
    slug: "secondlife",
    to: "sinembirol@gmail.com",
    subject: "Second Life'ın dekorasyon markasını kendi kanalına taşıyalım",
    compliment:
      "Second Life, Trendyol'da <strong>modern minimalist biblo ve dekoratif obje</strong> ile yer alan Çanakkale merkezli bir marka — \"Second Life\" ismi akılda kalıcı ve güçlü bir marka adı.",
    opportunity:
      "Dekorasyon ve ev aksesuar ürünleri için görsel marka kimliği çok kritik. Kendi sitenizde ürünlerinizi iç mekân fotoğraflarıyla sergileyebilirsiniz, stil rehberi içerikleri yayımlayabilirsiniz ve sadık alıcılarınıza yeni koleksiyon duyurusu yapabilirsiniz — bunların hiçbiri Trendyol'da mümkün değil.",
  },
  {
    slug: "thelittlekids",
    to: "thelittleskids@gmail.com",
    subject: "The Little Kids markasını kendi kanalına taşıyalım",
    compliment:
      "The Little Kids, Trendyol'da <strong>çocuk aksesuar</strong> kategorisinde kendi marka adıyla yer alan aktif bir satıcı.",
    opportunity:
      "Çocuk ürünleri kategorisinde ebeveyn alıcı profili çok sadık — bir kez güvenilen marka tekrar tercih ediliyor. Kendi sitenizle bu sadakati yakalayabilirsiniz, kendi e-posta listenizi oluşturabilirsiniz ve komisyon ödemeden satış yapabilirsiniz.",
  },

  // --- 3D Baskı / Tech Ürün ---
  {
    slug: "digiartisan3d",
    to: "digiartisan3d@gmail.com",
    subject: "DigiArtisan3D'nin 9.7 puanlı mağazasını kendi platformuna taşıyalım",
    compliment:
      "DigiArtisan3D, Trendyol'da <strong>9.7 mağaza puanıyla</strong> 3D baskılı kalıp ve aksesuar satan — hem Trendyol'un en yüksek puanlı mağazalarından biri olması hem de 3D baskı gibi tech odaklı bir niş çok güçlü bir konum.",
    opportunity:
      "3D baskı ürünlerinde özelleştirme talebi yüksek — \"bu karakteri de yapabilir misiniz?\" sorusu mutlaka geliyordur. Kendi sitenizde özelleştirme formu, sipariş akışı ve ürün galerisi olabilir; Trendyol bunu veremiyor. 9.7 gibi bir mağaza puanı kendi sitenizde çok daha değerli.",
  },

  // --- Kişisel Bakım ---
  {
    slug: "hprohijyen",
    to: "hprohijyen@gmail.com",
    subject: "H Pro Hijyen'in bakım markasını kendi kanalına taşıyalım",
    compliment:
      "H Pro Hijyen, Trendyol'da <strong>9.1 mağaza puanıyla</strong> saç bakım ürünleri satan bir marka — bu puan ciddi müşteri memnuniyetinin göstergesi.",
    opportunity:
      "9.1 gibi yüksek bir mağaza puanı kendi satış kanalınızda çok daha değerli: müşteriler tekrar alım için size döner, sadakat programı kurabilirsiniz, abonelik seçeneği sunabilirsiniz — Trendyol bunları veremiyor ve komisyon da gitmiyor.",
  },
  {
    slug: "pinaxar",
    to: "furkankaynar21@gmail.com",
    subject: "Pınaxar'ın bakım ürünlerini kendi kanalına taşıyalım",
    compliment:
      "Pınaxar, Trendyol'da <strong>ayak peeling maskesi</strong> gibi kişisel bakım ürünleriyle yer alan bir marka.",
    opportunity:
      "Kişisel bakım ürünleri tekrarlayan alışverişin en güçlü kategorisi — bir kez beğenilince tekrar alınıyor. Kendi sitenizle bu sadakati yakalayabilirsiniz: abonelik seçeneği, sadakat programı, ürün set paketleri — Trendyol bunları sunamıyor.",
  },

  // --- Araç / Teknik Ürün ---
  {
    slug: "wehhler",
    to: "wehhler@gmail.com",
    subject: "Wehhler'in otomotiv ürünleri için kendi satış kanalı",
    compliment:
      "Wehhler, Trendyol'da <strong>araç içi aksesuar</strong> alanında ürün geliştiren ve ithal eden bir marka — bu kadar niş bir kategoride yer bulmak ciddi bir konumlanma.",
    opportunity:
      "Otomotiv aksesuar gibi teknik bir üründe müşteri güveni kritik. Kendi web siteniz bu güveni çok daha güçlü inşa eder: araç model bazında uyumluluk tabloları, teknik detaylar, B2B sipariş formu — bunların hiçbiri Trendyol'da mümkün değil.",
  },
  {
    slug: "hmfiberglas",
    to: "hmfiberglas@gmail.com",
    subject: "HM Fiberglas'ın üretim uzmanlığını kendi B2B kanalına taşıyalım",
    compliment:
      "HM Fiberglas, Ankara İvedik OSB'den <strong>araç tampon eki ve difüzör</strong> üreten bir firma — kendi üretim tesisiyle bu kadar niş bir kategoride yer bulmak ciddi bir uzmanlık.",
    opportunity:
      "Otomotiv modifiye parçası gibi teknik üründe müşteri araştırır, uyumluluğu kontrol eder ve güvenilir firmayı seçer. Kendi web siteniz bu güveni çok daha güçlü verir: marka bazında uyumluluk tabloları, kurumsal sipariş formu, B2B fiyatlandırma.",
  },

  // --- Medikal / Toptan ---
  {
    slug: "fnmarket",
    to: "bahcenihat@gmail.com",
    subject: "FN Market'in medikal ürünleri için kendi kurumsal kanalı",
    compliment:
      "FN Market, Trendyol'da <strong>medikal sarf malzemesi</strong> (trakeostomi sabitleme bandı gibi ürünler) satan Sancaktepe merkezli bir firma — bu kategoride asıl alıcı bireysel değil, hastane ve klinik gibi kurumsal alıcılar.",
    opportunity:
      "Medikal ürün alıcıları (hastane, klinik, eczane) satın almadan önce ürün belgelerini, CE sertifikalarını ve kurumsal bilgileri araştırıyor. Trendyol bu güveni veremiyor; kendi web sitenizde ürün teknik sayfaları, belge indirme alanı ve B2B sipariş formu ile kurumsal alıcıya doğrudan ulaşabilirsiniz.",
  },
  {
    slug: "dmrgroup",
    to: "dmrgrouphed@gmail.com",
    subject: "DMR Group'un ithalat portföyü için kendi B2B kanalı",
    compliment:
      "DMR Group, Bağcılar merkezli bir dış ticaret şirketi olarak Trendyol'da <strong>çok sayıda ürün kategorisinde</strong> aktif satış yapıyor — bu ölçekteki bir portföy ciddi bir operasyon gerektiriyor.",
    opportunity:
      "Toptan ve ithalat yapan bir firma için en kârlı kanal kendi B2B portalı: bayi fiyat listesi, toplu sipariş formu, ürün kategorize katalog, teklif isteme akışı. Trendyol bireysel satış için tasarlanmış, toptan alıcıya hizmet etmiyor. Kendi sitenizle hem komisyon gitmiyor hem de kurumsal müşteriye profesyonel bir kapı açıyorsunuz.",
  },

  // --- Gıda / Zanaat ---
  {
    slug: "motifilla",
    to: "harmankahv@gmail.com",
    subject: "Motifilla'nın pizza ekipmanları için kendi B2B kanalı",
    compliment:
      "Motifilla, Trendyol'da <strong>pizza destek ayağı (tripod)</strong> gibi profesyonel restoran ekipmanı satan İzmir merkezli bir marka — bu tür B2B ürünlerin asıl alıcısı bireysel değil, işletmeler.",
    opportunity:
      "Restoran ve kafe ekipmanı için en güçlü satış kanalı kendi B2B siteniz: toplu sipariş formu, fiyat teklifi, ticari fatura — bunları Trendyol'da sunamazsınız. Kendi sitenizle hem komisyon kesilmiyor hem de kurumsal müşteriye doğrudan ulaşıyorsunuz.",
  },
  {
    slug: "bha",
    to: "bicakcihaciahmetkastamonu@gmail.com",
    subject: "BHA Kastamonu'nun zanaat bıçaklarını dijitale taşıyalım",
    compliment:
      "BHA, Kastamonu'da <strong>el yapımı Sürmene kasap bıçağı</strong> üretimiyle Trendyol'da yer alan bir zanaat markası — özgün üretim dijitalde çok güçlü bir hikâye anlatır.",
    opportunity:
      "Zanaatkâr üretimli mutfak bıçakları için kendi web sitesi büyük değer: ürünün hikâyesini, üretim sürecini ve kalitesini anlatabilirsiniz — hem bireysel hem B2B restoran müşterilerine Trendyol komisyonu olmadan doğrudan satış yapabilirsiniz.",
  },
]

function ctaUrl(slug) {
  return `https://solmandigital.com.tr/ucretsiz-analiz?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
}

function waUrl(slug) {
  const text = `Merhaba, e-postanızı aldım, ücretsiz analiz hakkında görüşmek istiyorum. (Ref: ${slug})`
  return `https://wa.me/905439675250?text=${encodeURIComponent(text)}`
}

function buildHtml({ slug, compliment, opportunity }) {
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${compliment}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${opportunity}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${SOLUTION}</p><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">İsterseniz mevcut Trendyol mağazanız için kısa ve ücretsiz bir analiz hazırlayalım — neyin iyi çalıştığını, nerede fırsat olduğunu somut maddelerle gönderelim. Hiçbir yükümlülük yok.</p><a href="${ctaUrl(slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Ücretsiz Analiz İsteyin</a><a href="${waUrl(slug)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, "")
}

function buildText({ slug, compliment, opportunity }) {
  return [
    "Merhaba,",
    stripTags(compliment),
    stripTags(opportunity),
    stripTags(SOLUTION),
    `İsterseniz mevcut Trendyol mağazanız için kısa ve ücretsiz bir analiz hazırlayalım — yükümlülük yok.\n${ctaUrl(slug)}\nWhatsApp: ${waUrl(slug)}\nYa da bu maile doğrudan yanıt verin.`,
    "Solman Digital — İstanbul Yazılım Ofisi · solmandigital.com.tr · 0543 967 52 50\nMail listesinden çıkmak istiyorsanız bize bildirin: info@solmandigital.com.tr",
  ].join("\n\n")
}

const messages = leads.map((l) => ({
  to: l.to,
  subject: l.subject,
  html: buildHtml(l),
  text: buildText(l),
}))

writeFileSync(
  new URL("./leads-batch-2.json", import.meta.url),
  JSON.stringify(messages, null, 2),
  "utf8"
)
console.log(`${messages.length} mail üretildi → scripts/leads-batch-2.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
