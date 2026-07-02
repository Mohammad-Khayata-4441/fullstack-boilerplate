# fullstack-boilerplate

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Self, TRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - shadcn/ui primitives live in `packages/ui`
- **tRPC** - End-to-end type-safe APIs
- **Prisma** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Better-Auth
- **Turborepo** - Optimized monorepo build system
- **PWA** - Progressive Web App support

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses PostgreSQL with Prisma.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/web/.env` file with your PostgreSQL connection details.
   - When using the Dockerized database, connect to `localhost:5433` on the host.

3. Apply the schema to your database:

```bash
pnpm run db:push
```

### Database Seeding

Populate your database with realistic test data:

```bash
pnpm db:seed
```

Creates sample users with realistic data using Faker. All seeded users have password: `password123`.

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@fullstack-boilerplate/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

### Storybook

Develop and preview UI components in isolation:

```bash
pnpm storybook
```

Opens at [http://localhost:6006](http://localhost:6006). Add stories alongside components in `packages/ui/src/components/*.stories.tsx`.

## Deployment

### Docker Compose

- Target: web + server
- Config: `docker-compose.yml` (app Dockerfiles live in `apps/*/Dockerfile`)
- Build images: pnpm run docker:build
- Start: pnpm run docker:up
- Logs: pnpm run docker:logs
- Stop: pnpm run docker:down

Environment variables are read from each app's `.env` file (baked into web builds for public variables) and overridden in `docker-compose.yml` for container networking.

## Project Structure

```
fullstack-boilerplate/
├── apps/
│   └── web/         # Fullstack application (Next.js)
├── packages/
│   ├── ui/          # Shared shadcn/ui components and styles
│   ├── api/         # API layer / business logic
│   ├── auth/        # Authentication configuration & logic
│   └── db/          # Database schema & queries
```

## Documentation

This project follows an AI-First documentation system:

- **AGENTS.md** — Agent entry point (commands, rules, doc map)
- **docs/PRODUCT.md** — Vision, business context, domain glossary
- **docs/ARCHITECTURE.md** — System shape and boundaries
- **docs/STANDARDS.md** — Code, testing, and git conventions
- **docs/decisions/** — Architecture Decision Records (ADRs)
- **docs/runbooks/** — Operations and deployment guides
- **specs/** — Feature specs (spec → plan → tasks)

See [AGENTS.md](./AGENTS.md) for the full documentation map.

## Error Handling

- **Route errors** — `apps/web/src/app/error.tsx` catches errors in routes with retry functionality
- **Global errors** — `apps/web/src/app/global-error.tsx` catches critical errors in the root layout
- **Component errors** — Use `ErrorBoundary` from `@fullstack-boilerplate/ui/components/error-boundary` to wrap individual components

All errors are automatically reported to Sentry when configured.

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run dev:web`: Start only the web application
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:generate`: Generate database client/types
- `pnpm run db:migrate`: Run database migrations
- `pnpm run db:studio`: Open database studio UI
- `cd apps/web && pnpm run generate-pwa-assets`: Generate PWA assets
- `pnpm run docker:build`: Build the Docker Compose images
- `pnpm run docker:up`: Build and start the Docker Compose stack
- `pnpm run docker:logs`: Tail logs from the Docker Compose stack
- `pnpm run docker:down`: Stop the Docker Compose stack
