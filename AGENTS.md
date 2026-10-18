# Indoco Jaya Raya

International agribusiness company profile and commodity catalog website connecting Indonesian agricultural products with national and global buyers.

This file gives AI coding agents the context they need to work effectively in this repository. It is read by [Codex](https://openai.com/codex), [Cursor](https://cursor.com), [Sourcegraph Amp](https://ampcode.com), [Aider](https://aider.chat), [Jules](https://jules.google), and other agents that follow the [AGENTS.md spec](https://agents.md).

## Stack

- **Framework**: Next.js (React · App Router)

## Setup

- **install**: `npm install`
- **dev**: `npm dev`
- **build**: `npm build`
- **lint**: `npm lint`
- **test**: `npm test`
- **typecheck**: `npm tsc --noEmit`

## Code Style

- **TypeScript everywhere** — Use TypeScript for new files. Avoid any — prefer unknown and narrow.
- **ESLint enforced** — Run pnpm lint --fix before committing. Never disable rules without a comment explaining why.
- **Prettier formatting** — Auto-format on save. Don't hand-format.
- **Tailwind CSS** — Use utility classes. Extract to a component when patterns repeat 3+ times.
- **Naming conventions** — kebab-case files, PascalCase components, camelCase variables, SCREAMING_SNAKE for env vars.
- **Sorted imports** — Group external → internal → relative. Path aliases over deep relative imports.

## Testing

- **Vitest for unit tests** — Co-locate *.test.ts with the source file. Cover the happy path and at least one edge case.
- **Playwright for e2e** — E2E specs in tests/e2e. Run pnpm test:e2e.
- **Accessibility checks** — Run automated a11y assertions on critical pages. Manual keyboard test before merging UI changes.

## Security

- **Never commit secrets** — No API keys, tokens, or credentials in code. Use .env.local (gitignored) and .env.example for templates.
- **Validate all external input** — Schema-validate request bodies, URL params, and untrusted JSON with Zod or Valibot.
- **Server-side auth checks** — Every API route must check authentication AND authorization on the server. Don't rely on client guards.

## Pull Requests & Commits

- **Conventional Commits** — Use feat:, fix:, chore:, etc. Imperative mood, lowercase, no period.
- **Small, focused PRs** — One logical change per PR. Aim for < 400 lines of diff. Split larger work into stacked PRs.
- **Tests with the change** — New behavior gets new tests in the same PR. Bug fixes include a regression test.
- **Run checks before pushing** — Run pnpm lint && pnpm test && pnpm build locally. Don't push red PRs.

## Notes

Build a premium international B2B agribusiness website for PT Indoco Jaya Raya.

The visual direction should combine:

- Premium agricultural editorial design
- Dark forest green branding
- International commodity trading credibility
- Clean modern B2B catalog UX
- Large editorial photography
- Generous whitespace
- Strong typography
- Minimal, sophisticated UI

Do NOT make the website look like:

- a generic Indonesian corporate template
- an agricultural marketplace
- Tokopedia/Alibaba/Traveloka-style ecommerce
- a dashboard
- an overly colorful farming website
- a template with excessive rounded cards, gradients, or shadows

Primary visual inspiration:

- Olam Agri for agricultural/global-business storytelling
- Louis Dreyfus Company for corporate credibility
- ofi for premium commodity presentation
- modern green agriculture editorial websites for visual direction

Brand direction:

- Deep forest green
- Dark charcoal
- Warm ivory/off-white
- Muted natural greens
- Minimal accent colors

The website should feel:
Premium, trustworthy, natural, international, established, modern.

Primary user:
International and Indonesian B2B buyers looking for Indonesian agricultural commodities.

Primary conversion:
Product inquiry through WhatsApp.

Important UX principle:
The website is NOT primarily an ecommerce checkout experience.
It is a B2B commodity discovery → product evaluation → inquiry experience.

Every commodity should have:

- Product photography
- Product name
- Origin
- Description
- Grade / quality
- Packaging
- Supply capacity
- Relevant specifications
- CTA to inquire through WhatsApp

Product CTA should dynamically include the product name in the pre-filled WhatsApp message.

Support five languages:
ID, EN, ZH, VI, HI.

Language switching must be accessible globally from the header.

Design mobile-first but optimize strongly for international desktop B2B visitors.

Use strong editorial layouts rather than repetitive card grids.

Use large photography and asymmetric sections where appropriate.

Prioritize accessibility, SEO, performance, responsive behavior, and clean component architecture.

For every UI implementation, read ./DESIGN.md first and follow its tokens and component rules.

## Design System

Before creating, modifying, or reviewing any UI, always read `./DESIGN.md`.

All frontend implementation must follow the visual direction, color system,
typography, spacing, responsive behavior, component philosophy, and
accessibility requirements defined in DESIGN.md.

Do not introduce new colors, typography, component patterns, or visual styles
without first checking DESIGN.md.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
