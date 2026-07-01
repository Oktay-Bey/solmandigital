import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)
const leads = JSON.parse(readFileSync("scripts/leads-batch-12.json", "utf8"))

// Preview: ilk 5 + son 5 yeterli, 101 mail tek emailde çok ağır olur
const sample = [...leads.slice(0, 5), ...leads.slice(-5)]
const html = sample.map((m, i) => `
<div style="border:2px solid #e0e0e0;border-radius:8px;margin:24px 0;padding:24px;background:#fafafa">
  <h3 style="margin:0 0 8px;font-size:13px;color:#888">[örnek ${i+1}/10] → ${m.to}</h3>
  <p style="margin:0 0 6px;font-size:12px;color:#555"><strong>Konu:</strong> ${m.subject}</p>
  ${m.html}
</div>`).join("")

const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({
    sender: { name: "Solman Digital", email: "info@solmandigital.com.tr" },
    to: [{ email: "solmanoktay@gmail.com" }],
    replyTo: { email: "info@solmandigital.com.tr" },
    subject: `PREVIEW — Batch 12: US x101 (10 örnek gösteriliyor)`,
    htmlContent: `<div style="max-width:720px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="background:#1a1a1a;color:#fff;padding:16px 24px;border-radius:8px;margin-bottom:24px">
        <strong>BATCH 12 PREVIEW — 10 örnek (toplam 101 mail)</strong><br>
        <span style="color:#aaa;font-size:13px">US ajansları · ${leads.length} alıcı · us-whitelabel-2</span><br>
        <span style="color:#fbbf24;font-size:13px">⚠ 101 mail — Brevo 300/gün limiti var, bugün başka batch atmadıysan tek seferde gider</span>
      </div>${html}</div>`
  })
})
const data = await res.json()
console.log(res.status, JSON.stringify(data))
