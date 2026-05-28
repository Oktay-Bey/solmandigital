import type { Metadata } from "next"
import { Suspense } from "react"
import TesekkurlerContent from "./TesekkurlerContent"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Teşekkürler | Solman Digital",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteConfig.url}/tesekkurler` },
}

export default function TesekkurlerPage() {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
      <Suspense fallback={
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#6b6b6b" }}>Yükleniyor…</p>
        </div>
      }>
        <TesekkurlerContent />
      </Suspense>
    </main>
  )
}
