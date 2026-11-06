import { pickLocale, type Locale } from "@/lib/i18n";
import type { StatItem, TrustItem } from "@/lib/fixtures";
import { StatsStrip, visibleStats } from "@/components/StatsStrip";

/** Inline 24px stroke icons (no icon dependency). Keys come from the CMS (trustPoint.icon); unknown keys show none. */
const ICONS: Record<string, React.ReactNode> = {
  // quality sorting: sieve / funnel
  sort: <path d="M4 5h16l-6 7.5V19l-4-2v-4.5L4 5Z" />,
  // icon strip: one person
  person: (
    <>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.5v-1a6.5 6.5 0 0 1 13 0v1" />
    </>
  ),
  // icon strip: flower
  flower: (
    <>
      <path d="M12 21.5V10" />
      <path d="M12 14.2c-2.6.4-4.2 2-4.6 3.6" />
      <path d="M12 15.6c2.2.4 3.6 1.6 4 3.2" />
      <path d="M12 10c-2-2.6-1.5-5.4.2-6.2 1.4 1.6 1.6 4-.2 6.2Z" />
      <path d="M12 10c2-2.6 1.5-5.4-.2-6.2-1.4 1.6-1.6 4 .2 6.2Z" />
    </>
  ),
  // competitive price: tag
  price: (
    <>
      <path d="M20.2 13.2 11.2 4.2H4.5v6.7l9 9a1.2 1.2 0 0 0 1.7 0l5-5a1.2 1.2 0 0 0 0-1.7Z" />
      <circle cx="8.2" cy="8.2" r="1" />
    </>
  ),
  // fleet: truck
  fleet: (
    <>
      <path d="M3 7.5h10.5V16H3z" />
      <path d="M13.5 10.5H18l2.5 3v2.5H13.5" />
      <circle cx="7" cy="17.5" r="1.4" />
      <circle cx="17.2" cy="17.5" r="1.4" />
    </>
  ),
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
};

function TrustIcon({
  name,
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  const glyph = name ? ICONS[name] : undefined;
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {glyph}
    </svg>
  );
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
  locale: Locale;
  title: string;
  label?: string;
  statsLabel?: string;
  points: TrustItem[];
  stats: StatItem[];
  strip?: TrustItem[];
}) {
  const cards = points.filter((p) => pickLocale(p.title, locale));
  const stripItems = strip.filter((p) => pickLocale(p.title, locale));
  const hasStats = visibleStats(stats, locale).length > 0;
  if (cards.length === 0 && !hasStats && stripItems.length === 0) return null;
  return (
    <section aria-labelledby="why-choose-title">
      <div className="surface-lime text-charcoal">
        <div className="site-wrap section-y">
          {label && <p className="label">{label}</p>}
          <h2
            id="why-choose-title"
            className={`heading-2 max-w-[680px] text-balance ${label ? "mt-6" : ""}`}
          >
            {title}
          </h2>
          {cards.length > 0 && (
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-x-12">
              {cards.map((card, index) => (
                <li key={index} className="reveal">
                  <div className="flex items-center gap-4">
                    <span className="heading-5 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <TrustIcon name={card.icon} className="size-12 text-charcoal" />
                  </div>
                  <h3 className="heading-5 mt-6 text-balance">{pickLocale(card.title, locale)}</h3>
                  <p className="body-3 mt-4 max-w-sm text-pretty">{pickLocale(card.body, locale)}</p>
                </li>
              ))}
            </ol>
          )}
          {hasStats && (
            <div className="mt-16 border-t border-hairline pt-14 lg:mt-20">
              <StatsStrip locale={locale} label={statsLabel} stats={stats} />
            </div>
          )}
        </div>
      </div>
      {stripItems.length > 0 && (
        <div className="bg-charcoal text-ivory">
          <ul className="site-wrap grid sm:grid-cols-2 lg:grid-cols-4">
            {stripItems.map((item, index) => (
              <li
                key={index}
                className="reveal border-ivory/20 py-8 first:border-t-0 max-sm:border-t sm:px-8 sm:py-16 sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:pt-10 lg:border-l lg:px-10 lg:py-16 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 lg:[&:nth-child(n+3)]:border-t-0 lg:[&:nth-child(n+3)]:pt-16"
              >
                <TrustIcon name={item.icon} className="size-8 text-lime" />
                <h3 className="heading-5 mt-6 text-balance">{pickLocale(item.title, locale)}</h3>
                <p className="body-6 mt-3 max-w-xs text-pretty text-ivory/80">
                  {pickLocale(item.body, locale)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
