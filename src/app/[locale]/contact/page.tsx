import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, siteSettings } from "@/lib/fixtures"
import { WaButton } from "@/components/WaButton"

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const c = pages.contact
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold">{pickLocale(c.heroTitle, locale)}</h1>
        <p className="mt-3 text-black/70">{pickLocale(c.heroLead, locale)}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-white p-6">
          <h2 className="font-semibold">{locale === "id" ? "Alamat" : "Address"}</h2>
          <p className="mt-2 text-sm text-black/70">{pickLocale(siteSettings.address, locale)}</p>
        </div>
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-black/20 bg-white text-sm text-black/50">
          Map embed placeholder
        </div>
      </div>
      <WaButton locale={locale} templateKey="contact" label={locale === "id" ? "Hubungi via WhatsApp" : "Contact via WhatsApp"} />
    </div>
  )
}
