import { createClient } from "next-sanity"

// ✅ Sanity klient
export const client = createClient({
  projectId: "sjl39asi", // tvoje ID projektu
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true, // rychlejší načítání
})

// 🧩 Typy dat (shodné se schématy v CMS)
export interface SanityProject {
  _id: string
  title: string
  description: string
  imageUrl?: string
  slug?: { current: string }   // ✅ přidáno kvůli detailní stránce
}

export interface SanityService {
  _id: string
  title: string
  description: string
  icon?: string
}

export interface SanityReference {
  _id: string
  name: string
  text: string
  company?: string
}

export interface SanitySkill {
  _id: string
  name: string
  emoji?: string   // ✅ opraveno z "icon" → "emoji" podle tvého CMS datasetu
}

// 📡 Funkce pro načítání dat z CMS

// Projekty
export async function getProjects(): Promise<SanityProject[]> {
  try {
    return await client.fetch(`
      *[_type == "project"]{
        _id,
        title,
        description,
        "slug": slug,
        "imageUrl": image.asset->url
      } | order(_createdAt desc)
    `)
  } catch (e) {
    console.error('❌ Chyba při načítání projektů:', e)
    return []
  }
}

// Služby
export async function getServices(): Promise<SanityService[]> {
  try {
    return await client.fetch(`
      *[_type == "service"]{
        _id,
        title,
        description,
        icon
      } | order(_createdAt desc)
    `)
  } catch (e) {
    console.error("❌ Chyba při načítání služeb:", e)
    return []
  }
}

// Reference
export async function getReferences(): Promise<SanityReference[]> {
  try {
    return await client.fetch(`
      *[_type == "testimonial"]{
        _id,
        name,
        text,
        company
      } | order(_createdAt desc)
    `)
  } catch (e) {
    console.error("❌ Chyba při načítání referencí:", e)
    return []
  }
}

// Dovednosti
export async function getSkills(): Promise<SanitySkill[]> {
  try {
    return await client.fetch(`
      *[_type == "skill"]{
        _id,
        name,
        emoji
      } | order(_createdAt asc)
    `)
  } catch (e) {
    console.error("❌ Chyba při načítání dovedností:", e)
    return []
  }
}
