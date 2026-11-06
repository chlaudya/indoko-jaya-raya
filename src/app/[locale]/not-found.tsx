import type { Metadata } from "next"
import { NotFoundView } from "@/components/NotFoundView"
import { getRequestLocale } from "@/lib/request-locale"
import { notFoundDocumentTitle } from "@/lib/not-found-copy"

export async function generateMetadata(): Promise<Metadata> {
  const locale = getRequestLocale()
  return {
    title: { absolute: notFoundDocumentTitle(locale) },
  }
}

export default function LocaleNotFound() {
  return <NotFoundView locale={getRequestLocale()} />
}
