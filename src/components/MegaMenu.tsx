"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { pickLocale, type Locale } from "@/lib/i18n"
import { categories, products, ui } from "@/lib/fixtures"
import { Photo } from "./Photo"

function featuredForMenu() {
  return products
    .filter((p) => p.kind === "product")
    .sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)) || Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, 4)
}

/** Shared desktop nav item look: bold charcoal, leaf underline on hover/current. */
export const navLinkClass =
  "relative inline-flex h-11 items-center px-1 text-[0.9375rem] font-semibold text-charcoal hover:text-leaf after:absolute after:inset-x-1 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-leaf after:opacity-0 hover:after:opacity-100 aria-[current=page]:after:opacity-100"

export function NavChevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={`size-3 motion-safe:transition-transform ${open ? "rotate-180" : ""}`}>
      <path d="M2.5 4.5l3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const chevronButtonClass =
  "-ml-0.5 inline-flex size-8 items-center justify-center rounded-[6px] text-charcoal hover:bg-ivory hover:text-leaf aria-expanded:text-leaf"

/** Hover-intent + Escape/outside-click handling shared by the header dropdowns. */
export function useDropdown() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // When hover just opened the panel, the click that follows on the chevron must not close it again.
  const hoverOpenedAt = useRef(0)

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      const hadFocus = wrapRef.current?.contains(document.activeElement)
      setOpen(false)
      if (hadFocus) buttonRef.current?.focus()
    }
    function onClick(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [open])

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (!open) hoverOpenedAt.current = Date.now()
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }
  const toggle = () => {
    // Click right after hover-open (same pointer gesture): keep it open instead of toggling shut.
    if (Date.now() - hoverOpenedAt.current < 500) {
      setOpen(true)
      return
    }
    setOpen((v) => !v)
  }
  return { open, setOpen, wrapRef, buttonRef, show, hide, toggle }
}

/** Desktop "Komoditi" entry: label links to the catalog, chevron/hover opens a panel under the floating bar. */
export function MegaMenu({ locale, label }: { locale: Locale; label: string }) {
  const { open, setOpen, wrapRef, buttonRef, show, hide, toggle } = useDropdown()

  return (
    <div ref={wrapRef} className="flex h-full items-center" onMouseEnter={show} onMouseLeave={hide}>
      <Link href={`/${locale}/products`} className={navLinkClass} onClick={() => setOpen(false)}>
        {label}
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mega-products"
        aria-label={`${label} — ${pickLocale(ui.browseByCategory, locale)}`}
        onClick={toggle}
        className={chevronButtonClass}
      >
        <NavChevron open={open} />
      </button>
      {open && (
        // pt-3 is a transparent hover bridge between the bar and the panel.
        <div id="mega-products" className="absolute inset-x-0 top-full pt-3">
          <div className="rounded-[12px] border border-charcoal/10 bg-white shadow-[0_24px_48px_-24px_rgba(23,32,27,0.35)]">
            <div className="grid grid-cols-12 gap-8 px-8 py-8">
              <div className="col-span-3">
                <p className="label">{pickLocale(ui.browseByCategory, locale)}</p>
                <ul className="mt-4 space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={cat.slug === "layanan" ? `/${locale}/services/drying` : `/${locale}/products?category=${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-base text-charcoal hover:text-forest hover:underline hover:underline-offset-4"
                      >
                        {pickLocale(cat.title, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/products`}
                  onClick={() => setOpen(false)}
                  className="text-link mt-4 text-forest"
                >
                  {pickLocale(ui.viewAllCommodities, locale)} <span aria-hidden="true" className="arrow">→</span>
                </Link>
              </div>
              <div className="col-span-9">
                <p className="label">{pickLocale(ui.featuredCommodities, locale)}</p>
                <ul className="mt-4 grid grid-cols-4 gap-6">
                  {featuredForMenu().map((p) => (
                    <li key={p.slug}>
                      <Link href={`/${locale}/products/${p.slug}`} onClick={() => setOpen(false)} className="group block">
                        <Photo
                          image={p.image}
                          locale={locale}
                          aspect="aspect-[4/3]"
                          sizes="(min-width: 1376px) 220px, 16vw"
                          zoom
                        />
                        <p className="mt-3 text-sm font-medium text-charcoal group-hover:text-forest">{pickLocale(p.name, locale)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/** Small dropdown nav item (e.g. "Perusahaan"): label links to `href`, chevron/hover opens a short link list. */
export function NavDropdown({
  id,
  label,
  menuLabel,
  href,
  items,
}: {
  id: string
  label: string
  menuLabel: string
  href: string
  items: { href: string; label: string }[]
}) {
  const { open, setOpen, wrapRef, buttonRef, show, hide, toggle } = useDropdown()

  return (
    <div ref={wrapRef} className="relative flex h-full items-center" onMouseEnter={show} onMouseLeave={hide}>
      <Link href={href} className={navLinkClass} onClick={() => setOpen(false)}>
        {label}
      </Link>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={menuLabel}
        onClick={toggle}
        className={chevronButtonClass}
      >
        <NavChevron open={open} />
      </button>
      {open && (
        <div id={id} className="absolute top-full left-0 pt-3">
          <ul className="w-64 rounded-[12px] border border-charcoal/10 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(23,32,27,0.28)]">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-[6px] px-3 text-sm font-medium text-charcoal hover:bg-ivory hover:text-leaf"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
