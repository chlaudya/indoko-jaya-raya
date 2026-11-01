import type { Metadata } from "next"
import { NotFoundView } from "@/components/NotFoundView"
import { getRequestLocale } from "@/lib/request-locale"

// Intentionally omit `robots` here: Next already emits a single `noindex` for
// HTTP 404 responses. Re-declaring it produced duplicate robots meta tags.
export const metadata: Metadata = {
  title: "404",
}

export default function LocaleNotFound() {
  return <NotFoundView locale={getRequestLocale()} />
}
