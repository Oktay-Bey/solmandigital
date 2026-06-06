import { GoogleAdsApi } from "google-ads-api";

let _client: GoogleAdsApi | null = null;

function getClient(): GoogleAdsApi {
  if (!_client) {
    _client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    });
  }
  return _client;
}

export function getCustomer() {
  const opts: { customer_id: string; refresh_token: string; login_customer_id?: string } = {
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  };
  const loginId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
  if (loginId && loginId !== process.env.GOOGLE_ADS_CUSTOMER_ID) {
    opts.login_customer_id = loginId;
  }
  return getClient().Customer(opts);
}
