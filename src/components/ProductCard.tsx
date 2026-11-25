import Image from 'next/image'
import Link from 'next/link'

import { categoryLabel } from '@/lib/categories'
import { formatPrice } from '@/lib/products'
import type { ProductView } from '@/lib/types'

export function ProductCard({
  product,
  headingLevel = 3,
}: {
  product: ProductView
  headingLevel?: 2 | 3
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3'
  const img = product.image
  return (
    <Link href={`/products/${product.slug}`} className="group block reveal">
      <div className="relative aspect-[4/5] overflow-hidden bg-soft">
        {img ? (
          <Image
            src={img.url}
            alt={img.alt}
            fill
            unoptimized
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        {!product.inStock && (
          <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-xs font-medium text-paper">Sold out</span>
        )}
      </div>
      <p className="mt-3 text-xs uppercase tracking-widest text-mute">{categoryLabel(product.category)}</p>
      <Heading className="font-medium leading-snug group-hover:underline underline-offset-4">{product.title}</Heading>
      <p className="mt-1 text-sm">
        {product.compareAtPrice ? (
          <>
            <span className="mr-2 text-mute line-through">
              <span className="sr-only">Was </span>
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="sr-only">Now </span>
          </>
        ) : null}
        <span className="font-semibold">{formatPrice(product.price)}</span>
        <span className="text-mute"> · SKU {product.sku}</span>
      </p>
    </Link>
  )
}
