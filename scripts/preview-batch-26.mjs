import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)
const leads = JSON.parse(readFileSync("scripts/leads-batch-26.json", "utf8").replace(/^﻿/, ""))

const html = leads.map((m, i) => `
<div style="border:2px solid #e0e0e0;border-radius:8px;margin:24px 0;padding:24px;background:#fafafa">
  <h3 style="margin:0 0 8px;font-size:13px;color:#888">[${i+1}/${leads.length}] → ${m.to}</h3>
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
    subject: `PREVIEW — Batch 26: İstanbul Sağlık/Psikolog/Kurum — tipe göre uyarlı AI mesajı (${leads.length} mail)`,
    htmlContent: `<div style="max-width:720px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="background:#1a1a1a;color:#fff;padding:16px 24px;border-radius:8px;margin-bottom:24px">
        <strong>BATCH 26 PREVIEW — Onaylarsan gönderiyorum</strong><br>
        <span style="color:#aaa;font-size:13px">${leads.length} mail | Tipe göre uyarlanmış: klinik (hasta/randevu) · psikolog (danışan/seans) · kurum (talep)</span><br>
        <span style="color:#86efac;font-size:13px">Kaynak: web sitelerinden kazınmış + MX-doğrulanmış (find-emails → verify-found); sent + suppress temiz</span>
      </div>${html}</div>`
  })
})
const data = await res.json()
console.log(res.status, JSON.stringify(data))
