import type { Locale } from "./i18n"

type LString = Partial<Record<Locale, string>>

export const siteSettings = {
  waTransport: "wame" as "wame" | "api",
  applyMode: "wa" as "wa" | "form" | "both",
  waTargets: [{ key: "default", label: "Sales", phoneE164: "6281234567890" }],
  waTemplates: {
    home: {
      id: "Halo Indoco Jaya Raya, saya ingin mengetahui lebih lanjut tentang perusahaan Anda.",
      en: "Hello Indoco Jaya Raya, I would like to learn more about your company.",
    },
    product: {
      id: "Halo, saya tertarik dengan produk {{productName}}. Mohon informasinya.",
      en: "Hello, I am interested in {{productName}}. Please share details.",
    },
    drying: {
      id: "Halo, saya ingin konsultasi Jasa Penjemuran Komoditi.",
      en: "Hello, I would like to consult about commodity drying services.",
    },
    career: {
      id: "Halo, saya ingin melamar posisi {{jobTitle}}.",
      en: "Hello, I would like to apply for {{jobTitle}}.",
    },
    contact: {
      id: "Halo Indoco Jaya Raya, saya ingin menghubungi tim Anda.",
      en: "Hello Indoco Jaya Raya, I would like to contact your team.",
    },
  } as Record<string, LString>,
  companyShortBlurb: {
    id: "Agribisnis hasil bumi lokal untuk pasar nasional dan internasional.",
    en: "Local agribusiness commodities for national and international markets.",
  },
  address: {
    id: "Indonesia — alamat lengkap menyusul dari klien.",
    en: "Indonesia — full address pending client confirmation.",
  },
}

export const nav = [
  { href: "", label: { id: "Beranda", en: "Home" } },
  { href: "about", label: { id: "Tentang Kami", en: "About" } },
  { href: "company", label: { id: "Profil Perusahaan", en: "Company" } },
  { href: "products", label: { id: "Produk", en: "Products" } },
  { href: "services/drying", label: { id: "Jasa Penjemuran", en: "Drying Service" } },
  { href: "careers", label: { id: "Karier", en: "Careers" } },
  { href: "contact", label: { id: "Kontak", en: "Contact" } },
]

export const categories = [
  { slug: "kacang-kacangan", title: { id: "Kacang-kacangan", en: "Nuts & legumes" } },
  { slug: "umbi", title: { id: "Umbi", en: "Tubers" } },
  { slug: "jagung", title: { id: "Jagung", en: "Corn" } },
  { slug: "kopi", title: { id: "Kopi", en: "Coffee" } },
  { slug: "layanan", title: { id: "Layanan", en: "Services" } },
]

export type Product = {
  slug: string
  kind: "product" | "service"
  category: string
  featured?: boolean
  name: LString
  shortBlurb: LString
  description: LString
  specs: { label: LString; value: LString }[]
  servicePagePath?: string
  capacity?: LString
  processSteps?: { title: LString; body: LString }[]
}

export const products: Product[] = [
  {
    slug: "kacang-mete",
    kind: "product",
    category: "kacang-kacangan",
    featured: true,
    name: { id: "Kacang Mete", en: "Cashew Nut" },
    shortBlurb: { id: "Kacang mete kualitas ekspor.", en: "Export-grade cashew nuts." },
    description: { id: "Komoditi kacang mete untuk mitra B2B.", en: "Cashew commodity for B2B partners." },
    specs: [
      { label: { id: "Grade", en: "Grade" }, value: { id: "Premium", en: "Premium" } },
      { label: { id: "Kemasan", en: "Packaging" }, value: { id: "Karung / bulk", en: "Sack / bulk" } },
    ],
  },
  {
    slug: "asam-kupas",
    kind: "product",
    category: "kacang-kacangan",
    featured: true,
    name: { id: "Asam (Kupas)", en: "Tamarind (Peeled)" },
    shortBlurb: { id: "Asam kupas siap olah.", en: "Peeled tamarind ready for processing." },
    description: { id: "Asam kupas untuk pasar domestik dan ekspor.", en: "Peeled tamarind for domestic and export markets." },
    specs: [{ label: { id: "Bentuk", en: "Form" }, value: { id: "Kupas", en: "Peeled" } }],
  },
  {
    slug: "kacang-tanah",
    kind: "product",
    category: "kacang-kacangan",
    name: { id: "Kacang Tanah", en: "Peanut" },
    shortBlurb: { id: "Kacang tanah lokal.", en: "Local peanuts." },
    description: { id: "Pasokan kacang tanah berkelanjutan.", en: "Sustainable peanut supply." },
    specs: [{ label: { id: "Asal", en: "Origin" }, value: { id: "Lokal", en: "Local" } }],
  },
  {
    slug: "kacang-hijau",
    kind: "product",
    category: "kacang-kacangan",
    name: { id: "Kacang Hijau", en: "Mung Bean" },
    shortBlurb: { id: "Kacang hijau berkualitas.", en: "Quality mung beans." },
    description: { id: "Kacang hijau untuk industri pangan.", en: "Mung beans for food industry." },
    specs: [{ label: { id: "Kualitas", en: "Quality" }, value: { id: "Standar", en: "Standard" } }],
  },
  {
    slug: "ubi-porang",
    kind: "product",
    category: "umbi",
    featured: true,
    name: { id: "Ubi Porang", en: "Porang Tuber" },
    shortBlurb: { id: "Ubi porang untuk industri.", en: "Porang for industrial use." },
    description: { id: "Komoditi porang dengan kapasitas suplai fleksibel.", en: "Porang with flexible supply capacity." },
    specs: [{ label: { id: "Bentuk", en: "Form" }, value: { id: "Chips / tepung (opsional)", en: "Chips / flour (optional)" } }],
  },
  {
    slug: "jagung-kupas",
    kind: "product",
    category: "jagung",
    name: { id: "Jagung (Kupas)", en: "Corn (Shelled)" },
    shortBlurb: { id: "Jagung kupas siap distribusi.", en: "Shelled corn ready for distribution." },
    description: { id: "Jagung kupas untuk pakan dan pangan.", en: "Shelled corn for feed and food." },
    specs: [{ label: { id: "Bentuk", en: "Form" }, value: { id: "Kupas", en: "Shelled" } }],
  },
  {
    slug: "kopi",
    kind: "product",
    category: "kopi",
    featured: true,
    name: { id: "Kopi", en: "Coffee" },
    shortBlurb: { id: "Kopi lokal untuk pasar global.", en: "Local coffee for global markets." },
    description: { id: "Kopi hasil bumi lokal.", en: "Local coffee commodities." },
    specs: [{ label: { id: "Jenis", en: "Type" }, value: { id: "Sesuai ketersediaan", en: "Subject to availability" } }],
  },
  {
    slug: "jasa-penjemuran-komoditi",
    kind: "service",
    category: "layanan",
    featured: true,
    name: { id: "Jasa Penjemuran Komoditi", en: "Commodity Drying Service" },
    shortBlurb: { id: "Layanan penjemuran komoditi — lihat halaman jasa.", en: "Commodity drying service — see service page." },
    description: {
      id: "Layanan penjemuran untuk menjaga kualitas hasil panen sebelum distribusi.",
      en: "Drying service to preserve harvest quality before distribution.",
    },
    specs: [
      { label: { id: "Jenis", en: "Type" }, value: { id: "Layanan", en: "Service" } },
      { label: { id: "Kapasitas", en: "Capacity" }, value: { id: "Menyesuaikan musim", en: "Seasonal / flexible" } },
    ],
    servicePagePath: "services/drying",
    capacity: {
      id: "Kapasitas dan lokasi fasilitas penjemuran dikelola di CMS — detail menyusul dari klien.",
      en: "Drying capacity and facility locations are CMS-managed — details pending client.",
    },
    processSteps: [
      {
        title: { id: "Terima komoditi", en: "Receive commodity" },
        body: { id: "Penerimaan dan pemeriksaan awal.", en: "Intake and initial check." },
      },
      {
        title: { id: "Proses penjemuran", en: "Drying process" },
        body: { id: "Pengeringan sesuai standar kualitas.", en: "Drying to quality standards." },
      },
      {
        title: { id: "Serah terima", en: "Handover" },
        body: { id: "Komoditi siap distribusi.", en: "Commodity ready for distribution." },
      },
    ],
  },
]

export const jobs = [
  {
    slug: "staff-operasional-gudang",
    title: { id: "Staff Operasional Gudang", en: "Warehouse Operations Staff" },
    location: { id: "Lokasi menyusul", en: "Location TBD" },
    shortBlurb: { id: "Mendukung operasional gudang dan penanganan komoditi.", en: "Support warehouse ops and commodity handling." },
    description: { id: "Deskripsi lengkap dikelola via CMS.", en: "Full description managed via CMS." },
    qualifications: { id: "Kualifikasi dikelola via CMS.", en: "Qualifications managed via CMS." },
    status: "active" as const,
  },
]

export const pages = {
  home: {
    heroEyebrow: { id: "PT Indoco Jaya Raya", en: "PT Indoco Jaya Raya" },
    heroTitle: {
      id: "Agribisnis hasil bumi lokal untuk pasar dunia",
      en: "Local agribusiness commodities for global markets",
    },
    heroLead: {
      id: "Company profile dan e-katalog komoditi — hubungi kami via WhatsApp.",
      en: "Company profile and commodity e-catalog — reach us on WhatsApp.",
    },
    trustPoints: [
      { title: { id: "Kualitas", en: "Quality" }, body: { id: "Standar pasokan yang konsisten.", en: "Consistent supply standards." } },
      { title: { id: "Jaringan petani", en: "Farmer network" }, body: { id: "Penyerapan hasil lokal kompetitif.", en: "Competitive local offtake." } },
      { title: { id: "Siap ekspor", en: "Export ready" }, body: { id: "Mendukung ekspansi internasional.", en: "Built for international growth." } },
    ],
  },
  about: {
    heroTitle: { id: "Tentang Kami", en: "About Us" },
    heroLead: {
      id: "Narasi perusahaan, visi, misi, dan keunggulan.",
      en: "Company story, vision, mission, and strengths.",
    },
    story: {
      id: "PT Indoco Jaya Raya bergerak dalam penyerapan dan perdagangan hasil pertanian lokal.",
      en: "PT Indoco Jaya Raya aggregates and trades local agricultural produce.",
    },
    vision: {
      id: "Menjadi agrobisnis lokal yang menguasai pasar nasional dan internasional dengan menjaga kualitas dan keberlanjutan.",
      en: "To be a local agribusiness serving national and international markets with quality and sustainability.",
    },
    mission: {
      id: "Menyerap hasil lokal secara kompetitif, mensejahterakan karyawan dan petani, serta memperkenalkan produk lokal ke dunia.",
      en: "Competitive local offtake, employee and farmer welfare, and introducing local products globally.",
    },
  },
  company: {
    heroTitle: { id: "Profil & Data Perusahaan", en: "Company Profile & Data" },
    legalName: { id: "PT Indoco Jaya Raya", en: "PT Indoco Jaya Raya" },
    tagline: { id: "Agribisnis Hasil Bumi Lokal", en: "Local Agribusiness Commodities" },
    note: {
      id: "Legalitas, struktur organisasi, sertifikasi, dan galeri fasilitas dikelola di CMS (hanya data yang disetujui publik).",
      en: "Legalitas, org structure, certifications, and facility gallery are CMS-managed (public-approved fields only).",
    },
  },
  productsIndex: {
    heroTitle: { id: "Katalog Komoditi", en: "Commodity Catalog" },
    heroLead: {
      id: "Delapan item peluncuran — termasuk jasa penjemuran sebagai layanan.",
      en: "Eight launch items — including drying as a service.",
    },
  },
  careers: {
    heroTitle: { id: "Karier", en: "Careers" },
    heroLead: {
      id: "Lowongan aktif. Mode lamaran (WA / form / keduanya) adalah pengaturan CMS.",
      en: "Active openings. Apply mode (WA / form / both) is a CMS setting.",
    },
  },
  contact: {
    heroTitle: { id: "Kontak", en: "Contact" },
    heroLead: {
      id: "Hubungi tim kami melalui WhatsApp untuk inquiry B2B.",
      en: "Contact our team on WhatsApp for B2B inquiries.",
    },
  },
}
