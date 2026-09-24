import { defineField, defineType } from "sanity"
import { LOCALES, LOCALE_LABELS, DEFAULT_LOCALE } from "../../lib/locales"

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized rich text",
  type: "object",
  fields: LOCALES.map((code) =>
    defineField({
      name: code,
      title: LOCALE_LABELS[code],
      type: "array",
      of: [{ type: "block" }],
      validation: code === DEFAULT_LOCALE ? (Rule) => Rule.required() : undefined,
    })
  ),
})
