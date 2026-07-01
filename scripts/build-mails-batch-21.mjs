// Batch 21 — İstanbul yerel/butik diş klinikleri (TR)
// Fayda odaklı şablon: klinik ne KAZANIR — dolu randevu takvimi, kayan reklam
// bütçesinin geri kazanımı, ziyaretçinin randevuya dönmesi.
// Kaynak: scripts/found-emails.json (find-emails.mjs çıktısı)
// Kullanım: node scripts/build-mails-batch-21.mjs

import { readFileSync, writeFileSync } from "node:fs"

const rd = (f) => JSON.parse(readFileSync(new URL(f, import.meta.url), "utf8").replace(/^﻿/, ""))

const CAMPAIGN = "dis-klinik-1"

// found-emails.json'dan al, kişisel/yanlış-domain adresleri ele
const EXCLUDE = new Set([
  "atamozlu@gmail.com",        // Softdent — kişisel gmail, kurumsal değil
  "mergun@dentista.com.tr",    // Özel SİSTEM — domain eşleşmiyor (yanlış kazıma)
])

const found = rd("./found-emails.json")
const suppress = new Set(rd("./suppress-list.json").map((e) => e.toLowerCase()))

const slugify = (s) =>
  s.toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40)

function buildHtml(title, slug) {
  const utm = `utm_source=brevo&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
  const ctaUrl = `https://solmandigital.com.tr/ucretsiz-analiz?${utm}`
  const waText = encodeURIComponent(
    `Merhaba, ${title} için e-postanızı aldım, dijital çözüm hakkında görüşmek istiyorum. (Ref: ${slug})`
  )
  const waUrl = `https://wa.me/905439675250?text=${waText}`
  const benefit = (txt) =>
    `<p style="margin:0 0 10px;font-size:15px;color:#333;line-height:1.6"><span style="color:#9b1c1c;font-weight:700">↗</span>&nbsp; ${txt}</p>`

  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${title}'ne, dijital tarafta somut bir fayda sunmak için yazıyoruz. Diş kliniklerinde hasta yolculuğunun büyük kısmı artık Google aramasıyla ve telefonun ekranında başlıyor — bu yolculuğu randevuya çeviren bir sistem, takviminizi doğrudan etkiliyor.</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">Solman Digital olarak diş kliniklerine yönelik geliştirdiğimiz çözümün kliniğe kazandırdıkları:</p><div style="margin:0 0 24px;padding:18px 20px;background:#faf7f7;border-left:3px solid #9b1c1c;border-radius:6px">${benefit("<strong>Dolu randevu takvimi</strong> — mobilde tek dokunuşla çalışan online randevu ve danışma formu, telefonu beklemeden randevu alır.")}${benefit("<strong>Reklam bütçenizin geri dönüşü</strong> — Google Ads'ten gelen ziyaretçiyi randevuya çeviren landing page, aynı bütçeden daha fazla hasta demek.")}${benefit("<strong>Güçlü ilk izlenim</strong> — kliniğinizin itibarını yansıtan, hızlı açılan kurumsal web sitesi; ziyaretçi rakibe değil size güvenir.")}</div><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">Başından sonuna aynı uzmanla, katmansız iletişimle çalışırsınız. Kliniğinize özel hangi adımın en çok fayda sağlayacağını kısa bir görüşmede konuşalım — hiçbir yükümlülük yok, somut örnekler gösterebiliriz.</p><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Ücretsiz Görüşme Ayarlayalım</a><a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

const out = []
const seen = new Set()
for (const lead of found) {
  const email = lead.email.toLowerCase()
  if (EXCLUDE.has(email)) continue
  if (suppress.has(email)) continue
  if (seen.has(email)) continue
  seen.add(email)

  const slug = slugify(lead.title)
  out.push({
    to: lead.email,
    subject: `Randevu takviminizi dolduran dijital sistem — ${lead.title}`,
    html: buildHtml(lead.title, slug),
  })
}

writeFileSync(
  new URL("./leads-batch-21.json", import.meta.url),
  JSON.stringify(out, null, 2),
  "utf8"
)
console.log(`${out.length} mail üretildi → scripts/leads-batch-21.json`)
for (const m of out) console.log(`  ${m.to}`)
