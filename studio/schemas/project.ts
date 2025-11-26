import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název projektu",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(120),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Stručný popis",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Hlavní text – úvodní popis",
      type: "text",
    }),

    defineField({
      name: "mainImage",
      title: "Hlavní obrázek",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "url",
      title: "URL projektu",
      type: "url",
    }),

    // ⭐ NOVÉ PRVKY PRO CELOU PAGE
    defineField({
      name: "goal",
      title: "Cíl projektu",
      type: "text",
      description: "Co bylo cílem projektu?",
    }),

    defineField({
      name: "workflow",
      title: "Proces / Workflow",
      type: "array",
      of: [{ type: "string" }],
      description: "Jednotlivé kroky projektu",
    }),

    defineField({
      name: "results",
      title: "Výsledky projektu",
      type: "text",
    }),

    defineField({
      name: "features",
      title: "Co jsem vytvořil / přínosy",
      type: "array",
      of: [{ type: "string" }],
      description: "Přehled toho, co bylo v projektu realizováno",
    }),

    defineField({
      name: "gallery",
      title: "Obrázková galerie",
      type: "array",
      of: [{ type: "image" }],
      options: { layout: "grid" },
    }),

    // Volitelné doplňky
    defineField({
      name: "client",
      title: "Klient",
      type: "string",
    }),

    defineField({
      name: "year",
      title: "Rok projektu",
      type: "number",
    }),

    defineField({
      name: "order",
      title: "Pořadí",
      type: "number",
      description: "Nižší číslo = zobrazí se výše v seznamu",
    }),
  ],
});
