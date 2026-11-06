import type { MetadataRoute } from "next"
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n"
import { products } from "@/lib/fixtures"
import { localePath, siteUrl } from "@/lib/seo"

const STATIC_PATHS = ["", "about", "products", "careers", "contact", "services/drying"] as const

function languagesFor(path: string): Record<string, string> {
  const base = siteUrl()
  const languages: Record<string, string> = {}
  for (const locale of LOCALES) {
    languages[locale] = `${base}${localePath(locale, path)}`
  }
  languages["x-default"] = `${base}${localePath(DEFAULT_LOCALE, path)}`
  return languages
}

function entry(locale: Locale, path: string): MetadataRoute.Sitemap[number] {
  const base = siteUrl()
  return {
    url: `${base}${localePath(locale, path)}`,
    lastModified: new Date(),
    alternates: { languages: languagesFor(path) },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  // Company profile is noindex until data is approved — omit from sitemap.
  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push(entry(locale, path))
    }
    for (const product of products) {
      if (product.kind === "service") continue
      entries.push(entry(locale, `products/${product.slug}`))
    }
  }
  return entries
}
