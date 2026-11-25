import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, ui, siteSettings, confirmedAddress, mapEmbedUrl, mapExternalUrl, visiblePhone, telHref } from "@/lib/fixtures"
import { WaButton } from "@/components/WaButton"
import { PageHeader } from "@/components/PageHeader"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return withLocaleAlternates(raw, "contact", pageMeta("contact", raw))
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const phone = visiblePhone()
  const phoneHref = telHref()
  // Address and map stay independent: the pin only renders when showMap is on.
  const address = confirmedAddress(locale)
  const showMap = Boolean(address) && siteSettings.showMap === true

  return (
    <div>
      {/* Photo hero (client warehouse photo) carries the h1 */}
      <PageHeader
        variant="compact"
        locale={locale}
        image="heroContactWarehouse"
        strongScrimMobile
        eyebrow={pickLocale(ui.contactDetails, locale)}
        title={pickLocale(pages.contact.heroTitle, locale)}
        lead={pickLocale(pages.contact.heroLead, locale)}
      />
      <section className="band-lime">
        <div className="site-wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className={showMap ? undefined : "max-w-3xl"}>
            <h2 className="label">{pickLocale(ui.contactDetails, locale)}</h2>
            <dl className="mt-6 grid gap-8 border-t border-charcoal/10 pt-8 sm:grid-cols-2">
              {address ? (
                <div>
                  <dt className="label">{pickLocale(ui.address, locale)}</dt>
                  <dd className="mt-2 text-charcoal">{address}</dd>
                </div>
              ) : null}
              {phone && phoneHref ? (
                <div>
                  <dt className="label">{pickLocale(ui.phone, locale)}</dt>
                  <dd className="mt-2">
                    <a href={phoneHref} className="text-charcoal underline-offset-4 hover:text-forest hover:underline">
                      {phone}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="mt-10">
              <WaButton locale={locale} templateKey="contact" label={pickLocale(ui.requestInquiry, locale)} />
            </div>
          </div>
          {showMap ? (
            <figure className="overflow-hidden rounded-[8px] border border-hairline bg-white">
              <iframe
                title={pickLocale(ui.officeMap, locale)}
                src={mapEmbedUrl(locale)}
                className="block h-[320px] w-full border-0 sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <figcaption className="border-t border-hairline px-5 py-4">
                <a
                  href={mapExternalUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-charcoal underline-offset-4 hover:text-forest hover:underline"
                >
                  {pickLocale(ui.openMap, locale)}
                </a>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>
    </div>
  )
}
