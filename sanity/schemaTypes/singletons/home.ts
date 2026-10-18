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
        "Up to 3 cards above the trust stats. Title + body in all 5 locales; empty zh/vi/hi fall back to the draft translations, then Indonesian. Leave empty to use the default (draft) copy.",
      type: "array",
      of: [{ type: "trustPoint" }],
      validation: (Rule) => Rule.max(3),
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
        "Up to 5 photos; each holds 2s, then a 0.6s crossfade, looping behind the fixed headline (no visible controls). Leave empty to use the designer's defaults (hero-slide-1…5, client photos), in order: cashew sorters, hands holding corn, farmer against the sky, raw cashews in a hand, peanuts drying on a tarp. Set the image hotspot on faces: it becomes the crop focal point.",
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
        "Up to 4. Every stat with a value and a label shows; with 1–3 the row re-centres, with none it is hidden. Tick 'Mock' on placeholder numbers: they still show, so replace them before launch.",
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
