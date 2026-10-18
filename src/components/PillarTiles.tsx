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
}: {
  locale: Locale
  label: string
  title?: string
  items: PillarTileItem[]
  id?: string
}) {
  return (
    <section id={id} className="bg-white">
      <div className="site-wrap section-y">
        <p className="label">{label}</p>
        {title && <h2 className="display display-h2 mt-4 max-w-3xl text-forest">{title}</h2>}
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
      </div>
    </section>
  )
}
