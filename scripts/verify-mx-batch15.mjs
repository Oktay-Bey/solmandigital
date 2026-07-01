import { promises as dns } from "node:dns"
import { writeFileSync } from "node:fs"

const candidates = [
  // NL — info@ pattern (previous hello@ bounced)
  { slug:"jungle-minds",   to:"info@jungleminds.nl",       agencyName:"Jungle Minds",        city:"Amsterdam",  country:"NL" },
  { slug:"iquality",       to:"info@iquality.nl",           agencyName:"Iquality",            city:"Nijmegen",   country:"NL" },
  { slug:"colours",        to:"info@colours.nl",            agencyName:"Colours",             city:"Amsterdam",  country:"NL" },
  { slug:"matise",         to:"info@matise.nl",             agencyName:"Matise",              city:"Amsterdam",  country:"NL" },
  { slug:"byte",           to:"info@byte.nl",               agencyName:"Byte",                city:"Tilburg",    country:"NL" },
  { slug:"incentro",       to:"info@incentro.com",          agencyName:"Incentro",            city:"Amsterdam",  country:"NL" },
  { slug:"kaliber",        to:"info@kaliber.nl",            agencyName:"Kaliber",             city:"Amsterdam",  country:"NL" },
  { slug:"icemobile",      to:"info@icemobile.com",         agencyName:"Icemobile",           city:"Amsterdam",  country:"NL" },
  { slug:"tamtam",         to:"info@tamtam.nl",             agencyName:"Tam Tam",             city:"Amsterdam",  country:"NL" },
  { slug:"dept",           to:"info@deptagency.com",        agencyName:"Dept",                city:"Amsterdam",  country:"NL" },
  { slug:"ijsfontein",     to:"info@ijsfontein.nl",         agencyName:"IJsfontein",          city:"Amsterdam",  country:"NL" },
  { slug:"oberon",         to:"info@oberon.nl",             agencyName:"Oberon",              city:"Utrecht",    country:"NL" },
  { slug:"sping",          to:"info@sping.nl",              agencyName:"Sping",               city:"Amsterdam",  country:"NL" },
  { slug:"hike-one",       to:"info@hike.one",              agencyName:"Hike One",            city:"Amsterdam",  country:"NL" },
  { slug:"finalist",       to:"info@finalist.nl",           agencyName:"Finalist",            city:"Amsterdam",  country:"NL" },
  { slug:"redkiwi",        to:"info@redkiwi.nl",            agencyName:"Redkiwi",             city:"Breda",      country:"NL" },
  { slug:"orangevalley",   to:"info@orangevalley.nl",       agencyName:"Orangevalley",        city:"Eindhoven",  country:"NL" },
  { slug:"mirabeau",       to:"hello@mirabeau.nl",          agencyName:"Mirabeau",            city:"Amsterdam",  country:"NL" },
  { slug:"oberon-2",       to:"info@oberon.nl",             agencyName:"Oberon",              city:"Utrecht",    country:"NL" },
  { slug:"wesp",           to:"info@wesp.nl",               agencyName:"WESP",                city:"Amsterdam",  country:"NL" },
  { slug:"keen-nl",        to:"hello@keen.nl",              agencyName:"Keen",                city:"Amsterdam",  country:"NL" },
  { slug:"pixelperfect",   to:"info@pixelperfect.nl",       agencyName:"Pixelperfect",        city:"Amsterdam",  country:"NL" },
  { slug:"positive",       to:"info@positive.nl",           agencyName:"Positive",            city:"Amsterdam",  country:"NL" },
  { slug:"woodies",        to:"info@woodies.nl",            agencyName:"Woodies",             city:"Amsterdam",  country:"NL" },
  { slug:"bakken",         to:"hello@bakkenbaeck.com",      agencyName:"Bakken & Baeck",      city:"Amsterdam",  country:"NL" },
  // BE — info@ pattern for retries
  { slug:"wijs",           to:"info@wijs.be",               agencyName:"Wijs",                city:"Ghent",      country:"BE" },
  { slug:"inthepocket",    to:"info@inthepocket.com",       agencyName:"In The Pocket",       city:"Ghent",      country:"BE" },
  { slug:"esign",          to:"info@esign.eu",              agencyName:"Esign",               city:"Ghent",      country:"BE" },
  { slug:"endeavour",      to:"info@endeavour.be",          agencyName:"Endeavour",           city:"Bruges",     country:"BE" },
  { slug:"invisiblepuppy", to:"info@invisiblepuppy.be",     agencyName:"Invisible Puppy",     city:"Antwerp",    country:"BE" },
  { slug:"comicube",       to:"info@comicube.be",           agencyName:"Comicube",            city:"Brussels",   country:"BE" },
  { slug:"two-kind",       to:"info@twoofakind.be",         agencyName:"Two of a Kind",       city:"Antwerp",    country:"BE" },
  { slug:"leap",           to:"info@leapforward.be",        agencyName:"Leap Forward",        city:"Brussels",   country:"BE" },
  { slug:"addestino",      to:"info@addestino.be",          agencyName:"Addestino",           city:"Brussels",   country:"BE" },
  { slug:"netopia",        to:"info@netopia.be",            agencyName:"Netopia",             city:"Brussels",   country:"BE" },
  { slug:"multiply",       to:"info@multiply.be",           agencyName:"Multiply",            city:"Brussels",   country:"BE" },
  { slug:"craftsmen",      to:"info@craftsmen.be",          agencyName:"Craftsmen",           city:"Ghent",      country:"BE" },
  { slug:"joyn",           to:"info@joyn.be",               agencyName:"Joyn",                city:"Antwerp",    country:"BE" },
  { slug:"wolf-be",        to:"info@wolf.be",               agencyName:"Wolf",                city:"Ghent",      country:"BE" },
  { slug:"emakina",        to:"info@emakina.com",           agencyName:"Emakina",             city:"Brussels",   country:"BE" },
  { slug:"soroban",        to:"info@soroban.be",            agencyName:"Soroban",             city:"Brussels",   country:"BE" },
  { slug:"archie",         to:"info@archie.be",             agencyName:"Archie",              city:"Ghent",      country:"BE" },
  { slug:"rooftop",        to:"info@rooftop.be",            agencyName:"Rooftop",             city:"Brussels",   country:"BE" },
  { slug:"spatie",         to:"info@spatie.be",             agencyName:"Spatie",              city:"Antwerp",    country:"BE" },
  // LU
  { slug:"luxfuturelab",   to:"info@luxfuturelab.lu",       agencyName:"Lux Future Lab",      city:"Luxembourg", country:"LU" },
  { slug:"propel-lu",      to:"hello@propel.lu",            agencyName:"Propel",              city:"Luxembourg", country:"LU" },
  { slug:"moovcombo",      to:"hello@moovcombo.lu",         agencyName:"MoovCombo",           city:"Luxembourg", country:"LU" },
  { slug:"codex-lu",       to:"info@codex.lu",              agencyName:"Codex",               city:"Luxembourg", country:"LU" },
  { slug:"cre8-lu",        to:"info@cre8.lu",               agencyName:"Cre8",                city:"Luxembourg", country:"LU" },
  // UK new cities
  { slug:"whitespace",     to:"info@whitespace.co.uk",      agencyName:"Whitespace",          city:"Edinburgh",  country:"UK" },
  { slug:"equator",        to:"info@equator.agency",        agencyName:"Equator",             city:"Glasgow",    country:"UK" },
  { slug:"digital-six",    to:"info@digitalsix.co.uk",      agencyName:"Digital Six",         city:"Glasgow",    country:"UK" },
  { slug:"cantarus",       to:"hello@cantarus.com",         agencyName:"Cantarus",            city:"Manchester", country:"UK" },
  { slug:"clicky",         to:"hello@clickymedia.co.uk",    agencyName:"Clicky",              city:"York",       country:"UK" },
  { slug:"blue-frontier",  to:"hello@bluefrontier.co.uk",   agencyName:"Blue Frontier",       city:"Worthing",   country:"UK" },
  { slug:"sookio",         to:"hello@sookio.com",           agencyName:"Sookio",              city:"Cambridge",  country:"UK" },
  { slug:"aero",           to:"hello@aero.digital",         agencyName:"Aero",                city:"London",     country:"UK" },
  { slug:"make-agency",    to:"hello@make.agency",          agencyName:"Make Agency",         city:"Birmingham", country:"UK" },
  { slug:"fat-media",      to:"info@fatmedia.co.uk",        agencyName:"Fat Media",           city:"Lancaster",  country:"UK" },
  { slug:"fresh-egg",      to:"hello@freshegg.com",         agencyName:"Fresh Egg",           city:"Worthing",   country:"UK" },
  { slug:"impression",     to:"info@impressiondigital.com", agencyName:"Impression Digital",  city:"Nottingham", country:"UK" },
  { slug:"proctors",       to:"hello@proctors.co.uk",       agencyName:"Proctors",            city:"Newcastle",  country:"UK" },
  { slug:"studio-republic",to:"info@studiorepublic.co.uk",  agencyName:"Studio Republic",     city:"Winchester", country:"UK" },
  { slug:"creative-jar",   to:"hello@creativejar.co.uk",    agencyName:"Creative Jar",        city:"Leeds",      country:"UK" },
  { slug:"sequence",       to:"hello@sequence.co.uk",       agencyName:"Sequence",            city:"London",     country:"UK" },
  { slug:"twenty-first",   to:"hello@twentyfirstdigital.co.uk", agencyName:"Twenty First Digital", city:"Manchester", country:"UK" },
  { slug:"journey-further",to:"hello@journeyfurther.com",   agencyName:"Journey Further",     city:"Leeds",      country:"UK" },
  { slug:"digital-uncut",  to:"hello@digitaluncut.co.uk",   agencyName:"Digital Uncut",       city:"London",     country:"UK" },
  { slug:"reload-digital", to:"hello@reloaddigital.co.uk",  agencyName:"Reload Digital",      city:"Birmingham", country:"UK" },
]

async function hasMx(domain) {
  try {
    const r = await dns.resolveMx(domain)
    return r.length > 0
  } catch {
    return false
  }
}

const valid = []
const seen = new Set()

for (const a of candidates) {
  if (seen.has(a.to.toLowerCase())) continue
  seen.add(a.to.toLowerCase())
  const domain = a.to.split("@")[1]
  const ok = await hasMx(domain)
  console.log(ok ? "✓" : "✗", a.to)
  if (ok) valid.push(a)
}

writeFileSync("scripts/verified-candidates-batch15.json", JSON.stringify(valid, null, 2))
console.log(`\nMX valid: ${valid.length} / ${candidates.length}`)
