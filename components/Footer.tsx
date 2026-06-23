import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone, ArrowRight } from "lucide-react"
import PhoneLink from "@/components/PhoneLink"
import { siteConfig } from "@/lib/site-config"
import { services } from "@/lib/data/services"
import { istanbulPages } from "@/lib/data/istanbul-pages"

export default function Footer() {
  const tier1 = services.filter((s) => s.tier === 1)
  const tier2 = services.filter((s) => s.tier === 2)
  const tier3 = services.filter((s) => s.tier === 3)
  const waHref = `https://wa.me/${siteConfig.whatsapp.replace("+", "")}`

  return (
    <footer style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid #1e1e1e" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">

          {/* Marka */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32, borderRadius: 8, backgroundColor: "#9b1c1c",
                fontSize: "0.85rem", fontWeight: 900, color: "#fff"
              }}>S</span>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#e8e8e8", letterSpacing: "-0.01em" }}>
                Solman<span style={{ color: "#9b1c1c" }}>Digital</span>
              </span>
            </Link>

            <p style={{ fontSize: "0.825rem", lineHeight: 1.7, color: "#a8a8a8", marginBottom: 24 }}>
              Web, AI ve otomasyon alanında özel yazılım geliştiren yazılım ofisi.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              <a href={`mailto:${siteConfig.email}`}
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "#a8a8a8", textDecoration: "none" }}>
                <Mail size={13} />
                {siteConfig.email}
              </a>
              <a href={waHref} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "#a8a8a8", textDecoration: "none" }}>
                <MessageCircle size={13} />
                {siteConfig.whatsappDisplay}
              </a>
              <PhoneLink source="footer"
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "#a8a8a8", textDecoration: "none" }}>
                <Phone size={13} />
                {siteConfig.whatsappDisplay}
              </PhoneLink>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.8rem", color: "#666" }}>
                <MapPin size={13} />
                {siteConfig.address}
              </span>
            </div>

            <Link href="/iletisim" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "9px 16px", borderRadius: 7, backgroundColor: "#9b1c1c",
              fontSize: "0.8rem", fontWeight: 700, color: "#fff", textDecoration: "none"
            }}>
              Teklif Al <ArrowRight size={14} />
            </Link>
          </div>

          {/* Popüler Hizmetler */}
          <Col title="Popüler Hizmetler">
            {tier1.map((s) => <ColLink key={s.slug} href={`/hizmetler/${s.slug}`}>{s.title}</ColLink>)}
          </Col>

          {/* Diğer & Özel Hizmetler */}
          <Col title="Diğer Hizmetler">
            {tier2.map((s) => <ColLink key={s.slug} href={`/hizmetler/${s.slug}`}>{s.title}</ColLink>)}
            <div style={{ margin: "8px 0", height: 1, backgroundColor: "#1e1e1e" }} />
            {tier3.map((s) => <ColLink key={s.slug} href={`/hizmetler/${s.slug}`}>{s.title}</ColLink>)}
          </Col>

          {/* İstanbul Bölgeleri */}
          <Col title="İstanbul Bölgeleri">
            <ColLink href="/istanbul-ilceleri">Tüm İlçeler →</ColLink>
            {istanbulPages.map((p) => <ColLink key={p.slug} href={`/${p.slug}`}>{p.title}</ColLink>)}
          </Col>

          {/* Şirket */}
          <Col title="Şirket">
            {[
              { href: "/portfoy", label: "Portföy" },
              { href: "/rehber", label: "Rehber" },
              { href: "/fiyatlar", label: "Fiyatlar" },
              { href: "/hakkimizda", label: "Hakkımızda" },
              { href: "/iletisim", label: "İletişim" },
              { href: "/ucretsiz-analiz", label: "Ücretsiz Analiz" },
            ].map((l) => <ColLink key={l.href} href={l.href}>{l.label}</ColLink>)}
            <div style={{ margin: "4px 0", height: 1, backgroundColor: "#1e1e1e" }} />
            <a
              href="https://ticarethub.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.825rem", color: "#666", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
            >
              TicaretHub ↗
            </a>
          </Col>

        </div>
      </div>

      {/* Alt çubuk */}
      <div style={{ borderTop: "1px solid #1e1e1e", padding: "16px 24px" }}>
        <p style={{ maxWidth: 1200, margin: "0 auto", fontSize: "0.75rem", color: "#555" }}>
          © {new Date().getFullYear()} Solman Digital. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#555", marginBottom: 14 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  )
}

function ColLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ fontSize: "0.825rem", color: "#a8a8a8", textDecoration: "none" }}>
      {children}
    </Link>
  )
}
