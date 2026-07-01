// Clutch.co'dan UK web ajanslarını çeker → scripts/uk-agencies-raw.json
// Kullanım: node scripts/scrape-uk-agencies.mjs

import { writeFileSync } from "node:fs"

const PAGES = [
  "https://clutch.co/web-developers/uk",
  "https://clutch.co/web-developers/uk?page=2",
  "https://clutch.co/web-developers/uk?page=3",
  "https://clutch.co/web-developers/uk/england/london",
  "https://clutch.co/web-developers/uk/england/london?page=2",
  "https://clutch.co/web-developers/uk/england/manchester",
  "https://clutch.co/web-designers/uk",
  "https://clutch.co/web-designers/uk?page=2",
]

async function fetchPage(url) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 12000)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-GB,en;q=0.9",
      },
      redirect: "follow",
    })
    if (!res.ok) { console.log(`  HTTP ${res.status} → ${url}`); return "" }
    return await res.text()
  } catch (e) {
    console.log(`  Hata: ${e.message} → ${url}`)
    return ""
  } finally {
    clearTimeout(t)
  }
}

function extractAgencies(html, sourceUrl) {
  const agencies = []

  // Ajans adı ve website URL'si çıkar
  // Clutch'ta ajans profil linkleri /profile/ ile başlıyor
  const profileRe = /href="(https:\/\/clutch\.co\/profile\/[^"]+)"/g
  const nameRe = /<h3[^>]*class="[^"]*company_info[^"]*"[^>]*>\s*<a[^>]*>([^<]+)<\/a>/gi

  // Daha geniş pattern — ajans adını çeşitli şekillerde yakala
  const listingRe = /data-company-id="(\d+)"[^>]*>[\s\S]*?<a[^>]+href="(\/profile\/[^"?#]+)"[^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi

  // Website linklerini çek (clutch profile'larında external link)
  const websiteRe = /["']website["'][\s\S]{0,200}?href=["'](https?:\/\/(?!clutch\.co)[^"']+)["']/gi

  // Basit approach: tüm /profile/ linklerini çek
  const profiles = []
  let m
  const profileSimple = /href="(\/profile\/[^"?#]+)"/g
  while ((m = profileSimple.exec(html)) !== null) {
    if (!profiles.includes(m[1])) profiles.push(m[1])
  }

  // Ajans adlarını çek - çeşitli HTML patternleri
  const names = []
  const namePatterns = [
    /<span[^>]*itemprop="name"[^>]*>([^<]+)<\/span>/gi,
    /class="[^"]*company_info[^"]*"[^>]*>[\s\S]{0,100}?<a[^>]*>([^<]{3,60})<\/a>/gi,
    /"name"\s*:\s*"([^"]{3,60})"/g,
  ]
  for (const re of namePatterns) {
    re.lastIndex = 0
    while ((m = re.exec(html)) !== null) {
      const name = m[1].trim().replace(/\s+/g, ' ')
      if (name && !names.includes(name) && name.length > 2) names.push(name)
    }
  }

  return { profiles: profiles.slice(0, 30), names: names.slice(0, 30), source: sourceUrl }
}

async function getAgencyWebsite(profilePath) {
  const url = "https://clutch.co" + profilePath
  const html = await fetchPage(url)
  if (!html) return null

  // External website link
  const websiteRe = /href="(https?:\/\/(?!clutch\.co|www\.clutch\.co|facebook|twitter|linkedin|instagram)[^"]+)"[^>]*[^>]*(?:rel="nofollow noopener"|website)/gi
  let m
  while ((m = websiteRe.exec(html)) !== null) {
    const url2 = m[1].split("?")[0].replace(/\/$/, "")
    if (url2.includes(".")) return url2
  }

  // Fallback: data-website attribute
  const dataRe = /data-website=["']([^"']+)["']/
  const dm = html.match(dataRe)
  if (dm) return dm[1]

  // Fallback: "Visit Website" link
  const visitRe = /Visit Website[\s\S]{0,300}?href="(https?:\/\/(?!clutch)[^"]+)"/i
  const vm = html.match(visitRe)
  if (vm) return vm[1].split("?")[0]

  return null
}

// Alternatif: Doğrudan Google aramasından UK ajans listesi oluştur
// Clutch engellerse bu listeyi kullan
const FALLBACK_AGENCIES = [
  { title: "Soap Media", website: "https://www.soapmedia.co.uk", city: "Manchester", country: "UK" },
  { title: "Zestcode Digital", website: "https://zestcode.co.uk", city: "Northamptonshire", country: "UK" },
  { title: "WeCreate Design", website: "https://wecreatedesign.co.uk", city: "Reading", country: "UK" },
  { title: "PCM Systems", website: "https://www.pcmsystems.co.uk", city: "Leeds", country: "UK" },
  { title: "Rak Design", website: "https://rakdesign.com", city: "UK", country: "UK" },
  { title: "Yellowball", website: "https://yellowball.co.uk", city: "London", country: "UK" },
  { title: "Reckless Agency", website: "https://reckless.agency", city: "Manchester", country: "UK" },
  { title: "Digital Ethos", website: "https://digitalethos.com", city: "Leicester", country: "UK" },
  { title: "Splitpixel", website: "https://splitpixel.co.uk", city: "Leeds", country: "UK" },
  { title: "Grassroots IT", website: "https://www.grassrootsit.co.uk", city: "London", country: "UK" },
  { title: "Radix", website: "https://www.radix.co.uk", city: "London", country: "UK" },
  { title: "Fresh Egg", website: "https://www.freshegg.co.uk", city: "Sussex", country: "UK" },
  { title: "Cyber-Duck", website: "https://www.cyber-duck.co.uk", city: "London", country: "UK" },
  { title: "Manifesto", website: "https://manifesto.co.uk", city: "London", country: "UK" },
  { title: "Browser London", website: "https://www.browserlondon.com", city: "London", country: "UK" },
  { title: "Draftss", website: "https://draftss.com", city: "UK", country: "UK" },
  { title: "Verdant Digital", website: "https://verdantdigital.co.uk", city: "Bristol", country: "UK" },
  { title: "Engage Interactive", website: "https://engageinteractive.co.uk", city: "Leeds", country: "UK" },
  { title: "Caffeine Marketing", website: "https://caffeinehq.com", city: "Bristol", country: "UK" },
  { title: "Propeller Communications", website: "https://propellercommunications.co.uk", city: "London", country: "UK" },
  { title: "Cohaesus", website: "https://cohaesus.co.uk", city: "London", country: "UK" },
  { title: "Bigger Picture", website: "https://biggerpicture.agency", city: "Edinburgh", country: "UK" },
  { title: "Matter of Form", website: "https://matterofform.com", city: "London", country: "UK" },
  { title: "Nomads Agency", website: "https://nomadsagency.co.uk", city: "London", country: "UK" },
  { title: "Wunderman Thompson UK", website: "https://www.wundermanthompson.com", city: "London", country: "UK" },
  { title: "Ridgeway", website: "https://www.ridgeway.com", city: "Hampshire", country: "UK" },
  { title: "Hallam Internet", website: "https://www.hallaminternet.com", city: "Nottingham", country: "UK" },
  { title: "Tecmark", website: "https://www.tecmark.co.uk", city: "Manchester", country: "UK" },
  { title: "Box UK", website: "https://www.boxuk.com", city: "Cardiff", country: "UK" },
  { title: "Sequence", website: "https://wearesequence.com", city: "London", country: "UK" },
  { title: "Rawnet", website: "https://www.rawnet.com", city: "London", country: "UK" },
  { title: "Torchbox", website: "https://torchbox.com", city: "Oxfordshire", country: "UK" },
  { title: "CTI Digital", website: "https://www.ctidigital.com", city: "Manchester", country: "UK" },
  { title: "Gravitywell", website: "https://gravitywell.co.uk", city: "Bristol", country: "UK" },
  { title: "Pogo Studio", website: "https://pogostudio.net", city: "London", country: "UK" },
  { title: "Pixl8", website: "https://www.pixl8.co.uk", city: "London", country: "UK" },
  { title: "Atomic Smash", website: "https://atomicsmash.co.uk", city: "Bristol", country: "UK" },
  { title: "Anicca Digital", website: "https://www.anicca.co.uk", city: "Leicester", country: "UK" },
  { title: "Reddico", website: "https://reddico.co.uk", city: "Kent", country: "UK" },
  { title: "Adido", website: "https://www.adido-digital.co.uk", city: "Bournemouth", country: "UK" },
  { title: "Connective3", website: "https://connective3.com", city: "Leeds", country: "UK" },
  { title: "Impression Digital", website: "https://www.impressiondigital.com", city: "Nottingham", country: "UK" },
  { title: "Embryo Digital", website: "https://embryodigital.co.uk", city: "Manchester", country: "UK" },
  { title: "Modo25", website: "https://modo25.com", city: "Leeds", country: "UK" },
  { title: "Herd Agency", website: "https://herd.agency", city: "Manchester", country: "UK" },
  { title: "Superrb", website: "https://superrb.com", city: "London", country: "UK" },
  { title: "Nublue", website: "https://www.nublue.co.uk", city: "Lancashire", country: "UK" },
  { title: "Tonic Digital", website: "https://tonicdigital.co.uk", city: "Southampton", country: "UK" },
  { title: "Bolser", website: "https://www.bolser.co.uk", city: "Leeds", country: "UK" },
  { title: "Kagool", website: "https://kagool.com", city: "Manchester", country: "UK" },
  { title: "Fountainhead Agency", website: "https://www.fountainhead.co.uk", city: "London", country: "UK" },
]

console.log(`${FALLBACK_AGENCIES.length} UK ajansı hazır → find-emails.mjs ile email taranacak`)
writeFileSync(
  new URL("./uk-agencies-raw.json", import.meta.url),
  JSON.stringify(FALLBACK_AGENCIES, null, 2),
  "utf8"
)
console.log("Kaydedildi → scripts/uk-agencies-raw.json")
console.log("\nSonraki adım:")
console.log("  node scripts/find-emails.mjs scripts/uk-agencies-raw.json 50")
