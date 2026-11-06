export type BuyerProcessStep = {
  title: string
  body: string
}

export function BuyerProcess({
  label,
  title,
  steps,
}: {
  label: string
  title: string
  steps: BuyerProcessStep[]
}) {
  return (
    <section className="bg-ivory text-charcoal">
      <div className="site-wrap section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <p className="label">{label}</p>
            <h2 className="heading-3 mt-6 max-w-sm text-balance">{title}</h2>
          </div>
          <ol className="grid gap-8 md:grid-cols-3 lg:col-span-8">
            {steps.map((step, index) => (
              <li key={step.title} className="reveal border border-hairline p-6">
                <span className="caption-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="heading-6 mt-8 text-balance">{step.title}</h3>
                <p className="body-3 mt-4 text-pretty text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
