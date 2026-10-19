import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LocalizedCopy } from "@/components/RichText"
import { CareerApply } from "@/components/CareerApply"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import { getJob, hasCopy } from "@/lib/jobs"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) return {}
  const job = await getJob(slug)
  if (!job) return {}
  return {
    title: pickLocale(job.title, raw),
    description: pickLocale(job.shortBlurb, raw),
  }
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const job = await getJob(slug)
  if (!job || job.status !== "active") notFound()

  const title = pickLocale(job.title, locale)
  const location = pickLocale(job.location, locale)

  return (
    <article className="bg-white">
      <div className="site-wrap pt-10 pb-20 lg:pt-14 lg:pb-28">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href={`/${locale}`} className="hover:text-charcoal hover:underline">
                {pickLocale(ui.home, locale)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${locale}/careers`} className="hover:text-charcoal hover:underline">
                {pickLocale(ui.careersLabel, locale)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-charcoal" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {location && (
              <>
                <p className="label">{pickLocale(ui.location, locale)}</p>
                <p className="mt-2 text-charcoal">{location}</p>
              </>
            )}
            <h1 className="display display-h1 mt-6 text-forest">{title}</h1>
            {pickLocale(job.shortBlurb, locale) && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{pickLocale(job.shortBlurb, locale)}</p>
            )}
            <div className="mt-8">
              <CareerApply locale={locale} position={title} location={location} />
            </div>

            {hasCopy(job.description, locale) && (
              <section className="mt-14 border-t border-charcoal/15 pt-10">
                <h2 className="label">{pickLocale(ui.roleDescription, locale)}</h2>
                <div className="mt-4">
                  <LocalizedCopy value={job.description} locale={locale} />
                </div>
              </section>
            )}

            {hasCopy(job.qualifications, locale) && (
              <section className="mt-12 border-t border-charcoal/15 pt-10">
                <h2 className="label">{pickLocale(ui.qualifications, locale)}</h2>
                <div className="mt-4">
                  <LocalizedCopy value={job.qualifications} locale={locale} />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
