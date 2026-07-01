/**
 * Şişli / Beşiktaş / Beyoğlu için Google Ads geo constant ID'lerini doğrular.
 * GAQL ile geo_target_constant tablosunu sorgular (İstanbul'a bağlı ilçeler/şehirler).
 *
 * Kullanım: node scripts/verify-geo-constants.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleAdsApi } from "google-ads-api";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local'i manuel yükle (dotenv yok)
const envPath = resolve(__dirname, "..", ".env.local");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) {
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const opts = {
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
};
const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) {
  opts.login_customer_id = loginId;
}
const customer = client.Customer(opts);

const TARGETS = ["Sisli, Istanbul", "Besiktas, Istanbul", "Beyoglu, Istanbul",
                 "Şişli, İstanbul", "Beşiktaş, İstanbul", "Beyoğlu, İstanbul"];

async function main() {
  console.log("=== Geo Constant Doğrulama: Şişli / Beşiktaş / Beyoğlu ===\n");
  console.log("SuggestGeoTargetConstants servisi ile çözümleme...\n");

  const res = await customer.geoTargetConstants.suggestGeoTargetConstants({
    locale: "tr",
    country_code: "TR",
    location_names: { names: TARGETS },
  });

  const list = res.geo_target_constant_suggestions ?? res ?? [];
  const seen = new Set();
  for (const item of list) {
    const g = item.geo_target_constant;
    if (!g) continue;
    if (seen.has(g.id)) continue;
    seen.add(g.id);
    console.log(`  ID ${g.id} | ${g.canonical_name} | type=${g.target_type} | status=${g.status} | term="${item.search_term ?? ""}"`);
  }

  console.log("\nNot: Doğru olan, canonical_name'i 'İlçe,İstanbul,Turkey' biçiminde olan");
  console.log("ve target_type = District (veya City) olan kayıttır. ID'leri payload'a gir.");
}

main().catch((e) => {
  console.error("\nHATA:", e.message || e);
  if (JSON.stringify(e).includes("OAUTH") || /token/i.test(e.message || "")) {
    console.error(">> Token expiry olası. /api/google-ads/auth ile refresh token yenile.");
  }
  process.exit(1);
});
