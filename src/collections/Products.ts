import type { CollectionConfig } from 'payload'

import { CATEGORIES } from '../lib/categories'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sku', 'price', 'category', 'inStock'],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Auto-generated from the title if left empty.' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => (value ? slugify(value) : data?.title ? slugify(data.title) : value),
        ],
      },
    },
    { name: 'sku', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: { position: 'sidebar', step: 0.01 },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      min: 0,
      label: 'Compare-at price',
      admin: { position: 'sidebar', step: 0.01, description: 'Original price, shown struck through.' },
    },
    {
      name: 'category',
      type: 'select',
      admin: { position: 'sidebar' },
      required: true,
      defaultValue: 'kitchen',
      options: CATEGORIES.map((c) => ({ label: c.label, value: c.value })),
    },
    { name: 'inStock', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the home page.' },
    },
    { name: 'shortDescription', type: 'textarea', maxLength: 200 },
    { name: 'description', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Image', plural: 'Gallery images' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
