// Batch 26 — İstanbul sağlık & estetik + psikolog + kurum (TR)
// AI otomasyon, fiyat-mailde şablon. Kayıt TİPİNE göre mesaj uyarlanır:
//   klinik  → hasta / randevu
//   psikolog → danışan / seans / ön görüşme
//   kurum   → gelen talep / ziyaretçi sorusu (dernek, firma, görüntüleme)
// Kaynak: scripts/saglik-batch26-raw.json (web sitelerinden kazınmış + MX-doğrulanmış)
// Kullanım: node scripts/build-mails-batch-26.mjs

import { readFileSync, writeFileSync } from "node:fs"

const rd = (f) => JSON.parse(readFileSync(new URL(f, import.meta.url), "utf8").replace(/^﻿/, ""))

const CAMPAIGN = "ai-saglik-istanbul-1"

const found = rd("./saglik-batch26-raw.json")
const suppress = new Set(rd("./suppress-list.json").map((e) => e.toLowerCase()))
const sent = new Set(rd("./sent-emails.json").map((e) => e.toLowerCase()))

const slugify = (s) =>
  s.toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u")
    .replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40)

// Kişi-isimli başlık ("Dr./Prof./Uzman Psikolog X") → nötr hitap
const PERSON = /\b(dr\.?|prof\.?|op\.?|uzm\.?|uzman|doç\.?|psikolog|hekim|danışman|dt\.?)\b/i

// Kayıt tipini başlıktan tespit et
function detectType(title) {
  const t = title.toLowerCase()
  if (/psikolog|terapi|danışman|ruh sağlığı|psikoterap/.test(t)) return "psikolog"
  if (/derne[kğ]|ltd|şti|ticaret|biyoteknoloji|görüntüleme|röntgen|ihracat|import|export/.test(t)) return "kurum"
  return "klinik"
}

// İşletme adını mail/subject için kısalt: kurumsal ek + tire-sonrası kişi adını at
function cleanName(title) {
  return title
    .replace(/\s+(ltd\.?|şti\.?|a\.?ş\.?|export|import|dış ticaret|ve medikal estetik|biyoteknoloji)\b.*$/i, "")
    .replace(/\s*[-–]\s*(dr\.?|prof\.?|op\.?|uzm\.?|dt\.?)\b.*$/i, "")  // "- Dr. X" kuyruğunu at
    .replace(/\s*\|.*$/, "")
    .trim()
}

// Tipe göre metin paketi
function copyFor(type, title) {
  const neutral = PERSON.test(title)
  const name = neutral ? null : cleanName(title)

  if (type === "psikolog") {
    return {
      hitap: name ? `${name}'ne` : "Uygulamanıza",
      h1: `Danışan sorusunu seansa çeviren bir AI sistemi — <span style="color:#9b1c1c">₺15.000'dan başlar.</span>`,
      intro: "GPT-4o ve Claude ile danışmanlığınıza özel kurduğumuz yapay zeka asistanı şunları yapar:",
      box: "AI Ön Görüşme Asistanı — ₺15.000'dan başlar",
      benefits: [
        `<strong>7/24 yanıt + ön görüşme</strong> — "seans nasıl ilerliyor, uygun saat var mı" sorularına anında yanıt verir, danışanı görüşme formuna taşır.`,
        `<strong>Reklam geri dönüşü</strong> — Google'dan gelen ziyaretçiyi ön görüşmeye çevirir; aynı bütçeden daha fazla danışan.`,
        `<strong>İçerik otomasyonu</strong> — blog ve sosyal medya içeriğini AI üretir, aramada görünür kalırsınız.`,
      ],
      subjName: name || "Danışmanlığınız",
      subj: "için 7/24 AI ön görüşme asistanı",
      wa: name || "danışmanlığımız",
    }
  }
  if (type === "kurum") {
    return {
      hitap: name ? `${name} için` : "Kurumunuza",
      h1: `Gelen talebi yanıta çeviren bir AI sistemi — <span style="color:#9b1c1c">₺15.000'dan başlar.</span>`,
      intro: "GPT-4o ve Claude ile kurumunuza özel kurduğumuz yapay zeka asistanı şunları yapar:",
      box: "AI Talep Asistanı — ₺15.000'dan başlar",
      benefits: [
        `<strong>7/24 yanıt</strong> — ziyaretçi ve müşteri sorularına gece bile anında yanıt verir, ilgili talebi doğru kişiye yönlendirir.`,
        `<strong>Reklam geri dönüşü</strong> — Google'dan gelen ziyaretçiyi talebe/iletişime çevirir; aynı bütçeden daha fazla dönüş.`,
        `<strong>İçerik otomasyonu</strong> — web ve sosyal medya içeriğini AI üretir, aramada görünür kalırsınız.`,
      ],
      subjName: name || "Kurumunuz",
      subj: "için 7/24 AI talep asistanı",
      wa: name || "kurumumuz",
    }
  }
  // klinik (varsayılan)
  return {
    hitap: name ? `${name}'ne` : "Kliniğinize",
    h1: `Hasta sorusunu randevuya çeviren bir AI sistemi — <span style="color:#9b1c1c">₺15.000'dan başlar.</span>`,
    intro: "GPT-4o ve Claude ile kliniğinize özel kurduğumuz yapay zeka asistanı şunları yapar:",
    box: "AI Randevu Asistanı — ₺15.000'dan başlar",
    benefits: [
      `<strong>7/24 yanıt + randevu</strong> — "fiyat ne kadar, müsait misiniz" sorularına gece bile anında yanıt verir, hastayı randevu formuna taşır.`,
      `<strong>Reklam geri dönüşü</strong> — Google'dan gelen ziyaretçiyi randevuya çevirir; aynı bütçeden daha fazla hasta.`,
      `<strong>İçerik otomasyonu</strong> — blog ve sosyal medya içeriğini AI üretir, klinik aramada görünür kalır.`,
    ],
    subjName: name || "Kliniğiniz",
    subj: "için 7/24 AI randevu asistanı",
    wa: name || "kliniğimiz",
  }
}

function buildHtml(c, slug) {
  const utm = `utm_source=brevo&utm_medium=email&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
  const ctaUrl = `https://solmandigital.com.tr/ai-otomasyon-hizmeti?${utm}`
  const waText = encodeURIComponent(`Merhaba, ${c.wa} için e-postanızı aldım, AI otomasyon hakkında görüşmek istiyorum. (Ref: ${slug})`)
  const waUrl = `https://wa.me/905439675250?text=${waText}`
  const benefit = (txt) =>
    `<p style="margin:0 0 10px;font-size:15px;color:#333;line-height:1.6"><span style="color:#9b1c1c;font-weight:700">↗</span>&nbsp; ${txt}</p>`

  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 14px;font-size:22px;font-weight:800;color:#111">${c.h1}</h1><p style="margin:0 0 18px;font-size:15px;color:#555;line-height:1.7">${c.hitap}, ${c.intro}</p><div style="margin:0 0 22px;padding:18px 20px;background:#faf7f7;border-left:3px solid #9b1c1c;border-radius:6px">${c.benefits.map(benefit).join("")}</div><div style="margin:0 0 22px;border:1px solid #e6e0e0;border-radius:8px;overflow:hidden"><div style="background:#0d0d0d;padding:14px 20px"><p style="margin:0;color:#fff;font-size:15px;font-weight:700">${c.box}</p></div><div style="padding:16px 20px"><p style="margin:0 0 7px;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;<strong>1 haftada</strong> teslim, canlıya alınır</p><p style="margin:0 0 7px;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;Sabit fiyat — saat bazlı fatura yok, sözleşme + e-fatura</p><p style="margin:0 0 7px;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;<strong>Kaynak kodu size ait</strong> — kilitli platforma bağımlı kalmazsınız</p><p style="margin:0;font-size:14px;color:#444;line-height:1.6">✓ &nbsp;Çoklu süreç / CRM entegrasyonu: ₺25.000'dan</p></div></div><p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.7">Hazır bir araç değil — işinize özel kurulur, başından sonuna aynı uzmanla çalışırsınız. Kapsam, örnek çıktılar ve size özel net fiyat sayfada:</p><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none">Paketi ve Fiyatı Gör →</a><p style="margin:18px 0 0;font-size:13px;color:#999;line-height:1.6">Hızlı soru için <a href="${waUrl}" style="color:#9b1c1c">WhatsApp'tan yazabilir</a> ya da bu maile yanıt verebilirsiniz — doğrudan uzmana ulaşırsınız.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

const out = []
const seen = new Set()
const typeCount = {}
for (const lead of found) {
  const email = lead.email.toLowerCase()
  if (suppress.has(email)) continue
  if (sent.has(email)) continue
  if (seen.has(email)) continue
  seen.add(email)

  const type = detectType(lead.title)
  typeCount[type] = (typeCount[type] || 0) + 1
  const c = copyFor(type, lead.title)
  const slug = slugify(lead.title)
  out.push({
    to: lead.email,
    subject: `${c.subjName} ${c.subj} — ₺15.000'dan, 1 haftada`,
    html: buildHtml(c, slug),
  })
}

writeFileSync(new URL("./leads-batch-26.json", import.meta.url), JSON.stringify(out, null, 2), "utf8")
console.log(`${out.length} mail üretildi → scripts/leads-batch-26.json`)
console.log(`tip dağılımı:`, JSON.stringify(typeCount))
for (const m of out) console.log(`  ${m.to} — ${m.subject.slice(0, 55)}`)
