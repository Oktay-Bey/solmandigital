/**
 * Mevcut "İstanbul Yerel" kampanyasına (23955887164) Şişli/Beşiktaş/Beyoğlu'nu
 * NEGATİF location olarak ekler — yeni hiper-lokal kampanya (23986514122) ile
 * iç rekabeti (çakışmayı) önlemek için.
 *
 * Kullanım: node scripts/add-negative-geo-istanbul.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleAdsApi } from "google-ads-api";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
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

const ISTANBUL_CAMPAIGN_ID = "23955887164";
const DISTRICTS = [
  { name: "Şişli", id: 9198790 },
  { name: "Beşiktaş", id: 9198329 },
  { name: "Beyoğlu", id: 9198916 },
];

const campaignResource = `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "")}/campaigns/${ISTANBUL_CAMPAIGN_ID}`;

async function main() {
  console.log("=== İstanbul Yerel kampanyasına negatif geo ekleniyor ===\n");

  // Önce mevcut negatif location'ları kontrol et (idempotent ol)
  const existing = await customer.query(
    `SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.negative FROM campaign_criterion WHERE campaign.id = ${ISTANBUL_CAMPAIGN_ID} AND campaign_criterion.type = 'LOCATION' AND campaign_criterion.negative = true`
  );
  const already = new Set(
    existing.map((r) => r.campaign_criterion?.location?.geo_target_constant).filter(Boolean)
  );

  for (const d of DISTRICTS) {
    const geoRes = `geoTargetConstants/${d.id}`;
    if (already.has(geoRes)) {
      console.log(`  �=  ${d.name} (${d.id}) zaten negatif — atlandı`);
      continue;
    }
    try {
      await customer.campaignCriteria.create([{
        campaign: campaignResource,
        negative: true,
        location: { geo_target_constant: geoRes },
      }]);
      console.log(`  ✓  ${d.name} (${d.id}) negatif location eklendi`);
    } catch (e) {
      console.error(`  ✗  ${d.name} EKLENEMEDİ:`, e.message || e);
    }
  }

  // Doğrula
  console.log("\n── Doğrulama: kampanyanın negatif location'ları ──");
  const check = await customer.query(
    `SELECT campaign_criterion.location.geo_target_constant FROM campaign_criterion WHERE campaign.id = ${ISTANBUL_CAMPAIGN_ID} AND campaign_criterion.type = 'LOCATION' AND campaign_criterion.negative = true`
  );
  for (const r of check) console.log("  -", r.campaign_criterion?.location?.geo_target_constant);
}

main().catch((e) => { console.error("\nHATA:", e.message || e); process.exit(1); });
