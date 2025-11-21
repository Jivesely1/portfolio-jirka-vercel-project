import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

export default defineConfig({
  name: "default",
  title: "Portfolio Jirka CMS",

  projectId: "sjl39asi",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

document: {
  productionUrl: async (prev, context) => {
    const doc = context.document as {
      _type?: string
      slug?: { current?: string }
    }

    const slug = doc.slug?.current

    if (doc._type === "project" && slug) {
      return `https://portfolio-jirka-vercel-project-git-main-jivesely1s-projects.vercel.app/projekty/${slug}`
    }

    return prev
  },
},
})
