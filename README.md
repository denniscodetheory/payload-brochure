# Den Modular

A product brochure site for modular furniture (kitchen cabinets, beds, TV racks, wardrobes and shelving).
Built with [Payload CMS](https://payloadcms.com) 3, Next.js 16, MongoDB and Tailwind CSS 4. Black and white theme.

- Pages: Home, Products (with category filter), Product detail, Gallery, About Us, Contact Us
- Content is managed in the Payload admin panel at `/admin`
- Includes sample products, sample images and a logo, so the site looks complete on first run

## Prerequisites

| Tool | Version | Check with |
| --- | --- | --- |
| Node.js | 22.23.5+, 24.22.3+ or 26.13.1+ | `node -v` |
| pnpm | 9, 10 or 11 | `pnpm -v` |
| Docker Desktop | any recent version (for MongoDB) | `docker -v` |

Install pnpm if you don't have it: `corepack enable` (ships with Node) or `npm i -g pnpm`.

## Run it locally

```bash
# 1. Install dependencies
pnpm install

# 2. Create your environment file (there is no .env.example in the repo)
cat > .env <<EOF
DATABASE_URL=mongodb://127.0.0.1/den-modular
PAYLOAD_SECRET=$(openssl rand -hex 32)
CONTACT_EMAIL=hello@yourdomain.com
EOF

# 3. Check .env: PAYLOAD_SECRET should now hold a random 64-character value

# 4. Start MongoDB in Docker (open Docker Desktop first)
pnpm db:up

# 5. Load the sample products and images into the database (optional but recommended)
pnpm seed

# 6. Start the site
pnpm dev
```

Then open:

- Site: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin> (the first visit asks you to create an admin user)

Stop the database later with `pnpm db:down`. Your data is kept in a Docker volume and is still there next time you run `pnpm db:up`.

### Build and run the production version locally

Use this to check the site as it will behave when deployed. Steps 1 to 5 above must be done first (MongoDB running, `.env` in place).

```bash
pnpm build   # compile the site (the Next.js build; can take a minute or two)
pnpm start   # serve the build at http://localhost:3000
```

`pnpm start` serves the last build, so run `pnpm build` again after any code change. Content edits in the admin panel don't need a rebuild. Stop the dev server first, since both use port 3000. To run tests and lint before building: `pnpm lint` and `pnpm test`.

### Environment variables

| Variable | Purpose | Example |
| --- | --- | --- |
| `DATABASE_URL` | MongoDB connection string | `mongodb://127.0.0.1/den-modular` |
| `PAYLOAD_SECRET` | Secret used to sign sessions. Use a long random string | output of `openssl rand -hex 32` |
| `CONTACT_EMAIL` | Address the contact form opens a draft to | `hello@yourdomain.com` |

Don't have Docker? Use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster instead and paste its connection string into `DATABASE_URL`. Add your IP address to Atlas's network access list or the connection will time out.

## Sample data

- Images and the logo are generated SVG files in `public/samples/` and `public/logo.svg`. Regenerate the samples with `pnpm samples`.
- If the database has **no products** (or can't be reached), the site shows the built-in sample products so you always see something. The sample data lives in `src/lib/sample-data.ts`.
- `pnpm seed` copies those samples into MongoDB so you can edit them in the admin panel. It is safe to run twice: products with an existing SKU are skipped.
- Once you add your own products in the admin panel, delete the sample ones (Products list, select, delete).
- All names, prices and sizes in the samples are placeholders, not real stock.

## Managing content

1. Go to <http://localhost:3000/admin>.
2. **Media**: upload product photos. Every image needs alt text (it is read aloud by screen readers).
3. **Products**: add a title, SKU, price, category and a featured image. Optional: compare-at price, gallery images, specifications, rich-text description.
4. Tick **Featured** to show a product on the home page.

Changes appear on the site straight away. No rebuild needed.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server on port 3000 |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm db:up` / `pnpm db:down` | Start / stop the MongoDB container |
| `pnpm seed` | Load sample products and images into the database |
| `pnpm samples` | Regenerate the sample SVG images |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after changing a collection |
| `pnpm test` | Run integration and end-to-end tests |
| `pnpm devsafe` | Clear the `.next` cache, then start the dev server |

## Project structure

```
src/
  app/(frontend)/       Public site: layout, home, products, gallery, about, contact, styles.css
  app/(payload)/        Payload admin and API routes (generated, don't edit)
  components/           Header, Footer, Logo, NavLinks, ProductCard
  collections/          Products, Media, Users
  lib/                  products.ts (data access), categories.ts, sample-data.ts, types.ts
  payload.config.ts     Payload configuration
public/
  logo.svg, samples/    Logo and sample images
scripts/
  seed.ts, generate-samples.mjs
```

## Customising

- **Colours:** edit the `@theme` block at the top of `src/app/(frontend)/styles.css` (`--color-ink`, `--color-paper`, `--color-mute`, `--color-line`, `--color-soft`).
- **Categories:** edit `src/lib/categories.ts`, then run `pnpm generate:types`.
- **Logo:** edit `src/components/Logo.tsx` (site) and `public/logo.svg` (standalone file). The favicon is `src/app/icon.svg`.
- **Copy:** the hero text is in `src/app/(frontend)/page.tsx`. The About Us text in `about/page.tsx` is placeholder copy.
- **Currency:** prices are formatted as USD in `formatPrice` in `src/lib/products.ts`.

## Accessibility

- Skip-to-content link, landmarks, and one `h1` per page
- Visible two-tone keyboard focus ring that works on black and white backgrounds
- Current page marked with `aria-current` in the menu and category filter
- Text contrast of at least 4.5:1, labelled form fields, alt text on every product image
- Scroll animations respect `prefers-reduced-motion`

Automated check: the pages were scanned with axe-core (WCAG 2.2 A and AA rules) with 0 violations at desktop and phone width. Automated tools catch only part of the issues, so test with a keyboard and a screen reader before launch.

## Scroll animation

Items fade and rise into view as you scroll, and a thin progress bar at the top tracks scroll position. This uses CSS scroll-driven animations (`animation-timeline`) with no JavaScript. Browsers without support, and visitors who prefer reduced motion, see the content with no animation.

## Contact form

The form uses a `mailto:` action, so it opens the visitor's email app and does not send mail from the server. If you need server-side delivery, add an API route and an email provider.

## Troubleshooting

**`ECONNREFUSED 127.0.0.1:27017` / "cannot connect to MongoDB"**
MongoDB isn't running. Open Docker Desktop, run `pnpm db:up`, and check `DATABASE_URL` in `.env`.

**`Cannot connect to the Docker daemon`**
Docker Desktop isn't started.

**Pages show sample products instead of mine**
The database is empty or unreachable. Check the terminal for a `[products] Could not read from the database` warning.

**Styles look stale or missing after a change**
Run `pnpm devsafe`.

**`Unsupported engine` warning**
Your Node.js version is older than the one in `package.json`. Update Node.js (for example with `nvm install 24`).

**Port 3000 already in use**
Stop the other process, or run `pnpm dev -p 3001`.

**Changed a collection and TypeScript errors appear**
Run `pnpm generate:types`.

## Running everything in Docker

`docker-compose.yml` can also run the app container (in dev mode, not a production build). In that case set `DATABASE_URL=mongodb://mongo/den-modular` in `.env`, because inside the container the database host is `mongo`, not `127.0.0.1`. Then run `docker compose up`. Switch `DATABASE_URL` back to `127.0.0.1` when you go back to running `pnpm dev` on your machine.
