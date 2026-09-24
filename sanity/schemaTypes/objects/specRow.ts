import { defineField, defineType } from "sanity"

export const specRow = defineType({
  name: "specRow",
  title: "Specification row",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({ name: "value", title: "Value", type: "localeString", validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: "label.id", subtitle: "value.id" },
  },
})
