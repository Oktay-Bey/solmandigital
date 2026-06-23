import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, MessageCircle, Star, Zap, Bot, BarChart3, Clock } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"
import AILeadFormEn from "./AILeadFormEn"

export const metadata: Metadata = {
  title: "AI Automation Agency — Solman Digital",
  description:
    "Your AI automation agency: custom GPT-4o & Claude-powered workflows, process automation, AI chatbots, and content systems. Fixed price, source code yours, automations delivered in 1 week. Free AI audit.",
  keywords: [
    "ai automation agency",
    "ai automation service",
    "ai automation consulting",
    "ai systems integration",
    "work automation ai",
    "business process automation ai",
    "ai workflow automation",
    "gpt-4 automation",
    "claude ai automation",
    "ai chatbot development",
    "ai content automation",
    "custom ai solutions",
    "ai consulting istanbul",
  ],
  alternates: { canonical: `${siteConfig.url}/en/ai-automation-service` },
  openGraph: {
    title: "AI Automation Agency — Solman Digital",
    description:
      "Your AI automation agency. GPT-4o & Claude-powered workflows. Free AI audit, fixed price, 1-week delivery.",
    url: `${siteConfig.url}/en/ai-automation-service`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "AI Automation Service",
      description:
        "Custom AI automation solutions built with GPT-4o and Claude. Content automation, AI chatbots, workflow automation, and system integrations.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
      priceRange: "€500–€5.000",
      areaServed: ["TR", "EU", "US", "UK"],
      url: `${siteConfig.url}/en/ai-automation-service`,
    },
  ],
}

const useCases = [
  {
    icon: Bot,
    title: "AI Chatbot & Support",
    desc: "24/7 customer support chatbot trained on your products and policies. Handles FAQs, lead capture, and appointment booking automatically.",
    savings: "Save 15+ hours/week",
  },
  {
    icon: Zap,
    title: "Content Automation",
    desc: "Auto-generate product descriptions, blog posts, social media content, and email campaigns at scale with GPT-4o and Claude.",
    savings: "89% faster content",
  },
  {
    icon: BarChart3,
    title: "Data & Report Automation",
    desc: "Connect your data sources, auto-generate weekly reports, performance summaries, and business insights — no manual work.",
    savings: "Save 10+ hours/week",
  },
  {
    icon: Clock,
    title: "Workflow & Process Automation",
    desc: "Automate repetitive tasks: invoice processing, CRM updates, email triage, inventory sync, and more via AI + API integrations.",
    savings: "ROI in 30–60 days",
  },
]

const packages = [
  {
    name: "AI Starter",
    price: "From €500",
    weeks: "1 week",
    highlight: false,
    features: [
      "Single automation workflow",
      "GPT-4o or Claude integration",
      "API connection (1–2 services)",
      "Admin dashboard or Slack output",
      "Source code + documentation",
      "1 month free support",
    ],
  },
  {
    name: "AI Business",
    price: "From €1.500",
    weeks: "3–6 weeks",
    highlight: true,
    features: [
      "2–4 automation workflows",
      "GPT-4o + Claude (optimal routing)",
      "Multi-service API integration",
      "Custom web dashboard",
      "Error monitoring + retry logic",
      "Source code + documentation",
      "3 months free support",
    ],
  },
  {
    name: "AI Enterprise",
    price: "From €4.000",
    weeks: "6–12 weeks",
    highlight: false,
    features: [
      "Full AI automation suite",
      "Custom LLM fine-tuning (optional)",
      "RAG / knowledge base setup",
      "Multi-model orchestration",
      "Real-time analytics dashboard",
      "On-call support + SLA",
      "Unlimited scope revisions",
    ],
  },
]

const steps = [
  { n: "01", title: "Free AI Audit", desc: "We map your workflows, identify automation opportunities, and calculate expected ROI — no cost, no commitment.", day: "Day 1" },
  { n: "02", title: "Scope & Design", desc: "We define the automation blueprint, choose the right AI models, and agree on a fixed price before any code is written.", day: "Days 2–4" },
  { n: "03", title: "Build & Test", desc: "We build the automation in production-ready code. You see progress updates every 3–4 days. Tested with real data.", day: "Days 5–35" },
  { n: "04", title: "Deploy & Train", desc: "Live deployment on your infrastructure. We walk you through usage, monitoring, and handover. Source code is yours.", day: "Final week" },
]

const faqs = [
  {
    q: "Which AI models do you use?",
    a: "We primarily use GPT-4o and Claude 3.5 Sonnet, choosing the best model per task based on cost, speed, and accuracy. We can also integrate open-source models (Llama, Mistral) for data-sensitive use cases.",
  },
  {
    q: "Do I need a technical team to manage it afterwards?",
    a: "No. We build admin dashboards and monitoring so non-technical staff can manage everything. We also provide detailed documentation and 1–3 months of free support after delivery.",
  },
  {
    q: "How do you handle data privacy?",
    a: "All API calls use your own credentials — no data passes through our servers. We can also implement on-premise or local model solutions if you have strict data residency requirements.",
  },
  {
    q: "How is the pricing structured?",
    a: "Fixed price per project — quoted before work begins, not billed by the hour. 50% upfront, 50% on delivery. No subscriptions, no hidden fees.",
  },
  {
    q: "Can you integrate with our existing systems?",
    a: "Yes. We integrate with most business tools — CRMs, ERPs, Slack, Notion, Google Workspace, custom databases, and REST/GraphQL APIs. We assess compatibility during the free audit.",
  },
]

export default function EnAIAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — sol: değer önerisi, sağ: gömülü lead formu (en çok reklam tıkı bu sayfaya, dönüşüm yolu açıldı) */}
      <section className="bg-dark-500 px-6 pb-16 pt-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sol */}
          <div>
            <Reveal>
              <p className="mb-5 inline-block rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
                AI Automation Agency · GPT-4o · Claude
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mb-5 text-[clamp(1.75rem,4vw,2.6rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
                AI Automation for Your Business.{" "}
                <span className="text-accent-700">Delivered in 1 Week.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mb-7 text-[1rem] leading-[1.75] text-ondark-muted">
                As a focused AI automation agency, we build custom AI workflows that save your team 10–20 hours per week — chatbots, content automation, report generation, and process integrations. Fixed price, source code is yours.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <ul className="mb-7 flex flex-col gap-2.5">
                {[
                  "AI chatbot & support: save 15+ hours/week",
                  "Content automation: 89% faster output",
                  "Workflow automation: ROI in 30–60 days",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ondark-muted">
                    <span className="mt-0.5 shrink-0 text-[#4ade80]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={400}>
              <p className="text-[0.8rem] text-ondark-muted">
                Packages from €500 · No subscription fees · 50% upfront, 50% on delivery
              </p>
            </Reveal>
          </div>

          {/* Sağ: form — mobilde içeriğin üstüne (order-first lg:order-last) */}
          <Reveal delay={150} className="order-first lg:order-last">
            <div className="rounded-[14px] border border-dark-50 bg-white p-8 shadow-xl">
              <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-accent-700">Free AI Audit</p>
              <h2 className="mb-3 text-[1.15rem] font-extrabold tracking-tight text-ink-900">
                Discover your automation potential
              </h2>
              <p className="mb-5 flex items-center gap-1.5 text-[0.78rem] text-ink-500">
                <span className="text-[#16a34a]">●</span>
                30-minute call · ROI estimate · no commitment
              </p>
              <AILeadFormEn />
              <div className="mt-4 border-t border-ink-100 pt-4 text-center">
                <WhatsAppLink
                  message="Hi, I'd like to discuss an AI automation project."
                  source="ai_en_hero"
                  className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-accent-700 hover:underline"
                >
                  <MessageCircle size={14} /> Prefer WhatsApp? Message us →
                </WhatsAppLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-dark-200 bg-dark-400 px-6 py-7">
        <div className="mx-auto max-w-[900px]">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "GPT-4o & Claude integration",
              "Fixed price — no surprises",
              "Source code is yours",
              "Free AI audit call",
              "Delivered in 1 week",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle size={14} className="shrink-0 text-accent-700" />
                <span className="text-[0.8rem] font-medium text-ondark-muted">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="solutions" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[960px]">
          <Reveal>
            <p className="eyebrow mb-3">What We Automate</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Common AI Automation Projects
            </h2>
            <p className="mb-12 text-[0.9rem] text-ink-500">
              Every project is scoped to your exact workflow — these are the most common starting points.
            </p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {useCases.map((uc, i) => (
              <Reveal key={uc.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-7 transition-shadow hover:shadow-card">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50">
                      <uc.icon size={20} className="text-accent-700" />
                    </div>
                    <span className="rounded-full bg-surface px-2.5 py-0.5 text-[0.7rem] font-bold text-accent-700">
                      {uc.savings}
                    </span>
                  </div>
                  <p className="mb-2 text-[1rem] font-extrabold text-ink-900">{uc.title}</p>
                  <p className="text-[0.875rem] leading-[1.65] text-ink-500">{uc.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="pricing" className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[960px]">
          <Reveal>
            <p className="eyebrow mb-3">Transparent Pricing</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Fixed-Price AI Automation Packages
            </h2>
            <p className="mb-10 text-[0.9rem] text-ink-500">
              All quotes are fixed before work begins. The price you see is the price you pay.
            </p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div
                  className={`relative flex h-full flex-col rounded-xl p-8 ${
                    pkg.highlight
                      ? "border-2 border-accent-700 bg-white shadow-card"
                      : "border border-ink-200 bg-white"
                  }`}
                >
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-700 px-3 py-[0.2rem] text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
                      Most Popular
                    </span>
                  )}
                  <p className="mb-2 text-[1rem] font-extrabold text-ink-900">{pkg.name}</p>
                  <p className="mb-1 text-[1.375rem] font-black tracking-[-0.02em] text-accent-700">{pkg.price}</p>
                  <p className="mb-6 text-[0.775rem] text-ink-400">{pkg.weeks} delivery</p>
                  <div className="flex flex-col gap-2.5">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-success" />
                        <span className="text-[0.85rem] text-ink-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className={`mt-6 block rounded-lg py-2.5 text-center text-[0.85rem] font-bold transition-colors ${
                      pkg.highlight
                        ? "bg-accent-700 text-white hover:bg-accent-800"
                        : "border border-ink-200 text-ink-600 hover:border-accent-300 hover:text-accent-700"
                    }`}
                  >
                    Get a Quote →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="mt-6 text-center text-[0.8rem] text-ink-400">
              Not sure which package fits?{" "}
              <WhatsAppLink message="Hi, I'd like to discuss an AI automation project." source="ai_en_inline" className="font-semibold text-accent-700 hover:underline">
                Book a free AI audit →
              </WhatsAppLink>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <p className="eyebrow mb-3">How It Works</p>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              From Idea to Live Automation in 4 Steps
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <span className="block min-w-9 rounded-md border border-accent-200 bg-accent-50 px-2.5 py-[0.3rem] text-center text-[0.7rem] font-black text-accent-700">
                      {s.n}
                    </span>
                    <p className="mt-1 text-center text-[0.65rem] font-semibold text-ink-400">{s.day}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[0.95rem] font-bold text-ink-900">{s.title}</p>
                    <p className="text-[0.875rem] leading-[1.6] text-ink-500">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <h2 className="mb-8 text-[1.5rem] font-extrabold tracking-[-0.02em] text-ink-900">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-ink-200 py-5">
                <h3 className="mb-2 text-[0.95rem] font-bold text-ink-900">{faq.q}</h3>
                <p className="text-[0.875rem] leading-[1.65] text-ink-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-dark-500 px-6 py-20">
        <div className="mx-auto max-w-[640px] text-center">
          <Reveal>
            <div className="mb-3 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-accent-700 text-accent-700" />
              ))}
            </div>
            <p className="eyebrow eyebrow-center mb-4">Free AI Audit</p>
            <h2 className="mb-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-white">
              Let&apos;s Map Your Automation Opportunities
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ondark-muted">
              30-minute call — we identify which of your workflows are best suited for AI automation and estimate ROI. Free, no commitment.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book Free AI Audit Call <ArrowRight size={16} />
              </a>
              <WhatsAppLink
                message="Hi, I'd like to discuss an AI automation project."
                source="ai_en_cta"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={15} /> WhatsApp
              </WhatsAppLink>
            </div>
            <p className="mt-6 text-[0.8rem] text-ondark-muted">
              Or email us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent-700 hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Internal link to Turkish version */}
      <section className="bg-white px-6 py-8">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-[0.8rem] text-ink-400">
            Türkçe anlatım için:{" "}
            <Link href="/ai-otomasyon-hizmeti" className="text-accent-700 hover:underline">
              AI Otomasyon Hizmeti →
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
