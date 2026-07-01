// Apify "crawler-google-places" çıktısını temizler → otel raw lead listesi üretir.
// Bu actor e-mail TOPLAMAZ, sadece website verir → çıktı find-emails.mjs'e beslenir.
// Alanlar: title, totalScore, reviewsCount, street, city, website, phone, categoryName
// Kullanım: node scripts/process-apify-otel.mjs <dataset.json>
//   (argümansız: Downloads'taki en yeni crawler-google-places dataset'i bulur)

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

let datasetPath = process.argv[2]
if (!datasetPath) {
  const dl = join(homedir(), "Downloads")
  const cands = readdirSync(dl)
    .filter((f) => /crawler-google-places.*\.json$/i.test(f))
    .map((f) => ({ f, t: statSync(join(dl, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t)
  if (!cands.length) {
    console.error("Downloads'ta crawler-google-places dataset bulunamadı. Yol ver.")
    process.exit(1)
  }
  datasetPath = join(dl, cands[0].f)
  console.log(`Otomatik bulundu: ${datasetPath}\n`)
}

const rd = (f) => JSON.parse(readFileSync(f, "utf8").replace(/^﻿/, ""))
const raw = rd(datasetPath)

// Zincir oteller — "Booking komisyonundan kaç" argümanı geçersiz
const CHAIN = /accor|hilton|hyatt|marriott|\bihg\b|radisson|wyndham|ramada|holiday\s?inn|mgallery|sheraton|movenpick|swissotel|novotel|\bibis\b|doubletree|crowne|mercure/i

const domain = (url) =>
  url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].toLowerCase()

const seen = new Set()
const leads = []
let chain = 0, noSite = 0, dup = 0

for (const e of raw) {
  const title = (e.title || "").trim()
  const site = (e.website || "").trim()
  if (!title) continue
  if (!site) { noSite++; continue }
  if (CHAIN.test(title) || CHAIN.test(site)) { chain++; continue }
  const dom = domain(site)
  if (seen.has(dom)) { dup++; continue }
  seen.add(dom)

  leads.push({
    title,
    website: site,
    city: e.city || "İstanbul",
    district: ["Kadıköy","Moda","Üsküdar","Ataşehir","Acıbadem","Bağdat","Bostancı","Maltepe","Kartal","Pendik","Beyoğlu","Taksim","Sultanahmet","Şişli","Beşiktaş","Sarıyer"].find((d) => (e.street || "").includes(d) || (e.city || "").includes(d)) || "İstanbul",
    country: "TR",
    sector: "butik otel",
    // find-emails.mjs bunları taşımaz ama referans için tutuyoruz:
    _rating: e.totalScore || 0,
    _reviews: e.reviewsCount || 0,
    _street: e.street || "",
  })
}

leads.sort((a, b) => (b._rating - a._rating) || (b._reviews - a._reviews))

console.log(`\n✓ ${leads.length} benzersiz otel (toplam ${raw.length} kayıt)`)
console.log(`  Elenen → zincir: ${chain} · website yok: ${noSite} · domain dupe: ${dup}\n`)
leads.forEach((l, i) =>
  console.log(`  [${i + 1}] ${(l._rating ? "★" + l._rating : "").padEnd(6)} ${(l._reviews ? "(" + l._reviews + ")" : "").padEnd(8)} ${l.title.slice(0, 40).padEnd(42)} ${domain(l.website)}`)
)

writeFileSync("scripts/otel-leads-raw.json", JSON.stringify(leads, null, 2), "utf8")
console.log(`\n→ scripts/otel-leads-raw.json (${leads.length} lead) — sıradaki: node scripts/find-emails.mjs scripts/otel-leads-raw.json ${leads.length}`)
