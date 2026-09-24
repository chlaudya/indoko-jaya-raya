import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { jobs, pages, siteSettings } from "@/lib/fixtures"
import { WaButton } from "@/components/WaButton"

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const c = pages.careers
  const active = jobs.filter((j) => j.status === "active")
  const mode = siteSettings.applyMode
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold">{pickLocale(c.heroTitle, locale)}</h1>
        <p className="mt-3 text-black/70">{pickLocale(c.heroLead, locale)}</p>
        <p className="mt-2 text-xs text-black/50">applyMode = {mode} (config switch)</p>
      </header>
      <div className="space-y-4">
        {active.map((job) => (
          <article key={job.slug} className="rounded-xl border border-black/10 bg-white p-5">
            <h2 className="text-xl font-semibold">{pickLocale(job.title, locale)}</h2>
            <p className="mt-1 text-sm text-[#0b3d2e]">{pickLocale(job.location, locale)}</p>
            <p className="mt-3 text-sm text-black/70">{pickLocale(job.shortBlurb, locale)}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(mode === "wa" || mode === "both") && (
                <WaButton
                  locale={locale}
                  templateKey="career"
                  tokens={{ jobTitle: pickLocale(job.title, locale) }}
                  label={locale === "id" ? "Lamar via WhatsApp" : "Apply via WhatsApp"}
                />
              )}
              {(mode === "form" || mode === "both") && (
                <button
                  type="button"
                  className="rounded border border-[#0b3d2e] px-4 py-2 text-sm font-semibold text-[#0b3d2e]"
                  disabled
                >
                  {locale === "id" ? "Form unggah CV (placeholder)" : "CV upload form (placeholder)"}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
