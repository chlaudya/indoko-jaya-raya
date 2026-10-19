import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import { hasCopy, type Job } from "@/lib/jobs"
import { CareerApply } from "./CareerApply"
import { LocalizedCopy } from "./RichText"

/** Short preview of a rich-text field: a few lines, faded out; the detail page shows it in full. */
function Preview({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h4 className="label">{heading}</h4>
      <div className="mt-2 max-h-[7.5rem] overflow-hidden text-[0.9375rem] [mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
        {children}
      </div>
    </div>
  )
}

/** Job row (Sanity): position, location, description and qualifications previews, apply via WhatsApp, detail link. */
export function CareerCard({ job, locale }: { job: Job; locale: Locale }) {
  const title = pickLocale(job.title, locale)
  const location = pickLocale(job.location, locale)
  const href = `/${locale}/careers/${job.slug}`
  const more = pickLocale(ui.viewPositions, locale)

  return (
    <li className="border-t border-charcoal/15 py-10">
      <article className="grid gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <h3 className="display display-h3 text-forest">
            <Link href={href} className="hover:underline hover:underline-offset-4">
              {title}
            </Link>
          </h3>
          {location && (
            <p className="mt-3 text-sm">
              <span className="label mr-2">{pickLocale(ui.location, locale)}</span>
              <span className="text-charcoal">{location}</span>
            </p>
          )}
          {hasCopy(job.description, locale) && (
            <Preview heading={pickLocale(ui.roleDescription, locale)}>
              <LocalizedCopy value={job.description} locale={locale} />
            </Preview>
          )}
          {hasCopy(job.qualifications, locale) && (
            <Preview heading={pickLocale(ui.qualifications, locale)}>
              <LocalizedCopy value={job.qualifications} locale={locale} />
            </Preview>
          )}
        </div>
        <div className="flex flex-col items-start gap-3 md:col-span-4 md:items-end">
          <CareerApply locale={locale} position={title} location={location} />
          <Link href={href} aria-label={`${more}: ${title}`} className="text-link text-forest">
            <span>{more}</span>
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
        </div>
      </article>
    </li>
  )
}
