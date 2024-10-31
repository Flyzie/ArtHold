import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Create users
  const users = [
    {
      nickname: "marcus",
      description: "Philosopher and Emperor",
      profileImage: "https://example.com/marcus.jpg",
      likedArtworks: 5,
      email: "marcus@example.com",
      password: "aurelius", // Note: In a real application, ensure passwords are hashed
    },
    {
      nickname: "seneca",
      description: "Philosopher and Statesman",
      profileImage: "https://example.com/seneca.jpg",
      likedArtworks: 3,
      email: "seneca@example.com",
      password: "stoic", // Note: In a real application, ensure passwords are hashed
    },
    {
      nickname: "epictetus",
      description: "Philosopher and Teacher",
      profileImage: "https://example.com/epictetus.jpg",
      likedArtworks: 7,
      email: "epictetus@example.com",
      password: "freedom", // Note: In a real application, ensure passwords are hashed
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seed data created successfully.");
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
