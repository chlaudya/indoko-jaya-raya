import Link from "next/link"
import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { pages, products } from "@/lib/fixtures"
import { ProductCard } from "@/components/ProductCard"
import { WaButton } from "@/components/WaButton"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const content = pages.home
  const featured = products.filter((p) => p.featured)
  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-[#0b3d2e] px-6 py-12 text-white md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] opacity-80">{pickLocale(content.heroEyebrow, locale)}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold md:text-5xl">{pickLocale(content.heroTitle, locale)}</h1>
        <p className="mt-4 max-w-2xl text-white/85">{pickLocale(content.heroLead, locale)}</p>
        <div className="mt-6">
          <WaButton locale={locale} templateKey="home" label={locale === "id" ? "Hubungi Kami" : "Contact Us"} />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">{locale === "id" ? "Keunggulan" : "Why us"}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {content.trustPoints.map((t) => (
            <div key={pickLocale(t.title, locale)} className="rounded-xl border border-black/10 bg-white p-5">
              <h3 className="font-semibold">{pickLocale(t.title, locale)}</h3>
              <p className="mt-2 text-sm text-black/70">{pickLocale(t.body, locale)}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">{locale === "id" ? "Komoditi unggulan" : "Featured commodities"}</h2>
          <Link href={`/${locale}/products`} className="text-sm text-[#0b3d2e] underline">
            {locale === "id" ? "Lihat semua" : "View all"}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <Link href={`/${locale}/services/drying`} className="rounded-xl border border-black/10 bg-white p-6 hover:border-[#0b3d2e]">
          <h2 className="text-xl font-semibold">{locale === "id" ? "Jasa Penjemuran" : "Drying service"}</h2>
          <p className="mt-2 text-sm text-black/70">
            {locale === "id" ? "Konsultasi kapasitas dan lokasi penjemuran." : "Consult on drying capacity and locations."}
          </p>
        </Link>
        <Link href={`/${locale}/about`} className="rounded-xl border border-black/10 bg-white p-6 hover:border-[#0b3d2e]">
          <h2 className="text-xl font-semibold">{locale === "id" ? "Tentang singkat" : "About teaser"}</h2>
          <p className="mt-2 text-sm text-black/70">
            {locale === "id" ? "Kenali visi, misi, dan cerita perusahaan." : "Learn our vision, mission, and story."}
          </p>
        </Link>
      </section>
      <section className="rounded-2xl bg-black px-6 py-10 text-center text-white">
        <h2 className="text-2xl font-semibold">{locale === "id" ? "Hubungi tim kami" : "Talk to our team"}</h2>
        <div className="mt-4">
          <WaButton locale={locale} templateKey="contact" label="WhatsApp" />
        </div>
      </section>
    </div>
  )
}
