import { pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import type { TemplateKey } from "@/lib/whatsapp"
import { TextLink } from "./TextLink"
import { WaButton, type ButtonVariant } from "./WaButton"

/**
 * Full-width final CTA band on forest (#123b2a) that opens WhatsApp with page/section context. Headline at
 * --text-h2 in cols 1–7; solid white 56px button (the most prominent CTA on the page) with a short
 * reassurance line under it; 96px vertical padding on desktop.
 */
export function InquirySection({
  locale,
  title,
  body,
  templateKey = "contact",
  tokens,
  label,
  eyebrow,
  reassurance,
  variant = "inverse",
  secondary,
}: {
  locale: Locale
  title: string
  body?: string
  templateKey?: TemplateKey
  tokens?: Record<string, string>
  label?: string
  eyebrow?: string
  reassurance?: string
  variant?: ButtonVariant
  secondary?: { href: string; label: string }
}) {
  return (
    <section className="bg-forest text-white">
      <div className="site-wrap grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:py-24">
        <div className="lg:col-span-7">
          <p className="label text-soft-sage!">{eyebrow || pickLocale(ui.inquiry, locale)}</p>
          <h2 className="display display-h2 mt-4 text-balance">{title}</h2>
          {body && <p className="mt-5 max-w-2xl text-lg text-white/85">{body}</p>}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <WaButton
            locale={locale}
            templateKey={templateKey}
            tokens={tokens}
            label={label || pickLocale(ui.requestInquiry, locale)}
            variant={variant}
            size="lg"
            className="w-full sm:w-auto lg:w-full"
          />
          {reassurance && <p className="mt-3 text-sm text-white/85">{reassurance}</p>}
          {secondary && (
            <div className="mt-4">
              <TextLink href={secondary.href} tone="light">
                {secondary.label}
              </TextLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
