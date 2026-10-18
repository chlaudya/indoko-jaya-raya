import { pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import { TextLink } from "./TextLink"
import { WaButton, type ButtonVariant } from "./WaButton"

/** Full-width final CTA band (leaf green) that opens WhatsApp with page context. */
export function InquirySection({
  locale,
  title,
  body,
  templateKey = "contact",
  tokens,
  label,
  variant = "wa-on-dark",
  secondary,
}: {
  locale: Locale
  title: string
  body?: string
  templateKey?: "home" | "product" | "drying" | "career" | "contact"
  tokens?: Record<string, string>
  label?: string
  variant?: ButtonVariant
  secondary?: { href: string; label: string }
}) {
  return (
    <section className="bg-leaf text-white">
      <div className="site-wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-end lg:py-24">
        <div className="lg:col-span-8">
          <p className="label text-soft-sage!">{pickLocale(ui.inquiry, locale)}</p>
          <h2 className="display display-h2 mt-4 max-w-3xl text-balance">{title}</h2>
          {body && <p className="mt-5 max-w-2xl text-lg text-white/80">{body}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-4 lg:justify-end">
          <WaButton
            locale={locale}
            templateKey={templateKey}
            tokens={tokens}
            label={label || pickLocale(ui.requestInquiry, locale)}
            variant={variant}
          />
          {secondary && (
            <TextLink href={secondary.href} tone="light">
              {secondary.label}
            </TextLink>
          )}
        </div>
      </div>
    </section>
  )
}
