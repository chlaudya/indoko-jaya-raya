import type { Locale } from "./i18n"
import { pickLocale } from "./i18n"
import { siteSettings } from "./fixtures"

/** Any key of siteSettings.waTemplates (home, drying, career, contact, homeHero, homeDrying, homeBanner, productCard, productPage…). */
export type TemplateKey = string

/** The prefilled text for a template (exported so audits can list the decoded messages). */
export function buildWhatsAppMessage(opts: { locale: Locale; templateKey: TemplateKey; tokens?: Record<string, string> }): string {
  const raw =
    pickLocale(siteSettings.waTemplates[opts.templateKey], opts.locale) ||
    pickLocale(siteSettings.waTemplates.contact, opts.locale)
  return Object.entries(opts.tokens || {}).reduce((msg, [key, value]) => msg.replaceAll(`{{${key}}}`, value), raw)
}

/** Every WhatsApp link reads the destination from siteSettings.waTargets (CMS: settings.waTargets). */
export function buildWhatsAppUrl(opts: {
  locale: Locale
  templateKey: TemplateKey
  tokens?: Record<string, string>
  targetKey?: string
}): string {
  const target =
    siteSettings.waTargets.find((t) => t.key === (opts.targetKey || "default")) ||
    siteSettings.waTargets[0]
  const message = buildWhatsAppMessage(opts)
  const encoded = encodeURIComponent(message)
  // Transport switch: UI identical. v1 uses wa.me until client confirms API.
  if (siteSettings.waTransport === "api") {
    // Placeholder deep link shape — swap for BSP when client confirms.
    return `https://wa.me/${target.phoneE164}?text=${encoded}`
  }
  return `https://wa.me/${target.phoneE164}?text=${encoded}`
}
