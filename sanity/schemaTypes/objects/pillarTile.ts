import { defineField, defineType } from "sanity"

/** Redesign v2: image tile with overlaid title + link (people / products / planet). */
export const pillarTile = defineType({
  name: "pillarTile",
  title: "Pillar tile",
  type: "object",
  fields: [
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "body", type: "localeText" }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "localeString" })] }),
    defineField({ name: "href", title: "Link path (e.g. about, products)", type: "string" }),
  ],
  preview: { select: { title: "title.id", media: "image" } },
})
