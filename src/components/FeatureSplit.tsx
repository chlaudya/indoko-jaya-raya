import type { Locale } from "@/lib/i18n"
import type { ImageKey } from "@/lib/images"
import { Photo } from "./Photo"
import { TextLink } from "./TextLink"

/** Alternating editorial block: image one side; eyebrow, H2, copy and arrow link the other. */
export function FeatureSplit({
  locale,
  image,
  eyebrow,
  title,
  body,
  link,
  reverse = false,
  surface = "white",
  children,
  headingLevel = "h2",
}: {
  locale: Locale
  image?: ImageKey
  eyebrow?: string
  title: string
  body?: string
  link?: { href: string; label: string }
  reverse?: boolean
  surface?: "white" | "ivory"
  children?: React.ReactNode
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel
  return (
    <section className={surface === "ivory" ? "bg-ivory" : "bg-white"}>
      <div className="site-wrap section-y grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Photo
          image={image}
          locale={locale}
          aspect="aspect-[4/3]"
          className={`reveal lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
          sizes="(min-width: 1376px) 740px, (min-width: 1024px) 55vw, 100vw"
        />
        <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
          {eyebrow && <p className="label">{eyebrow}</p>}
          <Heading className="display display-h2 mt-4 text-balance text-forest">{title}</Heading>
          {body && <p className="mt-6 text-lg leading-relaxed text-muted">{body}</p>}
          {children && <div className="mt-6">{children}</div>}
          {link && (
            <div className="mt-6">
              <TextLink href={link.href}>{link.label}</TextLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
