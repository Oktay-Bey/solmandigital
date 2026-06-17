import { getCustomer } from "./client";
import { google } from "googleapis";
import { enums, type services } from "google-ads-api";
type IGoogleAdsRow = services.IGoogleAdsRow;

async function getAccessToken(): Promise<string> {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_ADS_CLIENT_ID,
    process.env.GOOGLE_ADS_CLIENT_SECRET,
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN });
  const { token } = await auth.getAccessToken();
  if (!token) throw new Error("OAuth2 access token alınamadı");
  return token;
}

async function adsRestPost(path: string, body: unknown): Promise<unknown> {
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN!;
  const accessToken = await getAccessToken();

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": devToken,
    "Content-Type": "application/json; charset=utf-8",
  };
  if (loginId && loginId !== cid) headers["login-customer-id"] = loginId;

  const url = `https://googleads.googleapis.com/v23/customers/${cid}/googleAds:${path}`;
  const bodyStr = JSON.stringify(body);
  const res = await fetch(url, { method: "POST", headers, body: new TextEncoder().encode(bodyStr) });
  const text = await res.text();
  console.log("[adsRestPost]", url, "status:", res.status, "body:", text.slice(0, 2000));
  if (!res.ok || text.trim().startsWith("<")) throw new Error(`REST API error ${res.status}: ${text.slice(0, 1000)}`);
  const json = JSON.parse(text);
  return json;
}

const CAMPAIGN_STATUS: Record<number, string> = {
  0: "UNSPECIFIED", 1: "UNKNOWN", 2: "ENABLED", 3: "PAUSED", 4: "REMOVED",
};

const CHANNEL_TYPE: Record<number, string> = {
  0: "UNSPECIFIED", 1: "UNKNOWN", 2: "SEARCH", 3: "DISPLAY",
  4: "SHOPPING", 5: "VIDEO", 10: "PERFORMANCE_MAX",
};

export interface Campaign {
  id: string;
  name: string;
  status: string;
  channelType: string;
  budgetMicros: number;
  budgetAmountTL: number;
}

export interface AdGroupInput {
  name: string;
  targetUrl: string;
  headlines: string[];       // max 15, her biri max 30 karakter
  descriptions: string[];    // max 4, her biri max 90 karakter
  keywords: { text: string; matchType: "BROAD" | "PHRASE" | "EXACT" }[];
  cpcBidMicros?: number;     // default: 2_000_000 (2 TL)
}

export interface FullCampaignInput {
  campaignName: string;
  dailyBudgetTL: number;
  adGroups?: AdGroupInput[];
  negativeKeywords?: string[];
  // geoTargetConstantIds: Google Ads geo target constant ID'leri
  // İstanbul = 1012867, Türkiye = 2792
  geoTargetConstantIds?: number[];
  startDate?: string; // YYYYMMDD
  endDate?: string;
  // geriye uyumluluk — adGroups yoksa kullanılır
  targetUrl?: string;
  headlines?: string[];
  descriptions?: string[];
  keywords?: { text: string; matchType: "BROAD" | "PHRASE" | "EXACT" }[];
}

export async function listCampaigns(): Promise<Campaign[]> {
  const customer = getCustomer();
  const result = await customer.query(`
    SELECT campaign.id, campaign.name, campaign.status,
           campaign.advertising_channel_type, campaign_budget.amount_micros
    FROM campaign
    WHERE campaign.status != 'REMOVED'
    ORDER BY campaign.name
  `);
  return result.map((row: IGoogleAdsRow) => {
    const budgetMicros = Number(row.campaign_budget?.amount_micros ?? 0);
    return {
      id: String(row.campaign?.id ?? ""),
      name: String(row.campaign?.name ?? ""),
      status: CAMPAIGN_STATUS[Number(row.campaign?.status)] ?? "UNKNOWN",
      channelType: CHANNEL_TYPE[Number(row.campaign?.advertising_channel_type)] ?? "UNKNOWN",
      budgetMicros,
      budgetAmountTL: budgetMicros / 1_000_000,
    };
  });
}

export async function listAdGroups(campaignId: string): Promise<{ id: string; name: string; status: string; resourceName: string }[]> {
  const customer = getCustomer();
  const result = await customer.query(`
    SELECT ad_group.id, ad_group.name, ad_group.status, ad_group.resource_name
    FROM ad_group
    WHERE campaign.id = '${campaignId}'
    AND ad_group.status != 'REMOVED'
    ORDER BY ad_group.name
  `);
  return result.map((row: IGoogleAdsRow) => ({
    id: String(row.ad_group?.id ?? ""),
    name: String(row.ad_group?.name ?? ""),
    status: String(row.ad_group?.status ?? ""),
    resourceName: String(row.ad_group?.resource_name ?? ""),
  }));
}

export async function renameAdGroup(adGroupResourceName: string, newName: string): Promise<void> {
  const customer = getCustomer();
  await customer.adGroups.update([{ resource_name: adGroupResourceName, name: newName }]);
}

export async function deleteAdGroup(adGroupResourceName: string): Promise<void> {
  const customer = getCustomer();
  await customer.adGroups.remove([adGroupResourceName]);
}

export async function deleteCampaign(campaignId: string): Promise<void> {
  const customer = getCustomer();
  const resourceName = `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`;
  await customer.campaigns.remove([resourceName]);
}

export async function updateCampaignBudget(campaignId: string, dailyBudgetTL: number): Promise<void> {
  const customer = getCustomer();
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  // Önce mevcut budget resource'unu bul
  const result = await customer.query(`
    SELECT campaign.campaign_budget FROM campaign
    WHERE campaign.id = '${campaignId}'
  `);
  const budgetResource = String((result[0] as IGoogleAdsRow)?.campaign?.campaign_budget ?? "");
  if (!budgetResource) throw new Error("Budget resource bulunamadı");
  await customer.campaignBudgets.update([{
    resource_name: budgetResource,
    amount_micros: Math.round(dailyBudgetTL * 1_000_000),
  }]);
  console.log("[google-ads] Budget updated:", budgetResource, "→", dailyBudgetTL, "TL");
  void cid;
}

export async function addAdGroupsToCampaign(
  campaignId: string,
  adGroups: AdGroupInput[],
): Promise<{ name: string; adGroupResource: string; adResource: string; keywordResources: string[] }[]> {
  const customer = getCustomer();
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
  const MATCH: Record<string, number> = { BROAD: 4, PHRASE: 3, EXACT: 2 };
  const results: { name: string; adGroupResource: string; adResource: string; keywordResources: string[] }[] = [];

  for (const ag of adGroups) {
    const cpcBidMicros = ag.cpcBidMicros ?? 2_000_000;

    let adGroupResource: string;
    try {
      const agRes = await customer.adGroups.create([{
        name: ag.name,
        campaign: campaignResource,
        status: 2,
        type: 2,
        cpc_bid_micros: cpcBidMicros,
      }]);
      adGroupResource = (agRes as unknown as { results: { resource_name: string }[] }).results[0].resource_name;
      console.log("[google-ads] AdGroup OK:", ag.name);
    } catch (e) {
      console.error("[google-ads] AdGroup FAIL:", ag.name, e);
      throw e;
    }

    // RSA oluşturma REST ile yapılıyor — protobuf Türkçe karakterleri bozuyor
    let adResource: string;
    try {
      const adRestRes = await adsRestPost("mutate", {
        mutateOperations: [{
          adGroupAdOperation: {
            create: {
              adGroup: adGroupResource,
              status: "ENABLED",
              ad: {
                finalUrls: [ag.targetUrl],
                responsiveSearchAd: {
                  headlines: ag.headlines.slice(0, 15).map((text) => ({ text })),
                  descriptions: ag.descriptions.slice(0, 4).map((text) => ({ text })),
                },
              },
            },
          },
        }],
      }) as { mutateOperationResponses: { adGroupAdResult: { resourceName: string } }[] };
      adResource = adRestRes.mutateOperationResponses[0].adGroupAdResult.resourceName;
      console.log("[google-ads] Ad OK (REST):", ag.name);
    } catch (e) {
      console.error("[google-ads] Ad FAIL:", ag.name, e);
      throw e;
    }

    const keywordResources: string[] = [];
    for (const kw of ag.keywords) {
      try {
        const kwRes = await customer.adGroupCriteria.create([{
          ad_group: adGroupResource,
          status: 2,
          keyword: { text: kw.text, match_type: MATCH[kw.matchType] ?? 4 },
        }]);
        const resource = (kwRes as unknown as { results: { resource_name: string }[] }).results[0]?.resource_name;
        if (resource) keywordResources.push(resource);
      } catch (e) {
        const err = e as Record<string, unknown>;
        const errs = (err?.errors as unknown[]) ?? [];
        console.warn("[google-ads] Keyword SKIPPED:", kw.text, JSON.stringify(errs.map((x) => {
          const ex = x as Record<string, unknown>;
          return { message: ex.message };
        })));
      }
    }
    console.log("[google-ads] Keywords done for", ag.name, "—", keywordResources.length, "of", ag.keywords.length);
    results.push({ name: ag.name, adGroupResource, adResource, keywordResources });
  }

  return results;
}

export interface AdGroupAdSummary {
  adGroupId: string;
  adGroupName: string;
  adId: string;
  adGroupResource: string;
  status: number;          // 2=ENABLED 3=PAUSED
  finalUrls: string[];
  headlines: { text: string }[];
  descriptions: { text: string }[];
}

export async function listAdGroupAds(campaignId: string): Promise<AdGroupAdSummary[]> {
  const customer = getCustomer();
  const result = await customer.query(`
    SELECT
      ad_group.id, ad_group.name, ad_group.resource_name,
      ad_group_ad.ad.id, ad_group_ad.ad.final_urls,
      ad_group_ad.ad.responsive_search_ad.headlines,
      ad_group_ad.ad.responsive_search_ad.descriptions,
      ad_group_ad.status
    FROM ad_group_ad
    WHERE campaign.id = '${campaignId}'
      AND ad_group_ad.status != 'REMOVED'
      AND ad_group.status != 'REMOVED'
    ORDER BY ad_group.name
  `);
  return result.map((row: IGoogleAdsRow) => ({
    adGroupId: String(row.ad_group?.id ?? ""),
    adGroupName: String(row.ad_group?.name ?? ""),
    adId: String((row as unknown as { ad_group_ad: { ad: { id: unknown } } }).ad_group_ad?.ad?.id ?? ""),
    adGroupResource: String(row.ad_group?.resource_name ?? ""),
    status: Number((row as unknown as { ad_group_ad: { status: number } }).ad_group_ad?.status ?? 0),
    finalUrls: ((row as unknown as { ad_group_ad: { ad: { final_urls: string[] } } }).ad_group_ad?.ad?.final_urls ?? []) as string[],
    headlines: ((row as unknown as { ad_group_ad: { ad: { responsive_search_ad: { headlines: { text: string }[] } } } }).ad_group_ad?.ad?.responsive_search_ad?.headlines ?? []).map((h: { text: string }) => ({ text: h.text ?? "" })),
    descriptions: ((row as unknown as { ad_group_ad: { ad: { responsive_search_ad: { descriptions: { text: string }[] } } } }).ad_group_ad?.ad?.responsive_search_ad?.descriptions ?? []).map((d: { text: string }) => ({ text: d.text ?? "" })),
  }));
}

export interface SitelinkInput {
  linkText: string;      // max 25 karakter
  description1: string;  // max 35 karakter
  description2: string;  // max 35 karakter
  finalUrl: string;
}

export async function addSitelinks(
  campaignId: string,
  sitelinks: SitelinkInput[],
): Promise<{ linkText: string; assetResource: string; campaignAssetResource: string }[]> {
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
  const results: { linkText: string; assetResource: string; campaignAssetResource: string }[] = [];

  for (const sl of sitelinks) {
    // Adım A — Sitelink asset oluştur
    const assetRes = await adsRestPost("mutate", {
      mutateOperations: [{
        assetOperation: {
          create: {
            finalUrls: [sl.finalUrl],
            sitelinkAsset: {
              link_text: sl.linkText,
              description1: sl.description1,
              description2: sl.description2,
            },
          },
        },
      }],
    }) as { mutateOperationResponses: { assetResult: { resourceName: string } }[] };
    const assetResource = assetRes.mutateOperationResponses[0].assetResult.resourceName;

    // Adım B — Campaign'a bağla
    const campaignAssetRes = await adsRestPost("mutate", {
      mutateOperations: [{
        campaignAssetOperation: {
          create: {
            campaign: campaignResource,
            asset: assetResource,
            fieldType: "SITELINK",
          },
        },
      }],
    }) as { mutateOperationResponses: { campaignAssetResult: { resourceName: string } }[] };
    const campaignAssetResource = campaignAssetRes.mutateOperationResponses[0].campaignAssetResult.resourceName;

    console.log("[google-ads] Sitelink OK:", sl.linkText, "→", assetResource);
    results.push({ linkText: sl.linkText, assetResource, campaignAssetResource });
  }

  return results;
}

// Callout asset ekle (≤25 karakter her biri). REST mutate (UTF-8, Türkçe güvenli).
export async function addCallouts(campaignId: string, callouts: string[]): Promise<number> {
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
  let added = 0;
  for (const text of callouts) {
    const assetRes = await adsRestPost("mutate", {
      mutateOperations: [{
        assetOperation: { create: { calloutAsset: { calloutText: text } } },
      }],
    }) as { mutateOperationResponses: { assetResult: { resourceName: string } }[] };
    const assetResource = assetRes.mutateOperationResponses[0].assetResult.resourceName;
    await adsRestPost("mutate", {
      mutateOperations: [{
        campaignAssetOperation: { create: { campaign: campaignResource, asset: assetResource, fieldType: "CALLOUT" } },
      }],
    });
    added++;
  }
  return added;
}

// Structured snippet asset ekle. header örn. "Hizmetler"/"Services", values ≤25 char.
export async function addStructuredSnippet(campaignId: string, header: string, values: string[]): Promise<string> {
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
  const assetRes = await adsRestPost("mutate", {
    mutateOperations: [{
      assetOperation: { create: { structuredSnippetAsset: { header, values } } },
    }],
  }) as { mutateOperationResponses: { assetResult: { resourceName: string } }[] };
  const assetResource = assetRes.mutateOperationResponses[0].assetResult.resourceName;
  await adsRestPost("mutate", {
    mutateOperations: [{
      campaignAssetOperation: { create: { campaign: campaignResource, asset: assetResource, fieldType: "STRUCTURED_SNIPPET" } },
    }],
  });
  return assetResource;
}

// Mevcut ENABLED SITELINK assetlerini campaign_asset bağıyla listele
export async function listSitelinks(campaignId: string): Promise<
  { linkText: string; description1: string; description2: string; finalUrls: string[]; campaignAssetResource: string }[]
> {
  const customer = getCustomer();
  const rows = await customer.query(`
    SELECT campaign.id, campaign_asset.resource_name,
      asset.sitelink_asset.link_text, asset.sitelink_asset.description1,
      asset.sitelink_asset.description2, asset.final_urls
    FROM campaign_asset
    WHERE campaign.id='${campaignId}'
      AND campaign_asset.field_type='SITELINK'
      AND campaign_asset.status='ENABLED'
  `) as unknown as Array<{
    campaign_asset: { resource_name: string };
    asset: { sitelink_asset: { link_text: string; description1: string; description2: string }; final_urls: string[] };
  }>;
  return rows.map((r) => ({
    linkText: r.asset?.sitelink_asset?.link_text ?? "",
    description1: r.asset?.sitelink_asset?.description1 ?? "",
    description2: r.asset?.sitelink_asset?.description2 ?? "",
    finalUrls: r.asset?.final_urls ?? [],
    campaignAssetResource: r.campaign_asset?.resource_name ?? "",
  }));
}

// ── RSA Türkçe karakter düzeltme + satış-niyeti güçlendirme ───────────────
// Protobuf-dönemi reklamlarda Türkçe karakter kaybolmuş ("Ucretsiz", "Surec").
// RSA metni değişmez → eski reklamı duraklat + düzeltilmiş yenisini oluştur.

// Kelime/ibare bazlı düzeltme tablosu. Büyük/küçük harf duyarlı, en uzun eşleşme önce.
const TR_FIX: Array<[RegExp, string]> = [
  [/Ucretsiz/g, "Ücretsiz"], [/ucretsiz/g, "ücretsiz"],
  [/Surecleri/g, "Süreçleri"], [/surecleri/g, "süreçleri"],
  [/Surec/g, "Süreç"], [/surec/g, "süreç"], [/sureclerinizi/g, "süreçlerinizi"], [/sureclerini/g, "süreçlerini"],
  [/Gelistirme/g, "Geliştirme"], [/gelistirme/g, "geliştirme"], [/Gelistir/g, "Geliştir"],
  [/Canliya/g, "Canlıya"], [/canliya/g, "canlıya"],
  [/Aclamasi/g, "Açıklaması"], [/Aciklamasi/g, "Açıklaması"], [/aciklamalari/g, "açıklamaları"], [/Aciklama/g, "Açıklama"],
  [/Taahhutuz/g, "Taahhütsüz"], [/Taahhutsuz/g, "Taahhütsüz"], [/taahhutsuz/g, "taahhütsüz"],
  [/Tasarrufu/g, "Tasarrufu"], [/Tasarruf/g, "Tasarruf"], // tasarruf zaten karaktersiz doğru
  [/Yonetim/g, "Yönetim"], [/yonetim/g, "yönetim"], [/Yonetin/g, "Yönetin"], [/yonetin/g, "yönetin"],
  [/Musteri/g, "Müşteri"], [/musteri/g, "müşteri"],
  [/Cozelim/g, "Çözelim"], [/cozun/g, "çözün"], [/Cozum/g, "Çözüm"], [/cozum/g, "çözüm"], [/Cozumleri/g, "Çözümleri"],
  [/Yavas/g, "Yavaş"], [/yavas/g, "yavaş"], [/Yavasladir/g, "Yavaşladı"], [/yavasladi/g, "yavaşladı"],
  [/Bakimi/g, "Bakımı"], [/bakimi/g, "bakımı"],
  [/Guncelleme/g, "Güncelleme"], [/guncelleme/g, "güncelleme"], [/Guncelle/g, "Güncelle"],
  [/Baglantisi/g, "Bağlantısı"], [/baglantisi/g, "bağlantısı"], [/Baglanti/g, "Bağlantı"],
  [/Siparis/g, "Sipariş"], [/siparis/g, "sipariş"],
  [/Coklu/g, "Çoklu"], [/coklu/g, "çoklu"],
  [/gercek/g, "gerçek"], [/Gercek/g, "Gerçek"], [/gerceklestir/g, "gerçekleştir"],
  [/Yazilim/g, "Yazılım"], [/yazilim/g, "yazılım"], [/Yazilimi/g, "Yazılımı"],
  [/Ozel/g, "Özel"], [/ozel/g, "özel"], [/Ozellestir/g, "Özelleştir"],
  [/Sablonsuz/g, "Şablonsuz"], [/Sablon/g, "Şablon"], [/sablon/g, "şablon"],
  [/Hizli/g, "Hızlı"], [/hizli/g, "hızlı"], [/Hiz\b/g, "Hız"], [/hizla/g, "hızla"], [/Hizla/g, "Hızla"],
  [/Fiyati\b/g, "Fiyatı"], [/Fiyatlari/g, "Fiyatları"], [/fiyatlari/g, "fiyatları"],
  [/Garantisi/g, "Garantisi"], // garanti doğru
  [/Is Gun/g, "İş Gün"], [/is gun/g, "iş gün"], [/Is Surec/g, "İş Süreç"], [/is surec/g, "iş süreç"],
  [/Istanbul/g, "İstanbul"], [/istanbul/g, "İstanbul"],
  [/Iste\b/g, "İste"], [/Edin\b/g, "Edin"],
  [/Entegrasyon/g, "Entegrasyon"], // doğru
  [/Uzmani/g, "Uzmanı"], [/uzmani/g, "uzmanı"],
  [/Turkiye/g, "Türkiye"], [/turkiye/g, "Türkiye"],
  [/Uretimi/g, "Üretimi"], [/uretimi/g, "üretimi"], [/Uretim/g, "Üretim"], [/uretim/g, "üretim"],
  [/Uygulama/g, "Uygulama"], // doğru
  [/Icerik/g, "İçerik"], [/icerik/g, "içerik"],
  [/Yuzde89/g, "%89"], [/Yuzde/g, "%"],
  [/danismanlik/g, "danışmanlık"], [/Danismanlik/g, "Danışmanlık"], [/Danismanligi/g, "Danışmanlığı"],
  [/baslamadan/g, "başlamadan"], [/baslayin/g, "başlayın"],
  [/yanit/g, "yanıt"], [/Yanit/g, "Yanıt"],
  [/Kurun\b/g, "Kurun"],
  [/otomatize/g, "otomatize"], // doğru
  // ── ikinci tur: kalan spesifik kelimeler ──
  [/Canliya Alin/g, "Canlıya Alın"], [/\bAlin\b/g, "Alın"],
  [/\bUrun\b/g, "Ürün"], [/\burun\b/g, "ürün"], [/Urunlerinizi/g, "Ürünlerinizi"],
  [/\bIs Surec/g, "İş Süreç"], [/\bIs Gun/g, "İş Gün"], [/\bIs \b/g, "İş "],
  [/Yazilimi Yaptirin/g, "Yazılımı Yaptırın"], [/Yaptirin/g, "Yaptırın"], [/Yaptir\b/g, "Yaptır"],
  [/Firmasi/g, "Firması"], [/firmasi/g, "firması"],
  [/Tasarim/g, "Tasarım"], [/tasarim/g, "tasarım"],
  [/Yavasladir/g, "Yavaşladı"], [/Yavaslamis/g, "Yavaşlamış"],
  [/Gununde/g, "Gününde"], [/gununde/g, "gününde"], [/Gunu\b/g, "Günü"], [/\bGun\b/g, "Gün"], [/Gunde\b/g, "Günde"],
  [/Deglendirmesi/g, "Değerlendirmesi"], [/Degerlendirme/g, "Değerlendirme"],
  [/Yazilimi\b/g, "Yazılımı"],
  [/Senkronizasyonu/g, "Senkronizasyonu"], // doğru
  // ── üçüncü tur: küçük harf / cümle içi kalanlar ──
  [/\bis sürec/g, "iş süreç"], [/\bis gün/g, "iş gün"], [/\bis \b/g, "iş "],
  [/zamanli/g, "zamanlı"], [/Zamanli/g, "Zamanlı"],
  [/\balin\b/g, "alın"], [/\balın\b/g, "alın"],
  [/g[üu]nunde/g, "gününde"], [/\bgunu\b/g, "günü"], [/\bgun\b/g, "gün"],
];

export function fixTurkish(text: string): string {
  let out = text;
  for (const [re, rep] of TR_FIX) out = out.replace(re, rep);
  return out;
}

export interface RsaAdSnapshot {
  adGroupResource: string;
  adResourceName: string;   // customers/x/adGroupAds/agId~adId
  finalUrls: string[];
  headlines: string[];
  descriptions: string[];
}

// Satış-niyeti güçlendirici aday başlıklar (≤30 char). Sadece yer varsa + zaten yoksa eklenir.
const SALES_HEADLINES = ["Sabit Fiyatlı Net Teklif", "Net Fiyat, Gizli Maliyet Yok", "İlk Görüşme Ücretsiz"];

// Bir RSA'yı düzeltir: Türkçe karakter + (yer varsa) satış başlığı. Değişiklik yoksa null döner.
export function buildFixedRsa(ad: RsaAdSnapshot): { headlines: string[]; descriptions: string[] } | null {
  const fixedH = ad.headlines.map(fixTurkish);
  const fixedD = ad.descriptions.map(fixTurkish);
  const changed =
    fixedH.some((h, i) => h !== ad.headlines[i]) || fixedD.some((d, i) => d !== ad.descriptions[i]);

  // Satış başlıklarını ekle (15 limiti + duplicate kontrolü)
  const hset = new Set(fixedH.map((h) => h.toLocaleLowerCase("tr")));
  let addedSales = false;
  for (const sh of SALES_HEADLINES) {
    if (fixedH.length >= 15) break;
    if ([...sh].length > 30) continue;
    if (hset.has(sh.toLocaleLowerCase("tr"))) continue;
    fixedH.push(sh);
    hset.add(sh.toLocaleLowerCase("tr"));
    addedSales = true;
  }
  if (!changed && !addedSales) return null;
  // limit guard
  const okH = fixedH.filter((h) => [...h].length <= 30).slice(0, 15);
  const okD = fixedD.filter((d) => [...d].length <= 90).slice(0, 4);
  return { headlines: okH, descriptions: okD };
}

// Eskisini duraklat + düzeltilmiş yenisini oluştur — TEK atomik mutate.
// Önce pause sonra create aynı işlemde olduğundan "ENABLED RSA per ad group"
// limiti aşılmaz (3 limiti). REST mutate (UTF-8).
export async function recreateRsa(ad: RsaAdSnapshot, fixed: { headlines: string[]; descriptions: string[] }): Promise<string> {
  const res = await adsRestPost("mutate", {
    mutateOperations: [
      {
        adGroupAdOperation: {
          update: { resourceName: ad.adResourceName, status: "PAUSED" },
          updateMask: "status",
        },
      },
      {
        adGroupAdOperation: {
          create: {
            adGroup: ad.adGroupResource,
            status: "ENABLED",
            ad: {
              finalUrls: ad.finalUrls,
              responsiveSearchAd: {
                headlines: fixed.headlines.map((text) => ({ text })),
                descriptions: fixed.descriptions.map((text) => ({ text })),
              },
            },
          },
        },
      },
    ],
  }) as { mutateOperationResponses: Array<{ adGroupAdResult?: { resourceName: string } }> };
  // create işlemi ikinci sırada → son adGroupAdResult yeni reklamdır.
  const results = res.mutateOperationResponses.filter((r) => r.adGroupAdResult);
  return results[results.length - 1]?.adGroupAdResult?.resourceName ?? "";
}

// Campaign_asset bağ(lar)ını kaldır (asset silinmez; yalnızca kampanyadan ayrılır).
// REST mutate (UTF-8) — protobuf Türkçe karakter sorununu by-pass eder.
export async function removeCampaignAssets(campaignAssetResources: string[]): Promise<number> {
  if (!campaignAssetResources.length) return 0;
  await adsRestPost("mutate", {
    mutateOperations: campaignAssetResources.map((rn) => ({
      campaignAssetOperation: { remove: rn },
    })),
  });
  return campaignAssetResources.length;
}

// Language constant ID'leri: İngilizce=1000, Türkçe=1037, Rusça=1031, Sırpça=1035
export async function addLanguageTargets(campaignId: string, languageIds: number[]): Promise<void> {
  const customer = getCustomer();
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  const campaignResource = `customers/${cid}/campaigns/${campaignId}`;
  for (const langId of languageIds) {
    try {
      await customer.campaignCriteria.create([{
        campaign: campaignResource,
        language: { language_constant: `languageConstants/${langId}` },
      }]);
      console.log("[google-ads] Language target OK:", langId);
    } catch (e) {
      console.warn("[google-ads] Language target SKIPPED:", langId, e);
    }
  }
}

// Device types: MOBILE, DESKTOP, TABLET
// bidModifier: 0.1–4.0 (0.3 = -70%, 0.5 = -50%, 1.0 = unchanged, 1.5 = +50%)
export async function setDeviceBidModifier(campaignId: string, deviceType: "MOBILE" | "DESKTOP" | "TABLET", bidModifier: number): Promise<void> {
  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!;
  await adsRestPost("mutate", {
    mutateOperations: [{
      campaignCriterionOperation: {
        create: {
          campaign: `customers/${cid}/campaigns/${campaignId}`,
          device: { type: deviceType },
          bidModifier,
        },
      },
    }],
  });
  console.log("[google-ads] Device bid modifier set:", deviceType, bidModifier, "for campaign", campaignId);
}

// Konum hedefleme tipi: "PRESENCE" (yalnızca fiziksel olarak konumda olanlar) veya
// "PRESENCE_OR_INTEREST" (konuma ilgi duyanlar da). Düşük bütçede PRESENCE, parayı gerçek
// yerel alıcılara yoğunlaştırıp "interest" kaynaklı global trafik israfını keser.
export async function setGeoTargetType(
  campaignId: string,
  positiveType: "PRESENCE" | "PRESENCE_OR_INTEREST" = "PRESENCE"
): Promise<void> {
  const customer = getCustomer();
  // PositiveGeoTargetType enum: PRESENCE_OR_INTEREST=5, PRESENCE=7
  const value = positiveType === "PRESENCE" ? 7 : 5;
  await customer.campaigns.update([{
    resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`,
    geo_target_type_setting: { positive_geo_target_type: value as unknown as number },
  }]);
  console.log("[google-ads] Geo target type set:", positiveType, "for campaign", campaignId);
}

/**
 * Kampanyayı Maximize Clicks (target_spend) teklif stratejisine geçirir.
 * Soğuk başlangıçta (0 dönüşüm geçmişi) Maximize Conversions yayınlanmaz —
 * Max Clicks veri toplayana kadar yayınlanmayı garanti eder.
 * cpcCeilingTL: opsiyonel CPC tavanı (bütçe sızıntısını sınırlar).
 */
export async function setMaximizeClicks(campaignId: string, cpcCeilingTL?: number): Promise<void> {
  const customer = getCustomer();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const targetSpend: any = {};
  if (cpcCeilingTL && cpcCeilingTL > 0) {
    targetSpend.cpc_bid_ceiling_micros = Math.round(cpcCeilingTL * 1_000_000);
  }
  await customer.campaigns.update([{
    resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`,
    // Diğer otomatik strateji alanlarını null'lar, target_spend'i set eder
    target_spend: targetSpend,
  }]);
  console.log("[google-ads] Maximize Clicks set for campaign", campaignId, "ceiling:", cpcCeilingTL ?? "yok");
}

/**
 * Kampanyayı Manual CPC teklif stratejisine geçirir.
 * 0 dönüşüm geçmişiyle akıllı teklif düşük kalıyor → manuel CPC ile
 * teklif kontrolü alınır, keyword'lere setKeywordBids ile bid set edilir.
 */
export async function setManualCpc(campaignId: string): Promise<void> {
  const customer = getCustomer();
  await customer.campaigns.update([{
    resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`,
    // Subfield ile set et — boş {} field mask'i 'manual_cpc' (subfield'lı) yapıp
    // FIELD_HAS_SUBFIELDS hatası verir. enhanced_cpc_enabled ile mask subfield'a iner.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    manual_cpc: { enhanced_cpc_enabled: false } as any,
  }]);
  console.log("[google-ads] Manual CPC set for campaign", campaignId);
}

/**
 * Verilen kampanyadaki TÜM ENABLED keyword'lere aynı CPC teklifini (TL) set eder.
 * Manual CPC stratejisi aktifken çalışır. Döndürdüğü sayı güncellenen keyword adedi.
 */
export async function setAllKeywordBids(campaignId: string, cpcTL: number): Promise<number> {
  const customer = getCustomer();
  const micros = Math.round(cpcTL * 1_000_000);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[] = await customer.query(`
    SELECT ad_group_criterion.resource_name
    FROM ad_group_criterion
    WHERE campaign.id = ${campaignId}
      AND ad_group_criterion.type = KEYWORD
      AND ad_group_criterion.status = ENABLED
      AND ad_group_criterion.negative = FALSE
      AND ad_group.status != 'REMOVED'
      AND campaign.status != 'REMOVED'
  `);
  const updates = rows.map((r) => ({
    resource_name: r.ad_group_criterion.resource_name,
    cpc_bid_micros: micros,
  }));
  if (!updates.length) return 0;
  // Batch'ler halinde (API limiti ~5000/mutate ama güvenli 1000'lik dilimler)
  let done = 0;
  for (let i = 0; i < updates.length; i += 1000) {
    const chunk = updates.slice(i, i + 1000);
    await customer.adGroupCriteria.update(chunk);
    done += chunk.length;
  }
  console.log("[google-ads] Set CPC", cpcTL, "TL on", done, "keywords (campaign", campaignId + ")");
  return done;
}

export async function updateCampaignStatus(campaignId: string, status: "ENABLED" | "PAUSED"): Promise<void> {
  const customer = getCustomer();
  await customer.campaigns.update([{
    resource_name: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID}/campaigns/${campaignId}`,
    status: status as unknown as number,
  }]);
}

export async function createFullCampaign(input: FullCampaignInput): Promise<{
  budgetResource: string;
  campaignResource: string;
  adGroups: { name: string; adGroupResource: string; adResource: string; keywordResources: string[] }[];
}> {
  const customer = getCustomer();
  const MATCH: Record<string, number> = { BROAD: 4, PHRASE: 3, EXACT: 2 };

  // geriye uyumluluk: adGroups yoksa tekli alanlardan oluştur
  const adGroups: AdGroupInput[] = input.adGroups?.length
    ? input.adGroups
    : [{
        name: `${input.campaignName} - Ad Group 1`,
        targetUrl: input.targetUrl!,
        headlines: input.headlines!,
        descriptions: input.descriptions!,
        keywords: input.keywords!,
      }];

  // 1. Bütçe
  let budgetResource: string;
  try {
    const budgetRes = await customer.campaignBudgets.create([{
      name: `${input.campaignName} - Bütçe ${Date.now()}`,
      amount_micros: Math.round(input.dailyBudgetTL * 1_000_000),
      delivery_method: 2, // STANDARD
    }]);
    budgetResource = (budgetRes as unknown as { results: { resource_name: string }[] }).results[0].resource_name;
    console.log("[google-ads] Step 1 OK — budget:", budgetResource);
  } catch (e) {
    console.error("[google-ads] Step 1 FAIL — budget:", e);
    throw e;
  }

  // 2. Kampanya (PAUSED — güvenli başlangıç)
  let campaignResource: string;
  try {
    const campaignPayload = {
      name: input.campaignName,
      status: "PAUSED",
      advertising_channel_type: "SEARCH",
      campaign_budget: budgetResource,
      manual_cpc: {},
      contains_eu_political_advertising: 3, // DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING
      network_settings: {
        target_google_search: true,
        target_search_network: true,
        target_content_network: false,
      },
      // start_date ve end_date alanları REST API v23'te desteklenmiyor — kampanya hemen başlar
    };
    const campaignRestRes = await adsRestPost("mutate", {
      mutateOperations: [{ campaignOperation: { create: campaignPayload } }],
    }) as { mutateOperationResponses: { campaignResult: { resourceName: string } }[] };
    campaignResource = campaignRestRes.mutateOperationResponses[0].campaignResult.resourceName;
    console.log("[google-ads] Step 2 OK — campaign:", campaignResource);
  } catch (e) {
    console.error("[google-ads] Step 2 FAIL — campaign:", e);
    throw e;
  }

  // 3. Coğrafi hedefleme
  if (input.geoTargetConstantIds?.length) {
    for (const geoId of input.geoTargetConstantIds) {
      try {
        await customer.campaignCriteria.create([{
          campaign: campaignResource,
          location: { geo_target_constant: `geoTargetConstants/${geoId}` },
        }]);
        console.log("[google-ads] Geo target OK:", geoId);
      } catch (e) {
        console.warn("[google-ads] Geo target SKIPPED:", geoId, e);
      }
    }
  }

  // 4. Kampanya düzeyinde negatif keyword'ler
  if (input.negativeKeywords?.length) {
    for (const text of input.negativeKeywords) {
      try {
        await customer.campaignCriteria.create([{
          campaign: campaignResource,
          negative: true,
          keyword: { text, match_type: 4 }, // BROAD negatif
        }]);
        console.log("[google-ads] Negative keyword OK:", text);
      } catch (e) {
        console.warn("[google-ads] Negative keyword SKIPPED:", text, e);
      }
    }
  }

  // 4. Her ad group için: adGroup + RSA + keyword'ler
  const adGroupResults: { name: string; adGroupResource: string; adResource: string; keywordResources: string[] }[] = [];

  for (const ag of adGroups) {
    const cpcBidMicros = ag.cpcBidMicros ?? 2_000_000;

    // 4a. Ad Group
    let adGroupResource: string;
    try {
      const adGroupRes = await customer.adGroups.create([{
        name: ag.name,
        campaign: campaignResource,
        status: 2, // ENABLED
        type: 2,   // SEARCH_STANDARD
        cpc_bid_micros: cpcBidMicros,
      }]);
      adGroupResource = (adGroupRes as unknown as { results: { resource_name: string }[] }).results[0].resource_name;
      console.log("[google-ads] AdGroup OK:", ag.name);
    } catch (e) {
      console.error("[google-ads] AdGroup FAIL:", ag.name, e);
      throw e;
    }

    // 4b. Responsive Search Ad — REST ile (protobuf Türkçe karakterleri bozuyor)
    let adResource: string;
    try {
      const adRestRes = await adsRestPost("mutate", {
        mutateOperations: [{
          adGroupAdOperation: {
            create: {
              adGroup: adGroupResource,
              status: "ENABLED",
              ad: {
                finalUrls: [ag.targetUrl],
                responsiveSearchAd: {
                  headlines: ag.headlines.slice(0, 15).map((text) => ({ text })),
                  descriptions: ag.descriptions.slice(0, 4).map((text) => ({ text })),
                },
              },
            },
          },
        }],
      }) as { mutateOperationResponses: { adGroupAdResult: { resourceName: string } }[] };
      adResource = adRestRes.mutateOperationResponses[0].adGroupAdResult.resourceName;
      console.log("[google-ads] Ad OK (REST):", ag.name);
    } catch (e) {
      console.error("[google-ads] Ad FAIL:", ag.name, e);
      throw e;
    }

    // 4c. Keyword'ler — tek tek, policy ihlali olanları atla
    const keywordResources: string[] = [];
    for (const kw of ag.keywords) {
      try {
        const kwRes = await customer.adGroupCriteria.create([{
          ad_group: adGroupResource,
          status: 2, // ENABLED
          keyword: { text: kw.text, match_type: MATCH[kw.matchType] ?? 4 },
        }]);
        const resource = (kwRes as unknown as { results: { resource_name: string }[] }).results[0]?.resource_name;
        if (resource) {
          keywordResources.push(resource);
          console.log("[google-ads] Keyword OK:", kw.text);
        }
      } catch (e) {
        const err = e as Record<string, unknown>;
        const errs = (err?.errors as unknown[]) ?? [];
        console.warn("[google-ads] Keyword SKIPPED:", kw.text, JSON.stringify(errs.map((x) => {
          const ex = x as Record<string, unknown>;
          return { message: ex.message, trigger: JSON.stringify(ex.trigger) };
        })));
      }
    }
    console.log("[google-ads] Keywords done for", ag.name, "—", keywordResources.length, "of", ag.keywords.length);

    adGroupResults.push({ name: ag.name, adGroupResource, adResource, keywordResources });
  }

  return { budgetResource, campaignResource, adGroups: adGroupResults };
}

export type DatePeriod = "TODAY" | "YESTERDAY" | "LAST_7_DAYS" | "LAST_30_DAYS";

export interface CampaignMetrics {
  id: string;
  name: string;
  status: string;
  budgetTL: number;
  clicks: number;
  impressions: number;
  ctr: number;
  avgCpcTL: number;
  costTL: number;
  conversions: number;
  costPerConversionTL: number;
  searchImpressionShare: number;
}

export async function getCampaignMetrics(period: DatePeriod = "LAST_7_DAYS"): Promise<CampaignMetrics[]> {
  const customer = getCustomer();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[] = await customer.query(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign_budget.amount_micros,
      metrics.clicks,
      metrics.impressions,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.cost_per_conversion,
      metrics.search_impression_share
    FROM campaign
    WHERE segments.date DURING ${period}
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
  `);

  return rows.map((row) => ({
    id: String(row.campaign?.id ?? ""),
    name: String(row.campaign?.name ?? ""),
    status: String(row.campaign?.status ?? ""),
    budgetTL: Number(row.campaign_budget?.amount_micros ?? 0) / 1_000_000,
    clicks: Number(row.metrics?.clicks ?? 0),
    impressions: Number(row.metrics?.impressions ?? 0),
    ctr: Number(row.metrics?.ctr ?? 0),
    avgCpcTL: Number(row.metrics?.average_cpc ?? 0) / 1_000_000,
    costTL: Number(row.metrics?.cost_micros ?? 0) / 1_000_000,
    conversions: Number(row.metrics?.conversions ?? 0),
    costPerConversionTL: Number(row.metrics?.cost_per_conversion ?? 0) / 1_000_000,
    searchImpressionShare: Number(row.metrics?.search_impression_share ?? 0),
  }));
}

export interface KeywordIdea {
  keyword: string;
  avgMonthlySearches: number;
  competition: string;
  lowTopBidTL: number;
  highTopBidTL: number;
}

/**
 * KeywordPlanIdeaService ile bir geo+dil için arama hacmi olan kelime fikirleri.
 * geoTargetConstantId örn 2807 (Kuzey Makedonya), languageId örn 1000 (EN).
 */
export async function generateKeywordIdeas(opts: {
  seeds: string[];
  geoTargetConstantId: number;
  languageId: number;
}): Promise<KeywordIdea[]> {
  const customer = getCustomer();
  const compMap: Record<string | number, string> = {
    0: "UNSPECIFIED", 1: "UNKNOWN", 2: "LOW", 3: "MEDIUM", 4: "HIGH",
    UNSPECIFIED: "UNSPECIFIED", UNKNOWN: "UNKNOWN", LOW: "LOW", MEDIUM: "MEDIUM", HIGH: "HIGH",
  };

  const request = {
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    language: `languageConstants/${opts.languageId}`,
    geo_target_constants: [`geoTargetConstants/${opts.geoTargetConstantId}`],
    keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
    include_adult_keywords: false,
    keyword_seed: { keywords: opts.seeds },
  } as unknown as services.GenerateKeywordIdeasRequest;
  const resp = await customer.keywordPlanIdeas.generateKeywordIdeas(request);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results: any[] = (resp as any)?.results ?? (resp as any) ?? [];
  return results.map((r) => {
    const m = r.keyword_idea_metrics ?? {};
    return {
      keyword: String(r.text ?? ""),
      avgMonthlySearches: Number(m.avg_monthly_searches ?? 0),
      competition: compMap[m.competition] ?? String(m.competition ?? "?"),
      lowTopBidTL: Number(m.low_top_of_page_bid_micros ?? 0) / 1_000_000,
      highTopBidTL: Number(m.high_top_of_page_bid_micros ?? 0) / 1_000_000,
    };
  });
}
