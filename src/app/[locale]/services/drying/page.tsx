import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { products, ui } from "@/lib/fixtures"
import { FeatureSplit } from "@/components/FeatureSplit"
import { Gallery } from "@/components/Gallery"
import { HeroFullBleed } from "@/components/HeroFullBleed"
import { InquirySection } from "@/components/InquirySection"
import { WaButton } from "@/components/WaButton"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return withLocaleAlternates(raw, "services/drying", pageMeta("drying", raw))
}

export default async function DryingServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const service = products.find((item) => item.slug === "jasa-penjemuran-komoditi")
  if (!service) notFound()
  const t = (v: Parameters<typeof pickLocale>[0]) => pickLocale(v, locale)
  const processSteps = service.processSteps ?? []

  return (
    <div>
      <HeroFullBleed
        locale={locale}
        image="heroPeanutsOnTarp"
        height="medium"
        eyebrow={t(ui.commodityServices)}
        title={t(service.name)}
        lead={t(service.description)}
      >
        <WaButton locale={locale} templateKey="drying" label={t(ui.discussRequirements)} variant="wa" />
      </HeroFullBleed>

      <FeatureSplit
        locale={locale}
        image="sectionFarmerTarp"
        surface="lime"
        eyebrow={t(ui.ourService)}
        title={t(service.name)}
        body={t(service.description)}
      />
      {!service.capacityPending && service.capacity ? (
        <FeatureSplit
          locale={locale}
          image="sectionPeanutTarp"
          reverse
          surface="ivory"
          eyebrow={t(ui.capacity)}
          title={t(service.specs.find((s) => t(s.label) === t(ui.capacity))?.value) || t(ui.capacity)}
          body={t(service.capacity)}
        />
      ) : null}

      {/* Numbered process — omitted entirely when CMS/fixtures have no steps (no empty padded band). */}
      {processSteps.length > 0 ? (
        <section className="surface-dark bg-forest text-white">
          <div className="site-wrap section-y">
            <p className="label text-soft-sage!">{t(ui.process)}</p>
            <ol className="mt-10 grid gap-10 md:grid-cols-3 lg:mt-14">
              {processSteps.map((step, index) => (
                <li key={index} className="reveal border-t border-white/20 pt-8">
                  <p className="display nums text-[clamp(3rem,5vw,4.5rem)] leading-none text-soft-sage">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="display display-h3 mt-6">{t(step.title)}</h3>
                  <p className="mt-3 text-white/75">{t(step.body)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="bg-ivory">
        <div className="site-wrap section-y">
          <p className="label">{t(ui.gallery)}</p>
          <h2 className="display display-h2 mt-4 mb-12 text-forest">{t(service.name)}</h2>
          <Gallery locale={locale} images={["galleryCashewSorting", "cardDrying", "galleryWarehouse"]} />
        </div>
      </section>

      <InquirySection locale={locale} title={t(ui.discussRequirements)} templateKey="drying" label={t(ui.discussRequirements)} />
    </div>
  )
}
