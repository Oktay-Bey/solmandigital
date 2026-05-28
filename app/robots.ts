import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "PerplexityBot", "Claude-Web", "Amazonbot", "anthropic-ai", "cohere-ai"], allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
