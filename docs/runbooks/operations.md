# Operations Runbook

## Deployment

### Prerequisites

- Docker installed and running
- Database connection string configured
- Environment variables set

### Deploy Steps

1. Build Docker image:
   ```bash
   pnpm docker:build
   ```

2. Start services:
   ```bash
   pnpm docker:up
   ```

3. Run database migrations:
   ```bash
   docker compose exec web pnpm db:migrate
   ```

4. Verify health:
   ```bash
   curl http://localhost:3001/api/trpc/healthCheck
   ```

## Rollback

### Database Rollback

```bash
# Rollback last migration
docker compose exec web pnpm db:migrate --rollback

# Rollback to specific migration
docker compose exec web pnpm db:migrate --rollback-to <migration-name>
```

### Application Rollback

```bash
# Stop current deployment
pnpm docker:down

# Deploy previous version
git checkout <previous-tag>
pnpm docker:up
```

## Health Checks

### What Healthy Looks Like

- `/api/trpc/healthCheck` returns `"OK"`
- Database connection active (check Sentry)
- No error spikes in Sentry dashboard
- Response times < 500ms

### Monitoring

- **Sentry**: Error tracking and performance monitoring
- **Logs**: `pnpm docker:logs` for application logs
- **Database**: `pnpm db:studio` to inspect data

## Incident Response

### Step 1: Assess

- Check Sentry for error spikes
- Review recent deployments (CHANGELOG.md)
- Check database health

### Step 2: Communicate

- Update status page (if applicable)
- Notify stakeholders

### Step 3: Fix

- If code issue: rollback deployment
- If database issue: check migrations, restore from backup
- If infrastructure: check Docker logs, restart services

### Step 4: Recover

- Verify health checks pass
- Monitor for 24-48 hours
- Document incident in JOURNAL.md

## Backups

### Database Backup

```bash
# Create backup
docker compose exec postgres pg_dump -U postgres fullstack-boilerplate > backup.sql

# Restore from backup
docker compose exec -T postgres psql -U postgres fullstack-boilerplate < backup.sql
```

### Backup Schedule

- Daily automated backups (configure via cron or managed service)
- Test restore quarterly

## Environment Variables

Required variables (see `apps/web/.env.example`):

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Auth secret (min 32 chars)
- `BETTER_AUTH_URL`: App URL
- `RESEND_API_KEY`: Email service API key
- `UPLOADTHING_TOKEN`: File upload service token
- `NEXT_PUBLIC_SENTRY_DSN`: Error tracking DSN
