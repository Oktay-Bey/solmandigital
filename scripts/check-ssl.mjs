// found-emails.json'daki sitelerin gerçek HTTPS durumunu kontrol eder.
import { readFileSync } from "node:fs"

const leads = JSON.parse(readFileSync(new URL("./found-emails.json", import.meta.url), "utf8"))

for (const lead of leads) {
  const host = new URL(lead.website).host
  let status
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(`https://${host}/`, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    })
    clearTimeout(t)
    status = `HTTPS OK (${res.status})`
  } catch (e) {
    status = `HTTPS YOK/HATALI (${e.cause?.code ?? e.message})`
  }
  console.log(`${lead.title.slice(0, 45).padEnd(46)} ${host.padEnd(32)} ${status}`)
}
