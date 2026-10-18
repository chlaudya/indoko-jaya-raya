import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import type { ImageKey } from "@/lib/images"
import { ui } from "@/lib/fixtures"
import { Photo } from "./Photo"

export type PillarTileItem = { key: string; title: string; body: string; href: string; image?: ImageKey }

/** Forest→white edge (right high, sweeping down to the left), viewBox 1440×160. */
const BAND_EDGE = "M1440 0C1180 30 760 160 0 150"

/** Three big image tiles with overlaid title + arrow (people / products / planet). */
export function PillarTiles({
  locale,
  label,
  title,
  items,
  id,
  overlap = false,
}: {
  locale: Locale
  label: string
  title?: string
  items: PillarTileItem[]
  id?: string
  /** Header on forest; cards straddle a curve from forest (top half) to white (bottom half). */
  overlap?: boolean
}) {
  const list = (
    <ul className={`grid gap-6 md:grid-cols-3 ${overlap ? "" : "mt-12 lg:mt-16"}`}>
      {items.map((item) => (
        <li key={item.key} className="reveal">
          <Link href={item.href} className="group relative block overflow-hidden rounded-[8px] text-white">
            <Photo
              image={item.image}
              locale={locale}
              aspect="aspect-[4/5]"
              rounded={false}
              zoom
              sizes="(min-width: 1376px) 410px, (min-width: 768px) 31vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(13,30,22,0.9)] via-[rgba(13,30,22,0.25)] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <h3 className="display display-h3 text-[clamp(1.75rem,2.6vw,2.25rem)]">{item.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/85">{item.body}</p>
              <span className="text-link mt-2 text-white">
                <span className="group-hover:underline">{pickLocale(ui.discover, locale)}</span>
                <span aria-hidden="true" className="arrow">→</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )

  if (overlap) {
    return (
      <section id={id} className="relative bg-white">
        <div className="bg-forest text-white">
          <div className="site-wrap pb-12 lg:pb-16">
            <p className="label text-soft-sage!">{label}</p>
            {title && <h2 className="display display-h2 mt-4 max-w-3xl text-white">{title}</h2>}
          </div>
        </div>
        <div className="relative">
          {/* Forest continues behind the top half of the cards (--pillar-split), then curves down to white. */}
          <div aria-hidden="true" className="absolute inset-x-0 -top-px h-[calc(var(--pillar-split)+2px)] bg-forest" />
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-[var(--pillar-split)] block h-[var(--band-curve)] w-full"
          >
            <path d="M0 0H1440C1180 30 760 160 0 150Z" fill="var(--color-forest)" />
            <path d={BAND_EDGE} transform="translate(0 10)" fill="none" stroke="#a8b89c" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="site-wrap relative pb-16 lg:pb-24">{list}</div>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="bg-white">
      <div className="site-wrap section-y">
        <p className="label">{label}</p>
        {title && <h2 className="display display-h2 mt-4 max-w-3xl text-forest">{title}</h2>}
        {list}
      </div>
    </section>
  )
}
