// found-emails.json'daki adresleri MX + SMTP RCPT TO ile doğrular.
// Sitelerden kazınmış adreslerin gerçekten ulaşılabilir olduğunu teyit eder.
// Kullanım: node scripts/verify-found.mjs [in.json] [out.json]

import { promises as dns } from "node:dns"
import net from "node:net"
import { readFileSync, writeFileSync } from "node:fs"

const rd = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8").replace(/^﻿/, ""))

const inFile = process.argv[2] ?? "./found-emails.json"
const outFile = process.argv[3] ?? "./verified-found.json"

// Sitelere gömülü 3. taraf script'lerden kaçan alakasız domain'ler
const ALIEN = /300\.cn|cidapps\.com|sentry|wixpress|googleapis|gstatic|cloudflare|jsdelivr|gravatar|w3\.org|schema\.org|nutrist\.com|therapiagroup/i

async function hasMx(domain) {
  try { return (await dns.resolveMx(domain)).length > 0 } catch { return false }
}

// SMTP RCPT TO probe (12s timeout). valid / invalid / unknown(soft)
function smtpVerify(email, mxHost) {
  return new Promise((resolve) => {
    const socket = net.createConnection(25, mxHost)
    const timeout = setTimeout(() => { socket.destroy(); resolve("unknown") }, 12000)
    let step = 0
    const commands = [
      `EHLO solmandigital.com.tr\r\n`,
      `MAIL FROM:<info@solmandigital.com.tr>\r\n`,
      `RCPT TO:<${email}>\r\n`,
      `QUIT\r\n`,
    ]
    socket.on("data", (data) => {
      const msg = data.toString()
      if (step === 3) {
        clearTimeout(timeout); socket.destroy()
        if (/^25[01]/.test(msg)) resolve("valid")
        else if (/^55[013]/.test(msg)) resolve("invalid")
        else resolve("unknown")
        return
      }
      socket.write(commands[step]); step++
    })
    socket.on("error", () => { clearTimeout(timeout); resolve("unknown") })
    socket.on("close", () => { clearTimeout(timeout); resolve("unknown") })
  })
}

const rows = rd(inFile)
console.log(`${rows.length} aday e-posta doğrulanıyor (MX + SMTP)...\n`)

const out = []
for (const r of rows) {
  const email = (r.email || "").toLowerCase().trim()
  const domain = email.split("@")[1]
  if (!domain || ALIEN.test(email)) { console.log(`  ✗ [alien]   ${email}`); continue }
  if (!(await hasMx(domain))) { console.log(`  ✗ [no-mx]   ${email}`); continue }

  // SMTP RCPT probe sadece SMTP_PROBE=1 ise (yerel ağda 25. port genelde kapalı)
  let status = "mx-ok"
  if (process.env.SMTP_PROBE === "1") {
    let mx
    try { mx = (await dns.resolveMx(domain)).sort((a, b) => a.priority - b.priority) } catch { mx = [] }
    status = mx.length ? await smtpVerify(email, mx[0].exchange) : "unknown"
    if (status === "invalid") { console.log(`  ✗ [invalid] ${email}`); continue }
  }
  out.push({ title: r.title, email, website: r.website ?? null, verify: status })
  console.log(`  ✓ [${status.padEnd(7)}] ${email}`)
}

writeFileSync(new URL(outFile, import.meta.url), JSON.stringify(out, null, 2), "utf8")
const valid = out.filter(x => x.verify === "valid").length
console.log(`\n${"─".repeat(50)}`)
console.log(`${out.length}/${rows.length} geçti (kesin valid: ${valid}, soft: ${out.length - valid}) → scripts/${outFile.replace("./", "")}`)
