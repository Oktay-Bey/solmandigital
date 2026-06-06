import Link from "next/link"
import { Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"

export default function Footer() {
  const tier1 = services.filter((s) => s.tier === 1)
  const tier2 = services.filter((s) => s.tier === 2)
  const tier3 = services.filter((s) => s.tier === 3)
  const waHref = `https://wa.me/${siteConfig.whatsapp.replace("+", "")}`

  return (
    <footer className="border-t border-dark-300 bg-dark-500">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">

          {/* Marka */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-700 text-[0.85rem] font-black text-white">
                S
              </span>
              <span className="text-[1rem] font-bold tracking-tight text-ondark">
                Solman<span className="text-accent-600">Digital</span>
              </span>
            </Link>

            <p className="mb-6 text-[0.825rem] leading-[1.7] text-ondark-muted">
              Web, AI ve otomasyon alanında özel yazılım geliştiren yazılım ofisi.
            </p>

            <div className="mb-6 flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-[0.8rem] text-ondark-muted transition-colors hover:text-ondark"
              >
                <Mail size={14} className="shrink-0" />
                {siteConfig.email}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[0.8rem] text-ondark-muted transition-colors hover:text-ondark"
              >
                <MessageCircle size={14} className="shrink-0" />
                {siteConfig.whatsappDisplay}
              </a>
              <p className="flex items-center gap-2.5 text-[0.8rem] text-ondark-muted">
                <MapPin size={14} className="shrink-0" />
                {siteConfig.address}
              </p>
            </div>

            <Link
              href="/iletisim"
              className="btn btn-primary !px-4 !py-2.5 !text-[0.8rem]"
            >
              Teklif Al <ArrowRight size={14} />
            </Link>
          </div>

          {/* Popüler Hizmetler */}
          <FooterCol title="Popüler Hizmetler">
            {tier1.map((s) => (
              <FooterLink key={s.slug} href={`/hizmetler/${s.slug}`}>{s.title}</FooterLink>
            ))}
          </FooterCol>

          {/* Diğer Hizmetler */}
          <FooterCol title="Diğer Hizmetler">
            {tier2.map((s) => (
              <FooterLink key={s.slug} href={`/hizmetler/${s.slug}`}>{s.title}</FooterLink>
            ))}
            <div className="my-2 border-t border-dark-200" />
            {tier3.map((s) => (
              <FooterLink key={s.slug} href={`/hizmetler/${s.slug}`}>{s.title}</FooterLink>
            ))}
          </FooterCol>

          {/* İstanbul Bölgeleri */}
          <FooterCol title="İstanbul Bölgeleri">
            {istanbulPages.map((p) => (
              <FooterLink key={p.slug} href={`/${p.slug}`}>{p.title}</FooterLink>
            ))}
          </FooterCol>

          {/* Şirket */}
          <FooterCol title="Şirket">
            {[
              { href: "/portfoy", label: "Portföy" },
              { href: "/rehber", label: "Rehber" },
              { href: "/fiyatlar", label: "Fiyatlar" },
              { href: "/hakkimizda", label: "Hakkımızda" },
              { href: "/iletisim", label: "İletişim" },
              { href: "/ucretsiz-analiz", label: "Ücretsiz Analiz" },
            ].map((link) => (
              <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
            ))}
          </FooterCol>

        </div>
      </div>

      {/* Alt çubuk */}
      <div className="border-t border-dark-300 px-6 py-4">
        <p className="mx-auto max-w-[1200px] text-[0.75rem] text-ondark-muted">
          © {new Date().getFullYear()} Solman Digital. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ondark-muted opacity-50">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[0.825rem] text-ondark-muted transition-colors hover:text-ondark"
    >
      {children}
    </Link>
  )
}
