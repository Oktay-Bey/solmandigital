import type { Metadata } from "next"
import { CheckCircle2, MessageCircle, Shield, Clock, FileText } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import PartnershipForm from "@/components/PartnershipForm"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"

export const metadata: Metadata = {
  title: "White-label Development Partner | Solman Digital",
  description:
    "Scale your agency with senior-level white-label development. Next.js, React, TypeScript, AI integrations. Istanbul-based, fixed price or retainer. NDA available.",
  alternates: { canonical: `${siteConfig.url}/en/white-label` },
  openGraph: {
    title: "White-label Development Partner | Solman Digital",
    description: "Add senior dev capacity to your agency — without the hiring overhead. Next.js, AI, SaaS, e-commerce.",
    locale: "en_GB",
  },
}

const painPoints = [
  "Need dev capacity without growing your payroll?",
  "Clients asking for tech you don't build in-house?",
  "Want to stay focused on strategy, not delivery?",
]

const trustItems = [
  {
    icon: Clock,
    title: "EU/US timezone overlap",
    desc: "Based in Istanbul (UTC+3). Daily availability across European and US East Coast hours.",
  },
  {
    icon: Shield,
    title: "NDA available",
    desc: "Full confidentiality on client names, project details and your agency relationship.",
  },
  {
    icon: FileText,
    title: "Fixed price or retainer",
    desc: "Transparent scoping. Fixed quotes for defined projects, monthly retainer for ongoing capacity.",
  },
]

const capabilities = [
  "Next.js / React web apps",
  "SaaS MVP development",
  "AI & LLM integrations (GPT-4o, Claude)",
  "E-commerce (custom, Trendyol, WooCommerce)",
  "API development & third-party integrations",
  "TypeScript · Tailwind · Prisma · Supabase",
]

export default function WhiteLabelPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-16 pt-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <Reveal>
              <p className="mb-5 inline-block rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
                White-label Partnership
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mb-5 text-[clamp(1.875rem,4vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
                Scale Your Agency with White-label Development
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mb-8 flex flex-col gap-3">
                {painPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[0.9rem] text-ondark-muted">
                    <span className="mt-0.5 shrink-0 text-[#4ade80]">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <div className="mb-8 rounded-[10px] border border-dark-50 bg-dark-400 p-5">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-wider text-ondark-muted">
                  We build
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {capabilities.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-[0.825rem] text-ondark">
                      <CheckCircle2 size={13} className="shrink-0 text-[#4ade80]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <WhatsAppLink
                message="Hi, I'm interested in white-label partnership."
                source="whitelabel_en"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={15} /> Prefer to chat? WhatsApp →
              </WhatsAppLink>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={150}>
            <div className="rounded-[14px] border border-ink-200 bg-white p-8 shadow-xl">
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">
                Free · No commitment
              </p>
              <h2 className="mb-5 text-[1.1rem] font-extrabold tracking-tight text-ink-900">
                Tell us about your agency
              </h2>
              <PartnershipForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust block */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <h2 className="mb-10 text-center text-[1.25rem] font-extrabold tracking-tight text-ink-900">
              Built for agency workflows
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="card flex flex-col gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[7px] border border-accent-200 bg-accent-50">
                    <item.icon size={18} className="text-accent-700" />
                  </div>
                  <p className="text-[0.9rem] font-bold text-ink-900">{item.title}</p>
                  <p className="text-[0.825rem] leading-[1.6] text-ink-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
