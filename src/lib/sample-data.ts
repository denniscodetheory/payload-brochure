import type { CategoryValue } from './categories'
import type { ImageView, ProductView } from './types'

// Sample products and images. They show up automatically when the database has no products,
// and `pnpm seed` copies them into the database. All values are placeholders, not real stock.

const img = (name: string, alt: string): ImageView => ({
  url: `/samples/${name}.svg`,
  alt,
  width: 1000,
  height: 1250,
})

type Seed = {
  slug: string
  title: string
  sku: string
  price: number
  compareAtPrice?: number
  category: CategoryValue
  inStock?: boolean
  featured?: boolean
  shortDescription: string
  paragraphs: string[]
  image: string
  alt: string
  specs: [string, string][]
}

const seeds: Seed[] = [
  {
    slug: 'linea-kitchen-cabinet-set',
    title: 'Linea Kitchen Cabinet Set',
    sku: 'KC-100',
    price: 2890,
    compareAtPrice: 3290,
    category: 'kitchen',
    featured: true,
    shortDescription: 'Three wall units and three base units with a matte worktop. Add or remove modules to fit the wall.',
    paragraphs: [
      'A straight-run kitchen built from standard modules. Each cabinet is sold as a unit, so the layout can grow or shrink with the room.',
      'Soft-close hinges and full-extension drawers are included.',
    ],
    image: 'kitchen-linea',
    alt: 'Black and white kitchen with three wall cabinets above three base cabinets',
    specs: [['Width', '240 cm'], ['Finish', 'Matte white'], ['Worktop', 'Black laminate'], ['Modules', '6']],
  },
  {
    slug: 'compact-kitchen-unit',
    title: 'Compact Kitchen Unit',
    sku: 'KC-120',
    price: 1790,
    category: 'kitchen',
    shortDescription: 'Two wall units and two base units for small kitchens and studios.',
    paragraphs: ['A short run that fits a studio or a galley wall. Pairs with the Linea set if you later need more length.'],
    image: 'kitchen-corner',
    alt: 'Compact kitchen with two wall cabinets above two base cabinets',
    specs: [['Width', '160 cm'], ['Finish', 'Matte white'], ['Modules', '4']],
  },
  {
    slug: 'frame-platform-bed',
    title: 'Frame Platform Bed',
    sku: 'BD-200',
    price: 1190,
    category: 'beds',
    featured: true,
    shortDescription: 'Low platform bed with a panelled headboard. Ships flat and assembles with a single tool.',
    paragraphs: ['A low, solid frame with a three-panel headboard. The headboard panels can be swapped for other finishes.'],
    image: 'bed-frame',
    alt: 'Low platform bed with a three-panel headboard and two pillows',
    specs: [['Size', 'Queen (160 x 200 cm)'], ['Finish', 'Matte white'], ['Legs', 'Powder-coated steel']],
  },
  {
    slug: 'storage-bed',
    title: 'Storage Bed',
    sku: 'BD-210',
    price: 1590,
    category: 'beds',
    shortDescription: 'The platform bed with two deep drawers built into the base.',
    paragraphs: ['Two full-width drawers use the space under the mattress. Drawers run on soft-close runners.'],
    image: 'bed-storage',
    alt: 'Platform bed with two large drawers in the base',
    specs: [['Size', 'Queen (160 x 200 cm)'], ['Drawers', '2'], ['Finish', 'Matte white']],
  },
  {
    slug: 'floating-tv-rack',
    title: 'Floating TV Rack',
    sku: 'TV-300',
    price: 690,
    category: 'tv-racks',
    featured: true,
    shortDescription: 'Wall-mounted three-door rack with a clear floor beneath.',
    paragraphs: ['Mounts to the wall so the floor stays clear. Cable cut-outs sit at the back of each compartment.'],
    image: 'tv-float',
    alt: 'Wall-mounted TV rack with three compartments below a television',
    specs: [['Width', '180 cm'], ['Compartments', '3'], ['Mounting', 'Wall']],
  },
  {
    slug: 'tv-rack-with-legs',
    title: 'TV Rack with Legs',
    sku: 'TV-310',
    price: 590,
    category: 'tv-racks',
    inStock: false,
    shortDescription: 'Freestanding low rack on steel legs. Currently sold out.',
    paragraphs: ['A freestanding version of the floating rack. No wall fixing needed.'],
    image: 'tv-stand',
    alt: 'Freestanding TV rack on legs with three compartments',
    specs: [['Width', '180 cm'], ['Compartments', '3'], ['Legs', 'Powder-coated steel']],
  },
  {
    slug: 'sliding-door-wardrobe',
    title: 'Sliding Door Wardrobe',
    sku: 'WD-400',
    price: 1890,
    category: 'wardrobes',
    featured: true,
    shortDescription: 'Three sliding doors over a hanging rail, shelves and a drawer.',
    paragraphs: ['Sliding doors save the floor space a hinged door needs. The inside combines a hanging rail, adjustable shelves and one drawer.'],
    image: 'wardrobe',
    alt: 'Tall white wardrobe with three sliding doors',
    specs: [['Width', '200 cm'], ['Height', '220 cm'], ['Doors', '3 sliding']],
  },
  {
    slug: 'grid-shelving-unit',
    title: 'Grid Shelving Unit',
    sku: 'ST-500',
    price: 760,
    category: 'storage',
    shortDescription: 'Twelve open and closed cubes. Stack, split or place side by side.',
    paragraphs: ['A grid of cubes that works as a room divider, a bookcase or a sideboard. Closed cubes have push-to-open doors.'],
    image: 'shelving',
    alt: 'Grid shelving unit with open cubes and closed cubes',
    specs: [['Cubes', '12'], ['Width', '90 cm'], ['Height', '120 cm']],
  },
]

export const SAMPLE_HERO = { url: '/samples/hero.svg', width: 1500, height: 900 }

export const SAMPLE_PRODUCTS: ProductView[] = seeds.map((s, i) => ({
  id: `sample-${i + 1}`,
  slug: s.slug,
  title: s.title,
  sku: s.sku,
  price: s.price,
  compareAtPrice: s.compareAtPrice ?? null,
  category: s.category,
  inStock: s.inStock ?? true,
  featured: s.featured ?? false,
  shortDescription: s.shortDescription,
  image: img(s.image, s.alt),
  gallery: [{ image: img(`${s.image}-alt`, `${s.alt}, dark finish`), caption: 'Dark finish' }],
  specs: s.specs.map(([label, value]) => ({ label, value })),
  paragraphs: s.paragraphs,
}))
