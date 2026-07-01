/**
 * loop-send-today.mjs
 * Kalan günlük kotayı doldurur: Brevo (198 kalan) → Resend (100 kalan)
 * Domain-level dedup, V4 conversion-optimised template, no preview.
 * Run: node scripts/loop-send-today.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)

const BREVO_KEY   = env.BREVO_API_KEY
const RESEND_KEY  = env.RESEND_API_KEY
const BREVO_LIMIT = 300
const RESEND_LIMIT = 100
const CHUNK       = 50  // mails per batch file / reporting unit
const DELAY_MS    = 350 // ms between sends

// ─── 1. TODAY'S BREVO USAGE ───────────────────────────────────────────────
async function getBrevoUsedToday() {
  const r = await fetch("https://api.brevo.com/v3/smtp/statistics/reports?days=1&limit=1", {
    headers: { "api-key": BREVO_KEY }
  })
  const d = await r.json()
  return (d.reports?.[0]?.requests) ?? 0
}

// ─── 2. ALL CANDIDATE LEADS (UK · NL · DE · SE · NO · DK · FI · CZ · HU · AT) ──
const ALL_CANDIDATES = [
  // ── UK — Liverpool / Sheffield / Birmingham / Oxford / new studios ────────
  { slug:"uniform",        to:"hello@uniform.net",              agencyName:"Uniform",             city:"Liverpool",     country:"UK" },
  { slug:"reckless",       to:"hello@wearereckless.com",        agencyName:"Reckless",            city:"Liverpool",     country:"UK" },
  { slug:"serotonin",      to:"hello@serotonin.co",             agencyName:"Serotonin",           city:"Liverpool",     country:"UK" },
  { slug:"evoluted",       to:"hello@evoluted.com",             agencyName:"Evoluted",            city:"Sheffield",     country:"UK" },
  { slug:"hydra",          to:"hello@hydracreative.com",        agencyName:"Hydra Creative",      city:"Sheffield",     country:"UK" },
  { slug:"brass",          to:"hello@brassagency.co.uk",        agencyName:"Brass Agency",        city:"Sheffield",     country:"UK" },
  { slug:"digitl",         to:"hello@digitl.co.uk",             agencyName:"Digitl",              city:"Sheffield",     country:"UK" },
  { slug:"grm",            to:"info@grmdigital.co.uk",          agencyName:"GRM Digital",         city:"Birmingham",    country:"UK" },
  { slug:"intercept",      to:"hello@intercept.studio",         agencyName:"Intercept Studio",    city:"Birmingham",    country:"UK" },
  { slug:"cogent",         to:"info@cogentelliott.com",         agencyName:"Cogent Elliott",      city:"Birmingham",    country:"UK" },
  { slug:"cuckoo",         to:"hello@cuckoodesign.co.uk",       agencyName:"Cuckoo Design",       city:"Leamington Spa",country:"UK" },
  { slug:"white-october",  to:"hello@whiteoctober.co.uk",       agencyName:"White October",       city:"Oxford",        country:"UK" },
  { slug:"kyan",           to:"hello@kyan.com",                 agencyName:"Kyan",                city:"Guildford",     country:"UK" },
  { slug:"degree53",       to:"hello@degree53.com",             agencyName:"Degree 53",           city:"Manchester",    country:"UK" },
  { slug:"mediaworks",     to:"info@mediaworks.agency",         agencyName:"Mediaworks",          city:"Newcastle",     country:"UK" },
  { slug:"untold",         to:"hello@untoldfable.com",          agencyName:"Untold Fable",        city:"London",        country:"UK" },
  { slug:"manifold",       to:"hello@manifold.studio",          agencyName:"Manifold Studio",     city:"London",        country:"UK" },
  { slug:"byte-london",    to:"hello@bytelondon.com",           agencyName:"Byte London",         city:"London",        country:"UK" },
  { slug:"omg-agency",     to:"hello@omgagency.co.uk",          agencyName:"OMG Agency",          city:"Manchester",    country:"UK" },
  { slug:"wired-canvas",   to:"hello@wiredcanvas.co.uk",        agencyName:"Wired Canvas",        city:"Exeter",        country:"UK" },
  { slug:"pebble",         to:"hello@pebble.studio",            agencyName:"Pebble Studio",       city:"Exeter",        country:"UK" },
  { slug:"adrenalin",      to:"hello@adren.com",                agencyName:"Adrenalin",           city:"Plymouth",      country:"UK" },
  { slug:"think-traffic",  to:"hello@thinktraffic.net",         agencyName:"Think Traffic",       city:"Leeds",         country:"UK" },
  { slug:"leaf",           to:"hello@weareleaf.com",            agencyName:"Leaf",                city:"Manchester",    country:"UK" },
  { slug:"absolute",       to:"hello@absolutedigital.co.uk",    agencyName:"Absolute Digital",    city:"London",        country:"UK" },
  { slug:"peak-digital",   to:"hello@peakdigitalagency.co.uk",  agencyName:"Peak Digital",        city:"Macclesfield",  country:"UK" },
  { slug:"creativebloc",   to:"hello@creativebloc.co.uk",       agencyName:"Creativebloc",        city:"Sheffield",     country:"UK" },
  { slug:"studio-then",    to:"hello@studiothen.co.uk",         agencyName:"Studio Then",         city:"London",        country:"UK" },
  { slug:"eskimove",       to:"hello@eskimove.co.uk",           agencyName:"Eskimove",            city:"Leeds",         country:"UK" },
  { slug:"contrast",       to:"hello@contrastcreative.co.uk",   agencyName:"Contrast Creative",   city:"Manchester",    country:"UK" },
  // ── NL — new agencies ────────────────────────────────────────────────────
  { slug:"cleverfranke",   to:"info@cleverfranke.com",          agencyName:"CLEVER°FRANKE",       city:"Utrecht",       country:"NL" },
  { slug:"studiodumbar",   to:"info@studiodumbar.com",          agencyName:"Studio Dumbar",       city:"Rotterdam",     country:"NL" },
  { slug:"happyhorizon",   to:"info@happyhorizon.nl",           agencyName:"Happy Horizon",       city:"Amsterdam",     country:"NL" },
  { slug:"wearenerd",      to:"info@wearenerd.nl",              agencyName:"NERD",                city:"Amsterdam",     country:"NL" },
  { slug:"digitalcowboys", to:"info@digitalcowboys.nl",         agencyName:"Digital Cowboys",     city:"Amsterdam",     country:"NL" },
  { slug:"iquals-nl",      to:"info@iquals.nl",                 agencyName:"Iquals",              city:"Enschede",      country:"NL" },
  { slug:"yellowgrape",    to:"info@yellowgrape.nl",            agencyName:"Yellowgrape",         city:"Amsterdam",     country:"NL" },
  { slug:"bycape",         to:"info@bycape.nl",                 agencyName:"Bycape",              city:"Amsterdam",     country:"NL" },
  { slug:"noppes",         to:"info@noppes.nl",                 agencyName:"Noppes",              city:"Amsterdam",     country:"NL" },
  { slug:"samhoud",        to:"info@samhoud.com",               agencyName:"&samhoud design",     city:"Amsterdam",     country:"NL" },
  { slug:"total-identity", to:"info@totalidentity.com",         agencyName:"Total Identity",      city:"Amsterdam",     country:"NL" },
  { slug:"afdeling",       to:"info@afdelingonline.nl",         agencyName:"Afdeling Online",     city:"Groningen",     country:"NL" },
  // ── DE — new agencies ────────────────────────────────────────────────────
  { slug:"sinnerschrader", to:"info@sinnerschrader.com",        agencyName:"SinnerSchrader",      city:"Hamburg",       country:"DE" },
  { slug:"fork",           to:"hello@fork.de",                  agencyName:"Fork Unstable Media", city:"Hamburg",       country:"DE" },
  { slug:"elbkind",        to:"info@elbkind.com",               agencyName:"Elbkind",             city:"Hamburg",       country:"DE" },
  { slug:"tlgg",           to:"info@tlgg.de",                   agencyName:"TLGG",                city:"Berlin",        country:"DE" },
  { slug:"neverest",       to:"hello@neverest.io",              agencyName:"Neverest",            city:"Berlin",        country:"DE" },
  { slug:"syzygy",         to:"info@syzygy.net",                agencyName:"Syzygy",              city:"Frankfurt",     country:"DE" },
  { slug:"scholz-volkmer", to:"info@s-v.de",                    agencyName:"Scholz & Volkmer",    city:"Wiesbaden",     country:"DE" },
  { slug:"plan-net",       to:"info@plan-net.com",              agencyName:"Plan.Net",            city:"Munich",        country:"DE" },
  { slug:"comlounge",      to:"info@comlounge.net",             agencyName:"com.lounge",          city:"Karlsruhe",     country:"DE" },
  { slug:"pixelpark",      to:"info@pixelpark.com",             agencyName:"Pixelpark",           city:"Berlin",        country:"DE" },
  { slug:"e-hoch-3",       to:"info@e-hoch-3.de",              agencyName:"e-hoch-3",            city:"Stuttgart",     country:"DE" },
  { slug:"huth-wenzel",    to:"info@huth-wenzel.de",            agencyName:"Huth & Wenzel",       city:"Munich",        country:"DE" },
  // ── AT — new (Netural already opened) ────────────────────────────────────
  { slug:"soulmates",      to:"hello@soulmates.agency",         agencyName:"Soulmates",           city:"Vienna",        country:"AT" },
  { slug:"webnetz",        to:"info@webnetz.at",                agencyName:"Webnetz",             city:"Vienna",        country:"AT" },
  { slug:"karriere-at",    to:"info@karriere.at",               agencyName:"karriere.at",         city:"Vienna",        country:"AT" },
  { slug:"rocketfarm",     to:"info@rocketfarm.at",             agencyName:"Rocketfarm",          city:"Vienna",        country:"AT" },
  // ── SE — new ──────────────────────────────────────────────────────────────
  { slug:"doberman",       to:"info@doberman.se",               agencyName:"Doberman",            city:"Stockholm",     country:"SE" },
  { slug:"b-reel",         to:"info@b-reel.com",                agencyName:"B-reel",              city:"Stockholm",     country:"SE" },
  { slug:"north-kingdom",  to:"info@northkingdom.com",          agencyName:"North Kingdom",       city:"Skellefteå",    country:"SE" },
  { slug:"odd-hill",       to:"info@oddhill.se",                agencyName:"Odd Hill",            city:"Stockholm",     country:"SE" },
  { slug:"perfect-fools",  to:"hello@perfectfools.com",         agencyName:"Perfect Fools",       city:"Stockholm",     country:"SE" },
  { slug:"oakwood-se",     to:"hello@oakwood.se",               agencyName:"Oakwood",             city:"Stockholm",     country:"SE" },
  // ── NO — new ──────────────────────────────────────────────────────────────
  { slug:"agens",          to:"info@agens.no",                  agencyName:"Agens",               city:"Oslo",          country:"NO" },
  { slug:"hyper-no",       to:"info@hyper.no",                  agencyName:"Hyper",               city:"Oslo",          country:"NO" },
  { slug:"eggs-design",    to:"info@eggsdesign.no",             agencyName:"Eggs Design",         city:"Oslo",          country:"NO" },
  { slug:"creuna",         to:"info@creuna.com",                agencyName:"Creuna",              city:"Oslo",          country:"NO" },
  { slug:"handsome",       to:"info@handsome.no",               agencyName:"Handsome",            city:"Oslo",          country:"NO" },
  // ── DK — new ──────────────────────────────────────────────────────────────
  { slug:"andco",          to:"info@andco.dk",                  agencyName:"&Co.",                city:"Copenhagen",    country:"DK" },
  { slug:"hs-dk",          to:"info@hs.dk",                     agencyName:"Hjaltelin Stahl",     city:"Copenhagen",    country:"DK" },
  { slug:"designit",       to:"info@designit.com",              agencyName:"Designit",            city:"Copenhagen",    country:"DK" },
  { slug:"operate",        to:"info@operate.dk",                agencyName:"Operate",             city:"Copenhagen",    country:"DK" },
  // ── FI — new ──────────────────────────────────────────────────────────────
  { slug:"futurice",       to:"info@futurice.com",              agencyName:"Futurice",            city:"Helsinki",      country:"FI" },
  { slug:"gofore",         to:"info@gofore.com",                agencyName:"Gofore",              city:"Tampere",       country:"FI" },
  { slug:"solita",         to:"info@solita.fi",                 agencyName:"Solita",              city:"Helsinki",      country:"FI" },
  { slug:"vincit",         to:"info@vincit.fi",                 agencyName:"Vincit",              city:"Tampere",       country:"FI" },
  { slug:"qvik",           to:"info@qvik.com",                  agencyName:"Qvik",                city:"Helsinki",      country:"FI" },
  // ── CZ — new ──────────────────────────────────────────────────────────────
  { slug:"actum",          to:"info@actumdigital.com",          agencyName:"Actum Digital",       city:"Prague",        country:"CZ" },
  { slug:"etnetera",       to:"info@etnetera.cz",               agencyName:"Etnetera",            city:"Prague",        country:"CZ" },
  { slug:"symbio",         to:"info@symbio.cz",                 agencyName:"Symbio Digital",      city:"Prague",        country:"CZ" },
  { slug:"keypro",         to:"info@keypro.cz",                 agencyName:"Keypro",              city:"Prague",        country:"CZ" },
  { slug:"medio",          to:"info@medio.cz",                  agencyName:"Medio Interactive",   city:"Prague",        country:"CZ" },
  // ── HU — new ──────────────────────────────────────────────────────────────
  { slug:"mito",           to:"hello@mitoagency.com",           agencyName:"Mito",                city:"Budapest",      country:"HU" },
  { slug:"supergroup-hu",  to:"info@supergroup.hu",             agencyName:"Supergroup",          city:"Budapest",      country:"HU" },
  { slug:"iqual-hu",       to:"info@iqual.hu",                  agencyName:"Iqual",               city:"Budapest",      country:"HU" },
  { slug:"unikornis",      to:"info@unikornis.com",             agencyName:"Unikornis",           city:"Budapest",      country:"HU" },
  // ── Extra candidates for Resend quota ─────────────────────────────────────
  { slug:"scholz-v",       to:"info@s-v.de",                    agencyName:"Scholz & Volkmer",    city:"Wiesbaden",     country:"DE" },
  { slug:"pixelpark-de",   to:"info@pixelpark.com",             agencyName:"Pixelpark",           city:"Cologne",       country:"DE" },
  { slug:"designit-dk",    to:"info@designit.com",              agencyName:"Designit",            city:"Copenhagen",    country:"DK" },
  { slug:"futurice-fi",    to:"info@futurice.com",              agencyName:"Futurice",            city:"Helsinki",      country:"FI" },
  { slug:"solita-fi",      to:"info@solita.fi",                 agencyName:"Solita",              city:"Helsinki",      country:"FI" },
  { slug:"north-kingdom2", to:"info@northkingdom.com",          agencyName:"North Kingdom",       city:"Skellefteå",    country:"SE" },
  // ── More UK ───────────────────────────────────────────────────────────────
  { slug:"connect-group",  to:"hello@connectgroup.com",         agencyName:"Connect Group",       city:"Northampton",   country:"UK" },
  { slug:"appco-uk",       to:"hello@appco.co.uk",              agencyName:"Appco",               city:"London",        country:"UK" },
  { slug:"zebra-digital",  to:"hello@zebradigital.co.uk",       agencyName:"Zebra Digital",       city:"Cardiff",       country:"UK" },
  { slug:"hpe-uk",         to:"hello@hpe.com",                  agencyName:"HPE",                 city:"London",        country:"UK" },
  { slug:"ripple",         to:"hello@rippledigital.co.uk",       agencyName:"Ripple Digital",      city:"Newcastle",     country:"UK" },
  { slug:"pedalo",         to:"hello@pedalo.co.uk",             agencyName:"Pedalo",              city:"London",        country:"UK" },
  { slug:"we-are-lean",    to:"hello@wearelean.co.uk",          agencyName:"We Are Lean",         city:"Bristol",       country:"UK" },
  { slug:"tictail-uk",     to:"hello@tictail.com",              agencyName:"Tictail",             city:"London",        country:"UK" },
  { slug:"noisy-little",   to:"hello@noisymonkey.co.uk",        agencyName:"Noisy Monkey",        city:"Glasgow",       country:"UK" },
  { slug:"smashing",       to:"hello@smashingmagazine.com",     agencyName:"Smashing",            city:"Freiburg",      country:"DE" },
  { slug:"mookh",          to:"hello@mookh.com",                agencyName:"Mookh",               city:"London",        country:"UK" },
  { slug:"digital-next",   to:"hello@digitalnext.co.uk",        agencyName:"Digital Next",        city:"Manchester",    country:"UK" },
  { slug:"extreme-left",   to:"hello@extremeleft.com",          agencyName:"Extreme Left",        city:"London",        country:"UK" },
  { slug:"it-gmbh",        to:"info@itagency.de",               agencyName:"IT Agency",           city:"Berlin",        country:"DE" },
  // ── More NL ───────────────────────────────────────────────────────────────
  { slug:"dept-nw",        to:"info@deptagency.nl",             agencyName:"Dept NL",             city:"Rotterdam",     country:"NL" },
  { slug:"label305",       to:"info@label305.nl",               agencyName:"Label 305",           city:"Breda",         country:"NL" },
  { slug:"grrr-new",       to:"info@grrr.design",              agencyName:"GRRR",                city:"Amsterdam",     country:"NL" },
  { slug:"fonk",           to:"info@fonk.amsterdam",            agencyName:"Fonk",                city:"Amsterdam",     country:"NL" },
  { slug:"we-make",        to:"info@wemake.nl",                 agencyName:"We Make",             city:"Amsterdam",     country:"NL" },
  // ── More CZ / SK ──────────────────────────────────────────────────────────
  { slug:"truelogic",      to:"info@truelogic.cz",              agencyName:"TrueLogic",           city:"Prague",        country:"CZ" },
  { slug:"lundegaard",     to:"info@lundegaard.eu",             agencyName:"Lundegaard",          city:"Prague",        country:"CZ" },
  { slug:"ui42",           to:"info@ui42.sk",                   agencyName:"ui42",                city:"Bratislava",    country:"SK" },
  { slug:"bart-sk",        to:"info@bart.sk",                   agencyName:"Bart",                city:"Bratislava",    country:"SK" },
  { slug:"pixel-federation",to:"info@pixelfederation.com",      agencyName:"Pixel Federation",    city:"Bratislava",    country:"SK" },
  // ── More BE ───────────────────────────────────────────────────────────────
  { slug:"extenzo",        to:"info@extenzo.be",                agencyName:"Extenzo",             city:"Ghent",         country:"BE" },
  { slug:"studio-bonne",   to:"info@studiobonne.be",            agencyName:"Studio Bonne",        city:"Brussels",      country:"BE" },
  { slug:"crvw",           to:"info@crvw.be",                   agencyName:"CRVW",                city:"Brussels",      country:"BE" },
  { slug:"prophets",       to:"info@prophets.be",               agencyName:"Prophets",            city:"Antwerp",       country:"BE" },
  { slug:"these-days",     to:"info@thesedays.be",              agencyName:"These Days",          city:"Ghent",         country:"BE" },
]

// ─── 3. FULL DOMAIN DEDUP (all previous batches + suppress) ──────────────
const suppress = JSON.parse(readFileSync("scripts/suppress-list.json", "utf8")).map(e => e.toLowerCase())
const sentEmails = new Set(suppress)
const sentDomains = new Set()

for (let n = 1; n <= 15; n++) {
  const path = `scripts/leads-batch-${n}.json`
  if (!existsSync(path)) continue
  try {
    const batch = JSON.parse(readFileSync(path, "utf8"))
    batch.forEach(m => {
      sentEmails.add(m.to.toLowerCase())
      sentDomains.add(m.to.toLowerCase().split("@")[1])
    })
  } catch {}
}

const deduped = []
const seenEmails = new Set()
const seenDomains = new Set()

for (const l of ALL_CANDIDATES) {
  const email = l.to.toLowerCase()
  const domain = email.split("@")[1]
  if (sentEmails.has(email)) continue
  if (sentDomains.has(domain)) continue      // already contacted this company
  if (seenEmails.has(email)) continue
  if (seenDomains.has(domain)) continue
  seenEmails.add(email)
  seenDomains.add(domain)
  deduped.push(l)
}

console.log(`\n📋 ${deduped.length} unique new leads after full dedup\n`)

// ─── 4. V4 CONVERSION-OPTIMIZED TEMPLATE ─────────────────────────────────
const STACK = "Next.js · React · TypeScript · Node.js · Supabase · AI integrations · Headless CMS"

const regionTimezone = (country) => {
  if (["UK"].includes(country))                         return "UTC+3 — 2h overlap with UK mornings, async delivery all day."
  if (["NL","BE","LU","DE","AT","CZ","HU"].includes(country)) return "UTC+3 — 2h overlap with Central European mornings, async all day."
  if (["SE","NO","DK","FI"].includes(country))          return "UTC+3 — 2h overlap with Nordic mornings, async delivery all day."
  return "UTC+3 (Istanbul) — 2h overlap, async delivery throughout the day."
}

const regionOpening = (l) => {
  const map = {
    UK: `We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships.`,
    NL: `We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships.`,
    BE: `We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships.`,
    DE: `We're a development office in Istanbul reaching out to ${l.city}-based digital agencies about white label build partnerships.`,
    AT: `We're a development office in Istanbul reaching out to ${l.city}-based digital agencies about white label build partnerships.`,
    SE: `We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships.`,
    NO: `We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships.`,
    DK: `We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships.`,
    FI: `We're a development office in Istanbul reaching out to ${l.city}-based agencies about white label build partnerships.`,
    CZ: `We're a development office in Istanbul reaching out to ${l.city}-based digital agencies about white label build partnerships.`,
    HU: `We're a development office in Istanbul reaching out to ${l.city}-based digital agencies about white label build partnerships.`,
  }
  return map[l.country] || `We're a development office in Istanbul reaching out to agencies in ${l.city} about white label build partnerships.`
}

function buildMail(l, campaign) {
  const ctaUrl = `https://solmandigital.com.tr/en/white-label?utm_source=email&utm_medium=cold&utm_campaign=${campaign}&utm_content=${l.slug}`
  const waText = `Hi, I received your email about white label partnership and I'd like to learn more. (Ref: ${l.slug})`
  const waUrl = `https://wa.me/905439675250?text=${encodeURIComponent(waText)}`
  const tz = regionTimezone(l.country)
  const opening = regionOpening(l)

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
<div style="background:#0d0d0d;padding:20px 32px">
  <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></span>
  <span style="color:#666;font-size:12px;margin-left:8px">White Label Partner · Istanbul</span>
</div>
<div style="padding:32px">
  <p style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111">White Label Partnership</p>
  <p style="margin:0 0 20px;font-size:12px;color:#9b1c1c;font-weight:600;text-transform:uppercase;letter-spacing:.06em">for ${l.agencyName}</p>

  <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">${opening} You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.</p>

  <div style="background:#f9f9f9;border-left:3px solid #9b1c1c;padding:14px 18px;border-radius:0 6px 6px 0;margin:0 0 18px">
    <p style="margin:0;font-size:13px;color:#555;line-height:1.9">
      ↗ Scale without hiring — no overhead when briefs slow down<br>
      ↗ Add Next.js, React &amp; AI features your clients ask for without building in-house<br>
      ↗ No long-term commitment — start with one project to test the fit
    </p>
  </div>

  <p style="margin:0 0 18px;font-size:13px;color:#888;line-height:1.6"><strong style="color:#555">Stack:</strong> ${STACK}<br><strong style="color:#555">Timezone:</strong> ${tz}</p>

  <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7">We've delivered Next.js platforms, SaaS dashboards, and AI-powered builds for agencies across Europe. If there's a fit, a 15-minute intro is all it takes.</p>

  <table cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>
    <td style="padding-right:8px"><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">Book 15-min Intro</a></td>
    <td><a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">💬 WhatsApp</a></td>
  </tr></table>

  <p style="margin:0;font-size:12px;color:#aaa">Or just reply — you'll reach the person doing the work. If the timing isn't right, a quick "not now" works too.</p>
</div>
<div style="background:#f5f5f5;padding:14px 32px;border-top:1px solid #e5e5e5">
  <p style="margin:0;font-size:11px;color:#bbb">Solman Digital · Istanbul · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · <a href="mailto:info@solmandigital.com.tr?subject=Unsubscribe" style="color:#bbb">unsubscribe</a></p>
</div>
</div>`

  const text = `White Label Partnership — ${l.agencyName}

${opening} You bring the client, we build the product — under your brand, NDA-covered, invisible to your client.

↗ Scale without hiring — no overhead when briefs slow down
↗ Add Next.js, React & AI features your clients ask for without building in-house
↗ No long-term commitment — start with one project to test the fit

Stack: ${STACK}
Timezone: ${tz}

We've delivered Next.js platforms, SaaS dashboards, and AI-powered builds for agencies across Europe. If there's a fit, a 15-minute intro is all it takes.

Book a 15-min intro: ${ctaUrl}
WhatsApp: ${waUrl}

Or just reply — you'll reach the person doing the work. If the timing isn't right, a quick "not now" works too.

---
Solman Digital · Istanbul · solmandigital.com.tr
Unsubscribe: info@solmandigital.com.tr`

  return {
    to: l.to,
    subject: `White label partnership — development capacity for ${l.agencyName}`,
    html,
    text,
  }
}

// ─── 5. SEND VIA BREVO ────────────────────────────────────────────────────
async function sendBrevo(mail) {
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Solman Digital", email: "info@solmandigital.com.tr" },
      to: [{ email: mail.to }],
      replyTo: { email: "info@solmandigital.com.tr" },
      subject: mail.subject,
      htmlContent: mail.html,
      textContent: mail.text,
    })
  })
  return r.status
}

// ─── 6. SEND VIA RESEND ───────────────────────────────────────────────────
async function sendResend(mail) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Solman Digital <info@solmandigital.com.tr>",
      to: [mail.to],
      reply_to: "info@solmandigital.com.tr",
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    })
  })
  return r.status
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ─── 7. MAIN LOOP ─────────────────────────────────────────────────────────
const usedToday   = await getBrevoUsedToday()
const brevoRemain = Math.max(0, BREVO_LIMIT - usedToday)
const resendRemain = RESEND_LIMIT

console.log(`Brevo used today: ${usedToday} / ${BREVO_LIMIT} → ${brevoRemain} remaining`)
console.log(`Resend quota:     ${resendRemain} remaining`)
console.log(`Total sendable:   ${brevoRemain + resendRemain}\n`)

// Build all mails
const campaignBrevo  = "eu-whitelabel-3"
const campaignResend = "eu-whitelabel-4"

const brevoMails  = deduped.slice(0, brevoRemain).map(l => buildMail(l, campaignBrevo))
const resendMails = deduped.slice(brevoRemain, brevoRemain + resendRemain).map(l => buildMail(l, campaignResend))

console.log(`→ Brevo batch:  ${brevoMails.length} mails`)
console.log(`→ Resend batch: ${resendMails.length} mails\n`)

// Determine next batch numbers
let batchNum = 16
while (existsSync(`scripts/leads-batch-${batchNum}.json`)) batchNum++

// Save + send Brevo
let brevoOk = 0, brevoErr = 0
if (brevoMails.length > 0) {
  writeFileSync(`scripts/leads-batch-${batchNum}.json`, JSON.stringify(brevoMails, null, 2))
  console.log(`📤 Sending Brevo batch ${batchNum} (${brevoMails.length} mails)...`)
  for (let i = 0; i < brevoMails.length; i++) {
    const status = await sendBrevo(brevoMails[i])
    const ok = status >= 200 && status < 300
    ok ? brevoOk++ : brevoErr++
    console.log(`  ${ok ? "✓" : "✗"} [${i+1}/${brevoMails.length}] ${brevoMails[i].to} (${status})`)
    if (i < brevoMails.length - 1) await sleep(DELAY_MS)
  }
  console.log(`\n✅ Brevo batch ${batchNum}: ${brevoOk} sent, ${brevoErr} errors\n`)
  batchNum++
}

// Save + send Resend
let resendOk = 0, resendErr = 0
if (resendMails.length > 0) {
  writeFileSync(`scripts/leads-batch-${batchNum}.json`, JSON.stringify(resendMails, null, 2))
  console.log(`📤 Sending Resend batch ${batchNum} (${resendMails.length} mails)...`)
  for (let i = 0; i < resendMails.length; i++) {
    const status = await sendResend(resendMails[i])
    const ok = status >= 200 && status < 300
    ok ? resendOk++ : resendErr++
    console.log(`  ${ok ? "✓" : "✗"} [${i+1}/${resendMails.length}] ${resendMails[i].to} (${status})`)
    if (i < resendMails.length - 1) await sleep(DELAY_MS)
  }
  console.log(`\n✅ Resend batch ${batchNum}: ${resendOk} sent, ${resendErr} errors\n`)
}

const totalSent = brevoOk + resendOk
console.log(`\n🎯 TAMAMLANDI`)
console.log(`   Brevo:  ${brevoOk}/${brevoMails.length}`)
console.log(`   Resend: ${resendOk}/${resendMails.length}`)
console.log(`   Toplam: ${totalSent} mail gönderildi`)
