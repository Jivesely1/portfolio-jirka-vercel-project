import { defineField, defineType } from "sanity"

export default defineType({
  name: "skill",
  title: "Technologie / Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Název technologie",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
      description: "Např. 💻, ⚛️, ☕",
    }),
    defineField({
      name: "level",
      title: "Úroveň",
      type: "string",
      options: {
        list: [
          { title: "Začátečník", value: "beginner" },
          { title: "Středně pokročilý", value: "intermediate" },
          { title: "Pokročilý", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Pořadí",
      type: "number",
    }),
  ],
})
