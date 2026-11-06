import Image from "next/image"
import { pickLocale, type Locale } from "@/lib/i18n"
import { IMAGES, type ImageKey } from "@/lib/images"
import { deliveryQuality } from "@/lib/image-quality"

/**
 * Image slot: renders optimised photography through next/image (`fill` inside
 * an aspect-ratio box) or an empty tonal frame when no photo exists yet.
 * Never shows "photography pending" copy on public pages.
 * `sizes` must describe the rendered slot width so no oversized file is served.
 */
export function Photo({
  image,
  locale,
  sizes,
  aspect = "aspect-[4/5]",
  className = "",
  preload = false,
  rounded = true,
  zoom = false,
  tone = "ph",
}: {
  image?: ImageKey
  locale: Locale
  sizes: string
  aspect?: string
  className?: string
  preload?: boolean
  rounded?: boolean
  zoom?: boolean
  tone?: "ph" | "ph-field" | "ph-harvest" | "ph-dark"
}) {
  const frame = `relative overflow-hidden ${rounded ? "rounded-[8px]" : ""} ${aspect} ${className}`
  const zoomClass = zoom
    ? "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]"
    : ""

  if (!image) {
    return <div className={`${frame} ph ${tone}`} aria-hidden="true" />
  }

  const meta = IMAGES[image]
  return (
    <div className={`${frame} bg-forest`}>
      <Image
        src={meta.src}
        alt={pickLocale(meta.alt, locale)}
        fill
        sizes={sizes}
        quality={deliveryQuality(image)}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        className={`object-cover ${zoomClass}`}
      />
    </div>
  )
}
