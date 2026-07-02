# Task 5: Create Database Seed Script

**Files:**
- Create: `packages/db/prisma/seed.ts`

- [ ] **Step 1: Create seed script**

Create `packages/db/prisma/seed.ts`:

```ts
import "dotenv/config";
import { hashPassword } from "better-auth/crypto";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "./generated/client.js";

const prisma = new PrismaClient();

const SEED_USER_COUNT = 5;

async function main() {
  console.log("Seeding database...");

  await prisma.verification.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleared existing data.");

  const users = [];

  for (let i = 0; i < SEED_USER_COUNT; i++) {
    const user = await prisma.user.create({
      data: {
        id: faker.string.nanoid(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        emailVerified: faker.datatype.boolean({ probability: 0.8 }),
        image: faker.image.avatar(),
        createdAt: faker.date.past({ years: 1 }),
        updatedAt: faker.date.recent(),
      },
    });

    await prisma.account.create({
      data: {
        id: faker.string.nanoid(),
        accountId: user.id,
        providerId: "credential",
        userId: user.id,
        password: await hashPassword("password123"),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    users.push(user);
    console.log(`Created user: ${user.email}`);
  }

  console.log(`\nSeeded ${users.length} users.`);
  console.log("\nAll users have password: password123");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 2: Ensure database is running and schema is pushed**

Run: `pnpm db:start` (if not already running)
Run: `pnpm db:push`

- [ ] **Step 3: Run the seed script**

Run: `pnpm db:seed`
Expected: Creates 5 users with realistic data, logs progress.

- [ ] **Step 4: Verify data in Prisma Studio**

Run: `pnpm db:studio`
Expected: See 5 users in the User table with realistic names and emails.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add database seed script with faker"
```
