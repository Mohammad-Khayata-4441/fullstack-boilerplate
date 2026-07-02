# AGENTS.md

## What this is

Full-stack TypeScript monorepo: Next.js 16 (apps/web), tRPC (packages/api), Prisma + PostgreSQL (packages/db), pnpm + Turborepo. Authentication via Better Auth. UI via shadcn/ui (base-lyra style) with Tailwind CSS v4.

## Commands

```bash
pnpm dev              # start all apps
pnpm build            # build all apps
pnpm check-types      # TypeScript check across all packages
pnpm test             # run tests
pnpm storybook        # component development (port 6006)
pnpm db:push          # push schema to database
pnpm db:migrate       # run migrations
pnpm db:seed          # seed database with test data
pnpm db:studio        # open Prisma Studio
```

## Read before acting

- Product & domain language → docs/PRODUCT.md
- System shape & boundaries → docs/ARCHITECTURE.md
- Code/testing conventions → docs/STANDARDS.md
- Past decisions → docs/decisions/ (check before proposing architecture changes)
- Current work → specs/<active>/ (spec → plan → tasks)

## Rules

- Work on a branch; never merge or deploy — humans do both
- Schema changes: migration in the same PR; no hand-edited docs for derivable facts
- Ambiguous requirements: ask, don't guess
- Never review code you wrote in this same session — say so
- Update tasks.md as you complete tasks
- If you make the same mistake twice, propose an edit to this file or STANDARDS.md
- Use `import type` for type-only imports (verbatimModuleSyntax enabled)
- Components use `@base-ui/react` primitives, `cn()` utility, `data-slot` attributes
- Path aliases: `@fullstack-boilerplate/ui/*` maps to `packages/ui/src/*`
