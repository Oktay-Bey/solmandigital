// Ana TR Arama v2 (campaign 23968213148) kalite temizliği — tek seferlik batch.
// v2 yeni kampanya; eski Arama 2025'e eklenen negatifler buraya uygulanmamıştı.
//   A) Eski 50 negatif + v2'de görülen yeni alakasız 'saas/ai' araştırma terimleri
//   B) "saas platform" PHRASE → pause + EXACT ekle (saas geçen alakasız aramaları kesmek için)
const BASE = process.env.BASE_URL || "http://localhost:3000";
const CAMPAIGN_ID = "23968213148";
const AG_SAAS = "196498803486"; // v2 "SaaS ve CRM Geliştirme"

// Eski kampanyadaki negatifler (arama2025-optimize.mjs ile aynı liste)
const BASE_NEGATIVES = [
  "level ai", "monhai com", "mango ai", "blueprint ai", "boost ai", "harpa ai",
  "pworks ai", "gohighlevel", "blackbox ai", "thoth ai", "replicate ai", "creo ai",
  "web design ai", "create css", "create css background",
  "best ai tools", "ai tools for", "best enterprise ai", "best crm software",
  "ai solutions for business", "intelligent automation", "automation tools for small businesses",
  "how to start", "how to build", "ai software for businesses", "automation software",
  "artificial intelligence software development services",
  "iot", "internet of things", "retail applications", "retail data analytics",
  "retail innovation", "accounts payable", "accounts receivable", "supply chain",
  "predictive maintenance", "business intelligence", "customer success software",
  "it automation", "it operations", "business process outsourcing",
  "enterprise integration", "sales ai", "marketplace platform",
  "ifs türkiye", "yapay zeka sulama", "web tabanlı uygulama geliştirme sorumluluk",
  "web development", "website development", "software developer",
];

// v2'de bu tur görülen yeni alakasız araştırma/araç terimleri
const V2_NEW_NEGATIVES = [
  "saas ai", "machine learning saas", "saas ppt", "axure cloud",
  "ai solution providers", "ai solutions companies", "ai for business solutions",
  "ai business solutions", "outsourcing saas development",
];

const NEGATIVES = [...new Set([...BASE_NEGATIVES, ...V2_NEW_NEGATIVES])];

async function post(url, body) {
  const r = await fetch(`${BASE}${url}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return { status: r.status, json: await r.json().catch(() => null) };
}
async function patch(url, body) {
  const r = await fetch(`${BASE}${url}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return { status: r.status, json: await r.json().catch(() => null) };
}

async function main() {
  console.log(`=== A) v2 negatif ekleme (${NEGATIVES.length} terim) ===`);
  const neg = await post(`/api/google-ads/campaigns/${CAMPAIGN_ID}/negatives`, { keywords: NEGATIVES, matchType: "BROAD" });
  console.log("status", neg.status, JSON.stringify(neg.json)?.slice(0, 200));

  console.log("\n=== B1) 'saas platform' PHRASE pause ===");
  const pause = await patch(`/api/google-ads/adgroups/${AG_SAAS}/keywords`, { pauseTexts: ["saas platform"] });
  console.log("status", pause.status, JSON.stringify(pause.json));

  console.log("\n=== B2) 'saas platform' EXACT + 'saas platform geliştirme' PHRASE ekle ===");
  const add = await post(`/api/google-ads/adgroups/${AG_SAAS}/keywords`, {
    keywords: [
      { text: "saas platform", matchType: "EXACT" },
      { text: "saas platform geliştirme", matchType: "PHRASE" },
    ],
  });
  console.log("status", add.status, JSON.stringify(add.json));
  console.log("\nBitti.");
}
main().catch((e) => { console.error(e); process.exit(1); });
