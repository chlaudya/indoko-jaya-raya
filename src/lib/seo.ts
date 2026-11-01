import type { Metadata } from "next"
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n"

/** Public site origin. Override with NEXT_PUBLIC_SITE_URL in each environment. */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) return raw.replace(/\/$/, "")
  return "https://indoco-jaya-raya-web.vercel.app"
}

/** Absolute path for a locale + optional path segment (no leading slash on `path`). */
export function localePath(locale: Locale, path: string = ""): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "")
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

/**
 * Shared canonical + hreflang alternates for every public page.
 * x-default → Indonesian (DEFAULT_LOCALE).
 */
export function localeAlternates(locale: Locale, path: string = ""): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {}
  for (const code of LOCALES) {
    languages[code] = localePath(code, path)
  }
  languages["x-default"] = localePath(DEFAULT_LOCALE, path)
  return {
    canonical: localePath(locale, path),
    languages,
  }
}

/** Merge page-specific metadata with canonical / hreflang. */
export function withLocaleAlternates(
  locale: Locale,
  path: string,
  meta: Metadata,
): Metadata {
  return {
    ...meta,
    alternates: {
      ...localeAlternates(locale, path),
      ...(meta.alternates ?? {}),
    },
  }
}
