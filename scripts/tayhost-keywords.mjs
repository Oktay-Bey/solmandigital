// Tek seferlik: Tayhost için Keyword Planner verisi çek (hacim + rekabet + CPC)
// Çalıştırma: node --env-file=.env.local scripts/tayhost-keywords.mjs
import { GoogleAdsApi, enums } from "google-ads-api";

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
  login_customer_id:
    process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID !== process.env.GOOGLE_ADS_CUSTOMER_ID
      ? process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
      : undefined,
});

// Tayhost seed kelimeleri — hosting/VPS/sunucu odaklı
const seeds = [
  "vps sunucu kiralama",
  "sanal sunucu",
  "sunucu kiralama",
  "vps fiyatları",
  "ucuz vps",
  "cloud sunucu",
  "dedicated sunucu",
  "minecraft sunucu kiralama",
  "wordpress sunucu",
  "linux vps",
  "windows vps",
  "domain kayıt",
];

const compMap = { 0: "?", 1: "?", 2: "LOW", 3: "MEDIUM", 4: "HIGH",
  UNSPECIFIED: "?", UNKNOWN: "?", LOW: "LOW", MEDIUM: "MEDIUM", HIGH: "HIGH" };

const req = {
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  language: "languageConstants/1037",            // Türkçe
  geo_target_constants: ["geoTargetConstants/2792"], // Türkiye
  keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
  include_adult_keywords: false,
  keyword_seed: { keywords: seeds },
};

const resp = await customer.keywordPlanIdeas.generateKeywordIdeas(req);
const rows = (resp?.results ?? resp ?? []).map((r) => {
  const m = r.keyword_idea_metrics ?? {};
  return {
    keyword: String(r.text ?? ""),
    vol: Number(m.avg_monthly_searches ?? 0),
    comp: compMap[m.competition] ?? String(m.competition ?? "?"),
    lowCpc: Number(m.low_top_of_page_bid_micros ?? 0) / 1e6,
    highCpc: Number(m.high_top_of_page_bid_micros ?? 0) / 1e6,
  };
});

rows.sort((a, b) => b.vol - a.vol);
console.log("TOPLAM:", rows.length, "fikir\n");
console.log("HACIM\tRKB\tCPC(düşük-yüksek TL)\tKELIME");
for (const r of rows) {
  console.log(`${r.vol}\t${r.comp}\t${r.lowCpc.toFixed(1)}-${r.highCpc.toFixed(1)}\t${r.keyword}`);
}
