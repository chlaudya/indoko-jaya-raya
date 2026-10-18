import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { categories, ui } from "@/lib/fixtures"

function catalogHref(locale: Locale, category?: string, q?: string) {
  const params = new URLSearchParams()
  if (category) params.set("category", category)
  if (q) params.set("q", q)
  const query = params.toString()
  return `/${locale}/products${query ? `?${query}` : ""}`
}

function chipClass(active: boolean) {
  return [
    "inline-flex min-h-10 shrink-0 items-center rounded-[6px] border px-4 text-sm whitespace-nowrap motion-safe:transition-colors",
    active
      ? "border-forest bg-forest font-medium text-white"
      : "border-charcoal/15 bg-white text-charcoal hover:border-forest hover:text-forest",
  ].join(" ")
}

/**
 * Catalog filter row: category chips + search. Rendered overlapping the
 * bottom of the catalog hero and sticky just under the floating header bar.
 */
export function CommodityFilter({
  locale,
  category,
  q,
}: {
  locale: Locale
  category?: string
  q?: string
}) {
  return (
    <div className="sticky top-[var(--filter-sticky-top)] z-30">
      <div className="site-wrap">
        <div className="-mt-12 flex flex-col gap-4 rounded-[8px] border border-charcoal/10 bg-white p-4 lg:-mt-14 lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <nav aria-label={pickLocale(ui.ourCommodities, locale)} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            <Link href={catalogHref(locale, undefined, q)} aria-current={!category ? "true" : undefined} className={chipClass(!category)}>
              {pickLocale(ui.allCategories, locale)}
            </Link>
            {categories.map((item) => {
              const active = category === item.slug
              return (
                <Link
                  key={item.slug}
                  href={catalogHref(locale, item.slug, q)}
                  aria-current={active ? "true" : undefined}
                  className={chipClass(active)}
                >
                  {pickLocale(item.title, locale)}
                </Link>
              )
            })}
          </nav>
          <form action={`/${locale}/products`} method="get" role="search" className="flex shrink-0 items-center gap-2">
            {category && <input type="hidden" name="category" value={category} />}
            <label className="sr-only" htmlFor="commodity-search">
              {pickLocale(ui.searchCommodities, locale)}
            </label>
            <input
              id="commodity-search"
              name="q"
              type="search"
              defaultValue={q}
              placeholder={pickLocale(ui.searchCommodities, locale)}
              className="min-h-10 w-full rounded-[6px] border border-charcoal/15 bg-white px-4 text-sm text-charcoal placeholder:text-muted lg:w-64"
            />
            <button type="submit" className="min-h-10 shrink-0 rounded-[6px] bg-forest px-5 text-sm font-medium text-white hover:bg-leaf">
              {pickLocale(ui.searchAction, locale)}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
