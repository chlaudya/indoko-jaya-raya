import type { Metadata } from "next"
import { Cormorant_Garamond, Inter, Noto_Serif_Devanagari, Noto_Serif_SC } from "next/font/google"
import { headers } from "next/headers"
import { isLocale } from "@/lib/i18n"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

// zh / hi headings (Cormorant has no CJK or Devanagari glyphs). Not preloaded, and the variable is only set on
// <html> for that locale, so other locales never fetch these files; Google's unicode-range slices keep zh downloads to
// the glyphs actually used.
const notoSerifSC = Noto_Serif_SC({
  weight: ["500", "600"],
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
})

const notoSerifDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "600"],
  variable: "--font-noto-serif-deva",
  display: "swap",
  preload: false,
})

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
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers()
  const raw = headerList.get("x-locale") || "id"
  const lang = isLocale(raw) ? htmlLang[raw] : "id"

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${cormorant.variable} ${raw === "zh" ? notoSerifSC.variable : ""} ${raw === "hi" ? notoSerifDeva.variable : ""}`}
    >
      <body>{children}</body>
    </html>
  )
}
