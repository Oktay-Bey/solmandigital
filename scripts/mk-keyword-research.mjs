/**
 * Makedonya (North Macedonia) Keyword Planner araştırması
 * Dev server route'u (/api/google-ads/keyword-ideas) üzerinden çalışır.
 * (memory notu: standalone node googleads.googleapis.com'a DNS-bloklu →
 *  Ads çağrıları dev server API route üzerinden yapılır.)
 *
 * Kullanım: node scripts/mk-keyword-research.mjs [http://localhost:3000]
 */
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const GEO_MK = 2807; // North Macedonia (doğrulandı)
const LANGS = { EN: 1000, Macedonian: 1036, Albanian: 1018, Serbian: 1035 };

const SEEDS = {
  EN: ["web design", "web development", "website", "ecommerce website", "online store", "digital agency", "web design agency", "seo", "google ads", "mobile app development"],
  Macedonian: ["изработка на веб страна", "веб дизајн", "веб страна", "онлајн продавница", "е-продавница", "дигитална агенција", "сео оптимизација", "изработка на сајт"],
  Albanian: ["dizajn web", "faqe interneti", "ndertim faqe interneti", "dyqan online", "agjenci digjitale", "krijimi i faqeve te internetit"],
  Serbian: ["izrada sajta", "web dizajn", "izrada web sajta", "onlajn prodavnica", "digitalna agencija"],
};

async function ideasFor(seeds, languageId) {
  const r = await fetch(`${BASE_URL}/api/google-ads/keyword-ideas`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ seeds, geoTargetConstantId: GEO_MK, languageId }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data.ideas || [];
}

async function main() {
  console.log("=== Makedonya Keyword Planner Araştırması (geo 2807) ===\n");
  const all = {};
  for (const [label, langId] of Object.entries(LANGS)) {
    process.stdout.write(`▶ ${label} (lang ${langId}) sorgulanıyor... `);
    try {
      const ideas = await ideasFor(SEEDS[label], langId);
      const withVol = ideas.filter((r) => r.avgMonthlySearches > 0).sort((a, b) => b.avgMonthlySearches - a.avgMonthlySearches);
      console.log(`${ideas.length} fikir, ${withVol.length} hacimli`);
      all[label] = withVol;
      console.log(`\n── ${label} — arama hacmi olan top 25 ─────────────`);
      console.log("  vol/ay  comp   bid($ düşük-yüksek)  keyword");
      withVol.slice(0, 25).forEach((r) => {
        const bid = `${r.lowTopBidTL.toFixed(2)}-${r.highTopBidTL.toFixed(2)}`;
        console.log(`  ${String(r.avgMonthlySearches).padStart(6)}  ${String(r.competition).padEnd(6)} ${bid.padEnd(14)} ${r.keyword}`);
      });
      console.log();
    } catch (e) {
      console.log(`HATA: ${e.message}`);
      all[label] = { error: e.message };
    }
  }
  writeFileSync(resolve(__dirname, "mk-keyword-ideas.json"), JSON.stringify(all, null, 2));
  console.log("\n💾 scripts/mk-keyword-ideas.json yazıldı");
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
