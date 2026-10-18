import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { homeStats, pages, products, redesign, ui } from "@/lib/fixtures"
import type { ImageKey } from "@/lib/images"
import { CardRail } from "@/components/CardRail"
import { CommodityCard, RAIL_CARD_SIZES } from "@/components/CommodityCard"
import { FeatureSplit } from "@/components/FeatureSplit"
import { HeroFullBleed } from "@/components/HeroFullBleed"
import { InquirySection } from "@/components/InquirySection"
import { PillarTiles } from "@/components/PillarTiles"
import { PurposeBand } from "@/components/PurposeBand"
import { StatsStrip } from "@/components/StatsStrip"
import { TextLink } from "@/components/TextLink"
import { WaButton, buttonClass } from "@/components/WaButton"

const pillarImages: Record<string, ImageKey> = {
  people: "cardPillarFarmers",
  products: "cardPillarCommodities",
  planet: "cardPillarSustainability",
}
const featureImages: Record<string, ImageKey> = {
  about: "sectionTeamLoading",
  drying: "sectionPeanutTarp",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const content = pages.home
  return {
    title: `${pickLocale(content.heroLine1, raw)} ${pickLocale(content.heroLine2, raw)}`,
    description: pickLocale(content.heroLead, raw),
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.home
  const v2 = redesign.home
  const railProducts = products.filter((p) => p.kind === "product" && (p.featured || p.image))
    .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)))
  const [aboutBlock, dryingBlock] = v2.features

  return (
    <div>
      {/* 1 · Full-bleed hero with a single mission line */}
      <HeroFullBleed
        locale={locale}
        image="heroFarmersSorting"
        videoSrc={v2.heroVideo || undefined}
        eyebrow={pickLocale(content.heroEyebrow, locale)}
        title={pickLocale(v2.heroTitle, locale)}
        lead={pickLocale(content.heroLead, locale)}
      >
        <WaButton locale={locale} templateKey="home" label={pickLocale(ui.partnerWithUs, locale)} variant="wa" />
        <Link href={`/${locale}/products`} className={buttonClass("on-dark")}>
          {pickLocale(ui.exploreCommodities, locale)}
        </Link>
      </HeroFullBleed>

      {/* 2 · Purpose band (misi) */}
      <PurposeBand
        label={pickLocale(ui.ourMission, locale)}
        title={pickLocale(content.introStatement, locale)}
        points={v2.missionPoints.map((p) => pickLocale(p, locale))}
      />

      {/* 3 · Three pillars: people · products · planet */}
      <PillarTiles
        id="sustainability"
        locale={locale}
        label={pickLocale(ui.whyPartner, locale)}
        title={pickLocale(content.sustainabilityTitle, locale)}
        items={v2.pillars.map((p) => ({
          key: p.key,
          title: pickLocale(p.title, locale),
          body: pickLocale(p.body, locale),
          href: `/${locale}/${p.href}`,
          image: pillarImages[p.key],
        }))}
      />

      {/* 4 · Alternating feature: about (image left) */}
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

      {/* 5 · Alternating feature: drying service (image right) */}
      {dryingBlock && (
        <FeatureSplit
          locale={locale}
          image={featureImages.drying}
          reverse
          eyebrow={pickLocale(dryingBlock.eyebrow, locale)}
          title={pickLocale(dryingBlock.title, locale)}
          body={pickLocale(dryingBlock.body, locale)}
          link={{ href: `/${locale}/${dryingBlock.href}`, label: pickLocale(dryingBlock.linkLabel, locale) }}
        >
          <WaButton locale={locale} templateKey="drying" label={pickLocale(ui.discussRequirements, locale)} />
        </FeatureSplit>
      )}

      {/* 6 · Stats strip (hidden when empty) */}
      {homeStats.length > 0 && <StatsStrip locale={locale} label={pickLocale(ui.keyFacts, locale)} stats={homeStats} />}

      {/* 7 · Featured commodity rail */}
      <section className="bg-white">
        <div className="site-wrap section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="label">{pickLocale(ui.featuredCommodities, locale)}</p>
              <h2 className="display display-h2 mt-4 text-forest">{pickLocale(pages.productsIndex.heroTitle, locale)}</h2>
              <p className="mt-5 text-lg text-muted">{pickLocale(pages.productsIndex.heroLead, locale)}</p>
            </div>
            <TextLink href={`/${locale}/products`}>{pickLocale(ui.viewAllCommodities, locale)}</TextLink>
          </div>
          <div className="mt-10 lg:mt-12">
            <CardRail
              label={pickLocale(ui.featuredCommodities, locale)}
              prevLabel={pickLocale(ui.previous, locale)}
              nextLabel={pickLocale(ui.next, locale)}
            >
              {railProducts.map((product) => (
                <li key={product.slug}>
                  <CommodityCard product={product} locale={locale} sizes={RAIL_CARD_SIZES} />
                </li>
              ))}
            </CardRail>
          </div>
        </div>
      </section>

      {/* 8 · Final WA CTA band */}
      <InquirySection
        locale={locale}
        title={pickLocale(content.inquiryTitle, locale)}
        templateKey="home"
        secondary={{ href: `/${locale}/products`, label: pickLocale(ui.viewCommodities, locale) }}
      />
    </div>
  )
}
