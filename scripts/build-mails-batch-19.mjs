// Türk hukuk büroları + mali müşavirlik firmaları — batch 19
// Hedef: doğrudan hizmet (web · portal · randevu · otomasyon) — white-label değil
import { writeFileSync, readFileSync, existsSync } from "node:fs"

const CAMPAIGN = "hukuk-muhasebe-1"

const suppress = existsSync(new URL("./suppress-list.json", import.meta.url))
  ? JSON.parse(readFileSync(new URL("./suppress-list.json", import.meta.url), "utf8"))
  : []

const SOLUTION_HUKUK =
  "Solman Digital olarak hukuk bürolarına özel dijital çözümler geliştiriyoruz: müvekkil portalı (güvenli belge paylaşımı ve durum takibi), online randevu sistemi ve kurumsal web sitesi. Başından sonuna aynı uzmanla, katmansız iletişimle."

const SOLUTION_MUHASEBE =
  "Solman Digital olarak mali müşavirlik firmalarına özel dijital çözümler geliştiriyoruz: mükellef portalı (güvenli belge paylaşımı), e-dönüşüm entegrasyonu, online randevu sistemi ve kurumsal web sitesi. Başından sonuna aynı uzmanla, katmansız iletişimle."

const rawLeads = [
  // ── Hukuk Büroları ──────────────────────────────────────────────────────────
  {
    slug: "sahin-hukuk",
    to: "info@sahinhukuk.com.tr",
    type: "hukuk",
    firm: "Şahin Hukuk Bürosu",
    city: "Şişli",
    subject: "Şahin Hukuk için dijital altyapı önerisi — müvekkil portalı · randevu",
    compliment: "Şahin Hukuk Bürosu, Şişli'de ticaret ve sözleşme hukuku alanında güçlü bir müvekkil portföyü oluşturmuş köklü bir büro.",
    opportunity: "Bugün müvekkillerin büyük çoğunluğu bir hukuk bürosunu internet üzerinden araştırıp iletişime geçiyor. Güvenli belge paylaşımı, durum takibi ve online randevu sunan bir altyapı — hem yeni müvekkil kazanımında hem de mevcut ilişkilerde rakipten önde olmayı sağlıyor.",
  },
  {
    slug: "demir-avukatlik",
    to: "info@demiravukatlik.com.tr",
    type: "hukuk",
    firm: "Demir Avukatlık Ortaklığı",
    city: "Kadıköy",
    subject: "Demir Avukatlık için müvekkil portalı önerisi",
    compliment: "Demir Avukatlık Ortaklığı, Kadıköy'de iş hukuku ve miras hukuku alanında tanınan bir avukatlık bürosu.",
    opportunity: "Müvekkillerin belge göndermek veya dava durumunu sormak için telefon beklediği günler geride kalıyor. Güvenli bir dijital portal, büronun iş yükünü azaltırken müvekkil memnuniyetini doğrudan artırıyor.",
  },
  {
    slug: "yildiz-hukuk",
    to: "info@yildizlaw.com.tr",
    type: "hukuk",
    firm: "Yıldız Hukuk",
    city: "Beşiktaş",
    subject: "Yıldız Hukuk için kurumsal web + randevu sistemi önerisi",
    compliment: "Yıldız Hukuk, Beşiktaş'ta kurumsal müvekkillere hizmet veren ve dijital kanalları aktif kullanan bir büro.",
    opportunity: "Kurumsal müvekkiller için bir hukuk bürosunun güvenilirliğini ilk ölçen şey web varlığı. Modern, hızlı ve randevu alabilen bir site — ilk temasta güven tesis ediyor ve görüşme dönüşümlerini artırıyor.",
  },
  {
    slug: "arslan-hukuk",
    to: "info@arslanhukukburosu.com.tr",
    type: "hukuk",
    firm: "Arslan Hukuk Bürosu",
    city: "Levent",
    subject: "Arslan Hukuk için dijital dönüşüm önerisi",
    compliment: "Arslan Hukuk Bürosu, Levent'te finans ve sermaye piyasaları hukukunda uzmanlaşmış prestijli bir büro.",
    opportunity: "Finans hukuku müvekkilleri hem hızı hem de gizliliği bir arada talep ediyor. Şifreli belge paylaşımı ve durum takibi sunan bir müvekkil portalı, büroya rakipten farklı bir profesyonellik algısı katıyor.",
  },
  {
    slug: "erdem-hukuk",
    to: "info@erdemhukuk.av.tr",
    type: "hukuk",
    firm: "Erdem Hukuk Bürosu",
    city: "Nişantaşı",
    subject: "Erdem Hukuk için online randevu + müvekkil portalı",
    compliment: "Erdem Hukuk Bürosu, Nişantaşı'nda aile ve gayrimenkul hukuku alanında müvekkil tabanı oluşturmuş köklü bir büro.",
    opportunity: "Aile hukuku müvekkilleri çoğunlukla hassas bir süreçtedir — sürtünmesiz, dijital bir iletişim kanalı hem müvekkil deneyimini iyileştiriyor hem de büroya zaman kazandırıyor.",
  },
  {
    slug: "gunes-avukatlik",
    to: "info@guneslaw.com.tr",
    type: "hukuk",
    firm: "Güneş Avukatlık",
    city: "Mecidiyeköy",
    subject: "Güneş Avukatlık için dijital çözüm önerisi",
    compliment: "Güneş Avukatlık, Mecidiyeköy'de iş hukuku ve icra alanında aktif bir büro.",
    opportunity: "İcra ve ticaret davalarında müvekkil süreç takibi kritik önem taşıyor. Anlık bildirim ve belge erişimi sunan bir dijital portal, müvekkil güvenini pekiştiriyor ve telefon trafiğini azaltıyor.",
  },
  {
    slug: "koc-hukuk",
    to: "info@kochukukburosu.com.tr",
    type: "hukuk",
    firm: "Koç Hukuk Bürosu",
    city: "Bakırköy",
    subject: "Koç Hukuk Bürosu için müvekkil portalı önerisi",
    compliment: "Koç Hukuk Bürosu, Bakırköy'de ceza ve idare hukuku alanında köklü bir müvekkil portföyü oluşturmuş tanınan bir büro.",
    opportunity: "Ceza davalarında müvekkiller bilgiye anında ulaşmak istiyor. Güvenli bir portal üzerinden belge paylaşımı ve durum güncellemesi — hem müvekkil kaygısını azaltıyor hem de büronun erişilebilirlik algısını güçlendiriyor.",
  },
  {
    slug: "aydin-hukuk",
    to: "info@aydinlaw.com.tr",
    type: "hukuk",
    firm: "Aydın & Aydın Avukatlık",
    city: "Ataşehir",
    subject: "Aydın & Aydın için kurumsal web yenileme önerisi",
    compliment: "Aydın & Aydın Avukatlık, Ataşehir'de şirketler ve vergi hukuku alanında kurumsal müşterilere hizmet veren köklü bir ortaklık bürosu.",
    opportunity: "Kurumsal müvekkiller hizmet sağlayıcılarını artık web üzerinden kıyaslandırıyor. Güçlü bir kurumsal web varlığı ve online randevu altyapısı — büronun ilk değerlendirme aşamasını geçmesini kolaylaştırıyor.",
  },
  {
    slug: "cetin-hukuk",
    to: "info@cetinhukuk.com.tr",
    type: "hukuk",
    firm: "Çetin Hukuk Bürosu",
    city: "Üsküdar",
    subject: "Çetin Hukuk için dijital altyapı önerisi",
    compliment: "Çetin Hukuk Bürosu, Üsküdar'da aile hukuku ve miras davalarında tanınan, müvekkil odaklı bir büro.",
    opportunity: "Miras ve aile hukuku süreçleri uzun soluklu — müvekkil iletişimini dijitalleştirmek hem büroya verimlilik kazandırıyor hem de müvekkilin sürece olan güvenini artırıyor.",
  },
  {
    slug: "polat-hukuk",
    to: "info@polathukukburosu.com.tr",
    type: "hukuk",
    firm: "Polat Hukuk Bürosu",
    city: "Maslak",
    subject: "Polat Hukuk için dijital müvekkil portalı önerisi",
    compliment: "Polat Hukuk Bürosu, Maslak'ta enerji ve altyapı hukuku alanında kurumsal müşterilere hizmet veren prestijli bir büro.",
    opportunity: "Enerji ve altyapı projelerinde hukuki süreç takibi karmaşık ve çok belgelidir. Güvenli bir dijital portal, büronun kurumsal müvekkillerle iletişimini merkezileştiriyor ve hataları azaltıyor.",
  },

  // ── Mali Müşavirlik / SMMM Büroları ─────────────────────────────────────────
  {
    slug: "yilmaz-smmm",
    to: "info@yilmazsmmm.com.tr",
    type: "muhasebe",
    firm: "Yılmaz SMMM Bürosu",
    city: "Şişli",
    subject: "Yılmaz SMMM için mükellef portalı + e-dönüşüm entegrasyonu",
    compliment: "Yılmaz SMMM Bürosu, Şişli'de KOBİ ve ticaret firmaları için muhasebe ve vergi danışmanlığı hizmeti veren köklü bir büro.",
    opportunity: "Muhasebe bürolarının en büyük zaman kaybı belge toplama süreçleri. Mükelleflerin belgelerini güvenle yükleyebildiği, e-dönüşüm çıktılarını takip edebildiği bir dijital portal — hem büronun kapasitesini artırıyor hem de mükellef memnuniyetini yükseltiyor.",
  },
  {
    slug: "ozkan-mm",
    to: "info@ozkanmalimüsavirlik.com.tr",
    type: "muhasebe",
    firm: "Özkan Mali Müşavirlik",
    city: "Ümraniye",
    subject: "Özkan Mali Müşavirlik için dijital altyapı önerisi",
    compliment: "Özkan Mali Müşavirlik, Ümraniye'de imalat ve ticaret sektörüne odaklanan aktif bir mali müşavirlik bürosu.",
    opportunity: "İmalat sektörü mükelleflerin e-fatura, e-irsaliye ve e-dönüşüm süreçleri büyük manuel iş yükü yaratıyor. Bu süreçleri dijital portal üzerinden merkezi yönetmek büronun rekabet avantajı haline geliyor.",
  },
  {
    slug: "bulut-ymm",
    to: "info@bulutymm.com.tr",
    type: "muhasebe",
    firm: "Bulut YMM Bürosu",
    city: "Maslak",
    subject: "Bulut YMM için mükellef portalı ve kurumsal web önerisi",
    compliment: "Bulut YMM Bürosu, Maslak'ta kurumsal ve çok uluslu şirketlere yeminli mali müşavirlik hizmeti veren prestijli bir büro.",
    opportunity: "Kurumsal mükelleflerin YMM bürolarından beklentisi hem uzmanlık hem de kurumsal iletişim altyapısı. Güvenli belge paylaşımı ve anlık raporlama sunan bir platform — büronun kurumsal müşteri tabanını genişletmesine zemin hazırlıyor.",
  },
  {
    slug: "dogan-mm",
    to: "info@doganmalimüsavirlik.com.tr",
    type: "muhasebe",
    firm: "Doğan Mali Müşavirlik",
    city: "Kadıköy",
    subject: "Doğan Mali Müşavirlik için dijital çözüm önerisi",
    compliment: "Doğan Mali Müşavirlik, Kadıköy'de hizmet sektörü ve serbest meslek sahiplerine muhasebe danışmanlığı veren köklü bir büro.",
    opportunity: "Serbest meslek sahibi mükellefler çoğunlukla kendi işleriyle meşguller ve belge takibine zaman bulamıyorlar. Mobil uyumlu, kolay kullanımlı bir mükellef portalı onlar için büyük kolaylık — ve büro için rekabet üstünlüğü.",
  },
  {
    slug: "avci-smmm",
    to: "info@avcismmm.com.tr",
    type: "muhasebe",
    firm: "Avcı SMMM Bürosu",
    city: "Bahçelievler",
    subject: "Avcı SMMM için mükellef portalı önerisi",
    compliment: "Avcı SMMM Bürosu, Bahçelievler'de perakende ve gıda sektörü işletmelerine muhasebe hizmeti veren aktif bir büro.",
    opportunity: "Perakende mükelleflerin aylık belge döngüsü yoğun ve düzenlidir. Portal üzerinden otomatik hatırlatma ve belge yükleme — hem mükellefin işini kolaylaştırıyor hem de büronun iş takibini düzenliyor.",
  },
  {
    slug: "kilic-ymm",
    to: "info@kilicymm.com.tr",
    type: "muhasebe",
    firm: "Kılıç YMM",
    city: "Levent",
    subject: "Kılıç YMM için kurumsal web + mükellef portalı",
    compliment: "Kılıç YMM, Levent'te holding ve çok şirketli yapılara denetim ve tasdik hizmeti veren köklü bir yeminli mali müşavirlik bürosu.",
    opportunity: "Holding yapılarında birden fazla şirkete ait belgeler ve raporlar tek bir çatıda yönetilmek zorunda. Özelleştirilmiş bir mükellef portalı — hem mükellefin hem de büronun iş akışını ciddi ölçüde sadeleştiriyor.",
  },
  {
    slug: "guler-smmm",
    to: "info@gulersmmm.com.tr",
    type: "muhasebe",
    firm: "Güler SMMM Bürosu",
    city: "Esenyurt",
    subject: "Güler SMMM için dijital altyapı önerisi — portal · web · randevu",
    compliment: "Güler SMMM Bürosu, Esenyurt'ta inşaat ve taşımacılık sektörüne odaklanan aktif bir mali müşavirlik bürosu.",
    opportunity: "İnşaat sektörü mükelleflerin belge yükü sektörün en yoğunlarından biri. Dijital portal ve online randevu sistemi büroya hem zaman hem de mükellef bağlılığı kazandırıyor.",
  },
  {
    slug: "aksoy-mm",
    to: "info@aksoymalimüsavirlik.com.tr",
    type: "muhasebe",
    firm: "Aksoy Mali Müşavirlik",
    city: "Beylikdüzü",
    subject: "Aksoy Mali Müşavirlik için mükellef portalı önerisi",
    compliment: "Aksoy Mali Müşavirlik, Beylikdüzü'nde KOBİ ve e-ticaret işletmelerine muhasebe danışmanlığı veren büyüyen bir büro.",
    opportunity: "E-ticaret işletmeleri için muhasebe süreci çok kanallı ve hızlı döngülüdür. Bu mükelleflerin ihtiyacını karşılayan otomatize bir portal — büronun e-ticaret segmentinde öne çıkmasını sağlıyor.",
  },
  {
    slug: "tekin-smmm",
    to: "info@tekinsmmm.com.tr",
    type: "muhasebe",
    firm: "Tekin SMMM Bürosu",
    city: "Bağcılar",
    subject: "Tekin SMMM için dijital dönüşüm önerisi",
    compliment: "Tekin SMMM Bürosu, Bağcılar'da tekstil ve üretim sektörü işletmelerine muhasebe ve vergi danışmanlığı veren köklü bir büro.",
    opportunity: "Tekstil işletmelerinin muhasebe iş yükü sezonluk zirveler yaratıyor. Mükellef belge takibini dijitalleştirmek — yoğun dönemlerde büronun kapasitesini artırmadan iş hacmini büyütmesine olanak tanıyor.",
  },
  {
    slug: "celik-mm",
    to: "info@celikmm.com.tr",
    type: "muhasebe",
    firm: "Çelik Mali Müşavirlik",
    city: "Ataşehir",
    subject: "Çelik Mali Müşavirlik için kurumsal web + mükellef portalı",
    compliment: "Çelik Mali Müşavirlik, Ataşehir'de teknoloji girişimleri ve startup'lara muhasebe danışmanlığı veren modern bir büro.",
    opportunity: "Startup mükellefleri dijital süreçlere alışkın ve beklentileri yüksek — e-posta zinciri yerine portal, yazışma yerine anlık bildirim. Bu beklentiyi karşılayan bir büro, teknoloji segmentinde tercih edilen partner haline geliyor.",
  },
  {
    slug: "yucel-ymm",
    to: "info@yucelymm.com.tr",
    type: "muhasebe",
    firm: "Yücel YMM Bürosu",
    city: "Beşiktaş",
    subject: "Yücel YMM için dijital altyapı önerisi",
    compliment: "Yücel YMM Bürosu, Beşiktaş'ta finans ve sigorta sektörü şirketlerine denetim ve tasdik hizmeti veren prestijli bir büro.",
    opportunity: "Finans sektörü mükelleflerin belge ve rapor döngüsü hız ve gizlilik gerektiriyor. Şifreli belge paylaşımı ve gerçek zamanlı raporlama sunan bir platform — büronun finans segmentindeki güvenilirlik algısını pekiştiriyor.",
  },
  {
    slug: "kaplan-mm",
    to: "info@kaplanmalimüsavirlik.com.tr",
    type: "muhasebe",
    firm: "Kaplan Mali Müşavirlik",
    city: "Taksim",
    subject: "Kaplan Mali Müşavirlik için mükellef portalı + web önerisi",
    compliment: "Kaplan Mali Müşavirlik, Taksim'de otelcilik ve turizm sektörüne muhasebe danışmanlığı veren aktif bir büro.",
    opportunity: "Turizm işletmelerinin muhasebe döngüsü sezonluk ve yoğundur. Dijital belge yönetimi ve mükellef portalı — hem büronun hem de işletmenin sezon yükünü hafifletiyor.",
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
  const solution = l.type === "hukuk" ? SOLUTION_HUKUK : SOLUTION_MUHASEBE
  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${l.compliment}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${l.opportunity}</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${solution}</p><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">Bürona özel nasıl bir çözümün uygun olduğunu kısa bir görüşmede konuşalım — hiçbir yükümlülük yok, somut bir demo sunabiliriz.</p><a href="${ctaUrl(l.slug)}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Ücretsiz Görüşme Ayarlayalım</a><a href="${waUrl(l.slug, l.firm)}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

function stripTags(s) { return s.replace(/<[^>]+>/g, "") }

function buildText(l) {
  const solution = l.type === "hukuk" ? SOLUTION_HUKUK : SOLUTION_MUHASEBE
  return [
    "Merhaba,",
    l.compliment,
    l.opportunity,
    solution,
    `Bürona özel nasıl bir çözümün uygun olduğunu kısa bir görüşmede konuşalım.\n${ctaUrl(l.slug)}\nWhatsApp: ${waUrl(l.slug, l.firm)}\nYa da bu maile doğrudan yanıt verin.`,
    "Solman Digital — İstanbul Yazılım Ofisi · solmandigital.com.tr · 0543 967 52 50\nMail listesinden çıkmak istiyorsanız bize bildirin: info@solmandigital.com.tr",
  ].join("\n\n")
}

const messages = leads.map((l) => ({
  to: l.to,
  subject: l.subject,
  html: buildHtml(l),
  text: buildText(l),
}))

writeFileSync(new URL("./leads-batch-19.json", import.meta.url), JSON.stringify(messages, null, 2), "utf8")
console.log(`${messages.length} mail üretildi → scripts/leads-batch-19.json`)
for (const m of messages) console.log(`- ${m.to} | ${m.subject}`)
