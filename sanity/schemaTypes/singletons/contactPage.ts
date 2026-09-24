import { defineField, defineType } from "sanity"

export const contactPage = defineType({
  name: "contactPage",
  title: "Kontak",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroLead", type: "localeText" }),
    defineField({ name: "address", type: "localeText" }),
    defineField({ name: "mapEmbedUrl", type: "url" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "inquiryNote", type: "localeText" }),
    defineField({ name: "waCta", type: "waCta" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Kontak" }
    },
  },
})
