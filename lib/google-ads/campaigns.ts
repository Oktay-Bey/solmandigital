import { getCustomer } from "./client";
import { google } from "googleapis";
import type { services } from "google-ads-api";
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
      name: `${input.campaignName} - Bütçe`,
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
      advertisingChannelType: "SEARCH",
      campaignBudget: budgetResource,
      manualCpc: {},
      containsEuPoliticalAdvertising: 3, // DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING
      networkSettings: {
        targetGoogleSearch: true,
        targetSearchNetwork: true,
        targetContentNetwork: false,
      },
      ...(input.startDate ? { startDate: input.startDate } : {}),
      ...(input.endDate ? { endDate: input.endDate } : {}),
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
