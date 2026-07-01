// Yazılım firmaları white-label ortaklık batch → scripts/leads-batch-4.json
import { writeFileSync } from "node:fs"

const CAMPAIGN = "yazilim-batch-1"

const SOLUTION =
  "Solman Digital olarak yazılım firmalarıyla white-label geliştirme ortaklığı kuruyoruz: müşterilerinizden gelen modern web, uygulama veya AI otomasyon taleplerini sizin adınıza geliştiriyor, siz kendi markanızla teslim ediyorsunuz. Next.js, React, API entegrasyonu ve yapay zeka otomasyon projelerinde destek verebiliriz. Başından sonuna aynı uzmanla, katmansız iletişimle."

const leads = [
  {
    slug: "initialcode",
    to: "info@initialcode.io",
    subject: "Initial Code ile white-label geliştirme ortaklığı",
    compliment: "Initial Code, Zeytinburnu'nda kendi markasıyla yazılım geliştiren ve uluslararası profilli bir domain tercih etmiş bir firma — bu konumlanma ciddi bir büyüme hedefine işaret ediyor.",
    opportunity: "Müşteri portföyünüz büyüdükçe her talebi kendi ekibinizle karşılamak güçleşiyor. Modern web, mobil veya AI otomasyon projelerinde beyaz etiketle destek alabilirseniz hem kapasiteyi artırırsınız hem de müşteri kaybetmezsiniz.",
  },
  {
    slug: "indbilisim",
    to: "info@indbilisim.com.tr",
    subject: "IND Bilişim ile white-label geliştirme ortaklığı",
    compliment: "IND Bilişim, Üsküdar'da yıllar içinde müşteri tabanı oluşturmuş köklü bir bilişim firması.",
    opportunity: "Köklü bir bilişim firmasına gelen web, uygulama veya otomasyon talepleri zaman zaman mevcut ekibin kapasitesini aşıyor. Bu talepleri beyaz etiketle karşılayabilirseniz müşterinizi elde tutursunuz, yeni iş geliştirmeye odaklanırsınız.",
  },
  {
    slug: "codenwork",
    to: "info@codenwork.com.tr",
    subject: "Codenwork ile white-label geliştirme ortaklığı",
    compliment: "Codenwork, Kadıköy'de yazılım geliştirme hizmeti veren genç ve aktif bir firma.",
    opportunity: "Büyüyen bir yazılım firması için kapasite yönetimi kritik — her yeni müşteri talebi için ekip büyütmek yerine güvenilir bir taşeron ortağıyla esnek çalışmak çok daha sürdürülebilir.",
  },
  {
    slug: "arcus",
    to: "sales@arcus.com.tr",
    subject: "Arcus Software ile white-label geliştirme ortaklığı",
    compliment: "Arcus Software, Beyoğlu'nda kurumsal müşteri segmentine hizmet veren köklü bir yazılım firması.",
    opportunity: "Kurumsal müşterilerden gelen modern web uygulaması veya API entegrasyonu talepleri zaman zaman mevcut uzmanlık alanının dışına çıkabiliyor. Bu talepleri beyaz etiketle karşılayabilirsek müşteri kaybı olmaz, iş büyür.",
  },
  {
    slug: "pusulanet",
    to: "info@pusulanet.net",
    subject: "Pusulanet ile white-label geliştirme ortaklığı",
    compliment: "Compass Software / Pusulanet, Fatih'te yıllar içinde müşteri tabanı oluşturmuş köklü bir bilişim firması.",
    opportunity: "Köklü bir bilişim firmasına gelen modern web veya otomasyon talepleri zaman zaman kapasitenin ötesine geçiyor. Güvenilir bir taşeron ortağıyla bu talepleri karşılayabilirseniz müşterinizi elde tutursunuz.",
  },
  {
    slug: "aldarsoftware",
    to: "info@aldarsoftware.com",
    subject: "Aldar Software ile white-label geliştirme ortaklığı",
    compliment: "Aldar Software, Beyoğlu'nda kendi markasıyla yazılım hizmeti veren aktif bir firma.",
    opportunity: "Yazılım firmalarına gelen her talebi kendi bünyesinde karşılamak zor — özellikle modern frontend, AI entegrasyonu veya SaaS geliştirme gibi alanlarda. Bu talepleri beyaz etiketle karşılayabilirsek hem müşteriyi tutarsınız hem de gelir kaybı olmaz.",
  },
  {
    slug: "beansoft",
    to: "info@beansoftware.com",
    subject: "BEAN Software ile white-label geliştirme ortaklığı",
    compliment: "BEAN Software, Şişli'de modern bir marka kimliğiyle yazılım geliştirme hizmeti veren aktif bir firma.",
    opportunity: "Büyüyen bir yazılım firması için her yeni proje tipine ekip büyütmek sürdürülebilir değil. Next.js, API entegrasyonu veya AI otomasyon projelerinde beyaz etiketle destek alabilirseniz portföyünüzü genişletirsiniz.",
  },
  {
    slug: "morgem",
    to: "sales@morgem.com",
    subject: "Morgem Bilgi Teknolojileri ile white-label geliştirme ortaklığı",
    compliment: "Morgem Bilgi Teknolojileri A.Ş., Beyoğlu'nda kurumsal müşteri segmentine hizmet veren köklü bir teknoloji firması.",
    opportunity: "Kurumsal müşterilerden gelen modern uygulama veya yazılımlar arası entegrasyon talepleri zaman zaman mevcut ekibin kapasitesini aşıyor. Bu talepleri beyaz etiketle karşılamak hem müşteri ilişkisini korur hem de yeni gelir kapısı açar.",
  },
  {
    slug: "ankacode",
    to: "info@ankacode.com",
    subject: "AnkaCode ile white-label geliştirme ortaklığı",
    compliment: "AnkaCode, Kadıköy'de yazılım geliştirme hizmeti veren aktif bir firma.",
    opportunity: "Büyüyen bir yazılım firması için kapasite yönetimi kritik. Modern web, mobil veya AI otomasyon projelerinde beyaz etiketle destek alabilirseniz hem kapasiteyi artırırsınız hem de müşteri kaybetmezsiniz.",
  },
  {
    slug: "ordinatrum",
    to: "info@ordinatrum.com.tr",
    subject: "Ordinatrum Bilişim ile white-label geliştirme ortaklığı",
    compliment: "Ordinatrum Bilişim Teknolojileri, Kadıköy'de yıllar içinde müşteri tabanı oluşturmuş köklü bir bilişim firması.",
    opportunity: "Köklü bir bilişim firmasına gelen modern web veya entegrasyon talepleri zaman zaman mevcut uzmanlık alanının dışına çıkıyor. Güvenilir bir taşeron ortağıyla bu açığı kapatabilirsiniz.",
  },
  {
    slug: "smartpro",
    to: "info@smartpro.com.tr",
    subject: "SmartPro ile white-label geliştirme ortaklığı",
    compliment: "SmartPro Computer Academy, Kadıköy'de hem eğitim hem yazılım hizmeti veren köklü bir firma — bu ikili yapı güçlü bir müşteri tabanı oluşturuyor.",
    opportunity: "Eğitim müşterileri çoğunlukla yazılım projesine de ihtiyaç duyuyor. Bu talepleri beyaz etiketle karşılayabilirsek hem müşteriyi tutarsınız hem de eğitim gelirinin yanına proje geliri eklenir.",
  },
  {
    slug: "orbitbilisim",
    to: "info@orbitbilisim.com",
    subject: "Orbit Bilişim ile white-label geliştirme ortaklığı",
    compliment: "Orbit Bilişim, Kadıköy'de yıllar içinde müşteri tabanı oluşturmuş köklü bir bilişim firması.",
    opportunity: "Müşterilerden gelen modern web, uygulama veya otomasyon talepleri zaman zaman kapasitenin ötesine geçiyor. Güvenilir bir taşeron ortağıyla bu talepleri beyaz etiketle karşılayabilirseniz müşteri kaybı olmaz.",
  },
  {
    slug: "infotechacademy",
    to: "info@infotechacademy.com.tr",
    subject: "Infotech Academy ile white-label geliştirme ortaklığı",
    compliment: "Infotech Academy, Kadıköy'de yazılım eğitimi ve teknoloji hizmeti veren aktif bir firma — eğitim ve geliştirme birlikte güçlü bir müşteri tabanı oluşturuyor.",
    opportunity: "Eğitim müşterileri çoğunlukla yazılım projesine de ihtiyaç duyuyor. Bu talepleri beyaz etiketle karşılayabilirsek hem müşteriyi tutarsınız hem de gelir çeşitlenir.",
  },
  {
    slug: "monolab",
    to: "info@monolab.org",
    subject: "Monolab ile white-label geliştirme ortaklığı",
    compliment: "Monolab, Kadıköy'de özgün marka kimliğiyle dijital ürünler geliştiren aktif bir studio.",
    opportunity: "Büyüyen bir dijital studio için kapasite zaman zaman dar geliyor. Modern web, API entegrasyonu veya AI otomasyon projelerinde beyaz etiketle destek alabilirseniz portföyünüzü genişletirsiniz, müşteri kaybetmezsiniz.",
  },
  {
    slug: "finedine",
    to: "info@finedinemenu.com",
    subject: "Finedine ile entegrasyon ortaklığı",
    compliment: "Finedine, Kadıköy'de <strong>restoran dijital menü</strong> alanında ürün geliştiren ve kendi SaaS platformunu kuran bir firma — bu niş odak güçlü bir konumlanma.",
    opportunity: "Restoran müşterileri dijital menünün yanı sıra web sitesi, rezervasyon sistemi ve Google entegrasyonu da istiyor. Bu talepleri beyaz etiketle karşılayabilirsek her iki taraf için de ek gelir kapısı açılır.",
  },
  {
    slug: "sistemkod",
    to: "info@sistemkod.com",
    subject: "Sistemkod Bilişim ile white-label geliştirme ortaklığı",
    compliment: "Sistemkod Bilişim, Kadıköy'de yıllar içinde müşteri tabanı oluşturmuş köklü bir bilişim firması.",
    opportunity: "Müşterilerden gelen modern web veya otomasyon talepleri zaman zaman kapasitenin ötesine geçiyor. Güvenilir bir taşeron ortağıyla bu talepleri beyaz etiketle karşılayabilirseniz müşteri kaybı olmaz.",
  },
  {
    slug: "elmer",
    to: "elmer@elmer.com.tr",
    subject: "Elmer Yazılım ile white-label geliştirme ortaklığı",
    compliment: "Elmer Yazılım, Kadıköy'de kendi adıyla marka oluşturmuş köklü bir yazılım firması.",
    opportunity: "Köklü bir yazılım firmasına gelen modern frontend, API entegrasyonu veya AI otomasyon talepleri zaman zaman mevcut ekibin uzmanlık alanının dışına çıkıyor. Bu açığı beyaz etiketle kapatmak hem müşteri ilişkisini korur hem de yeni gelir kapısı açar.",
  },
  {
    slug: "triga",
    to: "info@triga.com.tr",
    subject: "Triga ile white-label geliştirme ortaklığı",
    compliment: "Triga, Şişli'de yazılım geliştirme ve teknoloji hizmeti veren aktif bir firma.",
    opportunity: "Büyüyen bir yazılım firması için her proje tipine ekip büyütmek sürdürülebilir değil. Next.js, React veya AI otomasyon projelerinde beyaz etiketle destek alabilirseniz portföyünüzü genişletirsiniz.",
  },
  {
    slug: "tio",
    to: "merhaba@tio.ist",
    subject: "Tio Bilişim ile white-label geliştirme ortaklığı",
    compliment: "Tio Bilişim, Kadıköy'de <strong>coworking ve teknoloji ekosistemi</strong> oluşturan özgün bir yapı — bu ekosistem çok sayıda erken aşama girişimi ve proje talebini barındırıyor.",
    opportunity: "Coworking topluluğundaki girişimlerden gelen web, uygulama veya AI otomasyon talepleri için güvenilir bir geliştirme ortağı olmak mümkün. Tio'ya gelen talepleri beyaz etiketle karşılayabilirsek her iki taraf için de ek gelir kapısı açılır.",
  },
  {
    slug: "itworks",
    to: "barkin.demir@it-works.com.tr",
    subject: "IT Works Bilişim ile white-label geliştirme ortaklığı",
    compliment: "IT Works Bilişim, Kadıköy'de kurumsal müşteri segmentine hizmet veren aktif bir bilişim firması.",
    opportunity: "Kurumsal müşterilerden gelen modern uygulama veya yazılımlar arası entegrasyon talepleri zaman zaman mevcut ekibin kapasitesini aşıyor. Bu talepleri beyaz etiketle karşılayabilirsek müşteri ilişkisi korunur, iş büyür.",
  },
  {
    slug: "kobaltotomasyon",
    to: "otomasyon@kobaltotomasyon.com",
    subject: "Kobalt Otomasyon ile geliştirme ortaklığı",
    compliment: "Kobalt Otomasyon, Kadıköy'de <strong>otomasyon çözümleri</strong> geliştiren ve kendi uzmanlık alanını doğrudan marka adına yansıtan bir firma — bu netlik güçlü bir konumlanma.",
    opportunity: "Otomasyon projelerinde zaman zaman modern web arayüzü, API entegrasyonu veya AI katmanı ihtiyacı doğuyor. Bu alanlarda beyaz etiketle destek alabilirseniz müşteriye uçtan uca çözüm sunarsınız, proje kaybetmezsiniz.",
  },
  {
    slug: "erpkariyer",
    to: "info@erpkariyer.com",
    subject: "ERP Kariyer ile white-label geliştirme ortaklığı",
    compliment: "ERP Kariyer, Kadıköy'de <strong>ERP sistemleri ve kurumsal yazılım</strong> alanında uzmanlaşmış bir firma — bu niş odak güçlü bir müşteri kitlesi oluşturuyor.",
    opportunity: "ERP müşterileri çoğunlukla modern web arayüzü, entegrasyon veya raporlama panosu da istiyor. Bu talepleri beyaz etiketle karşılayabilirsek hem müşteriyi tutarsınız hem de ERP projesinin yanına ek gelir eklenir.",
  },
]

function ctaUrl(slug) {
  return `https://solmandigital.com.tr/ucretsiz-analiz?utm_source=resend&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
}

function waUrl(slug) {
  const text = `Merhaba, e-postanızı aldım, white-label ortaklık hakkında görüşmek istiyorum. (Ref: ${slug})`
  return `https://wa.me/905439675250?text=${encodeURIComponent(text)}`
}

function buildHtml({ slug, compliment, opportunity }) {
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${compliment}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${opportunity}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${SOLUTION}</p><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">Bir sonraki projenizde denemek isterseniz kısa bir görüşme ayarlayalım — nasıl çalıştığımızı, hangi projelerde destek verebileceğimizi somut örneklerle anlatalım. Hiçbir yükümlülük yok.</p><a href="${ctaUrl(slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Görüşme Ayarlayalım</a><a href="${waUrl(slug)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

function stripTags(s) { return s.replace(/<[^>]+>/g, "") }

function buildText({ slug, compliment, opportunity }) {
  return [
    "Merhaba,",
    stripTags(compliment),
    stripTags(opportunity),
    stripTags(SOLUTION),
    `Bir sonraki projenizde denemek isterseniz kısa bir görüşme ayarlayalım.\n${ctaUrl(slug)}\nWhatsApp: ${waUrl(slug)}\nYa da bu maile doğrudan yanıt verin.`,
    "Solman Digital — İstanbul Yazılım Ofisi · solmandigital.com.tr · 0543 967 52 50\nMail listesinden çıkmak istiyorsanız bize bildirin: info@solmandigital.com.tr",
  ].join("\n\n")
}

const messages = leads.map((l) => ({
  to: l.to,
  subject: l.subject,
  html: buildHtml(l),
  text: buildText(l),
}))

writeFileSync(new URL("./leads-batch-4.json", import.meta.url), JSON.stringify(messages, null, 2), "utf8")
console.log(`${messages.length} mail üretildi → scripts/leads-batch-4.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
