// Hipotez testi: kullanıcı form mu, WhatsApp mı, hangi iletişimi seçiyor?
// "Anonim mi tercih ediyorlar" → WhatsApp (kimlik açık) vs form (e-posta) vs hiçbiri
import { google } from "googleapis";
import { readFileSync } from "node:fs";
const PROPERTY_ID = "properties/539436083";
const RANGE = [{ startDate: "2026-05-26", endDate: "2026-06-25" }]; // 30 gün — örneklemi büyüt
function loadEnv(){ if(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)return process.env.GOOGLE_SERVICE_ACCOUNT_JSON; const t=readFileSync(new URL("../.env.local",import.meta.url),"utf8"); for(const l of t.split(/\r?\n/)){const m=l.match(/^GOOGLE_SERVICE_ACCOUNT_JSON\s*=\s*(.*)$/); if(m){let v=m[1].trim(); if((v.startsWith("'")&&v.endsWith("'"))||(v.startsWith('"')&&v.endsWith('"')))v=v.slice(1,-1); return v;}} throw new Error("env yok"); }
const credentials=JSON.parse(loadEnv().replace(/^﻿/,""));
const auth=new google.auth.GoogleAuth({credentials,scopes:["https://www.googleapis.com/auth/analytics.readonly"]});
const ad=google.analyticsdata({version:"v1beta",auth});
const dim=(r,i)=>r?.dimensionValues?.[i]?.value??""; const met=(r,i)=>r?.metricValues?.[i]?.value??"0";
async function run(b){return (await ad.properties.runReport({property:PROPERTY_ID,requestBody:b})).data?.rows??[];}

async function main(){
  // 30 günde tüm iletişim sinyalleri
  const ev = await run({
    dateRanges: RANGE, dimensions:[{name:"eventName"}],
    metrics:[{name:"eventCount"},{name:"totalUsers"}],
    dimensionFilter:{filter:{fieldName:"eventName",inListFilter:{values:["form_view","form_start","form_submit","whatsapp_click","cta_click","generate_lead","qualify_lead","contact","phone_call","popup_show"]}}},
    orderBys:[{metric:{metricName:"eventCount"},desc:true}],
  });
  // Toplam oturum + engaged (taban)
  const base = await run({ dateRanges:RANGE, metrics:[{name:"sessions"},{name:"totalUsers"},{name:"engagedSessions"}] });
  const b=base[0];
  console.log(JSON.stringify({
    window:"30 gün (26 May–25 Haz)",
    base:{sessions:+met(b,0),users:+met(b,1),engagedSessions:+met(b,2)},
    contactSignals: ev.map(r=>({event:dim(r,0),count:+met(r,0),users:+met(r,1)})),
  },null,2));
}
main().catch(e=>{console.error("HATA:",e.message);process.exit(1)});
