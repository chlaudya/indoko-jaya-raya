/**
 * Purpose statement band with large-type commitments. Default: deep forest (#123b2a).
 * `continued` (Home "Misi"): white surface; label + statement in cols 1–4, the numbered goals in cols 6–12
 * (Cormorant 48px numerals in #6f8f62, large text ≥3:1; goals at --text-h3; #e3e1d6 hairlines).
 */
export function PurposeBand({
  label,
  title,
  points,
  id,
  continued = false,
}: {
  label: string
  title?: string
  points: string[]
  id?: string
  /** Home "Misi" layout (white, 4 + 7 columns, large numerals). */
  continued?: boolean
}) {
  if (continued) {
    return (
      <section id={id} className="bg-white text-charcoal">
        <div className="site-wrap section-y grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <p className="label">{label}</p>
            {title && <p className="mt-5 max-w-sm text-lg leading-relaxed text-charcoal/85">{title}</p>}
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {points.map((point, index) => (
              <li
                key={index}
                className="reveal grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-t border-hairline py-7 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[4.5rem_1fr]"
              >
                <span aria-hidden="true" className="display nums text-[48px] leading-none text-numeral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="display display-h3 text-balance text-forest">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="surface-dark bg-forest text-white">
      <div className="site-wrap section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-soft-sage!">{label}</p>
            {title && <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/80">{title}</p>}
          </div>
          <ol className="grid gap-10 lg:col-span-8">
            {points.map((point, index) => (
              <li key={index} className="reveal grid grid-cols-[3rem_1fr] gap-4 border-t border-white/20 pt-8 sm:grid-cols-[4rem_1fr]">
                <span className="label pt-2 text-soft-sage!">{String(index + 1).padStart(2, "0")}</span>
                <p className="display display-h2 text-balance">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
