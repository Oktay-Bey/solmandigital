// Onaylı şablonla kişiselleştirilmiş lead mailleri üretir → scripts/leads-batch-1.json
import { writeFileSync } from "node:fs"

const SOLUTION_DEFAULT =
  "Solman Digital olarak klinikler için modern web siteleri geliştiriyoruz: online randevu sistemi, hızlı ve mobil uyumlu tasarım, Google görünürlüğünü artıran teknik altyapı. Başından sonuna aynı uzmanla, katmansız iletişimle çalışırsınız."

const leads = [
  {
    slug: "klinik34",
    to: "info@klinik34.com.tr",
    subject: "Klinik 34'ün 4.8 puanlık itibarına yakışan bir dijital deneyim",
    compliment:
      "Klinik 34, Google'da <strong>4.8 puan ve 249 yorumla</strong> Fatih'te gerçekten öne çıkan kliniklerden biri — bu kolay kazanılan bir itibar değil, tebrikler.",
    opportunity:
      "Bu kadar güçlü bir hasta memnuniyeti, doğru dijital deneyimle daha fazla yeni hastaya dönüşebilir: sizi Google'da bulan biri web sitenizden 30 saniyede randevu alabilmeli, yorumlarınız ve tedavi alanlarınız ilk bakışta görünmeli.",
  },
  {
    slug: "hekimoglu",
    to: "info@hekimoglugoruntuleme.com",
    subject: "Hekimoğlu Görüntüleme'ye hasta deneyimini kolaylaştıracak bir öneri",
    compliment:
      "Hekimoğlu Görüntüleme, Fatih'te <strong>HSG ve renkli ultrason</strong> gibi aranan tetkiklerde bilinen bir merkez — bu niş konumlanma dijitalde büyük avantaj.",
    opportunity:
      "Bu tetkikleri arayan hastalar çoğunlukla aciliyet hisseder; telefonla ulaşamadığında bir sonraki merkeze geçer. Online randevu ve net bilgilendirme sayfalarıyla hastalar sitenizden 30 saniyede randevu alabilir, telefon trafiğiniz de hafifler.",
    solution:
      "Solman Digital olarak sağlık kuruluşları için modern web siteleri geliştiriyoruz: online randevu sistemi, hızlı ve mobil uyumlu tasarım, Google görünürlüğünü artıran teknik altyapı. Başından sonuna aynı uzmanla, katmansız iletişimle çalışırsınız.",
  },
  {
    slug: "hikmetbilge",
    to: "hikmetbilge@hotmail.com",
    subject: "Dr. Hikmet Bilge'nin kişisel markasına yakışan bir web sitesi",
    compliment:
      "Üsküdar'da <strong>kişisel web sitesi olan az sayıda diş hekiminden birisiniz</strong> — hikmetbilge.com ile dijitalde erken davranmışsınız, tebrikler.",
    opportunity:
      "Bugünün hastası hekimini Google'da arıyor ve karar vermeden önce web sitesini inceliyor. Modern, mobil uyumlu bir yenileme kişisel markanızı çok daha güçlü taşır; online randevu da eklenince hastalarınız telefon beklemeden randevu alabilir.",
    solution:
      "Solman Digital olarak hekimler için modern web siteleri geliştiriyoruz: online randevu sistemi, hızlı ve mobil uyumlu tasarım, Google görünürlüğünü artıran teknik altyapı. Başından sonuna aynı uzmanla, katmansız iletişimle çalışırsınız.",
  },
  {
    slug: "konuralp",
    to: "info@konuralpdis.com",
    subject: "Konuralp Diş'in 4.8 puanlık itibarına yakışan bir dijital deneyim",
    compliment:
      "Özel Konuralp, Google'da <strong>4.8 puan ve 128 yorumla</strong> Fatih'in güvenilen diş kliniklerinden biri — bu kolay kazanılan bir itibar değil, tebrikler.",
    opportunity:
      "Bu kadar güçlü bir hasta memnuniyeti, doğru dijital deneyimle daha fazla yeni hastaya dönüşebilir: sizi Google'da bulan biri web sitenizden 30 saniyede randevu alabilmeli, yorumlarınız ve tedavi alanlarınız ilk bakışta görünmeli.",
  },
  {
    slug: "beyazcizgi",
    to: "info@beyazcizgi.net",
    subject: "Beyaz Çizgi'nin 100 yorumluk güvenine yakışan bir dijital deneyim",
    compliment:
      "Beyaz Çizgi, Google'da <strong>100 yorum ve 4.5 puanla</strong> Fatih'te bilinirliğini kanıtlamış bir poliklinik — tebrikler.",
    opportunity:
      "Bu güveni dijitalde daha fazla yeni hastaya dönüştürmek mümkün: online randevu ile sizi Google'da bulan hasta 30 saniyede randevu alabilir, yorumlarınız sitenizde öne çıkarak karar vermeyi kolaylaştırır.",
  },
  {
    slug: "uckok",
    to: "info@uckok.com.tr",
    subject: "Üçkök Polikliniği'ne hasta deneyimini kolaylaştıracak bir öneri",
    compliment:
      "Üçkök, Fatih'te <strong>yerleşik ve bilinen</strong> bir ağız ve diş sağlığı polikliniği — köklü bir klinik olmak dijitalde büyük avantaj.",
    opportunity:
      "Bugünün hastası kliniğini Google'da arıyor ve siteden randevu almak istiyor. Modern, mobil uyumlu bir site ve online randevu sistemiyle hem yeni hasta kazanır hem de telefon yoğunluğunu azaltırsınız.",
  },
  {
    slug: "seba",
    to: "info@sebadisklinik.com.tr",
    subject: "Seba Diş'in kusursuz 5.0 puanı dijitalde daha fazlasını hak ediyor",
    compliment:
      "Google'da <strong>123 yorumda kusursuz 5.0 puan</strong> — Seba Diş, Fatih'te eşine az rastlanır bir hasta memnuniyetine sahip, tebrikler.",
    opportunity:
      "Bu memnuniyeti web sitenizde öne çıkarmak ve online randevuyla desteklemek, sizi Google'da bulan yeni hastaların kararını çok kolaylaştırır: 30 saniyede randevu, ilk bakışta görünen yorumlar ve tedavi alanları.",
  },
  {
    slug: "cedent",
    to: "info@cedent.com.tr",
    subject: "7/24 açık CeDent için randevu da 7/24 alınabilmeli",
    compliment:
      "CeDent, <strong>4.8 puan, 435 yorum ve 7/24 hizmetiyle</strong> Fatih'in en yoğun ve en güvenilen kliniklerinden biri — tebrikler.",
    opportunity:
      "7/24 açık bir kliniğin randevusu da 7/24 alınabilmeli: online randevu sistemi gece gelen talepleri de yakalar, yoğun telefon trafiğini hafifletir ve ekrandaki hastayı kaybetmeden kayda dönüştürür.",
  },
  {
    slug: "implantistan",
    to: "implantistan@gmail.com",
    subject: "İmplantistan'ın web sitesini hak ettiği seviyeye taşıyalım",
    compliment:
      "İmplantistan olarak Üsküdar'da <strong>implant odaklı net bir konumlanmanız</strong> var — bu netlik, dijitalde büyük avantaj.",
    opportunity:
      "implantistan.com'a baktık; bazı bölümlerde şablon metinleri kalmış ve site tamamlanmamış görünüyor. Hızlı bir tamamlama ve modern bir dokunuşla siteniz, implant arayan hastalar için güçlü bir ilk izlenime dönüşebilir.",
  },
  {
    slug: "ozeldogan",
    to: "info@ozeldogandis.com",
    subject: "Özel Doğan Diş'in 4.9 puanlık itibarına yakışan bir dijital deneyim",
    compliment:
      "Özel Doğan, Google'da <strong>4.9 puan ve 79 yorumla</strong> Üsküdar'ın en beğenilen diş kliniklerinden biri — bu kolay kazanılan bir itibar değil, tebrikler.",
    opportunity:
      "Bu kadar güçlü bir hasta memnuniyeti, doğru dijital deneyimle daha fazla yeni hastaya dönüşebilir: sizi Google'da bulan biri web sitenizden 30 saniyede randevu alabilmeli, yorumlarınız ve tedavi alanlarınız ilk bakışta görünmeli.",
  },
]

function ctaUrl(slug) {
  return `https://solmandigital.com.tr/ucretsiz-analiz?utm_source=resend&utm_medium=email&utm_campaign=klinik-batch-1&utm_content=${slug}`
}

function waUrl(slug) {
  const text = `Merhaba, e-postanızı aldım, ücretsiz analiz hakkında görüşmek istiyorum. (Ref: ${slug})`
  return `https://wa.me/905439675250?text=${encodeURIComponent(text)}`
}

function buildHtml({ slug, compliment, opportunity, solution }) {
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${compliment}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${opportunity}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${solution ?? SOLUTION_DEFAULT}</p><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">İsterseniz mevcut siteniz için kısa ve ücretsiz bir analiz hazırlayalım — neyin iyi çalıştığını, nerede fırsat olduğunu somut maddelerle gönderelim. Hiçbir yükümlülük yok.</p><a href="${ctaUrl(slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Ücretsiz Analiz İsteyin</a><a href="${waUrl(slug)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı, işletmenizin herkese açık iletişim adresine tek seferlik gönderdik. Almak istemiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>, bir daha yazmayalım.</p></div></div>`
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, "")
}

function buildText({ slug, compliment, opportunity, solution }) {
  return [
    "Merhaba,",
    stripTags(compliment),
    stripTags(opportunity),
    stripTags(solution ?? SOLUTION_DEFAULT),
    `İsterseniz mevcut siteniz için kısa ve ücretsiz bir analiz hazırlayalım — yükümlülük yok.\n${ctaUrl(slug)}\nWhatsApp: ${waUrl(slug)}\nYa da bu maile doğrudan yanıt verin.`,
    "Solman Digital — İstanbul Yazılım Ofisi · solmandigital.com.tr · 0543 967 52 50\nBu tür e-postaları almak istemiyorsanız bize bildirin: info@solmandigital.com.tr",
  ].join("\n\n")
}

const messages = leads.map((l) => ({
  to: l.to,
  subject: l.subject,
  html: buildHtml(l),
  text: buildText(l),
}))

writeFileSync(new URL("./leads-batch-1.json", import.meta.url), JSON.stringify(messages, null, 2), "utf8")
console.log(`${messages.length} mail üretildi → scripts/leads-batch-1.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
