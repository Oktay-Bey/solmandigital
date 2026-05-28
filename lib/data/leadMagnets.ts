export type LeadMagnet = {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  variant: "audit" | "download" | "consultation"
}

export const categoryLeadMagnetMap: Record<string, LeadMagnet> = {
  "E-Ticaret & Satış": {
    title: "E-Ticaret Başlangıç Rehberi",
    description: "Türkiye'de e-ticaret kurmanın 47 adımını içeren ücretsiz rehberi indirin.",
    ctaText: "Ücretsiz İndir",
    ctaHref: "/indir/e-ticaret-baslangic-rehberi",
    variant: "download",
  },
  "AI & Otomasyon": {
    title: "Ücretsiz Site Analizi",
    description: "AI otomasyon potansiyelinizi ve teknik SEO durumunuzu ücretsiz değerlendirin.",
    ctaText: "Analiz İste",
    ctaHref: "/ucretsiz-analiz",
    variant: "audit",
  },
  "Web Sitesi & Tasarım": {
    title: "Ücretsiz Danışmanlık",
    description: "30 dakikada projenizin kapsamını ve bütçesini birlikte planlayalım.",
    ctaText: "Rezervasyon Yap",
    ctaHref: "/danismanlik",
    variant: "consultation",
  },
  "SEO & İçerik": {
    title: "Ücretsiz SEO Analizi",
    description: "Sitenizin teknik SEO durumunu, hız metriklerini ve rakip karşılaştırmasını ücretsiz inceleyin.",
    ctaText: "Analiz İste",
    ctaHref: "/ucretsiz-analiz",
    variant: "audit",
  },
  "SaaS & Platform": {
    title: "Ücretsiz Teknik Danışmanlık",
    description: "SaaS mimarinizi ve teknik altyapınızı birlikte planlayalım.",
    ctaText: "Rezervasyon Yap",
    ctaHref: "/danismanlik",
    variant: "consultation",
  },
  "Özel Çözümler": {
    title: "Ücretsiz Proje Analizi",
    description: "Projenizin teknik gereksinimlerini ve uygulanabilirliğini ücretsiz değerlendirin.",
    ctaText: "Analiz İste",
    ctaHref: "/ucretsiz-analiz",
    variant: "audit",
  },
}
