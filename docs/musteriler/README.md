# Müşteri & Lead Profilleri

Bu klasör, Solman Digital müşteri ve lead'lerinin hafif profillerini tutar.
CRM değil — her müşteri/lead için tek bir markdown not dosyası. Git'te
versiyonlanır, böylece görüşme geçmişi ve kapsam kararları kayıt altında kalır.

## Kullanım
- Her müşteri/lead için bir dosya: `<kebab-case-isim>.md`
- Aşağıdaki şablonu kullan. Tarihleri **mutlak** yaz (örn. "23 Haz 2026").
- Durum değiştikçe dosyayı güncelle; yeni dosya açma.

## Durum etiketleri
`lead` · `teklif-gönderildi` · `görüşülüyor` · `kazanıldı` · `kaybedildi` · `aktif-iş` · `teslim-edildi`

## Şablon

```markdown
# <Müşteri / Firma Adı>

- **Durum:** lead
- **İlk temas:** <tarih>
- **Kanal:** <nereden geldi>
- **İletişim:** <isim / e-posta / telefon>

## İhtiyaç
<müşterinin ne istediği>

## Kapsam & Karar
<konuşulan kapsam, fiyat, çalışma modeli>

## Açık Sorular
<netleşmesi gereken noktalar>

## Geçmiş
- <tarih> — <ne oldu>
```
