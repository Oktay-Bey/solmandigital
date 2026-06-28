// Arama 2025 (campaign 23914856579) kalite optimizasyonu — tek seferlik batch.
// Kendi API route'larını çağırır (dev server ayakta olmalı). Onaylanan aksiyonlar:
//   A2 — alakasız/araştırma arama terimlerini kampanya negatifi olarak ekle
//   A3 — niyetli/yüksek-QS keyword'lerde teklifi ~%50 yükselt (agresif)
// Keyword PAUSE (A1/A4) bu turda UYGULANMAZ (kullanıcı: "henüz durdurma").
const BASE = process.env.BASE_URL || "http://localhost:3000";
const CAMPAIGN_ID = "23914856579";

// adGroupId -> isim (referans için)
const AG = {
  AI_OTOMASYON: "197976235340",
  MARKA: "198854694164",
  SAAS: "196859748866",
  TRENDYOL: "200295415394",
  WEB: "200295375754",
};

// A2 — kampanya seviyesi negatif (BROAD). Niyetli terimler KASITLI dışarıda.
const NEGATIVES = [
  // araç/marka araması
  "level ai", "monhai com", "mango ai", "blueprint ai", "boost ai", "harpa ai",
  "pworks ai", "gohighlevel", "blackbox ai", "thoth ai", "replicate ai", "creo ai",
  "web design ai", "create css", "create css background",
  // araştırma / bilgi niyeti
  "best ai tools", "ai tools for", "best enterprise ai", "best crm software",
  "ai solutions for business", "intelligent automation", "automation tools for small businesses",
  "how to start", "how to build", "ai software for businesses", "automation software",
  "artificial intelligence software development services",
  // alakasız dikey
  "iot", "internet of things", "retail applications", "retail data analytics",
  "retail innovation", "accounts payable", "accounts receivable", "supply chain",
  "predictive maintenance", "business intelligence", "customer success software",
  "it automation", "it operations", "business process outsourcing",
  "enterprise integration", "sales ai", "marketplace platform",
  "ifs türkiye", "yapay zeka sulama", "web tabanlı uygulama geliştirme sorumluluk",
  // EN spillover (TR kampanyasında istenmeyen)
  "web development", "website development", "software developer",
];

// A3 — teklif yükseltme (text + bidTL), grup bazında
const BIDS = {
  [AG.AI_OTOMASYON]: [
    { text: "yapay zeka otomasyon", bidTL: 19.31 },
    { text: "yapay zeka çözümleri", bidTL: 13.53 },
  ],
  [AG.MARKA]: [
    { text: "istanbul yazılım şirketi", bidTL: 21.34 },
  ],
  [AG.SAAS]: [
    { text: "saas platform", bidTL: 4.13 },
    { text: "web uygulama geliştirme", bidTL: 18.00 }, // avgCPC 16 → ölçülü tavan
  ],
  [AG.TRENDYOL]: [
    { text: "e-ticaret entegrasyon", bidTL: 13.60 },
    { text: "pazaryeri entegrasyonu", bidTL: 13.11 },
  ],
};

async function post(url, body) {
  const r = await fetch(`${BASE}${url}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  return { status: r.status, json: await r.json().catch(() => null) };
}
async function patch(url, body) {
  const r = await fetch(`${BASE}${url}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  return { status: r.status, json: await r.json().catch(() => null) };
}

async function main() {
  console.log("=== A2: Negatif keyword ekleme ===");
  const neg = await post(`/api/google-ads/campaigns/${CAMPAIGN_ID}/negatives`,
    { keywords: NEGATIVES, matchType: "BROAD" });
  console.log("status", neg.status, JSON.stringify(neg.json));

  console.log("\n=== A3: Teklif yükseltme (agresif ~%50) ===");
  for (const [adGroupId, bids] of Object.entries(BIDS)) {
    const res = await patch(`/api/google-ads/adgroups/${adGroupId}/keywords`, { bids });
    console.log(`adGroup ${adGroupId}:`, res.status, JSON.stringify(res.json));
  }
  console.log("\nBitti.");
}
main().catch((e) => { console.error(e); process.exit(1); });
