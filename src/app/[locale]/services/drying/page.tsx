import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { products } from "@/lib/fixtures"
import { WaButton } from "@/components/WaButton"

export default async function DryingServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const service = products.find((p) => p.slug === "jasa-penjemuran-komoditi")
  if (!service) notFound()
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-[#0b3d2e] px-6 py-10 text-white">
        <h1 className="text-4xl font-bold">{pickLocale(service.name, locale)}</h1>
        <p className="mt-3 max-w-2xl text-white/85">{pickLocale(service.description, locale)}</p>
        <div className="mt-6">
          <WaButton
            locale={locale}
            templateKey="drying"
            label={locale === "id" ? "Konsultasi Jasa Penjemuran" : "Consult drying service"}
          />
        </div>
      </section>
      <section className="rounded-xl border border-black/10 bg-white p-6">
        <h2 className="text-xl font-semibold">{locale === "id" ? "Kapasitas & lokasi" : "Capacity & location"}</h2>
        <p className="mt-3 text-black/70">{pickLocale(service.capacity, locale)}</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">{locale === "id" ? "Proses" : "How it works"}</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {(service.processSteps || []).map((step, i) => (
            <li key={i} className="rounded-xl border border-black/10 bg-white p-5">
              <p className="text-xs text-[#0b3d2e]">0{i + 1}</p>
              <h3 className="mt-1 font-semibold">{pickLocale(step.title, locale)}</h3>
              <p className="mt-2 text-sm text-black/70">{pickLocale(step.body, locale)}</p>
            </li>
          ))}
        </ol>
      </section>
      <WaButton locale={locale} templateKey="drying" label="WhatsApp" />
    </div>
  )
}
