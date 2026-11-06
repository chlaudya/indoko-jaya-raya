import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { NotFoundView } from "@/components/NotFoundView"
import { DEFAULT_LOCALE } from "@/lib/i18n"
import { notFoundDocumentTitle } from "@/lib/not-found-copy"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export const metadata: Metadata = {
  title: { absolute: notFoundDocumentTitle(DEFAULT_LOCALE) },
}

/** Root fallback when no locale segment is present (must include <html>). */
export default function RootNotFound() {
  return (
    <html lang="id" className={geist.variable}>
      <body>
        <main id="content">
          <NotFoundView locale={DEFAULT_LOCALE} />
        </main>
      </body>
    </html>
  )
}
