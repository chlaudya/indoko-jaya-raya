import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"
import { LOCALES } from "@/lib/i18n"

type WebhookBody = {
  _type?: string
  _id?: string
  slug?: string | { current?: string | null } | null
}

function slugOf(body: WebhookBody): string {
  if (typeof body.slug === "string") return body.slug.trim()
  if (body.slug && typeof body.slug === "object" && typeof body.slug.current === "string") {
    return body.slug.current.trim()
  }
  return ""
}

/**
 * Sanity webhook: publish / unpublish / delete for `product` and `job`.
 *
 * Product and career detail pages use generateStaticParams with
 * `dynamicParams=false`. Calling revalidatePath on those slugs invalidates the
 * prerendered page and then Next.js refuses to regenerate it on demand
 * (NoFallbackError → 404) until a full rebuild. So this route never
 * revalidates detail paths; it revalidates list pages, home and the sitemap,
 * and POSTs VERCEL_DEPLOY_HOOK_URL (when set) on every product/job event so a
 * rebuild picks up new, updated and deleted slugs. Triggering the hook on
 * every event is simpler and safer than inferring the operation (a slug change
 * looks like an update).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: "Missing SANITY_REVALIDATE_SECRET" }, { status: 500 })
  }

  // No Content Lake read in this handler, so skip the default 3s consistency wait.
  const { isValidSignature, body } = await parseBody<WebhookBody>(req, secret, false)
  if (isValidSignature !== true) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
  }
  if (!body || typeof body._type !== "string" || !body._type) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 })
  }
  if (body._type !== "product" && body._type !== "job") {
    return NextResponse.json({ ignored: true, type: body._type })
  }

  const slug = slugOf(body)
  const paths = ["/sitemap.xml"]
  for (const locale of LOCALES) {
    paths.push(`/${locale}`)
    paths.push(body._type === "product" ? `/${locale}/products` : `/${locale}/careers`)
  }
  for (const path of paths) revalidatePath(path)

  let rebuild = false
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL
  if (hook) {
    const res = await fetch(hook, { method: "POST" })
    if (!res.ok) {
      return NextResponse.json(
        { message: "Deploy hook failed", status: res.status, revalidated: paths },
        { status: 502 }
      )
    }
    rebuild = true
  }

  return NextResponse.json({ revalidated: true, type: body._type, slug: slug || null, paths, rebuild })
}
