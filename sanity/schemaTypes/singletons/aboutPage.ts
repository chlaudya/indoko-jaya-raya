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
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Tentang Kami" }
    },
  },
})
