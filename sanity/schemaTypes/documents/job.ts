import { defineField, defineType } from "sanity"

export const job = defineType({
  name: "job",
  title: "Career / Job",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.id", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "location", type: "localeString" }),
    defineField({ name: "shortBlurb", type: "localeText" }),
    defineField({ name: "description", type: "localeBlock" }),
    defineField({ name: "qualifications", type: "localeBlock" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "waCta", type: "waCta" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title.id", subtitle: "status" },
  },
})
