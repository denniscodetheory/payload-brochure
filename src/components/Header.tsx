import Link from 'next/link'

import { Logo } from './Logo'
import { NavLinks } from './NavLinks'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/">
          <Logo className="h-10 w-auto" />
        </Link>
        <nav aria-label="Main">
          <NavLinks />
        </nav>
      </div>
    </header>
  )
}
