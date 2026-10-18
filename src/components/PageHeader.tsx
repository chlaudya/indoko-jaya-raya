import type { Locale } from "@/lib/i18n"
import type { ImageKey } from "@/lib/images"
import { HeroFullBleed } from "./HeroFullBleed"

/**
 * Page intro. `default` = white editorial header; `compact` = shorter
 * (≈45–50vh) photo band used on Profil Perusahaan and the catalog.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  variant = "default",
  locale,
  image,
  children,
  strongScrimMobile,
}: {
  eyebrow?: string
  title: string
  lead?: string
  variant?: "default" | "compact"
  locale?: Locale
  image?: ImageKey
  children?: React.ReactNode
  strongScrimMobile?: boolean
}) {
  if (variant === "compact" && locale) {
    return (
      <HeroFullBleed locale={locale} image={image} eyebrow={eyebrow} title={title} lead={lead} height="short" titleSize="display-h1" strongScrimMobile={strongScrimMobile}>
        {children}
      </HeroFullBleed>
    )
  }
  return (
    <header className="site-wrap pt-16 pb-4 lg:pt-24">
      {eyebrow && <p className="label">{eyebrow}</p>}
      <h1 className={`display display-h1 max-w-4xl text-forest ${eyebrow ? "mt-4" : ""}`}>{title}</h1>
      {lead && <p className="mt-6 max-w-2xl text-lg text-muted">{lead}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
    </header>
  )
}
