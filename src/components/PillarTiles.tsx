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
  /** Home, right under the hero: white cards (4:3 photo, title, one line, one → link) on ivory. No curve, no overlap. */
  straddle?: boolean
}) {
  // Home: white cards, 8px radius + hairline; photo 4:3 with a 12px top radius (DESIGN.md §11); one → link.
  // No scroll-reveal here: these cards sit at the first-screen fold, where a half-faded card fails text contrast.
  const whiteCards = (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.key}>
          <Link
            href={item.href}
            className="group flex h-full flex-col rounded-[8px] rounded-t-[12px] border border-hairline bg-white motion-safe:transition-colors motion-safe:duration-200 hover:border-hover-line"
          >
            <Photo
              image={item.image}
              locale={locale}
              aspect="aspect-[4/3]"
              rounded={false}
              className="rounded-t-[12px]"
              zoom
              sizes="(min-width: 1440px) 411px, (min-width: 768px) 31vw, 100vw"
            />
            <div className="flex flex-1 flex-col p-6 lg:p-7">
              <h3 className="display display-h3 text-forest">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              <span className="text-link mt-auto pt-2 text-leaf">
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
      <section id={id} className="bg-ivory">
        {/* Heading kept for screen readers / outline; visually the cards follow straight on from the hero. */}
        <div className="sr-only">
          <p>{label}</p>
          {title && <h2>{title}</h2>}
        </div>
        <div className="site-wrap py-16 lg:py-20">{whiteCards}</div>
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
