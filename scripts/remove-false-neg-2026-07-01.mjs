/**
 * 1 Tem 2026 — YANLIŞ-POZİTİF negatif temizliği (Ana TR v2, 23968213148).
 * Sabahki toplu ekleme "AI browse" desenini fazla geniş yorumladı: `for business` /
 * `business solutions` / `for businesses` içeren terimler ASLINDA ALICI-NİYETLİ
 * (işine AI çözümü arayan KOBİ = tam hedef kitle) ama yanlışlıkla negatiflendi.
 * Bunları KALDIRIYORUZ. Saf listeleme (`providers`/`companies`) negatif KALIR (zayıf niyet).
 *
 * node scripts/remove-false-neg-2026-07-01.mjs [--dry]
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleAdsApi } from "google-ads-api";

const __dirname = dirname(fileURLToPath(import.meta.url));
for (const line of readFileSync(resolve(__dirname, "..", ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) { let v = m[2].trim(); if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1); if (!process.env[m[1]]) process.env[m[1]] = v; }
}
const DRY = process.argv.includes("--dry");
const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN });
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = loginId;
const customer = client.Customer(opts);

const CAMPAIGN_ID = "23968213148";
// Kaldırılacak = ALICI-niyetli (işletme için çözüm). Metin tam eşleşme (match type fark etmez).
const REMOVE_TEXTS = new Set([
  "ai solutions for business",
  "ai for business solutions",
  "ai business solutions",
  "ai software for businesses",
]);
// KALIR (saf listeleme, zayıf niyet): "ai solution providers", "ai solutions companies",
//        "ai software development solutions company", "ai business advertising".

async function main() {
  console.log(`\n===== YANLIŞ-POZİTİF NEGATİF TEMİZLİĞİ ${DRY ? "(DRY)" : "(CANLI)"} — Ana TR v2 =====\n`);
  const rows = await customer.query(`SELECT campaign_criterion.keyword.text, campaign_criterion.keyword.match_type, campaign_criterion.resource_name FROM campaign_criterion WHERE campaign.id=${CAMPAIGN_ID} AND campaign_criterion.type='KEYWORD' AND campaign_criterion.negative=true`);
  const hits = rows.filter((r) => REMOVE_TEXTS.has((r.campaign_criterion.keyword.text || "").toLowerCase().trim()));
  console.log(`Kaldırılacak (alıcı-niyetli, yanlışlıkla negatiflenmiş): ${hits.length}`);
  for (const r of hits) {
    const t = r.campaign_criterion.keyword.text;
    if (DRY) { console.log(`   [DRY] remove [mt${r.campaign_criterion.keyword.match_type}] "${t}"`); continue; }
    await customer.campaignCriteria.remove([r.campaign_criterion.resource_name]);
    console.log(`   ✓ kaldırıldı [mt${r.campaign_criterion.keyword.match_type}] "${t}"`);
  }
  console.log("\nKALAN (saf listeleme — bilinçli negatif tutuldu): ai solution providers, ai solutions companies, ai software development solutions company, ai business advertising");
  if (DRY) console.log(">>> DRY RUN.");
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
