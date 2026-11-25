import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
}

/**
 * `/studio` sits outside `[locale]`, and the root layout deliberately returns `children`
 * so the locale layout can own `<html lang>`. NextStudio renders `<noscript>`, which
 * React only allows inside a real document, so this segment supplies its own shell.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
