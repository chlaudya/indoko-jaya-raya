"use client"

import { useState } from "react"

/**
 * Home commodity filter: chips (toggle buttons, 6px radius, selected solid forest) over server-rendered cards.
 * Only categories that have items are passed in, so an empty tab never shows. No JS: every card renders.
 */
export function CommodityTabs({
  label,
  allLabel,
  tabs,
  items,
}: {
  label: string
  allLabel: string
  tabs: { slug: string; label: string }[]
  items: { key: string; category: string; node: React.ReactNode }[]
}) {
  const [active, setActive] = useState<string>("all")
  const chip = (slug: string, text: string) => {
    const selected = active === slug
    return (
      <button
        key={slug}
        type="button"
        aria-pressed={selected}
        onClick={() => setActive(slug)}
        className={`inline-flex min-h-11 shrink-0 items-center rounded-[6px] border px-4 text-sm font-medium whitespace-nowrap motion-safe:transition-colors motion-safe:duration-200 ${
          selected ? "border-forest bg-forest text-white" : "border-hairline bg-white text-charcoal hover:border-hover-line"
        }`}
      >
        {text}
      </button>
    )
  }
  const visible = items.filter((item) => active === "all" || item.category === active)
  return (
    <div>
      {tabs.length > 1 && (
        <div role="group" aria-label={label} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {chip("all", allLabel)}
          {tabs.map((tab) => chip(tab.slug, tab.label))}
        </div>
      )}
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((item) => (
          <li key={item.key}>{item.node}</li>
        ))}
      </ul>
    </div>
  )
}
