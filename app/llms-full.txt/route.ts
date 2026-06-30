import { rehberPosts } from "@/lib/data/rehber"
import { siteConfig } from "@/lib/site-config"

/**
 * /llms-full.txt — Tüm rehber içeriklerinin düz-metin (Markdown) tam hali.
 *
 * AI crawler'ları React bileşenlerinden içerik çıkarmakta zorlanır; bu dosya
 * rehberlerin tamamını tek bir makine-okur metin olarak sunar. Kaynak tek:
 * lib/data/rehber.ts — burada içerik tekrar edilmez, oradan üretilir.
 */

export const dynamic = "force-static"

function renderPost(post: (typeof rehberPosts)[number]): string {
  const url = `${siteConfig.url}/rehber/${post.slug}`
  const lines: string[] = []

  lines.push(`# ${post.title}`)
  lines.push("")
  lines.push(`URL: ${url}`)
  lines.push(`Yayın: ${post.publishDate}${post.updatedDate ? ` · Güncelleme: ${post.updatedDate}` : ""}`)
  if (post.keywords.length) lines.push(`Anahtar kelimeler: ${post.keywords.join(", ")}`)
  lines.push("")

  if (post.summary) {
    lines.push("## Özet")
    lines.push(post.summary)
    lines.push("")
  } else if (post.description) {
    lines.push(post.description)
    lines.push("")
  }

  for (const section of post.sections) {
    lines.push(`## ${section.heading}`)
    lines.push(section.body)
    if (section.list?.length) {
      lines.push("")
      for (const item of section.list) lines.push(`- ${item}`)
    }
    lines.push("")
  }

  if (post.faq.length) {
    lines.push("## Sık Sorulan Sorular")
    for (const { q, a } of post.faq) {
      lines.push(`**S: ${q}**`)
      lines.push(`C: ${a}`)
      lines.push("")
    }
  }

  return lines.join("\n").trim()
}

export function GET(): Response {
  const header = [
    `# Solman Digital — Rehber Arşivi (Tam Metin)`,
    "",
    `> ${siteConfig.name} tarafından yayınlanan tüm rehberlerin düz-metin halidir.`,
    `> Genel bilgi için: ${siteConfig.url}/llms.txt`,
    "",
    `Web: ${siteConfig.url}`,
    `İletişim: ${siteConfig.email}`,
    `Toplam rehber: ${rehberPosts.length}`,
    "",
    "---",
    "",
  ].join("\n")

  const body = rehberPosts.map(renderPost).join("\n\n---\n\n")

  return new Response(`${header}${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
