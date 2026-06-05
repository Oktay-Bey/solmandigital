const counters = [
  { number: "50+", label: "Tamamlanan Proje" },
  { number: "35+", label: "Memnun Müşteri" },
  { number: "3+", label: "Yıl Deneyim" },
  { number: "24s", label: "Ortalama Yanıt Süresi" },
]

export default function SocialProofCounters() {
  return (
    <section style={{ padding: "3.5rem 1.5rem", backgroundColor: "#0a0a0a", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "2rem",
          textAlign: "center",
        }}
      >
        {counters.map((c) => (
          <div key={c.label}>
            <p
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {c.number}
            </p>
            <p style={{ color: "#555555", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {c.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
