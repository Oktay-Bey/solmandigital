import Link from "next/link"
import { ArrowRight, Download, Search, Calendar } from "lucide-react"
import type { LeadMagnet } from "@/lib/data/leadMagnets"

const variantConfig = {
  download: {
    icon: Download,
    wrap: "bg-green-50 border-green-200",
    iconBox: "border-green-200",
    iconColor: "#16a34a",
    label: "text-green-700",
    text: "Ücretsiz Rehber",
  },
  audit: {
    icon: Search,
    wrap: "bg-orange-50 border-orange-200",
    iconBox: "border-orange-200",
    iconColor: "#ea580c",
    label: "text-orange-700",
    text: "Ücretsiz Analiz",
  },
  consultation: {
    icon: Calendar,
    wrap: "bg-indigo-50 border-indigo-200",
    iconBox: "border-indigo-200",
    iconColor: "#4f46e5",
    label: "text-indigo-800",
    text: "Ücretsiz Danışmanlık",
  },
}

export default function LeadMagnetBanner({ title, description, ctaText, ctaHref, variant }: LeadMagnet) {
  const cfg = variantConfig[variant]
  const IconComponent = cfg.icon

  return (
    <div className={`my-10 flex flex-wrap items-center justify-between gap-6 rounded-[10px] border px-7 py-6 ${cfg.wrap}`}>
      <div className="flex flex-1 items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white/80 ${cfg.iconBox}`}>
          <IconComponent size={18} color={cfg.iconColor} />
        </div>
        <div>
          <p className={`mb-1 text-[0.65rem] font-bold uppercase tracking-wider ${cfg.label}`}>
            {cfg.text}
          </p>
          <p className="mb-1 text-[0.95rem] font-bold text-ink-900">{title}</p>
          <p className="text-[0.8rem] leading-relaxed text-ink-500">{description}</p>
        </div>
      </div>
      <Link href={ctaHref} className="btn btn-primary shrink-0 whitespace-nowrap !px-5 !py-3 text-[0.8rem]">
        {ctaText} <ArrowRight size={14} />
      </Link>
    </div>
  )
}
