import Image from "next/image"

/**
 * Company logo mark (client-supplied, designer-traced SVG; PNG fallbacks live next to it in /images/brand).
 * The logo stands alone (no wordmark text beside it), so the image itself names the company.
 * To swap the artwork later, change only `src` here. Never recolour or stretch it: width/height keep the
 * SVG's 470×353 viewBox ratio and CSS only sets the height (`w-auto`).
 */
const MARKS = {
  // Black apple on the lime triangle, for light surfaces (floating header bar, mobile drawer).
  header: { src: "/images/brand/apel-logo.svg", width: 75, height: 56, className: "h-12 w-auto md:h-14" },
  // Knockout: the apple is cut out so the dark footer shows through.
  footer: { src: "/images/brand/apel-logo-knockout.svg", width: 96, height: 72, className: "h-[72px] w-auto" },
} as const

export const BRAND_NAME = "PT Indoko Jaya Raya"

export function BrandMark({ variant }: { variant: keyof typeof MARKS }) {
  const mark = MARKS[variant]
  return (
    <Image
      src={mark.src}
      width={mark.width}
      height={mark.height}
      alt={BRAND_NAME}
      unoptimized
      // Header: above the fold, so no lazy-load, but no preload either (slide 1 stays the only preload).
      loading={variant === "header" ? "eager" : "lazy"}
      className={`block max-w-none ${mark.className}`}
    />
  )
}
