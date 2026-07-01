import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

const BREVO_API_KEY = env.BREVO_API_KEY
if (!BREVO_API_KEY) { console.error("BREVO_API_KEY bulunamadı"); process.exit(1) }

const body = {
  sender: { name: "Solman Digital", email: "info@solmandigital.com.tr" },
  to: [{ email: "hi@305.nl" }],
  replyTo: { email: "info@solmandigital.com.tr" },
  subject: "Re: White label partnership — a different angle",
  htmlContent: `<div style="font-family:system-ui,sans-serif;max-width:600px;color:#333;line-height:1.7">
<p>Hi,</p>
<p>Thanks for the honest reply — appreciated.</p>
<p>If you're winding things down, there's often a gap between "we stopped taking clients" and "everything is wrapped up." Ongoing projects, handovers, last-mile deliverables — that kind of work.</p>
<p>If any of that is on your plate and you need a reliable development hand for the transition, we're here. No pitch, no commitment — just a practical option if the need comes up.</p>
<p>Either way, best of luck with whatever's next.</p>
<p style="margin-top:32px">Oktay<br>
<strong>Solman Digital</strong><br>
<a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a></p>
</div>`,
  textContent: `Hi,

Thanks for the honest reply — appreciated.

If you're winding things down, there's often a gap between "we stopped taking clients" and "everything is wrapped up." Ongoing projects, handovers, last-mile deliverables — that kind of work.

If any of that is on your plate and you need a reliable development hand for the transition, we're here. No pitch, no commitment — just a practical option if the need comes up.

Either way, best of luck with whatever's next.

Oktay
Solman Digital
solmandigital.com.tr`,
}

const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify(body),
})

if (!res.ok) {
  const err = await res.text()
  console.error("Hata:", res.status, err)
  process.exit(1)
}

const data = await res.json()
console.log("Gönderildi ✓ messageId:", data.messageId)
