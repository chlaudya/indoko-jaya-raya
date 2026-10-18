import { pickLocale, type Locale } from "@/lib/i18n"
import type { Product } from "@/lib/fixtures"

/** Commodity-sheet style spec table; only rows with real data are shown. */
export function ProductSpecifications({ product, locale, title }: { product: Product; locale: Locale; title: string }) {
  const rows = product.specs.filter((row) => pickLocale(row.label, locale) && pickLocale(row.value, locale))
  if (rows.length === 0) return null

  return (
    <section>
      <h2 className="display display-h2 text-forest">{title}</h2>
      <dl className="mt-8 border-t border-charcoal/15">
        {rows.map((row, index) => (
          <div key={index} className="grid gap-1 border-b border-charcoal/10 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
            <dt className="label text-muted!">{pickLocale(row.label, locale)}</dt>
            <dd className="text-lg text-charcoal">{pickLocale(row.value, locale)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
