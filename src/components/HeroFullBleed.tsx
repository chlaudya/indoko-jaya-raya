import Image from "next/image"
import { pickLocale, type Locale } from "@/lib/i18n"
import { IMAGES, type ImageKey } from "@/lib/images"
import { ui } from "@/lib/fixtures"
import { HeroSlider } from "./HeroSlider"

/**
 * Home ("tall") frame. Mobile (<1024): photo band ≈ top 55% of the viewport, curve
 * under it, copy on green. The photo layer only spans band + curve on mobile (so the
 * 16:9 crop isn't blown up to the full hero height). Desktop: the photo fills the frame
 * and the green block (curve + copy) is anchored to the bottom-left.
 */
const TALL = {
  section: "min-h-[max(100svh,600px)]",
  spacer: "h-[max(calc(55svh-var(--hero-cap)),220px)] lg:h-auto lg:min-h-[140px]",
  photo: "h-[max(55svh,calc(220px+var(--hero-cap)))]",
}

/**
 * Subpage hero heights, all widths. `min-h-fit` lets the box grow instead of
 * clipping on unusually short viewports; at normal sizes the cap holds.
 */
const SUB_HEIGHTS = {
  medium: "h-[min(65svh,600px)]",
  short: "h-[min(50svh,480px)]",
}

/**
 * Curve edges. Mobile/tablet: a gentle wave (green below ~68% of the cap at every x),
 * so full-width copy can start at 72%. Desktop: a sweep from high on the left to low on
 * the right (green below 54% of the cap for the left 62%), so the copy, capped at
 * ~56vw, can rise into the cap while the photo stays visible further down on the right.
 */
const CAP_EDGE_MOBILE = "M0 64C380 -8 820 262 1440 120"
const CAP_EDGE_DESKTOP = "M0 30C420 20 900 200 1440 250"

function CapSvg({ edge, viewHeight, className }: { edge: string; viewHeight: number; className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-hero-cap=""
      viewBox={`0 0 1440 ${viewHeight}`}
      preserveAspectRatio="none"
      className={`w-full ${className}`}
    >
      <path d={`${edge}L1440 ${viewHeight}L0 ${viewHeight}Z`} fill="var(--color-forest)" />
      {/* Decorative thin line along the edge (not text). */}
      <path d={edge} transform="translate(0 -10)" fill="none" stroke="#a8b89c" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Green "continuous frame" edge: forest fill + thin decorative #a8b89c line above it. */
export function HeroCap() {
  return (
    <>
      <CapSvg edge={CAP_EDGE_MOBILE} viewHeight={240} className="block h-[var(--hero-cap)] lg:hidden" />
      <CapSvg edge={CAP_EDGE_DESKTOP} viewHeight={300} className="hidden h-[var(--hero-cap-lg)] lg:block" />
    </>
  )
}

/**
 * Hero with the curved green frame: photo (or crossfading slides on Home) top-right,
 * a forest curve sweeping up from bottom-left, and the statement on the green.
 * The bottom is solid forest (#123b2a) so a following forest band reads as one
 * surface. `data-hero` lets the floating header overlay it (globals.css).
 */
export function HeroFullBleed({
  locale,
  image,
  slides,
  videoSrc,
  eyebrow,
  title,
  lead,
  children,
  height = "tall",
  titleSize = "display-xl",
  as: Heading = "h1",
  strongScrimMobile = false,
}: {
  locale: Locale
  image?: ImageKey
  /** 2+ images turn the photo into an auto slider (Home only). */
  slides?: ImageKey[]
  videoSrc?: string
  eyebrow?: string
  title: string
  lead?: string
  children?: React.ReactNode
  /** tall = Home (full height, curved frame); medium/short = capped photo-only subpage heroes. */
  height?: "tall" | keyof typeof SUB_HEIGHTS
  titleSize?: "display-xl" | "display-h1"
  as?: "h1" | "h2"
  /** Subpage heroes only: stronger copy scrim under 768px. */
  strongScrimMobile?: boolean
}) {
  const frame = TALL
  const meta = image ? IMAGES[image] : undefined
  const isSlider = Boolean(slides && slides.length > 1)

  if (height !== "tall") {
    return (
      <PhotoHero locale={locale} image={image} heightClass={SUB_HEIGHTS[height]} eyebrow={eyebrow} title={title} lead={lead} as={Heading} compact={height === "short"} strongScrimMobile={strongScrimMobile}>
        {children}
      </PhotoHero>
    )
  }

  return (
    <section data-hero className={`relative isolate flex flex-col overflow-hidden bg-forest text-white ${frame.section}`}>
      {isSlider && slides ? (
        <HeroSlider
          photoClassName={`absolute inset-x-0 top-0 lg:bottom-0 lg:h-auto ${frame.photo}`}
          slides={slides.map((key) => ({ src: IMAGES[key].src, alt: pickLocale(IMAGES[key].alt, locale) }))}
          labels={{
            carousel: pickLocale(ui.heroCarousel, locale),
            slide: pickLocale(ui.slideOf, locale),
            show: pickLocale(ui.showSlide, locale),
            pause: pickLocale(ui.pauseSlideshow, locale),
            play: pickLocale(ui.playSlideshow, locale),
          }}
        />
      ) : (
        <div className={`absolute inset-x-0 top-0 lg:bottom-0 lg:h-auto ${frame.photo}`}>
          {meta ? (
            <Image src={meta.src} alt={pickLocale(meta.alt, locale)} fill preload sizes="100vw" className="object-cover" />
          ) : (
            <div className="ph ph-field absolute inset-0" />
          )}
          {videoSrc && (
            <video
              className="absolute inset-0 size-full object-cover motion-reduce:hidden"
              autoPlay
              muted
              loop
              playsInline
              poster={meta?.src}
              aria-hidden="true"
            >
              <source src={videoSrc} />
            </video>
          )}
        </div>
      )}

      {/* Photo band (mobile: fixed height; desktop: whatever the copy leaves). */}
      <div aria-hidden="true" className={`shrink-0 lg:flex-1 ${frame.spacer}`} />

      {/* Green block: curve + copy. z-10 keeps it above the photo; slider controls sit at z-20. */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-none">
        <HeroCap />
        <div className="-mt-px flex-1 bg-forest">
          {/* Pull the copy up into the solid part of the curve (mobile: 28% of the cap; desktop: 40%). */}
          <div
            className={`site-wrap relative -mt-[calc(var(--hero-cap)*0.28)] pt-2 lg:-mt-[calc(var(--hero-cap-lg)*0.4)] ${
              isSlider ? "pb-24 lg:pb-20" : "pb-14 lg:pb-20"
            }`}
          >
            {/* Desktop width cap keeps the copy inside the green part of the sweep (see CAP_EDGE_DESKTOP). */}
            <div className="fade-up max-w-4xl lg:max-w-[min(60rem,56vw)]">
              {eyebrow && <p className="label text-soft-sage!">{eyebrow}</p>}
              <Heading className={`display ${titleSize} mt-4 text-balance`}>{title}</Heading>
              {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 lg:text-xl">{lead}</p>}
              {children && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{children}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Subpage hero: full-bleed photo only (no curve, no green shape), capped in height.
 * Eyebrow/headline/lead/CTA sit bottom-left in white over a dark bottom-left gradient
 * (≥60% black under the copy, clear toward the top-right) so text stays ≥4.5:1 even
 * over a pure-white pixel. Copy starts below the floating header bar.
 */
function PhotoHero({
  locale,
  image,
  heightClass,
  eyebrow,
  title,
  lead,
  children,
  compact,
  strongScrimMobile = false,
  as: Heading,
}: {
  locale: Locale
  image?: ImageKey
  heightClass: string
  /** Darker local scrim under 768px for photos whose bright areas sit behind phone-width copy (Katalog). */
  strongScrimMobile?: boolean
  eyebrow?: string
  title: string
  lead?: string
  children?: React.ReactNode
  compact: boolean
  as: "h1" | "h2"
}) {
  const meta = image ? IMAGES[image] : undefined
  return (
    <section data-hero className={`relative isolate flex min-h-fit flex-col overflow-hidden bg-forest text-white ${heightClass}`}>
      <div className="absolute inset-0 -z-10">
        {meta ? (
          <Image src={meta.src} alt={pickLocale(meta.alt, locale)} fill preload sizes="100vw" className="object-cover" />
        ) : (
          <div className="ph ph-field absolute inset-0" />
        )}
        {/* Bottom-left scrim: bottom-up + left-right layers multiply under the copy. */}
        {/* Bottom-up: 75% black at the bottom, 30% at mid-height, clear from 60% up (top of the photo stays light). */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0)_60%)]" />
        {/* Left layer only across the left half of the width. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_50%)]" />
      </div>
      <div
        className={`site-wrap flex flex-1 flex-col justify-end pt-[calc(var(--header-offset)+8px)] ${
          compact ? "pb-20 lg:pb-24" : "pb-10 lg:pb-14"
        }`}
      >
        <div className="fade-up relative isolate max-w-2xl lg:max-w-[min(44rem,55vw)]">
          {/* Soft local scrim behind the copy only (the gradients alone leave the headline <5:1 on bright photos). */}
          <div
            aria-hidden="true"
            className={`absolute -inset-12 -z-10 rounded-[64px] bg-black/55 blur-xl ${strongScrimMobile ? "max-md:bg-black/70" : ""}`}
          />
          {eyebrow && <p className="label text-white!">{eyebrow}</p>}
          <Heading className="display display-sub mt-3 text-balance lg:mt-4">{title}</Heading>
          {lead && <p className="mt-3 max-w-xl text-base leading-relaxed text-white lg:mt-4 lg:text-lg">{lead}</p>}
          {children && <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-7">{children}</div>}
        </div>
      </div>
    </section>
  )
}
