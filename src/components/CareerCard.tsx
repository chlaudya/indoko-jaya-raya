import { pickLocale, type Locale } from "@/lib/i18n"
import { siteSettings, ui } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { WhatsAppIcon } from "./WaButton"

type Job = {
  slug: string
  title: Partial<Record<Locale, string>>
  location: Partial<Record<Locale, string>>
  shortBlurb: Partial<Record<Locale, string>>
  status: "active"
}

/** Clean job row: title · location · arrow CTA (apply method follows siteSettings.applyMode). */
export function CareerCard({ job, locale }: { job: Job; locale: Locale }) {
  const mode = siteSettings.applyMode
  const title = pickLocale(job.title, locale)
  const wa = buildWhatsAppUrl({ locale, templateKey: "career", tokens: { jobTitle: title } })

  return (
    <li className="group grid gap-4 border-t border-charcoal/15 py-8 md:grid-cols-12 md:items-center md:gap-8">
      <div className="md:col-span-6">
        <h3 className="display display-h3 text-forest">{title}</h3>
        <p className="mt-2 max-w-xl text-sm text-muted">{pickLocale(job.shortBlurb, locale)}</p>
      </div>
      <p className="text-sm md:col-span-3">
        <span className="label mr-2">{pickLocale(ui.location, locale)}</span>
        <span className="text-charcoal">{pickLocale(job.location, locale)}</span>
      </p>
      <div className="flex flex-wrap items-center gap-4 md:col-span-3 md:justify-end">
        {(mode === "wa" || mode === "both") && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="text-link text-forest">
            <WhatsAppIcon className="size-4 text-[#1a9e4b]" />
            <span>{pickLocale(ui.applyWhatsApp, locale)}</span>
            <span aria-hidden="true" className="arrow">→</span>
          </a>
        )}
        {(mode === "form" || mode === "both") && (
          <button type="button" className="text-link text-muted" disabled>
            {pickLocale(ui.cvFormPending, locale)}
          </button>
        )}
      </div>
    </li>
  )
}
