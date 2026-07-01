/** type=6 ama geo_target_constant'sız 30000/30001/30002 kriterlerinin gerçek ne olduğunu çöz. */
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
const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN });
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
const l = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID; if (l && l !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = l;
const c = client.Customer(opts);
async function main() {
  // criterion_id ile filtrele, location_group dahil tüm alanları çek
  const rows = await c.query(`
    SELECT campaign_criterion.criterion_id, campaign_criterion.type, campaign_criterion.status,
      campaign_criterion.display_name, campaign_criterion.negative,
      campaign_criterion.proximity.radius, campaign_criterion.proximity.geo_point.latitude_in_micro_degrees
    FROM campaign_criterion
    WHERE campaign.id = 23983004103 AND campaign_criterion.criterion_id IN (30000, 30001, 30002)
  `);
  console.log(`Bulunan: ${rows.length}`);
  for (const r of rows) {
    console.log(JSON.stringify(r.campaign_criterion, null, 2));
  }
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
