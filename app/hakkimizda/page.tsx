import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Code2, Zap, Target, Heart } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Hakkımızda — Solman Digital",
  description:
    "Solman Digital — 15+ canlı proje deneyimiyle özel yazılım ofisi. Sıfırdan e-ticaret, AI otomasyon, SaaS — aynı uzmanla, başından sonuna, net kapsam.",
  alternates: { canonical: `${siteConfig.url}/hakkimizda` },
  openGraph: { title: "Hakkımızda | Solman Digital", locale: "tr_TR" },
}

const values = [
  {
    icon: Zap,
    title: "Söz Verilen Hızda Teslim",
    desc: "Başlamadan önce kapsam netleşir, takvim belirlenir. Belirsizlik değil, taahhüt.",
  },
  {
    icon: Code2,
    title: "Sizin İçin Tasarlanan Yazılım",
    desc: "Her proje sıfırdan, sizin iş sürecinizi ve kullanıcılarınızı anlayarak tasarlanır. Kapsam size özel şekillenir.",
  },
  {
    icon: Target,
    title: "Doğrudan, Katmansız İletişim",
    desc: "Projenizi anlatan kişiyle değil, yapan kişiyle konuşursunuz. PM, account manager, aracı yok.",
  },
  {
    icon: Heart,
    title: "Teslim Sonrası Destek",
    desc: "Canlıya geçiş ile iş bitmiyor. Büyüyen yazılımın beraberinde getirdiği ihtiyaçlarda yanındayız.",
  },
]

const steps = [
  {
    num: "01",
    title: "İşinizi Anlıyoruz",
    desc: "Sektörünüzü, operasyonunuzu ve gerçek ihtiyacınızı dinleyerek başlıyoruz. Bu görüşmeden sizin için özel bir yol haritası çıkar.",
  },
  {
    num: "02",
    title: "Size Özel Tasarım",
    desc: "Dinlediklerimize göre mimari, teknoloji seçimi ve kapsam belirliyoruz. Her karar, sizin işinize göre alınır.",
  },
  {
    num: "03",
    title: "Doğrudan Geliştirme",
    desc: "Aynı uzmanla, aracısız iletişimle ilerliyoruz. Haftalık güncellemeler, şeffaf ve öngörülebilir süreç.",
  },
  {
    num: "04",
    title: "Teslim & Yanınızdayız",
    desc: "Söz verilen tarihte deploy, test ve lansman. Proje biter, destek bitmez.",
  },
]

export default function HakkimizdaPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="hero-grid">
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#9b1c1c",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              Kişiye &amp; Firmaya Özel Yazılım Stüdyosu
            </p>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
                letterSpacing: "-0.03em",
              }}
            >
              Sizi Dinleyerek
              <br />
              Başlıyoruz.
              <br />
              <span style={{ color: "#9b1c1c" }}>Sizin İçin İnşa Ediyoruz.</span>
            </h1>
            <p style={{ color: "#666666", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 520 }}>
              Her işletmenin sektörü, kullanıcısı ve operasyonel gerçekliği farklı. Solman Digital olarak
              önce sizi anlıyor, sonra tam ihtiyacınıza göre yazılım inşa ediyoruz — net kapsam,
              söz verilen takvim, başından sonuna aynı uzmanla.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#161616",
              border: "1px solid #2a2a2a",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {[
              { label: "Tamamlanan Proje", value: "15+" },
              { label: "Hizmet Alanı", value: "22" },
              { label: "Teknoloji", value: "15+" },
              { label: "Konum", value: "BEŞİKTAŞ" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.125rem 1.5rem",
                  borderBottom: i < 3 ? "1px solid #1e1e1e" : "none",
                }}
              >
                <span style={{ color: "#555555", fontSize: "0.85rem" }}>{stat.label}</span>
                <span
                  style={{
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span style={{ color: "#9b1c1c" }}>{stat.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hikayemiz */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#888888",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            Deneyim
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#111111",
              marginBottom: "2rem",
              letterSpacing: "-0.025em",
            }}
          >
            Uzmanlık Alanımız
          </h2>
          <div
            style={{
              color: "#555555",
              fontSize: "0.95rem",
              lineHeight: 1.85,
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <p>
              15&apos;ten fazla proje — Trendyol satıcı paneli, WordPress AI içerik motoru, QR menü SaaS,
              AI haber platformu — her biri farklı bir müşterinin farklı ihtiyacından doğdu.
              Her seferinde önce o işletmeyi anladık, sonra çözümü inşa ettik.
            </p>
            <p>
              Solman Digital olarak ihtiyacı dinleyen, teknik tasarımı yapan ve kodu yazan aynı uzmandır.
              Aracı yok, katman yok — projeniz başından teslime kadar tek odak noktasıdır.
            </p>
            <p>
              İyzico entegrasyonunda Türk kullanıcı alışkanlıkları, Trendyol API&apos;sinde satıcının
              operasyonel gerçekliği sahada kazanıldı. Bu bağlam doğrudan çözüme dönüşür —
              işinize özel kararlar, genel reçeteler değil.
            </p>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#f5f5f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              İlkelerimiz
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
              }}
            >
              Değerlerimiz
            </h2>
          </div>
          <div className="why-grid">
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e0e0e0",
                  borderRadius: 10,
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <v.icon size={18} color="#333333" />
                </div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışırız */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#888888",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
              Metodoloji
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.025em",
              }}
            >
              Çalışma Sürecimiz
            </h2>
            <p style={{ color: "#6b6b6b", marginTop: "0.75rem", fontSize: "0.875rem" }}>
              Sizi anlayarak başlıyor, teslim sonrasında da yanınızda kalıyoruz.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.num}>
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "#f0f0f0",
                    lineHeight: 1,
                    marginBottom: "1rem",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    width: 20,
                    height: 2,
                    backgroundColor: "#9b1c1c",
                    marginBottom: "0.875rem",
                  }}
                />
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.85rem", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0d0d0d", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
            }}
          >
            Birlikte çalışalım
          </h2>
          <p style={{ color: "#555555", marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Projenizi anlatın, en uygun çözümü birlikte planlayalım.
          </p>
          <Link
            href="/iletisim"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#9b1c1c",
              color: "#fff",
              padding: "0.875rem 2rem",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            İletişime Geç <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
