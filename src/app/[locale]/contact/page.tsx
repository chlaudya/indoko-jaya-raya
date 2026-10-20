import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, siteSettings, ui, visiblePhone } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { WaButton } from "@/components/WaButton"
import { PageHeader } from "@/components/PageHeader"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  return {
    title: pickLocale(pages.contact.heroTitle, raw),
    description: pickLocale(pages.contact.heroLead, raw),
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })

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
        {/* Left: address, contacts, WA */}
        <div className="band-lime">
        <div className="site-wrap flex flex-col justify-center py-16 lg:mr-0 lg:max-w-[688px] lg:py-24">
          <h2 className="label">{pickLocale(ui.contactDetails, locale)}</h2>
          <dl className="mt-6 grid gap-8 border-t border-charcoal/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className="label">{pickLocale(ui.address, locale)}</dt>
              <dd className="mt-2 text-charcoal">{pickLocale(siteSettings.address, locale)}</dd>
            </div>
            <div>
              <dt className="label">{pickLocale(ui.whatsapp, locale)}</dt>
              <dd className="mt-2">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-charcoal underline-offset-4 hover:text-forest hover:underline">
                  {visiblePhone() ?? pickLocale(ui.whatsapp, locale)}
                </a>
                {!visiblePhone() && <span className="mt-1 block text-sm text-muted">{pickLocale(ui.numberPending, locale)}</span>}
              </dd>
            </div>
          </dl>
          <div className="mt-10">
            <WaButton locale={locale} templateKey="contact" label={pickLocale(ui.requestInquiry, locale)} />
          </div>
        </div>
        </div>
        {/* Right: map slot. Address still pending from the client, so no embed yet (no photo here by design). */}
        <div className="ph ph-dark relative min-h-[360px] lg:min-h-full">
          <div className="absolute inset-0 flex items-end p-6 lg:p-10">
            <p className="text-xs font-medium tracking-[0.14em] text-white/80 uppercase">{pickLocale(ui.mapPending, locale)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
