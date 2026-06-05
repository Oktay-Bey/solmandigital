import Link from "next/link"
import { Mail, ArrowRight, MapPin, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"

export default function Footer() {
  const tier1 = services.filter((s) => s.tier === 1)
  const tier2 = services.filter((s) => s.tier === 2)
  const tier3 = services.filter((s) => s.tier === 3)
  const waHref = `https://wa.me/${siteConfig.whatsapp.replace("+", "")}`

  const linkCls = "text-[0.825rem] text-ink-500 transition-colors hover:text-ondark"
  const headingCls =
    "mb-4 text-[0.65rem] font-bold uppercase tracking-wider text-ink-700"

  return (
    <footer>
      {/* CTA Band */}
      <div className="border-t border-dark-100 bg-dark-400 px-6 py-14">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8">
          <div>
            <p className="eyebrow mb-2 !text-ink-600">Ücretsiz Danışmanlık</p>
            <h2 className="text-h2-dark font-extrabold leading-tight tracking-tight text-white">
              Projeniz için ücretsiz danışmanlık alın
            </h2>
            <p className="mt-2 text-sm text-ondark-faint">
              Fikrinizi anlatın, size en uygun çözümü ve tahmini süreyi paylaşalım.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 bg-green-700 text-white hover:bg-green-800"
            >
              <MessageCircle size={16} />
              WhatsApp&apos;ta Yaz
            </a>
            <Link href="/iletisim" className="btn btn-primary shrink-0">
              Hemen Teklif Al <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-dark-200 bg-dark-500 px-6 pb-8 pt-14">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4.5 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-dark-50 bg-dark-100 text-[0.8rem] font-extrabold text-white">
                S
              </span>
              <span className="text-base font-bold tracking-tight text-ondark">
                Solman<span className="text-accent-700">Digital</span>
              </span>
            </Link>
            <p className="mb-5 text-[0.825rem] leading-relaxed text-ink-500">
              Web, AI ve otomasyon alanında özel yazılım geliştiren yazılım ofisi.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mb-2 flex items-center gap-2 text-[0.8rem] text-ink-500 transition-colors hover:text-ondark"
            >
              <Mail size={13} /> {siteConfig.email}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 flex items-center gap-2 text-[0.8rem] text-success transition-colors hover:text-green-400"
            >
              <MessageCircle size={13} /> {siteConfig.whatsappDisplay}
            </a>
            <p className="flex items-center gap-2 text-[0.8rem] text-ink-600">
              <MapPin size={13} /> {siteConfig.address}
            </p>
            {/* Sosyal */}
            <div className="mt-5 flex gap-2">
              {[
                { href: siteConfig.social.linkedin, label: "LinkedIn", short: "in" },
                { href: siteConfig.social.twitter, label: "Twitter / X", short: "X" },
                { href: siteConfig.social.github, label: "GitHub", short: "GH" },
              ].map(({ href, label, short }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-dark-50 px-2.5 text-[0.72rem] font-bold text-ink-400 transition-colors hover:border-ink-500 hover:text-ondark"
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Tier 1 Hizmetler */}
          <div>
            <h3 className={headingCls}>Popüler Hizmetler</h3>
            <ul className="flex list-none flex-col gap-2">
              {tier1.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 2 Hizmetler */}
          <div>
            <h3 className={headingCls}>Diğer Hizmetler</h3>
            <ul className="flex list-none flex-col gap-2">
              {tier2.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className={linkCls}>
                    {s.title}
                  </Link>
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
                  <Link href={`/${p.slug}`} className={linkCls}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 3 + Sayfalar */}
          <div>
            <h3 className={headingCls}>Özel Çözümler</h3>
            <ul className="mb-6 flex list-none flex-col gap-2">
              {tier3.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className={linkCls}>
                    {s.title}
                  </Link>
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
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-dark-200 pt-6">
          <p className="text-xs text-ink-700">
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-dark-50">
            Next.js 16 · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
