export function SectionHeading({
  label,
  title,
  body,
  tone = "dark",
}: {
  label?: string
  title: string
  body?: string
  tone?: "dark" | "light"
}) {
  return (
    <div className="max-w-3xl">
      {label && <p className={tone === "light" ? "label text-soft-sage!" : "label"}>{label}</p>}
      <h2 className={`display display-h2 mt-4 ${tone === "light" ? "text-white" : "text-forest"}`}>{title}</h2>
      {body && (
        <p className={`mt-6 text-lg leading-relaxed ${tone === "light" ? "text-white/80" : "text-muted"}`}>{body}</p>
      )}
    </div>
  )
}
