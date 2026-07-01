/**
 * preview-batch-23.mjs — Batch 23 (follow-up) önizlemesi
 * Tüm follow-up maillerini solmanoktay@gmail.com'a tek mailde gönderir. Onay beklenir.
 */
import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)
const leads = JSON.parse(readFileSync("scripts/leads-batch-23.json", "utf8").replace(/^﻿/, ""))

const block = (m, i, total) => `
<div style="border:2px solid ${m._signal === "clicked" ? "#9b1c1c" : "#d0d0d0"};border-radius:8px;margin:24px 0;padding:24px;background:#fafafa">
  <h3 style="margin:0 0 8px;font-size:13px;color:#888">[örnek ${i+1}/${total}] ${m._signal === "clicked" ? "🔥 TIKLAYAN" : "· açan"} → ${m.to}</h3>
  <p style="margin:0 0 6px;font-size:12px;color:#555"><strong>Konu:</strong> ${m.subject}</p>
  ${m.html}
</div>`

// Önizleme için tüm batch'i değil, temsilî 10 örnek gönder (sıcak + ılık dengeli).
const SAMPLE = 10
const hotAll  = leads.filter(m => m._signal === "clicked")
const warmAll = leads.filter(m => m._signal === "opened")
const hot  = hotAll.slice(0, Math.ceil(SAMPLE / 2))
const warm = warmAll.slice(0, SAMPLE - hot.length)
const sample = [...hot, ...warm]
const html = sample.map((m, i) => block(m, i, sample.length)).join("")

const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({
    sender: { name: "Solman Digital", email: "info@solmandigital.com.tr" },
    to: [{ email: "solmanoktay@gmail.com" }],
    replyTo: { email: "info@solmandigital.com.tr" },
    subject: `PREVIEW — Batch 23: White-label FOLLOW-UP (${sample.length} örnek / ${leads.length} toplam)`,
    htmlContent: `<div style="max-width:720px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="background:#1a1a1a;color:#fff;padding:16px 24px;border-radius:8px;margin-bottom:24px">
        <strong>BATCH 23 PREVIEW — İKİNCİ MAIL (follow-up)</strong><br>
        <span style="color:#fbbf24;font-size:13px">⚠ ${sample.length} TEMSİLÎ ÖRNEK gösteriliyor — gerçek gönderim ${leads.length} ajansa yapılır</span><br>
        <span style="color:#aaa;font-size:13px">Havuz: ilk white-label mailini AÇAN/TIKLAYAN (${hotAll.length} sıcak / ${warmAll.length} ılık)</span><br>
        <span style="color:#86efac;font-size:13px">Kanca: düşük-sürtünme "tek proje testi" · 2 segment · /en/white-label · 305.nl excluded</span><br>
        <span style="color:#fca5a5;font-size:13px">Onaylarsan: node scripts/email-push.mjs scripts/leads-batch-23.json</span>
      </div>${html}</div>`
  })
})
const data = await res.json()
console.log(res.status, JSON.stringify(data))
console.log(res.ok ? "\n✓ Önizleme gönderildi → solmanoktay@gmail.com — onayını bekliyorum." : "\n✗ Önizleme gönderilemedi.")
