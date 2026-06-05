import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { siteConfig } from "@/lib/site-config"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import StickyCtaBar from "@/components/StickyCtaBar"
import ExitIntentPopup from "@/components/ExitIntentPopup"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Solman Digital — İstanbul Full-Stack Yazılım Uzmanı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: siteConfig.googleVerification || undefined,
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.email,
    contactType: "customer service",
    availableLanguage: ["Turkish", "English"],
  },
  foundingDate: "2023",
  knowsAbout: [
    "Next.js Development",
    "SaaS Development",
    "AI Content Automation",
    "E-Commerce Development",
    "Trendyol API Integration",
    "Web Scraping",
    "Dashboard Development",
  ],
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
    siteConfig.social.github,
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: "tr-TR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/rehber?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  serviceType: "Custom Software Development",
  areaServed: {
    "@type": "Country",
    name: "Turkey",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beşiktaş",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dijital Hizmetler",
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.whatsapp,
  email: siteConfig.email,
  image: `${siteConfig.url}/og-image.jpg`,
  logo: `${siteConfig.url}/logo.png`,
  foundingDate: "2023",
  slogan: "Doğrudan uzman erişimi — katman yok",
  knowsLanguage: ["tr", "en"],
  priceRange: "₺₺–₺₺₺",
  currenciesAccepted: "TRY",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beşiktaş",
    addressLocality: "İstanbul",
    addressRegion: "İstanbul",
    postalCode: "34349",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0426,
    longitude: 28.9965,
  },
  areaServed: [
    { "@type": "City", name: "İstanbul" },
    { "@type": "Country", name: "Turkey" },
  ],
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Yazılım Hizmetleri",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kurumsal Web Sitesi Geliştirme" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-Ticaret Kurulum" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Web Uygulama Geliştirme" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI İçerik Otomasyonu" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Trendyol & Marketplace Entegrasyonu" } },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={geist.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H2QM5NPTED"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H2QM5NPTED');
          `}
        </Script>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyCtaBar />
        <ExitIntentPopup />
      </body>
    </html>
  )
}
