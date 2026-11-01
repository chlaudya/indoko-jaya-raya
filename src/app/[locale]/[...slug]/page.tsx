import { notFound } from "next/navigation"

/** Unknown paths under [locale] → localized not-found (HTTP 404). */
export default function LocaleCatchAll() {
  notFound()
}
