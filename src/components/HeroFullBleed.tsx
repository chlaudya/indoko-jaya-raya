import Image from "next/image";
import { pickLocale, type Locale } from "@/lib/i18n";
import { IMAGES, type ImageKey } from "@/lib/images";
import { ui } from "@/lib/fixtures";
import { HeroSlider } from "./HeroSlider";

/**
 * Subpage hero heights, all widths. `min-h-fit` lets the box grow instead of
 * clipping on unusually short viewports; at normal sizes the cap holds.
 */
const SUB_HEIGHTS = {
  medium: "h-[min(65svh,600px)]",
  short: "h-[min(50svh,480px)]",
};

/** A Home hero slide: image + focal point (CSS object-position). A CMS hotspot (0..1) wins when present. */
export type HeroSlideRef = {
  image: ImageKey;
  /** Desktop (≥1024px) object-position; `positionMobile` for the photo band on smaller screens. */
  position?: string;
  positionMobile?: string;
  hotspot?: { x: number; y: number };
};

const slidePosition = (slide: HeroSlideRef) =>
  slide.hotspot
    ? `${Math.round(slide.hotspot.x * 1000) / 10}% ${Math.round(slide.hotspot.y * 1000) / 10}%`
    : (slide.position ?? "center");

/**
 * Home frame (Cargill-style wave), designer values on a 1440×900 grid, stretched to the hero with
 * preserveAspectRatio="none" so the curve stays continuous. Solid green (no blur) fills below the
 * wave; the lime band is the same curve lifted 45px at the ends / ~12px at the dip and sits BEHIND
 * the green, so it reads wide at the edges and thin in the middle. The photo shows in the bowl.
 */
const WAVE_GREEN = "M0,180 C320,190 600,560 900,570 C1100,575 1300,400 1440,190 L1440,900 L0,900 Z";
const WAVE_LIME = "M0,135 C320,145 600,548 900,558 C1100,563 1300,355 1440,145 L1440,900 L0,900 Z";
/** Phones/tablets (<1024px): one gentle wave under the photo (viewBox 1440×160). */
const WAVE_GREEN_M = "M0,70 C380,30 900,150 1440,64 L1440,160 L0,160 Z";
const WAVE_LIME_M = "M0,26 C380,-14 900,138 1440,20 L1440,160 L0,160 Z";

/**
 * <1024px: photo band = top 55svh (+ the wave cap, which overlaps it); the green starts at 55svh
 * and fills the rest of the full-height hero. ≥1024px: photo and overlay cover the whole hero.
 */
const TALL_PHOTO = "absolute inset-x-0 top-0 h-[calc(55svh+3.5rem)] sm:h-[calc(55svh+5rem)] lg:h-full";
const TALL_OVERLAY =
  "relative mt-[calc(55svh-3.5rem)] sm:mt-[calc(55svh-5rem)] flex min-h-[calc(max(100svh,600px)-55svh+3.5rem)] sm:min-h-[calc(max(100svh,600px)-55svh+5rem)] flex-col lg:absolute lg:inset-0 lg:mt-0 lg:min-h-0";

/**
 * Overlay above the photos: the wave (desktop: full hero; <1024px: a cap under the photo band)
 * and the copy, which always sits on solid green. Desktop copy is left-aligned with the floating
 * header bar (max(24px, (100% − 1280px) / 2)), headline from ~48% of the hero height, max 540px.
 * 1024–1279px: the stretched wave sits higher relative to the copy, so the copy is 440px wide,
 * the headline 44px and it starts at ~56% (keeps every line on solid green).
 */
function WaveFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden size-full lg:block"
      >
        <path d={WAVE_LIME} fill="#a8d27a" fillOpacity="0.7" />
        <path d={WAVE_GREEN} fill="var(--color-hero-green)" />
      </svg>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="pointer-events-none relative block h-14 w-full sm:h-20 lg:hidden"
      >
        <path d={WAVE_LIME_M} fill="#a8d27a" fillOpacity="0.7" />
        <path d={WAVE_GREEN_M} fill="var(--color-hero-green)" />
      </svg>
      <div className="relative -mt-px flex-1 bg-hero-green px-5 pt-2 pb-10 sm:px-8 lg:absolute lg:top-[var(--hero-copy-top)] lg:left-[max(24px,calc((100%-1280px)/2))] lg:mt-0 lg:w-[min(540px,calc(100%-48px))] lg:max-xl:w-[440px] lg:flex-none lg:bg-transparent lg:p-0">
        {children}
      </div>
    </>
  );
}

/**
 * Home ("tall") hero: full-height photo (or crossfading slides) with the copy on a solid
 * green wave (Cargill-style frame). Subpages (medium/short) use the capped photo-only PhotoHero.
 * `data-hero` lets the floating header overlay it (globals.css).
 */
/** Wrap the first occurrence of `phrase` in <em>; falls back to the plain title when it isn't found. */
function renderEmphasis(title: string, phrase?: string) {
  const i = phrase ? title.indexOf(phrase) : -1;
  if (!phrase || i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <em>{phrase}</em>
      {title.slice(i + phrase.length)}
    </>
  );
}

export function HeroFullBleed({
  locale,
  image,
  slides,
  videoSrc,
  eyebrow,
  title,
  titleEmphasis,
  lead,
  children,
  height = "tall",
  as: Heading = "h1",
  strongScrimMobile = false,
}: {
  locale: Locale;
  image?: ImageKey;
  /** 2+ slides turn the photo into an auto slider (Home only). */
  slides?: HeroSlideRef[];
  videoSrc?: string;
  eyebrow?: string;
  title: string;
  /** Home: phrase inside `title` set in italic; the rest stays upright (roman). */
  titleEmphasis?: string;
  lead?: string;
  children?: React.ReactNode;
  /** tall = Home (full height, green wave frame); medium/short = capped photo-only subpage heroes. */
  height?: "tall" | keyof typeof SUB_HEIGHTS;
  as?: "h1" | "h2";
  /** Subpage heroes only: stronger copy scrim under 768px. */
  strongScrimMobile?: boolean;
}) {
  const meta = image ? IMAGES[image] : undefined;
  const isSlider = Boolean(slides && slides.length > 1);

  if (height !== "tall") {
    return (
      <PhotoHero
        locale={locale}
        image={image}
        heightClass={SUB_HEIGHTS[height]}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        as={Heading}
        compact={height === "short"}
        strongScrimMobile={strongScrimMobile}
      >
        {children}
      </PhotoHero>
    );
  }

  // White on #2f7d3e is 5.1:1; tinted/translucent white would drop below 4.5:1.
  const copy = (
    <div className="fade-up">
      {eyebrow && <p className="label text-white!">{eyebrow}</p>}
      <Heading
        className={`display mt-4 max-w-[560px] text-[clamp(2rem,2.6vw,2.75rem)] leading-[1.1]! text-balance ${
          // Latin scripts: italic key phrase. zh/hi (Cormorant has no glyphs): lime, same weight, upright.
          locale === "zh" || locale === "hi" ? "[&_em]:not-italic [&_em]:text-[var(--hero-accent-cjk)]" : "[&_em]:italic"
        }`}
      >
        {renderEmphasis(title, titleEmphasis)}
      </Heading>
      {lead && (
        <p className="mt-4 line-clamp-3 max-w-xl text-lg leading-snug text-white">
          {lead}
        </p>
      )}
      {children && (
        <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div>
      )}
    </div>
  );

  return (
    <section
      data-hero
      className="relative isolate flex min-h-[max(100svh,600px)] flex-col overflow-hidden bg-hero-green text-white"
    >
      {isSlider && slides ? (
        <HeroSlider
          slides={slides.map((slide) => ({
            src: IMAGES[slide.image].src,
            alt: pickLocale(IMAGES[slide.image].alt, locale),
            position: slidePosition(slide),
            positionMobile: slide.hotspot ? slidePosition(slide) : slide.positionMobile,
          }))}
          photoClassName={TALL_PHOTO}
          overlayClassName={TALL_OVERLAY}
          labels={{
            carousel: pickLocale(ui.heroCarousel, locale),
            slide: pickLocale(ui.slideOf, locale),
            pause: pickLocale(ui.pauseSlideshow, locale),
            play: pickLocale(ui.playSlideshow, locale),
          }}
        >
          <WaveFrame>{copy}</WaveFrame>
        </HeroSlider>
      ) : (
        <div className="relative flex flex-1 flex-col">
          <div className={TALL_PHOTO}>
            {meta ? (
              <Image
                src={meta.src}
                alt={pickLocale(meta.alt, locale)}
                fill
                preload
                sizes="100vw"
                className="object-cover"
              />
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
          <div className={TALL_OVERLAY}>
            <WaveFrame>{copy}</WaveFrame>
          </div>
        </div>
      )}
    </section>
  );
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
  locale: Locale;
  image?: ImageKey;
  heightClass: string;
  /** Darker local scrim under 768px for photos whose bright areas sit behind phone-width copy (Katalog). */
  strongScrimMobile?: boolean;
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  compact: boolean;
  as: "h1" | "h2";
}) {
  const meta = image ? IMAGES[image] : undefined;
  return (
    <section
      data-hero
      className={`relative isolate flex min-h-fit flex-col overflow-hidden bg-forest text-white ${heightClass}`}
    >
      <div className="absolute inset-0 -z-10">
        {meta ? (
          <Image
            src={meta.src}
            alt={pickLocale(meta.alt, locale)}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
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
          <Heading className="display display-sub mt-3 text-balance lg:mt-4">
            {title}
          </Heading>
          {lead && (
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white lg:mt-4 lg:text-lg">
              {lead}
            </p>
          )}
          {children && (
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-7">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
