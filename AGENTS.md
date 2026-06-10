<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Skill Kütüphanesi (Desktop/skills)

Masaüstündeki `C:\Users\90534\Desktop\skills` klasöründe çeşitli yeteneklere sahip
ajan/skill tanımları bulunur (UI tasarım sistemi, senior-frontend, a11y-audit,
apple-hig-expert, page-cro, landing-page-generator vb.). Plan veya uygulama
sırasında ilgili olanları tespit edip **referans** olarak kullanabilirsin
(kodu körü körüne kopyalama — projeye uyarla). Bu klasör projenin parçası değildir,
yalnızca bir bilgi/araç kaynağıdır.

# Email Otomasyonu (Lead Outreach)

Kişiselleştirilmiş cold outreach pipeline'ı kurulu — altyapı, içerik kuralları,
takip sistemi ve batch süreci `EMAIL-OTOMASYON.md` dosyasında. Yeni lead batch'i,
mail içeriği veya gönderim işi öncesi o dosyayı oku. Kritik: korku temelli ton
yasak, her teknik iddia gönderilmeden doğrulanır, önizleme onayı olmadan gerçek
alıcıya mail gitmez.

# Solman Digital — Tasarım Sistemi

- Renk/spacing/radius/gölge token'ları `app/globals.css` `@theme` bloğunda tanımlı.
- Yeni UI yazarken **inline `style={{}}` kullanma** — token'lı Tailwind utility
  (`bg-accent-700`, `text-ink-500`, `shadow-card`) veya `@layer components`
  sınıflarını (`.btn-primary`, `.btn-outline`, `.card`, `.eyebrow`) kullan.
- Koyu zemin metinde `--color-ondark` / `ondark-muted` kullan (WCAG AA).
- Animasyon: ince/profesyonel. Scroll-reveal için `components/Reveal.tsx`.
  `prefers-reduced-motion` globalde devre dışı bırakılır — buna saygı duy.

# Solman Digital — Marka Sesi Kuralları

## Entity & Kişi Dili
- Konuşan entity: Solman Digital (marka)
- Fiil: "biz" — "geliştiriyoruz", "teslim ediyoruz", "çalışıyoruz"
- "ben/benim" yasak
- Yapısal tanım gerekirse: "yazılım ofisi" — "ajans" veya "ekip/kadro" değil

## Şeffaflık = Avantaj Çerçevesi
- "Aynı uzmanla çalışırsınız" → avantaj çerçevesi, kırılganlık değil
- Tek kişilik operasyon ne gizlenir ne de reklam edilir — yapısal soruya girilmez, çalışma biçimi konuşulur
- Savunmacı ton yok; güvenli, sonuç odaklı ton esas

## Yasaklı Kelimeler (copy'de asla kullanma)
ajans · ekip · kadro · freelancer · serbest çalışan · ben · benim · tek kişiyim

## Onaylı İfadeler
- "Solman Digital olarak..."
- "Doğrudan uzman erişimi"
- "Aynı uzmanla, başından sonuna"
- "Katmansız iletişim"
- "Yazılım ofisi" (yapısal tanım gerektiğinde)
