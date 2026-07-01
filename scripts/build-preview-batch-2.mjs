// Tüm batch-2 maillerini tek bir önizleme mailine toplar → preview-batch-2.json
import { readFileSync, writeFileSync } from "node:fs"

const ADMIN = "solmanoktay@gmail.com"
const batch = JSON.parse(readFileSync(new URL("./leads-batch-2.json", import.meta.url), "utf8"))

const sections = batch.map((m, i) => `
  <div style="border:1px solid #e0e0e0;border-radius:8px;margin-bottom:32px;overflow:hidden">
    <div style="background:#f0f0f0;padding:12px 20px;border-bottom:1px solid #e0e0e0">
      <span style="font-size:12px;color:#888;font-family:monospace">${i + 1}/${batch.length}</span>
      <strong style="font-size:13px;color:#111;margin-left:8px">${m.to}</strong>
      <div style="font-size:12px;color:#555;margin-top:4px">${m.subject}</div>
    </div>
    <div style="padding:0">${m.html}</div>
  </div>
`).join("")

const html = `
<div style="font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;padding:32px 16px">
  <div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:24px 32px;margin-bottom:24px">
    <p style="margin:0;color:#fff;font-size:18px;font-weight:800">Solman<span style="color:#9b1c1c">Digital</span> — Batch 2 Önizleme</p>
    <p style="margin:8px 0 0;color:#aaa;font-size:13px">${batch.length} mail · Trendyol satıcıları · Onayladıktan sonra gerçek gönderim başlar</p>
  </div>
  ${sections}
</div>`

const message = [{
  to: ADMIN,
  subject: `[ONIZLEME batch-2] ${batch.length} mail — Trendyol satıcıları`,
  html,
  text: batch.map((m, i) => `--- ${i + 1}/${batch.length} | ${m.to} ---\nKonu: ${m.subject}\n\n${m.text}`).join("\n\n" + "=".repeat(60) + "\n\n"),
}]

writeFileSync(new URL("./preview-batch-2.json", import.meta.url), JSON.stringify(message, null, 2), "utf8")
console.log(`Önizleme hazır → scripts/preview-batch-2.json (${ADMIN})`)
