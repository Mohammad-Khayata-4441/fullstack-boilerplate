# Architecture

## System Overview

<!-- High-level description of the system's shape -->

This is a pnpm monorepo with Turborepo managing builds. The stack is:

- **Frontend**: Next.js 16 (App Router) in `apps/web`
- **API Layer**: tRPC in `packages/api`
- **Database**: Prisma + PostgreSQL in `packages/db`
- **Authentication**: Better Auth in `packages/auth`
- **UI Components**: shadcn/ui in `packages/ui`
- **Configuration**: Shared configs in `packages/config`
- **Environment**: Type-safe env vars in `packages/env`

## Data Flow

```
User → Next.js App (apps/web)
  ↓
tRPC Client → tRPC Server (packages/api)
  ↓
Prisma Client → PostgreSQL (packages/db)
```

## Key Boundaries

### apps/web (Next.js)

- Server Components for data fetching
- Client Components for interactivity
- API routes for tRPC and auth endpoints
- Middleware for i18n routing

### packages/api (tRPC)

- Type-safe API definitions
- Routers for different domains
- Procedures (queries/mutations)
- Context with session/auth

### packages/db (Prisma)

- Schema definition (source of truth)
- Generated client
- Migrations
- Seed scripts

### packages/auth (Better Auth)

- Authentication configuration
- Session management
- User/account models

### packages/ui (shadcn/ui)

- Shared UI components
- Design tokens (CSS variables)
- Tailwind configuration
- Storybook for development

## Deployment

- **Web**: Docker container (see `apps/web/Dockerfile`)
- **Database**: PostgreSQL (Docker or managed service)
- **Environment**: Environment variables per app

## Why These Choices

<!-- Link to ADRs for major decisions -->

- **Next.js**: Full-stack React framework with App Router
- **tRPC**: End-to-end type safety without code generation
- **Prisma**: Type-safe database access with migrations
- **Better Auth**: Modern auth with session management
- **shadcn/ui**: Copy-paste components, full control
- **Turborepo**: Fast monorepo builds with caching
