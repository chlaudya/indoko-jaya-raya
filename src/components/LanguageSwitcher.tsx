"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import {
  LOCALE_LABELS,
  LOCALE_LANG_TAGS,
  LOCALE_NATIVE_NAMES,
  LOCALES,
  isLocale,
  pickLocale,
  type Locale,
} from "@/lib/i18n"
import { ui } from "@/lib/fixtures"

/** Replace the locale segment of a path, keeping the rest (e.g. /id/products → /en/products). */
export function swapLocalePath(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/")
  if (parts.length >= 2 && isLocale(parts[1])) {
    parts[1] = nextLocale
    return parts.join("/") || `/${nextLocale}`
  }
  return `/${nextLocale}`
}

/** Inline code list (ID | EN | …) used in the footer and the mobile drawer. */
export function LanguageSwitcher({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const pathname = usePathname() || `/${locale}`
  const idle = tone === "light" ? "text-white/75 hover:text-white" : "text-muted hover:text-charcoal"
  const active = tone === "light" ? "text-white" : "text-forest"

  return (
    <nav aria-label={pickLocale(ui.language, locale)} className="flex flex-nowrap items-center gap-x-1.5 text-xs font-medium">
      {LOCALES.map((code, index) => (
        <span key={code} className="inline-flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className={tone === "light" ? "text-white/35" : "text-charcoal/30"}>
              |
            </span>
          )}
          <Link
            href={swapLocalePath(pathname, code)}
            hrefLang={LOCALE_LANG_TAGS[code]}
            aria-current={code === locale ? "true" : undefined}
            title={LOCALE_NATIVE_NAMES[code]}
            className={`inline-flex min-h-11 items-center ${code === locale ? active : idle}`}
          >
            {LOCALE_LABELS[code]}
          </Link>
        </span>
      ))}
    </nav>
  )
}

export function GlobeIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9S14.5 18.4 12 21c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3Z" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Header language dropdown: globe + current code. Disclosure button
 * (aria-expanded) controlling a list of locale links that keep the current path.
 * Keyboard: Enter/Space/ArrowDown open (focus moves to the active language),
 * ArrowUp/ArrowDown/Home/End move, Escape closes and returns focus to the trigger.
 */
export function LanguageMenu({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const focusIndex = useRef(LOCALES.indexOf(locale))
  const menuId = useId()
  const label = pickLocale(ui.language, locale)

  useEffect(() => {
    if (!open) return
    itemRefs.current[focusIndex.current]?.focus()
    const onDown = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [open])

  const openAt = (index: number) => {
    focusIndex.current = index
    if (open) itemRefs.current[index]?.focus()
    else setOpen(true)
  }

  const close = (returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }

  const onTriggerKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      openAt(LOCALES.indexOf(locale))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      openAt(LOCALES.length - 1)
    } else if (event.key === "Escape" && open) {
      event.preventDefault()
      close(true)
    }
  }

  const onItemKey = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const last = LOCALES.length - 1
    let next: number | null = null
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1
    else if (event.key === "ArrowUp") next = index === 0 ? last : index - 1
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = last
    else if (event.key === "Escape") {
      event.preventDefault()
      close(true)
      return
    } else if (event.key === "Tab") {
      setOpen(false)
      return
    }
    if (next !== null) {
      event.preventDefault()
      focusIndex.current = next
      itemRefs.current[next]?.focus()
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          focusIndex.current = LOCALES.indexOf(locale)
          setOpen((v) => !v)
        }}
        onKeyDown={onTriggerKey}
        className="header-link inline-flex h-11 items-center gap-1.5 rounded-[6px] px-3 text-sm font-semibold text-charcoal hover:bg-ivory aria-expanded:bg-ivory"
      >
        <GlobeIcon />
        <span className="sr-only">{label} </span>
        <span>{LOCALE_LABELS[locale]}</span>
      </button>
      <ul
        id={menuId}
        hidden={!open}
        aria-label={label}
        className="header-panel absolute top-[calc(100%+12px)] right-0 z-10 w-60 rounded-[12px] border border-charcoal/10 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(23,32,27,0.28)] backdrop-blur-md"
      >
        {LOCALES.map((code, index) => {
          const active = code === locale
          return (
            <li key={code}>
              <Link
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                href={swapLocalePath(pathname, code)}
                hrefLang={LOCALE_LANG_TAGS[code]}
                lang={LOCALE_LANG_TAGS[code]}
                aria-current={active ? "true" : undefined}
                onKeyDown={(event) => onItemKey(event, index)}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center justify-between gap-3 rounded-[6px] px-3 text-sm hover:bg-ivory/80 focus-visible:bg-ivory/80 ${
                  active ? "font-semibold text-forest" : "text-charcoal"
                }`}
              >
                <span>{LOCALE_NATIVE_NAMES[code]}</span>
                {active ? (
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 text-forest">
                    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span aria-hidden="true" className="text-xs text-muted">
                    {LOCALE_LABELS[code]}
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
