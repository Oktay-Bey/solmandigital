/** AI Otomasyon kampanyası final doğrulama — tüm bileşenleri API'den okur. */
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
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = loginId;
const customer = client.Customer(opts);
const ID = "23983004103";
async function main() {
  const c = (await customer.query(`SELECT campaign.name, campaign.status, campaign.bidding_strategy_type, campaign_budget.amount_micros, campaign.geo_target_type_setting.positive_geo_target_type FROM campaign WHERE campaign.id = ${ID}`))[0];
  console.log("=== KAMPANYA ===");
  console.log(`  ${c.campaign.name}`);
  console.log(`  Durum: ${["?","?","ENABLED","PAUSED"][c.campaign.status] ?? c.campaign.status} | Bütçe: ${Number(c.campaign_budget.amount_micros)/1e6}₺/gün`);
  console.log(`  Teklif: ${c.campaign.bidding_strategy_type} | Geo tipi: ${c.campaign.geo_target_type_setting?.positive_geo_target_type} (7=PRESENCE)`);

  const geo = await customer.query(`SELECT campaign_criterion.location.geo_target_constant, campaign_criterion.bid_modifier FROM campaign_criterion WHERE campaign.id = ${ID} AND campaign_criterion.type = 'LOCATION'`);
  console.log("\n=== GEO ===");
  geo.forEach((g) => console.log(`  ${g.campaign_criterion.location.geo_target_constant}${g.campaign_criterion.bid_modifier ? " bid×"+g.campaign_criterion.bid_modifier : ""}`));

  const lang = await customer.query(`SELECT campaign_criterion.language.language_constant FROM campaign_criterion WHERE campaign.id = ${ID} AND campaign_criterion.type = 'LANGUAGE'`);
  console.log("  Dil:", lang.map((l) => l.campaign_criterion.language.language_constant).join(", "));

  const kw = await customer.query(`SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.cpc_bid_micros FROM ad_group_criterion WHERE campaign.id = ${ID} AND ad_group_criterion.type = KEYWORD AND ad_group_criterion.negative = FALSE AND ad_group_criterion.status != 'REMOVED'`);
  console.log(`\n=== KEYWORD (${kw.length}) ===`);
  kw.forEach((k) => console.log(`  [${["?","?","EXACT","PHRASE","BROAD"][k.ad_group_criterion.keyword.match_type]}] ${k.ad_group_criterion.keyword.text} @ ${Number(k.ad_group_criterion.cpc_bid_micros)/1e6}₺`));

  const neg = await customer.query(`SELECT campaign_criterion.criterion_id FROM campaign_criterion WHERE campaign.id = ${ID} AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`);
  console.log(`\n=== NEGATİF: ${neg.length} ===`);

  const ad = (await customer.query(`SELECT ad_group_ad.ad.responsive_search_ad.headlines, ad_group_ad.ad.responsive_search_ad.descriptions, ad_group_ad.status, ad_group_ad.policy_summary.approval_status FROM ad_group_ad WHERE campaign.id = ${ID} AND ad_group_ad.status != 'REMOVED'`))[0];
  console.log("\n=== RSA ===");
  console.log(`  Başlık: ${ad.ad_group_ad.ad.responsive_search_ad.headlines.length} | Açıklama: ${ad.ad_group_ad.ad.responsive_search_ad.descriptions.length}`);
  console.log(`  Onay durumu: ${ad.ad_group_ad.policy_summary?.approval_status} (2=APPROVED, 3=AREA_OF_INTEREST_ONLY, 4=DISAPPROVED)`);
  console.log(`  İlk 3 başlık: ${ad.ad_group_ad.ad.responsive_search_ad.headlines.slice(0,3).map((h)=>h.text).join(" | ")}`);

  const assets = await customer.query(`SELECT campaign.id, campaign_asset.field_type FROM campaign_asset WHERE campaign.id = ${ID} AND campaign_asset.status = 'ENABLED'`);
  const byType = {};
  assets.forEach((a) => { const t = a.campaign_asset.field_type; byType[t] = (byType[t]||0)+1; });
  console.log("\n=== UZANTILAR ===");
  Object.entries(byType).forEach(([t, n]) => console.log(`  ${t}: ${n}`));
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
