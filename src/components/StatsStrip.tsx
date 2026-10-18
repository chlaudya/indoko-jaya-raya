import { pickLocale, type Locale } from "@/lib/i18n"
import type { StatItem } from "@/lib/fixtures"

/** Big-number impact strip. CMS-driven; renders nothing when there are no stats. */
export function StatsStrip({ locale, label, stats }: { locale: Locale; label?: string; stats: StatItem[] }) {
  const items = stats.filter((s) => s.value && pickLocale(s.label, locale))
  if (items.length === 0) return null
  return (
    <section className="bg-ivory">
      <div className="site-wrap py-16 lg:py-24">
        {label && <p className="label">{label}</p>}
        <dl className={`mt-8 grid gap-10 sm:grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {items.map((stat, index) => (
            <div key={index} className="reveal border-t border-forest/20 pt-6">
              <dt className="sr-only">{pickLocale(stat.label, locale)}</dt>
              <dd>
                <span className="display nums block text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-forest">{stat.value}</span>
                <span aria-hidden="true" className="mt-3 block text-sm text-muted">
                  {pickLocale(stat.label, locale)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
