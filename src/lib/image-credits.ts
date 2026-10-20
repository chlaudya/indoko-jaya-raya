import type { ImageKey } from "./images"

/** Attribution for third-party photos (shown as a caption where the photo appears). Verified on each Commons file page. */
export type ImageCredit = {
  author: string
  authorUrl: string
  license: string
  licenseUrl: string
  sourceUrl: string
  /** We crop / resize the original, so the caption says so (CC BY-SA "indicate if changes were made"). */
  modified: boolean
}

// Wikimedia Commons, author Rillke, CC BY-SA 3.0 (checked via the Commons API). Same data as manifest.json.
const RILLKE = {
  author: "Rillke",
  authorUrl: "https://commons.wikimedia.org/wiki/User:Rillke",
  license: "CC BY-SA 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  modified: true,
} as const

export const IMAGE_CREDITS: Partial<Record<ImageKey, ImageCredit>> = {
  cardPorangStem: { ...RILLKE, sourceUrl: "https://commons.wikimedia.org/wiki/File:Amorphophallus_muelleri_02.jpg" },
  cardPorangBase: { ...RILLKE, sourceUrl: "https://commons.wikimedia.org/wiki/File:Amorphophallus_muelleri_03.jpg" },
}
