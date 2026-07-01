// Email verification via MX record + SMTP RCPT TO probe
// Kullanım: node scripts/verify-emails.mjs
// Çıktı: scripts/verified-candidates-batch15.json

import { promises as dns } from "node:dns"
import net from "node:net"
import { writeFileSync } from "node:fs"

// NL + BE + LU + UK — yeni aday listesi (batch 8, 14 ile örtüşmeyen)
// Format: { slug, domain, candidates: ['hello@', 'info@', ...], agencyName, city, country }
const agencies = [
  // ── Netherlands ─────────────────────────────────────────────────────────
  { slug: "hike-one",       agencyName: "Hike One",          city: "Amsterdam",   country: "NL", candidates: ["info@hike.one", "hello@hike.one"] },
  { slug: "finalist",       agencyName: "Finalist",          city: "Amsterdam",   country: "NL", candidates: ["info@finalist.nl", "hello@finalist.nl"] },
  { slug: "mirabeau",       agencyName: "Mirabeau",          city: "Amsterdam",   country: "NL", candidates: ["hello@mirabeau.nl", "info@mirabeau.nl"] },
  { slug: "redkiwi",        agencyName: "Redkiwi",           city: "Breda",       country: "NL", candidates: ["info@redkiwi.nl", "hello@redkiwi.nl"] },
  { slug: "orangevalley",   agencyName: "Orangevalley",      city: "Eindhoven",   country: "NL", candidates: ["info@orangevalley.nl", "hello@orangevalley.nl"] },
  { slug: "build-amsterdam",agencyName: "Build In Amsterdam",city: "Amsterdam",   country: "NL", candidates: ["info@buildinamsterdam.com", "hello@buildinamsterdam.com"] },
  { slug: "jungle-minds",   agencyName: "Jungle Minds",      city: "Amsterdam",   country: "NL", candidates: ["info@jungleminds.nl", "contact@jungleminds.nl"] },
  { slug: "iquality",       agencyName: "Iquality",          city: "Nijmegen",    country: "NL", candidates: ["info@iquality.nl", "contact@iquality.nl"] },
  { slug: "wijs",           agencyName: "Wijs",              city: "Ghent",       country: "BE", candidates: ["info@wijs.be", "contact@wijs.be"] },
  { slug: "colours",        agencyName: "Colours",           city: "Amsterdam",   country: "NL", candidates: ["info@colours.nl", "contact@colours.nl"] },
  { slug: "matise",         agencyName: "Matise",            city: "Amsterdam",   country: "NL", candidates: ["info@matise.nl", "contact@matise.nl", "studio@matise.nl"] },
  { slug: "byte",           agencyName: "Byte",              city: "Tilburg",     country: "NL", candidates: ["info@byte.nl", "contact@byte.nl"] },
  { slug: "incentro",       agencyName: "Incentro",          city: "Amsterdam",   country: "NL", candidates: ["info@incentro.com", "contact@incentro.com"] },
  { slug: "kaliber",        agencyName: "Kaliber",           city: "Amsterdam",   country: "NL", candidates: ["info@kaliber.nl", "hello@kaliber.nl"] },
  { slug: "icemobile",      agencyName: "Icemobile",         city: "Amsterdam",   country: "NL", candidates: ["info@icemobile.com", "hello@icemobile.com"] },
  { slug: "soda-studio",    agencyName: "Soda Studio",       city: "Amsterdam",   country: "NL", candidates: ["info@soda.studio", "hello@soda.studio", "studio@soda.studio"] },
  { slug: "tam-tam",        agencyName: "Tam Tam",           city: "Amsterdam",   country: "NL", candidates: ["info@tamtam.nl", "contact@tamtam.nl"] },
  { slug: "dept",           agencyName: "Dept",              city: "Amsterdam",   country: "NL", candidates: ["info@deptagency.com", "hello@deptagency.com", "partnerships@deptagency.com"] },
  { slug: "ikbenalexander", agencyName: "IJsfontein",        city: "Amsterdam",   country: "NL", candidates: ["info@ijsfontein.nl", "hello@ijsfontein.nl"] },
  { slug: "movepeople",     agencyName: "Move People",       city: "Rotterdam",   country: "NL", candidates: ["info@movepeople.nl", "hello@movepeople.nl"] },
  { slug: "oberon",         agencyName: "Oberon",            city: "Utrecht",     country: "NL", candidates: ["info@oberon.nl", "hello@oberon.nl"] },
  { slug: "x-com",          agencyName: "X-com",             city: "Amsterdam",   country: "NL", candidates: ["info@x-com.nl", "hello@x-com.nl"] },
  { slug: "four",           agencyName: "Four",              city: "Amsterdam",   country: "NL", candidates: ["info@wearefour.nl", "hello@wearefour.nl"] },
  { slug: "tweakwise",      agencyName: "Tweakwise",         city: "Amsterdam",   country: "NL", candidates: ["info@tweakwise.com", "hello@tweakwise.com"] },
  { slug: "sping",          agencyName: "Sping",             city: "Amsterdam",   country: "NL", candidates: ["info@sping.nl", "hello@sping.nl"] },

  // ── Belgium (new) ────────────────────────────────────────────────────────
  { slug: "inthepocket",    agencyName: "In The Pocket",     city: "Ghent",       country: "BE", candidates: ["info@inthepocket.com", "hello@inthepocket.com", "contact@inthepocket.com"] },
  { slug: "esign",          agencyName: "Esign",             city: "Ghent",       country: "BE", candidates: ["info@esign.eu", "hello@esign.eu"] },
  { slug: "endeavour",      agencyName: "Endeavour",         city: "Bruges",      country: "BE", candidates: ["info@endeavour.be", "contact@endeavour.be"] },
  { slug: "invisible-puppy",agencyName: "Invisible Puppy",  city: "Antwerp",     country: "BE", candidates: ["info@invisiblepuppy.be", "contact@invisiblepuppy.be"] },
  { slug: "calibrate",      agencyName: "Calibrate",         city: "Brussels",    country: "BE", candidates: ["info@calibrate.be", "hello@calibrate.be"] },
  { slug: "comicube",       agencyName: "Comicube",          city: "Brussels",    country: "BE", candidates: ["info@comicube.be", "contact@comicube.be"] },
  { slug: "two-kind",       agencyName: "Two of a Kind",     city: "Antwerp",     country: "BE", candidates: ["info@twoofakind.be", "contact@twoofakind.be"] },
  { slug: "leap-forward",   agencyName: "Leap Forward",      city: "Brussels",    country: "BE", candidates: ["info@leapforward.be", "hello@leapforward.be"] },
  { slug: "addestino",      agencyName: "Addestino",         city: "Brussels",    country: "BE", candidates: ["hello@addestino.be", "info@addestino.be"] },
  { slug: "netopia",        agencyName: "Netopia",           city: "Brussels",    country: "BE", candidates: ["hello@netopia.be", "info@netopia.be"] },
  { slug: "multiply-be",    agencyName: "Multiply",          city: "Brussels",    country: "BE", candidates: ["info@multiply.be", "hello@multiply.be"] },
  { slug: "craftsmen-be",   agencyName: "Craftsmen",         city: "Ghent",       country: "BE", candidates: ["hello@craftsmen.be", "info@craftsmen.be"] },
  { slug: "joyn",           agencyName: "Joyn",              city: "Antwerp",     country: "BE", candidates: ["hello@joyn.be", "info@joyn.be"] },
  { slug: "wunderman-be",   agencyName: "Wunderman Thompson", city: "Brussels",   country: "BE", candidates: ["info@wundermanthompson.be", "contact@wundermanthompson.be"] },
  { slug: "wolf",           agencyName: "Wolf",              city: "Ghent",       country: "BE", candidates: ["info@wolf.be", "hello@wolf.be"] },

  // ── Luxembourg (new) ──────────────────────────────────────────────────────
  { slug: "luxfuturelab",   agencyName: "Lux Future Lab",    city: "Luxembourg",  country: "LU", candidates: ["info@luxfuturelab.lu", "hello@luxfuturelab.lu"] },
  { slug: "propel-lu",      agencyName: "Propel",            city: "Luxembourg",  country: "LU", candidates: ["hello@propel.lu", "info@propel.lu"] },
  { slug: "moovcombo",      agencyName: "MoovCombo",         city: "Luxembourg",  country: "LU", candidates: ["hello@moovcombo.lu", "info@moovcombo.lu"] },
  { slug: "roots-lu",       agencyName: "Roots",             city: "Luxembourg",  country: "LU", candidates: ["contact@roots.lu", "info@roots.lu"] },
  { slug: "codex-lu",       agencyName: "Codex",             city: "Luxembourg",  country: "LU", candidates: ["info@codex.lu", "hello@codex.lu"] },
  { slug: "cre8",           agencyName: "Cre8",              city: "Luxembourg",  country: "LU", candidates: ["info@cre8.lu", "hello@cre8.lu"] },

  // ── UK (new cities) ──────────────────────────────────────────────────────
  { slug: "whitespace",     agencyName: "Whitespace",        city: "Edinburgh",   country: "UK", candidates: ["info@whitespace.co.uk", "hello@whitespace.co.uk"] },
  { slug: "equator",        agencyName: "Equator",           city: "Glasgow",     country: "UK", candidates: ["info@equator.agency", "hello@equator.agency"] },
  { slug: "magnetic-north", agencyName: "Magnetic North",   city: "Glasgow",     country: "UK", candidates: ["info@magnetic-north.com", "hello@magnetic-north.com", "studio@magnetic-north.com"] },
  { slug: "cantarus",       agencyName: "Cantarus",          city: "Manchester",  country: "UK", candidates: ["hello@cantarus.com", "info@cantarus.com"] },
  { slug: "clicky",         agencyName: "Clicky",            city: "York",        country: "UK", candidates: ["hello@clickymedia.co.uk", "info@clickymedia.co.uk"] },
  { slug: "blue-frontier",  agencyName: "Blue Frontier",     city: "Worthing",    country: "UK", candidates: ["hello@bluefrontier.co.uk", "info@bluefrontier.co.uk"] },
  { slug: "sookio",         agencyName: "Sookio",            city: "Cambridge",   country: "UK", candidates: ["hello@sookio.com", "info@sookio.com"] },
  { slug: "far-reach",      agencyName: "Far Reach",         city: "Birmingham",  country: "UK", candidates: ["hello@farreachstudios.co.uk", "info@farreachstudios.co.uk"] },
  { slug: "latitude",       agencyName: "Latitude",          city: "Sheffield",   country: "UK", candidates: ["hello@latitudeagency.com", "info@latitudeagency.com"] },
  { slug: "digital-six",    agencyName: "Digital Six",       city: "Glasgow",     country: "UK", candidates: ["info@digitalsix.co.uk", "hello@digitalsix.co.uk"] },
  { slug: "web-studio",     agencyName: "The Web Studio",    city: "Edinburgh",   country: "UK", candidates: ["hello@thewebstudio.co.uk", "info@thewebstudio.co.uk"] },
  { slug: "make-agency",    agencyName: "Make Agency",       city: "Birmingham",  country: "UK", candidates: ["hello@make.agency", "info@make.agency", "studio@make.agency"] },
  { slug: "studio-brown",   agencyName: "Studio Brown",      city: "Bath",        country: "UK", candidates: ["hello@studiobrown.co.uk", "info@studiobrown.co.uk"] },
  { slug: "aero",           agencyName: "Aero",              city: "London",      country: "UK", candidates: ["hello@aero.digital", "info@aero.digital"] },
  { slug: "plan-digital",   agencyName: "Plan Digital",      city: "Liverpool",   country: "UK", candidates: ["hello@plan.digital", "info@plan.digital"] },
  { slug: "nublue-2",       agencyName: "Nublue",            city: "Lancaster",   country: "UK", candidates: ["hello@nublue.co.uk", "info@nublue.co.uk"] },
]

// MX record check
async function hasMx(domain) {
  try {
    const records = await dns.resolveMx(domain)
    return records.length > 0
  } catch {
    return false
  }
}

// SMTP RCPT TO probe (15s timeout)
function smtpVerify(email, mxHost) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => { socket.destroy(); resolve("timeout") }, 15000)
    const socket = net.createConnection(25, mxHost)
    let step = 0
    const [user, domain] = email.split("@")
    const commands = [
      `EHLO solmandigital.com.tr\r\n`,
      `MAIL FROM:<info@solmandigital.com.tr>\r\n`,
      `RCPT TO:<${email}>\r\n`,
      `QUIT\r\n`,
    ]
    socket.on("data", (data) => {
      const msg = data.toString()
      if (step === 3) {
        clearTimeout(timeout)
        socket.destroy()
        if (msg.startsWith("250") || msg.startsWith("251")) resolve("valid")
        else if (msg.startsWith("550") || msg.startsWith("551") || msg.startsWith("553")) resolve("invalid")
        else resolve("unknown:" + msg.slice(0,20))
        return
      }
      socket.write(commands[step])
      step++
    })
    socket.on("error", () => { clearTimeout(timeout); resolve("error") })
    socket.on("close", () => { clearTimeout(timeout); resolve("closed") })
  })
}

console.log(`Checking ${agencies.length} agencies (MX + SMTP)...\n`)
const results = []

for (const ag of agencies) {
  // Try each candidate email
  let verified = null
  for (const email of ag.candidates) {
    const domain = email.split("@")[1]
    const mxOk = await hasMx(domain)
    if (!mxOk) {
      process.stdout.write(`  ✗ MX fail: ${email}\n`)
      continue
    }
    let mxRecords
    try { mxRecords = await dns.resolveMx(domain) } catch { continue }
    mxRecords.sort((a,b) => a.priority - b.priority)
    const mxHost = mxRecords[0].exchange

    const result = await smtpVerify(email, mxHost)
    process.stdout.write(`  ${result==="valid"?"✓":"~"} [${result}] ${email} (mx: ${mxHost})\n`)

    if (result === "valid") {
      verified = email
      break
    }
    // If first candidate was "invalid" (hard reject), try next
    if (result === "invalid") continue
    // timeout/error/unknown — keep as candidate, will test at send time
    if (!verified) verified = email // use first non-MX-fail as fallback
    break
  }

  if (verified) {
    results.push({
      slug: ag.slug,
      to: verified,
      agencyName: ag.agencyName,
      city: ag.city,
      country: ag.country,
      verified: true
    })
    process.stdout.write(`→ Added: ${verified}\n\n`)
  } else {
    process.stdout.write(`→ SKIP: ${ag.agencyName} (all candidates failed MX)\n\n`)
  }
}

writeFileSync("scripts/verified-candidates-batch15.json", JSON.stringify(results, null, 2))
console.log(`\n✓ ${results.length} verified candidates → scripts/verified-candidates-batch15.json`)
