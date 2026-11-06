export function OperationalProof({
  label,
  items,
}: {
  label: string
  items: string[]
}) {
  return (
    <section className="bg-lime text-charcoal" aria-label={label}>
      <div className="site-wrap py-8">
        <p className="caption-3 uppercase tracking-[0.12em]">{label}</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {items.map((item, index) => (
            <li
              key={item}
              className="body-1 flex items-start gap-3 text-pretty"
            >
              <span aria-hidden="true" className="caption-3 pt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
