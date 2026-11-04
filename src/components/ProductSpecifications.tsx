import { pickLocale, type Locale } from "@/lib/i18n"
import { ui, type Product, type SpecRow } from "@/lib/fixtures"

function formatValueOnly(row: Pick<SpecRow, "value" | "min" | "max">, locale: Locale): string {
  const explicit = row.value ? pickLocale(row.value, locale) : ""
  if (explicit) return explicit
  if (typeof row.min === "number" && typeof row.max === "number") return `${row.min}–${row.max}`
  if (typeof row.min === "number") return `≥${row.min}`
  if (typeof row.max === "number") return `≤${row.max}`
  return ""
}

type Row = { label: string; value: string; unit: string; testMethod: string }
type Table = { heading: string; rows: Row[] }

function toRow(row: Pick<SpecRow, "label" | "value" | "unit" | "min" | "max" | "testMethod">, locale: Locale): Row {
  return {
    label: pickLocale(row.label, locale).trim(),
    value: formatValueOnly(row, locale).trim(),
    unit: row.unit ? pickLocale(row.unit, locale).trim() : "",
    testMethod: row.testMethod ? pickLocale(row.testMethod, locale).trim() : "",
  }
}

/**
 * Spec section. Client-confirmed rows win; otherwise Brief v2 "Acuan Umum" reference tables render with a
 * disclaimer. Neither → null (no section, no padding).
 */
export function ProductSpecifications({ product, locale, title }: { product: Product; locale: Locale; title: string }) {
  const confirmed = product.specs
    .filter((row) => row.confirmed === true)
    .map((row) => toRow(row, locale))
    .filter((row) => row.label && row.value)

  const isReference = confirmed.length === 0
  const tables: Table[] = isReference
    ? (product.referenceSpecTables ?? [])
        .map((table) => ({
          heading: table.heading ? pickLocale(table.heading, locale) : "",
          rows: table.rows.map((row) => toRow(row, locale)).filter((row) => row.label && row.value),
        }))
        .filter((table) => table.rows.length > 0)
    : [{ heading: "", rows: confirmed }]

  if (tables.length === 0) return null
  const valueHead = isReference ? pickLocale(ui.specReference, locale) : title
  const note = isReference ? pickLocale(ui.acuanUmumNote, locale) : ""

  return (
    <section className="bg-ivory" aria-labelledby="product-specs-title">
      <div className="site-wrap section-y">
        <div className="max-w-4xl">
          <h2 id="product-specs-title" className="display display-h2 text-forest">{title}</h2>
          {note && (
            <p className="mt-5 max-w-3xl border-l-2 border-green pl-4 text-[0.9375rem] leading-relaxed text-charcoal">{note}</p>
          )}
          {tables.map((table, ti) => {
            const hasUnit = table.rows.some((row) => row.unit)
            const hasMethod = table.rows.some((row) => row.testMethod)
            const caption = table.heading || title
            return (
              <div key={ti} className={ti === 0 ? "mt-8" : "mt-12"}>
                <table className="w-full border-collapse text-left">
                  <caption className={table.heading ? "label mb-3 text-left" : "sr-only"}>{caption}</caption>
                  <thead className="max-sm:sr-only">
                    <tr className="border-y border-charcoal/15">
                      <th scope="col" className="label py-3 pr-6 font-semibold sm:w-[16rem]">{pickLocale(ui.specParameter, locale)}</th>
                      <th scope="col" className="label py-3 pr-6 font-semibold">{valueHead}</th>
                      {hasUnit && <th scope="col" className="label py-3 pr-6 font-semibold">Unit</th>}
                      {hasMethod && <th scope="col" className="label py-3 font-semibold">Metode uji</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-charcoal/10 max-sm:block max-sm:py-4 max-sm:first:border-t">
                        <th scope="row" className="py-4 pr-6 align-top text-[0.9375rem] font-semibold text-charcoal max-sm:block max-sm:py-0">
                          {row.label}
                        </th>
                        <td className="py-4 pr-6 align-top leading-relaxed text-charcoal max-sm:block max-sm:pt-1 max-sm:pb-0">{row.value}</td>
                        {hasUnit && <td className="py-4 pr-6 align-top text-charcoal max-sm:block max-sm:pt-1 max-sm:pb-0">{row.unit}</td>}
                        {hasMethod && <td className="py-4 align-top text-charcoal max-sm:block max-sm:pt-1 max-sm:pb-0">{row.testMethod}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
