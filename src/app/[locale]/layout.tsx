import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { HtmlLang } from "@/components/HtmlLang"

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
  return (
    <>
      <HtmlLang locale={locale} />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ivory focus:px-4 focus:py-3 focus:text-forest"
      >
        {pickLocale(ui.skipToContent, locale)}
      </a>
      <SiteHeader locale={locale} />
      <main id="content">{children}</main>
      <SiteFooter locale={locale} />
    </>
  )
}
