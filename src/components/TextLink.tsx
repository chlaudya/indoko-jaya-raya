import Link from "next/link"

/** Cargill-style secondary action: text + arrow, underline on hover. */
export function TextLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string
  children: React.ReactNode
  tone?: "dark" | "light"
  className?: string
}) {
  return (
    <Link href={href} className={`text-link ${tone === "light" ? "text-white" : "text-forest"} ${className}`}>
      <span>{children}</span>
      <span aria-hidden="true" className="arrow">
        →
      </span>
    </Link>
  )
}
