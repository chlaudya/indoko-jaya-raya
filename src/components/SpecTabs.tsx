"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Accessible tabs for two-form reference tables (design doc §8). Before hydration / without JS every panel renders
 * stacked under its own heading, so the content stays readable; after mount it becomes a WAI-ARIA tablist
 * (arrow keys, Home/End, roving tabindex).
 */
export function SpecTabs({
  idBase,
  label,
  tabs,
  panels,
}: {
  idBase: string
  label: string
  tabs: { label: string; meta?: string }[]
  panels: React.ReactNode[]
}) {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => setMounted(true), [])

  const focusTab = (i: number) => {
    const next = (i + tabs.length) % tabs.length
    setActive(next)
    refs.current[next]?.focus()
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") focusTab(active + 1)
    else if (e.key === "ArrowLeft") focusTab(active - 1)
    else if (e.key === "Home") focusTab(0)
    else if (e.key === "End") focusTab(tabs.length - 1)
    else return
    e.preventDefault()
  }

  return (
    <div className="mt-8">
      {mounted && (
        <div role="tablist" aria-label={label} onKeyDown={onKey} className="flex gap-2 border-b border-hairline">
          {tabs.map((tab, i) => {
            const selected = i === active
            return (
              <button
                key={i}
                ref={(el) => {
                  refs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${idBase}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${idBase}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`-mb-px flex min-h-11 flex-col items-start justify-center border-b-2 px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17201b] ${
                  selected ? "border-[#2e6b38] text-[#17201b]" : "border-transparent text-muted hover:text-charcoal"
                }`}
              >
                <span className="text-[0.9375rem] font-semibold">{tab.label}</span>
                {tab.meta && <span className="text-xs tabular-nums text-muted">{tab.meta}</span>}
              </button>
            )
          })}
        </div>
      )}
      {panels.map((panel, i) => (
        <div
          key={i}
          id={`${idBase}-panel-${i}`}
          role={mounted ? "tabpanel" : undefined}
          aria-labelledby={mounted ? `${idBase}-tab-${i}` : undefined}
          tabIndex={mounted ? 0 : undefined}
          hidden={mounted && i !== active}
          className={mounted ? "pt-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17201b]" : i === 0 ? "" : "mt-12"}
        >
          {!mounted && (
            <h3 className="text-lg font-semibold text-forest">
              {tabs[i].label}
              {tabs[i].meta && <span className="ml-2 text-sm font-normal tabular-nums text-muted">{tabs[i].meta}</span>}
            </h3>
          )}
          {panel}
        </div>
      ))}
    </div>
  )
}
