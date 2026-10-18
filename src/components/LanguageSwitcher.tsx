"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LOCALE_LABELS, LOCALES, isLocale, pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"

function swapLocalePath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/")
  if (parts.length >= 2 && isLocale(parts[1])) {
    parts[1] = nextLocale
    return parts.join("/") || `/${nextLocale}`
  }
  return `/${nextLocale}`
}

export function LanguageSwitcher({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const pathname = usePathname() || `/${locale}`
  const idle = tone === "light" ? "text-white/75 hover:text-white" : "text-muted hover:text-charcoal"
  const active = tone === "light" ? "text-white" : "text-forest"

  return (
    <nav aria-label={pickLocale(ui.language, locale)} className="flex flex-nowrap items-center gap-x-1.5 text-xs font-medium">
      {LOCALES.map((code, index) => (
        <span key={code} className="inline-flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className={tone === "light" ? "text-white/35" : "text-soft-sage"}>
              |
            </span>
          )}
          <Link
            href={swapLocalePath(pathname, code)}
            hrefLang={code}
            aria-current={code === locale ? "true" : undefined}
            className={`inline-flex min-h-11 items-center ${code === locale ? active : idle}`}
          >
            {LOCALE_LABELS[code]}
          </Link>
        </span>
      ))}
    </nav>
  )
}
