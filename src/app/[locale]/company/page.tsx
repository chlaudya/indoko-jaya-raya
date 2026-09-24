import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages } from "@/lib/fixtures"
import { WaButton } from "@/components/WaButton"

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const c = pages.company
  return (
    <div className="space-y-8">
      <header className="rounded-2xl bg-[#0b3d2e] px-6 py-10 text-white">
        <p className="text-xs uppercase tracking-widest opacity-80">{pickLocale(c.tagline, locale)}</p>
        <h1 className="mt-2 text-4xl font-bold">{pickLocale(c.legalName, locale)}</h1>
        <p className="mt-2 text-white/80">{pickLocale(c.heroTitle, locale)}</p>
      </header>
      <p className="text-black/70">{pickLocale(c.note, locale)}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {["Legalitas", "Struktur organisasi", "Lokasi & fasilitas", "Sertifikasi", "Galeri"].map((section) => (
          <div key={section} className="rounded-xl border border-dashed border-black/20 bg-white p-5 text-sm text-black/60">
            <h2 className="font-semibold text-black">{section}</h2>
            <p className="mt-2">CMS placeholder — public-approved fields only.</p>
          </div>
        ))}
      </div>
      <WaButton locale={locale} templateKey="contact" label="WhatsApp" />
    </div>
  )
}
