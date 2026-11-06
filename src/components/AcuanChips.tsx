import { pickLocale, type Locale } from "@/lib/i18n"
import { ui, type Product } from "@/lib/fixtures"

export function AcuanChips({ product, locale }: { product: Product; locale: Locale }) {
  const chips = (product.displayChips ?? [])
    .map((chip) => pickLocale(chip, locale))
    .filter((chip) => chip.length > 0)
  if (chips.length === 0) return null

  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label={pickLocale(ui.acuanTitle, locale)}>
      {chips.map((chip) => (
        <li key={chip} className="caption-3 border border-hairline px-2 py-1 text-charcoal">
          {chip}
        </li>
      ))}
    </ul>
  )
}
