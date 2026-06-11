import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()

    const data = body.data ?? body
    const from: string = data.from ?? "Bilinmeyen Gönderici"
    const subject: string = data.subject ?? "(Konu yok)"
    const textBody: string = data.text ?? ""
    const htmlBody: string = data.html ?? ""
    const toList: string[] = Array.isArray(data.to) ? data.to : [data.to ?? ""]

    const previewText = textBody.slice(0, 300).replace(/\n{3,}/g, "\n\n").trim()

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
                ? `<pre style="font-family:system-ui,sans-serif;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;margin:0">${previewText}${textBody.length > 300 ? "\n\n[…mesaj devam ediyor]" : ""}</pre>`
                : `<p style="color:#aaa;font-style:italic">Mesaj içeriği boş.</p>`
            }
          </div>
          <div style="background:#f5f5f5;border-radius:0 0 10px 10px;padding:16px 32px;border:1px solid #e8e8e8;border-top:none">
            <p style="margin:0;font-size:12px;color:#aaa">
              Yanıtlamak için <a href="mailto:${from}" style="color:#9b1c1c">${from}</a> adresine doğrudan yazın.
            </p>
          </div>
        </div>
      `,
      text: `Gönderen: ${from}\nKonu: ${subject}\n\n${textBody}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[inbound]", err)
    return NextResponse.json({ error: "İşlenemedi" }, { status: 500 })
  }
}
