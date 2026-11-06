export type BuyerBenefit = {
  title: string
  body: string
}

export function BuyerBenefits({
  label,
  title,
  items,
}: {
  label: string
  title: string
  items: BuyerBenefit[]
}) {
  return (
    <section className="surface-lime">
      <div className="site-wrap section-y">
        <p className="label">{label}</p>
        <h2 className="heading-2 mt-6 max-w-[680px] text-balance">{title}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {items.map((item, index) => (
            <li key={item.title} className="reveal border border-charcoal/25 p-6">
              <span className="caption-3">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="heading-5 mt-10 text-balance">{item.title}</h3>
              <p className="body-3 mt-4 text-pretty">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
