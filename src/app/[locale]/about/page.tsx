import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, redesign, ui } from "@/lib/fixtures"
import type { ImageKey } from "@/lib/images"
import { FeatureSplit } from "@/components/FeatureSplit"
import { HeroFullBleed } from "@/components/HeroFullBleed"
import { InquirySection } from "@/components/InquirySection"
import { TextLink } from "@/components/TextLink"

const strengthImages: ImageKey[] = ["sectionCashewSorting", "sectionSortingMachine", "sectionWarehouseStock", "sectionTruckLoading"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return withLocaleAlternates(raw, "about", pageMeta("about", raw))
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.about

  return (
    <div>
      <HeroFullBleed
        locale={locale}
        image="heroWarehouse"
        height="medium"
        eyebrow={pickLocale(content.heroTitle, locale)}
        title={pickLocale(pages.home.introStatement, locale)}
        lead={pickLocale(content.heroLead, locale)}
      />

      {/* Long-form story in a narrow editorial column with pull-quote */}
      <section className="band-lime">
        <div className="site-wrap section-y">
          <div className="mx-auto max-w-[68ch]">
            <h2 className="label">{pickLocale(ui.ourStory, locale)}</h2>
            <p className="mt-6 text-xl leading-relaxed text-charcoal lg:text-2xl lg:leading-relaxed">{pickLocale(content.story, locale)}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{pickLocale(pages.home.sustainabilityBody, locale)}</p>
            <blockquote className="my-12 min-w-0 border-l-2 border-sage pl-6 lg:-ml-16 lg:pl-14">
              <p className="display display-h2 text-pretty break-words text-forest">“{pickLocale(redesign.about.pullQuote, locale)}”</p>
              <footer className="label mt-4">PT Indoko Jaya Raya</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Visi & Misi: one column on small screens, two from md, min-w-0 so long words cannot force overflow. */}
      <section className="surface-dark bg-forest text-white">
        <div className="site-wrap section-y">
          <p className="label">{pickLocale(ui.visionMission, locale)}</p>
          <dl className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div className="min-w-0">
              <dt className="label">{pickLocale(ui.vision, locale)}</dt>
              <dd className="mt-4 text-pretty break-words text-lg leading-relaxed text-white/90">{pickLocale(content.vision, locale)}</dd>
            </div>
            <div className="min-w-0">
              <dt className="label">{pickLocale(ui.mission, locale)}</dt>
              <dd className="mt-4 text-pretty break-words text-lg leading-relaxed text-white/90">{pickLocale(content.mission, locale)}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Alternating strengths */}
      <section className="bg-white">
        <div className="site-wrap pt-16 lg:pt-24">
          <p className="label">{pickLocale(ui.strengths, locale)}</p>
          <h2 className="display display-h2 mt-4 max-w-3xl text-forest">{pickLocale(ui.whyPartner, locale)}</h2>
        </div>
      </section>
      {pages.home.pillars.map((pillar, index) => (
        <FeatureSplit
          key={index}
          locale={locale}
          image={strengthImages[index]}
          reverse={index % 2 === 1}
          surface={index % 2 === 1 ? "ivory" : "white"}
          eyebrow={String(index + 1).padStart(2, "0")}
          title={pickLocale(pillar.title, locale)}
          body={pickLocale(pillar.body, locale)}
          headingLevel="h3"
        />
      ))}

      {/* Link band → company profile */}
      <section className="border-y border-hairline bg-ivory">
        <div className="site-wrap flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between lg:py-16">
          <div>
            <p className="label">{pickLocale(ui.companyProfile, locale)}</p>
            <p className="display display-h3 mt-3 max-w-2xl text-forest">{pickLocale(pages.company.profileLead, locale)}</p>
          </div>
          <TextLink href={`/${locale}/company`}>{pickLocale(ui.companyProfile, locale)}</TextLink>
        </div>
      </section>

      <InquirySection locale={locale} title={pickLocale(pages.home.inquiryTitle, locale)} />
    </div>
  )
}
