/**
 * 1 Tem 2026 — arama terimi denetimi (LAST_7_DAYS, ₺424 israf) sonrası
 * CURATED per-kampanya PHRASE negatifleri. audit-search-terms.mjs önerilerinden,
 * meşru hizmet/aktif-keyword niyetini KORUYARAK elle seçildi.
 *
 * KASITLI DIŞARIDA (negatiflemedik):
 *   - "ai automation" / "yapay zeka otomasyon" / "ai otomasyon" → Sert Atış kampanyasının
 *     AKTİF exact keyword'leri. Sorun servis değil, ÖĞRENCİ modifier'ı (soru çözümü) →
 *     bunun yerine "soru çözümü"/"soru çözümü için" modifier'ını negatifledik.
 *   - "business automation" (Baku) → aktif "business process automation" keyword'üne yakın,
 *     bare terimi bırakıp yalnız araç-arayan ("tools") varyantlarını negatifledik.
 *
 * Idempotent (mevcut negatif atlanır). Çalıştır: node scripts/apply-negatives-2026-07-01.mjs [--dry]
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

// Kampanya ID → curated PHRASE negatif listesi
const PLAN = {
  // Ana TR Arama v2
  "23968213148": [
    "customer success software",      // ürün-arayan (SaaS kullanıcısı, alıcı değil)
    "powered by prestashop",          // platform tespiti / rakip site inceleme
    "machine learning saas",          // bilgi/jenerik SaaS
    "axure cloud",                    // araç
    "outsourcing saas development",   // global outsourcing arayışı
    "ai solution providers",          // global sağlayıcı listeleme
    "ai solutions companies",
    "ai for business solutions",
    "ai business solutions",
    "ecommerce development company in usa", // ABD geo — bizim pazar değil
    "en çok tıklanan emlak siteleri", // emlak portalı BÖNGÖZLEME (web sitesi yaptırma değil)
    "emlak siteleri",                 // aynı — "emlak web sitesi" keyword'ü "web sitesi" içerir, bloklanmaz
    "restoran siteleri",              // aynı — restoran portalı gözatma
    "web design contractor",          // taşeron/iş-arayan ton, 0 dönüşüm
    "automotive software development services", // niş global outsourcing
    "artificial intelligence app development company", // global outsourcing firma listeleme
    "ai software development solutions company",
    "ai development services company",
    "gen ai development services",
    "artificial intelligence development service",
  ],
  // AI Otomasyon — Sert Atış (TR) — ÖĞRENCİ tuzağı (soru çözümü), servis terimi DEĞİL
  "23983004103": [
    "soru çözümü",                    // ödev/soru çözme AI'ı arayan öğrenci
    "soru çözümü için",               // "... için yapay zeka" kalıbı
    "soru çözen",
  ],
  // Baku AZ EN — araç-arayan (tools) varyantları; bare "business automation" bırakıldı
  "23981974217": [
    "automation tools",               // hazır araç arayan (küçük işletme SaaS)
    "sales automation tools",
    "iot app development",            // niş, 0 dönüşüm
  ],
  // Macedonia EN v2
  "23963260773": [
    "website design for health and wellness", // niş niyet, 0 dönüşüm
    "website and brand",              // marka/branding karışık niyet
    "website designer and developer", // iş-arayan / freelancer arayan ton
  ],
};

async function getExistingNegatives(campaignId) {
  const rows = await customer.query(
    `SELECT campaign_criterion.keyword.text FROM campaign_criterion WHERE campaign.id = ${campaignId} AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`
  );
  return new Set(rows.map((r) => (r.campaign_criterion?.keyword?.text || "").toLowerCase().trim()));
}

async function campName(campaignId) {
  const rows = await customer.query(`SELECT campaign.name FROM campaign WHERE campaign.id = ${campaignId}`);
  return rows[0]?.campaign?.name || campaignId;
}

async function main() {
  console.log(`\n===== CURATED NEGATİF UYGULAMA ${DRY ? "(DRY RUN)" : "(CANLI)"} — 1 Tem 2026 =====\n`);
  let grand = 0;
  for (const [campaignId, terms] of Object.entries(PLAN)) {
    const name = await campName(campaignId);
    const existing = await getExistingNegatives(campaignId);
    const toAdd = [...new Set(terms.map((t) => t.toLowerCase().trim()))].filter((t) => t && !existing.has(t));
    console.log(`── ${name} (${campaignId}) — mevcut: ${existing.size}, eklenecek: ${toAdd.length}`);
    if (DRY) { console.log("   ", JSON.stringify(toAdd)); continue; }
    const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
    let added = 0;
    for (const text of toAdd) {
      try {
        await customer.campaignCriteria.create([{
          campaign: campaignResource, negative: true,
          keyword: { text, match_type: 3 }, // PHRASE
        }]);
        added++;
        console.log(`   ✓ ${text}`);
      } catch (e) {
        console.log(`   ✗ ${text} — ${e.message || e}`);
      }
    }
    grand += added;
  }
  console.log(`\n>>> TOPLAM ${grand} yeni negatif eklendi.`);
  if (DRY) console.log(">>> DRY RUN — hiçbir şey yazılmadı.");
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
