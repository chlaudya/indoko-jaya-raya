import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { categories, ui, type Product } from "@/lib/fixtures"
import { Photo } from "./Photo"

function categoryLabel(slug: string, locale: Locale) {
  const category = categories.find((item) => item.slug === slug)
  return category ? pickLocale(category.title, locale) : slug
}

export function productHref(product: Product, locale: Locale) {
  if (product.kind === "service" && product.servicePagePath) {
    return `/${locale}/${product.servicePagePath}`
  }
  return `/${locale}/products/${product.slug}`
}

/** Matches the 3-col catalog grid: ≤410px at the 1280 container, 2-col on tablet, full width on phones. */
export const GRID_CARD_SIZES = "(min-width: 1376px) 410px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
/** Matches CardRail slot widths (78vw phone, ½ tablet, ⅓ desktop). */
export const RAIL_CARD_SIZES = "(min-width: 1376px) 410px, (min-width: 1024px) 31vw, (min-width: 640px) 45vw, 78vw"

/** Image-first editorial card: large photo, category eyebrow, name, one line, arrow. */
export function CommodityCard({
  product,
  locale,
  sizes = GRID_CARD_SIZES,
  headingLevel = "h3",
}: {
  product: Product
  locale: Locale
  sizes?: string
  headingLevel?: "h2" | "h3"
}) {
  const href = productHref(product, locale)
  const name = pickLocale(product.name, locale)
  const cta = product.kind === "service" ? pickLocale(ui.viewService, locale) : pickLocale(ui.viewCommodity, locale)
  const Heading = headingLevel

  return (
    <article className="h-full">
      <Link href={href} className="group flex h-full flex-col">
        <Photo
          image={product.image}
          locale={locale}
          aspect="aspect-[4/5]"
          zoom
          sizes={sizes}
          tone={product.kind === "service" ? "ph-harvest" : "ph"}
        />
        <p className="label mt-5">{categoryLabel(product.category, locale)}</p>
        <Heading className="display display-h3 mt-2 text-charcoal group-hover:text-forest">{name}</Heading>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{pickLocale(product.shortBlurb, locale)}</p>
        <span className="text-link mt-auto pt-2 text-forest">
          <span className="group-hover:underline">{cta}</span>
          <span aria-hidden="true" className="arrow">→</span>
        </span>
      </Link>
    </article>
  )
}

export function CommodityGrid({ products, locale }: { products: Product[]; locale: Locale }) {
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug} className="reveal">
          <CommodityCard product={product} locale={locale} headingLevel="h2" />
        </li>
      ))}
    </ul>
  )
}
