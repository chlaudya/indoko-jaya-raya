import Link from "next/link"
import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { categories, products, ui } from "@/lib/fixtures"
import { CardRail } from "@/components/CardRail"
import { CommodityCard, RAIL_CARD_SIZES } from "@/components/CommodityCard"
import { InquirySection } from "@/components/InquirySection"
import { Photo } from "@/components/Photo"
import { ProductSpecifications } from "@/components/ProductSpecifications"
import { WaButton } from "@/components/WaButton"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) return {}
  const product = products.find((item) => item.slug === slug)
  if (!product) return {}
  return {
    title: pickLocale(product.name, raw),
    description: pickLocale(product.shortBlurb, raw),
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  if (product.kind === "service" && product.servicePagePath) {
    redirect(`/${locale}/${product.servicePagePath}`)
  }

  const category = categories.find((item) => item.slug === product.category)
  const name = pickLocale(product.name, locale)
  const intro = pickLocale(product.shortBlurb, locale)
  const overview = pickLocale(product.description, locale)
  const askLabel = `${pickLocale(ui.askAbout, locale)} ${name}`
  const related = products.filter((item) => item.slug !== slug && item.kind === "product")
  const gallery = product.gallery || []

  return (
    <article>
      {/* Split hero: gallery left, name/category/summary/WA right */}
      <section className="bg-white">
        <div className="site-wrap pt-8 pb-16 lg:pt-12 lg:pb-24">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href={`/${locale}`} className="hover:text-charcoal hover:underline">
                  {pickLocale(ui.home, locale)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/${locale}/products`} className="hover:text-charcoal hover:underline">
                  {pickLocale(ui.ourCommodities, locale)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-charcoal" aria-current="page">
                {name}
              </li>
            </ol>
          </nav>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Photo
                image={product.image}
                locale={locale}
                aspect="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
                preload={Boolean(product.image)}
                sizes="(min-width: 1376px) 740px, (min-width: 1024px) 55vw, 100vw"
              />
              {gallery.length > 0 && (
                <ul className="mt-4 grid grid-cols-4 gap-4">
                  {gallery.map((image) => (
                    <li key={image}>
                      <Photo image={image} locale={locale} aspect="aspect-square" sizes="(min-width: 1024px) 170px, 25vw" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="lg:sticky lg:top-28 lg:col-span-5">
              <p className="label">{category ? pickLocale(category.title, locale) : product.category}</p>
              <h1 className="display display-h1 mt-4 text-forest">{name}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>
              <div className="mt-8">
                <WaButton locale={locale} templateKey="productPage" tokens={{ productName: name }} label={askLabel} />
              </div>
              {overview !== intro && (
                <div className="mt-10 border-t border-charcoal/10 pt-8">
                  <h2 className="label">{pickLocale(ui.overview, locale)}</h2>
                  <p className="mt-3 leading-relaxed text-charcoal">{overview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="site-wrap section-y">
          <div className="max-w-4xl">
            <ProductSpecifications product={product} locale={locale} title={pickLocale(ui.specifications, locale)} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white">
          <div className="site-wrap section-y">
            <h2 className="display display-h2 text-forest">{pickLocale(ui.related, locale)}</h2>
            <div className="mt-10">
              <CardRail label={pickLocale(ui.related, locale)} prevLabel={pickLocale(ui.previous, locale)} nextLabel={pickLocale(ui.next, locale)}>
                {related.map((item) => (
                  <li key={item.slug}>
                    <CommodityCard product={item} locale={locale} sizes={RAIL_CARD_SIZES} />
                  </li>
                ))}
              </CardRail>
            </div>
          </div>
        </section>
      )}

      <InquirySection locale={locale} title={askLabel} templateKey="productPage" tokens={{ productName: name }} label={askLabel} />
    </article>
  )
}
