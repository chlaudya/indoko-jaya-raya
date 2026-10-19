import { PortableText, type PortableTextComponents } from "next-sanity"
import type { Locale } from "@/lib/i18n"
import type { LocaleCopy, RichBlock } from "@/lib/jobs"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-relaxed text-charcoal">{children}</p>,
    h2: ({ children }) => <h3 className="display display-h3 text-forest">{children}</h3>,
    h3: ({ children }) => <h3 className="text-lg font-semibold text-forest">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-5 text-charcoal">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-5 text-charcoal">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : ""
      const external = href.startsWith("http")
      return (
        <a
          href={href}
          className="underline underline-offset-4"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

function RichText({ value }: { value: RichBlock[] }) {
  return (
    <div className="space-y-4">
      <PortableText value={value} components={components} />
    </div>
  )
}

/** Renders a Sanity localeBlock, or a fixture locale string, for the active locale. */
export function LocalizedCopy({ value, locale }: { value?: LocaleCopy; locale: Locale }) {
  const content = value?.[locale] ?? value?.id
  if (!content) return null
  if (typeof content === "string") {
    const paragraphs = content.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean)
    if (paragraphs.length === 0) return null
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-charcoal">
            {paragraph}
          </p>
        ))}
      </div>
    )
  }
  if (content.length === 0) return null
  return <RichText value={content} />
}
