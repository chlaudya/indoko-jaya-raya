"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"

/** `position` = CSS object-position (focal point) ≥1024px, e.g. "center 35%"; `positionMobile` below that. */
export type HeroSlide = { src: string; alt: string; position?: string; positionMobile?: string }

/** Each photo holds 2s, then a 0.6s crossfade (cycle 2.6s), looping forever. */
const HOLD_MS = 2000
const FADE_MS = 600

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

/** Run once the page is idle (after load), with a timeout fallback. */
function whenIdle(fn: () => void) {
  let cancelled = false
  let idleId: number | undefined
  let timer: ReturnType<typeof setTimeout> | undefined
  const run = () => {
    if (cancelled) return
    if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(() => !cancelled && fn(), { timeout: 2000 })
    else timer = setTimeout(() => !cancelled && fn(), 200)
  }
  if (document.readyState === "complete") run()
  else window.addEventListener("load", run, { once: true })
  return () => {
    cancelled = true
    window.removeEventListener("load", run)
    if (idleId !== undefined) window.cancelIdleCallback(idleId)
    if (timer) clearTimeout(timer)
  }
}

/**
 * Crossfading photo layer for the Home hero, no visible controls. `children` (glass + copy) stay
 * fixed above the photos (phones: in flow at the bottom; ≥768px: covering the hero).
 * - Only slide 1 is preloaded; slides 2..n mount once the page is idle and the rotation only
 *   advances to a slide whose image has loaded (never fades to a blank layer).
 * - Pauses on mouse hover over the hero, focus inside it, a hidden tab, or the pause button
 *   (keyboard-reachable, visually hidden until focused: WCAG 2.2.2).
 * - prefers-reduced-motion: first photo only, no rotation, no button.
 * - Inactive slides are aria-hidden; nothing is announced on rotation (aria-live="off").
 * Every layer is absolutely positioned (CLS 0).
 */
export function HeroSlider({
  slides,
  labels,
  children,
  photoClassName = "absolute inset-0",
  overlayClassName = "relative mt-auto md:absolute md:inset-0",
}: {
  slides: HeroSlide[]
  /** Box for the photo layers. */
  photoClassName?: string
  /** Box for the overlay (children); the pause button is positioned against it. */
  overlayClassName?: string
  /** Overlay (glass + copy) rendered above the photos. */
  children?: React.ReactNode
  labels: { carousel: string; slide: string; pause: string; play: string }
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [mountRest, setMountRest] = useState(false)
  const [loaded, setLoaded] = useState<boolean[]>(() => slides.map((_, i) => i === 0))
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, () => false)
  const total = slides.length
  const rotates = total > 1 && !reduced
  const playing = rotates && !paused && !hovered && !focusWithin && !hidden

  // Hover or keyboard focus anywhere in the hero (copy included) pauses, mouse only (taps would "hover" forever).
  useEffect(() => {
    const hero = rootRef.current?.closest("section")
    if (!hero) return
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") setHovered(true)
    }
    const leave = () => setHovered(false)
    const focusIn = () => setFocusWithin(true)
    const focusOut = (event: FocusEvent) => {
      if (!hero.contains(event.relatedTarget as Node | null)) setFocusWithin(false)
    }
    hero.addEventListener("pointerenter", enter)
    hero.addEventListener("pointerleave", leave)
    hero.addEventListener("focusin", focusIn)
    hero.addEventListener("focusout", focusOut)
    return () => {
      hero.removeEventListener("pointerenter", enter)
      hero.removeEventListener("pointerleave", leave)
      hero.removeEventListener("focusin", focusIn)
      hero.removeEventListener("focusout", focusOut)
    }
  }, [])

  // Slides 2..n mount once the page is idle, well before their first turn (LCP stays slide 1).
  useEffect(() => {
    if (!rotates) return
    return whenIdle(() => setMountRest(true))
  }, [rotates])

  const markLoaded = useCallback((i: number) => {
    setLoaded((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))))
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setIndex((current) => {
        // Next slide whose image is ready; stay put if none is (no blank fades).
        for (let step = 1; step < total; step++) {
          const next = (current + step) % total
          if (loaded[next]) return next
        }
        return current
      })
    }, HOLD_MS + FADE_MS)
    return () => clearInterval(timer)
  }, [playing, total, loaded])

  const shown = reduced ? 0 : index

  return (
    <div ref={rootRef} role="region" aria-roledescription="carousel" aria-label={labels.carousel} className="relative flex flex-1 flex-col">
      <div className={photoClassName} aria-live="off">
        {slides.map((slide, i) => {
          if (i > 0 && (!mountRest || reduced)) return null
          const active = i === shown
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={labels.slide.replace("{n}", String(i + 1)).replace("{total}", String(total))}
              aria-hidden={!active}
              className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-[600ms] motion-safe:ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                preload={i === 0}
                loading={i === 0 ? undefined : "eager"}
                onLoad={() => markLoaded(i)}
                className="hero-photo object-cover"
                style={{ "--pos": slide.position ?? "center", "--pos-m": slide.positionMobile ?? slide.position ?? "center" } as React.CSSProperties}
              />
            </div>
          )
        })}
      </div>

      <div className={overlayClassName}>
        {children}

        {/* Pause/play: keyboard-reachable, visually hidden until focused (then a white pill bottom-right). */}
        {rotates && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="sr-only z-20 focus:not-sr-only focus:absolute focus:right-5 focus:top-0 focus:-translate-y-[calc(100%+12px)] focus:inline-flex focus:min-h-11 focus:items-center focus:gap-2 focus:rounded-full focus:bg-white focus:px-4 focus:text-sm focus:font-semibold focus:text-forest focus:shadow-[0_2px_14px_rgba(0,0,0,0.22)] lg:focus:top-auto lg:focus:right-12 lg:focus:bottom-10 lg:focus:translate-y-0"
          >
            {paused ? (
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="currentColor">
                <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="currentColor">
                <rect x="3.5" y="2.5" width="3" height="11" rx="0.8" />
                <rect x="9.5" y="2.5" width="3" height="11" rx="0.8" />
              </svg>
            )}
            {paused ? labels.play : labels.pause}
          </button>
        )}
      </div>
    </div>
  )
}
