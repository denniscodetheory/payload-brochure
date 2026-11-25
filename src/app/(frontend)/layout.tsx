import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import './styles.css'

export const metadata = {
  title: { default: 'Den Modular | Modular furniture', template: '%s | Den Modular' },
  description: 'Modular kitchen cabinets, beds, TV racks, wardrobes and shelving.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="site">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:font-medium"
        >
          Skip to main content
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
