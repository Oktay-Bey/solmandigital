import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)
const leads = JSON.parse(readFileSync("scripts/leads-batch-8.json", "utf8"))

const html = leads.map((m, i) => `
<div style="border:2px solid #e0e0e0;border-radius:8px;margin:24px 0;padding:24px;background:#fafafa">
  <h3 style="margin:0 0 8px;font-size:13px;color:#888">[${i+1}/${leads.length}] → ${m.to}</h3>
  ${m.html}
</div>`).join("")

const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({
    sender: { name: "Solman Digital", email: "info@solmandigital.com.tr" },
    to: [{ email: "solmanoktay@gmail.com" }],
    replyTo: { email: "info@solmandigital.com.tr" },
    subject: `PREVIEW — Batch 8: BE/NL/LU/CH (${leads.length} mail)`,
    htmlContent: `<div style="max-width:700px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="background:#1a1a1a;color:#fff;padding:16px 24px;border-radius:8px;margin-bottom:24px">
        <strong>BATCH 8 PREVIEW</strong><br>
        <span style="color:#aaa;font-size:13px">${leads.length} mail | BE · NL · LU · CH</span>
      </div>${html}</div>`
  })
})
const data = await res.json()
console.log(res.status, JSON.stringify(data))
