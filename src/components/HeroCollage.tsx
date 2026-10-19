import Image from "next/image";
import { pickLocale, type Locale } from "@/lib/i18n";
import { IMAGES, type ImageKey } from "@/lib/images";

/**
 * Wave bottom of each photo cell, traced from docs/design/screens/hero-crops-preview.jpg.
 * x = index * 20px across a 480px cell, y = px down a 300px row (viewBox 960×900, three rows).
 */
const WAVE_Y = [
  60, 62, 66, 73, 82, 93, 105, 117, 130, 143, 155, 166, 175, 183, 188, 190, 188, 184, 176, 165, 151,
  134, 113, 90, 60,
];

const CELL_W = 480;
const CELL_H = 300;

/** Preview fill (sampled). Brand leaf is too dark against these crops. */
const COLLAGE_GREEN = "#2e7c3e";

type Cell = {
  image: ImageKey;
  col: 0 | 1;
  row: 0 | 1 | 2;
  /** First paint / LCP. */
  preload?: boolean;
};

/**
 * Crops baked from the client originals to match docs/design/screens/hero-crops-preview.jpg.
 * Two people (IMG_8764 flipped, IMG_8865) and three commodities (corn 8808, cashew 8782, peanuts 8864).
 */
const CELLS: Cell[] = [
  { image: "collageFarmerSorting", col: 0, row: 0, preload: true },
  { image: "collageCornHands", col: 1, row: 0 },
  { image: "collageFarmerSky", col: 0, row: 1 },
  { image: "collageCashewHand", col: 1, row: 1 },
  { image: "collagePeanutsTarp", col: 0, row: 2 },
];

function cellClip(): string {
  const pts = ["0% 0%", "100% 0%"];
  for (let i = WAVE_Y.length - 1; i >= 0; i--) {
    const x = (i / (WAVE_Y.length - 1)) * 100;
    const y = (WAVE_Y[i] / CELL_H) * 100;
    pts.push(`${x}% ${y}%`);
  }
  return `polygon(${pts.join(",")})`;
}

const CLIP = cellClip();

function waveStroke(row: number): string {
  let d = "";
  for (let x = 0; x <= 960; x += 20) {
    const i = Math.round((x % CELL_W) / 20);
    const y = row * CELL_H + WAVE_Y[i];
    d += `${x === 0 ? "M" : "L"}${x} ${y}`;
  }
  return d;
}

/**
 * Home hero photo: five client crops in the green wave from the design preview.
 * The 960×900 frame keeps the traced wave from stretching into slivers.
 * Phones: full width, pinned to the top. Desktop: right of the copy, vertically centered.
 */
export function HeroCollage({ locale }: { locale: Locale }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: COLLAGE_GREEN }} aria-hidden="true">
      <div className="absolute top-0 left-1/2 aspect-[960/900] w-full max-h-[58%] -translate-x-1/2 lg:top-[var(--header-offset)] lg:right-0 lg:left-auto lg:h-auto lg:max-h-[calc(100%-var(--header-offset)-0.75rem)] lg:w-[min(56%,calc(100%-30rem))] lg:translate-x-0 lg:translate-y-0">
      {CELLS.map((cell) => {
        const meta = IMAGES[cell.image];
        return (
          <div
            key={cell.image}
            className="absolute"
            style={{
              left: `${cell.col * 50}%`,
              top: `${cell.row * (100 / 3)}%`,
              width: "50%",
              height: `${100 / 3}%`,
              clipPath: CLIP,
            }}
          >
            <Image
              src={meta.src}
              alt={pickLocale(meta.alt, locale)}
              fill
              preload={cell.preload}
              sizes="(min-width: 1024px) 28vw, 50vw"
              className="object-cover"
            />
          </div>
        );
      })}
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 960 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[0, 1, 2].map((row) => (
          <path
            key={row}
            d={waveStroke(row)}
            fill="none"
            stroke="#d5e2b8"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      </div>
    </div>
  );
}
