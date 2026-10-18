import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
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
  variable: "--font-cormorant",
  display: "swap",
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
    <html lang={lang} className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
