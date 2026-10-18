// Optimise client photos (HEIC originals in public/image, left untouched)
// into web-ready WebP copies in public/images/optimized.
// macOS `sips` decodes HEIC -> lossless intermediate; sharp resizes/crops,
// auto-rotates from EXIF, strips metadata and encodes WebP under a byte budget.
//
//   node scripts/optimize-images.mjs
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

const ROOT = process.cwd()
const SRC = path.join(ROOT, "public/image")
const TMP = path.join(ROOT, ".tmp-redesign/decoded")
const OUT = path.join(ROOT, "public/images/optimized")

// kind limits (QA gate): hero <=2400w & <=300KB, section <=1600w & <=300KB, card <=1200w & <=100KB
const LIMITS = {
  hero: { w: 2400, h: 1350, kb: 300 },
  section: { w: 1600, h: 1200, kb: 300 },
  card: { w: 960, h: 1200, kb: 100 },
}

const MANIFEST = [
  // full-bleed heroes (16:9)
  ["hero-peanut-drying-yard", "IMG_8864", "hero", "attention"],
  ["hero-warehouse-interior", "IMG_8841", "hero", "centre"],
  ["hero-farmers-sorting", "IMG_8764", "hero", "centre"],
  ["hero-peanuts-on-tarp", "IMG_8863", "hero", "centre"],
  ["hero-peanut-texture", "IMG_8861", "hero", "centre"],
  // section / editorial images (4:3)
  ["section-team-loading-sacks", "IMG_8793", "section", "centre"],
  ["section-peanut-drying-tarp", "IMG_8862", "section", "centre"],
  ["section-truck-loading", "IMG_8798", "section", "attention"],
  ["section-warehouse-stock", "IMG_8843", "section", "centre"],
  ["section-warehouse-aisle", "IMG_8842", "section", "centre"],
  ["section-sorting-machine", "IMG_8814", "section", "centre"],
  ["section-farmer-drying-tarp", "IMG_8866", "section", "attention"],
  ["section-cashew-sorting", "IMG_8768", "section", "attention"],
  // cards / tiles (4:5)
  ["card-pillar-farmers", "IMG_8765", "card", "attention"],
  ["card-pillar-commodities", "IMG_8809", "card", "centre"],
  ["card-pillar-sustainability", "IMG_8865", "card", "attention"],
  ["card-cashew-nuts", "IMG_8782", "card", "centre"],
  ["card-peanuts", "IMG_8867", "card", "centre"],
  ["card-shelled-corn", "IMG_8810", "card", "centre"],
  ["card-drying-service", "IMG_8866", "card", "attention"],
  ["card-gallery-sack-stacks", "IMG_8811", "card", "centre"],
  ["card-gallery-grain-sacks", "IMG_8813", "card", "centre"],
  ["card-gallery-carrying-sack", "IMG_8800", "card", "attention"],
  ["card-gallery-unloading-truck", "IMG_8797", "card", "attention"],
  ["card-gallery-cashew-sorting", "IMG_8781", "card", "attention"],
  ["card-gallery-warehouse", "IMG_8840", "card", "centre"],
]

mkdirSync(TMP, { recursive: true })
mkdirSync(OUT, { recursive: true })

function decode(base) {
  const out = path.join(TMP, `${base}.tiff`)
  if (!existsSync(out)) {
    execFileSync("sips", ["-s", "format", "tiff", path.join(SRC, `${base}.HEIC`), "--out", out], { stdio: "ignore" })
  }
  return out
}

const report = []
for (const [name, base, kind, position] of MANIFEST) {
  const input = decode(base)
  const limit = LIMITS[kind]
  let { w, h } = limit
  let quality = 80
  let buf
  for (;;) {
    buf = await sharp(input)
      .rotate()
      .resize({ width: w, height: h, fit: "cover", position: position === "attention" ? sharp.strategy.attention : "centre" })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer()
    if (buf.length <= limit.kb * 1024) break
    if (quality > 45) quality -= 5
    else {
      w = Math.round(w * 0.9)
      h = Math.round(h * 0.9)
      quality = 60
    }
  }
  const file = path.join(OUT, `${name}.webp`)
  writeFileSync(file, buf)
  const meta = await sharp(file).metadata()
  const kb = statSync(file).size / 1024
  report.push({ name: `${name}.webp`, source: `${base}.HEIC`, kind, width: meta.width, height: meta.height, quality, kb: +kb.toFixed(1), pass: meta.width <= LIMITS[kind].w && kb <= limit.kb })
}
console.table(report)
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(report, null, 2) + "\n")
