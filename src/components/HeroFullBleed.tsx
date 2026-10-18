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
 * Home hero: the photo layers fill the whole hero; the overlay holds the scrim and the copy.
 * Height --hero-h = max(600px, min(88svh, 820px)).
 */
const TALL_PHOTO = "absolute inset-0";
const TALL_OVERLAY = "hero-overlay absolute inset-0 flex flex-col";

/**
 * Contrast scrim in brand forest (no curve, no lime band). ≥1024px: left → right, rgba(18,59,42) .92 at 0%,
 * .6 at 40%, clear at 65% (designer spec), so the subject on the right stays clear. Phones / tablets: the copy sits
 * at the bottom, so the scrim runs bottom → top instead.
 */
function HeroScrim() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,59,42,0.94)_0%,rgba(18,59,42,0.9)_max(45%,400px),rgba(18,59,42,0.5)_max(66%,500px),rgba(18,59,42,0)_max(84%,600px))] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(18,59,42,0.92)_0%,rgba(18,59,42,0.84)_40%,rgba(18,59,42,0.68)_54%,rgba(18,59,42,0.25)_66%,rgba(18,59,42,0)_78%)] lg:block"
      />
    </>
  );
}

/** Copy on the 12-col grid: cols 1–6 on desktop, bottom-aligned on phones / tablets, below the floating header. */
function HeroCopyFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroScrim />
      <div className="site-wrap relative flex flex-1 flex-col justify-end pt-[calc(var(--header-offset)+16px)] pb-10 sm:pb-14 lg:justify-center lg:pb-8">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-6">{children}</div>
        </div>
      </div>
    </>
  );
}

/**
 * Home ("tall") hero: full-bleed photo (or crossfading slides) with a forest scrim and the copy on the left.
 * Subpages (medium/short) use the capped photo-only PhotoHero. `data-hero` lets the floating header overlay it.
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
  /** tall = Home (full-bleed photo, forest scrim); medium/short = capped photo-only subpage heroes. */
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

  // White text on the forest scrim; measured ≥4.5:1 on all 5 slides (see docs/design/landing-audit-v1.md).
  const copy = (
    <div className="fade-up">
      {eyebrow && <p className="label text-white!">{eyebrow}</p>}
      <Heading
        className={`display display-h1 mt-4 max-w-[13em] leading-[1.05]! text-balance ${
          // Latin scripts: italic key phrase. zh/hi (Cormorant has no glyphs): lime, same weight, upright.
          locale === "zh" || locale === "hi" ? "[&_em]:not-italic [&_em]:text-[var(--hero-accent-cjk)]" : "[&_em]:italic"
        }`}
      >
        {renderEmphasis(title, titleEmphasis)}
      </Heading>
      {lead && (
        <p className="mt-5 line-clamp-3 max-w-[30rem] text-base leading-relaxed text-white sm:text-lg">
          {lead}
        </p>
      )}
      {children && (
        <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>
      )}
    </div>
  );

  return (
    <section
      data-hero
      className="hero-home relative isolate flex h-[var(--hero-h)] flex-col overflow-hidden bg-forest text-white"
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
          <HeroCopyFrame>{copy}</HeroCopyFrame>
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
            <HeroCopyFrame>{copy}</HeroCopyFrame>
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
