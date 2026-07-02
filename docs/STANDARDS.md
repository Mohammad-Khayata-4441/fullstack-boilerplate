# Standards

## Code Style

### TypeScript

- Use `import type` for type-only imports (verbatimModuleSyntax enabled)
- Prefer interfaces for object shapes, types for unions/intersections
- Use `unknown` over `any`
- Explicit return types for exported functions
- No `@ts-ignore` without a comment explaining why

### React

- Functional components only
- Use `React.ComponentProps` instead of `React.FC`
- Prefix client components with `"use client"` directive
- Co-locate components with their styles/tests
- Use `cn()` utility for conditional classes

### Components (shadcn/ui)

- Use `@base-ui/react` primitives
- Add `data-slot` attribute to root element
- Use `cn()` for className merging
- Follow existing variant patterns with `class-variance-authority`
- Export named components, not default

### File Organization

- One component per file
- Co-locate stories, tests with component
- Group by feature, not by type
- Use barrel exports sparingly (only for public APIs)

## Naming Conventions

- **Files**: kebab-case (`sign-in-form.tsx`)
- **Components**: PascalCase (`SignInForm`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Types/Interfaces**: PascalCase (`UserProfile`)
- **Database tables**: snake_case (via `@@map`)
- **CSS classes**: Tailwind utilities + custom with `data-` attributes

## Testing

### Unit Tests

- Use Vitest for unit tests
- Test behavior, not implementation
- One assertion per test when possible
- Use descriptive test names: `should return user when valid ID provided`

### Integration Tests

- Test API routes end-to-end
- Use test database (separate from dev)
- Clean up test data after each test

### E2E Tests

- Use Playwright for E2E tests
- Test critical user flows
- Run against preview deployments

## Error Handling

- Throw typed errors in API layer
- Use tRPC error codes (UNAUTHORIZED, NOT_FOUND, etc.)
- Log errors with context (Sentry integration)
- Show user-friendly error messages
- Never expose internal error details to client

## Git Conventions

### Commits

- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`
- Imperative mood: "add feature" not "added feature"
- Reference issues: `feat: add user profile (#123)`
- One logical change per commit

### Branches

- `main`: production-ready
- `feat/<name>`: new features
- `fix/<name>`: bug fixes
- Keep branches short-lived (< 1 week)

### Pull Requests

- Title follows commit convention
- Description: what, why, how
- Link to spec/issue
- Self-review before requesting review
- All CI checks must pass

## Database

### Schema Changes

- Always create a migration: `pnpm db:migrate`
- Never edit migrations after they're applied
- Add `///` doc comments to models and fields
- Use `@@map` for snake_case table names
- Soft-delete preferred over hard-delete

### Queries

- Use Prisma Client for all queries
- Include only needed fields (`select`)
- Use transactions for multi-step operations
- Handle not-found cases explicitly

## API Design (tRPC)

### Routers

- One router per domain (user, post, etc.)
- Group related procedures
- Use descriptive names: `user.getById` not `user.get`

### Procedures

- `publicProcedure`: no auth required
- `protectedProcedure`: session required
- Validate input with Zod schemas
- Return serializable data

### Error Handling

- Use `TRPCError` with appropriate codes
- Include context in error messages
- Log errors before throwing

## Environment Variables

- Define in `packages/env` with Zod validation
- Use `env.server.ts` for server-only vars
- Use `env.web.ts` for client vars (NEXT_PUBLIC_*)
- Never commit `.env` files
- Document required vars in README

## Documentation

- Update docs in the same PR as code changes
- Generated docs (ERD, OpenAPI) never hand-edited
- Living docs (PRODUCT, ARCHITECTURE, STANDARDS) describe current state
- Specs (spec/plan/tasks) are point-in-time, archived when shipped

## Performance

- Use React Server Components by default
- Optimize images with `next/image`
- Lazy-load heavy components
- Cache API responses appropriately
- Monitor bundle size

## Security

- Validate all inputs (Zod schemas)
- Use parameterized queries (Prisma does this)
- Never expose secrets in client bundle
- Use HTTPS in production
- Keep dependencies updated
