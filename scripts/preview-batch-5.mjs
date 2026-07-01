// Batch 5 preview → solmanoktay@gmail.com
import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)
const SECRET = env.EMAIL_PUSH_SECRET

const leads = JSON.parse(readFileSync("scripts/leads-batch-5.json", "utf8"))

const previewHtml = leads.map((m, i) => `
<div style="border:2px solid #e0e0e0;border-radius:8px;margin:24px 0;padding:24px;background:#fafafa">
  <h3 style="margin:0 0 8px;font-size:13px;color:#888">[${i+1}/${leads.length}] → ${m.to}</h3>
  <h4 style="margin:0 0 16px;font-size:15px;color:#111">${m.subject}</h4>
  ${m.html}
</div>
`).join("")

const previewMsg = {
  to: "solmanoktay@gmail.com",
  subject: "PREVIEW — Batch 5: UK Ajansları (24 mail)",
  html: `<div style="max-width:700px;margin:0 auto;font-family:system-ui,sans-serif">
    <div style="background:#1a1a1a;color:#fff;padding:16px 24px;border-radius:8px;margin-bottom:24px">
      <strong>BATCH 5 PREVIEW — UK Ajansları</strong><br>
      <span style="color:#aaa;font-size:13px">24 mail | Campaign: uk-whitelabel-1 | Dil: İngilizce</span>
    </div>
    ${previewHtml}
  </div>`
}

const res = await fetch("https://solmandigital.com.tr/api/email/push", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": "Bearer " + SECRET },
  body: JSON.stringify({ messages: [previewMsg] })
})
const data = await res.json()
console.log("Status:", res.status)
console.log(JSON.stringify(data, null, 2))
