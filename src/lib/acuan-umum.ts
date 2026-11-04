import type { Locale } from "./i18n"

type LString = Partial<Record<Locale, string>>

/** Row provenance. "reference" = Brief v2 "Acuan umum" market range (never Indoko's own). Confirmed rows live in product.specs. */
export type SpecSource = "reference" | "confirmed"

/** One reference row. id = Brief v2 §5 range + standard (listing/study commentary stripped, numbers unchanged); en = faithful translation. */
export type ReferenceSpecRow = {
  source: "reference"
  label: LString
  value: LString
  unit?: LString
  /** In-page anchor this row points to (e.g. the Kopi SNI grade table). */
  linkTo?: string
}

/** Small secondary table (e.g. Kopi SNI 01-2907-2008 grade table), verbatim. */
export type ReferenceSubTable = { anchor: string; caption: LString; columns: [LString, LString]; rows: [LString, LString][] }

/** One commodity form (tab). Single-form products have exactly one. */
export type ReferenceSpecTable = {
  source: "reference"
  key: string
  /** Trade name, used as tab label (two-form products) and table caption. */
  heading: LString
  /** e.g. "HS acuan 0801.31" (tab meta line). */
  meta?: LString
  rows: ReferenceSpecRow[]
  /** Official standards the brief cites for this table. Omitted when ranges come only from listings. */
  standards?: string[]
  subTables?: ReferenceSubTable[]
}

const UNIT_EN: Record<string, string> = { bulan: "months", "butir/kg": "nuts/kg", "per ons": "per oz" }

const r = (id: string, en: string, valueId: string, valueEn: string, unit?: string, linkTo?: string): ReferenceSpecRow => ({
  source: "reference",
  label: { id, en },
  value: { id: valueId, en: valueEn },
  // A unit goes in its own column only when the value's leading figure doesn't already carry it inline.
  ...(unit && !(unit === "%" && /^[^\d]*[\d.,–\s]+%/.test(valueId)) ? { unit: { id: unit, en: UNIT_EN[unit] ?? unit } } : {}),
  ...(linkTo ? { linkTo } : {}),
})
const hs = (code: string, note = ""): ReferenceSpecRow =>
  r("HS acuan", "HS reference", `${code}${note ? ` ${note}` : ""} (acuan, perlu verifikasi)`, `${code} (reference, to be verified)`)
const aflatoxin = (): ReferenceSpecRow => r("Aflatoksin", "Aflatoxin", "Diuji per lot, COA tersedia", "Tested per lot, COA available")

export const KOPI_GRADE_ANCHOR = "kopi-mutu-sni"

/** Brief v2 (af161036…pdf) §5, keyed by product slug. CMS: product.referenceSpecTables (same shape). */
export const acuanUmumBySlug: Record<string, ReferenceSpecTable[]> = {
  "kacang-mete": [
    {
      source: "reference",
      key: "rcn",
      heading: { id: "RCN (gelondong)", en: "RCN (in-shell)" },
      meta: { id: "HS acuan 0801.31", en: "HS reference 0801.31" },
      standards: ["DEAS 1000:2019", "TCVN 12380:2018"],
      rows: [
        hs("0801.31"),
        r("Nut count (butir per kg)", "Nut count (nuts per kg)", "170–220. DEAS 1000:2019: Grade 1 maks. 200, Grade 2 maks. 220, Grade 3 maks. 240", "170–220. DEAS 1000:2019: Grade 1 max. 200, Grade 2 max. 220, Grade 3 max. 240", "butir/kg"),
        r("KOR / out-turn", "KOR / out-turn", "Min. 48 (Grade 1), 44 (Grade 2), 36 (Grade 3) menurut DEAS; pasar umumnya 45–52", "Min. 48 (Grade 1), 44 (Grade 2), 36 (Grade 3) per DEAS; market typically 45–52", "lbs per 80 kg"),
        r("Kadar air", "Moisture", "Maks. 10% (TCVN 12380:2018)", "Max. 10% (TCVN 12380:2018)", "%"),
        r("Kacang rusak (defective)", "Defective nuts", "Maks. 8–10% (TCVN 12380:2018: maks. 10%)", "Max. 8–10% (TCVN 12380:2018: max. 10%)", "%"),
        r("Kotoran (foreign matter)", "Foreign matter", "Maks. 0,5", "Max. 0.5", "%"),
        r("Float rate", "Float rate", "Maks. 18", "Max. 18", "%"),
        r("Serangga, jamur, bau", "Insects, mould, odour", "Bebas serangga hidup, tanpa jamur dan bau abnormal", "Free from live insects, no mould or abnormal odour"),
        r("Bentuk dan warna", "Shape and colour", "Cangkang abu-abu kecokelatan, bentuk ginjal (kidney)", "Brownish-grey shell, kidney shape"),
        r("Kemasan", "Packing", "Karung goni (jute) 80 kg net, liner PE opsional", "Jute bags 80 kg net, optional PE liner"),
      ],
    },
    {
      source: "reference",
      key: "kernel",
      heading: { id: "Kernel", en: "Kernel" },
      meta: { id: "HS acuan 0801.32", en: "HS reference 0801.32" },
      rows: [
        hs("0801.32"),
        r("Grade kernel utuh (white wholes)", "White wholes grades", "WW180, WW210, WW240, WW320, WW450", "WW180, WW210, WW240, WW320, WW450"),
        r("Jumlah kernel per lb (acuan umum)", "Kernels per lb (general reference)", "W180: sekitar 170–180, W210: 200–210, W240: 220–240, W320: 300–320, W450: 400–450", "W180: about 170–180, W210: 200–210, W240: 220–240, W320: 300–320, W450: 400–450", "kernel/lb"),
        r("Grade lain", "Other grades", "WS (white scorched), LWP / SWP (large / small white pieces), SW (scorched wholes), BB (butts / broken)", "WS (white scorched), LWP / SWP (large / small white pieces), SW (scorched wholes), BB (butts / broken)"),
        r("Kadar air", "Moisture", "Maks. 5", "Max. 5", "%"),
        r("Kernel pecah", "Broken kernels", "Maks. 5 (grade utuh)", "Max. 5 (whole grades)", "%"),
        r("Kernel bercak (melasma / spotted)", "Spotted kernels (melasma)", "Maks. 3", "Max. 3", "%"),
        r("Jamur dan kapang", "Mould", "0", "0", "%"),
        r("Admixture / kotoran", "Admixture / foreign matter", "Maks. 1", "Max. 1", "%"),
        r("Cacat penyok (dent)", "Dents", "Maks. 3", "Max. 3", "%"),
        r("Kemasan", "Packing", "Kaleng timah vakum 25 lb (11,34 kg) dua kaleng per karton, atau kantong vakum 22,68 kg (50 lb) per karton", "Vacuum tins 25 lb (11.34 kg), two tins per carton, or vacuum bags 22.68 kg (50 lb) per carton"),
        r("Inspeksi", "Inspection", "SGS, Bureau Veritas, atau Sucofindo bila dipakai", "SGS, Bureau Veritas or Sucofindo if used"),
      ],
    },
  ],
  "asam-kupas": [
    {
      source: "reference",
      key: "tamarind",
      heading: { id: "Asam Jawa", en: "Tamarind" },
      standards: ["IS 6364", "MS 1236"],
      rows: [
        hs("0813.40", "untuk asam kering (verifikasi untuk pulp/pasta)"),
        r("Bentuk", "Form", "Polong utuh, pulp dengan biji, pulp tanpa biji (loose), blok/slab, pasta", "Whole pods, pulp with seed, seedless pulp (loose), block/slab, paste"),
        r("Warna", "Colour", "Merah terang hingga cokelat (varian merah) atau cokelat tua hingga hitam", "Bright red to brown (red variety) or dark brown to black"),
        r("Kadar air", "Moisture", "Pulp kering tanpa biji sekitar maks. 12–20%, polong ekspor sekitar 10–15%, blok lembap 25–35%", "Dry seedless pulp about max. 12–20%, export pods about 10–15%, moist blocks 25–35%", "%"),
        r("Kemurnian", "Purity", "Min. 98 (varian seedless merah)", "Min. 98 (red seedless variety)", "%"),
        r("Kotoran batu / tanah", "Stones / soil", "Maks. 2", "Max. 2", "%"),
        r("Serat", "Fibre", "Maks. 1 (seedless merah)", "Max. 1 (red seedless)", "%"),
        r("Debu", "Dust", "Maks. 1", "Max. 1", "%"),
        r("Biji", "Seeds", "100% dibuang untuk seedless", "100% removed for seedless"),
        r("Parameter standar resmi", "Official standard parameters", "Standar pulp asam (IS 6364 India, MS 1236 Malaysia) memakai: kadar biji, benda asing, abu tak larut asam, total asam tartarat, gula pereduksi", "Tamarind pulp standards (IS 6364 India, MS 1236 Malaysia) use: seed content, foreign matter, acid-insoluble ash, total tartaric acid, reducing sugars"),
        r("Kemasan", "Packing", "Karton 25 kg. Blok 5 / 10 / 20 kg. Slab ritel 500 g atau 1 kg, 20 x 1 kg per master carton (20 kg)", "25 kg cartons. 5 / 10 / 20 kg blocks. Retail slabs 500 g or 1 kg, 20 x 1 kg per master carton (20 kg)"),
        r("Umur simpan", "Shelf life", "12–24 bulan di tempat sejuk dan kering", "12–24 months in a cool, dry place", "bulan"),
        r("Dokumen", "Documents", "Phytosanitary, COO, fumigasi, COA bila ada", "Phytosanitary, COO, fumigation, COA if available"),
      ],
    },
  ],
  "kacang-tanah": [
    {
      source: "reference",
      key: "kernel",
      heading: { id: "Kernel (shelled)", en: "Kernel (shelled)" },
      meta: { id: "HS acuan 1202.42", en: "HS reference 1202.42" },
      rows: [
        hs("1202.42"),
        r("Tipe", "Type", "Bold (butir besar, mis. HPS) dan Java (butir kecil); red skin untuk penggilingan minyak", "Bold (large kernels, e.g. HPS) and Java (small kernels); red skin for oil milling"),
        r("Count per ons, tipe Bold", "Count per ounce, Bold type", "35/40, 38/42, 40/45, 45/50, 60/70, 70/80, 80/90", "35/40, 38/42, 40/45, 45/50, 60/70, 70/80, 80/90", "per ons"),
        r("Count per ons, tipe Java", "Count per ounce, Java type", "40/50, 45/55, 50/60, 60/70, 70/80, 80/90 (dan lebih kecil untuk industri)", "40/50, 45/55, 50/60, 60/70, 70/80, 80/90 (and smaller for industry)", "per ons"),
        r("Kadar air", "Moisture", "Maks. 6–8", "Max. 6–8", "%"),
        r("Admixture", "Admixture", "Maks. 1", "Max. 1", "%"),
        r("Kotoran (foreign material)", "Foreign material", "Maks. 0,2–0,5", "Max. 0.2–0.5", "%"),
        r("Kernel rusak / cacat", "Damaged / defective kernels", "Maks. 0,5–1,5%. Cacat ringan maks. 1%", "Max. 0.5–1.5%. Minor defects max. 1%", "%"),
        r("Kernel pecah / belah", "Broken / split kernels", "Maks. 2–5", "Max. 2–5", "%"),
        r("Kadar minyak", "Oil content", "Sekitar 45–58", "About 45–58", "%"),
        aflatoxin(),
        r("Kemasan", "Packing", "Karung PP atau goni 25 / 50 kg. Big bag 650–1.000 kg", "PP or jute bags 25 / 50 kg. Big bags 650–1,000 kg"),
        r("Muatan kontainer", "Container load", "Sekitar 19 MT per 20 ft untuk karung goni 50 kg", "About 19 MT per 20 ft for 50 kg jute bags"),
      ],
    },
    {
      source: "reference",
      key: "in-shell",
      heading: { id: "In-shell", en: "In-shell" },
      meta: { id: "HS acuan 1202.41", en: "HS reference 1202.41" },
      rows: [
        hs("1202.41"),
        r("Ukuran (count per ons)", "Size (count per ounce)", "Bold 18/22, 20/24, 22/26, atau 7/9, 9/11, 11/13, 13/15", "Bold 18/22, 20/24, 22/26, or 7/9, 9/11, 11/13, 13/15", "per ons"),
        r("Kadar air", "Moisture", "Maks. 5–8", "Max. 5–8", "%"),
        r("Admixture", "Admixture", "Maks. 1", "Max. 1", "%"),
        r("Kotoran", "Foreign matter", "Maks. 0,2", "Max. 0.2", "%"),
        r("Kemasan", "Packing", "Karung PP 25 atau 35 kg", "PP bags 25 or 35 kg"),
        r("Muatan kontainer", "Container load", "Sekitar 20 MT per 40 ft HC", "About 20 MT per 40 ft HC"),
      ],
    },
  ],
  "kacang-hijau": [
    {
      source: "reference",
      key: "mung-bean",
      heading: { id: "Kacang Hijau", en: "Green Mung Bean" },
      rows: [
        hs("0713.31"),
        r("Ukuran butir", "Bean size", "2,8–3,2 mm, 3,0–3,5 mm, 3,5 mm ke atas untuk kecambah, hingga 4,0–4,5 mm", "2.8–3.2 mm, 3.0–3.5 mm, 3.5 mm and up for sprouting, up to 4.0–4.5 mm", "mm"),
        r("Kemurnian", "Purity", "Min. 98–99 (bersih mesin atau sortex)", "Min. 98–99 (machine-cleaned or sortex)", "%"),
        r("Kadar air", "Moisture", "Maks. 12–13", "Max. 12–13", "%"),
        r("Admixture", "Admixture", "Maks. 0,5–1", "Max. 0.5–1", "%"),
        r("Butir pecah / belah", "Broken / split beans", "Maks. 0,5–2", "Max. 0.5–2", "%"),
        r("Butir rusak / berkutu (damaged, weevilled)", "Damaged, weevilled beans", "Maks. 0,5–2", "Max. 0.5–2", "%"),
        r("Butir berubah warna", "Discoloured beans", "Maks. 2", "Max. 2", "%"),
        r("Butir belum matang (immature)", "Immature beans", "Maks. 2", "Max. 2", "%"),
        r("Kotoran (foreign matter)", "Foreign matter", "Maks. 0,2–1", "Max. 0.2–1", "%"),
        r("Daya kecambah (untuk kecambah)", "Germination (for sprouting)", "Min. 90", "Min. 90", "%"),
        r("Bobot 1.000 butir", "1,000-bean weight", "Sekitar 25–35", "About 25–35", "g"),
        r("Warna", "Colour", "Hijau cerah, seragam", "Bright green, uniform"),
        r("Kemasan", "Packing", "Karung PP 25 atau 50 kg", "PP bags 25 or 50 kg"),
        r("Muatan kontainer", "Container load", "Sekitar 22–24 MT per 20 ft, sekitar 26–28 MT per 40 ft", "About 22–24 MT per 20 ft, about 26–28 MT per 40 ft"),
        r("Umur simpan", "Shelf life", "12–24", "12–24", "bulan"),
        r("Dokumen", "Documents", "Phytosanitary, COO, analisis lab", "Phytosanitary, COO, lab analysis"),
      ],
    },
  ],
  "ubi-porang": [
    {
      source: "reference",
      key: "porang",
      heading: { id: "Porang / Konjac", en: "Porang / Konjac" },
      rows: [
        hs("0714.90", "untuk umbi dan chip (verifikasi untuk tepung)"),
        r("Bentuk", "Form", "Chip kering (irisan), tepung kasar, tepung glukomanan murni", "Dried chips (slices), coarse flour, pure glucomannan flour"),
        r("Ketebalan irisan", "Slice thickness", "Sekitar 5–10", "About 5–10", "mm"),
        r("Kadar air", "Moisture", "Maks. sekitar 12% (target pengeringan). Sekitar 9–11% (chip mutu I)", "Max. about 12% (drying target). About 9–11% (grade I chips)", "%"),
        r("Kadar glukomanan", "Glucomannan content", "Sekitar 38–47% (chip mutu I)", "About 38–47% (grade I chips)", "%"),
        r("Kadar abu", "Ash content", "Sekitar 3–4 (chip mutu I)", "About 3–4 (grade I chips)", "%"),
        r("Kalsium oksalat", "Calcium oxalate", "Dipantau, makin rendah makin baik", "Monitored, lower is better"),
        r("Derajat putih (whiteness)", "Whiteness", "Parameter visual", "Visual parameter"),
        r("Residu sulfur dioksida (SO2)", "Sulphur dioxide (SO2) residue", "Wajib dipantau dan dilaporkan jika dipakai", "Must be monitored and reported if used"),
        r("Jamur / kapang", "Mould", "Tidak boleh ada", "Not permitted"),
        r("Kemasan", "Packing", "Karung PP", "PP sacks"),
      ],
    },
  ],
  "jagung-kupas": [
    {
      source: "reference",
      key: "corn",
      heading: { id: "Spesifikasi dagang internasional (jagung kuning)", en: "International trade specification (yellow corn)" },
      rows: [
        hs("1005.90"),
        r("Warna", "Colour", "Kuning alami", "Natural yellow"),
        r("Kadar air", "Moisture", "Maks. 14 (12–14% untuk grade pangan)", "Max. 14 (12–14% for food grade)", "%"),
        r("Butir pecah", "Broken kernels", "Maks. 1–5 (umumnya 2–3%)", "Max. 1–5 (usually 2–3%)", "%"),
        r("Butir rusak / berubah warna", "Damaged / discoloured kernels", "Maks. 0,5–5 (umumnya 2%)", "Max. 0.5–5 (usually 2%)", "%"),
        r("Foreign matter", "Foreign matter", "Maks. 1–2", "Max. 1–2", "%"),
        r("Admixture", "Admixture", "Maks. 2–2,5", "Max. 2–2.5", "%"),
        r("Kemurnian", "Purity", "Min. 98–99", "Min. 98–99", "%"),
        aflatoxin(),
        r("Protein", "Protein", "Sekitar 8–10", "About 8–10", "%"),
        r("Berat uji (test weight)", "Test weight", "Min. sekitar 72 kg/hl (sekitar 700–750 g/l)", "Min. about 72 kg/hl (about 700–750 g/l)"),
        r("Peruntukan", "Use", "Pakan (feed grade) atau pangan (food grade)", "Feed grade or food grade"),
        r("Kemasan", "Packing", "Karung PP 25 / 50 kg atau curah (bulk)", "PP bags 25 / 50 kg or bulk"),
      ],
    },
  ],
  kopi: [
    {
      source: "reference",
      key: "green-coffee",
      heading: { id: "Kopi (biji hijau)", en: "Green coffee beans" },
      standards: ["SNI 01-2907-2008"],
      rows: [
        hs("0901.11"),
        r("Jenis", "Type", "Robusta atau Arabica", "Robusta or Arabica"),
        r("Proses", "Process", "Natural/dry, full-washed, semi-washed (wet-hulled)", "Natural/dry, full-washed, semi-washed (wet-hulled)"),
        r("Ukuran biji", "Bean size", "Besar (tertahan ayakan 6,5 mm), sedang (lolos 6,5 mm, tertahan 6 mm / no. 15), kecil (lolos 6 mm, tertahan 5 mm / no. 13), maks. 5% lolos", "Large (retained on 6.5 mm screen), medium (passes 6.5 mm, retained on 6 mm / no. 15), small (passes 6 mm, retained on 5 mm / no. 13), max. 5% passing"),
        r("Nilai cacat per 300 g", "Defect value per 300 g", "Lihat tabel mutu SNI 01-2907-2008 di bawah", "See SNI 01-2907-2008 grade table below", undefined, KOPI_GRADE_ANCHOR),
        r("Kadar air", "Moisture", "11–12,5 (maks. 12,5% menurut SNI)", "11–12.5 (max. 12.5% per SNI)", "%"),
        r("Kadar kotoran", "Foreign matter", "Maks. 0,5", "Max. 0.5", "%"),
        r("Skor cupping (bila specialty)", "Cupping score (if specialty)", "Mis. 80 ke atas", "E.g. 80 and above"),
        r("Kemasan", "Packing", "Karung goni 60 kg. Liner GrainPro atau vakum untuk grade tinggi", "60 kg jute bags. GrainPro liner or vacuum for high grades"),
        r("Muatan kontainer", "Container load", "Sekitar 16–19 MT per 20 ft", "About 16–19 MT per 20 ft"),
        r("Dokumen", "Documents", "Phytosanitary, COO, COA, ICO certificate of origin bila diminta", "Phytosanitary, COO, COA, ICO certificate of origin on request"),
      ],
      subTables: [
        {
          anchor: KOPI_GRADE_ANCHOR,
          caption: { id: "Mutu SNI 01-2907-2008 (nilai cacat per 300 g)", en: "SNI 01-2907-2008 grades (defect value per 300 g)" },
          columns: [{ id: "Mutu", en: "Grade" }, { id: "Jumlah nilai cacat", en: "Total defect value" }],
          rows: [
            [{ id: "Mutu 1", en: "Grade 1" }, { id: "Maks. 11", en: "Max. 11" }],
            [{ id: "Mutu 2", en: "Grade 2" }, { id: "12–25", en: "12–25" }],
            [{ id: "Mutu 3", en: "Grade 3" }, { id: "26–44", en: "26–44" }],
            [{ id: "Mutu 4a", en: "Grade 4a" }, { id: "45–60", en: "45–60" }],
            [{ id: "Mutu 4b (hanya Robusta)", en: "Grade 4b (Robusta only)" }, { id: "61–80", en: "61–80" }],
            [{ id: "Mutu 5", en: "Grade 5" }, { id: "81–150", en: "81–150" }],
            [{ id: "Mutu 6", en: "Grade 6" }, { id: "151–225", en: "151–225" }],
          ],
        },
      ],
    },
  ],
  cengkeh: [
    {
      source: "reference",
      key: "cloves",
      heading: { id: "Cengkeh Kering (Dried Whole Cloves)", en: "Dried whole cloves" },
      standards: ["SNI 3392", "ISO 2254"],
      rows: [
        hs("0907.10"),
        r("Varietas / grade", "Variety / grade", "Zanzibar, Lalpari (Lal Pari), Siputih, Sikotok. Grade AB6 untuk hasil pilihan tangan", "Zanzibar, Lalpari (Lal Pari), Siputih, Sikotok. Grade AB6 for hand-selected"),
        r("Kadar air", "Moisture", "Maks. 10–12", "Max. 10–12", "%"),
        r("Foreign matter", "Foreign matter", "Maks. 0,5–1", "Max. 0.5–1", "%"),
        r("Gagang (stem)", "Stems", "Maks. 1–3 (tobacco grade sekitar 1–2%)", "Max. 1–3 (tobacco grade about 1–2%)", "%"),
        r("Cengkeh pecah / baby cloves", "Broken / baby cloves", "Maks. 1–3", "Max. 1–3", "%"),
        r("Cengkeh tanpa kepala (headless)", "Headless cloves", "Bervariasi menurut grade, mulai 2% hingga 15%", "Varies by grade, from 2% to 15%", "%"),
        r("Debu", "Dust", "Maks. 2", "Max. 2", "%"),
        r("Berat jenis", "Bulk density", "Min. sekitar 500", "Min. about 500", "g/l"),
        r("Kadar minyak atsiri / eugenol", "Essential oil / eugenol content", "Sekitar 15–20% minyak", "About 15–20% oil"),
        r("Warna dan aroma", "Colour and aroma", "Cokelat kemerahan hingga cokelat tua, aroma khas kuat, tidak berjamur", "Reddish brown to dark brown, strong characteristic aroma, no mould"),
        r("Kemasan", "Packing", "Karung anyam 10 / 20 / 25 / 50 kg atau master box", "Woven bags 10 / 20 / 25 / 50 kg or master box"),
        r("Inspeksi dan dokumen", "Inspection and documents", "COA per lot, SGS atau Sucofindo atas permintaan, Phytosanitary, COO", "COA per lot, SGS or Sucofindo on request, Phytosanitary, COO"),
        r("Peruntukan", "Use", "Rokok kretek (tobacco grade), rempah, minyak atsiri", "Kretek cigarettes (tobacco grade), spice, essential oil"),
      ],
    },
  ],
}
