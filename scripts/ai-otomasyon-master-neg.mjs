/**
 * Master negatif kalkanını (universal + tr) AI Otomasyon kampanyasına uygular.
 * apply-master-negatives.mjs yalnızca ENABLED kampanyaları hedefler; bu kampanya
 * PAUSED olduğundan onu kapsamıyor — bu script doğrudan ID ile uygular. Idempotent.
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
const DRY = !process.argv.includes("--apply");
const CAMPAIGN_ID = "23983004103";
const master = JSON.parse(readFileSync(resolve(__dirname, "master-negatives.json"), "utf8"));
const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN });
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = loginId;
const customer = client.Customer(opts);
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");

async function main() {
  const wanted = [...master.universal, ...master.tr].map((t) => t.trim()).filter(Boolean);
  const rows = await customer.query(`SELECT campaign_criterion.keyword.text FROM campaign_criterion WHERE campaign.id = ${CAMPAIGN_ID} AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`);
  const existing = new Set(rows.map((r) => (r.campaign_criterion?.keyword?.text || "").toLowerCase().trim()));
  const toAdd = [...new Set(wanted.map((t) => t.toLowerCase()))].filter((t) => !existing.has(t));
  console.log(`Master negatif (universal+tr): ${wanted.length} | mevcut: ${existing.size} | eklenecek: ${toAdd.length}`);
  if (DRY) { console.log("DRY-RUN — ilk 30:", toAdd.slice(0, 30)); console.log("Uygulamak için: --apply"); return; }
  const campaignResource = `customers/${cid}/campaigns/${CAMPAIGN_ID}`;
  let added = 0;
  for (const text of toAdd) {
    try { await customer.campaignCriteria.create([{ campaign: campaignResource, negative: true, keyword: { text, match_type: 3 } }]); added++; } catch { /* skip */ }
  }
  console.log(`✓ ${added} negatif eklendi. Toplam negatif: ${existing.size + added}`);
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
