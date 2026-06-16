import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { getRehberByCategory } from "@/lib/data/rehber"
import type { RehberCategory } from "@/lib/data/rehber"

type Props = {
  category: RehberCategory | RehberCategory[]
  title?: string
  intro?: string
  limit?: number
}

// Landing sayfalarına ilgili rehberleri bağlar — dönüşmeye hazır olmayan
// ziyaretçiye next-click verir (bounce ↓, PV/kullanıcı ↑, içerik→hizmet iç linkleme).
export default function RelatedGuides({
  category,
  title = "Konuyla İlgili Rehberler",
  intro = "Karar vermeden önce, gerçek proje deneyiminden derlenen rehberlerimize göz atın.",
  limit = 3,
}: Props) {
  const guides = getRehberByCategory(category, limit)
  if (guides.length === 0) return null

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[900px]">
        <p className="eyebrow mb-3 flex items-center gap-1.5">
          <BookOpen size={13} className="text-accent-700" /> Rehberler
        </p>
        <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
          {title}
        </h2>
        <p className="mb-10 text-[0.9rem] leading-[1.7] text-ink-500">{intro}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/rehber/${g.slug}`}
              className="card-interactive group flex flex-col gap-3"
            >
              <p className="text-[0.95rem] font-bold leading-tight text-ink-900">{g.title}</p>
              <p className="line-clamp-3 text-[0.85rem] leading-[1.6] text-ink-500">{g.description}</p>
              <span className="mt-auto flex items-center gap-2 text-[0.75rem] text-ink-400">
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
