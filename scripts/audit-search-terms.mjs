/**
 * TÜM ENABLED kampanyaların arama terimlerini tarar, alakasız/sızan terimleri
 * kategorik desenlerle tespit eder ve raporlar. Otomatik izleme/savunma aracı.
 *
 * Kullanım:
 *   node scripts/audit-search-terms.mjs                  # son 30 gün, konsola
 *   node scripts/audit-search-terms.mjs LAST_7_DAYS      # 7 gün
 *   node scripts/audit-search-terms.mjs LAST_7_DAYS --mail   # + HTML rapor maille
 *   node scripts/audit-search-terms.mjs --mail --only-waste  # sadece israf varsa mail at
 *
 * Çıktı: harcama yapan + 0 dönüşümlü + ŞÜPHELİ (kategori eşleşen) terimler.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleAdsApi } from "google-ads-api";
import { Resend } from "resend";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) { let v = m[2].trim(); if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1); if (!process.env[m[1]]) process.env[m[1]] = v; }
}

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});
const opts = { customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID, refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN };
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) opts.login_customer_id = loginId;
const customer = client.Customer(opts);

const ARGS = process.argv.slice(2);
const PERIOD = ARGS.find((a) => /^LAST_/.test(a)) || "LAST_30_DAYS";
const SEND_MAIL = ARGS.includes("--mail");
const ONLY_WASTE = ARGS.includes("--only-waste"); // sadece israf > 0 ise mail at
const MAIL_TO = process.env.ADMIN_EMAIL || "solmanoktay@gmail.com";
const MAIL_FROM = `Solman Ads Bot <${process.env.RESEND_FROM_EMAIL || "info@solmandigital.com.tr"}>`;

// ── PROAKTİF KATEGORİK DESENLER ──────────────────────────────
// Bu regex'ler "öngörülemeyen ama alakasız" aramaları yakalar.
// Yeni sızıntı keşfedildikçe buraya desen ekle → tüm kampanyalarda otomatik tespit.
const SUSPECT_PATTERNS = [
  { cat: "Eğitim/Okul/Ödev", re: /\b(\d+\s*s[ıi]n[ıi]f|ders|ödev|odev|s[ıi]nav|konu anlat[ıi]m|kitab[ıi]|kitap|pdf|müfredat|mufredat|akademi|üniversite|universite|öğrenci|ogrenci|staj|tutorial|course|lesson|exam|homework|syllabus)\b/i },
  { cat: "Bilgi/Kavram-arama", re: /\b(nedir|ne demek|nas[ıi]l|fark[ıi]|avantaj|dezavantaj|örnek|ornek|what is|how to|meaning|difference|vs\b|definition|guide|examples?|ideas?|types? of)\b/i },
  { cat: "Hazır-ürün/araç", re: /\b(software|tool|tools|app|apps|kit|starter|template|theme|plugin|extension|saasykit|axure|figma|canva|wix|webflow|shopify app|builder|no.?code|crm sistemi|haz[ıi]r)\b/i },
  { cat: "Ücretsiz/DIY", re: /\b(ücretsiz|ucretsiz|bedava|free|kendim|diy|aç[ıi]k kaynak|acik kaynak|open source|indir|download|crack|nulled)\b/i },
  { cat: "İş-arayan", re: /\b(iş ilan|is ilan|eleman|maaş|maas|sal[ae]ry|cv|özgeçmiş|ozgecmis|kariyer|career|jobs?|hiring|vacancy|intern|staj)\b/i },
  { cat: "Alakasız-sektör", re: /\b(emlak|emlakç|otel|hotel|kuyumcu|jewel|restoran (menü|menu)|kuaför|kuafor|berber|nakliyat|oto kiralama|rent a car|düğün|dugun|gayrimenkul)\b/i },
  { cat: "EN-niyetsiz-global", re: /\b(buy |providers?|companies|solutions for|best |top \d|review|comparison|alternatives?|pricing|cheap)\b/i },
  { cat: "Bilgi-SaaS-jenerik", re: /\b(micro saas|mikro saas|saas (and|industry|market|charges|access|application|edits|ppt)|machine learning saas|iaas|paas)\b/i },
];

// Kampanyanın ülkesine göre meşru olabilecek terimleri koruyan whitelist (yanlış pozitifi azalt)
const WHITELIST = /\b(web tasar[ıi]m|web sitesi yapt[ıi]r|yaz[ıi]l[ıi]m geli[şs]tir|özel yaz[ıi]l[ıi]m|ozel yazilim|e.?ticaret|web development|software development company|custom software|mobile app development|website development|ai automation consulting|business process automation)\b/i;

async function getEnabledCampaigns() {
  const rows = await customer.query(
    "SELECT campaign.id, campaign.name FROM campaign WHERE campaign.status = 'ENABLED' AND campaign.advertising_channel_type = 'SEARCH'"
  );
  return rows.map((r) => ({ id: r.campaign.id, name: r.campaign.name }));
}

async function getSearchTerms(campaignId) {
  const rows = await customer.query(`
    SELECT
      search_term_view.search_term,
      metrics.clicks, metrics.cost_micros, metrics.conversions,
      segments.search_term_match_type
    FROM search_term_view
    WHERE campaign.id = ${campaignId}
      AND segments.date DURING ${PERIOD}
    ORDER BY metrics.cost_micros DESC
  `);
  return rows.map((r) => ({
    term: r.search_term_view.search_term,
    clicks: r.metrics.clicks || 0,
    costTL: (Number(r.metrics.cost_micros) || 0) / 1_000_000,
    conversions: r.metrics.conversions || 0,
  }));
}

function classify(term) {
  if (WHITELIST.test(term)) return null;
  for (const p of SUSPECT_PATTERNS) if (p.re.test(term)) return p.cat;
  return null;
}

async function main() {
  console.log(`\n========== ARAMA TERİMİ DENETİMİ (${PERIOD}) ==========\n`);
  const campaigns = await getEnabledCampaigns();
  const allSuspects = [];
  let grandWaste = 0;

  for (const c of campaigns) {
    const terms = await getSearchTerms(c.id);
    const suspects = [];
    for (const t of terms) {
      const cat = classify(t.term);
      // Şüpheli sayılma kriteri: kategori eşleşti VEYA (harcama var + 0 dönüşüm + meşru değil)
      const wastedNoConv = t.costTL > 0 && t.conversions === 0 && !WHITELIST.test(t.term);
      if (cat || wastedNoConv) {
        suspects.push({ ...t, cat: cat || "Harcama+0dönüşüm(incele)" });
      }
    }
    suspects.sort((a, b) => b.costTL - a.costTL);
    const waste = suspects.reduce((s, x) => s + x.costTL, 0);
    grandWaste += waste;

    console.log(`── ${c.name} (${c.id}) ── şüpheli: ${suspects.length} | israf: ₺${waste.toFixed(2)}`);
    for (const s of suspects.slice(0, 25)) {
      const flag = s.costTL > 0 ? "💸" : "  ";
      console.log(`   ${flag} ₺${s.costTL.toFixed(2).padStart(7)} | ${s.clicks}t | [${s.cat}] ${s.term}`);
      if (s.costTL > 0) allSuspects.push({ campaignId: c.id, campaign: c.name, ...s });
    }
    console.log("");
  }

  // Eyleme dönük çıktı: harcama yapan şüpheli terimler (negatif önerisi)
  console.log("========== ÖNERİLEN NEGATİFLER (harcama yapan şüpheliler) ==========");
  const byCampaign = {};
  for (const s of allSuspects) (byCampaign[s.campaignId] ??= { name: s.campaign, terms: [] }).terms.push(s.term);
  for (const [cid, v] of Object.entries(byCampaign)) {
    console.log(`\n# ${v.name} (${cid}) — ${v.terms.length} terim`);
    console.log(JSON.stringify(v.terms));
  }
  console.log(`\n>>> TOPLAM TESPİT EDİLEN İSRAF: ₺${grandWaste.toFixed(2)} (${PERIOD})`);

  // ── MAİL RAPORU ────────────────────────────────────────────
  if (SEND_MAIL) {
    if (ONLY_WASTE && grandWaste <= 0) {
      console.log("\n[mail] İsraf yok ve --only-waste açık → mail atlanmadı.");
      return;
    }
    if (!process.env.RESEND_API_KEY) { console.warn("[mail] RESEND_API_KEY yok — mail atlanamadı."); return; }
    const html = buildEmailHtml(byCampaign, grandWaste);
    const subject = grandWaste > 0
      ? `⚠️ Ads sızıntı raporu: ₺${grandWaste.toFixed(2)} israf (${PERIOD})`
      : `✓ Ads sızıntı raporu: temiz (${PERIOD})`;
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({ from: MAIL_FROM, to: MAIL_TO, subject, html });
      console.log(`\n[mail] Rapor gönderildi → ${MAIL_TO}`);
    } catch (e) {
      console.error("[mail] Gönderim hatası:", e.message || e);
    }
  }
}

function buildEmailHtml(byCampaign, grandWaste) {
  const rows = Object.entries(byCampaign).map(([cid, v]) => {
    const items = v.terms.map((t) => `<li style="margin:2px 0">${t}</li>`).join("");
    return `<div style="margin:16px 0;padding:12px 16px;background:#fff;border-radius:8px;border:1px solid #eee">
      <strong style="color:#9b1c1c">${v.name}</strong> <span style="color:#888">(${cid})</span> — ${v.terms.length} şüpheli terim
      <ul style="margin:8px 0 0;padding-left:20px;color:#333;font-size:13px">${items}</ul>
    </div>`;
  }).join("");
  const empty = Object.keys(byCampaign).length === 0
    ? `<p style="color:#16794c;font-weight:600">✓ Harcama yapan şüpheli terim bulunamadı — savunma çalışıyor.</p>` : "";
  return `<div style="font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;background:#f5f5f5;padding:28px 16px">
    <div style="background:#fff;border-radius:12px;padding:24px">
      <h2 style="margin:0 0 4px">Google Ads — Sızıntı Denetim Raporu</h2>
      <p style="color:#888;margin:0 0 16px">Dönem: ${PERIOD} · ${new Date().toLocaleString("tr-TR")}</p>
      <div style="font-size:22px;font-weight:700;color:${grandWaste > 0 ? "#9b1c1c" : "#16794c"};margin-bottom:12px">
        Tespit edilen israf: ₺${grandWaste.toFixed(2)}
      </div>
      ${empty}
      ${rows}
      <p style="color:#666;font-size:13px;margin-top:20px">
        Bu terimleri engellemek için: meşru olmayanları <code>POST /api/google-ads/campaigns/[id]/negatives</code>
        (matchType:"PHRASE") ile ekle. Kategorik yeni tuzak varsa <code>master-negatives.json</code>'a kök ekleyip
        <code>apply-master-negatives.mjs</code> ile tüm kampanyalara yay.
      </p>
    </div>
  </div>`;
}

main().catch((e) => { console.error("HATA:", e.message || e); process.exit(1); });
