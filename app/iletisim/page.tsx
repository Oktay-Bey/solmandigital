import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircle, Mail, Phone, Clock, CheckCircle2, Shield } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import { siteConfig } from "@/lib/site-config"
import Reveal from "@/components/Reveal"
import WhatsAppLink from "@/components/WhatsAppLink"
import PhoneLink from "@/components/PhoneLink"

export const metadata: Metadata = {
  title: "İletişim — Projenizi Birlikte Planlayalım",
  description:
    "Projenizi anlatın, size özel ücretsiz değerlendirme yapıyoruz. 24 saat içinde dönüş, taahhütsüz görüşme.",
  keywords: [
    "solman digital iletişim",
    "yazılım teklifi al",
    "istanbul web geliştirici iletişim",
    "ücretsiz yazılım görüşmesi",
    "web sitesi teklifi",
  ],
  alternates: { canonical: `${siteConfig.url}/iletisim` },
  openGraph: { title: "İletişim | Solman Digital", locale: "tr_TR" },
}

const nextSteps = [
  {
    num: "01",
    title: "Mesajınızı okuyoruz",
    desc: "Projenizi, sektörünüzü ve ihtiyacınızı anlıyoruz.",
  },
  {
    num: "02",
    title: "Size özel değerlendirme",
    desc: "Teknik fizibilite, yaklaşık süre ve kapsam üzerine ilk düşüncelerimizi hazırlıyoruz.",
  },
  {
    num: "03",
    title: "24 saat içinde dönüyoruz",
    desc: "Birlikte konuşmak ister misiniz sorusunu soruyoruz — baskı değil, davet.",
  },
]

export default function IletisimPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-500 px-6 pb-16 pt-20">
        <div className="mx-auto max-w-[1200px]">
          {/* Üst rozet */}
          <Reveal>
            <div className="mb-8 inline-flex flex-wrap items-center gap-6">
              {[
                { label: "İlk Görüşme Ücretsiz" },
                { label: "24s İçinde Dönüş" },
                { label: "Taahhütsüz" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 rounded-full border border-dark-50 bg-dark-300 px-3.5 py-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="text-[0.72rem] font-semibold tracking-wide text-ink-400">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mb-5 max-w-[700px] text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-white">
              Projenizi birlikte
              <br />
              <span className="text-accent-700">planlayalım.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-[560px] text-base leading-loose text-ondark-muted">
              Bu bir satış görüşmesi değil. Projenizi dinleyeceğiz, teknik açıdan değerlendireceğiz
              ve size dürüst bir görüş sunacağız — ister devam edin, ister etmeyin.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ana İçerik */}
      <section className="bg-surface px-6 pb-20 pt-14">
        <div className="two-col-grid mx-auto max-w-[1040px] items-start md:!grid-cols-[1fr_340px]">
          {/* Sol: Form */}
          <Reveal>
            <div>
              <div className="rounded-xl border border-ink-200 bg-white p-10">
                <h2 className="mb-1.5 text-[1.2rem] font-extrabold tracking-tight text-ink-900">
                  Projenizi Anlatın
                </h2>
                <p className="mb-8 text-[0.825rem] leading-relaxed text-ink-400">
                  Teknik bilgi gerekmez. &quot;Şunu yapmak istiyorum&quot; yeterli — geri kalanını biz soracağız.
                </p>
                <ContactForm />
              </div>

              {/* Güvence çizgisi */}
              <div className="mt-4 flex items-center gap-2 px-1">
                <Shield size={13} className="text-ink-400" />
                <span className="text-[0.72rem] text-ink-400">
                  Bilgileriniz yalnızca projeniz için kullanılır, üçüncü taraflarla paylaşılmaz.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Sağ: Sidebar */}
          <div className="flex flex-col gap-4">
            {/* WhatsApp — En Öncelikli */}
            <Reveal delay={100}>
              <WhatsAppLink
                source="contact_card"
                className="block rounded-[10px] border border-[#166534] bg-[#0d1f13] p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-[#166534]">
                    <MessageCircle size={18} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-bold uppercase tracking-wider text-[#4ade80]">
                      En Hızlı Yol
                    </p>
                    <p className="text-[0.9rem] font-bold text-white">WhatsApp ile Yazın</p>
                  </div>
                </div>
                <p className="mb-3.5 text-[0.8rem] leading-snug text-[#86efac]">
                  Birkaç mesajla projenizi paylaşın — hemen değerlendiriyoruz.
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.85rem] font-bold text-[#4ade80]">{siteConfig.whatsappDisplay}</span>
                  <ArrowRight size={14} className="text-[#4ade80]" />
                </div>
              </WhatsAppLink>
            </Reveal>

            {/* Telefon — Aranabilir */}
            <Reveal delay={120}>
              <PhoneLink
                source="contact_card"
                className="block rounded-[10px] border border-ink-200 bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-ink-100">
                    <Phone size={18} className="text-ink-600" />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-bold uppercase tracking-wider text-ink-400">
                      Telefonla
                    </p>
                    <p className="text-[0.9rem] font-bold text-ink-800">Hemen Arayın</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.85rem] font-bold text-ink-700">{siteConfig.whatsappDisplay}</span>
                  <ArrowRight size={14} className="text-ink-500" />
                </div>
              </PhoneLink>
            </Reveal>

            {/* Sonraki Adımlar */}
            <Reveal delay={150}>
              <div className="rounded-[10px] border border-ink-200 bg-white p-6">
                <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-wider text-ink-400">
                  Sonra Ne Olur?
                </p>
                <div className="flex flex-col gap-4">
                  {nextSteps.map((step) => (
                    <div key={step.num} className="flex gap-3.5">
                      <span className="min-w-5 pt-0.5 text-[0.65rem] font-extrabold tracking-wide text-accent-700">
                        {step.num}
                      </span>
                      <div>
                        <p className="mb-0.5 text-[0.82rem] font-bold text-ink-900">
                          {step.title}
                        </p>
                        <p className="text-[0.775rem] leading-snug text-ink-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Yanıt Garantisi */}
            <Reveal delay={200}>
              <div className="flex items-start gap-3.5 rounded-[10px] border border-ink-200 bg-white px-6 py-5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[7px] bg-ink-100">
                  <Clock size={16} className="text-ink-700" />
                </div>
                <div>
                  <p className="mb-0.5 text-[0.82rem] font-bold text-ink-900">
                    24 Saat İçinde Dönüş
                  </p>
                  <p className="text-[0.775rem] leading-snug text-ink-400">
                    İş günlerinde mesajınıza en geç 24 saat içinde yanıt veriyoruz.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* E-posta */}
            <Reveal delay={250}>
              <div className="flex items-start gap-3.5 rounded-[10px] border border-ink-200 bg-white px-6 py-5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[7px] bg-ink-100">
                  <Mail size={16} className="text-ink-700" />
                </div>
                <div>
                  <p className="mb-0.5 text-[0.82rem] font-bold text-ink-900">
                    E-posta ile de yazabilirsiniz
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[0.8rem] font-semibold text-accent-700"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Güven Bloku */}
      <section className="border-t border-ink-100 bg-white px-6 py-14">
        <div className="mx-auto max-w-[1040px]">
          <Reveal>
            <p className="eyebrow mb-8">Neden Şimdi Yazmalısınız?</p>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {[
              {
                title: "Fikir aşamasında olmanız yeterli",
                desc: "Detaylı teknik bilgi veya hazır kapsam belgesi gerekmez. Neye ihtiyaç duyduğunuzu birlikte netleştiriyoruz.",
              },
              {
                title: "Projenizi yapacak kişiyle konuşuyorsunuz",
                desc: "Satış temsilcisi değil — sizi dinleyen ve projenizi inşa edecek uzmanla doğrudan iletişim.",
              },
              {
                title: "Değerlendirme tamamen ücretsiz",
                desc: "İlk görüşme ve teknik fizibilite değerlendirmesi için hiçbir ücret alınmaz, taahhüt beklenmez.",
              },
              {
                title: "Karar vermek zorunda değilsiniz",
                desc: "Teklifi aldıktan sonra düşünmek, beklemek ya da vazgeçmek tamamen serbestsiniz.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="flex gap-3.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
                  <div>
                    <p className="mb-1 text-[0.875rem] font-bold text-ink-900">
                      {item.title}
                    </p>
                    <p className="text-[0.8rem] leading-relaxed text-ink-500">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alt CTA */}
      <section className="border-t border-dark-200 bg-dark-500 px-6 py-16 text-center">
        <div className="mx-auto max-w-[560px]">
          <p className="mb-3 text-[0.85rem] tracking-wide text-ondark-muted">
            Hâlâ kararsızsanız
          </p>
          <h2 className="mb-4 text-[clamp(1.4rem,3vw,1.875rem)] font-extrabold leading-tight tracking-tight text-white">
            Önce hizmetlerimize göz atın
          </h2>
          <p className="mb-8 text-[0.875rem] leading-relaxed text-ondark-muted">
            Ne tür projeler geliştirdiğimizi görmek, karar vermenizi kolaylaştırabilir.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/portfoy" className="btn btn-primary">
              Projeleri İncele <ArrowRight size={15} />
            </Link>
            <Link href="/hizmetler" className="btn btn-outline-dark">
              Hizmetler
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
