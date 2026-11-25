import Image from 'next/image'
import Link from 'next/link'

import { ProductCard } from '@/components/ProductCard'
import { CATEGORIES } from '@/lib/categories'
import { getProducts } from '@/lib/products'
import { SAMPLE_HERO } from '@/lib/sample-data'

export const dynamic = 'force-dynamic'

const steps = [
  ['Pick your modules', 'Start from standard widths for cabinets, bed bases, racks and shelving.'],
  ['Mix finishes', 'Choose light or dark finishes and handle styles for each module.'],
  ['Add or remove later', 'Units connect to each other, so the set can change with the room.'],
]

export default async function HomePage() {
  const all = await getProducts()
  const featured = (all.filter((p) => p.featured).length ? all.filter((p) => p.featured) : all).slice(0, 4)

  return (
    <>
      <section aria-labelledby="hero-title" className="overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div className="reveal">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/75">Modular furniture</p>
            <h1 id="hero-title" className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Furniture that fits the room you have.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Kitchen cabinets, beds, TV racks and storage built from modules. Combine them, rearrange
              them, add more when you need to.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/products" className="bg-paper px-6 py-3 font-medium text-ink transition hover:bg-white/85">
                Shop all products
              </Link>
              <Link href="/gallery" className="border border-white px-6 py-3 font-medium transition hover:bg-white hover:text-ink">
                Open gallery
              </Link>
            </div>
          </div>
          <div className="drift">
            <Image
              src={SAMPLE_HERO.url}
              alt=""
              width={SAMPLE_HERO.width}
              height={SAMPLE_HERO.height}
              unoptimized
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="cat-title" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <h2 id="cat-title" className="reveal text-2xl font-bold tracking-tight sm:text-3xl">
          Shop by room
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => {
            const sample = all.find((p) => p.category === c.value && p.image)
            return (
              <li key={c.value} className="reveal">
                <Link href={`/products?category=${c.value}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-soft">
                    {sample?.image && (
                      <Image
                        src={sample.image.url}
                        alt=""
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 18vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <span className="mt-2 block font-medium underline-offset-4 group-hover:underline">{c.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="featured-title" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="reveal mb-8 flex items-end justify-between gap-4">
          <h2 id="featured-title" className="text-2xl font-bold tracking-tight sm:text-3xl">Featured</h2>
          <Link href="/products" className="py-2 text-sm underline underline-offset-4">All products</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="how-title" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <h2 id="how-title" className="reveal text-2xl font-bold tracking-tight sm:text-3xl">How modular works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="reveal border border-ink p-6">
              <span className="text-sm font-bold">Step {i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
