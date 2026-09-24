import { defineField, defineType } from "sanity"
import { LOCALES, LOCALE_LABELS, DEFAULT_LOCALE } from "../../lib/locales"

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: LOCALES.map((code) =>
    defineField({
      name: code,
      title: LOCALE_LABELS[code],
      type: "string",
      validation: code === DEFAULT_LOCALE ? (Rule) => Rule.required() : undefined,
    })
  ),
})
