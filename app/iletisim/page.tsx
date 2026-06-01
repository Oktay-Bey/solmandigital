import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircle, Mail, Clock, CheckCircle2, Shield } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "İletişim — Projenizi Birlikte Planlayalım",
  description:
    "Projenizi anlatın, size özel ücretsiz değerlendirme yapıyoruz. 24 saat içinde dönüş, taahhütsüz görüşme.",
  alternates: { canonical: `${siteConfig.url}/iletisim` },
  openGraph: { title: "İletişim | Solman Digital", locale: "tr_TR" },
}

const nextSteps = [
  {
    num: "01",
    title: "Mesajınızı okuyoruz",
    desc: "Projenizi, sektörünüzü ve ihtiyacınızı anlıyoruz.",
  },
  {
    num: "02",
    title: "Size özel değerlendirme",
    desc: "Teknik fizibilite, yaklaşık süre ve kapsam üzerine ilk düşüncelerimizi hazırlıyoruz.",
  },
  {
    num: "03",
    title: "24 saat içinde dönüyoruz",
    desc: "Birlikte konuşmak ister misiniz sorusunu soruyoruz — baskı değil, davet.",
  },
]

export default function IletisimPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Üst rozet */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "İlk Görüşme Ücretsiz" },
              { label: "24s İçinde Dönüş" },
              { label: "Taahhütsüz" },
            ].map((badge) => (
              <div
                key={badge.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: "#161616",
                  border: "1px solid #2a2a2a",
                  borderRadius: 20,
                  padding: "0.35rem 0.875rem",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#16a34a" }} />
                <span style={{ color: "#aaaaaa", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.04em" }}>
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              letterSpacing: "-0.03em",
              maxWidth: 700,
            }}
          >
            Projenizi birlikte
            <br />
            <span style={{ color: "#9b1c1c" }}>planlayalım.</span>
          </h1>

          <p
            style={{
              color: "#777777",
              fontSize: "1rem",
              lineHeight: 1.8,
              maxWidth: 560,
              marginBottom: "0",
            }}
          >
            Bu bir satış görüşmesi değil. Projenizi dinleyeceğiz, teknik açıdan değerlendireceğiz
            ve size dürüst bir görüş sunacağız — ister devam edin, ister etmeyin.
          </p>
        </div>
      </section>

      {/* Ana İçerik */}
      <section style={{ padding: "3.5rem 1.5rem 5rem", backgroundColor: "#f5f5f5" }}>
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "2rem",
            alignItems: "start",
          }}
          className="two-col-grid"
        >
          {/* Sol: Form */}
          <div>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: 12,
                padding: "2.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "#111111",
                  marginBottom: "0.375rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Projenizi Anlatın
              </h2>
              <p style={{ color: "#999999", fontSize: "0.825rem", marginBottom: "2rem", lineHeight: 1.6 }}>
                Teknik bilgi gerekmez. &quot;Şunu yapmak istiyorum&quot; yeterli — geri kalanını biz soracağız.
              </p>
              <ContactForm />
            </div>

            {/* Güvence çizgisi */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
                padding: "0 0.25rem",
              }}
            >
              <Shield size={13} color="#aaaaaa" />
              <span style={{ color: "#aaaaaa", fontSize: "0.72rem" }}>
                Bilgileriniz üçüncü taraflarla paylaşılmaz. Spam göndermiyoruz.
              </span>
            </div>
          </div>

          {/* Sağ: Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* WhatsApp — En Öncelikli */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                backgroundColor: "#0d1f13",
                border: "1px solid #166534",
                borderRadius: 10,
                padding: "1.5rem",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: "#166534",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle size={18} color="#4ade80" />
                </div>
                <div>
                  <p style={{ color: "#4ade80", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    En Hızlı Yol
                  </p>
                  <p style={{ color: "#ffffff", fontSize: "0.9rem", fontWeight: 700 }}>WhatsApp ile Yazın</p>
                </div>
              </div>
              <p style={{ color: "#86efac", fontSize: "0.8rem", marginBottom: "0.875rem", lineHeight: 1.5 }}>
                Birkaç mesajla projenizi paylaşın — hemen değerlendiriyoruz.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ color: "#4ade80", fontSize: "0.85rem", fontWeight: 700 }}>{siteConfig.whatsappDisplay}</span>
                <ArrowRight size={14} color="#4ade80" />
              </div>
            </a>

            {/* Sonraki Adımlar */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: 10,
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#888888",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "1.25rem",
                }}
              >
                Sonra Ne Olur?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {nextSteps.map((step) => (
                  <div key={step.num} style={{ display: "flex", gap: "0.875rem" }}>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        color: "#9b1c1c",
                        minWidth: 20,
                        paddingTop: "0.1rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111111", marginBottom: "0.2rem" }}>
                        {step.title}
                      </p>
                      <p style={{ fontSize: "0.775rem", color: "#888888", lineHeight: 1.5 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yanıt Garantisi */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: 10,
                padding: "1.25rem 1.5rem",
                display: "flex",
                gap: "0.875rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Clock size={16} color="#333333" />
              </div>
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111111", marginBottom: "0.2rem" }}>
                  24 Saat İçinde Dönüş
                </p>
                <p style={{ fontSize: "0.775rem", color: "#888888", lineHeight: 1.5 }}>
                  İş günlerinde mesajınıza en geç 24 saat içinde yanıt veriyoruz.
                </p>
              </div>
            </div>

            {/* E-posta */}
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: 10,
                padding: "1.25rem 1.5rem",
                display: "flex",
                gap: "0.875rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={16} color="#333333" />
              </div>
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111111", marginBottom: "0.2rem" }}>
                  E-posta ile de yazabilirsiniz
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  style={{ color: "#9b1c1c", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Güven Bloku */}
      <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #ebebeb", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#888888",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            Neden Şimdi Yazmalısınız?
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                icon: CheckCircle2,
                title: "Fikir aşamasında olmanız yeterli",
                desc: "Detaylı teknik bilgi veya hazır kapsam belgesi gerekmez. Neye ihtiyaç duyduğunuzu birlikte netleştiriyoruz.",
              },
              {
                icon: CheckCircle2,
                title: "Projenizi yapacak kişiyle konuşuyorsunuz",
                desc: "Satış temsilcisi değil — sizi dinleyen ve projenizi inşa edecek uzmanla doğrudan iletişim.",
              },
              {
                icon: CheckCircle2,
                title: "Değerlendirme tamamen ücretsiz",
                desc: "İlk görüşme ve teknik fizibilite değerlendirmesi için hiçbir ücret alınmaz, taahhüt beklenmez.",
              },
              {
                icon: CheckCircle2,
                title: "Karar vermek zorunda değilsiniz",
                desc: "Teklifi aldıktan sonra düşünmek, beklemek ya da vazgeçmek tamamen serbestsiniz.",
              },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "0.875rem" }}>
                <item.icon size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111111", marginBottom: "0.3rem" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#777777", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section
        style={{
          backgroundColor: "#0d0d0d",
          padding: "4rem 1.5rem",
          textAlign: "center",
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p style={{ color: "#555555", fontSize: "0.85rem", marginBottom: "0.75rem", letterSpacing: "0.04em" }}>
            Hâlâ kararsızsanız
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
            }}
          >
            Önce hizmetlerimize göz atın
          </h2>
          <p style={{ color: "#555555", fontSize: "0.875rem", marginBottom: "2rem", lineHeight: 1.7 }}>
            Ne tür projeler geliştirdiğimizi görmek, karar vermenizi kolaylaştırabilir.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/portfoy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#9b1c1c",
                color: "#fff",
                padding: "0.875rem 1.75rem",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
            >
              Projeleri İncele <ArrowRight size={15} />
            </Link>
            <Link
              href="/hizmetler"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid #2a2a2a",
                color: "#888888",
                padding: "0.875rem 1.75rem",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Hizmetler
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
