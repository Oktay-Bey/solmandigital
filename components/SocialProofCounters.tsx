const counters = [
  { number: "50+", label: "Tamamlanan Proje" },
  { number: "35+", label: "Memnun Müşteri" },
  { number: "3+", label: "Yıl Deneyim" },
  { number: "24s", label: "Ortalama Yanıt Süresi" },
]

export default function SocialProofCounters() {
  return (
    <section className="border-y border-dark-200 bg-[#0a0a0a] px-6 py-14">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8 text-center">
        {counters.map((c) => (
          <div key={c.label}>
            <p className="mb-2 text-[clamp(2rem,4vw,2.75rem)] font-black leading-none tracking-tight text-white">
              {c.number}
            </p>
            <p className="text-[0.8rem] font-semibold uppercase tracking-wider text-ink-500">
              {c.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
