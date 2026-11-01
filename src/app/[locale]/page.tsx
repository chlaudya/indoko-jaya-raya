import Link from "next/link"
import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { homeStats, iconStrip, pages, products, redesign, ui, whyChoose } from "@/lib/fixtures"
import type { ImageKey } from "@/lib/images"
import { CommodityGrid, HOME_CARD_SIZES } from "@/components/CommodityCard"
import { CommodityFilter } from "@/components/CommodityFilter"
import { FeatureSplit } from "@/components/FeatureSplit"
import { HeroFullBleed } from "@/components/HeroFullBleed"
import { InquirySection } from "@/components/InquirySection"
import { PillarTiles } from "@/components/PillarTiles"
import { PurposeBand } from "@/components/PurposeBand"
import { TrustSection } from "@/components/TrustSection"
import { TextLink } from "@/components/TextLink"
import { WaButton, buttonClass } from "@/components/WaButton"

const pillarImages: Record<string, ImageKey> = {
  people: "cardPillarFarmers",
  products: "cardPillarCornHandful",
  planet: "cardPillarDryingTarp",
}
const featureImages: Record<string, ImageKey> = {
  about: "sectionTeamLoading",
  drying: "sectionPeanutTarp",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return pageMeta("home", raw)
}

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const { locale: raw } = await params
  const { category, q } = await searchParams
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.home
  const v2 = redesign.home
  const query = q?.trim().toLowerCase() || ""
  const commodityList = products.filter((product) => {
    if (product.kind === "service") return false
    if (category && product.category !== category) return false
    if (!query) return true
    const name = pickLocale(product.name, locale).toLowerCase()
    const blurb = pickLocale(product.shortBlurb, locale).toLowerCase()
    return name.includes(query) || blurb.includes(query)
  })
  const drying = products.find((p) => p.kind === "service")
  const dryingFacts = [
    !drying?.capacityPending && drying?.capacity && { label: pickLocale(ui.capacity, locale), value: pickLocale(drying.capacity, locale) },
    drying?.location && { label: pickLocale(ui.location, locale), value: pickLocale(drying.location, locale) },
  ].filter(Boolean) as { label: string; value: string }[]
  const [aboutBlock, dryingBlock] = v2.features

  return (
    <div>
      {/* 1 · Full-bleed slides, one photo at a time. Forest scrim on the left, copy in cols 1–6 */}
      <HeroFullBleed
        locale={locale}
        slides={v2.heroSlides}
        eyebrow={pickLocale(content.heroEyebrow, locale)}
        title={pickLocale(v2.heroTitle, locale)}
        titleEmphasis={pickLocale(v2.heroTitleEmphasis, locale)}
        lead={pickLocale(content.heroLead, locale)}
      >
        <WaButton locale={locale} templateKey="homeHero" label={pickLocale(ui.contactUs, locale)} variant="wa" />
        <Link href={`/${locale}/products`} className={buttonClass("inverse")}>
          {pickLocale(ui.exploreCommodities, locale)}
        </Link>
      </HeroFullBleed>

      {/* 2 · Why choose us, directly under the hero */}
      <TrustSection
        locale={locale}
        label={pickLocale(ui.whyChooseLabel, locale)}
        title={pickLocale(ui.whyChooseUs, locale)}
        statsLabel={pickLocale(ui.keyFacts, locale)}
        points={whyChoose}
        stats={homeStats}
        strip={iconStrip}
      />

      {/* 3 · Three pillar cards below the hero (no overlap, no curve) */}
      <PillarTiles
        id="sustainability"
        straddle
        locale={locale}
        label={pickLocale(ui.whyPartner, locale)}
        title={pickLocale(content.sustainabilityTitle, locale)}
        items={v2.pillars.map((p) => ({
          key: p.key,
          title: pickLocale(p.title, locale),
          body: pickLocale(p.body, locale),
          href: p.href.startsWith("#")
            ? `/${locale}${p.href}`
            : p.href.startsWith("/")
              ? p.href
              : `/${locale}/${p.href}`,
          image: pillarImages[p.key],
        }))}
      />

      {/* 3 · Misi: label + statement (cols 1–4), numbered goals (cols 6–12) */}
      <PurposeBand
        continued
        label={pickLocale(ui.ourMission, locale)}
        title={pickLocale(pages.about.mission, locale)}
        points={v2.missionPoints.map((p) => pickLocale(p, locale))}
      />

      {/* 4 · About split (photo left) */}
      {aboutBlock && (
        <FeatureSplit
          locale={locale}
          image={featureImages.about}
          surface="ivory"
          eyebrow={pickLocale(aboutBlock.eyebrow, locale)}
          title={pickLocale(aboutBlock.title, locale)}
          body={pickLocale(aboutBlock.body, locale)}
          link={{ href: `/${locale}/${aboutBlock.href}`, label: pickLocale(aboutBlock.linkLabel, locale) }}
        />
      )}

      {/* 5 · Drying service (copy left, photo right): process from the CMS; capacity/location only when confirmed */}
      {dryingBlock && (
        <FeatureSplit
          locale={locale}
          image={featureImages.drying}
          reverse
          eyebrow={pickLocale(ui.ourServices, locale)}
          title={pickLocale(dryingBlock.title, locale)}
          body={pickLocale(dryingBlock.body, locale)}
          facts={dryingFacts}
          stepsLabel={pickLocale(ui.process, locale)}
          steps={(drying?.processSteps ?? []).map((step) => ({
            title: pickLocale(step.title, locale),
            body: pickLocale(step.body, locale),
          }))}
          link={{ href: `/${locale}/${dryingBlock.href}`, label: pickLocale(dryingBlock.linkLabel, locale) }}
        >
          <WaButton locale={locale} templateKey="homeDrying" label={pickLocale(ui.discussRequirements, locale)} variant="wa" />
        </FeatureSplit>
      )}

      {/* 6 · Same catalog filter + 3-column grid as the commodities page */}
      <section id="home-commodities" className="bg-white" aria-labelledby="home-commodities-title">
        <div className="site-wrap section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="label">{pickLocale(ui.featuredCommodities, locale)}</p>
              <h2 id="home-commodities-title" className="display display-h2 mt-4 text-balance text-forest">
                {pickLocale(pages.productsIndex.heroTitle, locale)}
              </h2>
              <p className="mt-5 text-lg text-muted">{pickLocale(pages.productsIndex.heroLead, locale)}</p>
            </div>
            <TextLink href={`/${locale}/products`}>{pickLocale(ui.viewAllCommodities, locale)}</TextLink>
          </div>
          <div className="mt-10 lg:mt-12">
            <CommodityFilter
              locale={locale}
              category={category}
              q={q}
              basePath={`/${locale}`}
              hash="home-commodities"
              embedded
            />
            <div className="mt-8">
              {commodityList.length === 0 ? (
                <p className="text-muted">{pickLocale(ui.noMatches, locale)}</p>
              ) : (
                <CommodityGrid products={commodityList} locale={locale} sizes={HOME_CARD_SIZES} columns="home" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Final WhatsApp closer: ivory band, forest rule, the most prominent CTA */}
      <InquirySection
        locale={locale}
        eyebrow={pickLocale(ui.bannerLabel, locale)}
        title={pickLocale(content.inquiryTitle, locale)}
        templateKey="homeBanner"
        label={pickLocale(ui.bannerCta, locale)}
        reassurance={pickLocale(ui.bannerReassure, locale)}
      />
    </div>
  )
}
