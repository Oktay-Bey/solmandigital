/**
 * 1 Tem 2026 — HESAP GENELİ sızıntı düzeltme (bakiye düşük, acil).
 * 7g ₺1372 harcama / 3 dönüşüm. Sert Atış zaten düzeltildi; bu script kalan 3
 * kampanyadaki çöp-mıknatısı geniş keyword'leri PAUSE eder + toplu negatif ekler.
 *
 * Kök sorunlar (search_term_view LAST_7_DAYS ile doğrulandı):
 *  - Ana TR v2: `custom software development*` PHRASE → "ai app development services /
 *    ai development company" global outsourcing'e genişliyor (~₺100). `saas platform` →
 *    "customer success software" ₺50. `emlak/restoran web sitesi` → portal gözatma (~₺75).
 *  - İstanbul Yerel: `ai automation` PHRASE → agentic/google flow/predictive maintenance
 *    bilgi-amaçlı (~₺100) + iş-arayan (junior/sdet/is ilanları/final soruları).
 *  - Arama 2025 v1: emlak crm / firma listeleme / replicate ai (araç).
 *
 * KORUNANLAR: EXACT muadilleri, alıcı-niyetli fiyat/hizmet terimleri, dönüşüm getirenler.
 * node scripts/fix-leak-2026-07-01-account.mjs [--dry]
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
const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN });
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = loginId;
const customer = client.Customer(opts);
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");

// ── PAUSE edilecek çöp-mıknatısı geniş keyword'ler (kampanya → [text,matchTypeName]) ──
// KRİTİK: sadece PHRASE/BROAD çöpe genişleyenler. EXACT muadili varsa o kalır.
const PAUSE = {
  "23968213148": [ // Ana TR v2
    ["emlak web sitesi", "PHRASE"],       // → emlak siteleri/portal gözatma
    ["restoran web sitesi", "PHRASE"],    // → restoran siteleri/portal
    ["saas platform", "PHRASE"],          // → customer success software/saas ai
  ],
  // İstanbul Yerel: `ai automation` PHRASE PAUSE EDİLMEDİ (kullanıcı kararı) —
  // 1 dönüşüm getirdi + ucuz EN arbitrajı. Sadece çöp varyasyonları negatiflenir (aşağıda).
};
// NOT: `custom software development*` PHRASE'leri PAUSE ETMİYORUM — alıcı-niyetli olabilir
// (custom enterprise software 1 Tem'de dönüşüm getirdi). Bunun yerine global-outsourcing
// search-term'lerini NEGATİF ile filtreliyorum (aşağıda) → keyword hizmet-niyetli kalır.

// ── Toplu PHRASE negatif (kampanya → terimler) ──
const NEG = {
  "23968213148": [ // Ana TR v2 — global outsourcing + portal + tool
    // ⚠️ EN-ARBİTRAJ KORUMASI ([[project_en_arbitrage_dontblock]]): "ai business solutions" /
    // "ai for business solutions" / "ai software for businesses" = ALICI-niyetli EN, EKLENMEZ.
    // Buradakiler outsourcing FİRMA-listeleme veya araç/portal — alıcı değil.
    "ai app development services", "ai development services", "ai development company",
    "ai development services company", "ai software development solutions company",
    "artificial intelligence development service", "artificial intelligence app development company",
    "artificial intelligence software development company", "gen ai development services",
    "custom software application development company", "automotive software development services",
    "customer success software", "saas ai", "machine learning saas", "axure cloud",
    "emlak siteleri", "restoran siteleri", "en çok tıklanan", "powered by prestashop",
    "web design contractor", "ecommerce development company in usa",
  ],
  "23955887164": [ // İstanbul Yerel — bilgi-AI + iş-arayan + öğrenci + rakip
    // ⚠️ `ai automation companies` / `ai business advertising` EKLENMEDİ — İstanbul'da
    //    ucuz+alıcı EN olabilir ([[project_en_arbitrage_dontblock]]). Sadece net çöp:
    "agentic", "google flow", "ai productivity", "predictive maintenance", "ai driven",
    "sales ads ai", "how to build", "marketplace platform", "outsourcing iot", "iot development",
    "is ilanlari", "iş ilanları", "tecrübesiz", "junior", "sdet", "final soruları",
    "hazırlanmıştır", "t soft", "sayso2",
  ],
  "23914856579": [ // Arama 2025 v1 — emlak/tool/listeleme
    "emlak crm", "ifs türkiye", "replicate ai", "yazılım geliştirme firmaları",
    "yazılım hizmetleri", "yapay zeka otomasyonları", "avrupa yakası yazılım şirketleri",
  ],
};

async function pauseKw() {
  console.log("── ÇÖP-MIKNATISI KEYWORD PAUSE ──");
  for (const [campaignId, list] of Object.entries(PAUSE)) {
    for (const [text, mt] of list) {
      const rows = await customer.query(`SELECT ad_group_criterion.resource_name FROM ad_group_criterion WHERE campaign.id=${campaignId} AND ad_group_criterion.type=KEYWORD AND ad_group_criterion.negative=FALSE AND ad_group_criterion.keyword.text='${text}' AND ad_group_criterion.keyword.match_type='${mt}' AND ad_group_criterion.status='ENABLED'`);
      if (!rows.length) { console.log(`   – ${text} (${campaignId}): aktif bulunamadı`); continue; }
      for (const r of rows) {
        if (DRY) { console.log(`   [DRY] pause: ${text} (${campaignId})`); continue; }
        await customer.adGroupCriteria.update([{ resource_name: r.ad_group_criterion.resource_name, status: 3 }]);
        console.log(`   ⏸ pause: ${text} (${campaignId})`);
      }
    }
  }
}

async function existingNeg(campaignId) {
  const rows = await customer.query(`SELECT campaign_criterion.keyword.text FROM campaign_criterion WHERE campaign.id=${campaignId} AND campaign_criterion.type='KEYWORD' AND campaign_criterion.negative=true`);
  return new Set(rows.map((r) => (r.campaign_criterion?.keyword?.text || "").toLowerCase().trim()));
}

async function addNeg() {
  console.log("\n── TOPLU NEGATİF ──");
  let grand = 0;
  for (const [campaignId, terms] of Object.entries(NEG)) {
    const existing = await existingNeg(campaignId);
    const toAdd = [...new Set(terms.map((t) => t.toLowerCase().trim()))].filter((t) => t && !existing.has(t));
    console.log(`   ${campaignId}: mevcut ${existing.size}, eklenecek ${toAdd.length}`);
    if (DRY) { console.log("     ", JSON.stringify(toAdd)); continue; }
    const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
    for (const text of toAdd) {
      try { await customer.campaignCriteria.create([{ campaign: campaignResource, negative: true, keyword: { text, match_type: 3 } }]); grand++; }
      catch (e) { console.log(`     ✗ ${text} — ${e.message}`); }
    }
    if (!DRY) console.log(`     ✓ ${toAdd.length} eklendi`);
  }
  console.log(`\n>>> TOPLAM ${grand} negatif eklendi.`);
}

async function main() {
  console.log(`\n===== HESAP GENELİ SIZINTI FIX ${DRY ? "(DRY)" : "(CANLI)"} — 1 Tem 2026 =====\n`);
  await pauseKw();
  await addNeg();
  if (DRY) console.log("\n>>> DRY RUN — yazılmadı.");
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
