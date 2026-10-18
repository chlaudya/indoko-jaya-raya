/** Deep-forest (#123b2a) purpose statement band with large-type commitments. */
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
  /** Directly follows a curved hero and flows into the pillar cards: same forest surface, tighter padding. */
  continued?: boolean
}) {
  return (
    <section id={id} className="bg-forest text-white">
      <div className={continued ? "site-wrap pt-6 pb-16 lg:pt-10 lg:pb-24" : "site-wrap section-y"}>
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
