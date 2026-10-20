import type { Locale } from "@/lib/i18n"
import type { ImageKey } from "@/lib/images"
import { Photo } from "./Photo"
import { TextLink } from "./TextLink"

/**
 * Alternating editorial block: image one side (12px radius); eyebrow, H2, copy and arrow link the other.
 * Optional `facts` (label/value rows) and `steps` (numbered process) render only when given, so CMS-pending
 * data (capacity, location…) is simply left out rather than shown as a placeholder.
 */
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
  facts = [],
  steps = [],
  stepsLabel,
}: {
  locale: Locale
  image?: ImageKey
  eyebrow?: string
  title: string
  body?: string
  link?: { href: string; label: string }
  reverse?: boolean
  surface?: "white" | "ivory" | "lime"
  children?: React.ReactNode
  headingLevel?: "h2" | "h3"
  facts?: { label: string; value: string }[]
  steps?: { title: string; body?: string }[]
  stepsLabel?: string
}) {
  const Heading = headingLevel
  return (
    <section className={surface === "lime" ? "band-lime" : surface === "ivory" ? "bg-ivory" : "bg-white"}>
      <div className="site-wrap section-y grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Photo
          image={image}
          locale={locale}
          aspect="aspect-[4/3]"
          rounded={false}
          className={`reveal rounded-[12px] lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
          sizes="(min-width: 1376px) 740px, (min-width: 1024px) 55vw, 100vw"
        />
        <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
          {eyebrow && <p className="label">{eyebrow}</p>}
          <Heading className="display display-h2 mt-4 text-balance text-forest">{title}</Heading>
          {body && <p className="mt-6 text-lg leading-relaxed text-muted">{body}</p>}
          {facts.length > 0 && (
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-hairline pt-3">
                  <dt className="label">{fact.label}</dt>
                  <dd className="mt-1 text-base text-charcoal">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {steps.length > 0 && (
            <div className="mt-8">
              {stepsLabel && <h3 className="label">{stepsLabel}</h3>}
              <ol className="mt-3">
                {steps.map((step, index) => (
                  <li key={index} className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-hairline py-3 first:border-t-0">
                    <span aria-hidden="true" className="display nums text-xl leading-7 text-sage">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.9375rem] leading-7 text-charcoal">
                      <span className="font-semibold text-forest">{step.title}</span>
                      {step.body && <span className="text-muted"> · {step.body}</span>}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {(children || link) && (
            <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${children ? "mt-8" : "mt-6"}`}>
              {children}
              {link && <TextLink href={link.href}>{link.label}</TextLink>}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
