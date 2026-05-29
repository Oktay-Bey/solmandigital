import * as React from "react"

type Props = {
  firstName: string
  websiteUrl: string
  siteUrl?: string
}

export default function AuditConfirmEmail({ firstName, websiteUrl, siteUrl = "https://solmandigital.com.tr" }: Props) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ücretsiz Site Analizi Talebi Alındı | Solman Digital</title>
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
                      Talebiniz Alındı, {firstName}!
                    </h1>
                    <p style={{ margin: "0 0 24px", fontSize: "15px", color: "#555555", lineHeight: "1.7" }}>
                      <strong>{websiteUrl}</strong> adresindeki sitenizin teknik SEO ve performans analizini ekibimize ilettik.
                    </p>

                    {/* Timeline */}
                    <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: "32px" }}>
                      {[
                        { step: "1", text: "Siteniz teknik SEO ve sayfa hızı açısından inceleniyor", time: "Bugün" },
                        { step: "2", text: "Rakip karşılaştırması ve iyileştirme önerileri hazırlanıyor", time: "Yarın" },
                        { step: "3", text: "Detaylı rapor e-posta ile gönderiliyor", time: "24 saat içinde" },
                      ].map((item) => (
                        <tr key={item.step}>
                          <td style={{ padding: "10px 0", verticalAlign: "top" }}>
                            <table cellPadding={0} cellSpacing={0}>
                              <tr>
                                <td style={{ paddingRight: "16px", verticalAlign: "top" }}>
                                  <div style={{
                                    width: 28, height: 28, borderRadius: "50%",
                                    backgroundColor: "#9b1c1c", color: "#ffffff",
                                    fontSize: "12px", fontWeight: 800,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    lineHeight: "28px", textAlign: "center",
                                  }}>
                                    {item.step}
                                  </div>
                                </td>
                                <td>
                                  <p style={{ margin: 0, fontSize: "14px", color: "#333333", fontWeight: 600 }}>{item.text}</p>
                                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#9b1c1c", fontWeight: 600 }}>{item.time}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      ))}
                    </table>

                    <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "0 0 24px" }} />

                    <p style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                      Daha Hızlı İlerlemek İster misiniz?
                    </p>
                    <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#555555", lineHeight: "1.7" }}>
                      30 dakikalık ücretsiz teknik danışmanlık seansı rezervasyonu yaparak projenizi doğrudan konuşabiliriz.
                    </p>
                    <a
                      href={`${siteUrl}/danismanlik`}
                      style={{ fontSize: "14px", color: "#9b1c1c", fontWeight: 600, textDecoration: "underline" }}
                    >
                      Danışmanlık Rezervasyonu Yap →
                    </a>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ backgroundColor: "#f5f5f5", borderRadius: "0 0 10px 10px", padding: "24px 40px", borderTop: "1px solid #e0e0e0" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#aaaaaa", lineHeight: "1.6" }}>
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
