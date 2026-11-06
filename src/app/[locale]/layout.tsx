import { notFound } from "next/navigation"
import { Geist } from "next/font/google"
import { isLocale, pickLocale, LOCALES, LOCALE_LANG_TAGS, type Locale } from "@/lib/i18n"
import { setRequestLocale } from "@/lib/request-locale"
import { ui } from "@/lib/fixtures"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"

// Geist is the single brand typeface. Chinese and Hindi use the script-aware
// system fallbacks in globals.css when Geist has no matching glyph.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  setRequestLocale(locale)

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
        <main id="content">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  )
}
