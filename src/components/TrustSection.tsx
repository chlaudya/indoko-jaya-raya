import { pickLocale, type Locale } from "@/lib/i18n"
import type { StatItem, TrustItem } from "@/lib/fixtures"
import { StatsStrip, visibleStats } from "@/components/StatsStrip"

/** Inline 24px stroke icons (no icon dependency). Keys come from the CMS (trustPoint.icon); unknown keys show none. */
const ICONS: Record<string, React.ReactNode> = {
  // quality sorting: sieve / funnel
  sort: <path d="M4 5h16l-6 7.5V19l-4-2v-4.5L4 5Z" />,
  // farmers & suppliers: two people
  farmers: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" />
    </>
  ),
  // drying: sun over a tarp
  sun: (
    <>
      <circle cx="12" cy="10" r="3.5" />
      <path d="M12 2.5v2M12 15.5v2M4.5 10h2M17.5 10h2M6.7 4.7l1.4 1.4M15.9 13.9l1.4 1.4M6.7 15.3l1.4-1.4M15.9 6.1l1.4-1.4M3 21h18" />
    </>
  ),
  // commodities: grain / seed
  grain: (
    <>
      <path d="M12 21V9" />
      <path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5ZM12 13c3 0 5-2 5-5-3 0-5 2-5 5ZM12 9c-2.2 0-3.5-1.6-3.5-4 2.2 0 3.5 1.6 3.5 4ZM12 9c2.2 0 3.5-1.6 3.5-4-2.2 0-3.5 1.6-3.5 4Z" />
    </>
  ),
  // markets: globe
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5Z" />
    </>
  ),
  // sustainability: leaf
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
      <path d="M5 19l7-7" />
    </>
  ),
}

function TrustIcon({ name, className = "" }: { name?: string; className?: string }) {
  const glyph = name ? ICONS[name] : undefined
  if (!glyph) return null
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {glyph}
    </svg>
  )
}

/**
 * Home trust block: "Why choose us" cards (CMS: home.trustPoints), then the trust stats row (CMS: home.stats; only
 * shown when filled, never invented) and the descriptive icon strip (CMS: home.iconStrip). Each part hides when empty.
 */
export function TrustSection({
  locale,
  title,
  label,
  statsLabel,
  points,
  stats,
  strip = [],
}: {
  locale: Locale
  title: string
  label?: string
  statsLabel?: string
  points: TrustItem[]
  stats: StatItem[]
  strip?: TrustItem[]
}) {
  const cards = points.filter((p) => pickLocale(p.title, locale))
  const stripItems = strip.filter((p) => pickLocale(p.title, locale))
  const hasStats = visibleStats(stats, locale).length > 0
  if (cards.length === 0 && !hasStats && stripItems.length === 0) return null
  return (
    <section className="bg-ivory" aria-labelledby="why-choose-title">
      <div className="site-wrap section-y">
        {label && <p className="label">{label}</p>}
        <h2 id="why-choose-title" className={`display display-h2 max-w-3xl text-balance text-forest ${label ? "mt-4" : ""}`}>
          {title}
        </h2>
        {cards.length > 0 && (
          <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {cards.map((card, index) => (
              <li key={index} className="reveal flex gap-5 rounded-[8px] border border-hairline bg-white p-6 lg:p-8">
                <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-ivory text-leaf">
                  <TrustIcon name={card.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="display text-[1.5rem] leading-tight text-forest">{pickLocale(card.title, locale)}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{pickLocale(card.body, locale)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {hasStats && (
          <div className="mt-16 border-t border-hairline pt-14 lg:mt-20">
            <StatsStrip locale={locale} label={statsLabel} stats={stats} />
          </div>
        )}
        {stripItems.length > 0 && (
          <ul className="mt-16 grid gap-x-6 gap-y-10 border-t border-hairline pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:pt-14">
            {stripItems.map((item, index) => (
              <li key={index} className="reveal flex gap-4 lg:flex-col lg:gap-3">
                <TrustIcon name={item.icon} className="size-7 shrink-0 text-leaf" />
                <div>
                  <h3 className="text-base font-semibold text-forest">{pickLocale(item.title, locale)}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{pickLocale(item.body, locale)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
