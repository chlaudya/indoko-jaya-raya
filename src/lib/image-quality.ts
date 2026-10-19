import type { ImageKey } from "./images"

/**
 * next/image quality per photo. The 300 KB budget applies to what visitors download (/_next/image), not the source
 * file. Every value here must also be listed in next.config images.qualities; anything not listed uses the default 75.
 */
export const HERO_SLIDE_QUALITY = 70

const DELIVERY_QUALITY: Partial<Record<ImageKey, number>> = {
  sectionPeanutTarp: 70,
  sectionSortingMachine: 70,
}

export function deliveryQuality(key: ImageKey): number | undefined {
  return DELIVERY_QUALITY[key]
}
