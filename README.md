# Den Modular

Brochure site for a modular furniture line: kitchen cabinets, beds, TV racks, wardrobes and shelving. Built with Payload CMS 3, Next.js 16, MongoDB and Tailwind CSS 4.

Pages: Home, Products (filterable by category), Product detail, Gallery, About, Contact. All content is edited in the Payload admin at `/admin`. The site starts empty, so add your own products and images there.

## Requirements

- Node.js 22.23.5+, 24.22.3+ or 26.13.1+
- pnpm 9, 10 or 11
- Docker (for local MongoDB), or a MongoDB Atlas cluster

## Getting started

```bash
pnpm install
```

Create a `.env` file in the project root:

```bash
DATABASE_URL=mongodb://127.0.0.1/den-modular
PAYLOAD_SECRET=<long random string, e.g. from `openssl rand -hex 32`>
CONTACT_EMAIL=hello@yourdomain.com
```

Start MongoDB and the dev server:

```bash
pnpm db:up
pnpm dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (the first visit asks you to create an admin user)

Stop the database with `pnpm db:down`. Data persists in a Docker volume.

Without Docker, use an Atlas connection string for `DATABASE_URL` and add your IP to the cluster's network access list.

## Adding content

1. In **Media**, upload images. Alt text is required.
2. In **Products**, add a title, SKU, price, category and featured image. Compare-at price, gallery, specifications and description are optional.
3. Tick **Featured** to show a product on the home page.

Changes show up immediately, with no rebuild.

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server on port 3000 |
| `pnpm devsafe` | Clear `.next`, then start the dev server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm db:up` / `pnpm db:down` | Start / stop the MongoDB container |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after changing a collection |
| `pnpm lint` | Lint |
| `pnpm test` | Integration and end-to-end tests |

## Structure

```
src/
  app/(frontend)/   Public pages and styles
  app/(payload)/    Admin and API routes (generated)
  collections/      Products, Media, Users
  components/       Header, Footer, Logo, NavLinks, ProductCard
  lib/              Data access, categories, types
  payload.config.ts
public/logo.svg
```

## Customising

- **Colours:** the `@theme` block in `src/app/(frontend)/styles.css`
- **Categories:** `src/lib/categories.ts`, then `pnpm generate:types`
- **Logo:** `src/components/Logo.tsx` and `public/logo.svg`; favicon is `src/app/icon.svg`
- **Copy:** home page text is in `src/app/(frontend)/page.tsx`. The About page text is placeholder and needs replacing.
- **Currency:** `formatPrice` in `src/lib/products.ts` (USD by default)

## Notes

- The contact form uses a `mailto:` link and doesn't send mail from the server. Add an API route and an email provider if you need that.
- Scroll animations use CSS scroll-driven animations and are disabled for visitors who prefer reduced motion.
- The pages were checked with axe-core, but that covers only part of accessibility. Test with a keyboard and screen reader before launch.

## Troubleshooting

- **`ECONNREFUSED 127.0.0.1:27017`**: MongoDB isn't running. Start Docker, run `pnpm db:up`, and check `DATABASE_URL`.
- **Site is empty even though you added products**: check the terminal for `[products] Could not read from the database`.
- **Stale styles**: run `pnpm devsafe`.
- **Port 3000 in use**: `pnpm dev -p 3001`.
- **Type errors after editing a collection**: run `pnpm generate:types`.

## Running the app in Docker

`docker-compose.yml` can also run the app (dev mode). Set `DATABASE_URL=mongodb://mongo/den-modular` in `.env`, then `docker compose up`. Switch it back to `127.0.0.1` for local `pnpm dev`.
