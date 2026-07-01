// Batch 27 — İstanbul GÜZELLİK / KUAFÖR / ESTETİK (TR)
// Ürün: Müşteri Yanıt Otomasyonu (WhatsApp 7/24 otomatik cevap + randevu/fiyat sorusu).
// Kaynak: guzellik-leads-raw.json (Google Maps export: firm/district/website).
// Veri gerekçesi: KP'de "kuaför/berber/güzellik salonu randevu programı" bid TL153-154
//   → alıcı EN sıcak sektör. Landing: /musteri-yanit-sistemi.
// Kullanım: node scripts/build-mails-batch-27.mjs
import { readFileSync, writeFileSync } from "node:fs"

const rd = (f) => JSON.parse(readFileSync(new URL(f, import.meta.url), "utf8").replace(/^﻿/, ""))

const CAMPAIGN = "musteri-yaniti-guzellik-1"

const found = rd("./guzellik-leads-raw.json")
const suppress = new Set(rd("./suppress-list.json").map((e) => e.toLowerCase()))
const sent = new Set(rd("./sent-emails.json").map((e) => e.toLowerCase()))

const slugify = (s) =>
  (s || "").toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40)

// Firma adını sadeleştir: kurumsal ek + İngilizce kuyruk + "| ..." kısmını at
function cleanName(firm) {
  return (firm || "")
    .replace(/\s*[|–-]\s*(cosmetic|beauty|clinic|aesthetic|hair|istanbul|turkey).*$/i, "")
    .replace(/\s+(ltd\.?|şti\.?|a\.?ş\.?)\b.*$/i, "")
    .trim()
}

function buildHtml(c, slug) {
  const utm = `utm_source=brevo&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
  const ctaUrl = `https://solmandigital.com.tr/musteri-yanit-sistemi?${utm}`
  const waText = encodeURIComponent(`Merhaba, ${c.wa} için e-postanızı aldım, WhatsApp/telefon müşteri yanıt otomasyonu hakkında görüşmek istiyorum. (Ref: ${slug})`)
  const waUrl = `https://wa.me/905439675250?text=${waText}`
  const benefit = (txt) =>
    `<p style="margin:0 0 10px;font-size:15px;color:#333;line-height:1.6"><span style="color:#9b1c1c;font-weight:700">↗</span>&nbsp; ${txt}</p>`

  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 14px;font-size:22px;font-weight:800;color:#111">${c.h1}</h1><p style="margin:0 0 18px;font-size:15px;color:#555;line-height:1.7">${c.hitap}, ${c.intro}</p><div style="margin:0 0 22px;padding:18px 20px;background:#faf7f7;border-left:3px solid #9b1c1c;border-radius:6px">${c.benefits.map(benefit).join("")}</div><div style="margin:0 0 22px;border:1px solid #e6e0e0;border-radius:8px;overflow:hidden"><div style="background:#0d0d0d;padding:14px 20px"><p style="margin:0;color:#fff;font-size:15px;font-weight:700">Müşteri Yanıt Otomasyonu — ₺15.000+KDV'dan</p></div><div style="padding:16px 20px"><p style="margin:0 0 7px;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;<strong>1 haftada</strong> teslim, canlıya alınır</p><p style="margin:0 0 7px;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;Sabit fiyat — saat bazlı fatura yok, sözleşme + e-fatura</p><p style="margin:0 0 7px;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;<strong>Sistem ve numara size ait</strong> — aylık bağımlılık yok (yap-kur-çık)</p><p style="margin:0;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;Telefon karşılama / çoklu kanal: ₺25.000'dan</p></div></div><p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.7">Hazır bir araç değil — salonunuza özel kurulur, başından sonuna aynı uzmanla çalışırsınız. Kapsam, örnek akış ve size özel net fiyat sayfada:</p><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none">Paketi ve Fiyatı Gör →</a><p style="margin:18px 0 0;font-size:13px;color:#999;line-height:1.6">Hızlı soru için <a href="${waUrl}" style="color:#9b1c1c">WhatsApp'tan yazabilir</a> ya da bu maile yanıt verebilirsiniz — doğrudan uzmana ulaşırsınız.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

const out = []
const seen = new Set()
for (const lead of found) {
  const email = (lead.to || lead.email || "").toLowerCase()
  if (!email) continue
  if (suppress.has(email)) continue
  if (sent.has(email)) continue
  if (seen.has(email)) continue
  seen.add(email)

  const name = cleanName(lead.firm || lead.title)
  const district = lead.district ? ` (${lead.district})` : ""
  const c = {
    hitap: name ? `${name}${district} için` : "Salonunuza",
    h1: `Müşteri "fiyat ne, müsait misiniz" sorusunu 7/24 randevuya çeviren WhatsApp asistanı — <span style="color:#9b1c1c">₺15.000+KDV'dan.</span>`,
    intro: "WhatsApp ve telefonunuza gelen sık soruları otomatik yanıtlayan, müşteriyi randevuya taşıyan bir sistem kuruyoruz:",
    benefits: [
      `<strong>7/24 otomatik cevap</strong> — "fiyat ne kadar, bugün müsait misiniz, neredesiniz" sorularına siz işteyken/uyurken bile anında yanıt; müşteriyi randevuya yazar.`,
      `<strong>Kaçan mesaj = kaçan müşteri</strong> — yoğunken veya kapalıyken gelen WhatsApp/çağrı yanıtsız kalmaz, rakibe gitmez.`,
      `<strong>Sosyal medya + reklam dönüşü</strong> — Instagram/Google'dan gelen ilgiyi randevuya çevirir; aynı bütçeden daha fazla dolu koltuk.`,
    ],
    wa: name || "salonumuz",
  }
  const slug = slugify(lead.slug || name || email)
  out.push({
    to: lead.to || lead.email,
    subject: `${name || "Salonunuz"} için 7/24 WhatsApp randevu asistanı — ₺15.000+KDV, 1 haftada`,
    html: buildHtml(c, slug),
  })
}

writeFileSync(new URL("./leads-batch-27.json", import.meta.url), JSON.stringify(out, null, 2), "utf8")
console.log(`${out.length} mail üretildi → scripts/leads-batch-27.json (kampanya: ${CAMPAIGN})`)
for (const m of out) console.log(`  ${m.to} — ${m.subject.slice(0, 60)}`)
