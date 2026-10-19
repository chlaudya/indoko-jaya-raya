import Link from "next/link"
import { pickLocale, type Locale } from "@/lib/i18n"
import { siteSettings, ui } from "@/lib/fixtures"
import { WaButton, buttonClass, type ButtonVariant } from "./WaButton"

/**
 * Apply CTA for a job. settings.applyMode: "wa" (default) and "both" open WhatsApp with the careerApply message
 * (position + location in the page language). "form": v1 has no CV form, so it links to the contact page instead.
 * The accessible name starts with the visible text: "Lamar via WhatsApp: {posisi}".
 */
export function CareerApply({
  locale,
  position,
  location,
  variant = "wa",
  className = "",
}: {
  locale: Locale
  position: string
  location: string
  variant?: ButtonVariant
  className?: string
}) {
  if (siteSettings.applyMode === "form") {
    return (
      <Link href={`/${locale}/contact`} className={buttonClass("primary", className)}>
        {pickLocale(ui.contactUs, locale)}
      </Link>
    )
  }
  const label = pickLocale(ui.applyWhatsApp, locale)
  return (
    <WaButton
      locale={locale}
      templateKey="careerApply"
      tokens={{ position, location }}
      label={label}
      ariaLabel={`${label}: ${position}`}
      variant={variant}
      className={className}
    />
  )
}
