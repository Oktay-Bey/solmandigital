/**
 * Makedonya kampanyası son kontrol scripti
 * Kullanım: node scripts/check-mk-campaign.mjs
 * (Dev sunucu çalışırken: node scripts/check-mk-campaign.mjs http://localhost:3000)
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.argv[2]?.replace(/\/$/, "") ?? "http://localhost:3000";
const CAMPAIGN_ID = "23932180708";

async function get(path) {
  const r = await fetch(`${BASE_URL}${path}`);
  return r.json();
}

async function main() {
  console.log("=== Makedonya Kampanyası — Son Kontrol ===\n");

  // 1. Kampanya durumu
  const { campaigns } = await get("/api/google-ads/campaigns");
  const mk = campaigns?.find(c => c.id === CAMPAIGN_ID);
  if (!mk) { console.error("HATA: Kampanya bulunamadı!"); process.exit(1); }

  console.log("── Kampanya ──────────────────────────────");
  console.log(`  Ad    : ${mk.name}`);
  console.log(`  ID    : ${mk.id}`);
  console.log(`  Durum : ${mk.status} ${mk.status === "ENABLED" ? "✓ AKTİF" : "⚠ PAUSED"}`);
  console.log(`  Bütçe : ${mk.budgetAmountTL} TL/gün`);

  // 2. Ad group'lar
  const { adGroups } = await get(`/api/google-ads/campaigns/${CAMPAIGN_ID}`);
  console.log(`\n── Ad Group'lar (${adGroups?.length ?? 0} adet) ───────────────`);
  for (const ag of (adGroups ?? [])) {
    console.log(`  ${ag.name} (ID: ${ag.id}) — status: ${ag.status === "2" ? "ENABLED ✓" : ag.status}`);
  }

  // 3. Reklam içerikleri
  const analysis = await get(`/api/google-ads/analysis?campaignId=${CAMPAIGN_ID}`);
  const ads = analysis.allAdGroupAds ?? [];
  console.log(`\n── Reklamlar (${ads.length} ad group'ta RSA) ────────────────`);
  for (const ad of ads) {
    console.log(`\n  [${ad.adGroupName}]`);
    console.log(`    Final URL  : ${ad.finalUrls?.[0]}`);
    console.log(`    Headlines  : ${ad.headlines?.length} adet`);
    ad.headlines?.forEach((h, i) => console.log(`      ${String(i+1).padStart(2)}. ${h.text} (${h.text.length} chr)`));
    console.log(`    Descriptions:`);
    ad.descriptions?.forEach((d, i) => console.log(`      ${i+1}. ${d.text} (${d.text.length} chr)`));
  }

  // 4. Özet kontrol
  console.log("\n── Özet ────────────────────────────────────");
  const checks = [
    { label: "Kampanya ENABLED", ok: mk.status === "ENABLED" },
    { label: "Bütçe 50 TL/gün", ok: mk.budgetAmountTL === 50 },
    { label: "2 aktif ad group", ok: adGroups?.length === 2 },
    { label: "2 RSA mevcut", ok: ads.length === 2 },
    { label: "Landing page doğru", ok: ads.every(a => a.finalUrls?.[0]?.includes("/en/web-design")) },
    { label: "Geo: North Macedonia (2807) — Google Ads UI'dan doğrula", ok: null },
  ];
  checks.forEach(c => {
    const icon = c.ok === null ? "⚠" : c.ok ? "✓" : "✗";
    console.log(`  ${icon} ${c.label}`);
  });

  console.log("\nNot: Geo target Google Ads UI > Campaigns > Settings > Locations'dan doğrula.");
  console.log("     'North Macedonia' görünmeli.\n");
}

main().catch(e => { console.error("Hata:", e.message); process.exit(1); });
