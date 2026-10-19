import { defineArrayMember, defineField, defineType } from "sanity"

export const home = defineType({
  name: "home",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", type: "localeString" }),
    defineField({ name: "heroTitle", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroLead", type: "localeText" }),
    defineField({ name: "heroPrimaryCta", type: "waCta" }),
    defineField({
      name: "trustPoints",
      title: "Why choose us cards",
      description:
        "Up to 3 reasons (icon key: sort, price, fleet, farmers, sun, grain, globe, leaf). Title + body in all 5 locales; empty zh/vi/hi fall back to the draft translations, then Indonesian. Leave empty to use the default (draft) copy. No certification, sustainability or numeric claims.",
      type: "array",
      of: [{ type: "trustPoint" }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "iconStrip",
      title: "Icon strip (under Why choose us)",
      description:
        "Up to 4 short descriptive items (e.g. Petani & Pemasok, Komoditi, Pasar, Keberlanjutan) with an icon key (person, flower, globe, leaf, farmers, grain, sort, sun). No numbers or claims. Leave empty to use the default (draft) copy.",
      type: "array",
      of: [{ type: "trustPoint" }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "featuredProducts",
      title: "Komoditi unggulan",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({ name: "dryingTeaserTitle", type: "localeString" }),
    defineField({ name: "dryingTeaserBody", type: "localeText" }),
    defineField({ name: "aboutTeaserTitle", type: "localeString" }),
    defineField({ name: "aboutTeaserBody", type: "localeText" }),
    defineField({ name: "finalCta", type: "waCta" }),
    // --- Redesign v2 (Cargill-inspired) — all optional, additive only ---
    defineField({
      name: "heroSlides",
      title: "Hero photo slider (optional)",
      description:
        "Up to 5 photos; each holds 2s, then a 0.6s crossfade, looping behind the fixed headline (no visible controls). Leave empty to use the defaults, in order: farmer sorting, corn, farmer against the sky, cashew, peanuts on a tarp. Set the image hotspot on faces: it becomes the crop focal point.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
            defineField({ name: "alt", title: "Alt text", type: "localeString", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { media: "image", title: "alt.id" } },
        }),
      ],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({ name: "heroVideo", title: "Hero video (optional, muted loop)", type: "file", options: { accept: "video/mp4,video/webm" } }),
    defineField({ name: "pillars", title: "Pillar tiles (optional)", type: "array", of: [{ type: "pillarTile" }], validation: (Rule) => Rule.max(3) }),
    defineField({
      name: "stats",
      title: "Trust stats (optional)",
      description:
        "Client-confirmed numbers only (never placeholders). Up to 4; every stat with a value and a label shows, with 1–3 the row re-centres, with none it is hidden.",
      type: "array",
      of: [{ type: "statItem" }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({ name: "featureBlocks", title: "Feature blocks (optional)", type: "array", of: [{ type: "featureBlock" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Home" }
    },
  },
})
