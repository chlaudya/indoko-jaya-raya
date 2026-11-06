import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemaTypes"
import { structure } from "./sanity/lib/structure"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "indoco-jaya-raya",
  title: "PT Indoko Jaya Raya",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
})
