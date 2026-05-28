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
