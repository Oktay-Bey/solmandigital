import { Star } from "lucide-react"
import Reveal from "@/components/Reveal"

const testimonials = [
  {
    name: "Kerem Aydın",
    role: "Kurucu",
    company: "E-Ticaret Girişimi",
    text: "Trendyol ve Hepsiburada entegrasyonunu 2 haftada teslim ettiler. Stok senkronizasyonu artık tamamen otomatik, manuel işlemlerimiz neredeyse sıfıra indi.",
    stars: 5,
  },
  {
    name: "Selin Öztürk",
    role: "Genel Müdür",
    company: "Kurumsal Hizmetler",
    text: "Birkaç firmayla görüştük ama doğrudan uzmanla çalışmanın farkı ortaya çıktı. Brief'i anında kavradı, hiç gidip gelmeden 10 günde siteyi canlıya aldık.",
    stars: 5,
  },
  {
    name: "Murat Çelik",
    role: "CTO",
    company: "SaaS Startup",
    text: "MVP'mizi 6 haftada bitirdiler. Kod kalitesi yüksek, supabase mimarisi temiz. Yatırımcı sunumuna hazır bir ürünle çıktık.",
    stars: 5,
  },
  {
    name: "Ayşe Kara",
    role: "E-Ticaret Müdürü",
    company: "Tekstil Firması",
    text: "Trendyol ile kendi sitemiz arasındaki stok senkronizasyonu artık tamamen otomatik. Yanlış stok satışı sorunu tamamen ortadan kalktı, iade işlemleri %70 azaldı.",
    stars: 5,
  },
  {
    name: "Berk Yıldız",
    role: "Genel Müdür",
    company: "İstanbul Restoran Grubu",
    text: "QR menü sistemini iki şubeye birden kurdular. Artık menü güncellemesini telefonumdan dakikalar içinde yapıyorum, baskı maliyetimiz sıfırlandı.",
    stars: 5,
  },
  {
    name: "Deniz Arslan",
    role: "Pazarlama Direktörü",
    company: "B2B Yazılım Şirketi",
    text: "AI içerik otomasyon sistemini kurduktan sonra blog trafiğimiz 3 ayda 4 kat arttı. GPT-4o pipeline'ı gerçekten çalışıyor, editör ihtiyacımız minimuma indi.",
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="border-t border-dark-200 bg-dark-500 px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12">
          <p className="eyebrow mb-3.5 !text-ink-500">Müşteri Görüşleri</p>
          <h2 className="max-w-[560px] text-h2 font-extrabold leading-tight tracking-tight text-white">
            Birlikte çalıştığımız
            <br />
            <span className="text-accent-700">ne dediler?</span>
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 80}>
              <div className="flex h-full flex-col gap-4 rounded-[10px] border border-dark-50 bg-dark-300 p-7 transition-colors hover:border-ink-600">
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>

                <p className="flex-1 text-[0.875rem] italic leading-relaxed text-ondark-muted">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-dark-50 pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-700 text-[0.875rem] font-extrabold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-[0.825rem] font-bold text-white">{t.name}</p>
                    <p className="text-[0.75rem] text-ink-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
