// Ana TR Arama v2 (23968213148) — yeni trafik kanalları (uzun-kuyruk + TR'de aratılan EN).
// Strateji: pahalı geniş terimlerden kaçın; ucuz + niyetli uzun kuyruk + İngilizce.
// A) YENİ ad group "EN Web & Software" (TR hedefli İngilizce, 14-41₺ ucuz, startup/teknik kitle)
// B) YENİ ad group "Sektörel Web" (restoran/emlak niş, ucuz + niyetli)
// C) Mevcut "Web Sitesi Yaptırma" + "Trendyol ve E-Ticaret" gruplarına uzun-kuyruk ekle
// D) Yeni keyword'lere kontrollü teklif (~18-22₺); bütçe 100₺/gün AYNI kalır.
const BASE = process.env.BASE_URL || "http://localhost:3000";
const CAMPAIGN_ID = "23968213148";
const AG_WEB = "196508101423";      // mevcut "Web Sitesi Yaptırma"
const AG_TRENDYOL = "196508103543"; // mevcut "Trendyol ve E-Ticaret"

async function post(url, body) {
  const r = await fetch(`${BASE}${url}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return { status: r.status, json: await r.json().catch(() => null) };
}
async function patch(url, body) {
  const r = await fetch(`${BASE}${url}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return { status: r.status, json: await r.json().catch(() => null) };
}

// ── A) EN Web & Software — TR'de aratılan İngilizce, /en/ai-automation-service ──
// Headline ≤30, description ≤90 karakter. Marka sesi: "we build", office, no agency markup.
const EN_AD = {
  campaignId: CAMPAIGN_ID,
  name: "EN Web & Software",
  finalUrl: "https://solmandigital.com.tr/en/ai-automation-service",
  headlines: [
    { text: "Custom Software Development" }, { text: "Web & SaaS Development" },
    { text: "Istanbul Software Office" }, { text: "Ecommerce Web Development" },
    { text: "Built With Next.js" }, { text: "Fixed Price, Clear Timeline" },
    { text: "Direct Access to Developer" }, { text: "Shopify & Custom Stores" },
    { text: "AI Automation Service" }, { text: "Free Project Consultation" },
    { text: "Source Code Is Yours" }, { text: "Deploy in Weeks, Not Months" },
  ],
  descriptions: [
    { text: "Custom web, ecommerce and SaaS development. Fixed price, source code yours." },
    { text: "Istanbul-based software office. No agency markup, direct developer access." },
    { text: "Next.js, modern stack, clear timeline. Free first consultation." },
    { text: "From MVP to production. Ecommerce, dashboards, AI integrations." },
  ],
  keywords: [
    { text: "web development company", matchType: "PHRASE" },
    { text: "website development company", matchType: "PHRASE" },
    { text: "custom software development", matchType: "PHRASE" },
    { text: "custom software development agency", matchType: "PHRASE" },
    { text: "custom software development company", matchType: "PHRASE" },
    { text: "bespoke software development", matchType: "PHRASE" },
    { text: "shopify store development", matchType: "PHRASE" },
    { text: "shopify website developer", matchType: "PHRASE" },
    { text: "ecommerce website development", matchType: "PHRASE" },
    { text: "saas development", matchType: "PHRASE" },
    { text: "saas development company", matchType: "PHRASE" },
    { text: "website design services", matchType: "PHRASE" },
  ],
};

// ── B) Sektörel Web — niş, ucuz + niyetli, /web-sitesi-yaptirmak ──
const SEKTOREL_AD = {
  campaignId: CAMPAIGN_ID,
  name: "Sektörel Web",
  finalUrl: "https://solmandigital.com.tr/web-sitesi-yaptirmak",
  headlines: [
    { text: "Sektöre Özel Web Sitesi" }, { text: "Restoran Web Sitesi" },
    { text: "Emlak Web Sitesi" }, { text: "5-10 İş Günü Teslim" },
    { text: "Şablonsuz Özel Tasarım" }, { text: "Next.js ile Hızlı Site" },
    { text: "Sabit Fiyat, Net Teklif" }, { text: "Mobil Uyumlu ve SEO Hazır" },
    { text: "İstanbul Yazılım Ofisi" }, { text: "Ücretsiz Fiyat Teklifi" },
    { text: "Doğrudan Uzman Erişimi" },
  ],
  descriptions: [
    { text: "Restoran, emlak ve sektörel işletmeler için özel web sitesi geliştiriyoruz." },
    { text: "Şablon yok, özel kod, sabit fiyat. 5-10 iş günü teslim, ücretsiz teklif." },
    { text: "Next.js ile hızlı, mobil uyumlu, SEO hazır. İstanbul yazılım ofisi." },
  ],
  keywords: [
    { text: "restoran web sitesi", matchType: "PHRASE" },
    { text: "emlak web sitesi", matchType: "PHRASE" },
    { text: "hazır emlak sitesi", matchType: "PHRASE" },
    { text: "sektöre özel web sitesi", matchType: "PHRASE" },
  ],
};

// ── C) Mevcut gruplara uzun-kuyruk ekle ──
const WEB_LONGTAIL = [
  { text: "kurumsal web sitesi fiyatları", matchType: "PHRASE" },
  { text: "web sitesi tasarım fiyatları", matchType: "PHRASE" },
  { text: "kurumsal web sitesi tasarımı", matchType: "PHRASE" },
  { text: "kurumsal internet sitesi kurma", matchType: "PHRASE" },
  { text: "kurumsal web sitesi paketleri", matchType: "PHRASE" },
];
const ECOM_LONGTAIL = [
  { text: "e-ticaret sitesi kurma maliyeti", matchType: "PHRASE" },
  { text: "internet satış sitesi kurma", matchType: "PHRASE" },
  { text: "e-ticaret sitesi kurma fiyatları", matchType: "PHRASE" },
];

// ── D) Yeni keyword'lerin teklifi (kontrollü, ucuz dikey) ──
const BID_TL = 20; // EN terimler zaten 14-41₺; uzun-kuyruk için kontrollü

async function main() {
  const newKwTexts = [];

  console.log("=== A) YENİ ad group: EN Web & Software ===");
  const a = await post(`/api/google-ads/adgroups`, EN_AD);
  console.log("status", a.status, "adGroupId:", a.json?.adGroupId, "| kw added:", a.json?.keywords?.added, "| RSA:", a.json?.adResult?.error ? "FAIL "+a.json.adResult.error : "ok");
  const enAgId = a.json?.adGroupId;
  EN_AD.keywords.forEach((k) => newKwTexts.push([enAgId, k.text]));

  console.log("\n=== B) YENİ ad group: Sektörel Web ===");
  const b = await post(`/api/google-ads/adgroups`, SEKTOREL_AD);
  console.log("status", b.status, "adGroupId:", b.json?.adGroupId, "| kw added:", b.json?.keywords?.added, "| RSA:", b.json?.adResult?.error ? "FAIL "+b.json.adResult.error : "ok");
  const sekAgId = b.json?.adGroupId;
  SEKTOREL_AD.keywords.forEach((k) => newKwTexts.push([sekAgId, k.text]));

  console.log("\n=== C1) Web Sitesi Yaptırma'ya uzun-kuyruk ===");
  const c1 = await post(`/api/google-ads/adgroups/${AG_WEB}/keywords`, { keywords: WEB_LONGTAIL });
  console.log("status", c1.status, JSON.stringify(c1.json)?.slice(0, 150));
  WEB_LONGTAIL.forEach((k) => newKwTexts.push([AG_WEB, k.text]));

  console.log("\n=== C2) Trendyol ve E-Ticaret'e uzun-kuyruk ===");
  const c2 = await post(`/api/google-ads/adgroups/${AG_TRENDYOL}/keywords`, { keywords: ECOM_LONGTAIL });
  console.log("status", c2.status, JSON.stringify(c2.json)?.slice(0, 150));
  ECOM_LONGTAIL.forEach((k) => newKwTexts.push([AG_TRENDYOL, k.text]));

  console.log(`\n=== D) Yeni keyword'lere ${BID_TL}₺ teklif ===`);
  const byAg = {};
  for (const [ag, text] of newKwTexts) { if (!ag) continue; (byAg[ag] ??= []).push({ text, bidTL: BID_TL }); }
  for (const [ag, bids] of Object.entries(byAg)) {
    const r = await patch(`/api/google-ads/adgroups/${ag}/keywords`, { bids });
    console.log(`  adGroup ${ag}: updated`, r.json?.updated ?? r.json?.note);
  }
  console.log("\nBitti.");
}
main().catch((e) => { console.error(e); process.exit(1); });
