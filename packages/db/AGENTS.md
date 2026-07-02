# Database Package (Prisma)

## Conventions

- Schema is the source of truth — never hand-edit migrations
- Use `///` doc comments on models and fields
- Use `@@map("snake_case")` for table names
- Use `@@index` for frequently queried fields
- Soft-delete preferred: add `deletedAt` field, never hard-delete

## Migration Rules

- Always create migration: `pnpm db:migrate`
- Never edit applied migrations
- Test migrations on copy of production data before deploying
- Include seed data updates if needed

## Schema Changes

1. Edit `prisma/schema/*.prisma`
2. Run `pnpm db:migrate` (creates migration file)
3. Run `pnpm db:push` (applies to dev database)
4. Update seed script if new models added
5. Commit migration file in same PR

## Querying

- Use Prisma Client for all queries
- Use `select` to fetch only needed fields
- Use `include` for relations
- Handle `NotFoundError` explicitly
- Use transactions for multi-step operations

## Testing

- Use separate test database
- Clean up after each test
- Test queries with realistic data volumes
