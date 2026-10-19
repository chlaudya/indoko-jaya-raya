import { createClient, type SanityClient } from "next-sanity"

/** Null when Studio is still on the placeholder project id. */
export function getSanityClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
  if (!projectId || projectId === "placeholder") return null
  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-10-19",
    useCdn: true,
  })
}
