export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
}

export interface SanityProject {
  _id: string
  title: string
  slug?: { current: string }
  shortDescription?: string
  description?: string
  mainImage?: SanityImage
  url?: string
  order?: number
  imageUrl?: string; // ← PŘIDÁNO
}

export interface SanityService {
  _id: string
  title: string
  shortDescription?: string
  description?: string
  icon?: string
  order?: number
}

export interface SanityReference {
  _id: string
  name: string
  company?: string
  role?: string
  quote?: string;   // ← optional = žádná chyba
  avatar?: SanityImage
  order?: number
}

export interface SanitySkill {
  _id: string
  name: string
  emoji?: string
  level?: "beginner" | "intermediate" | "advanced" | "expert"
  order?: number
}
