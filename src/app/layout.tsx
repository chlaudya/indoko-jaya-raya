import type { Metadata } from "next"
import { siteUrl } from "@/lib/seo"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "PT Indoco Jaya Raya",
    template: "%s · PT Indoco Jaya Raya",
  },
  description: "Indonesian agricultural commodities for buyers and partners worldwide.",
  icons: {
    icon: [
      { url: "/images/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/brand/apel-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/images/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

/**
 * Root layout stays free of `headers()` / `cookies()`. Awaiting those here made every
 * `notFound()` render fall into Next's `__next_error__` HTML shell (no lang, blank without JS).
 * `<html lang>` lives on the `[locale]` layout from `params` instead.
 *
 * Unmatched URLs (unknown path / unknown product slug with `dynamicParams=false`) are handled by
 * `app/global-not-found.tsx`, which owns its own `<html lang>` + chrome — Next's `notFound()` from a
 * matched dynamic segment cannot SSR the locale layout (framework bug → `__next_error__` shell).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
