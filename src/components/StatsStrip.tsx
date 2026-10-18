import { pickLocale, type Locale } from "@/lib/i18n"
import type { StatItem } from "@/lib/fixtures"

/** Display rule: an entry shows only when it has a value and a label in this locale (fallbacks included). */
export function visibleStats(stats: StatItem[], locale: Locale): StatItem[] {
  return stats.filter((s) => s.value?.trim() && pickLocale(s.label, locale).trim())
}

/**
 * Trust stats row. Shows whichever stats are filled (1–4) and re-centres; renders nothing when none are filled.
 * Dividers sit only between visible items (md+), so a short row has no blank columns or stray rules.
 */
export function StatsStrip({ locale, label, stats }: { locale: Locale; label?: string; stats: StatItem[] }) {
  const items = visibleStats(stats, locale)
  if (items.length === 0) return null
  return (
    <div data-stats-row data-count={items.length}>
      {label && <h3 className="label text-center">{label}</h3>}
      <dl className="mx-auto mt-8 grid grid-cols-2 gap-y-10 md:flex md:justify-center md:divide-x md:divide-forest/15 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1">
        {items.map((stat, index) => (
          <div key={index} data-stat className="reveal flex flex-col items-center px-4 text-center md:w-[15rem] md:px-8">
            <dt className="order-2 mt-3 text-sm leading-snug text-muted">{pickLocale(stat.label, locale)}</dt>
            <dd className="display nums order-1 text-[clamp(2.75rem,4.5vw,4rem)] leading-none text-forest">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
