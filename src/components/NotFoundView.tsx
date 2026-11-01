import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"

const copy = {
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
}

/** Localized 404 body (server component). Locale comes from the parent segment, not headers/cookies. */
export function NotFoundView({ locale }: { locale: Locale }) {
  return (
    <div className="band-lime">
      <div className="site-wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="label">404</p>
        <h1 className="display display-h1 mt-4 text-forest">{pickLocale(copy.title, locale)}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{pickLocale(copy.body, locale)}</p>
        <Link
          href={`/${locale}`}
          className="mt-10 inline-flex min-h-12 items-center rounded-[8px] btn-lime bg-lime px-6 text-sm font-semibold text-forest hover:bg-lime-tint"
        >
          {pickLocale(copy.home, locale)}
        </Link>
      </div>
    </div>
  )
}
