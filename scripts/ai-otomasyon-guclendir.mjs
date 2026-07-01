/**
 * AI Otomasyon — Sert Atış (23983004103) GÜÇLENDİRME (1 Tem 2026).
 * Teşhis: 30 Haz 24imp/6t/₺79/0conv, RSA approval=4 (DISAPPROVED+review), tek RSA,
 * `yapay zeka çözümleri` PHRASE ₺37 yaktı (bilgi-amaçlı). 4 paket:
 *   A) 2. RSA — CAPITALIZATION riski düşük varyant (validateOnly ön-kontrollü, rotasyon açar)
 *   B) `yapay zeka çözümleri` PHRASE pause → bütçe alıcı-niyetli exact'lara kayar
 *   C) Seçici bid: alıcı-niyetli otomasyon exact/phrase ₺20→₺26 (danışmanlık/jenerik ₺20 kalır)
 *   D) Genişletme: yeni alıcı-niyetli exact/phrase keyword (₺22)
 *
 * Kullanım: node scripts/ai-otomasyon-guclendir.mjs         # DRY
 *           node scripts/ai-otomasyon-guclendir.mjs --apply
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
const custOpts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
if (LOGIN_ID && LOGIN_ID !== process.env.GOOGLE_ADS_CUSTOMER_ID) custOpts.login_customer_id = LOGIN_ID;
const customer = client.Customer(custOpts);

async function token() {
  const auth = new google.auth.OAuth2(process.env.GOOGLE_ADS_CLIENT_ID, process.env.GOOGLE_ADS_CLIENT_SECRET);
  auth.setCredentials({ refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN });
  return (await auth.getAccessToken()).token;
}
let _headers;
async function rest(body) {
  if (!_headers) {
    _headers = { Authorization: `Bearer ${await token()}`, "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN, "Content-Type": "application/json; charset=utf-8" };
    if (LOGIN_ID && LOGIN_ID !== process.env.GOOGLE_ADS_CUSTOMER_ID) _headers["login-customer-id"] = LOGIN_ID;
  }
  const res = await fetch(`https://googleads.googleapis.com/v23/customers/${CID}/googleAds:mutate`, { method: "POST", headers: _headers, body: new TextEncoder().encode(JSON.stringify(body)) });
  const text = await res.text();
  if (!res.ok || text.trim().startsWith("<")) throw new Error(`REST ${res.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

const CAMPAIGN_ID = "23983004103";
const LANDING = "https://solmandigital.com.tr/ai-otomasyon-hizmeti";

// ── A) 2. RSA — CAPITALIZATION riski DÜŞÜK varyant ────────────────
// "GPT-4o"/art arda kısaltma azaltıldı; farklı satış açısı (ROI/hız/somut çıktı).
// Sentence-case, pin YOK. Hepsi ≤30 karakter.
const HEADLINES_2 = [
  "Yapay zeka otomasyon çözümü", "İş yükünü yapay zekaya devret", "Otomasyonla zamandan tasarruf",
  "1 haftada kurulum ve teslim", "Sabit fiyat, sürpriz yok", "Ücretsiz otomasyon analizi",
  "İçerik ve ürün açıklaması botu", "Müşteri chatbotu 7/24 aktif", "Tekrarlayan işi otomatikleştir",
  "Doğrudan uzmanla çalışın", "Kaynak kodu tamamen sizin", "Trendyol ve Shopify entegre",
  "Saat bazlı fatura yok", "İstanbul yazılım ofisi", "İlk görüşme ücretsiz",
];
const DESCRIPTIONS_2 = [
  "Tekrarlayan iş yükünüzü yapay zeka ile otomatikleştiriyoruz. Bir haftada teslim.",
  "İçerik, ürün açıklaması ve müşteri chatbotu otomasyonu. Sabit fiyatla çalışırız.",
  "Mevcut sistemlerinize entegre ederiz: e-ticaret, müşteri yönetimi ve web siteniz.",
  "Önce ücretsiz analiz, sonra net bir çözüm planı. Başından sonuna aynı uzmanla.",
];

// ── B) Pause edilecek PHRASE (bilgi-amaçlı, para yakan) ───────────
const PAUSE_TEXTS = ["yapay zeka çözümleri"]; // criterion_id 327005906389

// ── C) Seçici bid artışı — alıcı-niyetli otomasyon terimleri ₺26 ──
const BID_UP = new Map([
  ["1461876049415", 26], // [yapay zeka otomasyon] EXACT
  ["2416321634621", 26], // [ai otomasyon] EXACT
  ["309777009504", 26],  // "yapay zeka otomasyon" PHRASE
  ["2449421899113", 26], // "ai otomasyon" PHRASE
]);

// ── D) Genişletme — yeni alıcı-niyetli keyword'ler (₺22) ──────────
const NEW_KEYWORDS = [
  { text: "otomasyon yazılımı", m: 2 },        // EXACT
  { text: "iş otomasyonu", m: 3 },             // PHRASE
  { text: "yapay zeka ile otomasyon", m: 3 },
  { text: "yapay zeka entegrasyonu", m: 3 },
  { text: "chatbot geliştirme", m: 3 },
  { text: "ai otomasyon ajansı", m: 3 },
  { text: "süreç otomasyonu", m: 3 },
];
const NEW_KW_CPC_TL = 22;

async function main() {
  console.log(`\n===== SERT ATIŞ GÜÇLENDİRME ${APPLY ? "(CANLI)" : "(DRY-RUN)"} — ${CAMPAIGN_ID} =====\n`);
  const ags = await customer.query(`SELECT ad_group.resource_name FROM ad_group WHERE campaign.id=${CAMPAIGN_ID} AND ad_group.status!='REMOVED'`);
  const adGroupResource = ags[0].ad_group.resource_name;
  const existingKw = await customer.query(`SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type FROM ad_group_criterion WHERE campaign.id=${CAMPAIGN_ID} AND ad_group_criterion.type=KEYWORD AND ad_group_criterion.negative=FALSE AND ad_group_criterion.status!='REMOVED'`);
  const existSet = new Set(existingKw.map(r => `${r.ad_group_criterion.keyword.text.toLowerCase()}|${r.ad_group_criterion.keyword.match_type}`));
  const adCount = (await customer.query(`SELECT ad_group_ad.ad.id FROM ad_group_ad WHERE campaign.id=${CAMPAIGN_ID} AND ad_group_ad.status!='REMOVED'`)).length;

  const newToAdd = NEW_KEYWORDS.filter(k => !existSet.has(`${k.text.toLowerCase()}|${k.m}`));
  console.log(`Ad group: ${adGroupResource}`);
  console.log(`Mevcut RSA: ${adCount} | mevcut keyword: ${existingKw.length}`);
  console.log(`A) 2. RSA: ${adCount >= 2 ? "(zaten ≥2, atlanır)" : "eklenecek (15 başlık, validateOnly ön-kontrol)"}`);
  console.log(`B) Pause: ${JSON.stringify(PAUSE_TEXTS)}`);
  console.log(`C) Bid ₺26: ${[...BID_UP.keys()].length} keyword`);
  console.log(`D) Yeni keyword (${newToAdd.length}): ${JSON.stringify(newToAdd.map(k => `${k.text}[${k.m===2?"E":"P"}]`))}\n`);

  if (!APPLY) { console.log("DRY-RUN — yazılmadı. Uygulamak için --apply"); return; }

  // A) 2. RSA
  if (adCount >= 2) {
    console.log("A) • 2. RSA zaten var (≥2) — atlandı.");
  } else {
    const rsaOp = { mutateOperations: [{ adGroupAdOperation: { create: {
      adGroup: adGroupResource, status: "ENABLED",
      ad: { finalUrls: [LANDING], responsiveSearchAd: { headlines: HEADLINES_2.map((text) => ({ text })), descriptions: DESCRIPTIONS_2.map((text) => ({ text })) } },
    } } }] };
    await rest({ ...rsaOp, validateOnly: true });
    await rest(rsaOp);
    console.log("A) ✓ 2. RSA eklendi (policy ön-kontrol geçti, rotasyon açıldı)");
  }

  // B) Pause PHRASE
  for (const text of PAUSE_TEXTS) {
    const hit = await customer.query(`SELECT ad_group_criterion.resource_name FROM ad_group_criterion WHERE campaign.id=${CAMPAIGN_ID} AND ad_group_criterion.type=KEYWORD AND ad_group_criterion.negative=FALSE AND ad_group_criterion.status='ENABLED' AND ad_group_criterion.keyword.text='${text}'`);
    for (const r of hit) {
      await customer.adGroupCriteria.update([{ resource_name: r.ad_group_criterion.resource_name, status: 3 }]);
      console.log(`B) ✓ pause: ${text}`);
    }
  }

  // C) Seçici bid
  const agId = adGroupResource.split("/").pop();
  for (const [critId, tl] of BID_UP) {
    try {
      await customer.adGroupCriteria.update([{ resource_name: `customers/${CID}/adGroupCriteria/${agId}~${critId}`, cpc_bid_micros: tl * 1e6 }]);
      console.log(`C) ✓ bid ₺${tl}: crit ${critId}`);
    } catch (e) { console.log(`C) ✗ crit ${critId} — ${e.message}`); }
  }

  // D) Yeni keyword'ler
  let n = 0;
  for (const kw of newToAdd) {
    try { await customer.adGroupCriteria.create([{ ad_group: adGroupResource, status: 2, cpc_bid_micros: NEW_KW_CPC_TL * 1e6, keyword: { text: kw.text, match_type: kw.m } }]); n++; console.log(`D) ✓ ${kw.text} [${kw.m===2?"EXACT":"PHRASE"}]`); }
    catch (e) { console.log(`D) ✗ ${kw.text} — ${e.message}`); }
  }
  console.log(`\n>>> Güçlendirme tamam. Yeni keyword: ${n}. RSA onayını 24-48h izle (approval APPROVED olmalı).`);
}
main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
