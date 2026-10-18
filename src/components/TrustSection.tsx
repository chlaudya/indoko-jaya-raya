import { pickLocale, type Locale } from "@/lib/i18n"
import type { StatItem, TrustItem } from "@/lib/fixtures"
import { StatsStrip, visibleStats } from "@/components/StatsStrip"

/**
 * Home trust block: "Why choose us" cards (CMS: home.trustPoints) above the trust stats row (CMS: home.stats).
 * Each half hides on its own when empty; the whole section hides when both are.
 */
export function TrustSection({
  locale,
  title,
  statsLabel,
  points,
  stats,
}: {
  locale: Locale
  title: string
  statsLabel?: string
  points: TrustItem[]
  stats: StatItem[]
}) {
  const cards = points.filter((p) => pickLocale(p.title, locale))
  const hasStats = visibleStats(stats, locale).length > 0
  if (cards.length === 0 && !hasStats) return null
  return (
    <section className="bg-ivory" aria-labelledby="why-choose-title">
      <div className="site-wrap section-y">
        {cards.length > 0 && (
          <>
            <h2 id="why-choose-title" className="display display-h2 text-center text-forest">
              {title}
            </h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
              {cards.map((card, index) => (
                <li key={index} className="reveal rounded-[1.25rem] bg-white p-7 lg:p-9">
                  <span aria-hidden="true" className="nums text-sm font-semibold tracking-[0.12em] text-sage">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-[1.75rem] leading-tight text-forest">{pickLocale(card.title, locale)}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{pickLocale(card.body, locale)}</p>
                </li>
              ))}
            </ol>
          </>
        )}
        {hasStats && (
          <div className={cards.length > 0 ? "mt-16 border-t border-forest/10 pt-14 lg:mt-20" : ""}>
            <StatsStrip locale={locale} label={statsLabel} stats={stats} />
          </div>
        )}
      </div>
    </section>
  )
}
