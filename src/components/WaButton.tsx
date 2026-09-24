import { buildWhatsAppUrl } from "@/lib/whatsapp"
import type { Locale } from "@/lib/i18n"

export function WaButton({
  locale,
  templateKey,
  tokens,
  label,
  className = "",
}: {
  locale: Locale
  templateKey: "home" | "product" | "drying" | "career" | "contact"
  tokens?: Record<string, string>
  label: string
  className?: string
}) {
  const href = buildWhatsAppUrl({ locale, templateKey, tokens })
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded bg-[#25D366] px-4 py-2 text-sm font-semibold text-black ${className}`}
    >
      {label}
    </a>
  )
}
