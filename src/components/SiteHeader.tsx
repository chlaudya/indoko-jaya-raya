"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LOCALE_LABELS, LOCALES, pickLocale, type Locale, isLocale } from "@/lib/i18n"
import { nav } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

function swapLocalePath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/")
  // ["", "id", "products", "..."]
  if (parts.length >= 2 && isLocale(parts[1])) {
    parts[1] = nextLocale
    const next = parts.join("/")
    return next || `/${nextLocale}`
  }
  return `/${nextLocale}`
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#0b3d2e] text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href={`/${locale}`} className="shrink-0 text-sm font-bold tracking-wide">
          INDOCO JAYA RAYA
        </Link>
        <nav className="hidden flex-1 flex-wrap items-center gap-3 text-xs lg:flex xl:text-sm">
          {nav.map((item) => (
            <Link
              key={item.href || "home"}
              href={`/${locale}${item.href ? `/${item.href}` : ""}`}
              className="opacity-90 hover:opacity-100"
            >
              {pickLocale(item.label, locale)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex gap-1" aria-label="Language switcher">
            {LOCALES.map((code) => (
              <Link
                key={code}
                href={swapLocalePath(pathname, code)}
                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                  code === locale ? "bg-white text-[#0b3d2e]" : "border border-white/30"
                }`}
              >
                {LOCALE_LABELS[code]}
              </Link>
            ))}
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-black"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
