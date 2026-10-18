import { defineField, defineType } from "sanity"

/** Trust stats entry. Client-confirmed numbers only; never invented. */
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
