import { pickLocale, type Locale } from "@/lib/i18n"
import { ui } from "@/lib/fixtures"
import type { TemplateKey } from "@/lib/whatsapp"
import { TextLink } from "./TextLink"
import { WaButton, type ButtonVariant } from "./WaButton"

/**
 * Closing inquiry band on ivory, separated from the section above by a forest rule. Solid forest 56px
 * WhatsApp button (the most prominent CTA on the page) sits under the headline, with a short reassurance line beside it.
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
  variant = "primary",
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
    <section className="bg-ivory text-charcoal">
      <div className="site-wrap py-16 md:py-20 lg:py-28">
        <div className="border-t-2 border-forest pt-10 lg:pt-14">
          <p className="label">{eyebrow || pickLocale(ui.inquiry, locale)}</p>
          <h2 className="display display-h2 mt-4 max-w-[16em] text-balance text-forest">{title}</h2>
          {body && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{body}</p>}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <WaButton
              locale={locale}
              templateKey={templateKey}
              tokens={tokens}
              label={label || pickLocale(ui.requestInquiry, locale)}
              variant={variant}
              size="lg"
              className="whitespace-nowrap"
            />
            {reassurance && <p className="max-w-xs text-sm leading-relaxed text-muted">{reassurance}</p>}
          </div>
          {secondary && (
            <div className="mt-4">
              <TextLink href={secondary.href}>{secondary.label}</TextLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
