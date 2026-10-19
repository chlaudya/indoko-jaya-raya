import Image from "next/image"
import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { products, redesign, siteSettings, ui, visiblePhone } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { WhatsAppIcon } from "./WaButton"
import { BrandMark } from "./BrandMark"

const linkClass =
  "inline-flex min-h-10 items-center text-[0.9375rem] leading-[1.9] text-[#d9e0d4] hover:text-white hover:underline hover:underline-offset-4"

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-[0.3em] size-[18px] shrink-0 text-soft-sage">
      <path d={d} />
    </svg>
  )
}
const PIN = "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
const PHONE = "M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z"
const MAIL = "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7"

/**
 * Footer: brand · Navigasi · Komoditi · Kontak (4 → 2 → 1 columns). Links 15px #d9e0d4 (≈10:1 on forest),
 * line-height 1.9. Phone and email show "Menyusul" until the client confirms them (siteSettings.phonePending /
 * siteSettings.email); WhatsApp always uses the configured destination.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = (v: Parameters<typeof pickLocale>[0]) => pickLocale(v, locale)
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })
  const phone = visiblePhone()
  const email = siteSettings.email.trim()
  const nav = [
    { href: `/${locale}/about`, label: t(ui.aboutUs) },
    { href: `/${locale}/company`, label: t(ui.companyProfile) },
    { href: `/${locale}/services/drying`, label: t(ui.commodityServices) },
    { href: `/${locale}#sustainability`, label: t(ui.sustainability) },
    { href: `/${locale}/careers`, label: t(ui.careersLabel) },
    { href: `/${locale}/contact`, label: t(ui.footerContact) },
  ]
  const commodities = [
    ...products.filter((p) => p.kind === "product").map((p) => ({ href: `/${locale}/products/${p.slug}`, label: t(p.name) })),
    { href: `/${locale}/products`, label: `${t(ui.viewAllCommodities)} →` },
  ]
  const heading = "label text-white!"

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-forest text-ivory">
      {/* Decorative client background (coffee leaves): lazy, never preloaded, cropped freely on small screens.
          Overlay .35→.8; from xl the top stop is .6 because the Kontak column sits on the top-right leaves (keeps ≥4.5:1). */}
      <Image
        src="/images/optimized/footer-bg.webp"
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(18,59,42,0.35),rgba(18,59,42,0.8))] xl:bg-[linear-gradient(to_bottom,rgba(18,59,42,0.6),rgba(18,59,42,0.8))]"
      />
      <div className="site-wrap relative pt-16 pb-8 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 md:col-span-1 lg:col-span-4">
            <Link href={`/${locale}`} className="inline-flex min-h-11 items-center">
              <BrandMark variant="footer" />
            </Link>
            <p className="display mt-5 max-w-sm text-[1.375rem] leading-snug text-white">{t(redesign.tagline)}</p>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-[#d9e0d4]">{t(siteSettings.companyShortBlurb)}</p>
          </div>

          <nav aria-labelledby="footer-nav" className="lg:col-span-2 lg:col-start-6">
            <h2 id="footer-nav" className={heading}>{t(ui.navigation)}</h2>
            <ul className="mt-4">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-commodities" className="lg:col-span-2">
            <h2 id="footer-commodities" className={heading}>{t(ui.footerCommodities)}</h2>
            <ul className="mt-4">
              {commodities.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1 lg:col-span-3 lg:col-start-10">
            <h2 className={heading}>{t(ui.footerContact)}</h2>
            <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-[#d9e0d4]">
              <li className="flex gap-3">
                <Icon d={PIN} />
                <span>
                  <span className="sr-only">{t(ui.address)}: </span>
                  {t(siteSettings.address)}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon d={PHONE} />
                <span>
                  <span className="sr-only">{t(ui.phone)}: </span>
                  {phone ?? <span>{t(ui.phone)} · {t(ui.pending)}</span>}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon d={MAIL} />
                {email ? (
                  <a href={`mailto:${email}`} className="hover:text-white hover:underline hover:underline-offset-4">{email}</a>
                ) : (
                  <span>{t(ui.email)} · {t(ui.pending)}</span>
                )}
              </li>
              <li>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-white px-4 text-sm font-semibold text-forest hover:bg-ivory motion-safe:transition-colors"
                >
                  <WhatsAppIcon className="size-4" />
                  {t(ui.chatOnWhatsApp)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#d9e0d4]">© {new Date().getFullYear()} PT Indoco Jaya Raya</p>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </footer>
  )
}
