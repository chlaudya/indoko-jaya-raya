import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { headers } from "next/headers"
import { isLocale } from "@/lib/i18n"
import "./globals.css"

// `subsets` = what is PRELOADED. Only latin is preloaded (keeps bandwidth for the LCP hero photo); latin-ext and
// vietnamese faces stay in the CSS via unicode-range and download only on pages that use those glyphs (e.g. /vi).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

// zh / hi headings use system serif stacks (globals.css): no CJK / Devanagari webfont download, and any character
// the CMS adds later still renders (no subsetting).

const htmlLang: Record<string, string> = {
  id: "id",
  en: "en",
  zh: "zh-Hans",
  vi: "vi",
  hi: "hi",
}

export const metadata: Metadata = {
  title: {
    default: "PT Indoco Jaya Raya",
    template: "%s · PT Indoco Jaya Raya",
  },
  description: "Indonesian agricultural commodities for buyers and partners worldwide.",
  // Client logo (designer files in public/images/brand). /favicon.ico comes from src/app/favicon.ico and the
  // social image from src/app/opengraph-image.png / twitter-image.png (App Router file conventions).
  icons: {
    icon: [
      { url: "/images/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/brand/apel-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/images/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers()
  const raw = headerList.get("x-locale") || "id"
  const lang = isLocale(raw) ? htmlLang[raw] : "id"

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
