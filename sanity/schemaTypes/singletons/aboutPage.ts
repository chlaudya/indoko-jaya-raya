import { defineField, defineType } from "sanity"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Tentang Kami",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroLead", type: "localeText" }),
    defineField({ name: "story", title: "Sejarah / narasi", type: "localeBlock" }),
    defineField({ name: "vision", type: "localeBlock" }),
    defineField({ name: "mission", type: "localeBlock" }),
    defineField({
      name: "strengths",
      title: "Keunggulan",
      type: "array",
      of: [{ type: "trustPoint" }],
    }),
    // --- Redesign v2 (Cargill-inspired) — all optional, additive only ---
    defineField({ name: "heroVideo", title: "Hero video (optional, muted loop)", type: "file", options: { accept: "video/mp4,video/webm" } }),
    defineField({ name: "pillars", title: "Pillar tiles (optional)", type: "array", of: [{ type: "pillarTile" }], validation: (Rule) => Rule.max(3) }),
    defineField({ name: "stats", title: "Stats strip (optional — confirmed numbers only)", type: "array", of: [{ type: "statItem" }], validation: (Rule) => Rule.max(4) }),
    defineField({ name: "featureBlocks", title: "Feature blocks (optional)", type: "array", of: [{ type: "featureBlock" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Tentang Kami" }
    },
  },
})
