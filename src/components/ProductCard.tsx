import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import type { Product } from "@/lib/fixtures"
import { WaButton } from "./WaButton"

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const href =
    product.kind === "service" && product.servicePagePath
      ? `/${locale}/${product.servicePagePath}`
      : `/${locale}/products/${product.slug}`
  return (
    <article className="flex flex-col rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-36 items-center justify-center rounded-lg bg-[#0b3d2e]/10 text-xs text-[#0b3d2e]">
        {product.kind === "service" ? "SERVICE" : "PRODUCT"}
      </div>
      <p className="text-[10px] uppercase tracking-wide text-[#0b3d2e]">{product.category}</p>
      <h3 className="mt-1 text-lg font-semibold text-black">
        <Link href={href}>{pickLocale(product.name, locale)}</Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-black/70">{pickLocale(product.shortBlurb, locale)}</p>
      <div className="mt-4">
        <WaButton
          locale={locale}
          templateKey={product.kind === "service" ? "drying" : "product"}
          tokens={{ productName: pickLocale(product.name, locale) }}
          label={locale === "id" ? "Tanya via WhatsApp" : "Ask on WhatsApp"}
        />
      </div>
    </article>
  )
}
