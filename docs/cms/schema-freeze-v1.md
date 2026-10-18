# Sanity schema freeze v1

Mapped 1:1 from `docs/design/wireframes-v1.md`.

## Documents
| Type | Kind | Maps to |
|------|------|---------|
| `product` | document | Catalog + Jasa Penjemuran (`kind: product \| service`) |
| `category` | document | Catalog filters |
| `job` | document | Karier list/detail |

## Singletons
| Type | Shell |
|------|-------|
| `home` | Beranda |
| `aboutPage` | Tentang Kami |
| `companyProfile` | Profil & Data Perusahaan |
| `contactPage` | Kontak |
| `settings` | Global (locales, WA P0, applyMode, waTransport) |

## Objects
`localeString` · `localeText` · `localeBlock` · `waCta` · `specRow` · `trustPoint` · `seo`

## Locales
`id` (default, required) · `en` · `zh` · `vi` · `hi`

## Client-blocked (config only — no UI guess)
- `settings.waTransport`: `api` | `wame`
- `settings.applyMode`: `wa` | `form` | `both`

## Client pending
- **Launch blocker: WhatsApp number.** `settings.waTargets` still holds the placeholder 6281234567890; every WhatsApp button reads it
- Supply real trust stats (optional; `home.stats`, row hidden until filled, no defaults ship)
- Confirm public phone and email (`contactPage.email`; the phone is hidden while `phonePending`): the footer shows "Menyusul" until then
- Full address (footer and Kontak show "Indonesia — alamat lengkap menyusul dari klien.")
- Asam (Kupas) and Ubi Porang photos (placeholders ship)
- Approve draft zh / vi / hi copy: see `docs/i18n-draft-strings.md`

## P0
- `settings.waTargets` admin-configurable
- `settings.waTemplates` per-CTA context (`{{productName}}`, `{{jobTitle}}`); Home uses `homeHero`, `homeDrying`, `homeBanner`, `productCard`
- `home.iconStrip` (≤4 `trustPoint`, icon key + title/body, descriptive only) under Why choose us; Home commodity tabs come from `category` documents that have at least one product

## Launch catalog seed (8)
1. Kacang Mete · 2. Asam (Kupas) · 3. Kacang Tanah · 4. Kacang Hijau · 5. Ubi Porang · 6. Jagung (Kupas) · 7. Kopi · 8. Jasa Penjemuran Komoditi (`kind: service`, path `services/drying`)

## Out of scope
WA click tracking · machine-translated 5-locale copy · final brand assets

**Status:** FROZEN for implementation.
