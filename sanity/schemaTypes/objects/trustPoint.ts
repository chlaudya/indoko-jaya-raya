import { defineField, defineType } from "sanity"

export const trustPoint = defineType({
  name: "trustPoint",
  title: "Trust / keunggulan point",
  type: "object",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", type: "localeText" }),
    defineField({ name: "icon", title: "Icon key (optional)", type: "string" }),
  ],
  preview: {
    select: { title: "title.id" },
  },
})
