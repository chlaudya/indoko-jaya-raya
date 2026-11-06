import type { Metadata } from "next"
import { siteUrl } from "@/lib/seo"
import { Geist } from "next/font/google"
import { headers } from "next/headers"
import {
  DEFAULT_LOCALE,
  isLocale,
  pickLocale,
  LOCALE_LANG_TAGS,
  type Locale,
} from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { NotFoundView } from "@/components/NotFoundView"
import { notFoundDocumentTitle } from "@/lib/not-found-copy"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale()
  return {
    metadataBase: new URL(siteUrl()),
    title: { absolute: notFoundDocumentTitle(locale) },
    // Do not set `robots` here — Next already injects a single `noindex` on HTTP 404.
  }
}

/**
 * Unmatched URLs (no matching page / `dynamicParams=false` miss) bypass segment layouts.
 * Next's `notFound()` from a matched dynamic page SSRs an empty `__next_error__` shell, so
 * unknown paths and unknown product slugs are left unmatched and land here instead.
 * Locale comes from proxy `x-locale` / pathname — not from a client-only lang setter.
 */
async function resolveLocale(): Promise<Locale> {
  const headerList = await headers()
  const candidates = [
    headerList.get("x-locale"),
    headerList.get("x-pathname")?.split("/").filter(Boolean)[0],
  ]
  for (const raw of candidates) {
    if (raw && isLocale(raw)) return raw
  }
  return DEFAULT_LOCALE
}

export default async function GlobalNotFound() {
  const locale = await resolveLocale()
  return (
    <html lang={LOCALE_LANG_TAGS[locale]} className={geist.variable}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-3 focus:text-forest"
        >
          {pickLocale(ui.skipToContent, locale)}
        </a>
        <SiteHeader locale={locale} />
        <main id="content">
          <NotFoundView locale={locale} />
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  )
}
