import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import type { Job } from "@/lib/jobs"

/** Job row. The whole row opens the CMS-backed detail page. */
export function CareerCard({ job, locale }: { job: Job; locale: Locale }) {
  const title = pickLocale(job.title, locale)

  return (
    <li className="border-t border-charcoal/15">
      <Link
        href={`/${locale}/careers/${job.slug}`}
        className="group grid gap-4 py-8 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest md:grid-cols-12 md:items-center md:gap-8"
      >
        <div className="md:col-span-6">
          <h3 className="display display-h3 text-forest">{title}</h3>
          <p className="mt-2 max-w-xl text-sm text-muted">{pickLocale(job.shortBlurb, locale)}</p>
        </div>
        <p className="text-sm md:col-span-3">
          <span className="label mr-2">{pickLocale(ui.location, locale)}</span>
          <span className="text-charcoal">{pickLocale(job.location, locale)}</span>
        </p>
        <span className="text-link text-forest group-hover:underline md:col-span-3 md:w-full md:justify-end">
          <span>{pickLocale(ui.viewPositions, locale)}</span>
          <span aria-hidden="true" className="arrow motion-safe:transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </li>
  )
}
