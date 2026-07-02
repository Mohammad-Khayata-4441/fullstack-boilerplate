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
