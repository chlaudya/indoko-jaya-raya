import { defineField, defineType } from "sanity"

export const product = defineType({
  name: "product",
  title: "Product / Commodity",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Product", value: "product" },
          { title: "Service", value: "service" },
        ],
        layout: "radio",
      },
      initialValue: "product",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "name", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name.id", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({ name: "shortBlurb", title: "Short blurb (card)", type: "localeText" }),
    defineField({ name: "description", title: "Description", type: "localeBlock" }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [{ type: "specRow" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "localeString", title: "Alt" }] }],
    }),
    defineField({ name: "featured", title: "Featured on home", type: "boolean", initialValue: false }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true }),
    // Long-form fields for service detail page (e.g. Jasa Penjemuran)
    defineField({
      name: "capacity",
      title: "Capacity & location (service)",
      type: "localeBlock",
      hidden: ({ document }) => document?.kind !== "service",
    }),
    defineField({
      name: "processSteps",
      title: "How it works",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "localeString" },
            { name: "body", type: "localeText" },
          ],
          preview: { select: { title: "title.id" } },
        },
      ],
      hidden: ({ document }) => document?.kind !== "service",
    }),
    defineField({
      name: "servicePagePath",
      title: "Dedicated service path override",
      type: "string",
      description: "e.g. services/drying — if empty, uses /products/[slug]",
      hidden: ({ document }) => document?.kind !== "service",
    }),
    defineField({ name: "waCta", title: "WhatsApp CTA", type: "waCta" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "name.id", kind: "kind", media: "gallery.0" },
    prepare({ title, kind, media }) {
      return { title, subtitle: kind, media }
    },
  },
})
