// Otel + Restoran batch → scripts/leads-batch-3.json
// Kanca: doğrudan rezervasyon, QR menü, çok dilli site, Booking.com komisyonu
import { writeFileSync } from "node:fs"

const CAMPAIGN = "otel-batch-1"

const SOLUTION_OTEL =
  "Solman Digital olarak oteller için modern web siteleri ve doğrudan rezervasyon sistemleri geliştiriyoruz: çok dilli tasarım, anlık müsaitlik takvimi, QR menü entegrasyonu ve SEO altyapısı. Booking.com veya Airbnb'ye bağımlı kalmadan kendi kanalınızdan misafir kazanabilirsiniz. Başından sonuna aynı uzmanla, katmansız iletişimle."

const SOLUTION_RESTORAN =
  "Solman Digital olarak restoranlar için modern web siteleri ve rezervasyon sistemleri geliştiriyoruz: online masa rezervasyonu, QR dijital menü, Google görünürlüğünü artıran SEO altyapısı. Başından sonuna aynı uzmanla, katmansız iletişimle."

const leads = [
  // --- Fatih / Sultanahmet Oteller ---
  {
    slug: "hanhotel",
    to: "info@hanhotel.net",
    solution: SOLUTION_OTEL,
    subject: "Sultanahmet Hotel Han için doğrudan rezervasyon kanalı",
    compliment: "Sultanahmet Hotel Han, <strong>tarihi yarımadanın kalbinde</strong> konumlanan ve kendi web sitesiyle misafirlerine ulaşan bir otel — bu lokasyon dijitalde çok güçlü bir avantaj.",
    opportunity: "Sultanahmet'te oda arayan uluslararası misafir önce Google'da arıyor. Çok dilli bir site ve doğrudan rezervasyon sistemi eklendiğinde Booking.com'a giden %15-25 komisyonun büyük bölümü kendi kanalınıza geçer.",
  },
  {
    slug: "ozerpalace",
    to: "reservation@ozerpalacehotel.com",
    solution: SOLUTION_OTEL,
    subject: "Özer Palace Hotel için doğrudan rezervasyon kanalı",
    compliment: "Özer Palace Hotel, Fatih'te <strong>kendi rezervasyon e-postasıyla</strong> doğrudan misafir iletişimi kuran bir otel — bu proaktif yaklaşım güçlü bir başlangıç.",
    opportunity: "Kendi rezervasyon kanalı olan bir otel için bir sonraki adım online ödeme: ziyaretçi sitenizden anında oda seçip rezervasyonu tamamlayabilmeli. Bu her işlemde Booking.com komisyonunu sizde bırakır.",
  },
  {
    slug: "hotelgrandistanbul",
    to: "info@hotelgrandistanbul.com",
    solution: SOLUTION_OTEL,
    subject: "Hotel Grand İstanbul için doğrudan rezervasyon kanalı",
    compliment: "Hotel Grand İstanbul, Fatih'te kendi web sitesiyle varlık gösteren aktif bir otel.",
    opportunity: "Uluslararası misafirlerin büyük bölümü otel sitesini ziyaret edip Booking.com'a geçiyor — çünkü doğrudan rezervasyon sistemi yok. Kendi sitenize anlık müsaitlik takvimi ve ödeme eklemek bu akışı tersine çevirir.",
  },
  {
    slug: "amiralpalace",
    to: "info@amiralpalacehotel.com",
    solution: SOLUTION_OTEL,
    subject: "Amiral Palace Hotel & No7 Rooftop için entegre dijital çözüm",
    compliment: "Amiral Palace Hotel, Fatih'te <strong>bünyesinde No7 Rooftop Restaurant</strong> barındıran ve hem konaklama hem yeme-içme geliri olan güçlü bir işletme.",
    opportunity: "Otel + rooftop restoran kombinasyonu için tek bir dijital platform çok daha etkili: otel rezervasyonu, rooftop masa rezervasyonu ve QR dijital menü tek sistemde. Her iki gelir kanalını kendi platformunuzdan yönetebilirsiniz.",
  },
  {
    slug: "maviremhotel",
    to: "info@maviremhotel.com",
    solution: SOLUTION_OTEL,
    subject: "Mavirem Hotel için doğrudan rezervasyon kanalı",
    compliment: "Mavirem Hotel, Fatih'te kendi web sitesiyle misafirlere ulaşan aktif bir otel.",
    opportunity: "Fatih'te turistik trafik yoğun — bu trafiği kendi kanalınıza çekmek mümkün. Çok dilli tasarım ve doğrudan rezervasyon sistemi Booking.com komisyonunu ciddi ölçüde azaltır.",
  },
  {
    slug: "sultanahmetnuhotel",
    to: "info@sultanahmetnuhotel.com",
    solution: SOLUTION_OTEL,
    subject: "Sultanahmet Nu Hotel için doğrudan rezervasyon kanalı",
    compliment: "Sultanahmet Nu Hotel, <strong>Sultanahmet'in merkezinde</strong> konumlanan ve kendi web sitesiyle misafirlerine ulaşan bir otel — bu lokasyon SEO ve doğrudan rezervasyonda büyük avantaj.",
    opportunity: "Sultanahmet'te uluslararası misafir yoğunluğu yüksek. Çok dilli site ve doğrudan rezervasyon sistemiyle Booking.com'a giden komisyonun büyük bölümünü kendi kanalınıza alabilirsiniz.",
  },
  {
    slug: "sultanpierhotel",
    to: "sultanpierhotel@gmail.com",
    solution: SOLUTION_OTEL,
    subject: "Sultan Pier Hotel için doğrudan rezervasyon kanalı",
    compliment: "Sultan Pier Hotel, Fatih'te kendi adıyla güçlü bir kimlik kuran bir otel.",
    opportunity: "Kendi web sitesi olan bir otel için en kârlı adım doğrudan rezervasyon sistemi: misafir sitenizden anında oda seçip ödeyebilmeli. Her doğrudan rezervasyon Booking.com komisyonunu kesiyor.",
  },
  {
    slug: "homequalityhotel",
    to: "info@homequality.com",
    solution: SOLUTION_OTEL,
    subject: "Home Quality Hotel için doğrudan rezervasyon kanalı",
    compliment: "Home Quality Hotel, Fatih'te kendi web sitesiyle varlık gösteren aktif bir otel.",
    opportunity: "Uluslararası misafirler otel sitesinde doğrudan rezervasyon butonu görmek istiyor. Bu sistemi eklemek Booking.com bağımlılığını azaltır ve her rezervasyonda komisyon sizde kalır.",
  },
  {
    slug: "atlantishotel",
    to: "info@atlantishotelistanbul.com",
    solution: SOLUTION_OTEL,
    subject: "Atlantis Royal Hotel için doğrudan rezervasyon kanalı",
    compliment: "Atlantis Royal Hotel, Fatih'te kendi web sitesiyle misafirlerine ulaşan aktif bir otel.",
    opportunity: "Uluslararası misafir trafiğinin yoğun olduğu bir lokasyonda çok dilli site ve doğrudan rezervasyon sistemi büyük fark yaratır — Booking.com komisyonunu azaltır, misafirle doğrudan ilişki kurarsınız.",
  },
  {
    slug: "germeniciahotel",
    to: "info@germeniciahotel.com",
    solution: SOLUTION_OTEL,
    subject: "Germanicia Hotel için doğrudan rezervasyon kanalı",
    compliment: "Germanicia Hotel, Fatih'te kendi web sitesiyle aktif misafir çeken bir otel.",
    opportunity: "Kendi web sitesi olan bir otel için doğrudan rezervasyon sistemi en kârlı adım. Booking.com'a giden her komisyon bu sistemle sizde kalır.",
  },
  {
    slug: "benderhotel",
    to: "info@hotelbender.com",
    solution: SOLUTION_OTEL,
    subject: "Hotel Bender için doğrudan rezervasyon kanalı",
    compliment: "Hotel Bender, Fatih'te <strong>köklü ve bilinen</strong> bir otel olarak kendi web sitesiyle misafirlerine ulaşıyor.",
    opportunity: "Köklü bir otelin kendi doğrudan rezervasyon kanalı marka güvenini artırır ve Booking.com'a giden komisyonu azaltır. Çok dilli tasarım ve anlık müsaitlik takvimi ile bu fırsatı yakalayabilirsiniz.",
  },
  {
    slug: "valenshotel",
    to: "info@valensbutikhotel.com",
    solution: SOLUTION_OTEL,
    subject: "Valens Butik Hotel için doğrudan rezervasyon kanalı",
    compliment: "Valens Boutique Hotel, Fatih'te <strong>butik otel kimliğiyle</strong> misafirlerine özel bir deneyim sunan bir isim — butik otellerde kişisel dokunuş en güçlü satış argümanı.",
    opportunity: "Butik otel misafiri hikâyeyi, atmosferi ve özgünlüğü arıyor. Bu hikâyeyi kendi web sitenizde anlatmak ve doğrudan rezervasyon sunmak Booking.com sayfasına kıyasla çok daha güçlü bir izlenim bırakır.",
  },
  {
    slug: "galleyhotel",
    to: "info@galleyhotel.com",
    solution: SOLUTION_OTEL,
    subject: "Galley Hotel için doğrudan rezervasyon kanalı",
    compliment: "Galley Hotel, Fatih'te kendi web sitesiyle misafir çeken aktif bir otel.",
    opportunity: "Doğrudan rezervasyon sistemi eklendiğinde Booking.com komisyonu kesilmez, misafirle doğrudan iletişim kurarsınız ve geri dönüş oranı yükselir.",
  },
  {
    slug: "dreamsuite",
    to: "dreamsuiteistanbul@hotmail.com",
    solution: SOLUTION_OTEL,
    subject: "Dream Suite İstanbul için doğrudan rezervasyon kanalı",
    compliment: "Dream Suite İstanbul, Fatih'te <strong>süit konseptiyle</strong> misafirlerine özel bir konaklama deneyimi sunan bir işletme.",
    opportunity: "Süit segmentinde misafir premium bir deneyim bekliyor — bu beklentiyi web sitenizde karşılamak gerekiyor. Modern bir site ve doğrudan rezervasyon sistemi bu segmentte çok güçlü çalışır.",
  },
  {
    slug: "kocakpansiyon",
    to: "kocakpansiyon@hotmail.com",
    solution: SOLUTION_OTEL,
    subject: "Koçak Pansiyon için doğrudan rezervasyon kanalı",
    compliment: "Koçak Pansiyon, Fatih'te kendi web sitesiyle yıllardır misafir ağırlayan köklü bir işletme.",
    opportunity: "Köklü bir pansiyonun en büyük avantajı deneyim ve güven. Bu güveni kendi web sitenizde doğrudan rezervasyon ve misafir yorumlarıyla sunmak Booking.com bağımlılığını azaltır.",
  },
  {
    slug: "costerahotel",
    to: "info@costerahotel.com.tr",
    solution: SOLUTION_OTEL,
    subject: "Costera Hotel & Spa'nın rooftop ve spa gelirini kendi kanalına taşıyalım",
    compliment: "Costera Roof Restaurant, Hotel & Spa, Fatih'te <strong>rooftop restoran, otel ve spa</strong> kombinasyonuyla birden fazla gelir kanalını bir arada sunan güçlü bir işletme.",
    opportunity: "Bu kadar zengin bir portföy tek platformda çok daha iyi yönetilir: otel rezervasyonu, rooftop masa rezervasyonu, spa paketi ve QR dijital menü. Her gelir kanalı için ayrı akış, Booking.com komisyonu yok.",
  },

  // --- Kadıköy Oteller ---
  {
    slug: "dilahotel",
    to: "info@dilahotel.com.tr",
    solution: SOLUTION_OTEL,
    subject: "Dila Hotel'in Kadıköy konumunu kendi kanalına taşıyalım",
    compliment: "Dila Hotel, Kadıköy'de kendi web sitesiyle misafirlerine ulaşan aktif bir otel.",
    opportunity: "Kadıköy'de yerel ve uluslararası misafir trafiği her yıl artıyor. Çok dilli tasarım ve doğrudan rezervasyon sistemi ile Booking.com komisyonunu ciddi ölçüde azaltabilirsiniz.",
  },
  {
    slug: "grandvipsuite",
    to: "almepalace@gmail.com",
    solution: SOLUTION_OTEL,
    subject: "Grand Vip Suite Kadıköy için doğrudan rezervasyon kanalı",
    compliment: "Grand Vip Suite Kadıköy, <strong>süit konseptiyle</strong> misafirlerine özel bir konaklama deneyimi sunan bir işletme.",
    opportunity: "Süit segmentinde misafir kişisel ve premium bir deneyim bekliyor. Modern bir site ve doğrudan rezervasyon sistemi bu beklentiyi karşılar ve Booking.com komisyonunu azaltır.",
  },
  {
    slug: "parkhousehotel",
    to: "info@parkhousehotels.com",
    solution: SOLUTION_OTEL,
    subject: "Parkhouse Hotel & Spa'nın spa gelirini kendi kanalına taşıyalım",
    compliment: "Parkhouse Hotel & Spa, Kadıköy'de <strong>spa hizmetiyle</strong> farklılaşan bir otel — spa ve konaklama kombinasyonu güçlü bir çekicilik.",
    opportunity: "Spa hizmeti sunan bir otel için web sitesi sadece rezervasyon değil, deneyim satma yeridir. Spa paketleri, hafta sonu kaçamakları, çift rezervasyonları — bunları kendi sitenizden doğrudan sunmak Booking.com'a kıyasla çok daha kârlı.",
  },
  {
    slug: "bossuite",
    to: "info@bossuite.com",
    solution: SOLUTION_OTEL,
    subject: "Hotel Bossuite Kadıköy için doğrudan rezervasyon kanalı",
    compliment: "Hotel Bossuite Kadıköy, Kadıköy'de kendi web sitesiyle misafir çeken aktif bir otel.",
    opportunity: "Kadıköy'de büyüyen turizm potansiyelinden en çok yararlananlar kendi doğrudan kanallarını güçlendirenler. Çok dilli tasarım ve online rezervasyon sistemi Booking.com komisyonunu azaltır.",
  },
  {
    slug: "besthotelkadikoy",
    to: "rezervasyon@besthotelkadikoy.com",
    solution: SOLUTION_OTEL,
    subject: "The Best Kadıköy'ün rezervasyon kanalını güçlendirelim",
    compliment: "The Best Kadıköy, <strong>kendi rezervasyon e-postasıyla</strong> doğrudan misafir iletişimi kuran bir otel — bu proaktif yaklaşım güçlü bir başlangıç.",
    opportunity: "Kendi rezervasyon kanalı olan bir otel için bir sonraki adım online ödeme: misafir sitenizden anında oda seçip rezervasyonu tamamlamalı. Her doğrudan rezervasyon Booking.com komisyonunun büyük bölümünü sizde bırakır.",
  },
  {
    slug: "dugihotel",
    to: "istanbul@dugihotel.com",
    solution: SOLUTION_OTEL,
    subject: "Dugi Hotel İstanbul için doğrudan rezervasyon kanalı",
    compliment: "Dugi Hotel, Kadıköy'de uluslararası profiliyle varlık gösteren bir otel.",
    opportunity: "Uluslararası misafir hedefleyen bir otel için çok dilli site ve doğrudan rezervasyon sistemi kritik. Booking.com komisyonunu azaltmak ve misafirle doğrudan ilişki kurmak mümkün.",
  },
  {
    slug: "thelimasuites",
    to: "thelimasuites@gmail.com",
    solution: SOLUTION_OTEL,
    subject: "The Lima Suites Kadıköy için doğrudan rezervasyon kanalı",
    compliment: "The Lima Suites, Kadıköy'de <strong>süit konseptiyle</strong> özel bir konaklama deneyimi sunan bir işletme.",
    opportunity: "Süit segmentinde misafir premium deneyim bekliyor. Modern bir site ve doğrudan rezervasyon sistemi bu beklentiyi karşılar ve Booking.com komisyonunu azaltır.",
  },
  {
    slug: "rihtimotel",
    to: "info@rihtimotel.com",
    solution: SOLUTION_OTEL,
    subject: "Rihtim Hotel'in Kadıköy konumunu kendi kanalına taşıyalım",
    compliment: "Rihtim Hotel, Kadıköy'de kendi web sitesiyle misafir çeken aktif bir otel — Rihtim ismi lokasyona güçlü bir referans.",
    opportunity: "Kadıköy'deki artan turizm trafiğini kendi kanalınıza çekmek mümkün: doğrudan rezervasyon sistemi ve çok dilli tasarım ile Booking.com komisyonunu ciddi ölçüde azaltabilirsiniz.",
  },
  {
    slug: "dekalbhotel",
    to: "info@dekalbhotelistanbul.com",
    solution: SOLUTION_OTEL,
    subject: "Dekalb Hotel'in Kadıköy konumunu kendi kanalına taşıyalım",
    compliment: "Dekalb Hotel, Kadıköy'de kendi web sitesiyle varlık gösteren aktif bir otel.",
    opportunity: "Doğrudan rezervasyon sistemi eklediğinizde Booking.com komisyonu kesilmez, misafirle doğrudan iletişim kurarsınız ve geri dönüş oranı yükselir.",
  },

  // --- Restoranlar / Rooftop ---
  {
    slug: "seabreeze",
    to: "seabreezeterrace34@gmail.com",
    solution: SOLUTION_RESTORAN,
    subject: "Seabreeze Rooftop için online rezervasyon ve QR menü",
    compliment: "Seabreeze Lounge Rooftop, Fatih'te <strong>İstanbul manzaralı rooftop</strong> konseptiyle öne çıkan bir mekan — bu tür deneyimsel mekanlarda görsel marka çok güçlü satıyor.",
    opportunity: "Rooftop deneyimi görselle satılıyor ama o görsel Instagram'da kaybolup gidiyor. Kendi web sitenizde online masa rezervasyonu, etkinlik takvimi ve QR dijital menü ile hem yerel hem turist misafiri doğrudan çekebilirsiniz.",
  },
  {
    slug: "mevlanaterrace",
    to: "maurogallo623@gmail.com",
    solution: SOLUTION_RESTORAN,
    subject: "Mevlana Terrace için online rezervasyon ve QR menü",
    compliment: "Mevlana Terrace Restaurant, Fatih'te <strong>teras konseptiyle</strong> öne çıkan bir mekan — \"Mevlana\" ismi turistik lokasyon için güçlü bir referans.",
    opportunity: "Turistik bölgedeki teras restoranı için çok dilli web sitesi ve online rezervasyon büyük fark yaratır: hem yerel hem yabancı misafir sitenizden masa ayırtabilir, QR dijital menüyle kâğıt menü masrafı da ortadan kalkar.",
  },
  {
    slug: "turgutkebap",
    to: "turgutdurumpide@hotmail.com",
    solution: SOLUTION_RESTORAN,
    subject: "Turgut Kebap için online rezervasyon ve dijital menü",
    compliment: "Turgut Kebap, Fatih'te kendi web sitesiyle varlık gösteren ve turistik bir bölgede hizmet veren bir restoran.",
    opportunity: "Fatih'te Türk mutfağı arayan turist sayısı çok yüksek. Çok dilli site, Google Haritalar entegrasyonu ve QR dijital menü bu trafiği doğrudan müşteriye dönüştürür.",
  },
  {
    slug: "satorestaurant",
    to: "satorestaurant75@gmail.com",
    solution: SOLUTION_RESTORAN,
    subject: "ŞATO's Restaurant için online rezervasyon ve QR menü",
    compliment: "ŞATO's Restaurant, Fatih'te kendi web sitesiyle aktif şekilde varlık gösteren bir mekan.",
    opportunity: "Misafir masa ayırtmadan önce menüye, fiyata ve ortama bakıyor. Bu bilgiyi kendi sitenizde sunmak ve online rezervasyon ile QR dijital menü eklemek hem yerel hem turist müşteriyi doğrudan kazandırır.",
  },
  {
    slug: "gracerooftop",
    to: "info@gracerooftop.com",
    solution: SOLUTION_RESTORAN,
    subject: "GRACE Rooftop için online rezervasyon ve QR menü",
    compliment: "GRACE Rooftop Restaurant, Fatih'te <strong>panoramik İstanbul manzaralı rooftop</strong> konseptiyle öne çıkan güçlü bir mekan.",
    opportunity: "Rooftop için masa bulmak güç — bu kıtlık pazarlama avantajı. Kendi sitenizde online rezervasyon sistemi, etkinlik takvimi ve QR dijital menü ile bu avantajı gelire dönüştürebilirsiniz.",
  },
  {
    slug: "garden1897",
    to: "info@garden1897.com",
    solution: SOLUTION_RESTORAN,
    subject: "Garden 1897'nin tarihi kimliğini dijitale taşıyalım",
    compliment: "Garden 1897 Restaurant, Fatih'te <strong>1897'den gelen tarihi kimliğiyle</strong> öne çıkan özgün bir mekan — bu hikâye çok güçlü bir marka varlığı.",
    opportunity: "1897'den gelen bir restoranın hikâyesi en büyük satış argümanı. Bu hikâyeyi kendi web sitenizde görsel ve içerikle anlatmak, online rezervasyon ve QR dijital menü ile desteklemek hem yerel hem turist müşteriyi doğrudan çeker.",
  },
  {
    slug: "bykinyas",
    to: "rezervasyon@bykinyas.com",
    solution: SOLUTION_RESTORAN,
    subject: "By Kinyas Terrace için online rezervasyon ve QR menü",
    compliment: "By Kinyas Terrace Restaurant, Fatih'te <strong>teras konseptiyle</strong> öne çıkan ve kendi rezervasyon kanalını aktif kullanan bir mekan.",
    opportunity: "Kendi rezervasyon e-postası olan bir teras restoranı için bir sonraki adım online rezervasyon sistemi: misafir sitenizden anında masa seçip onay alsın, siz telefon trafiğinden kurtulun. QR dijital menü de eklenince operasyonunuz çok daha temiz işler.",
  },
]

function ctaUrl(slug) {
  return `https://solmandigital.com.tr/ucretsiz-analiz?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
}

function waUrl(slug) {
  const text = `Merhaba, e-postanızı aldım, ücretsiz analiz hakkında görüşmek istiyorum. (Ref: ${slug})`
  return `https://wa.me/905439675250?text=${encodeURIComponent(text)}`
}

function buildHtml({ slug, compliment, opportunity, solution }) {
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${compliment}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${opportunity}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${solution}</p><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">İsterseniz mevcut siteniz için kısa ve ücretsiz bir analiz hazırlayalım — neyin iyi çalıştığını, nerede fırsat olduğunu somut maddelerle gönderelim. Hiçbir yükümlülük yok.</p><a href="${ctaUrl(slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Ücretsiz Analiz İsteyin</a><a href="${waUrl(slug)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

function stripTags(s) { return s.replace(/<[^>]+>/g, "") }

function buildText({ slug, compliment, opportunity, solution }) {
  return [
    "Merhaba,",
    stripTags(compliment),
    stripTags(opportunity),
    stripTags(solution),
    `İsterseniz mevcut siteniz için kısa ve ücretsiz bir analiz hazırlayalım — yükümlülük yok.\n${ctaUrl(slug)}\nWhatsApp: ${waUrl(slug)}\nYa da bu maile doğrudan yanıt verin.`,
    "Solman Digital — İstanbul Yazılım Ofisi · solmandigital.com.tr · 0543 967 52 50\nMail listesinden çıkmak istiyorsanız bize bildirin: info@solmandigital.com.tr",
  ].join("\n\n")
}

const messages = leads.map((l) => ({
  to: l.to,
  subject: l.subject,
  html: buildHtml(l),
  text: buildText(l),
}))

writeFileSync(new URL("./leads-batch-3.json", import.meta.url), JSON.stringify(messages, null, 2), "utf8")
console.log(`${messages.length} mail üretildi → scripts/leads-batch-3.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
