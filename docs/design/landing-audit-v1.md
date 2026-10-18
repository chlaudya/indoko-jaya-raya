# Landing page audit v1 (Home)

Source: designer audit + section spec (18 Oct 2026), merged with the PM's binding decisions. Where they differ, the
build follows the PM (marked **PM**). Before screenshots: `/workspace/indoco-screens/audit-before-1440.png`, `-390.png`
(state at 58147dc).

## Audit: biggest visual problems, in priority order

1. **Hero curve.** The green wave (#2f7d3e, off-palette) and lime band eat about 40% of the photo and compete with
   the copy; the pillar cards overlapping the hero add a second layer of shapes.
2. **Off-token radii.** 16px cards, a pill header and pill chips/buttons vs the DESIGN.md §11 rule
   (8px default, 12px images, 6px controls).
3. **Mock stats.** 10+ / 500+ / 1.000+ are invented numbers (DESIGN.md §24: never invent statistics).
4. **Section spacing.** 64–96px between sections on desktop vs the 120–160px in DESIGN.md §10; uneven grid.
5. **Commodity cards.** Mixed image ratios (4:5 rail vs 4:3 elsewhere), no category filter on Home and no
   contextual inquiry link on the card.
6. **WA banner and footer.** The final banner is a weak leaf-green band with an outline button; the footer is hard
   to scan (5 groups, small 14px links at 80% opacity, contact details buried).

## Section spec (as built)

| Section | Spec |
|---|---|
| Hero (HeroFullBleed + HeroSlider) | No curve, no lime band. Full-bleed 5-slide fade, left gradient rgba(18,59,42,.92) 0% → .6 40% → clear 65% (phones: bottom-up). Copy in cols 1–6, headline `--text-h1`, line-height 1.05, upright serif + italic phrase (zh/hi: lime #c8e6a0, Noto). Height min(88svh, 820px). **PM** buttons: primary solid #1f5a3d "Hubungi kami" (WhatsApp, Home-hero message), secondary white outline "Jelajahi komoditi" → Katalog. ≥4.5:1 on all 5 slides. |
| Header | **PM / user**: keep the floating Cargill-style bar + language dropdown (designer asked for a static white bar with inline ID EN 中文 VI HI, DESIGN.md §16). Radii only: bar 12px, CTA 8px. Open deviation for the user. |
| Pillar cards (PillarTiles) | **PM**: 3 white cards below the hero, no overlap, 8px radius, 4:3 image (12px top radius), one → link. No curve anywhere. |
| Spacing / grid | `.section-y` 120 desktop / 80 tablet / 64 mobile; 12-col grid, max 1440, 80px side padding ≥1280. Labels 12px uppercase .12em in sage #557048. |
| Mission (PurposeBand) | Label + short text cols 1–4; the 3 goals cols 6–12; numbers Cormorant 48px #6f8f62; goals `--text-h3`; hairline #e3e1d6. Brief's mission text only. |
| Why choose us (TrustSection) | **PM** 3 reasons: quality sorting before shipment, direct network of local farmers, in-house drying service. Icon left, 8px radius, 1px #e3e1d6. Stats row hidden (mock values removed; CMS-ready). **PM** icon strip (Petani & Pemasok, Komoditi, Pasar, Keberlanjutan), no numbers. |
| Drying (FeatureSplit) | Photo right (12px), label "Layanan kami"; capacity / location / process only when the CMS has data; CTA "Diskusikan kebutuhan Anda" → WA with a Jasa Penjemuran (Home) message. |
| Commodities (CommodityCard) | Category chips from the CMS (only with items), 6px radius, selected solid #123b2a. 4:3 images, 20px Cormorant name, one metadata line, "Lihat komoditi" + **PM** "Tanya via WhatsApp" with the product name in the page language. Hover: image 1.03 + border #a8b89c; reduced motion respected. Asam / Porang keep placeholders. |
| WA banner (InquirySection) | Full width #123b2a, headline `--text-h2` cols 1–7, solid white 56px button, reassurance line, 96px padding, own message. Most prominent CTA on the page. |
| Footer (SiteFooter) | Brand · Navigasi · Komoditi · Kontak; links 15px #d9e0d4, line-height 1.9; contact rows with icons; phone / email "Menyusul" until client-confirmed; © bottom bar. 4 → 2 → 1 columns. |
