import { pickLocale, type Locale } from "@/lib/i18n"
import { redesign, waDisplayNumber } from "@/lib/fixtures"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { WhatsAppIcon } from "./WaButton"

/** Thin top bar (desktop): tagline left, language switcher + WA number right. */
export function UtilityBar({ locale }: { locale: Locale }) {
  const wa = buildWhatsAppUrl({ locale, templateKey: "contact" })
  return (
    <div className="hidden h-8 bg-charcoal text-ivory lg:block">
      <div className="site-wrap flex h-full items-center justify-between gap-6 text-xs">
        <p className="truncate text-ivory/75">{pickLocale(redesign.tagline, locale)}</p>
        <div className="flex h-full items-center gap-6 [&_a]:min-h-8">
          <LanguageSwitcher locale={locale} />
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-ivory/85 hover:text-white"
          >
            <WhatsAppIcon className="size-3.5 text-wa" />
            {waDisplayNumber()}
          </a>
        </div>
      </div>
    </div>
  )
}
