// Resend domaininde open + click tracking'i açar.
import { Resend } from "resend"
import { readFileSync } from "node:fs"

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
const apiKey = env.match(/^RESEND_API_KEY=(.+)$/m)?.[1]?.trim()
const resend = new Resend(apiKey)

const { data: list, error: listErr } = await resend.domains.list()
if (listErr) {
  console.error("Domain listesi alınamadı:", listErr.message)
  process.exit(1)
}

const domain = list.data.find((d) => d.name === "solmandigital.com.tr")
if (!domain) {
  console.error("solmandigital.com.tr bulunamadı. Mevcut:", list.data.map((d) => d.name).join(", "))
  process.exit(1)
}
console.log(`Domain: ${domain.name} (${domain.status})`)

const { error: updErr } = await resend.domains.update({
  id: domain.id,
  openTracking: true,
  clickTracking: true,
})
if (updErr) {
  console.error("Güncelleme hatası:", updErr.message)
  process.exit(1)
}

const { data: check } = await resend.domains.get(domain.id)
console.log("Open tracking:", check?.records ? "" : "", JSON.stringify({ open: check?.open_tracking ?? check?.openTracking, click: check?.click_tracking ?? check?.clickTracking }))
console.log("Tracking açıldı.")
