export type SubscribePayload = {
  email: string
  firstName: string
  source: "newsletter" | "download" | "footer" | "popup" | "service-page"
}

export type AuditPayload = {
  firstName: string
  email: string
  websiteUrl: string
  serviceInterest: string
  currentProblem: string
}

export type ConsultationPayload = {
  firstName: string
  email: string
  phone: string
  companyName: string
  projectBrief: string
}

export type LeadFunnelType = "web-sitesi" | "trendyol" | "saas" | "ai" | "ai-en" | "istanbul-dev" | "istanbul-local" | "ticarethub-referral" | "musteri-yaniti"

export type LeadPayload = {
  funnelType: LeadFunnelType
  firstName: string
  // musteri-yaniti funnel'ı telefon-merkezli: e-posta opsiyonel, telefon zorunlu.
  // Diğer funnel'lar e-postayı her zaman gönderir; route doğrulaması funnelType'a göre.
  email?: string
  phone?: string
  companyName?: string
  budget?: string
  timeline?: string
  // web-sitesi
  siteType?: string
  existingSite?: string
  brief?: string
  // trendyol
  marketplaces?: string
  monthlyOrders?: string
  currentSolution?: string
  urgency?: string
  specificPain?: string
  integrationProduct?: string // entegrasyon ürün kataloğu: hangi üründen gelindi
  // saas
  productIdea?: string
  targetUser?: string
  fundingStage?: string
  existingTech?: string
  // ai
  aiUseCase?: string
  currentVolume?: string
  companySize?: string
  painPoint?: string
  // istanbul-dev / istanbul-local
  projectType?: string
  companyType?: string
  prefersMeeting?: string
  projectBrief?: string
  district?: string
  // musteri-yaniti (sektörel müşteri yanıt otomasyonu)
  sector?: string // restoran | güzellik | emlak | oto | diğer
  channel?: string // whatsapp | telefon | web | hepsi
}
