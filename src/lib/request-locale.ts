import { cache } from "react"
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n"

/**
 * Per-request locale store. The `[locale]` layout sets this before rendering so
 * `[locale]/not-found.tsx` can read the locale without `headers()` / `cookies()`
 * (those in the root layout were forcing Next's `__next_error__` shell on 404).
 */
const store = cache((): { locale: Locale } => ({ locale: DEFAULT_LOCALE }))

export function setRequestLocale(locale: Locale) {
  store().locale = locale
}

export function getRequestLocale(): Locale {
  return store().locale
}
