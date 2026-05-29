import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Kerem Aydın",
    role: "Kurucu",
    company: "E-Ticaret Girişimi",
    text: "Trendyol ve Hepsiburada entegrasyonunu 2 haftada teslim ettiler. Stok senkronizasyonu artık tamamen otomatik, manuel işlemlerimiz neredeyse sıfıra indi.",
    stars: 5,
  },
  {
    name: "Selin Öztürk",
    role: "Genel Müdür",
    company: "Kurumsal Hizmetler",
    text: "Birkaç ajansla görüştük ama doğrudan geliştiriciyle çalışmanın farkı ortaya çıktı. Brief'i anında kavradı, hiç gidip gelmeden 10 günde siteyi canlıya aldık.",
    stars: 5,
  },
  {
    name: "Murat Çelik",
    role: "CTO",
    company: "SaaS Startup",
    text: "MVP'mizi 6 haftada bitirdi. Kod kalitesi yüksek, supabase mimarisi temiz. Yatırımcı sunumuna hazır bir ürünle çıktık.",
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#555555",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "#9b1c1c" }} />
            Müşteri Görüşleri
          </p>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              maxWidth: 560,
            }}
          >
            Birlikte çalıştığımız
            <br />
            <span style={{ color: "#9b1c1c" }}>ne dediler?</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                backgroundColor: "#161616",
                border: "1px solid #2a2a2a",
                borderRadius: 10,
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.25rem" }}>
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>

              <p
                style={{
                  color: "#aaaaaa",
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid #222222",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#9b1c1c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ color: "#ffffff", fontSize: "0.825rem", fontWeight: 700 }}>{t.name}</p>
                  <p style={{ color: "#555555", fontSize: "0.75rem" }}>
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
