import { pickLocale, type Locale } from "@/lib/i18n"
import { ui, type Product, type SpecRow } from "@/lib/fixtures"
import type { ReferenceSpecTable } from "@/lib/acuan-umum"
import { SpecTabs } from "./SpecTabs"
import { WaButton } from "./WaButton"

type LString = Partial<Record<Locale, string>>

/** Reference rows: own locale → en (zh/vi/hi draft fallback) → id. */
function pickRef(field: LString | undefined, locale: Locale): string {
  if (!field) return ""
  return (field[locale] || field.en || field.id || "").trim()
}

function formatValueOnly(row: Pick<SpecRow, "value" | "min" | "max">, locale: Locale): string {
  const explicit = row.value ? pickLocale(row.value, locale) : ""
  if (explicit) return explicit
  if (typeof row.min === "number" && typeof row.max === "number") return `${row.min}–${row.max}`
  if (typeof row.min === "number") return `≥${row.min}`
  if (typeof row.max === "number") return `≤${row.max}`
  return ""
}

type Row = { label: string; value: string; unit: string; linkTo?: string }

const cell = "py-4 pr-6 align-top leading-relaxed text-charcoal max-sm:block max-sm:pt-1 max-sm:pb-0"

function SpecTable({ caption, rows, locale, valueHead }: { caption: string; rows: Row[]; locale: Locale; valueHead: string }) {
  const hasUnit = rows.some((row) => row.unit)
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{caption}</caption>
      <thead className="max-sm:sr-only">
        <tr className="border-y border-hairline">
          <th scope="col" className="label py-3 pr-6 font-semibold sm:w-[16rem]">{pickLocale(ui.specParameter, locale)}</th>
          <th scope="col" className="label py-3 pr-6 font-semibold">{valueHead}</th>
          {hasUnit && <th scope="col" className="label py-3 font-semibold sm:w-[7rem]">{pickLocale(ui.specUnit, locale)}</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className="border-b border-hairline max-sm:block max-sm:py-4 max-sm:first:border-t">
            <th scope="row" className="py-4 pr-6 align-top text-[0.9375rem] font-semibold text-charcoal max-sm:block max-sm:py-0">
              {row.label}
            </th>
            <td className={`${cell} tabular-nums`}>
              {row.linkTo ? (
                <a href={`#${row.linkTo}`} className="underline underline-offset-4 hover:text-forest">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </td>
            {hasUnit && <td className={`${cell} tabular-nums`}>{row.unit}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ReferencePanel({ table, locale, productName, multi }: { table: ReferenceSpecTable; locale: Locale; productName: string; multi: boolean }) {
  const formName = pickRef(table.heading, locale)
  const rows: Row[] = table.rows
    .map((row) => ({ label: pickRef(row.label, locale), value: pickRef(row.value, locale), unit: pickRef(row.unit, locale), linkTo: row.linkTo }))
    .filter((row) => row.label && row.value)
  return (
    <>
      <SpecTable caption={formName} rows={rows} locale={locale} valueHead={pickLocale(ui.specRange, locale)} />
      {(table.subTables ?? []).map((sub) => (
        <div key={sub.anchor} id={sub.anchor} className="mt-10 max-w-xl scroll-mt-28 text-sm">
          <table className="w-full border-collapse text-left">
            <caption className="mb-3 text-left font-semibold text-charcoal">{pickRef(sub.caption, locale)}</caption>
            <thead>
              <tr className="border-y border-hairline">
                <th scope="col" className="label py-2 pr-6 font-semibold">{pickRef(sub.columns[0], locale)}</th>
                <th scope="col" className="label py-2 font-semibold">{pickRef(sub.columns[1], locale)}</th>
              </tr>
            </thead>
            <tbody>
              {sub.rows.map(([label, value], i) => (
                <tr key={i} className="border-b border-hairline">
                  <th scope="row" className="py-2 pr-6 font-medium text-charcoal">{pickRef(label, locale)}</th>
                  <td className="py-2 tabular-nums text-charcoal">{pickRef(value, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="mt-8">
        <WaButton
          locale={locale}
          templateKey="productPage"
          tokens={{ productName: multi ? `${productName} – ${formName}` : productName }}
          label={pickLocale(ui.acuanCta, locale)}
          variant="primary"
        />
      </div>
      {table.standards && table.standards.length > 0 && (
        <p className="mt-5 text-xs text-muted">
          {pickLocale(ui.acuanStandards, locale)} {table.standards.join(", ")}.
        </p>
      )}
    </>
  )
}

/**
 * Spec section (design doc §8). Confirmed rows always win → "Spesifikasi Indoko", no note / tag.
 * Otherwise Brief v2 reference rows (source "reference") → "Acuan Umum Pasar" + tag + note. Neither → null.
 */
export function ProductSpecifications({ product, locale, productName }: { product: Product; locale: Locale; productName: string }) {
  const confirmed: Row[] = product.specs
    .filter((row) => row.confirmed === true)
    .map((row) => ({
      label: pickLocale(row.label, locale).trim(),
      value: formatValueOnly(row, locale).trim(),
      unit: row.unit ? pickLocale(row.unit, locale).trim() : "",
    }))
    .filter((row) => row.label && row.value)
  const reference = confirmed.length === 0 ? (product.referenceSpecTables ?? []).filter((t) => t.rows.length > 0) : []
  if (confirmed.length === 0 && reference.length === 0) return null

  const isReference = confirmed.length === 0
  const title = pickLocale(isReference ? ui.acuanTitle : ui.indokoSpecs, locale)
  const multi = reference.length > 1

  return (
    <section className="bg-ivory" aria-labelledby="product-specs-title">
      <div className="site-wrap section-y">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="product-specs-title" className="display display-h2 text-forest">{title}</h2>
            {isReference && (
              <span className="inline-flex items-center rounded-[6px] border border-hairline px-2.5 py-1 text-xs font-medium text-muted">
                {pickLocale(ui.acuanTag, locale)}
              </span>
            )}
          </div>
          {isReference && <p className="mt-4 max-w-[70ch] leading-relaxed text-muted">{pickLocale(ui.acuanNote, locale)}</p>}

          {!isReference && (
            <div className="mt-8">
              <SpecTable caption={title} rows={confirmed} locale={locale} valueHead={pickLocale(ui.specValue, locale)} />
            </div>
          )}
          {isReference && multi && (
            <SpecTabs
              idBase={`spec-${product.slug}`}
              label={title}
              tabs={reference.map((t) => ({ label: pickRef(t.heading, locale), meta: pickRef(t.meta, locale) || undefined }))}
              panels={reference.map((t) => (
                <ReferencePanel key={t.key} table={t} locale={locale} productName={productName} multi />
              ))}
            />
          )}
          {isReference && !multi && (
            <div className="mt-8">
              <ReferencePanel table={reference[0]} locale={locale} productName={productName} multi={false} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
