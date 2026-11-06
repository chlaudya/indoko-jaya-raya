"use client"

import { useRouter } from "next/navigation"
import { useEffect, type FormEvent } from "react"
import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { categories, ui } from "@/lib/fixtures"

function catalogHref(base: string, category?: string, q?: string, hash?: string) {
  const params = new URLSearchParams()
  if (category) params.set("category", category)
  if (q) params.set("q", q)
  const query = params.toString()
  return `${base}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`
}

function chipClass(active: boolean) {
  return [
    "inline-flex min-h-10 shrink-0 items-center rounded-[6px] border px-4 text-sm whitespace-nowrap motion-safe:transition-colors",
    active
      ? "btn-lime border-transparent bg-lime font-medium text-forest hover:bg-lime-tint active:bg-lime-tint"
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
  basePath,
  hash,
  embedded = false,
}: {
  locale: Locale
  category?: string
  q?: string
  /** Page the chips and search submit to. Defaults to the catalog. */
  basePath?: string
  /** Hash kept on chip links so an embedded filter returns to its section. */
  hash?: string
  /** In-flow bar. The catalog uses the sticky bar that overlaps the hero. */
  embedded?: boolean
}) {
  const router = useRouter()
  const base = basePath ?? `/${locale}/products`
  const href = (nextCategory?: string) => catalogHref(base, nextCategory, q, hash)

  // A native GET submit strips the hash, so the home page reloads at the top.
  useEffect(() => {
    if (!hash || window.location.hash !== `#${hash}`) return
    document.getElementById(hash)?.scrollIntoView()
  }, [hash, q, category])

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextQ = String(data.get("q") ?? "").trim()
    const nextCategory = String(data.get("category") ?? "") || undefined
    const url = catalogHref(base, nextCategory, nextQ || undefined, hash)
    router.push(url, { scroll: false })
    if (hash) document.getElementById(hash)?.scrollIntoView()
  }

  const bar = (
    <div className="flex flex-col gap-4 rounded-[8px] border border-charcoal/10 bg-white p-4 lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <nav aria-label={pickLocale(ui.ourCommodities, locale)} className="flex flex-wrap gap-2">
            <Link href={href()} aria-current={!category ? "true" : undefined} className={chipClass(!category)}>
              {pickLocale(ui.allCategories, locale)}
            </Link>
            {categories.filter((item) => item.slug !== "layanan").map((item) => {
              const active = category === item.slug
              return (
                <Link
                  key={item.slug}
                  href={href(item.slug)}
                  aria-current={active ? "true" : undefined}
                  className={chipClass(active)}
                >
                  {pickLocale(item.title, locale)}
                </Link>
              )
            })}
          </nav>
          <form action={base} method="get" role="search" onSubmit={onSearch} className="flex shrink-0 items-center gap-2">
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
            <button type="submit" className="min-h-10 shrink-0 rounded-[6px] btn-lime bg-lime px-5 text-sm font-medium text-forest hover:bg-lime-tint active:bg-lime-tint">
              {pickLocale(ui.searchAction, locale)}
            </button>
          </form>
    </div>
  )
  if (embedded) return bar
  return (
    <div className="sticky top-[var(--filter-sticky-top)] z-30">
      <div className="site-wrap">
        <div className="-mt-12 lg:-mt-14">{bar}</div>
      </div>
    </div>
  )
}
