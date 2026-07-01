# WhatsApp/IVR Chatbot Lead

> Firma/kişi adı henüz alınmadı — netleşince dosyayı yeniden adlandır.

- **Durum:** teklif-gönderildi
- **İlk temas:** 23 Haz 2026
- **Kanal:** lead (gelen talep)
- **İletişim:** <netleşmedi>

## İhtiyaç
İki bileşenli sistem:
1. **Sesli yönlendirme (IVR)** — telefonla arandığında tuşlamalı (DTMF)
   kurumsal sesli menü. Müşterinin orijinal ifadesi "banka tarzı yönlendirme"
   ve "FCT sabit hat"; teklifte "tuşlamalı kurumsal sesli menü" olarak nötrlendi.
2. **Akıllı chatbot** — müşteri tercihine göre **tek kanal**: site canlı destek
   *veya* WhatsApp API. (İkisi birden değil.)

Mevcut durum: site tarafında **Tawk.to** kullanılıyor.

## Kapsam & Karar
- **Model:** yap-kur-çık (tek seferlik kurulum, uzun vadeli bakım YOK).
- **Fiyat:** 15.000₺ + KDV (tek seferlik kurulum bedeli).
- Aylık işleyen kalemler (işlem gücü, YZ kullanımı, telefon hattı, WhatsApp API)
  kurulum bedeline dahil değil; **doğrudan sağlayıcılar üzerinden, müşteri
  adına** kurulur. Teslimden sonra sistem müşterinin kontrolünde.
- Arka plan veri entegrasyonu (bakiye/sipariş/randevu) kapsam dışı → gerekirse
  ayrıca değerlendirilir.
- **Mimari kararı:** numara esnekse → TR VoIP sağlayıcı (Netgsm/Verimor/
  BulutSantral) + bulut IVR (DTMF), FCT/PBX donanımı YOK.
- **KVKK:** Seçenek 1 = bulut LLM (Claude) + kişisel veri maskeleme +
  kanal başında aydınlatma/rıza. TR cache YOK (yap-kur-çık olduğu için sürekli
  altyapı vaadi verilmedi). Aydınlatma/rıza metin içeriği müşterinin (veri
  sorumlusu) sorumluluğu; biz teknik akışı kuruyoruz.

## Açık Sorular
- FCT hattı dijital servis sağlayıcı mı, analog mı? Mevcut numara şart mı?
- IVR sonunda sistem mi cevaplıyor, yoksa temsilciye transfer mi?
- Chatbot: canlı destek mi WhatsApp mı? Tawk.to üstüne mi, yerine mi?
- WhatsApp seçilirse onaylı Meta Business / WhatsApp Business hesabı var mı?
- Arka planda veri sorgusu olacak mı? Müşteri API'si var mı?

## Geçmiş
- 23 Haz 2026 — Lead alındı. Teklif e-postası hazırlandı (15.000₺ + KDV,
  yap-kur-çık, tek kanal chatbot + IVR). Gönderilmek üzere; `[İsim]` dışında hazır.
