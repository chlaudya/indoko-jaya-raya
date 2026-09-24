import Link from "next/link"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages } from "@/lib/fixtures"
import { WaButton } from "@/components/WaButton"

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const c = pages.about
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold">{pickLocale(c.heroTitle, locale)}</h1>
        <p className="mt-3 max-w-2xl text-black/70">{pickLocale(c.heroLead, locale)}</p>
      </header>
      <section className="rounded-xl bg-white p-6 border border-black/10">
        <h2 className="text-xl font-semibold">{locale === "id" ? "Sejarah" : "Story"}</h2>
        <p className="mt-3 leading-relaxed">{pickLocale(c.story, locale)}</p>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl bg-white p-6 border border-black/10">
          <h2 className="text-xl font-semibold">{locale === "id" ? "Visi" : "Vision"}</h2>
          <p className="mt-3">{pickLocale(c.vision, locale)}</p>
        </section>
        <section className="rounded-xl bg-white p-6 border border-black/10">
          <h2 className="text-xl font-semibold">{locale === "id" ? "Misi" : "Mission"}</h2>
          <p className="mt-3">{pickLocale(c.mission, locale)}</p>
        </section>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={`/${locale}/company`} className="rounded border border-[#0b3d2e] px-4 py-2 text-sm font-semibold text-[#0b3d2e]">
          {locale === "id" ? "Profil & Data Perusahaan" : "Company profile & data"}
        </Link>
        <WaButton locale={locale} templateKey="contact" label="WhatsApp" />
      </div>
    </div>
  )
}
