import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "Product category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.id", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.id", subtitle: "slug.current" },
  },
})
