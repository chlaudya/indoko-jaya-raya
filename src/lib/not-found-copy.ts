import { pickLocale, type Locale } from "@/lib/i18n"

/** Localized 404 strings (UI + document title). zh/vi/hi are drafts for client review. */
export const notFoundCopy = {
  title: {
    id: "Halaman tidak ditemukan",
    en: "Page not found",
    zh: "页面未找到",
    vi: "Không tìm thấy trang",
    hi: "पृष्ठ नहीं मिला",
  },
  body: {
    id: "Maaf, halaman yang Anda cari tidak tersedia. Kembali ke beranda untuk menjelajahi komoditi kami.",
    en: "Sorry, the page you are looking for is not available. Return home to explore our commodities.",
    zh: "抱歉，您访问的页面不存在。请返回首页浏览我们的农产品。",
    vi: "Rất tiếc, trang bạn tìm không tồn tại. Quay về trang chủ để xem nông sản của chúng tôi.",
    hi: "क्षमा करें, आपके द्वारा खोजा गया पृष्ठ उपलब्ध नहीं है। हमारी जिंसें देखने के लिए होम पर लौटें।",
  },
  home: {
    id: "Kembali ke beranda",
    en: "Back to home",
    zh: "返回首页",
    vi: "Về trang chủ",
    hi: "होम पर वापस जाएँ",
  },
} as const

/** Document title: "Halaman tidak ditemukan | Indoco Jaya Raya" (absolute; bypasses root template). */
export function notFoundDocumentTitle(locale: Locale): string {
  return `${pickLocale(notFoundCopy.title, locale)} | Indoco Jaya Raya`
}
