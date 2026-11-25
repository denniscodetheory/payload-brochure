import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { categoryLabel } from '@/lib/categories'
import { formatPrice, getProductBySlug } from '@/lib/products'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const product = await getProductBySlug((await params).slug)
  return { title: product?.title ?? 'Product' }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug((await params).slug)
  if (!product) notFound()

  const images = [
    ...(product.image ? [{ image: product.image }] : []),
    ...product.gallery,
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb">
        <Link href="/products" className="inline-block py-2 text-sm text-mute underline underline-offset-4">
          ← All products
        </Link>
      </nav>

      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        <ul className="grid grid-cols-2 gap-3">
          {images.map((g, i) => (
            <li key={g.image.url} className={`reveal relative bg-soft ${i === 0 ? 'col-span-2 aspect-square' : 'aspect-square'}`}>
              <Image
                src={g.image.url}
                alt={g.image.alt}
                fill
                unoptimized
                priority={i === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>

        <div className="reveal">
          <p className="text-xs uppercase tracking-widest text-mute">
            {categoryLabel(product.category)} · SKU {product.sku}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{product.title}</h1>
          <p className="mt-4 text-2xl">
            {product.compareAtPrice ? (
              <span className="mr-3 text-lg text-mute line-through">
                <span className="sr-only">Was </span>
                {formatPrice(product.compareAtPrice)}
                <span className="sr-only">, now</span>
              </span>
            ) : null}
            <span className="font-semibold">{formatPrice(product.price)}</span>
          </p>
          <p className="mt-3 inline-block border border-ink px-2 py-0.5 text-xs font-bold uppercase">
            {product.inStock ? 'In stock' : 'Sold out'}
          </p>

          {product.shortDescription && <p className="mt-6 text-lg">{product.shortDescription}</p>}
          <div className="mt-6 space-y-4 text-mute">
            {product.richDescription ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <RichText data={product.richDescription as any} />
            ) : (
              product.paragraphs?.map((t) => <p key={t}>{t}</p>)
            )}
          </div>

          {product.specs.length > 0 && (
            <section aria-labelledby="specs-title" className="mt-8">
              <h2 id="specs-title" className="text-sm font-bold uppercase tracking-widest">Specifications</h2>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-mute">{s.label}</dt>
                    <dd className="text-right font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <Link
            href={`/contact?product=${encodeURIComponent(product.sku)}`}
            className="mt-8 inline-block bg-ink px-6 py-3 font-medium text-paper transition hover:bg-ink/85"
          >
            Enquire about this product
          </Link>
        </div>
      </div>
    </div>
  )
}
