import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { getRehberByCategory } from "@/lib/data/rehber"
import type { RehberCategory } from "@/lib/data/rehber"

type Props = {
  category: RehberCategory | RehberCategory[]
  title?: string
  intro?: string
  limit?: number
  theme?: "light" | "dark"
}

// Landing sayfalarına ilgili rehberleri bağlar — dönüşmeye hazır olmayan
// ziyaretçiye next-click verir (bounce ↓, PV/kullanıcı ↑, içerik→hizmet iç linkleme).
export default function RelatedGuides({
  category,
  title = "Konuyla İlgili Rehberler",
  intro = "Karar vermeden önce, gerçek proje deneyiminden derlenen rehberlerimize göz atın.",
  limit = 3,
  theme = "light",
}: Props) {
  const guides = getRehberByCategory(category, limit)
  if (guides.length === 0) return null

  const dark = theme === "dark"
  const cls = {
    section: dark ? "bg-dark-500 px-6 py-20" : "bg-white px-6 py-20",
    eyebrow: dark
      ? "mb-3 flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700"
      : "eyebrow mb-3 flex items-center gap-1.5",
    h2: dark
      ? "mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-white"
      : "mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900",
    intro: dark ? "mb-10 text-[0.9rem] leading-[1.7] text-ondark-muted" : "mb-10 text-[0.9rem] leading-[1.7] text-ink-500",
    card: dark
      ? "group flex flex-col gap-3 rounded-[10px] border border-dark-50 bg-dark-400 p-5 transition-colors hover:border-accent-700"
      : "card-interactive group flex flex-col gap-3",
    cardTitle: dark ? "text-[0.95rem] font-bold leading-tight text-white" : "text-[0.95rem] font-bold leading-tight text-ink-900",
    cardDesc: dark
      ? "line-clamp-3 text-[0.85rem] leading-[1.6] text-ondark-muted"
      : "line-clamp-3 text-[0.85rem] leading-[1.6] text-ink-500",
    meta: dark ? "mt-auto flex items-center gap-2 text-[0.75rem] text-ondark-faint" : "mt-auto flex items-center gap-2 text-[0.75rem] text-ink-400",
  }

  return (
    <section className={cls.section}>
      <div className="mx-auto max-w-[900px]">
        <p className={cls.eyebrow}>
          <BookOpen size={13} className="text-accent-700" /> Rehberler
        </p>
        <h2 className={cls.h2}>{title}</h2>
        <p className={cls.intro}>{intro}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {guides.map((g) => (
            <Link key={g.slug} href={`/rehber/${g.slug}`} className={cls.card}>
              <p className={cls.cardTitle}>{g.title}</p>
              <p className={cls.cardDesc}>{g.description}</p>
              <span className={cls.meta}>
                <Clock size={11} /> {g.readTime} dakika okuma
                <ArrowRight size={13} className="ml-auto text-accent-700 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
