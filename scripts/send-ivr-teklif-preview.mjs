/**
 * send-ivr-teklif-preview.mjs
 * WhatsApp/IVR chatbot teklifini ÖNİZLEME olarak solmanoktay@gmail.com'a gönderir.
 * Gerçek müşteriye gitmez — onay sonrası "to" değiştirilip kullanılır.
 */
import { readFileSync } from "node:fs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter(l => l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const RESEND_KEY = env.RESEND_API_KEY
const TO = "projeodam@gmail.com"
const NAME = "[İsim]" // gerçek gönderimde müşteri adı

const subject = "WhatsApp / Canlı Destek Chatbot + Sesli Yönlendirme — Teklif ve Bilgi Talebi"

const html = `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
<div style="background:#0d0d0d;padding:20px 32px">
  <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.02em">Solman<span style="color:#9b1c1c">Digital</span></span>
</div>
<div style="padding:32px;color:#333;font-size:14px;line-height:1.7">
  <p style="margin:0 0 18px">Merhaba,</p>
  <p style="margin:0 0 18px">Talebiniz için teşekkürler. İstediğiniz sistemi Solman Digital olarak kuruyoruz. İki bileşenden oluşuyor:</p>
  <p style="margin:0 0 8px"><strong>1. Sesli yönlendirme</strong> — telefonla arandığında tuşlamalı kurumsal sesli menü (&quot;işlem için 1, destek için 2&quot; mantığı).</p>
  <p style="margin:0 0 18px"><strong>2. Akıllı chatbot</strong> — tercihinize göre <strong>ya sitenize entegre canlı destek</strong>, <strong>ya da WhatsApp üzerinden</strong> çalışan, soruları anlayıp doğru yönlendiren bir asistan. Hangisi sizin için daha uygunsa onu kuruyoruz.</p>
  <p style="margin:0 0 24px">Aşağıda hem yaklaşımımızı hem de net bir kapsam çıkarabilmemiz için ihtiyaç duyduğumuz bilgileri bulacaksınız.</p>

  <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#111">Nasıl kuruyoruz</p>
  <p style="margin:0 0 24px">Kişisel verilerin korunmasını baştan kurguluyoruz: gereksiz bilgi toplanmaz, her kanalın başında gerekli aydınlatma ve onay akışı yer alır. Böylece sistem KVKK ile uyumlu çalışacak şekilde tasarlanır — uyumun teknik tarafını biz kuruyoruz; aydınlatma ve onay metinlerinin içeriğini ise veri sorumlusu olarak siz onaylarsınız.</p>

  <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#111">Netleştirmemiz gereken birkaç nokta</p>
  <p style="margin:0 0 4px;color:#9b1c1c;font-weight:600;font-size:13px">Telefon / sesli yönlendirme tarafı</p>
  <ul style="margin:0 0 14px;padding-left:20px">
    <li style="margin-bottom:6px">FCT hattınız dijital bir servis sağlayıcıyla mı çalışıyor, yoksa analog hat mı kullanıyorsunuz?</li>
    <li style="margin-bottom:6px">Mevcut numaranızın korunması zorunlu mu? (Bazı durumlarda yönlendirmeye uygun yeni bir numara sağlamak hem daha temiz hem daha uygun maliyetli oluyor — birlikte değerlendirebiliriz.)</li>
    <li style="margin-bottom:6px">Menü sonunda sistem mi yanıt versin (örn. bilgi okuma), yoksa çağrı bir temsilciye mi aktarılsın?</li>
  </ul>
  <p style="margin:0 0 4px;color:#9b1c1c;font-weight:600;font-size:13px">Chatbot tarafı</p>
  <ul style="margin:0 0 14px;padding-left:20px">
    <li style="margin-bottom:6px">Chatbot'u sitenizdeki canlı destek üzerinden mi, yoksa WhatsApp üzerinden mi tercih edersiniz?</li>
    <li style="margin-bottom:6px">Şu an site tarafında Tawk.to kullandığınızı görüyoruz. Mevcut bu yapının üzerine mi çalışmamızı istersiniz, yoksa yerine AI destekli yeni bir canlı destek mi kuralım?</li>
    <li style="margin-bottom:6px">WhatsApp'ı tercih ederseniz: onaylı bir Meta Business / WhatsApp Business hesabınız mevcut mu? (Yoksa bu kurulumu da süreç içinde birlikte tamamlıyoruz.)</li>
  </ul>
  <p style="margin:0 0 4px;color:#9b1c1c;font-weight:600;font-size:13px">Veri ve içerik</p>
  <ul style="margin:0 0 24px;padding-left:20px">
    <li style="margin-bottom:6px">Yönlendirmede arka planda veri kullanılacak mı (bakiye, sipariş, randevu vb.)? Varsa bu verileri çektiğimiz bir sisteminiz/API'niz mevcut mu?</li>
  </ul>

  <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#111">Çalışma modeli ve ücretlendirme</p>
  <p style="margin:0 0 14px">Bu hizmeti <strong>tek seferlik kurulum</strong> olarak sağlıyoruz: sistemi tasarlar, kurar ve çalışır halde teslim ederiz.</p>
  <div style="background:#f9f9f9;border-left:3px solid #9b1c1c;padding:14px 18px;border-radius:0 6px 6px 0;margin:0 0 14px">
    <p style="margin:0;font-size:15px;font-weight:800;color:#111">Kurulum bedeli: 15.000₺ + KDV <span style="font-weight:400;color:#888;font-size:13px">(tek seferlik)</span></p>
  </div>
  <p style="margin:0 0 14px">Bu bedel, standart sesli menü ve tek kanalda (site canlı destek veya WhatsApp) AI destekli chatbot kurulumunu kapsar; arka plan veri entegrasyonu (bakiye, sipariş, randevu sorgulama gibi) gerekirse ayrıca değerlendirilir.</p>
  <p style="margin:0 0 24px">Sistemin sürekli çalışması için gereken işlem gücü, yapay zeka kullanımı ve servis sağlayıcı (telefon hattı, WhatsApp API vb.) kalemleri kurulum bedeline dahil değildir; bunlar <strong>doğrudan ilgili sağlayıcılar üzerinden, aylık</strong> olarak işler. Bu kalemleri kurulum aşamasında şeffaf şekilde paylaşır, hesapların sizin adınıza kurulmasını sağlarız; teslimden sonra sistem bağımsız olarak sizin kontrolünüzde çalışır.</p>

  <p style="margin:0 0 24px">Yukarıdaki sorulara vereceğiniz yanıtlarla kapsamı kesinleştirip kurulumu planlayabiliriz.</p>
  <p style="margin:0">İyi çalışmalar,<br><strong>Solman Digital</strong></p>
</div>
<div style="background:#f5f5f5;padding:14px 32px;border-top:1px solid #e5e5e5">
  <p style="margin:0;font-size:11px;color:#bbb">Solman Digital · <a href="https://solmandigital.com.tr" style="color:#9b1c1c">solmandigital.com.tr</a></p>
</div>
</div>`

const text = `Merhaba,

Talebiniz için teşekkürler. İstediğiniz sistemi Solman Digital olarak kuruyoruz. İki bileşenden oluşuyor:

1. Sesli yönlendirme — telefonla arandığında tuşlamalı kurumsal sesli menü ("işlem için 1, destek için 2" mantığı).
2. Akıllı chatbot — tercihinize göre ya sitenize entegre canlı destek, ya da WhatsApp üzerinden çalışan bir AI agent. Hangisi sizin için daha uygunsa onu kuruyoruz.

NASIL KURUYORUZ
Kişisel verilerin korunmasını baştan kurguluyoruz: gereksiz bilgi toplanmaz, her kanalın başında gerekli aydınlatma ve onay akışı yer alır. Böylece sistem KVKK ile uyumlu çalışacak şekilde tasarlanır — uyumun teknik tarafını biz kuruyoruz; aydınlatma ve onay metinlerinin içeriğini ise veri sorumlusu olarak siz onaylarsınız.

NETLEŞTİRMEMİZ GEREKEN NOKTALAR
Telefon / sesli yönlendirme:
- FCT hattınız dijital servis sağlayıcıyla mı, analog mı?
- Mevcut numara şart mı?
- Menü sonunda sistem mi cevaplıyor, temsilciye mi aktarılıyor?
Chatbot:
- Canlı destek mi, WhatsApp mı?
- Tawk.to üzerine mi, yerine yeni mi?
- WhatsApp seçilirse onaylı Meta Business hesabı var mı?
Veri:
- Arka planda veri sorgusu olacak mı? API var mı?

ÇALIŞMA MODELİ VE ÜCRETLENDİRME
Tek seferlik kurulum olarak sağlıyoruz.
Kurulum bedeli: 15.000₺ + KDV (tek seferlik).
Bu bedel, standart sesli menü ve tek kanalda AI destekli chatbot kurulumunu kapsar; arka plan veri entegrasyonu gerekirse ayrıca değerlendirilir.
Aylık işleyen kalemler (işlem gücü, YZ, telefon hattı, WhatsApp API) kurulum bedeline dahil değildir; doğrudan ilgili sağlayıcılar üzerinden, aylık olarak işler ve hesaplar sizin adınıza kurulur.

İyi çalışmalar,
Solman Digital`

const r = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { "Authorization": `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    from: "Solman Digital <info@solmandigital.com.tr>",
    to: [TO],
    reply_to: "info@solmandigital.com.tr",
    subject: subject,
    html, text,
  })
})
const body = await r.json().catch(() => ({}))
console.log(r.status >= 200 && r.status < 300 ? `✓ Gönderildi → ${TO} (id: ${body.id})` : `✗ Hata (${r.status}): ${JSON.stringify(body)}`)
