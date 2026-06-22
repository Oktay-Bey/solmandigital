import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircle, Mail, Phone, Clock, CheckCircle2, Shield } from "lucide-react"
import ContactFormEn from "@/components/ContactFormEn"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"
import PhoneLink from "@/components/PhoneLink"

export const metadata: Metadata = {
  title: "Contact — Let's Discuss Your Project | Solman Digital",
  description:
    "Get in touch with Solman Digital. We build web applications, SaaS products and AI integrations for agencies and businesses worldwide. Free first consultation, response within 24h.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: "Contact | Solman Digital",
    description: "White-label development partner for agencies. Next.js, React, TypeScript, AI integrations. Istanbul-based, senior-level.",
    locale: "en_GB",
  },
}

const nextSteps = [
  {
    num: "01",
    title: "We read your message",
    desc: "We'll review your project, sector, and requirements carefully.",
  },
  {
    num: "02",
    title: "Initial assessment",
    desc: "We'll prepare our thoughts on technical feasibility, rough scope and timeline.",
  },
  {
    num: "03",
    title: "Back to you within 24h",
    desc: "We'll ask if you'd like a short call — an invitation, not a sales push.",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-16 pt-20">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="mb-8 inline-flex flex-wrap items-center gap-6">
              {["Free First Consultation", "Response Within 24h", "No Commitment"].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-full border border-dark-50 bg-dark-300 px-3.5 py-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="text-[0.72rem] font-semibold tracking-wide text-ink-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mb-5 max-w-[700px] text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-white">
              Let's talk about
              <br />
              <span className="text-accent-700">your project.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-[560px] text-base leading-loose text-ondark-muted">
              This isn't a sales call. We'll listen to what you need, give you an honest technical
              assessment, and let you decide whether there's a fit — no pressure either way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-surface px-6 pb-20 pt-14">
        <div className="two-col-grid mx-auto max-w-[1040px] items-start md:!grid-cols-[1fr_340px]">
          {/* Left: Form */}
          <Reveal>
            <div>
              <div className="rounded-xl border border-ink-200 bg-white p-10">
                <h2 className="mb-1.5 text-[1.2rem] font-extrabold tracking-tight text-ink-900">
                  Tell us about your project
                </h2>
                <p className="mb-8 text-[0.825rem] leading-relaxed text-ink-400">
                  No technical spec needed. "Here's what I'm trying to build" is enough — we'll ask the right questions.
                </p>
                <ContactFormEn />
              </div>

              <div className="mt-4 flex items-center gap-2 px-1">
                <Shield size={13} className="text-ink-400" />
                <span className="text-[0.72rem] text-ink-400">
                  Your information is never shared with third parties.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: Sidebar */}
          <div className="flex flex-col gap-4">
            {/* WhatsApp */}
            <Reveal delay={100}>
              <WhatsAppLink
                source="contact_card"
                className="block rounded-[10px] border border-[#166534] bg-[#0d1f13] p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-[#166534]">
                    <MessageCircle size={18} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-bold uppercase tracking-wider text-[#4ade80]">
                      Fastest Way
                    </p>
                    <p className="text-[0.9rem] font-bold text-white">Message us on WhatsApp</p>
                  </div>
                </div>
                <p className="mb-3.5 text-[0.8rem] leading-snug text-[#86efac]">
                  Share a few lines about your project — we'll respond quickly.
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.85rem] font-bold text-[#4ade80]">{siteConfig.whatsappDisplay}</span>
                  <ArrowRight size={14} className="text-[#4ade80]" />
                </div>
              </WhatsAppLink>
            </Reveal>

            {/* Phone — callable */}
            <Reveal delay={120}>
              <PhoneLink
                source="contact_card"
                className="block rounded-[10px] border border-ink-200 bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-ink-100">
                    <Phone size={18} className="text-ink-600" />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-bold uppercase tracking-wider text-ink-400">
                      By Phone
                    </p>
                    <p className="text-[0.9rem] font-bold text-ink-800">Call Us Now</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.85rem] font-bold text-ink-700">{siteConfig.whatsappDisplay}</span>
                  <ArrowRight size={14} className="text-ink-500" />
                </div>
              </PhoneLink>
            </Reveal>

            {/* Next Steps */}
            <Reveal delay={150}>
              <div className="rounded-[10px] border border-ink-200 bg-white p-6">
                <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-wider text-ink-400">
                  What happens next?
                </p>
                <div className="flex flex-col gap-4">
                  {nextSteps.map((step) => (
                    <div key={step.num} className="flex gap-3.5">
                      <span className="min-w-5 pt-0.5 text-[0.65rem] font-extrabold tracking-wide text-accent-700">
                        {step.num}
                      </span>
                      <div>
                        <p className="mb-0.5 text-[0.82rem] font-bold text-ink-900">{step.title}</p>
                        <p className="text-[0.775rem] leading-snug text-ink-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Response time */}
            <Reveal delay={200}>
              <div className="flex items-start gap-3.5 rounded-[10px] border border-ink-200 bg-white px-6 py-5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[7px] bg-ink-100">
                  <Clock size={16} className="text-ink-700" />
                </div>
                <div>
                  <p className="mb-0.5 text-[0.82rem] font-bold text-ink-900">Response within 24h</p>
                  <p className="text-[0.775rem] leading-snug text-ink-400">
                    On business days, we reply to every message within 24 hours.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Email */}
            <Reveal delay={250}>
              <div className="flex items-start gap-3.5 rounded-[10px] border border-ink-200 bg-white px-6 py-5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[7px] bg-ink-100">
                  <Mail size={16} className="text-ink-700" />
                </div>
                <div>
                  <p className="mb-0.5 text-[0.82rem] font-bold text-ink-900">Prefer email?</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-[0.8rem] font-semibold text-accent-700">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className="border-t border-ink-100 bg-white px-6 py-14">
        <div className="mx-auto max-w-[1040px]">
          <Reveal>
            <p className="eyebrow mb-8">Why reach out now?</p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {[
              {
                title: "An idea is enough to start",
                desc: "No technical spec or detailed brief required. We'll work out the scope together from wherever you are.",
              },
              {
                title: "You talk to the person doing the work",
                desc: "No account managers or sales reps. You're speaking directly with the developer who'll build your project.",
              },
              {
                title: "Assessment is completely free",
                desc: "The first consultation and technical feasibility review carry no cost and no obligation.",
              },
              {
                title: "No pressure to decide",
                desc: "Take the proposal away, think it over, or walk away — entirely up to you.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="flex gap-3.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                  <div>
                    <p className="mb-1 text-[0.875rem] font-bold text-ink-900">{item.title}</p>
                    <p className="text-[0.8rem] leading-relaxed text-ink-500">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-dark-200 bg-dark-500 px-6 py-16 text-center">
        <div className="mx-auto max-w-[560px]">
          <p className="mb-3 text-[0.85rem] tracking-wide text-ondark-muted">Not ready yet?</p>
          <h2 className="mb-4 text-[clamp(1.4rem,3vw,1.875rem)] font-extrabold leading-tight tracking-tight text-white">
            See what we've built
          </h2>
          <p className="mb-8 text-[0.875rem] leading-relaxed text-ondark-muted">
            Browse our portfolio to get a sense of the type of work we take on.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/portfoy" className="btn btn-primary">
              View Portfolio <ArrowRight size={15} />
            </Link>
            <Link href="/hizmetler" className="btn btn-outline-dark">
              Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
