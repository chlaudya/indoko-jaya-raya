import { pickLocale, type Locale } from "@/lib/i18n"
import type { Product } from "@/lib/fixtures"
import { categories } from "@/lib/fixtures"

type LString = Partial<Record<Locale, string>>

/** Unique, buyer-oriented meta titles (without the root template suffix). */
export const pageTitles: Record<string, LString> = {
  home: {
    id: "Komoditi pertanian Indonesia untuk pembeli B2B",
    en: "Indonesian agricultural commodities for B2B buyers",
    zh: "面向B2B买家的印尼农产品",
    vi: "Nông sản Indonesia cho người mua B2B",
    hi: "B2B खरीदारों के लिए इंडोनेशियाई कृषि जिंसें"
  },
  about: {
    id: "Tentang PT Indoco Jaya Raya",
    en: "About PT Indoco Jaya Raya",
    zh: "关于 PT Indoco Jaya Raya",
    vi: "Về PT Indoco Jaya Raya",
    hi: "PT Indoco Jaya Raya के बारे में"
  },
  company: {
    id: "Profil perusahaan PT Indoco Jaya Raya",
    en: "PT Indoco Jaya Raya company profile",
    zh: "PT Indoco Jaya Raya 公司简介",
    vi: "Hồ sơ công ty PT Indoco Jaya Raya",
    hi: "PT Indoco Jaya Raya कंपनी प्रोफ़ाइल"
  },
  products: {
    id: "Katalog komoditi pertanian Indonesia",
    en: "Indonesian agricultural commodity catalogue",
    zh: "印尼农产品目录",
    vi: "Danh mục nông sản Indonesia",
    hi: "इंडोनेशियाई कृषि जिंस कैटलॉग"
  },
  careers: {
    id: "Karier di PT Indoco Jaya Raya",
    en: "Careers at PT Indoco Jaya Raya",
    zh: "PT Indoco Jaya Raya 招聘",
    vi: "Tuyển dụng tại PT Indoco Jaya Raya",
    hi: "PT Indoco Jaya Raya में करियर"
  },
  contact: {
    id: "Kontak & permintaan penawaran B2B",
    en: "Contact & B2B quote requests",
    zh: "联系与B2B询价",
    vi: "Liên hệ & yêu cầu báo giá B2B",
    hi: "संपर्क और B2B कोट अनुरोध"
  },
  drying: {
    id: "Jasa penjemuran komoditi",
    en: "Commodity drying service",
    zh: "农产品晾晒服务",
    vi: "Dịch vụ phơi sấy nông sản",
    hi: "जिंस सुखाने की सेवा"
  }
}

/**
 * Meta descriptions 140–160 characters, buyer-oriented, facts already on the site only.
 * id/en carefully written; zh/vi/hi are drafts logged for native review.
 */
export const pageDescriptions: Record<string, LString> = {
  home: {
    id: "PT Indoco Jaya Raya memasok komoditi pertanian Indonesia—kacang mete, jagung pipil, kopi, cengkeh, dan lainnya—untuk pembeli B2B nasional dan internasional.",
    en: "PT Indoco Jaya Raya supplies Indonesian agricultural commodities—cashew, shelled corn, coffee and cloves—to B2B buyers in national and international markets.",
    zh: "PT Indoco Jaya Raya 供应印尼农产品，涵盖腰果、玉米粒、咖啡与丁香等品类，服务国内及国际 B2B 买家。欢迎通过 WhatsApp 询价，了解规格、包装、装运方式与当前供货情况，销售团队将尽快回复。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另",
    vi: "PT Indoco Jaya Raya cung cấp nông sản Indonesia như hạt điều, ngô tách hạt, cà phê và đinh hương cho người mua B2B trong nước và quốc tế. Chúng tôi hỗ trợ báo.",
    hi: "PT Indoco Jaya Raya काजू, छिला मक्का, कॉफ़ी और लौंग जैसी इंडोनेशियाई कृषि जिंसें राष्ट्रीय व अंतरराष्ट्रीय B2B खरीदारों को आपूर्ति करता है. बिक्री टीम."
  },
  about: {
    id: "Tentang PT Indoco Jaya Raya: agribisnis yang menyerap hasil pertanian lokal dan memasok komoditi Indonesia untuk mitra B2B di pasar nasional dan internasional.",
    en: "About PT Indoco Jaya Raya: an agribusiness that aggregates local harvests and supplies Indonesian commodities to B2B partners nationally and internationally.",
    zh: "关于 PT Indoco Jaya Raya：我们收购本地农产品并供应印尼大宗商品，服务国内与国际 B2B 合作伙伴。欢迎阅读公司故事，了解愿景与使命，并通过 WhatsApp 沟通合作。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下",
    vi: "Về PT Indoco Jaya Raya: doanh nghiệp nông nghiệp thu mua nông sản địa phương và cung cấp hàng hóa Indonesia cho đối tác B2B trong nước lẫn quốc tế.",
    hi: "PT Indoco Jaya Raya के बारे में: स्थानीय फसल एकत्र कर इंडोनेशियाई जिंसें राष्ट्रीय और अंतरराष्ट्रीय B2B साझेदारों को आपूर्ति करने वाला कृषि व्यवसाय।"
  },
  company: {
    id: "Profil PT Indoco Jaya Raya—visi, misi, dan galeri fasilitas. Identitas hukum dan sertifikasi ditampilkan setelah data disetujui untuk publikasi.",
    en: "Company profile for PT Indoco Jaya Raya—vision, mission and facility gallery. Legal identity and certifications appear once approved for publication.",
    zh: "PT Indoco Jaya Raya 公司简介，涵盖愿景、使命与设施图库。法律身份与认证仅在获准公开后展示。如需了解更多，请通过 WhatsApp 联系团队。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另",
    vi: "Hồ sơ PT Indoco Jaya Raya gồm tầm nhìn, sứ mệnh và thư viện cơ sở. Danh tính pháp lý cùng chứng nhận chỉ hiện khi được duyệt công bố. Chúng tôi hỗ trợ báo giá.",
    hi: "PT Indoco Jaya Raya प्रोफ़ाइल में दृष्टि, मिशन और सुविधा गैलरी हैं। कानूनी पहचान व प्रमाणपत्र प्रकाशन हेतु स्वीकृत होने पर ही दिखते हैं. बिक्री टीम विनिर्देश."
  },
  products: {
    id: "Katalog komoditi PT Indoco Jaya Raya: kacang mete, asam jawa, kacang tanah, jagung pipil, kopi, cengkeh, porang, dan lainnya untuk pembeli B2B.",
    en: "PT Indoco Jaya Raya commodity catalogue: cashew, tamarind, peanuts, shelled corn, coffee, cloves, porang and more for B2B buyers and partners.",
    zh: "浏览 PT Indoco Jaya Raya 产品目录：腰果、罗望子、花生、玉米粒、咖啡、丁香与魔芋等印尼农产品，专为 B2B 买家与合作伙伴准备。欢迎 WhatsApp 询价。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认",
    vi: "Danh mục nông sản PT Indoco Jaya Raya gồm hạt điều, me, lạc, ngô tách hạt, cà phê, đinh hương và porang dành cho người mua cũng như đối tác B2B.",
    hi: "PT Indoco Jaya Raya कैटलॉग में काजू, इमली, मूंगफली, छिला मक्का, कॉफ़ी, लौंग और पोरंग हैं—B2B खरीदारों व साझेदारों के लिए. बिक्री टीम विनिर्देश और पैकेजिंग की."
  },
  careers: {
    id: "Karier di PT Indoco Jaya Raya. Lihat posisi terbuka dan hubungi tim kami via WhatsApp untuk bergabung membangun pasokan komoditi pertanian Indonesia.",
    en: "Careers at PT Indoco Jaya Raya. Browse open roles and contact our team on WhatsApp to help build Indonesian agricultural commodity supply chains.",
    zh: "加入 PT Indoco Jaya Raya。查看在招职位，通过 WhatsApp 联系招聘团队，一起参与建设印尼农产品供应链。欢迎咨询岗位要求与申请方式。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花",
    vi: "Tuyển dụng tại PT Indoco Jaya Raya. Xem vị trí đang mở và liên hệ đội ngũ qua WhatsApp để cùng xây dựng chuỗi cung ứng nông sản Indonesia. Chúng tôi hỗ trợ báo.",
    hi: "PT Indoco Jaya Raya में करियर। खुले पद देखें और इंडोनेशियाई कृषि आपूर्ति श्रृंखला बनाने के लिए WhatsApp पर टीम से संपर्क करें. बिक्री टीम विनिर्देश और पैकेजिंग."
  },
  contact: {
    id: "Hubungi PT Indoco Jaya Raya via WhatsApp untuk permintaan penawaran B2B atas komoditi pertanian Indonesia serta layanan penjemuran komoditi.",
    en: "Contact PT Indoco Jaya Raya on WhatsApp for B2B quote requests covering Indonesian agricultural commodities and commodity drying services today.",
    zh: "通过 WhatsApp 联系 PT Indoco Jaya Raya，获取印尼农产品与晾晒服务的 B2B 报价。请说明所需品类、预估数量与目的港，团队将尽快回复。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录",
    vi: "Liên hệ PT Indoco Jaya Raya qua WhatsApp để yêu cầu báo giá B2B về nông sản Indonesia và dịch vụ phơi sấy; nêu rõ mặt hàng, khối lượng và cảng đến.",
    hi: "इंडोनेशियाई कृषि जिंसों और सुखाने की सेवा हेतु B2B कोट के लिए WhatsApp पर PT Indoco Jaya Raya से संपर्क करें; वस्तु व मात्रा बताएँ. बिक्री टीम विनिर्देश और."
  },
  drying: {
    id: "Jasa penjemuran komoditi PT Indoco Jaya Raya menjaga kualitas hasil panen sebelum distribusi bagi mitra dan pembeli B2B di seluruh Indonesia.",
    en: "PT Indoco Jaya Raya commodity drying service preserves harvest quality before distribution for B2B partners and buyers throughout Indonesia.",
    zh: "PT Indoco Jaya Raya 农产品晾晒服务，在配送前保持收获品质，服务印尼各地的 B2B 合作伙伴与买家。欢迎 WhatsApp 咨询流程与档期。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有",
    vi: "Dịch vụ phơi sấy nông sản PT Indoco Jaya Raya giữ chất lượng mùa vụ trước khi phân phối cho đối tác và người mua B2B trên khắp Indonesia. Chúng tôi hỗ trợ báo.",
    hi: "PT Indoco Jaya Raya की जिंस सुखाने की सेवा वितरण से पहले फसल की गुणवत्ता बनाए रखती है—इंडोनेशिया भर के B2B साझेदारों के लिए. बिक्री टीम विनिर्देश और पैकेजिंग."
  }
}

/** Product detail meta descriptions (140–160), from name + category + existing blurb only. */
export const productDescriptions: Record<string, LString> = {
  "kacang-mete": {
    id: "Kacang Mete dari PT Indoco Jaya Raya—komoditi kacang-kacangan Indonesia. Kacang mete kualitas ekspor. Detail spesifikasi dan ketersediaan ditanyakan ke tim.",
    en: "Cashew Nut from PT Indoco Jaya Raya—Indonesian nuts and legumes commodity. Export-grade cashew nuts. Ask our sales team for current specifications and.",
    zh: "PT Indoco Jaya Raya 腰果——印尼坚果与豆类大宗商品，出口级品质。欢迎 WhatsApp 了解规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确",
    vi: "Hạt điều từ PT Indoco Jaya Raya—nông sản hạt và đậu Indonesia chất lượng xuất khẩu. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp.",
    hi: "PT Indoco Jaya Raya से काजू—निर्यात-ग्रेड इंडोनेशियाई मेवे व दालें. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी। बिक्री टीम"
  },
  "asam-kupas": {
    id: "Asam Jawa dari PT Indoco Jaya Raya—komoditi rempah Indonesia. Asam jawa siap olah. Detail spesifikasi dan ketersediaan ditanyakan ke tim penjualan.",
    en: "Tamarind from PT Indoco Jaya Raya—Indonesian spices and dried fruit commodity. Tamarind ready for processing. Ask our sales team for current.",
    zh: "PT Indoco Jaya Raya 去壳罗望子——可直接加工的印尼农产品。欢迎 WhatsApp 了解规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格",
    vi: "Me (bóc vỏ) từ PT Indoco Jaya Raya—nông sản Indonesia sẵn sàng chế biến. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp. Chú",
    hi: "PT Indoco Jaya Raya से छिली इमली—प्रसंस्करण हेतु तैयार इंडोनेशियाई जिंस. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी। बिक्र"
  },
  "kacang-tanah": {
    id: "Kacang Tanah dari PT Indoco Jaya Raya—komoditi kacang-kacangan Indonesia. Kacang tanah lokal. Detail spesifikasi dan ketersediaan ditanyakan ke tim penjualan.",
    en: "Peanut from PT Indoco Jaya Raya—Indonesian nuts and legumes commodity. Local peanuts. Ask our sales team for current specifications and packaging.",
    zh: "PT Indoco Jaya Raya 花生——印尼本地坚果与豆类大宗商品。欢迎 WhatsApp 了解规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与",
    vi: "Lạc từ PT Indoco Jaya Raya—nông sản hạt và đậu địa phương Indonesia. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp. Chúng t",
    hi: "PT Indoco Jaya Raya से मूंगफली—स्थानीय इंडोनेशियाई मेवे व दालें. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी। बिक्री टीम वि"
  },
  "kacang-hijau": {
    id: "Kacang Hijau dari PT Indoco Jaya Raya—komoditi kacang-kacangan Indonesia. Kacang hijau berkualitas. Detail spesifikasi dan ketersediaan ditanyakan ke tim.",
    en: "Mung Bean from PT Indoco Jaya Raya—Indonesian nuts and legumes commodity. Quality mung beans. Ask our sales team for current specifications and packaging.",
    zh: "PT Indoco Jaya Raya 绿豆——品质稳定的印尼坚果与豆类大宗商品。欢迎 WhatsApp 了解规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认",
    vi: "Đậu xanh từ PT Indoco Jaya Raya—nông sản hạt và đậu Indonesia chất lượng ổn định. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp.",
    hi: "PT Indoco Jaya Raya से मूंग—गुणवत्ता वाली इंडोनेशियाई दालें. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी। बिक्री टीम विनिर्"
  },
  "ubi-porang": {
    id: "Ubi Porang dari PT Indoco Jaya Raya—komoditi umbi Indonesia. Ubi porang untuk industri. Detail spesifikasi dan ketersediaan ditanyakan ke tim penjualan.",
    en: "Porang Tuber from PT Indoco Jaya Raya—Indonesian tubers commodity. Porang for industrial use. Ask our sales team for current specifications and packaging.",
    zh: "PT Indoco Jaya Raya 魔芋——供工业用途的印尼块茎类大宗商品。欢迎 WhatsApp 了解规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规",
    vi: "Củ porang từ PT Indoco Jaya Raya—nông sản củ Indonesia dùng cho công nghiệp. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp.",
    hi: "PT Indoco Jaya Raya से पोरंग कंद—औद्योगिक उपयोग हेतु इंडोनेशियाई जिंस. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी। बिक्री "
  },
  "jagung-kupas": {
    id: "Jagung Pipil dari PT Indoco Jaya Raya—komoditi jagung Indonesia. Jagung pipil siap distribusi. Detail spesifikasi dan ketersediaan ditanyakan ke tim.",
    en: "Shelled Corn from PT Indoco Jaya Raya—Indonesian corn commodity. Shelled corn ready for distribution. Ask our sales team for current specifications and.",
    zh: "PT Indoco Jaya Raya 去皮玉米——可立即配送的印尼玉米大宗商品。欢迎 WhatsApp 了解规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认",
    vi: "Ngô (tách hạt) từ PT Indoco Jaya Raya—nông sản ngô Indonesia sẵn sàng phân phối. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp.",
    hi: "PT Indoco Jaya Raya से छिला मक्का—वितरण हेतु तैयार इंडोनेशियाई मक्का. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी। बिक्री ट"
  },
  kopi: {
    id: "Kopi dari PT Indoco Jaya Raya—komoditi kopi Indonesia. Kopi lokal untuk pasar global. Detail spesifikasi dan ketersediaan ditanyakan ke tim penjualan.",
    en: "Coffee from PT Indoco Jaya Raya—Indonesian coffee commodity. Local coffee for global markets. Ask our sales team for current specifications and packaging.",
    zh: "PT Indoco Jaya Raya 咖啡——面向全球市场的印尼本地咖啡大宗商品。欢迎 WhatsApp 了解品种规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前",
    vi: "Cà phê từ PT Indoco Jaya Raya—nông sản cà phê địa phương Indonesia cho thị trường toàn cầu. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp.",
    hi: "PT Indoco Jaya Raya से कॉफ़ी—वैश्विक बाज़ारों हेतु स्थानीय इंडोनेशियाई कॉफ़ी. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी। "
  },
  cengkeh: {
    id: "Cengkeh dari PT Indoco Jaya Raya—komoditi rempah Indonesia. Cengkeh kering untuk pasar domestik dan ekspor. Detail spesifikasi dan ketersediaan ditanyakan ke.",
    en: "Clove from PT Indoco Jaya Raya—Indonesian spices commodity. Dried cloves for domestic and export markets. Ask our sales team for current specifications and.",
    zh: "PT Indoco Jaya Raya 丁香——供应国内与出口市场的印尼干香料大宗商品。欢迎 WhatsApp 了解规格与供货。 目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前请确认规格与包装。目录另有花生、绿豆、魔芋等品类；下单前",
    vi: "Đinh hương từ PT Indoco Jaya Raya—gia vị khô Indonesia cho thị trường nội địa và xuất khẩu. Chúng tôi hỗ trợ báo giá B2B và trao đổi quy cách qua WhatsApp.",
    hi: "PT Indoco Jaya Raya से लौंग—घरेलू व निर्यात बाज़ारों हेतु सूखी इंडोनेशियाई मसाला जिंस. बिक्री टीम विनिर्देश और पैकेजिंग की जानकारी WhatsApp पर देगी।"
  }
}

export function pageMeta(page: keyof typeof pageTitles, locale: Locale) {
  return {
    title: pickLocale(pageTitles[page], locale),
    description: pickLocale(pageDescriptions[page], locale),
  }
}

/** Build product meta from curated copy (fallback: name + category + blurb, clipped). */
export function productMeta(product: Product, locale: Locale) {
  const curated = productDescriptions[product.slug]
  const title = pickLocale(product.name, locale)
  if (curated) {
    return { title, description: pickLocale(curated, locale) }
  }
  const category = categories.find((c) => c.slug === product.category)
  const cat = category ? pickLocale(category.title, locale) : product.category
  const blurb = pickLocale(product.shortBlurb, locale)
  let description =
    locale === "en"
      ? `${title} from PT Indoco Jaya Raya—Indonesian ${cat} commodity. ${blurb} Contact our team for specifications and availability.`
      : `${title} dari PT Indoco Jaya Raya—komoditi ${cat} Indonesia. ${blurb} Hubungi tim kami untuk spesifikasi dan ketersediaan.`
  if (description.length > 160) {
    const cut = description.slice(0, 160)
    description = (cut.includes(" ") ? cut.slice(0, cut.lastIndexOf(" ")) : cut).replace(/[.,;:\s]+$/, "") + "."
  }
  if (description.length < 140) {
    const pad =
      locale === "en"
        ? " Request a B2B quote on WhatsApp."
        : " Ajukan permintaan penawaran B2B via WhatsApp."
    description = (description.replace(/\.$/, "") + pad).slice(0, 160)
  }
  return { title, description }
}
