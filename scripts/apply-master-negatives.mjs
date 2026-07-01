/**
 * PROAKTİF SAVUNMA: master-negatives.json'daki kategorik negatif şablonunu
 * TÜM ENABLED kampanyalara uygular. TR kampanyalara universal+tr, EN'lere universal+en.
 * Idempotent — zaten var olan negatifler API tarafından sessizce atlanır.
 *
 * Kullanım:
 *   node scripts/apply-master-negatives.mjs            # canlı uygula
 *   node scripts/apply-master-negatives.mjs --dry      # sadece ne ekleneceğini göster
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

const DRY = process.argv.includes("--dry");
const master = JSON.parse(readFileSync(resolve(__dirname, "master-negatives.json"), "utf8"));

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = loginId;
const customer = client.Customer(opts);
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");

// EN kampanyaları isimden tespit (EN, Macedonia, Baku, Syria, Arabic)
const isEnglish = (name) => /\b(EN|Macedonia|Baku|Syria|Arabic|AZ)\b/i.test(name);

async function getEnabledCampaigns() {
  const rows = await customer.query(
    "SELECT campaign.id, campaign.name FROM campaign WHERE campaign.status = 'ENABLED' AND campaign.advertising_channel_type = 'SEARCH'"
  );
  return rows.map((r) => ({ id: r.campaign.id, name: r.campaign.name }));
}

async function getExistingNegatives(campaignId) {
  const rows = await customer.query(
    `SELECT campaign_criterion.keyword.text FROM campaign_criterion WHERE campaign.id = ${campaignId} AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`
  );
  return new Set(rows.map((r) => (r.campaign_criterion?.keyword?.text || "").toLowerCase().trim()));
}

async function main() {
  console.log(`\n===== MASTER NEGATİF UYGULAMA ${DRY ? "(DRY RUN)" : "(CANLI)"} =====\n`);
  const campaigns = await getEnabledCampaigns();
  let grandAdded = 0;

  for (const c of campaigns) {
    const en = isEnglish(c.name);
    const wanted = [...master.universal, ...(en ? master.en : master.tr)]
      .map((t) => t.trim()).filter(Boolean);
    const existing = await getExistingNegatives(c.id);
    const toAdd = [...new Set(wanted.map((t) => t.toLowerCase()))].filter((t) => !existing.has(t));

    console.log(`── ${c.name} (${c.id}) [${en ? "EN" : "TR"}] — mevcut: ${existing.size}, eklenecek: ${toAdd.length}`);
    if (DRY) { console.log("   ", JSON.stringify(toAdd.slice(0, 20)), toAdd.length > 20 ? `... +${toAdd.length - 20}` : ""); continue; }

    const campaignResource = `customers/${cid}/campaigns/${c.id}`;
    let added = 0;
    for (const text of toAdd) {
      try {
        await customer.campaignCriteria.create([{
          campaign: campaignResource, negative: true,
          keyword: { text, match_type: 3 }, // PHRASE — yakın-varyasyon sapmasını da kapsar
        }]);
        added++;
      } catch (e) {
        // zaten var / geçersiz → sessiz atla
      }
    }
    grandAdded += added;
    console.log(`   ✓ ${added} negatif eklendi`);
  }

  console.log(`\n>>> TOPLAM ${grandAdded} yeni negatif eklendi (${campaigns.length} kampanya).`);
  if (DRY) console.log(">>> DRY RUN — hiçbir şey yazılmadı. Canlı için --dry'siz çalıştır.");
}

main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
