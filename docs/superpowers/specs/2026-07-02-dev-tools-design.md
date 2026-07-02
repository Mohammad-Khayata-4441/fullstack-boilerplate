# Development Tools Design Spec

**Date:** 2026-07-02  
**Purpose:** Add development acceleration tools to the fullstack boilerplate for faster client project development

## Overview

This spec adds four development tools to accelerate development velocity:
1. Storybook for UI component development
2. Database seeding with realistic test data
3. Error boundaries for graceful error handling
4. Loading states for better perceived performance

## 1. Storybook for UI Components

### Location
- Configuration: `packages/ui/.storybook/`
- Stories: Co-located with components in `packages/ui/src/components/*.stories.tsx`

### Setup
- Storybook 8+ with Next.js/Vite integration
- Essential addons:
  - `@storybook/addon-essentials` (controls, actions, viewport, etc.)
  - `@storybook/addon-interactions` (testing interactions)
  - `@storybook/addon-a11y` (accessibility testing)
  - `@storybook/addon-links` (component linking)
- Tailwind CSS integration via existing config
- Run via `pnpm storybook` from root or `pnpm --filter @fullstack-boilerplate/ui storybook`

### Implementation
- Create `.storybook/main.ts` with configuration for TypeScript, Tailwind, and component discovery
- Create `.storybook/preview.ts` with global decorators (theme provider, etc.)
- Add stories for existing components: button, card, input, label, checkbox, dropdown-menu, skeleton, sonner
- Each story demonstrates variants, states, and usage patterns

### Benefits
- Develop components in isolation without running full app
- Visual documentation of component library
- Interactive playground for testing props and states
- Accessibility testing built-in
- Faster component development and iteration

## 2. Database Seeding

### Location
- Seed script: `packages/db/prisma/seed.ts`
- Configuration: `packages/db/package.json` (prisma.seed field)

### Setup
- Use `tsx` for TypeScript execution (already in ecosystem)
- Install `@faker-js/faker` for realistic test data generation
- Configure in `packages/db/package.json`:
  ```json
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
  ```
- Run via `pnpm db:seed` or automatically after `pnpm db:push`

### Implementation
- Create seed script that:
  - Clears existing data (with confirmation in non-dev environments)
  - Creates sample users with realistic data (names, emails, passwords)
  - Creates sample domain entities (posts, products, etc. based on schema)
  - Uses transactions for atomic seeding
  - Logs progress and results
- Use environment variables for seed configuration (e.g., number of records)
- Include both minimal seed (for quick setup) and full seed (for comprehensive testing)

### Benefits
- Instant development environment with realistic data
- Consistent test data across team members
- Faster onboarding for new developers
- Better testing with varied data scenarios
- No manual data entry for demos

## 3. Error Boundaries

### Location
- Route-level: `apps/web/src/app/error.tsx`
- Global: `apps/web/src/app/global-error.tsx`
- Shared error UI: `packages/ui/src/components/error-boundary.tsx`

### Setup
- Next.js App Router error boundaries (error.tsx files)
- React error boundary component for nested error handling
- Sentry integration for error tracking (already configured)
- User-friendly error pages with retry functionality

### Implementation
- Create `apps/web/src/app/error.tsx`:
  - "use client" directive
  - Accept error and reset function props
  - Display user-friendly error message
  - Provide retry button that calls reset()
  - Log error to Sentry
  - Styled with Tailwind and shadcn components
- Create `apps/web/src/app/global-error.tsx`:
  - Handles errors in root layout
  - Full-page error UI
  - Link to home page
  - Sentry integration
- Create reusable `ErrorBoundary` component in `packages/ui`:
  - Class component wrapper for React error boundaries
  - Fallback UI prop
  - onError callback for logging
  - Can be used anywhere in component tree
- Add error handling to key routes (dashboard, login, etc.)

### Benefits
- Graceful error handling instead of white screens
- Better user experience during failures
- Automatic error reporting to Sentry
- Ability to recover from errors without full page reload
- Easier debugging with clear error boundaries

## 4. Loading States

### Location
- Root loading: `apps/web/src/app/loading.tsx`
- Route-specific: `apps/web/src/app/[locale]/dashboard/loading.tsx`, etc.
- Skeleton components: `packages/ui/src/components/skeleton.tsx` (already exists)

### Setup
- Next.js App Router loading.tsx files
- React Suspense boundaries for data fetching
- Skeleton components from shadcn/ui
- Consistent loading patterns across routes

### Implementation
- Create `apps/web/src/app/loading.tsx`:
  - Full-page loading skeleton
  - Matches layout structure (header, content area)
  - Uses skeleton components from packages/ui
  - Animated pulse effect
- Create route-specific loading states:
  - `apps/web/src/app/[locale]/dashboard/loading.tsx` - Dashboard skeleton
  - `apps/web/src/app/[locale]/login/loading.tsx` - Login form skeleton
  - Each matches the actual page layout
- Add Suspense boundaries in components:
  - Wrap data-fetching components with Suspense
  - Provide fallback prop with skeleton UI
  - Use in dashboard, user menu, and other dynamic components
- Create additional skeleton variants in packages/ui:
  - Card skeleton
  - Table skeleton
  - Form skeleton
  - List skeleton

### Benefits
- Better perceived performance
- No blank screens during navigation
- Users know content is loading
- Smoother user experience
- Matches modern web app expectations

## File Structure

```
fullstack-boilerplate/
├── apps/web/src/app/
│   ├── error.tsx                      # Route-level error boundary
│   ├── global-error.tsx               # Global error boundary
│   ├── loading.tsx                    # Root loading state
│   └── [locale]/
│       ├── dashboard/
│       │   └── loading.tsx            # Dashboard loading
│       └── login/
│           └── loading.tsx            # Login loading
├── packages/ui/
│   ├── .storybook/
│   │   ├── main.ts                    # Storybook config
│   │   └── preview.ts                 # Storybook preview
│   └── src/components/
│       ├── button.stories.tsx         # Button stories
│       ├── card.stories.tsx           # Card stories
│       ├── error-boundary.tsx         # Reusable error boundary
│       └── skeleton.stories.tsx       # Skeleton stories
└── packages/db/prisma/
    └── seed.ts                        # Database seed script
```

## Dependencies to Add

### Root package.json
- `@faker-js/faker` (devDependency) - For realistic test data
- `tsx` (devDependency) - For TypeScript seed execution (if not already present)

### packages/ui package.json
- `@storybook/react` (devDependency)
- `@storybook/react-vite` (devDependency)
- `@storybook/addon-essentials` (devDependency)
- `@storybook/addon-interactions` (devDependency)
- `@storybook/addon-a11y` (devDependency)
- `@storybook/addon-links` (devDependency)
- `@storybook/blocks` (devDependency)
- `storybook` (devDependency)

## Scripts to Add

### Root package.json
```json
"storybook": "turbo --filter @fullstack-boilerplate/ui storybook",
"db:seed": "turbo --filter @fullstack-boilerplate/db db:seed"
```

### packages/ui/package.json
```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

### packages/db/package.json
```json
"db:seed": "tsx prisma/seed.ts"
```

## Success Criteria

1. **Storybook**
   - Can run `pnpm storybook` and see component library
   - All existing UI components have stories
   - Stories show variants, states, and usage
   - Accessibility addon working

2. **Database Seeding**
   - Can run `pnpm db:seed` to populate database
   - Creates realistic test data with faker
   - Idempotent (can run multiple times safely)
   - Works with existing Prisma schema

3. **Error Boundaries**
   - Errors in routes show friendly error page
   - Can retry after error without full reload
   - Errors logged to Sentry
   - Global error boundary catches layout errors

4. **Loading States**
   - Navigation shows loading skeleton
   - Each route has appropriate loading UI
   - Data fetching uses Suspense with fallbacks
   - No blank screens during loading

## Testing

- **Storybook:** Manual testing via browser, verify all stories render
- **Seeding:** Run seed script, verify data created in database
- **Error Boundaries:** Trigger errors intentionally, verify UI and Sentry logging
- **Loading States:** Simulate slow data fetching, verify skeletons appear

## Documentation Updates

Update README.md with:
- Storybook usage and how to add new stories
- Database seeding instructions
- Error handling patterns
- Loading state conventions
