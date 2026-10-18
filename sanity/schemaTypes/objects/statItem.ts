import { defineField, defineType } from "sanity"

/** Trust stats entry. Confirmed client numbers; `isMock` flags placeholders that must be replaced before launch. */
export const statItem = defineType({
  name: "statItem",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value (e.g. 7, 1.000 t)", type: "string" }),
    defineField({ name: "label", type: "localeString" }),
    defineField({
      name: "isMock",
      title: "Mock (placeholder number, replace before launch)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label.id", isMock: "isMock" },
    prepare: ({ title, subtitle, isMock }) => ({ title: isMock ? `${title} (MOCK)` : title, subtitle }),
  },
})
