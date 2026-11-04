import { defineField, defineType } from "sanity"
import { LOCALES, LOCALE_LABELS } from "../../lib/locales"

const AVAILABILITY = [
  { title: "Available", value: "available" },
  { title: "Limited", value: "limited" },
  { title: "Seasonal", value: "seasonal" },
  { title: "Made to order", value: "made_to_order" },
  { title: "Unavailable", value: "unavailable" },
]

const INCOTERMS = ["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAP", "DPU", "DDP"].map((code) => ({
  title: code,
  value: code,
}))

const DOCUMENTS = [
  { title: "Phytosanitary", value: "phytosanitary" },
  { title: "Certificate of Origin", value: "coo" },
  { title: "Certificate of Analysis (COA)", value: "coa" },
  { title: "Packing List", value: "packing_list" },
  { title: "Bill of Lading", value: "bl" },
  { title: "Other", value: "other" },
]

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
      name: "internationalTradeName",
      title: "International trade name",
      type: "localeString",
      description: "Optional trade / English commodity name shown under the local name. Leave empty until confirmed.",
    }),
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
      name: "hsCode",
      title: "HS code",
      type: "string",
      description: "Never shown on the site unless hsVerified is true.",
    }),
    defineField({
      name: "hsVerified",
      title: "HS code verified",
      type: "boolean",
      initialValue: false,
      description: "Unverified HS codes must never render on public pages.",
    }),
    defineField({
      name: "productForm",
      title: "Product form",
      type: "localeString",
      description: "e.g. Dried, Shelled, Peeled — leave empty until confirmed.",
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [{ type: "specRow" }],
      description: "Rows with label / value / optional unit. Empty rows are hidden on the site.",
    }),
    defineField({
      name: "referenceSpecTables",
      title: "Acuan Umum Pasar reference tables",
      type: "array",
      description: "General industry reference ranges (Brief v2). Rendered with a disclaimer only while no confirmed spec rows exist.",
      of: [
        {
          type: "object",
          name: "referenceSpecTable",
          fields: [
            defineField({ name: "source", type: "string", initialValue: "reference", readOnly: true }),
            defineField({ name: "key", title: "Form key", type: "string" }),
            defineField({ name: "heading", title: "Trade name / tab label (e.g. RCN (gelondong), Kernel)", type: "localeString" }),
            defineField({ name: "meta", title: "Tab meta line (e.g. HS acuan 0801.31)", type: "localeString" }),
            defineField({ name: "rows", title: "Rows (label / value / unit, localized id + en)", type: "array", of: [{ type: "specRow" }] }),
            defineField({ name: "standards", title: "Official standards cited (footnote, no links)", type: "array", of: [{ type: "string" }] }),
            defineField({
              name: "subTables",
              title: "Secondary tables (e.g. Kopi SNI grade table)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "referenceSubTable",
                  fields: [
                    defineField({ name: "anchor", type: "string" }),
                    defineField({ name: "caption", type: "localeString" }),
                    defineField({ name: "columns", type: "array", of: [{ type: "localeString" }] }),
                    defineField({
                      name: "rows",
                      type: "array",
                      of: [{ type: "object", name: "subRow", fields: [defineField({ name: "label", type: "localeString" }), defineField({ name: "value", type: "localeString" })] }],
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: { select: { title: "heading.id" }, prepare: ({ title }) => ({ title: title || "Acuan Umum" }) },
        },
      ],
    }),
    defineField({
      name: "packagingType",
      title: "Packaging type",
      type: "localeString",
    }),
    defineField({
      name: "bagWeight",
      title: "Bag / unit weight",
      type: "object",
      fields: [
        defineField({ name: "value", title: "Value (text or number as string)", type: "string" }),
        defineField({ name: "unit", title: "Unit", type: "string", description: "e.g. kg" }),
        defineField({ name: "min", title: "Min", type: "number" }),
        defineField({ name: "max", title: "Max", type: "number" }),
      ],
    }),
    defineField({
      name: "containerLoad20",
      title: "Load per 20′ container",
      type: "string",
      description: "e.g. 18 MT — leave empty until confirmed.",
    }),
    defineField({
      name: "containerLoad40",
      title: "Load per 40′ container",
      type: "string",
    }),
    defineField({
      name: "moq",
      title: "Minimum order quantity (MOQ)",
      type: "localeString",
    }),
    defineField({
      name: "incoterms",
      title: "Incoterms",
      type: "array",
      of: [{ type: "string" }],
      options: { list: INCOTERMS, layout: "grid" },
    }),
    defineField({
      name: "portOfLoading",
      title: "Port of loading",
      type: "localeString",
    }),
    defineField({
      name: "leadTime",
      title: "Lead time",
      type: "localeString",
    }),
    defineField({
      name: "paymentTerms",
      title: "Payment terms",
      type: "localeString",
    }),
    defineField({
      name: "harvestMonths",
      title: "Harvest months",
      type: "array",
      of: [{ type: "number" }],
      description: "1–12. Empty until confirmed.",
      validation: (Rule) => Rule.min(0).max(12).unique().custom((months) => {
        if (!months?.length) return true
        return months.every((m) => typeof m === "number" && m >= 1 && m <= 12)
          ? true
          : "Months must be integers 1–12"
      }),
    }),
    defineField({
      name: "supplyMonths",
      title: "Supply months",
      type: "array",
      of: [{ type: "number" }],
      description: "1–12. Empty until confirmed.",
      validation: (Rule) => Rule.min(0).max(12).unique().custom((months) => {
        if (!months?.length) return true
        return months.every((m) => typeof m === "number" && m >= 1 && m <= 12)
          ? true
          : "Months must be integers 1–12"
      }),
    }),
    defineField({
      name: "availableDocuments",
      title: "Available documents",
      type: "array",
      of: [{ type: "string" }],
      options: { list: DOCUMENTS, layout: "grid" },
    }),
    defineField({
      name: "specSheet",
      title: "Spec sheet (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
      description: "Hidden on the site until a file is uploaded.",
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability status",
      type: "string",
      options: { list: AVAILABILITY, layout: "radio" },
    }),
    defineField({
      name: "publishLocales",
      title: "Publish per language",
      type: "object",
      description: "When unset, the global Published flag applies. Uncheck a locale to hide this product there.",
      fields: LOCALES.map((code) =>
        defineField({
          name: code,
          title: LOCALE_LABELS[code],
          type: "boolean",
        })
      ),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "localeString",
              title: "Alt",
              description: "Required for accessibility once the image is public. Hidden/empty alts are omitted from UI.",
            },
          ],
        },
      ],
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
