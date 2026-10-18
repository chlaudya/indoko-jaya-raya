import { defineField, defineType } from "sanity"

/** Redesign v2: stats strip entry. Only confirmed client numbers. */
export const statItem = defineType({
  name: "statItem",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value (e.g. 7, 1.000 t)", type: "string" }),
    defineField({ name: "label", type: "localeString" }),
  ],
  preview: { select: { title: "value", subtitle: "label.id" } },
})
