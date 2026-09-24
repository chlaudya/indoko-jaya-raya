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
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Home" }
    },
  },
})
