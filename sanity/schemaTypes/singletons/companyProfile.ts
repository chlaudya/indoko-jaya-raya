import { defineField, defineType } from "sanity"

export const companyProfile = defineType({
  name: "companyProfile",
  title: "Profil & Data Perusahaan",
  type: "document",
  fields: [
    defineField({ name: "legalName", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({ name: "tagline", type: "localeString" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "vision", type: "localeBlock" }),
    defineField({ name: "mission", type: "localeBlock" }),
    defineField({
      name: "legalitas",
      title: "Legalitas (public-approved only)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "localeString" },
            { name: "value", type: "localeString" },
          ],
          preview: { select: { title: "label.id", subtitle: "value.id" } },
        },
      ],
    }),
    defineField({
      name: "management",
      title: "Struktur organisasi / key management",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "role", type: "localeString" },
            { name: "photo", type: "image" },
          ],
          preview: { select: { title: "name", subtitle: "role.id" } },
        },
      ],
    }),
    defineField({ name: "orgChartImage", type: "image" }),
    defineField({
      name: "facilities",
      title: "Lokasi & fasilitas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "localeString" },
            { name: "body", type: "localeText" },
            { name: "image", type: "image" },
          ],
          preview: { select: { title: "title.id", media: "image" } },
        },
      ],
    }),
    defineField({
      name: "certifications",
      title: "Sertifikasi",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "localeString" },
            { name: "issuer", type: "localeString" },
            { name: "image", type: "image" },
          ],
          preview: { select: { title: "name.id" } },
        },
      ],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "localeString" }] }],
    }),
    defineField({ name: "waCta", type: "waCta" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Profil & Data Perusahaan" }
    },
  },
})
