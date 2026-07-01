/**
 * GEO DÜZELTME: 1012867 (yanlışlıkla Kherson/Ukrayna — İstanbul sanılmıştı) +
 * onun bid modifier'ını KALDIR, doğru İstanbul ilini (21069) ekle + İstanbul'a +%15 bid.
 * Kampanya PAUSED — zarar yok. İstanbul doğru ID memory'de: 21069 (campaigns.ts yorumu yanlış).
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleAdsApi } from "google-ads-api";
import { google } from "googleapis";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
for (const line of readFileSync(resolve(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) { let v = m[2].trim(); if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1); if (!process.env[m[1]]) process.env[m[1]] = v; }
}
const APPLY = process.argv.includes("--apply");
const CID = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");
const LOGIN_ID = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN });
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
if (LOGIN_ID && LOGIN_ID !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = LOGIN_ID;
const customer = client.Customer(opts);
const CAMPAIGN_ID = "23983004103";
const WRONG_ID = "1012867";   // Kherson, Ukrayna
const ISTANBUL_ID = "21069";  // doğru İstanbul ili (TR/Province)

async function tok() { const a = new google.auth.OAuth2(process.env.GOOGLE_ADS_CLIENT_ID, process.env.GOOGLE_ADS_CLIENT_SECRET); a.setCredentials({ refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN }); return (await a.getAccessToken()).token; }
async function rest(body) {
  const headers = { Authorization: `Bearer ${await tok()}`, "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN, "Content-Type": "application/json; charset=utf-8" };
  if (LOGIN_ID && LOGIN_ID !== process.env.GOOGLE_ADS_CUSTOMER_ID) headers["login-customer-id"] = LOGIN_ID;
  const res = await fetch(`https://googleads.googleapis.com/v23/customers/${CID}/googleAds:mutate`, { method: "POST", headers, body: new TextEncoder().encode(JSON.stringify(body)) });
  const text = await res.text();
  if (!res.ok || text.trim().startsWith("<")) throw new Error(`REST ${res.status}: ${text.slice(0, 600)}`);
  return JSON.parse(text);
}

async function main() {
  // Önce doğru İstanbul ID'sini API ile teyit et
  const ist = await customer.query(`SELECT geo_target_constant.name, geo_target_constant.canonical_name, geo_target_constant.country_code, geo_target_constant.target_type FROM geo_target_constant WHERE geo_target_constant.id = ${ISTANBUL_ID}`);
  const g = ist[0]?.geo_target_constant;
  console.log(`İstanbul (${ISTANBUL_ID}) doğrulama: ${g?.name} (${g?.canonical_name}) [${g?.country_code}/${g?.target_type}]`);
  if (g?.country_code !== "TR") { console.error("✗ 21069 TR değil — durduruldu."); process.exit(1); }

  // Kaldırılacak yanlış kriterleri bul (Kherson location + onun bid modifier)
  const rows = await customer.query(`SELECT campaign_criterion.resource_name, campaign_criterion.location.geo_target_constant, campaign_criterion.bid_modifier FROM campaign_criterion WHERE campaign.id = ${CAMPAIGN_ID} AND campaign_criterion.type = LOCATION`);
  const toRemove = rows.filter((r) => (r.campaign_criterion.location.geo_target_constant || "").endsWith(`/${WRONG_ID}`)).map((r) => r.campaign_criterion.resource_name);
  console.log(`\nKaldırılacak (Kherson ${WRONG_ID}): ${toRemove.length} kriter`);
  toRemove.forEach((rn) => console.log("  -", rn));

  if (!APPLY) { console.log("\nDRY-RUN — yazılmadı. Uygulamak için: --apply"); return; }

  // 1. Yanlış kriterleri kaldır (location + bid modifier aynı geo'ya bağlı)
  if (toRemove.length) {
    await rest({ mutateOperations: toRemove.map((rn) => ({ campaignCriterionOperation: { remove: rn } })) });
    console.log("✓ Kherson kriterleri kaldırıldı");
  }
  const campaignResource = `customers/${CID}/campaigns/${CAMPAIGN_ID}`;
  // 2. Doğru İstanbul location ekle
  await customer.campaignCriteria.create([{ campaign: campaignResource, location: { geo_target_constant: `geoTargetConstants/${ISTANBUL_ID}` } }]);
  console.log("✓ İstanbul (21069) location eklendi");
  // 3. İstanbul +%15 bid modifier
  await rest({ mutateOperations: [{ campaignCriterionOperation: { create: { campaign: campaignResource, location: { geoTargetConstant: `geoTargetConstants/${ISTANBUL_ID}` }, bidModifier: 1.15 } } }] });
  console.log("✓ İstanbul +%15 bid modifier eklendi");

  // Doğrula
  const after = await customer.query(`SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.bid_modifier FROM campaign_criterion WHERE campaign.id = ${CAMPAIGN_ID} AND campaign_criterion.type = LOCATION`);
  console.log("\n=== Düzeltme sonrası LOCATION ===");
  for (const r of after) {
    const id = r.campaign_criterion.location.geo_target_constant.split("/")[1];
    const info = await customer.query(`SELECT geo_target_constant.name, geo_target_constant.country_code FROM geo_target_constant WHERE geo_target_constant.id = ${id}`);
    console.log(`  ${id} bid=${r.campaign_criterion.bid_modifier ?? "-"} => ${info[0]?.geo_target_constant?.name} [${info[0]?.geo_target_constant?.country_code}]`);
  }
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
