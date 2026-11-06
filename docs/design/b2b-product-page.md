# B2B Product Page, Spec Chips, Sticky CTA and RFQ Form — Design Spec

Source: client revision brief (29 Oct 2026), sections 4, 6.1, 8. Owner: UI/UX Designer.
Builds on DESIGN.md tokens (forest/ivory/serif base, lime-forward buttons). No new colours.

## 0. Ground rules
- **Hide, never placeholder.** Every block and every row renders only when it has real data. A block with zero rows returns `null` (same pattern as `ProductSpecifications`). No "menyusul", "TBD", "—" or empty cells on public pages.
- **No invented numbers.** Spec values, HS codes, MOQ, container loads and certifications come only from client data. HS codes show only once `hsVerified: true`.
- One primary CTA per screen ("Minta Penawaran", lime button) plus one secondary (white button or text link). WhatsApp/WeChat/Zalo is the secondary.
- Reuse: `PageHeader`, `ProductGallery`, `ProductSpecifications`, `InquirySection`, `WaButton`, `SectionHeading`, `TextLink`, `CommodityCard`.

## 1. Product page block order (desktop and mobile, same order)
| # | Block | Component | Shows when |
|---|-------|-----------|------------|
| 1 | Title: local name (serif H1), international trade name below in sans `label` style, then a meta line "HS 0801.31 · Origin: Indonesia" | `PageHeader` (extend) | always; HS part only if verified |
| 2 | Buyer summary, one paragraph, max ~60ch | prose | summary exists |
| 3 | Specification table: name / value / unit, ranges as "8–10 %" | `ProductSpecifications` (extend to unit column) | ≥1 real row |
| 4 | Packaging & loading: packaging type, kg per bag, per 20 ft, per 40 ft, MOQ | same `dl` style as specs | ≥1 field |
| 5 | Trade terms: Incoterms as chips (FOB · CFR · CIF), port of loading, lead time, payment (T/T, L/C), "Harga atas permintaan" | `dl` + chips | ≥1 field |
| 6 | Seasonal availability: 12-month strip, harvest months filled forest, supply months lime-wash, others hairline outline; legend below. Each month also has text (`aria-label="Jan: harvest"`), not colour only | new `HarvestStrip` | months set |
| 7 | Quality & documents: checklist of documents available (Phytosanitary, CoO, COA, Packing List, B/L), third-party inspection line only if real | list with check icon | ≥1 doc |
| 8 | Gallery: macro first, then sorting, packaging, container loading | `ProductGallery` | ≥1 photo (macro preferred) |
| 9 | CTA band: primary "Minta Penawaran", secondary "Minta Sampel", text link "Unduh Spec Sheet (PDF)" (P1, hidden until PDF exists), channel button per locale | `InquirySection` (rework) | always |
| 10 | FAQ (MOQ, samples, shipping time, payment) as `<details>` accordion, then "Komoditi terkait" `CardRail` | new `ProductFaq` + `CardRail` | FAQ items exist / ≥2 related |

Layout: desktop uses a 2-column hero (gallery left 7/12, title+summary+chips+CTA right 5/12). Blocks 3–7 sit in a single 8/12 column with a sticky "Ringkasan" side card (4/12) at ≥1024px holding: form, origin, MOQ, Incoterms, primary CTA. Below 1024px the side card is removed and the sticky bar (section 3) takes over.

Section rhythm: specs + packaging + terms on ivory; seasonal + documents on white; CTA band on forest (lime button, white secondary). Section headings use `SectionHeading`, `display-h2`.

## 2. Spec chips on cards (`CommodityCard`)
- Up to 4 chips under the one-line description, order: Form · Origin · Packaging · MOQ. Show only chips with data; zero chips = no chip row.
- Chip: `text-xs` (13px), `px-2.5 py-1`, `rounded-full`, `border border-hairline`, `text-muted` on ivory/white (5.5:1+). No lime on ivory.
- Max one line on desktop; on mobile wrap to two lines max, then drop the lowest-priority chip (MOQ) rather than a third line.
- Cards keep equal height (existing grid behaviour).

## 3. Sticky mobile CTA (product pages, <1024px)
- Fixed bottom bar, `bg-white/95 backdrop-blur border-t border-hairline`, padding `12px 16px` + `env(safe-area-inset-bottom)`.
- Left: product name truncated (`text-sm text-charcoal`). Right: lime "Minta Penawaran" button, min height 48px; icon-only channel button (WhatsApp/WeChat/Zalo) 48×48 with `aria-label`.
- Appears after the hero CTA scrolls out of view (IntersectionObserver), hides when the RFQ form or footer is in view. Respect `prefers-reduced-motion` (no slide, just show).
- Add bottom padding to `<main>` equal to bar height so it never covers content or the footer.

## 4. Header
- One button only: "Minta Penawaran" (lime), linking to `/[locale]/contact#rfq` or the product's RFQ when on a product page. Remove the duplicate "Hubungi kami"/"Ajukan pertanyaan".

## 5. RFQ form (`#rfq` on product pages and Kontak)
Single column, max width 640px, white card on ivory, `rounded-xl`, 32px padding (20px mobile).

Fields, in order (required = *):
1. Nama* · 2. Perusahaan* · 3. Negara* (select, searchable, default from locale: zh→China, vi→Vietnam, hi→India) · 4. Email* · 5. Kontak chat (type select WhatsApp/WeChat/Zalo + input; default per locale) · 6. Komoditi* (prefilled from page, editable select; multi later for inquiry basket) · 7. Perkiraan volume* (number + unit select MT/kg/container 20 ft/40 ft, inline on one row) · 8. Pelabuhan tujuan · 9. Incoterms (segmented: FOB / CFR / CIF / Belum tahu) · 10. Butuh sampel? (Ya/Tidak radio; "Ya" reveals Alamat pengiriman sampel textarea) · 11. Pesan (textarea, 4 rows) · consent checkbox* linking to privacy text (UU PDP) · honeypot (visually hidden, `tabindex=-1`, `aria-hidden`).

Styling: labels above inputs (`text-sm font-medium text-charcoal`), inputs 48px tall, `border-charcoal/25`, focus = 2px forest ring (existing focus style). Required marked with "*" plus "(wajib)" in sr-only text. Helper text `text-muted text-sm`.

States:
- Inline validation on blur; error text `#b42318` on white (6.5:1) with an icon, linked via `aria-describedby`; on submit, focus moves to an error summary at the top.
- Submit = lime primary, full width on mobile, label "Kirim Permintaan Penawaran"; loading shows spinner + "Mengirim…", button disabled.
- Success replaces the form with a forest-ruled panel: "Terima kasih. Tim kami akan membalas dalam 1 hari kerja." Only state a response time once the client confirms one; otherwise "Tim kami akan segera membalas." Secondary link to the chat channel.
- Failure: keep inputs, show error banner with the chat channel as fallback.
- **Disabled until destination email exists:** render nothing (not a greyed form). Page falls back to the channel button.

"Minta Sampel" button = scroll to the same form with Butuh sampel = Ya preselected and the address field open.

## 6. Contact channel per locale
- id, en, hi: WhatsApp (`WaButton`). zh: WeChat — button opens a small dialog with QR (240px) + WeChat ID with copy button. vi: Zalo link button.
- Channel without data falls back to WhatsApp; if WhatsApp is still the placeholder number, the button is hidden in production.

## 7. Accessibility and performance checks
- All text ≥4.5:1, chips and borders ≥3:1 where they carry meaning. Tap targets ≥44px (48px for CTAs).
- Harvest strip readable without colour. Accordion uses native `<details>/<summary>`.
- Card images: `sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"`; gallery below the fold lazy.
- Test at 390, 768, 1440 in id and zh (CJK wraps) and hi (Devanagari line height).

## 8. "Acuan Umum Pasar" reference tables (Chlaudya, Nov 4, 2026)
Used until the client sends Indoko's own numbers. Rows carry `source: "reference"`; once confirmed rows exist the block becomes "Spesifikasi Indoko" and the note and tag disappear.
- Heading: `display-h2` "Acuan Umum Pasar" (en "General Market Reference") + tag "Acuan" (chip style from section 2, `border-hairline text-muted`).
- Note directly under the heading, `text-muted`, max ~70ch: "Rentang umum pasar sebagai acuan, bukan spesifikasi Indoko. Spesifikasi aktual dan COA per pengiriman tersedia atas permintaan." / en "Typical market ranges for reference, not Indoko's specification. Actual specifications and a COA for each shipment are available on request."
- Two-form products (Mete: RCN (gelondong) / Kernel; Kacang Tanah: Kernel / In-shell): tabs above ONE table. Use the `role="tablist"` pattern with arrow keys; active tab `#17201b` text with 2px `#97f44b` underline, inactive `text-muted`; ≥44px tall. Each tab shows its trade name and "HS acuan 0801.31" style meta line.
- Table: real `<table>` + `<caption class="sr-only">`; columns Parameter / Rentang / Satuan; rows `border-b border-hairline`, 16px vertical padding; numbers `tabular-nums`. Below 640px each row stacks (parameter as label above value + unit).
- Aflatoxin row: value "Diuji per lot, COA tersedia" (en "Tested per lot, COA available"), no numbers.
- Kopi: secondary small table "Mutu SNI 01-2907-2008" (Mutu 1–6 by defect value per 300 g) under the main table, `text-sm`; the defect row links to it with an in-page anchor.
- Under the table: lime primary button "Minta Spesifikasi Aktual & COA" / en "Request Actual Specs & COA" (WhatsApp prefill with product + form), then footnote `text-xs text-muted`: "Acuan: SNI, TCVN, DEAS, IS, MS, ISO." No links to listing sites.
- Never show reference ranges on cards, in meta descriptions or in JSON-LD.
