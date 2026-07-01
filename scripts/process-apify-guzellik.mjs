// Apify Google Maps çıktısını temizler → batch-ready leads üretir
import { readFileSync, writeFileSync } from "node:fs"

const raw = JSON.parse(readFileSync(
  "C:/Users/90534/Downloads/dataset_google-maps-lead-generator_2026-06-12_15-52-14-517.json",
  "utf8"
))

// Suppress listesi
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8"))

// Daha önce gönderilmiş tüm emailleri topla
import { readdirSync } from "node:fs"
const sentEmails = new Set(suppress)
for (const f of readdirSync("scripts").filter(f => f.match(/^leads-batch-\d+\.json$/))) {
  try {
    const batch = JSON.parse(readFileSync(`scripts/${f}`, "utf8"))
    batch.forEach(m => sentEmails.add(m.to.toLowerCase()))
  } catch {}
}

function cleanEmail(e) {
  if (!e) return null
  e = e.trim().toLowerCase()
  // "hi@estesie.comphone" gibi artifact'ları temizle
  e = e.replace(/phone$/, "").replace(/tel$/, "")
  // Rotasyonlu encoding (ROT13 gibi) — atla
  if (e.match(/[^a-z0-9@._+-]/)) return null
  // Geçerli format kontrolü
  if (!e.match(/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/)) return null
  return e
}

function bestEmail(entry) {
  const candidates = [entry.email, ...(entry.emails || [])]
    .map(cleanEmail)
    .filter(Boolean)
    .filter(e => !e.includes("hotmail") && !e.includes("yahoo") && !e.includes("outlook") && !e.includes("live."))

  // Kurumsal email tercih sırası
  const preferred = ["info@", "iletisim@", "contact@", "hello@", "hi@", "destek@"]
  for (const prefix of preferred) {
    const match = candidates.find(e => e.startsWith(prefix))
    if (match) return match
  }
  // Gmail'i en son seç
  const nonGmail = candidates.filter(e => !e.includes("gmail"))
  if (nonGmail.length) return nonGmail[0]
  return candidates[0] || null
}

function extractDistrict(address) {
  if (!address) return "İstanbul"
  const districts = [
    "Kadıköy","Şişli","Beşiktaş","Beyoğlu","Fatih","Ataşehir","Üsküdar",
    "Bakırköy","Nişantaşı","Levent","Maslak","Mecidiyeköy","Taksim",
    "Gayrettepe","Maltepe","Pendik","Avcılar","Küçükçekmece","Beylikdüzü",
    "Başakşehir","Bağcılar","Bahçelievler","Esenyurt","Sultangazi","Tuzla",
    "Kartal","Ümraniye","Sarıyer","Zeytinburnu","Eyüpsultan"
  ]
  for (const d of districts) {
    if (address.includes(d)) return d
  }
  return "İstanbul"
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 40)
}

// İşle
const seen = new Set()
const leads = []

for (const entry of raw) {
  const email = bestEmail(entry)
  if (!email) continue
  if (sentEmails.has(email)) continue
  if (seen.has(email)) continue
  seen.add(email)

  const name = entry.name?.trim() || ""
  if (!name) continue

  // Çok büyük zincir klinikleri atla (uluslararası hedef değil)
  const skipWords = ["rhinoplasty turkey", "cosmetic turkey", "best clinic istanbul", "international clinics"]
  if (skipWords.some(w => name.toLowerCase().includes(w))) continue

  const district = extractDistrict(entry.address || "")
  const rating = entry.rating || 0
  const reviews = entry.reviewCount || 0

  leads.push({
    slug: slugify(name),
    to: email,
    firm: name,
    district,
    rating,
    reviews,
    website: entry.website || "",
    address: entry.address || "",
  })
}

// Rating'e göre sırala (en iyi önce)
leads.sort((a, b) => (b.rating - a.rating) || (b.reviews - a.reviews))

// Sonuç
console.log(`\n✓ ${leads.length} temiz lead bulundu (toplam ${raw.length} kayıt işlendi)`)
console.log(`  Daha önce gönderilmiş + suppress: ${sentEmails.size} adres filtrelendi\n`)

leads.forEach((l, i) => {
  const stars = l.rating ? `★${l.rating}` : ""
  const rev = l.reviews ? `(${l.reviews} yorum)` : ""
  console.log(`  [${i+1}] ${l.to.padEnd(45)} ${l.district.padEnd(15)} ${stars} ${rev}`)
  console.log(`       ${l.firm}`)
})

writeFileSync("scripts/guzellik-leads-raw.json", JSON.stringify(leads, null, 2), "utf8")
console.log(`\n→ scripts/guzellik-leads-raw.json kaydedildi`)
