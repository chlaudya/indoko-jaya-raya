import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, ui, confirmedAddress, visiblePhone, telHref, formatFoundedDate } from "@/lib/fixtures"
import { Gallery } from "@/components/Gallery"
import { InquirySection } from "@/components/InquirySection"
import { PageHeader } from "@/components/PageHeader"
import { WaButton } from "@/components/WaButton"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return withLocaleAlternates(raw, "company", pageMeta("company", raw))
}

/**
 * Company profile: official identity and only the documents we have.
 * No placeholder slots for missing documents (NIB, NPWP, certifications, etc.).
 */
export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.company
  const t = (v: Parameters<typeof pickLocale>[0]) => pickLocale(v, locale)
  const address = confirmedAddress(locale)
  const phone = visiblePhone()
  const phoneHref = telHref()
  const documents = content.documents ?? []

  const facts = [
    { label: t(ui.legalName), value: t(content.legalName) },
    { label: t(ui.founded), value: formatFoundedDate(locale) },
    address ? { label: t(ui.officeAddress), value: address } : null,
    phone && phoneHref
      ? { label: t(ui.phone), value: phone, href: phoneHref }
      : null,
  ].filter(Boolean) as { label: string; value: string; href?: string }[]

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
            <dl className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {facts.map((row) => (
                <div key={row.label} className="min-w-0">
                  <dt className="label">{row.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-charcoal">
                    {row.href ? (
                      <a
                        href={row.href}
                        {...(row.href.startsWith("tel:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="underline-offset-4 hover:text-forest hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-charcoal/10 pt-8 md:grid-cols-2">
              <div className="min-w-0">
                <dt className="label">{t(ui.vision)}</dt>
                <dd className="mt-2 text-pretty break-words text-sm leading-relaxed text-charcoal">{t(pages.about.vision)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="label">{t(ui.mission)}</dt>
                <dd className="mt-2 text-pretty break-words text-sm leading-relaxed text-charcoal">{t(pages.about.mission)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {documents.length > 0 && (
        <section className="bg-white">
          <div className="site-wrap section-y">
            <p className="label">{t(ui.legal)}</p>
            <h2 className="display display-h2 mt-4 text-forest">{t(ui.legal)}</h2>
            <ul className="mt-10 grid gap-6">
              {documents.map((doc) => (
                <li key={doc.title.id ?? doc.title.en}>
                  <article className="flex flex-col gap-6 rounded-[8px] border border-hairline bg-ivory p-5 sm:flex-row sm:p-6">
                    {doc.kind === "file" && doc.thumbnail && doc.href && (
                      <a href={doc.href} target="_blank" rel="noopener noreferrer" className="block w-full shrink-0 overflow-hidden rounded-[6px] border border-hairline bg-white sm:w-36">
                        {/* Native img: next/image localPatterns only allow /images/optimized/**. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={doc.thumbnail} alt="" width={doc.thumbnailWidth} height={doc.thumbnailHeight} className="h-auto w-full" />
                      </a>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-forest">{t(doc.title)}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-charcoal">{t(doc.summary)}</p>
                      {doc.kind === "file" && doc.href && (
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link mt-5 inline-flex min-h-11 items-center text-forest"
                        >
                          {t(ui.downloadPdf)}
                        </a>
                      )}
                      {doc.kind === "request" && (
                        <div className="mt-5">
                          <WaButton locale={locale} templateKey="contact" label={t(ui.copyOnRequest)} />
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
