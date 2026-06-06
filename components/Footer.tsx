import Link from "next/link"
import { Mail, MapPin, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"

export default function Footer() {
  const tier1 = services.filter((s) => s.tier === 1)
  const tier2 = services.filter((s) => s.tier === 2)
  const tier3 = services.filter((s) => s.tier === 3)
  const waHref = `https://wa.me/${siteConfig.whatsapp.replace("+", "")}`

  const linkCls = "text-[0.825rem] text-ondark-muted transition-colors hover:text-ondark"
  const headingCls = "mb-3.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink-500"

  return (
    <footer className="border-t border-dark-300 bg-dark-500">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10 px-6 py-14">
        {/* Brand */}
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-dark-200 text-[0.8rem] font-extrabold text-white">
              S
            </span>
            <span className="text-base font-bold tracking-tight text-ondark">
              Solman<span className="text-accent-600">Digital</span>
            </span>
          </Link>
          <p className="mb-5 text-[0.8rem] leading-relaxed text-ondark-muted">
            Web, AI ve otomasyon alanında özel yazılım geliştiren yazılım ofisi.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-[0.8rem] text-ondark-muted transition-colors hover:text-ondark"
            >
              <Mail size={13} className="shrink-0" /> {siteConfig.email}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[0.8rem] text-ondark-muted transition-colors hover:text-ondark"
            >
              <MessageCircle size={13} className="shrink-0" /> {siteConfig.whatsappDisplay}
            </a>
            <p className="flex items-center gap-2 text-[0.8rem] text-ondark-muted">
              <MapPin size={13} className="shrink-0" /> {siteConfig.address}
            </p>
          </div>
        </div>

        {/* Popüler Hizmetler */}
        <div>
          <h3 className={headingCls}>Popüler Hizmetler</h3>
          <ul className="flex list-none flex-col gap-2">
            {tier1.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className={linkCls}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Diğer Hizmetler */}
        <div>
          <h3 className={headingCls}>Diğer Hizmetler</h3>
          <ul className="flex list-none flex-col gap-2">
            {tier2.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className={linkCls}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İstanbul Bölgeleri */}
        <div>
          <h3 className={headingCls}>İstanbul Bölgeleri</h3>
          <ul className="flex list-none flex-col gap-2">
            {istanbulPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className={linkCls}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Özel Çözümler + Şirket */}
        <div>
          <h3 className={headingCls}>Özel Çözümler</h3>
          <ul className="mb-6 flex list-none flex-col gap-2">
            {tier3.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className={linkCls}>{s.title}</Link>
              </li>
            ))}
          </ul>
          <h3 className={headingCls}>Şirket</h3>
          <ul className="flex list-none flex-col gap-2">
            {[
              { href: "/portfoy", label: "Portföy" },
              { href: "/rehber", label: "Rehber" },
              { href: "/fiyatlar", label: "Fiyatlar" },
              { href: "/hakkimizda", label: "Hakkımızda" },
              { href: "/iletisim", label: "İletişim" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkCls}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-300 px-6 py-5">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3">
          <p className="text-[0.75rem] text-ondark-muted">
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-[0.75rem] text-ink-500">
            Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
