import { defineQuery } from "next-sanity"
import type { Locale } from "./i18n"
import { getSanityClient } from "./sanity"

export type LocaleString = Partial<Record<Locale, string>>

export type RichBlock = {
  _type: string
  _key?: string
  style?: string
  listItem?: "bullet" | "number"
  level?: number
  children?: { _type: string; _key: string; text?: string; marks?: string[] }[]
  markDefs?: { _key: string; _type: string; href?: string }[]
}

/** Plain locale string (fixtures) or Portable Text per locale (Sanity localeBlock). */
export type LocaleCopy = Partial<Record<Locale, string | RichBlock[]>>

export type Job = {
  slug: string
  title: LocaleString
  location: LocaleString
  shortBlurb: LocaleString
  description: LocaleCopy
  qualifications: LocaleCopy
  status: "active" | "closed"
}

const JOB_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  location,
  shortBlurb,
  description,
  qualifications,
  status
`

const JOBS_QUERY = defineQuery(`*[_type == "job" && status == "active" && defined(slug.current)] | order(title.id asc) { ${JOB_FIELDS} }`)

const JOB_QUERY = defineQuery(`*[_type == "job" && status == "active" && slug.current == $slug][0]{ ${JOB_FIELDS} }`)

function asLocaleString(value: unknown): LocaleString {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  const out: LocaleString = {}
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "string") out[key as Locale] = item
  }
  return out
}

function asLocaleCopy(value: unknown): LocaleCopy {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {}
  const out: LocaleCopy = {}
  for (const [key, item] of Object.entries(value)) {
    if (typeof item === "string") out[key as Locale] = item
    else if (Array.isArray(item)) out[key as Locale] = item as RichBlock[]
  }
  return out
}

function mapJob(raw: {
  slug?: string | null
  title?: unknown
  location?: unknown
  shortBlurb?: unknown
  description?: unknown
  qualifications?: unknown
  status?: string | null
}): Job | null {
  if (!raw.slug) return null
  return {
    slug: raw.slug,
    title: asLocaleString(raw.title),
    location: asLocaleString(raw.location),
    shortBlurb: asLocaleString(raw.shortBlurb),
    description: asLocaleCopy(raw.description),
    qualifications: asLocaleCopy(raw.qualifications),
    status: raw.status === "closed" ? "closed" : "active",
  }
}

async function fetchQuery<T>(query: string, params: Record<string, string> = {}): Promise<T | undefined> {
  const client = getSanityClient()
  if (!client) return undefined
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60, tags: ["job"] } })
  } catch {
    return undefined
  }
}

/**
 * QA sample jobs (src/lib/sample-jobs.ts): `CAREERS_SAMPLE_JOBS=1 npm run dev`. Never in a production build:
 * NODE_ENV is "production" for `next build` / `next start`, so this is false there even if the variable is set.
 * When on, Sanity is not queried for jobs at all.
 */
function sampleJobsEnabled(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.CAREERS_SAMPLE_JOBS === "1"
}

/**
 * Active jobs from Sanity only. No fixture or placeholder jobs: when Sanity is not configured, the request fails or
 * nothing is active, the list is empty and /careers shows its empty state.
 */
export async function getActiveJobs(): Promise<Job[]> {
  if (sampleJobsEnabled()) return (await import("./sample-jobs")).SAMPLE_JOBS
  const rows = await fetchQuery<Parameters<typeof mapJob>[0][]>(JOBS_QUERY)
  if (!rows) return []
  return rows.map(mapJob).filter((job): job is Job => job !== null)
}

export function hasCopy(value: LocaleCopy | undefined, locale: Locale): boolean {
  const content = value?.[locale] ?? value?.id
  if (!content) return false
  if (typeof content === "string") return content.trim().length > 0
  return content.length > 0
}

export async function getJob(slug: string): Promise<Job | null> {
  if (sampleJobsEnabled()) return (await import("./sample-jobs")).SAMPLE_JOBS.find((job) => job.slug === slug) ?? null
  const row = await fetchQuery<Parameters<typeof mapJob>[0] | null>(JOB_QUERY, { slug })
  if (!row) return null
  return mapJob(row)
}
