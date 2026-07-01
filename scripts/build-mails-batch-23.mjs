/**
 * build-mails-batch-23.mjs — İKİNCİ MAIL (follow-up)
 * Havuz: scripts/batch2-openers.json (ilk white-label mailini açan/tıklayan 89 ajans)
 * Strateji: düşük-sürtünme "tek proje testi" kancası, iki segment (clicked=sıcak / opened=ılık).
 * Çıktı: scripts/leads-batch-23.json
 */
import { readFileSync, writeFileSync } from "node:fs"

const CAMPAIGN = "eu-whitelabel-followup-1"
const pool = JSON.parse(readFileSync("scripts/batch2-openers.json", "utf8").replace(/^﻿/, ""))

// suppress (bounce/unsubscribe) son bir kez uygula
const suppress = new Set(
  JSON.parse(readFileSync("scripts/suppress-list.json", "utf8").replace(/^﻿/, "")).map(e => e.toLowerCase())
)

// domain'den okunabilir ajans adı türet (follow-up generic, isim opsiyonel)
function agencyFromDomain(domain) {
  const core = domain.split(".")[0].replace(/[-_]/g, " ")
  return core.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

function buildMail(l) {
  const agency = agencyFromDomain(l.domain)
  const slug = l.domain.replace(/\./g, "-")
  const hot = l.signal === "clicked"
  const ctaUrl = `https://solmandigital.com.tr/en/white-label?utm_source=email&utm_medium=cold&utm_campaign=${CAMPAIGN}&utm_content=${slug}`
  const waText = `Hi, about the white label partnership — I'd like to learn more. (Ref: ${slug})`
  const waUrl  = `https://wa.me/905439675250?text=${encodeURIComponent(waText)}`

  // Değer/fayda odaklı — takip/hatırlatıcı tavır YOK, süre belirtilmez ("our previous message").
  const opening = `In our previous message we shared how a white label build partnership could work for ${agency}. We wanted to come back to it because the real value shows up in what it lets your agency do.`

  const offer = `A white label partner means you can say yes to more — take on briefs you'd otherwise pass on, add Next.js, React and AI features your clients ask for, and grow capacity without growing payroll. We build under your brand, NDA-covered, invisible to your client. The simplest place to start is a single overflow project, so the value is something you see rather than take on trust.`

  const closing = hot
    ? `A 15-minute intro is enough to map out where this adds the most value for you — and a first project to prove it.`
    : `Whenever a brief comes up that this could unlock, we're here. A one-line reply is enough to start the conversation.`

  const subject = hot
    ? `White label partnership — more capacity for ${agency}`
    : `White label partnership — the value for ${agency}`

  const html = `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
<div style="background:#0d0d0d;padding:20px 32px">
  <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></span>
  <span style="color:#666;font-size:12px;margin-left:8px">White Label Partner · Istanbul</span>
</div>
<div style="padding:32px">
  <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">${opening}</p>
  <p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">${offer}</p>
  <div style="background:#f9f9f9;border-left:3px solid #9b1c1c;padding:14px 18px;border-radius:0 6px 6px 0;margin:0 0 18px">
    <p style="margin:0;font-size:13px;color:#555;line-height:1.9">
      ↗ Win briefs you'd otherwise turn down — more revenue, same headcount<br>
      ↗ Offer Next.js, React &amp; AI builds your clients ask for, under your brand<br>
      ↗ Scale capacity up or down by project — no fixed cost, NDA-covered
    </p>
  </div>
  <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7">${closing}</p>
  <table cellpadding="0" cellspacing="0" style="margin-bottom:20px"><tr>
    <td style="padding-right:8px"><a href="${ctaUrl}" style="display:inline-block;background:#9b1c1c;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">${hot ? "Book 15-min Intro" : "See how it works"}</a></td>
    <td><a href="${waUrl}" style="display:inline-block;background:#25d366;color:#fff;padding:11px 22px;border-radius:7px;font-size:14px;font-weight:700;text-decoration:none">💬 WhatsApp</a></td>
  </tr></table>
  <p style="margin:0;font-size:12px;color:#aaa">Or just reply — you'll reach the person doing the work. If it's not for you, a quick "not now" is totally fine.</p>
</div>
<div style="background:#f5f5f5;padding:14px 32px;border-top:1px solid #e5e5e5">
  <p style="margin:0;font-size:11px;color:#bbb">Solman Digital · Istanbul · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a> · <a href="mailto:info@solmandigital.com.tr?subject=Unsubscribe" style="color:#bbb">unsubscribe</a></p>
</div>
</div>`

  const text = `${opening}

${offer}

↗ Win briefs you'd otherwise turn down — more revenue, same headcount
↗ Offer Next.js, React & AI builds your clients ask for, under your brand
↗ Scale capacity up or down by project — no fixed cost, NDA-covered

${closing}

${hot ? "Book a 15-min intro" : "See how it works"}: ${ctaUrl}
WhatsApp: ${waUrl}

Or just reply. If it's not for you, a quick "not now" is totally fine.

---
Solman Digital · Istanbul · solmandigital.com.tr
Unsubscribe: info@solmandigital.com.tr`

  return { to: l.email, subject, html, text, _signal: l.signal }
}

// dedup + suppress
const seen = new Set()
const mails = []
for (const l of pool) {
  const e = l.email.toLowerCase()
  if (suppress.has(e) || seen.has(e)) continue
  seen.add(e)
  mails.push(buildMail({ ...l, email: e }))
}

// sıcak önce
mails.sort((a, b) => (a._signal === "clicked" ? 0 : 1) - (b._signal === "clicked" ? 0 : 1))

writeFileSync("scripts/leads-batch-23.json", JSON.stringify(mails, null, 2))
const hot = mails.filter(m => m._signal === "clicked").length
console.log(`✓ leads-batch-23.json — ${mails.length} follow-up mail`)
console.log(`  🔥 tıklayan (sıcak): ${hot}`)
console.log(`  · açan (ılık)      : ${mails.length - hot}`)
console.log(`  Kampanya: ${CAMPAIGN} → /en/white-label`)
