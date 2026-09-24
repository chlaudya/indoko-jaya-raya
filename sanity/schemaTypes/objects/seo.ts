import { defineField, defineType } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Meta title", type: "localeString" }),
    defineField({ name: "description", title: "Meta description", type: "localeText" }),
  ],
})
