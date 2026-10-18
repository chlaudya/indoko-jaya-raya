import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, ui } from "@/lib/fixtures"
import { FeatureSplit } from "@/components/FeatureSplit"
import { Gallery } from "@/components/Gallery"
import { InquirySection } from "@/components/InquirySection"
import { PageHeader } from "@/components/PageHeader"
import { Photo } from "@/components/Photo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return {
    title: pickLocale(pages.company.heroTitle, raw),
    description: pickLocale(pages.company.note, raw),
  }
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.company
  const t = (v: Parameters<typeof pickLocale>[0]) => pickLocale(v, locale)
  const pending = t(ui.pendingConfirmation)
  // sections: 0 legal identity · 1 legal docs · 2 management · 3 organization · 4 locations · 5 facilities · 6 certifications
  const s = content.sections.map((x) => t(x.title))
  const legalRows = [s[0], s[1], s[4]]

  return (
    <div>
      <PageHeader
        variant="compact"
        locale={locale}
        image="heroWarehouse"
        eyebrow={t(content.heroTitle)}
        title={t(content.legalName)}
        lead={t(content.tagline)}
      />

      {/* Identity + legal definition list in a white card */}
      <section className="bg-ivory">
        <div className="site-wrap section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
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
          <div className="rounded-[8px] border border-charcoal/10 bg-white p-6 lg:col-span-6 lg:col-start-7 lg:p-10">
            <h2 className="label">{t(ui.legal)}</h2>
            <dl className="mt-4">
              {legalRows.map((title) => (
                <div key={title} className="grid gap-1 border-b border-charcoal/10 py-5 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="font-medium text-forest">{title}</dt>
                  <dd className="text-sm text-muted">{pending}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Organisation structure grid (portrait cards) */}
      <section className="bg-white">
        <div className="site-wrap section-y">
          <p className="label">{s[3]}</p>
          <h2 className="display display-h2 mt-4 text-forest">{s[2]}</h2>
          <p className="mt-4 max-w-2xl text-muted">{pending}</p>
          <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <li key={i}>
                <Photo locale={locale} aspect="aspect-[3/4]" tone="ph-dark" sizes="(min-width: 1024px) 300px, 50vw" />
                <p className="mt-4 font-medium text-charcoal">{t(ui.management)}</p>
                <p className="text-sm text-muted">{t(ui.pending)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities as alternating blocks */}
      <FeatureSplit
        locale={locale}
        image="sectionWarehouseAisle"
        surface="ivory"
        eyebrow={s[5]}
        title={t(ui.storageWarehouse)}
        body={pending}
      />
      <FeatureSplit
        locale={locale}
        image="sectionSortingMachine"
        reverse
        eyebrow={s[5]}
        title={t(ui.commodityProcessing)}
        body={pending}
      />

      {/* Certifications row — slots only until real certificates are supplied */}
      <section className="border-y border-charcoal/10 bg-white">
        <div className="site-wrap py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="label">{s[6]}</h2>
              <p className="mt-2 text-sm text-muted">{pending}</p>
            </div>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:w-2/3">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex h-20 items-center justify-center rounded-[8px] border border-dashed border-charcoal/20 text-xs tracking-[0.12em] text-muted uppercase">
                  {t(ui.pending)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery masonry */}
      <section className="bg-white">
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
