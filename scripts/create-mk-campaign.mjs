/**
 * Kuzey Makedonya test kampanyası oluşturucu
 * Kullanım: node scripts/create-mk-campaign.mjs
 *
 * Kampanya PAUSED olarak oluşturulur. Kontrol sonrası Google Ads UI veya
 * PATCH /api/google-ads/campaigns/:id ile { status: "ENABLED" } göndererek aktif et.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// BASE_URL: script argümanı > env > localhost
// Kullanım: node scripts/create-mk-campaign.mjs [base_url]
// Örnek:    node scripts/create-mk-campaign.mjs http://localhost:3000
//
// ÖNEMLI: Production URL'ye gönderirken Vercel'deki env değişkenlerinde
// BOM (﻿) karakteri varsa "illegal characters" hatası alınır.
// Bu durumda dev sunucusu üzerinden çalıştır:
//   1. npx next dev --port 3000
//   2. node scripts/create-mk-campaign.mjs http://localhost:3000
function getBaseUrl() {
  if (process.argv[2]) return process.argv[2].replace(/\/$/, "");
  try {
    const envPath = resolve(__dirname, "../.env.local");
    const content = readFileSync(envPath, "utf-8");
    const match = content.match(/NEXT_PUBLIC_SITE_URL=(.+)/);
    if (match) return match[1].trim();
  } catch { /* ignore */ }
  return "http://localhost:3000";
}

const BASE_URL = getBaseUrl();
const LANDING_PAGE = `https://solmandigital.com.tr/en/web-design`;

const today = new Date();
const startDate = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD

const campaign = {
  campaignName: "Solman Digital — Macedonia EN",
  dailyBudgetTL: 50,
  // North Macedonia geo target constant ID (GAQL ile doğrulandı: name="North Macedonia", countryCode="MK")
  // Referans: Türkiye=2792, İstanbul=1012867, Kuzey Makedonya=2807
  geoTargetConstantIds: [2807],
  startDate,
  negativeKeywords: [
    "free",
    "template",
    "wordpress",
    "wix",
    "shopify",
    "course",
    "tutorial",
    "diy",
    "cheap",
    "how to",
    "learn",
    "download",
  ],
  adGroups: [
    {
      name: "Web Design MK",
      targetUrl: LANDING_PAGE,
      cpcBidMicros: 1_500_000, // 1.5 TL
      headlines: [
        "Custom Website for Business",   // 28
        "Live in 5-10 Business Days",    // 25
        "Fixed Price, No Surprises",     // 23
        "Direct Expert, No Agency",      // 22
        "Free 30-Min Consultation",      // 23
        "Web Design North Macedonia",    // 26
        "From 400 EUR One-Time Cost",    // 26
        "Mobile + SEO + SSL Included",   // 26
        "Source Code Is Yours to Keep",  // 29
        "Built from Scratch No Template",  // 30
      ],
      descriptions: [
        "Professional website built for your business. Google PageSpeed 90+, mobile-ready design.",
        "Work directly with one specialist — no layers, no surprises. Source code is yours.",
      ],
      keywords: [
        { text: "web design Macedonia", matchType: "PHRASE" },
        { text: "website development Skopje", matchType: "PHRASE" },
        { text: "custom website North Macedonia", matchType: "PHRASE" },
        { text: "web design company Macedonia", matchType: "PHRASE" },
        { text: "business website Macedonia", matchType: "BROAD" },
        // Makedonca keyword'ler — REST API TextEncoder ile gönderildiği için güvenli
        { text: "izrabotka na veb sajt", matchType: "PHRASE" },
        { text: "veb dizajn Skopje", matchType: "PHRASE" },
      ],
    },
    {
      name: "E-Commerce MK",
      targetUrl: LANDING_PAGE,
      cpcBidMicros: 2_000_000, // 2 TL
      headlines: [
        "Online Store for Your Business",  // 30
        "E-Commerce Macedonia",            // 19
        "Cart + Payments + Admin Panel",   // 28
        "Delivered in 10-15 Days",         // 22
        "1000 EUR Source Code Yours",      // 26
        "Free Technical Consultation",     // 28
        "No Monthly Platform Fees",        // 23
        "Full E-Commerce From Scratch",    // 28
      ],
      descriptions: [
        "Full e-commerce: products, cart, payment gateway, admin panel. Built for your business.",
        "No monthly platform fees — code is yours. Direct expert access from day one.",
      ],
      keywords: [
        { text: "online store Macedonia", matchType: "PHRASE" },
        { text: "e-commerce website Skopje", matchType: "PHRASE" },
        { text: "online shop Macedonia", matchType: "BROAD" },
        { text: "e-commerce development Macedonia", matchType: "PHRASE" },
        // Makedonca keyword'ler
        { text: "izrabotka na online prodavnica", matchType: "PHRASE" },
        { text: "e-trgovina Makedonija", matchType: "PHRASE" },
      ],
    },
  ],
};

const sitelinks = [
  {
    linkText: "Our Work",
    description1: "See live projects we delivered",
    description2: "Real builds, not mock-ups",
    finalUrl: "https://solmandigital.com.tr/portfoy",
  },
  {
    linkText: "Free Consult",
    description1: "30-min call, no sales pressure",
    description2: "Book via Calendly",
    finalUrl: "https://solmandigital.com.tr/danismanlik",
  },
  {
    linkText: "Pricing",
    description1: "Fixed prices, no hidden costs",
    description2: "From 400 EUR, one-time",
    finalUrl: "https://solmandigital.com.tr/fiyatlar",
  },
];

async function main() {
  console.log("=== Makedonya Kampanya Scripti ===");
  console.log("Base URL:", BASE_URL);
  console.log("Landing Page:", LANDING_PAGE);
  console.log("Start Date:", startDate);
  console.log("Daily Budget:", campaign.dailyBudgetTL, "TL");
  console.log("");

  // 1. Kampanya oluştur
  console.log("1/3 — Kampanya oluşturuluyor...");
  const createRes = await fetch(`${BASE_URL}/api/google-ads/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(campaign),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    console.error("HATA — Kampanya oluşturulamadı:", err);
    process.exit(1);
  }

  const createData = await createRes.json();
  console.log("✓ Kampanya oluşturuldu (PAUSED)");
  console.log("  Campaign Resource:", createData.campaignResource ?? createData.campaign ?? "—");
  console.log("  Budget Resource:", createData.budgetResource ?? "—");

  if (createData.adGroups) {
    for (const ag of createData.adGroups) {
      console.log(`  Ad Group: ${ag.name} — ${ag.keywordResources?.length ?? 0} keyword`);
    }
  }

  // Kampanya ID'yi resource name'den çıkar
  const resourceName = createData.campaignResource ?? "";
  const campaignIdMatch = resourceName.match(/campaigns\/(\d+)/);
  if (!campaignIdMatch) {
    console.log("\nUYARI: Kampanya ID çıkarılamadı. Sitelink'ler eklenemeyecek.");
    console.log("Resource name:", resourceName);
    console.log("\nSonraki adım: Kampanyayı Google Ads UI'dan kontrol et, ardından aktif et.");
    return;
  }

  const campaignId = campaignIdMatch[1];
  console.log("  Campaign ID:", campaignId);

  // 2. Sitelink'ler ekle
  console.log("\n2/3 — Sitelink'ler ekleniyor...");
  const slRes = await fetch(`${BASE_URL}/api/google-ads/campaigns/${campaignId}/sitelinks`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ sitelinks }),
  });

  if (!slRes.ok) {
    const err = await slRes.text();
    console.warn("UYARI — Sitelink eklenemedi (kampanya oluşturuldu, devam edilebilir):", err.slice(0, 500));
  } else {
    const slData = await slRes.json();
    const added = slData.sitelinks ?? slData.results ?? [];
    console.log(`✓ ${added.length} sitelink eklendi`);
  }

  // 3. Kampanya listesini doğrula
  console.log("\n3/3 — Kampanyalar listeleniyor (doğrulama)...");
  const listRes = await fetch(`${BASE_URL}/api/google-ads/campaigns`);
  if (listRes.ok) {
    const listData = await listRes.json();
    const campaigns = listData.campaigns ?? [];
    const found = campaigns.find((c) => c.id === campaignId || c.name?.includes("Macedonia"));
    if (found) {
      console.log("✓ Yeni kampanya doğrulandı:");
      console.log("  Name:", found.name);
      console.log("  Status:", found.status, "(PAUSED — beklenen)");
      console.log("  Budget:", found.budgetAmountTL, "TL/gün");
    } else {
      console.log("  (Kampanya listede bulunamadı — API gecikmesi olabilir, Google Ads UI'dan kontrol et)");
    }
  }

  console.log("\n=== TAMAMLANDI ===");
  console.log(`Kampanya ID: ${campaignId}`);
  console.log("Durum: PAUSED");
  console.log("\nAktif etmek için:");
  console.log(`  PATCH ${BASE_URL}/api/google-ads/campaigns/${campaignId}`);
  console.log(`  Body: { "status": "ENABLED" }`);
  console.log("\nYa da Google Ads UI > Campaigns > Macedonia EN > Enable");
}

main().catch((e) => {
  console.error("Beklenmeyen hata:", e);
  process.exit(1);
});
