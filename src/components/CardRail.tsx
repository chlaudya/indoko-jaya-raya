"use client"

import { useRef } from "react"

/**
 * Horizontal, scroll-snapping card rail (swipe on mobile, arrow buttons on
 * desktop). Children are server-rendered cards.
 */
export function CardRail({
  children,
  label,
  prevLabel,
  nextLabel,
  gridFrom,
}: {
  children: React.ReactNode
  label: string
  prevLabel?: string
  nextLabel?: string
  /** "md": swipe rail on phones only (< 768px), the regular 2/3/4-column card grid from md up (no arrows). */
  gridFrom?: "md"
}) {
  const ref = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" })
  }
  if (gridFrom === "md") {
    return (
      <ul
        aria-label={label}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [&>li]:w-[78vw] [&>li]:max-w-[22rem] [&>li]:shrink-0 [&>li]:snap-start md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:[&>li]:w-auto md:[&>li]:max-w-none lg:grid-cols-3 xl:grid-cols-4"
      >
        {children}
      </ul>
    )
  }
  return (
    <div>
      <div className="mb-6 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={prevLabel}
          className="inline-flex size-11 items-center justify-center rounded-[6px] border border-forest/30 text-forest hover:bg-forest hover:text-white"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={nextLabel}
          className="inline-flex size-11 items-center justify-center rounded-[6px] border border-forest/30 text-forest hover:bg-forest hover:text-white"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <ul
        ref={ref}
        aria-label={label}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:scroll-px-0 md:px-0 [&>li]:w-[78vw] [&>li]:shrink-0 [&>li]:snap-start sm:[&>li]:w-[calc((100%-1.5rem)/2)] lg:[&>li]:w-[calc((100%-3rem)/3)]"
      >
        {children}
      </ul>
    </div>
  )
}
