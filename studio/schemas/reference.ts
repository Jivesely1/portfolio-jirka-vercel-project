import { defineField, defineType } from "sanity"

export default defineType({
  name: "testimonial",
  title: "Reference / Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Jméno",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Firma",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Pozice",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Text doporučení",
      type: "text",
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "avatar",
      title: "Fotka / avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Pořadí",
      type: "number",
    }),
  ],
})
