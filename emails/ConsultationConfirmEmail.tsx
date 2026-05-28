import * as React from "react"

type Props = {
  firstName: string
  siteUrl?: string
}

export default function ConsultationConfirmEmail({ firstName, siteUrl = "https://solmandigital.com" }: Props) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Danışmanlık Talebi Alındı | Solman Digital</title>
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
                      Görüşme Talebiniz Alındı, {firstName}!
                    </h1>
                    <p style={{ margin: "0 0 28px", fontSize: "15px", color: "#555555", lineHeight: "1.7" }}>
                      30 dakikalık ücretsiz teknik danışmanlık seansı talebinizi aldık. En kısa sürede takvim linki ile size dönüş yapacağız.
                    </p>

                    {/* What to expect */}
                    <div style={{ backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "24px", marginBottom: "28px" }}>
                      <p style={{ margin: "0 0 16px", fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                        Görüşmede Neler Konuşacağız?
                      </p>
                      {[
                        "Projenizin kapsamı ve teknik gereksinimleri",
                        "Önerilen teknoloji yığını ve mimari kararlar",
                        "Tahmini süre ve bütçe aralığı",
                      ].map((item, i) => (
                        <p key={i} style={{ margin: "0 0 8px", fontSize: "14px", color: "#555555", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <span style={{ color: "#9b1c1c", fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {item}
                        </p>
                      ))}
                      <p style={{ margin: "16px 0 0", fontSize: "12px", color: "#888888", fontStyle: "italic" }}>
                        Bu bir satış görüşmesi değil — tamamen teknik danışmanlık odaklıdır.
                      </p>
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0 0 24px" }} />

                    <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#555555", lineHeight: "1.7" }}>
                      Beklemeden görüşmek isterseniz doğrudan e-posta ile ulaşabilirsiniz.
                    </p>
                    <a
                      href="mailto:info@solmandigital.com"
                      style={{ fontSize: "14px", color: "#9b1c1c", fontWeight: 600, textDecoration: "underline" }}
                    >
                      info@solmandigital.com
                    </a>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ backgroundColor: "#f5f5f5", borderRadius: "0 0 10px 10px", padding: "24px 40px", borderTop: "1px solid #e0e0e0" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#aaaaaa", lineHeight: "1.6" }}>
                      Soru için: <a href="mailto:info@solmandigital.com" style={{ color: "#9b1c1c" }}>info@solmandigital.com</a>
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
