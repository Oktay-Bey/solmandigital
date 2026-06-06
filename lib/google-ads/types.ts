export interface GoogleAdsTokens {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
}

export interface CampaignBudget {
  name: string;
  amountMicros: string; // TL * 1_000_000, örnek: 50 TL = "50000000"
  deliveryMethod?: "STANDARD" | "ACCELERATED";
}

export interface Campaign {
  name: string;
  status: "ENABLED" | "PAUSED" | "REMOVED";
  advertisingChannelType: "SEARCH" | "DISPLAY" | "SHOPPING" | "VIDEO" | "PERFORMANCE_MAX";
  campaignBudget: string; // resource name: customers/{id}/campaignBudgets/{id}
  networkSettings?: {
    targetGoogleSearch?: boolean;
    targetSearchNetwork?: boolean;
    targetContentNetwork?: boolean;
  };
  startDate?: string; // YYYYMMDD
  endDate?: string;
}

export interface AdGroup {
  name: string;
  campaign: string; // resource name
  status: "ENABLED" | "PAUSED" | "REMOVED";
  type: "SEARCH_STANDARD" | "DISPLAY_STANDARD";
  cpcBidMicros?: string;
}

export interface TextAd {
  adGroup: string; // resource name
  finalUrls: string[];
  headlines: { text: string }[]; // max 15, min 3
  descriptions: { text: string }[]; // max 4, min 2
}

export interface Keyword {
  adGroup: string; // resource name
  text: string;
  matchType: "BROAD" | "PHRASE" | "EXACT";
  status?: "ENABLED" | "PAUSED";
  cpcBidMicros?: string;
}

export interface GoogleAdsApiError {
  error: {
    code: number;
    message: string;
    status: string;
    details?: unknown[];
  };
}

export interface FullCampaignInput {
  campaignName: string;
  dailyBudgetTL: number;
  targetUrl: string;
  headlines: string[];
  descriptions: string[];
  keywords: { text: string; matchType: "BROAD" | "PHRASE" | "EXACT" }[];
  startDate?: string;
  endDate?: string;
}
