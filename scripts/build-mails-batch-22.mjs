// Batch 22 — İstanbul bağımsız butik oteller (TR)
// Fayda odaklı açı: DİREKT REZERVASYON — Booking/OTA komisyonundan kaçış.
// Kaynak: scripts/found-emails.json (find-emails.mjs çıktısı, Apify places → website)
// Kullanım: node scripts/build-mails-batch-22.mjs

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const rd = (f) => JSON.parse(readFileSync(new URL(f, import.meta.url), "utf8").replace(/^﻿/, ""))
const SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url))

// Tüm önceki batch'lerin gönderilmiş adreslerini topla (çakışma önleme)
const sent = new Set()
for (const f of readdirSync(SCRIPTS_DIR).filter((f) => /^leads-batch-\d+\.json$/.test(f))) {
  try {
    for (const m of rd(`./${f}`)) if (m.to) sent.add(m.to.toLowerCase())
  } catch {}
}

const CAMPAIGN = "otel-istanbul-1"

// Kazıma artifaktları / placeholder — gerçek adres değil
const EXCLUDE = new Set([
  "katalog_2022-11-07@10-53-29-954.pdf", // Gezi Hotel — PDF dosya adı
  "mymail@mailservice.com",              // Berjer — placeholder
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
    `Merhaba, ${title} için e-postanızı aldım, direkt rezervasyon sistemi hakkında görüşmek istiyorum. (Ref: ${slug})`
  )
  const waUrl = `https://wa.me/905439675250?text=${waText}`
  const benefit = (txt) =>
    `<p style="margin:0 0 10px;font-size:15px;color:#333;line-height:1.6"><span style="color:#9b1c1c;font-weight:700">↗</span>&nbsp; ${txt}</p>`

  return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:32px 16px"><div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:32px 40px"><p style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></p></div><div style="background:#fff;padding:40px"><h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Merhaba,</h1><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">${title} için yazıyoruz. Butik otellerin rezervasyonlarının büyük kısmı bugün Booking, Expedia gibi platformlardan geliyor — ve bu platformlar her rezervasyondan %15–20 komisyon alıyor. Misafir zaten otelinizi beğenmişken, bu komisyonun bir kısmını kendi kanalınıza çevirmek doğrudan kâra dönüşüyor.</p><p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7">Solman Digital olarak otellere yönelik geliştirdiğimiz çözümün kazandırdıkları:</p><div style="margin:0 0 24px;padding:18px 20px;background:#faf7f7;border-left:3px solid #9b1c1c;border-radius:6px">${benefit("<strong>Komisyonsuz direkt rezervasyon</strong> — kendi sitenizden çalışan rezervasyon motoru; aynı misafir, aracıya komisyon ödemeden size rezervasyon yapar.")}${benefit("<strong>Daha yüksek dönüşüm</strong> — mobilde hızlı açılan, fiyat ve müsaitliği net gösteren sayfa, bakan ziyaretçiyi rezervasyona çevirir.")}${benefit("<strong>Güçlü ilk izlenim</strong> — otelinizin atmosferini yansıtan, Google'da iyi konumlanan kurumsal site; misafir OTA'ya değil doğrudan size güvenir.")}</div><p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7">Başından sonuna aynı uzmanla, katmansız iletişimle çalışırsınız. Otelinize özel hangi adımın en çok fayda sağlayacağını kısa bir görüşmede konuşalım — hiçbir yükümlülük yok, somut örnekler gösterebiliriz.</p><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">Ücretsiz Görüşme Ayarlayalım</a><a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;margin:0 0 8px 0">WhatsApp'tan Yazın</a><p style="margin:24px 0 0;font-size:14px;color:#888;line-height:1.6">Dilerseniz bu maile yanıt vererek de ulaşabilirsiniz — doğrudan uzmana yazıyorsunuz.</p></div><div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:24px 40px;border-top:1px solid #e0e0e0"><p style="margin:0 0 8px;font-size:12px;color:#aaa;line-height:1.6">Solman Digital — İstanbul Yazılım Ofisi · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · 0543 967 52 50</p><p style="margin:0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı iletişim adresinize gönderdik. Mail listesinden çıkmak istiyorsanız <a href="mailto:info@solmandigital.com.tr?subject=Liste%20%C3%A7%C4%B1k%C4%B1%C5%9F%C4%B1" style="color:#9b1c1c">bize bildirin</a>.</p></div></div>`
}

const out = []
const seen = new Set()
for (const lead of found) {
  const email = lead.email.toLowerCase()
  if (EXCLUDE.has(email)) continue
  if (suppress.has(email)) continue
  if (sent.has(email)) continue
  if (seen.has(email)) continue
  seen.add(email)

  const slug = slugify(lead.title)
  out.push({
    to: lead.email,
    subject: `Booking komisyonsuz direkt rezervasyon — ${lead.title}`,
    html: buildHtml(lead.title, slug),
  })
}

writeFileSync(
  new URL("./leads-batch-22.json", import.meta.url),
  JSON.stringify(out, null, 2),
  "utf8"
)
console.log(`${out.length} mail üretildi → scripts/leads-batch-22.json`)
for (const m of out) console.log(`  ${m.to}`)
