"use client"

import Image from "next/image"
import { useState } from "react"
import { pickLocale, type Locale } from "@/lib/i18n"
import { IMAGES, type ImageKey } from "@/lib/images"

/**
 * Product photo carousel. One landscape frame (4:3) so a portrait original
 * doesn't stretch the split hero. Manual only — no autoplay.
 */
export function ProductGallery({
  images,
  locale,
  labels,
}: {
  images: ImageKey[]
  locale: Locale
  labels: { previous: string; next: string; slide: string }
}) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const go = (next: number) => setIndex((next + total) % total)

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.slide.replace("{n}", String(index + 1)).replace("{total}", String(total))}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1)
        if (event.key === "ArrowRight") go(index + 1)
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-leaf">
        {images.map((key, i) => {
          const meta = IMAGES[key]
          const active = i === index
          return (
            <div
              key={key}
              role="group"
              aria-roledescription="slide"
              aria-label={labels.slide.replace("{n}", String(i + 1)).replace("{total}", String(total))}
              aria-hidden={!active}
              className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-500 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <Image
                src={meta.src}
                alt={pickLocale(meta.alt, locale)}
                fill
                sizes="(min-width: 1376px) 740px, (min-width: 1024px) 55vw, 100vw"
                preload={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                className="object-cover"
              />
            </div>
          )
        })}
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {images.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => go(i)}
                aria-label={labels.slide.replace("{n}", String(i + 1)).replace("{total}", String(total))}
                aria-current={i === index ? "true" : undefined}
                className="group inline-flex size-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full motion-safe:transition-all ${i === index ? "w-6 bg-forest" : "w-2 bg-forest/35 group-hover:bg-forest/70"}`}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={labels.previous}
              className="inline-flex size-11 items-center justify-center rounded-full border border-forest/30 text-forest hover:bg-forest hover:text-white"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3.5 5.5 8 10 12.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={labels.next}
              className="inline-flex size-11 items-center justify-center rounded-full border border-forest/30 text-forest hover:bg-forest hover:text-white"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3.5 10.5 8 6 12.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
