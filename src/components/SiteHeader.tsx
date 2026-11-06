"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LOCALE_LANG_TAGS, LOCALE_NATIVE_NAMES, LOCALES, pickLocale, type Locale } from "@/lib/i18n"
import { categories, nav, redesign, ui } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { LanguageMenu, swapLocalePath } from "./LanguageSwitcher"
import { MegaMenu, NavDropdown, navLinkClass } from "./MegaMenu"
import { WhatsAppIcon, buttonClass } from "./WaButton"
import { BrandMark } from "./BrandMark"

function itemHref(locale: Locale, href: string) {
  if (!href) return `/${locale}`
  if (href.startsWith("#")) return `/${locale}${href}`
  return `/${locale}/${href}`
}

function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="flex min-h-11 shrink-0 items-center rounded-lg">
      <BrandMark variant="header" />
    </Link>
  )
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [lastPath, setLastPath] = useState(pathname)
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })
  const ctaLabel = pickLocale(ui.requestQuote, locale)

  // Close the drawer on navigation (render-phase reset, no effect needed).
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const trigger = menuButtonRef.current
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
      trigger?.focus()
    }
  }, [open])

  const isCurrent = (href: string) => !href.startsWith("#") && pathname === itemHref(locale, href)

  return (
    // Floating bar: fixed over the hero. Pages without a
    // hero get top padding from `main#content` in globals.css so nothing hides beneath it.
    <header
      className="pointer-events-none fixed inset-x-0 top-4 z-50 px-6"
    >
      <div
        data-scrolled={scrolled ? "" : undefined}
        className="header-bar pointer-events-auto relative mx-auto flex h-16 max-w-[1280px] items-center gap-4 rounded-xl border border-white/70 bg-white/70 pr-2 pl-4 shadow-[0_10px_30px_-12px_rgba(23,32,27,0.28)] backdrop-blur-md motion-safe:transition-colors motion-safe:duration-300 sm:pl-5 lg:gap-6 lg:pr-3 data-[scrolled]:bg-white/88"
      >
        <Logo locale={locale} />
        <nav className="hidden h-full flex-1 items-center justify-center gap-1 lg:flex xl:gap-4" aria-label="Primary">
          {nav.map((item) => {
            const label = pickLocale(item.label, locale)
            if (item.href === "products") return <MegaMenu key={item.href} locale={locale} label={label} />
            if (item.href === "about")
              return (
                <NavDropdown
                  key={item.href}
                  id="menu-company"
                  label={label}
                  menuLabel={`${label} — ${pickLocale(ui.companyMenu, locale)}`}
                  href={itemHref(locale, item.href)}
                  items={[
                    { href: `/${locale}/about`, label: pickLocale(ui.aboutUs, locale) },
                    { href: `/${locale}/company`, label: pickLocale(ui.companyProfile, locale) },
                  ]}
                />
              )
            return (
              <Link
                key={item.href}
                href={itemHref(locale, item.href)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`${navLinkClass} xl:px-1.5`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-2">
          <div className="hidden lg:block">
            <LanguageMenu locale={locale} />
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${ctaLabel} — WhatsApp`}
            data-header-cta=""
            className="button-sm btn-lime inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-forest bg-lime px-3 py-2 whitespace-nowrap text-forest hover:bg-lime-tint active:scale-[0.98] motion-safe:transition-[transform,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-10 lg:min-h-0 lg:border-0"
          >
            <WhatsAppIcon className="size-4" />
            {/* Visible text on mobile + desktop (mobile was icon-only). ui.requestQuoteShort kept for narrow fallbacks. */}
            <span>{ctaLabel}</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[6px] text-charcoal hover:bg-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={pickLocale(ui.openMenu, locale)}
            onClick={() => setOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
              <path
                d="M3 7h18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className={`origin-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <path
                d="M3 12h18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className={`motion-safe:transition-opacity motion-safe:duration-300 ${open ? "opacity-0" : ""}`}
              />
              <path
                d="M3 17h18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className={`origin-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`pointer-events-auto fixed inset-0 z-[60] lg:hidden ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-charcoal/50 motion-safe:transition-opacity motion-safe:duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={pickLocale(ui.menu, locale)}
          className={`absolute inset-y-0 right-0 flex w-[min(88vw,400px)] flex-col bg-white/95 backdrop-blur-xl motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-charcoal/10 px-5">
            <Logo locale={locale} />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={pickLocale(ui.closeMenu, locale)}
              tabIndex={open ? 0 : -1}
              className="inline-flex size-11 items-center justify-center rounded-[6px] hover:bg-ivory"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <nav aria-label="Primary mobile">
              <ul>
                {nav.map((item, index) => (
                  <li key={item.href} className="border-b border-charcoal/10">
                    <Link
                      href={itemHref(locale, item.href)}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center justify-between text-lg text-charcoal motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                      }`}
                      style={{ transitionDelay: `${Math.min(index * 60, 360)}ms` }}
                    >
                      {pickLocale(item.label, locale)}
                      <span aria-hidden="true" className="text-forest">→</span>
                    </Link>
                    {item.href === "products" && (
                      <ul className="pb-3 pl-3">
                        {categories
                          .filter((c) => c.slug !== "layanan")
                          .map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/${locale}/products?category=${c.slug}`}
                                tabIndex={open ? 0 : -1}
                                className="flex min-h-11 items-center text-sm text-muted hover:text-forest"
                              >
                                {pickLocale(c.title, locale)}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="space-y-4 border-t border-charcoal/10 bg-ivory px-5 py-5">
            <nav aria-label={pickLocale(ui.language, locale)}>
              <p className="label">{pickLocale(ui.language, locale)}</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-3">
                {LOCALES.map((code) => (
                  <li key={code}>
                    <Link
                      href={swapLocalePath(pathname || `/${locale}`, code)}
                      hrefLang={LOCALE_LANG_TAGS[code]}
                      lang={LOCALE_LANG_TAGS[code]}
                      tabIndex={open ? 0 : -1}
                      aria-current={code === locale ? "true" : undefined}
                      className={`flex min-h-11 items-center gap-2 text-sm ${
                        code === locale ? "font-semibold text-forest" : "text-charcoal hover:text-forest"
                      }`}
                    >
                      {LOCALE_NATIVE_NAMES[code]}
                      {code === locale && (
                        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
                          <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="text-xs text-muted">{pickLocale(redesign.tagline, locale)}</p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className={`${buttonClass("wa-secondary")} w-full`}
            >
              <WhatsAppIcon />
              {pickLocale(ui.requestQuote, locale)}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
