import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, products, ui } from "@/lib/fixtures"
import { CommodityGrid } from "@/components/CommodityCard"
import { CommodityFilter } from "@/components/CommodityFilter"
import { InquirySection } from "@/components/InquirySection"
import { PageHeader } from "@/components/PageHeader"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return {
    title: pickLocale(pages.productsIndex.heroTitle, raw),
    description: pickLocale(pages.productsIndex.heroLead, raw),
  }
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const { locale: raw } = await params
  const { category, q } = await searchParams
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const query = q?.trim().toLowerCase() || ""
  const filtered = products.filter((product) => {
    if (category && product.category !== category) return false
    if (!query) return true
    const name = pickLocale(product.name, locale).toLowerCase()
    const blurb = pickLocale(product.shortBlurb, locale).toLowerCase()
    return name.includes(query) || blurb.includes(query)
  })

  return (
    <div>
      <PageHeader
        variant="compact"
        locale={locale}
        image="heroWarehouse"
        eyebrow={pickLocale(ui.ourCommodities, locale)}
        title={pickLocale(pages.productsIndex.heroTitle, locale)}
        lead={pickLocale(pages.productsIndex.heroLead, locale)}
      />
      <div className="bg-white pb-24 lg:pb-32">
        {/* Chips overlap the hero bottom, then stick under the header */}
        <CommodityFilter locale={locale} category={category} q={q} />
        <div className="site-wrap mt-12 lg:mt-16">
          {filtered.length === 0 ? (
            <p className="text-muted">{pickLocale(ui.noMatches, locale)}</p>
          ) : (
            <CommodityGrid products={filtered} locale={locale} />
          )}
        </div>
      </div>
      <InquirySection locale={locale} title={pickLocale(pages.home.inquiryTitle, locale)} />
    </div>
  )
}
