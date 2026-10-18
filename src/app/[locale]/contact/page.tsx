import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, siteSettings, ui, waDisplayNumber } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { WaButton } from "@/components/WaButton"

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
    <div className="grid bg-white lg:min-h-[calc(100vh-72px)] lg:grid-cols-2">
      {/* Left: address, contacts, WA */}
      <div className="site-wrap flex flex-col justify-center py-16 lg:mr-0 lg:max-w-[688px] lg:py-24">
        <p className="label">{pickLocale(ui.contactDetails, locale)}</p>
        <h1 className="display display-h1 mt-4 text-forest">{pickLocale(pages.contact.heroTitle, locale)}</h1>
        <p className="mt-6 max-w-lg text-lg text-muted">{pickLocale(pages.contact.heroLead, locale)}</p>
        <dl className="mt-12 grid gap-8 border-t border-charcoal/10 pt-8 sm:grid-cols-2">
          <div>
            <dt className="label">{pickLocale(ui.address, locale)}</dt>
            <dd className="mt-2 text-charcoal">{pickLocale(siteSettings.address, locale)}</dd>
          </div>
          <div>
            <dt className="label">{pickLocale(ui.whatsapp, locale)}</dt>
            <dd className="mt-2">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="text-charcoal underline-offset-4 hover:text-forest hover:underline">
                {waDisplayNumber()}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-10">
          <WaButton locale={locale} templateKey="contact" label={pickLocale(ui.requestInquiry, locale)} />
        </div>
      </div>
      {/* Right: full-height map slot */}
      <div className="ph ph-dark relative min-h-[360px] lg:min-h-full">
        <div className="absolute inset-0 flex items-end p-6 lg:p-10">
          <p className="text-xs font-medium tracking-[0.14em] text-white/80 uppercase">{pickLocale(ui.mapPending, locale)}</p>
        </div>
      </div>
    </div>
  )
}
