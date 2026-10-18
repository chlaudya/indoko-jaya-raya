import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { jobs, pages, redesign, ui } from "@/lib/fixtures"
import { CareerCard } from "@/components/CareerCard"
import { HeroFullBleed } from "@/components/HeroFullBleed"
import { InquirySection } from "@/components/InquirySection"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return {
    title: pickLocale(pages.careers.heroTitle, raw),
    description: pickLocale(pages.careers.heroLead, raw),
  }
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const active = jobs.filter((job) => job.status === "active")

  return (
    <div>
      <HeroFullBleed
        locale={locale}
        image="sectionTruckLoading"
        height="medium"
        eyebrow={pickLocale(ui.growWithUs, locale)}
        title={pickLocale(pages.careers.heroTitle, locale)}
        lead={pickLocale(pages.careers.heroLead, locale)}
      />

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

      {/* Job rows */}
      <section className="bg-white">
        <div className="site-wrap section-y">
          <h2 className="display display-h2 text-forest">{pickLocale(ui.openPositions, locale)}</h2>
          <ul className="mt-10 border-b border-charcoal/15">
            {active.map((job) => (
              <CareerCard key={job.slug} job={job} locale={locale} />
            ))}
          </ul>
        </div>
      </section>

      <InquirySection locale={locale} title={pickLocale(ui.contactTeam, locale)} />
    </div>
  )
}
