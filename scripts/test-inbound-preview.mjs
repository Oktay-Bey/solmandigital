// Inbound route'un düzeltilmiş halini birebir simüle eder:
// email_id ile gerçek içeriği + ekleri çekip bildirim mailini gönderir.
import { readFileSync } from "node:fs"

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
const KEY = env.match(/^RESEND_API_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "")
const RESEND_API = "https://api.resend.com"

const EMAIL_ID = "1da32766-076c-4a07-8e7b-73a00040e40a"
const FROM_EMAIL = "info@solmandigital.com.tr"
const ADMIN_EMAIL = "solmanoktay@gmail.com"

async function api(path) {
  const res = await fetch(`${RESEND_API}${path}`, {
    headers: { Authorization: `Bearer ${KEY}` },
  })
  if (!res.ok) throw new Error(`${path} → ${res.status} ${await res.text()}`)
  return res.json()
}

const meta = await api(`/emails/receiving/${EMAIL_ID}`)
const from = meta.from
const subject = meta.subject
const htmlBody = meta.html ?? ""
const textBody = meta.text ?? ""
const toList = Array.isArray(meta.to) ? meta.to : [meta.to ?? ""]
const previewText = textBody.slice(0, 1000).replace(/\n{3,}/g, "\n\n").trim()

const attachmentMeta = meta.attachments ?? []
const attachments = await Promise.all(
  attachmentMeta.map(async (a) => ({
    ...a,
    ...(await api(`/emails/receiving/${EMAIL_ID}/attachments/${a.id}`)),
  })),
)

const attachmentsHtml = attachments.length
  ? `<div style="margin-top:24px;padding-top:20px;border-top:1px solid #f0f0f0">
      <p style="margin:0 0 10px;font-size:12px;color:#888;font-weight:600">EKLER (${attachments.length})</p>
      ${attachments
        .map(
          (a) =>
            `<p style="margin:0 0 6px;font-size:13px">
              📎 ${a.download_url ? `<a href="${a.download_url}" style="color:#9b1c1c;font-weight:600">${a.filename}</a>` : `<span style="color:#111;font-weight:600">${a.filename}</span>`}
              ${a.size ? `<span style="color:#aaa"> · ${(a.size / 1024).toFixed(0)} KB</span>` : ""}
              ${a.expires_at ? `<span style="color:#c0392b;font-size:11px"> · link ${new Date(a.expires_at).toLocaleString("tr-TR")} sonra geçersiz</span>` : ""}
            </p>`,
        )
        .join("")}
    </div>`
  : ""

const html = `
  <div style="font-family:system-ui,sans-serif;max-width:660px;margin:0 auto;background:#f5f5f5;padding:24px 16px">
    <div style="background:#0d0d0d;border-radius:10px 10px 0 0;padding:20px 32px">
      <p style="margin:0;color:#fff;font-size:16px;font-weight:800">
        Solman<span style="color:#9b1c1c">Digital</span>
        <span style="color:#888;font-weight:400;font-size:13px;margin-left:12px">Gelen Kutu</span>
      </p>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e8e8e8">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px">
        <tr><td style="color:#888;padding:4px 0;width:80px">Gönderen</td><td style="color:#111;font-weight:600"><a href="mailto:${from}" style="color:#9b1c1c">${from}</a></td></tr>
        <tr><td style="color:#888;padding:4px 0">Alıcı</td><td style="color:#555">${toList.join(", ")}</td></tr>
        <tr><td style="color:#888;padding:4px 0">Konu</td><td style="color:#111;font-weight:600">${subject}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 24px">
      ${htmlBody
        ? `<div style="font-size:14px;color:#333;line-height:1.7">${htmlBody}</div>`
        : previewText
          ? `<pre style="font-family:system-ui,sans-serif;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;margin:0">${previewText}${textBody.length > 1000 ? "\n\n[…mesaj devam ediyor]" : ""}</pre>`
          : `<p style="color:#aaa;font-style:italic">Mesaj içeriği boş.</p>`
      }
      ${attachmentsHtml}
    </div>
    <div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:16px 32px;border:1px solid #e8e8e8;border-top:none">
      <p style="margin:0;font-size:12px;color:#aaa">
        Yanıtlamak için <a href="mailto:${from}" style="color:#9b1c1c">${from}</a> adresine doğrudan yazın.
      </p>
    </div>
  </div>
`

const res = await fetch(`${RESEND_API}/emails`, {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    from: `Solman Digital <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    reply_to: from,
    subject: `[Gelen Mail] ${subject}`,
    html,
    text: `Gönderen: ${from}\nKonu: ${subject}\n\n${textBody}${
      attachments.length
        ? `\n\nEKLER:\n${attachments.map((a) => `- ${a.filename}${a.download_url ? ` → ${a.download_url}` : ""}`).join("\n")}`
        : ""
    }`,
  }),
})

const out = await res.json()
console.log(res.ok ? "✓ Önizleme gönderildi →" : "✗ Hata:", JSON.stringify(out))
console.log("  gövde uzunluğu:", textBody.length, "| ek sayısı:", attachments.length)
