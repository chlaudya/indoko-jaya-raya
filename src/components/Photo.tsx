import Image from "next/image"
import { pickLocale, type Locale } from "@/lib/i18n"
import { IMAGES, type ImageKey } from "@/lib/images"
import { ui } from "@/lib/fixtures"

/**
 * Image slot: renders optimised photography through next/image (`fill` inside
 * an aspect-ratio box) or a clearly marked placeholder when no photo exists yet.
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
  const zoomClass = zoom ? "motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]" : ""

  if (!image) {
    return (
      <figure className={`${frame} ph ${tone}`}>
        <div className={`absolute inset-0 flex items-end p-5 ${zoomClass}`}>
          <figcaption className="text-xs font-medium tracking-[0.14em] text-white/85 uppercase">
            {pickLocale(ui.photographyPending, locale)}
          </figcaption>
        </div>
      </figure>
    )
  }

  const meta = IMAGES[image]
  return (
    <div className={`${frame} bg-leaf`}>
      <Image
        src={meta.src}
        alt={pickLocale(meta.alt, locale)}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? undefined : "lazy"}
        className={`object-cover ${zoomClass}`}
      />
    </div>
  )
}
