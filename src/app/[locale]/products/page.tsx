import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { categories, pages, products } from "@/lib/fixtures"
import { ProductCard } from "@/components/ProductCard"
import { WaButton } from "@/components/WaButton"

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { locale: raw } = await params
  const { category } = await searchParams
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const c = pages.productsIndex
  const filtered = category ? products.filter((p) => p.category === category) : products
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold">{pickLocale(c.heroTitle, locale)}</h1>
        <p className="mt-3 text-black/70">{pickLocale(c.heroLead, locale)}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <a href={`/${locale}/products`} className={`rounded-full px-3 py-1 text-xs ${!category ? "bg-[#0b3d2e] text-white" : "border border-black/20"}`}>
          All
        </a>
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`/${locale}/products?category=${cat.slug}`}
            className={`rounded-full px-3 py-1 text-xs ${category === cat.slug ? "bg-[#0b3d2e] text-white" : "border border-black/20"}`}
          >
            {pickLocale(cat.title, locale)}
          </a>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
      <WaButton locale={locale} templateKey="contact" label="WhatsApp" />
    </div>
  )
}
