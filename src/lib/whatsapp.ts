import type { Locale } from "./i18n"
import { pickLocale } from "./i18n"
import { siteSettings } from "./fixtures"

type TemplateKey = "home" | "product" | "drying" | "career" | "contact"

export function buildWhatsAppUrl(opts: {
  locale: Locale
  templateKey: TemplateKey
  tokens?: Record<string, string>
  targetKey?: string
}): string {
  const target =
    siteSettings.waTargets.find((t) => t.key === (opts.targetKey || "default")) ||
    siteSettings.waTargets[0]
  const raw =
    pickLocale(siteSettings.waTemplates[opts.templateKey], opts.locale) ||
    pickLocale(siteSettings.waTemplates.contact, opts.locale)
  const message = Object.entries(opts.tokens || {}).reduce(
    (msg, [key, value]) => msg.replaceAll(`{{${key}}}`, value),
    raw
  )
  const encoded = encodeURIComponent(message)
  // Transport switch: UI identical. v1 uses wa.me until client confirms API.
  if (siteSettings.waTransport === "api") {
    // Placeholder deep link shape — swap for BSP when client confirms.
    return `https://wa.me/${target.phoneE164}?text=${encoded}`
  }
  return `https://wa.me/${target.phoneE164}?text=${encoded}`
}
