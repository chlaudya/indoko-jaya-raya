import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, redesign, ui } from "@/lib/fixtures"
import { getActiveJobs } from "@/lib/jobs"
import { CareerCard } from "@/components/CareerCard"
import { HeroFullBleed } from "@/components/HeroFullBleed"
import { InquirySection } from "@/components/InquirySection"
import { WaButton } from "@/components/WaButton"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return withLocaleAlternates(raw, "careers", pageMeta("careers", raw))
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const active = await getActiveJobs()

  return (
    <div>
      <HeroFullBleed
        locale={locale}
        image="heroFarmersSorting"
        imagePosition="center 42%"
        height="medium"
        eyebrow={pickLocale(ui.growWithUs, locale)}
        title={pickLocale(pages.careers.heroTitle, locale)}
        lead={pickLocale(pages.careers.heroLead, locale)}
      />

      {/* Job rows */}
      <section className="band-lime">
        <div className="site-wrap pt-16 pb-24 lg:pb-32">
          <h2 className="display display-h2 text-forest">{pickLocale(ui.openPositions, locale)}</h2>
          {active.length === 0 ? (
            // Empty state: no active job in Sanity (no placeholder jobs). General WhatsApp contact instead.
            <div className="mt-10 max-w-xl border-t border-charcoal/15 pt-10">
              <p className="text-lg text-charcoal">{pickLocale(ui.noOpenPositions, locale)}</p>
              <p className="mt-2 text-muted">{pickLocale(ui.careersEmptyHint, locale)}</p>
              <div className="mt-6">
                <WaButton locale={locale} templateKey="contact" label={pickLocale(ui.chatOnWhatsApp, locale)} variant="wa" />
              </div>
            </div>
          ) : (
            <ul className="mt-10 border-b border-charcoal/15">
              {active.map((job) => (
                <CareerCard key={job.slug} job={job} locale={locale} />
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Culture band */}
      <section className="bg-ivory">
        <div className="site-wrap section-y">
          <p className="label">{pickLocale(ui.culture, locale)}</p>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {redesign.careers.values.map((value, index) => (
              <li key={index} className="reveal border-t border-forest/20 pt-6">
                <h2 className="display display-h3 text-forest">{pickLocale(value.title, locale)}</h2>
                <p className="mt-3 text-muted">{pickLocale(value.body, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InquirySection locale={locale} title={pickLocale(ui.contactTeam, locale)} />
    </div>
  )
}
