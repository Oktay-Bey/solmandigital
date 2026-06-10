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

export type LeadFunnelType = "web-sitesi" | "trendyol" | "saas" | "ai" | "istanbul-dev" | "istanbul-local" | "ticarethub-referral"

export type LeadPayload = {
  funnelType: LeadFunnelType
  firstName: string
  email: string
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
}
