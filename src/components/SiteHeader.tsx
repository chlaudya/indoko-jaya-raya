"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { pickLocale, type Locale } from "@/lib/i18n"
import { categories, nav, redesign, ui } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { MegaMenu } from "./MegaMenu"
import { UtilityBar } from "./UtilityBar"
import { WhatsAppIcon, buttonClass } from "./WaButton"

function itemHref(locale: Locale, href: string) {
  if (href.startsWith("#")) return `/${locale}${href}`
  return `/${locale}/${href}`
}

function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5 text-forest">
      <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-forest text-sm font-semibold text-ivory">
        IJ
      </span>
      <span className="leading-none">
        <span className="block text-[0.95rem] font-semibold tracking-[0.14em] uppercase">Indoco</span>
        <span className="mt-1 block text-[0.65rem] font-medium tracking-[0.22em] text-muted uppercase">Jaya Raya</span>
      </span>
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
  const contactLabel = pickLocale(ui.contactUs, locale)

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

  return (
    <header className="sticky top-0 z-50 lg:-top-8">
      <UtilityBar locale={locale} />
      <div
        className={`relative bg-white motion-safe:transition-shadow ${
          scrolled ? "border-b border-charcoal/10 shadow-[0_1px_0_rgba(23,32,27,0.04)]" : "border-b border-transparent"
        }`}
      >
        <div className="site-wrap flex h-16 items-center gap-8 lg:h-[72px]">
          <Logo locale={locale} />
          <nav className="hidden h-full flex-1 items-center justify-end gap-6 text-sm font-medium lg:flex xl:gap-8" aria-label="Primary">
            {nav.map((item) =>
              item.href === "products" ? (
                <MegaMenu key={item.href} locale={locale} label={pickLocale(item.label, locale)} />
              ) : (
                <Link
                  key={item.href}
                  href={itemHref(locale, item.href)}
                  className="inline-flex h-full items-center border-b-2 border-transparent text-charcoal/80 hover:border-forest hover:text-charcoal"
                >
                  {pickLocale(item.label, locale)}
                </Link>
              )
            )}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${contactLabel} — WhatsApp`}
              className={`${buttonClass("wa")} max-sm:size-11 max-sm:px-0`}
            >
              <WhatsAppIcon className="size-5 sm:size-4" />
              <span className="max-sm:sr-only">{contactLabel}</span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-charcoal hover:bg-ivory lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={pickLocale(ui.openMenu, locale)}
              onClick={() => setOpen(true)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "visible" : "invisible"}`}
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
          className={`absolute inset-y-0 right-0 flex w-[min(88vw,400px)] flex-col bg-white motion-safe:transition-transform motion-safe:duration-300 ${
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
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-ivory"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <nav aria-label="Primary mobile">
              <ul>
                <li>
                  <Link href={`/${locale}`} tabIndex={open ? 0 : -1} className="flex min-h-12 items-center border-b border-charcoal/10 text-lg text-charcoal">
                    {pickLocale(ui.home, locale)}
                  </Link>
                </li>
                {nav.map((item) => (
                  <li key={item.href} className="border-b border-charcoal/10">
                    <Link
                      href={itemHref(locale, item.href)}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center justify-between text-lg text-charcoal"
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
            <div>
              <p className="label">{pickLocale(ui.language, locale)}</p>
              <div className="mt-1">
                <LanguageSwitcher locale={locale} tone="dark" />
              </div>
            </div>
            <p className="text-xs text-muted">{pickLocale(redesign.tagline, locale)}</p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className={`${buttonClass("wa-secondary")} w-full`}
            >
              <WhatsAppIcon />
              {pickLocale(ui.requestInquiry, locale)}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
