import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, ui } from "@/lib/fixtures"
import { Gallery } from "@/components/Gallery"
import { InquirySection } from "@/components/InquirySection"
import { PageHeader } from "@/components/PageHeader"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return withLocaleAlternates(raw, "company", { ...pageMeta("company", raw), robots: { index: false, follow: true } })
}

/**
 * Company profile: only confirmed public blocks render. Pending legal / management /
 * facilities / certification slots are omitted (page kept for later; noindex until approved).
 */
export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.company
  const t = (v: Parameters<typeof pickLocale>[0]) => pickLocale(v, locale)

  return (
    <div>
      <PageHeader
        variant="compact"
        locale={locale}
        image="sectionWarehouseStock"
        eyebrow={t(content.heroTitle)}
        title={t(content.legalName)}
        lead={t(content.tagline)}
      />

      <section className="band-lime">
        <div className="site-wrap section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label">{t(ui.identity)}</p>
            <h2 className="display display-h2 mt-4 text-forest">{t(content.legalName)}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t(content.note)}</p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="label">{t(ui.vision)}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-charcoal">{t(pages.about.vision)}</dd>
              </div>
              <div>
                <dt className="label">{t(ui.mission)}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-charcoal">{t(pages.about.mission)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="site-wrap section-y">
          <p className="label">{t(ui.gallery)}</p>
          <h2 className="display display-h2 mt-4 mb-12 text-forest">{t(ui.facilities)}</h2>
          <Gallery
            locale={locale}
            images={["galleryWarehouse", "galleryStacks", "galleryCarrying", "galleryGrainSacks", "galleryUnloading", "galleryCashewSorting"]}
          />
        </div>
      </section>

      <InquirySection locale={locale} title={t(pages.home.inquiryTitle)} />
    </div>
  )
}
