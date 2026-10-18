import { defineField, defineType } from "sanity"

/** Redesign v2: alternating image/text editorial block. */
export const featureBlock = defineType({
  name: "featureBlock",
  title: "Feature block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "localeString" }),
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "body", type: "localeText" }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "localeString" })] }),
    defineField({ name: "linkLabel", type: "localeString" }),
    defineField({ name: "href", title: "Link path", type: "string" }),
  ],
  preview: { select: { title: "title.id", media: "image" } },
})
