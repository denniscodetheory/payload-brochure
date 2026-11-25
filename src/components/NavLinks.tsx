'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

export function NavLinks() {
  const pathname = usePathname()
  return (
    <ul className="flex flex-wrap items-center gap-1 text-sm font-medium">
      {links.map((l) => {
        const current = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={current ? 'page' : undefined}
              className={`inline-block rounded-full px-3 py-2 transition hover:bg-ink hover:text-paper ${
                current ? 'bg-ink text-paper' : ''
              }`}
            >
              {l.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
