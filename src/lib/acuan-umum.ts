import type { Locale } from "./i18n"

type LString = Partial<Record<Locale, string>>

/** One "Acuan Umum" (general industry reference) row from Brief v2 §5. Values are transcribed verbatim (id). */
export type ReferenceSpecRow = { label: LString; value: LString; unit?: LString; testMethod?: LString }

/** A reference table. `basis: "acuanUmum"` = general industry range, NOT an Indoko-verified spec. */
export type ReferenceSpecTable = { basis: "acuanUmum"; heading?: LString; rows: ReferenceSpecRow[] }

const r = (label: string, value: string): ReferenceSpecRow => ({ label: { id: label }, value: { id: value } })

/**
 * Brief v2 (af161036…pdf) §5 "Acuan umum" columns, keyed by product slug. The "Isi Indoko" column is empty in the
 * brief, so nothing here is client-confirmed. CMS: product.referenceSpecTables (same shape).
 */
export const acuanUmumBySlug: Record<string, ReferenceSpecTable[]> = {
  "kacang-mete": [
    {
      basis: "acuanUmum",
      heading: { id: "Spesifikasi RCN", en: "RCN (raw cashew nut in shell)" },
      rows: [
        r("Nut count (butir per kg)", "170–220. DEAS 1000:2019: Grade 1 maks. 200, Grade 2 maks. 220, Grade 3 maks. 240"),
        r("KOR / out-turn (lbs per 80 kg)", "Min. 48 (Grade 1), 44 (Grade 2), 36 (Grade 3) menurut DEAS. Listing pasar umumnya 45–52"),
        r("Kadar air", "Maks. 10% (TCVN 12380:2018 dan mayoritas listing). Sebagian pembeli meminta maks. 8%"),
        r("Kacang rusak (defective)", "Maks. 8–10% (TCVN 12380:2018: maks. 10%). Sebagian listing sampai 15%"),
        r("Kotoran (foreign matter)", "Maks. 0,5% (sebagian listing 0,25%)"),
        r("Float rate", "Maks. 18% (diminta sebagian pembeli)"),
        r("Serangga, jamur, bau", "Bebas serangga hidup, tanpa jamur dan bau abnormal"),
        r("Bentuk dan warna", "Cangkang abu-abu kecokelatan, bentuk ginjal (kidney)"),
        r("Kemasan", "Karung goni (jute) 80 kg net, liner PE opsional. 80 kg per karung adalah satuan dagang RCN"),
        r("Muatan kontainer", "Isi dari forwarder"),
        r("Tahun panen / musim", "Cantumkan crop year dan bulan pasokan"),
      ],
    },
    {
      basis: "acuanUmum",
      heading: { id: "Spesifikasi Kernel (bila dijual)", en: "Cashew kernel (if sold)" },
      rows: [
        r("Grade kernel utuh (white wholes)", "WW180, WW210, WW240, WW320, WW450"),
        r("Jumlah kernel per lb (acuan umum)", "W180: sekitar 170–180, W210: 200–210, W240: 220–240, W320: 300–320, W450: 400–450"),
        r("Grade lain", "WS (white scorched), LWP / SWP (large / small white pieces), SW (scorched wholes), BB (butts / broken)"),
        r("Kadar air", "Maks. 5%"),
        r("Kernel pecah", "Maks. 5% (grade utuh)"),
        r("Kernel bercak (melasma / spotted)", "Maks. 3%"),
        r("Jamur dan kapang", "0%"),
        r("Admixture / kotoran", "Maks. 1%"),
        r("Cacat penyok (dent)", "Maks. 3%"),
        r("Kemasan", "Kaleng timah vakum 25 lb (11,34 kg) dua kaleng per karton, atau kantong vakum 22,68 kg (50 lb) per karton"),
        r("Inspeksi", "SGS, Bureau Veritas, atau Sucofindo bila dipakai"),
      ],
    },
  ],
  "asam-kupas": [
    {
      basis: "acuanUmum",
      rows: [
        r("Bentuk", "Polong utuh, pulp dengan biji, pulp tanpa biji (loose), blok/slab, pasta"),
        r("Warna", "Merah terang hingga cokelat (varian merah) atau cokelat tua hingga hitam. Standar Agmark India membedakan grade warna ini"),
        r("Kadar air", "Sangat bervariasi menurut bentuk. Pulp kering tanpa biji sekitar maks. 12–20%, polong ekspor sekitar 10–15%, blok lembap bisa 25–35%. Tentukan sesuai kontrak"),
        r("Kemurnian", "Min. 98% (varian seedless merah)"),
        r("Kotoran batu / tanah", "Maks. 2%"),
        r("Serat", "Maks. 1% (seedless merah)"),
        r("Debu", "Maks. 1%"),
        r("Biji", "100% dibuang untuk seedless. Untuk varian berbiji, nyatakan persentase biji"),
        r("Parameter standar resmi", "Standar pulp asam (IS 6364 India, MS 1236 Malaysia) memakai: kadar biji, benda asing, abu tak larut asam, total asam tartarat, gula pereduksi"),
        r("Kemasan", "Karton 25 kg. Blok 5 / 10 / 20 kg. Slab ritel 500 g atau 1 kg, 20 x 1 kg per master carton (20 kg)"),
        r("Umur simpan", "12–24 bulan di tempat sejuk dan kering"),
        r("Dokumen", "Phytosanitary, COO, fumigasi, COA bila ada"),
      ],
    },
  ],
  "kacang-tanah": [
    {
      basis: "acuanUmum",
      heading: { id: "Kernel (shelled)", en: "Kernel (shelled)" },
      rows: [
        r("Tipe", "Bold (butir besar, mis. HPS) dan Java (butir kecil); red skin untuk penggilingan minyak"),
        r("Count per ons, tipe Bold", "35/40, 38/42, 40/45, 45/50, 60/70, 70/80, 80/90"),
        r("Count per ons, tipe Java", "40/50, 45/55, 50/60, 60/70, 70/80, 80/90 (dan lebih kecil untuk industri)"),
        r("Kadar air", "Maks. 6–8% (umumnya 7% atau 8% sesuai pembeli)"),
        r("Admixture", "Maks. 1%"),
        r("Kotoran (foreign material)", "Maks. 0,2–0,5%"),
        r("Kernel rusak / cacat", "Maks. 0,5–1,5%. Cacat ringan maks. 1%"),
        r("Kernel pecah / belah", "Maks. 2–5%"),
        r("Kadar minyak", "Sekitar 45–58% (penting untuk grade penggilingan)"),
        r("Kemasan", "Karung PP atau goni 25 / 50 kg. Big bag 650–1.000 kg tersedia di sebagian pemasok"),
        r("Muatan kontainer", "Sekitar 19 MT per 20 ft untuk karung goni 50 kg (acuan listing). Isi dari forwarder"),
      ],
    },
    {
      basis: "acuanUmum",
      heading: { id: "In-shell", en: "In-shell" },
      rows: [
        r("Ukuran (count per ons)", "Bold 18/22, 20/24, 22/26. Pembeli lain memakai penamaan 7/9, 9/11, 11/13, 13/15"),
        r("Kadar air", "Maks. 5–8%"),
        r("Admixture", "Maks. 1%"),
        r("Kotoran", "Maks. 0,2%"),
        r("Kemasan", "Karung PP 25 atau 35 kg"),
        r("Muatan kontainer", "Sekitar 20 MT per 40 ft HC (acuan listing)"),
      ],
    },
  ],
  "kacang-hijau": [
    {
      basis: "acuanUmum",
      rows: [
        r("Ukuran butir", "2,8–3,2 mm, 3,0–3,5 mm, 3,5 mm ke atas, hingga 4,0–4,5 mm. Pembeli kecambah (sprouting) umumnya meminta 3,5 mm ke atas"),
        r("Kemurnian", "Min. 98–99% (bersih mesin atau sortex)"),
        r("Kadar air", "Maks. 12–13% (sebagian listing 14–14,5%)"),
        r("Admixture", "Maks. 0,5–1%"),
        r("Butir pecah / belah", "Maks. 0,5–2%"),
        r("Butir rusak / berkutu (damaged, weevilled)", "Maks. 0,5–2%"),
        r("Butir berubah warna", "Maks. 2%"),
        r("Butir belum matang (immature)", "Maks. 2%"),
        r("Kotoran (foreign matter)", "Maks. 0,2–1%"),
        r("Daya kecambah (untuk kecambah)", "Min. 90%"),
        r("Bobot 1.000 butir", "Sekitar 25–35 g (acuan satu listing)"),
        r("Warna", "Hijau cerah, seragam"),
        r("Kemasan", "Karung PP 25 atau 50 kg"),
        r("Muatan kontainer", "Sekitar 22–24 MT per 20 ft, sekitar 26–28 MT per 40 ft (acuan listing, tergantung kemasan dan kadar air)"),
        r("Umur simpan", "12–24 bulan"),
        r("Dokumen", "Phytosanitary, COO, analisis lab"),
      ],
    },
  ],
  "ubi-porang": [
    {
      basis: "acuanUmum",
      rows: [
        r("Bentuk", "Chip kering (irisan), tepung kasar, tepung glukomanan murni"),
        r("Ketebalan irisan", "Praktik lazim sekitar 5–10 mm (penelitian memakai 5, 7, 10 mm). Pembeli menentukan ukuran"),
        r("Kadar air", "Target pengeringan maks. sekitar 12%. Hasil uji chip mutu I sekitar 9–11%"),
        r("Kadar glukomanan", "Pada penelitian, chip mutu I sekitar 38–47%. Sangat dipengaruhi umur panen dan ukuran umbi. Pembeli menetapkan minimum di kontrak"),
        r("Kadar abu", "Sekitar 3–4% (hasil uji chip mutu I)"),
        r("Kalsium oksalat", "Parameter yang dipantau (rendah lebih baik). Pada satu studi sekitar 1% dan belum memenuhi SNI"),
        r("Derajat putih (whiteness)", "Parameter visual penting. Pada studi, chip dengan perlakuan sulfur dioksida lebih putih daripada tanpa perlakuan"),
        r("Residu sulfur dioksida (SO2)", "Wajib dipantau dan dilaporkan jika dipakai. Studi industri menemukan residu SO2 yang tidak konsisten sebagai masalah mutu ekspor"),
        r("Jamur / kapang", "Tidak boleh ada. Jamur saat penyimpanan adalah masalah umum chip porang"),
        r("Kemasan", "Karung PP. Tentukan berat dan muatan dengan pembeli dan forwarder"),
      ],
    },
  ],
  "jagung-kupas": [
    {
      basis: "acuanUmum",
      heading: { id: "Spesifikasi dagang internasional (jagung kuning)", en: "International trade specification (yellow corn)" },
      rows: [
        r("Warna", "Kuning alami"),
        r("Kadar air", "Maks. 14% (12–14% untuk grade pangan)"),
        r("Butir pecah", "Maks. 1–5% (umumnya 2–3%)"),
        r("Butir rusak / berubah warna", "Maks. 0,5–5% (umumnya 2%)"),
        r("Foreign matter", "Maks. 1–2%"),
        r("Admixture", "Maks. 2–2,5%"),
        r("Kemurnian", "Min. 98–99%"),
        r("Aflatoksin", "Maks. 20 ppb (sebagian pembeli meminta 10 ppb)"),
        r("Protein", "Sekitar 8–10%"),
        r("Berat uji (test weight)", "Min. sekitar 72 kg/hl (sekitar 700–750 g/l)"),
        r("Peruntukan", "Pakan (feed grade) atau pangan (food grade)"),
        r("Kemasan", "Karung PP 25 / 50 kg atau curah (bulk)"),
        r("Muatan kontainer", "Isi dari forwarder"),
      ],
    },
  ],
  kopi: [
    {
      basis: "acuanUmum",
      rows: [
        r("Jenis", "Robusta atau Arabica (tulis jelas, dan varietas bila ada)"),
        r("Asal / wilayah", "Provinsi atau kabupaten sumber"),
        r("Proses", "Natural/dry, full-washed, semi-washed (wet-hulled)"),
        r("Ukuran biji", "Besar (tertahan ayakan 6,5 mm), sedang (lolos 6,5 mm, tertahan 6 mm / no. 15), kecil (lolos 6 mm, tertahan 5 mm / no. 13), maks. 5% lolos. Verifikasi ayakan besar dengan teks resmi"),
        r("Nilai cacat per 300 g", "Sesuai tabel mutu SNI 01-2907-2008"),
        r("Kadar air", "11–12,5% (maks. 12,5% menurut SNI)"),
        r("Kadar kotoran", "Maks. 0,5%"),
        r("Tahun panen", "Cantumkan crop year"),
        r("Skor cupping (bila specialty)", "Mis. 80 ke atas"),
        r("Kemasan", "Karung goni 60 kg. Liner GrainPro atau vakum untuk grade tinggi"),
        r("Muatan kontainer", "Umumnya sekitar 16–19 MT per 20 ft (estimasi umum). Isi dari forwarder"),
        r("Dokumen", "Phytosanitary, COO, COA, ICO certificate of origin bila diminta"),
      ],
    },
  ],
  cengkeh: [
    {
      basis: "acuanUmum",
      heading: { id: "Cengkeh Kering (Dried Whole Cloves)", en: "Dried whole cloves" },
      rows: [
        r("Varietas / grade", "Zanzibar, Lalpari (Lal Pari), Siputih, Sikotok. Grade AB6 untuk hasil pilihan tangan"),
        r("Kadar air", "Maks. 10–12% (sebagian listing menulis lebih rendah)"),
        r("Foreign matter", "Maks. 0,5–1%"),
        r("Gagang (stem)", "Maks. 1–3% (tobacco grade sekitar 1–2%)"),
        r("Cengkeh pecah / baby cloves", "Maks. 1–3%"),
        r("Cengkeh tanpa kepala (headless)", "Bervariasi menurut grade, mulai 2% hingga 15%"),
        r("Debu", "Maks. 2%"),
        r("Berat jenis", "Min. sekitar 500 g/l (acuan satu listing)"),
        r("Kadar minyak atsiri / eugenol", "Sekitar 15–20% minyak (acuan listing), dan eugenol diuji sesuai metode yang disepakati"),
        r("Warna dan aroma", "Cokelat kemerahan hingga cokelat tua, aroma khas kuat, tidak berjamur"),
        r("Kemasan", "Karung anyam 10 / 20 / 25 / 50 kg atau master box"),
        r("Inspeksi dan dokumen", "COA per lot, SGS atau Sucofindo atas permintaan, Phytosanitary, COO"),
        r("Peruntukan", "Rokok kretek (tobacco grade), rempah, minyak atsiri"),
      ],
    },
  ],
}
