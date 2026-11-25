import Image from 'next/image'
import Link from 'next/link'

import { getProducts } from '@/lib/products'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Gallery' }

export default async function GalleryPage() {
  const products = await getProducts()

  const items = products.flatMap((p) =>
    [...(p.image ? [{ image: p.image, caption: p.title }] : []), ...p.gallery.map((g) => ({ image: g.image, caption: g.caption || p.title }))].map(
      (i, idx) => ({ key: `${p.id}-${idx}`, slug: p.slug, title: p.title, ...i }),
    ),
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Gallery</h1>
      <p className="mt-2 max-w-prose text-mute">Every product image in one place. Select an image to open the product.</p>

      {items.length ? (
        <ul className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4">
          {items.map((i) => (
            <li key={i.key} className="reveal break-inside-avoid">
              <Link
                href={`/products/${i.slug}`}
                aria-label={`${i.title}: ${i.image.alt}`}
                className="group relative block overflow-hidden bg-soft"
              >
                <Image
                  src={i.image.url}
                  alt=""
                  width={i.image.width}
                  height={i.image.height}
                  unoptimized
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink px-3 py-2 text-sm text-paper transition group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  {i.caption}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-mute">No images yet. Upload product images in the admin panel.</p>
      )}
    </div>
  )
}
