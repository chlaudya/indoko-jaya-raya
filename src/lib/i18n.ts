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

export function pickLocale<T extends Partial<Record<Locale, string>> | undefined>(
  field: T,
  locale: Locale,
  fallback: string = ""
): string {
  if (!field) return fallback
  return field[locale] || field[DEFAULT_LOCALE] || fallback
}
