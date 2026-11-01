"use client"

import { useEffect } from "react"
import { LOCALE_LANG_TAGS, type Locale } from "@/lib/i18n"

/** Keeps <html lang> aligned with the active [locale] segment (incl. localized 404). */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = LOCALE_LANG_TAGS[locale]
  }, [locale])
  return null
}
