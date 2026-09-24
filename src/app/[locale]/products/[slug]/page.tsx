import { notFound } from "next/navigation"
import { isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { products } from "@/lib/fixtures"
import { WaButton } from "@/components/WaButton"
import { ProductCard } from "@/components/ProductCard"
import { redirect } from "next/navigation"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()
  if (product.kind === "service" && product.servicePagePath) {
    redirect(`/${locale}/${product.servicePagePath}`)
  }
  const related = products.filter((p) => p.slug !== slug && p.kind === "product").slice(0, 3)
  return (
    <div className="space-y-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex h-72 items-center justify-center rounded-2xl bg-[#0b3d2e]/10 text-[#0b3d2e]">
          Gallery placeholder
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-[#0b3d2e]">{product.category}</p>
          <h1 className="mt-2 text-4xl font-bold">{pickLocale(product.name, locale)}</h1>
          <p className="mt-4 text-black/70">{pickLocale(product.description, locale)}</p>
          <div className="mt-6">
            <WaButton
              locale={locale}
              templateKey="product"
              tokens={{ productName: pickLocale(product.name, locale) }}
              label={locale === "id" ? "Tanya via WhatsApp" : "Ask on WhatsApp"}
            />
          </div>
        </div>
      </div>
      <section>
        <h2 className="text-xl font-semibold">{locale === "id" ? "Spesifikasi" : "Specifications"}</h2>
        <table className="mt-3 w-full text-sm">
          <tbody>
            {product.specs.map((row, i) => (
              <tr key={i} className="border-b border-black/10">
                <th className="py-2 text-left font-medium">{pickLocale(row.label, locale)}</th>
                <td className="py-2">{pickLocale(row.value, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">{locale === "id" ? "Produk terkait" : "Related"}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  )
}
