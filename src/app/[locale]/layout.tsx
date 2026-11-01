import { notFound } from "next/navigation"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { isLocale, pickLocale, LOCALES, LOCALE_LANG_TAGS, type Locale } from "@/lib/i18n"
import { setRequestLocale } from "@/lib/request-locale"
import { ui } from "@/lib/fixtures"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"

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
    <html lang={LOCALE_LANG_TAGS[locale]} className={`${inter.variable} ${cormorant.variable}`}>
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
