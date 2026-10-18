import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { categories, ui, type Product } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { Photo } from "./Photo"
import { WhatsAppIcon } from "./WaButton"

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

/** Matches the 3-col catalog grid: ≤411px in the 1280 content box, 2-col on tablet, full width on phones. */
export const GRID_CARD_SIZES = "(min-width: 1440px) 411px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
/** Home commodity grid: 4 columns ≥1280 (≤302px), 3 at 1024, 2 on tablet. */
export const HOME_CARD_SIZES = "(min-width: 1440px) 302px, (min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
/** Matches CardRail slot widths (78vw phone, ½ tablet, ⅓ desktop). */
export const RAIL_CARD_SIZES = "(min-width: 1376px) 410px, (min-width: 1024px) 31vw, (min-width: 640px) 45vw, 78vw"

/**
 * Editorial commodity card: 4:3 photo (placeholder until the client supplies one), category, name (Cormorant 20px),
 * one metadata line, then "Lihat komoditi →" and a contextual "Tanya via WhatsApp" (product name in the page
 * language, configured destination). Hover: only the image scales to 1.03 and the border tints; reduced motion
 * keeps the image still. Image and name both lead to the detail page (the image link is out of the tab order).
 */
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
  const isService = product.kind === "service"
  const cta = isService ? pickLocale(ui.viewService, locale) : pickLocale(ui.viewCommodity, locale)
  const wa = isService
    ? buildWhatsAppUrl({ locale, templateKey: "drying" })
    : buildWhatsAppUrl({ locale, templateKey: "productCard", tokens: { productName: name } })
  const Heading = headingLevel

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-hairline bg-white motion-safe:transition-colors motion-safe:duration-200 hover:border-hover-line">
      <Link href={href} tabIndex={-1} aria-hidden="true">
        <Photo
          image={product.image}
          locale={locale}
          aspect="aspect-[4/3]"
          rounded={false}
          zoom
          sizes={sizes}
          tone={isService ? "ph-harvest" : "ph"}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="label">{categoryLabel(product.category, locale)}</p>
        <Heading className="display mt-2 text-[1.25rem] leading-snug font-semibold text-forest">
          <Link href={href} className="hover:underline hover:underline-offset-4">
            {name}
          </Link>
        </Heading>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{pickLocale(product.shortBlurb, locale)}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-3">
          <Link href={href} className="text-link text-forest" aria-label={`${cta}: ${name}`}>
            <span>{cta}</span>
            <span aria-hidden="true" className="arrow">→</span>
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link text-leaf"
            aria-label={`${pickLocale(ui.askViaWhatsApp, locale)}: ${name}`}
          >
            <WhatsAppIcon className="size-4" />
            <span>{pickLocale(ui.askViaWhatsApp, locale)}</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export function CommodityGrid({ products, locale }: { products: Product[]; locale: Locale }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug} className="reveal">
          <CommodityCard product={product} locale={locale} />
        </li>
      ))}
    </ul>
  )
}
