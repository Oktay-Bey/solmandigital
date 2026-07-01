// Güzellik & Estetik Klinikleri — İstanbul — batch 20
// Kaynak: Apify Google Maps scrape (2026-06-12)
// Hedef: online randevu · landing page CRO · Google Ads dönüşümü · web yenileme
import { writeFileSync, readFileSync, existsSync } from "node:fs"

const CAMPAIGN = "guzellik-estetik-1"

const suppress = existsSync(new URL("./suppress-list.json", import.meta.url))
  ? JSON.parse(readFileSync(new URL("./suppress-list.json", import.meta.url), "utf8"))
  : []

const SOLUTION =
  "Solman Digital olarak güzellik merkezleri ve estetik kliniklere özel dijital çözümler geliştiriyoruz: Google Ads dönüşümünü artıran landing page'ler, online randevu sistemi ve kurumsal web sitesi. Başından sonuna aynı uzmanla, katmansız iletişimle."

const rawLeads = [
  {
    slug: "estesie-clinic",
    to: "hi@estesie.com",
    firm: "Estesie Clinic",
    district: "Bakırköy",
    subject: "Estesie Clinic için dijital dönüşüm önerisi — randevu · landing page",
    compliment: "Estesie Clinic, Bakırköy'de medikal estetik, saç ekimi ve botoks alanında 4.9 puanla öne çıkan, güçlü bir müşteri memnuniyeti oluşturmuş prestijli bir klinik.",
    opportunity: "Bu kadar yüksek bir puana sahip kliniklerin çoğu Google Ads'e ciddi bütçe ayırıyor — ancak landing page dönüşüm oranı zayıf olduğunda bütçenin önemli kısmı randevuya dönüşmeden kaybolur. Dönüşüm odaklı bir sayfa ve akıcı online danışma formu bu kaybı doğrudan gelire çevirir.",
  },
  {
    slug: "cherry-beauty",
    to: "info@cherryguzelliksalonu.com",
    firm: "Cherry Beauty Center",
    district: "Şişli",
    subject: "Cherry Beauty Center için online randevu + landing page önerisi",
    compliment: "Cherry Beauty Center, Şişli'de 4.9 puan ve güçlü yorum kitlesiyle güzellik sektöründe fark yaratan bir merkez.",
    opportunity: "Şişli'deki güzellik merkezleri rekabeti yüksek bir bölgede faaliyet gösteriyor. Google'da arama yapan potansiyel müşterinin online randevu alamaması veya eski görünen bir siteyle karşılaşması, rakibe geçmesine neden oluyor. Akıcı bir online randevu sistemi ve dönüşüm odaklı bir landing page bu fırsatı yakalar.",
  },
  {
    slug: "leyla-inanir",
    to: "info@leylainanir.com",
    firm: "Leyla İnanır Güzellik",
    district: "Şişli",
    subject: "Leyla İnanır Güzellik için dijital çözüm önerisi",
    compliment: "Leyla İnanır, Nişantaşı'nda kalite ve profesyonelliğiyle tanınan, 4.9 puana sahip köklü bir güzellik salonu.",
    opportunity: "Nişantaşı segmentindeki müşteriler hem hizmet kalitesini hem de dijital deneyimi titizlikle değerlendiriyor. Online randevu imkânı sunan ve kurumsal bir görünümle öne çıkan salonlar bu segmentin tercih sıralamasında üste çıkıyor.",
  },
  {
    slug: "arzu-bulut",
    to: "info@arzubulutguzellik.com",
    firm: "Arzu Bulut Güzellik",
    district: "Beşiktaş",
    subject: "Arzu Bulut Güzellik için online randevu + web yenileme önerisi",
    compliment: "Arzu Bulut Güzellik, Beşiktaş'ta medikal estetik ve cilt bakımı alanında 4.9 puan ve güçlü bir müşteri tabanıyla öne çıkan prestijli bir merkez.",
    opportunity: "Medikal estetik müşterileri karar vermeden önce dijital varlığı detaylı inceliyor. Güvenilir görünen bir web sitesi ve hızlı online randevu sistemi, potansiyel müşterinin telefon açmak yerine direkt rezervasyon yapmasını sağlıyor.",
  },
  {
    slug: "vklinik",
    to: "info@vklinik.com.tr",
    firm: "VKlinik / American Aesthetics",
    district: "Şişli",
    subject: "VKlinik için landing page CRO + randevu sistemi önerisi",
    compliment: "VKlinik, Şişli'de saç restorasyonu ve estetik cerrahi alanında 848 yorum ve 4.8 puanla İstanbul'un en güçlü kliniklerinden biri.",
    opportunity: "Bu hacimde yorumu olan bir klinik için dijital dönüşüm oranındaki küçük bir iyileşme bile yüzlerce ek randevu anlamına geliyor. Mevcut Google Ads trafiğini daha verimli yakalamak için dönüşüm odaklı bir landing page önemli bir fark yaratır.",
  },
  {
    slug: "estetik-center",
    to: "info@estetikcenter.com.tr",
    firm: "Estetik Center",
    district: "Tuzla",
    subject: "Estetik Center için dijital dönüşüm önerisi",
    compliment: "Estetik Center, Tuzla'da plastik cerrahi ve estetik alanında 535 yorum ve 4.8 puanla güçlü bir konum elde etmiş köklü bir klinik.",
    opportunity: "Tuzla ve çevre semtlerden gelen hasta talebi dijital kanal üzerinden akıyor. Randevu dönüşümünü artıran bir landing page ve mobil uyumlu online randevu sistemi, Anadolu yakasındaki rekabette belirleyici üstünlük sağlıyor.",
  },
  {
    slug: "lilys-beauty",
    to: "info@lilysbeautystudio.com",
    firm: "Lily's Beauty Studio",
    district: "Şişli",
    subject: "Lily's Beauty Studio için online randevu + landing page önerisi",
    compliment: "Lily's Beauty Studio, Şişli'de lazer epilasyon, cilt bakımı ve vücut şekillendirme hizmetleriyle 469 yorum ve 4.8 puanla öne çıkan kapsamlı bir güzellik merkezi.",
    opportunity: "Birden fazla hizmet kategorisi sunan merkezlerde hizmet bazlı landing page'ler Google Ads'ten gelen trafiği çok daha verimli randevuya çeviriyor. Epilasyon arayanla cilt bakımı arayanın farklı sayfalarla karşılaşması dönüşüm oranını önemli ölçüde artırıyor.",
  },
  {
    slug: "mediten",
    to: "contact@mediten.com.tr",
    firm: "Mediten",
    district: "Beyoğlu",
    subject: "Mediten için dijital dönüşüm önerisi — randevu · landing page",
    compliment: "Mediten, Beyoğlu'nda medikal estetik ve güzellik alanında 438 yorum ve 4.8 puanla güçlü bir müşteri memnuniyeti oluşturmuş köklü bir merkez.",
    opportunity: "Taksim/Beyoğlu bölgesindeki rekabetçi ortamda online görünürlük ve randevu akışı kritik önem taşıyor. Dönüşüm odaklı bir dijital altyapı, mevcut itibarı yeni müşteri akışına doğrudan yansıtıyor.",
  },
  {
    slug: "yucel-sarialtin",
    to: "info@yucelsarialtin.com",
    firm: "Op.Dr.Yücel Sarıaltın Kliniği",
    district: "Ataşehir",
    subject: "Yücel Sarıaltın Kliniği için dijital dönüşüm önerisi",
    compliment: "Op.Dr.Yücel Sarıaltın, Ataşehir'de estetik ve plastik cerrahi alanında 415 yorum ve 4.8 puanla güvenilirliğini kanıtlamış seçkin bir klinik.",
    opportunity: "Plastik cerrahi müşterileri karar süreçlerinde uzun araştırma yapıyor. Bu süreçte kliniğin web sitesinin hızı, güven verici tasarımı ve kolay randevu alınabilmesi, tercihi belirleyen en kritik faktörler arasında yer alıyor.",
  },
  {
    slug: "estetica-istanbul",
    to: "info@esteticaistanbul.com",
    firm: "Estetica Istanbul",
    district: "Kadıköy",
    subject: "Estetica Istanbul için landing page + randevu sistemi önerisi",
    compliment: "Estetica Istanbul, Kadıköy'de medikal estetik alanında 166 yorum ve 4.8 puanla kaliteli hizmetiyle öne çıkan bir klinik.",
    opportunity: "Kadıköy'deki medikal estetik klinikler için Google aramaları yoğun — ancak randevu dönüşümü landing page kalitesiyle doğrudan ilişkili. Dönüşüm odaklı bir sayfa, mevcut Google Ads harcamasını çok daha verimli kullanmanızı sağlar.",
  },
  {
    slug: "esteticderm",
    to: "info@esteticderm.com",
    firm: "EsteticDerm Clinic Istanbul",
    district: "Şişli",
    subject: "EsteticDerm Clinic için dijital çözüm önerisi",
    compliment: "EsteticDerm Clinic, Şişli'de cilt bakımı ve medikal estetik alanında uzmanlaşmış, yüksek puanlı bir klinik.",
    opportunity: "Cilt bakımı segmentinde 'hydrafacial istanbul', 'cilt bakımı şişli' gibi aramalar yoğun ve doğrudan randevuya dönüşme potansiyeli yüksek. Bu trafiği yakalamak için dönüşüm odaklı bir landing page ve online randevu sistemi birlikte çalışmalı.",
  },
  {
    slug: "kimia-estetik",
    to: "info@kimiaestetik.com",
    firm: "Kimia Estetik",
    district: "Şişli",
    subject: "Kimia Estetik için online randevu + landing page önerisi",
    compliment: "Kimia Estetik, Torun Center'daki prestijli konumuyla Şişli'de medikal estetik alanında 4.8 puanla öne çıkan seçkin bir merkez.",
    opportunity: "Prestijli AVM konumundaki kliniklerin dijital varlığının da bu prestiji yansıtması gerekiyor. Online randevu imkânı ve kurumsal tasarımıyla öne çıkan bir web sitesi yeni hasta kazanımını doğrudan etkiliyor.",
  },
  {
    slug: "dolu-dolu-guzellik",
    to: "iletisim@doludoluguzellik.com.tr",
    firm: "Dolu Dolu Güzellik Salonu",
    district: "Fatih",
    subject: "Dolu Dolu Güzellik için online randevu + web önerisi",
    compliment: "Dolu Dolu Güzellik, Fatih'te lazer epilasyon ve cilt bakımı alanında 4.8 puanla güçlü bir müşteri tabanı oluşturmuş aktif bir merkez.",
    opportunity: "Fatih ve çevresindeki lazer epilasyon aramaları yüksek hacimli ve rekabetçi. Dönüşüm odaklı bir landing page ve akıcı online randevu, bu aramaları müşteriye çevirmede belirleyici fark yaratıyor.",
  },
  {
    slug: "linemed",
    to: "info@linemed.com.tr",
    firm: "Linemed Poliklinik",
    district: "Levent",
    subject: "Linemed Poliklinik için dijital dönüşüm önerisi",
    compliment: "Linemed Poliklinik, Levent'te 1559 yorum ve 4.7 puanla İstanbul'un en çok değerlendirilen estetik kliniklerinden biri — bu büyüklük güçlü bir dijital altyapıyı zorunlu kılıyor.",
    opportunity: "Bu hacimde hasta trafiği olan bir klinik için dijital randevu akışındaki küçük bir iyileşme bile büyük hacimler anlamına geliyor. Online randevu sisteminin kullanım kolaylığı ve landing page kalitesi doğrudan hasta sayısını etkiliyor.",
  },
  {
    slug: "glamour-guzellik",
    to: "info@glamourguzellikmerkezi.com",
    firm: "Glamour Güzellik Merkezi",
    district: "Şişli",
    subject: "Glamour Güzellik için online randevu + web yenileme önerisi",
    compliment: "Glamour Güzellik Merkezi, Şişli'de güzellik ve estetik hizmetlerinde 4.7 puanla güçlü bir müşteri memnuniyeti oluşturmuş aktif bir merkez.",
    opportunity: "Şişli'deki güzellik merkezleri rekabetinde dijital kanaldan öne çıkmak belirleyici. Mobil uyumlu bir site ve tek tıkla randevu alan bir sistem — Google'dan gelen potansiyel müşterinin başka bir yere gitmesini önlüyor.",
  },
  {
    slug: "estherian",
    to: "hi@estherian.com",
    firm: "Estherian Clinic",
    district: "Küçükçekmece",
    subject: "Estherian Clinic için dijital dönüşüm önerisi",
    compliment: "Estherian Clinic, 549 yorum ve 4.6 puanla Küçükçekmece'de estetik ve güzellik alanında güçlü bir konum elde etmiş köklü bir klinik.",
    opportunity: "Küçükçekmece ve çevre semtlerin nüfus yoğunluğu göz önünde bulundurulduğunda dijital randevu trafiği çok büyük bir potansiyel taşıyor. Online randevu sistemi ve dönüşüm odaklı landing page bu potansiyeli somut hasta akışına dönüştürür.",
  },
  {
    slug: "medist-beauty",
    to: "info@medistbeautycenter.com",
    firm: "Med-İst Beauty Center",
    district: "Kadıköy",
    subject: "Med-İst Beauty Center için online randevu + landing page önerisi",
    compliment: "Med-İst Beauty Center, Kadıköy'de lazer epilasyon, cilt bakımı ve G5 masajı hizmetleriyle 185 yorum ve 4.6 puanla müşteri memnuniyeti yüksek bir güzellik merkezi.",
    opportunity: "Kadıköy'deki lazer epilasyon aramaları yüksek rekabetli — ancak kolayca randevu alınabilen merkezler bu aramaların büyük bölümünü kazanıyor. Online randevu ve dönüşüm odaklı bir sayfa bu rekabette öne geçirir.",
  },
  {
    slug: "clinika-estetik",
    to: "info@clinikaestetik.com",
    firm: "Clinika Estetik ve Güzellik",
    district: "Şişli",
    subject: "Clinika Estetik için online randevu + web önerisi",
    compliment: "Clinika Estetik, Şişli'de estetik ve güzellik hizmetleriyle 4.5 puanla müşteri kitlesi oluşturmuş aktif bir merkez.",
    opportunity: "Şişli estetik pazarında dijital görünürlük giderek daha kritik hale geliyor. Online randevu sistemi olmayan merkezler, telefon açmak istemeyen ve hemen rezervasyon yapmak isteyen potansiyel müşteri kitlesini doğrudan kaybediyor.",
  },
  {
    slug: "rose-moon",
    to: "info@rosemoonguzellik.com.tr",
    firm: "Rose Moon Güzellik Merkezi",
    district: "Şişli",
    subject: "Rose Moon için online randevu sistemi + web önerisi",
    compliment: "Rose Moon Güzellik Merkezi, Şişli'de güzellik hizmetlerinde 4.5 puanla tutarlı müşteri memnuniyeti sağlayan aktif bir merkez.",
    opportunity: "Güzellik merkezlerinde yeni müşteri kaybının en büyük nedeni online randevu alınamaması. Telefon beklemek yerine anında rezervasyon yapabilen müşteriler, bu imkânı sunan merkezi tercih ediyor.",
  },
  {
    slug: "estpoint",
    to: "info@estpointclinic.com.tr",
    firm: "Estpoint Estetik & Güzellik",
    district: "Beşiktaş",
    subject: "Estpoint Estetik için landing page + randevu sistemi önerisi",
    compliment: "Estpoint Estetik & Güzellik Merkezi, Beşiktaş'ta estetik ve güzellik hizmetlerinde 508 yorum ve 4.4 puanla aktif ve köklü bir merkez.",
    opportunity: "Beşiktaş'ta 508 yoruma ulaşmış bir merkez, dijital kanaldan çok daha fazla randevu alabilecek bir itibar birikimini sahip. Bu birikimi dönüşüme çeviren bir landing page ve randevu sistemi yatırımın geri dönüşünü hızla gösterir.",
  },
  {
    slug: "arden-beauty",
    to: "info@ardenbeauty.com.tr",
    firm: "Arden Beauty",
    district: "Fatih",
    subject: "Arden Beauty için online randevu + web yenileme önerisi",
    compliment: "Arden Beauty, Fatih'te güzellik ve estetik hizmetleri sunan, kurumsal web varlığını yansıtmaya çalışan aktif bir güzellik merkezi.",
    opportunity: "Fatih ve çevre semtlerde güzellik merkezlerine olan talep yüksek. Online randevu sistemi ve dönüşüm odaklı bir web tasarımı — potansiyel müşterilerin rakibe gitmeden direkt rezervasyon yapmasını sağlıyor.",
  },
  {
    slug: "vivid-clinic",
    to: "info@vividclinic.net",
    firm: "Vivid Clinic",
    district: "Bakırköy",
    subject: "Vivid Clinic için dijital dönüşüm önerisi — landing page · randevu",
    compliment: "Vivid Clinic, Bakırköy'de kozmetik cerrahi alanında 156 yorum ve tam 5 puanla İstanbul'un en üst sıradaki kliniklerinden biri.",
    opportunity: "5 puan gibi nadir bir başarı, güçlü bir dijital funnel ile çok daha yüksek hasta hacmine dönüşebilir. Mevcut itibarı Google Ads üzerinden gelen trafiğe yansıtan dönüşüm odaklı bir landing page bu potansiyeli somut randevuya çevirir.",
  },
]

const leads = rawLeads.filter(l => !suppress.includes(l.to))

function ctaUrl(slug) {
  return `https://solmandigital.com.tr/ucretsiz-analiz?utm_source=brevo&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
}

function waUrl(slug, firm) {
  const text = `Merhaba, ${firm} için e-postanızı aldım, dijital çözüm hakkında görüşmek istiyorum. (Ref: ${slug})`
  return `https://wa.me/905439675250?text=${encodeURIComponent(text)}`
}

function buildHtml(l) {
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${l.compliment}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${l.opportunity}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${SOLUTION}</p><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">Merkezinize özel nasıl bir çözümün uygun olduğunu kısa bir görüşmede konuşalım — hiçbir yükümlülük yok, somut örnekler sunabiliriz.</p><a href="${ctaUrl(l.slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Ücretsiz Görüşme Ayarlayalım</a><a href="${waUrl(l.slug, l.firm)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

function buildText(l) {
  return [
    "Merhaba,",
    l.compliment,
    l.opportunity,
    SOLUTION,
    `Merkezinize özel nasıl bir çözümün uygun olduğunu kısa bir görüşmede konuşalım.\n${ctaUrl(l.slug)}\nWhatsApp: ${waUrl(l.slug, l.firm)}\nYa da bu maile doğrudan yanıt verin.`,
    "Solman Digital — İstanbul Yazılım Ofisi · solmandigital.com.tr · 0543 967 52 50\nMail listesinden çıkmak istiyorsanız bize bildirin: info@solmandigital.com.tr",
  ].join("\n\n")
}

const messages = leads.map((l) => ({
  to: l.to,
  subject: l.subject,
  html: buildHtml(l),
  text: buildText(l),
}))

writeFileSync(new URL("./leads-batch-20.json", import.meta.url), JSON.stringify(messages, null, 2), "utf8")
console.log(`${messages.length} mail üretildi → scripts/leads-batch-20.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
