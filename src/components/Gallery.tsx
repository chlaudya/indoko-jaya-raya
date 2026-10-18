import type { Locale } from "@/lib/i18n"
import type { ImageKey } from "@/lib/images"
import { Photo } from "./Photo"

const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]"]

/** Masonry gallery (CSS columns): 2 cols mobile, 3 cols desktop. */
export function Gallery({ locale, images }: { locale: Locale; images: ImageKey[] }) {
  return (
    <ul className="columns-2 gap-4 lg:columns-3 lg:gap-6 [&>li]:mb-4 lg:[&>li]:mb-6">
      {images.map((image, index) => (
        <li key={image} className="reveal break-inside-avoid">
          <Photo
            image={image}
            locale={locale}
            aspect={aspects[index % aspects.length]}
            sizes="(min-width: 1376px) 410px, (min-width: 1024px) 31vw, 48vw"
          />
        </li>
      ))}
    </ul>
  )
}
