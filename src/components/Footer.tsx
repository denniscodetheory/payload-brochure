import Link from 'next/link'

import { Logo } from './Logo'
import { CATEGORIES } from '@/lib/categories'

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/75">
            Modular kitchens, beds, TV racks and storage. Choose the modules, build the room.
          </p>
        </div>
        <nav aria-label="Footer, shop">
          <h2 className="text-sm font-bold uppercase tracking-widest">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.value}>
                <Link href={`/products?category=${c.value}`} className="underline-offset-4 hover:underline">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer, company">
          <h2 className="text-sm font-bold uppercase tracking-widest">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/gallery" className="underline-offset-4 hover:underline">Gallery</Link></li>
            <li><Link href="/about" className="underline-offset-4 hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="underline-offset-4 hover:underline">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-white/20 px-4 py-5 text-center text-xs text-white/75">
        © {new Date().getFullYear()} Den Modular. All rights reserved.
      </p>
    </footer>
  )
}
