import Link from "next/link"
import { ArrowRight } from "lucide-react"
import * as Icons from "lucide-react"
import type { Service } from "@/lib/data/services"

type Props = {
  service: Service
  featured?: boolean
}

export default function ServiceCard({ service }: Props) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon]

  return (
    <Link
      href={`/hizmetler/${service.slug}`}
      className="card card-interactive group relative flex flex-col overflow-hidden p-7 hover:border-accent-700"
    >
      {/* Popüler Badge */}
      {service.tier === 1 && (
        <span className="absolute right-3.5 top-3.5 rounded-[3px] bg-accent-700 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
          Popüler
        </span>
      )}

      {/* Icon */}
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-ink-100 text-ink-700 transition-colors group-hover:bg-accent-50 group-hover:text-accent-700">
        {IconComponent && <IconComponent size={22} />}
      </div>

      {/* Category */}
      <span className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink-400">
        {service.category}
      </span>

      {/* Title */}
      <h3
        className={`mb-3 text-base font-bold leading-tight tracking-tight text-ink-900 ${
          service.tier === 1 ? "pr-12" : ""
        }`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="mb-5 flex-1 text-sm leading-relaxed text-ink-500">
        {service.shortDesc}
      </p>

      {/* Tech Stack */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {service.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded border border-ink-100 bg-surface px-2.5 py-0.5 text-[0.68rem] font-semibold text-ink-500"
          >
            {tech}
          </span>
        ))}
        {service.techStack.length > 3 && (
          <span className="rounded border border-ink-100 bg-surface px-2.5 py-0.5 text-[0.68rem] font-semibold text-ink-500">
            +{service.techStack.length - 3}
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-wide text-accent-700">
        İncele
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}
