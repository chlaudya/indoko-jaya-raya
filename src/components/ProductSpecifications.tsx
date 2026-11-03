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

/** True when at least one client-confirmed spec row has a displayable value. */
export function hasConfirmedSpecs(product: Product, locale: Locale): boolean {
  return product.specs.some((row) => {
    if (row.confirmed !== true) return false
    const label = pickLocale(row.label, locale).trim()
    const value = formatValueOnly(row, locale).trim()
    return Boolean(label && value)
  })
}

/** Commodity-sheet style spec table. Only client-confirmed rows with real data are shown.
 *  If none remain, returns null — including no outer section / section-y padding. */
export function ProductSpecifications({ product, locale, title }: { product: Product; locale: Locale; title: string }) {
  const rows = product.specs
    .filter((row) => row.confirmed === true)
    .map((row) => ({
      label: pickLocale(row.label, locale),
      value: formatValueOnly(row, locale),
      unit: row.unit ? pickLocale(row.unit, locale) : "",
      testMethod: row.testMethod ? pickLocale(row.testMethod, locale).trim() : "",
    }))
    .filter((row) => row.label && row.value)

  if (rows.length === 0) return null
  const hasUnitCol = rows.some((row) => row.unit)
  const hasMethodCol = rows.some((row) => row.testMethod)

  const cols = [
    "sm:grid-cols-[14rem_1fr]",
    hasUnitCol && !hasMethodCol && "sm:grid-cols-[14rem_1fr_6rem]",
    !hasUnitCol && hasMethodCol && "sm:grid-cols-[14rem_1fr_10rem]",
    hasUnitCol && hasMethodCol && "sm:grid-cols-[14rem_1fr_6rem_10rem]",
  ]
    .filter(Boolean)
    .pop()

  return (
    <section className="bg-ivory">
      <div className="site-wrap section-y">
        <div className="max-w-4xl">
          <h2 className="display display-h2 text-forest">{title}</h2>
          <dl className="mt-8 border-t border-charcoal/15">
            {rows.map((row, index) => (
              <div key={index} className={`grid gap-1 border-b border-charcoal/10 py-5 sm:gap-8 ${cols}`}>
                <dt className="label text-muted!">{row.label}</dt>
                <dd className="text-lg text-charcoal">
                  {hasUnitCol ? row.value : row.unit ? `${row.value} ${row.unit}` : row.value}
                </dd>
                {hasUnitCol ? <dd className="text-sm text-muted sm:text-right">{row.unit}</dd> : null}
                {hasMethodCol ? (
                  <dd className="text-sm text-muted sm:text-right">{row.testMethod || "—"}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
