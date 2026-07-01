/**
 * AI Otomasyon kampanyasını TAMAMLA — kabuk (bütçe+kampanya+geo+dil+negatif) zaten
 * kuruldu (ID 23983004103). Bu script kalan adımları yapar:
 *   RSA (sentence-case, pin YOK — CAPITALIZATION policy fix) + keyword + uzantılar.
 * Idempotent değildir; bir kez çalıştır. Var olan RSA/keyword'ü kontrol eder, atlar.
 *
 * Kullanım:
 *   node scripts/ai-otomasyon-finish.mjs          # DRY-RUN (durum raporu)
 *   node scripts/ai-otomasyon-finish.mjs --apply  # tamamla
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
const KEYWORD_CPC_TL = 20;

// SENTENCE-CASE başlıklar — pin YOK (CAPITALIZATION policy fix). Hepsi ≤30.
const HEADLINES = [
  "Yapay zeka otomasyon hizmeti","Süreçlerinizi otomatikleştirin","AI içerik & chatbot otomasyonu",
  "1 haftada kurulum, sabit fiyat","GPT-4o ve Claude entegrasyonu","İlk görüşme ücretsiz",
  "İstanbul yazılım ofisi","Tekrarlayan işi AI'a devredin","200 ürün açıklaması 2 saatte",
  "Doğrudan uzman erişimi","Kaynak kodu tamamen sizin","Trendyol & Shopify entegre",
  "7/24 müşteri chatbotu","Saat bazlı fatura yok","Ücretsiz otomasyon analizi",
];
const DESCRIPTIONS = [
  "Tekrarlayan iş yükünüzü GPT-4o ve Claude ile otomatikleştiriyoruz. 1 haftada teslim.",
  "İçerik, ürün açıklaması ve müşteri chatbotu otomasyonu. Sabit fiyat, sürpriz maliyet yok.",
  "Mevcut sistemlerinize entegre ediyoruz: WordPress, Shopify, Trendyol, CRM ve API.",
  "Önce ücretsiz analiz, sonra net çözüm planı. Doğrudan uzmanla, başından sonuna.",
];
const KEYWORDS = [
  { text: "yapay zeka otomasyon", m: 2 }, { text: "yapay zeka otomasyon", m: 3 },
  { text: "ai otomasyon", m: 2 }, { text: "ai otomasyon", m: 3 },
  { text: "yapay zeka çözümleri", m: 3 }, { text: "iş süreçleri otomasyonu", m: 3 },
  { text: "şirket otomasyon yazılımı", m: 3 }, { text: "yapay zeka danışmanlık", m: 3 },
  { text: "ai automation consulting", m: 2 },
];
const SITELINKS = [
  { linkText: "Ücretsiz Analiz", description1: "Önce teşhis, sonra çözüm planı", description2: "Bağlayıcı değil, 24 saatte dönüş", finalUrl: "https://solmandigital.com.tr/ucretsiz-analiz" },
  { linkText: "Fiyatlar", description1: "Sabit fiyatlı paketler", description2: "Saat bazlı fatura yok", finalUrl: "https://solmandigital.com.tr/fiyatlar" },
  { linkText: "Nasıl Çalışır", description1: "1 haftada teslim süreci", description2: "Önce analiz, sonra geliştirme", finalUrl: "https://solmandigital.com.tr/ai-otomasyon-hizmeti" },
  { linkText: "Projelerimiz", description1: "Teslim ettiğimiz otomasyonlar", description2: "Somut ROI örnekleri", finalUrl: "https://solmandigital.com.tr/portfoy" },
];
const CALLOUTS = ["Sabit Fiyat Garantisi", "1 Hafta Teslim", "İlk Görüşme Ücretsiz", "Doğrudan Uzman Erişimi", "Kaynak Kodu Sizin", "İstanbul Yazılım Ofisi"];
const SNIPPET = { header: "Services", values: ["İçerik Otomasyonu", "Ürün Açıklama", "Müşteri Chatbotu", "İş Süreci Otomasyonu", "GPT-4o Entegrasyonu", "CRM Entegrasyonu"] };

async function main() {
  console.log(`\n===== AI OTOMASYON TAMAMLA ${APPLY ? "(CANLI)" : "(DRY-RUN)"} — campaign ${CAMPAIGN_ID} =====\n`);
  const campaignResource = `customers/${CID}/campaigns/${CAMPAIGN_ID}`;

  const ags = await customer.query(`SELECT ad_group.resource_name, ad_group.id FROM ad_group WHERE campaign.id = ${CAMPAIGN_ID} AND ad_group.status != 'REMOVED'`);
  if (!ags.length) throw new Error("Ad group yok — kabuk eksik.");
  const adGroupResource = ags[0].ad_group.resource_name;
  const existingAds = await customer.query(`SELECT ad_group_ad.ad.id FROM ad_group_ad WHERE campaign.id = ${CAMPAIGN_ID} AND ad_group_ad.status != 'REMOVED'`);
  const existingKw = await customer.query(`SELECT ad_group_criterion.keyword.text FROM ad_group_criterion WHERE campaign.id = ${CAMPAIGN_ID} AND ad_group_criterion.type = KEYWORD AND ad_group_criterion.negative = FALSE AND ad_group_criterion.status != 'REMOVED'`);
  const existingAssets = await customer.query(`SELECT campaign.id, campaign_asset.field_type FROM campaign_asset WHERE campaign.id = ${CAMPAIGN_ID} AND campaign_asset.status = 'ENABLED'`);

  console.log(`Ad group: ${adGroupResource}`);
  console.log(`Mevcut RSA: ${existingAds.length} | keyword: ${existingKw.length} | campaign asset: ${existingAssets.length}\n`);

  if (!APPLY) {
    console.log("DRY-RUN — yazılmadı. Tamamlamak için: node scripts/ai-otomasyon-finish.mjs --apply");
    console.log(`Eklenecek: RSA ${existingAds.length ? "(VAR, atlanır)" : "(15 başlık, pin yok)"}, keyword ${existingKw.length ? "(VAR, atlanır)" : KEYWORDS.length}, sitelink ${SITELINKS.length}, callout ${CALLOUTS.length}, snippet 1`);
    return;
  }

  // 1. RSA (yoksa) — önce validateOnly ile policy ön-kontrol, sonra create
  if (existingAds.length) {
    console.log("• RSA zaten var — atlandı.");
  } else {
    const rsaOp = { mutateOperations: [{ adGroupAdOperation: { create: {
      adGroup: adGroupResource, status: "ENABLED",
      ad: { finalUrls: [LANDING], responsiveSearchAd: { headlines: HEADLINES.map((text) => ({ text })), descriptions: DESCRIPTIONS.map((text) => ({ text })) } },
    } } }] };
    await rest({ ...rsaOp, validateOnly: true }); // policy hatası varsa burada fırlar, gerçek yazma olmaz
    await rest(rsaOp);
    console.log("✓ RSA eklendi (15 başlık, sentence-case, pin yok, policy ön-kontrol geçti)");
  }

  // 2. Keyword'ler (yoksa)
  if (existingKw.length) {
    console.log(`• Keyword zaten var (${existingKw.length}) — atlandı.`);
  } else {
    let n = 0;
    for (const kw of KEYWORDS) {
      try { await customer.adGroupCriteria.create([{ ad_group: adGroupResource, status: 2, cpc_bid_micros: KEYWORD_CPC_TL * 1e6, keyword: { text: kw.text, match_type: kw.m } }]); n++; }
      catch (e) { console.warn("  kw atlandı:", kw.text, (e.errors?.[0]?.message || e.message || "").slice(0, 80)); }
    }
    console.log(`✓ ${n}/${KEYWORDS.length} keyword @ ${KEYWORD_CPC_TL}₺`);
  }

  // 3. Uzantılar (yoksa)
  if (existingAssets.length) {
    console.log(`• Campaign asset zaten var (${existingAssets.length}) — uzantılar atlandı.`);
  } else {
    for (const sl of SITELINKS) {
      const a = await rest({ mutateOperations: [{ assetOperation: { create: { finalUrls: [sl.finalUrl], sitelinkAsset: { linkText: sl.linkText, description1: sl.description1, description2: sl.description2 } } } }] });
      await rest({ mutateOperations: [{ campaignAssetOperation: { create: { campaign: campaignResource, asset: a.mutateOperationResponses[0].assetResult.resourceName, fieldType: "SITELINK" } } }] });
    }
    for (const text of CALLOUTS) {
      const a = await rest({ mutateOperations: [{ assetOperation: { create: { calloutAsset: { calloutText: text } } } }] });
      await rest({ mutateOperations: [{ campaignAssetOperation: { create: { campaign: campaignResource, asset: a.mutateOperationResponses[0].assetResult.resourceName, fieldType: "CALLOUT" } } }] });
    }
    const sn = await rest({ mutateOperations: [{ assetOperation: { create: { structuredSnippetAsset: { header: SNIPPET.header, values: SNIPPET.values } } } }] });
    await rest({ mutateOperations: [{ campaignAssetOperation: { create: { campaign: campaignResource, asset: sn.mutateOperationResponses[0].assetResult.resourceName, fieldType: "STRUCTURED_SNIPPET" } } }] });
    console.log(`✓ ${SITELINKS.length} sitelink + ${CALLOUTS.length} callout + 1 snippet`);
  }

  console.log(`\n===== TAMAMLANDI — kampanya hâlâ PAUSED =====`);
  console.log(`Sonraki: node scripts/apply-master-negatives.mjs  (master negatif kalkanı)`);
}
main().catch((e) => { console.error("\n✗ HATA:", e.errors ? JSON.stringify(e.errors, null, 2) : (e.message || e)); process.exit(1); });
