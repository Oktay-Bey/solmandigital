/**
 * TEK-HAT "SERT ATIŞ" KAMPANYASI — AI Otomasyon
 * Plan: C:\Users\90534\.claude\plans\projemiz-dahilinde-elde-etti-imiz-scalable-thimble.md
 *
 * Tek kampanya / tek ad group, dar (phrase+exact) yüksek-niyet keyword,
 * PRESENCE-only geo (TR+İstanbul), manuel CPC, Türkçe-güvenli RSA (REST),
 * tam uzantı seti (sitelink + callout + structured snippet).
 *
 * Kampanya PAUSED oluşturulur — inceleme sonrası Google Ads UI'dan ya da
 * updateCampaignStatus ile ENABLED yapılır. Hiçbir reklam onaysız yayınlanmaz.
 *
 * Kullanım:
 *   node scripts/ai-otomasyon-campaign.mjs          # DRY-RUN (hiçbir şey yazmaz)
 *   node scripts/ai-otomasyon-campaign.mjs --apply  # CANLI kurar (PAUSED kampanya)
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

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});
const custOpts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
if (LOGIN_ID && LOGIN_ID !== process.env.GOOGLE_ADS_CUSTOMER_ID) custOpts.login_customer_id = LOGIN_ID;
const customer = client.Customer(custOpts);

// ── Türkçe-güvenli REST mutate (protobuf ç/ş/ğ/ü/ö/ı bozuyor; TextEncoder ile UTF-8) ──
async function getAccessToken() {
  const auth = new google.auth.OAuth2(process.env.GOOGLE_ADS_CLIENT_ID, process.env.GOOGLE_ADS_CLIENT_SECRET);
  auth.setCredentials({ refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN });
  const { token } = await auth.getAccessToken();
  if (!token) throw new Error("OAuth2 access token alınamadı");
  return token;
}
async function adsRestPost(body) {
  const headers = {
    Authorization: `Bearer ${await getAccessToken()}`,
    "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    "Content-Type": "application/json; charset=utf-8",
  };
  if (LOGIN_ID && LOGIN_ID !== process.env.GOOGLE_ADS_CUSTOMER_ID) headers["login-customer-id"] = LOGIN_ID;
  const url = `https://googleads.googleapis.com/v23/customers/${CID}/googleAds:mutate`;
  const res = await fetch(url, { method: "POST", headers, body: new TextEncoder().encode(JSON.stringify(body)) });
  const text = await res.text();
  if (!res.ok || text.trim().startsWith("<")) throw new Error(`REST ${res.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

// ───────────────────────── KAMPANYA TANIMI ─────────────────────────
const CAMPAIGN_NAME = "AI Otomasyon — Sert Atış (TR)";
const DAILY_BUDGET_TL = 150;
const LANDING = "https://solmandigital.com.tr/ai-otomasyon-hizmeti";
const GEO_IDS = [2792, 1012867];          // Türkiye, İstanbul
const KEYWORD_CPC_TL = 20;                 // manuel CPC çekirdek teklif
const ISTANBUL_GEO_ID = 1012867;
const ISTANBUL_BID_MOD = 1.15;             // +%15 İstanbul

const HEADLINES = [
  "Yapay Zeka Otomasyon Hizmeti",   // bu H1'e pin'lenecek
  "Süreçlerinizi Otomatikleştirin",
  "AI İçerik & Chatbot Otomasyonu",
  "1 Haftada Kurulum, Sabit Fiyat",
  "GPT-4o & Claude Entegrasyonu",
  "İlk Görüşme Ücretsiz",
  "İstanbul Yazılım Ofisi",
  "Tekrarlayan İşi AI'a Devredin",
  "200 Ürün Açıklaması 2 Saatte",
  "Doğrudan Uzman Erişimi",
  "Kaynak Kodu Tamamen Sizin",
  "Trendyol & Shopify Entegre",
  "7/24 Müşteri Chatbotu",
  "Saat Bazlı Fatura Yok",
  "Ücretsiz Otomasyon Analizi",
];
const DESCRIPTIONS = [
  "Tekrarlayan iş yükünüzü GPT-4o ve Claude ile otomatikleştiriyoruz. 1 haftada teslim.",
  "İçerik, ürün açıklaması ve müşteri chatbotu otomasyonu. Sabit fiyat, sürpriz maliyet yok.",
  "Mevcut sistemlerinize entegre ediyoruz: WordPress, Shopify, Trendyol, CRM, REST API.",
  "Önce ücretsiz analiz, sonra net çözüm planı. Doğrudan uzmanla, başından sonuna.",
];

const KEYWORDS = [
  { text: "yapay zeka otomasyon", matchType: "EXACT" },
  { text: "yapay zeka otomasyon", matchType: "PHRASE" },
  { text: "ai otomasyon", matchType: "EXACT" },
  { text: "ai otomasyon", matchType: "PHRASE" },
  { text: "yapay zeka çözümleri", matchType: "PHRASE" },
  { text: "iş süreçleri otomasyonu", matchType: "PHRASE" },
  { text: "şirket otomasyon yazılımı", matchType: "PHRASE" },
  { text: "yapay zeka danışmanlık", matchType: "PHRASE" },
  { text: "ai automation consulting", matchType: "EXACT" }, // yüksek niyet, ayrı izle
];

// Ek niyet negatifleri (master-negatives apply scripti ayrıca tüm ENABLED kampanyalara uygular)
const NEGATIVES = [
  "how", "what", "tutorial", "course", "nedir", "nasıl", "örnek", "ücretsiz indir", "kurs", "eğitim",
  "chatgpt", "chat gpt", "bing ai", "blackbox", "framer", "hazır araç",
  "cv", "özgeçmiş", "iş ilanı", "staj", "kariyer", "maaş", "junior", "internship", "hiring", "iş başvurusu",
  "iot", "internet of things", "supply chain",
];

const SITELINKS = [
  { linkText: "Ücretsiz Analiz", description1: "Önce teşhis, sonra çözüm planı", description2: "Bağlayıcı değil, 24 saatte dönüş", finalUrl: "https://solmandigital.com.tr/ucretsiz-analiz" },
  { linkText: "Fiyatlar", description1: "Sabit fiyatlı paketler", description2: "Saat bazlı fatura yok", finalUrl: "https://solmandigital.com.tr/fiyatlar" },
  { linkText: "Nasıl Çalışır", description1: "1 haftada teslim süreci", description2: "Önce analiz, sonra geliştirme", finalUrl: "https://solmandigital.com.tr/ai-otomasyon-hizmeti" },
  { linkText: "Projelerimiz", description1: "Teslim ettiğimiz otomasyonlar", description2: "Somut ROI örnekleri", finalUrl: "https://solmandigital.com.tr/portfoy" },
];
const CALLOUTS = ["Sabit Fiyat Garantisi", "1 Hafta Teslim", "İlk Görüşme Ücretsiz", "Doğrudan Uzman Erişimi", "Kaynak Kodu Sizin", "İstanbul Yazılım Ofisi"];
const SNIPPET = { header: "Services", values: ["İçerik Otomasyonu", "Ürün Açıklama", "Müşteri Chatbotu", "İş Süreci Otomasyonu", "GPT-4o Entegrasyonu", "CRM Entegrasyonu"] };

// ───────────────────────── VALIDASYON (karakter limitleri) ─────────────────────────
function validate() {
  const errs = [];
  HEADLINES.forEach((h) => { if ([...h].length > 30) errs.push(`Başlık >30: "${h}" (${[...h].length})`); });
  DESCRIPTIONS.forEach((d) => { if ([...d].length > 90) errs.push(`Açıklama >90: "${d}" (${[...d].length})`); });
  SITELINKS.forEach((s) => {
    if ([...s.linkText].length > 25) errs.push(`Sitelink başlık >25: "${s.linkText}"`);
    if ([...s.description1].length > 35) errs.push(`Sitelink d1 >35: "${s.description1}"`);
    if ([...s.description2].length > 35) errs.push(`Sitelink d2 >35: "${s.description2}"`);
  });
  CALLOUTS.forEach((c) => { if ([...c].length > 25) errs.push(`Callout >25: "${c}"`); });
  SNIPPET.values.forEach((v) => { if ([...v].length > 25) errs.push(`Snippet değer >25: "${v}"`); });
  if (HEADLINES.length > 15) errs.push("Başlık sayısı >15");
  if (DESCRIPTIONS.length > 4) errs.push("Açıklama sayısı >4");
  return errs;
}

async function main() {
  console.log(`\n===== AI OTOMASYON SERT ATIŞ ${APPLY ? "(CANLI — PAUSED kurulum)" : "(DRY-RUN)"} =====\n`);
  console.log(`Kampanya: ${CAMPAIGN_NAME}\nBütçe: ${DAILY_BUDGET_TL}₺/gün | Landing: ${LANDING}`);
  console.log(`Geo: ${GEO_IDS.join(", ")} (PRESENCE-only) | İstanbul bid +%${((ISTANBUL_BID_MOD - 1) * 100).toFixed(0)}`);
  console.log(`Keyword: ${KEYWORDS.length} (phrase+exact) @ ${KEYWORD_CPC_TL}₺ | Negatif: ${NEGATIVES.length}`);
  console.log(`Başlık: ${HEADLINES.length} | Açıklama: ${DESCRIPTIONS.length} | Sitelink: ${SITELINKS.length} | Callout: ${CALLOUTS.length} | Snippet: ${SNIPPET.values.length}\n`);

  const errs = validate();
  if (errs.length) { console.error("✗ VALIDASYON HATASI:\n" + errs.map((e) => "  - " + e).join("\n")); process.exit(1); }
  console.log("✓ Tüm metin karakter limitleri içinde.\n");

  // Duplicate guard
  const existing = await customer.query(`SELECT campaign.id, campaign.name FROM campaign WHERE campaign.status != 'REMOVED'`);
  if (existing.find((r) => /AI Otomasyon — Sert At/i.test(r.campaign.name))) {
    console.error("✗ Aynı isimli kampanya zaten var — kurulum durdu."); process.exit(1);
  }

  if (!APPLY) {
    console.log("DRY-RUN — hiçbir şey yazılmadı. Canlı için: node scripts/ai-otomasyon-campaign.mjs --apply\n");
    console.log("Başlıklar:"); HEADLINES.forEach((h, i) => console.log(`  ${i + 1}. ${h} (${[...h].length})`));
    console.log("\nKeyword'ler:"); KEYWORDS.forEach((k) => console.log(`  [${k.matchType}] ${k.text}`));
    return;
  }

  // 1. Bütçe
  const budgetRes = await customer.campaignBudgets.create([{
    name: `${CAMPAIGN_NAME} - Bütçe ${Date.now()}`, amount_micros: DAILY_BUDGET_TL * 1e6, delivery_method: 2,
  }]);
  const budgetResource = budgetRes.results[0].resource_name;
  console.log("✓ 1/8 Bütçe:", budgetResource);

  // 2. Kampanya (PAUSED, manual_cpc, search-only network)
  const campRes = await adsRestPost({
    mutateOperations: [{ campaignOperation: { create: {
      name: CAMPAIGN_NAME, status: "PAUSED", advertisingChannelType: "SEARCH",
      campaignBudget: budgetResource, manualCpc: {},
      containsEuPoliticalAdvertising: "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
      networkSettings: { targetGoogleSearch: true, targetSearchNetwork: true, targetContentNetwork: false },
    } } }],
  });
  const campaignResource = campRes.mutateOperationResponses[0].campaignResult.resourceName;
  const campaignId = campaignResource.match(/campaigns\/(\d+)/)[1];
  console.log("✓ 2/8 Kampanya (PAUSED):", campaignResource);

  // 3. PRESENCE-only geo type + geo hedefler
  await customer.campaigns.update([{
    resource_name: campaignResource,
    geo_target_type_setting: { positive_geo_target_type: 7 }, // PRESENCE
  }]);
  for (const geoId of GEO_IDS) {
    await customer.campaignCriteria.create([{ campaign: campaignResource, location: { geo_target_constant: `geoTargetConstants/${geoId}` } }]);
  }
  // İstanbul bid modifier
  await adsRestPost({ mutateOperations: [{ campaignCriterionOperation: { create: {
    campaign: campaignResource, location: { geoTargetConstant: `geoTargetConstants/${ISTANBUL_GEO_ID}` }, bidModifier: ISTANBUL_BID_MOD,
  } } }] }).catch((e) => console.warn("  (İstanbul bid mod atlandı:", e.message.slice(0, 120), ")"));
  console.log("✓ 3/8 Geo: PRESENCE-only, TR+İstanbul, İstanbul +%15");

  // 4. Türkçe dil hedefi (1037)
  await customer.campaignCriteria.create([{ campaign: campaignResource, language: { language_constant: "languageConstants/1037" } }]);
  console.log("✓ 4/8 Dil: Türkçe");

  // 5. Kampanya negatifleri
  let negAdded = 0;
  for (const text of NEGATIVES) {
    try { await customer.campaignCriteria.create([{ campaign: campaignResource, negative: true, keyword: { text, match_type: 3 } }]); negAdded++; } catch { /* skip */ }
  }
  console.log(`✓ 5/8 Negatif: ${negAdded}/${NEGATIVES.length} eklendi`);

  // 6. Ad group + RSA (REST, Türkçe-güvenli)
  const agRes = await customer.adGroups.create([{ name: "Yapay Zeka Otomasyon", campaign: campaignResource, status: 2, type: 2, cpc_bid_micros: KEYWORD_CPC_TL * 1e6 }]);
  const adGroupResource = agRes.results[0].resource_name;
  await adsRestPost({ mutateOperations: [{ adGroupAdOperation: { create: {
    adGroup: adGroupResource, status: "ENABLED",
    ad: { finalUrls: [LANDING], responsiveSearchAd: {
      headlines: HEADLINES.map((text, i) => i === 0 ? { text, pinnedField: "HEADLINE_1" } : { text }),
      descriptions: DESCRIPTIONS.map((text) => ({ text })),
    } },
  } } }] });
  console.log("✓ 6/8 Ad Group + RSA (H1 pinned):", adGroupResource);

  // 7. Keyword'ler (manuel CPC ile keyword-level bid)
  const MATCH = { EXACT: 2, PHRASE: 3, BROAD: 4 };
  let kwAdded = 0;
  for (const kw of KEYWORDS) {
    try {
      await customer.adGroupCriteria.create([{ ad_group: adGroupResource, status: 2, cpc_bid_micros: KEYWORD_CPC_TL * 1e6, keyword: { text: kw.text, match_type: MATCH[kw.matchType] } }]);
      kwAdded++;
    } catch (e) { console.warn("  Keyword atlandı:", kw.text, (e.errors?.[0]?.message || e.message || "").slice(0, 100)); }
  }
  console.log(`✓ 7/8 Keyword: ${kwAdded}/${KEYWORDS.length} @ ${KEYWORD_CPC_TL}₺`);

  // 8. Uzantılar — sitelink + callout + structured snippet (REST, Türkçe-güvenli)
  for (const sl of SITELINKS) {
    const a = await adsRestPost({ mutateOperations: [{ assetOperation: { create: { finalUrls: [sl.finalUrl], sitelinkAsset: { linkText: sl.linkText, description1: sl.description1, description2: sl.description2 } } } }] });
    const assetResource = a.mutateOperationResponses[0].assetResult.resourceName;
    await adsRestPost({ mutateOperations: [{ campaignAssetOperation: { create: { campaign: campaignResource, asset: assetResource, fieldType: "SITELINK" } } }] });
  }
  for (const text of CALLOUTS) {
    const a = await adsRestPost({ mutateOperations: [{ assetOperation: { create: { calloutAsset: { calloutText: text } } } }] });
    await adsRestPost({ mutateOperations: [{ campaignAssetOperation: { create: { campaign: campaignResource, asset: a.mutateOperationResponses[0].assetResult.resourceName, fieldType: "CALLOUT" } } }] });
  }
  const sn = await adsRestPost({ mutateOperations: [{ assetOperation: { create: { structuredSnippetAsset: { header: SNIPPET.header, values: SNIPPET.values } } } }] });
  await adsRestPost({ mutateOperations: [{ campaignAssetOperation: { create: { campaign: campaignResource, asset: sn.mutateOperationResponses[0].assetResult.resourceName, fieldType: "STRUCTURED_SNIPPET" } } }] });
  console.log(`✓ 8/8 Uzantılar: ${SITELINKS.length} sitelink + ${CALLOUTS.length} callout + 1 snippet`);

  console.log(`\n===== TAMAMLANDI — Kampanya PAUSED =====`);
  console.log(`Campaign ID: ${campaignId}`);
  console.log(`İnceleme: Google Ads UI > Campaigns > "${CAMPAIGN_NAME}"`);
  console.log(`Sonra: master negatifleri uygula → node scripts/apply-master-negatives.mjs`);
  console.log(`Aktif etmek için onay sonrası ENABLED yapılacak.`);
}
main().catch((e) => { console.error("\n✗ HATA:", e.errors ? JSON.stringify(e.errors, null, 2) : (e.message || e)); process.exit(1); });
