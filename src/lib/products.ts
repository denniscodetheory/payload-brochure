import config from '@payload-config'
import { getPayload } from 'payload'

import type { Media, Product } from '@/payload-types'
import type { CategoryValue } from './categories'
import type { ImageView, ProductView } from './types'

export type { ProductView, ImageView }

const toImage = (m: string | number | Media | null | undefined): ImageView | null =>
  m && typeof m === 'object' && m.url
    ? { url: m.url, alt: m.alt, width: m.width ?? 1000, height: m.height ?? 1250 }
    : null

const toView = (p: Product): ProductView => ({
  id: String(p.id),
  slug: p.slug ?? String(p.id),
  title: p.title,
  sku: p.sku,
  price: p.price,
  compareAtPrice: p.compareAtPrice,
  category: (p.category ?? 'storage') as CategoryValue,
  inStock: p.inStock ?? true,
  featured: p.featured ?? false,
  shortDescription: p.shortDescription,
  image: toImage(p.featuredImage),
  gallery: (p.gallery ?? []).flatMap((g) => {
    const image = toImage(g.image)
    return image ? [{ image, caption: g.caption }] : []
  }),
  specs: (p.specifications ?? []).map((s) => ({ label: s.label, value: s.value })),
  richDescription: p.description,
})

/** Reads products from Payload. Returns an empty list if the database can't be reached. */
async function loadAll(): Promise<ProductView[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'products', depth: 1, limit: 200, sort: '-createdAt' })
    return docs.map(toView)
  } catch (err) {
    console.warn('[products] Could not read from the database.', (err as Error).message)
    return []
  }
}

export async function getProducts(opts: { featured?: boolean; category?: string; limit?: number } = {}) {
  let list = await loadAll()
  if (opts.featured) list = list.filter((p) => p.featured)
  if (opts.category) list = list.filter((p) => p.category === opts.category)
  return opts.limit ? list.slice(0, opts.limit) : list
}

export async function getProductBySlug(slug: string) {
  return (await loadAll()).find((p) => p.slug === slug) ?? null
}

export const formatPrice = (n: number | null | undefined) =>
  typeof n === 'number'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
    : ''
