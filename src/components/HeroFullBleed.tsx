import Image from "next/image"
import { pickLocale, type Locale } from "@/lib/i18n"
import { IMAGES, type ImageKey } from "@/lib/images"
import { ui } from "@/lib/fixtures"
import { HeroSlider } from "./HeroSlider"

/**
 * Per-size frame. Mobile (<1024): the photo band has a fixed height (home ≈ top
 * 55% of the viewport), the curve sits under it and the copy follows on green.
 * The photo layer only spans band + curve on mobile (so the 16:9 crop isn't blown up
 * to the full hero height). Desktop: the photo fills the frame and the green block (curve + copy) is
 * anchored to the bottom-left; the spacer keeps the curve below the header.
 */
const frames = {
  tall: {
    section: "min-h-[max(100svh,600px)]",
    spacer: "h-[max(calc(55svh-var(--hero-cap)),220px)] lg:h-auto lg:min-h-[140px]",
    photo: "h-[max(55svh,calc(220px+var(--hero-cap)))]",
  },
  medium: {
    section: "lg:min-h-[max(68svh,560px)]",
    spacer: "h-[230px] sm:h-[300px] lg:h-auto lg:min-h-[140px]",
    photo: "h-[calc(230px+var(--hero-cap))] sm:h-[calc(300px+var(--hero-cap))]",
  },
  short: {
    section: "lg:min-h-[max(52svh,460px)]",
    spacer: "h-[190px] sm:h-[240px] lg:h-auto lg:min-h-[120px]",
    photo: "h-[calc(190px+var(--hero-cap))] sm:h-[calc(240px+var(--hero-cap))]",
  },
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
  height?: keyof typeof frames
  titleSize?: "display-xl" | "display-h1"
  as?: "h1" | "h2"
}) {
  const frame = frames[height]
  const meta = image ? IMAGES[image] : undefined
  const isSlider = Boolean(slides && slides.length > 1)

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
