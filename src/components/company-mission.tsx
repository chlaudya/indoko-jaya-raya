import type { Locale } from "@/lib/i18n"
import type { ImageKey } from "@/lib/images"

import { Photo } from "./Photo"
import { TextLink } from "./TextLink"

export function CompanyMission({
  locale,
  image,
  label,
  title,
  body,
  missionLabel,
  points,
  link,
}: {
  locale: Locale
  image: ImageKey
  label: string
  title: string
  body: string
  missionLabel: string
  points: string[]
  link: { href: string; label: string }
}) {
  return (
    <section className="bg-white">
      <div className="site-wrap section-y grid items-start gap-12 lg:grid-cols-12 lg:gap-6">
        <Photo
          image={image}
          locale={locale}
          sizes="(min-width: 1280px) 630px, (min-width: 1024px) 50vw, 100vw"
          aspect="aspect-[4/3]"
          rounded={false}
          className="reveal lg:col-span-6"
        />
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="label">{label}</p>
          <h2 className="heading-3 mt-6 text-balance">{title}</h2>
          <p className="body-3 mt-6 text-pretty text-muted">{body}</p>
          <p className="caption-3 mt-10 uppercase tracking-[0.12em]">
            {missionLabel}
          </p>
          <ol className="mt-4">
            {points.map((point, index) => (
              <li
                key={point}
                className="body-2 grid grid-cols-[32px_1fr] gap-4 border-t border-charcoal/20 py-4 first:border-t-0"
              >
                <span className="caption-3 pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty">{point}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <TextLink href={link.href}>{link.label}</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
