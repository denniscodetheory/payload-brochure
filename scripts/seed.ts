// Loads the sample products and images into the database. Run with: pnpm seed
// Safe to re-run: products whose SKU already exists are skipped.
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { SAMPLE_PRODUCTS } from '../src/lib/sample-data'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const toLexical = (paragraphs: string[] = []) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
    })),
  },
})

const payload = await getPayload({ config })

const upload = async (url: string, alt: string) => {
  const filename = path.basename(url)
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
  if (existing.docs[0]) return existing.docs[0].id
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.join(root, 'public', url),
  })
  return doc.id
}

let created = 0
for (const p of SAMPLE_PRODUCTS) {
  const found = await payload.find({ collection: 'products', where: { sku: { equals: p.sku } }, limit: 1 })
  if (found.docs.length) {
    console.log(`skip   ${p.sku} (already exists)`)
    continue
  }
  const featuredImage = await upload(p.image!.url, p.image!.alt)
  const gallery = []
  for (const g of p.gallery) gallery.push({ image: await upload(g.image.url, g.image.alt), caption: g.caption ?? undefined })

  await payload.create({
    collection: 'products',
    data: {
      title: p.title,
      slug: p.slug,
      sku: p.sku,
      price: p.price,
      compareAtPrice: p.compareAtPrice ?? undefined,
      category: p.category,
      inStock: p.inStock,
      featured: p.featured,
      shortDescription: p.shortDescription ?? undefined,
      description: toLexical(p.paragraphs) as never,
      featuredImage,
      gallery,
      specifications: p.specs,
    },
  })
  created++
  console.log(`create ${p.sku} ${p.title}`)
}

console.log(`Done. ${created} product(s) created.`)
process.exit(0)
