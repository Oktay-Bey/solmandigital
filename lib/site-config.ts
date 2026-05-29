export const siteConfig = {
  name: "Solman Digital",
  tagline: "Customized Software Expert",
  description:
    "İstanbul merkezli özel yazılım ofisi. E-ticaret, SaaS ve AI otomasyon projelerinizi template kullanmadan sıfırdan kuruyoruz. Doğrudan uzman erişimi, net takvim, taahhüt edilen teslim.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://solmandigital.com.tr",
  email: "info@solmandigital.com.tr",
  whatsapp: "+905439675250",
  whatsappDisplay: "0543 967 52 50",
  adminEmail: process.env.ADMIN_EMAIL || "solmanoktay@gmail.com",
  address: "Beşiktaş, İstanbul",
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || "",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL || "info@solmandigital.com.tr",
  resendAudienceId: process.env.RESEND_AUDIENCE_ID || "",
  resendAudienceLeadsWeb: process.env.RESEND_AUDIENCE_LEADS_WEB || "",
  resendAudienceLeadsTrendyol: process.env.RESEND_AUDIENCE_LEADS_TRENDYOL || "",
  resendAudienceLeadsSaas: process.env.RESEND_AUDIENCE_LEADS_SAAS || "",
  resendAudienceLeadsAi: process.env.RESEND_AUDIENCE_LEADS_AI || "",
  resendAudienceLeadsIstanbul: process.env.RESEND_AUDIENCE_LEADS_ISTANBUL || "",
  resendAudienceAudit: process.env.RESEND_AUDIENCE_AUDIT || "",
  resendAudienceConsultation: process.env.RESEND_AUDIENCE_CONSULTATION || "",
  resendAudienceSubscribers: process.env.RESEND_AUDIENCE_SUBSCRIBERS || "",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/solmandigital/30min",
  social: {
    linkedin: "https://linkedin.com/company/solmandigital",
    twitter: "https://twitter.com/solmandigital",
    github: "https://github.com/solmandigital",
  },
  keywords: [
    "yazılım ofisi istanbul",
    "next.js geliştirici beşiktaş",
    "ai içerik otomasyonu",
    "saas geliştirme türkiye",
    "eticaret kurulum",
    "trendyol api entegrasyonu",
    "full-stack geliştirici türkiye",
    "web uygulama geliştirme",
    "özel yazılım geliştirme istanbul",
    "e-ticaret yazılım geliştirici",
    "supabase next.js geliştirici",
    "yapay zeka otomasyon türkiye",
  ],
}

export function getLeadAudienceId(funnelType: string): string {
  const map: Record<string, string> = {
    "web-sitesi": siteConfig.resendAudienceLeadsWeb,
    trendyol: siteConfig.resendAudienceLeadsTrendyol,
    saas: siteConfig.resendAudienceLeadsSaas,
    ai: siteConfig.resendAudienceLeadsAi,
    "istanbul-dev": siteConfig.resendAudienceLeadsIstanbul,
    "istanbul-local": siteConfig.resendAudienceLeadsIstanbul,
  }
  return map[funnelType] || ""
}
