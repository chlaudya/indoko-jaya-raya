import { I18N_DRAFTS, type DraftLocale } from "./i18n-drafts"

export const LOCALES = ["id", "en", "zh", "vi", "hi"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "id"

export const LOCALE_LABELS: Record<Locale, string> = {
  id: "ID",
  en: "EN",
  zh: "ZH",
  vi: "VI",
  hi: "HI",
}

/** Endonyms for the language menu (each rendered with its own `lang`). */
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  zh: "中文",
  vi: "Tiếng Việt",
  hi: "हिन्दी",
}

/** BCP-47 tags for `lang` / `hrefLang` attributes. */
export const LOCALE_LANG_TAGS: Record<Locale, string> = {
  id: "id",
  en: "en",
  zh: "zh-Hans",
  vi: "vi",
  hi: "hi",
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** Explicit locale value → DRAFT translation (src/lib/i18n-drafts.ts, zh/vi/hi only) → Indonesian → fallback. */
export function pickLocale<T extends Partial<Record<Locale, string>> | undefined>(
  field: T,
  locale: Locale,
  fallback: string = ""
): string {
  if (!field) return fallback
  const own = field[locale]
  if (own) return own
  const source = field[DEFAULT_LOCALE]
  if (source && (locale === "zh" || locale === "vi" || locale === "hi")) {
    const draft = I18N_DRAFTS[source]?.[locale as DraftLocale]
    if (draft) return draft
  }
  return source || fallback
}
