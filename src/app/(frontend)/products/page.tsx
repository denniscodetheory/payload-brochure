import Link from 'next/link'

import { ProductCard } from '@/components/ProductCard'
import { CATEGORIES } from '@/lib/categories'
import { getProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Products' }

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const active = CATEGORIES.find((c) => c.value === category)?.value
  const products = await getProducts({ category: active })

  const chip = (isActive: boolean) =>
    `inline-block rounded-full border border-ink px-4 py-2 text-sm font-medium transition hover:bg-ink hover:text-paper ${
      isActive ? 'bg-ink text-paper' : ''
    }`

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Products</h1>

      <nav aria-label="Filter by category" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link href="/products" className={chip(!active)} aria-current={!active ? 'page' : undefined}>
              All
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.value}>
              <Link
                href={`/products?category=${c.value}`}
                className={chip(active === c.value)}
                aria-current={active === c.value ? 'page' : undefined}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-6 text-mute" role="status">
        {products.length} {products.length === 1 ? 'item' : 'items'}
      </p>

      {products.length ? (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} headingLevel={2} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-mute">No products in this category yet.</p>
      )}
    </div>
  )
}
