import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { notFoundCopy } from "@/lib/not-found-copy"

/** Localized 404 body (server component). Locale comes from the parent segment / global-not-found. */
export function NotFoundView({ locale }: { locale: Locale }) {
  return (
    <div className="band-lime">
      <div className="site-wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="label">404</p>
        <h1 className="display display-h1 mt-4 text-forest">{pickLocale(notFoundCopy.title, locale)}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{pickLocale(notFoundCopy.body, locale)}</p>
        <Link
          href={`/${locale}`}
          className="mt-10 inline-flex min-h-12 items-center rounded-[8px] btn-lime bg-lime px-6 text-sm font-semibold text-forest hover:bg-lime-tint"
        >
          {pickLocale(notFoundCopy.home, locale)}
        </Link>
      </div>
    </div>
  )
}
