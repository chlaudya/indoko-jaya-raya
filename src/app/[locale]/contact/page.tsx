import type { Metadata } from "next"
import { pageMeta } from "@/lib/seo-copy"
import { withLocaleAlternates } from "@/lib/seo"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, ui, confirmedAddress, visiblePhone } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
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
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })
  const phone = visiblePhone()
  const address = confirmedAddress(locale)

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
      <div className="grid lg:min-h-[560px] lg:grid-cols-2">
        {/* Left: address (when confirmed), WhatsApp, CTA */}
        <div className="band-lime">
        <div className="site-wrap flex flex-col justify-center py-16 lg:mr-0 lg:max-w-[688px] lg:py-24">
          <h2 className="label">{pickLocale(ui.contactDetails, locale)}</h2>
          <dl className="mt-6 grid gap-8 border-t border-charcoal/10 pt-8 sm:grid-cols-2">
            {address ? (
              <div>
                <dt className="label">{pickLocale(ui.address, locale)}</dt>
                <dd className="mt-2 text-charcoal">{address}</dd>
              </div>
            ) : null}
            <div>
              <dt className="label">{pickLocale(ui.whatsapp, locale)}</dt>
              <dd className="mt-2">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-charcoal underline-offset-4 hover:text-forest hover:underline">
                  {phone ?? pickLocale(ui.whatsapp, locale)}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-10">
            <WaButton locale={locale} templateKey="contact" label={pickLocale(ui.requestInquiry, locale)} />
          </div>
        </div>
        </div>
        {/* Right: map only once a confirmed address exists; otherwise a quiet tonal panel (no "Peta menyusul"). */}
        <div className="ph ph-dark relative min-h-[360px] lg:min-h-full" aria-hidden="true" />
      </div>
    </div>
  )
}
