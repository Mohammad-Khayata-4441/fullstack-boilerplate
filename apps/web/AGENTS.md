# Web App (Next.js)

## Conventions

- Use Server Components by default; add `"use client"` only when needed
- Data fetching in Server Components, pass data to Client Components
- Use `loading.tsx` for route-level loading states
- Use `error.tsx` for route-level error boundaries
- i18n via next-intl: use `useTranslations()` hook in Client Components
- Use `@fullstack-boilerplate/ui/components/*` for UI components
- Use `@/lib/auth-client` for auth operations on client
- Use `@/utils/trpc` for tRPC client

## File Structure

```
apps/web/src/
├── app/
│   ├── [locale]/          # i18n routes
│   │   ├── layout.tsx     # locale layout
│   │   ├── page.tsx       # home page
│   │   ├── loading.tsx    # route loading
│   │   ├── error.tsx      # route error
│   │   ├── dashboard/
│   │   └── login/
│   ├── api/
│   │   ├── trpc/[trpc]/   # tRPC handler
│   │   ├── auth/[...all]/ # Better Auth handler
│   │   └── uploadthing/   # file upload handler
│   ├── layout.tsx         # root layout
│   ├── loading.tsx        # root loading
│   └── error.tsx          # root error
├── components/            # app-specific components
├── lib/                   # utilities, auth client
├── i18n/                  # i18n config
└── utils/                 # helpers
```

## Testing

- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright
- Run: `pnpm test` and `pnpm test:e2e`
