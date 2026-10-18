import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { categories, siteSettings, ui, visiblePhone } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { LanguageSwitcher } from "./LanguageSwitcher"

type Col = { title: string; links: { href: string; label: string; external?: boolean }[] }

export function SiteFooter({ locale }: { locale: Locale }) {
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })
  const t = (v: Parameters<typeof pickLocale>[0]) => pickLocale(v, locale)
  const cols: Col[] = [
    {
      title: t(ui.footerCompany),
      links: [
        { href: `/${locale}/about`, label: t(ui.aboutUs) },
        { href: `/${locale}/company`, label: t(ui.companyProfile) },
        { href: `/${locale}#sustainability`, label: t(ui.sustainability) },
        { href: `/${locale}/services/drying`, label: t(ui.commodityServices) },
      ],
    },
    {
      title: t(ui.footerProducts),
      links: [
        { href: `/${locale}/products`, label: t(ui.viewAllCommodities) },
        ...categories
          .filter((c) => c.slug !== "layanan")
          .map((c) => ({ href: `/${locale}/products?category=${c.slug}`, label: t(c.title) })),
      ],
    },
    {
      title: t(ui.footerCareers),
      links: [
        { href: `/${locale}/careers`, label: t(ui.openPositions) },
        { href: `/${locale}/careers`, label: t(ui.growWithUs) },
      ],
    },
    {
      title: t(ui.footerContact),
      links: [
        { href: `/${locale}/contact`, label: t(ui.contactTeam) },
        { href: wa, label: visiblePhone() ? `WhatsApp ${visiblePhone()}` : t(ui.whatsapp), external: true },
      ],
    },
  ]

  return (
    <footer className="bg-forest text-ivory">
      <div className="site-wrap pt-16 pb-10 lg:pt-24">
        <div className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold tracking-[0.16em] uppercase">PT Indoco Jaya Raya</p>
            <p className="display display-h3 mt-5 max-w-md text-white">{t(siteSettings.companyShortBlurb)}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label text-soft-sage!">{t(ui.address)}</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/75">{t(siteSettings.address)}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="label text-soft-sage!">{col.title}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center text-sm text-ivory/80 hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-sm text-ivory/80 hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <LanguageSwitcher locale={locale} />
          <p className="text-xs text-ivory/55">© {new Date().getFullYear()} PT Indoco Jaya Raya · APEL Group branding</p>
        </div>
      </div>
    </footer>
  )
}
