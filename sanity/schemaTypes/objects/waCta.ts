import { defineField, defineType } from "sanity"

export const waCta = defineType({
  name: "waCta",
  title: "WhatsApp CTA",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button label",
      type: "localeString",
    }),
    defineField({
      name: "templateKey",
      title: "Message template key",
      type: "string",
      description: "Maps to settings.waTemplates (home | productPage | drying | career | contact | custom)",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Product page inquiry", value: "productPage" },
          { title: "Drying service", value: "drying" },
          { title: "Career apply", value: "career" },
          { title: "Contact", value: "contact" },
          { title: "Custom", value: "custom" },
        ],
      },
    }),
    defineField({
      name: "customMessage",
      title: "Custom prefill (optional)",
      type: "localeText",
      hidden: ({ parent }) => parent?.templateKey !== "custom",
    }),
    defineField({
      name: "contextTokens",
      title: "Context tokens",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. productName, jobTitle — appended into the prefill at runtime",
    }),
  ],
})
