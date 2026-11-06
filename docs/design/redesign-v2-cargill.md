# Indoko Jaya Raya — Redesign v2 (Cargill-inspired)

**Reference:** [cargill.com/home](https://www.cargill.com/home)
**Applies to:** all 7 shells already live (routes, CMS schemas, WA CTAs, i18n stay unchanged — this is a visual/layout pass only).
**Relation to `DESIGN.md`:** this replaces the *reference direction* (§1 EverGreen / Agro Terra) with Cargill's corporate-editorial pattern. Keep existing color tokens (forest / leaf / sage / ivory / charcoal), type scale, B2B inquiry journey, and "not ecommerce" rules.

We borrow Cargill's **structure and rhythm**, not its brand, copy, or imagery.

---

## 1. What we take from Cargill

| Cargill pattern | Indoko adaptation |
|---|---|
| Purpose-led full-bleed hero ("Creating a more food secure world") with video/photo + one big statement | Full-bleed hero photo/video of fields or drying yard, one-line mission headline from Visi, single "Watch / Lihat profil" + WA CTA |
| Clean white header, utility bar on top (region/language), mega-menu nav | Thin utility bar (language switcher + WA number) above a white sticky main nav; Produk menu opens a mega-panel listing categories + featured commodities |
| Alternating editorial feature blocks (image one side, eyebrow + H2 + paragraph + text link other side) — "Grow forward", "Building a more resilient food system" | Home: "Tentang Indoko", "Jasa Penjemuran", "Pasar Internasional" as alternating image/text bands |
| Purpose statement band ("To nourish the world…") with bullet commitments | Misi band: 3 misi points on a deep-forest background, large type |
| Three pillars as big image tiles (People / Products / Planet) | Three pillars: **Petani & Karyawan** (people) · **Komoditi** (products) · **Keberlanjutan** (planet) — each tile links to About / Produk / Company |
| Big stat callouts (155K+ team, 70 countries) | Stats strip from CMS (e.g. komoditi count, kapasitas, negara tujuan) — only real client numbers, hidden if empty |
| "Where we're making news" card rail | "Komoditi Unggulan" card rail (horizontal scroll on mobile); later reusable for news if added |
| Heavy multi-column corporate footer | 4-column footer: Perusahaan · Produk · Karier · Kontak, plus language links and legal line |

---

## 2. Global chrome

**Utility bar** (32px, charcoal bg, ivory text): left = tagline short; right = `ID | EN | ZH | VI | HI` switcher (keeps current path — already shipped) + WA number link.

**Main header** (72px, white, sticky, subtle bottom border on scroll): logo left; nav center-right; primary "Hubungi Kami" WA button (leaf green) far right.
- Produk → mega-panel: left column categories, right 3–4 featured commodity thumbnails.
- Mobile: utility bar collapses into the drawer; WA button stays visible in header.

**Footer:** forest bg, ivory text, 4 link columns + address + WA CTA + © line.

---

## 3. Page layouts

### Beranda
1. Full-bleed hero (min-h 80vh, dark overlay gradient bottom-left), H1 display size, lead, 2 CTAs (primary WA, secondary "Lihat Komoditi").
2. Purpose band — misi as 3 large-type commitments on forest bg.
3. Three pillar tiles (image, overlay title, arrow link) — 3-col desktop, stacked mobile.
4. Alternating feature: Tentang Indoko (image left).
5. Alternating feature: Jasa Penjemuran (image right) → `/services/drying`.
6. Stats strip (CMS, hide if empty).
7. Komoditi Unggulan card rail → `/products`.
8. Final WA CTA band (full-width, leaf green).

### Tentang Kami
Hero (image + statement) → long-form story in a narrow editorial column (max ~68ch) with pull-quote → Visi/Misi band → alternating "Keunggulan" blocks → link band to Profil Perusahaan.

### Profil & Data Perusahaan
Hero (shorter, 50vh) → identity block → legalitas as clean definition list in a white card → org structure grid (portrait cards) → fasilitas as alternating blocks → sertifikasi logos row → gallery masonry → WA band.

### Produk (katalog)
Shorter hero (40–50vh) with category chips overlaid at bottom → filter row sticky under header → 3-col image-first cards (large photo, category eyebrow, name, one-line, arrow) → WA band.
Detail: split hero (gallery left, name/category/summary/WA right) → specs table → related rail.

### Jasa Penjemuran
Hero video/photo → alternating blocks (layanan, kapasitas, lokasi) → numbered process steps → gallery → WA "Konsultasi" band.

### Karier
Hero with people photo + "Tumbuh bersama kami" → culture band (3 values) → job list as clean rows (title, lokasi, arrow) → apply CTA per config.

### Kontak
Split layout: left address/contacts/WA; right full-height map.

---

## 4. Visual language changes

- **Surfaces:** more white (Cargill is predominantly white) — use ivory only for alternate bands; forest for purpose/footer bands.
- **Photography first:** large, edge-to-edge, real operations imagery; no stock-looking icons as primary visuals.
- **Typography:** bigger display H1 in hero, generous line-height; eyebrows in uppercase label size, sage color, tracking 0.12em.
- **Links:** text links with arrow (`→`) and underline-on-hover, Cargill-style, for secondary actions; buttons reserved for WA/primary.
- **Cards:** image-first, no heavy shadow — 1px border or none, image zoom 1.03 on hover.
- **Spacing:** section padding 96–128px desktop / 64px mobile; 12-col grid, 1280 max container, full-bleed for hero/bands.
- **Motion:** subtle fade-up on section enter, hero video autoplay muted loop (with poster + reduced-motion fallback).

---

## 5. New / changed components

- `UtilityBar` (new)
- `MegaMenu` (new, Produk)
- `HeroFullBleed` (replaces PageHeader on Home/Tentang/Penjemuran/Karier; `PageHeader` variant `compact` for Profil/Produk)
- `PurposeBand` (new)
- `PillarTiles` (new)
- `FeatureSplit` (new — alternating image/text, `reverse` prop)
- `StatsStrip` (new, CMS-driven, renders nothing when empty)
- `CardRail` (new — wraps `CommodityCard`)
- `CommodityCard` restyle (image-first)
- `SiteFooter` restyle (4-col)

CMS impact: optional fields only — `heroVideo`, `pillars[]`, `stats[]`, `featureBlocks[]` on home/about singletons. No breaking changes to frozen v1 schemas.

---

## 6. Out of scope

- Copying Cargill copy, photos, logo, or colors.
- New routes or features.
- Real client photos/stats (placeholders clearly marked until client delivers).
