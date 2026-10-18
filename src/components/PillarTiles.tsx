import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import type { ImageKey } from "@/lib/images"
import { ui } from "@/lib/fixtures"
import { Photo } from "./Photo"

export type PillarTileItem = { key: string; title: string; body: string; href: string; image?: ImageKey }

/** Three big image tiles with overlaid title + arrow (people / products / planet). */
export function PillarTiles({
  locale,
  label,
  title,
  items,
  id,
  straddle = false,
}: {
  locale: Locale
  label: string
  title?: string
  items: PillarTileItem[]
  id?: string
  /**
   * Home, right under the hero: the hero green carries on behind the top half of the cards, then a
   * cream (mist) curve cuts across so the cards sit half on green, half on cream (Cargill-style).
   */
  straddle?: boolean
}) {
  // Home: white cards (2:1 photo on top, then label, title and Discover on white), ~25% shorter than the
  // 4:5 tiles, so they can straddle the green → cream curve. Text sizes match the overlaid tiles.
  const whiteCards = (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.key} className="reveal">
          <Link
            href={item.href}
            className="group block overflow-hidden rounded-[8px] bg-white shadow-[0_18px_40px_-24px_rgba(13,30,22,0.45)]"
          >
            <Photo
              image={item.image}
              locale={locale}
              aspect="aspect-[2/1]"
              rounded={false}
              zoom
              sizes="(min-width: 1376px) 410px, (min-width: 768px) 31vw, 100vw"
            />
            <div className="p-6 lg:p-7">
              <p className="label text-leaf">{label}</p>
              <h3 className="display display-h3 mt-2 text-[clamp(1.75rem,2.6vw,2.25rem)] text-forest">{item.title}</h3>
              <span className="text-link mt-1 text-leaf">
                <span className="group-hover:underline">{pickLocale(ui.discover, locale)}</span>
                <span aria-hidden="true" className="arrow">→</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )

  const list = (
    <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
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

  if (straddle) {
    return (
      <section id={id} className="relative bg-mist lg:mt-[calc(-1*var(--pillar-pull))]">
        {/* Heading kept for screen readers / outline; visually the cards read as the hero's continuation. */}
        <div className="sr-only">
          <p>{label}</p>
          {title && <h2>{title}</h2>}
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 -top-px h-[calc(var(--pillar-split)+1px)] bg-hero-green" />
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[var(--pillar-split)] block h-[var(--band-curve)] w-full"
        >
          {/* Green bottom edge: deep on the left, cream sweeping up toward the right. */}
          <path d="M0,0 H1440 V8 C1080,40 560,170 0,130 Z" fill="var(--color-hero-green)" />
        </svg>
        <div className="site-wrap relative pt-2 pb-16 lg:pb-24">{whiteCards}</div>
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
