export const CATEGORIES = [
  { value: 'kitchen', label: 'Kitchen Cabinets' },
  { value: 'beds', label: 'Beds' },
  { value: 'tv-racks', label: 'TV Racks' },
  { value: 'wardrobes', label: 'Wardrobes' },
  { value: 'storage', label: 'Shelving & Storage' },
] as const

export type CategoryValue = (typeof CATEGORIES)[number]['value']

export const categoryLabel = (value?: string | null) =>
  CATEGORIES.find((c) => c.value === value)?.label ?? 'Furniture'
