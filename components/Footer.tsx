import Link from "next/link"
import { Mail, ArrowRight, MapPin, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"

export default function Footer() {
  const tier1 = services.filter((s) => s.tier === 1)
  const tier2 = services.filter((s) => s.tier === 2)
  const tier3 = services.filter((s) => s.tier === 3)

  return (
    <footer>
      {/* CTA Band */}
      <div
        style={{
          backgroundColor: "#111111",
          borderTop: "1px solid #1e1e1e",
          padding: "3.5rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#444444",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ display: "inline-block", width: 16, height: 1, backgroundColor: "#9b1c1c" }} />
              Ücretsiz Danışmanlık
            </p>
            <h2
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Projeniz için ücretsiz danışmanlık alın
            </h2>
            <p style={{ color: "#555555", marginTop: "0.5rem", fontSize: "0.875rem" }}>
              Fikrinizi anlatın, size en uygun çözümü ve tahmini süreyi paylaşalım.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#15803d",
                color: "#ffffff",
                padding: "0.875rem 1.75rem",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: "0.875rem",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={16} />
              WhatsApp&apos;ta Yaz
            </a>
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#9b1c1c",
                color: "#ffffff",
                padding: "0.875rem 1.75rem",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: "0.875rem",
                flexShrink: 0,
              }}
            >
              Hemen Teklif Al <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div style={{ backgroundColor: "#0d0d0d", padding: "3.5rem 1.5rem 2rem", borderTop: "1px solid #1a1a1a" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.125rem",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #2a2a2a",
                  borderRadius: 6,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                }}
              >
                S
              </span>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "#e8e8e8", letterSpacing: "-0.02em" }}>
                Solman<span style={{ color: "#9b1c1c" }}>Digital</span>
              </span>
            </Link>
            <p style={{ color: "#555555", fontSize: "0.825rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
              Web, AI ve otomasyon alanında full-stack geliştirici.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{
                color: "#555555",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Mail size={13} /> {siteConfig.email}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#16a34a",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <MessageCircle size={13} /> {siteConfig.whatsappDisplay}
            </a>
            <p style={{ color: "#444444", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={13} /> {siteConfig.address}
            </p>
            {/* Sosyal */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
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
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 32,
                    height: 32,
                    padding: "0 0.6rem",
                    border: "1px solid #2a2a2a",
                    borderRadius: 6,
                    color: "#888888",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Tier 1 Hizmetler */}
          <div>
            <h3
              style={{
                color: "#333333",
                fontWeight: 700,
                fontSize: "0.65rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Popüler Hizmetler
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {tier1.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    style={{ color: "#555555", fontSize: "0.825rem" }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 2 Hizmetler */}
          <div>
            <h3
              style={{
                color: "#333333",
                fontWeight: 700,
                fontSize: "0.65rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Diğer Hizmetler
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {tier2.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    style={{ color: "#555555", fontSize: "0.825rem" }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İstanbul Bölgeleri */}
          <div>
            <h3
              style={{
                color: "#333333",
                fontWeight: 700,
                fontSize: "0.65rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              İstanbul Bölgeleri
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {istanbulPages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} style={{ color: "#555555", fontSize: "0.825rem" }}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 3 + Sayfalar */}
          <div>
            <h3
              style={{
                color: "#333333",
                fontWeight: 700,
                fontSize: "0.65rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Özel Çözümler
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {tier3.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    style={{ color: "#555555", fontSize: "0.825rem" }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h3
              style={{
                color: "#333333",
                fontWeight: 700,
                fontSize: "0.65rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Şirket
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/portfoy", label: "Portföy" },
                { href: "/rehber", label: "Rehber" },
                { href: "/fiyatlar", label: "Fiyatlar" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/iletisim", label: "İletişim" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "#555555", fontSize: "0.825rem" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: 1200,
            margin: "2.5rem auto 0",
            paddingTop: "1.5rem",
            borderTop: "1px solid #1a1a1a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#333333", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p style={{ color: "#2a2a2a", fontSize: "0.75rem" }}>
            Next.js 16 · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
