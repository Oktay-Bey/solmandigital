/** AI Otomasyon kampanyasının TÜM hedefleme kriterlerini (location + proximity + dil + geo tipi) tam dök. */
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
const ID = "23983004103";

async function geoName(gid) {
  const r = await c.query(`SELECT geo_target_constant.name, geo_target_constant.canonical_name, geo_target_constant.country_code, geo_target_constant.target_type FROM geo_target_constant WHERE geo_target_constant.id = ${gid}`);
  return r[0]?.geo_target_constant;
}

async function main() {
  // Geo tipi ayarı
  const camp = (await c.query(`SELECT campaign.name, campaign.geo_target_type_setting.positive_geo_target_type, campaign.geo_target_type_setting.negative_geo_target_type FROM campaign WHERE campaign.id = ${ID}`))[0];
  console.log(`Kampanya: ${camp.campaign.name}`);
  console.log(`Geo tipi: positive=${camp.campaign.geo_target_type_setting?.positive_geo_target_type} (7=PRESENCE), negative=${camp.campaign.geo_target_type_setting?.negative_geo_target_type}\n`);

  // TÜM kriter tiplerini çek (sadece LOCATION değil — hiçbir şey kaçmasın)
  const all = await c.query(`SELECT campaign_criterion.type, campaign_criterion.negative, campaign_criterion.location.geo_target_constant, campaign_criterion.proximity.geo_point.longitude_in_micro_degrees, campaign_criterion.proximity.radius, campaign_criterion.language.language_constant, campaign_criterion.keyword.text FROM campaign_criterion WHERE campaign.id = ${ID}`);
  const byType = {};
  for (const r of all) { const t = r.campaign_criterion.type; byType[t] = (byType[t] || 0) + 1; }
  console.log("Kriter tipleri (sayı):", JSON.stringify(byType));
  console.log("(2=KEYWORD 6=LOCATION 11=LANGUAGE 9=PROXIMITY 7=DEVICE)\n");

  console.log("=== LOCATION (positive + negative) ===");
  for (const r of all.filter((x) => x.campaign_criterion.location?.geo_target_constant)) {
    const gid = r.campaign_criterion.location.geo_target_constant.split("/")[1];
    const g = await geoName(gid);
    console.log(`  ${r.campaign_criterion.negative ? "NEGATİF" : "pozitif"} | ${gid} => ${g?.name} (${g?.canonical_name}) [${g?.country_code}/${g?.target_type}]`);
  }

  console.log("\n=== LOCATION dışı / tanımsız kriterler (type≠2 KEYWORD) ham dökum ===");
  for (const r of all.filter((x) => x.campaign_criterion.type !== 2 && !x.campaign_criterion.location?.geo_target_constant)) {
    console.log(`  type=${r.campaign_criterion.type} neg=${r.campaign_criterion.negative} =>`, JSON.stringify(r.campaign_criterion).slice(0, 300));
  }

  const prox = all.filter((x) => x.campaign_criterion.type === 9);
  if (prox.length) console.log(`\n⚠️ PROXIMITY (yarıçap) hedef: ${prox.length} adet`);

  console.log("\n=== DİL ===");
  for (const r of all.filter((x) => x.campaign_criterion.language?.language_constant)) {
    console.log(`  ${r.campaign_criterion.language.language_constant}`);
  }

  // Suriye / Ukrayna / yanlış ülke var mı özel kontrol
  console.log("\n=== ÜLKE TARAMASI (TR dışı pozitif location var mı?) ===");
  let foreign = 0;
  for (const r of all.filter((x) => x.campaign_criterion.location?.geo_target_constant && !x.campaign_criterion.negative)) {
    const gid = r.campaign_criterion.location.geo_target_constant.split("/")[1];
    const g = await geoName(gid);
    if (g?.country_code && g.country_code !== "TR") { console.log(`  ⚠️ TR-DIŞI: ${gid} ${g.name} [${g.country_code}]`); foreign++; }
  }
  console.log(foreign ? `  ${foreign} yabancı hedef bulundu!` : "  ✓ Tüm pozitif location TR — yabancı hedef YOK.");
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
