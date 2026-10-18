import type { Locale } from "./i18n"
import type { ImageKey } from "./images"

type LString = Partial<Record<Locale, string>>

export const siteSettings = {
  waTransport: "wame" as "wame" | "api",
  applyMode: "wa" as "wa" | "form" | "both",
  waTargets: [{ key: "default", label: "Sales", phoneE164: "6281234567890" }],
  /** Placeholder WA number until the client confirms; hides the visible number (links still use waTargets). */
  phonePending: true as boolean,
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
  { href: "about", label: { id: "Perusahaan", en: "Company" } },
  { href: "products", label: { id: "Komoditi", en: "Commodities" } },
  { href: "services/drying", label: { id: "Layanan", en: "Services" } },
  { href: "#sustainability", label: { id: "Keberlanjutan", en: "Sustainability" } },
  { href: "careers", label: { id: "Karier", en: "Careers" } },
  { href: "contact", label: { id: "Kontak", en: "Contact" } },
]

export const ui = {
  requestInquiry: { id: "Ajukan pertanyaan", en: "Request an inquiry" },
  exploreCommodities: { id: "Jelajahi komoditi", en: "Explore commodities" },
  partnerWithUs: { id: "Bermitra dengan kami", en: "Partner with us" },
  viewCommodity: { id: "Lihat komoditi", en: "View commodity" },
  viewService: { id: "Lihat layanan", en: "View service" },
  askAbout: { id: "Tanya tentang", en: "Ask about" },
  discussRequirements: { id: "Diskusikan kebutuhan Anda", en: "Discuss your requirements" },
  allCategories: { id: "Semua", en: "All" },
  searchCommodities: { id: "Cari komoditi", en: "Search commodities" },
  searchAction: { id: "Cari", en: "Search" },
  noMatches: { id: "Tidak ada komoditi yang sesuai.", en: "No commodities match." },
  specifications: { id: "Spesifikasi", en: "Specifications" },
  overview: { id: "Ikhtisar produk", en: "Product overview" },
  related: { id: "Komoditi lain", en: "Other commodities" },
  applyWhatsApp: { id: "Lamar via WhatsApp", en: "Apply via WhatsApp" },
  photographyPending: { id: "Fotografi menyusul", en: "Photography pending" },
  menu: { id: "Menu", en: "Menu" },
  close: { id: "Tutup", en: "Close" },
  home: { id: "Beranda", en: "Home" },
  companyProfile: { id: "Profil perusahaan", en: "Company profile" },
  ourStory: { id: "Cerita kami", en: "Our story" },
  vision: { id: "Visi", en: "Vision" },
  mission: { id: "Misi", en: "Mission" },
  address: { id: "Alamat", en: "Address" },
  capacity: { id: "Kapasitas", en: "Capacity" },
  mapPending: { id: "Peta menyusul", en: "Map pending" },
  openPositions: { id: "Posisi terbuka", en: "Open positions" },
  location: { id: "Lokasi", en: "Location" },
  pendingConfirmation: { id: "Menunggu konfirmasi data.", en: "Pending confirmed data." },
  skipToContent: { id: "Lewati ke konten", en: "Skip to content" },
  language: { id: "Bahasa", en: "Language" },
  ourCommodities: { id: "Komoditi kami", en: "Our commodities" },
  whyPartner: { id: "Mengapa bermitra", en: "Why partner with Indoco" },
  fromIndonesia: { id: "Dari Indonesia", en: "From Indonesia" },
  commodityServices: { id: "Layanan komoditi", en: "Commodity services" },
  careersLabel: { id: "Karier", en: "Careers" },
  viewPositions: { id: "Lihat posisi", en: "View positions" },
  inquiry: { id: "Pertanyaan", en: "Inquiry" },
  cvFormPending: { id: "Form unggah CV menyusul", en: "CV form pending" },
  contactTeam: { id: "Hubungi tim kami", en: "Talk with our team" },
  contactUs: { id: "Hubungi kami", en: "Contact us" },
  viewCommodities: { id: "Lihat komoditi", en: "View commodities" },
  numberPending: { id: "Nomor menyusul", en: "Number to follow" },
  watchProfile: { id: "Lihat profil", en: "View profile" },
  productsMenu: { id: "Produk", en: "Products" },
  browseByCategory: { id: "Telusuri kategori", en: "Browse by category" },
  featuredCommodities: { id: "Komoditi unggulan", en: "Featured commodities" },
  viewAllCommodities: { id: "Lihat semua komoditi", en: "View all commodities" },
  allCommodities: { id: "Semua komoditi", en: "All commodities" },
  companyMenu: { id: "Menu perusahaan", en: "Company menu" },
  heroCarousel: { id: "Foto unggulan", en: "Featured photos" },
  slideOf: { id: "{n} dari {total}", en: "{n} of {total}" },
  pauseSlideshow: { id: "Jeda tayangan foto", en: "Pause slideshow" },
  playSlideshow: { id: "Putar tayangan foto", en: "Play slideshow" },
  openMenu: { id: "Buka menu", en: "Open menu" },
  closeMenu: { id: "Tutup menu", en: "Close menu" },
  ourMission: { id: "Misi kami", en: "Our mission" },
  keyFacts: { id: "Sekilas", en: "At a glance" },
  // DRAFT zh / vi / hi
  whyChooseUs: { id: "Mengapa memilih kami", en: "Why choose us", zh: "为何选择我们", vi: "Vì sao chọn chúng tôi", hi: "हमें क्यों चुनें" },
  footerCompany: { id: "Perusahaan", en: "Company" },
  footerProducts: { id: "Produk", en: "Products" },
  footerCareers: { id: "Karier", en: "Careers" },
  footerContact: { id: "Kontak", en: "Contact" },
  aboutUs: { id: "Tentang kami", en: "About us" },
  whatsapp: { id: "WhatsApp", en: "WhatsApp" },
  previous: { id: "Sebelumnya", en: "Previous" },
  next: { id: "Berikutnya", en: "Next" },
  identity: { id: "Identitas", en: "Identity" },
  legal: { id: "Legalitas", en: "Legal" },
  management: { id: "Manajemen", en: "Management" },
  facilities: { id: "Fasilitas", en: "Facilities" },
  certifications: { id: "Sertifikasi", en: "Certifications" },
  gallery: { id: "Galeri", en: "Gallery" },
  process: { id: "Proses", en: "Process" },
  ourService: { id: "Layanan", en: "Service" },
  growWithUs: { id: "Tumbuh bersama kami", en: "Grow with us" },
  culture: { id: "Budaya kerja", en: "Our culture" },
  contactDetails: { id: "Detail kontak", en: "Contact details" },
  pending: { id: "Menyusul", en: "Pending" },
  strengths: { id: "Keunggulan", en: "Strengths" },
  visionMission: { id: "Visi & misi", en: "Vision & mission" },
  discover: { id: "Selengkapnya", en: "Discover" },
  sustainability: { id: "Keberlanjutan", en: "Sustainability" },
  storageWarehouse: { id: "Gudang penyimpanan", en: "Storage warehouse" },
  commodityProcessing: { id: "Pengolahan komoditi", en: "Commodity processing" },
}

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
  /** Optimised photo key (CMS: product.images[0]); placeholder when absent. */
  image?: ImageKey
  gallery?: ImageKey[]
}

export const products: Product[] = [
  {
    slug: "kacang-mete",
    image: "cardCashew",
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
    image: "cardPeanuts",
    kind: "product",
    category: "kacang-kacangan",
    name: { id: "Kacang Tanah", en: "Peanut" },
    shortBlurb: { id: "Kacang tanah lokal.", en: "Local peanuts." },
    description: { id: "Pasokan kacang tanah berkelanjutan.", en: "Sustainable peanut supply." },
    specs: [{ label: { id: "Asal", en: "Origin" }, value: { id: "Lokal", en: "Local" } }],
  },
  {
    slug: "kacang-hijau",
    image: "cardKacangHijau",
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
    image: "cardCorn",
    kind: "product",
    category: "jagung",
    name: { id: "Jagung (Kupas)", en: "Corn (Shelled)" },
    shortBlurb: { id: "Jagung kupas siap distribusi.", en: "Shelled corn ready for distribution." },
    description: { id: "Jagung kupas untuk pakan dan pangan.", en: "Shelled corn for feed and food." },
    specs: [{ label: { id: "Bentuk", en: "Form" }, value: { id: "Kupas", en: "Shelled" } }],
  },
  {
    slug: "kopi",
    image: "cardKopi",
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
    image: "cardDrying",
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
    heroEyebrow: { id: "Indoco Jaya Raya", en: "Indoco Jaya Raya" },
    heroLine1: { id: "Berakar di Indonesia.", en: "Rooted in Indonesia." },
    heroLine2: { id: "Terhubung ke dunia.", en: "Connected to the World." },
    heroLead: {
      id: "Komoditi pertanian Indonesia untuk pembeli dan mitra di pasar nasional dan internasional.",
      en: "Indonesian agricultural commodities for buyers and partners in national and international markets.",
    },
    introLabel: { id: "Perusahaan", en: "The company" },
    introStatement: {
      id: "Hasil pertanian lokal, disiapkan untuk pasar global.",
      en: "Local agricultural products, prepared for global markets.",
    },
    introBody: {
      id: "PT Indoco Jaya Raya menyerap dan memperdagangkan hasil pertanian lokal.",
      en: "PT Indoco Jaya Raya aggregates and trades local agricultural produce.",
    },
    pillars: [
      {
        title: { id: "Penyerapan lokal", en: "Local sourcing" },
        body: { id: "Penyerapan hasil lokal secara kompetitif.", en: "Competitive offtake of local harvests." },
      },
      {
        title: { id: "Fokus kualitas", en: "Quality focus" },
        body: { id: "Standar pasokan yang konsisten.", en: "Consistent supply standards." },
      },
      {
        title: { id: "Pasokan andal", en: "Reliable supply" },
        body: { id: "Pasokan mengikuti ketersediaan yang terkonfirmasi.", en: "Supply follows confirmed availability." },
      },
      {
        title: { id: "Jangkauan global", en: "Global reach" },
        body: { id: "Mendukung pertumbuhan pasar internasional.", en: "Built for international market growth." },
      },
    ],
    chainLabel: { id: "Jalur pasok", en: "Supply path" },
    chainTitle: {
      id: "Dari pertanian Indonesia ke pembeli internasional.",
      en: "From Indonesian agriculture to international buyers.",
    },
    chain: [
      { title: { id: "Indonesia", en: "Indonesia" } },
      { title: { id: "Penyerapan", en: "Sourcing" } },
      { title: { id: "Pengolahan", en: "Processing" } },
      { title: { id: "Kualitas", en: "Quality" } },
      { title: { id: "Distribusi", en: "Distribution" } },
      { title: { id: "Pasar global", en: "Global markets" } },
    ],
    sustainabilityLabel: { id: "Keberlanjutan", en: "Sustainability" },
    sustainabilityTitle: {
      id: "Pertumbuhan yang menjaga petani dan karyawan.",
      en: "Growth that keeps farmers and employees in view.",
    },
    sustainabilityBody: {
      id: "Menyerap hasil lokal secara kompetitif, mensejahterakan karyawan dan petani, serta memperkenalkan produk lokal ke pasar yang lebih luas.",
      en: "Competitive local offtake, employee and farmer welfare, and introducing local products to wider markets.",
    },
    facilitiesLabel: { id: "Fasilitas", en: "Facilities" },
    facilitiesTitle: {
      id: "Profil dan fasilitas perusahaan.",
      en: "Company profile and facilities.",
    },
    facilitiesBody: {
      id: "Identitas hukum, lokasi, dan galeri fasilitas menunggu data yang disetujui untuk publik.",
      en: "Legal identity, locations, and the facility gallery are waiting on publicly approved data.",
    },
    careersTitle: {
      id: "Bangun masa depan pertanian Indonesia.",
      en: "Build the future of Indonesian agriculture.",
    },
    inquiryTitle: {
      id: "Bicarakan komoditi atau kebutuhan pasokan Anda.",
      en: "Talk through a commodity or a supply requirement.",
    },
  },
  about: {
    heroTitle: { id: "Cerita kami", en: "Our story" },
    heroLead: {
      id: "Narasi perusahaan, visi, dan misi.",
      en: "Company story, vision, and mission.",
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
    heroTitle: { id: "Profil perusahaan", en: "Company profile" },
    legalName: { id: "PT Indoco Jaya Raya", en: "PT Indoco Jaya Raya" },
    tagline: { id: "Agribisnis hasil bumi lokal", en: "Local agribusiness commodities" },
    note: {
      id: "Identitas hukum, struktur, lokasi, dan sertifikasi hanya ditampilkan setelah data disetujui untuk publik.",
      en: "Legal identity, structure, locations, and certifications appear only after the data is approved for publication.",
    },
    sections: [
      { title: { id: "Identitas hukum", en: "Legal identity" } },
      { title: { id: "Dokumen hukum", en: "Legal documents" } },
      { title: { id: "Manajemen", en: "Management" } },
      { title: { id: "Organisasi", en: "Organization" } },
      { title: { id: "Lokasi", en: "Locations" } },
      { title: { id: "Fasilitas", en: "Facilities" } },
      { title: { id: "Sertifikasi", en: "Certifications" } },
    ],
  },
  productsIndex: {
    heroTitle: { id: "Komoditi kami", en: "Our commodities" },
    heroLead: {
      id: "Komoditi pertanian pilihan dari Indonesia untuk pembeli dan mitra di seluruh dunia.",
      en: "Selected agricultural commodities sourced from Indonesia for buyers and partners worldwide.",
    },
  },
  careers: {
    heroTitle: {
      id: "Bangun masa depan pertanian Indonesia.",
      en: "Build the future of Indonesian agriculture.",
    },
    heroLead: {
      id: "Posisi yang sedang dibuka.",
      en: "Open positions.",
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

/* ------------------------------------------------------------------
 * Redesign v2 (Cargill-inspired) content blocks.
 * Mirrors the optional CMS fields added to `home` / `aboutPage`
 * (heroVideo, pillars[], stats[], featureBlocks[]). Placeholder copy is
 * derived from existing brief text only — no invented facts.
 * ------------------------------------------------------------------ */

export type Tone = "forest" | "field" | "harvest" | "dark"

export type PillarTile = { key: string; title: LString; body: LString; href: string; tone: Tone }
export type FeatureBlock = {
  key: string
  eyebrow: LString
  title: LString
  body: LString
  linkLabel: LString
  href: string
  tone: Tone
}
/** `isMock` marks placeholder numbers that must be replaced before launch (they still render, like CMS content). */
export type StatItem = { value: string; label: LString; isMock?: boolean }
export type TrustItem = { title: LString; body: LString }

export const redesign = {
  tagline: {
    id: "Berakar di Indonesia. Terhubung ke dunia.",
    en: "Rooted in Indonesia. Connected to the world.",
  } as LString,
  home: {
    /** Optional hero video (CMS: home.heroVideo). Empty = poster/placeholder only. */
    heroVideo: "" as string,
    /**
     * Hero photo slider, in order (CMS: home.heroSlides[]; alt text comes from images.ts meta).
     * All 5: designer's crops of client photos (people + the commodities we trade). Center on all.
     * `positionMobile` (optional) frames the top photo band under 1024px; a CMS image hotspot overrides both.
     */
    heroSlides: [
      { image: "heroSlide1", position: "center" },
      { image: "heroSlide2", position: "center" },
      { image: "heroSlide3", position: "center" },
      { image: "heroSlide4", position: "center" },
      { image: "heroSlide5", position: "center" },
    ] as { image: ImageKey; position?: string; positionMobile?: string; hotspot?: { x: number; y: number } }[],
    heroTitle: {
      id: "Agrobisnis lokal untuk pasar nasional dan internasional.",
      en: "Local agribusiness for national and international markets.",
      // DRAFT zh / vi / hi (designer drafts, pending client review; see docs/i18n-draft-strings.md)
      zh: "立足本土的农业企业，面向国内与国际市场。",
      vi: "Doanh nghiệp nông nghiệp địa phương cho thị trường trong nước và quốc tế.",
      hi: "राष्ट्रीय और अंतरराष्ट्रीय बाज़ारों के लिए स्थानीय कृषि व्यवसाय।",
    } as LString,
    /**
     * Phrase inside heroTitle that is emphasised: italic in Latin scripts (id/en/vi), accent colour with no italic in
     * zh/hi (--hero-accent-cjk). Must match heroTitle exactly per locale.
     */
    heroTitleEmphasis: {
      id: "nasional dan internasional.",
      en: "national and international markets.",
      zh: "国内与国际",
      vi: "trong nước và quốc tế",
      hi: "राष्ट्रीय और अंतरराष्ट्रीय",
    } as LString,
    missionPoints: [
      {
        id: "Menyerap hasil pertanian lokal secara kompetitif.",
        en: "Competitive offtake of local agricultural produce.",
      },
      {
        id: "Mensejahterakan karyawan dan petani.",
        en: "Improving the welfare of employees and farmers.",
      },
      {
        id: "Memperkenalkan produk lokal ke pasar dunia.",
        en: "Introducing local products to world markets.",
      },
    ] as LString[],
    pillars: [
      {
        key: "people",
        title: { id: "Petani & Karyawan", en: "Farmers & Employees" },
        body: {
          id: "Kesejahteraan petani dan karyawan menjadi dasar pertumbuhan kami.",
          en: "Farmer and employee welfare is the foundation of our growth.",
        },
        href: "about",
        tone: "harvest",
      },
      {
        key: "products",
        title: { id: "Komoditi", en: "Commodities" },
        body: {
          id: "Komoditi pertanian pilihan dari Indonesia untuk pembeli B2B.",
          en: "Selected Indonesian agricultural commodities for B2B buyers.",
        },
        href: "products",
        tone: "field",
      },
      {
        key: "planet",
        title: { id: "Keberlanjutan", en: "Sustainability" },
        body: {
          id: "Menjaga kualitas dan keberlanjutan di setiap tahap pasokan.",
          en: "Keeping quality and sustainability in view across the supply path.",
        },
        href: "company",
        tone: "forest",
      },
    ] as PillarTile[],
    features: [
      {
        key: "about",
        eyebrow: { id: "Tentang Indoco", en: "About Indoco" },
        title: {
          id: "Hasil pertanian lokal, disiapkan untuk pasar global.",
          en: "Local agricultural products, prepared for global markets.",
        },
        body: {
          id: "PT Indoco Jaya Raya menyerap dan memperdagangkan hasil pertanian lokal untuk mitra di dalam dan luar negeri.",
          en: "PT Indoco Jaya Raya aggregates and trades local agricultural produce for partners at home and abroad.",
        },
        linkLabel: { id: "Cerita kami", en: "Our story" },
        href: "about",
        tone: "field",
      },
      {
        key: "drying",
        eyebrow: { id: "Jasa Penjemuran", en: "Drying service" },
        title: {
          id: "Penjemuran komoditi untuk menjaga kualitas panen.",
          en: "Commodity drying that preserves harvest quality.",
        },
        body: {
          id: "Layanan penjemuran untuk menjaga kualitas hasil panen sebelum distribusi.",
          en: "Drying service to preserve harvest quality before distribution.",
        },
        linkLabel: { id: "Lihat layanan", en: "View service" },
        href: "services/drying",
        tone: "harvest",
      },
    ] as FeatureBlock[],
  },
  about: {
    pullQuote: {
      id: "Hasil bumi Indonesia layak mendapat tempat di pasar dunia.",
      en: "Indonesian produce deserves its place in world markets.",
    } as LString,
  },
  careers: {
    values: [
      {
        title: { id: "Kesejahteraan", en: "Welfare" },
        body: { id: "Pertumbuhan perusahaan berjalan bersama kesejahteraan karyawan.", en: "Company growth goes hand in hand with employee welfare." },
      },
      {
        title: { id: "Kualitas", en: "Quality" },
        body: { id: "Setiap peran menjaga standar kualitas komoditi.", en: "Every role protects commodity quality standards." },
      },
      {
        title: { id: "Pertumbuhan", en: "Growth" },
        body: { id: "Ikut membawa produk lokal ke pasar yang lebih luas.", en: "Help bring local products to wider markets." },
      },
    ] as { title: LString; body: LString }[],
  },
}

/**
 * Trust stats (CMS default for home.stats[]). Display rule: every filled entry (value + label) shows and the row
 * re-centres; with none filled the row is hidden. Only "7 Komoditi" is real; the rest are MOCK until the client
 * confirms numbers (tracked in docs/cms/schema-freeze-v1.md → Client pending). Label zh / vi / hi are DRAFT.
 */
export const homeStats: StatItem[] = [
  // MOCK, replace before launch
  {
    value: "10+",
    label: { id: "Tahun pengalaman", en: "Years of experience", zh: "年行业经验", vi: "Năm kinh nghiệm", hi: "वर्षों का अनुभव" },
    isMock: true,
  },
  // MOCK, replace before launch
  {
    value: "500+",
    label: { id: "Mitra petani", en: "Farmer partners", zh: "合作农户", vi: "Nông dân đối tác", hi: "किसान साझेदार" },
    isMock: true,
  },
  // MOCK, replace before launch
  {
    value: "1.000+",
    label: { id: "Ton per tahun", en: "Tonnes a year", zh: "吨/年", vi: "Tấn mỗi năm", hi: "टन प्रति वर्ष" },
    isMock: true,
  },
  // Real: the 7 catalog commodities.
  { value: "7", label: { id: "Komoditi", en: "Commodities", zh: "种农产品", vi: "Mặt hàng nông sản", hi: "जिंसें" } },
]

/**
 * "Why choose us" cards (CMS default for home.trustPoints[]). Copy drafted from the brief's mission; all 5 locales
 * are DRAFT pending client review (docs/i18n-draft-strings.md). No certification claims.
 */
export const whyChoose: TrustItem[] = [
  {
    title: {
      id: "Langsung dari petani lokal",
      en: "Direct from local farmers",
      zh: "直接来自本地农户",
      vi: "Trực tiếp từ nông dân địa phương",
      hi: "सीधे स्थानीय किसानों से",
    },
    body: {
      id: "Kami membeli langsung dari petani lokal dengan harga yang kompetitif.",
      en: "We buy directly from local farmers, at competitive prices.",
      zh: "我们以有竞争力的价格直接向本地农户收购。",
      vi: "Chúng tôi thu mua trực tiếp từ nông dân địa phương với giá cạnh tranh.",
      hi: "हम स्थानीय किसानों से सीधे, प्रतिस्पर्धी कीमतों पर ख़रीदते हैं।",
    },
  },
  {
    title: {
      id: "Kualitas di setiap tahap",
      en: "Quality at every step",
      zh: "每个环节都重品质",
      vi: "Chất lượng ở mọi khâu",
      hi: "हर चरण में गुणवत्ता",
    },
    body: {
      id: "Kualitas dan keberlanjutan kami jaga di setiap tahap, dari penjemuran hingga pengiriman.",
      en: "Quality and sustainability at every step, from drying to shipping.",
      zh: "从晾晒到发货，我们在每个环节坚持品质与可持续。",
      vi: "Chúng tôi giữ vững chất lượng và tính bền vững ở mọi khâu, từ phơi sấy đến giao hàng.",
      hi: "सुखाने से लेकर शिपिंग तक, हम हर चरण में गुणवत्ता और स्थिरता बनाए रखते हैं।",
    },
  },
  {
    title: {
      id: "Untuk pembeli nasional dan internasional",
      en: "Built for national and international buyers",
      zh: "服务国内与国际买家",
      vi: "Dành cho người mua trong nước và quốc tế",
      hi: "राष्ट्रीय और अंतरराष्ट्रीय ख़रीदारों के लिए",
    },
    body: {
      id: "Melayani pembeli nasional dan internasional, dengan kontak cepat lewat WhatsApp.",
      en: "Serving national and international buyers, with fast contact on WhatsApp.",
      zh: "服务国内与国际买家，可通过 WhatsApp 快速联系。",
      vi: "Phục vụ người mua trong nước và quốc tế, liên hệ nhanh qua WhatsApp.",
      hi: "राष्ट्रीय और अंतरराष्ट्रीय ख़रीदारों की सेवा, WhatsApp पर तुरंत संपर्क के साथ।",
    },
  },
]

/** Visible WA number, or null while the configured number is still a placeholder. */
export function visiblePhone(): string | null {
  return siteSettings.phonePending ? null : waDisplayNumber()
}

export function waDisplayNumber(): string {
  const raw = siteSettings.waTargets[0]?.phoneE164 || ""
  if (!raw.startsWith("62")) return `+${raw}`
  const rest = raw.slice(2)
  return `+62 ${rest.slice(0, 3)}-${rest.slice(3, 7)}-${rest.slice(7)}`
}
