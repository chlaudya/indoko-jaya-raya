import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { nav, siteSettings } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

export function SiteFooter({ locale }: { locale: Locale }) {
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })
  return (
    <footer className="mt-16 border-t border-black/10 bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-semibold">PT Indoco Jaya Raya</p>
          <p className="mt-2 text-sm opacity-80">{pickLocale(siteSettings.companyShortBlurb, locale)}</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-semibold">Links</p>
          <ul className="space-y-1 opacity-90">
            {nav.map((item) => (
              <li key={item.href || "home"}>
                <Link href={`/${locale}${item.href ? `/${item.href}` : ""}`}>
                  {pickLocale(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-semibold">Kontak</p>
          <p className="opacity-80">{pickLocale(siteSettings.address, locale)}</p>
          <a href={wa} className="mt-3 inline-block rounded bg-[#25D366] px-3 py-2 font-semibold text-black">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} PT Indoco Jaya Raya · APEL Group branding
      </div>
    </footer>
  )
}
