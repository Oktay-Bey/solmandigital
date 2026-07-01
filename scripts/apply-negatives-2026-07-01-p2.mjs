/**
 * 1 Tem 2026 — GÜN İÇİ (TODAY) arama terimi incelemesi sonrası 2. curated negatif turu.
 * Sabah master+curated eklenmişti; gün içinde yeni sızıntı/rakip markalar çıktı.
 * Meşru hizmet + aktif keyword + ALICI-NİYETLİ terimleri KORUYARAK elle seçildi.
 *
 * KASITLI DIŞARIDA:
 *  - "yapay zeka otomasyonu" (Sert Atış ₺51) → HEDEF hizmet terimi, yüksek CPC ama alıcı-niyetli.
 *  - "ai automation agency" (Baku) → ajans arayan = ALICI. Negatiflenmez.
 *  - "custom enterprise software" → 1 Tem'de 1 DÖNÜŞÜM getirdi (Ana TR). Dokunulmaz.
 *
 * node scripts/apply-negatives-2026-07-01-p2.mjs [--dry]
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

const PLAN = {
  // Ana TR Arama v2
  "23968213148": [
    "asp net dersleri",              // eğitim/ders
    "sıfırdan asp net",              // eğitim
    "web tabanlı uygulama geliştirme", // ödev/akademik tanım
    "prapazar",                      // rakip marka (pazaryeri entegrasyon aracı)
    "sopyo",                         // rakip marka
    "outcode",                       // rakip/marka
    "syncromind",                    // rakip/marka
    "site ev fiyatları",             // emlak/konut sitesi — hizmet değil
    "ai development service",        // global outsourcing, 0 conv
    "ai development services company",
    "custom artificial intelligence development services",
    "ecommerce web designers",       // freelancer/iş-arayan tonu
  ],
  // AI Otomasyon — Sert Atış (TR)
  // NOT: Asıl fix keyword-pause (aşağıda PAUSE_PHRASE). Bunlar ek savunma.
  "23983004103": [
    "uzmanlığı",                     // "ai otomasyon uzmanlığı" — uzman OLMAK isteyen (eğitim)
    "uzmanlık",
    "eğitimi",                       // "ai otomasyon eğitimi" — eğitim
    "eğitim",
    "plc",                           // endüstriyel PLC otomasyonu (fabrika, bizim niş değil)
    "sap bot",                       // SAP botu — farklı kurumsal niş
    "demokrasi",                     // akademik/kitap başlığı ("... iş demokrasi ve adalet")
    "yeniden tasarlamak",            // akademik
    "oluşturma",                     // "... otomasyon oluşturma" — DIY/öğrenme
    "nasıl yapılır",
    "kursu",
    "sertifika",
  ],
  // Baku AZ EN
  "23981974217": [
    "internet of things",            // IoT global outsourcing
    "iot application development",
  ],
  // Macedonia EN v2 — proaktif (₺0 ama net iş-arayan/araç)
  "23963260773": [
    "freelancer web developer",      // iş-arayan / freelancer arayan
    "front end developer",           // iş-arayan pozisyon
    "weebly",                        // DIY site aracı
    "motionsites",                   // marka/araç
  ],
};

// Sert Atış'ta 1 Tem'de TÜM zararı (₺77+₺26) yakan 2 PHRASE keyword —
// bilgi-amaçlı yakın-varyasyonlara genişliyor. EXACT muadilleri temiz (0 tık) → onlar kalır.
// Pause = çöp genişlemeyi kes, alıcı-niyetli EXACT + kontrollü PHRASE'lerle devam.
const PAUSE_PHRASE = {
  "23983004103": [
    { text: "yapay zeka otomasyon", matchType: "PHRASE" }, // ₺76.58 yaktı
    { text: "ai otomasyon", matchType: "PHRASE" },          // ₺25.69 yaktı
  ],
};

async function pausePhraseKeywords() {
  for (const [campaignId, list] of Object.entries(PAUSE_PHRASE)) {
    for (const { text, matchType } of list) {
      const rows = await customer.query(`SELECT ad_group_criterion.resource_name, ad_group_criterion.status FROM ad_group_criterion WHERE campaign.id=${campaignId} AND ad_group_criterion.type=KEYWORD AND ad_group_criterion.negative=FALSE AND ad_group_criterion.keyword.text='${text}' AND ad_group_criterion.keyword.match_type='${matchType}' AND ad_group_criterion.status='ENABLED'`);
      for (const r of rows) {
        if (DRY) { console.log(`   [DRY] pause PHRASE: ${text}`); continue; }
        await customer.adGroupCriteria.update([{ resource_name: r.ad_group_criterion.resource_name, status: 3 }]);
        console.log(`   ⏸ pause PHRASE: ${text}`);
      }
    }
  }
}

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
  console.log(`\n===== 1 TEM P2 CURATED NEGATİF ${DRY ? "(DRY)" : "(CANLI)"} =====\n`);
  console.log("── Sert Atış: çöp-mıknatısı PHRASE keyword pause ──");
  await pausePhraseKeywords();
  console.log("");
  let grand = 0;
  for (const [campaignId, terms] of Object.entries(PLAN)) {
    const name = await campName(campaignId);
    const existing = await getExistingNegatives(campaignId);
    const toAdd = [...new Set(terms.map((t) => t.toLowerCase().trim()))].filter((t) => t && !existing.has(t));
    console.log(`── ${name} (${campaignId}) — mevcut: ${existing.size}, eklenecek: ${toAdd.length}`);
    if (DRY) { console.log("   ", JSON.stringify(toAdd)); continue; }
    const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
    for (const text of toAdd) {
      try {
        await customer.campaignCriteria.create([{ campaign: campaignResource, negative: true, keyword: { text, match_type: 3 } }]);
        grand++; console.log(`   ✓ ${text}`);
      } catch (e) { console.log(`   ✗ ${text} — ${e.message || e}`); }
    }
  }
  console.log(`\n>>> TOPLAM ${grand} yeni negatif eklendi.`);
  if (DRY) console.log(">>> DRY RUN.");
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
