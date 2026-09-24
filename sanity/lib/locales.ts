export const LOCALES = ["id", "en", "zh", "vi", "hi"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "id"

export const LOCALE_LABELS: Record<Locale, string> = {
  id: "Indonesia",
  en: "English",
  zh: "中文",
  vi: "Tiếng Việt",
  hi: "हिन्दी",
}
