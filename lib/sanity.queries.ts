import { groq } from "next-sanity"
import { client } from "./sanity.client"
import type { SanityProject, SanityService, SanityReference, SanitySkill } from "./types"

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    description,
    mainImage,
    url,
    order
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    shortDescription,
    description,
    mainImage,
    url,
    order
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id,
    title,
    shortDescription,
    description,
    icon,
    order
  }
`

export const referencesQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    name,
    company,
    role,
    quote,
    avatar,
    order
  }
`

export const skillsQuery = groq`
  *[_type == "skill"] | order(order asc, _createdAt asc) {
    _id,
    name,
    emoji,
    level,
    order
  }
`

export async function getProjects(): Promise<SanityProject[]> {
  return await client.fetch(projectsQuery)
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return await client.fetch(projectBySlugQuery, { slug })
}

export async function getServices(): Promise<SanityService[]> {
  return await client.fetch(servicesQuery)
}

export async function getReferences(): Promise<SanityReference[]> {
  return await client.fetch(referencesQuery)
}

export async function getSkills(): Promise<SanitySkill[]> {
  return await client.fetch(skillsQuery)
}
