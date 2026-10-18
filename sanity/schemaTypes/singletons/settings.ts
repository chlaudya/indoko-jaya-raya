import { defineField, defineType } from "sanity"
import { LOCALES, DEFAULT_LOCALE } from "../../lib/locales"

export const settings = defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "defaultLocale",
      type: "string",
      options: { list: LOCALES.map((l) => ({ title: l.toUpperCase(), value: l })) },
      initialValue: DEFAULT_LOCALE,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "enabledLocales",
      type: "array",
      of: [{ type: "string" }],
      options: { list: LOCALES.map((l) => ({ title: l.toUpperCase(), value: l })) },
      initialValue: [...LOCALES],
    }),
    defineField({
      name: "waTargets",
      title: "WhatsApp targets (P0)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Key", type: "string", description: "e.g. default, sales, hr" },
            { name: "label", title: "Admin label", type: "string" },
            { name: "phoneE164", title: "Phone (E.164, no +)", type: "string" },
            { name: "bspConfig", title: "BSP / API config (JSON)", type: "text", rows: 3 },
          ],
          preview: { select: { title: "label", subtitle: "phoneE164" } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "waTransport",
      title: "WA transport (client-blocked switch)",
      type: "string",
      options: {
        list: [
          { title: "wa.me fallback", value: "wame" },
          { title: "WhatsApp Business API", value: "api" },
        ],
        layout: "radio",
      },
      initialValue: "wame",
      description: "UI identical either way — do not guess; client confirms.",
    }),
    defineField({
      name: "waTemplates",
      title: "Per-CTA message templates",
      type: "object",
      fields: [
        { name: "home", type: "localeText" },
        { name: "productPage", title: "Product page", type: "localeText", description: "Product detail page CTAs. Use {{productName}}" },
        { name: "drying", type: "localeText" },
        { name: "career", type: "localeText", description: "Use {{jobTitle}}" },
        { name: "contact", type: "localeText" },
      ],
    }),
    defineField({
      name: "applyMode",
      title: "Career apply mode (client-blocked)",
      type: "string",
      options: {
        list: [
          { title: "WhatsApp only", value: "wa" },
          { title: "CV form only", value: "form" },
          { title: "Both", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "wa",
    }),
    defineField({ name: "companyShortBlurb", type: "localeText" }),
    defineField({ name: "address", type: "localeText" }),
    defineField({ name: "mapEmbedUrl", type: "url" }),
    defineField({ name: "defaultSeo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" }
    },
  },
})
