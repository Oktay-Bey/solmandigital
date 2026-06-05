"use client"

import { useState } from "react"
import Link from "next/link"
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

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              backgroundColor: "#111111",
              borderRadius: 6,
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: "-0.5px",
            }}
          >
            S
          </span>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#111111", letterSpacing: "-0.02em" }}>
            Solman<span style={{ color: "#9b1c1c" }}>Digital</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "0.5rem 0.875rem",
                borderRadius: 6,
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#555555",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#111111"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#555555"
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ucretsiz-analiz"
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem 0.875rem",
              border: "1px solid #fecaca",
              backgroundColor: "#fff0f0",
              color: "#9b1c1c",
              borderRadius: 6,
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            Ücretsiz Analiz
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "0.25rem",
              padding: "0.5rem 0.875rem",
              border: "1px solid #dcfce7",
              backgroundColor: "#f0fdf4",
              color: "#16a34a",
              borderRadius: 6,
              fontSize: "0.8rem",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <Link
            href="/iletisim"
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem 1.25rem",
              backgroundColor: "#9b1c1c",
              color: "#fff",
              borderRadius: 6,
              fontSize: "0.875rem",
              fontWeight: 600,
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f1d1d")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9b1c1c")}
          >
            Teklif Al
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
            border: "1px solid #e0e0e0",
            borderRadius: 6,
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "#111111",
          }}
          aria-label="Menüyü aç/kapat"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#ffffff",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.125rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "0.75rem 0.75rem",
                borderRadius: 6,
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#444444",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ucretsiz-analiz"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem 1rem",
              border: "1px solid #fecaca",
              backgroundColor: "#fff0f0",
              color: "#9b1c1c",
              borderRadius: 6,
              fontSize: "0.95rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Ücretsiz Analiz
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 1rem",
              border: "1px solid #dcfce7",
              backgroundColor: "#f0fdf4",
              color: "#16a34a",
              borderRadius: 6,
              fontSize: "0.95rem",
              fontWeight: 600,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <MessageCircle size={16} />
            WhatsApp&apos;ta Yaz
          </a>
          <Link
            href="/iletisim"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "#9b1c1c",
              color: "#fff",
              borderRadius: 6,
              fontSize: "0.95rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Teklif Al
          </Link>
        </div>
      )}
    </header>
  )
}
