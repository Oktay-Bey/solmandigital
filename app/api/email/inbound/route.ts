import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"

const RESEND_API = "https://api.resend.com"

type ReceivingAttachment = {
  id: string
  filename: string
  size?: number
  content_type?: string
  download_url?: string
  expires_at?: string
}

type ReceivingEmail = {
  from?: string
  to?: string[] | string
  subject?: string
  text?: string
  html?: string
  attachments?: ReceivingAttachment[]
}

// Resend inbound webhook (email.received) SADECE metadata gönderir —
// gövde (text/html) ve ekler payload'da yoktur. Bunlar email_id ile
// GET /emails/receiving/{id} çağrısıyla ayrıca çekilir.
//
// DİKKAT: Webhook, Resend gövdeyi (text/html) parse edip kaydetmeden ÖNCE
// tetiklenebilir; o an endpoint boş text/html döner ve bildirim "Mesaj
// içeriği boş." çıkar. Bu yüzden gövde gelene kadar artan aralıkla retry edilir.
async function fetchReceivedEmail(emailId: string, tries = 4): Promise<ReceivingEmail | null> {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(`${RESEND_API}/emails/receiving/${emailId}`, {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    })
    if (!res.ok) {
      console.error("[inbound] içerik çekilemedi", emailId, res.status, await res.text())
      return null
    }
    const data: ReceivingEmail = await res.json()
    // Gövde geldiyse (veya son deneme) döndür; aksi halde bekleyip tekrar dene.
    if (data.text?.trim() || data.html?.trim() || i === tries - 1) return data
    await new Promise((r) => setTimeout(r, 1500 * (i + 1))) // 1.5s → 3s → 4.5s
  }
  return null
}

// Eklerin imzalı download_url'i kısa ömürlüdür (≈2 saat). Bildirim mailinde
// taze link vermek için her ek tekil endpoint'inden yeniden çekilir.
async function fetchAttachmentUrl(
  emailId: string,
  attachmentId: string,
): Promise<ReceivingAttachment | null> {
  const res = await fetch(
    `${RESEND_API}/emails/receiving/${emailId}/attachments/${attachmentId}`,
    { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } },
  )
  if (!res.ok) return null
  return res.json()
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const data = body.data ?? body
    const emailId: string | undefined = data.email_id ?? data.id

    // Metadata payload'dan; içerik için ayrı çağrı yapılır.
    const meta = emailId ? await fetchReceivedEmail(emailId) : null

    const from: string = meta?.from ?? data.from ?? "Bilinmeyen Gönderici"
    const subject: string = meta?.subject ?? data.subject ?? "(Konu yok)"
    const htmlBody: string = meta?.html ?? ""
    const textBody: string = meta?.text ?? ""
    const rawTo = meta?.to ?? data.to ?? ""
    const toList: string[] = Array.isArray(rawTo) ? rawTo : [rawTo]

    const previewText = textBody.slice(0, 1000).replace(/\n{3,}/g, "\n\n").trim()

    // Ekler: webhook payload'ında id/filename var; taze indirme linkini çek.
    const attachmentMeta: ReceivingAttachment[] = Array.isArray(data.attachments)
      ? data.attachments
      : meta?.attachments ?? []
    const attachments = emailId
      ? (
          await Promise.all(
            attachmentMeta.map(async (a) => {
              const full = await fetchAttachmentUrl(emailId, a.id)
              return { ...a, ...(full ?? {}) }
            }),
          )
        ).filter(Boolean)
      : attachmentMeta

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

    await resend.emails.send({
      from: `Solman Digital <${siteConfig.resendFromEmail}>`,
      to: siteConfig.adminEmail,
      replyTo: from,
      subject: `[Gelen Mail] ${subject}`,
      html: `
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
      `,
      text: `Gönderen: ${from}\nKonu: ${subject}\n\n${textBody}${
        attachments.length
          ? `\n\nEKLER:\n${attachments.map((a) => `- ${a.filename}${a.download_url ? ` → ${a.download_url}` : ""}`).join("\n")}`
          : ""
      }`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[inbound]", err)
    return NextResponse.json({ error: "İşlenemedi" }, { status: 500 })
  }
}
