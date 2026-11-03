import { pickLocale, type Locale } from "./i18n"
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
      id: "Halo Indoko Jaya Raya, saya ingin mengetahui lebih lanjut tentang perusahaan Anda.",
      en: "Hello Indoko Jaya Raya, I would like to learn more about your company.",
    },
    drying: {
      id: "Halo, saya ingin konsultasi Jasa Penjemuran Komoditi.",
      en: "Hello, I would like to consult about commodity drying services.",
    },
    // Careers apply CTA (list + detail): position and location in the page language. zh / vi / hi DRAFT.
    careerApply: {
      id: "Halo Indoko Jaya Raya, saya ingin melamar posisi {{position}} ({{location}}). Mohon informasi lebih lanjut.",
      en: "Hello Indoko Jaya Raya, I would like to apply for the {{position}} position ({{location}}). Please send me more information.",
    },
    contact: {
      id: "Halo Indoko Jaya Raya, saya ingin menghubungi tim Anda.",
      en: "Hello Indoko Jaya Raya, I would like to contact your team.",
    },
    // Home, per section: each message says where it was sent from. zh / vi / hi DRAFT.
    homeHero: {
      id: "Halo Indoko Jaya Raya, saya menghubungi Anda dari halaman utama website. Saya ingin mengetahui lebih lanjut tentang komoditi Anda.",
      en: "Hello Indoko Jaya Raya, I'm contacting you from your website's home page. I'd like to learn more about your commodities.",
    },
    homeDrying: {
      id: "Halo Indoko Jaya Raya, saya menghubungi Anda dari bagian Jasa Penjemuran di halaman utama website. Saya ingin mendiskusikan kebutuhan penjemuran komoditi saya.",
      en: "Hello Indoko Jaya Raya, I'm contacting you from the Drying Service section on your home page. I'd like to discuss my commodity drying needs.",
    },
    homeBanner: {
      id: "Halo Indoko Jaya Raya, saya menghubungi Anda dari tombol WhatsApp di bagian bawah halaman utama website. Saya ingin membicarakan kebutuhan komoditi atau pasokan saya.",
      en: "Hello Indoko Jaya Raya, I'm contacting you from the WhatsApp button at the bottom of your home page. I'd like to talk about my commodity or supply needs.",
    },
    // Commodity cards (Home + Katalog): product name in the page language.
    productPage: {
      id: "Halo Indoko Jaya Raya, saya tertarik dengan {{productName}} yang saya lihat di halaman produk website Anda. Mohon informasi lebih lanjut.",
      en: "Hello Indoko Jaya Raya, I'm interested in {{productName}}, which I saw on the product page of your website. Please share more details.",
    },
    productCard: {
      id: "Halo Indoko Jaya Raya, saya tertarik dengan {{productName}} yang saya lihat di daftar komoditi website Anda. Mohon informasi lebih lanjut.",
      en: "Hello Indoko Jaya Raya, I'm interested in {{productName}}, which I saw in the commodity list on your website. Please share more details.",
    },
  } as Record<string, LString>,
  /** Public email: empty until the client confirms one (the footer shows "Menyusul"). Never invent an address. */
  email: "" as string,
  companyShortBlurb: {
    id: "Agribisnis hasil bumi lokal untuk pasar nasional dan internasional.",
    en: "Local agribusiness commodities for national and international markets.",
  },
  /**
   * True until the client confirms a public street address. Hide address in every locale
   * based on this flag (never on translated "menyusul" / "pending" text).
   */
  addressPending: true as boolean,
  address: {
    id: "Indonesia — alamat lengkap menyusul dari klien.",
    en: "Indonesia — full address pending client confirmation.",
  },
}

export const nav = [
  { href: "", label: { id: "Beranda", en: "Home" } },
  { href: "about", label: { id: "Perusahaan", en: "Company" } },
  { href: "products", label: { id: "Komoditi", en: "Commodities" } },
  { href: "services/drying", label: { id: "Layanan", en: "Services" } },
  { href: "careers", label: { id: "Karier", en: "Careers" } },
  { href: "contact", label: { id: "Kontak", en: "Contact" } },
]

export const ui = {
  requestInquiry: { id: "Ajukan pertanyaan", en: "Request an inquiry" },
  requestQuote: { id: "Minta Penawaran", en: "Request a Quote", zh: "索取报价", vi: "Yêu cầu báo giá", hi: "कोट अनुरोध करें" },
  /** Narrow-header CTA (<~360–375px) when the full requestQuote label would wrap or squeeze touch targets. */
  requestQuoteShort: { id: "Penawaran", en: "Get a Quote", zh: "报价", vi: "Báo giá", hi: "कोट" },
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
  noOpenPositions: { id: "Tidak ada posisi terbuka saat ini.", en: "No open positions right now." },
  careersEmptyHint: { id: "Hubungi kami via WhatsApp untuk informasi karier.", en: "Contact us on WhatsApp for career information." },
  // Image credit captions (e.g. Wikimedia photos in the product gallery).
  photoCredit: { id: "Foto", en: "Photo" },
  photoCropped: { id: "dipotong", en: "cropped" },
  roleDescription: { id: "Deskripsi posisi", en: "The role" },
  qualifications: { id: "Kualifikasi", en: "Qualifications" },
  location: { id: "Lokasi", en: "Location" },
  pendingConfirmation: { id: "Menunggu konfirmasi data.", en: "Pending confirmed data." },
  skipToContent: { id: "Lewati ke konten", en: "Skip to content" },
  language: { id: "Bahasa", en: "Language" },
  ourCommodities: { id: "Komoditi kami", en: "Our commodities" },
  whyPartner: { id: "Mengapa bermitra", en: "Why partner with Indoko" },
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
  whyChooseLabel: { id: "Keunggulan kami", en: "Why work with us" },
  whyChooseUs: { id: "Mengapa memilih kami", en: "Why choose us", zh: "为何选择我们", vi: "Vì sao chọn chúng tôi", hi: "हमें क्यों चुनें" },
  footerCompany: { id: "Perusahaan", en: "Company" },
  // Landing v1 (DRAFT zh / vi / hi)
  ourServices: { id: "Layanan kami", en: "Our services", zh: "我们的服务", vi: "Dịch vụ của chúng tôi", hi: "हमारी सेवाएँ" },
  askViaWhatsApp: { id: "Tanya via WhatsApp", en: "Ask on WhatsApp", zh: "通过 WhatsApp 咨询", vi: "Hỏi qua WhatsApp", hi: "WhatsApp पर पूछें" },
  navigation: { id: "Navigasi", en: "Navigation", zh: "导航", vi: "Điều hướng", hi: "नेविगेशन" },
  footerCommodities: { id: "Komoditi", en: "Commodities", zh: "农产品", vi: "Nông sản", hi: "जिंसें" },
  email: { id: "Email", en: "Email", zh: "电子邮件", vi: "Email", hi: "ईमेल" },
  phone: { id: "Telepon", en: "Phone", zh: "电话", vi: "Điện thoại", hi: "फ़ोन" },
  chatOnWhatsApp: { id: "Chat via WhatsApp", en: "Chat on WhatsApp", zh: "通过 WhatsApp 聊天", vi: "Trò chuyện qua WhatsApp", hi: "WhatsApp पर चैट करें" },
  bannerLabel: { id: "Mari bekerja sama", en: "Let's work together", zh: "携手合作", vi: "Hãy cùng hợp tác", hi: "आइए साथ काम करें" },
  bannerCta: { id: "Hubungi kami via WhatsApp", en: "Contact us on WhatsApp", zh: "通过 WhatsApp 联系我们", vi: "Liên hệ qua WhatsApp", hi: "WhatsApp पर संपर्क करें" },
  bannerReassure: {
    id: "Pesan Anda langsung masuk ke WhatsApp tim kami.",
    en: "Your message goes straight to our team's WhatsApp.",
    zh: "您的消息将直接发送到我们团队的 WhatsApp。",
    vi: "Tin nhắn của bạn được gửi thẳng đến WhatsApp của đội ngũ chúng tôi.",
    hi: "आपका संदेश सीधे हमारी टीम के WhatsApp पर पहुँचता है।",
  },
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
  { slug: "umbi", title: { id: "Ubi", en: "Tubers" } },
  { slug: "jagung", title: { id: "Jagung", en: "Corn" } },
  { slug: "kopi", title: { id: "Kopi", en: "Coffee" } },
  { slug: "rempah", title: { id: "Rempah & Buah Kering", en: "Spices & Dried Fruit" } },
  { slug: "layanan", title: { id: "Layanan", en: "Services" } },
]

/** Spec row: label + value (+ optional unit). Ranges live in `value` (e.g. "8–10") or as min/max. */
export type SpecRow = {
  label: LString
  value?: LString
  unit?: LString
  min?: number
  max?: number
}

export type AvailabilityStatus =
  | "available"
  | "limited"
  | "seasonal"
  | "made_to_order"
  | "unavailable"

export type Product = {
  slug: string
  kind: "product" | "service"
  category: string
  featured?: boolean
  name: LString
  /** International trade name (localized). Empty until confirmed — never invent. */
  internationalTradeName?: LString
  shortBlurb: LString
  description: LString
  /** HS code — public UI must check hsVerified before rendering. */
  hsCode?: string
  hsVerified?: boolean
  productForm?: LString
  specs: SpecRow[]
  packagingType?: LString
  bagWeight?: { value?: string; unit?: string; min?: number; max?: number }
  containerLoad20?: string
  containerLoad40?: string
  moq?: LString
  incoterms?: string[]
  portOfLoading?: LString
  leadTime?: LString
  paymentTerms?: LString
  /** Calendar months 1–12. */
  harvestMonths?: number[]
  supplyMonths?: number[]
  availableDocuments?: string[]
  /** Public URL or path to a PDF once the client supplies one. */
  specSheetUrl?: string
  availabilityStatus?: AvailabilityStatus
  /** Per-locale publish flags; when set, false hides the product for that locale. */
  publishLocales?: Partial<Record<Locale, boolean>>
  servicePagePath?: string
  capacity?: LString
  capacityPending?: boolean
  location?: LString
  processSteps?: { title: LString; body: LString }[]
  /** Optimised photo key (CMS: product.images[0]); placeholder when absent. */
  image?: ImageKey
  /** Gallery keys; alt text lives on IMAGES[key].alt (Sanity: per-image localeString alt). */
  gallery?: ImageKey[]
}

export const products: Product[] = [
  {
    slug: "kacang-mete",
    image: "cardCashew",
    gallery: ["sectionCashewSorting", "heroCashewSorters"],
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
    image: "cardTamarindBowl",
    kind: "product",
    category: "rempah",
    featured: true,
    name: { id: "Asam Jawa", en: "Tamarind" },
    shortBlurb: { id: "Asam jawa siap olah.", en: "Tamarind ready for processing." },
    description: { id: "Asam jawa untuk pasar domestik dan ekspor.", en: "Tamarind for domestic and export markets." },
    specs: [{ label: { id: "Bentuk", en: "Form" }, value: { id: "Kupas", en: "Peeled" } }],
  },
  {
    slug: "kacang-tanah",
    image: "cardPeanuts",
    gallery: ["heroPeanutTexture", "sectionPeanutTarp"],
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
    gallery: ["cardMungSpoon", "cardMungSpoons"],
    kind: "product",
    category: "kacang-kacangan",
    name: { id: "Kacang Hijau", en: "Mung Bean" },
    shortBlurb: { id: "Kacang hijau berkualitas.", en: "Quality mung beans." },
    description: { id: "Kacang hijau untuk industri pangan.", en: "Mung beans for food industry." },
    specs: [{ label: { id: "Kualitas", en: "Quality" }, value: { id: "Standar", en: "Standard" } }],
  },
  {
    slug: "ubi-porang",
    image: "cardPorangPlant",
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
    gallery: ["cardPillarCommodities", "heroSlide2"],
    kind: "product",
    category: "jagung",
    name: { id: "Jagung Pipil", en: "Shelled Corn" },
    shortBlurb: { id: "Jagung pipil siap distribusi.", en: "Shelled corn ready for distribution." },
    description: { id: "Jagung pipil untuk pakan dan pangan.", en: "Shelled corn for feed and food." },
    specs: [{ label: { id: "Bentuk", en: "Form" }, value: { id: "Pipil", en: "Shelled" } }],
  },
  {
    slug: "kopi",
    image: "cardKopi",
    gallery: ["cardCoffeeCherries", "cardCoffeeBerries"],
    kind: "product",
    category: "kopi",
    featured: true,
    name: { id: "Kopi", en: "Coffee" },
    shortBlurb: { id: "Kopi lokal untuk pasar global.", en: "Local coffee for global markets." },
    description: { id: "Kopi hasil bumi lokal.", en: "Local coffee commodities." },
    specs: [{ label: { id: "Jenis", en: "Type" }, value: { id: "Sesuai ketersediaan", en: "Subject to availability" } }],
  },
  {
    slug: "cengkeh",
    image: "cardCengkeh",
    gallery: ["cardCengkehBuds"],
    kind: "product",
    category: "rempah",
    featured: true,
    name: { id: "Cengkeh", en: "Clove" },
    shortBlurb: { id: "Cengkeh kering untuk pasar domestik dan ekspor.", en: "Dried cloves for domestic and export markets." },
    description: { id: "Komoditi cengkeh dari Indonesia untuk mitra B2B.", en: "Indonesian clove commodity for B2B partners." },
    specs: [
      { label: { id: "Bentuk", en: "Form" }, value: { id: "Kering", en: "Dried" } },
      { label: { id: "Asal", en: "Origin" }, value: { id: "Indonesia", en: "Indonesia" } },
    ],
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
    /** The capacity text below is a pending note, not data: Home hides capacity / location until confirmed. */
    capacityPending: true,
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

export const pages = {
  home: {
    heroEyebrow: { id: "Indoko Jaya Raya", en: "Indoko Jaya Raya" },
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
      id: "PT Indoko Jaya Raya menyerap dan memperdagangkan hasil pertanian lokal.",
      en: "PT Indoko Jaya Raya aggregates and trades local agricultural produce.",
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
      id: "PT Indoko Jaya Raya bergerak dalam penyerapan dan perdagangan hasil pertanian lokal.",
      en: "PT Indoko Jaya Raya aggregates and trades local agricultural produce.",
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
    legalName: { id: "PT Indoko Jaya Raya", en: "PT Indoko Jaya Raya" },
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
/** Client-confirmed numbers only (CMS: home.stats). */
export type StatItem = { value: string; label: LString }
/** `icon`: key into the inline icon set (components/TrustSection.tsx). */
export type TrustItem = { icon?: string; title: LString; body: LString }

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
     * Five full-bleed slides: two people (IMG_8764, IMG_8865) and three commodities (corn 8808, cashew 8782, peanuts 8864).
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
     * Phrase inside heroTitle that is emphasised: lime-tint (--color-lime-tint) in every locale, italic in Latin
     * scripts (id/en/vi), upright in zh/hi. Must match heroTitle exactly per locale.
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
        href: "#sustainability",
        tone: "forest",
      },
    ] as PillarTile[],
    features: [
      {
        key: "about",
        eyebrow: { id: "Tentang Indoko", en: "About Indoko" },
        title: {
          id: "Hasil pertanian lokal, disiapkan untuk pasar global.",
          en: "Local agricultural products, prepared for global markets.",
        },
        body: {
          id: "PT Indoko Jaya Raya menyerap dan memperdagangkan hasil pertanian lokal untuk mitra di dalam dan luar negeri.",
          en: "PT Indoko Jaya Raya aggregates and trades local agricultural produce for partners at home and abroad.",
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
 * Trust stats (CMS: home.stats[]). Empty: no confirmed client numbers yet, and none may be invented. Display rule:
 * every filled entry (value + label) shows and the row re-centres; with none the row is hidden.
 */
export const homeStats: StatItem[] = []

/**
 * "Why choose us" cards (CMS default for home.trustPoints[]): the PM's 3 reasons. All 5 locales are DRAFT pending
 * client review (docs/i18n-draft-strings.md). No certification, sustainability or numeric claims.
 */
export const whyChoose: TrustItem[] = [
  {
    icon: "sort",
    title: {
      id: "Sortir sebelum kirim",
      en: "Sorted before shipping",
      zh: "发货前品质分拣",
      vi: "Phân loại trước khi giao",
      hi: "भेजने से पहले छँटाई",
    },
    body: {
      id: "Komoditi disortir sebelum dikirim agar sesuai kebutuhan pembeli. Dengan begitu, kualitas yang Anda terima tetap konsisten dari satu pengiriman ke pengiriman berikutnya.",
      en: "Commodities are sorted before they ship, to match what buyers need. That way, the quality you receive stays consistent from one shipment to the next.",
      zh: "农产品在发货前经过分拣，以符合买家需求。这样，您收到的品质在每一次发货中都保持一致。",
      vi: "Nông sản được phân loại trước khi giao để phù hợp với nhu cầu người mua. Nhờ đó, chất lượng bạn nhận được luôn đồng đều từ chuyến hàng này sang chuyến hàng khác.",
      hi: "भेजने से पहले जिंसों की छँटाई की जाती है, ताकि वे ख़रीदार की ज़रूरत के अनुरूप हों। इस तरह, आपको मिलने वाली गुणवत्ता हर शिपमेंट में एक जैसी बनी रहती है।",
    },
  },
  {
    icon: "price",
    title: {
      id: "Harga Tangan Pertama",
      en: "First-hand prices",
      zh: "源头直供价格",
      vi: "Giá tận gốc",
      hi: "सीधे स्रोत से दाम",
    },
    body: {
      id: "Kami bermitra langsung dengan petani lokal tanpa rantai perantara, sehingga harga tetap bersaing. Penawaran disesuaikan dengan volume dan spesifikasi pesanan Anda.",
      en: "We partner directly with local farmers with no chain of middlemen, so prices stay competitive. Offers are tailored to the volume and specifications of your order.",
      zh: "我们直接与本地农户合作，没有中间商环节，因此价格始终具有竞争力。报价将根据您订单的数量和规格量身制定。",
      vi: "Chúng tôi hợp tác trực tiếp với nông dân địa phương, không qua chuỗi trung gian, nên giá luôn cạnh tranh. Báo giá được điều chỉnh theo khối lượng và quy cách đơn hàng của bạn.",
      hi: "हम बिना बिचौलियों की शृंखला के सीधे स्थानीय किसानों के साथ साझेदारी करते हैं, इसलिए दाम प्रतिस्पर्धी बने रहते हैं। प्रस्ताव आपके ऑर्डर की मात्रा और विनिर्देशों के अनुसार तय किया जाता है।",
    },
  },
  {
    icon: "fleet",
    title: {
      id: "Armada Banyak, Siap Antar",
      en: "A large fleet, ready to deliver",
      zh: "车队充足，随时配送",
      vi: "Đội xe đông đảo, sẵn sàng giao hàng",
      hi: "बड़ा बेड़ा, डिलीवरी के लिए तैयार",
    },
    body: {
      id: "Didukung banyak armada milik sendiri, kami mengatur setiap pengiriman dari gudang hingga ke tujuan Anda. Pesanan tiba dengan aman dan sesuai jadwal yang disepakati.",
      en: "Backed by a large fleet of our own, we arrange every shipment from our warehouse to your destination. Orders arrive safely and on the agreed schedule.",
      zh: "依托自有的众多车辆，我们安排从仓库到目的地的每一次运输。货物安全并按约定时间送达。",
      vi: "Với đội xe riêng đông đảo, chúng tôi sắp xếp mọi chuyến hàng từ kho đến nơi nhận của bạn. Đơn hàng đến nơi an toàn và đúng lịch đã thống nhất.",
      hi: "अपने स्वयं के बड़े बेड़े के सहयोग से, हम गोदाम से आपके गंतव्य तक हर शिपमेंट की व्यवस्था करते हैं। ऑर्डर सुरक्षित और तय समय पर पहुँचते हैं।",
    },
  },
]

/**
 * Icon strip under "Why choose us" (CMS default for home.iconStrip[]), shown in place of numeric stats. Descriptive
 * only, no numbers or claims. All 5 locales DRAFT.
 */
export const iconStrip: TrustItem[] = [
  {
    icon: "person",
    title: {
      id: "Petani & Pemasok",
      en: "Farmers & suppliers",
      zh: "农户与供应商",
      vi: "Nông dân & nhà cung cấp",
      hi: "किसान और आपूर्तिकर्ता",
    },
    body: {
      id: "Bekerja sama dengan petani dan pemasok lokal.",
      en: "Working with local farmers and suppliers.",
      zh: "与本地农户和供应商合作。",
      vi: "Hợp tác với nông dân và nhà cung cấp địa phương.",
      hi: "स्थानीय किसानों और आपूर्तिकर्ताओं के साथ काम।",
    },
  },
  {
    icon: "flower",
    title: {
      id: "Komoditi",
      en: "Commodities",
      zh: "农产品",
      vi: "Nông sản",
      hi: "जिंसें",
    },
    body: {
      id: "Kacang-kacangan, ubi, jagung, kopi, dan cengkeh dari Indonesia.",
      en: "Nuts and legumes, tubers, corn, coffee and cloves from Indonesia.",
      zh: "来自印度尼西亚的坚果与豆类、块茎、玉米、咖啡和丁香。",
      vi: "Các loại hạt và đậu, củ, ngô, cà phê và đinh hương từ Indonesia.",
      hi: "इंडोनेशिया से मेवे और दालें, कंद, मक्का, कॉफ़ी और लौंग।",
    },
  },
  {
    icon: "globe",
    title: {
      id: "Pasar",
      en: "Markets",
      zh: "市场",
      vi: "Thị trường",
      hi: "बाज़ार",
    },
    body: {
      id: "Melayani pembeli nasional dan internasional.",
      en: "Serving national and international buyers.",
      zh: "服务国内与国际买家。",
      vi: "Phục vụ người mua trong nước và quốc tế.",
      hi: "राष्ट्रीय और अंतरराष्ट्रीय ख़रीदारों की सेवा।",
    },
  },
  {
    icon: "leaf",
    title: {
      id: "Keberlanjutan",
      en: "Sustainability",
      zh: "可持续发展",
      vi: "Bền vững",
      hi: "स्थिरता",
    },
    body: {
      id: "Tumbuh bersama petani dan karyawan.",
      en: "Growing together with farmers and employees.",
      zh: "与农户和员工共同成长。",
      vi: "Cùng phát triển với nông dân và người lao động.",
      hi: "किसानों और कर्मचारियों के साथ मिलकर आगे बढ़ना।",
    },
  },
]

/** Visible WA number, or null while the configured number is still a placeholder. */
export function visiblePhone(): string | null {
  return siteSettings.phonePending ? null : waDisplayNumber()
}

/** Confirmed public address, or null while `addressPending` / empty. Gate on the flag, not translated text. */
export function confirmedAddress(locale: Locale): string | null {
  if (siteSettings.addressPending) return null
  const value = pickLocale(siteSettings.address, locale).trim()
  return value || null
}


export function waDisplayNumber(): string {
  const raw = siteSettings.waTargets[0]?.phoneE164 || ""
  if (!raw.startsWith("62")) return `+${raw}`
  const rest = raw.slice(2)
  return `+62 ${rest.slice(0, 3)}-${rest.slice(3, 7)}-${rest.slice(7)}`
}
