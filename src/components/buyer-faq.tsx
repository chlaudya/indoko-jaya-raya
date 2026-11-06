export type BuyerFaqItem = {
  question: string
  answer: string
}

export function BuyerFaq({
  label,
  title,
  items,
}: {
  label: string
  title: string
  items: BuyerFaqItem[]
}) {
  return (
    <section className="bg-mist">
      <div className="site-wrap section-y grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <p className="label">{label}</p>
          <h2 className="heading-3 mt-6 max-w-sm text-balance">{title}</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {items.map((item, index) => (
            <details
              key={item.question}
              className="group border-t border-charcoal/20 first:border-t-0"
              open={index === 0}
            >
              <summary className="title-2 flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-6 text-charcoal marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal">
                <span className="text-pretty">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="relative size-6 shrink-0 after:absolute after:top-1/2 after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-charcoal after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-open:after:scale-y-0 before:absolute before:top-1/2 before:left-1/2 before:h-0.5 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-charcoal"
                />
              </summary>
              <p className="body-3 max-w-2xl pb-8 text-pretty text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
