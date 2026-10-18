import { defineField, defineType } from "sanity"

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
      title: "Keunggulan / trust strip",
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
    defineField({ name: "heroVideo", title: "Hero video (optional, muted loop)", type: "file", options: { accept: "video/mp4,video/webm" } }),
    defineField({ name: "pillars", title: "Pillar tiles (optional)", type: "array", of: [{ type: "pillarTile" }], validation: (Rule) => Rule.max(3) }),
    defineField({ name: "stats", title: "Stats strip (optional — confirmed numbers only)", type: "array", of: [{ type: "statItem" }], validation: (Rule) => Rule.max(4) }),
    defineField({ name: "featureBlocks", title: "Feature blocks (optional)", type: "array", of: [{ type: "featureBlock" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Home" }
    },
  },
})
