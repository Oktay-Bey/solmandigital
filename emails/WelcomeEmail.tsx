import * as React from "react"

type Props = {
  firstName: string
  downloadUrl: string
  siteUrl?: string
}

export default function WelcomeEmail({ firstName, downloadUrl, siteUrl = "https://solmandigital.com.tr" }: Props) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>E-Ticaret Başlangıç Rehberi | Solman Digital</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#f5f5f5", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: "#f5f5f5", padding: "32px 16px" }}>
          <tr>
            <td align="center">
              <table width="600" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, width: "100%" }}>
                {/* Header */}
                <tr>
                  <td style={{ backgroundColor: "#0d0d0d", borderRadius: "10px 10px 0 0", padding: "32px 40px" }}>
                    <p style={{ margin: 0, color: "#ffffff", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em" }}>
                      Solman<span style={{ color: "#9b1c1c" }}>Digital</span>
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td style={{ backgroundColor: "#ffffff", padding: "40px" }}>
                    <h1 style={{ margin: "0 0 16px", fontSize: "24px", fontWeight: 800, color: "#111111", letterSpacing: "-0.02em" }}>
                      Merhaba {firstName}! 👋
                    </h1>
                    <p style={{ margin: "0 0 24px", fontSize: "15px", color: "#555555", lineHeight: "1.7" }}>
                      <strong>E-Ticaret Başlangıç Rehberi</strong>'ni indirdiğiniz için teşekkürler. Türkiye'de e-ticaret kurmanın 47 adımını içeren bu rehber aşağıdaki butona tıklayarak indirebilirsiniz.
                    </p>

                    <table width="100%" cellPadding={0} cellSpacing={0}>
                      <tr>
                        <td align="center" style={{ padding: "8px 0 32px" }}>
                          <a
                            href={downloadUrl}
                            style={{
                              display: "inline-block",
                              backgroundColor: "#9b1c1c",
                              color: "#ffffff",
                              padding: "14px 32px",
                              borderRadius: "7px",
                              fontWeight: 700,
                              fontSize: "15px",
                              textDecoration: "none",
                              letterSpacing: "0.01em",
                            }}
                          >
                            Rehberi İndir →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0 0 24px" }} />

                    <p style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                      Sıradaki Adım: Ücretsiz Site Analizi
                    </p>
                    <p style={{ margin: "0 0 24px", fontSize: "14px", color: "#555555", lineHeight: "1.7" }}>
                      Rehberi okuduktan sonra mevcut web sitenizin teknik SEO ve performans durumunu ücretsiz analiz ettirmek ister misiniz? 24 saat içinde detaylı rapor gönderiyoruz.
                    </p>
                    <a
                      href={`${siteUrl}/ucretsiz-analiz`}
                      style={{ fontSize: "14px", color: "#9b1c1c", fontWeight: 600, textDecoration: "underline" }}
                    >
                      Ücretsiz Analiz İste →
                    </a>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ backgroundColor: "#f5f5f5", borderRadius: "0 0 10px 10px", padding: "24px 40px", borderTop: "1px solid #e0e0e0" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#aaaaaa", lineHeight: "1.6" }}>
                      Bu e-postayı <strong>solmandigital.com.tr</strong> üzerinden bir rehber indirdiğiniz için alıyorsunuz.
                      <br />
                      Soru için: <a href="mailto:info@solmandigital.com.tr" style={{ color: "#9b1c1c" }}>info@solmandigital.com.tr</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
