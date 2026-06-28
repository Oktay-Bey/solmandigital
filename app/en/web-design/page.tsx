import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, MessageCircle, Star } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"

export const metadata: Metadata = {
  title: "Web Design & Development — Solman Digital",
  description:
    "Custom websites and e-commerce stores built from scratch. Direct expert access, fixed price, no surprises. Live in 5–10 business days. Free 30-min consultation.",
  keywords: [
    "web design",
    "website development",
    "custom website",
    "web design company",
    "professional website",
    "business website",
    "web developer",
    "e-commerce website",
    "online store development",
    "web design Istanbul",
    "website development Istanbul",
    "web design company Istanbul",
    "web design Besiktas",
    "web design Sisli",
    "web design Macedonia",
    "website development Skopje",
    "web design Syria",
    "website development Syria",
    "web design company Syria",
    "professional website Syria",
    "business website Damascus",
  ],
  alternates: { canonical: `${siteConfig.url}/en/web-design` },
  openGraph: {
    title: "Web Design & Development — Solman Digital",
    description: "Custom websites from scratch. Fixed price, direct expert access, live in 5–10 days.",
    url: `${siteConfig.url}/en/web-design`,
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
      name: "Custom Website & E-Commerce Development",
      description:
        "Professional website and e-commerce development built from scratch. Fixed price, direct expert access, delivered in 5–10 business days.",
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Beşiktaş",
          addressRegion: "İstanbul",
          addressCountry: "TR",
        },
      },
      priceRange: "€400–€2.000",
      areaServed: [
        { "@type": "City", name: "İstanbul" },
        { "@type": "City", name: "Beşiktaş" },
        { "@type": "City", name: "Şişli" },
        { "@type": "Country", name: "Turkey" },
        { "@type": "Country", name: "North Macedonia" },
      ],
      url: `${siteConfig.url}/en/web-design`,
    },
  ],
}

const services = [
  {
    name: "Business Website",
    price: "From €400",
    days: "5–10 business days",
    highlight: false,
    features: [
      "5–10 pages, built from scratch",
      "Mobile-responsive design",
      "Google PageSpeed 90+",
      "SEO setup (meta, schema, sitemap)",
      "Contact form & WhatsApp integration",
      "SSL + Vercel deployment",
      "1 month free technical support",
    ],
  },
  {
    name: "E-Commerce Store",
    price: "From €1.000",
    days: "10–15 business days",
    highlight: true,
    features: [
      "Product catalog + cart + checkout",
      "Stripe or local payment integration",
      "Admin panel (products & orders)",
      "Stock & variant management",
      "SEO + performance setup",
      "SSL + Vercel deployment",
      "1 month free technical support",
    ],
  },
]

const portfolio = [
  {
    name: "TicaretHub",
    type: "SaaS Platform",
    desc: "15+ free tools for e-commerce sellers. AI product description engine, profit calculator, live.",
    url: "https://ticarethub.com",
    tech: ["Next.js", "AI/LLM", "SaaS"],
  },
  {
    name: "ShoppinHere",
    type: "E-Commerce",
    desc: "Full e-commerce store with 238 products, Iyzico payment, CJ Dropshipping integration.",
    url: "https://shoppinhere.com",
    tech: ["Next.js", "Stripe", "Admin Panel"],
  },
  {
    name: "QR Menu SaaS",
    type: "Multi-Tenant SaaS",
    desc: "Restaurant QR menu platform. Multi-tenant architecture, PDF export, custom branding.",
    url: null,
    tech: ["Next.js", "Multi-tenant", "PDF"],
  },
]

const steps = [
  { n: "01", title: "Brief", desc: "We align on your goals, design preferences, and technical requirements.", day: "Day 1" },
  { n: "02", title: "Development", desc: "We build from scratch in Next.js. Progress update every 3 days.", day: "Days 2–8" },
  { n: "03", title: "Revision", desc: "Your feedback, fine-tuned. Two revision rounds included.", day: "Days 9–10" },
  { n: "04", title: "Go Live", desc: "Domain setup, SSL, deployment — everything ready. We test together.", day: "Days 10–12" },
]

const faqs = [
  {
    q: "Do you use templates like WordPress or Wix?",
    a: "No. Every project is built from scratch with Next.js. The source code is yours — no monthly platform fees, no vendor lock-in.",
  },
  {
    q: "What is included in the price?",
    a: "Full source code, Vercel deployment, SSL setup, Google Analytics + Search Console, 1 month free support, and a content update guide.",
  },
  {
    q: "How does payment work?",
    a: "50% upfront, 50% on delivery. We accept bank transfer. A fixed-price quote is sent before any work begins — the price does not change.",
  },
  {
    q: "Can I contact you directly throughout the project?",
    a: "Yes. You work directly with the same specialist from start to finish — no account managers, no handoffs.",
  },
]

export default function EnWebDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-20 pt-24">
        <div className="mx-auto max-w-[760px] text-center">
          <Reveal>
            <p className="mb-6 inline-block rounded border border-accent-900 px-3 py-[0.3rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent-700">
              Direct Expert · Fixed Price · No Templates
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mb-5 text-[clamp(1.75rem,5vw,2.75rem)] font-black leading-[1.15] tracking-[-0.03em] text-white">
              Custom Website for Your Business.{" "}
              <span className="text-accent-700">Built from Scratch.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mb-10 max-w-[560px] text-[1.05rem] leading-[1.75] text-ondark-muted">
              You work directly with one specialist — no agency layers, no surprises in price or timeline. Live in 5–10 business days.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="#contact" className="btn btn-primary">
                Book Free Consultation <ArrowRight size={16} />
              </a>
              <WhatsAppLink
                message="Hi, I'd like to discuss a website project."
                source="web_en_cta"
                className="btn btn-outline-dark"
              >
                <MessageCircle size={15} /> WhatsApp
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-dark-200 bg-dark-400 px-6 py-7">
        <div className="mx-auto max-w-[900px]">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "Live in 5–10 business days",
              "Fixed price — no surprises",
              "Source code is yours",
              "Free 30-min consultation",
              "1 month free support",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle size={14} className="shrink-0 text-accent-700" />
                <span className="text-[0.8rem] font-medium text-ondark-muted">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Based in Istanbul — local geo signal */}
      <section className="bg-white px-6 pt-16">
        <div className="mx-auto max-w-[760px]">
          <Reveal>
            <p className="eyebrow mb-3">Based in Istanbul</p>
            <h2 className="mb-4 text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              A Web Design Studio in Beşiktaş, Istanbul
            </h2>
            <p className="text-[0.975rem] leading-[1.8] text-ink-600">
              Solman Digital is a software studio based in Beşiktaş, on Istanbul&apos;s European side and minutes from Şişli, Levent and Nişantaşı. For Istanbul businesses we can meet in person to align on design direction, then run the rest of the build remotely with transparent updates. For international clients across Turkey, Europe and North Macedonia, we work entirely online — same specialist, start to finish. Every site is built from scratch in Next.js: fast, mobile-first and SEO-ready, with the source code yours to keep.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="eyebrow mb-3">Services & Pricing</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Fixed Prices. No Hidden Costs.
            </h2>
            <p className="mb-10 text-[0.9rem] text-ink-500">
              Most agencies say "contact us for pricing." We don&apos;t.
            </p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {services.map((s, i) => (
              <Reveal key={s.name} delay={i * 100}>
                <div
                  className={`relative rounded-xl p-8 ${
                    s.highlight
                      ? "border-2 border-accent-700 bg-accent-50"
                      : "border border-ink-200 bg-white"
                  }`}
                >
                  {s.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-700 px-3 py-[0.2rem] text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
                      Most Popular
                    </span>
                  )}
                  <p className="mb-2 text-[1rem] font-extrabold text-ink-900">{s.name}</p>
                  <p className="mb-1 text-[1.375rem] font-black tracking-[-0.02em] text-accent-700">{s.price}</p>
                  <p className="mb-6 text-[0.775rem] text-ink-400">{s.days}</p>
                  <div className="flex flex-col gap-2.5">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="mt-0.5 shrink-0 text-success" />
                        <span className="text-[0.85rem] text-ink-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 text-center text-[0.8rem] text-ink-400">
              Need something more specific?{" "}
              <WhatsAppLink message="Hi, I'd like to discuss a website project." source="web_en_inline" className="font-semibold text-accent-700 hover:underline">
                Let&apos;s talk →
              </WhatsAppLink>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <p className="eyebrow mb-3">How It Works</p>
            <h2 className="mb-10 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              From Brief to Live in ~10 Days
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

      {/* Portfolio */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <p className="eyebrow mb-3">Live Projects</p>
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-ink-900">
              Real Work, Not Mock-ups
            </h2>
            <p className="mb-10 text-[0.9rem] text-ink-500">
              Every project below is live and built by Solman Digital.
            </p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {portfolio.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-7">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-0.5 text-[1rem] font-extrabold text-ink-900">{p.name}</p>
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-accent-700">{p.type}</p>
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-md border border-ink-200 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-500 hover:border-accent-300 hover:text-accent-700"
                      >
                        Live →
                      </a>
                    )}
                  </div>
                  <p className="mb-5 text-[0.875rem] leading-[1.6] text-ink-500">{p.desc}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-ink-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-8 text-center">
              <Link href="/portfoy" className="btn btn-outline">
                See All Projects <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
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

      {/* CTA / Contact */}
      <section id="contact" className="bg-dark-500 px-6 py-20">
        <div className="mx-auto max-w-[640px] text-center">
          <Reveal>
            <div className="mb-3 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-accent-700 text-accent-700" />
              ))}
            </div>
            <p className="eyebrow eyebrow-center mb-4">Free Consultation</p>
            <h2 className="mb-4 text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-white">
              Tell Us About Your Project
            </h2>
            <p className="mb-8 text-[0.9rem] leading-[1.7] text-ondark-muted">
              30-minute call — no sales pitch, just honest technical advice on scope, timeline, and budget. No commitment required.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book Free 30-Min Call <ArrowRight size={16} />
              </a>
              <WhatsAppLink
                message="Hi, I'd like to discuss a website project."
                source="web_en_cta"
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
    </>
  )
}
