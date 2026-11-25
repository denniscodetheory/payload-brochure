import type { CategoryValue } from './categories'

export type ImageView = { url: string; alt: string; width: number; height: number }

/** The shape the pages render. Built from Payload documents or from the built-in sample data. */
export type ProductView = {
  id: string
  slug: string
  title: string
  sku: string
  price: number
  compareAtPrice?: number | null
  category: CategoryValue
  inStock: boolean
  featured: boolean
  shortDescription?: string | null
  image: ImageView | null
  gallery: { image: ImageView; caption?: string | null }[]
  specs: { label: string; value: string }[]
  /** Payload rich text (from the database). */
  richDescription?: unknown
  /** Plain paragraphs (from the sample data). */
  paragraphs?: string[]
}
