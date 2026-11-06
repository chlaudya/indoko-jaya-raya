import Link from "next/link"
import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { homeLanding, homeStats, iconStrip, pages, products, redesign, ui, whyChoose } from "@/lib/fixtures"
import type { ImageKey } from "@/lib/images"
import { TrustSection } from "@/components/TrustSection"
import { BuyerFaq } from "@/components/buyer-faq"
import { BuyerProcess } from "@/components/buyer-process"
import { CompanyMission } from "@/components/company-mission"
import { FeatureSplit } from "@/components/FeatureSplit"
import { HeroFullBleed } from "@/components/HeroFullBleed"
import { InquirySection } from "@/components/InquirySection"
import { OperationalProof } from "@/components/operational-proof"
import { SelectedCommodities } from "@/components/selected-commodities"
import { TaglineReveal } from "@/components/tagline-reveal"
import { WaButton } from "@/components/WaButton"

const featureImages: Record<string, ImageKey> = {
  about: "sectionTeamLoading",
  drying: "sectionPeanutTarp",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return withLocaleAlternates(raw, "", pageMeta("home", raw))
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.home
  const v2 = redesign.home
  const selectedProducts = products
    .filter((product) => product.kind === "product" && product.featured)
    .slice(0, 4)
  const drying = products.find((p) => p.kind === "service")
  const dryingFacts = [
    !drying?.capacityPending && drying?.capacity && { label: pickLocale(ui.capacity, locale), value: pickLocale(drying.capacity, locale) },
    drying?.location && { label: pickLocale(ui.location, locale), value: pickLocale(drying.location, locale) },
  ].filter(Boolean) as { label: string; value: string }[]
  const [aboutBlock, dryingBlock] = v2.features
  const faqItems = homeLanding.faqs.map((item) => ({
    question: pickLocale(item.question, locale),
    answer: pickLocale(item.answer, locale),
  }))
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <div>
      <HeroFullBleed
        locale={locale}
        slides={v2.heroSlides}
        eyebrow={pickLocale(content.heroEyebrow, locale)}
        title={pickLocale(homeLanding.heroTitle, locale)}
        titleEmphasis={pickLocale(homeLanding.heroEmphasis, locale)}
        lead={pickLocale(homeLanding.heroLead, locale)}
      >
        <WaButton
          locale={locale}
          templateKey="homeHero"
          label={pickLocale(homeLanding.primaryCta, locale)}
          variant="wa"
        />
        <Link
          href={`/${locale}/products`}
          className="text-link text-white decoration-lime"
        >
          {pickLocale(homeLanding.secondaryCta, locale)}
          <span aria-hidden="true" className="arrow">→</span>
        </Link>
      </HeroFullBleed>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <OperationalProof
        label={pickLocale(homeLanding.proofLabel, locale)}
        items={homeLanding.proofItems.map((item) => pickLocale(item, locale))}
      />

      <TaglineReveal
        label={pickLocale(ui.fromIndonesia, locale)}
        text={pickLocale(homeLanding.tagline, locale)}
      />

      <SelectedCommodities
        locale={locale}
        label={pickLocale(homeLanding.commoditiesLabel, locale)}
        title={pickLocale(homeLanding.commoditiesTitle, locale)}
        body={pickLocale(homeLanding.commoditiesBody, locale)}
        viewAllLabel={pickLocale(ui.viewAllCommodities, locale)}
        products={selectedProducts}
      />

      <TrustSection
        locale={locale}
        label={pickLocale(ui.whyChooseLabel, locale)}
        title={pickLocale(ui.whyChooseUs, locale)}
        points={whyChoose}
        stats={homeStats}
        strip={iconStrip}
      />

      <BuyerProcess
        label={pickLocale(homeLanding.processLabel, locale)}
        title={pickLocale(homeLanding.processTitle, locale)}
        steps={homeLanding.process.map((step) => ({
          title: pickLocale(step.title, locale),
          body: pickLocale(step.body, locale),
        }))}
      />

      {dryingBlock && (
        <FeatureSplit
          locale={locale}
          image={featureImages.drying}
          reverse
          surface="lime"
          eyebrow={pickLocale(ui.ourServices, locale)}
          title={pickLocale(dryingBlock.title, locale)}
          body={pickLocale(dryingBlock.body, locale)}
          facts={dryingFacts}
          link={{
            href: `/${locale}/${dryingBlock.href}`,
            label: pickLocale(dryingBlock.linkLabel, locale),
          }}
        >
          <WaButton
            locale={locale}
            templateKey="homeDrying"
            label={pickLocale(ui.discussRequirements, locale)}
            variant="wa"
          />
        </FeatureSplit>
      )}

      {aboutBlock && (
        <CompanyMission
          locale={locale}
          image={featureImages.about}
          label={pickLocale(aboutBlock.eyebrow, locale)}
          title={pickLocale(aboutBlock.title, locale)}
          body={pickLocale(aboutBlock.body, locale)}
          missionLabel={pickLocale(ui.ourMission, locale)}
          points={v2.missionPoints.map((point) => pickLocale(point, locale))}
          link={{
            href: `/${locale}/${aboutBlock.href}`,
            label: pickLocale(aboutBlock.linkLabel, locale),
          }}
        />
      )}

      <BuyerFaq
        label={pickLocale(homeLanding.faqLabel, locale)}
        title={pickLocale(homeLanding.faqTitle, locale)}
        items={faqItems}
      />

      <InquirySection
        locale={locale}
        eyebrow={pickLocale(ui.bannerLabel, locale)}
        title={pickLocale(content.inquiryTitle, locale)}
        templateKey="homeBanner"
        label={pickLocale(homeLanding.primaryCta, locale)}
        reassurance={pickLocale(ui.bannerReassure, locale)}
      />
    </div>
  )
}
