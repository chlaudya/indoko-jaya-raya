# Sanity webhook for products and jobs

The site pre-renders product and career pages with `generateStaticParams` and `dynamicParams = false`. Publishing, unpublishing or deleting a product or job therefore needs a revalidation, and a new or removed slug needs a production rebuild.

## Create the webhook

1. In [sanity.io/manage](https://www.sanity.io/manage), open the Indoko project, then **API → Webhooks → Add webhook**.
2. **URL:** `https://<your-production-host>/api/revalidate`
3. **Dataset:** the production dataset.
4. **Trigger on:** Create, Update and Delete.
5. **Filter:** `_type in ["product", "job"]` (these are the schema type names).
6. **Projection:**

   ```groq
   {_type, _id, "slug": slug.current}
   ```

7. **Secret:** generate a long random string and paste it here. Set the same value on Vercel (and locally) as `SANITY_REVALIDATE_SECRET`.
8. Enable the webhook and leave “HTTP method” as POST.

## Environment variables

See `.env.example`:

- `SANITY_REVALIDATE_SECRET` — required. Requests without a valid `sanity-webhook-signature` header receive `401`. A body that is missing `_type` receives `400`.
- `VERCEL_DEPLOY_HOOK_URL` — optional but needed in production so new or deleted slugs are built. Create it in the Vercel project under **Settings → Git → Deploy Hooks**.

## What the route does

On a valid `product` or `job` payload the route:

1. Calls `revalidatePath` for the home page, the product or careers list (all five locales) and `/sitemap.xml`. It does **not** revalidate product or job detail pages: those use `dynamicParams=false`, and invalidating them causes Next.js to 404 (NoFallbackError) until a rebuild.
2. If `VERCEL_DEPLOY_HOOK_URL` is set, POSTs it on **every** product/job event (create, update and delete). New, updated and deleted slugs only appear after a rebuild, and a slug change looks like an update, so triggering the hook on every event is simpler and safer than trying to detect creates and deletes only. In production this env var should be set; on-demand revalidation alone cannot refresh a `dynamicParams=false` detail page.

Other document types return `200` with `{ ignored: true }`.

## Local test

Run the production server with a test secret (`SANITY_REVALIDATE_SECRET=testsecret npm start -- -p 3001`). Then, from the repo root:

```bash
# Signed request — expect 200
node -e '
const { encodeSignatureHeader } = require("@sanity/webhook");
const secret = "testsecret";
const body = JSON.stringify({ _type: "product", _id: "p1", slug: "kacang-mete" });
encodeSignatureHeader(body, Date.now(), secret).then(async (sig) => {
  const res = await fetch("http://localhost:3001/api/revalidate", {
    method: "POST",
    headers: { "Content-Type": "application/json", "sanity-webhook-signature": sig },
    body,
  });
  console.log(res.status, await res.text());
});
'

# Unsigned request — expect 401
curl -s -o /tmp/revalidate-unsigned.txt -w "%{http_code}\n" \
  -X POST http://localhost:3001/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"_type":"product","slug":"kacang-mete"}'
```
