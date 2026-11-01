import { pickLocale, type Locale } from "@/lib/i18n"
import type { Product, SpecRow } from "@/lib/fixtures"

function formatValueOnly(row: SpecRow, locale: Locale): string {
  const explicit = row.value ? pickLocale(row.value, locale) : ""
  if (explicit) return explicit
  if (typeof row.min === "number" && typeof row.max === "number") return `${row.min}–${row.max}`
  if (typeof row.min === "number") return `≥${row.min}`
  if (typeof row.max === "number") return `≤${row.max}`
  return ""
}

/** Commodity-sheet style spec table; only rows with real data are shown. Unit column is optional. */
export function ProductSpecifications({ product, locale, title }: { product: Product; locale: Locale; title: string }) {
  const rows = product.specs
    .map((row) => ({
      label: pickLocale(row.label, locale),
      value: formatValueOnly(row, locale),
      unit: row.unit ? pickLocale(row.unit, locale) : "",
    }))
    .filter((row) => row.label && row.value)

  if (rows.length === 0) return null
  const hasUnitCol = rows.some((row) => row.unit)

  return (
    <section>
      <h2 className="display display-h2 text-forest">{title}</h2>
      <dl className="mt-8 border-t border-charcoal/15">
        {rows.map((row, index) => (
          <div
            key={index}
            className={`grid gap-1 border-b border-charcoal/10 py-5 ${
              hasUnitCol ? "sm:grid-cols-[14rem_1fr_6rem] sm:gap-8" : "sm:grid-cols-[14rem_1fr] sm:gap-8"
            }`}
          >
            <dt className="label text-muted!">{row.label}</dt>
            <dd className="text-lg text-charcoal">
              {hasUnitCol ? row.value : row.unit ? `${row.value} ${row.unit}` : row.value}
            </dd>
            {hasUnitCol ? <dd className="text-sm text-muted sm:text-right">{row.unit}</dd> : null}
          </div>
        ))}
      </dl>
    </section>
  )
}
