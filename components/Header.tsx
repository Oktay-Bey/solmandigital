"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/rehber", label: "Rehber" },
  { href: "/portfoy", label: "Projeler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const waHref = `https://wa.me/${siteConfig.whatsapp.replace("+", "")}`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-ink-200 shadow-card"
          : "bg-white border-ink-200"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-md bg-ink-900 text-sm font-extrabold tracking-tight text-white">
            S
          </span>
          <span className="text-[1.05rem] font-bold tracking-tight text-ink-900">
            Solman<span className="text-accent-700">Digital</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-ink-900"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ucretsiz-analiz"
            className="ml-2 rounded-md border border-accent-200 bg-accent-50 px-3.5 py-2 text-[0.8rem] font-semibold text-accent-700 transition-colors hover:bg-accent-100"
          >
            Ücretsiz Analiz
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-3.5 py-2 text-[0.8rem] font-semibold text-success transition-colors hover:bg-green-100"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <Link
            href="/iletisim"
            className="ml-2 rounded-md bg-accent-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-800"
          >
            Teklif Al
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn hidden h-11 w-11 items-center justify-center rounded-md border border-ink-200 bg-transparent text-ink-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç/kapat"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu flex flex-col gap-0.5 border-t border-ink-200 bg-white px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-md border-b border-ink-100 px-3 py-3 text-[0.95rem] font-medium ${
                isActive(link.href) ? "text-accent-700" : "text-ink-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ucretsiz-analiz"
            onClick={() => setMenuOpen(false)}
            className="mt-3 rounded-md border border-accent-200 bg-accent-50 px-4 py-3 text-center text-[0.95rem] font-semibold text-accent-700"
          >
            Ücretsiz Analiz
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-center text-[0.95rem] font-semibold text-success"
          >
            <MessageCircle size={16} />
            WhatsApp&apos;ta Yaz
          </a>
          <Link
            href="/iletisim"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-md bg-accent-700 px-4 py-3 text-center text-[0.95rem] font-semibold text-white"
          >
            Teklif Al
          </Link>
        </div>
      )}
    </header>
  )
}
