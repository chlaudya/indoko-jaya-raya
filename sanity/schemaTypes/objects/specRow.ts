import { defineField, defineType } from "sanity"

/**
 * Spec row: label + value (+ optional unit). Existing documents with only
 * label/value keep working; unit is optional. Prefer a single `value` string
 * for ranges (e.g. "8–10") plus `unit` ("%"), or set min/max numerically when
 * the CMS editor supplies them — UI formats min/max as "min–max".
 */
export const specRow = defineType({
  name: "specRow",
  title: "Specification row",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString", validation: (Rule) => Rule.required() }),
    defineField({
      name: "value",
      title: "Value",
      type: "localeString",
      description: "Display value, including ranges as text (e.g. 8–10). Required unless min/max are set.",
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "localeString",
      description: "Optional unit shown beside the value (e.g. %, kg, MT).",
    }),
    defineField({
      name: "min",
      title: "Min (optional)",
      type: "number",
      description: "Optional numeric lower bound; UI renders as min–max with unit when set with max.",
    }),
    defineField({
      name: "max",
      title: "Max (optional)",
      type: "number",
      description: "Optional numeric upper bound.",
    }),
    defineField({
      name: "testMethod",
      title: "Test method (optional)",
      type: "localeString",
      description: "Lab / standards method for this row (e.g. AOAC). Shown only when set — leave empty until confirmed.",
    }),
    defineField({
      name: "confirmed",
      title: "Client-confirmed",
      type: "boolean",
      initialValue: false,
      description:
        "Off by default. Turn on only when the client supplied this row — unsourced fixture/placeholder specs stay hidden.",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: { list: [{ title: "Reference (Acuan Umum Pasar)", value: "reference" }, { title: "Confirmed (Indoko)", value: "confirmed" }] },
      description: "reference = general market range (shown under \"Acuan Umum Pasar\" with the note); confirmed = Indoko's own. Kept separate from the confirmed toggle.",
    }),
    defineField({ name: "linkTo", title: "Links to in-page anchor (optional)", type: "string" }),
    defineField({
      name: "source",
      title: "Source (optional)",
      type: "string",
      description: "Editor-only provenance (e.g. client email / call date). Not shown on the site.",
    }),
  ],
  preview: {
    select: { title: "label.id", value: "value.id", unit: "unit.id", min: "min", max: "max" },
    prepare({ title, value, unit, min, max }) {
      const range =
        typeof min === "number" && typeof max === "number"
          ? `${min}–${max}`
          : typeof min === "number"
            ? `≥${min}`
            : typeof max === "number"
              ? `≤${max}`
              : ""
      const body = [value || range, unit].filter(Boolean).join(" ")
      return { title, subtitle: body || undefined }
    },
  },
})
