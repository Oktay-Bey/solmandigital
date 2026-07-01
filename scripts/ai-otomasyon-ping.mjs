/**
 * OAuth/token canlılık testi + mevcut kampanya envanteri.
 * AI Otomasyon sert-atış kampanyası kurulumundan ÖNCE token geçerli mi doğrular.
 * Kullanım: node scripts/ai-otomasyon-ping.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleAdsApi } from "google-ads-api";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
for (const line of readFileSync(resolve(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) { let v = m[2].trim(); if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1); if (!process.env[m[1]]) process.env[m[1]] = v; }
}

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = loginId;
const customer = client.Customer(opts);

async function main() {
  console.log("=== TOKEN PING + KAMPANYA ENVANTERİ ===\n");
  const rows = await customer.query(`
    SELECT campaign.id, campaign.name, campaign.status, campaign.bidding_strategy_type,
           campaign_budget.amount_micros
    FROM campaign WHERE campaign.status != 'REMOVED' ORDER BY campaign.name
  `);
  console.log(`✓ TOKEN GEÇERLİ — ${rows.length} kampanya bulundu:\n`);
  const ST = { 2: "ENABLED", 3: "PAUSED", 4: "REMOVED" };
  for (const r of rows) {
    const b = Number(r.campaign_budget?.amount_micros ?? 0) / 1e6;
    console.log(`  [${ST[Number(r.campaign.status)] ?? r.campaign.status}] ${r.campaign.name} (${r.campaign.id}) — ${b}₺/gün`);
  }
  const dup = rows.find((r) => /AI Otomasyon — Sert At/i.test(r.campaign.name));
  console.log(dup ? `\n⚠️  Aynı isimli kampanya VAR (${dup.campaign.id}) — kurulum atlanmalı/temizlenmeli.` : "\n✓ 'Sert Atış' kampanyası henüz yok — kuruluma hazır.");

  // Conversion action doğrula (qualify_lead bağlı mı)
  try {
    const ca = await customer.query(`
      SELECT conversion_action.id, conversion_action.name, conversion_action.status,
             conversion_action.type, conversion_action.category
      FROM conversion_action WHERE conversion_action.status = 'ENABLED'
    `);
    console.log(`\n=== ENABLED CONVERSION ACTIONS (${ca.length}) ===`);
    for (const r of ca) console.log(`  • ${r.conversion_action.name} (${r.conversion_action.id})`);
  } catch (e) { console.warn("conversion_action sorgu hatası:", e.message); }
}
main().catch((e) => { console.error("✗ HATA:", e.message || e); process.exit(1); });
