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

/** Desktop "Products" entry: label links to the catalog, chevron/hover opens a full-width panel. */
export function MegaMenu({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
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
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div ref={wrapRef} className="flex h-full items-center" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href={`/${locale}/products`}
        className="inline-flex h-full items-center border-b-2 border-transparent text-charcoal/80 hover:border-forest hover:text-charcoal"
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mega-products"
        aria-label={`${label} — ${pickLocale(ui.browseByCategory, locale)}`}
        onClick={() => setOpen((v) => !v)}
        className="ml-0.5 inline-flex size-8 items-center justify-center text-charcoal/60 hover:text-charcoal"
      >
        <svg viewBox="0 0 12 12" aria-hidden="true" className={`size-3 motion-safe:transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div id="mega-products" className="absolute inset-x-0 top-full border-t border-charcoal/10 bg-white shadow-[0_24px_40px_-32px_rgba(23,32,27,0.35)]">
          <div className="site-wrap grid grid-cols-12 gap-8 py-10">
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
      )}
    </div>
  )
}
