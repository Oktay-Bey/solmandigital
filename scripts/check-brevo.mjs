import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim()] })
)

const res = await fetch("https://api.brevo.com/v3/smtp/emails?limit=20&sort=desc", {
  headers: { "api-key": env.BREVO_API_KEY, "Accept": "application/json" }
})
const data = await res.json()
console.log("Toplam gönderilen:", data.count ?? 0)
console.log("")
for (const m of data.transactionalEmails ?? []) {
  console.log(`${m.date} | ${m.email} | ${(m.subject||"").slice(0,45)} | ${m.status}`)
}
