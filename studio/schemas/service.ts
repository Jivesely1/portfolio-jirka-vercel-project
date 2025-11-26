import { defineField, defineType } from "sanity"

export default defineType({
  name: "service",
  title: "Služba",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název služby",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: "shortDescription",
      title: "Krátký popis",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Detailní popis",
      type: "text",
    }),
    defineField({
      name: "icon",
      title: "Ikona (emoji nebo název ikony)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Pořadí",
      type: "number",
    }),
  ],
})
