/**
 * Türkiye (geo 2792) hedefli Keyword Planner araştırması.
 * Ana TR kampanyasının gerçek hizmet temalarını TR'de arama hacmi +
 * önerilen ilk-sayfa/üst teklifle birlikte gösterir.
 * Dev server route'u (/api/google-ads/keyword-ideas) üzerinden çalışır.
 *
 * Kullanım: node scripts/tr-keyword-research.mjs [http://localhost:3000]
 */
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const GEO_TR = 2792; // Türkiye
const LANG_TR = 1037; // Türkçe

// Kampanyanın 4 ana hizmet teması — her tema için seed kümesi
const THEMES = {
  "Web Sitesi / Tasarım": ["web sitesi yaptırma", "kurumsal web sitesi", "web tasarım", "web sitesi fiyatları", "şirket web sitesi", "web tasarım ajansı"],
  "E-Ticaret / Pazaryeri": ["e-ticaret sitesi", "trendyol entegrasyon", "pazaryeri entegrasyonu", "online mağaza kurulumu", "e-ticaret yazılımı"],
  "SaaS / CRM / Yazılım": ["crm yazılımı", "özel yazılım geliştirme", "saas platform", "kurumsal yazılım", "müşteri yönetim yazılımı"],
  "AI / Otomasyon": ["yapay zeka otomasyon", "iş süreçleri otomasyonu", "otomasyon yazılımı", "yapay zeka çözümleri", "dijital dönüşüm"],
};

async function ideasFor(seeds) {
  const r = await fetch(`${BASE_URL}/api/google-ads/keyword-ideas`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ seeds, geoTargetConstantId: GEO_TR, languageId: LANG_TR }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data.ideas || [];
}

async function withRetry(fn, tries = 5) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); }
    catch (e) { last = e; await new Promise((r) => setTimeout(r, 2500)); }
  }
  throw last;
}

async function main() {
  console.log("=== Türkiye Keyword Planner Forecast (geo 2792, dil 1037) ===\n");
  const all = {};
  for (const [theme, seeds] of Object.entries(THEMES)) {
    process.stdout.write(`▶ ${theme} ... `);
    try {
      const ideas = await withRetry(() => ideasFor(seeds));
      const withVol = ideas.filter((r) => r.avgMonthlySearches > 0).sort((a, b) => b.avgMonthlySearches - a.avgMonthlySearches);
      console.log(`${ideas.length} fikir, ${withVol.length} hacimli`);
      all[theme] = withVol;
      console.log(`\n── ${theme} — top 20 (hacimli) ─────────────`);
      console.log("  vol/ay  comp   topBid(TL)  keyword");
      withVol.slice(0, 20).forEach((r) => {
        console.log(`  ${String(r.avgMonthlySearches).padStart(6)}  ${String(r.competition).padEnd(6)} ${r.highTopBidTL.toFixed(2).padStart(8)}   ${r.keyword}`);
      });
      console.log();
    } catch (e) {
      console.log(`HATA: ${e.message}`);
      all[theme] = { error: e.message };
    }
  }
  writeFileSync(resolve(__dirname, "tr-keyword-ideas.json"), JSON.stringify(all, null, 2));
  console.log("💾 scripts/tr-keyword-ideas.json yazıldı");
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
