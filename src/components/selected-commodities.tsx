import Link from "next/link"

import { categories, ui, type Product } from "@/lib/fixtures"
import { pickLocale, type Locale } from "@/lib/i18n"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

import { AcuanChips } from "./AcuanChips"
import { Photo } from "./Photo"
import { TextLink } from "./TextLink"
import { WhatsAppIcon } from "./WaButton"

function categoryName(product: Product, locale: Locale) {
  const category = categories.find((item) => item.slug === product.category)
  return category ? pickLocale(category.title, locale) : product.category
}

function ProductLinks({
  product,
  locale,
}: {
  product: Product
  locale: Locale
}) {
  const name = pickLocale(product.name, locale)
  const href = `/${locale}/products/${product.slug}`
  const whatsapp = buildWhatsAppUrl({
    locale,
    templateKey: "productCard",
    tokens: { productName: name },
  })

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      <TextLink href={href}>{pickLocale(ui.viewCommodity, locale)}</TextLink>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link text-charcoal"
        aria-label={`${pickLocale(ui.askViaWhatsApp, locale)}: ${name}`}
      >
        <WhatsAppIcon />
        <span>{pickLocale(ui.askViaWhatsApp, locale)}</span>
      </a>
    </div>
  )
}

export function SelectedCommodities({
  locale,
  label,
  title,
  body,
  viewAllLabel,
  products,
}: {
  locale: Locale
  label: string
  title: string
  body: string
  viewAllLabel: string
  products: Product[]
}) {
  const [featured, ...rest] = products
  if (!featured) return null

  return (
    <section className="bg-mist" aria-labelledby="selected-commodities-title">
      <div className="site-wrap section-y">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="label">{label}</p>
            <h2
              id="selected-commodities-title"
              className="heading-2 mt-6 max-w-[680px] text-balance"
            >
              {title}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="body-3 text-pretty text-muted">{body}</p>
            <div className="mt-4">
              <TextLink href={`/${locale}/products`}>
                {viewAllLabel}
              </TextLink>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-6">
          <article className="group lg:col-span-7">
            <Link
              href={`/${locale}/products/${featured.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Photo
                image={featured.image}
                locale={locale}
                sizes="(min-width: 1280px) 735px, (min-width: 1024px) 58vw, 100vw"
                aspect="aspect-[4/3]"
                rounded={false}
                zoom
              />
            </Link>
            <div className="mt-6 max-w-xl">
              <p className="caption-3 uppercase tracking-[0.12em] text-charcoal">
                {categoryName(featured, locale)}
              </p>
              <h3 className="heading-4 mt-3 text-balance">
                <Link
                  href={`/${locale}/products/${featured.slug}`}
                  className="focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {pickLocale(featured.name, locale)}
                </Link>
              </h3>
              <p className="body-3 mt-4 text-pretty text-muted">
                {pickLocale(featured.shortBlurb, locale)}
              </p>
              <AcuanChips product={featured} locale={locale} />
              <ProductLinks product={featured} locale={locale} />
            </div>
          </article>

          <div className="lg:col-span-5 lg:pl-8">
            {rest.map((product) => (
              <article
                key={product.slug}
                className="group grid grid-cols-[112px_1fr] gap-6 border-t border-charcoal/20 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[160px_1fr]"
              >
                <Link
                  href={`/${locale}/products/${product.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Photo
                    image={product.image}
                    locale={locale}
                    sizes="160px"
                    aspect="aspect-square"
                    rounded={false}
                    zoom
                  />
                </Link>
                <div>
                  <p className="caption-3 uppercase tracking-[0.12em] text-charcoal">
                    {categoryName(product, locale)}
                  </p>
                  <h3 className="heading-6 mt-2 text-balance">
                    <Link
                      href={`/${locale}/products/${product.slug}`}
                      className="focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {pickLocale(product.name, locale)}
                    </Link>
                  </h3>
                  <p className="body-6 mt-2 line-clamp-3 text-pretty text-muted">
                    {pickLocale(product.shortBlurb, locale)}
                  </p>
                  <AcuanChips product={product} locale={locale} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
