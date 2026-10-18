/**
 * Purpose statement band with large-type commitments. Default: deep forest (#123b2a).
 * `continued` (Home, after the pillar cards): flat light mist (#eef2ea) surface with dark text,
 * continuing the cream under the cards.
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
  /** Follows the Home pillar cards on the same mist surface (tighter top padding). */
  continued?: boolean
}) {
  return (
    <section id={id} className={continued ? "bg-mist text-charcoal" : "bg-forest text-white"}>
      <div className={continued ? "site-wrap pt-6 pb-14 lg:pt-10 lg:pb-20" : "site-wrap section-y"}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={continued ? "label" : "label text-soft-sage!"}>{label}</p>
            {title && (
              <p className={`mt-5 max-w-sm text-lg leading-relaxed ${continued ? "text-charcoal/85" : "text-white/80"}`}>{title}</p>
            )}
          </div>
          <ol className="grid gap-10 lg:col-span-8">
            {points.map((point, index) => (
              <li
                key={index}
                className={`reveal grid grid-cols-[3rem_1fr] gap-4 border-t pt-8 sm:grid-cols-[4rem_1fr] ${
                  continued ? "border-forest/15" : "border-white/20"
                }`}
              >
                <span className={continued ? "label pt-2" : "label pt-2 text-soft-sage!"}>{String(index + 1).padStart(2, "0")}</span>
                <p className={`display display-h2 text-balance ${continued ? "text-forest" : ""}`}>{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
