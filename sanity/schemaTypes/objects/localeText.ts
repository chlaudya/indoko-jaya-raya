import { defineField, defineType } from "sanity"
import { LOCALES, LOCALE_LABELS, DEFAULT_LOCALE } from "../../lib/locales"

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: LOCALES.map((code) =>
    defineField({
      name: code,
      title: LOCALE_LABELS[code],
      type: "text",
      rows: 4,
      validation: code === DEFAULT_LOCALE ? (Rule) => Rule.required() : undefined,
    })
  ),
})
