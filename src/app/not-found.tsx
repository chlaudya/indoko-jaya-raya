import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { NotFoundView } from "@/components/NotFoundView"
import { DEFAULT_LOCALE } from "@/lib/i18n"

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

export const metadata: Metadata = {
  title: "404",
}

/** Root fallback when no locale segment is present (must include <html>). */
export default function RootNotFound() {
  return (
    <html lang="id" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <main id="content">
          <NotFoundView locale={DEFAULT_LOCALE} />
        </main>
      </body>
    </html>
  )
}
