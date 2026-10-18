"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

export type HeroSlide = { src: string; alt: string }

const INTERVAL_MS = 6000

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback)
  return () => document.removeEventListener("visibilitychange", callback)
}
const getHidden = () => document.visibilityState === "hidden"

/**
 * Crossfading photo layer for the home hero (headline/CTAs stay fixed outside it).
 * Auto-advances every 6s (0.8s fade); pauses on hover of the hero, keyboard
 * focus inside the controls, hidden tab, or the visible pause button; never
 * autoplays with prefers-reduced-motion. Only slide 1 is preloaded; the rest
 * mount shortly after hydration. Every layer is absolutely positioned (CLS 0).
 */
export function HeroSlider({
  slides,
  labels,
  photoClassName = "absolute inset-0",
}: {
  slides: HeroSlide[]
  /** Box for the photo layers (controls stay positioned against the whole hero). */
  photoClassName?: string
  labels: { carousel: string; slide: string; show: string; pause: string; play: string }
}) {
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState<"auto" | "paused" | "playing">("auto")
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [loadRest, setLoadRest] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, () => false)
  const total = slides.length

  // User intent (what the pause/play button shows), independent of hover/focus.
  const wantsPlay = mode === "playing" || (mode === "auto" && !reduced)
  const playing = wantsPlay && !hovered && !focusWithin && !hidden && total > 1

  // Hover anywhere on the hero (text included) pauses, not just the photo layer.
  useEffect(() => {
    const hero = rootRef.current?.closest("section")
    if (!hero) return
    // Mouse only: a tap on touch screens would otherwise "hover" forever.
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") setHovered(true)
    }
    const leave = () => setHovered(false)
    hero.addEventListener("pointerenter", enter)
    hero.addEventListener("pointerleave", leave)
    return () => {
      hero.removeEventListener("pointerenter", enter)
      hero.removeEventListener("pointerleave", leave)
    }
  }, [])

  // Mount slides 2..n after hydration so they never compete with the LCP image.
  useEffect(() => {
    const timer = setTimeout(() => setLoadRest(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setLoadRest(true)
      setIndex((i) => (i + 1) % total)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [playing, total])

  const goTo = (i: number) => {
    setLoadRest(true)
    setIndex(i)
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      className="absolute inset-0"
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false)
      }}
    >
      <div className={photoClassName} aria-live={playing ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={labels.slide.replace("{n}", String(i + 1)).replace("{total}", String(total))}
              aria-hidden={!active}
              className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-[800ms] motion-safe:ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              {(i === 0 || loadRest) && (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  preload={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  className="object-cover"
                />
              )}
            </div>
          )
        })}
      </div>

      {total > 1 && (
        <div className="absolute right-5 bottom-5 z-20 flex items-center gap-1 rounded-full bg-forest/85 p-1 text-white backdrop-blur-sm md:right-8 lg:right-12 lg:bottom-10">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={labels.show.replace("{n}", String(i + 1)).replace("{total}", String(total))}
              aria-current={i === index ? "true" : undefined}
              className="group inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full motion-safe:transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/60 group-hover:bg-white"}`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMode(wantsPlay ? "paused" : "playing")}
            aria-label={wantsPlay ? labels.pause : labels.play}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white/10"
          >
            {wantsPlay ? (
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="currentColor">
                <rect x="3.5" y="2.5" width="3" height="11" rx="0.8" />
                <rect x="9.5" y="2.5" width="3" height="11" rx="0.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="currentColor">
                <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
