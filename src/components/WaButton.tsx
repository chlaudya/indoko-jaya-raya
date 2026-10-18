import { buildWhatsAppUrl } from "@/lib/whatsapp"
import type { Locale } from "@/lib/i18n"

export type ButtonVariant = "primary" | "secondary" | "on-dark" | "inverse" | "wa" | "wa-secondary" | "wa-on-dark"

const variants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-white hover:bg-leaf",
  secondary: "border border-forest bg-transparent text-forest hover:bg-forest hover:text-white",
  "on-dark": "border border-white/60 bg-transparent text-white hover:bg-white hover:text-forest",
  inverse: "bg-white text-forest hover:bg-ivory",
  // Primary WA CTA (header + hero only): solid leaf green, white text (~8:1 contrast).
  wa: "bg-leaf text-white hover:bg-forest",
  // Secondary WA CTA everywhere else: leaf outline, same icon + prefill.
  "wa-secondary": "border border-leaf bg-transparent text-leaf hover:bg-leaf hover:text-white",
  // Secondary WA CTA on dark/green bands.
  "wa-on-dark": "border border-white/70 bg-transparent text-white hover:bg-white hover:text-forest",
}

export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return [
    "inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-semibold",
    "rounded-full motion-safe:transition-colors motion-safe:duration-200",
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ")
}

export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36A9.43 9.43 0 0 1 2.6 12.05c0-5.2 4.24-9.44 9.46-9.44 2.52 0 4.9.99 6.68 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.04c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  )
}

export function WaButton({
  locale,
  templateKey,
  tokens,
  label,
  className = "",
  variant = "wa-secondary",
}: {
  locale: Locale
  templateKey: "home" | "product" | "drying" | "career" | "contact"
  tokens?: Record<string, string>
  label: string
  className?: string
  variant?: ButtonVariant
}) {
  const href = buildWhatsAppUrl({ locale, templateKey, tokens })
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
      <WhatsAppIcon />
      {label}
    </a>
  )
}

export function WhatsAppCTA(props: Parameters<typeof WaButton>[0]) {
  return <WaButton {...props} />
}
